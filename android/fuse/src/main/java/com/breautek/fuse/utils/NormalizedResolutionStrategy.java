package com.breautek.fuse.utils;

import java.util.ArrayList;

public class NormalizedResolutionStrategy implements IProgressResolutionStrategy {
    public float execute(ArrayList<IProgress> progresses) {
        float value = 0.0f;
        float max = (float) progresses.size();

        for (IProgress progress : progresses) {
            value += (float) progress.getValue() / (float) progress.getMax();
        }

        return value / max;
    }
}
