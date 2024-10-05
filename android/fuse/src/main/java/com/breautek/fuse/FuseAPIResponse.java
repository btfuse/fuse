
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

import android.os.Handler;
import android.os.HandlerThread;
import android.os.SystemClock;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.lang.ref.WeakReference;
import java.net.Socket;
import java.util.HashMap;
import java.util.Locale;

public class FuseAPIResponse {

    private static final String TAG = "FuseAPIResponse";

    private static class StatusCodes {
        private final HashMap<Integer, String> $statusTextMap;

        private static StatusCodes $instance;

        private StatusCodes() {
            $statusTextMap = new HashMap<>();
            $statusTextMap.put(200, "OK");
            $statusTextMap.put(204, "OK No Content");
            $statusTextMap.put(400, "Bad Request");
            $statusTextMap.put(404, "Not Found");
        }

        private static StatusCodes getInstance() {
            if (StatusCodes.$instance == null) {
                StatusCodes.$instance = new StatusCodes();
            }
            return StatusCodes.$instance;
        }

        public static String getStatusText(int code) {
            return getInstance().$statusTextMap.get(code);
        }
    }

    FuseContext $context;
    private int $status;
    private Socket $client;
    private boolean $hasSentHeaders;

    private String $contentType;
    private long $contentLength;
    private final Handler $threadHandler;
    long $startTime;

    public FuseAPIResponse(FuseContext context, Socket client) {
        $startTime = SystemClock.elapsedRealtimeNanos();
        $context = context;
        HandlerThread thread = new HandlerThread("FuseAPIResponse_networkingThread");
        thread.start();
        $threadHandler = new Handler(thread.getLooper());
        $hasSentHeaders = false;
        $client = client;
        $status = FuseAPIResponseStatus.OK.getValue();
        $contentType = "application/octet-stream";
        $contentLength = 0;
    }

    public Handler getNetworkThreadHandler() {
        return $threadHandler;
    }

    public int getStatus() {
        return $status;
    }


    // Header APIs
    public void setStatus(int status) {
        $status = status;
    }

    public void setStatus(FuseAPIResponseStatus status) {
        setStatus(status.getValue());
    }

    public void setContentType(String type) {
        $contentType = type;
    }

    public void setContentLength(long size) {
        $contentLength = size;
    }

    public void sendHeaders(int status, String contentType, long contentLength) {
        setStatus(status);
        setContentType(contentType);
        setContentLength(contentLength);
        didFinishHeaders();
    }

    public void sendHeaders(FuseAPIResponseStatus status, String contentType, long contentLength) {
        sendHeaders(status.getValue(), contentType, contentLength);
    }

    public void didInternalError() {
        byte[] data = "Internal Error. See native logs for more details.".getBytes();
        sendHeaders(FuseAPIResponseStatus.INTERNAL, "text/plain", data.length);
        pushData(data);
        didFinish();
    }

    public void didFinishHeaders() {
        StringBuilder sb = new StringBuilder();
        sb.append("HTTP/1.1 ")
                .append(Integer.toString($status))
                .append(" ")
                .append(StatusCodes.getStatusText($status))
                .append("\r\n")
                .append("Access-Control-Allow-Origin: https://localhost\r\n")
                .append("Access-Control-Allow-Headers: *\r\n")
                .append("Cache-Control: no-cache\r\n")
                .append("Content-Type: ").append($contentType).append("\r\n")
                .append("Content-Length: ").append(Long.toString($contentLength)).append("\r\n")
                .append("\r\n");

        $write(sb.toString().getBytes(), true);

        $hasSentHeaders = true;
    }

    private void $write(byte[] data) {
        $write(data, false);
    }

    private void $write(byte[] data, boolean flush) {
        $threadHandler.post(() -> {
            __writeImpl(data, flush);
        });
    }

    protected void __writeImpl(byte[] data, boolean flush) {
        try {
            OutputStream io = $client.getOutputStream();
            io.write(data);
            if (flush) {
                io.flush();
            }
        }
        catch (IOException ex) {
            ex.printStackTrace();
            this.kill();
        }
    }

    public void pushData(byte[] data) {
        if (!$hasSentHeaders) {
            throw new RuntimeException("Cannot push data before headers have been sent. Call finishHeaders first!");
        }

        $write(data);
    }

    public void didFinish() {
        WeakReference<FuseAPIResponse> self = new WeakReference<>(this);
        $threadHandler.post(() -> {
            try {
                $client.getOutputStream().flush();
                $client.close();
                $printElapsedTime();
            } catch (IOException e) {
                e.printStackTrace();
                self.get().kill();
            }
        });
    }

    public void send(byte[] data, String contentType) {
        sendHeaders(FuseAPIResponseStatus.OK, contentType, data.length);
        pushData(data);
        didFinish();
    }

    public void send(byte[] data) {
        send(data, "application/octet-stream");
    }

    public void send(IFuseSerializable serializable) {
        send(serializable, "application/octet-stream");
    }

    public void send(IFuseSerializable serializable, String contentType) {
        byte[] data;
        try {
            data = serializable.serialize();
        }
        catch (JSONException ex) {
            ex.printStackTrace();
            data = new FuseError("FuseAPIResponse", 0, "Failed to serialize a serializable object").serialize().getBytes();
            contentType = "application/json";
        }
        send(data, contentType);
    }

    public void send(JSONObject json) {
        byte[] data = json.toString().getBytes();
        sendHeaders(FuseAPIResponseStatus.OK, "application/json", data.length);
        pushData(data);
        didFinish();
    }

    public void send(JSONArray json) {
        byte[] data = json.toString().getBytes();
        sendHeaders(FuseAPIResponseStatus.OK, "application/json", data.length);
        pushData(data);
        didFinish();
    }

    public void send(String stringData) {
        byte[] data = stringData.getBytes();
        sendHeaders(FuseAPIResponseStatus.OK, "text/plain", data.length);
        pushData(data);
        didFinish();
    }

    public void send(FuseError error) {
        byte[] data = error.serialize().getBytes();
        sendHeaders(FuseAPIResponseStatus.ERROR, "application/json", data.length);
        pushData(data);
        didFinish();
    }

    public void send() {
        sendHeaders(204, "text/plain", 0);
        didFinish();
    }

    public void kill() {
        $threadHandler.post(() -> {
            try {
                $client.close();
                $printElapsedTime();
            } catch (IOException e) {
                $printElapsedTime();
                throw new RuntimeException(e);
            }
        });
    }

    private void $printElapsedTime() {
        long elapsed = SystemClock.elapsedRealtimeNanos() - $startTime;
        double inSeconds = (double)elapsed / (double)1e9;

        $context.getLogger().info(TAG, String.format(Locale.US, "Response (Request %d) closed with status %d in %fs", $client.hashCode(), $status, inSeconds));
    }
}
