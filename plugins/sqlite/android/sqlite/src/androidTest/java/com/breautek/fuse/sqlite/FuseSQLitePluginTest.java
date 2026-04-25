
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

package com.breautek.fuse.sqlite;

import static org.junit.Assert.*;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.ext.junit.rules.ActivityScenarioRule;
import com.breautek.fuse.testtools.FuseTestAPIClient;
import com.breautek.fuse.testtools.FuseTestActivity;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.io.File;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@RunWith(AndroidJUnit4.class)
public class FuseSQLitePluginTest {
    private static final String PLUGIN_ID = "FuseSQLite";

//    public static int DEFAULT_TIMEOUT = 10;

    private static File dataDir = new File("/data/data/com.breautek.fuse.sqlite.test/files/");

    @Rule
    public ActivityScenarioRule<FuseSQLiteTestActivity> activityRule = new ActivityScenarioRule<>(FuseSQLiteTestActivity.class);

    @BeforeClass
    public static void setUp() {}

    @AfterClass
    public static void tearDown() {}

    private long $openDatabase(FuseTestActivity activity, String dbPath, int flags) {
        int port = activity.getFuseContext().getAPIPort();
        String secret = activity.getFuseContext().getAPISecret();

        long handle = 0;

        try {
            JSONObject input = new JSONObject();
            input.put("path", dbPath);
            input.put("flags", flags);

            FuseTestAPIClient client = new FuseTestAPIClient.Builder()
                                       .setFuseContext(activity.getFuseContext())
                                       .setAPIPort(port)
                                       .setAPISecret(secret)
                                       .setPluginID(PLUGIN_ID)
                                       .setType("application/json")
                                       .setEndpoint("/open")
                                       .setContent(input.toString())
                                       .build();

            FuseTestAPIClient.FuseAPITestResponse response = client.execute();
            if (response.getStatus() != 200) {
                throw new RuntimeException("Bad Response: " + response.getStatus() + "\n" + response.readAsString());
            }

            handle = Long.parseLong(response.readAsString());
        }
        catch (JSONException | NoSuchAlgorithmException | KeyManagementException e) {
            throw new RuntimeException("Unable to build API Client", e);
        }

        return handle;
    }

    private void $closeDatabase(FuseTestActivity activity, long handle) {
        int port = activity.getFuseContext().getAPIPort();
        String secret = activity.getFuseContext().getAPISecret();

        try {
            FuseTestAPIClient client = new FuseTestAPIClient.Builder()
                                       .setFuseContext(activity.getFuseContext())
                                       .setAPIPort(port)
                                       .setAPISecret(secret)
                                       .setPluginID(PLUGIN_ID)
                                       .setType("text/plain")
                                       .setEndpoint("/close")
                                       .setContent(Long.toString(handle))
                                       .build();

            FuseTestAPIClient.FuseAPITestResponse response = client.execute();
            if (response.getStatus() != 204) {
                throw new RuntimeException("Bad Response: " + response.getStatus() + "\n" + response.readAsString());
            }
        }
        catch (NoSuchAlgorithmException | KeyManagementException e) {
            throw new RuntimeException("Unable to build API Client", e);
        }
    }

    @Test
    public void canQueryForSQLiteVersion() throws InterruptedException {
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
                                .setPluginID(PLUGIN_ID)
                                .setType("text/plain")
                                .setEndpoint("/version")
                                .setContent("")
                                .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());

                assertEquals("Version should equal", "3.49.1", response.readAsString());

                latch.countDown();
            });
        });
        assertTrue("Timeout", latch.await(10, TimeUnit.SECONDS));
    }

    @Test
    public void canMakeSimpleQuery() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback((@Nullable Bundle savedInstanceState) -> {
                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                long dbHandle = $openDatabase(activity, ":memory", SQLite.CREATE | SQLite.MEMORY | SQLite.READ_WRITE);

                FuseTestAPIClient client;
                try {
                    FuseSQLitePacketBuilder packetBuilder = new FuseSQLitePacketBuilder();
                    byte[] packet = packetBuilder.build(dbHandle, "SELECT 1 AS isEnabled", null);

                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseSQLite")
                             .setType("application/octet-stream")
                             .setEndpoint("/query")
                             .setContent(packet)
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());

                byte[] queryResponseData = response.readAsBinary();

                FuseSQLiteResponseParser parser = new FuseSQLiteResponseParser();

                ArrayList<HashMap<String, Object>> rows = parser.parse(queryResponseData);

                assertEquals("Should have 1 row", 1, rows.size());

                HashMap<String, Object> row = rows.get(0);

                assertTrue("Should have 'isEnabled' column", row.containsKey("isEnabled"));
                assertEquals("Should be True", 1L, row.get("isEnabled"));

                $closeDatabase(activity, dbHandle);

                latch.countDown();
            });
        });
        assertTrue("Timeout", latch.await(10, TimeUnit.SECONDS));
    }
}
