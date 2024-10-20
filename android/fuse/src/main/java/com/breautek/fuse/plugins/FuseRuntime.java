package com.breautek.fuse.plugins;

import java.io.IOException;

import android.content.Context;
import android.content.res.Configuration;
import android.os.Build;
import android.util.Log;
import android.view.RoundedCorner;
import android.view.WindowInsets;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import org.json.JSONException;
import org.json.JSONObject;
import com.breautek.fuse.FuseAPIPacket;
import com.breautek.fuse.FuseAPIResponse;
import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FusePlugin;
import java.util.ArrayList;

public class FuseRuntime extends FusePlugin {
    private static final String TAG = "FuseRuntime";

    private final ArrayList<String> $pauseHandlers;
    private final ArrayList<String> $resumeHandlers;
    private final ArrayList<String> $insetCallbacks;
    private JSONObject $insets;

    public FuseRuntime(FuseContext context) {
        super(context);

        $pauseHandlers = new ArrayList<>();
        $resumeHandlers = new ArrayList<>();
        $insetCallbacks = new ArrayList<>();
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

        this.attachHandler("/register/callback/insets", new APIHandler<FusePlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                String callbackID = packet.readAsString();
                synchronized ($insetCallbacks) {
                    $insetCallbacks.add(callbackID);
                }

                // Trigger an inset change
                this.plugin.getContext().runOnMainThread(() -> {
                    ViewCompat.requestApplyInsets(this.plugin.getContext().getActivityContext().findViewById(android.R.id.content));
                });

                response.send();
            }
        });

        this.attachHandler("/unregister/callback/insets", new APIHandler<FusePlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                String callbackID = packet.readAsString();
                synchronized ($insetCallbacks) {
                    $insetCallbacks.remove(callbackID);
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

    public void onInsetChange(WindowInsetsCompat provider) {
        Context activityContext = this.getContext().getActivityContext();

        float density = activityContext.getResources().getDisplayMetrics().density;

        Insets insets = provider.getInsets(
            WindowInsetsCompat.Type.displayCutout() |
            WindowInsetsCompat.Type.systemBars() |
            WindowInsetsCompat.Type.statusBars() |
            WindowInsetsCompat.Type.captionBar() |
            WindowInsetsCompat.Type.navigationBars()
        );

        double topLeftRadius = 0.0;
        double topRightRadius = 0.0;
        double botLeftRadius = 0.0;
        double botRightRadius = 0.0;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            WindowInsets sourceInsets = provider.toWindowInsets();
            if (sourceInsets != null) {
                RoundedCorner topLeft = sourceInsets.getRoundedCorner(RoundedCorner.POSITION_TOP_LEFT);
                RoundedCorner topRight = sourceInsets.getRoundedCorner(RoundedCorner.POSITION_TOP_RIGHT);
                RoundedCorner botLeft = sourceInsets.getRoundedCorner(RoundedCorner.POSITION_BOTTOM_LEFT);
                RoundedCorner botRight = sourceInsets.getRoundedCorner(RoundedCorner.POSITION_BOTTOM_RIGHT);

                if (topLeft != null) {
                    int radius = topLeft.getRadius();
                    topLeftRadius = (double) radius / density;
                }

                if (topRight != null) {
                    int radius = topRight.getRadius();
                    topRightRadius = (double) radius / density;
                }

                if (botLeft != null) {
                    int radius = botLeft.getRadius();
                    botLeftRadius = (double) radius / density;
                }

                if (botRight != null) {
                    int radius = botRight.getRadius();
                    botRightRadius = (double) radius / density;
                }
            }
        }

        double top = insets.top / density;
        double right = insets.right / density;
        double bottom = insets.bottom / density;
        double left = insets.left / density;

        // First we will get the screen orientation. This may be locked by the user, so it
        // may not match the physical orientation. If the orientation cannot be determined,
        // we will assume PORTRAIT
        int orientation = Configuration.ORIENTATION_UNDEFINED;

        // There are other orientation types, albeit deprecated and supposedly no longer
        // used, but this limits us from handling only portrait and landscape.
        switch (activityContext.getResources().getConfiguration().orientation) {
            case Configuration.ORIENTATION_LANDSCAPE:
            case Configuration.ORIENTATION_PORTRAIT:
                orientation = activityContext.getResources().getConfiguration().orientation;
                break;
            case Configuration.ORIENTATION_UNDEFINED:
            default:
                // SQUARE is not used anymore since API 16, but included just to satisfy
                // lint warnings. If undefined, then fallback to PORTRAIT
                orientation = Configuration.ORIENTATION_PORTRAIT;
                break;
        }

        // If portrait, then top-left & top-right is applied to the top inset,
        // and bot-left & bot-right is applied to the bottom inset
        if (orientation == Configuration.ORIENTATION_PORTRAIT) {
            top = Math.max(Math.max(top, topLeftRadius), topRightRadius);
            bottom = Math.max(Math.max(bottom, botLeftRadius), botRightRadius);
        }
        else {
            left = Math.max(Math.max(left, topLeftRadius), botLeftRadius);
            right = Math.max(Math.max(right, topRightRadius), botRightRadius);
        }

        try {
            JSONObject insetJSON = new JSONObject();

            insetJSON.put("top", top);
            insetJSON.put("right", right);
            insetJSON.put("bottom", bottom);
            insetJSON.put("left", left);

            synchronized ($insetCallbacks) {
                for (String callbackID : $insetCallbacks) {
                    getContext().execCallback(callbackID, insetJSON.toString());
                }
            }
        }
        catch (JSONException ex) {
            Log.w(TAG, ex);
        }
    }
}
