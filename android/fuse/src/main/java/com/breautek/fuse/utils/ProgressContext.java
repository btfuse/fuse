
package com.breautek.fuse.utils;

import androidx.annotation.Nullable;

import java.util.HashMap;
import java.util.ArrayList;
import java.util.Map;

public class ProgressContext implements IProgressContext, IProgressListener {
    private ArrayList<IProgressContextListener> $listeners;
    private HashMap<String, IProgress> $pmap;
    private IProgressResolutionStrategy $resolutionStrategy;

    public ProgressContext() {
        $pmap = new HashMap<>();
        $listeners = new ArrayList<>();
        $resolutionStrategy = new WeightedResolutionStrategy();
    }

    public void setResolutionStrategy(IProgressResolutionStrategy strategy) {
        $resolutionStrategy = strategy;
    }

    public IProgressResolutionStrategy getResolutionStrategy() {
        return $resolutionStrategy;
    }

    private void $emit() {
        for (IProgressContextListener listener : $listeners) {
            listener.onProgressUpdate(this);
        }
    }

    @Override
    public void onProgressUpdate(IProgress progress) {
        this.$emit();
    }

    public void createProgress(String id) {
        Progress p = new Progress();
        $pmap.put(id, p);
        p.addListener(this);
    }

    public int getMax() {
        int max = 0;
        for (Map.Entry<String, IProgress> entry : $pmap.entrySet()) {
            max += entry.getValue().getMax();
        }
        return max;
    }

    public int getValue() {
        int value = 0;
        for (Map.Entry<String, IProgress> entry : $pmap.entrySet()) {
            value += entry.getValue().getValue();
        }
        return value;
    }

    public void reset() {
        for (Map.Entry<String, IProgress> entry : $pmap.entrySet()) {
            entry.getValue().reset();
        }
    }

    public float getNormalizedValue() {
        ArrayList<IProgress> progresses = new ArrayList<>();
        for (Map.Entry<String, IProgress> entry : $pmap.entrySet()) {
            progresses.add(entry.getValue());
        }
        return $resolutionStrategy.execute(progresses);
    }

    public void update(String id, int value) {
        update(id, value, null);
    }

    public void update(String id, int value, @Nullable Integer max) {
        IProgress progress = $pmap.get(id);
        assert progress != null;
        progress.update(value, 0, max);
    }

    public void setMax(String id, int max) {
        IProgress progress = $pmap.get(id);
        assert progress != null;
        progress.setMax(max);
    }

    public void setValue(String id, int value) {
        IProgress progress = $pmap.get(id);
        assert progress != null;
        progress.setValue(value);
    }

    public void addListener(IProgressContextListener listener) {
        $listeners.add(listener);
        listener.onProgressUpdate(this);
    }

    public void removeListener(IProgressContextListener listener) {
        $listeners.remove(listener);
    }

    public boolean isComplete(String id) {
        IProgress progress = $pmap.get(id);
        assert progress != null;
        return progress.isComplete();
    }

    public boolean isComplete() {
        for (Map.Entry<String, IProgress> entry : $pmap.entrySet()) {
            if (!entry.getValue().isComplete()) {
                return false;
            }
        }

        return true;
   }
}
