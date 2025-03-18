
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

import {
    FuseContext,
    FusePlugin,
    FuseError,
    ContentType,
    TFuseSerializable
} from '@btfuse/core';
import {
    FuseNativeViewPlugin,
    FuseNativeViewNode
} from '@btfuse/native-view';
import { FuseGoogleMap } from './FuseGoogleMap';

/**
 * @internal
 */
interface _ICreateGoogleMapOptionsInternal {
    node: string;
}

type ICreateGoogleMapOptionsInternal = TFuseSerializable<_ICreateGoogleMapOptionsInternal>;

export interface ICreateGoogleMapOptions {
    node: HTMLElement;
    overlay?: {
        html?: string;
        file?: string;
    };

    // TODO: Will likely want additional parameters for google maps initialization.
}

const ERROR_DOMAIN: string = 'FuseGoogleMaps';

/**
 * An utility class for building the options object to create a map.
 */
export class FuseGoogleMapOptionsBuilder {
    private $node: HTMLElement | null;
    private $html: string | null;
    private $file: string | null;

    public constructor() {
        this.$node = null;
        this.$html = null;
        this.$file = null;
    }

    /**
     * Sets the containing node for the map. This node is tracked, and the native google map view
     * will match the size and positioning of this HTML node.
     * 
     * This is required and building without this being set will raise an error.
     * 
     * @param node - The containing node for the map.
     * @returns 
     */
    public setContainer(node: HTMLElement): FuseGoogleMapOptionsBuilder {
        this.$node = node;
        return this;
    }

    /**
     * Sets the HTML to be used for the overlay. If set, a secondary webview instance will be created using the HTML string
     * and will be laid on top of the map, allowing the ability to set a web-based overlay.
     * 
     * This option is mutually exclusive to setOverlayFile. If both is set, an error will be raised.
     * 
     * @param html - HTML string
     * @returns 
     */
    public setOverlayHTML(html: string): FuseGoogleMapOptionsBuilder {
        this.$html = html;
        return this;
    }

    /**
     * Sets a file path to an HTML file to be used for the overlay. If set, a secondary webview instance will be created using
     * the HTML file and will be laid on top of the map, allowing the ability to set a web-based overlay.
     * 
     * This option is mutually exclusive to setOverlayHTML. If both is set, an error will be raised.
     * 
     * @param file - The path to an HTML file
     * @returns 
     */
    public setOverlayFile(file: string): FuseGoogleMapOptionsBuilder {
        this.$file = file;
        return this;
    }

    /**
     * Creates a new options object for creating google maps.
     * 
     * @returns An ICreateGoogleMapsOptions object.
     */
    public build(): ICreateGoogleMapOptions {
        if (!this.$node) {
            throw new FuseError(ERROR_DOMAIN, 'Container node is not set. setContainer is required.');
        }

        if (this.$html && this.$file) {
            throw new FuseError(ERROR_DOMAIN, 'Both overlay HTML and overlay file is set. These options are mutually exclusive and cannot be set at the same time.');
        }

        let opts: ICreateGoogleMapOptions = {
            node: this.$node
        };

        if (this.$html || this.$file) {
            opts.overlay = {};

            if (this.$html) {
                opts.overlay.html = this.$html;
            }
            else if (this.$file) {
                opts.overlay.file = this.$file;
            }
        }

        return opts;
    }
}

/**
 * The main interface into the Google Map API.
 */
export class FuseGoogleMapPlugin extends FusePlugin {
    private $napi: FuseNativeViewPlugin;

    public constructor(context: FuseContext, nativeViewAPI: FuseNativeViewPlugin) {
        super(context);
        this.$napi = nativeViewAPI;
    }

    protected override _getID(): string {
        return "FuseGoogleMaps";
    }

    public async createMap(opts: ICreateGoogleMapOptions): Promise<FuseGoogleMap> {
        let nview: FuseNativeViewNode = await this.$napi.create(opts.node, {
            overlayFile: opts?.overlay?.file,
            overlayHTML: opts?.overlay?.html
        });

        // let mapReadyCallback = this._createCallback((data: string) => {
            
        // })

        let gmapsParams: ICreateGoogleMapOptionsInternal = {
            node: nview.getID()
        };

        try {
            await this._exec('/create', ContentType.JSON, gmapsParams);
        }
        catch (ex) {
            // If we errored, clean up the native code.
            await nview.destroy();
            throw ex;
        }

        return new FuseGoogleMap(nview);
    }
}
