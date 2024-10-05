
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

import com.breautek.fuse.FuseAPIServer;
import com.breautek.fuse.FuseContext;

import org.bouncycastle.operator.OperatorCreationException;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;

public class FuseTestAPIServer extends FuseAPIServer {

    public FuseTestAPIServer(FuseContext context) throws IOException, NoSuchAlgorithmException, CertificateException, OperatorCreationException, KeyStoreException, UnrecoverableKeyException, KeyManagementException {
        super(context);
    }
}
