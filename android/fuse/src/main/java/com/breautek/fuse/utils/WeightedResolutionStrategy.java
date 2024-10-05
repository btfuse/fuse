package com.breautek.fuse.utils;

import java.util.ArrayList;

public class WeightedResolutionStrategy implements IProgressResolutionStrategy {
    public float execute(ArrayList<IProgress> progresses) {
        int value = 0;
        int max = 0;

        for (IProgress progress : progresses) {
            value += progress.getValue();
            max += progress.getMax();
        }

        if (max == 0) {
            max = 1;
        }

        return (float) value / (float) max;
    }
}
