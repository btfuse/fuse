"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuseSQLitePacketBuilder = void 0;
const FuseSQLiteType_1 = require("./FuseSQLiteType");
const core_1 = require("@btfuse/core");
const TAG = 'FuseSQLitePacketBuilder';
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
class FuseSQLitePacketBuilder {
    constructor(context) {
        this.$context = context;
        if (this.$context.getPlatform() === core_1.Platform.ANDROID) {
            this.$bo = core_1.ByteOrder.BE;
        }
        else {
            this.$bo = core_1.ByteOrder.LE;
        }
    }
    async build(connection, query) {
        let sql = query.getSQL();
        if (sql.length > core_1.UINT32_MAX) {
            throw new core_1.FuseError(TAG, `SQL too big (Max ${core_1.UINT32_MAX} length)`);
        }
        let useLittleEndian = this.$bo === core_1.ByteOrder.LE;
        let handle = BigInt(connection.getHandle());
        let sqlLen = core_1.Buffer.byteLength(sql, 'utf-8');
        let sqlBuffer = core_1.Buffer.allocUnsafe(sqlLen + core_1.INT8_SIZE + core_1.INT32_SIZE + core_1.INT64_SIZE + core_1.INT16_SIZE);
        let pos = sqlBuffer.writeUInt8(this.$bo);
        if (useLittleEndian) {
            pos = sqlBuffer.writeBigUInt64LE(handle, pos);
            pos = sqlBuffer.writeUInt32LE(sqlLen, pos);
        }
        else {
            pos = sqlBuffer.writeBigUInt64BE(handle, pos);
            pos = sqlBuffer.writeUInt32BE(sqlLen, pos);
        }
        pos += sqlBuffer.write(sql, pos, 'utf-8');
        let params = query.getParameters();
        let kvCount = 0;
        if (params !== null) {
            kvCount = Object.keys(params).length;
        }
        if (kvCount > core_1.UINT16_MAX) {
            throw new core_1.FuseError(TAG, `Too many parameters (Max ${core_1.UINT16_MAX} key/value pairs)`);
        }
        if (useLittleEndian) {
            pos = sqlBuffer.writeUInt16LE(kvCount, pos);
        }
        else {
            pos = sqlBuffer.writeUInt16BE(kvCount, pos);
        }
        let paramBuffers = [];
        for (let key in params) {
            let value = params[key];
            let keyLen = core_1.Buffer.byteLength(key, 'utf-8');
            if (keyLen > core_1.UINT8_MAX) {
                throw new core_1.FuseError(TAG, `Key length too big (max ${core_1.UINT8_MAX})`);
            }
            let valueSize = 0;
            let valueBuffer;
            let dataType = FuseSQLiteType_1.FuseSQLiteType.NULL;
            if (typeof value === 'string') {
                valueBuffer = core_1.Buffer.from(value, 'utf-8');
                valueSize = valueBuffer.byteLength;
                dataType = FuseSQLiteType_1.FuseSQLiteType.TEXT;
            }
            else if (typeof value === 'number') {
                valueBuffer = core_1.Buffer.allocUnsafe(core_1.DOUBLE_SIZE);
                if (useLittleEndian) {
                    valueBuffer.writeDoubleLE(value);
                }
                else {
                    valueBuffer.writeDoubleBE(value);
                }
                valueSize = core_1.DOUBLE_SIZE;
                dataType = FuseSQLiteType_1.FuseSQLiteType.REAL;
            }
            else if (value instanceof Blob) {
                valueSize = value.size;
                valueBuffer = core_1.Buffer.from(await value.arrayBuffer());
                dataType = FuseSQLiteType_1.FuseSQLiteType.BLOB;
            }
            else if (value === null) {
                valueSize = 0;
                valueBuffer = core_1.Buffer.alloc(1);
                dataType = FuseSQLiteType_1.FuseSQLiteType.NULL;
            }
            let kvBuffer = core_1.Buffer.allocUnsafe(core_1.INT8_SIZE + core_1.INT8_SIZE + core_1.INT32_SIZE + keyLen);
            let pos = kvBuffer.writeUInt8(keyLen, 0);
            pos += kvBuffer.write(key, pos, 'utf-8');
            pos = kvBuffer.writeUInt8(dataType, pos);
            if (useLittleEndian) {
                pos = kvBuffer.writeInt32LE(valueSize, pos);
            }
            else {
                pos = kvBuffer.writeInt32BE(valueSize, pos);
            }
            kvBuffer = core_1.Buffer.concat([kvBuffer, valueBuffer]);
            paramBuffers.push(kvBuffer);
        }
        let payload = new Blob(Array.prototype.concat([sqlBuffer], paramBuffers), {
            type: 'application/octet-stream'
        });
        if (payload.size > core_1.INT32_MAX) {
            throw new core_1.FuseError(TAG, `SQLite Query Payload exceeds maximum size (${core_1.INT32_MAX})`);
        }
        return payload;
    }
}
exports.FuseSQLitePacketBuilder = FuseSQLitePacketBuilder;
//# sourceMappingURL=FuseSQLitePacketBuilder.js.map