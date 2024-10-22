
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

import { FuseNativeRect } from './FuseNativeRect';
import { FuseNativeViewPlugin } from './FuseNativeViewPlugin';

export class FuseNativeViewNode {
    private $api: FuseNativeViewPlugin;
    private $id: string;
    private $node: HTMLElement;
    private $isActive: boolean;
    private $timer: number | null;
    private $lastUpdatedRect: FuseNativeRect | null;
    private $isUpdating: boolean;
    private $isDestroyed: boolean;

    public constructor(api: FuseNativeViewPlugin, id: string, node: HTMLElement) {
        this.$api = api;
        this.$id = id;
        this.$node = node;
        this.$isActive = false;
        this.$isUpdating = false;
        this.$timer = null;
        this.$lastUpdatedRect = null;
        this.$isDestroyed = false;
        this.$tick = this.$tick.bind(this);
        this.setActive(true);
    }

    public getID(): string {
        return this.$id;
    }

    public getNode(): HTMLElement {
        return this.$node;
    }

    public setActive(flag: boolean): void {
        this.$isActive = flag;
        if (flag) {
            this.$timer = window.requestAnimationFrame(this.$tick);
        }
        else {
            if (this.$timer !== null) {
                window.cancelAnimationFrame(this.$timer);
            }
        }
    }

    public isActive(): boolean {
        return this.$isActive;
    }

    private async $update(rect: FuseNativeRect): Promise<void> {
        await this.$api.update(this.getID(), rect);
    }

    public static getNativeRect(node: HTMLElement): FuseNativeRect {
        let domRect: DOMRect = node.getBoundingClientRect();

        let rect = {
            x: domRect.x,
            y: domRect.y,
            w: domRect.width,
            h: domRect.height
        };

        return rect;
    }

    private $hasRectChanges(a: FuseNativeRect, b: FuseNativeRect): boolean {
        return a.x !== b.x || a.y !== b.y || a.w !== b.w || a.h !== b.h;
    }

    private async $tick(): Promise<void> {
        let rect: FuseNativeRect = FuseNativeViewNode.getNativeRect(this.$node);
        if (!this.$isUpdating && (this.$lastUpdatedRect == null || this.$hasRectChanges(this.$lastUpdatedRect, rect))) {
            try {
                this.$isUpdating = true;
                await this.$update(rect);
            }
            catch (ex) {
                this.$lastUpdatedRect = null;
            }
            this.$isUpdating = false;
            this.$lastUpdatedRect = rect;
        }

        if (this.$isActive) {
            this.$timer = window.requestAnimationFrame(this.$tick);
        }
        else {
            this.$timer = null;
        }
    }

    /**
     * Destroys this fuse native view. When destroyed, the native
     * view will be removed from the DOM and this node will no longer be tracked.
     */
    public async destroy(): Promise<void> {
        await this.$api.destroy(this);
        this.$isDestroyed = true;
    }
}
