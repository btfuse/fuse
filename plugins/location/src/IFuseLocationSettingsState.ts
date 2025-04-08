
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

export interface IFuseLocationSettingsState {
    /**
     * Whether BLE is present on the device.
     */
    bluetoothPresent: boolean;

    /**
     * Whether BLE is enabled and is usable by the app.
     */
    bluetoothUsable: boolean;

    /**
     * Whether GPS provider is present on the device.
     */
    gpsPresent: boolean;

    /**
     * Whether GPS provider is enabled and is usable by the app.
     */
    gpsUsable: boolean;

    /**
     * Whether location is present on the device.
     * This method returns true when either GPS or network location provider is present.
     */
    locationPresent: boolean;

    /**
     * Whether location is enabled and is usable by the app.
     * This method returns true when either GPS or network location provider is usable.
     */
    locationUsable: boolean;

    /**
     * Whether network location provider is present on the device.
     */
    networkPresent: boolean;

    /**
     * Whether network location provider is enabled and usable by the app.
     */
    networkUsable: boolean;
}
