
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

import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FuseError;
import com.breautek.fuse.FusePlugin;
import com.breautek.fuse.FuseAPIPacket;
import com.breautek.fuse.FuseAPIResponse;
import com.breautek.fuse.nativeview.NativeOverlay;
import com.breautek.fuse.nativeview.NativeRect;
import com.breautek.fuse.nativeview.NativeView;
import com.breautek.fuse.nativeview.NativeViewPlugin;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.io.IOException;
import java.util.Map;

public class GoogleMapsPlugin extends FusePlugin {
    public static final String TAG = "GoogleMapsPlugin";
    private final NativeViewPlugin $nativeViewAPI;
    private final HashMap<String, MapComponent> $maps;

    public GoogleMapsPlugin(FuseContext context, NativeViewPlugin nvAPI) {
        super(context);
        $nativeViewAPI = nvAPI;
        $maps = new HashMap<>();
    }

    @Override
    public String getID() {
        return "FuseGoogleMaps";
    }

    @Override
    protected void _initHandles() {
        this.attachHandler("/create", new APIHandler<FusePlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                JSONObject params = packet.readAsJSONObject();

                String viewID = params.getString("node");

                NativeView nview = $nativeViewAPI.getViewByID(viewID);
                if (nview == null) {
                    response.send(new FuseError(TAG, 0, "No view found at " + viewID));
                    return;
                }

                this.plugin.getContext().runOnMainThread(() -> {
                    MapComponent gmap = new MapComponent(this.plugin.getContext(), null);
                    synchronized ($maps) {
                        $maps.put(viewID, gmap);
                    }

                    nview.setContent(gmap.getView());
//                    nview.addView(gmap.getView());
                    response.send();
                });

//
//                String callbackID = params.getString("callbackID");
//                JSONObject jRect = params.getJSONObject("rect");
//
//                NativeRect rect = new NativeRect(
//                        (float) jRect.getDouble("x"),
//                        (float) jRect.getDouble("y"),
//                        (float) jRect.getDouble("w"),
//                        (float) jRect.getDouble("h")
//                );
//
//                JSONObject jOverlay = params.optJSONObject("overlay");
//                NativeOverlay.WebviewBuilder overlayBuilder = null;
//
//                if (jOverlay != null) {
//                    overlayBuilder = new NativeOverlay.WebviewBuilder(this.plugin.getContext());
//                    if (jOverlay.has("html")) {
//                        overlayBuilder.setHTMLString(jOverlay.getString("html"));
//                    }
//                    else if (jOverlay.has("file")) {
//                        overlayBuilder.setFile(jOverlay.getString("file"));
//                    }
//                    else {
//                        this.plugin.getContext().getLogger().warn(TAG, "Overlay requires HTML or a file path.");
//                        overlayBuilder = null;
//                    }
//                }
//
//                NativeView nview = $nativeViewAPI.createView(rect, overlayBuilder);
//
//                MapComponent gmap = new MapComponent(this.plugin.getContext(), callbackID);
//                synchronized ($maps) {
//                    $maps.put(nview.getID(), gmap);
//                }
//
//                nview.addView(gmap.getView());
//
//                response.send(nview.getID());
            }
        });
    }

    @Override
    public void onResume() {
        synchronized ($maps) {
            for (Map.Entry<String, MapComponent> entry : $maps.entrySet()) {
                MapComponent map = entry.getValue();
                map.onResume();
            }
        }
    }

    @Override
    public void onPause() {
        synchronized ($maps) {
            for (Map.Entry<String, MapComponent> entry : $maps.entrySet()) {
                MapComponent map = entry.getValue();
                map.onPause();
            }
        }
    }

    @Override
    public void onLowMemory() {
        synchronized ($maps) {
            for (Map.Entry<String, MapComponent> entry : $maps.entrySet()) {
                MapComponent map = entry.getValue();
                map.onLowMemory();
            }
        }
    }

    @Override
    public void onDestroy() {
        synchronized ($maps) {
            for (Map.Entry<String, MapComponent> entry : $maps.entrySet()) {
                MapComponent map = entry.getValue();
                map.onDestroy();
            }
        }
    }
}
