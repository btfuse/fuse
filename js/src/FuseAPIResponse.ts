
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

import { FuseResponseReader } from "./FuseResponseReader";
import { FuseError, IFuseErrorSerialized } from './FuseError';

export class FuseAPIResponse {
    private $content: ArrayBuffer;
    private $headers: Map<string, string[]>;
    private $status: number;

    public constructor(content: ArrayBuffer, headers: string | null, status: number) {
        this.$status = status;
        this.$content = content;
        this.$headers = this.$parseHeaders(headers);
    }

    public isError(): boolean {
        return this.$status >= 400;
    }

    public getContentLength(): number {
        const lenStr: string = this.$headers.get('content-type')?.[0];
        let length: number = parseInt(lenStr);
        if (isNaN(length)) {
            length = 0;
        }
        return length;
    }

    public getContentType(): string {
        return this.$headers.get('content-type')?.[0];
    }

    public async readAsArrayBuffer(): Promise<ArrayBuffer> {
        return this.$content;
    }

    public async readAsBlob(): Promise<Blob> {
        return new Blob([this.$content]);
    }

    public async readAsText(): Promise<string> {
        return await FuseResponseReader.readAsText(this.$content);
    }

    public async readAsJSON<T = unknown>(): Promise<T> {
        return await FuseResponseReader.readAsJSON(this.$content);
    }

    public async readAsError(): Promise<FuseError> {
        const serializedError: IFuseErrorSerialized = await FuseResponseReader.readAsJSON(this.$content);
        return FuseError.fromSerialized(serializedError);
    }

    public getHeaders(): Map<string, string[]> {
        return this.$headers;
    }

    public getHeader(key: string): string[] {
        return this.$headers.get(key);
    }

    private $parseHeaders(headers: string | null): Map<string, string[]> {
        const map: Map<string, string[]> = new Map();

        if (!headers) {
            return map;
        }

        const lines: string[] = headers.split('\r\n');
        for (let i: number = 0; i < lines.length; i++) {
            const line: string[] = lines[i].split(':');
            const key: string = line[0];
            if (!map.has(key)) {
                map.set(key, []);
            }

            const headerValue: string[] = map.get(key);
            headerValue.push(line[1]);
        }

        return map;
    }
}
