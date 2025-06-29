
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
    on(e: string, callback: () => void): void;
}

interface MochaAPI {
    setup(opts): void;
    run(): MochaRunner;
}

declare global {
    interface Window {
        mocha: MochaAPI;
        expect: typeof expect;
    }
}
