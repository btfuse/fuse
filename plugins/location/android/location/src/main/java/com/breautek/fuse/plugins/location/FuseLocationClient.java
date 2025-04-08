
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

package com.breautek.fuse.plugins.location;

import android.os.Looper;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;

import com.breautek.fuse.FuseContext;

public class FuseLocationClient {
    private final String $id;
    private final FusedLocationProviderClient $client;
    private final LocationCallback $callback;

    public FuseLocationClient(FuseContext context, LocationRequest settings, LocationCallback callback) throws SecurityException {
        $id = java.util.UUID.randomUUID().toString();
        $callback = callback;
        $client = LocationServices.getFusedLocationProviderClient(context.getActivityContext());
        $client.requestLocationUpdates(settings, callback, Looper.getMainLooper());
    }

    public String getID() {
        return $id;
    }

    public void stop() {
        $client.removeLocationUpdates($callback);
    }
}
