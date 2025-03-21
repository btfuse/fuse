
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

package com.breautek.fuse.nativeview;

import com.breautek.fuse.FuseAPIPacket;
import com.breautek.fuse.FuseAPIResponse;
import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FusePlugin;
import com.breautek.fuse.nativeview.handlers.CreateHandler;
import com.breautek.fuse.nativeview.handlers.DeleteHandler;
import com.breautek.fuse.nativeview.handlers.UpdateHandler;

import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;
import java.util.HashMap;

public class NativeViewPlugin extends FusePlugin {

    public static final String TAG = "NativeViewPlugin";

    private final RelativeLayout $container;

    private final HashMap<String, NativeView> $views;

    public NativeViewPlugin(FuseContext context) {
        super(context);

        $views = new HashMap<>();

        $container = new RelativeLayout(context.getActivityContext());
        context.getView().getLayout().addView($container);
    }

    public NativeView createView(@NonNull NativeRect rect) {
        return createView(rect, null);
    }

    /**
     * Gets a {@link NativeView} by it's id.
     *
     * If there is no view by the given id, null will be returned.
     *
     * @param id The view id
     * @return The native view, or null if there is no view associated by the given id.
     */
    @Nullable
    public NativeView getViewByID(@NonNull String id) {
        synchronized ($views) {
            if ($views.containsKey(id)) {
                return $views.get(id);
            }
        }

        return null;
    }

    public NativeView createView(@NonNull NativeRect rect, @Nullable NativeOverlay.IOverlayBuilder builder) {
        NativeView nview = new NativeView(this.getContext(), rect, builder);
        synchronized ($views) {
            $views.put(nview.getID(), nview);
        }
        $container.addView(nview);
//        $container.addView(nview.getView());;
        return nview;
    }

    public void addView(@NonNull NativeView view) {
        synchronized ($views) {
            $views.put(view.getID(), view);
        }
    }

    public void destroy(@NonNull NativeView view) {
        synchronized ($views) {
            $views.remove(view.getID());
        }

        $container.removeView(view);
//        $container.removeView(view.getView());
    }

    public ViewGroup getContainer() {
        return $container;
    }

    @Override
    protected void _initHandles() {
        this.attachHandler("/create", new CreateHandler(this));
        this.attachHandler("/update", new UpdateHandler(this));
        this.attachHandler("/delete", new DeleteHandler(this));
    }

    @Override
    public String getID() {
        return "FuseNativeView";
    }
}
