
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
    FuseContext, FuseError, FusePermissionGrantResult
} from '@nbsfuse/core';
import {EchoPlugin} from 'echo';
import {PermissionPlugin, SupportedPermissions} from 'permission';

let context: FuseContext = new FuseContext();
let echoPlugin: EchoPlugin = new EchoPlugin(context);
let permPlugin: PermissionPlugin = new PermissionPlugin(context);

context.registerPauseHandler(() => {
    console.log('ON PAUSE!');
});

context.registerResumeHandler(() => {
    console.log('ON RESUME!');
});

const DESIRED_PERMISSIONS: SupportedPermissions[] = [
    SupportedPermissions.COARSE,
    SupportedPermissions.FINE
];

(async () => {
    let response: string = await echoPlugin.echo('Hi from TS');
    alert(response);
    
    let timeDiv = document.createElement('div');
    document.body.appendChild(timeDiv);
    setInterval(() => {
        timeDiv.innerHTML = new Date().toISOString();
    }, 1000);

    let p = document.createElement('p');
    p.innerHTML = response;
    document.body.appendChild(p);

    let permissionResult = document.createElement('div');
    permissionResult.id = 'permissionResult';

    try {
        let grantResults: FusePermissionGrantResult<SupportedPermissions> =  await permPlugin.requestPermission(DESIRED_PERMISSIONS, async () => {
            return window.confirm('need perm ok?');
        });
        let permOut: string = '';
        for (let i: number = 0; i < DESIRED_PERMISSIONS.length; i++) {
            let perm: SupportedPermissions = DESIRED_PERMISSIONS[i];
            permOut += `<div>${perm} : ${grantResults.isGranted(perm)}</div>`
        }
        permissionResult.innerHTML = permOut;
    }
    catch (ex) {
        permissionResult.innerHTML = (ex as FuseError).getMessage();
    }

    document.body.appendChild(permissionResult);
})();

document.body.onclick = async () => {
    let resp = await echoPlugin.bigResponse();
    console.log('big resp', resp);

    let permissionResult = document.getElementById('permissionResult');
    try {
        await permPlugin.requestPermission(DESIRED_PERMISSIONS, async () => {
            return window.confirm('need perm ok?');
        });
        permissionResult.innerHTML = 'GRANTED';
    }
    catch (ex) {
        permissionResult.innerHTML = (ex as FuseError).getMessage();
    }
};

// echoPlugin.subscribe((data: string) => {
//     console.log('Receives callback payload', data);
// });

(window as any).fusecontext = context;
