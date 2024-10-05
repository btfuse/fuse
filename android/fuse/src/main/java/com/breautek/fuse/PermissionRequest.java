
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

package com.breautek.fuse;

import androidx.annotation.Nullable;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

public class PermissionRequest {

    public static abstract class Resolver {
        public abstract String[] resolve(JSONArray permissionSet) throws JSONException;
    }

    final boolean $isJustified;
    final String[] $permissions;
    final HashMap<String, Integer> $backResolve;

    public PermissionRequest(JSONObject packet, Resolver resolver) throws JSONException {
        $isJustified = packet.optBoolean("isJustified", false);
        JSONArray jPermArray = packet.getJSONArray("permissionSet");
        $permissions = resolver.resolve(jPermArray);
        $backResolve = new HashMap<>();

        for (int i = 0; i < $permissions.length; i++) {
            int jPerm = jPermArray.getInt(i);
            String nPerm = $permissions[i];
            $backResolve.put(nPerm, jPerm);
        }
    }

    public boolean isJustified() {
        return $isJustified;
    }

    public String[] getPermissionSet() {
        return $permissions;
    }

    @Nullable
    public Integer backResolve(String key) {
        return $backResolve.getOrDefault(key, null);
    }
}
