package com.breautek.fuse.mocha;

public class TestResult {
    public final String id;
    public final TestState state;
    public final String reason;

    public TestResult(String id, TestState state) {
        this.id = id;
        this.state = state;
        this.reason = "";
    }

    public TestResult(String id, TestState state, String reason) {
        this.id = id;
        this.state = state;
        this.reason = reason;
    }
}
