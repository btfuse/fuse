
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

#import <Foundation/Foundation.h>
#import <Network/Network.h>
#import "BTFuseAPIClientOutputStream.h"
#import "BTFuseNWErrorFactory.h"

@implementation BTFuseAPIClientOutputStream {
    __weak nw_connection_t $connection;
    bool _hasSpaceAvailable;
    NSError* _streamError;
    NSStreamStatus _streamStatus;
}

@synthesize hasSpaceAvailable;
@synthesize streamStatus;
@synthesize streamError;

- (instancetype _Nonnull) init:(nw_connection_t _Nonnull) connection {
    self = [super init];
    
    $connection = connection;
    
    return self;
}

- (void) setHasSpaceAvailable:(BOOL) hasSpaceAvailable {
    _hasSpaceAvailable = hasSpaceAvailable;
}

- (bool) hasSpaceAvailable {
    return _hasSpaceAvailable;
}

- (NSInteger) write:(const uint8_t*) buffer maxLength:(NSUInteger) len {
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    
    __block NSInteger bytesWritten = -1;
    
    dispatch_data_t dispatchedData = dispatch_data_create(buffer, len, dispatch_get_global_queue(QOS_CLASS_DEFAULT, 0), DISPATCH_DATA_DESTRUCTOR_DEFAULT);
    
    nw_connection_send($connection, dispatchedData, NW_CONNECTION_DEFAULT_MESSAGE_CONTEXT, false, ^(nw_error_t error) {
    
        if (error != nil) {
            self.streamStatus = NSStreamStatusError;
            self.streamError = [
                [NSError alloc]
                initWithDomain: @"BTFuseAPIServer"
                code: 0
                userInfo: @{
                    NSLocalizedDescriptionKey: @"Write Failure",
                    NSUnderlyingErrorKey: [self getNWError: error]
                }
            ];
            dispatch_semaphore_signal(semaphore);
            return;
        }
        
        bytesWritten = len;
        
        dispatch_semaphore_signal(semaphore);
    });
    
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    
    return bytesWritten;
}

- (void) setStreamError:(NSError*) streamError {
    _streamError = streamError;
}

- (NSError*) streamError {
    return _streamError;
}

- (NSError*) getNWError:(nw_error_t) nwError {
    return [BTFuseNWErrorFactory create: nwError];
}

- (void) setStreamStatus:(NSStreamStatus) status {
    _streamStatus = status;
}

- (NSStreamStatus) streamStatus {
    return _streamStatus;
}

- (void) close {
    [self setStreamStatus: NSStreamStatusClosed];
    nw_connection_cancel($connection);
}

@end
