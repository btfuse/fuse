
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
#import "BTFuseFilesystemFileAPIParams.h"

const int BTFuseFilesystemFileAPIParams_CONTENT_LENGTH_BYTE_SIZE = 4;

@implementation BTFuseFilesystemFileAPIParams {
    NSData* $params;
    NSNumber* $overallContentLength;
}

- (instancetype) init:(NSNumber*) overallContentLength data:(NSData*) data {
    self = [super init];
    
    $overallContentLength = overallContentLength;
    $params = data;
    
    return self;
}

//+ (BTFuseFilesystemFileAPIParams*) parse:(NSNumber*) contentLengthHv input:(NSInputStream*) io error:(BTFuseError**) error {
//    BTFuseFilesystemFileAPIParams* params = [[BTFuseFilesystemFileAPIParams alloc] init];
//    
//    uint8_t contentLength[BTFuseFilesystemFileAPIParams_CONTENT_LENGTH_BYTE_SIZE];
//    NSInteger bytesRead = [io read:contentLength maxLength:BTFuseFilesystemFileAPIParams_CONTENT_LENGTH_BYTE_SIZE];
//    
//    if (bytesRead < BTFuseFilesystemFileAPIParams_CONTENT_LENGTH_BYTE_SIZE) {
//        *error = [[BTFuseError alloc] init:@"FuseFilesystem" withCode:0 withMessage:@"Unable to read Fuse File API Params length byte."];
//        return nil;
//    }
//    
//    int contentLengthInt = ((contentLength[0] & 0xFF) << 24) |
//                ((contentLength[1] & 0xFF) << 16) |
//                ((contentLength[2] & 0xFF) << 8) |
//                (contentLength[3] & 0xFF);
//                
//    uint8_t content[contentLengthInt];
//    
//    bytesRead = [io read:content maxLength:contentLengthInt];
//    if (bytesRead < contentLengthInt) {
//        *error = [[BTFuseError alloc] init:@"FuseFilesystem" withCode:0 withMessage:@"Unable to read Fuse File API Params content."];
//        return nil;
//    }
//    
//    params->$contentLength = contentLengthHv;
//    params->$params = [[NSData alloc] initWithBytes: content length: contentLengthInt];
//    
//    return params;
//}

- (NSNumber*) getContentLength {
    return [[NSNumber alloc] initWithUnsignedLong: [$overallContentLength unsignedLongValue] - [$params length] - BTFuseFilesystemFileAPIParams_CONTENT_LENGTH_BYTE_SIZE];
}

- (NSData*) getParams {
    return $params;
}

@end

@implementation BTFuseFilesystemFileAPIParamsParser /*{
    NSNumber* $contentLengthHv;
    NSInputStream* $io;
    BTFuseFilesystemFileAPIParamsParserCallback $callback;
    int $contentLength;
    NSMutableData* $contentLengthBuffer;
    NSInteger $bytesRead;
    NSMutableData* $content;
}*/

//- (instancetype) init:(NSNumber*) contentLengthHv input:(NSInputStream*) io callback:(BTFuseFilesystemFileAPIParamsParserCallback) callback {
//    self = [super init];
//    
//    $contentLengthHv = contentLengthHv;
//    $io = io;
//    $callback = callback;
//    $contentLength = 0;
//    $bytesRead = 0;
//    $contentLengthBuffer = [[NSMutableData alloc] initWithCapacity: 0];
//    $content = [[NSMutableData alloc] init];
//    
//    return self;
//}
//
//- (void) dealloc {
//    $contentLengthHv = nil;
//    $io = nil;
//    $callback = nil;
//    $content = nil;
//    $contentLengthBuffer = nil;
//}
//
//- (void) handleContentSizeRead:(NSInputStream*) io {
//    // This method handles partial reads of content size part of the buffer.
//    // In theory this should not be needed because it means we read the buffer when it had less than 4 bytes written
//    // but tests intermittently fails so it does happen on iOS.
//    
//    uint8_t contentLength[BTFuseFilesystemFileAPIParams_CONTENT_LENGTH_BYTE_SIZE];
//    
//    NSInteger bytesNeeded = BTFuseFilesystemFileAPIParams_CONTENT_LENGTH_BYTE_SIZE - $bytesRead;
//    if (bytesNeeded <= 0) {
//        return ;
//    }
//    
//    NSInteger bytesRead = [io read:contentLength maxLength: bytesNeeded];
//    
//    [$contentLengthBuffer appendBytes: contentLength length: bytesRead];
//    
//    $bytesRead += bytesRead;
//    
//    // If we have not read the length byte size yet, it means we have done a partial read
//    // and we haven't obtained all the data yet.
//    if (bytesRead == BTFuseFilesystemFileAPIParams_CONTENT_LENGTH_BYTE_SIZE) {
//        // And if we enter here we are done reading the content length byte.
//        const uint8_t* rawBuffer = [$contentLengthBuffer bytes];
//        $contentLength =    ((rawBuffer[0] & 0xFF) << 24) |
//                            ((rawBuffer[1] & 0xFF) << 16) |
//                            ((rawBuffer[2] & 0xFF) << 8) |
//                            ( rawBuffer[3] & 0xFF);
//    }
//}

//- (void) handleContentRead:(NSInputStream*) io {
//    // Unlike above where we don't want to read extra bytes, which would grab parts of the actual content,
//    // we can simply read up to $contentLength each time. NSInputStream takes max has a hint and can
//    // return less than if the content isn't there (potentially returning 0 bytes altogether)
//    
//    uint8_t content[$contentLength];
//    NSInteger bytesRead = [io read: content maxLength: $contentLength];
//    
//    $bytesRead += bytesRead;
//    [$content appendBytes: content length: bytesRead];
//    
//    if ($bytesRead == [$contentLengthHv integerValue]) {
//        NSLog(@"Should be done parsing....");
//    }
//}

//- (void) stream:(NSStream*) io handleEvent:(NSStreamEvent) event {
//    switch (event) {
//        case NSStreamEventHasBytesAvailable:
//            if ($contentLength == 0) {
//                [self handleContentSizeRead: (NSInputStream*)io];
//            }
//            else {
//                [self handleContentRead: (NSInputStream*)io];
//            }
//            break;
//        case NSStreamEventEndEncountered:
//            NSLog(@"END EVENT RECEIVED");
//            break;
//        case NSStreamEventErrorOccurred:
//            $callback(nil, [[BTFuseError alloc] init:@"FuseFilesystem" withCode:0 withMessage:@"Unable to parse file params"]);
//            break;
//        case NSStreamEventNone:
//        case NSStreamEventOpenCompleted:
//        case NSStreamEventHasSpaceAvailable:
//            // Do nothing for these 4 events
//            break;
//    }
//}

//- (void) parse {
//    $io.delegate = self;
//}

/**
    This method parses the content body, which is made up of 2 parts:
    1. The heading
    2. The content body
    
    The heading is some amount of data used for parameters. It is optional and it may be empty. A uint32 byte will be always present
    at the start of the buffer which indicates the size of the header content.
    
    It's this method responsibility of reading up to this content marker without reading any of the actual content body. The content body size will be the HTTP header content length - the header size.
    The content body is arbitrary data intended to be written to a file, generally speaking.
 */
+ (BTFuseFilesystemFileAPIParams*) parse:(NSNumber*) overallContentLength chunkSize:(uint32_t) requestedChunkSize reader:(BTFuseStreamReader*) io error:(BTFuseError**) error {
    uint32_t headerContentLength = 0;

    uint64_t bytesRead = 0;
    
//    uint8_t contentLengthBuffer[BTFuseFilesystemFileAPIParams_CONTENT_LENGTH_BYTE_SIZE];
    NSMutableData* headerContentLengthData = [[NSMutableData alloc] init];
    
    // First read the content length byte
    // This will typically occur on the first iteration unless if the "network" is for some reason very slow
    // but alas, we do it in a loop in case we didn't read the 4 bytes in a single read call.
    while (true) {
        uint8_t bytesNeeded = BTFuseFilesystemFileAPIParams_CONTENT_LENGTH_BYTE_SIZE - bytesRead;
        if (bytesNeeded == 0) {
            break;
        }
        
        uint8_t buffer[bytesNeeded];
        
        int64_t bytesReadThisIteration = [io read: buffer maxBytes: bytesNeeded];
        
        if (bytesReadThisIteration == -1) {
            *error = [[BTFuseError alloc] init:@"FuseFilesystem" withCode:0 withMessage:@"Unable to parse file params"];
            break;
        }
        
        [headerContentLengthData appendBytes: buffer length: bytesReadThisIteration];
        
        bytesRead += bytesReadThisIteration;
        
        if (bytesRead == BTFuseFilesystemFileAPIParams_CONTENT_LENGTH_BYTE_SIZE) {
            // And if we enter here we are done reading the content length byte.
            const uint8_t* contentLengthBuffer = [headerContentLengthData bytes];
            headerContentLength =    ((contentLengthBuffer[0] & 0xFF) << 24) |
                                ((contentLengthBuffer[1] & 0xFF) << 16) |
                                ((contentLengthBuffer[2] & 0xFF) << 8) |
                                ( contentLengthBuffer[3] & 0xFF);
            break;
        }
    }
    
    // If we have errored, then return
    if (*error != nil) {
        return nil;
    }
    
    // Reset the bytesRead counter for reading the param content
    bytesRead = 0;
    
    // Now we can read the rest of the param content content
    const uint32_t CHUNK_SIZE = headerContentLength < requestedChunkSize ? headerContentLength : requestedChunkSize;
    uint8_t buffer[CHUNK_SIZE];
    NSMutableData* paramContent = [[NSMutableData alloc] init];
    
    while (true) {
        uint64_t totalBytesToRead = headerContentLength - bytesRead;
        
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
        
        if (bytesToRead > CHUNK_SIZE) {
            bytesToRead = CHUNK_SIZE;
        }
        
        int64_t bytesReadThisIteration = [io read: buffer maxBytes: bytesToRead];
        
        if (bytesReadThisIteration == -1) {
            break;
        }
        
        bytesRead += bytesReadThisIteration;
        [paramContent appendBytes: buffer length: bytesReadThisIteration];
    }
    
    return [[BTFuseFilesystemFileAPIParams alloc]
        init: overallContentLength
        data: paramContent
    ];
}

@end
