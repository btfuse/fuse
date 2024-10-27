/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IOSFuseNativeViewOverlay = void 0;
const FuseNativeViewOverlay_1 = __webpack_require__(2);
class IOSFuseNativeViewOverlay extends FuseNativeViewOverlay_1.FuseNativeViewOverlay {
    _setDOMRects(rects) {
        window.webkit.messageHandlers.setDOMRects.postMessage(rects);
    }
}
exports.IOSFuseNativeViewOverlay = IOSFuseNativeViewOverlay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSU9TRnVzZU5hdGl2ZVZpZXdPdmVybGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL292ZXJsYXkvaW9zL0lPU0Z1c2VOYXRpdmVWaWV3T3ZlcmxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0VBY0U7OztBQUVGLG9FQUErRDtBQUUvRCxNQUFhLHdCQUF5QixTQUFRLDZDQUFxQjtJQUM1QyxZQUFZLENBQUMsS0FBYTtRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDSjtBQUpELDREQUlDIn0=

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseNativeViewOverlay = void 0;
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
class FuseNativeViewOverlay {
    start() {
        let currentRects = [];
        let tick = () => {
            let rects = [];
            let isDirty = false;
            for (let i = 0; i < document.body.children.length; i++) {
                let child = document.body.children[i];
                let domrect = child.getBoundingClientRect();
                let rect = {
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
exports.FuseNativeViewOverlay = FuseNativeViewOverlay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnVzZU5hdGl2ZVZpZXdPdmVybGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL292ZXJsYXkvRnVzZU5hdGl2ZVZpZXdPdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7O0FBSUYsK0RBQStEO0FBQy9ELHlFQUF5RTtBQUN6RSxxRUFBcUU7QUFDckUsNERBQTREO0FBQzVELDZCQUE2QjtBQUM3Qix5RUFBeUU7QUFFekUsb0NBQW9DO0FBQ3BDLHNFQUFzRTtBQUN0RSx3RUFBd0U7QUFDeEUscUVBQXFFO0FBQ3JFLDZCQUE2QjtBQUU3QixNQUFzQixxQkFBcUI7SUFHaEMsS0FBSztRQUNSLElBQUksWUFBWSxHQUFxQixFQUFFLENBQUM7UUFFeEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO1lBQ1osSUFBSSxLQUFLLEdBQXFCLEVBQUUsQ0FBQztZQUNqQyxJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7WUFFN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNyRCxJQUFJLEtBQUssR0FBWSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxPQUFPLEdBQVksS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBRXJELElBQUksSUFBSSxHQUFtQjtvQkFDdkIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNaLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDWixDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUs7b0JBQ2hCLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTTtpQkFDcEIsQ0FBQztnQkFFRixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVqQixJQUFJLE9BQU8sRUFBRSxDQUFDO29CQUNWLFNBQVM7Z0JBQ2IsQ0FBQztnQkFFRCxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNsQixJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25HLENBQUM7cUJBQ0ksQ0FBQztvQkFDRixPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixDQUFDO1lBQ0wsQ0FBQztZQUVELFlBQVksR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDVixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDO1lBRUQsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0o7QUEvQ0Qsc0RBK0NDIn0=

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

// This script keeps tracks of the each node rect bounds inside
// the body element, and syncs them to the native overlay implementation.
// This information is used for touch event propagation. If the touch
// is occurring inside one of the rects, then events will be
// propagated to the webview.
// Otherwise events are propagated to the underlying native view instead.
Object.defineProperty(exports, "__esModule", ({ value: true }));
// Some important notes to consider:
//  1.  For performance reasons, this script does not do a deep crawl.
//      Only the direct children of the body node is tracked. Therefore,
//      do not overflow content as it may make your UI not responsive
//      to user interactions.
const IOSFuseNativeViewOverlay_1 = __webpack_require__(1);
(() => {
    let overlay = new IOSFuseNativeViewOverlay_1.IOSFuseNativeViewOverlay();
    overlay.start();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3ZlcmxheS9pb3MvZW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLCtEQUErRDtBQUMvRCx5RUFBeUU7QUFDekUscUVBQXFFO0FBQ3JFLDREQUE0RDtBQUM1RCw2QkFBNkI7QUFDN0IseUVBQXlFOztBQUV6RSxvQ0FBb0M7QUFDcEMsc0VBQXNFO0FBQ3RFLHdFQUF3RTtBQUN4RSxxRUFBcUU7QUFDckUsNkJBQTZCO0FBRTdCLHlFQUFvRTtBQUVwRSxDQUFDLEdBQUcsRUFBRTtJQUNGLElBQUksT0FBTyxHQUE2QixJQUFJLG1EQUF3QixFQUFFLENBQUM7SUFDdkUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxFQUFFLENBQUMifQ==
})();

/******/ })()
;