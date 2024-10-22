
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

package com.breautek.fuse.nativeview.handlers;

import com.breautek.fuse.FuseAPIPacket;
import com.breautek.fuse.FuseAPIResponse;
import com.breautek.fuse.FusePlugin;
import com.breautek.fuse.nativeview.NativeOverlay;
import com.breautek.fuse.nativeview.NativeRect;
import com.breautek.fuse.nativeview.NativeView;
import com.breautek.fuse.nativeview.NativeViewPlugin;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class CreateHandler extends FusePlugin.APIHandler<NativeViewPlugin> {
    public CreateHandler(NativeViewPlugin plugin) {
        super(plugin);
    }

    @Override
    public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
        final JSONObject params = packet.readAsJSONObject();
        final JSONObject jRect = params.getJSONObject("rect");
        final NativeRect rect = NativeRect.fromJSONObject(jRect);
        final JSONObject options = params.optJSONObject("options");

        NativeOverlay.WebviewBuilder strongOverlayBuilder = null;
        if (options != null) {
            if (options.has("overlayHTML") || options.has("overlayFile")) {
                strongOverlayBuilder = new NativeOverlay.WebviewBuilder(this.plugin.getContext());

                if (options.has("overlayHTML")) {
                    strongOverlayBuilder.setHTMLString(options.getString("overlayHTML"));
                }
                else if (options.has("overlayFile")) {
                    strongOverlayBuilder.setFile(options.getString("overlayFile"));
                }
                else {
                    this.plugin.getContext().getLogger().warn(this.plugin.getID(), "Overlay requires HTML or a file path.");
                    strongOverlayBuilder = null;
                }
            }
        }

        final NativeOverlay.WebviewBuilder overlayBuilder = strongOverlayBuilder;

        this.plugin.getContext().runOnMainThread(() -> {
            final NativeView nview = new NativeView(this.plugin.getContext(), rect, overlayBuilder);
            this.plugin.addView(nview);

//            this.plugin.getContainer().addView(nview.getView());
            this.plugin.getContainer().addView(nview);
            response.send(nview.getID());
        });
    }
}
