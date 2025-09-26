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

import org.junit.jupiter.api.DynamicNode;
import org.junit.jupiter.api.TestFactory;
import org.junit.jupiter.api.extension.RegisterExtension;

import java.util.Collection;
import java.util.concurrent.ExecutionException;

import de.mannodermaus.junit5.ActivityScenarioExtension;

public class FuseMochaPluginTest {
    @RegisterExtension
    public ActivityScenarioExtension<FuseMochaTestActivity> scenarioExtension = ActivityScenarioExtension.launch(FuseMochaTestActivity.class);

    private final FuseMochaTestRunner runner;

    public FuseMochaPluginTest() {
        runner = new FuseMochaTestRunner();
    }

    @TestFactory
    public Collection<DynamicNode> runWebviewTests() throws InterruptedException, ExecutionException {
        return runner.runWebviewTests(scenarioExtension);
    }
}
