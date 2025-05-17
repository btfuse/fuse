
#include "BTFuseSQLite.h"
#include <string.h>
#include <byteswap.h>
#include <stdbool.h>
#include <sqlite3.h>

bool BTFuseSQLite_isLittleEndian(void) {
    unsigned int x = 0x01020304;
    unsigned char *c = (unsigned char*)&x;
    return (*c) == 0x04;
}

int BTFuseSQLite_lookupVariableIndex(sqlite3_stmt* statement, const char* variable) {
    size_t newSize = strlen(variable) + 2; // +1 for ':' character, and +1 for null terminator

    char* boundVarName = malloc(newSize);
    boundVarName[0] = ':';
    strcpy(boundVarName + 1, variable);

    int index = sqlite3_bind_parameter_index(statement, boundVarName);

    free(boundVarName);

    return index;
}

const char* BTFuseSQLite_execute(void* context, const uint8_t* stream, BTFuseSQLite_OnAfterParse onAfterParse, BTFuseSQLite_OnDataChunk onChunk) {
    size_t pSize = sizeof(void*);
    uint8_t machineBO = BTFuseSQLite_isLittleEndian() ? 0 : 1;
    bool requiresSwap = false;

    uint8_t bo = stream[0];
    stream++;
    if (machineBO != bo) requiresSwap = true;

    sqlite3* db;
    uint64_t dbHandle;
    memcpy(&dbHandle, stream, 8);
    stream += 8;
    if (requiresSwap) {
        dbHandle = bswap_64(dbHandle);
    }
    db = (sqlite3*) (uintptr_t) dbHandle;

    uint32_t sqlLength = 0;
    memcpy(&sqlLength, stream, 4);
    stream += 4;
    if (requiresSwap) {
        sqlLength = bswap_32(sqlLength);
    }

    char* queryText = malloc(sqlLength + 1);
    memcpy(queryText, stream, sqlLength);
    stream += sqlLength;
    queryText[sqlLength] = '\0';

    uint16_t kvCount = 0;
    memcpy(&kvCount, stream, 2);
    stream += 2;
    if (requiresSwap) {
        kvCount = bswap_16(kvCount);
    }

    sqlite3_stmt* statement;
    int resultCode = sqlite3_prepare_v2(db, queryText, -1, &statement, 0);
    free(queryText);
    if (resultCode != SQLITE_OK) {
        const char* message = db ? sqlite3_errmsg(db) : sqlite3_errstr(resultCode);
        return message;
    }

    for (uint16_t i = 0; i < kvCount; i++) {
        uint8_t keyLength = 0;
        memcpy(&keyLength, stream, 1);
        stream++;

        char* key = malloc(keyLength + 1);
        memcpy(key, stream, keyLength);
        key[keyLength] = '\0';
        stream += keyLength;

        uint8_t dataType = 0;
        memcpy(&dataType, stream, 1);
        stream++;

        uint32_t valueLength = 0;
        memcpy(&valueLength, stream, 4);
        stream += 4;
        if (requiresSwap) {
            valueLength = bswap_32(valueLength);
        }

        void* rawValue = malloc(valueLength);
        memcpy(rawValue, stream, valueLength);
        stream += valueLength;

        int pIndex = BTFuseSQLite_lookupVariableIndex(statement, key);

        switch (dataType) {
            default: return "Unsupported Data Type";
            case BTFuseSQLiteDataType_VOID: {
                    resultCode = sqlite3_bind_null(statement, pIndex);
                }
                break;
            case BTFuseSQLiteDataType_INTEGER: {
                    if (valueLength > 8) {
                        free(key);
                        free(rawValue);
                        sqlite3_finalize(statement);
                        return "Value too big for integer";
                    }

                    int64_t value = 0;
                    memcpy(&value, rawValue, valueLength);
                    resultCode = sqlite3_bind_int64(statement, pIndex, value);
                }
                break;
            case BTFuseSQLiteDataType_REAL: {
                    if (valueLength > 8) {
                        free(key);
                        free(rawValue);
                        sqlite3_finalize(statement);
                        return "Value too big for real";
                    }

                    double value = 0.0;
                    memcpy(&value, rawValue, valueLength);
                    resultCode = sqlite3_bind_double(statement, pIndex, value);
                }
                break;
            case BTFuseSQLiteDataType_TEXT: {
                    resultCode = sqlite3_bind_text(statement, pIndex, (const char *) rawValue, valueLength, SQLITE_TRANSIENT);
                }
            break;
            case BTFuseSQLiteDataType_BLOB: {
                    resultCode = sqlite3_bind_blob(statement, pIndex, rawValue, valueLength, SQLITE_TRANSIENT);
                }
                break;
        }

        free(key);
        free(rawValue);

        if (resultCode != SQLITE_OK) {
            const char* message = db ? sqlite3_errmsg(db) : sqlite3_errstr(resultCode);
            return message;
        }
    }

    // We no longer need the input buffer
    onAfterParse(context);

    // TODO prepare output binary data
    // [uint8 byteorder][int32_t numberOfKeys]
    // [uint64_t keyLength][utf8 key] x numberOfKeys
    // [uint64_t valueLength][uint8 dataType][void* data] x numberOfKeys x numberOfRows

    int keyCount = sqlite3_column_count(statement);
    bool success = true;

    {
        uint8_t* chunk = malloc(5);
        uint8_t* buffer = chunk;
        memcpy(buffer, &machineBO, 1);
        buffer++;
        memcpy(buffer, &keyCount, 4);
        success = onChunk(context, 5, chunk);
        free(chunk);

        if (!success) {
            return "Chunk Error";
        }
    }

    for (int i = 0; i < keyCount; i++) {
        const char* name = sqlite3_column_name(statement, i);
        uint64_t keyLength = strlen(name);
        uint64_t payloadSize = keyLength + 8;
        uint8_t* chunk = malloc(payloadSize);
        uint8_t* buffer = chunk;
        memcpy(buffer, &keyLength, 8);
        buffer += 8;
        memcpy(buffer, name, keyLength);
        success = onChunk(context, payloadSize, chunk);
        free(chunk);
        if (!success) {
            return "Chunk Error";
        }
    }

    while (true) {
        resultCode = sqlite3_step(statement);

        if (resultCode == SQLITE_ROW) {
            for (int i = 0; i < keyCount; i++) {
                int dataType = sqlite3_column_type(statement, i);
                switch (dataType) {
                    default: return "Unsupported Column Type";
                    case SQLITE_INTEGER: {
                        uint64_t value = sqlite3_column_int64(statement, i);
                        uint64_t payloadSize = 8 + 8 + 1;
                        uint8_t* chunk = malloc(payloadSize);
                        uint8_t* buffer = chunk;
                        uint64_t valueSize = 8;
                        uint8_t outboundType = BTFuseSQLiteDataType_INTEGER;
                        memcpy(buffer, &valueSize, 8);
                        buffer += 8;
                        memcpy(buffer, &outboundType, 1);
                        buffer++;
                        memcpy(buffer, &value, 8);
                        success = onChunk(context, payloadSize, chunk);
                        free(chunk);
                    }
                    break;
                    case SQLITE_FLOAT: {
                        double value = sqlite3_column_double(statement, i);
                        uint64_t payloadSize = 8 + 8 + 1;
                        uint8_t* chunk = malloc(payloadSize);
                        uint8_t* buffer = chunk;
                        uint64_t valueSize = 8;
                        uint8_t outboundType = BTFuseSQLiteDataType_REAL;
                        memcpy(buffer, &valueSize, 8);
                        buffer += 8;
                        memcpy(buffer, &outboundType, 1);
                        buffer++;
                        memcpy(buffer, &value, 8);
                        success = onChunk(context, payloadSize, chunk);
                        free(chunk);
                    }
                    break;
                    case SQLITE_NULL: {
                        double value = sqlite3_column_double(statement, i);
                        uint64_t payloadSize = 8 + 1;
                        uint8_t* chunk = malloc(payloadSize);
                        uint8_t* buffer = chunk;
                        uint64_t valueSize = 0;
                        uint8_t outboundType = BTFuseSQLiteDataType_VOID;
                        memcpy(buffer, &valueSize, 8);
                        buffer += 8;
                        memcpy(buffer, &outboundType, 1);
                        buffer++;
                        success = onChunk(context, payloadSize, chunk);
                        free(chunk);
                    }
                    break;
                    case SQLITE_BLOB: {
                        const void* value = sqlite3_column_blob(statement, i);
                        int blobSize = sqlite3_column_bytes(statement, i);
                        uint64_t payloadSize = 8 + 1 + blobSize;
                        uint8_t* chunk = malloc(payloadSize);
                        uint8_t* buffer = chunk;
                        uint64_t valueSize = blobSize;
                        uint8_t outboundType = BTFuseSQLiteDataType_BLOB;
                        memcpy(buffer, &valueSize, 8);
                        buffer += 8;
                        memcpy(buffer, &outboundType, 1);
                        buffer++;
                        memcpy(buffer, value, blobSize);
                        success = onChunk(context, payloadSize, chunk);
                        free(chunk);
                    }
                    break;
                    case SQLITE3_TEXT: {
                        const unsigned char* value = sqlite3_column_text(statement, i);
                        int blobSize = sqlite3_column_bytes(statement, i);
                        uint64_t payloadSize = 8 + 1 + blobSize;
                        uint8_t* chunk = malloc(payloadSize);
                        uint8_t* buffer = chunk;
                        uint64_t valueSize = blobSize;
                        uint8_t outboundType = BTFuseSQLiteDataType_TEXT;
                        memcpy(buffer, &valueSize, 8);
                        buffer += 8;
                        memcpy(buffer, &outboundType, 1);
                        buffer++;
                        memcpy(buffer, value, blobSize);
                        success = onChunk(context, payloadSize, chunk);
                        free(chunk);
                    }
                    break;
                }

                if (!success) {
                    return "Chunk Error";
                }
            }
        }
        else {
            break;
        }
    }

    return NULL;
}
