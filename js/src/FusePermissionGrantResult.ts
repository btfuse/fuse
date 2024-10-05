

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

import {IFuseGrantResult} from './IFuseGrantResult';
import {FusePermissionState} from './FusePermissionState';

export class FusePermissionGrantResult<TSupportedPermission extends number = number> {
    private $results: IFuseGrantResult<TSupportedPermission>;

    public constructor(results: IFuseGrantResult<TSupportedPermission>) {
        this.$results = results;
    }

    public isGranted(permission: TSupportedPermission): boolean {
        return this.$results[permission] === FusePermissionState.GRANTED;
    }

    public isAllGranted(): boolean {
        for (const i in this.$results) {
            if (this.$results[i] !== FusePermissionState.GRANTED) {
                return false;
            }
        }

        return true;
    }

    public rejectJustifications(): void {
        for (const i in this.$results) {
            if (this.$results[i] === FusePermissionState.REQUIRES_JUSTIFICATION) {
                this.$results[i] = FusePermissionState.DENIED;
            }
        }
    }

    public shouldJustify(): boolean {
        for (const i in this.$results) {
            if (this.$results[i] === FusePermissionState.REQUIRES_JUSTIFICATION) {
                return true;
            }
        }

        return false;
    }
}
