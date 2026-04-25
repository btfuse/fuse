
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

import { FuseSQLiteConnection } from './FuseSQLiteConnection';
import {TFuseSupportedSQLiteTypes} from './FuseSQLiteType';

export abstract class FuseSQLiteQuery<TInput extends Record<string, TFuseSupportedSQLiteTypes>, TResponse> {
    private $input: TInput;

    public constructor(input: TInput) {
        this.$input = input;
    }

    public getParameters(): TInput | null {
        return this.$input;
    }

    public abstract getSQL(): string;

    public async execute(connection: FuseSQLiteConnection): Promise<TResponse> {
        return await connection.getContext().query<TResponse>(connection, this);
    }
}
