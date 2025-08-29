"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuseSQLiteConnection = void 0;
class FuseSQLiteConnection {
    constructor(context, handle) {
        this.$context = context;
        this.$handle = handle;
    }
    /**
     * Gets the native handle
     */
    getHandle() {
        return this.$handle;
    }
    getContext() {
        return this.$context;
    }
}
exports.FuseSQLiteConnection = FuseSQLiteConnection;
//# sourceMappingURL=FuseSQLiteConnection.js.map