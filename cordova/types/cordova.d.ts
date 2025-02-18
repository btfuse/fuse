
import {ElementTree} from 'elementtree';


declare class ConfigParser {
    path: string;
    doc: ElementTree;
    cdvNamespacePrefix: string;

    getAttribute(attr: string): unknown;
    packageName(): string;
    setPackageName(id: string): string;
    android_packageName(): string;
    android_activityName(): string;
    ios_CFBundleIdentifier(): string;
    name(): string;
    setName(name: string): void;
    shortName(): string;
    setShortName(shortName: string): void;
    description(): string;
    setDescription(text: string): void;
}

declare class CordovaEventEmitter {

}

declare interface ICreatePlatformOptions {
    platformDetails: {
        libDir: string;
        platform: string;
        version: string;
    },
    link: boolean;
}
