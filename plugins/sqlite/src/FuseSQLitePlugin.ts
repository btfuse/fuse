

import { ContentType, FuseAPIResponse, FuseContext, FusePlugin } from '@btfuse/core';
import { FuseSQLiteConnection } from './FuseSQLiteConnection';
import { FuseSQLiteQuery } from './FuseSQLiteQuery';
import { TFuseSupportedSQLiteTypes } from './FuseSQLiteType';
import { FuseSQLitePacketBuilder } from './FuseSQLitePacketBuilder';

export class FuseSQLitePlugin extends FusePlugin {
    private $packetBuilder: FuseSQLitePacketBuilder;
    
    public constructor(context: FuseContext) {
        super(context);
        this.$packetBuilder = new FuseSQLitePacketBuilder(context);
    }

    protected override _getID(): string {
        return 'FuseSQLite';
    }

    /**
     * Gets the underying SQLite library version
     */
    public async getLibVersion(): Promise<string> {
        let response: FuseAPIResponse = await this._exec('/version');

        if (response.isError()) {
            throw await response.readAsError();
        }

        return await response.readAsText();
    }

    /**
     * @param path 
     * @param flags 
     */
    public async open(path: string, flags?: number): Promise<FuseSQLiteConnection> {
        let response: FuseAPIResponse = await this._exec('/open', ContentType.JSON, {
            path: path,
            flags: flags
        });

        if (response.isError()) {
            throw await response.readAsError();
        }

        let handle: string = await response.readAsText();

        return new FuseSQLiteConnection(this, handle);
    }

    public async close(connection: FuseSQLiteConnection): Promise<void> {
        let response: FuseAPIResponse = await this._exec('/close', ContentType.TEXT, connection.getHandle());
        if (response.isError()) {
            throw await response.readAsError();
        }
    }

    public async query<TResponse>(connection: FuseSQLiteConnection, query: FuseSQLiteQuery<Record<string, TFuseSupportedSQLiteTypes>, TResponse>): Promise<TResponse> {
        let payload: Blob = await this.$packetBuilder.build(connection.getHandle(), query);

        let response: FuseAPIResponse = await this._exec('/query', ContentType.BINARY, payload);

        if (response.isError()) {
            throw await response.readAsError();
        }

        // TODO: Read binary out stream

        //TODO: build up a binary packet structure.
        return null;
    }
}
