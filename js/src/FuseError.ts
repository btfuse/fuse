
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

import { ISerializable } from "./ISerializable";
import { TFuseSerializable } from "./TSerializable";

/**
 * A union of acceptable type for error causes.
 */
export type TFuseErrorCause = string | Error | FuseError | null;

interface _IFuseErrorSerialized {
    domain: string;
    message: string;
    code: number;
    stack?: string;
}

/**
 * A type that represents a fuse error in a serialized state.
 */
export type IFuseErrorSerialized = TFuseSerializable<_IFuseErrorSerialized>;

/**
 * A structured error object.
 */
export class FuseError extends Error implements ISerializable {
    private $domain: string;
    private $message: string;
    private $cause: TFuseErrorCause;
    private $code: number;

    /**
     * @param domain - The error domain, usually represents a library, class, or plugin.
     * @param message - The error message
     * @param cause - The underlying cause of the error. May be null.
     * @param code - An error code. May be null.
     */
    public constructor(domain: string, message: string, cause?: TFuseErrorCause, code?: number) {
        super(message);
        this.name = this.constructor.name;
        this.$domain = domain;
        this.$message = message;
        this.$code = code || 0;
        this.$cause = cause || null;
    }

    /**
     * @returns The error message
     */
    public getMessage(): string {
        return this.$message;
    }

    /**
     * @returns The error domain, usually representing a library, class, or plugin.
     */
    public getDomain(): string {
        return this.$domain;
    }

    /**
     * @returns The error code
     */
    public getCode(): number {
        return this.$code;
    }

    /**
     * @returns The underlying cause of the error, if known. May be null.
     */
    public getCause(): TFuseErrorCause | null {
        return this.$cause;
    }
    
    /**
     * @returns A serialized object representing an error.
     */
    public serialize(): IFuseErrorSerialized {
        return {
            domain: this.getDomain(),
            message: this.getMessage(),
            code: this.getCode(),
            stack: this.stack
        };
    }

    /**
     * Wraps the given object into a FuseError object. Accepts several different
     * formats, which influences the behaviour of this method.
     * 
     * If the input is a string, a FuseError object is created with the string as
     * the error message of an unknown domain.
     * 
     * If the input is a FuseError, then this method does nothing but passes through
     * the FuseError. The returned FuseError is the input FuseError, a copy is not made.
     * 
     * If the input is an Error, then a FuseError is created using the name as the
     * domain, and it's message as the error message. The error object is also used
     * as the FuseError's cause parameter.
     * 
     * If the input is of the shape of IFuseErrorSerialized, then the object is
     * deserialized into a FuseError instance.
     * 
     * If any other type of object is given, an console error message will be 
     * printed and a "FuseError" domain error will be returned stating the error
     * is not wrappable.
     * 
     * @param error - A value that can represent an error
     * @returns A FuseError instance
     */
    public static wrap(error: string | Error | FuseError | IFuseErrorSerialized | unknown): FuseError {
        let ferr: FuseError = null;
        if (typeof error === 'string') {
            ferr = new FuseError('Unknown', error, null, 0);
        }
        else if (error instanceof FuseError) {
            ferr = error;
        }
        else if (error instanceof Error) {
            ferr = new FuseError(error.name, error.message, error, 0);
        }
        else if (FuseError.$isSerializedFuseError(error)) {
            ferr = FuseError.fromSerialized(error);
        }
        else {
            console.error('Unwrappable Error', error);
            ferr = new FuseError('FuseError', 'Unwrappable error', null, 0);
        }

        return ferr;
    }

    /**
     * Deserializes and creates a new FuseError instance
     * 
     * @param error - The serialized error object
     * @returns A FuseError instance
     */
    public static fromSerialized(error: IFuseErrorSerialized): FuseError {
        return new FuseError(error.domain, error.message, null, error.code);
    }

    public toString() {
        return 'FuseError';
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static $isSerializedFuseError(error: any): error is IFuseErrorSerialized {
        return 'message' in error && 'domain' in error && 'code' in error;
    }
}
