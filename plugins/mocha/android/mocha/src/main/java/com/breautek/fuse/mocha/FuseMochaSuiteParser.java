package com.breautek.fuse.mocha;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DynamicContainer;
import org.junit.jupiter.api.DynamicNode;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.NamedExecutable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CountDownLatch;

public class FuseMochaSuiteParser {
    public static class Data {
        public final ArrayList<DynamicNode> nodes = new ArrayList<>();
        public final HashMap<String, CompletableFuture<TestResult>> testMap = new HashMap<>();
    }

    public FuseMochaSuiteParser() {}

    public Data parse(JSONObject root, CountDownLatch latch) throws JSONException {
        Data data = new Data();

        processSuite(root, data.nodes, data.testMap, latch);

        return data;
    }

    private void createTest(String id, String title, ArrayList<DynamicNode> tests, HashMap<String,CompletableFuture<TestResult>> testMap, CountDownLatch latch) {
        CompletableFuture<TestResult> future = new CompletableFuture<>();
        testMap.put(id, future);

        tests.add(DynamicTest.dynamicTest(title, new NamedExecutable() {
            @Override
            public void execute() throws Throwable {
                latch.countDown();

                TestResult result = future.get();

                switch (result.state) {
                    case PASSED -> {} // Do nothing to let it pass
                    case SKIPPED -> Assumptions.abort("Skipped");
                    case FAILED -> Assertions.fail(result.reason);
                    case TIMEOUT -> Assertions.fail("Timed out");
                }
            }

            @Override
            public String getName() {
                return title;
            }
        }));
    }

    private void processSuite(JSONObject suite, ArrayList<DynamicNode> data, HashMap<String, CompletableFuture<TestResult>> testMap, CountDownLatch latch) throws JSONException {
        String suiteTitle = suite.getString("title");
        ArrayList<DynamicNode> tests = new ArrayList<>();

        JSONArray jtests = suite.getJSONArray("tests");
        for (int i = 0; i < jtests.length(); i++) {
            JSONObject jtest = jtests.getJSONObject(i);

            String title = jtest.getString("title");
            String id = jtest.getString("id");

            createTest(id, title, tests, testMap, latch);
        }

        JSONArray jsuites = suite.getJSONArray("suites");
        for (int i = 0; i < jsuites.length(); i++) {
            JSONObject jsuite = jsuites.getJSONObject(i);
            processSuite(jsuite, tests, testMap, latch);
        }

        data.add(DynamicContainer.dynamicContainer(suiteTitle, tests));
    }
}
