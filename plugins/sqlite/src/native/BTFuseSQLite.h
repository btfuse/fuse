
#pragma once

#include <stdint.h>
#include <stdlib.h>
#include <stdbool.h>
#include <sqlite3.h>

typedef enum {
    BTFuseSQLiteDataType_VOID,
    BTFuseSQLiteDataType_INTEGER,
    BTFuseSQLiteDataType_REAL,
    BTFuseSQLiteDataType_TEXT,
    BTFuseSQLiteDataType_BLOB
} BTFuseSQLiteDataType;

typedef void (*BTFuseSQLite_OnAfterParse)(void* context);
typedef bool (*BTFuseSQLite_OnDataChunk)(void* context, uint64_t payloadSize, void* payload);

int BTFuseSQLite_lookupVariableIndex(sqlite3_stmt* statement, const char* variable);
const char* BTFuseSQLite_execute(
    void* context,
    const uint8_t* data,
    BTFuseSQLite_OnAfterParse onAfterParse,
    BTFuseSQLite_OnDataChunk onRowResult
);
