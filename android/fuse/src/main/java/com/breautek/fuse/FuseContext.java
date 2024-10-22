
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

import androidx.annotation.NonNull;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.net.http.SslError;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.SslErrorHandler;
import android.webkit.WebView;
import androidx.fragment.app.FragmentActivity;
import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.util.Map;
import java.util.HashMap;

import com.breautek.fuse.plugins.FuseRuntime;
import com.breautek.fuse.utils.IProgressContext;
import com.breautek.fuse.utils.IProgressContextListener;
import com.breautek.fuse.utils.ProgressContext;

import org.bouncycastle.operator.OperatorCreationException;

import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import javax.net.ssl.SSLContext;

public class FuseContext implements IProgressContextListener  {
    private static final String TAG = "FuseContext";

    private final FragmentActivity $context;

    private final IProgressContext $loadProgress;

    /*package private*/ final ReadWriteLock $pluginMapLock;
    private final Map<String, FusePlugin> $pluginMap;

    private final FuseAPIRouter $apiRouter;

    public static final String SCHEME = "https";
    public static final String HOST = "localhost";

    private final Handler $mainThread;

    private FuseAPIServer $apiServer;

    private final PermissionRequestHandler $permissionRequestHandler;

    private FuseAPIResponseFactory $responseFactory;

    private final FuseLogger $logger;
    private final FuseScreenUtils $screenUtils;
    private final FuseRuntime $runtime;
    private final IReadyCallback $readyCallback;
    private final FuseFragment $view;

    private static final String LOAD_CONTEXT_CORE = "FuseContext_core";
    private static final String LOAD_CONTEXT_API_SERVER = "FuseContext_apiServer";
    private static final String LOAD_CONTEXT_CORE_PLUGINS = "FuseContext_corePlugins";
    private static final String LOAD_CONTEXT_WEBVIEW = "FuseContext_webview";

    public static interface IReadyCallback {
        void onReady();
    }

    public FuseContext(FuseFragment view, FragmentActivity context, IReadyCallback callback) {
        $context = context;
        $view = view;
        $readyCallback = callback;
        $loadProgress = new ProgressContext();

        $loadProgress.createProgress(LOAD_CONTEXT_CORE);
        $loadProgress.createProgress(LOAD_CONTEXT_API_SERVER);
        $loadProgress.createProgress(LOAD_CONTEXT_CORE_PLUGINS);
        $loadProgress.createProgress(LOAD_CONTEXT_WEBVIEW);

        $loadProgress.setMax(LOAD_CONTEXT_CORE, 1);
        $loadProgress.setMax(LOAD_CONTEXT_API_SERVER, 1);
        $loadProgress.setMax(LOAD_CONTEXT_CORE_PLUGINS, 1);
        $loadProgress.setMax(LOAD_CONTEXT_WEBVIEW, 1);

        $loadProgress.addListener(this);

        $screenUtils = new FuseScreenUtils(context);
        $logger = new FuseLogger(this);
        $responseFactory = new FuseAPIResponseFactory();
        $mainThread = new Handler(Looper.getMainLooper());
        $permissionRequestHandler = _createPermissionRequest();
        $pluginMapLock = new ReentrantReadWriteLock();
        $pluginMap = new HashMap<String, FusePlugin>();
        $apiRouter = new FuseAPIRouter(this);
        $loadProgress.update(LOAD_CONTEXT_CORE, 1);

        $runtime = new FuseRuntime(this);
        registerPlugin($runtime);

        $loadProgress.update(LOAD_CONTEXT_CORE_PLUGINS, 1);
    }

    public FuseFragment getView() {
        return $view;
    }

    public FuseRuntime getRuntime() {
        return $runtime;
    }

    public FuseScreenUtils getScreenUtils() {
        return $screenUtils;
    }

    public String getHost() {
        return HOST;
    }

    public SSLContext getSSLContext() {
        return $apiServer.getSSLContext();
    }

    public void setResponseFactory(FuseAPIResponseFactory factory) {
        $responseFactory = factory;
    }

    public FuseAPIResponseFactory getResponseFactory() {
        return $responseFactory;
    }

    protected PermissionRequestHandler _createPermissionRequest() {
        return new PermissionRequestHandler(this);
    }

    public FuseLogger getLogger() {
        return $logger;
    }

    public PermissionRequestHandler getPermissionRequestHandler() {
        return $permissionRequestHandler;
    }

    public boolean isDebug() {
        try {
            Context context = getActivityContext();
            PackageManager pm = context.getPackageManager();
            ApplicationInfo appInfo = pm.getApplicationInfo(context.getPackageName(), 0);
            return (appInfo.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        } catch (PackageManager.NameNotFoundException e) {
            // Handle the exception as needed.
            return false; // Return a default value in case of an error.
        }
    }

    public IProgressContext getProgressContext() {
        return $loadProgress;
    }

    public void onReceivedSslError(WebView webview, SslErrorHandler handler, SslError error) {
        if (error.getPrimaryError() == SslError.SSL_UNTRUSTED) {
            // Test the certificate for our own generated certificate and if so, let it pass,
            if ($apiServer.verifyCertificate(error.getCertificate())) {
                handler.proceed();
            }
            else {
                handler.cancel();
            }
        }
        else {
            handler.cancel();
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    public void onCreate(Bundle bundle) {
        if (isDebug()) {
            int logLevel = $logger.getLevel();
            logLevel |= FuseLoggerLevel.DEBUG;
            $logger.setLevel(logLevel);
        }

        $logger.info(TAG, "Fuse Version: " + BuildConfig.FUSE_VERSION);

        final FuseContext self = this;
        new Thread(() -> {
            try {
                $apiServer = new FuseAPIServer(self);
            } catch (
              IOException | UnrecoverableKeyException | CertificateException |
              NoSuchAlgorithmException | KeyStoreException | OperatorCreationException |
              KeyManagementException
              e
            ) {
                throw new RuntimeException(e);
            }
            $loadProgress.update(LOAD_CONTEXT_API_SERVER, 1);
            Log.i(TAG, "API Server Port: " + $apiServer.getPort());

            self.runOnMainThread($readyCallback::onReady);
        }).start();
    }

    public void onLowMemory() {
        $pluginMapLock.readLock().lock();
        for (FusePlugin plugin : $pluginMap.values()) {
            plugin.onLowMemory();
        }
        $pluginMapLock.readLock().unlock();
    }

    public void onPause() {
        $pluginMapLock.readLock().lock();
        for (FusePlugin plugin : $pluginMap.values()) {
            plugin.onPause();
        }
        $pluginMapLock.readLock().unlock();
    }

    public void onResume() {
        $pluginMapLock.readLock().lock();
        for (FusePlugin plugin : $pluginMap.values()) {
            plugin.onResume();
        }
        $pluginMapLock.readLock().unlock();
    }

    public void onSaveInstanceState(@NonNull Bundle outState) {
        $pluginMapLock.readLock().lock();
        for (FusePlugin plugin : $pluginMap.values()) {
            plugin.onSaveInstanceState(outState);
        }
        $pluginMapLock.readLock().unlock();
    }

    public void onStart() {
        $pluginMapLock.readLock().lock();
        for (FusePlugin plugin : $pluginMap.values()) {
            plugin.onStart();
        }
        $pluginMapLock.readLock().unlock();
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        $pluginMapLock.readLock().lock();
        for (FusePlugin plugin : $pluginMap.values()) {
            plugin.onActivityResult(requestCode, resultCode, data);
        }
        $pluginMapLock.readLock().unlock();
    }

    public void onStop() {
        $pluginMapLock.readLock().lock();
        for (FusePlugin plugin : $pluginMap.values()) {
            plugin.onStop();
        }
        $pluginMapLock.readLock().unlock();
    }

    public void onRequestPermissionResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        $permissionRequestHandler.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    public void onDestroy() {
        $pluginMapLock.readLock().lock();
        for (FusePlugin plugin : $pluginMap.values()) {
            plugin.onDestroy();
        }
        $pluginMapLock.readLock().unlock();
    }

    public WebView getWebview() {
        return $view.getWebview();
    }

    public FragmentActivity getActivityContext() {
        return $context;
    }

    public void registerPlugin(FusePlugin plugin) {
        $pluginMapLock.writeLock().lock();
        $registerPlugin(plugin);
        $pluginMapLock.writeLock().unlock();
    }

    void $registerPlugin(FusePlugin plugin) {
        if ($pluginMap.containsKey(plugin.getID())) {
            $logger.warn(TAG, "Plugin \"" + plugin.getID() + "\" is already registered.");
            return;
        }

        $pluginMap.put(plugin.getID(), plugin);
    }

    public FusePlugin getPlugin(String pluginID) {
        return $pluginMap.getOrDefault(pluginID, null);
    }

    public FuseAPIRouter getAPIRouter() {
        return $apiRouter;
    }

    @JavascriptInterface
    public String getAPISecret() {
        return $apiServer.getSecretKey();
    }

    @JavascriptInterface
    public int getAPIPort() {
        return $apiServer.getPort();
    }

    @JavascriptInterface
    public void setLogCallback(String callbackID) {
        $logger.setCallbackID(callbackID);
    }

    @JavascriptInterface
    public void log(int level, String message) {
        String tag = "FuseWebviewRuntime";

        switch (level) {
            case FuseLoggerLevel.DEBUG:
                Log.d(tag, message);
                break;
            case FuseLoggerLevel.INFO:
                Log.i(tag, message);
                break;
            case FuseLoggerLevel.WARN:
                Log.w(tag, message);
                break;
            case FuseLoggerLevel.ERROR:
                Log.e(tag, message);
                break;
        }
    }

    @JavascriptInterface
    public void onWebviewReady() {
        $loadProgress.update(LOAD_CONTEXT_WEBVIEW, 1);
    }

    public void execCallback(String callbackID, String payload) {
        $mainThread.post(() -> {
            $view.getWebview().evaluateJavascript(String.format("window.__btfuse_doCallback(\"%s\",\"%s\");", callbackID, payload.replace("\"", "\\\"")), null);
        });
    }

    public void execCallback(String callbackID) {
        $mainThread.post(() -> {
            $view.getWebview().evaluateJavascript(String.format("window.__btfuse_doCallback(\"%s\");", callbackID), null);
        });
    }

    public void runOnMainThread(Runnable runnable) {
        $mainThread.post(runnable);
    }

    @Override
    public void onProgressUpdate(IProgressContext context) {
        if (context.isComplete()) {
            $mainThread.postDelayed($view::onFuseLoad, 300);
        }
    }
}
