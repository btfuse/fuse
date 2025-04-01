
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

import { AbstractFuseAPIFactory } from './AbstractFuseAPIFactory';
import { Platform } from "./Platform";
import {
    FuseRuntime,
    IRuntimeInfo,
    TPauseCallbackHandler,
    TResumeCallbackHandler
} from './plugins/FuseRuntime';
import {Version} from './Version';
import {IFuseLogger} from './IFuseLogger';
import { FuseMemoryStore } from './plugins/FuseMemoryStore';

/**
 * A context class that holds Fuse Framework state
 */
export abstract class FuseContext {
    private $platform: Platform;
    private $runtime: FuseRuntime;
    private $runtimeVersion: Version;
    private $runtimeInfo: IRuntimeInfo;
    private $defaultAPIFactory: AbstractFuseAPIFactory;
    private $logger: IFuseLogger;
    private $memStore: FuseMemoryStore;

    public constructor(
        platform: Platform,
        apiFactory: AbstractFuseAPIFactory,
        logger: IFuseLogger
    ) {
        this.$platform = platform;
        this.$logger = logger;
        
        this.$runtimeVersion = null;
        this.$defaultAPIFactory = apiFactory;
        this.$runtime = new FuseRuntime(this);
        this.$memStore = new FuseMemoryStore(this);
    }

    public getLogger(): IFuseLogger {
        return this.$logger;
    }

    public getDefaultAPIFactory(): AbstractFuseAPIFactory {
        return this.$defaultAPIFactory;
    }

    public getPlatform(): Platform {
        return this.$platform;
    }

    protected _getRuntime(): FuseRuntime {
        return this.$runtime;
    }

    private async $getRuntimeInfo(): Promise<IRuntimeInfo> {
        if (!this.$runtimeInfo) {
            this.$runtimeInfo = await this.$runtime.getInfo();
        }

        return this.$runtimeInfo;
    }

    public async getPlatformVersion(): Promise<Version> {
        if (!this.$runtimeVersion) {
            const info: IRuntimeInfo = await this.$getRuntimeInfo();
            this.$runtimeVersion = Version.parseVersionString(info.version);
        }
        
        return this.$runtimeVersion;
    }

    public async isDebugMode(): Promise<boolean> {
        const info: IRuntimeInfo = await this.$getRuntimeInfo();
        return info.debugMode;
    }

    public async registerPauseHandler(callback: TPauseCallbackHandler): Promise<string> {
        return await this.$runtime.registerPauseHandler(callback);
    }

    public async unregisterPauseHandler(callbackID: string): Promise<void> {
        return await this.$runtime.unregisterPauseHandler(callbackID);
    }

    public async registerResumeHandler(callback: TResumeCallbackHandler): Promise<string> {
        return await this.$runtime.registerResumeHandler(callback);
    }

    public async unregisterResumeHandler(callbackID: string): Promise<void> {
        return await this.$runtime.unregisterResumeHandler(callbackID);
    }

    public getMemoryStore(): FuseMemoryStore {
        return this.$memStore;
    }

    public abstract onWebviewReady(): Promise<void>;
}
