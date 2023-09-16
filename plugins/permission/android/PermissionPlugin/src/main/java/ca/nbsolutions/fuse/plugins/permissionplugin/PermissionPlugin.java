/*
Copyright 2023 Norman Breau

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

package ca.nbsolutions.fuse.plugins.permissionplugin;

import android.Manifest.permission;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import ca.nbsolutions.fuse.PermissionRequest;
import ca.nbsolutions.fuse.PermissionRequestHandler;
import ca.nbsolutions.fuse.FuseAPIPacket;
import ca.nbsolutions.fuse.FuseAPIResponse;
import ca.nbsolutions.fuse.FuseContext;
import ca.nbsolutions.fuse.FuseError;
import ca.nbsolutions.fuse.FusePlugin;

public class PermissionPlugin extends FusePlugin {

    public PermissionPlugin(FuseContext context) {
        super(context);
    }

    @Override
    public String getID() {
        return "PermissionPlugin";
    }

    @Override
    protected void _initHandles() {
        this.attachHandler("/requestPermission", new APIHandler<PermissionPlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                PermissionRequest request = new PermissionRequest(packet.readAsJSONObject(), new PermissionRequest.Resolver() {
                    @Override
                    public String[] resolve(JSONArray permissionSet) throws JSONException {
                        String[] out = new String[permissionSet.length()];

                        for (int i = 0; i < permissionSet.length(); i++) {
                            int jsPerm = permissionSet.getInt(i);

                            if (Permission.COARSE.ordinal() == jsPerm) {
                                out[i] = permission.ACCESS_COARSE_LOCATION;
                            }
                            else if (Permission.FINE.ordinal() == jsPerm) {
                                out[i] = permission.ACCESS_FINE_LOCATION;
                            }
                        }

                        return out;
                    }
                });

                CompletableFuture<PermissionRequestHandler.Result> future = getContext().getPermissionRequestHandler().requestPermission(request);
                PermissionRequestHandler.Result result;

                try {
                     result = future.get();
                } catch (ExecutionException | InterruptedException e) {
                    e.printStackTrace();
                    response.send(new FuseError("PermissionPlugin", 0, "Permission Request Failure"));
                    return;
                }

                response.send(result);
            }
        });
    }
}
