
import {
    ConfigParser,
    CordovaEventEmitter,
    ICreatePlatformOptions
} from '../../types/cordova';

const VERSION: string = '0.0.0';

export = class API {
    public platform: string;
    public root: string;

    public constructor(platform: unknown, platformRootDir: string, events: unknown) {
        this.platform = 'fuse-android';
        this.root = platformRootDir;
    }

    public getPlatformInfo(): unknown {
        return {
            locations: null,
            root: this.root,
            name: this.platform,
            version: VERSION,
            projectConfig: null
        };
    }

    public async prepare(project: unknown, options: unknown): Promise<unknown> {
        console.log('PREPARE', project, options);
        return;
    }

    public async addPlugin(plugin: unknown, options: unknown): Promise<unknown> {
        console.log('ADD PLUGIN', plugin, options);
        return;
    }

    public async removePlugin(plugin: unknown, options: unknown): Promise<unknown> {
        console.log('REMOVE PLUGIN', plugin, options);
        return;
    }

    public async build(options: unknown): Promise<unknown> {
        console.log('BUILD', options);
        return;
    }

    public async run(options: unknown): Promise<unknown> {
        console.log('RUN', options);
        return;
    }

    public async listTargets(options: unknown): Promise<unknown> {
        console.log('LIST TARGETS', options);
        return;
    }

    public async clean(options: unknown): Promise<unknown> {
        console.log('CLEAN', options);
        return;
    }

    public async requirements(): Promise<unknown> {
        console.log('REQUIREMENTS');
        return;
    }

    public static async createPlatform(destination: string, config: ConfigParser, options: ICreatePlatformOptions, events: CordovaEventEmitter): Promise<API> {
        console.log('CREATE PLATFORM', destination, config, options, events);
        return new API(null, destination, events);
    }

    public static updatePlatform(destination: string, options: unknown, events: unknown): API {
        return new API(null, destination, events);
    }

    public static version(): string {
        return VERSION;
    }
}
