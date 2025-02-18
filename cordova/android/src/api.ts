
/*
Copyright 2025 Breautek

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

import {
    ConfigParser,
    CordovaEventEmitter,
    ICreatePlatformOptions,
    IPlatformLocations,
    IPrepareOptions,
    IPrepareProject
} from '../../types/cordova';
import { AndroidProject } from './AndroidProject';
import { CordovaLogger } from './CordovaLogger';
import * as Filesystem from 'node:fs';
import * as Path from 'node:path';

const VERSION: string = ((): string => {
    let pkgContents: string = Filesystem.readFileSync(Path.resolve(__dirname, '../package.json'), {
        encoding: 'utf-8'
    });

    let pkg = JSON.parse(pkgContents);

    return pkg?.version || '0.0.0'
})();

export = class API {
    public platform: string;
    public root: string;
    public config: ConfigParser;
    public locations: IPlatformLocations;
    public logger: CordovaLogger;

    public constructor(platform: unknown, platformRootDir: string, config: ConfigParser, events: CordovaEventEmitter) {
        this.platform = 'fuse-android';
        this.root = platformRootDir;
        this.config = config;
        this.logger = new CordovaLogger(events);

        let proot: string = Path.join(this.root, 'app/src/main');

        this.locations = {
            root: platformRootDir,
            www: Path.join(proot, 'assets'),
            platformWww: Path.join(proot, 'assets')
        };
    }

    public getPlatformInfo(): unknown {
        return {
            locations: this.locations,
            root: this.root,
            name: this.platform,
            version: VERSION,
            projectConfig: this.config
        };
    }

    public async prepare(project: IPrepareProject, options: IPrepareOptions): Promise<void> {
        let p: AndroidProject = new AndroidProject(project.projectConfig, this.logger);
        await p.prepare(this.root);
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
        let project: AndroidProject = new AndroidProject(config, new CordovaLogger(events));

        await project.create(destination);

        
        return new API(null, destination, config, events);
    }

    public static updatePlatform(destination: string, options: unknown, events: CordovaEventEmitter): API {
        return new API(null, destination, null, events);
    }

    public static version(): string {
        return VERSION;
    }
}
