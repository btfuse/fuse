
/*
Copyright 2023-2024 Breautek

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

package com.breautek.fuse.googlemaps;

import android.view.View;

import androidx.annotation.NonNull;

import com.breautek.fuse.FuseContext;
import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.CameraPosition;
import com.google.android.gms.maps.model.LatLng;

public class MapComponent implements OnMapReadyCallback {
    private FuseContext $context;
    private MapView $mapView;
    private GoogleMap $map;
    private String $callbackID;

    public MapComponent(FuseContext context, String callbackID) {
        $context = context;
        $callbackID = callbackID;
        $mapView = new MapView($context.getActivityContext());
        $mapView.onCreate(null);
        $mapView.getMapAsync(this);
    }

    public View getView() {
        return $mapView;
    }

    public void onPause() {
        if ($mapView != null) {
            $mapView.onPause();
        }
    }

    public void onResume() {
        if ($mapView != null) {
            $mapView.onResume();
        }
    }

    public void onDestroy() {
        if ($mapView != null) {
            $mapView.onDestroy();
        }
    }

    public void onLowMemory() {
        if ($mapView != null) {
            $mapView.onLowMemory();
        }
    }

    @Override
    public void onMapReady(@NonNull GoogleMap googleMap) {
        googleMap.getUiSettings().setAllGesturesEnabled(true);

        CameraPosition.Builder builder = new CameraPosition.Builder();
        builder.target(new LatLng(46.0965, -64.8007));
        CameraUpdate update = CameraUpdateFactory.newCameraPosition(builder.build());
        googleMap.moveCamera(update);
    }
}
