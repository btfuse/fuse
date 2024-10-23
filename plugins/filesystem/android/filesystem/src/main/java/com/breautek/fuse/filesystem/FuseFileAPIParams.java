
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

import java.io.IOException;
import java.io.InputStream;

/**
 * A class to handle specialized binary input for
 * several File operation handlers. This is used when
 * an API requires parameters, but also
 * accepts other binary input such as files.
 *
 * Generally speaking the first byte will be an unsigned int32
 * using little endian formatting, which describes the number of
 * bytes following used for parameters. This params will be a stringified
 * dataset. There is no specific format for what the dataset will be,
 * that's a handler implementation detail, but it must be UTF8.
 * Immediately following the parameters dataset will be the file content.
 */
public class FuseFileAPIParams {
    private byte[] $data;
    private long $contentLength;

    private static final int CONTENT_LENGTH_BYTE_SIZE = 4;

    private FuseFileAPIParams() {}

    /**
     * Gets the params data
     */
    public byte[] getParams() {
        return $data;
    }

    /**
     * Gets the content length, excluding the params data
     */
    public long getContentLength() {
        return $contentLength - $data.length - CONTENT_LENGTH_BYTE_SIZE;
    }

    public static FuseFileAPIParams parse(long contentLengthHv, InputStream io) throws IOException {
        byte[] contentLength = new byte[CONTENT_LENGTH_BYTE_SIZE];
        int bytesRead = io.read(contentLength);
        if (bytesRead < CONTENT_LENGTH_BYTE_SIZE) {
            throw new IOException("Unable to read Fuse File API Params length byte.");
        }

        int contentLengthInt = ((contentLength[0] & 0xFF) << 24) |
                ((contentLength[1] & 0xFF) << 16) |
                ((contentLength[2] & 0xFF) << 8) |
                (contentLength[3] & 0xFF);

        byte[] content = new byte[contentLengthInt];

        bytesRead = io.read(content);

        if (bytesRead < contentLengthInt) {
            throw new IOException("Unable to read Fuse File API Params content");
        }

        FuseFileAPIParams params = new FuseFileAPIParams();
        params.$data = content;
        params.$contentLength = contentLengthHv;
        return params;
    }
}
