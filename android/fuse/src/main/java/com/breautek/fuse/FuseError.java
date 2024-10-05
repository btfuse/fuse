
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

public class FuseError extends Throwable {
    private final String $domain;
    private final int $code;
    private final String $message;

    public FuseError(String domain, int code, String message) {
        super(message);
        $domain = domain;
        $code = code;
        $message = message;
    }

    public FuseError(String domain, int code, String message, Throwable cause) {
        super(message, cause);
        $domain = domain;
        $code = code;
        $message = message;
    }

    public String getDomain() {
        return $domain;
    }

    public int getCode() {
        return $code;
    }

    public String getMessage() {
        return $domain;
    }

    public String serialize() {
        String out;
        try {
            JSONObject obj = new JSONObject();
            obj.put("domain", $domain);
            obj.put("code", $code);
            obj.put("message", $message);
            out = obj.toString();
        }
        catch (JSONException ex) {
            Log.w("FuseError", "JSONObject failed? Falling back to string builder", ex);
            StringBuilder sb = new StringBuilder();
            sb.append("{\"domain\":\"").append($domain).append("\",")
                    .append("\"code\":").append($code).append(",")
                    .append("\"message\":\"").append($message).append("\"}");
            out = sb.toString();
        }

        return out;
    }
}
