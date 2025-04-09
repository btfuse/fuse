/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/overlay/FuseNativeViewOverlay.ts":
/*!**********************************************!*\
  !*** ./src/overlay/FuseNativeViewOverlay.ts ***!
  \**********************************************/
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


/***/ }),

/***/ "./src/overlay/android/AndroidFuseNativeViewOverlay.ts":
/*!*************************************************************!*\
  !*** ./src/overlay/android/AndroidFuseNativeViewOverlay.ts ***!
  \*************************************************************/
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
exports.AndroidFuseNativeViewOverlay = void 0;
const FuseNativeViewOverlay_1 = __webpack_require__(/*! ../FuseNativeViewOverlay */ "./src/overlay/FuseNativeViewOverlay.ts");
class AndroidFuseNativeViewOverlay extends FuseNativeViewOverlay_1.FuseNativeViewOverlay {
    _setDOMRects(rects) {
        window.BTFuseNativeOverlay.setDOMRects(rects);
    }
}
exports.AndroidFuseNativeViewOverlay = AndroidFuseNativeViewOverlay;


/***/ })

/******/ 	});
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**************************************!*\
  !*** ./src/overlay/android/entry.ts ***!
  \**************************************/

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
const AndroidFuseNativeViewOverlay_1 = __webpack_require__(/*! ./AndroidFuseNativeViewOverlay */ "./src/overlay/android/AndroidFuseNativeViewOverlay.ts");
(() => {
    let overlay = new AndroidFuseNativeViewOverlay_1.AndroidFuseNativeViewOverlay();
    overlay.start();
})();

})();

/******/ })()
;