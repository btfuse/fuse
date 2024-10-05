
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
import android.os.Handler;
import android.os.HandlerThread;
import androidx.annotation.Nullable;

/**
 * An output stream that ensures that written
 * data happens in it's own thread.
 */
public class FuseOutputStream extends PipedOutputStream {

    private final Handler $threadHandler;

    public static abstract class Callback {
        public abstract void execute(@Nullable IOException exception);
    }

    public FuseOutputStream() {
        HandlerThread thread = new HandlerThread("FuseOutputStream_thread");
        thread.start();
        $threadHandler = new Handler(thread.getLooper());
    }

    public FuseOutputStream(FuseInputStream sink) throws IOException {
        super(sink);
        HandlerThread thread = new HandlerThread("FuseOutputStream_thread");
        thread.start();
        $threadHandler = new Handler(thread.getLooper());
    }

    public void connect(FuseInputStream sink) throws IOException {
        this.connect((PipedInputStream) sink);
    }

    @Override
    public void write(int data) {
        $threadHandler.post(() -> {
            try {
                super.write(data);
            }
            catch (IOException ignored) {}
        });
    }

    @Override
    public void write(byte[] data, int len, int offset) {
        $threadHandler.post(() -> {
            try {
                super.write(data, len, offset);
            }
            catch (IOException ignored) {}
        });
    }

    public void write(byte[] data, int len, int offset, Callback callback) {
        $threadHandler.post(() -> {
            try {
                super.write(data, len, offset);
            }
            catch (IOException ex) {
                callback.execute(ex);
                return;
            }

            callback.execute(null);
        });
    }

    public void write(byte[] data) {
        $threadHandler.post(() -> {
            try {
                super.write(data, data.length, 0);
            }
            catch (IOException ignored) {}
        });
    }

    public void write(byte[] data, Callback callback) {
        $threadHandler.post(() -> {
            try {
                super.write(data, data.length, 0);
            }
            catch (IOException ex) {
                callback.execute(ex);
                return;
            }

            callback.execute(null);
        });
    }

    public void write(int data, Callback callback) {
        $threadHandler.post(() -> {
            try {
                super.write(data);
            }
            catch (IOException ex) {
                callback.execute(ex);
                return;
            }

            callback.execute(null);
        });
    }
}
