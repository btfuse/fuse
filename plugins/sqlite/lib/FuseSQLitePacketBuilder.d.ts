import { FuseSQLiteConnection } from './FuseSQLiteConnection';
import { FuseSQLiteQuery } from './FuseSQLiteQuery';
import { TFuseSupportedSQLiteTypes } from './FuseSQLiteType';
import { FuseContext } from '@btfuse/core';
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
export declare class FuseSQLitePacketBuilder {
    private $context;
    private $bo;
    constructor(context: FuseContext);
    build(connection: FuseSQLiteConnection, query: FuseSQLiteQuery<Record<string, TFuseSupportedSQLiteTypes>, unknown>): Promise<Blob>;
}
