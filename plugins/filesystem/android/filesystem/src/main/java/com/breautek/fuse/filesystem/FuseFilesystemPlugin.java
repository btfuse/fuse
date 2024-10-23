
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

package com.breautek.fuse.filesystem;

import androidx.annotation.NonNull;

import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FusePlugin;
import com.breautek.fuse.filesystem.handlers.FileAppendHandler;
import com.breautek.fuse.filesystem.handlers.FileDeleteHandler;
import com.breautek.fuse.filesystem.handlers.FileExistsHandler;
import com.breautek.fuse.filesystem.handlers.FileMkdirHandler;
import com.breautek.fuse.filesystem.handlers.FileReadHandler;
import com.breautek.fuse.filesystem.handlers.FileSizeHandler;
import com.breautek.fuse.filesystem.handlers.FileTruncateHandler;
import com.breautek.fuse.filesystem.handlers.FileTypeHandler;
import com.breautek.fuse.filesystem.handlers.FileWriteHandler;

public class FuseFilesystemPlugin extends FusePlugin {
    public static final int DEFAULT_CHUNK_SIZE = 4194304; // 4mb
    private int $chunkSize;
    private @NonNull FuseFSAPIFactory $fsapiFactory;

    public FuseFilesystemPlugin(FuseContext context) {
        super(context);
        $chunkSize = DEFAULT_CHUNK_SIZE;
        $fsapiFactory = new FuseFSAPIFactory();
    }

    public void setFSAPIFactory(@NonNull FuseFSAPIFactory apiFactory) {
        $fsapiFactory = apiFactory;
    }

    public @NonNull FuseFSAPIFactory getFSAPIFactory() {
        return $fsapiFactory;
    }

    /**
     * Sets the chunk size used for read and write operations.
     *
     * @param chunkSize
     */
    public void setChunkSize(int chunkSize) {
        $chunkSize = chunkSize;
    }

    public int getChunkSize() {
        return $chunkSize;
    }

    @Override
    public String getID() {
        return "FuseFilesystem";
    }

    @Override
    protected void _initHandles() {
        attachHandler("/file/type", new FileTypeHandler(this));
        attachHandler("/file/size", new FileSizeHandler(this));
        attachHandler("/file/mkdir", new FileMkdirHandler(this));
        attachHandler("/file/read", new FileReadHandler(this));
        attachHandler("/file/truncate", new FileTruncateHandler(this));
        attachHandler("/file/append", new FileAppendHandler(this));
        attachHandler("/file/write", new FileWriteHandler(this));
        attachHandler("/file/remove", new FileDeleteHandler(this));
        attachHandler("/file/exists", new FileExistsHandler(this));
    }
}
