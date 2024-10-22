
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

import {ContentType, FuseAPIResponse, FusePlugin, TFuseSerializable} from '@btfuse/core';
import { FuseNativeViewNode } from './FuseNativeViewNode';
import { FuseNativeRect } from './FuseNativeRect';

interface _ICreateNativeViewOptions {
    /**
     * Sets the HTML to be used for the overlay. If set, a secondary webview instance will be created using the HTML string
     * and will be laid on top of the map, allowing the ability to set a web-based overlay.
     * 
     * This option is mutually exclusive to setOverlayFile. If both is set, overlayHTML will take precedence.
     */
    overlayHTML?: string;

    /**
     * Sets a file path to an HTML file to be used for the overlay. If set, a secondary webview instance will be created using
     * the HTML file and will be laid on top of the map, allowing the ability to set a web-based overlay.
     * 
     * This option is mutually exclusive to setOverlayHTML. If both is set, overlayHTML will take precedence.
     */
    overlayFile?: string;
}

/**
 * Additional native view options
 */
export type ICreateNativeViewOptions = TFuseSerializable<_ICreateNativeViewOptions>;

/**
 * @internal
 */
interface _ICreateNativeViewAPIParams {
    rect: FuseNativeRect;
    options: ICreateNativeViewOptions;
}

/**
 * @internal
 */
type ICreateNativeViewAPIParams = TFuseSerializable<_ICreateNativeViewAPIParams>;

export class FuseNativeViewPlugin extends FusePlugin {
    protected override _getID(): string {
        return "FuseNativeView";
    }

    /**
     * Creates a overlay view. The given node will be tracked
     * according to it's position and size on screen.
     * 
     * A native view will be positioned in the same position on top of
     * the webview.
     * 
     * If a overlay is desirable, optionally a path to a HTML file can be given.
     * This HTML file will be loaded in a separate webview process. This separate
     * webview will process will have limited capabilities, but it will be sized
     * and positioned in the same area of the transparent mask, however
     * above the webview. If the overlay file is not specified, a webview overlay
     * will not be created.
     * 
     * TBD: Notes on event propagation.
     * 
     * @param node The node to track
     * @returns 
     */
    public async create(node: HTMLElement, options?: ICreateNativeViewOptions): Promise<FuseNativeViewNode> {
        let params: ICreateNativeViewAPIParams = {
            rect: FuseNativeViewNode.getNativeRect(node),
            options: options || {}
        };

        let response: FuseAPIResponse = await this._exec('/create', ContentType.JSON, params);
        if (response.isError()) {
            throw await response.readAsError();
        }

        let id: string = await response.readAsText();
        return new FuseNativeViewNode(this, id, node);
    }

    public async destroy(node: FuseNativeViewNode): Promise<void> {
        let response: FuseAPIResponse = await this._exec('/destroy', ContentType.TEXT, node.getID());
        if (response.isError()) {
            throw await response.readAsError();
        }
    }

    public async update(id: string, rect: FuseNativeRect): Promise<void> {
        let response: FuseAPIResponse = await this._exec('/update', ContentType.JSON, {
            id: id,
            rect: rect
        });

        if (response.isError()) {
            throw await response.readAsError();
        }
    }
}
