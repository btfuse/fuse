
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

import {HTTPFuseAPI} from '../HTTPFuseAPI';

/**
 * A Fuse API implementation for iOS that uses WKURLSchemeHandler to bridge the JS and Native API calls.
 */
export class IOSSchemeFuseAPI extends HTTPFuseAPI {
    protected override async _getEndpoint(): Promise<string> {
        return `https://localhost:${await window.webkit.messageHandlers.getAPIPort.postMessage("")}`;
    }

    protected override async _initHeaders(xhr: XMLHttpRequest): Promise<void> {
        xhr.setRequestHeader('X-Fuse-Secret', await window.webkit.messageHandlers.getAPISecret.postMessage(""));
    }
}
