
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

import { FuseLogger } from "./FuseLogger";
import { IFuseLogger } from "./IFuseLogger";
import { Platform } from "./Platform";
import {IOSFuseLogger} from './ios/IOSFuseLogger';
import {AndroidFuseLogger} from './android/AndroidFuseLogger';

/**
 * A default logger factory for creating loggers for the given platform.
 */
export class FuseLoggerFactory {
    private $platform: Platform;

    /**
     * 
     * @param platform - The current Platform in this runtime environment
     */
    public constructor(platform: Platform) {
        this.$platform = platform;
    }

    /**
     * Creates a FuseLogger for the current Platform.
     * 
     * @returns A logger instance   
     */
    public create(): IFuseLogger {
        switch (this.$platform) {
            case Platform.IOS:
                return new IOSFuseLogger();
            case Platform.ANDROID:
                return new AndroidFuseLogger();
            case Platform.TEST:
                return new FuseLogger();
        }
    }
}
