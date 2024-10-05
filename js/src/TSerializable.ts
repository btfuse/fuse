
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

import {ISerializable} from './ISerializable';

/**
 * Type of supported serializable obejcts that can go over the Fuse API bridge.
 * 
 * Currently the supported types are:
 *  - Error
 *  - Blob
 *  - ArrayBuffer
 *  - Primitives (string, number, boolean)
 *  - Date
 *  - Any object or array consisting exclusively of the above types
 */
export type TSerializable = Error |
                            string |
                            Blob |
                            ArrayBuffer |
                            ISerializable<TSerializable> |
                            number |
                            boolean |
                            Date | TSerializable[] | {[key: string]: TSerializable };

/**
 * Utility type wrap, useful if you have a concrete interface of TSerializable properties.
 * Use this to declare that your interface is Fuse Serializable.
 * 
 * e.g.
 * 
 * ```typescript
 *  interface MyInterface {...}
 *  type TMyInterface = FuseSerializable<MyInterface>;
 * ```
 * 
 */
export type TFuseSerializable<T> = {
    [K in keyof T]: T[K];
}
