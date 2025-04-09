import { FuseContext } from '../FuseContext';
import { FusePlugin } from '../FusePlugin';
/**
 * A class to interface with native memory store object
 * These memory stores can store stateful strings. This state
 * is kept in memory even if the OS destroys the application's UI while
 * the application is in the background.
 *
 * This is not to be confused with persistent storage. The memory
 * store is intended to simply store state in between a paused application.
 * If the application completely gets closed, destroyed or stopped by the user,
 * the memory store will be cleared.
 */
export declare class FuseMemoryStore extends FusePlugin {
    constructor(context: FuseContext);
    protected _getID(): string;
    /**
     * @param key - A name for the value
     * @param value - The value to store, only stringified data is permitted
     */
    set(key: string, value: string): Promise<void>;
    /**
     * @param key - The stored key
     * @returns
     */
    get(key: string): Promise<string>;
}
