
/*
Copyright 2025-2025 Breautek

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

import {
    FuseContext,
    FuseContextBuilder
} from '@btfuse/core';
import {
    FuseMochaPlugin,
    IMochaStats
} from '@btfuse/mocha';

(async () => {
    let builder: FuseContextBuilder = new FuseContextBuilder();
    let context: FuseContext = await builder.build();
    let mocha: FuseMochaPlugin = new FuseMochaPlugin(context);

    await mocha.addTestSuite('specs/Mocha.spec.js');

    await context.onWebviewReady();

    await mocha.run();
})();
