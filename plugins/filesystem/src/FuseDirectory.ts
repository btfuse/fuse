

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

import { FuseFileObject } from "./FuseFileObject";
import { FuseFileType } from "./FuseFileType";
import { IFuseFileObject } from "./IFuseFileObject";
import {
    FuseError,
    FuseResponseReader, TSerializable
} from '@btfuse/core';

/**
 * Wrapper around a FuseFileObject when it's known to be
 * representing a directory. This wrapper will provide better
 * type details
 */
export class FuseDirectory implements IFuseFileObject<string[]> {
    private $fileObj: FuseFileObject;

    public constructor(obj: FuseFileObject) {
        this.$fileObj = obj;
    }
    
    public getParent(): FuseDirectory | null {
        return this.$fileObj.getParent();
    }

    public getPath(): string {
        return this.$fileObj.getPath();
    }

    public get(path: string): FuseFileObject {
        return this.$fileObj.get(path);
    }

    public getDirectory(path: string): FuseDirectory {
        return this.$fileObj.getDirectory(path);    
    }

    public async getType(): Promise<FuseFileType> {
        return this.$fileObj.getType();
    }

    public async isDirectory(): Promise<boolean> {
        return this.$fileObj.isDirectory();
    }

    public async isFile(): Promise<boolean> {
        return this.$fileObj.isFile();
    }

    public async getSize(): Promise<number> {
        return this.$fileObj.getSize();
    }

    public async mkdir(recursive?: boolean | undefined): Promise<boolean> {
        return await this.$fileObj.mkdir(recursive);
    }
    
    public async read(): Promise<string[]> {
        let buffer: ArrayBuffer = await this.$fileObj.read();
        return await FuseResponseReader.readAsJSON(buffer);
    }

    public async readChunk(length: number, offset?: number | undefined): Promise<string[]> {
        let buffer: ArrayBuffer = await this.$fileObj.readChunk(length, offset);
        return await FuseResponseReader.readAsJSON(buffer);
    }

    public truncate(data?: TSerializable | undefined): Promise<number> {
        throw new FuseError('FuseDirectory', 'Directory is not writable. Use get API to get a FuseFileObject instead.');
    }
    
    public append(data: TSerializable): Promise<number> {
        throw new FuseError('FuseDirectory', 'Directory is not writable. Use get API to get a FuseFileObject instead.');
    }
    
    public write(data: TSerializable, offset?: number | undefined): Promise<number> {
        throw new FuseError('FuseDirectory', 'Directory is not writable. Use get API to get a FuseFileObject instead.');
    }

    public async remove(recursive?: boolean | undefined): Promise<void> {
        return await this.$fileObj.remove(recursive);
    }
    
    public async exists(): Promise<boolean> {
        return await this.$fileObj.exists();
    }
}
