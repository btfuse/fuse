
/*
Copyright 2025 Breautek

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

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.webkit.JsPromptResult;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.EditText;

import androidx.appcompat.app.AlertDialog;

/**
 * Chrome client implementation to handle creating JS dialogs.
 */
public class FuseChromeClient extends WebChromeClient  {
    private String $getAppName(Context context) {
        ApplicationInfo applicationInfo = context.getApplicationInfo();
        int stringId = applicationInfo.labelRes;

        return stringId == 0
               ? applicationInfo.nonLocalizedLabel.toString()
               : context.getString(stringId);
    }

    @Override
    public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
        new AlertDialog.Builder(view.getContext())
        .setTitle($getAppName(view.getContext()))
        .setMessage(message)
        .setPositiveButton(android.R.string.ok, (dialog, which) -> result.confirm())
        .setCancelable(false)
        .create()
        .show();
        return true;
    }

    @Override
    public boolean onJsConfirm(WebView view, String url, String message, JsResult result) {
        new AlertDialog.Builder(view.getContext())
        .setTitle($getAppName(view.getContext()))
        .setMessage(message)
        .setPositiveButton(android.R.string.yes, (dialog, which) -> result.confirm())
        .setNegativeButton(android.R.string.no, (dialog, which) -> result.cancel())
        .create()
        .show();
        return true;
    }

    @Override
    public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, JsPromptResult result) {
        final EditText input = new EditText(view.getContext());
        input.setText(defaultValue);

        new AlertDialog.Builder(view.getContext())
        .setTitle($getAppName(view.getContext()))
        .setMessage(message)
        .setView(input)
        .setPositiveButton(android.R.string.ok, (dialog, which) -> result.confirm(input.getText().toString()))
        .setNegativeButton(android.R.string.cancel, (dialog, which) -> result.cancel())
        .create()
        .show();
        return true;
    }
}
