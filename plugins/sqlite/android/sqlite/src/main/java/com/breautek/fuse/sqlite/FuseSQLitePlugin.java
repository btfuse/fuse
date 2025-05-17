
/*
Copyright 2025 Breautek

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

package com.breautek.fuse.sqlite;

import com.breautek.fuse.FuseAPIResponseStatus;
import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FuseError;
import com.breautek.fuse.FusePlugin;
import com.breautek.fuse.FuseAPIPacket;
import com.breautek.fuse.FuseAPIResponse;
import com.breautek.fuse.sqlite.SQLite;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;

public class FuseSQLitePlugin extends FusePlugin {
    public FuseSQLitePlugin(FuseContext context) {
        super(context);
    }

    @Override
    public String getID() {
        return "FuseSQLite";
    }

    @Override
    protected void _initHandles() {
        this.attachHandler("/version", new APIHandler<FuseSQLitePlugin>(this) {
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException {
                response.send(SQLite.getLibVersion());
            }
        });

        this.attachHandler("/open", new APIHandler<FuseSQLitePlugin>(this) {
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws JSONException, IOException {
                JSONObject input = packet.readAsJSONObject();
                String path = input.getString("path");
                int flags = input.getInt("flags");

                try {
                    long handle = SQLite.open(path, flags);
                    response.send(Long.toString(handle));
                }
                catch (FuseError e) {
                    response.send(e);
                }
            }
        });

        this.attachHandler("/close", new APIHandler<FuseSQLitePlugin>(this) {
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException {
                Long handle = Long.parseLong(packet.readAsString());
                SQLite.close(handle);
                response.send();
            }
        });

        this.attachHandler("/query", new APIHandler<FuseSQLitePlugin>(this) {
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException {
                try {
                    SQLite.executeFromBinaryPacket(packet.readAsBinary(), new SQLite.Callback() {
                        @Override
                        public void onQueryResolve() {
                            response.setMode(FuseAPIResponse.Mode.CHUNK);
                            response.setStatus(FuseAPIResponseStatus.OK);
                            response.setContentType("application/octet-stream");
                            response.didFinishHeaders();
                        }

                        @Override
                        public void onChunk(byte[] chunk) {
                            response.pushData(chunk);
                        }

                        @Override
                        public void onFinish() {
                            response.didFinish();
                        }
                    });
                }
                catch (FuseError e) {
                    response.send(e);
                }
            }
        });
    }
}
