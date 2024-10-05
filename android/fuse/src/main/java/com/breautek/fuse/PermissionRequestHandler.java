
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

import android.content.pm.PackageManager;

import androidx.annotation.Keep;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;
import java.util.concurrent.Executor;

public class PermissionRequestHandler {

    public static class Result implements IFuseSerializable {
        private final Map<String, PermissionStatus> $grantMap;
        private final boolean $isAllGranted;

        private final PermissionRequest $request;

        public Result(Map<String, PermissionStatus> grantMap, boolean isAllGranted, PermissionRequest request) {
            $isAllGranted = isAllGranted;
            $grantMap = grantMap;
            $request = request;
        }

        @Keep
        public boolean isAllGranted() {
            return $isAllGranted;
        }

        @Keep
        public Map<String, PermissionStatus> getStatuses() {
            return $grantMap;
        }

        @Nullable
        @Keep
        public PermissionStatus getStatus(String permission) {
            return $grantMap.getOrDefault(permission, null);
        }

        @Keep
        public boolean requiresJustification() {
            for (Map.Entry<String, PermissionStatus> e : $grantMap.entrySet()) {
                if (e.getValue() == PermissionStatus.REQUIRES_JUSTIFICATION) {
                    return true;
                }
            }

            return false;
        }

        public byte[] serialize() throws JSONException  {
            JSONObject obj = new JSONObject();

            for (Map.Entry<String, PermissionStatus> entry : $grantMap.entrySet()) {
                PermissionStatus status = entry.getValue();
                if ($request == null) {
                    obj.put(entry.getKey(), status.ordinal());
                }
                else {
                    Integer resolved = $request.backResolve(entry.getKey());
                    if (resolved != null) {
                        obj.put(String.valueOf(resolved), status.ordinal());
                    }
                }
            }

            return obj.toString().getBytes();
        }
    }

    private static class Context {
        private final int $requestCode;
        private final CompletableFuture<PermissionRequestHandler.Result> $future;
        private final PermissionRequest $request;

        public Context() {
            $request = null;
            $requestCode = RequestCodeManager.getInstance().getRequestCode();
            $future = new CompletableFuture<>();
        }

        public Context(PermissionRequest request) {
            $request = request;
            $requestCode = RequestCodeManager.getInstance().getRequestCode();
            $future = new CompletableFuture<>();
        }

        public int getRequestCode() {
            return $requestCode;
        }

        @NonNull
        public CompletableFuture<PermissionRequestHandler.Result> getFuture() {
            return $future;
        }

        /**
         * If this Context was created with a {@link PermissionRequest} then this API
         * will return it. Returns null otherwise
         * @return the attached PermissionRequest
         */
        @Nullable
        public PermissionRequest getPermissionRequest() {
            return $request;
        }
    }

    private final FuseContext $context;
    private final Executor $thread;
    private final HashMap<Integer, PermissionRequestHandler.Context> $activeRequests;

    public PermissionRequestHandler(FuseContext context) {
        $context = context;
        $thread = Executors.newFixedThreadPool(1);
        $activeRequests = new HashMap<>();
    }

    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        PermissionRequestHandler.Context ctx;
        synchronized ($activeRequests) {
            ctx = $activeRequests.get(requestCode);
        }

        if (ctx == null) {
            return;
        }

        CompletableFuture<Result> future = ctx.getFuture();

        HashMap<String, PermissionStatus> permStatus = new HashMap<>();

        boolean isAllGranted = true;
        for (int i = 0; i < permissions.length; i++) {
            String perm = permissions[i];
            boolean isGranted = grantResults[i] == PackageManager.PERMISSION_GRANTED;

            if (isGranted) {
                permStatus.put(perm, PermissionStatus.GRANTED);
            }
            else {
                isAllGranted = false;
                permStatus.put(perm, PermissionStatus.DENIED);
            }
        }

        $completeRequestContext(ctx.getRequestCode());
        future.complete(new Result(permStatus, isAllGranted, ctx.getPermissionRequest()));
    }

    @NonNull
    private PermissionRequestHandler.Context $createNewRequestContext() {
        PermissionRequestHandler.Context ctx = new PermissionRequestHandler.Context();
        synchronized ($activeRequests) {
            $activeRequests.put(ctx.getRequestCode(), ctx);
        }
        return ctx;
    }

    @NonNull
    private PermissionRequestHandler.Context $createNewRequestContext(PermissionRequest request) {
        PermissionRequestHandler.Context ctx = new PermissionRequestHandler.Context(request);
        synchronized ($activeRequests) {
            $activeRequests.put(ctx.getRequestCode(), ctx);
        }
        return ctx;
    }

    private void $completeRequestContext(int requestCode) {
        synchronized ($activeRequests) {
            $activeRequests.remove(requestCode);
        }
    }

    public CompletableFuture<Result> requestPermission(PermissionRequest request) {
        PermissionRequestHandler.Context ctx = $createNewRequestContext(request);
        return $requestPermissions(ctx, request.getPermissionSet(), request.isJustified());
    }

    @Keep
    public CompletableFuture<Result> requestPermissions(String[] permissions, boolean isJustified) {
        PermissionRequestHandler.Context ctx = $createNewRequestContext();
        return $requestPermissions(ctx, permissions, isJustified);
    }

    private CompletableFuture<Result> $requestPermissions(PermissionRequestHandler.Context ctx, String[] permissions, boolean isJustified) {
        CompletableFuture<Result> future = ctx.getFuture();

        $thread.execute(() -> {
            boolean hasAllPermissions = true;
            HashMap<String, PermissionStatus> permStatus = new HashMap<>();

            for (int i = 0; i < permissions.length; i++) {
                String perm = permissions[i];
                if (!$isPermissionGranted(perm)) {
                    hasAllPermissions = false;
                    permStatus.put(perm, PermissionStatus.DENIED);
                }
                else {
                    permStatus.put(perm, PermissionStatus.GRANTED);
                }
            }

            if (hasAllPermissions) {
                // Permission already granted, do need to do anything further
                $completeRequestContext(ctx.getRequestCode());
                future.complete(new Result(permStatus, true, ctx.getPermissionRequest()));
                return;
            }

            // Now check for justifications
            boolean requiresJustification = false;
            if (!isJustified) {
                for (int i = 0; i < permissions.length; i++) {
                    String perm = permissions[i];

                    boolean isGranted = permStatus.get(perm) == PermissionStatus.GRANTED;
                    if (isGranted) {
                        // Don't need to check justification on granted permissions
                        continue;
                    }

                    if ($context.getActivityContext().shouldShowRequestPermissionRationale(perm)) {
                        requiresJustification = true;
                        permStatus.put(perm, PermissionStatus.REQUIRES_JUSTIFICATION);
                    }
                }
            }

            if (requiresJustification) {
                // At least one permission requires justification, nothing more to do.
                $completeRequestContext(ctx.getRequestCode());
                future.complete(new Result(permStatus, false, ctx.getPermissionRequest()));
                return;
            }

            $context.getActivityContext().requestPermissions(permissions, ctx.getRequestCode());
        });

        return future;
    }

    private boolean $isPermissionGranted(String permission) {
        return $context.getActivityContext().checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED;
    }
}
