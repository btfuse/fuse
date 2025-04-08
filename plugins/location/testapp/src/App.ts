/*
   Copyright 2019 Total Pave Inc.

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
    FuseContextBuilder
} from '@btfuse/core';

import {
    FuseLocationPlugin,
    FuseLocationAccuracy,
    FuseLocationSubscription,
    TFuseGeolocationPoint,
    FuseLocationPluginFactory
} from '@btfuse/location';

let dataContainer: HTMLElement;
let plugin: FuseLocationPlugin;

async function createListener(mode: FuseLocationAccuracy): Promise<FuseLocationSubscription> {
    let subscription: FuseLocationSubscription = await plugin.watch(mode, async () => {
        return true;
    });

    subscription.register((points: Readonly<TFuseGeolocationPoint>[]) => {
        let lastPoint: TFuseGeolocationPoint | null = null;
        for (let i: number = 0; i < points.length; i++) {
            lastPoint = points[i];
        }

        if (!lastPoint) {
            return;
        }

        dataContainer.innerHTML = '';

        let data: HTMLElement = document.createElement('pre');
        data.innerHTML = JSON.stringify(lastPoint, null, 4);
        dataContainer.appendChild(data);
    });

    return subscription;
}

window.onload = async () => {
    let builder: FuseContextBuilder = new FuseContextBuilder();
    let context: FuseContext = await builder.build();
    plugin = new FuseLocationPluginFactory().create(context);
    (window as any).plugin = plugin;

    let currentMode: FuseLocationAccuracy | null = null;

    let toggleFineBtn: HTMLButtonElement = document.createElement('button');
    toggleFineBtn.innerHTML = 'Toggle Fine Location';

    let toggleCoarseBtn: HTMLButtonElement = document.createElement('button');
    toggleCoarseBtn.innerHTML = 'Toggle Coarse Location';
    
    let checkBtn: HTMLButtonElement = document.createElement('button');
    checkBtn.innerHTML = 'Check Settings';
    

    let subscription: FuseLocationSubscription | null = null;

    toggleFineBtn.addEventListener('click', async () => {
        if (subscription) {
            await subscription.release();
            subscription = null;
            dataContainer.innerHTML = '';

            if (currentMode !== FuseLocationAccuracy.FINE) {
                subscription = await createListener(FuseLocationAccuracy.FINE);
                currentMode = FuseLocationAccuracy.FINE;
            }
            else {
                currentMode = null;
            }
        }
        else {
            subscription = await createListener(FuseLocationAccuracy.FINE);
            currentMode = FuseLocationAccuracy.FINE;
        }
    });

    toggleCoarseBtn.addEventListener('click', async () => {
        if (subscription) {
            await subscription.release();
            subscription = null;
            dataContainer.innerHTML = '';
            
            if (currentMode !== FuseLocationAccuracy.COARSE) {
                subscription = await createListener(FuseLocationAccuracy.COARSE);
                currentMode = FuseLocationAccuracy.COARSE;
            }
            else {
                currentMode = null;
            }
        }
        else {
            subscription = await createListener(FuseLocationAccuracy.COARSE);
            currentMode = FuseLocationAccuracy.COARSE;
        }
    });

    checkBtn.addEventListener('click', async () => {
        if (!subscription) {
            dataContainer.innerHTML = 'subscription required.';
            return;
        }

        console.log(await subscription.assertSettings());
    });

    dataContainer = document.createElement('div');

    document.body.appendChild(toggleFineBtn);
    document.body.appendChild(toggleCoarseBtn);
    document.body.appendChild(checkBtn);
    document.body.appendChild(dataContainer);

    await context.onWebviewReady();
};
