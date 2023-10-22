
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

package com.breautek.fuse.testapp;

import android.os.Bundle;

import com.breautek.fuse.FuseActivity;
import com.breautek.fuse.FuseContext;

import com.breautek.fuse.plugins.EchoPlugin;

public class MainActivity extends FuseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FuseContext fuseContext = getFuseContext();
        fuseContext.registerPlugin(new EchoPlugin(fuseContext));
    }
}