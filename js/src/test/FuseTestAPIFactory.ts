
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

import {AbstractFuseAPIFactory} from '../AbstractFuseAPIFactory';
import { FuseAPI } from '../FuseAPI';
import { Platform } from '../Platform';
import { FuseTestAPI } from './FuseTestAPI';

export class FuseTestAPIFactory extends AbstractFuseAPIFactory {
    private $cache: FuseTestAPI;

    public constructor() {
        super();
        this.$cache = null;
    }

    public create(platform: Platform): FuseAPI {
        if (this.$cache === null) {
            this.$cache = new FuseTestAPI();
        }
        return this.$cache;
    }
}
