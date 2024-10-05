
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

package com.breautek.fuse.plugins.echo;

import android.content.res.AssetFileDescriptor;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicInteger;

import com.breautek.fuse.FuseAPIPacket;
import com.breautek.fuse.FuseAPIResponse;
import com.breautek.fuse.FuseAPIResponseStatus;
import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FusePlugin;

public class EchoPlugin extends FusePlugin {
    public EchoPlugin(FuseContext context) {
        super(context);
    }

    @Override
    protected void _initHandles() {
        this.attachHandler("/echo", new APIHandler<EchoPlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException {
                response.send(packet.readAsBinary(), packet.getContentType());
            }
        });

        this.attachHandler("/big", new APIHandler<EchoPlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException {
                byte[] buffer = new byte[256 * 1024]; // Buffer size for reading

                response.setContentType("text/plain");
                response.setStatus(FuseAPIResponseStatus.OK);

                AssetFileDescriptor lffd = getContext().getActivityContext().getAssets().openFd("largeFile.txt");
                response.setContentLength(lffd.getLength());
                lffd.close();
                response.didFinishHeaders();

                InputStream io = getContext().getActivityContext().getAssets().open("largeFile.txt");
                int bytesRead;
                while ((bytesRead = io.read(buffer)) != -1) {
                    response.pushData(buffer);
                }

                response.didFinish();
                io.close();
            }
        });

        this.attachHandler("/subscribe", new APIHandler<FusePlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException {
                long contentLength = packet.getContentLength();
                InputStream io = packet.getInputStream();

                byte[] buffer = new byte[(int)contentLength];
                io.read(buffer);

                String callbackID = new String(buffer, StandardCharsets.UTF_8);

                response.didFinishHeaders();
                response.didFinish();

                APIHandler<FusePlugin> self = this;

                AtomicInteger num = new AtomicInteger(0);

                Timer timer = new Timer();
                TimerTask task = new TimerTask() {
                    @Override
                    public void run() {
                        num.incrementAndGet();
                        self.plugin.getContext().execCallback(callbackID, num.toString());
                    }
                };

                timer.scheduleAtFixedRate(task, 0, 1000);
            }
        });

        this.attachHandler("/threadtest", new APIHandler<EchoPlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException {
                byte[] data = packet.readAsBinary();

                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        response.send(data, packet.getContentType());
                    }
                }).start();
            }
        });
    }

    @Override
    public String getID() {
        return "echo";
    }
}
