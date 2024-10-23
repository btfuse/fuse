package com.breautek.fuse.filesystem;

import android.net.Uri;

public class FuseFSAPIFactory {
    private final IFSAPI $fsapi;

    public FuseFSAPIFactory() {
        $fsapi = new FSAPI();
    }

    public IFSAPI get(Uri uri) {
        String scheme = uri.getScheme();

        if (scheme == null) {
            return null;
        }

        if ("file".equals(scheme)) {
            return $fsapi;
        }

        return null;
    }
}
