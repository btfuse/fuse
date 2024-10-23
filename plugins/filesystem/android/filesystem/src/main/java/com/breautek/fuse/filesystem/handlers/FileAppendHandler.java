
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

package com.breautek.fuse.filesystem.handlers;

import android.net.Uri;

import com.breautek.fuse.FuseAPIPacket;
import com.breautek.fuse.FuseAPIResponse;
import com.breautek.fuse.FuseError;
import com.breautek.fuse.FusePlugin.APIHandler;
import com.breautek.fuse.filesystem.FuseFileAPIParams;
import com.breautek.fuse.filesystem.FuseFilesystemPlugin;
import com.breautek.fuse.filesystem.IFSAPI;

import org.json.JSONException;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;

public class FileAppendHandler extends APIHandler<FuseFilesystemPlugin> {
    public FileAppendHandler(FuseFilesystemPlugin plugin) {
        super(plugin);
    }

    @Override
    public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException {
        FuseFileAPIParams params = FuseFileAPIParams.parse(packet.getContentLength(), packet.getInputStream());
        String path = new String(params.getParams());
        Uri uri = Uri.parse(path);

        long contentLength = params.getContentLength();

        IFSAPI fsapi = this.plugin.getFSAPIFactory().get(uri);
        long bytesWritten = -1;
        try {
            bytesWritten = fsapi.append(uri, packet.getInputStream(), contentLength, this.plugin.getChunkSize());
        }
        catch (FuseError error) {
            response.send(error);
            return;
        }

        response.send(Long.toString(bytesWritten));
    }
}
