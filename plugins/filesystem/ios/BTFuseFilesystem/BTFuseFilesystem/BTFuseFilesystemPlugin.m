
/*
Copyright Breautek

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

#import <Foundation/Foundation.h>
#import <BTFuse/BTFuse.h>
#import <BTFuseFilesystem/BTFuseFilesystemPlugin.h>
#import "BTFuseFilesystemFileTypeHandler.h"
#import <BTFuseFilesystem/BTFuseFilesystemFileType.h>
#import "BTFuseFilesystemFileAPIParams.h"

NSString* BTFUSE_FILESYSTEM_TAG = @"FuseFilesystem";

@implementation BTFuseFilesystemPlugin {
    uint32_t DEFAULT_CHUNK_SIZE;
    uint32_t $chunkSize;
}

- (instancetype) init:(BTFuseContext*) context {
    self = [super init: context];
    
    DEFAULT_CHUNK_SIZE = 4194304; // 4mb
    $chunkSize = DEFAULT_CHUNK_SIZE;
    
    return self;
}

- (NSString*) getID {
    return BTFUSE_FILESYSTEM_TAG;
}

- (void) setChunkSize:(uint32_t) chunkSize {
    $chunkSize = chunkSize;
}

- (uint32_t) getChunkSize {
    return $chunkSize;
}

- (void) initHandles {
    [self attachHandler:@"/file/type" callback: ^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        [self handleFileTypeRequest: packet response: response];
    }];
    
    [self attachHandler:@"/file/size" callback: ^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        [self handleFileSizeRequest: packet response: response];
    }];
    
    [self attachHandler:@"/file/mkdir" callback: ^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        [self handleFileMkdirRequest: packet response: response];
    }];
    
    [self attachHandler:@"/file/read" callback: ^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        [self handleFileReadRequest: packet response: response];
    }];
    
    [self attachHandler:@"/file/truncate" callback: ^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        [self handleFileTruncateRequest: packet response: response];
    }];
    
    [self attachHandler:@"/file/append" callback: ^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        [self handleFileAppendRequest: packet response: response];
    }];
    
    [self attachHandler:@"/file/write" callback: ^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        [self handleFileWriteRequest: packet response: response];
    }];
    
    [self attachHandler:@"/file/remove" callback: ^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        [self handleFileRemoveRequest: packet response: response];
    }];
    
    [self attachHandler:@"/file/exists" callback: ^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        [self handleFileExistsRequest: packet response: response];
    }];
}

- (void) handleFileTypeRequest:(BTFuseAPIPacket*) packet response:(BTFuseAPIResponse*) response {
    NSString* path = [packet readAsString];
    NSFileManager* fm = [NSFileManager defaultManager];
    
    BOOL isDirectory;
    BOOL exists = [fm fileExistsAtPath: path isDirectory: &isDirectory];
    
    if (!exists) {
        NSString* message = [NSString stringWithFormat:@"No such file found at %@", path];
        [response sendError:[[BTFuseError alloc] init:@"FuseFilesystem" withCode:0 withMessage:message]];
        return;
    }
    
    BTFuseFilesystemFileType type = BTFuseFilesystemFileTypeFile;
    
    if (isDirectory) {
        type = BTFuseFilesystemFileTypeDirectory;
    }
    
    NSInteger typeInt = (NSInteger) type;
    
    [response sendString:[NSString stringWithFormat:@"%ld", (long) typeInt]];
}

- (void) handleFileSizeRequest:(BTFuseAPIPacket*) packet response:(BTFuseAPIResponse*) response {
    NSString* path = [packet readAsString];
    
    BTFuseError* error = nil;
    NSNumber* size = [self $getFileSize: path error:&error];
    
    if (error != nil) {
        [response sendError:error];
        return;
    }

    [response sendString:[NSString stringWithFormat:@"%lu", [size unsignedLongValue]]];
}

- (void) handleFileMkdirRequest:(BTFuseAPIPacket*) packet response:(BTFuseAPIResponse*) response {
    NSError* error = nil;
    NSDictionary* params = [packet readAsJSONObject: error];
    
    if (error != nil) {
        [response sendError:[[BTFuseError alloc] init:@"FuseFilesystem" withCode:0 withError:error]];
        return;
    }
    
    bool recursive = [params objectForKey:@"recursive"];
    NSString* path = [params objectForKey:@"path"];
    NSFileManager* fm = [NSFileManager defaultManager];
    
    BOOL isDirectory;
    BOOL exists = [fm fileExistsAtPath: path isDirectory: &isDirectory];
    
    if (exists) {
        [response sendString:@"false"];
        return;
    }
    
    error = nil;
    bool didCreate = [fm createDirectoryAtPath: path withIntermediateDirectories: recursive attributes:nil error:&error];
    if (error != nil) {
        [response sendError:[[BTFuseError alloc] init:@"FuseFilesystem" withCode:0 withError:error]];
        return;
    }

    NSString* output = didCreate ? @"true" : @"false";
    [response sendString:output];
}

- (void) handleFileReadRequest:(BTFuseAPIPacket*) packet response:(BTFuseAPIResponse*) response {
    NSError* error = nil;
    NSDictionary* params = [packet readAsJSONObject: error];
    
    if (error != nil) {
        [response sendError:[[BTFuseError alloc] init: BTFUSE_FILESYSTEM_TAG withCode:0 withError:error]];
        return;
    }
    
    NSString* path = [params objectForKey:@"path"];
    NSNumber* ndesiredLength = [params objectForKey:@"length"];
    NSNumber* noffset = [params objectForKey:@"offset"];
    
    NSFileHandle* fileHandle = [NSFileHandle fileHandleForReadingAtPath: path];
    
    if (!fileHandle) {
        [response sendError:[[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode:0 withMessage: [NSString stringWithFormat: @"Failed to open path \"%@\"", path]]];
        return;
    }
    
    BTFuseError* fe = nil;
    
    NSNumber* nfileSize = [self $getFileSize: path error:&fe];
    if (fe != nil) {
        [response sendError: fe];
        return;
    }
    
    uint64_t fileSize = [nfileSize unsignedLongValue];
    uint64_t contentLength = 0;
    int64_t desiredLength = [ndesiredLength longValue];
    uint64_t offset = [noffset unsignedLongValue];
    
    if (desiredLength == -1) {
        contentLength = fileSize;
    }
    else {
        contentLength = (desiredLength < fileSize) ? desiredLength : fileSize;
    }
    
    if (contentLength + offset > fileSize) {
        contentLength -= (contentLength + offset) - fileSize;
    }
    
    if (contentLength == 0) {
        [response sendNoContent];
        return;
    }
    
    uint32_t chunkSize = [self getChunkSize];
    if (chunkSize > contentLength) {
        chunkSize = (uint32_t) contentLength;
    }
    
    uint64_t totalBytesRead = 0;
    
    if (offset > 0) {
        [fileHandle seekToOffset: offset error: &error];
        if (error != nil) {
            [response sendError:[[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode:0 withError:error]];
            return;
        }
    }
    
    [response finishHeaders: 200 withContentType:@"application/octet-stream" withContentLength: contentLength];
    
    bool didFail = false;
    while (totalBytesRead < contentLength) {
        NSData* data = [fileHandle readDataOfLength: chunkSize];
        if (data == nil) {
            didFail = true;
            break;
        }
        
        totalBytesRead += [data length];
        [response pushData: data];
    }
    
    [fileHandle closeFile];
    
    if (didFail) {
        [response kill: @"Failed to read data"];
        return;
    }
    
    [response didFinish];
}

- (void) handleFileTruncateRequest:(BTFuseAPIPacket*) packet response:(BTFuseAPIResponse*) response {
    NSNumber* overallContentLength = [[NSNumber alloc] initWithUnsignedLong: [packet getContentLength]];
    NSInputStream* readStream = [[packet getClient] getInputStream];
    BTFuseStreamReader* reader = [[BTFuseStreamReader alloc] init: readStream];
    BTFuseError* error = nil;
    
    BTFuseFilesystemFileAPIParams* params = [BTFuseFilesystemFileAPIParamsParser parse: overallContentLength chunkSize: [self getChunkSize] reader: reader error: &error];
    
    if (error != nil) {
        [response sendError: error];
        return;
    }
    
    NSString* path = [[NSString alloc] initWithData: [params getParams] encoding: NSUTF8StringEncoding];
    NSFileHandle* fileHandle = [NSFileHandle fileHandleForWritingAtPath: path];
    
    if (!fileHandle) {
        [response sendError:[[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode:0 withMessage: [NSString stringWithFormat: @"Failed to open path \"%@\"", path]]];
        return;
    }
    
    NSError* fileError = nil;
    
    [fileHandle truncateAtOffset: 0 error: &fileError];
    if (fileError != nil) {
        [response sendError: [[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode: 0 withError: fileError]];
        return;
    }
    
    NSUInteger contentLength = [[params getContentLength] unsignedLongValue];
    
    if (contentLength == 0) {
        [fileHandle closeFile];
        [response sendString: @"0"];
        return;
    }
    
    uint32_t chunkSize = [self getChunkSize];
    
    if (chunkSize > contentLength) {
        chunkSize = (uint32_t) contentLength;
    }
    
    uint8_t buffer[chunkSize];
    uint64_t totalBytesRead = 0;
    uint64_t bytesWritten = 0;
    NSInteger bytesRead = 0;
    bool didError = false;
    
    while (true) {
        uint64_t totalBytesToRead = contentLength - totalBytesRead;
        
        if (totalBytesToRead == 0) {
            break;
        }
        
        uint32_t bytesToRead = 0;
        if (totalBytesToRead > UINT32_MAX) {
            bytesToRead = UINT32_MAX;
        }
        else {
            bytesToRead = (uint32_t) totalBytesToRead;
        }
        
        if (bytesToRead > chunkSize) {
            bytesToRead = chunkSize;
        }
        
        bytesRead = [reader read: buffer maxBytes: bytesToRead];
        
        if (bytesRead == -1) {
            break;
        }
        
        NSData* data = [[NSData alloc] initWithBytes: buffer length: bytesRead];
        totalBytesRead += bytesRead;
        [fileHandle writeData: data error: &fileError];
        bytesWritten += [data length];
        
        if (fileError != nil) {
            didError = true;
            break;
        }
    }
    
    [fileHandle closeFile];
    
    if (didError) {
        [response sendError: [[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode: 0 withError: fileError]];
        return;
    }
    
    [response sendString: [NSString stringWithFormat: @"%"PRIu64, bytesWritten]];
}

- (void) handleFileAppendRequest:(BTFuseAPIPacket*) packet response:(BTFuseAPIResponse*) response {
    NSNumber* overallContentLength = [[NSNumber alloc] initWithUnsignedLong: [packet getContentLength]];
    NSInputStream* readStream = [[packet getClient] getInputStream];
    BTFuseStreamReader* reader = [[BTFuseStreamReader alloc] init: readStream];
    BTFuseError* error = nil;
    
    BTFuseFilesystemFileAPIParams* params = [BTFuseFilesystemFileAPIParamsParser parse: overallContentLength chunkSize: [self getChunkSize] reader: reader error: &error];
    
    if (error != nil) {
        [response sendError: error];
        return;
    }
    
    NSString* path = [[NSString alloc] initWithData: [params getParams] encoding: NSUTF8StringEncoding];
    NSFileHandle* fileHandle = [NSFileHandle fileHandleForWritingAtPath: path];
    
    if (!fileHandle) {
        [response sendError:[[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode:0 withMessage: [NSString stringWithFormat: @"Failed to open path \"%@\"", path]]];
        return;
    }
    
    NSError* fileError = nil;
    
    [fileHandle seekToEndReturningOffset:nil error:&fileError];
    if (fileError != nil) {
        [response sendError: [[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode: 0 withError: fileError]];
        return;
    }
    
    NSUInteger contentLength = [[params getContentLength] unsignedLongValue];
    if (contentLength == 0) {
        [fileHandle closeFile];
        [response sendString: @"0"];
        return;
    }
    
    uint32_t chunkSize = [self getChunkSize];
    if (chunkSize > contentLength) {
        chunkSize = (uint32_t) contentLength;
    }
    
    uint8_t buffer[chunkSize];
    uint64_t totalBytesRead = 0;
    uint64_t bytesWritten = 0;
    NSInteger bytesRead = 0;
    bool didError = false;
    
    while(true) {
        uint64_t totalBytesToRead = contentLength - totalBytesRead;
        
        if (totalBytesToRead == 0) {
            break;
        }
        
        uint32_t bytesToRead = 0;
        if (totalBytesToRead > UINT32_MAX) {
            bytesToRead = UINT32_MAX;
        }
        else {
            bytesToRead = (uint32_t) totalBytesToRead;
        }
        
        if (bytesToRead > chunkSize) {
            bytesToRead = chunkSize;
        }
        
        bytesRead = [reader read: buffer maxBytes: bytesToRead];
        
        if (bytesRead == -1) {
            break;
        }
        
        NSData* data = [[NSData alloc] initWithBytes: buffer length: bytesRead];
        totalBytesRead += bytesRead;
        [fileHandle writeData: data error: &fileError];
        bytesWritten += [data length];
        
        if (error != nil) {
            didError = true;
            break;
        }
    }
    
    [fileHandle closeFile];
    
    if (didError) {
        [response sendError: [[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode: 0 withError: fileError]];
        return;
    }
    
    [response sendString: [NSString stringWithFormat: @"%"PRIu64, bytesWritten]];
}

- (void) handleFileWriteRequest:(BTFuseAPIPacket*) packet response:(BTFuseAPIResponse*) response {
    NSNumber* overallContentLength = [[NSNumber alloc] initWithUnsignedLong: [packet getContentLength]];
    NSInputStream* readStream = [[packet getClient] getInputStream];
    BTFuseStreamReader* reader = [[BTFuseStreamReader alloc] init: readStream];
    BTFuseError* error = nil;
    
    BTFuseFilesystemFileAPIParams* params = [BTFuseFilesystemFileAPIParamsParser parse: overallContentLength chunkSize: [self getChunkSize] reader: reader error: &error];
    
    if (error != nil) {
        [response sendError: error];
        return;
    }
    
    NSUInteger contentLength = [[params getContentLength] unsignedLongValue];
    if (contentLength == 0) {
        [response sendString:@"0"];
        return;
    }
    
    NSError* jsonError = nil;
    NSDictionary* opts = [NSJSONSerialization JSONObjectWithData: [params getParams] options: 0 error: &jsonError];
    if (jsonError != nil) {
        [response sendError:[[BTFuseError alloc] init: BTFUSE_FILESYSTEM_TAG withCode: 0 withError: jsonError]];
        return;
    }
    
    NSString* path = [opts objectForKey: @"path"];
    if (path == nil) {
        [response sendError:[[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode: 0 withMessage: @"Path is required"]];
        return;
    }
    
    NSNumber* nsoffset = [opts objectForKey:@"offset"];
    NSUInteger offset = 0;
    if (nsoffset != nil) {
        offset = [nsoffset unsignedLongValue];
    }
    
    NSFileHandle* fileHandle = [NSFileHandle fileHandleForWritingAtPath: path];
    
    if (!fileHandle) {
        [response sendError:[[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode:0 withMessage: [NSString stringWithFormat: @"Failed to open path \"%@\"", path]]];
        return;
    }
    
    NSError* fileError = nil;
    if (offset != 0) {
        [fileHandle seekToOffset: offset error: &fileError];
        if (fileError != nil) {
            [response sendError:[[BTFuseError alloc] init: BTFUSE_FILESYSTEM_TAG withCode: 0 withError: fileError]];
            return;
        }
    }
    
    uint32_t chunkSize = [self getChunkSize];
    
    if (chunkSize > contentLength) {
        chunkSize = (uint32_t) contentLength;
    }
    
    uint8_t buffer[chunkSize];
    uint64_t totalBytesRead = 0;
    uint64_t bytesWritten = 0;
    NSInteger bytesRead = 0;
    bool didError = false;
    
    while(true) {
        uint64_t totalBytesToRead = contentLength - totalBytesRead;
        
        if (totalBytesToRead == 0) {
            break;
        }
        
        uint32_t bytesToRead = 0;
        if (totalBytesToRead > UINT32_MAX) {
            bytesToRead = UINT32_MAX;
        }
        else {
            bytesToRead = (uint32_t) totalBytesToRead;
        }
        
        if (bytesToRead > chunkSize) {
            bytesToRead = chunkSize;
        }
        
        bytesRead = [reader read: buffer maxBytes: bytesToRead];
        
        if (bytesRead == -1) {
            break;
        }
        
        NSData* data = [[NSData alloc] initWithBytes: buffer length: bytesRead];
        totalBytesRead += bytesRead;
        [fileHandle writeData: data error: &fileError];
        bytesWritten += [data length];
        
        if (fileError != nil) {
            didError = true;
            break;
        }
    }
    
    [fileHandle closeFile];
    
    if (didError) {
        [response sendError: [[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode: 0 withError: fileError]];
        return;
    }
    
    [response sendString: [NSString stringWithFormat: @"%"PRIu64, bytesWritten]];
}

- (void) handleFileRemoveRequest:(BTFuseAPIPacket*) packet response:(BTFuseAPIResponse*) response {
    NSError* error = nil;
    
    NSDictionary* opts = [packet readAsJSONObject: error];
    
    if (error != nil) {
        [response sendError:[[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode: 0 withError: error]];
        return;
    }
    
    NSString* path = [opts objectForKey: @"path"];
    if (path == nil) {
        [response sendError:[[BTFuseError alloc] init:BTFUSE_FILESYSTEM_TAG withCode: 0 withMessage: @"Path is required"]];
        return;
    }
    
    // We don't use the recursive options, unlike Android, the iOS API will always reecursively delete
    // if the path leads to a directory
    
    NSFileManager* fm = [NSFileManager defaultManager];
    if (![fm fileExistsAtPath: path]) {
        [response sendString:@"false"];
        return;
    }
    
    [fm removeItemAtPath: path error: &error];
    
    if (error != nil) {
        [response sendError:[[BTFuseError alloc] init: BTFUSE_FILESYSTEM_TAG withCode: 0 withError: error]];
        return;
    }
    
    // Unlike the Android APIs, we don't know if things were actually deleted, however,
    // it's likely safe to assume if we made it here without error, then the object at path
    // was in fact, removed.
    [response sendString:@"true"];
}

- (void) handleFileExistsRequest:(BTFuseAPIPacket*) packet response:(BTFuseAPIResponse*) response {
    NSString* path = [packet readAsString];
    NSFileManager* fm = [NSFileManager defaultManager];
    
    BOOL isDirectory;
    BOOL exists = [fm fileExistsAtPath: path isDirectory: &isDirectory];
    
    if (exists) {
        [response sendString: @"true"];
    }
    else {
        [response sendString: @"false"];
    }
}

- (NSNumber*) $getFileSize:(NSString*) path error:(BTFuseError**) error {
    NSFileManager* fm = [NSFileManager defaultManager];
    
    BOOL isDirectory;
    BOOL exists = [fm fileExistsAtPath: path isDirectory: &isDirectory];
    
    if (!exists) {
        NSString* message = [NSString stringWithFormat:@"No such file found at \"%@\"", path];
        *error = [[BTFuseError alloc] init:@"FuseFilesystem" withCode:0 withMessage:message];
        return nil;
    }
    
    if (isDirectory) {
        NSString* message = [NSString stringWithFormat:@"Path \"%@\" is a directory", path];
        *error = [[BTFuseError alloc] init:@"FuseFilesystem" withCode:0 withMessage:message];
        return nil;
    }
    
    NSError* e;
    NSDictionary* attributes = [fm attributesOfItemAtPath: path error: &e];
    
    if (e != nil) {
        *error = [[BTFuseError alloc] init:@"FuseFilesystem" withCode:0 withError: e];
        return nil;
    }
    
    if (attributes == nil) {
        NSString* message = [NSString stringWithFormat:@"Could not read \"%@\"", path];
        *error = [[BTFuseError alloc] init:@"FuseFilesystem" withCode:0 withMessage:message];
        return nil;
    }
    
    return [attributes objectForKey:NSFileSize];
}

@end
