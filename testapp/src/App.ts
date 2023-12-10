
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

import {
    FuseContext,
    FuseContextBuilder,
    FuseError
} from '@btfuse/core';
import {EchoPlugin} from 'echo';

var sleep = (ms: number): Promise<void> => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

(async () => {
    let builder: FuseContextBuilder = new FuseContextBuilder();
    let context: FuseContext = await builder.build();
    let echoPlugin: EchoPlugin = new EchoPlugin(context);

    context.registerPauseHandler(() => {
        console.log('ON PAUSE!');
    });

    context.registerResumeHandler(() => {
        console.log('ON RESUME!');
    });

    function appendInfo(msg: string): void {
        let div: HTMLElement = document.createElement('div');
        div.innerHTML = msg;
        document.body.appendChild(div);
    }

    (async () => {
        let response: string = await echoPlugin.echo('Hi from TS');
        // alert(response);
        appendInfo(response);

        context.getLogger().info(`ECHO RESPONSE: ${response}`);
        
        let timeDiv = document.createElement('div');
        document.body.appendChild(timeDiv);
        setInterval(() => {
            timeDiv.innerHTML = new Date().toISOString();
        }, 1000);

        let debug: boolean = await context.isDebugMode();
        appendInfo(`Debug: ${debug ? 'true' : 'false'}`);

        // await echoPlugin.subscribe((d: string) => {
        //     console.log('d', d);
        // });
    })();

    document.body.onclick = async () => {
        let resp = await echoPlugin.bigResponse();
        console.log('big resp', resp);
    };

    (window as any).fusecontext = context;
    
    context.getLogger().info('test log from webview');
    context.getLogger().error(new FuseError('TestError', 'test fuse error', new Error('Caused error'), 1));
})();
