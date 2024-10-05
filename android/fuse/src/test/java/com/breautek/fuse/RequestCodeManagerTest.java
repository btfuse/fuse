
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

import org.junit.Test;
import org.junit.Before;

import static org.junit.Assert.*;

public class RequestCodeManagerTest {

    @Before
    public void setup() {
        RequestCodeManager.getInstance().reset();
    }

    @Test
    public void shouldIncrementRequestCodes() {
        assertEquals(0, RequestCodeManager.getInstance().getRequestCode());
        assertEquals(1, RequestCodeManager.getInstance().getRequestCode());
        assertEquals(2, RequestCodeManager.getInstance().getRequestCode());
    }

    @Test
    public void shouldSkipOverForbiddenCodes() {
        RequestCodeManager.getInstance().setForbiddenCode(1, true);
        RequestCodeManager.getInstance().setForbiddenCode(3, true);
        RequestCodeManager.getInstance().setForbiddenCode(4, true);

        assertEquals(0, RequestCodeManager.getInstance().getRequestCode());
        assertEquals(2, RequestCodeManager.getInstance().getRequestCode());
        assertEquals(5, RequestCodeManager.getInstance().getRequestCode());
    }

    @Test
    public void removeForbiddenCode() {
        RequestCodeManager.getInstance().setForbiddenCode(1, true);
        RequestCodeManager.getInstance().setForbiddenCode(1, false);
        assertEquals(0, RequestCodeManager.getInstance().getRequestCode());
        assertEquals(1, RequestCodeManager.getInstance().getRequestCode());
    }

    @Test
    public void shouldWrapTo0() {
        RequestCodeManager.getInstance().setNextRequestCode(Integer.MAX_VALUE);
        assertEquals(Integer.MAX_VALUE, RequestCodeManager.getInstance().getRequestCode());
        assertEquals(0, RequestCodeManager.getInstance().getRequestCode());
    }
}
