import { FusePlugin } from '@nbsfuse/core';
export declare class EchoPlugin extends FusePlugin {
    protected _getID(): string;
    echo(message: string): Promise<string>;
    subscribe(cb: (data: string) => void): Promise<string>;
    bigResponse(): Promise<ArrayBuffer>;
}
