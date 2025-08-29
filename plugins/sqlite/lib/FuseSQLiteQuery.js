"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuseSQLiteQuery = void 0;
class FuseSQLiteQuery {
    constructor(input) {
        this.$input = input;
    }
    getParameters() {
        return this.$input;
    }
    async query(connection) {
        return await connection.getContext().query(connection, this);
    }
}
exports.FuseSQLiteQuery = FuseSQLiteQuery;
//# sourceMappingURL=FuseSQLiteQuery.js.map