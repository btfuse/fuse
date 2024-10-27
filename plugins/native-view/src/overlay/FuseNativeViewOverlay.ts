
/*
Copyright 2023-2024 Breautek 

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

import {FuseNativeRect} from '../FuseNativeRect';

// This script keeps tracks of the each node rect bounds inside
// the body element, and syncs them to the native overlay implementation.
// This information is used for touch event propagation. If the touch
// is occurring inside one of the rects, then events will be
// propagated to the webview.
// Otherwise events are propagated to the underlying native view instead.

// Some important notes to consider:
//  1.  For performance reasons, this script does not do a deep crawl.
//      Only the direct children of the body node is tracked. Therefore,
//      do not overflow content as it may make your UI not responsive
//      to user interactions.

export abstract class FuseNativeViewOverlay {
    protected abstract _setDOMRects(rects: string): void;

    public start(): void {
        let currentRects: FuseNativeRect[] = [];

        let tick = () => {
            let rects: FuseNativeRect[] = [];
            let isDirty: boolean = false;

            for (let i = 0; i < document.body.children.length; i++) {
                let child: Element = document.body.children[i];
                let domrect: DOMRect = child.getBoundingClientRect();

                let rect: FuseNativeRect = {
                    x: domrect.x,
                    y: domrect.y,
                    w: domrect.width,
                    h: domrect.height
                };

                rects.push(rect);

                if (isDirty) {
                    continue;
                }

                if (currentRects[i]) {
                    let crect = currentRects[i];
                    isDirty = crect.x !== rect.x || crect.y !== rect.y || crect.w !== rect.w || crect.h !== rect.h;
                }
                else {
                    isDirty = true;
                }
            }

            currentRects = rects;

            if (isDirty) {
                this._setDOMRects(JSON.stringify(currentRects));
            }

            window.requestAnimationFrame(tick);
        };

        window.requestAnimationFrame(tick);
    }
}
