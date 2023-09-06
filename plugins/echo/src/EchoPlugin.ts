
/*
Copyright 2023 Norman Breau 

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
    ContentType
} from '@nbsfuse/core';

export class EchoPlugin extends FusePlugin {
    protected override _getID(): string {
        return 'echo';
    }

    public async echo(message: string): Promise<string> {
        let r: ArrayBuffer = await this._exec('echo', ContentType.TEXT, message);
        console.log('ECHO RESPONSE', r);
        return await new Blob([r]).text();
    }

    public async subscribe(cb: (data: string) => void): Promise<string> {
        let callbackID: string = this._createCallback((payload: string) => {
            cb(payload);
        });

        await this._exec('subscribe', ContentType.TEXT, callbackID);

        return callbackID;
    }

    public async bigResponse(): Promise<ArrayBuffer> {
        console.log('calling big api');
        let r: ArrayBuffer = await this._exec('big');
        console.log('BIG RESP', r);
        return r;
    }
}
