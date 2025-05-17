
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

    public async query(connection: FuseSQLiteConnection): Promise<TResponse> {
        return await connection.getContext().query<TResponse>(connection, this);
    }
}
