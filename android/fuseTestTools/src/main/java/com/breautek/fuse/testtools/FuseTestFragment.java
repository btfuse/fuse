package com.breautek.fuse.testtools;

import android.os.Bundle;
import android.webkit.WebView;

import androidx.annotation.Nullable;

import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FuseFragment;

public class FuseTestFragment extends FuseFragment {
    @Override
    protected void _onContextReady(@Nullable Bundle savedInstanceState) {
        super._onContextReady(savedInstanceState);
        // WebView webview = getWebview();
//        FuseContext ctx = getFuseContext();
//        webview.addJavascriptInterface(ctx, "BTFuseNative");
    }
}
