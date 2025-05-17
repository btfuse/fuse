
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
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Locale;

/**
 * <p>A class to represent a response to a {@link FuseAPIPacket}.</p>
 * <p>The object must be used in two parts:</p>
 * <ol>
 *     <li>Set header information, including status code, content type, and content length. Then call {@link #didFinishHeaders()}</li>
 *     <li>Then push data up to the content length in bytes. Then call {@link #didFinish()}</li>
 * </ol>
 * <p>Once {@link #didFinish()} is invoked, the packet is considered finalized. No other data can be pushed.</p>
 * <p>Alternatively, there are several convenient methods available that handles setting up setting up
 * the headers, and pushing the data for you, using any of the send(...) methods.
 * Knowing how to manually setup the response is still valuable for when you need to push data chunks.</p>
 */
public class FuseAPIResponse {

    private static final String TAG = "FuseAPIResponse";

    public static enum Mode {
        STANDARD,
        CHUNK
    }

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
    private final Socket $client;
    private boolean $hasSentHeaders;

    private Mode $mode;

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
        $mode = Mode.STANDARD;
    }

    public Handler getNetworkThreadHandler() {
        return $threadHandler;
    }

    public int getStatus() {
        return $status;
    }


    // Header APIs
    /**
     * Sets the status code of the response.
     * Must be called before {@link #didFinishHeaders()}
     * @param status the status code
     */
    public void setStatus(int status) {
        $status = status;
    }

    /**
     * Sets the status code of the response.
     * Must be called before {@link #didFinishHeaders()}
     * @param status the status code
     */
    public void setStatus(FuseAPIResponseStatus status) {
        setStatus(status.getValue());
    }

    /**
     * Sets the transfer mode.
     * If STANDARD, contentLength is required.
     * If CHUNK, contentLength will be ignored.
     *
     * @param mode The transfer mode
     */
    public void setMode(Mode mode) {
        $mode = mode;
    }

    /**
     * Sets the content type of the response.
     * Must be called before {@link #didFinishHeaders()}
     * @param type The content type
     */
    public void setContentType(String type) {
        $contentType = type;
    }

    /**
     * Sets the content length of the response.
     * Must be called before {@link #didFinishHeaders()}
     * Ignored if transfer mode is set to Mode.CHUNK
     * @param size The content length in bytes
     */
    public void setContentLength(long size) {
        $contentLength = size;
    }

    /**
     * <p>A convenient method for setting the status code, content type and content length.
     *      * Must be called before {@link #didFinishHeaders()}.</p>
     * <p>This method sends the headers. It internally calls {@link #didFinishHeaders()}.
     * After calling this method, only data can be pushed, up to the configured content length.</p>
     * @param status the status code
     * @param contentType the content type
     * @param contentLength the content size in bytes
     */
    public void sendHeaders(int status, String contentType, long contentLength) {
        setStatus(status);
        setMode(Mode.STANDARD);
        setContentType(contentType);
        setContentLength(contentLength);
        didFinishHeaders();
    }

    /**
     * <p>A convenient method for setting the status code, content type and content length.
     *      * Must be called before {@link #didFinishHeaders()}.</p>
     * <p>This method sends the headers. It internally calls {@link #didFinishHeaders()}.
     * After calling this method, only data can be pushed, up to the configured content length.</p>
     * @param status the status code
     * @param contentType the content type
     * @param contentLength the content size in bytes
     */
    public void sendHeaders(FuseAPIResponseStatus status, String contentType, long contentLength) {
        sendHeaders(status.getValue(), contentType, contentLength);
    }

    /**
     * A convenience method for sending an "internal error" message to the client.
     * This method must be called before {@link #didFinishHeaders()} and calling this method finalizes
     * the packet.
     */
    public void didInternalError() {
        byte[] data = "Internal Error. See native logs for more details.".getBytes();
        sendHeaders(FuseAPIResponseStatus.INTERNAL, "text/plain", data.length);
        pushData(data);
        didFinish();
    }

    /**
     * <p>Finalizes the header state by preparing the headers and sending them to the wire.
     *    Once this method is called, no more header configuration methods can be called.</p>
     * <p>After calling this method, use {@link #pushData(byte[])} to send data to the wire, up
     * to the specified content size of the packet.</p>
     */
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
                .append("Content-Type: ").append($contentType).append("\r\n");

        switch ($mode) {
            case STANDARD:
                sb.append("Content-Length: ").append(Long.toString($contentLength)).append("\r\n");
                break;
            case CHUNK:
                sb.append("Transfer-Encoding: Chunked\r\n");
                break;
        }

        sb.append("\r\n");

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
            if ($mode == Mode.CHUNK) {
                int payloadSize = data.length;
                String header = Integer.toHexString(payloadSize) + "\r\n";
                io.write(header.getBytes(StandardCharsets.US_ASCII));
            }
            io.write(data);
            if ($mode == Mode.CHUNK) {
                io.write("\r\n".getBytes(StandardCharsets.US_ASCII));
            }
            if (flush) {
                io.flush();
            }
        }
        catch (IOException ex) {
            ex.printStackTrace();
            this.kill();
        }
    }

    /**
     * <p>Pushes data to the wire. Use this method after finalizes packet headers by using {@link #sendHeaders(int, String, long)}.
     * Only send exactly the amount of data described by the content size of the packet.</p>
     * </p>If less than the content size is sent, hanging will occur on the client waiting for the missing bytes.</p>
     * <p>If more data than the content size is sent, may introduce buffer overflows.</p>
     * @param data the data chunk
     */
    public void pushData(byte[] data) {
        if (!$hasSentHeaders) {
            throw new RuntimeException("Cannot push data before headers have been sent. Call finishHeaders first!");
        }

        $write(data);
    }

    /**
     * Finalizes this packet by ensuring that the output stream is flushed to the wire and closes
     * the socket connection.
     */
    public void didFinish() {
        WeakReference<FuseAPIResponse> self = new WeakReference<>(this);
        $threadHandler.post(() -> {
            try {
                if ($mode == Mode.CHUNK) {
                    __writeImpl(new byte[0], false); // Write empty chunk
                    $client.getOutputStream().write("\r\n".getBytes(StandardCharsets.US_ASCII)); // Terminate the chunked stream
                }
                $client.getOutputStream().flush();
                $client.close();
                $printElapsedTime();
            } catch (IOException e) {
                e.printStackTrace();
                self.get().kill();
            }
        });
    }

    /**
     * Convenience method that calls {@link #sendHeaders(FuseAPIResponseStatus, String, long)}
     * and pushes the data and finalizes the packet with {@link #didFinish()}
     * @param data The data
     * @param contentType the content type of data
     */
    public void send(byte[] data, String contentType) {
        sendHeaders(FuseAPIResponseStatus.OK, contentType, data.length);
        pushData(data);
        didFinish();
    }

    /**
     * Convenience method that calls {@link #sendHeaders(FuseAPIResponseStatus, String, long)}
     * and pushes the data and finalizes the packet with {@link #didFinish()}
     * @param data The data assumed to be untyped raw binary.
     */
    public void send(byte[] data) {
        send(data, "application/octet-stream");
    }

    /**
     * Convenience method that calls {@link #sendHeaders(FuseAPIResponseStatus, String, long)}
     * and pushes the data and finalizes the packet with {@link #didFinish()}
     * @param serializable The serializable data assumed to be untyped raw binary.
     */
    public void send(IFuseSerializable serializable) {
        send(serializable, "application/octet-stream");
    }

    /**
     * Convenience method that calls {@link #sendHeaders(FuseAPIResponseStatus, String, long)}
     * and pushes the data and finalizes the packet with {@link #didFinish()}
     * @param serializable The serializable data
     * @param contentType The content type of serializable data
     */
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

    /**
     * Convenience method that calls {@link #sendHeaders(FuseAPIResponseStatus, String, long)}
     * and pushes the data and finalizes the packet with {@link #didFinish()}
     * @param json The JSON data to send
     */
    public void send(JSONObject json) {
        byte[] data = json.toString().getBytes();
        sendHeaders(FuseAPIResponseStatus.OK, "application/json", data.length);
        pushData(data);
        didFinish();
    }

    /**
     * Convenience method that calls {@link #sendHeaders(FuseAPIResponseStatus, String, long)}
     * and pushes the data and finalizes the packet with {@link #didFinish()}
     * @param json The JSON data to send
     */
    public void send(JSONArray json) {
        byte[] data = json.toString().getBytes();
        sendHeaders(FuseAPIResponseStatus.OK, "application/json", data.length);
        pushData(data);
        didFinish();
    }

    /**
     * Convenience method that calls {@link #sendHeaders(FuseAPIResponseStatus, String, long)}
     * and pushes the data and finalizes the packet with {@link #didFinish()}
     * @param stringData The string data to send
     */
    public void send(String stringData) {
        byte[] data = stringData.getBytes();
        sendHeaders(FuseAPIResponseStatus.OK, "text/plain", data.length);
        pushData(data);
        didFinish();
    }

    /**
     * Convenience method that calls {@link #sendHeaders(FuseAPIResponseStatus, String, long)}
     * and pushes the data and finalizes the packet with {@link #didFinish()}
     * @param error The error data to send
     */
    public void send(FuseError error) {
        byte[] data = error.serialize().getBytes();
        sendHeaders(FuseAPIResponseStatus.ERROR, "application/json", data.length);
        pushData(data);
        didFinish();
    }

    /**
     * Convenience method that calls {@link #sendHeaders(FuseAPIResponseStatus, String, long)}
     * and pushes the data and finalizes the packet with {@link #didFinish()}. No data is sent
     * other than header data indicating that the packet has no data.
     */
    public void send() {
        sendHeaders(204, "text/plain", 0);
        didFinish();
    }

    /**
     * Abruptly kill the connection with no reason given to the client.
     * Ideally use {@link #send(FuseError)} to provide error feedback to the client.
     */
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
