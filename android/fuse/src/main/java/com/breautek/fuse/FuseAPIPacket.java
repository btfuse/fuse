
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

/**
 * A class representing a API data packet
 */
public class FuseAPIPacket {
    private final String $route;
    private final InputStream $inputStream;
    private final Map<String, String> $headers;

    public FuseAPIPacket(String route, Map<String, String> headers, InputStream io) {
        $route = route;
        $inputStream = io;
        $headers = headers;
    }

    /**
     * Gets the byte size of the data packet
     */
    public long getContentLength() {
        return Long.parseLong(Objects.requireNonNull($headers.getOrDefault("Content-Length", "0")).trim());
    }

    /**
     * Gets the content type indicator
     */
    public String getContentType() {
        return $headers.get("Content-Type");
    }

    /**
     * Reads the data packet in full as an UTF-8 string.
     *
     * @throws IOException if the underlying socket cannot be read
     */
    public String readAsString() throws IOException  {
        byte[] buffer = new byte[(int)getContentLength()];
        $inputStream.read(buffer);
        return new String(buffer, StandardCharsets.UTF_8);
    }

    /**
     * Reads the data packet in full as raw binary
     *
     * @throws IOException if the underlying socket cannot be read
     */
    public byte[] readAsBinary() throws IOException {
        byte[] buffer = new byte[(int) getContentLength()];
        $inputStream.read(buffer);
        return buffer;
    }

    /**
     * Reads the data packet in full as JSON object
     *
     * @throws IOException if the underlying socket cannot be read
     * @throws JSONException if the data is not parseable as a JSON object
     */
    public JSONObject readAsJSONObject() throws IOException, JSONException {
        return new JSONObject(readAsString());
    }

    /**
     * Reads the data packet in full as JSON array
     *
     * @throws IOException if the underlying socket cannot be read
     * @throws JSONException if the data is not parseable as a JSON array
     */
    public JSONArray readAsJSONArray() throws IOException, JSONException {
        return new JSONArray(readAsString());
    }

    /**
     * Gets the routing string of the data packet
     */
    public String getRoute() {
        return $route;
    }

    /**
     * Gets the underlying socket input stream
     */
    public InputStream getInputStream() {
        return $inputStream;
    }
}
