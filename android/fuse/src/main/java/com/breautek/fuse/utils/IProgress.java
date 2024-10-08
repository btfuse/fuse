package com.breautek.fuse.utils;

import androidx.annotation.Nullable;

public interface IProgress {
    int getMin();
    int getMax();
    int getValue();

    void setMin(int min);
    void setMax(int max);
    void setValue(int value);

    boolean isComplete();

    void reset();

    float getNormalizedValue();

    void update(int value);
    void update(int value, @Nullable Integer min, @Nullable Integer max);

    void addListener(IProgressListener listener);
    void removeListener(IProgressListener listener);
}
