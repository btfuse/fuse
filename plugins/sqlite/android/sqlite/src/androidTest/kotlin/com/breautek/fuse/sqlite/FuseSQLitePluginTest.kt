
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

package com.breautek.fuse.sqlite

import android.net.Uri
import com.breautek.fuse.sqlite.SQLite;
import android.os.Bundle
import androidx.annotation.Nullable
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.ext.junit.rules.ActivityScenarioRule
import com.breautek.fuse.testtools.FuseTestAPIClient
import org.json.JSONException
import org.json.JSONObject
import org.junit.*
import org.junit.runner.RunWith
import java.io.File
import java.io.FileOutputStream
import java.io.FileReader
import java.io.IOException
import java.nio.ByteBuffer
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import org.junit.Assert.*;

@RunWith(AndroidJUnit4::class)
class FuseFilesystemPluginTest {

    companion object {
        const val DEFAULT_TIMEOUT = 10;
        const val PLUGIN_ID: String = "FuseSQLite";
        val testDB: File = File("/data/data/com.breautek.fuse.sqlite.test/files/test.db");

        @JvmStatic
        @BeforeClass
        fun setUp() {}

        @JvmStatic
        @AfterClass
        fun tearDown() {}

        @Before
        fun beforeEach() {
            if (testDB.exists()) {
                testDB.delete();
            }
        }
    }

    @get:Rule
    val activityRule = ActivityScenarioRule(FuseSQLiteTestActivity::class.java)

    private fun __openDBForTesting(activity: FuseSQLiteTestActivity): Long {
        val port = activity.fuseContext.apiPort
        val secret = activity.fuseContext.apiSecret

        val client = try {
            val input: JSONObject = JSONObject();
            input.put("path", testDB.absolutePath);
            input.put("flags", SQLite.CREATE.or(SQLite.READ_WRITE));

            FuseTestAPIClient.Builder()
                .setFuseContext(activity.fuseContext)
                .setAPIPort(port)
                .setAPISecret(secret)
                .setPluginID(PLUGIN_ID)
                .setType("application/json")
                .setEndpoint("/open")
                .setContent(input.toString())
                .build()
        } catch (e: Exception) {
            throw RuntimeException(e)
        }

        val response = client.execute();
        if (response.status != 200) {
            throw RuntimeException(response.readAsString());
        }

        val handleString: String = response.readAsString();

        return handleString.toLong();
    }

    private fun __getQueryPacket(handle: Long, query: String, params: HashMap<String, Any?>?): ByteArray {
        val builder: QueryPacketBuilder = QueryPacketBuilder();

        builder.setQuery(query);

        if (params != null) {
            builder.setParams(params);
        }

        return builder.build();
    }

    @Test
    fun queryTest() {
        val latch = CountDownLatch(1)

        activityRule.scenario.onActivity { activity ->
            activity.setOnReadyCallback { _: Bundle? ->
                val port = activity.fuseContext.apiPort
                val secret = activity.fuseContext.apiSecret

                val handle: Long = __openDBForTesting(activity);
                val packet: ByteArray = __getQueryPacket(handle, "SELECT :value AS test", hashMapOf<String, Any?>(
                    "value" to 1
                ));

                val client = try {
                    FuseTestAPIClient.Builder()
                        .setFuseContext(activity.fuseContext)
                        .setAPIPort(port)
                        .setAPISecret(secret)
                        .setPluginID(PLUGIN_ID)
                        .setType("application/octet-stream")
                        .setEndpoint("/query")
                        .setContent(packet)
                        .build()
                } catch (e: Exception) {
                    latch.countDown()
                    throw RuntimeException(e)
                }

                val response = client.execute();
                assertEquals(200, response.status);
                assertNotNull(handle);

                latch.countDown();
            }
        }

        // Optionally wait to ensure the test doesn't finish prematurely
        latch.await(DEFAULT_TIMEOUT.toLong(), TimeUnit.SECONDS);
    }

    @Test
    fun canOpenFileDB() {
        val latch = CountDownLatch(1)

        activityRule.scenario.onActivity { activity ->
            activity.setOnReadyCallback { _: Bundle? ->
                val port = activity.fuseContext.apiPort
                val secret = activity.fuseContext.apiSecret

                val client = try {
                    val input: JSONObject = JSONObject();
                    input.put("path", testDB.absolutePath);
                    input.put("flags", SQLite.CREATE.or(SQLite.READ_WRITE));

                    FuseTestAPIClient.Builder()
                        .setFuseContext(activity.fuseContext)
                        .setAPIPort(port)
                        .setAPISecret(secret)
                        .setPluginID(PLUGIN_ID)
                        .setType("application/json")
                        .setEndpoint("/open")
                        .setContent(input.toString())
                        .build()
                } catch (e: Exception) {
                    latch.countDown()
                    throw RuntimeException(e)
                }

                val response = client.execute();
                assertEquals(200, response.status);
                val handle: String = response.readAsString();
                assertNotNull(handle);
                assertTrue("Expected numeric string but got: $handle", handle.matches(Regex("^\\d+$")));

                latch.countDown();
            }
        }

        // Optionally wait to ensure the test doesn't finish prematurely
        latch.await(DEFAULT_TIMEOUT.toLong(), TimeUnit.SECONDS);
    }

    @Test
    fun canRequestVersion() {
        val latch = CountDownLatch(1)

        activityRule.scenario.onActivity { activity ->
            activity.setOnReadyCallback { _: Bundle? ->
                val port = activity.fuseContext.apiPort
                val secret = activity.fuseContext.apiSecret

                val client = try {
                    FuseTestAPIClient.Builder()
                        .setFuseContext(activity.fuseContext)
                        .setAPIPort(port)
                        .setAPISecret(secret)
                        .setPluginID(PLUGIN_ID)
                        .setType("text/plain")
                        .setEndpoint("/version")
                        .setContent("")
                        .build()
                } catch (e: Exception) {
                    latch.countDown();
                    throw RuntimeException(e);
                }

                val response = client.execute();
                assertEquals(200, response.status);
                val version: String = response.readAsString();
                assertEquals("Should equal to current version", SQLite.getLibVersion(), version);
                latch.countDown();
            }
        }

        // Optionally wait to ensure the test doesn't finish prematurely
        latch.await(DEFAULT_TIMEOUT.toLong(), TimeUnit.SECONDS);
    }

}
