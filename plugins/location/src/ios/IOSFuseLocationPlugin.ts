
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

import {
    ContentType,
    FuseAPIResponse,
    FuseError,
    FusePermissionGrantResult,
    IFuseGrantResult,
    TFuseJustificationHandler
} from "@btfuse/core";
import { FuseLocationPlugin } from "../FuseLocationPlugin";
import { FuseLocationSubscription, IFuseLocationSubscriptionOptions } from "../FuseLocationSubscription";
import { IFuseLocationSettingsState } from "../IFuseLocationSettingsState";
import { FuseLocationAccuracy } from "../FuseLocationAccuracy";

interface ISubscriptionResponse {
    subscriptionID: string;
    grants: IFuseGrantResult<FuseLocationAccuracy>;
}

export class IOSFuseLocationPlugin extends FuseLocationPlugin {
    public override async assertSettings(options: IFuseLocationSubscriptionOptions): Promise<IFuseLocationSettingsState> {
        let res: FuseAPIResponse = await this._exec('/assertSettings', ContentType.JSON, options);
        return res.readAsJSON();
    }
    
    protected override async _subscribe(options: IFuseLocationSubscriptionOptions, justificationHandler: TFuseJustificationHandler): Promise<FuseLocationSubscription> {
        let res: FuseAPIResponse = await this._exec('/subscribe', ContentType.JSON, options);

        if (res.isError()) {
            throw await res.readAsError();
        }
        
        let data: ISubscriptionResponse = await res.readAsJSON();

        if (!data.subscriptionID) {
            throw new FuseError('FuseLocation', 'Missing subscription ID from result');
        }

        return new FuseLocationSubscription(this, data.subscriptionID, options, new FusePermissionGrantResult(data.grants));
    }
}
