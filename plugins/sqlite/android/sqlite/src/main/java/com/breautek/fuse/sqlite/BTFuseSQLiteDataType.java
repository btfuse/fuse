
/*
Copyright 2026 Breautek

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

package com.breautek.fuse.sqlite;

// Mirrors BTFuseSQLiteDataType enum in BTFuseSQLite.h — values must stay in sync.
public class BTFuseSQLiteDataType {
    public static final byte VOID    = 0;
    public static final byte INTEGER = 1;
    public static final byte REAL    = 2;
    public static final byte TEXT    = 3;
    public static final byte BLOB    = 4;

    private BTFuseSQLiteDataType() {}
}