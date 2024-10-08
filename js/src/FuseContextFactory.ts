
/*
Copyright 2024 Breautek

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
import { AndroidFuseContext } from './android/AndroidFuseContext';
import { FuseContext } from './FuseContext';
import { IFuseLogger } from './IFuseLogger';
import { IOSFuseContext } from './ios/IOSFuseContext';
import { Platform } from './Platform';

export class FuseContextFactory {
    public create(platform: Platform, apiFactory: AbstractFuseAPIFactory, logger: IFuseLogger): FuseContext {
        switch (platform) {
            case Platform.ANDROID:
                return new AndroidFuseContext(apiFactory, logger);
            case Platform.IOS:
                return new IOSFuseContext(apiFactory, logger);
            case Platform.TEST: return null;
        }
    }
}
