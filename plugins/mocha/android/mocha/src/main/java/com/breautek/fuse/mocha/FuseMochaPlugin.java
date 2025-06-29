
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

package com.breautek.fuse.mocha;

import com.breautek.fuse.FuseAPIPacket;
import com.breautek.fuse.FuseAPIResponse;
import com.breautek.fuse.FusePlugin;
import com.breautek.fuse.FuseContext;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

public class FuseMochaPlugin extends FusePlugin {
    private final ArrayList<IListener> $listeners;
    private Stats $runnerStats;

    public FuseMochaPlugin(FuseContext context) {
        super(context);
        $listeners = new ArrayList<>();
        $runnerStats = null;
    }

    public static class Stats {
        public final int suites;
        public final int tests;
        public final int passes;
        public final int pending;
        public final int failures;
        public final long duration;
        public final String startString;
        public final String endString;

        public Stats(int suites, int tests, int passes, int pending, int failures, long duration, String start, String end) {
            this.suites = suites;
            this.tests = tests;
            this.passes = passes;
            this.pending = pending;
            this.failures = failures;
            this.duration = duration;
            this.startString = start;
            this.endString = end;
        }
    }

    public static interface IListener {
        void onRunnerComplete(Stats stats);
    }

    @Override
    public String getID() {
        return "FuseMocha";
    }

    @Override
    protected void _initHandles() {
        attachHandler("/runner/complete", new APIHandler<FuseMochaPlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                JSONObject jStats = packet.readAsJSONObject();

                int     suites = jStats.optInt("suites", 0),
                        tests = jStats.optInt("tests", 0),
                        passes = jStats.optInt("passes", 0),
                        pending = jStats.optInt("pending", 0),
                        failures = jStats.optInt("failures", 0);
                long duration = jStats.optLong("duration", 0);
                String start = jStats.optString("start", "N/A");
                String end = jStats.optString("end", "N/A");

                Stats stats = new Stats(suites, tests, passes, pending, failures, duration, start, end);

                this.plugin.$onRunnerComplete(stats);
            }
        });
    }

    public void addListener(IListener listener) {
        synchronized ($listeners) {
            $listeners.add(listener);
            if ($runnerStats != null) {
                listener.onRunnerComplete($runnerStats);
            }
        }
    }

    public void removeListener(IListener listener) {
        synchronized ($listeners) {
            $listeners.remove(listener);
        }
    }

    private void $onRunnerComplete(Stats stats) {
        ArrayList<IListener> listeners = null;
        synchronized ($listeners) {
            listeners = new ArrayList<>($listeners);
        }

        for (IListener listener : listeners) {
            listener.onRunnerComplete(stats);
        }
    }

}
