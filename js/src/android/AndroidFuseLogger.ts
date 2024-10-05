
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

import { INativeLogEntry } from '../IFuseLogger';
import {FuseLogger} from '../FuseLogger';
import {FuseLoggerLevel} from '../FuseLoggerLevel';
import { FuseCallbackManager } from '../FuseCallbackManager';

export class AndroidFuseLogger extends FuseLogger {
    protected override _logToNative(level: FuseLoggerLevel, message: string): void {
        window.BTFuseNative.log(level, message);
    }

    protected override _registerNativeCalblack(): void {
        window.BTFuseNative.setLogCallback(FuseCallbackManager.getInstance().createCallback((payload: string) => {
            let entry: INativeLogEntry = null;
            try {
                entry = JSON.parse(payload);
            }
            catch (ex) {
                return;
            }

            this._onNativeLogEntry(entry);
        }));
    }
}
