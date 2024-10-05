
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

package com.breautek.fuse;

import android.util.DisplayMetrics;

import androidx.appcompat.app.AppCompatActivity;

public class FuseScreenUtils {
    private final AppCompatActivity $context;

    public FuseScreenUtils(AppCompatActivity context) {
        $context = context;
    }

    public float getPixelDensity() {
        DisplayMetrics displayMetrics = $context.getResources().getDisplayMetrics();
        return displayMetrics.density;
    }

    /**
     * Takes a scaled webview pixel and returns a
     * native pixel
     *
     * @param px
     * @return
     */
    public float toNativePx(float px) {
        return px * getPixelDensity();
    }

    /**
     * Takes a native pixel, scales it, and
     * returns a webview pixel
     *
     * @param px
     * @return
     */
    public float toWebviewPx(float px) {
        return px / getPixelDensity();
    }
}
