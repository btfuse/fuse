
/*
Copyright 2023 Norman Breau 

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
    FuseContext
} from '@nbsfuse/core';
import {EchoPlugin} from 'echo';

let context: FuseContext = new FuseContext();
let echoPlugin: EchoPlugin = new EchoPlugin(context);

context.registerPauseHandler(() => {
    console.log('ON PAUSE!');
});

context.registerResumeHandler(() => {
    console.log('ON RESUME!');
});

(async () => {
    let response: string = await echoPlugin.echo('Hi from TS');
    alert(response);
    let p = document.createElement('p');
    p.innerHTML = response;
    document.body.appendChild(p);
})();

document.body.onclick = async () => {
    let resp = await echoPlugin.bigResponse();
    console.log('big resp', resp);
};

// echoPlugin.subscribe((data: string) => {
//     console.log('Receives callback payload', data);
// });

(window as any).fusecontext = context;
