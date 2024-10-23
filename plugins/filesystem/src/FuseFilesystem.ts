
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

import {
    ContentType,
    FuseAPIResponse,
    FuseError,
    FusePlugin,
    TSerializable
} from '@btfuse/core';
import {FuseFileObject} from './FuseFileObject';
import { FuseFileType } from './FuseFileType';
import { FuseDirectory } from './FuseDirectory';

const TAG: string = 'FuseFilesystem';

export class FuseFilesystem extends FusePlugin {
    protected override _getID(): string {
        return TAG;
    }

    public get(path: string): FuseFileObject {
        return new FuseFileObject(this, path);
    }

    public getDirectory(path: string): FuseDirectory {
        let obj: FuseFileObject = this.get(path);
        return new FuseDirectory(obj);
    }

    public async getFileType(file: FuseFileObject): Promise<FuseFileType> {
        let response: FuseAPIResponse = await this._exec('file/type', ContentType.TEXT, file.getPath());
        
        if (response.isError()) {
            throw await response.readAsError();
        }
        
        let serializedType: number = parseInt(await response.readAsText());

        if (isNaN(serializedType) || serializedType < FuseFileType.FILE || serializedType > FuseFileType.DIRECTORY) {
            throw new FuseError(TAG, `Invalid FileType value: ${serializedType}`);
        }

        return <FuseFileType> serializedType;
    }

    public async getSize(file: FuseFileObject): Promise<number> {
        let response: FuseAPIResponse = await this._exec('file/size', ContentType.TEXT, file.getPath());

        if (response.isError()) {
            throw await response.readAsError();
        }

        let size: number = parseInt(await response.readAsText());

        if (isNaN(size)) {
            size = -1;
        }

        return size;
    }

    public async mkdir(file: FuseFileObject, recursive?: boolean): Promise<boolean> {
        let response: FuseAPIResponse = await this._exec('file/mkdir', ContentType.JSON, {
            path: file.getPath(),
            recursive: !!recursive
        });

        if (response.isError()) {
            throw await response.readAsError();
        }

        let result: string = await response.readAsText();
        return result === 'true';
    }

    public async read(file: FuseFileObject, length: number, offset: number): Promise<ArrayBuffer> {
        let response: FuseAPIResponse = await this._exec('file/read', ContentType.JSON, {
            path: file.getPath(),
            length: length,
            offset: offset
        });

        if (response.isError()) {
            throw await response.readAsError();
        }

        return response.readAsArrayBuffer();
    }

    private $createDataPacket(headerData: string, data: Blob): Blob {
        let encoder: TextEncoder = new TextEncoder();
        let serializedHeaderData: Uint8Array = encoder.encode(headerData);

        return new Blob([
            new Uint32Array([serializedHeaderData.byteLength]),
            serializedHeaderData,
            data
        ]);
    }

    public async truncate(file: FuseFileObject, data: TSerializable): Promise<number> {
        let payload: Blob = this.$createDataPacket(file.getPath(), this._getAPI().getSerializer().serialize(data));

        let response: FuseAPIResponse = await this._exec('file/truncate', ContentType.BINARY, payload);

        if (response.isError()) {
            throw await response.readAsError();
        }

        return parseInt(await response.readAsText());
    }

    public async append(file: FuseFileObject, data: TSerializable): Promise<number> {
        let payload: Blob = this.$createDataPacket(file.getPath(), this._getAPI().getSerializer().serialize(data));

        let response: FuseAPIResponse = await this._exec('file/append', ContentType.BINARY, payload);

        if (response.isError()) {
            throw await response.readAsError();
        }

        return parseInt(await response.readAsText());
    }

    public async write(file: FuseFileObject, data: TSerializable, offset: number = 0): Promise<number> {
        let payload: Blob = this.$createDataPacket(JSON.stringify({
            path: file.getPath(),
            offset: offset
        }), this._getAPI().getSerializer().serialize(data));

        let response: FuseAPIResponse = await this._exec('file/write', ContentType.BINARY, payload);

        if (response.isError()) {
            throw await response.readAsError();
        }

        return parseInt(await response.readAsText());
    }

    public async remove(file: FuseFileObject, recursive: boolean = false): Promise<void> {
        let response: FuseAPIResponse = await this._exec('file/remove', ContentType.JSON, {
            path: file.getPath(),
            recursive: recursive
        });
        if (response.isError()) {
            throw await response.readAsError();
        }
    }

    public async exists(file: FuseFileObject): Promise<boolean> {
        let response: FuseAPIResponse = await this._exec('file/exists', ContentType.TEXT, file.getPath());
        if (response.isError()) {
            throw await response.readAsError();
        }

        let value: string = await response.readAsText();
        return value === '1';
    }
}
