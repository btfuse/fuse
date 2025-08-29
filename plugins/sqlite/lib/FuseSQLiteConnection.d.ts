import { FuseSQLitePlugin } from './FuseSQLitePlugin';
export declare class FuseSQLiteConnection {
    private $context;
    private $handle;
    constructor(context: FuseSQLitePlugin, handle: string);
    /**
     * Gets the native handle
     */
    getHandle(): string;
    getContext(): FuseSQLitePlugin;
}
