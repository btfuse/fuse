"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuseSQLitePlugin = void 0;
const core_1 = require("@btfuse/core");
const FuseSQLiteConnection_1 = require("./FuseSQLiteConnection");
const FuseSQLitePacketBuilder_1 = require("./FuseSQLitePacketBuilder");
class FuseSQLitePlugin extends core_1.FusePlugin {
    constructor(context) {
        super(context);
        this.$packetBuilder = new FuseSQLitePacketBuilder_1.FuseSQLitePacketBuilder(context);
    }
    _getID() {
        return 'FuseSQLite';
    }
    /**
     * Gets the underying SQLite library version
     */
    async getLibVersion() {
        let response = await this._exec('/version');
        if (response.isError()) {
            throw await response.readAsError();
        }
        return await response.readAsText();
    }
    async open(path, flags) {
        let response = await this._exec('/open', core_1.ContentType.JSON, {
            path: path,
            flags: flags
        });
        if (response.isError()) {
            throw await response.readAsError();
        }
        let handle = await response.readAsText();
        return new FuseSQLiteConnection_1.FuseSQLiteConnection(this, handle);
    }
    async close(connection) {
        let response = await this._exec('/close', core_1.ContentType.TEXT, connection.getHandle());
        if (response.isError()) {
            throw await response.readAsError();
        }
    }
    async query(connection, query) {
        let payload = await this.$packetBuilder.build(connection, query);
        let response = await this._exec('/query', core_1.ContentType.BINARY, payload);
        if (response.isError()) {
            throw await response.readAsError();
        }
        // TODO: Read binary out stream
        //TODO: build up a binary packet structure.
        return null;
    }
}
exports.FuseSQLitePlugin = FuseSQLitePlugin;
//# sourceMappingURL=FuseSQLitePlugin.js.map