
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

package com.breautek.fuse;

import androidx.annotation.NonNull;

public class FuseLoggerLevel {
    public static final int SILENT = 0;
    public static final int DEBUG = 1;
    public static final int INFO = 1 << 1;
    public static final int WARN = 1 << 2;
    public static final int ERROR = 1 << 3;

    private FuseLoggerLevel() {}

    @NonNull
    public static String toString(int value) {
        switch (value) {
            case SILENT:
                return "SILENT";
            case DEBUG:
                return "DEBUG";
            case INFO:
                return "INFO";
            case WARN:
                return "WARN";
            case ERROR:
                return "ERROR";
            default:
                return Integer.toString(value);
        }
    }
}
