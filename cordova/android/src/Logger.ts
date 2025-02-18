
export abstract class Logger {
    public abstract verbose(message: string): void;
    public abstract log(message: string): void;
    public abstract warn(message: string): void;
    public abstract error(message: string): void;
}
