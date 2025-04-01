
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

package com.breautek.fuse.googlemaps;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FuseFragment;
import com.breautek.fuse.googlemaps.testapp.R;
import com.breautek.fuse.nativeview.NativeViewPlugin;
import com.breautek.fuse.googlemaps.GoogleMapsPlugin;

public class MainActivity extends AppCompatActivity {
    private FuseFragment $fuse;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //SplashScreen.installSplashScreen(this);
        super.onCreate(savedInstanceState);
        setContentView(com.breautek.fuse.googlemaps.testapp.R.layout.activity_main);

        if (savedInstanceState == null) {
            $fuse = new FuseFragment();
            getSupportFragmentManager().beginTransaction().add(R.id.fuse_fragment_container, $fuse).commit();
        }
        else {
            $fuse = (FuseFragment) getSupportFragmentManager().findFragmentById(R.id.fuse_fragment_container);
        }

        if ($fuse == null) {
            throw new RuntimeException("Fuse Initialization Error");
        }

        $fuse.setOnReadyCallback((Bundle fuseInstanceState) -> {
            FuseContext fuseContext = $fuse.getFuseContext();
            NativeViewPlugin nviewAPI = new NativeViewPlugin(fuseContext);
            fuseContext.registerPlugin(nviewAPI);
            fuseContext.registerPlugin(new GoogleMapsPlugin(fuseContext, nviewAPI));
        });
    }
}
