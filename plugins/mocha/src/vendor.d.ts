
import {expect} from 'chai';
export {}

interface MochaOptions {
    ui?: 'bdd'
    allowUncaught?: boolean;
    asyncOnly?: boolean;
    bail?: boolean;
    checkLeaks?: boolean;
}

export interface MochaStats {
    suites: number;
    tests: number;
    passes: number;
    pending: number;
    failures: number;
    duration: number;
    start: string;
    end: string;
}

export interface MochaRunner {
    stats: MochaStats;
    on(e: string, callback: Function): void;
}

export interface IMochaError {
    code: string;
    message: string;
}

export interface IMochaTest {
    title: string;
    sync: boolean;
    timedOut: boolean;
    pending: boolean;
    fn: Function;
    state: "passed" | "failed" | "pending";
    err: IMochaError | null;
}

export interface IMochaSuite {
    suites: IMochaSuite[];
    tests: IMochaTest[];
    title: string;
}

interface MochaAPI {
    setup(opts): void;
    run(): MochaRunner;
    suite: IMochaSuite;
}

declare global {
    interface Window {
        mocha: MochaAPI;
        expect: typeof expect;
    }
}
