package com.breautek.fuse.nativeview;

import android.content.res.Resources;
import android.os.Build;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewClientCompat;

import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FuseScreenUtils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class NativeOverlay {
    private final FuseContext $context;
    @NonNull
    private final View $view;

    private final RectManager $rectManager;

    public NativeOverlay(FuseContext context, IOverlayBuilder builder) {
        $context = context;
        $rectManager = new RectManager();
        builder.setRectManager($rectManager);
        $view = builder.build();
    }

    @NonNull
    public View getView() {
        return $view;
    }

    public static interface IOverlayBuilder {
        IOverlayBuilder setRectManager(RectManager rm);
        View build();
    }

    public boolean willRespondTo(MotionEvent evt) {
        FuseScreenUtils utils = $context.getScreenUtils();

        float x = utils.toWebviewPx(evt.getX());
        float y = utils.toWebviewPx(evt.getY());

        boolean willRespond = false;

        ArrayList<NativeRect> rects = $rectManager.getRects();
        for (NativeRect r : rects) {
            if (x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height) {
                willRespond = true;
                break;
            }
        }

        return willRespond;
    }

    public static class RectManager {
        private final ArrayList<NativeRect> $rects;

        public RectManager() {
            $rects = new ArrayList<>();
        }

        public ArrayList<NativeRect> getRects() {
            return $rects;
        }

        @JavascriptInterface
        public void setDOMRects(String serializedRects) {
            ArrayList<NativeRect> rects = new ArrayList<>();

            try {
                JSONArray rectList = new JSONArray(serializedRects);
                for (int i = 0; i < rectList.length(); i++) {
                    JSONObject rectObj = rectList.getJSONObject(i);
                    rects.add(NativeRect.fromJSONObject(rectObj));
                }
            }
            catch (JSONException ex) {
                ex.printStackTrace();
                return;
            }

            synchronized ($rects) {
                $rects.clear();
                $rects.addAll(rects);
            }
        }
    }

    public static class WebviewBuilder implements IOverlayBuilder {
        private final FuseContext $context;

        private String $html;
        private String $file;

        private RectManager $rectManager;

        public WebviewBuilder(FuseContext context) {
            $context = context;
            $html = null;
            $file = null;
            $rectManager = null;
        }

        public WebviewBuilder setRectManager(RectManager manager) {
            $rectManager = manager;
            return this;
        }

        public WebviewBuilder setHTMLString(String html) {
            $html = html;
            return this;
        }

        public WebviewBuilder setFile(String path) {
            $file = path;
            return this;
        }

        public WebviewBuilder setFile(File file) {
            $file = file.getAbsolutePath();
            return this;
        }

        public View build() {
            if ($html == null && $file == null) {
                throw new RuntimeException("An HTML string or HTML file path must be set to build a NativeOverlay.");
            }

            WebView webview = new WebView($context.getActivityContext());
            webview.setBackgroundColor(0x0);

            final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                    .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler($context.getActivityContext()))
                    .setHttpAllowed(false)
                    .setDomain($context.getHost())
                    .build();

            webview.setWebViewClient(new WebViewClientCompat() {
                @Override
                public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                    return assetLoader.shouldInterceptRequest((request.getUrl()));
                }

                @Override
                public void onPageFinished(WebView view, String url) {
                    String apiScript = null;
                    try {
                        InputStream overlayAPIScriptStream = $context.getActivityContext().getResources().openRawResource(R.raw.overlay);

                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                            byte[] bytes = overlayAPIScriptStream.readAllBytes();
                            apiScript = new String(bytes);
                        } else {
                            StringBuilder stringBuilder = new StringBuilder();
                            try (BufferedReader reader = new BufferedReader(new InputStreamReader(overlayAPIScriptStream))) {
                                String line;
                                while ((line = reader.readLine()) != null) {
                                    stringBuilder.append(line).append("\n");
                                }
                            }
                            apiScript = stringBuilder.toString();
                        }

                        overlayAPIScriptStream.close();
                    } catch (Resources.NotFoundException | IOException ex) {
                        ex.printStackTrace();
                    }

                    if (apiScript == null) {
                        return;
                    }

                    view.evaluateJavascript(apiScript, null);
                }
            });

            if ($rectManager != null) {
                webview.addJavascriptInterface($rectManager, "BTFuseNativeOverlay");
            }

            WebSettings settings = webview.getSettings();
            settings.setAllowFileAccess(false);
            settings.setAllowContentAccess(false);
            // TODO: Make this false by default, but allow it to be enabled via options
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(false);

            if ($html != null) {
                webview.loadData($html, "text/html", "utf-8");
            }
            else {
                String endpoint = "https://" + $context.getHost() + $file;
                webview.loadUrl(endpoint);
            }

            return webview;
        }
    }
}
