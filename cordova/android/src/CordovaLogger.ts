
import { CordovaEventEmitter } from '../../types/cordova';
import {Logger} from './Logger';

export class CordovaLogger extends Logger {
    private $api: CordovaEventEmitter;
    
    public constructor(api: CordovaEventEmitter) {
        super();
        this.$api = api;
    }

    public override verbose(message: string): void {
        this.$api.emit('verbose', message);
    }

    public override log(message: string): void {
        this.$api.emit('log', message);
    }

    public override warn(message: string): void {
        this.$api.emit('warn', message);
    }
    
    public override error(message: string): void {
        this.$api.emit('error', message);
    }
}
