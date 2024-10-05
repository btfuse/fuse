
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
import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;

/**
 *
 */
public class FuseInputStream extends PipedInputStream {
    public FuseInputStream(FuseOutputStream src) throws IOException  {
        super(src);
    }

    public FuseInputStream(FuseOutputStream src, int pipeSize) throws IOException {
        super(src, pipeSize);
    }

    public void connect(FuseOutputStream src) throws IOException {
        this.connect((PipedOutputStream) src);
    }
}
