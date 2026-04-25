
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

import {FuseSQLiteQuery} from './FuseSQLiteQuery';
import { TFuseSupportedSQLiteTypes } from './FuseSQLiteType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class FuseSQLiteRawQuery<TInput extends Record<string, TFuseSupportedSQLiteTypes> = any, TOutput = any> extends FuseSQLiteQuery<TInput, TOutput> {
    private $sql: string;

    public constructor(sql: string, input?: TInput) {
        super(input);
        this.$sql = sql;
    }

    public override getSQL(): string {
        return this.$sql;
    }
}
