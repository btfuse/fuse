
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

package com.breautek.fuse;

import androidx.annotation.VisibleForTesting;

import java.util.HashMap;

public class RequestCodeManager {
    private static RequestCodeManager $instance = null;

    private int $nextRequestCode;
    private final HashMap<Integer, Boolean> $forbiddenCodes;

    private RequestCodeManager() {
        $nextRequestCode = 0;
        $forbiddenCodes = new HashMap<>();
    }

    public static RequestCodeManager getInstance() {
        if (RequestCodeManager.$instance == null) {
            RequestCodeManager.$instance = new RequestCodeManager();
        }

        return RequestCodeManager.$instance;
    }

    /**
     * If third-party libraries use permissions/request codes that you don't want the Fuse framework
     * to become confused with, you can forbid the codes they use so that this manager won't ever
     * return them.
     *
     * @param code the forbidden (or not forbidden) code to modify.
     * @param isForbidden If true, set the forbidden code, if false, remove it.
     */
    public void setForbiddenCode(int code, boolean isForbidden) {
        if (isForbidden) {
            $forbiddenCodes.put(code, true);
        }
        else {
            $forbiddenCodes.remove(code);
        }
    }

    /**
     * Returns a request code, skipping over any configured forbidden codes.
     * The request code starts at 0 and increments on every call.
     * If a forbidden code is encountered, it will be incremented again.
     * The code is mostly unique, in the sense that it will roll back to MIN_VALUE once you reach
     * MAX_VALUE.
     *
     * @return requestCode
     */
    public synchronized int getRequestCode() {
        int requestCode;
        do {
            requestCode = $nextRequestCode++;
            if ($nextRequestCode < 0) {
                $nextRequestCode = 0;
            }
        } while ($forbiddenCodes.containsKey(requestCode));
        return requestCode;
    }

    @VisibleForTesting
    public void reset() {
        $nextRequestCode = 0;
        $forbiddenCodes.clear();
    }

    @VisibleForTesting
    public void setNextRequestCode(int code) {
        $nextRequestCode = code;
    }
}
