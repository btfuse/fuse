
/*
Copyright 2023-2025 Breautek

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

package com.breautek.fuse.plugins;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.breautek.fuse.FuseAPIPacket;
import com.breautek.fuse.FuseAPIResponse;
import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FusePlugin;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class FuseMemoryStore extends FusePlugin  {
    private static final String TAG = "FuseMemoryStore";
    private JSONObject $store;
    private final Object $storeLock;

    public FuseMemoryStore(FuseContext context, @Nullable Bundle fuseInstanceState) {
        super(context);

        $storeLock = new Object();

        $store = null;

        if (fuseInstanceState != null) {
            String storeObjStr = fuseInstanceState.getString(TAG, "{}");
            try {
                $store = new JSONObject(storeObjStr);
            }
            catch (JSONException ex) {
                $store = null;
            }
        }

        if ($store == null) {
            $store = new JSONObject();
        }
    }

    @Override
    public String getID() {
        return TAG;
    }

    @Override
    protected void _initHandles() {
        this.attachHandler("/set", new APIHandler<FuseMemoryStore>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                JSONObject data = packet.readAsJSONObject();

                String key = data.getString("key");
                String value = data.optString("value");

                synchronized ($storeLock) {
                    $store.put(key, value);
                }
            }
        });

        this.attachHandler("/get", new APIHandler<FuseMemoryStore>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                String key = packet.readAsString();

                String value = null;
                synchronized ($storeLock) {
                    value = $store.optString(key);
                }

                response.send(value == null ? "null" : value);
            }
        });
    }

    @Override
    public void onSaveInstanceState(@NonNull Bundle bundle) {
        bundle.putString(TAG, $store.toString());
    }
}
