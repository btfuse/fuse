
import { FuseSQLiteConnection } from './FuseSQLiteConnection';
import { FuseSQLiteQuery } from './FuseSQLiteQuery';
import { FuseSQLiteType, TFuseSupportedSQLiteTypes } from './FuseSQLiteType';
import {
    ByteOrder,
    DOUBLE_SIZE,
    FuseContext,
    FuseError,
    INT32_SIZE,
    INT8_SIZE,
    Platform,
    UINT16_MAX,
    UINT32_MAX,
    UINT8_MAX,
    Buffer,
    INT64_SIZE,
    INT16_SIZE,
    INT32_MAX
} from '@btfuse/core';

const TAG: string = 'FuseSQLitePacketBuilder';

/**
 * Builds a packet in binary form. Structure as follows:
 * 
 * [ByteOrder uint8]
 * [DB Handle (uint64)]
 * [SQL Length (uint32)] [SQL String (UTF-8)]
 * [KV Count (uint16)] 
 * [
 *   [Key Length (uint8)] [Key (UTF-8)]
 *   [Type (uint8)] 
 *   [Value Length (int32)] [Value]
 * ] x KV Count
 */
export class FuseSQLitePacketBuilder {
    private $context: FuseContext;
    private $bo: ByteOrder;

    public constructor(context: FuseContext) {
        this.$context = context;
        
        if (this.$context.getPlatform() === Platform.ANDROID) {
            this.$bo = ByteOrder.BE;
        }
        else {
            this.$bo = ByteOrder.LE;
        }
    }

    public async build(connection: FuseSQLiteConnection, query: FuseSQLiteQuery<Record<string, TFuseSupportedSQLiteTypes>, unknown>): Promise<Blob> {
        let sql: string = query.getSQL();

        if (sql.length > UINT32_MAX) {
            throw new FuseError(TAG, `SQL too big (Max ${UINT32_MAX} length)`);
        }

        let useLittleEndian: boolean = this.$bo === ByteOrder.LE;

        let handle: bigint = BigInt(connection.getHandle());

        let sqlLen: number = Buffer.byteLength(sql, 'utf-8');

        let sqlBuffer: Buffer = Buffer.allocUnsafe(sqlLen + INT8_SIZE + INT32_SIZE + INT64_SIZE + INT16_SIZE);
        let pos: number = sqlBuffer.writeUInt8(this.$bo);

        if (useLittleEndian) {
            pos = sqlBuffer.writeBigUInt64LE(handle, pos);
            pos = sqlBuffer.writeUInt32LE(sqlLen, pos);
        }
        else {
            pos = sqlBuffer.writeBigUInt64BE(handle, pos);
            pos = sqlBuffer.writeUInt32BE(sqlLen, pos);
        }

        pos += sqlBuffer.write(sql, pos, 'utf-8');

        let params: Record<string, TFuseSupportedSQLiteTypes> | null = query.getParameters();
        let kvCount: number = 0;

        if (params !== null) {
            kvCount = Object.keys(params).length;
        }

        if (kvCount > UINT16_MAX) {
            throw new FuseError(TAG, `Too many parameters (Max ${UINT16_MAX} key/value pairs)`);
        }

        if (useLittleEndian) {
            pos = sqlBuffer.writeUInt16LE(kvCount, pos);
        }
        else {
            pos = sqlBuffer.writeUInt16BE(kvCount, pos);
        }

        let paramBuffers: Buffer[] = [];

        for (let key in params) {
            let value: TFuseSupportedSQLiteTypes = params[key];
            let keyLen: number = Buffer.byteLength(key, 'utf-8');

            if (keyLen > UINT8_MAX) {
                throw new FuseError(TAG, `Key length too big (max ${UINT8_MAX})`);
            }

            let valueSize: number = 0;
            let valueBuffer: Buffer;
            let dataType: FuseSQLiteType = FuseSQLiteType.NULL;
            
            if (typeof value === 'string') {
                valueBuffer = Buffer.from(value, 'utf-8');
                valueSize = valueBuffer.byteLength;
                dataType = FuseSQLiteType.TEXT;
            }
            else if (typeof value === 'number') {
                valueBuffer = Buffer.allocUnsafe(DOUBLE_SIZE);
                if (useLittleEndian) {
                    valueBuffer.writeDoubleLE(value);
                }
                else {
                    valueBuffer.writeDoubleBE(value);
                }
                valueSize = DOUBLE_SIZE;
                dataType = FuseSQLiteType.REAL;
            }
            else if (value instanceof Blob) {
                valueSize = value.size;
                valueBuffer = Buffer.from(await value.arrayBuffer());
                dataType = FuseSQLiteType.BLOB;
            }
            else if (value === null) {
                valueSize = 0;
                valueBuffer = Buffer.alloc(1);
                dataType = FuseSQLiteType.NULL;
            }

            let kvBuffer: Buffer = Buffer.allocUnsafe(INT8_SIZE + INT8_SIZE + INT32_SIZE + keyLen);
            
            let pos: number = kvBuffer.writeUInt8(keyLen, 0);
            pos += kvBuffer.write(key, pos, 'utf-8');
            pos = kvBuffer.writeUInt8(dataType, pos);
            
            if (useLittleEndian) {
                pos = kvBuffer.writeInt32LE(valueSize, pos);
            }
            else {
                pos = kvBuffer.writeInt32BE(valueSize, pos);
            }
            
            kvBuffer = Buffer.concat([kvBuffer, valueBuffer]);

            paramBuffers.push(kvBuffer);
        }

        let payload: Blob = new Blob(Array.prototype.concat([sqlBuffer], paramBuffers), {
            type: 'application/octet-stream'
        });

        if (payload.size > INT32_MAX) {
            throw new FuseError(TAG, `SQLite Query Payload exceeds maximum size (${INT32_MAX})`);
        }

        return payload;
    }
}
