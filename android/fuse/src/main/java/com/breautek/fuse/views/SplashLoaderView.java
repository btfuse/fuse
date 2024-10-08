package com.breautek.fuse.views;

import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.drawable.Drawable;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.widget.ImageView;
import android.widget.ProgressBar;

import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.breautek.fuse.R;
import com.breautek.fuse.utils.IProgress;
import com.breautek.fuse.utils.IProgressContext;
import com.breautek.fuse.utils.IProgressContextListener;
import com.breautek.fuse.utils.IProgressListener;

public class SplashLoaderView extends ConstraintLayout implements IProgressListener, IProgressContextListener  {
    private ProgressBar $progressBar;
    private ConstraintLayout $container;
    private ImageView $icon;

    private static final String TAG = "SplashLoaderView";

    public SplashLoaderView(Context context) {
        super(context);
        init(context);
    }

    public SplashLoaderView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public SplashLoaderView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    private void init(Context context) {
        LayoutInflater.from(context).inflate(R.layout.splash_loader_view, this, true);
        $progressBar = findViewById(R.id.splash_loader_progressbar);
        $container = findViewById(R.id.splash_loader_container);
        $icon = findViewById(R.id.splash_loader_icon);

        ViewCompat.setOnApplyWindowInsetsListener(this, (v, insets) -> {
            ConstraintLayout.LayoutParams params = (ConstraintLayout.LayoutParams) $container.getLayoutParams();
            Insets dims = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            params.setMargins(dims.left, dims.top, dims.right, dims.bottom);
            return insets;
        });

        PackageManager pm = context.getPackageManager();
        Drawable appIcon = null;
        try {
            appIcon = pm.getApplicationIcon(context.getPackageName());
        } catch (PackageManager.NameNotFoundException e) {
            Log.w(TAG, "Could not load Application Icon");
            Log.w(TAG, e);
        }

        if (appIcon != null) {
            $icon.setImageDrawable(appIcon);
            $icon.setVisibility(VISIBLE);
        }
    }

    @Override
    public void onProgressUpdate(IProgress progress) {
        $progressBar.setMin(progress.getMin());
        $progressBar.setMax(progress.getMax());
        $progressBar.setProgress(progress.getValue(), true);
    }

    @Override
    public void onProgressUpdate(IProgressContext context) {
        Log.d(TAG, "ON PROGRESS UPDATE: " + Float.toString(context.getNormalizedValue()));
        $progressBar.setMin(0);
        $progressBar.setMax(100);

        float value = context.getNormalizedValue();

        $progressBar.setProgress((int) (value * 100.0f), true);
    }
}
