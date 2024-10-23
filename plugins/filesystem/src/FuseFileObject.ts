
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

import {FusePath} from './FusePath';
import {FuseFilesystem} from './FuseFilesystem';
import {FuseFileType} from './FuseFileType';
import {IFuseFileObject} from './IFuseFileObject';
import { FuseDirectory } from './FuseDirectory';
import { TSerializable } from '@btfuse/core';

/**
 * An object representing any kind of filesystem object
 */
export class FuseFileObject implements IFuseFileObject<ArrayBuffer> {
    private $path: string;
    private $fs: FuseFilesystem;

    public constructor(fs: FuseFilesystem, path: string, parent?: string | FuseFileObject) {
        this.$fs = fs;
        this.$path = path;

        if (parent) {
            if (typeof parent === 'string') {
                this.$path = FusePath.resolve(parent, this.$path);
            }
            else {
                this.$path = FusePath.resolve(parent.getPath(), this.$path);
            }
        }
    }

    public getParent(): FuseDirectory | null {
        if (this.getPath() === '/') {
            return null;
        }

        return this.getDirectory('..');
    }

    public getPath(): string {
        return this.$path;
    }

    public get(path: string): FuseFileObject {
        return new FuseFileObject(this.$fs, path, this);
    }

    public getDirectory(path: string): FuseDirectory {
        let obj: FuseFileObject = this.get(path);
        return new FuseDirectory(obj);
    }

    public async getType(): Promise<FuseFileType> {
        return await this.$fs.getFileType(this);
    }

    public async isDirectory(): Promise<boolean> {
        let type: FuseFileType = await this.getType();
        return type === FuseFileType.DIRECTORY;
    }

    public async isFile(): Promise<boolean> {
        let type: FuseFileType = await this.getType();
        return type === FuseFileType.DIRECTORY;
    }

    public async getSize(): Promise<number> {
        return await this.$fs.getSize(this);
    }

    public async mkdir(recursive?: boolean | undefined): Promise<boolean> {
        return await this.$fs.mkdir(this, recursive);
    }

    public async read(): Promise<ArrayBuffer> {
        return await this.$fs.read(this, -1, 0);
    }

    public async readChunk(length: number, offset?: number): Promise<ArrayBuffer> {
        return await this.$fs.read(this, length, offset || 0);
    }

    public async truncate(data?: TSerializable | undefined): Promise<number> {
        return await this.$fs.truncate(this, data === undefined || data === null ? new ArrayBuffer(0) : data);
    }
    
    public async append(data: TSerializable): Promise<number> {
        return await this.$fs.append(this, data === undefined || data === null ? new ArrayBuffer(0) : data);
    }
    
    public async write(data: TSerializable, offset?: number | undefined): Promise<number> {
        data = data === undefined || data === null ? new ArrayBuffer(0) : data;
        return await this.$fs.write(this, data, offset);
    }

    public async remove(recursive?: boolean): Promise<void> {
        await this.$fs.remove(this, recursive);
    }

    public async exists(): Promise<boolean> {
        return await this.$fs.exists(this);
    }
}
