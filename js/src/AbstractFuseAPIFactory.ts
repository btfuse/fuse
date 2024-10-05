
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

import {FuseAPI} from './FuseAPI';
import { Platform } from './Platform';

/**
 * An factory class that defines the base signature for creating a FuseAPI bridge object.
 */
export abstract class AbstractFuseAPIFactory {

    /**
     * Implement a create API that returns a FuseAPI for the given Platform
     * 
     * @param platform - The current platform runtime
     */
    public abstract create(platform: Platform): FuseAPI;
}
