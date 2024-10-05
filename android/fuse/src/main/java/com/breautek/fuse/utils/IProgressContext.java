package com.breautek.fuse.utils;

import androidx.annotation.Nullable;

public interface IProgressContext {
    void createProgress(String id);
    int getMax();
    int getValue();

    void setMax(String id, int max);
    void setValue(String id, int value);

    void reset();

    float getNormalizedValue();

    void update(String id, int value);
    void update(String id, int value, @Nullable Integer max);

    void addListener(IProgressContextListener listener);
    void removeListener(IProgressContextListener listener);
}
