package com.breautek.fuse.sqlite;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;

public class FuseSQLiteResponseParser {
    public FuseSQLiteResponseParser() {}

    public ArrayList<HashMap<String, Object>> parse(byte[] data) {
        ByteBuffer buffer = ByteBuffer.wrap(data);

        byte byteOrder = buffer.get();
        buffer.order(byteOrder == 0 ? ByteOrder.LITTLE_ENDIAN : ByteOrder.BIG_ENDIAN);

        int colCount = buffer.getInt();

        String[] columns = new String[colCount];
        for (int i = 0; i < colCount; i++) {
            long nameLen = buffer.getLong();
            byte[] nameBytes = new byte[(int) nameLen];
            buffer.get(nameBytes);
            columns[i] = new String(nameBytes, StandardCharsets.UTF_8);
        }

        ArrayList<HashMap<String, Object>> rows = new ArrayList<>();
        while (buffer.hasRemaining()) {
            HashMap<String, Object> row = new HashMap<>();
            for (int i = 0; i < colCount; i++) {
                long valueSize = buffer.getLong();
                byte dataType = buffer.get();
                switch (dataType) {
                    case BTFuseSQLiteDataType.VOID:
                        row.put(columns[i], null);
                        break;
                    case BTFuseSQLiteDataType.INTEGER:
                        row.put(columns[i], buffer.getLong());
                        break;
                    case BTFuseSQLiteDataType.REAL:
                        row.put(columns[i], buffer.getDouble());
                        break;
                    case BTFuseSQLiteDataType.TEXT: {
                        byte[] bytes = new byte[(int) valueSize];
                        buffer.get(bytes);
                        row.put(columns[i], new String(bytes, StandardCharsets.UTF_8));
                        break;
                    }
                    case BTFuseSQLiteDataType.BLOB: {
                        byte[] bytes = new byte[(int) valueSize];
                        buffer.get(bytes);
                        row.put(columns[i], bytes);
                        break;
                    }
                }
            }
            rows.add(row);
        }

        return rows;
    }
}
