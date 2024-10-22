
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
import com.breautek.fuse.nativeview.NativeRect;
import com.breautek.fuse.nativeview.NativeView;
import com.breautek.fuse.nativeview.NativeViewPlugin;
import com.breautek.fuse.nativeview.errors.NoViewError;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class UpdateHandler extends FusePlugin.APIHandler<NativeViewPlugin> {

    public UpdateHandler(NativeViewPlugin plugin) {
        super(plugin);
    }

    @Override
    public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
        final JSONObject args = packet.readAsJSONObject();
        final String nodeID = args.getString("id");
        final NativeView nview = this.plugin.getViewByID(nodeID);

        if (nview == null) {
            response.send(new NoViewError(nodeID));
            return;
        }

        final JSONObject jRect = args.getJSONObject("rect");
        final NativeRect rect = NativeRect.fromJSONObject(jRect);

        this.plugin.getContext().runOnMainThread(() -> {
            // This is causing a crash atm...
            nview.setRect(rect);
            response.send();
        });
    }
}
