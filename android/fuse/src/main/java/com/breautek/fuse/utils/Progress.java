
package com.breautek.fuse.utils;

import androidx.annotation.Nullable;

import java.util.ArrayList;

public class Progress implements IProgress {
    private int $value;
    private int $min;
    private int $max;
    private final ArrayList<IProgressListener> $listeners;

    public Progress() {
        this(0, 0,100);
    }

    public Progress(int value) {
        this(value, 0, 100);
    }

    public Progress(int value, int min, int max) {
        $listeners = new ArrayList<>();
        $value = value;
        $min = min;
        $max = max;
    }

    public void setMin(int min) {
        $min = min;
        $emit();
    }

    public void setMax(int max) {
        $max = max;
        $emit();
    }

    public void setValue(int value) {
        $value = value;
        $emit();
    }

    public int getMin() {
        return $min;
    }

    public int getMax() {
        return $max;
    }

    public int getValue() {
        return $value;
    }

    public void reset() {
        setValue($min);
    }

    public void update(int value) {
        update(value, null, null);
    }

    public void update(int value, @Nullable Integer min, @Nullable Integer max) {
        if (min != null) {
            $min = min;
        }

        if (max != null) {
            $max = max;
        }

        $value = value;
        $emit();
    }

    public float getNormalizedValue() {
        float min = (float) $min;
        float max = (float) $max;
        float value = (float) $value;

        return ((value - min) / (max - min));
    }

    private void $emit() {
        for (IProgressListener listener : $listeners) {
            listener.onProgressUpdate(this);
        }
    }

    public void addListener(IProgressListener listener) {
        $listeners.add(listener);
        listener.onProgressUpdate(this);
    }

    public void removeListener(IProgressListener listener) {
        $listeners.remove(listener);
    }

    public boolean isComplete() {
        return getValue() == getMax();
    }
}
