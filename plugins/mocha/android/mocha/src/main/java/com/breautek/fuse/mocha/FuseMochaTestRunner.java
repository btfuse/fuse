
/*
Copyright 2023-2024 Breautek

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

//import android.app.Activity;
import android.os.Bundle;
import androidx.annotation.Nullable;
//import androidx.test.core.app.ActivityScenario;
//import org.junit.jupiter.api.AfterAll;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DynamicNode;
//import org.junit.jupiter.api.TestFactory;
import org.junit.jupiter.api.extension.RegisterExtension;

import java.util.Collection;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;

import de.mannodermaus.junit5.ActivityScenarioExtension;

public final class FuseMochaTestRunner<T extends FuseMochaTestActivity> {
//    @RegisterExtension
//    public ActivityScenarioExtension<FuseMochaTestActivity> scenarioExtension = ActivityScenarioExtension.launch(FuseMochaTestActivity.class);

//    @RegisterExtension
//    public ActivityScenarioExtension<FuseMochaTestActivity> scenarioExtension;

//    private static CountDownLatch finishLatch;

//    public FuseMochaTestRunner(Class<FuseMochaTestActivity> scenarioActivity) {
//        finishLatch = new CountDownLatch(1);
//        scenarioExtension = ActivityScenarioExtension.launch(scenarioActivity);
//    }

//    @BeforeAll
//    public static void setUp() {
//        finishLatch = new CountDownLatch(1);
//    }

//    @AfterAll
//    public static void tearDown() {}

    public Collection<DynamicNode> runWebviewTests(ActivityScenarioExtension<T> scenarioExtension) throws InterruptedException, ExecutionException {
        final CompletableFuture<FuseMochaSuiteParser.Data> future = new CompletableFuture<>();
        FuseMochaSuiteParser.Data data = null;

        CountDownLatch finishLatch = new CountDownLatch(1);

        scenarioExtension.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback((@Nullable Bundle savedInstanceState) -> {
                activity.mocha.addListener(new FuseMochaPlugin.IListener() {
                    @Override
                    public void onLoad(FuseMochaSuiteParser.Data data) {
                        future.complete(data);
                    }

                    @Override
                    public void onRunnerComplete(FuseMochaPlugin.Stats stats) {
                        finishLatch.countDown();
                    }

                    @Override
                    public void onTestResult(TestResult result) throws ExecutionException, InterruptedException {
                        FuseMochaSuiteParser.Data data = future.get();

                        CompletableFuture<TestResult> testFuture = data.testMap.get(result.id);

                        if (testFuture != null) {
                            testFuture.complete(result);
                        }
                    }
                });
            });
        });

        finishLatch.await();

        data = future.get();

        return data.nodes;
    }
}
