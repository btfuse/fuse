
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
    ICreatePlatformOptions
} from '../../types/cordova';
import { AndroidProject } from './AndroidProject';

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
        let project: AndroidProject = new AndroidProject(config);

        console.log(
            'CREATE PLATFORM', '\n',
            'Destination:', destination, '\n',
            'config', config, '\n',
            'options', options, '\n',
            'events', events, '\n'
        );

        await project.create(destination);

        
        return new API(null, destination, events);
    }

    public static updatePlatform(destination: string, options: unknown, events: unknown): API {
        return new API(null, destination, events);
    }

    public static version(): string {
        return VERSION;
    }
}
