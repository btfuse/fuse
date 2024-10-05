
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

import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

public class FuseLogger {

    private static final String TAG = "FuseLogger";

    private int $level;
    private final FuseContext $context;
    private String $callbackID;

    public FuseLogger(FuseContext context) {
        $context = context;
        $level = FuseLoggerLevel.INFO | FuseLoggerLevel.WARN | FuseLoggerLevel.ERROR;
        $callbackID = null;
    }

    public void setLevel(int level) {
        $level = level;
    }

    public int getLevel() {
        return $level;
    }

    public void setCallbackID(String callbackID) {
        $callbackID = callbackID;
    }

    public void debug(String tag, String message) {
        debug(tag, message, null);
    }

    public void debug(String tag, String message, Throwable throwable) {
        if (($level & FuseLoggerLevel.DEBUG) == 0) {
            return;
        }

        if (throwable == null) {
            Log.d(tag, message);
        }
        else {
            Log.d(tag, message, throwable);
        }

        $bridgeToWebview(FuseLoggerLevel.DEBUG, message);
    }

    public void info(String tag, String message) {
        info(tag, message, null);
    }

    public void info(String tag, String message, Throwable throwable) {
        if (($level & FuseLoggerLevel.INFO) == 0) {
            return;
        }

        if (throwable == null) {
            Log.i(tag, message);
        }
        else {
            Log.i(tag, message, throwable);
        }

        $bridgeToWebview(FuseLoggerLevel.INFO, message);
    }

    public void warn(String tag, String message) {
        warn(tag, message, null);
    }

    public void warn(String tag, String message, Throwable throwable) {
        if (($level & FuseLoggerLevel.WARN) == 0) {
            return;
        }

        if (throwable == null) {
            Log.w(tag, message);
        }
        else {
            Log.w(tag, message, throwable);
        }

        $bridgeToWebview(FuseLoggerLevel.WARN, message);
    }

    public void error(String tag, String message) {
        error(tag, message, null);
    }

    public void error(String tag, String message, Throwable throwable) {
        if (($level & FuseLoggerLevel.ERROR) == 0) {
            return;
        }

        if (throwable == null) {
            Log.e(tag, message);
        }
        else {
            Log.e(tag, message, throwable);
        }

        $bridgeToWebview(FuseLoggerLevel.ERROR, message);
    }

    private void $bridgeToWebview(int level, String message) {
        if ($callbackID == null) {
            return;
        }

        JSONObject packet = null;
        try {
            packet = new JSONObject();
            packet.put("level", level);
            packet.put("message", message);
        }
        catch (JSONException ex) {
            Log.e(TAG, "Unable to create JSON packet", ex);
            return;
        }

        $context.execCallback($callbackID, packet.toString());
    }
}
