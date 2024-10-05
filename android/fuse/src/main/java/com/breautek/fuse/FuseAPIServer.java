
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

import android.net.http.SslCertificate;
import android.os.Build;
import android.os.Bundle;

import org.bouncycastle.asn1.ASN1ObjectIdentifier;
import org.bouncycastle.asn1.x500.RDN;
import org.bouncycastle.asn1.x500.X500Name;
import org.bouncycastle.operator.OperatorCreationException;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLException;
import javax.net.ssl.SSLServerSocket;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLServerSocketFactory;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.TrustManagerFactory;
import java.net.Socket;
import java.security.InvalidKeyException;
import java.security.KeyManagementException;
import java.security.KeyPair;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PublicKey;
import java.security.SignatureException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.sql.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class FuseAPIServer {

    public static final String TAG = "FuseAPIServer";

    private final SSLServerSocket $httpServer;
    private final SSLContext $sslContext;
    private final FuseContext $context;

    private final FuseCertificateProvider $certProvider;
    private final FuseCertificateProvider.FuseCertificate $certificate;

    private final String UID_OID = "0.9.2342.19200300.100.1.1";

    String $secret;

    public FuseAPIServer(FuseContext context) throws IOException, NoSuchAlgorithmException, CertificateException, OperatorCreationException, KeyStoreException, UnrecoverableKeyException, KeyManagementException {
        $sslContext = SSLContext.getInstance("TLS");

        $certProvider = new FuseCertificateProvider();
        $certProvider.install();
        $certificate = $certProvider.generate();

        KeyStore keystore = KeyStore.getInstance("PKCS12");
        keystore.load(null, null);
        keystore.setKeyEntry("fuse-api-certificate", $certificate.keypair.getPrivate(), null, new X509Certificate[]{$certificate.certificate});

        KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
        keyManagerFactory.init(keystore, null);

        $sslContext.init(keyManagerFactory.getKeyManagers(), null, null);

        $context = context;
        $secret = $generateSecret();

        SSLServerSocketFactory sslServerSocketFactory = $sslContext.getServerSocketFactory();

        $httpServer = (SSLServerSocket) sslServerSocketFactory.createServerSocket(0);

        String[] supportedProtocols = $httpServer.getSupportedProtocols();
        ArrayList<String> enabledProtocols = new ArrayList<>();
        for (String protocol : supportedProtocols) {
            if (
                protocol.equals("TLSv1.2") ||
                protocol.equals("TLSv.1.3")
            ) {
                enabledProtocols.add(protocol);
            }
        }
        $httpServer.setEnabledProtocols(enabledProtocols.toArray(new String[0]));

        FuseLogger logger = $context.getLogger();

        Thread serverThread = new Thread(() -> {
            try {
                while (true) {
                    Socket client = $httpServer.accept();
                    SSLSocket secureSocket = (SSLSocket)client;

                    new Thread(() -> {
                        try {
                            secureSocket.startHandshake();
                            $handleConnection(client);
                        }
                        catch (SSLException e) {
                            String message = e.getMessage();

                            // If the message is for an unknown CA, then it's expected so don't log
                            // it. Note that the chromium package will still log out handshake
                            // failures. The error is produced and sent to the Webview's
                            // onReceivedSslError hook in which case if the WebViewClient proceeds
                            // the webview will automatically retry the request.
                            if (message != null && message.contains("SSLV3_ALERT_CERTIFICATE_UNKNOWN")) {
                                try {
                                    client.close();
                                }
                                catch (IOException ex) {
                                    logger.error(TAG, "Client IO Error: ", e);
                                }
                            }
                            else {
                                logger.error(TAG, "Client SSL Error: ", e);
                                try {
                                    client.close();
                                }
                                catch (IOException ex) {
                                    logger.error(TAG, "Client IO Error: ", e);
                                }
                            }
                        }
                        catch (IOException e) {
                            logger.error(TAG, "Client Socket Error: ", e);
                            try {
                                client.close();
                            }
                            catch (IOException ex) {
                                logger.error(TAG, "Client Socket Error: ", e);
                            }
                        }
                    }).start();
                }
            }
            catch (IOException e) {
                logger.error(TAG, "Socket Error:", e);
            }
        });

        serverThread.start();
    }

    public SSLContext getSSLContext() {
        return $sslContext;
    }

    public String getSecretKey() {
        return $secret;
    }

    private String $generateSecret() {
        return FuseSecretGenerator.generate();
    }

    private static class Header {
        private final String $method;
        private final String $version;
        private final String $path;

        private final Map<String, String> $headers;

        public Header(String method, String version, String path) {
            $method = method;
            $version = version;
            $path = path;
            $headers = new HashMap<>();
        }

        public void addHeaderLine(String header) {
            String[] parts = header.split(":");
            $headers.put(parts[0].trim(), parts[1].trim());
        }

        public String getVersion() {
            return $version;
        }

        public String getMethod() {
            return $method;
        }

        public String getPath() {
            return $path;
        }

        public Map<String, String> getHeaders() {
            return $headers;
        }
    }

    private Header $parseHeader(InputStream input) throws IOException {
        byte p = '\0', c = '\0';

        // First need to read the first line:
        StringBuilder sb = new StringBuilder();
        int byteRead = -1;
        long totalBytesRead = 0;
        while ((byteRead = input.read()) != -1) {
            c = (byte)byteRead;
            totalBytesRead++;

            if (p == '\r' && c == '\n') {
                break;
            }

            if (c != '\r' && c != '\n') {
                sb.append((char) c);
            }

            p = c;
        }

        if (totalBytesRead == 0) {
            return null;
        }

        String initialLine = sb.toString();

        String[] parts = initialLine.split(" ");
        if (parts.length < 3) {
            throw new IOException("Malformed HTTP header");
        }

        String method = parts[0];
        String url = parts[1];
        String version = parts[2];

        Header header = new Header(method, version, url);

        sb = new StringBuilder();
        byteRead = -1;
        p = '\0';
        c = '\0';
        String line = "";
        while ((byteRead = input.read()) != -1) {
            c = (byte)byteRead;

            if (p == '\r' && c == '\n') {
                p = '\0';
                c = '\0';
                line = sb.toString();

                // First check if we have header content
                if (!line.equals("")) {
                    // add it to our header context
                    header.addHeaderLine(line);
                }
                else {
                    // if line is empty, then this signals the end of header information.
                    // The remaining of the bytes will be the HTTP body
                    break;
                }

                // Replace to start the new line
                sb = new StringBuilder();
                continue;
            }

            if (c != '\r' && c != '\n') {
                sb.append((char)c);
            }

            p = c;
        }

        return header;
    }

    boolean $assertSecret(Header header) {
        String secret = header.getHeaders().getOrDefault("X-Fuse-Secret", null);
        if (secret == null) {
            return false;
        }

        return secret.equals($secret);
    }

    private void $handleConnection(Socket client) throws IOException {
        Header header = $parseHeader(client.getInputStream());

        if (header == null) {
            client.close();
            return;
        }

        $context.getLogger().info(TAG, String.format(Locale.US, "API Server Request (%d): (%s) (%s)", client.hashCode(), header.getMethod(), header.getPath()));

        if (header.getMethod().equals("OPTIONS")) {
            FuseAPIResponse res = $context.getResponseFactory().create($context, client);
            res.setStatus(FuseAPIResponseStatus.OK);
            res.setContentType("text/plain");
            res.setContentLength(0);
            res.didFinishHeaders();
            res.didFinish();
            return;
        }

        if (!$assertSecret(header)) {
            client.close();
            return;
        }

        FuseAPIResponse response = $context.getResponseFactory().create($context, client);
        FuseAPIPacket packet = new FuseAPIPacket(header.getPath(), header.getHeaders(), client.getInputStream());
        $context.getAPIRouter().execute(packet, response);
    }

    public int getPort() {
        return $httpServer.getLocalPort();
    }

    public boolean verifyCertificate(SslCertificate certificate) {

        X509Certificate x509 = null;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            x509 = certificate.getX509Certificate();
        }
        else {
            Bundle bundledState = SslCertificate.saveState(certificate);
            byte[] data = bundledState.getByteArray("x509-certificate");

            if (data == null) {
                return false;
            }

            try {
                CertificateFactory factory = CertificateFactory.getInstance("X.509");
                x509 = (X509Certificate) factory.generateCertificate(new ByteArrayInputStream(data));
            }
            catch (CertificateException ex) {
                return false;
            }
        }

        if (x509 == null) {
            return false;
        }

        KeyPair kp = $certificate.keypair;
        PublicKey publicKey = kp.getPublic();

        try {
            x509.verify(publicKey);
        } catch (
            CertificateException        |
            InvalidKeyException         |
            NoSuchAlgorithmException    |
            SignatureException          |
            NoSuchProviderException     e
        ) {
            e.printStackTrace();
            return false;
        }

        X500Name dname = new X500Name(certificate.getIssuedTo().getDName());
        RDN[] rdns = dname.getRDNs(new ASN1ObjectIdentifier(UID_OID));
        if (rdns.length == 0) {
            return false;
        }

        RDN uidAttr = rdns[0];
        String uid = uidAttr.getFirst().getValue().toString();

        return uid.equals(this.$certificate.signature);
    }
}
