
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

package com.breautek.fuse.testtools;

import androidx.annotation.Nullable;

import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

import com.breautek.fuse.FuseContext;
import com.googlecode.junittoolbox.PollingWait;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

public class FuseTestAPIClient {
    private String $pluginID;
    private String $apiSecret;

    private PollingWait $waiter;
    private String $api;
    private int $port;

    private byte[] $content;
    private String $type;
    private final ExecutorService $bgThread;

    private static OkHttpClient $httpClient;

    public static class Builder {
        private String $pluginID;
        private String $apiSecret;
        private String $api;
        private int $port;

        private byte[] $content;
        private String $type;
        private FuseContext $context;


        public Builder() {}

        public Builder setFuseContext(FuseContext context) {
            $context = context;
            return this;
        }

        public Builder setPluginID(String id) {
            $pluginID = id;
            return this;
        }

        public Builder setAPIPort(int port) {
            $port = port;
            return this;
        }

        public Builder setAPISecret(String secret) {
            $apiSecret = secret;
            return this;
        }

        public Builder setEndpoint(String endpoint) {
            $api = endpoint;
            return this;
        }

        public Builder setContent(String content) {
            $content = content.getBytes();
            return this;
        }

        public Builder setContent(byte[] content) {
            $content = content;
            return this;
        }

        public Builder setType(String type) {
            $type = type;
            return this;
        }

        public FuseTestAPIClient build() throws NoSuchAlgorithmException, KeyManagementException {
            return new FuseTestAPIClient($context, $pluginID, $port, $apiSecret, $api, $content, $type);
        }
    }

    public static class FuseAPITestResponse {
        private final int $status;
        private final byte[] $data;

        public FuseAPITestResponse(int status, @Nullable byte[] data) {
            $status = status;
            $data = data;
        }

        public int getStatus() {
            return $status;
        }

        public byte[] readAsBinary() {
            return $data;
        }

        public String readAsString() {
            return new String($data);
        }
    }

    private static final String API_ENDPOINT_BASE = "https://localhost";
    private static final String SECRET_HEADER = "X-Fuse-Secret";

    private FuseContext $context;

    public FuseTestAPIClient(FuseContext context, String pluginID, int port, String secret, String endpoint, byte[] content, String type) throws NoSuchAlgorithmException, KeyManagementException {
        $context = context;
        $pluginID = pluginID;
        $port = port;
        $apiSecret = secret;
        $api = endpoint;
        $content = content;
        $type = type;
        $bgThread = Executors.newSingleThreadExecutor();

        TrustManager[] trustAllCertificates = new TrustManager[]{
                new X509TrustManager() {
                    @Override
                    public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {}

                    @Override
                    public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {}

                    @Override
                    public X509Certificate[] getAcceptedIssuers() {
                        return new X509Certificate[0];
                    }
                }
        };

        if ($httpClient == null) {
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustAllCertificates, new java.security.SecureRandom());
            $httpClient = new OkHttpClient.Builder()
                    .connectTimeout(10, TimeUnit.SECONDS)
                    .readTimeout(60, TimeUnit.SECONDS)
                    .writeTimeout(60, TimeUnit.SECONDS)
                    .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCertificates[0])
                    .hostnameVerifier((hostname, session) -> true) // Allow all hostnames
                    .build();
        }
    }

    public FuseAPITestResponse execute() {
        PollingWait waiter = new PollingWait().timeoutAfter(60, TimeUnit.SECONDS).pollEvery(100, TimeUnit.MILLISECONDS);

        Future<FuseAPITestResponse> future = $bgThread.submit(new Callable<FuseAPITestResponse>() {
            @Override
            public FuseAPITestResponse call() throws Exception {
                Request request = new Request.Builder()
                        .url($getEndpoint())
                        .addHeader(SECRET_HEADER, $apiSecret)
                        .post(RequestBody.create($content, MediaType.parse($type)))
                        .build();

                Response httpResponse = $httpClient.newCall(request).execute();

                ResponseBody body = httpResponse.body();
                byte[] data = null;
                if (body != null) {
                    data = body.bytes();
                }

                return new FuseAPITestResponse(httpResponse.code(), data);
            }
        });

        waiter.until(new Callable<Boolean>() {
            @Override
            public Boolean call() throws Exception {
                return future.isDone() || future.isCancelled();
            }
        });

        FuseAPITestResponse response = null;

        try {
            response = future.get();
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        return response;
    }

    private String $getEndpoint() {
        return API_ENDPOINT_BASE + ":" + $port + "/api/" + $pluginID + $api;
    }
}
