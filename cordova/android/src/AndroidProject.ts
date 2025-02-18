
/*
Copyright 2023 Breautek

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

import * as Path from 'node:path';
import * as Filesystem from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import * as FS from 'node:fs';
import * as Crypto from 'node:crypto';
import * as EJS from 'ejs';
import { ConfigParser } from '../../types/cordova';
import ExtractZIP from 'extract-zip';
import { Logger } from './Logger';

const GRADLE_VERSION: string = '8.13';

export class AndroidProject {
    private $config: ConfigParser;
    private $templateDir: string;
    private $logger: Logger;

    public constructor(config: ConfigParser, logger: Logger) {
        this.$config = config;
        this.$logger = logger;
        this.$templateDir = Path.resolve(__dirname, '../template');
    }

    private async $writeCordovaUtils(destination: string): Promise<void> {
        await Filesystem.cp(Path.resolve(this.$templateDir, 'cordova'), Path.resolve(destination, 'cordova'), {
            recursive: true
        });
    }

    private async $writeGradleSettingsFile(destination: string): Promise<void> {
        let template: EJS.TemplateFunction = EJS.compile(await Filesystem.readFile(Path.resolve(this.$templateDir, 'settings.gradle.kts'), {
            encoding: 'utf-8'
        }));

        await Filesystem.writeFile(Path.resolve(destination, 'settings.gradle.kts'), template({
            project_name: this.$config.name()
        }));
    }

    private async $writeGradleProjectBuildFile(destination: string): Promise<void> {
        let template: EJS.TemplateFunction = EJS.compile(await Filesystem.readFile(Path.resolve(this.$templateDir, 'build.gradle.kts'), {
            encoding: 'utf-8'
        }));

        await Filesystem.writeFile(Path.resolve(destination, 'build.gradle.kts'), template({}));
    }

    private async $writeProguardFile(destination: string): Promise<void> {
        await Filesystem.copyFile(
            Path.resolve(this.$templateDir, 'app/proguard-rules.pro'),
            Path.resolve(destination, 'app/proguard-rules.pro')
        );
    }

    public getPackageName(): string {
        return this.$config.android_packageName() || this.$config.packageName();
    }

    public getNamespace(): string {
        let packageName: string = this.getPackageName();
        return packageName.split('.').slice(0, -1).join('.');
    }

    private async $writeAppGradleBuildFile(destination: string): Promise<void> {
        let template: EJS.TemplateFunction = EJS.compile(await Filesystem.readFile(Path.resolve(this.$templateDir, 'app/build.gradle.kts'), {
            encoding: 'utf-8'
        }));

        let packageName: string = this.getPackageName();
        let namespace: string = this.getNamespace();

        await Filesystem.writeFile(Path.resolve(destination, 'app/build.gradle.kts'), template({
            namespace: namespace,
            applicationID: packageName,
            targetSdk: 35,
            compileSdk: 35,
            minSdk: 29,
            versionCode: 1,
            versionName: '1.0',
            fuseVersion: '0.8.8'
        }));
    }

    private async $writeManifestFile(destination: string): Promise<void> {
        await Filesystem.copyFile(
            Path.resolve(this.$templateDir, 'app/src/main/AndroidManifest.xml'),
            Path.resolve(destination, 'app/src/main/AndroidManifest.xml')
        );
    }

    private async $writeGradlePropertiesFile(destination: string): Promise<void> {
        await Filesystem.copyFile(
            Path.resolve(this.$templateDir, 'gradle.properties'),
            Path.resolve(destination, 'gradle.properties')
        );
    }

    private async $writeAppSources(destination: string): Promise<void> {
        let sourceDir: string = Path.resolve(destination, 'app/src/main/java');

        await Filesystem.mkdir(sourceDir, { recursive: true });

        let template: EJS.TemplateFunction = EJS.compile(await Filesystem.readFile(Path.resolve(this.$templateDir, 'app/src/main/java/MainActivity.java'), {
            encoding: 'utf-8'
        }));

        let packageName: string = this.getPackageName().split('.').join(Path.sep);
        await Filesystem.mkdir(Path.resolve(sourceDir, packageName), { recursive: true });

        await Filesystem.writeFile(Path.resolve(sourceDir, packageName, 'MainActivity.java'), template({
            namespace: this.getPackageName()
        }));
    }

    private async $writeAppAssets(destination: string): Promise<void> {
        await Filesystem.mkdir(Path.resolve(destination, 'app/src/main/assets'), { recursive: true });

        let sourceWWW: string = this.getSourceWWWDir();
        let destWWW: string = Path.resolve(destination, 'app/src/main/assets');

        await Filesystem.rm(destWWW, {
            recursive: true,
            force: true
        });

        await Filesystem.cp(sourceWWW, destWWW, {
            recursive: true
        });

        await Filesystem.copyFile(
            Path.resolve(this.$templateDir, '../lib/template/cordova.js'),
            Path.resolve(destWWW, 'cordova.js')
        );
    }

    private async $writeAppResources(destination: string): Promise<void> {
        let resDir: string = Path.resolve(destination, 'app/src/main/res');
        await Promise.all([
            Filesystem.mkdir(Path.resolve(resDir, 'layout'), { recursive: true}),
            Filesystem.mkdir(Path.resolve(resDir, 'values'), { recursive: true}),
            Filesystem.mkdir(Path.resolve(resDir, 'xml'), { recursive: true})
        ]);

        let tResDir: string = Path.resolve(this.$templateDir, 'app/src/main/res');

        await Promise.all([
            'layout/activity_main.xml',
            'values/colors.xml',
            'values/dimens.xml',
            'values/strings.xml',
            'values/themes.xml',
            'xml/backup_rules.xml',
            'xml/data_extraction_rules.xml'
        ].map((file: string) => {
            return Filesystem.copyFile(
                Path.resolve(tResDir, file),
                Path.resolve(resDir, file)
            )
        }));
    }

    private async $installTools(destination: string): Promise<void> {
        await Filesystem.mkdir(Path.resolve(destination, 'tools'));

        // TODO: Prompt for accepting gradle license

        let gradleLink: string = `https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip`
        let checksumLink: string = `https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip.sha256`;

        this.$logger.log(`Downloading Gradle ${GRADLE_VERSION}...`);
        let gradleLinkResponse = await fetch(gradleLink);
        if (!gradleLinkResponse.ok) {
            throw new Error(`Network Error ${gradleLinkResponse.status}: ${await gradleLinkResponse.text()}`)
        }

        let out: FS.WriteStream = FS.createWriteStream(Path.resolve(destination, 'tools/gradle.zip'));
        await pipeline(gradleLinkResponse.body as any, out);

        let checksumResponse = await fetch(checksumLink);
        if (!checksumResponse.ok) {
            throw new Error(`Network Error ${checksumResponse.status}: ${await checksumResponse.text()}`)
        }

        let checksum: string = await checksumResponse.text();
        let sha256: Crypto.Hash = Crypto.createHash('sha256');
        let gradleZipPath: string = Path.resolve(destination, 'tools/gradle.zip');

        await pipeline(FS.createReadStream(gradleZipPath), sha256);
        let localCheck: string = sha256.digest('hex');

        if (checksum !== localCheck) {
            throw new Error('Gradle Tools: Checksum mismatch');
        }

        await ExtractZIP(gradleZipPath, {
            dir: Path.resolve(destination, 'tools')
        });

        await Filesystem.rename(
            Path.resolve(destination, 'tools', `gradle-${GRADLE_VERSION}`),
            Path.resolve(destination, 'tools', `gradle`)
        );
    }

    public getSourceWWWDir(): string {
        return Path.resolve(Path.dirname(this.$config.path), 'www');
    }

    public async create(dir: string): Promise<void> {
        let destination: string = Path.resolve(dir);
        
        await Filesystem.mkdir(Path.resolve(destination, 'app/src/main'), {
            recursive: true
        });

        // await this.$installTools(destination);
        await this.$writeCordovaUtils(destination);
    }

    public async prepare(dir: string): Promise<void> {
        let destination: string = Path.resolve(dir);

        console.log('RUNNING PREPARE', dir)

        await Filesystem.mkdir(Path.resolve(destination, 'app/src/main'), {
            recursive: true
        });

        await this.$prepare(destination);
    }

    private async $prepare(destination: string): Promise<void> {
        await Promise.all([
            this.$writeCordovaUtils(destination),
            this.$writeGradleSettingsFile(destination),
            this.$writeGradlePropertiesFile(destination),
            this.$writeGradleProjectBuildFile(destination),
            this.$writeProguardFile(destination),
            this.$writeAppGradleBuildFile(destination),
            this.$writeManifestFile(destination),
            this.$writeAppSources(destination),
            this.$writeAppAssets(destination),
            this.$writeAppResources(destination)
        ]);
    }
}
