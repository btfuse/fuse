

import {
    FuseContext,
    FuseContextBuilder
} from '@btfuse/core';
import * as pkg from '../../package.json';

let contextBuilder: FuseContextBuilder = new FuseContextBuilder();

contextBuilder.build().then((context: FuseContext) => {

    // TODO: Add things as required
    (window as any).cordova = {
        platformId: 'fuse-android',
        platformVersion: pkg.version,
        version: pkg.version
    };

    // TODO: Load plugins

    let event: CustomEvent = new CustomEvent('deviceready');
    document.dispatchEvent(event);
});

