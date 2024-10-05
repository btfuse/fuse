
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

import java.io.IOException;
import java.util.Arrays;

public class FuseAPIRouter {
    private final FuseContext $context;

    public FuseAPIRouter(FuseContext context) {
        $context = context;
    }

    public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException {
        String route = packet.getRoute();

        String[] parts = route.split("/");

        if (parts.length < 3) {
            response.setStatus(FuseAPIResponseStatus.ERROR);
            byte[] content = new FuseError("FuseAPIRouter", 1, "Malformed route").serialize().getBytes();
            response.setContentLength(content.length);
            response.setContentType("application/json");
            response.didFinishHeaders();
            response.pushData(content);
            response.didFinish();
            return;
        }

        String pluginID = parts[2];
        FusePlugin plugin = $context.getPlugin(pluginID);
        if (plugin == null) {
            response.setStatus(FuseAPIResponseStatus.ERROR);
            byte[] content = new FuseError("FuseAPIRouter", 1, "Unknown plugin: " + pluginID).serialize().getBytes();
            response.setContentLength(content.length);
            response.setContentType("application/json");
            response.didFinishHeaders();
            response.pushData(content);
            response.didFinish();
            return;
        }

        String[] components = Arrays.copyOfRange(parts, 3, parts.length);
        String servicePath = "/" + String.join("/", components);

        plugin.route(servicePath, packet, response);
    }
}
