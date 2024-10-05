
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

import { ContentType } from './ContentType';
import { FuseAPIResponse } from './FuseAPIResponse';
import { FuseError } from './FuseError';
import {TAPIBridgeFunction} from './FusePlugin';
import {IFusePermissionRequest} from './IFusePermissionRequest';
import { TFuseSerializable } from './TSerializable';
import {FusePermissionGrantResult} from './FusePermissionGrantResult';

/**
 * Invoked to handle when permission justification is necessary.
 * 
 * This is an android concept, so it will only be invoked on Android devices,
 * as iOS has justification text embedded into the actual permission prompt.
 * 
 * User dialog should be displayed to explain why the app wants to use the permission.
 * Android recommends giving the user the ability to accept or deny at this time, if the user deny,
 * then resolve the promise will false.
 * 
 * Return true if the permission request should proceed.
 */
export type TFuseJustificationHandler = () => Promise<boolean>;

interface __IPermissionRequestArguments<T extends number> {
    permissionSet: T[];
    isJustified: boolean;
}

export type TFusePermissionRequestArguments<T extends number> = TFuseSerializable<__IPermissionRequestArguments<T>>;

export type TFuseAPIPermissionRequest<T extends number = number> = TAPIBridgeFunction<ContentType.JSON, TFusePermissionRequestArguments<T>>;


/**
 * Abstract class to handle permission request.
 * Concrete classes should implement the protected _request method to call on their
 * permission request Fuse API.
 */
export class FusePermissionRequest<TSupportedPermission extends number> implements IFusePermissionRequest<TSupportedPermission> {
    private static readonly TAG: string = 'PermissionRequest';

    private $api: TFuseAPIPermissionRequest<TSupportedPermission>;
    private $permissionSet: TSupportedPermission[];
    private $justificationHandler: TFuseJustificationHandler | null;

    public constructor(apiBridge: TFuseAPIPermissionRequest<TSupportedPermission>, permissionSet: TSupportedPermission[], justificationHandler: TFuseJustificationHandler = null) {
        if (!permissionSet || (permissionSet && permissionSet.length === 0)) {
            throw new FuseError(FusePermissionRequest.TAG, 'At least one permission is required');
        }

        this.$api = apiBridge;
        this.$permissionSet = permissionSet;
        this.$justificationHandler = justificationHandler;
    }

    public getPermissionSet(): TSupportedPermission[] {
        return this.$permissionSet;
    }

    private async $request(isJustified: boolean): Promise<FusePermissionGrantResult<TSupportedPermission>> {
        const response: FuseAPIResponse = await this.$api(ContentType.JSON, {
            permissionSet: this.getPermissionSet(),
            isJustified: isJustified
        });

        if (response.isError()) {
            throw await response.readAsError();
        }

        return new FusePermissionGrantResult(await response.readAsJSON());
    }

    private async $onJustificationRequest(): Promise<boolean> {
        if (!this.$justificationHandler) {
            console.warn('Permission requires justification, but this request has no TJustificationHandler');
            return false;
        }

        return await this.$justificationHandler();
    }
    
    public async request(): Promise<FusePermissionGrantResult<TSupportedPermission>> {
        let results: FusePermissionGrantResult<TSupportedPermission> = await this.$request(false);

        if (results.shouldJustify()) {
            if (await this.$onJustificationRequest()) {
                results = await this.$request(true);
            }
            else {
                results.rejectJustifications();
            }
        }

        return results;
    }
}
