
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

import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FuseScreenUtils;

import java.util.UUID;

import android.content.Context;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class NativeView extends RelativeLayout {
    private final String $id;
    private final FuseContext $context;

    private float $width;
    private float $height;
    private float $x;
    private float $y;

//    private final RelativeLayout $layout;
    private final NativeOverlay $overlay;

//    private static class ViewContainer extends ViewGroup {
//        private final View $view;
//        private final View $overlay;
//
//        public ViewContainer(@NonNull Context context, @NonNull View view, @Nullable View overlay) {
//            super(context);
//            $view = view;
//            $overlay = overlay;
//        }
//
//        @Override
//        public boolean onTouchEvent(MotionEvent evt) {
//            if (!$overlay.onTouchEvent(evt)) {
//                return $view.onTouchEvent(evt);
//            }
//
//            return false;
//        }
//
//        @Override
//        protected void onLayout(boolean changed, int l, int t, int r, int b) {}
//    }

    public NativeView(@NonNull FuseContext context, @NonNull NativeRect rect, @Nullable NativeOverlay.IOverlayBuilder overlayBuilder) {
        super(context.getActivityContext());
        $id = UUID.randomUUID().toString();
        $context = context;
        $width = rect.width;
        $height = rect.height;
        $x = rect.x;
        $y = rect.y;

        setBackgroundColor(0x0);

//        $layout = new RelativeLayout(context.getActivityContext());
        $updateLayout();
//        $layout.setBackgroundColor(0x0);

        if (overlayBuilder != null) {
            $overlay = new NativeOverlay($context, overlayBuilder);
            FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
                    FrameLayout.LayoutParams.MATCH_PARENT,
                    FrameLayout.LayoutParams.MATCH_PARENT
            );
            addView($overlay.getView(), params);
//            $layout.addView($overlay.getView(), params);
        }
        else {
            $overlay = null;
        }

//        setOnClickListener(new OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Log.i("test", "testing");
//            }
//        });
//
//        $overlay.getView().setOnClickListener(new OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Log.i("test", "testing");
//            }
//        });

//        setOnTouchListener(new OnTouchListener() {
//            @Override
//            public boolean onTouch(View v, MotionEvent event) {
//                return false;
//            }
//        });
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent evt) {
        return true;
//        boolean didHandle = false;
//        if ($overlay != null) {
////            didHandle = false;
//            didHandle = $overlay.getView().dispatchTouchEvent(evt);
//        }
//
//        if (!didHandle) {
//            int count = getChildCount();
//            for (int i = 0; i < count; i++) {
//                View child = getChildAt(i);
//                if ($overlay != null && child == $overlay.getView()) {
//                    continue;
//                }
//
//                didHandle = child.dispatchTouchEvent(evt);
//                if (didHandle) {
//                    break;
//                }
//            }
//        }
//
//        return didHandle;
    }

    public String getID() {
        return $id;
    }

    public void setContent(View v) {
        addView(v, 0, new FrameLayout.LayoutParams(
           FrameLayout.LayoutParams.MATCH_PARENT,
           FrameLayout.LayoutParams.MATCH_PARENT
        ));
    }

//    public void addView(View v) {
//        $layout.addView(v, 0, new FrameLayout.LayoutParams(
//            FrameLayout.LayoutParams.MATCH_PARENT,
//                FrameLayout.LayoutParams.MATCH_PARENT
//        ));
//    }

//    @Override
//    protected void onLayout(boolean changed, int l, int t, int r, int b) {
//        super.onLayout();
//    }

//    public View getView() {
//        return $layout;
//    }

    public void setRect(NativeRect rect) {
        synchronized (this) {
            $x = rect.x;
            $y = rect.y;
            $width = rect.width;
            $height = rect.height;
            $updateLayout();
        }
    }

    @Override
    public boolean onTouchEvent(MotionEvent evt) {
        boolean didHandle = false;
        if ($overlay != null) {
            if ($overlay.willRespondTo(evt)) {
                didHandle = $overlay.getView().dispatchTouchEvent(evt);
            }
        }

        if (!didHandle) {
            int count = getChildCount();
            for (int i = 0; i < count; i++) {
                View child = getChildAt(i);
                if ($overlay != null && child == $overlay.getView()) {
                    continue;
                }

                didHandle = child.dispatchTouchEvent(evt);
//                didHandle = child.onTouchEvent(evt);
                if (didHandle) {
                    break;
                }
            }
        }

        return didHandle;
    }

    private void $updateLayout() {
        FuseScreenUtils utils = $context.getScreenUtils();
//        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
//                (int) utils.toNativePx($width),
//                (int) utils.toNativePx($height)
//        );

        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(
                (int) utils.toNativePx($width),
                (int) utils.toNativePx($height)
        );

        params.leftMargin = (int) utils.toNativePx($x);
        params.topMargin = (int) utils.toNativePx($y);
//        $layout.setLayoutParams(params);
       setLayoutParams(params);
    }
}
