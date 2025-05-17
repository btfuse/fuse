import { FuseSQLitePlugin } from './FuseSQLitePlugin';

export class FuseSQLiteConnection {
    private $context: FuseSQLitePlugin;
    private $handle: string;

    public constructor(context: FuseSQLitePlugin, handle: string) {
        this.$context = context;
        this.$handle = handle;
    }

    /**
     * Gets the native handle
     */
    public getHandle(): string {
        return this.$handle;
    }

    public getContext(): FuseSQLitePlugin {
        return this.$context;
    }
}
