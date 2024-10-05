
/*
Copyright 2023 Breautek

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

import {FuseError} from '../src/FuseError';

describe('FuseError', () => {
    it('should identify as FuseError via toString', () => {
        const ferr: FuseError = new FuseError('', '');
        expect(ferr.toString()).toBe('FuseError');
    });

    it('should identify as FuseError via name', () => {
        const ferr: FuseError = new FuseError('', '');
        expect(ferr.name).toBe('FuseError');
    });

    describe('Error Wrapping', () => {
        it('can wrap strings', () => {
            const ferr: FuseError = FuseError.wrap('test string error');
            expect(ferr.getDomain()).toBe('Unknown');
            expect(ferr.getMessage()).toBe('test string error');
            expect(ferr.getMessage()).toBe(ferr.message);
            expect(ferr.getCode()).toBe(0);
        });

        it('can wrap Error', () => {
            const origError: Error = new Error('test error');
            const ferr: FuseError = FuseError.wrap(origError);
            expect(ferr.getDomain()).toBe('Error');
            expect(ferr.getMessage()).toBe('test error');
            expect(ferr.getMessage()).toBe(ferr.message);
            expect(ferr.getCause()).toBe(origError);
            expect(ferr.getCode()).toBe(0);
        });

        it('can wrap FuseError', () => {
            const origError: FuseError = new FuseError('domain', 'test error');
            const ferr: FuseError = FuseError.wrap(origError);
            expect(ferr.getDomain()).toBe('domain');
            expect(ferr.getMessage()).toBe('test error');
            expect(ferr.getMessage()).toBe(ferr.message);
            expect(ferr).toBe(origError);
            expect(ferr.getCode()).toBe(0);
        });

        it('can wrap serialized fuse errors', () => {
            const ferr: FuseError = FuseError.wrap({
                domain: 'domain',
                message: 'test error',
                code: 1
            });
            expect(ferr.getDomain()).toBe('domain');
            expect(ferr.getMessage()).toBe('test error');
            expect(ferr.getMessage()).toBe(ferr.message);
            expect(ferr.getCause()).toBe(null);
            expect(ferr.getCode()).toBe(1);
        });
    });
});
