
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

export interface IFuseGeolocationProperties {
    /**
     * The estimated horizontal accuracy radius in meters of this location at the 68th percentile confidence level.
     * This means that there is a 68% chance that the true location of the device is within a distance of this
     * uncertainty of the reported location. Another way of putting this is that if a circle with a radius equal to
     * this accuracy is drawn around the reported location, there is a 68% chance that the true location falls within
     * this circle. This accuracy value is only valid for horizontal positioning, and not vertical positioning.
     * 
     * Platform Support:
     *  - iOS
     *  - Android
     */
    horizontalAccuracy: number;

    /**
     * Supported:
     *  - iOS
     *  - Android
     */
    verticalAccuracy: number | null;

    /**
     * The bearing at the time of this location in degrees. Bearing is the horizontal direction of travel of this device
     * and is unrelated to the device orientation. The bearing is guaranteed to be in the range [0, 360).
     * 
     * Will be null if the bearing cannot be calculated. (e.g. the device is stationary).
     * 
     * Platform Support:
     *  - iOS
     *  - Android
     */
    bearing: number | null;

    /**
     * The estimated bearing accuracy in degrees of this location at the 68th percentile confidence level.
     * This means that there is 68% chance that the true bearing at the time of this location falls within
     * bearing +/- this uncertainty.
     * 
     * Null if accuracy is unavailable.
     * 
     * Platform Support:
     *  - iOS
     *  - Android API 26 or later
     */
    bearingAccuracy: number | null;

    /**
     * The time of this fix in milliseconds of elapsed realtime since system boot.
     * This is a monotomic timer which is useful to compare a group of points from the same session, but not across different
     * sessions as their frame of reference may be from a different boot time.
     * 
     * Platform Support:
     *  - Android
     */
    elapsedTime: number | null;

    /**
     * The Unix epoch time of this location fix, in milliseconds since the start of the Unix epoch (00:00:00 January 1, 1970 UTC).
     * There is no guarantee that different locations have times set from the same clock. Locations derived from the GPS are
     * guaranteed to have their time originate from the clock in use by the satellite constellation that provided the fix.
     * Locations derived from other providers may use any clock to set their time, though it is most common to use the device's
     * Unix epoch time system clock (which may be incorrect).
     * 
     * Note that the device's Unix epoch time system clock is not monotonic; it can jump forwards or backwards unpredictably and
     * may be changed at any time by the user, so this time should not be used to order or compare locations. Prefer elapsedTime
     * for that purpose, as the elapsed realtime clock is guaranteed to be monotonic.
     * 
     * On the other hand, this field may be useful for presenting a human-readable time to the user, or as a heuristic for comparing
     * location fixes across reboot or across devices.
     * 
     * Platform Support:
     *  - Android
     *  - iOS
     */
    providerTime: string;

    /**
     * The speed at the time of this location in meters per second. Note that the speed returned here may be more accurate than would
     * be obtained simply by calculating distance / time for sequential positions, such as if the Doppler measurements from GNSS satellites
     * are taken into account.
     * 
     * On iOS however, the speed is simply an instantaneous speed, that is the distance / time between this point and the last given point.
     * 
     * Platform Support:
     *  - Android
     *  - iOS
     */
    speed: number | null;

    /**
     * The estimated speed accuracy in meters per second of this location at the 68th percentile confidence level.
     * This means that there is 68% chance that the true speed at the time of this location falls within
     * `speed` +/- this uncertainty.
     * 
     * Platform Support:
     *  - Android API 26 or later
     *  - iOS
     */
    speedAccuracy: number | null;

    /**
     * The name of the provider associated with this location. iOS doesn't give this information, and thus will always be "unknown"
     * 
     * Platform Support:
     *  - Android
     */
    provider: string | null;

    /**
     * Is true if this location is marked as a mock location. If this location comes from the framework, this indicates
     * that the location was provided by a test location provider, and thus may not be related to the actual location of the device.
     * 
     * On iOS, this will always be true if the app is on a iOS Simulator and false otherwise. There is no actual concept of mock
     * location points on iOS.
     * 
     * Platform Support:
     *  - Android API 31 or later
     */
    mock: boolean | undefined;
}

/**
 * A geolocation point. May have 2 to 3 coordinates, depending if altitude information is available.
 */
export type TFuseGeolocationPoint = GeoJSON.Feature<GeoJSON.Point, IFuseGeolocationProperties>
