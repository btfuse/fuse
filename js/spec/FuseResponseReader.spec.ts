
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

import {FuseResponseReader} from '../src/FuseResponseReader';

describe('FuseResponseReader', () => {
    const SAMPLE: string = '{"test":123}';
    let buffer: ArrayBuffer;

    beforeAll(async () => {
        const reader: FileReader = new FileReader();

        return await new Promise<void>((resolve, reject) => {
            reader.onload = () => {
                buffer = <ArrayBuffer>reader.result;
                resolve();
            };

            reader.onerror = () => {
                reject(reader.error);
            };

            reader.readAsArrayBuffer(new Blob([SAMPLE]));
        });
    });

    it('can read buffer as text', async () => {
        const result: string = await FuseResponseReader.readAsText(buffer);
        expect(result).toBe(SAMPLE);
    });

    it('can read as JSON', async () => {
        const result: Record<string, unknown> = await FuseResponseReader.readAsJSON(buffer);
        expect(result).toEqual({
            test: 123
        });
    });
});
