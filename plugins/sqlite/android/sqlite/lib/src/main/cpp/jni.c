

/*
Copyright 2025 Breautek

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

#include <sqlite3.h>
#include <jni.h>

#include <malloc.h>
#include <string.h>
#include <stdio.h>
#include <limits.h>
#include <stdbool.h>
#include <byteswap.h>
#include <BTFuseSQLite.h>



const char* SQLITE_JNI_DOMAIN = "SQLiteJNI";

struct BTFuseSQLiteJNI_ExecutionContext {
    JNIEnv* env;
    jbyteArray packet;
    jbyte* data;
    bool hasReleasedPrimitiveArray;
    jobject callback;
    jclass callbackClass;
    jmethodID onChunkMethod;
    jmethodID onResolve;
    jmethodID onFinish;
};

uint64_t BTFuseSQLite_min(uint64_t a, uint64_t b) {
    return a < b ? a : b;
}

void throwFuseError(JNIEnv* env, int code, const char* message) {
    jclass fuseErrorClass = (*env)->FindClass(env, "com/breautek/fuse/FuseError");
    if (fuseErrorClass == NULL) {
        (*env)->ThrowNew(env, (*env)->FindClass(env, "java/lang/RuntimeException"), "FuseError class not found");
        return;
    }

    jmethodID constructor = (*env)->GetMethodID(env, fuseErrorClass, "<init>", "(Ljava/lang/String;ILjava/lang/String;)V");
    if (constructor == NULL) {
        (*env)->ThrowNew(env, (*env)->FindClass(env, "java/lang/RuntimeException"), "FuseError constructor not found");
        return;
    }

    jstring jdomain = (*env)->NewStringUTF(env, SQLITE_JNI_DOMAIN);
    jstring jmessage = (*env)->NewStringUTF(env, message);

    jobject fuseError = (*env)->NewObject(env, fuseErrorClass, constructor, jdomain, code, jmessage);
    if (fuseError == NULL) {
        (*env)->ThrowNew(env, (*env)->FindClass(env, "java/lang/RuntimeException"), "Failed to create FuseError");
        return;
    }

    (*env)->Throw(env, (jthrowable)fuseError);
}

void throwBindError(JNIEnv* env, const char* varName) {
    const char* prefix = "Could not bind parameter \"";
    const char* suffix = "\"";

    size_t len = strlen(prefix) + strlen(varName) + strlen(suffix) + 1;
    char* message = malloc(len);
    if (!message) {
        throwFuseError(env, 0, "Allocation Error");
        return;
    }

    snprintf(message, len, "%s%s%s", prefix, varName, suffix);

    throwFuseError(env, 0, message);

    free(message);
}

JNIEXPORT void JNICALL
Java_com_breautek_fuse_sqlite_SQLite_setTempDir(JNIEnv* env, jclass clazz, jstring jpath) {
    // Read special notes: https://www.sqlite.org/c3ref/temp_directory.html
    jboolean isCopy;
    const char* path = (*env)->GetStringUTFChars(env, jpath, &isCopy);

    if (path == NULL) {
        sqlite3_temp_directory = NULL;
        return;
    }

    size_t len = strlen(path) + 1; // +1 for NULL terminator
    if (len > INT_MAX) {
        throwFuseError(env, 0, "Allocation Error: Path too large");
        //TODO: Raise error
        return;
    }

    char* sqliteStr = sqlite3_malloc((int) len);

    if (sqliteStr == NULL) {
        (*env)->ReleaseStringUTFChars(env, jpath, path);
        throwFuseError(env, 0, "Allocation Error: Unable to allocate memory for path");
        return;
    }

    strcpy(sqliteStr, path);

    (*env)->ReleaseStringUTFChars(env, jpath, path);
    sqlite3_temp_directory = sqliteStr;
}

JNIEXPORT jlong JNICALL
Java_com_breautek_fuse_sqlite_SQLite_open(JNIEnv* env, jobject jptr, jstring jpath, jint jflags) {
    sqlite3* db;
    jboolean isCopy;
    const char* path = (*env)->GetStringUTFChars(env, jpath, &isCopy);

    if (path == NULL) {
        throwFuseError(env, 0, "Path string is null");
        return 0;
    }

    int resultCode = sqlite3_open_v2(path, &db, (int)jflags, NULL);
    if (resultCode != SQLITE_OK) {
        const char* message = db ? sqlite3_errmsg(db) : sqlite3_errstr(resultCode);
        if (db) {
            sqlite3_close(db); // cleanup if partially allocated
        }
        (*env)->ReleaseStringUTFChars(env, jpath, path);
        throwFuseError(env, 0, message);
        return 0;
    }

    (*env)->ReleaseStringUTFChars(env, jpath, path);
    return (jlong) db;
}

JNIEXPORT jlong JNICALL
Java_com_breautek_fuse_sqlite_SQLite_prepare(JNIEnv* env, jobject jptr, jlong jdbptr, jstring jsql) {
    sqlite3* db = (sqlite3*)jdbptr;
    jboolean isCopy;
    const char* sql = (*env)->GetStringUTFChars(env, jsql, &isCopy);

    if (sql == NULL) {
        throwFuseError(env, 0, "Allocation Error: Could not read SQL string.");
        return 0;
    }

    sqlite3_stmt* statement;

    int resultCode = sqlite3_prepare_v2(db, sql, -1, &statement, 0);
    (*env)->ReleaseStringUTFChars(env, jsql, sql);

    if (resultCode != SQLITE_OK) {
        const char* message = db ? sqlite3_errmsg(db) : sqlite3_errstr(resultCode);
        throwFuseError(env, 0, message);
        return 0;
    }

    return (jlong)statement;
}

JNIEXPORT void JNICALL
Java_com_breautek_fuse_sqlite_SQLite_bindNullWithIndex(JNIEnv* env, jobject jptr, jlong jstatement, jint jIndex) {
    int resultCode = sqlite3_bind_null((sqlite3_stmt*)jstatement, (int)jIndex);
    if (resultCode != SQLITE_OK) {
        sqlite3* db = sqlite3_db_handle((sqlite3_stmt*)jstatement);
        const char* message = db ? sqlite3_errmsg(db) : sqlite3_errstr(resultCode);
        throwFuseError(env, 0, message);
    }
}

JNIEXPORT void JNICALL
Java_com_breautek_fuse_sqlite_SQLite_bindNull(JNIEnv* env, jobject jptr, jlong jstatement, jstring jVarName) {
    sqlite3_stmt* statement = (sqlite3_stmt*)jstatement;
    jboolean isCopy;
    const char* varName = (*env)->GetStringUTFChars(env, jVarName, &isCopy);

    if (varName == NULL) {
        throwFuseError(env, 0, "Unable to get var name");
        return;
    }

    int index = BTFuseSQLite_lookupVariableIndex(statement, varName);
    if (index == 0) {
        throwBindError(env, varName);
        (*env)->ReleaseStringUTFChars(env, jVarName, varName);
        return;
    }
    (*env)->ReleaseStringUTFChars(env, jVarName, varName);

    Java_com_breautek_fuse_sqlite_SQLite_bindNullWithIndex(env, jptr, jstatement, index);
}

JNIEXPORT void JNICALL
Java_com_breautek_fuse_sqlite_SQLite_bindDoubleWithIndex(JNIEnv* env, jobject jptr, jlong jstatement, jint jIndex, jdouble value) {
    int resultCode = sqlite3_bind_double((sqlite3_stmt*)jstatement, jIndex, (double)value);
    if (resultCode != SQLITE_OK) {
        sqlite3* db = sqlite3_db_handle((sqlite3_stmt*)jstatement);
        const char* message = db ? sqlite3_errmsg(db) : sqlite3_errstr(resultCode);
        throwFuseError(env, 0, message);
    }
}

JNIEXPORT void JNICALL
Java_com_breautek_fuse_sqlite_SQLite_bindDouble(JNIEnv* env, jobject jptr, jlong jstatement, jstring jVarName, jdouble value) {
    sqlite3_stmt* statement = (sqlite3_stmt*)jstatement;
    jboolean isCopy;
    const char* varName = (*env)->GetStringUTFChars(env, jVarName, &isCopy);

    if (varName == NULL) {
        throwFuseError(env, 0, "Unable to get var name");
        return;
    }

    int index = BTFuseSQLite_lookupVariableIndex(statement, varName);
    if (index == 0) {
        throwBindError(env, varName);
        (*env)->ReleaseStringUTFChars(env, jVarName, varName);
        return;
    }

    (*env)->ReleaseStringUTFChars(env, jVarName, varName);

    return Java_com_breautek_fuse_sqlite_SQLite_bindDoubleWithIndex(env, jptr, jstatement, index, value);
}

JNIEXPORT void JNICALL
Java_com_breautek_fuse_sqlite_SQLite_bindStringWithIndex(JNIEnv* env, jobject jptr, jlong jstatement, jint jIndex, jstring jvalue) {
    jboolean isCopy;
    const char* value = (*env)->GetStringUTFChars(env, jvalue, &isCopy);
    int resultCode = sqlite3_bind_text((sqlite3_stmt*)jstatement, jIndex, value, -1, SQLITE_TRANSIENT);
    (*env)->ReleaseStringUTFChars(env, jvalue, value);
    if (resultCode != SQLITE_OK) {
        sqlite3* db = sqlite3_db_handle((sqlite3_stmt*)jstatement);
        const char* message = db ? sqlite3_errmsg(db) : sqlite3_errstr(resultCode);
        throwFuseError(env, 0, message);
    }
}

JNIEXPORT void JNICALL
Java_com_breautek_fuse_sqlite_SQLite_bindString(JNIEnv* env, jobject jptr, jlong jstatement, jstring jVarName, jstring jvalue) {
    sqlite3_stmt* statement = (sqlite3_stmt*)jstatement;
    jboolean isCopy;
    const char* varName = (*env)->GetStringUTFChars(env, jVarName, &isCopy);

    if (varName == NULL) {
        throwFuseError(env, 0, "Unable to get var name");
        return;
    }

    int index = BTFuseSQLite_lookupVariableIndex(statement, varName);
    if (index == 0) {
        throwBindError(env, varName);
        (*env)->ReleaseStringUTFChars(env, jVarName, varName);
        return;
    }
    (*env)->ReleaseStringUTFChars(env, jVarName, varName);

    Java_com_breautek_fuse_sqlite_SQLite_bindStringWithIndex(env, jptr, jstatement, index, jvalue);
}

JNIEXPORT void JNICALL
Java_com_breautek_fuse_sqlite_SQLite_bindIntWithIndex(JNIEnv* env, jobject jptr, jlong jstatement, jint jIndex, jlong value) {
    int resultCode = sqlite3_bind_int64((sqlite3_stmt*)jstatement, jIndex, (long)value);
    if (resultCode != SQLITE_OK) {
        sqlite3* db = sqlite3_db_handle((sqlite3_stmt*)jstatement);
        const char* message = db ? sqlite3_errmsg(db) : sqlite3_errstr(resultCode);
        throwFuseError(env, 0, message);
    }
}

JNIEXPORT void JNICALL
Java_com_breautek_fuse_sqlite_SQLite_bindInt(JNIEnv* env, jobject jptr, jlong jstatement, jstring jVarName, jlong value) {
    sqlite3_stmt* statement = (sqlite3_stmt*)jstatement;
    jboolean isCopy;
    const char* varName = (*env)->GetStringUTFChars(env, jVarName, &isCopy);

    if (varName == NULL) {
        throwFuseError(env, 0, "Unable to get var name");
        return;
    }

    int index = BTFuseSQLite_lookupVariableIndex(statement, varName);
    if (index == 0) {
        throwBindError(env, varName);
        (*env)->ReleaseStringUTFChars(env, jVarName, varName);
        return;
    }
    (*env)->ReleaseStringUTFChars(env, jVarName, varName);

    Java_com_breautek_fuse_sqlite_SQLite_bindIntWithIndex(env, jptr, jstatement, index, value);
}

JNIEXPORT void JNICALL
Java_com_breautek_fuse_sqlite_SQLite_bindBlobWithIndex(JNIEnv* env, jobject jptr, jlong jstatement, jint jIndex, jbyteArray jvalue) {
    sqlite3_stmt* statement = (sqlite3_stmt*)jstatement;

    int result;
    if (jvalue == NULL) {
        result = sqlite3_bind_blob(statement, jIndex, NULL, 0, NULL);
    }
    else {
        jbyte* bufferPtr = (*env)->GetByteArrayElements(env, jvalue, NULL);
        jsize lengthOfArray = (*env)->GetArrayLength(env, jvalue);

        result = sqlite3_bind_blob(statement, jIndex, bufferPtr, (int)lengthOfArray, SQLITE_TRANSIENT);

        (*env)->ReleaseByteArrayElements(env, jvalue, bufferPtr, 0);
    }

    if (result != SQLITE_OK) {
        sqlite3* db = sqlite3_db_handle((sqlite3_stmt*)jstatement);
        const char* message = db ? sqlite3_errmsg(db) : sqlite3_errstr(result);
        throwFuseError(env, 0, message);
        return;
    }
}

JNIEXPORT void JNICALL
Java_com_breautek_fuse_sqlite_SQLite_bindBlob(JNIEnv* env, jobject jptr, jlong jstatement, jstring jVarName, jbyteArray jvalue) {
    sqlite3_stmt* statement = (sqlite3_stmt*)jstatement;
    jboolean isCopy;
    const char* varName = (*env)->GetStringUTFChars(env, jVarName, &isCopy);

    if (varName == NULL) {
        throwFuseError(env, 0, "Unable to get var name");
        return;
    }

    int index = BTFuseSQLite_lookupVariableIndex(statement, varName);
    if (index == 0) {
        throwBindError(env, varName);
        (*env)->ReleaseStringUTFChars(env, jVarName, varName);
        return;
    }
    (*env)->ReleaseStringUTFChars(env, jVarName, varName);

    Java_com_breautek_fuse_sqlite_SQLite_bindBlobWithIndex(env, jptr, jstatement, index, jvalue);
}

JNIEXPORT jint JNICALL
Java_com_breautek_fuse_sqlite_SQLite_step(JNIEnv* env, jobject jptr, jlong jstatement) {
    int resultCode = sqlite3_step((sqlite3_stmt*)jstatement);
    if (resultCode != SQLITE_OK && resultCode != SQLITE_DONE && resultCode != SQLITE_ROW) {
        sqlite3* db = sqlite3_db_handle((sqlite3_stmt*)jstatement);
        const char* message = db ? sqlite3_errmsg(db) : sqlite3_errstr(resultCode);
        throwFuseError(env, 0, message);
        return resultCode;
    }
    return resultCode;
}

JNIEXPORT jint JNICALL
Java_com_breautek_fuse_sqlite_SQLite_reset(JNIEnv* env, jobject jptr, jlong jstatement) {
    int resultCode = sqlite3_reset((sqlite3_stmt*)jstatement);
    if (resultCode != SQLITE_OK) {
        sqlite3* db = sqlite3_db_handle((sqlite3_stmt*)jstatement);
        const char* message = db ? sqlite3_errmsg(db) : sqlite3_errstr(resultCode);
        throwFuseError(env, 0, message);
        return resultCode;
    }
    return resultCode;
}

JNIEXPORT jint JNICALL
Java_com_breautek_fuse_sqlite_SQLite_columnCount(JNIEnv* env, jobject jptr, jlong jstatement) {
    return sqlite3_column_count((sqlite3_stmt*)jstatement);
}

JNIEXPORT jstring JNICALL
Java_com_breautek_fuse_sqlite_SQLite_columnName(JNIEnv* env, jobject jptr, jlong jstatement, jint index) {
    const char* columnName = sqlite3_column_name((sqlite3_stmt*)jstatement, (int)index);
    if (columnName == NULL) {
        throwFuseError(env, 0, "Unknown column");
        return 0;
    }

    return (*env)->NewStringUTF(env, columnName);
}

JNIEXPORT jint JNICALL
Java_com_breautek_fuse_sqlite_SQLite_columnType(JNIEnv* env, jobject jptr, jlong jstatement, jint index) {
    return sqlite3_column_type((sqlite3_stmt*)jstatement, (int)index);
}

JNIEXPORT jdouble JNICALL
Java_com_breautek_fuse_sqlite_SQLite_getDouble(JNIEnv* env, jobject jptr, jlong jstatement, jint jindex) {
    return (jdouble)sqlite3_column_double((sqlite3_stmt*)jstatement, (int)jindex);
}

JNIEXPORT jlong JNICALL
Java_com_breautek_fuse_sqlite_SQLite_getInt(JNIEnv* env, jobject jptr, jlong jstatement, jint jindex) {
    return (jlong)sqlite3_column_int64((sqlite3_stmt*)jstatement, (int)jindex);
}

JNIEXPORT jstring JNICALL
Java_com_breautek_fuse_sqlite_SQLite_getString(JNIEnv* env, jobject jptr, jlong jstatement, jint index) {
    const unsigned char* text = sqlite3_column_text((sqlite3_stmt*)jstatement, (int)index);
    if (text == NULL) {
        return NULL;
    }
    return (*env)->NewStringUTF(env, (const char*)text);
}

JNIEXPORT jbyteArray JNICALL
Java_com_breautek_fuse_sqlite_SQLite_getBlob(JNIEnv* env, jobject jptr, jlong jstatement, jint index) {
    sqlite3_stmt* statement = (sqlite3_stmt*)jstatement;
    const void* data = sqlite3_column_blob(statement, (int)index);
    int size = sqlite3_column_bytes(statement, (int)index);
    jbyteArray out = (*env)->NewByteArray(env, size);
    (*env)->SetByteArrayRegion(env, out, 0, size, (jbyte*)data);
    return out;
}

JNIEXPORT jint JNICALL
Java_com_breautek_fuse_sqlite_SQLite_finalize(JNIEnv* env, jobject jptr, jlong jstatement) {
    return (jint)sqlite3_finalize((sqlite3_stmt*)jstatement);
}

JNIEXPORT jint JNICALL
Java_com_breautek_fuse_sqlite_SQLite_close(JNIEnv* env, jobject jptr, jlong db) {
    return (jint)sqlite3_close_v2((sqlite3*)db);
}

JNIEXPORT jstring JNICALL
Java_com_breautek_fuse_sqlite_SQLite_getLibVersion(JNIEnv* env, jobject jptr) {
    const char* version = sqlite3_libversion();
    return (*env)->NewStringUTF(env, version);
}

JNIEXPORT jint JNICALL
Java_com_breautek_fuse_sqlite_SQLite_setBusyTimeout(JNIEnv* env, jobject jptr, jlong db, jint milliseconds) {
    return (jint)sqlite3_busy_timeout((sqlite3*)db, (int)milliseconds);
}

void BTFuseSQLiteJNI_OnAfterParse(void* context) {
    struct BTFuseSQLiteJNI_ExecutionContext* jniContext = (struct BTFuseSQLiteJNI_ExecutionContext*) context;
    JNIEnv* env = jniContext->env;
    jbyteArray packet = jniContext->packet;
    jbyte* data = jniContext->data;

    if (!jniContext->hasReleasedPrimitiveArray) {
        jniContext->hasReleasedPrimitiveArray = true;
        (*env)->ReleasePrimitiveArrayCritical(env, packet, data, JNI_ABORT);
    }

    (*env)->CallVoidMethod(env, jniContext->callback, jniContext->onResolve);
}

bool BTFuseSQLiteJNI_OnDataChunk(void* context, uint64_t payloadSize, void* payload) {
    struct BTFuseSQLiteJNI_ExecutionContext* jniContext = (struct BTFuseSQLiteJNI_ExecutionContext*) context;
    JNIEnv* env = jniContext->env;
    jbyteArray packet = jniContext->packet;
    jbyte* data = jniContext->data;
    jobject callback = jniContext->callback;

    // TODO: Improve error handling

    if (payloadSize > INT32_MAX) {
        // We need to split the chunk down to avoid over-sizing buffers for the java environment.
        uint8_t* marker = payload;
        while (payloadSize != 0) {
            int32_t bufferSize = (int32_t) BTFuseSQLite_min(INT32_MAX, payloadSize);
            payloadSize -= bufferSize;

            jbyteArray chunkArray = (*env)->NewByteArray(env, bufferSize);
            (*env)->SetByteArrayRegion(env, chunkArray, 0, bufferSize, (const jbyte*)marker);
            (*env)->CallVoidMethod(env, callback, jniContext->onChunkMethod, chunkArray);
            (*env)->DeleteLocalRef(env, chunkArray);

            marker += bufferSize;
        }
    }
    else {
        jbyteArray chunkArray = (*env)->NewByteArray(env, (int32_t) payloadSize);
        (*env)->SetByteArrayRegion(env, chunkArray, 0, (int32_t) payloadSize, (const jbyte*)payload);
        (*env)->CallVoidMethod(env, callback, jniContext->onChunkMethod, chunkArray);
        (*env)->DeleteLocalRef(env, chunkArray);
    }

    return true;
}

JNIEXPORT void JNICALL
Java_com_breautek_fuse_sqlite_SQLite_executeFromBinaryPacket(JNIEnv *env, jclass clazz, jbyteArray packet, jobject callback) {
    jsize dataLength = (*env)->GetArrayLength(env, packet);
    jbyte* data = (*env)->GetPrimitiveArrayCritical(env, packet, NULL);
    const uint8_t* stream = (const uint8_t*) data;

    if (data == NULL) {
        throwFuseError(env, 0, "Unable to access packet data");
        return;
    }

    jclass callbackClass = (*env)->GetObjectClass(env, callback);
    if (callbackClass == NULL) {
        throwFuseError(env, 0, "Unable to find SQLite.Callback");
        return;
    }

    jmethodID onChunkMethod = (*env)->GetMethodID(env, callbackClass, "onChunk", "([B)V");
    if (onChunkMethod == NULL) {
        throwFuseError(env, 0, "Unable to find SQLite.Callback.onChunkMethod(byte[])");
        return;
    }

    jmethodID onResolve = (*env)->GetMethodID(env, callbackClass, "onQueryResolve", "()V");
    if (onResolve == NULL) {
        throwFuseError(env, 0, "Unable to find SQLite.Callback.onQueryResolve()");
        return;
    }

    jmethodID onFinish = (*env)->GetMethodID(env, callbackClass, "onFinish", "()V");
    if (onFinish == NULL) {
        throwFuseError(env, 0, "Unable to find SQLite.Callback.onFinish()");
        return;
    }

    struct BTFuseSQLiteJNI_ExecutionContext context = {
        env,
        packet,
        data,
        false,
        callback,
        onChunkMethod,
        onResolve,
        onFinish
    };

    const char* message = BTFuseSQLite_execute(
            &context,
            stream,
            BTFuseSQLiteJNI_OnAfterParse,
            BTFuseSQLiteJNI_OnDataChunk
    );

    if (message != NULL) {
        // I need to release the primitive array in the "callback"
        if (!context.hasReleasedPrimitiveArray) {
            context.hasReleasedPrimitiveArray = true;
            (*env)->ReleasePrimitiveArrayCritical(env, packet, data, JNI_ABORT);
        }
        throwFuseError(env, 0, message);
        return;
    }

    (*env)->CallVoidMethod(env, callback, onFinish);
}
