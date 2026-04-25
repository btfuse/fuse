
/*
Copyright 2026 Breautek

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

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * Builds a binary query packet to be sent to the /query endpoint.
 * <p>
 * Packet format (big-endian):
 *   [ByteOrder uint8]
 *   [DB Handle uint64]
 *   [SQL Length uint32] [SQL String UTF-8]
 *   [KV Count uint16]
 *   [
 *     [Key Length uint8] [Key UTF-8]
 *     [Type uint8]
 *     [Value Length int32] [Value]
 *   ] x KV Count
 * <p>
 * Supported parameter types:
 *   null     → TYPE_NULL    (0 value bytes)
 *   Long     → TYPE_INTEGER (8 bytes, int64 BE)
 *   Integer  → TYPE_INTEGER (8 bytes, int64 BE)
 *   Double   → TYPE_REAL    (8 bytes, double BE)
 *   Float    → TYPE_REAL    (8 bytes, double BE)
 *   String   → TYPE_TEXT    (UTF-8 bytes)
 *   byte[]   → TYPE_BLOB    (raw bytes)
 */
public class FuseSQLitePacketBuilder {

    // Matches @btfuse/core ByteOrder enum: LE=0, BE=1
    private static final byte BYTE_ORDER_BE = 1;

    // Matches FuseSQLiteType TS enum
    private static final byte TYPE_NULL    = 0;
    private static final byte TYPE_INTEGER = 1;
    private static final byte TYPE_REAL    = 2;
    private static final byte TYPE_TEXT    = 3;
    private static final byte TYPE_BLOB    = 4;

    public byte[] build(long handle, String query, HashMap<String, Object> parameters) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        DataOutputStream dos = new DataOutputStream(baos);

        dos.writeByte(BYTE_ORDER_BE);
        dos.writeLong(handle);

        byte[] sqlBytes = query.getBytes(StandardCharsets.UTF_8);
        dos.writeInt(sqlBytes.length);
        dos.write(sqlBytes);

        int kvCount = (parameters != null) ? parameters.size() : 0;
        dos.writeShort(kvCount);

        if (parameters != null) {
            for (Map.Entry<String, Object> entry : parameters.entrySet()) {
                String key = entry.getKey();
                Object value = entry.getValue();

                byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);
                dos.writeByte(keyBytes.length);
                dos.write(keyBytes);

                byte type;
                byte[] valueBytes;

                if (value == null) {
                    type = TYPE_NULL;
                    valueBytes = new byte[0];
                } else if (value instanceof String) {
                    type = TYPE_TEXT;
                    valueBytes = ((String) value).getBytes(StandardCharsets.UTF_8);
                } else if (value instanceof Double || value instanceof Float) {
                    type = TYPE_REAL;
                    valueBytes = longToBytes(Double.doubleToRawLongBits(((Number) value).doubleValue()));
                } else if (value instanceof Number) {
                    type = TYPE_INTEGER;
                    valueBytes = longToBytes(((Number) value).longValue());
                } else if (value instanceof byte[]) {
                    type = TYPE_BLOB;
                    valueBytes = (byte[]) value;
                } else {
                    throw new IllegalArgumentException("Unsupported parameter type: " + value.getClass().getName());
                }

                dos.writeByte(type);
                dos.writeInt(valueBytes.length);
                dos.write(valueBytes);
            }
        }

        dos.flush();
        return baos.toByteArray();
    }

    private static byte[] longToBytes(long value) {
        return new byte[] {
            (byte)(value >>> 56),
            (byte)(value >>> 48),
            (byte)(value >>> 40),
            (byte)(value >>> 32),
            (byte)(value >>> 24),
            (byte)(value >>> 16),
            (byte)(value >>> 8),
            (byte)(value)
        };
    }
}
