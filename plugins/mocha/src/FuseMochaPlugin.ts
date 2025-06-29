
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
    FusePlugin
} from '@btfuse/core';
import {expect} from 'chai';
import 'mocha/mocha';
import MochaStyle from 'mocha/mocha.css';
import { MochaRunner } from './vendor';
import { IMochaStats } from './IMochaStats';

export class FuseMochaPlugin extends FusePlugin {
    public constructor(context: FuseContext) {
        super(context);
        MochaStyle.use();
        window.mocha.setup({
            ui: 'bdd'
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

    public async run(): Promise<IMochaStats> {
        return new Promise<IMochaStats>((resolve, reject) => {
            let runner: MochaRunner = window.mocha.run();
        
            runner.on('end', () => {
                let stats: IMochaStats = runner.stats;
                this.$report(stats).then(() => {
                    resolve(stats);
                }).catch((e) => {
                    reject(e);
                });
            });

            // runner.on('error', ) //TODO: Not sure if there is such event
        });
    }

    private async $report(stats: IMochaStats): Promise<void> {
        await this._exec('/runner/complete', ContentType.JSON, stats);
    }
}
