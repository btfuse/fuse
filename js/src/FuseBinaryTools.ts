
export const INT8_SIZE: number = 1;
export const INT16_SIZE: number = 2;
export const INT32_SIZE: number = 4;
export const INT64_SIZE: number = 8;
export const FLOAT_SIZE: number = 4;
export const DOUBLE_SIZE: number = 8;

export const UINT8_MIN: number = 0;
export const UINT8_MAX: number = 255;
export const INT8_MIN: number = -127;
export const INT8_MAX: number = 128;

export const UINT16_MIN: number = 0;
export const UINT16_MAX: number = 65535;
export const INT16_MIN: number = -32768;
export const INT16_MAX: number = 32767;

export const UINT32_MIN: number = 0;
export const UINT32_MAX: number = 4294967295;
export const INT32_MIN: number = -2147483648;
export const INT32_MAX: number = 2147483647;

export const UINT64_MIN: bigint = 0n;
export const UINT64_MAX: bigint = 18446744073709551615n;
export const INT64_MIN: bigint = -9223372036854775808n;
export const INT64_MAX: bigint = 9223372036854775807n;

export enum ByteOrder {
    LE,
    BE
}
