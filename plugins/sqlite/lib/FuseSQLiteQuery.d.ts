import { FuseSQLiteConnection } from './FuseSQLiteConnection';
import { TFuseSupportedSQLiteTypes } from './FuseSQLiteType';
export declare abstract class FuseSQLiteQuery<TInput extends Record<string, TFuseSupportedSQLiteTypes>, TResponse> {
    private $input;
    constructor(input: TInput);
    getParameters(): TInput | null;
    abstract getSQL(): string;
    query(connection: FuseSQLiteConnection): Promise<TResponse>;
}
