
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

import static org.junit.jupiter.api.Assertions.*;
import android.os.Bundle;
import androidx.annotation.Nullable;
import de.mannodermaus.junit5.ActivityScenarioExtension;
import com.breautek.fuse.testtools.FuseTestAPIClient;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class FuseAPITest {

    public static int DEFAULT_TIMEOUT = 10;

    @RegisterExtension
    public ActivityScenarioExtension<TestFuseActivity> scenario = ActivityScenarioExtension.launch(TestFuseActivity.class);

    @BeforeAll
    public static void setUp() {}

    @AfterAll
    public static void tearDown() {}

    @Test
    public void shouldHaveAPort() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        scenario.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback((@Nullable Bundle savedInstanceState) -> {
                int port = activity.getFuseContext().getAPIPort();
                assertTrue(port >= 1024 && port <= 65535);
                latch.countDown();
            });
        });
        assertTrue(latch.await(DEFAULT_TIMEOUT, TimeUnit.SECONDS), "Timeout");
    }

    @Test
    public void shouldHaveASecret() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        scenario.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback((@Nullable Bundle savedInstanceState) -> {
                String secret = activity.getFuseContext().getAPISecret();
                assertNotNull(secret);
                latch.countDown();
            });
        });
        assertTrue(latch.await(DEFAULT_TIMEOUT, TimeUnit.SECONDS), "Timeout");
    }

    @Test
    public void canDoSimpleEchoRequest() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        scenario.getScenario().onActivity(activity -> {
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
        assertTrue(latch.await(DEFAULT_TIMEOUT, TimeUnit.SECONDS), "Timeout");
    }

    @Test
    public void canUseAnAPIThatSwitchesToMainThread() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        scenario.getScenario().onActivity(activity -> {
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
        assertTrue(latch.await(DEFAULT_TIMEOUT, TimeUnit.SECONDS), "Timeout");
    }
}
