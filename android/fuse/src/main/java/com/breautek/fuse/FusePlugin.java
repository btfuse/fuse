
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

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Keep;
import androidx.annotation.NonNull;

import org.json.JSONException;
import java.util.concurrent.CompletableFuture;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;

public abstract class FusePlugin {

    private static final String TAG = "FusePlugin";

    public abstract static class APIHandler<TPlugin extends FusePlugin> {
        public final TPlugin plugin;
        public APIHandler(TPlugin plugin) {
            this.plugin = plugin;
        }

        public abstract void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException;
    }

    private final FuseContext $context;

    private final Map<String, APIHandler<? extends FusePlugin>> $handles;
    private final Map<Integer, CompletableFuture<FuseActivityResult>> $activityResultFutures;

    public abstract String getID();

    public FusePlugin(FuseContext context) {
        $context = context;
        $handles = new HashMap<>();
        $activityResultFutures = new HashMap<>();
        _initHandles();
    }

    protected void _initHandles() {}

    public FuseContext getContext() {
        return $context;
    }

    public void attachHandler(String path, APIHandler<? extends FusePlugin> handler) {
        $handles.put(path, handler);
    }

    public void route(String path, FuseAPIPacket packet, FuseAPIResponse response) throws IOException {
        APIHandler<? extends FusePlugin> handler = $handles.getOrDefault(path, null);
        if (handler == null) {
            byte[] content = new FuseError("FuseAPI", 1, "No Plugin Handler for " + packet.getRoute()).serialize().getBytes();
            response.setStatus(FuseAPIResponseStatus.ERROR);
            response.setContentType("application/json");
            response.setContentLength(content.length);
            response.didFinishHeaders();
            response.pushData(content);
            response.didFinish();
            return;
        }

        FuseLogger logger = getContext().getLogger();

        try {
            handler.execute(packet, response);
        }
        catch (JSONException ex) {
            logger.error(TAG, "JSON Exception", ex);
            response.kill();
        }
        catch (IOException ex) {
            logger.error(TAG, "IO Error", ex);
            response.kill();
        }
    }

    public void onLowMemory() {

    }

    public void onPause() {

    }

    public void onResume() {

    }

    public void onSaveInstanceState(@NonNull Bundle ignored) {

    }

    public void onStart() {

    }

    public void onStop() {

    }

    @Keep
    protected CompletableFuture<FuseActivityResult> _addActivityResultFuture(int requestCode) {
        CompletableFuture<FuseActivityResult> future = new CompletableFuture<>();
        $activityResultFutures.put(requestCode, future);
        return future;
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        CompletableFuture<FuseActivityResult> future = $activityResultFutures.getOrDefault(requestCode, null);
        if (future == null) {
            return;
        }

        $activityResultFutures.remove(requestCode);

        future.complete(new FuseActivityResult(resultCode, data));
    }

    public void onDestroy() {

    }
}
