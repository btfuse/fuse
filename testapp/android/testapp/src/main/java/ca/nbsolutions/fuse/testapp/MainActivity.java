
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

package ca.nbsolutions.fuse.testapp;

import androidx.annotation.ContentView;
import androidx.annotation.LayoutRes;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import ca.nbsolutions.fuse.FuseActivity;
import ca.nbsolutions.fuse.FuseContext;

import ca.nbsolutions.fuse.plugins.EchoPlugin;

public class MainActivity extends FuseActivity {
//    private FuseContext $context;

//    public MainActivity() {
//        super();
//    }

//    @ContentView
//    public MainActivity(@LayoutRes int contentLayoutId) {
//        super(contentLayoutId);
//    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);

//        $context = new FuseContext(this);
        FuseContext fuseContext = getFuseContext();
        fuseContext.registerPlugin(new EchoPlugin(fuseContext));

//        setContentView($context.getWebview());
    }
}