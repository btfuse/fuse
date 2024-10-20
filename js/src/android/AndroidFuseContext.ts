
/*
Copyright 2024 Breautek

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

import { AbstractFuseAPIFactory } from '../AbstractFuseAPIFactory';
import { FuseContext } from '../FuseContext';
import { IFuseLogger } from '../IFuseLogger';
import { IInset } from '../IInset';
import { Platform } from '../Platform';

export class AndroidFuseContext extends FuseContext {
    public constructor(apiFactory: AbstractFuseAPIFactory, logger: IFuseLogger,) {
        super(Platform.ANDROID, apiFactory, logger);

        this._getRuntime().registerInsetHandler((inset: IInset) => {
            const r: HTMLHtmlElement = document.querySelector(':root');
            r.style.setProperty('--fuse-inset-top', `${inset.top}px`);
            r.style.setProperty('--fuse-inset-bottom', `${inset.bottom}px`);
            r.style.setProperty('--fuse-inset-left', `${inset.left}px`);
            r.style.setProperty('--fuse-inset-right', `${inset.right}px`);
        });
    }

    public override async onWebviewReady(): Promise<void> {
        window.BTFuseNative.onWebviewReady();
    }
}
