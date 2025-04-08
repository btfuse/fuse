
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

import { FuseContext, FuseError, Platform } from "@btfuse/core";
import { FuseLocationPlugin } from "./FuseLocationPlugin";
import { AndroidFuseLocationPlugin } from "./android/AndroidFuseLocationPlugin";
import { IOSFuseLocationPlugin } from "./ios/IOSFuseLocationPlugin";

export class FuseLocationPluginFactory {
    public constructor() {}

    public create(context: FuseContext): FuseLocationPlugin {
        switch (context.getPlatform()) {
            case Platform.ANDROID: return new AndroidFuseLocationPlugin(context);
            case Platform.IOS: return new IOSFuseLocationPlugin(context);
            default: throw new FuseError('FuseLocationPluginFactory', `Unsupported platform: ${context.getPlatform()}`);
        }
    }
}
