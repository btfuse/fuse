
// TODO: move this as a build artefact and use TypeScript.

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

(() => {
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
            window.BTFuseNativeOverlay.setDOMRects(JSON.stringify(currentRects));
        }

        window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
})();
