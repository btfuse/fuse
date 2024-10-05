
/*
Copyright 2024 Breautek

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

package com.breautek.fuse.views;

import android.content.Context;
import android.graphics.Canvas;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;

import androidx.annotation.NonNull;

import com.breautek.fuse.utils.IProgress;
import com.breautek.fuse.utils.IProgressContext;
import com.breautek.fuse.utils.IProgressContextListener;
import com.breautek.fuse.utils.IProgressListener;

public class LoaderSplash extends ViewGroup implements IProgressListener, IProgressContextListener {
    private ProgressBar $progressView;

    public LoaderSplash(Context context) {
        super(context);
        $init();
    }

    public LoaderSplash(Context context, AttributeSet attrs) {
        super(context, attrs);
        $init();
    }

    public LoaderSplash(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        $init();
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        int width = r - l;
        int height = b - t;
        int progressBarWidth = $progressView.getMeasuredWidth();
        int progressBarHeight = $progressView.getMeasuredHeight();
        int left = (width - progressBarWidth) / 2;
        int top = (height - progressBarHeight) / 2;
        $progressView.layout(left, top, left + progressBarWidth, top + progressBarHeight);
    }

    private void $init() {
        $progressView = new ProgressBar(this.getContext());
        $progressView.setIndeterminate(false);
        addView($progressView);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        int w = MeasureSpec.getSize(widthMeasureSpec);
        int h = MeasureSpec.getSize(heightMeasureSpec);
        setMeasuredDimension(w, h);
    }

    @Override
    protected void onDraw(@NonNull Canvas canvas) {
        super.onDraw(canvas);
    }

    @Override
    public void onProgressUpdate(IProgressContext context) {
        $progressView.setMin(0);
        $progressView.setMax(100);
        $progressView.setProgress((int) (context.getNormalizedValue() * 100.0f), true);
    }

    @Override
    public void onProgressUpdate(IProgress progress) {
        $progressView.setMin(progress.getMin());
        $progressView.setMax(progress.getMax());
        $progressView.setProgress(progress.getValue());
    }
}