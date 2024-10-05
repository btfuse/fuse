
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

/**
 * A static class with convenience methods for reading common
 * response content body formats.
 */
export class FuseResponseReader {
    private constructor() {}

    /**
     * @remarks
     * Reads the data buffer as a string
     * 
     * @param data - input data
     * @returns The buffer contents as a string
     */
    public static async readAsText(data: ArrayBuffer): Promise<string> {
        return await new Promise<string>((resolve, reject) => {
            const reader: FileReader = new FileReader();
            reader.onload = () => {
                resolve(<string>reader.result);
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsText(new Blob([data]));
        });
    }

    /**
     * @remarks
     * Reads the given data buffer as a JSON object. The JSON object
     * can be typed as T generic. No validations occurs on whether the given
     * data is actually a type of T.
     * 
     * @throws {@link SyntaxError}
     * If data is not parseable as JSON.
     * 
     * @param data - input data
     * @returns The buffer contents as a JSON object.
     */
    public static async readAsJSON<T>(data: ArrayBuffer): Promise<T> {
        const str: string = await this.readAsText(data);
        return JSON.parse(str);
    }
}
