
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

import {IOSFuseNativeViewOverlay} from './IOSFuseNativeViewOverlay';

(() => {
    let overlay: IOSFuseNativeViewOverlay = new IOSFuseNativeViewOverlay();
    overlay.start();
})();
