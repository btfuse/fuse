
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

import { ContentType } from './ContentType';
import {FuseAPI} from './FuseAPI';
import { FuseAPIResponse } from './FuseAPIResponse';
import {FuseError} from './FuseError';

/**
 * A Fuse API implementation that uses HTTP protocol to make native calls
 */
export class HTTPFuseAPI extends FuseAPI {
    
    protected async _getEndpoint(): Promise<string> {
        return '';
    }

    protected async _initHeaders(xhr: XMLHttpRequest): Promise<void> {}

    public async buildRoute(pluginID: string, method: string): Promise<string> {
        const endpoint: string = await this._getEndpoint();
        return `${endpoint}${this._createRoute(pluginID, method)}`;
    }

    protected override async _execute(pluginID: string, method: string, contentType: string, data: Blob): Promise<FuseAPIResponse> {
        const xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.open('POST', await this.buildRoute(pluginID, method));
        
        if (!contentType) {
            contentType = ContentType.BINARY;
        }

        if (contentType) {
            xhr.setRequestHeader('Content-Type', contentType);
        }

        await this._initHeaders(xhr);
        return await this._doRequest(xhr, data);
    }

    protected _doRequest(xhr: XMLHttpRequest, data: Blob): Promise<FuseAPIResponse> {
        return new Promise<FuseAPIResponse>((resolve, reject) => {
            xhr.onload = async () => {
                const response: FuseAPIResponse = new FuseAPIResponse(xhr.response, xhr.getAllResponseHeaders(), xhr.status);
                if (response.isError()) {
                    reject(await response.readAsError());
                }
                else {
                    resolve(response);
                }
            };

            xhr.onerror = (e) => {
                reject(new FuseError('FuseAPI', 'Network Error'));
            };

            xhr.ontimeout = (e) => {
                reject(new FuseError('FuseAPI', 'API Timeout'));
            };
            
            this._doSend(xhr, data);
        });
    }

    protected _doSend(xhr: XMLHttpRequest, data: Blob): void {
        if (data !== undefined && data !== null) {
            xhr.send(data);
        }
        else {
            xhr.send();
        }
    }
}
