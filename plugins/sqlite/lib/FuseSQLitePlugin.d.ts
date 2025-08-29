import { FuseContext, FusePlugin } from '@btfuse/core';
import { FuseSQLiteConnection } from './FuseSQLiteConnection';
import { FuseSQLiteQuery } from './FuseSQLiteQuery';
import { TFuseSupportedSQLiteTypes } from './FuseSQLiteType';
export declare class FuseSQLitePlugin extends FusePlugin {
    private $packetBuilder;
    constructor(context: FuseContext);
    protected _getID(): string;
    /**
     * Gets the underying SQLite library version
     */
    getLibVersion(): Promise<string>;
    open(path: string, flags?: number): Promise<FuseSQLiteConnection>;
    close(connection: FuseSQLiteConnection): Promise<void>;
    query<TResponse>(connection: FuseSQLiteConnection, query: FuseSQLiteQuery<Record<string, TFuseSupportedSQLiteTypes>, TResponse>): Promise<TResponse>;
}
