/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../js/lib/api.js":
/*!******************************!*\
  !*** ../../../js/lib/api.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @btfuse/core */ "../../../js/lib/api.js");
const native_view_1 = __webpack_require__(/*! @btfuse/native-view */ "../lib/api.js");
let plugin;
let node = null;
window.onload = async () => {
    let builder = new core_1.FuseContextBuilder();
    let context = await builder.build();
    plugin = new native_view_1.FuseNativeViewPlugin(context);
    let n = document.createElement('div');
    document.body.appendChild(n);
    n.style.width = '300px';
    n.style.height = '400px';
    n.style.position = 'absolute';
    n.style.left = '25px';
    n.style.top = '25px';
    n.style.outline = '1px solid blue';
    node = await plugin.create(n, {
        overlayFile: '/assets/overlay.html'
    });
    document.body.addEventListener('click', () => {
        if (!node) {
            return;
        }
        // console.log('Destroying node!', node.getID());
        // node.destroy();
        // node = null;
        n.style.top = '100px';
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdGVzdGFwcC9zcmMvQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRix1Q0FHc0I7QUFFdEIscURBRzZCO0FBRTdCLElBQUksTUFBNEIsQ0FBQztBQUNqQyxJQUFJLElBQUksR0FBOEIsSUFBSSxDQUFDO0FBRTNDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDdkIsSUFBSSxPQUFPLEdBQXVCLElBQUkseUJBQWtCLEVBQUUsQ0FBQztJQUMzRCxJQUFJLE9BQU8sR0FBZ0IsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakQsTUFBTSxHQUFHLElBQUksa0NBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFM0MsSUFBSSxDQUFDLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDOUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztJQUNyQixDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztJQUVuQyxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtRQUMxQixXQUFXLEVBQUUsc0JBQXNCO0tBQ3RDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDUixPQUFPO1FBQ1gsQ0FBQztRQUVELGlEQUFpRDtRQUNqRCxrQkFBa0I7UUFDbEIsZUFBZTtRQUVmLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9

/***/ }),

/***/ "../lib/api.js":
/*!*********************!*\
  !*** ../lib/api.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @btfuse/core */ "../../../js/lib/api.js");
const native_view_1 = __webpack_require__(/*! @btfuse/native-view */ "../lib/api.js");
let plugin;
let node = null;
window.onload = async () => {
    let builder = new core_1.FuseContextBuilder();
    let context = await builder.build();
    plugin = new native_view_1.FuseNativeViewPlugin(context);
    let n = document.createElement('div');
    document.body.appendChild(n);
    n.style.width = '300px';
    n.style.height = '400px';
    n.style.position = 'absolute';
    n.style.left = '25px';
    n.style.top = '25px';
    n.style.outline = '1px solid blue';
    node = await plugin.create(n, {
        overlayFile: '/assets/overlay.html'
    });
    document.body.addEventListener('click', () => {
        if (!node) {
            return;
        }
        // console.log('Destroying node!', node.getID());
        // node.destroy();
        // node = null;
        n.style.top = '100px';
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdGVzdGFwcC9zcmMvQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRix1Q0FHc0I7QUFFdEIscURBRzZCO0FBRTdCLElBQUksTUFBNEIsQ0FBQztBQUNqQyxJQUFJLElBQUksR0FBOEIsSUFBSSxDQUFDO0FBRTNDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDdkIsSUFBSSxPQUFPLEdBQXVCLElBQUkseUJBQWtCLEVBQUUsQ0FBQztJQUMzRCxJQUFJLE9BQU8sR0FBZ0IsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakQsTUFBTSxHQUFHLElBQUksa0NBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFM0MsSUFBSSxDQUFDLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDOUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztJQUNyQixDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztJQUVuQyxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtRQUMxQixXQUFXLEVBQUUsc0JBQXNCO0tBQ3RDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDUixPQUFPO1FBQ1gsQ0FBQztRQUVELGlEQUFpRDtRQUNqRCxrQkFBa0I7UUFDbEIsZUFBZTtRQUVmLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @btfuse/core */ "../../../js/lib/api.js");
const native_view_1 = __webpack_require__(/*! @btfuse/native-view */ "../lib/api.js");
let plugin;
let node = null;
window.onload = async () => {
    let builder = new core_1.FuseContextBuilder();
    let context = await builder.build();
    plugin = new native_view_1.FuseNativeViewPlugin(context);
    let n = document.createElement('div');
    document.body.appendChild(n);
    n.style.width = '300px';
    n.style.height = '400px';
    n.style.position = 'absolute';
    n.style.left = '25px';
    n.style.top = '25px';
    n.style.outline = '1px solid blue';
    node = await plugin.create(n, {
        overlayFile: '/assets/overlay.html'
    });
    document.body.addEventListener('click', () => {
        if (!node) {
            return;
        }
        // console.log('Destroying node!', node.getID());
        // node.destroy();
        // node = null;
        n.style.top = '100px';
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdGVzdGFwcC9zcmMvQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRix1Q0FHc0I7QUFFdEIscURBRzZCO0FBRTdCLElBQUksTUFBNEIsQ0FBQztBQUNqQyxJQUFJLElBQUksR0FBOEIsSUFBSSxDQUFDO0FBRTNDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDdkIsSUFBSSxPQUFPLEdBQXVCLElBQUkseUJBQWtCLEVBQUUsQ0FBQztJQUMzRCxJQUFJLE9BQU8sR0FBZ0IsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakQsTUFBTSxHQUFHLElBQUksa0NBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFM0MsSUFBSSxDQUFDLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDOUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztJQUNyQixDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztJQUVuQyxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtRQUMxQixXQUFXLEVBQUUsc0JBQXNCO0tBQ3RDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDUixPQUFPO1FBQ1gsQ0FBQztRQUVELGlEQUFpRDtRQUNqRCxrQkFBa0I7UUFDbEIsZUFBZTtRQUVmLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZSxtQkFBTyxDQUFDLDRDQUFjO0FBQ3JDLHNCQUFzQixtQkFBTyxDQUFDLDBDQUFxQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsMkNBQTJDOzs7Ozs7Ozs7O0FDOUM5QjtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlLG1CQUFPLENBQUMsNENBQWM7QUFDckMsc0JBQXNCLG1CQUFPLENBQUMsMENBQXFCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwyQ0FBMkM7Ozs7OztVQzlDM0M7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlLG1CQUFPLENBQUMsNENBQWM7QUFDckMsc0JBQXNCLG1CQUFPLENBQUMsMENBQXFCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwyQ0FBMkMsMjdDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmF0aXZlLXZpZXctdGVzdC1hcHAvLi4vLi4vLi4vanMvbGliL2FwaS5qcyIsIndlYnBhY2s6Ly9uYXRpdmUtdmlldy10ZXN0LWFwcC8uLi9saWIvYXBpLmpzIiwid2VicGFjazovL25hdGl2ZS12aWV3LXRlc3QtYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25hdGl2ZS12aWV3LXRlc3QtYXBwLy4vc3JjL0FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8qXG4gICBDb3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG4gICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuICAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb3JlXzEgPSByZXF1aXJlKFwiQGJ0ZnVzZS9jb3JlXCIpO1xuY29uc3QgbmF0aXZlX3ZpZXdfMSA9IHJlcXVpcmUoXCJAYnRmdXNlL25hdGl2ZS12aWV3XCIpO1xubGV0IHBsdWdpbjtcbmxldCBub2RlID0gbnVsbDtcbndpbmRvdy5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGJ1aWxkZXIgPSBuZXcgY29yZV8xLkZ1c2VDb250ZXh0QnVpbGRlcigpO1xuICAgIGxldCBjb250ZXh0ID0gYXdhaXQgYnVpbGRlci5idWlsZCgpO1xuICAgIHBsdWdpbiA9IG5ldyBuYXRpdmVfdmlld18xLkZ1c2VOYXRpdmVWaWV3UGx1Z2luKGNvbnRleHQpO1xuICAgIGxldCBuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChuKTtcbiAgICBuLnN0eWxlLndpZHRoID0gJzMwMHB4JztcbiAgICBuLnN0eWxlLmhlaWdodCA9ICc0MDBweCc7XG4gICAgbi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgbi5zdHlsZS5sZWZ0ID0gJzI1cHgnO1xuICAgIG4uc3R5bGUudG9wID0gJzI1cHgnO1xuICAgIG4uc3R5bGUub3V0bGluZSA9ICcxcHggc29saWQgYmx1ZSc7XG4gICAgbm9kZSA9IGF3YWl0IHBsdWdpbi5jcmVhdGUobiwge1xuICAgICAgICBvdmVybGF5RmlsZTogJy9hc3NldHMvb3ZlcmxheS5odG1sJ1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdEZXN0cm95aW5nIG5vZGUhJywgbm9kZS5nZXRJRCgpKTtcbiAgICAgICAgLy8gbm9kZS5kZXN0cm95KCk7XG4gICAgICAgIC8vIG5vZGUgPSBudWxsO1xuICAgICAgICBuLnN0eWxlLnRvcCA9ICcxMDBweCc7XG4gICAgfSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUVhCd0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmRHVnpkR0Z3Y0M5emNtTXZRWEJ3TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHM3T3pzN096czdPenM3T3pzN1JVRmpSVHM3UVVGRlJpeDFRMEZIYzBJN1FVRkZkRUlzY1VSQlJ6WkNPMEZCUlRkQ0xFbEJRVWtzVFVGQk5FSXNRMEZCUXp0QlFVTnFReXhKUVVGSkxFbEJRVWtzUjBGQk9FSXNTVUZCU1N4RFFVRkRPMEZCUlRORExFMUJRVTBzUTBGQlF5eE5RVUZOTEVkQlFVY3NTMEZCU3l4SlFVRkpMRVZCUVVVN1NVRkRka0lzU1VGQlNTeFBRVUZQTEVkQlFYVkNMRWxCUVVrc2VVSkJRV3RDTEVWQlFVVXNRMEZCUXp0SlFVTXpSQ3hKUVVGSkxFOUJRVThzUjBGQlowSXNUVUZCVFN4UFFVRlBMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU03U1VGRGFrUXNUVUZCVFN4SFFVRkhMRWxCUVVrc2EwTkJRVzlDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkZNME1zU1VGQlNTeERRVUZETEVkQlFXMUNMRkZCUVZFc1EwRkJReXhoUVVGaExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdTVUZEZEVRc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkROMElzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWRCUVVjc1QwRkJUeXhEUVVGRE8wbEJRM2hDTEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hIUVVGSExFOUJRVThzUTBGQlF6dEpRVU42UWl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUjBGQlJ5eFZRVUZWTEVOQlFVTTdTVUZET1VJc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVkQlFVY3NUVUZCVFN4RFFVRkRPMGxCUTNSQ0xFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4SFFVRkhMRTFCUVUwc1EwRkJRenRKUVVOeVFpeERRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1IwRkJSeXhuUWtGQlowSXNRMEZCUXp0SlFVVnVReXhKUVVGSkxFZEJRVWNzVFVGQlRTeE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1JVRkJSVHRSUVVNeFFpeFhRVUZYTEVWQlFVVXNjMEpCUVhOQ08wdEJRM1JETEVOQlFVTXNRMEZCUXp0SlFVVklMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1QwRkJUeXhGUVVGRkxFZEJRVWNzUlVGQlJUdFJRVU42UXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRFVpeFBRVUZQTzFGQlExZ3NRMEZCUXp0UlFVVkVMR2xFUVVGcFJEdFJRVU5xUkN4clFrRkJhMEk3VVVGRGJFSXNaVUZCWlR0UlFVVm1MRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eEhRVUZITEU5QlFVOHNRMEZCUXp0SlFVTXhRaXhEUVVGRExFTkJRVU1zUTBGQlF6dEJRVU5RTEVOQlFVTXNRMEZCUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuLypcbiAgIENvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG4gICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAgIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAgIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvcmVfMSA9IHJlcXVpcmUoXCJAYnRmdXNlL2NvcmVcIik7XG5jb25zdCBuYXRpdmVfdmlld18xID0gcmVxdWlyZShcIkBidGZ1c2UvbmF0aXZlLXZpZXdcIik7XG5sZXQgcGx1Z2luO1xubGV0IG5vZGUgPSBudWxsO1xud2luZG93Lm9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgYnVpbGRlciA9IG5ldyBjb3JlXzEuRnVzZUNvbnRleHRCdWlsZGVyKCk7XG4gICAgbGV0IGNvbnRleHQgPSBhd2FpdCBidWlsZGVyLmJ1aWxkKCk7XG4gICAgcGx1Z2luID0gbmV3IG5hdGl2ZV92aWV3XzEuRnVzZU5hdGl2ZVZpZXdQbHVnaW4oY29udGV4dCk7XG4gICAgbGV0IG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG4pO1xuICAgIG4uc3R5bGUud2lkdGggPSAnMzAwcHgnO1xuICAgIG4uc3R5bGUuaGVpZ2h0ID0gJzQwMHB4JztcbiAgICBuLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBuLnN0eWxlLmxlZnQgPSAnMjVweCc7XG4gICAgbi5zdHlsZS50b3AgPSAnMjVweCc7XG4gICAgbi5zdHlsZS5vdXRsaW5lID0gJzFweCBzb2xpZCBibHVlJztcbiAgICBub2RlID0gYXdhaXQgcGx1Z2luLmNyZWF0ZShuLCB7XG4gICAgICAgIG92ZXJsYXlGaWxlOiAnL2Fzc2V0cy9vdmVybGF5Lmh0bWwnXG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0Rlc3Ryb3lpbmcgbm9kZSEnLCBub2RlLmdldElEKCkpO1xuICAgICAgICAvLyBub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgLy8gbm9kZSA9IG51bGw7XG4gICAgICAgIG4uc3R5bGUudG9wID0gJzEwMHB4JztcbiAgICB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRWEJ3TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2ZEdWemRHRndjQzl6Y21NdlFYQndMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUczdPenM3T3pzN096czdPenM3UlVGalJUczdRVUZGUml4MVEwRkhjMEk3UVVGRmRFSXNjVVJCUnpaQ08wRkJSVGRDTEVsQlFVa3NUVUZCTkVJc1EwRkJRenRCUVVOcVF5eEpRVUZKTEVsQlFVa3NSMEZCT0VJc1NVRkJTU3hEUVVGRE8wRkJSVE5ETEUxQlFVMHNRMEZCUXl4TlFVRk5MRWRCUVVjc1MwRkJTeXhKUVVGSkxFVkJRVVU3U1VGRGRrSXNTVUZCU1N4UFFVRlBMRWRCUVhWQ0xFbEJRVWtzZVVKQlFXdENMRVZCUVVVc1EwRkJRenRKUVVNelJDeEpRVUZKTEU5QlFVOHNSMEZCWjBJc1RVRkJUU3hQUVVGUExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdTVUZEYWtRc1RVRkJUU3hIUVVGSExFbEJRVWtzYTBOQlFXOUNMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03U1VGRk0wTXNTVUZCU1N4RFFVRkRMRWRCUVcxQ0xGRkJRVkVzUTBGQlF5eGhRVUZoTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1NVRkRkRVFzVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRE4wSXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFZEJRVWNzVDBGQlR5eERRVUZETzBsQlEzaENMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeEhRVUZITEU5QlFVOHNRMEZCUXp0SlFVTjZRaXhEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNSMEZCUnl4VlFVRlZMRU5CUVVNN1NVRkRPVUlzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRWRCUVVjc1RVRkJUU3hEUVVGRE8wbEJRM1JDTEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhIUVVGSExFMUJRVTBzUTBGQlF6dEpRVU55UWl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUjBGQlJ5eG5Ra0ZCWjBJc1EwRkJRenRKUVVWdVF5eEpRVUZKTEVkQlFVY3NUVUZCVFN4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUlVGQlJUdFJRVU14UWl4WFFVRlhMRVZCUVVVc2MwSkJRWE5DTzB0QlEzUkRMRU5CUVVNc1EwRkJRenRKUVVWSUxGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zVDBGQlR5eEZRVUZGTEVkQlFVY3NSVUZCUlR0UlFVTjZReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEVWl4UFFVRlBPMUZCUTFnc1EwRkJRenRSUVVWRUxHbEVRVUZwUkR0UlFVTnFSQ3hyUWtGQmEwSTdVVUZEYkVJc1pVRkJaVHRSUVVWbUxFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4SFFVRkhMRTlCUVU4c1EwRkJRenRKUVVNeFFpeERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTlFMRU5CUVVNc1EwRkJReUo5IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuLypcbiAgIENvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG4gICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAgIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAgIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvcmVfMSA9IHJlcXVpcmUoXCJAYnRmdXNlL2NvcmVcIik7XG5jb25zdCBuYXRpdmVfdmlld18xID0gcmVxdWlyZShcIkBidGZ1c2UvbmF0aXZlLXZpZXdcIik7XG5sZXQgcGx1Z2luO1xubGV0IG5vZGUgPSBudWxsO1xud2luZG93Lm9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgYnVpbGRlciA9IG5ldyBjb3JlXzEuRnVzZUNvbnRleHRCdWlsZGVyKCk7XG4gICAgbGV0IGNvbnRleHQgPSBhd2FpdCBidWlsZGVyLmJ1aWxkKCk7XG4gICAgcGx1Z2luID0gbmV3IG5hdGl2ZV92aWV3XzEuRnVzZU5hdGl2ZVZpZXdQbHVnaW4oY29udGV4dCk7XG4gICAgbGV0IG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG4pO1xuICAgIG4uc3R5bGUud2lkdGggPSAnMzAwcHgnO1xuICAgIG4uc3R5bGUuaGVpZ2h0ID0gJzQwMHB4JztcbiAgICBuLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBuLnN0eWxlLmxlZnQgPSAnMjVweCc7XG4gICAgbi5zdHlsZS50b3AgPSAnMjVweCc7XG4gICAgbi5zdHlsZS5vdXRsaW5lID0gJzFweCBzb2xpZCBibHVlJztcbiAgICBub2RlID0gYXdhaXQgcGx1Z2luLmNyZWF0ZShuLCB7XG4gICAgICAgIG92ZXJsYXlGaWxlOiAnL2Fzc2V0cy9vdmVybGF5Lmh0bWwnXG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0Rlc3Ryb3lpbmcgbm9kZSEnLCBub2RlLmdldElEKCkpO1xuICAgICAgICAvLyBub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgLy8gbm9kZSA9IG51bGw7XG4gICAgICAgIG4uc3R5bGUudG9wID0gJzEwMHB4JztcbiAgICB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRWEJ3TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2ZEdWemRHRndjQzl6Y21NdlFYQndMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUczdPenM3T3pzN096czdPenM3UlVGalJUczdRVUZGUml4MVEwRkhjMEk3UVVGRmRFSXNjVVJCUnpaQ08wRkJSVGRDTEVsQlFVa3NUVUZCTkVJc1EwRkJRenRCUVVOcVF5eEpRVUZKTEVsQlFVa3NSMEZCT0VJc1NVRkJTU3hEUVVGRE8wRkJSVE5ETEUxQlFVMHNRMEZCUXl4TlFVRk5MRWRCUVVjc1MwRkJTeXhKUVVGSkxFVkJRVVU3U1VGRGRrSXNTVUZCU1N4UFFVRlBMRWRCUVhWQ0xFbEJRVWtzZVVKQlFXdENMRVZCUVVVc1EwRkJRenRKUVVNelJDeEpRVUZKTEU5QlFVOHNSMEZCWjBJc1RVRkJUU3hQUVVGUExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdTVUZEYWtRc1RVRkJUU3hIUVVGSExFbEJRVWtzYTBOQlFXOUNMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03U1VGRk0wTXNTVUZCU1N4RFFVRkRMRWRCUVcxQ0xGRkJRVkVzUTBGQlF5eGhRVUZoTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1NVRkRkRVFzVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRE4wSXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFZEJRVWNzVDBGQlR5eERRVUZETzBsQlEzaENMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeEhRVUZITEU5QlFVOHNRMEZCUXp0SlFVTjZRaXhEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNSMEZCUnl4VlFVRlZMRU5CUVVNN1NVRkRPVUlzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRWRCUVVjc1RVRkJUU3hEUVVGRE8wbEJRM1JDTEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhIUVVGSExFMUJRVTBzUTBGQlF6dEpRVU55UWl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUjBGQlJ5eG5Ra0ZCWjBJc1EwRkJRenRKUVVWdVF5eEpRVUZKTEVkQlFVY3NUVUZCVFN4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUlVGQlJUdFJRVU14UWl4WFFVRlhMRVZCUVVVc2MwSkJRWE5DTzB0QlEzUkRMRU5CUVVNc1EwRkJRenRKUVVWSUxGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zVDBGQlR5eEZRVUZGTEVkQlFVY3NSVUZCUlR0UlFVTjZReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEVWl4UFFVRlBPMUZCUTFnc1EwRkJRenRSUVVWRUxHbEVRVUZwUkR0UlFVTnFSQ3hyUWtGQmEwSTdVVUZEYkVJc1pVRkJaVHRSUVVWbUxFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4SFFVRkhMRTlCUVU4c1EwRkJRenRKUVVNeFFpeERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTlFMRU5CUVVNc1EwRkJReUo5Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9