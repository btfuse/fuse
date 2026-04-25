
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

// Note that only flags supported by sqlite3_open_v2 is supported.
// The values come from https://www.sqlite.org/c3ref/c_open_autoproxy.html
export class FuseSQLiteConnectionFlags {
    private constructor() {}
    
    public static readonly READ_ONLY       = 0x00000001;
    public static readonly READ_WRITE      = 0x00000002;
    public static readonly CREATE          = 0x00000004;
    public static readonly URI             = 0x00000040;
    public static readonly MEMORY          = 0x00000080;
    public static readonly NO_MUTEX        = 0x00008000;
    public static readonly FULL_MUTEX      = 0x00010000;
    public static readonly SHARED_CACHE    = 0x00020000;
    public static readonly PRIVATE_CACHE   = 0x00040000;
    public static readonly NO_FOLLOW       = 0x01000000;
}
