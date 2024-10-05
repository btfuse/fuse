
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

import { AbstractFuseAPIFactory } from "./AbstractFuseAPIFactory";
import { AbstractFuseLoggerFactory } from "./AbstractFuseLoggerFactory";
import { FuseAPIFactory } from "./FuseAPIFactory";
import { FuseContext } from "./FuseContext";
import { FuseLoggerFactory } from "./FuseLoggerFactory";
import { FuseLoggerLevel } from "./FuseLoggerLevel";
import { IFuseLogger } from "./IFuseLogger";
import { Platform } from "./Platform";
import { PlatformResolver } from "./PlatformResolver";

export class FuseContextBuilder {
    private $platformResolver: PlatformResolver;
    private $loggerFactory: AbstractFuseLoggerFactory | null;
    private $apiFactory: AbstractFuseAPIFactory | null;

    public constructor() {
        this.$loggerFactory = null;
        this.$apiFactory = null;
        this.$platformResolver = new PlatformResolver();
    }

    public setPlatformResolver(resolver: PlatformResolver): FuseContextBuilder {
        this.$platformResolver = resolver;
        return this;
    }

    public setAPIFactory(factory: AbstractFuseAPIFactory): FuseContextBuilder {
        this.$apiFactory = factory;
        return this;
    }

    public setLoggerFactory(factory: AbstractFuseLoggerFactory): FuseContextBuilder {
        this.$loggerFactory = factory;
        return this;
    }

    protected async _isDebugMode(context: FuseContext): Promise<boolean> {
        return await context.isDebugMode();
    }

    public async build(): Promise<FuseContext> {
        const platform: Platform = this.$platformResolver.resolve();

        let apiFactory: AbstractFuseAPIFactory;
        if (this.$apiFactory) {
            apiFactory = this.$apiFactory;
        }
        else {
            apiFactory = new FuseAPIFactory();
        }

        let loggerFactory: AbstractFuseLoggerFactory;
        if (this.$loggerFactory) {
            loggerFactory = this.$loggerFactory
        }
        else {
            loggerFactory = new FuseLoggerFactory(platform);
        }

        const context: FuseContext = new FuseContext(platform, apiFactory, loggerFactory);

        const isDebugMode: boolean = await this._isDebugMode(context);
        const logger: IFuseLogger = context.getLogger();
        logger.enableNativeBridge(isDebugMode);
        let level: FuseLoggerLevel = logger.getLevel();
        level |= FuseLoggerLevel.DEBUG;
        logger.setLevel(level);

        return context;
    }
}
