
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

import { FuseLoggerLevel } from './FuseLoggerLevel';
import {TSerializable} from './TSerializable';

export interface INativeLogEntry {
    level: FuseLoggerLevel;
    message: string;
}

export interface IFuseLogger {
    /**
     * If enabled, log calls will also be sent to the native environment and logged in the native
     * syslog.
     * 
     * @param flag - Implementors shall enable bridge logging if true
     */
    enableNativeBridge: (flag: boolean) => void;

    /**
     * The log level to filter prints.
     * 
     * This is a bitmask, so to enable multiple options, use the bitmask OR (|) operator.
     * e.g: setLevel(INFO | WARN | ERROR)
     * 
     * To remove a bit, you can use getLevel() to get the current mask and use &= operator along with the bit NOT (~) operator.
     * e.g: mask &= INFO; // Remove INFO from log outputs
     * 
     * @param level - The verbosity level
     */
    setLevel: (level: FuseLoggerLevel) => void;

    /**
     * Gets the current logger level mask
     * 
     * @returns 
     */
    getLevel: () => FuseLoggerLevel;

    /**
     * Prints debug style logs
     * @param args - log arguments
     * @returns 
     */
    debug: (...args: TSerializable[]) => void;

    /**
     * Prints info style logs
     * @param args - log arguments
     * @returns 
     */
    info: (...args: TSerializable[]) => void;

    /**
     * Prints warn style logs
     * @param args - log arguments
     * @returns 
     */
    warn: (...args: TSerializable[]) => void;

    /**
     * Prints error style logs
     * @param args - log arguments
     * @returns 
     */
    error: (...args: TSerializable[]) => void;
}
