package ca.nbsolutions.fuse.plugins;

import android.content.res.AssetFileDescriptor;
import android.content.res.TypedArray;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicInteger;

import ca.nbsolutions.fuse.FuseAPIPacket;
import ca.nbsolutions.fuse.FuseAPIResponse;
import ca.nbsolutions.fuse.FuseAPIResponseStatus;
import ca.nbsolutions.fuse.FuseContext;
import ca.nbsolutions.fuse.FusePlugin;

public class EchoPlugin extends FusePlugin {
    public EchoPlugin(FuseContext context) {
        super(context);
    }

    @Override
    protected void _initHandles() {
        this.attachHandler("/echo", new APIHandler<EchoPlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException {
                response.setStatus(FuseAPIResponseStatus.OK);
                response.setContentType("text/plain");
                response.setContentLength(packet.getContentLength());
                response.didFinishHeaders();

                byte[] buffer = new byte[4096];
                InputStream io = packet.getInputStream();
                long bytesRead;
                long totalBytesRead = 0;
                long expected = packet.getContentLength();
                while (totalBytesRead < expected && (bytesRead = io.read(buffer)) != -1) {
                    totalBytesRead += bytesRead;
                    response.pushData(buffer);
                }

                response.didFinish();
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
    }

    @Override
    public String getID() {
        return "echo";
    }
}
