
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

import {FusePermissionGrantResult} from './FusePermissionGrantResult';

/**
 * An interface to standardize handling permissions
 * @experimental
 */
export interface IFusePermissionRequest<TSupportedPermission extends number = number> {
    /**
     * A list of symbols that would represent the permission to request on the native side.
     * 
     * The implementation should define an enum, union type, or something that declares
     * what permissions it supports requesting.
     * 
     * An implementation should support requesting a grouped set of permissions, which
     * Android may combine into one prompt.
     * 
     * iOS will generally use one permission.
     */
    getPermissionSet(): TSupportedPermission[];

    /**
     * Request the permission set
     * Will resolve if all permissions in the set is granted.
     * Rejects otherwise.
     */
    request(): Promise<FusePermissionGrantResult<TSupportedPermission>>;
}
