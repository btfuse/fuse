
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
    ContentType,
    FuseContext,
    FusePlugin,
    TFuseSerializable
} from '@btfuse/core';
import {expect} from 'chai';
import 'mocha/mocha';
import MochaStyle from 'mocha/mocha.css';
import { IMochaSuite, IMochaTest, MochaRunner } from './vendor';
import { IMochaStats } from './IMochaStats';
import * as UUID from 'uuid';
import { TestState } from './TestState';

interface _ITest {
    title: string;
    id: string;
}

type ITest = TFuseSerializable<_ITest>;

interface _ISuite {
    title: string;
    suites: ISuite[];
    tests: ITest[];
}

type ISuite = TFuseSerializable<_ISuite>;

export class FuseMochaPlugin extends FusePlugin {
    public constructor(context: FuseContext) {
        super(context);
        MochaStyle.use();
        window.mocha.setup({
            ui: 'bdd',
            cleanReferencesAfterRun: false // TODO: turn back on after debug
        });
        window.expect = expect;
    }

    protected override _getID(): string {
        return 'FuseMocha'
    }

    public async addTestSuite(path: string | string[]): Promise<void> {
        if (typeof path === 'string') {
            await this.$addTest(path);
        }
        else {
            let ps = path.map((p: string) => {
                return this.$addTest(p);
            });

            await Promise.all(ps);
        }
    }

    private $addTest(path: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let s: HTMLScriptElement = document.createElement('script');
            s.src = path;
            s.onload = () => {
                resolve();
            };
            s.onerror = (e) => {
                reject(e);
            };
            document.body.appendChild(s);
        });
    }

    private $visitSuites(msuites: IMochaSuite[], out: ISuite, testMap: Record<string, ITest>, fnMap: Map<Function, string>): void {
        for (let i: number = 0 ; i < msuites.length; i++) {
            let msuite: IMochaSuite = msuites[i];
            let suite: ISuite = {
                title: msuite.title,
                suites: [],
                tests: []
            };

            for (let j: number = 0; j < msuite.tests.length; j++) {
                let mtest: IMochaTest = msuite.tests[j];
                let test: ITest = {
                    title: mtest.title,
                    id: UUID.v4()
                };

                console.log('TEST FN', mtest.fn);

                testMap[test.id] = test;
                fnMap.set(mtest.fn, test.id);

                suite.tests.push(test);
            }

            this.$visitSuites(msuite.suites, suite, testMap, fnMap);

            out.suites.push(suite);
        }
    }

    private async $sendSuites(fnMap: Map<Function, string>): Promise<void> {
        let root: ISuite = {
            title: 'Mocha Tests',
            suites: [],
            tests: []
        };

        let testMap: Record<string, ITest> = {};

        for (let i: number = 0; i < window.mocha.suite.tests.length; i++) {
            let mtest: IMochaTest = window.mocha.suite.tests[i];
            let test: ITest = {
                title: mtest.title,
                id: UUID.v4()
            };

            testMap[test.id] = test;
            fnMap.set(mtest.fn, test.id);

            root.tests.push(test);
        }

        this.$visitSuites(window.mocha.suite.suites, root, testMap, fnMap);

        await this._exec('/runner/load', ContentType.JSON, {
            ...root,
            totalTestCount: Object.keys(testMap).length
        });
    }

    private $stateToEnum(testState: string): TestState {
        switch (testState) {
            case 'passed': return TestState.PASSED;
            case 'pending': return TestState.SKIPPED;
            case 'failed': return TestState.FAILED;
            case 'timeout': return TestState.TIMEOUT;
            default: throw new Error('Unsupported test state: ' + testState);
        }
    }

    public async run(): Promise<IMochaStats> {
        let fnMap: Map<Function, string> = new Map();

        await this.$sendSuites(fnMap);

        let stats = await new Promise<IMochaStats>((resolve, reject) => {
            let runner: MochaRunner = window.mocha.run();

            console.log('MOCHA RUNNER', runner);
        
            runner.on('end', () => {
                let stats: IMochaStats = runner.stats;
                this.$report(stats).then(() => {
                    resolve(stats);
                }).catch((e) => {
                    reject(e);
                });
            });

            runner.on('test end', async (test: IMochaTest) => {
                let id: string = fnMap.get(test.fn);
                if (!id) {
                    // TODO: Maybe report to native of unmapped id, so that it can
                    // forcefully fail & exit?
                    console.warn('Test result does not have a context id mapped.');
                    return;
                }

                let state: TestState = this.$stateToEnum(test.state);
                let reason: string = null;
                if (state === TestState.FAILED && test.err) {
                    if (test.err.code === 'ERR_MOCHA_TIMEOUT') {
                        state = TestState.TIMEOUT;
                    }

                    reason = test.err.message;
                }

                await this.$reportTestResult(id, state, reason);
            });
        });

        return stats;
    }

    private async $reportTestResult(id: string, testState: TestState, reason?: string): Promise<void> {
        await this._exec('/runner/post', ContentType.JSON, {
            id: id,
            state: testState,
            reason: reason
        });
    }

    private async $report(stats: IMochaStats): Promise<void> {
        await this._exec('/runner/complete', ContentType.JSON, stats);
    }
}
