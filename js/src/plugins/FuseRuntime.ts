
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

import { ContentType } from '../ContentType';
import { FuseContext } from '../FuseContext';
import {FusePlugin} from '../FusePlugin';
import {FuseAPIResponse} from '../FuseAPIResponse';

export type TPauseCallbackHandler = () => void;
export type TResumeCallbackHandler = () => void;

export interface IRuntimeInfo {
    version: string;
    debugMode: boolean;
}

export class FuseRuntime extends FusePlugin {
    private $callbackIDs: string[];

    public constructor(context: FuseContext) {
        super(context);
        this.$callbackIDs = [];
    }

    protected override _getID(): string {
        return 'FuseRuntime';
    }
    
    public async getInfo(): Promise<IRuntimeInfo> {
        const data: FuseAPIResponse = await this._exec('/info');
        return await data.readAsJSON();
    }

    public async registerPauseHandler(cb: TPauseCallbackHandler): Promise<string> {
        const cbID: string = this._createCallback((payload: string) => {
            cb();
        });

        await this._exec('/registerPauseHandler', ContentType.TEXT, cbID);
        this.$callbackIDs.push(cbID);

        return cbID;
    }

    public async unregisterPauseHandler(callbackID: string): Promise<void> {
        await this._exec('/unregisterPauseHandler', ContentType.TEXT, callbackID);
    }

    public async registerResumeHandler(cb: TResumeCallbackHandler): Promise<string> {
        const cbID: string = this._createCallback((payload: string) => {
            cb();
        });

        await this._exec('/registerResumeHandler', ContentType.TEXT, cbID);
        this.$callbackIDs.push(cbID);

        return cbID;
    }

    public async unregisterResumeHandler(callbackID: string): Promise<void> {
        await this._exec('/unregisterResumeHandler', ContentType.TEXT, callbackID);
    }
}
