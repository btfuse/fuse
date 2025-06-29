
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

import static org.junit.Assert.*;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.ext.junit.rules.ActivityScenarioRule;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@RunWith(AndroidJUnit4.class)
public class FuseMochaPluginTest {

    public static int DEFAULT_TIMEOUT = 60;

    @Rule
    public ActivityScenarioRule<FuseMochaTestActivity> activityRule = new ActivityScenarioRule<>(FuseMochaTestActivity.class);

    @BeforeClass
    public static void setUp() {}


    @AfterClass
    public static void tearDown() {}

    @Test
    public void shouldRunMochaTestsInWebview() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback((@Nullable Bundle savedInstanceState) -> {
                activity.mocha.addListener((FuseMochaPlugin.Stats stats) -> {
                    assertEquals(1, stats.suites);
                    assertEquals(2, stats.tests);
                    assertEquals(1, stats.passes);
                    assertEquals(0, stats.pending);
                    assertEquals(1, stats.failures);
                    latch.countDown();
                });
            });
        });
        assertTrue("Timeout", latch.await(DEFAULT_TIMEOUT, TimeUnit.SECONDS));
    }
}
