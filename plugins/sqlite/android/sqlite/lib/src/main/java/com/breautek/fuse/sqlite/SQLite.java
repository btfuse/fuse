
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

package com.breautek.fuse.sqlite;

import com.breautek.fuse.FuseError;

public class SQLite {
    static {
        System.loadLibrary("sqlite");
    }

    public static class Callback {
        /**
         * Invoked after the query is prepared.
         * This is a good time to setup a response object.
         * This doesn't mean that the query will be successful.
         */
        public void onQueryResolve() {}

        /**
         * A chunk of the response stream in binary format.
         *
         * @param chunk
         */
        public void onChunk(byte[] chunk) {}

        /**
         * Invoked when data is done being read.
         */
        public void onFinish() {}
    }

    // Note that only flags supported by sqlite3_open_v2 is supported.
    // The values come from https://www.sqlite.org/c3ref/c_open_autoproxy.html
    public static final int READ_ONLY       = 0x00000001;
    public static final int READ_WRITE      = 0x00000002;
    public static final int CREATE          = 0x00000004;
    public static final int URI             = 0x00000040;
    public static final int MEMORY          = 0x00000080;
    public static final int NO_MUTEX        = 0x00008000;
    public static final int FULL_MUTEX      = 0x00010000;
    public static final int SHARED_CACHE    = 0x00020000;
    public static final int PRIVATE_CACHE   = 0x00040000;
    public static final int NO_FOLLOW       = 0x01000000;

    /**
     * Sets the usable tmp directory.
     * This may be required if your queries can be large.
     * It must be set **once** on initialization. It's unsafe
     * to change this directory while any DBs are opened.
     */
    public static native void setTempDir(String path) throws FuseError;

    /**
     * @param path
     * @param openFlags
     * @return Pointer to Database handler
     */
    public static native long open(String path, int openFlags) throws FuseError;

    /**
     * @param db
     * @param sql
     * @return Pointer to statement handler
     */
    public static native long prepare(long db, String sql) throws FuseError;

    public static native void bindDouble(long statement, String varName, double value) throws FuseError;
    public static native void bindString(long statement, String varName, String value) throws FuseError;
    public static native void bindInt(long statement, String varName, long value) throws FuseError;
    public static native void bindBlob(long statement, String varName, byte[] value) throws FuseError;
    public static native void bindNull(long statement, String varName) throws FuseError;

    public static native void bindDoubleWithIndex(long statement, int index, double value) throws FuseError;
    public static native void bindStringWithIndex(long statement, int index, String value) throws FuseError;
    public static native void bindIntWithIndex(long statement, int index, long value) throws FuseError;
    public static native void bindBlobWithIndex(long statement, int index, byte[] value) throws FuseError;
    public static native void bindNullWithIndex(long statement, int index) throws FuseError;

    public static native int step(long statement) throws FuseError;
    public static native int reset(long statement) throws FuseError;
    public static native int columnCount(long statement);
    public static native String columnName(long statement, int index);
    public static native int columnType(long statement, int index);

    public static native double getDouble(long statement, int index);
    public static native long getInt(long statement, int index);
    public static native String getString(long statement, int index);
    public static native byte[] getBlob(long statement, int index);

    public static native int finalize(long statement);
    public static native int close(long db);

    public static native String getLibVersion();
    public static native int setBusyTimeout(long db, int milliseconds);

    public static native void executeFromBinaryPacket(byte[] packet, Callback callback) throws FuseError;
}
