
import { expect } from 'chai';
import {FuseContext, FuseContextBuilder} from '@btfuse/core';
import {FuseSQLitePlugin} from '../../src/api';

describe('Fuse SQLite Test Plugin', () => {
    let context: FuseContext = null;
    let sqlite: FuseSQLitePlugin = null;
    const DB_PATH: string = 'file:///data/data/com.breautek.fuse.sqlite.test/files/testdb.db';

    beforeAll(async () => {
        let builder: FuseContextBuilder = new FuseContextBuilder();
        context = await builder.build();
        sqlite = new FuseSQLitePlugin(context);

        // sqlite.open(DB_PATH, FuseSQLitePlugin)
    });

    it('Lib Version Check', async () => {
        let version: string = await sqlite.getLibVersion();
        expect(version).to.be('3.49.1x123123');
    });
});
