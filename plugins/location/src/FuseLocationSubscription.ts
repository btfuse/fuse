
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
    FuseError,
    FusePermissionGrantResult,
    TFuseSerializable
} from '@btfuse/core';
import { FuseLocationAccuracy } from './FuseLocationAccuracy';
import {
    TFuseGeolocationPoint
} from './TFuseGeolocationPoint';
import { IFuseLocationAvailabilityEvent } from './IFuseLocationAvailabilityEvent';
import { IFuseLocationUpdateEvent } from './IFuseLocationUpdateEvent';
import { FuseLocationEventType } from './FuseLocationEventType';
import { IFuseLocationSettingsState } from './IFuseLocationSettingsState';
import { FuseLocationPlugin } from './FuseLocationPlugin';

interface __IFuseLocationSubscriptionOptions {
    accuracy: FuseLocationAccuracy;
    interval: number;
    subscriptionID?: string;
}

export type IFuseLocationSubscriptionOptions = TFuseSerializable<__IFuseLocationSubscriptionOptions>;

export class FuseLocationSubscriptionOptionsBuilder {
    private $accuracy: FuseLocationAccuracy;
    private $interval: number;

    public constructor() {
        this.$accuracy = FuseLocationAccuracy.COARSE;
        this.$interval = 1000;
    }

    /**
     * Sets the desired accuracy.
     * 
     * Whether this is honoured depends if the user grants the appropriate permission.
     * 
     * @default FuseLocationAccuracy.COARSE
     * @param accuracy 
     * @returns 
     */
    public setAccuracy(accuracy: FuseLocationAccuracy): FuseLocationSubscriptionOptionsBuilder {
        this.$accuracy = accuracy;
        return this;
    }

    /**
     * The interval to receive GPS points. This acts like a hint but events
     * may come quicker or slower than the desired interval. Several deciding factors
     * including but not limited to other services also using GPS and the GPS health.
     * 
     * @default 1000
     * @param interval 
     * @returns 
     */
    public setInterval(interval: number): FuseLocationSubscriptionOptionsBuilder {
        this.$interval = interval;
        return this;
    }

    public build(): IFuseLocationSubscriptionOptions {
        return {
            accuracy: this.$accuracy,
            interval: this.$interval
        };
    }
}

export type TFuseLocationHandler = (point: Readonly<TFuseGeolocationPoint>[]) => void;

export class FuseLocationSubscription {
    private $plugin: FuseLocationPlugin;
    private $callbacks: TFuseLocationHandler[];
    private $desiredAccuracy: FuseLocationAccuracy;
    private $grants: FusePermissionGrantResult<FuseLocationAccuracy>;
    private $id: string;
    private $options: IFuseLocationSubscriptionOptions;

    public constructor(plugin: FuseLocationPlugin, id: string, options: IFuseLocationSubscriptionOptions, grantResult: FusePermissionGrantResult<FuseLocationAccuracy>) {
        this.$plugin = plugin;
        this.$id = id;
        this.$callbacks = [];
        this.$options = options;
        this.$grants = grantResult;
    }

    public getID(): string {
        return this.$id;
    }

    public isAuthorized(): boolean {
        return this.$grants.isGranted(this.$desiredAccuracy);
    }

    public register(cb: TFuseLocationHandler): void {
        this.$callbacks.push(cb);
    }

    public unregister(cb: TFuseLocationHandler): void {
        let idx: number = this.$callbacks.indexOf(cb);
        if (idx > -1) {
            this.$callbacks.splice(idx, 1);
        }
    }

    public notify(event: IFuseLocationAvailabilityEvent | IFuseLocationUpdateEvent): void {
        if (event.type === FuseLocationEventType.LOCATION) {
            for (let i: number = 0; i < this.$callbacks.length; i++) {
                let cb: TFuseLocationHandler = this.$callbacks[i];
                try {
                    cb(event.data);
                }
                catch(ex) {
                    this.$plugin.getContext().getLogger().error("TFuseLocationHandler error", FuseError.wrap(ex));
                }
            }
        }
        else {
            this.$plugin.getContext().getLogger().info("Received unhandled Availability event");
            console.log(event);
        }
    }

    public async assertSettings(): Promise<IFuseLocationSettingsState> {
        return await this.$plugin.assertSettings({
            ...this.$options,
            subscriptionID: this.getID()
        });
    }

    public async release(): Promise<void> {
        await this.$plugin.unsubscribe(this);
    }
};
