
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

package com.breautek.fuse.filesystem;

import static org.junit.Assert.*;

import android.net.Uri;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.ext.junit.rules.ActivityScenarioRule;
import com.breautek.fuse.testtools.FuseTestAPIClient;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.concurrent.CountDownLatch;

@RunWith(AndroidJUnit4.class)
public class FuseFilesystemPluginTest {

    static File dataDir = new File("/data/data/com.breautek.fuse.filesystem.test/files/");

    @Rule
    public ActivityScenarioRule<FuseFilesystemTestActivity> activityRule = new ActivityScenarioRule<>(FuseFilesystemTestActivity.class);

    @BeforeClass
    public static void setUp() {
        try {
            setupFilesDir();
            setupSizeTestFile();
            setupMkdirTest();
            setupReadTest();
            setupTruncateFile();
            setupAppendFile();
            setupWriteFile();
            setupRemoveTest();
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static void setupFilesDir() throws IOException {
        File filesDir = new File("/data/data/com.breautek.fuse.filesystem.test/files");
        if (!filesDir.exists()) {
            filesDir.mkdir();
        }
    }

    private static void setupRemoveTest() throws IOException {
        File removeFileTest = new File("/data/data/com.breautek.fuse.filesystem.test/files/removeFileTest");
        if (!removeFileTest.createNewFile() && !removeFileTest.exists()) {
            throw new RuntimeException("Could not setup recursive remove test file");
        }

        File recursiveRemoveTest = new File("/data/data/com.breautek.fuse.filesystem.test/files/removeRecursiveTest/abc/def");
        if (!recursiveRemoveTest.mkdirs() && !recursiveRemoveTest.exists()) {
            throw new RuntimeException("Could not setup recursive remove test file");
        }
    }

    private static void setupWriteFile() throws IOException {
        File writeFile = new File("/data/data/com.breautek.fuse.filesystem.test/files/writeFileTest");
        File writeOffsetFile = new File("/data/data/com.breautek.fuse.filesystem.test/files/writeFileTestWithOffset");
        if (writeFile.exists()) {
            writeFile.delete();
        }

        if (writeOffsetFile.exists()) {
            writeOffsetFile.delete();
        }

        boolean _unused = writeFile.createNewFile();
        _unused = writeOffsetFile.createNewFile();
        FileOutputStream io = new FileOutputStream(writeFile, false);
        FileOutputStream appendIO = new FileOutputStream(writeOffsetFile, false);

        String content = "Initial State!";
        byte[] buffer = content.getBytes();

        io.write(buffer);
        appendIO.write(buffer);
        io.close();
        appendIO.close();
    }

    private static void setupAppendFile() throws IOException {
        File appendFile = new File("/data/data/com.breautek.fuse.filesystem.test/files/appendFileTest");

        boolean _unused = appendFile.createNewFile();
        FileOutputStream io = new FileOutputStream(appendFile, false);

        String content = "Initial State!";
        byte[] buffer = content.getBytes();

        io.write(buffer);
        io.close();
    }

    private static void setupTruncateFile() throws IOException {
        File truncateFile1 = new File("/data/data/com.breautek.fuse.filesystem.test/files/truncateTest1");
        File truncateFile2 = new File("/data/data/com.breautek.fuse.filesystem.test/files/truncateTest2");

        boolean _unused = truncateFile1.createNewFile();
        _unused = truncateFile2.createNewFile();
        FileOutputStream io = new FileOutputStream(truncateFile1);
        FileOutputStream io2 = new FileOutputStream(truncateFile2);

        String content = "Initial State!";
        byte[] buffer = content.getBytes();

        io.write(buffer);
        io2.write(buffer);

        io.close();
        io2.close();
    }

    private static void setupReadTest() throws IOException {
        File sizeTestFile = new File("/data/data/com.breautek.fuse.filesystem.test/files/readTest");

        boolean _unused = sizeTestFile.createNewFile();
        FileOutputStream io = new FileOutputStream(sizeTestFile);

        String content = "Hello Test File!";
        byte[] buffer = content.getBytes();

        io.write(buffer);

        io.close();
    }

    private static void setupMkdirTest() {
        File dir1 = new File(dataDir, "mkdirTest");
        File dir2 = new File(dataDir, "mkdirRecursionTest");
        if (dir1.exists()) {
            FileUtils.deleteRecursively(dir1);
        }
        if (dir2.exists()) {
            FileUtils.deleteRecursively(dir2);
        }
    }

    private byte[] createParamsBuffer(String data) {
        byte[] bytes = data.getBytes();
        ByteBuffer buffer = ByteBuffer.allocate(bytes.length + 4);
        buffer.putInt(bytes.length).put(bytes);
        return buffer.array();
    }

    private byte[] createParamsBuffer(String data, byte[] content) {
        byte[] bytes = data.getBytes();
        ByteBuffer buffer = ByteBuffer.allocate(bytes.length + 4 + content.length);
        buffer.putInt(bytes.length).put(bytes).put(content);
        return buffer.array();
    }

    private static void setupSizeTestFile() {
        File sizeTestFile = new File("/data/data/com.breautek.fuse.filesystem.test/files/sizeTestFile");
        try {
            boolean _unused = sizeTestFile.createNewFile();
            FileOutputStream io = new FileOutputStream(sizeTestFile);

            byte[] buffer = new byte[512];
            io.write(buffer);

            io.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @AfterClass
    public static void tearDown() {}

    @Test
    public void shouldBeDirectoryFileType() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {
                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                FuseTestAPIClient client;
                try {
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("text/plain")
                             .setEndpoint("/file/type")
                             .setContent("file:///")
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());

                int intType = Integer.parseInt(response.readAsString());

                FuseFileType type = null;
                switch (intType) {
                    case 0:
                        type = FuseFileType.FILE;
                        break;
                    case 1:
                        type = FuseFileType.DIRECTORY;
                        break;
                }

                assertEquals(FuseFileType.DIRECTORY, type);
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void shouldHaveSizeOf512() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {
                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                FuseTestAPIClient client;
                try {
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("text/plain")
                             .setEndpoint("/file/size")
                             .setContent("file:///data/data/com.breautek.fuse.filesystem.test/files/sizeTestFile")
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());

                long size = Long.parseLong(response.readAsString());

                assertEquals(512, size);
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void canMkdirWithoutRecursion() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {

                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                FuseTestAPIClient client;
                try {
                    JSONObject content = new JSONObject();
                    content.put("path", "file:///data/data/com.breautek.fuse.filesystem.test/files/mkdirTest");
                    content.put("recursive", false);
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("application/json")
                             .setEndpoint("/file/mkdir")
                             .setContent(content.toString())
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());

                String result = response.readAsString();

                assertEquals("true", result);
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void canMkdirWithRecursion() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {

                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                FuseTestAPIClient client;
                try {
                    JSONObject content = new JSONObject();
                    content.put("path", "file:///data/data/com.breautek.fuse.filesystem.test/files/mkdirRecursionTest/with/subfolders");
                    content.put("recursive", true);
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("application/json")
                             .setEndpoint("/file/mkdir")
                             .setContent(content.toString())
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());

                String result = response.readAsString();

                assertEquals("true", result);
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void canReadFileEntirely() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {

                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                FuseTestAPIClient client;
                try {
                    JSONObject content = new JSONObject();
                    content.put("path", "file:///data/data/com.breautek.fuse.filesystem.test/files/readTest");
                    content.put("length", -1);
                    content.put("offset", 0);
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("application/json")
                             .setEndpoint("/file/read")
                             .setContent(content.toString())
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());

                String result = response.readAsString();

                assertEquals("Hello Test File!", result);
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void canReadFilePartially() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {

                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                FuseTestAPIClient client;
                try {
                    JSONObject content = new JSONObject();
                    content.put("path", "file:///data/data/com.breautek.fuse.filesystem.test/files/readTest");
                    content.put("length", 2);
                    content.put("offset", 0);
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("application/json")
                             .setEndpoint("/file/read")
                             .setContent(content.toString())
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());

                String result = response.readAsString();

                assertEquals("He", result);
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void canReadFileWithOffset() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {

                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                FuseTestAPIClient client;
                try {
                    JSONObject content = new JSONObject();
                    content.put("path", "file:///data/data/com.breautek.fuse.filesystem.test/files/readTest");
                    content.put("length", 2);
                    content.put("offset", 1);
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("application/json")
                             .setEndpoint("/file/read")
                             .setContent(content.toString())
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());

                String result = response.readAsString();

                assertEquals("el", result);
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void canTruncateFile() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {

                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                String testFile = "file:///data/data/com.breautek.fuse.filesystem.test/files/truncateTest1";

                FuseTestAPIClient client;
                try {
                    byte[] content = createParamsBuffer(testFile);
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("application/octet-stream")
                             .setEndpoint("/file/truncate")
                             .setContent(content)
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());

                File file = new File(Uri.parse(testFile).getPath());

                assertEquals(0, file.length());
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void canTruncateFileWithNewContent() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {
                try {
                    int port = activity.getFuseContext().getAPIPort();
                    String secret = activity.getFuseContext().getAPISecret();

                    String testFile = "file:///data/data/com.breautek.fuse.filesystem.test/files/truncateTest1";

                    byte[] newContent = "new content".getBytes();

                    FuseTestAPIClient client;
                    try {
                        byte[] content = createParamsBuffer(testFile, newContent);
                        client = new FuseTestAPIClient.Builder()
                                 .setFuseContext(activity.getFuseContext())
                                 .setAPIPort(port)
                                 .setAPISecret(secret)
                                 .setPluginID("FuseFilesystem")
                                 .setType("application/octet-stream")
                                 .setEndpoint("/file/truncate")
                                 .setContent(content)
                                 .build();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }

                    FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                    assertEquals(200, response.getStatus());

                    File file = new File(Uri.parse(testFile).getPath());

                    assertEquals(newContent.length, file.length());

                    String newContentStr = null;
                    FileReader reader = null;
                    try {
                        reader = new FileReader(file);
                        char[] readerBuffer = new char[newContent.length];
                        reader.read(readerBuffer);
                        newContentStr = new String(readerBuffer);
                        reader.close();
                    } catch (Exception e) {
                        if (reader != null) {
                            try {
                                reader.close();
                            } catch (IOException ex) {
                                throw new RuntimeException(ex);
                            }
                        }
                        throw new RuntimeException(e);
                    }

                    assertEquals("new content", newContentStr);
                    latch.countDown();
                }
                catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }
            });
        });
        latch.await();
    }

    @Test
    public void canAppendDataToFile() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {

                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                String testFile = "file:///data/data/com.breautek.fuse.filesystem.test/files/appendFileTest";

                byte[] newContent = " + more data!".getBytes();

                FuseTestAPIClient client;
                try {
                    byte[] content = createParamsBuffer(testFile, newContent);
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("application/octet-stream")
                             .setEndpoint("/file/append")
                             .setContent(content)
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                assertEquals(200, response.getStatus());

                int reportedBytesWritten = Integer.parseInt(response.readAsString());

                assertEquals(newContent.length, reportedBytesWritten);

                File file = new File(Uri.parse(testFile).getPath());

                String newContentStr = null;
                FileReader reader = null;
                try {
                    reader = new FileReader(file);
                    char[] readerBuffer = new char[(int) file.length()];
                    reader.read(readerBuffer);
                    newContentStr = new String(readerBuffer);
                    reader.close();
                } catch (Exception e) {
                    if (reader != null) {
                        try {
                            reader.close();
                        } catch (IOException ex) {
                            latch.countDown();
                            throw new RuntimeException(ex);
                        }
                    }
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                assertEquals("Initial State! + more data!", newContentStr);
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void canWriteDataToFile() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {
                try {
                    int port = activity.getFuseContext().getAPIPort();
                    String secret = activity.getFuseContext().getAPISecret();

                    String testFile = "file:///data/data/com.breautek.fuse.filesystem.test/files/writeFileTest";

                    JSONObject jparams = new JSONObject();
                    try {
                        jparams.put("path", testFile);
                        jparams.put("offset", 0);
                    } catch (JSONException e) {
                        throw new RuntimeException(e);
                    }

                    byte[] newContent = "Rewrite".getBytes();

                    FuseTestAPIClient client;
                    try {
                        byte[] content = createParamsBuffer(jparams.toString(), newContent);
                        client = new FuseTestAPIClient.Builder()
                                 .setFuseContext(activity.getFuseContext())
                                 .setAPIPort(port)
                                 .setAPISecret(secret)
                                 .setPluginID("FuseFilesystem")
                                 .setType("application/octet-stream")
                                 .setEndpoint("/file/write")
                                 .setContent(content)
                                 .build();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }

                    FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                    assertEquals(200, response.getStatus());

                    int reportedBytesWritten = Integer.parseInt(response.readAsString());

                    assertEquals(newContent.length, reportedBytesWritten);

                    File file = new File(Uri.parse(testFile).getPath());

                    String newContentStr = null;
                    FileReader reader = null;
                    try {
                        reader = new FileReader(file);
                        char[] readerBuffer = new char[(int) file.length()];
                        reader.read(readerBuffer);
                        newContentStr = new String(readerBuffer);
                        reader.close();
                    } catch (Exception e) {
                        if (reader != null) {
                            try {
                                reader.close();
                            } catch (IOException ex) {
                                throw new RuntimeException(ex);
                            }
                        }
                        throw new RuntimeException(e);
                    }

                    assertEquals("Rewrite State!", newContentStr);
                    latch.countDown();
                }
                catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }
            });
        });
        latch.await();
    }

    @Test
    public void canWriteDataToFileWithOffset() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {
                try {
                    int port = activity.getFuseContext().getAPIPort();
                    String secret = activity.getFuseContext().getAPISecret();

                    String testFile = "file:///data/data/com.breautek.fuse.filesystem.test/files/writeFileTestWithOffset";

                    JSONObject jparams = new JSONObject();
                    try {
                        jparams.put("path", testFile);
                        jparams.put("offset", 2);
                    } catch (JSONException e) {
                        throw new RuntimeException(e);
                    }

                    byte[] newContent = "Rewrite".getBytes();

                    FuseTestAPIClient client;
                    try {
                        byte[] content = createParamsBuffer(jparams.toString(), newContent);
                        client = new FuseTestAPIClient.Builder()
                                 .setFuseContext(activity.getFuseContext())
                                 .setAPIPort(port)
                                 .setAPISecret(secret)
                                 .setPluginID("FuseFilesystem")
                                 .setType("application/octet-stream")
                                 .setEndpoint("/file/write")
                                 .setContent(content)
                                 .build();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }

                    FuseTestAPIClient.FuseAPITestResponse response = client.execute();
                    assertEquals(200, response.getStatus());

                    int reportedBytesWritten = Integer.parseInt(response.readAsString());

                    assertEquals(newContent.length, reportedBytesWritten);

                    File file = new File(Uri.parse(testFile).getPath());

                    String newContentStr = null;
                    FileReader reader = null;
                    try {
                        reader = new FileReader(file);
                        char[] readerBuffer = new char[(int) file.length()];
                        reader.read(readerBuffer);
                        newContentStr = new String(readerBuffer);
                        reader.close();
                    } catch (Exception e) {
                        if (reader != null) {
                            try {
                                reader.close();
                            } catch (IOException ex) {
                                throw new RuntimeException(ex);
                            }
                        }
                        throw new RuntimeException(e);
                    }

                    assertEquals("InRewritetate!", newContentStr);
                    latch.countDown();
                }
                catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }
            });
        });
        latch.await();
    }

    @Test
    public void canDeleteFile() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {

                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                String testFile = "file:///data/data/com.breautek.fuse.filesystem.test/files/removeFileTest";

                FuseTestAPIClient client;
                try {
                    JSONObject params = new JSONObject();
                    params.put("path", testFile);
                    params.put("recursive", false);

                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("application/octet-stream")
                             .setEndpoint("/file/remove")
                             .setContent(params.toString())
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();

                assertEquals(200, response.getStatus());

                String result = response.readAsString();

                assertEquals("true", result);

                File file = new File(Uri.parse(testFile).getPath());

                assertFalse(file.exists());
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void deleteAPIShouldReturnFalse() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {
                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                String testFile = "file:///data/data/com.breautek.fuse.filesystem.test/files/doesNotExists";

                FuseTestAPIClient client;
                try {
                    JSONObject params = new JSONObject();
                    params.put("path", testFile);
                    params.put("recursive", false);

                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("application/octet-stream")
                             .setEndpoint("/file/remove")
                             .setContent(params.toString())
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();

                assertEquals(200, response.getStatus());

                String result = response.readAsString();

                assertEquals("false", result);
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void canRecursivelyDelete() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {

                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                String testFile = "file:///data/data/com.breautek.fuse.filesystem.test/files/removeRecursiveTest/abc/def";

                FuseTestAPIClient client;
                try {
                    JSONObject params = new JSONObject();
                    params.put("path", testFile);
                    params.put("recursive", true);

                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("application/octet-stream")
                             .setEndpoint("/file/remove")
                             .setContent(params.toString())
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();

                assertEquals(200, response.getStatus());

                String result = response.readAsString();

                assertEquals("true", result);

                File file = new File(Uri.parse(testFile).getPath());

                assertFalse(file.exists());
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void existsShouldBeTrue() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {

                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                String testFile = "file:///data/data/com.breautek.fuse.filesystem.test/files/appendFileTest";

                FuseTestAPIClient client;
                try {
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("application/octet-stream")
                             .setEndpoint("/file/exists")
                             .setContent(testFile)
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();

                assertEquals(200, response.getStatus());

                String result = response.readAsString();

                assertEquals("true", result);

                File file = new File(Uri.parse(testFile).getPath());
                assertTrue(file.exists());
                latch.countDown();
            });
        });
        latch.await();
    }

    @Test
    public void existsShouldBeFalse() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        activityRule.getScenario().onActivity(activity -> {
            activity.setOnReadyCallback(() -> {

                int port = activity.getFuseContext().getAPIPort();
                String secret = activity.getFuseContext().getAPISecret();

                String testFile = "file:///data/data/com.breautek.fuse.filesystem.test/files/doesNotExists";

                FuseTestAPIClient client;
                try {
                    client = new FuseTestAPIClient.Builder()
                             .setFuseContext(activity.getFuseContext())
                             .setAPIPort(port)
                             .setAPISecret(secret)
                             .setPluginID("FuseFilesystem")
                             .setType("application/octet-stream")
                             .setEndpoint("/file/exists")
                             .setContent(testFile)
                             .build();
                } catch (Exception e) {
                    latch.countDown();
                    throw new RuntimeException(e);
                }

                FuseTestAPIClient.FuseAPITestResponse response = client.execute();

                assertEquals(200, response.getStatus());

                String result = response.readAsString();

                assertEquals("false", result);

                File file = new File(Uri.parse(testFile).getPath());
                assertFalse(file.exists());
                latch.countDown();
            });
        });
        latch.await();
    }
}
