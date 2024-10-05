
/*
Copyright 2023 Breautek

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {
    FusePlugin,
    FuseTestAPI,
    FuseContext,
    FuseTestContextBuilder
} from '../src/test/api';

class TestPlugin extends FusePlugin {
    public getAPI(): FuseTestAPI {
        return <FuseTestAPI>this._getAPI();
    }

    protected override _getID(): string {
        return 'test-plugin';
    }

    public async doSomething(): Promise<void> {
        await this._exec('do-something');
    }
}

describe('FusePlugin', () => {
    let context: FuseContext = null;
    let plugin: TestPlugin = null;
    let api: FuseTestAPI = null;

    beforeAll(async () => {
        const builder: FuseTestContextBuilder = new FuseTestContextBuilder();
        context = await builder.build();
        plugin = new TestPlugin(context);
        api = plugin.getAPI();
        
        // Don't actually try to make network requests.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jest.spyOn(<any>api, '_doRequest').mockReturnValue(Promise.resolve());
    });

    it('should form proper url', async () => {
        const route: string = await api.buildRoute('test-plugin', '/test-action');
        expect(route).toBe('http://localhost:12345/api/test-plugin/test-action');
    });
});
