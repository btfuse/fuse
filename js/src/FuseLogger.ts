
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
    IFuseLogger, INativeLogEntry
} from './IFuseLogger';
import {TSerializable} from './TSerializable';
import {ISerializable} from './ISerializable';
import { FuseLoggerLevel } from './FuseLoggerLevel';

/**
 * A serializer for logging. This is different than a {@link FuseSerializer} in
 * that in serializer transforms objects into a printable string representation.
 */
export class FuseLoggerSerializer {
    public constructor() {}

    protected _serializeToString(obj: TSerializable): string {
        if (typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === 'string') {
            return this._serializePrimitiveToString(obj);
        }
        else if (obj instanceof Date) {
            return this._serializeDateToString(obj);
        }
        else if (this._isISerializable(obj)) {
            return this._serializeToString(obj.serialize());
        }
        else if (obj instanceof Error) {
            return this._serializeErrorToString(obj);
        }

        // When all else fails, attempt to JSON stringify
        return JSON.stringify(obj, null, 4);
    }

    protected _serializePrimitiveToString(obj: number | string | boolean): string {
        return obj.toString();
    }

    protected _serializeErrorToString(obj: Error): string {
        const serializedError = {
            name: obj.name,
            message: obj.message,
            stack: obj.stack
        };

        return JSON.stringify(serializedError, null, 4);
    }

    protected _serializeDateToString(obj: Date): string {
        return obj.toISOString();
    }

    /**
     * @remarks
     * Serializes an object into a printable string.
     * 
     * @param obj - The object to serialize
     * @returns A printable string
     */
    public serialize(obj: TSerializable): string {
        if (obj === null || obj === undefined) {
            return null;
        }

        let out: string = null;
        if (obj instanceof Blob) {
            out = `[Blob ${obj.type || 'Binary'} (${obj.size} bytes)]`;
        }
        else if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || obj instanceof Date) {
            out = this._serializeToString(obj);
        }
        else if (obj instanceof ArrayBuffer) {
            out = `[ArrayBuffer (${obj.byteLength} bytes)]`;
        }
        else if (this._isISerializable(obj)) {
            out = this.serialize(obj.serialize());
        }
        else {
            // should be either JSON objects or json arrays at this point
            out = this._serializeToString(obj);
        }

        return out;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected _isISerializable(x: any): x is ISerializable {
        return !!x.serialize && typeof x.serialize === 'function';
    }
}

/**
 * A base logger implementation which includes a serializer for common types.
 * It will serialize/accept all values that TSerializable accepts, however Blob/ArrayBuffer
 * or other binary data types will not be serialized. Instead it will print an
 * object identifier, with mime type if present, along with the size of the buffer.
 * 
 * The base logger does not provide any native bridging. While usable for purely webview side,
 * use the FuseLoggerFactory to get a logger specific for your runtime environment.
 */
export class FuseLogger implements IFuseLogger {
    private $level: FuseLoggerLevel;
    private $enableNativeBridge: boolean;
    private $serializer: FuseLoggerSerializer;

    public constructor() {
        this.$enableNativeBridge = true;
        this.$level = FuseLoggerLevel.INFO | FuseLoggerLevel.WARN | FuseLoggerLevel.ERROR;
        this.$serializer = new FuseLoggerSerializer();
        this._registerNativeCalblack();
    }

    protected _registerNativeCalblack(): void {}

    /**
     * 
     * @param level - A bitmask option to indicate which levels to log.
     * 
     * @example
     * To report on WARN and ERROR only, you would set:
     * 
     * ```typescript
     * logger.setLevel(FuseLoggerLevel.WARN | FuseLoggerLevel.ERROR);
     * ```
     */
    public setLevel(level: number): void {
        this.$level = level;
    }

    /**
     * 
     * @returns The current log level bitmask.
     */
    public getLevel(): number {
        return this.$level;
    }

    /**
     * @remarks
     * If enabled, The native FuseLogger will pass native log messages to
     * the webview and will be logged into the JS console. Logs passed through
     * this logger will also be passed to the native environment and will be
     * logged in the native's logging console.
     * 
     * This can be helpful in debugging where all logs will be in the same place,
     * however, logging can be verbose and can cause a degration of performance,
     * therefore it may not be desirable to have enabled for production builds.
     * 
     * This feature is currently enabled by default, however this is subject to
     * change.
     * 
     * @param flag - enables the native bridge logging if enabled.
     */
    public enableNativeBridge(flag: boolean): void {
        this.$enableNativeBridge = !!flag;
    }

    protected _onNativeLogEntry(entry: INativeLogEntry): void {
        if (!(this.getLevel() & entry.level)) {
            return;
        }

        if (entry.level === FuseLoggerLevel.SILENT) {
            return;
        }

        switch (entry.level) {
            case FuseLoggerLevel.DEBUG:
                console.debug(entry.message);
                break;
            case FuseLoggerLevel.INFO:
                console.info(entry.message);
                break;
            case FuseLoggerLevel.WARN:
                console.warn(entry.message);
                break;
            case FuseLoggerLevel.ERROR:
                console.error(entry.message);
                break;
        }
    }

    /**
     * @virtual - Implementators use this method to call on the native logging API.
     * @param level - The log level for this log print
     * @param message - Overridable hook to send logs to the native environment
     */
    protected _logToNative(level: FuseLoggerLevel, message: string): void {}

    private $logToNative(level: FuseLoggerLevel, args: TSerializable[]): void {
        if (!this.$enableNativeBridge) {
            return;
        }

        const serializedArgs: string[] = [];

        for (let i: number = 0; i < args.length; i++) {
            serializedArgs.push(this.$serializer.serialize(args[i]));
        }

        this._logToNative(level, serializedArgs.join('\t'));
    }

    /**
     * @param args - variadic arguments of serializable objects to log to the console
     */
    public debug(...args: TSerializable[]): void {
        if (!(this.$level & FuseLoggerLevel.DEBUG)) {
            return;
        }

        console.debug(...args);
        this.$logToNative(FuseLoggerLevel.DEBUG, args);
    }

    /**
     * @param args - variadic arguments of serializable objects to log to the console
     */
    public info(...args: TSerializable[]): void {
        if (!(this.$level & FuseLoggerLevel.INFO)) {
            return;
        }

        console.info(...args);
        this.$logToNative(FuseLoggerLevel.INFO, args);
    }

    /**
     * @param args - variadic arguments of serializable objects to log to the console
     */
    public warn(...args: TSerializable[]): void {
        if (!(this.$level & FuseLoggerLevel.WARN)) {
            return;
        }

        console.warn(...args);
        this.$logToNative(FuseLoggerLevel.WARN, args);
    }

    /**
     * @param args - variadic arguments of serializable objects to log to the console
     */
    public error(...args: TSerializable[]): void {
        if (!(this.$level & FuseLoggerLevel.ERROR)) {
            return;
        }

        console.error(...args);
        this.$logToNative(FuseLoggerLevel.ERROR, args);
    }
}
