
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

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Objects;

public class FuseAPIPacket {
    private final String $route;
    private final InputStream $inputStream;
    private final Map<String, String> $headers;


    public FuseAPIPacket(String route, Map<String, String> headers, InputStream io) {
        $route = route;
        $inputStream = io;
        $headers = headers;
    }

    public long getContentLength() {
        return Long.parseLong(Objects.requireNonNull($headers.getOrDefault("Content-Length", "0")).trim());
    }

    public String getContentType() {
        return $headers.get("Content-Type");
    }

    public String readAsString() throws IOException  {
        byte[] buffer = new byte[(int)getContentLength()];
        $inputStream.read(buffer);
        return new String(buffer, StandardCharsets.UTF_8);
    }

    public byte[] readAsBinary() throws IOException {
        byte[] buffer = new byte[(int) getContentLength()];
        $inputStream.read(buffer);
        return buffer;
    }

    public JSONObject readAsJSONObject() throws IOException, JSONException {
        return new JSONObject(readAsString());
    }

    public JSONArray readAsJSONArray() throws IOException, JSONException {
        return new JSONArray(readAsString());
    }

    public String getRoute() {
        return $route;
    }

    public InputStream getInputStream() {
        return $inputStream;
    }
}
