
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

import android.os.Bundle;

import androidx.annotation.ContentView;
import androidx.annotation.LayoutRes;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import com.breautek.fuse.plugins.IFusePluginRegistrar;

/**
 * Convenience class that can be extended which provides
 * a FuseContext with all the glue bits already done.
 *
 * If fine control is required, it is possible to create the FuseContext
 * itself, you'll need to pass through the following lifecycle methods:
 *  - onCreate(Bundle)
 *  - onStart
 *  - onResume
 *  - onPause
 *  - onSaveInstanceState(Bundle)
 *  - onLowMemory
 *  - onRequestPermissionsResult
 *  - onStop
 *  - onDestroy
 */
public class FuseActivity extends AppCompatActivity {

    private FuseContext $fuseContext;

    public FuseActivity() {
        super();
        $init();
    }

    @ContentView
    public FuseActivity(@LayoutRes int contentLayoutId) {
        super(contentLayoutId);
        $init();
    }

    private void $init() {
        $fuseContext = new FuseContext(this);
        $fuseContext.$pluginMapLock.writeLock().lock();
        _registerFusePlugins(plugin -> $fuseContext.$registerPlugin(plugin));
        $fuseContext.$pluginMapLock.writeLock().unlock();
    }

    /**
     * Can be overwritten by subclasses to register plugins
     *
     * @param registrar
     */
    protected void _registerFusePlugins(IFusePluginRegistrar registrar) {};

    public FuseContext getFuseContext() {
        return $fuseContext;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        $fuseContext.onCreate(savedInstanceState);
        setContentView($fuseContext.getLayout());
    }

    @Override
    protected void onStart() {
        super.onStart();
        $fuseContext.onStart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        $fuseContext.onStop();
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        $fuseContext.onLowMemory();
    }

    @Override
    protected void onPause() {
        super.onPause();
        $fuseContext.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        $fuseContext.onResume();
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        $fuseContext.onSaveInstanceState(outState);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        $fuseContext.onRequestPermissionResult(requestCode, permissions, grantResults);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        $fuseContext.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        $fuseContext.onDestroy();
    }
}
