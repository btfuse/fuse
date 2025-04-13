
/*
Copyright 2023 Breautek

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

package com.breautek.fuse;

import androidx.annotation.Nullable;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.ext.junit.rules.ActivityScenarioRule;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Rule;

import static org.junit.Assert.*;

import android.os.Bundle;

import com.breautek.fuse.testtools.FuseTestAPIClient;

import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@RunWith(AndroidJUnit4.class)
public class FuseAPITest {

    public static int DEFAULT_TIMEOUT = 10;

    @Rule
    public ActivityScenarioRule<TestFuseActivity> activityRule = new ActivityScenarioRule<>(TestFuseActivity.class);

    @BeforeClass
    public static void setUp() {}

    @AfterClass
    public static void tearDown() {}

    @Test
    public void shouldHaveAPort() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback((@Nullable Bundle savedInstanceState) -> {
                int port = activity.getFuseContext().getAPIPort();
                assertTrue(port >= 1024 && port <= 65535);
                latch.countDown();
            });
        });
        assertTrue("Timeout", latch.await(DEFAULT_TIMEOUT, TimeUnit.SECONDS));
    }

    @Test
    public void shouldHaveASecret() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback((@Nullable Bundle savedInstanceState) -> {
                String secret = activity.getFuseContext().getAPISecret();
                assertNotNull(secret);
                latch.countDown();
            });
        });
        assertTrue("Timeout", latch.await(DEFAULT_TIMEOUT, TimeUnit.SECONDS));
    }

    @Test
    public void canDoSimpleEchoRequest() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback((@Nullable Bundle savedInstanceState) -> {
                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                FuseTestAPIClient client;
                try {
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("echo")
                             .setType("text/plain")
                             .setEndpoint("/echo")
                             .setContent("Hello Test!")
                             .build();
                } catch (NoSuchAlgorithmException | KeyManagementException e) {
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());
                assertTrue(response.readAsString().contains("Hello Test!"));
                latch.countDown();
            });
        });
        assertTrue("Timeout", latch.await(DEFAULT_TIMEOUT, TimeUnit.SECONDS));
    }

    @Test
    public void canUseAnAPIThatSwitchesToMainThread() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback((@Nullable Bundle savedInstanceState) -> {
                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                FuseTestAPIClient client;
                try {
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("echo")
                             .setType("text/plain")
                             .setEndpoint("/threadtest")
                             .setContent("Hello Test!")
                             .build();
                } catch (NoSuchAlgorithmException | KeyManagementException e) {
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());
                assertTrue(response.readAsString().contains("Hello Test!"));
                latch.countDown();
            });
        });
        assertTrue("Timeout", latch.await(DEFAULT_TIMEOUT, TimeUnit.SECONDS));
    }
}
