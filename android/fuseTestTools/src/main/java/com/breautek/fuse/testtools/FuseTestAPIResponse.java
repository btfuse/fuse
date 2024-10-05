
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

package com.breautek.fuse.testtools;

import java.net.Socket;

import com.breautek.fuse.FuseAPIResponse;
import com.breautek.fuse.FuseContext;

import static org.junit.Assert.*;

import android.os.Looper;

public class FuseTestAPIResponse extends FuseAPIResponse {

    public FuseTestAPIResponse(FuseContext context, Socket client) {
        super(context, client);
    }

    @Override
    protected void __writeImpl(byte[] data, boolean flush) {
        assertSame("Should be on network thread", Looper.myLooper(), getNetworkThreadHandler().getLooper());
        super.__writeImpl(data, flush);
    }
}
