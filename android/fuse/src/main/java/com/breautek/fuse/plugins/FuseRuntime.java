package com.breautek.fuse.plugins;

import java.io.IOException;
import android.os.Build;

import org.json.JSONException;
import org.json.JSONObject;
import com.breautek.fuse.FuseAPIPacket;
import com.breautek.fuse.FuseAPIResponse;
import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FusePlugin;
import java.util.ArrayList;

public class FuseRuntime extends FusePlugin {
    private final ArrayList<String> $pauseHandlers;
    private final ArrayList<String> $resumeHandlers;

    public FuseRuntime(FuseContext context) {
        super(context);

        $pauseHandlers = new ArrayList<>();
        $resumeHandlers = new ArrayList<>();
    }

    @Override
    public String getID() {
        return "FuseRuntime";
    }

    @Override
    protected void _initHandles() {
        this.attachHandler("/info", new APIHandler<FuseRuntime>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                int api = Build.VERSION.SDK_INT;

                String version = Integer.toString(api) + ".0.0";

                JSONObject obj = new JSONObject();
                obj.put("version", version);
                obj.put("debugMode", this.plugin.getContext().isDebug());

                response.send(obj);
            }
        });

        this.attachHandler("/registerPauseHandler", new APIHandler<FusePlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                String callbackID = packet.readAsString();
                synchronized ($pauseHandlers) {
                    $pauseHandlers.add(callbackID);
                }

                response.send();
            }
        });

        this.attachHandler("/unregisterPauseHandler", new APIHandler<FusePlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                String callbackID = packet.readAsString();
                synchronized ($pauseHandlers) {
                    $pauseHandlers.remove(callbackID);
                }

                response.send();
            }
        });

        this.attachHandler("/registerResumeHandler", new APIHandler<FusePlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                String callbackID = packet.readAsString();
                synchronized ($resumeHandlers) {
                    $resumeHandlers.add(callbackID);
                }

                response.send();
            }
        });

        this.attachHandler("/unregisterResumeHandler", new APIHandler<FusePlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                String callbackID = packet.readAsString();
                synchronized ($resumeHandlers) {
                    $resumeHandlers.remove(callbackID);
                }

                response.send();
            }
        });
    }

    @Override
    public void onPause() {
        super.onPause();
        synchronized ($pauseHandlers) {
            for (String callbackID : $pauseHandlers) {
                getContext().execCallback(callbackID);
            }
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        synchronized ($resumeHandlers) {
            for (String callbackID : $resumeHandlers) {
                getContext().execCallback(callbackID);
            }
        }
    }
}
