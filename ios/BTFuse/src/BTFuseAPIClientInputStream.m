
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
#import "BTFuseAPIClientInputStream.h"
#import "BTFuseNWErrorFactory.h"
#import "BTFuseAPIServer.h"

@implementation BTFuseAPIClientInputStream {
    __weak nw_connection_t $connection;
    NSMutableData* $buffer;
    bool $isCompleted;
    dispatch_semaphore_t $readSemaphore;
    bool _hasBytesAvailable;
    NSStreamStatus _streamStatus;
    NSError* _streamError;
    dispatch_queue_t $readQueue;
    id<NSStreamDelegate> _delegate;
}

@synthesize hasBytesAvailable;
@synthesize streamStatus;
@synthesize streamError;
@synthesize delegate;

- (instancetype) init:(nw_connection_t) connection {
    self = [super init];
    $buffer = [[NSMutableData alloc] initWithCapacity: BTFUSEAPISERVER_BUFFER_SIZE];
    
    $readQueue = dispatch_queue_create("com.breautek.fuse.BTFuseAPIInputStream_ReadQueue", DISPATCH_QUEUE_SERIAL);
    
    self.streamStatus = NSStreamStatusNotOpen;
    $connection = connection;
    
    $readSemaphore = dispatch_semaphore_create(0);
    
    self.streamStatus = NSStreamStatusOpening;
    
    dispatch_async($readQueue, ^{
        self.streamStatus = NSStreamStatusOpen;
        [self $readData];
    });
    
    return self;
}

- (uint32_t) $getAvailable {
    uint32_t availability = 0;
    
    NSUInteger length = [$buffer length];
    availability = BTFUSEAPISERVER_BUFFER_SIZE - (uint32_t)length;
    
    return availability;
}

- (void) $readData {
    nw_connection_receive($connection, 1, [self $getAvailable], ^(dispatch_data_t content, nw_content_context_t context, bool isComplete, nw_error_t error) {
    
        if (error != nil) {
            self.streamStatus = NSStreamStatusError;
            self.streamError = [
                [NSError alloc]
                initWithDomain: @"BTFuseAPIServer"
                code: 0
                userInfo: @{
                    NSLocalizedDescriptionKey: @"Read Failure",
                    NSUnderlyingErrorKey: [self getNWError: error]
                }
            ];
            return;
        }
        
        NSData* data = (NSData*)content;
        
        @synchronized (self->$buffer) {
            if (isComplete) {
                self->$isCompleted = true;
            }
            
            if ([data length] > 0) {
                [self setHasBytesAvailable:true];
            }
            
            [self->$buffer appendData: data];
        }
        
        dispatch_semaphore_signal(self->$readSemaphore);
        
        if (!isComplete) {
            dispatch_async(self->$readQueue, ^{
                [self $readData];
            });
        }
    });
}

- (NSError*) getNWError:(nw_error_t) nwError {
    return [BTFuseNWErrorFactory create: nwError];
}

- (NSInteger) read:(uint8_t*) buffer maxLength:(NSUInteger) len {
    streamStatus = NSStreamStatusReading;
    
    if (![self hasBytesAvailable]) {
        dispatch_semaphore_wait($readSemaphore, DISPATCH_TIME_FOREVER);
    }
    
    NSUInteger bytesRead = len;
    
    @synchronized (self->$buffer) {
        NSUInteger bufLength = [$buffer length];
        if (bytesRead > bufLength) {
            bytesRead = bufLength;
        }
        
        [$buffer getBytes: buffer length: bytesRead];
        
        NSRange expiredRange = NSMakeRange(0, bytesRead);
        [$buffer replaceBytesInRange: expiredRange withBytes: nil length: 0];
        
        NSUInteger newLength = bufLength - bytesRead;
        [$buffer setLength: newLength];
        
        [self setHasBytesAvailable: newLength > 0];
    }
    
    streamStatus = NSStreamStatusOpen;
    
    
    return bytesRead;
}

- (BOOL) getBuffer:(uint8_t* _Nullable*) buffer length:(NSUInteger*) len {
    return false;
}

- (BOOL) hasBytesAvailable {
    return _hasBytesAvailable;
}

- (void) setHasBytesAvailable:(BOOL) hasBytesAvailable {
    _hasBytesAvailable = hasBytesAvailable;
    if (hasBytesAvailable && self.delegate != nil) {
        [self.delegate stream: self handleEvent: NSStreamEventHasBytesAvailable];
    }
}

- (void) setStreamStatus:(NSStreamStatus) status {
    _streamStatus = status;
    if (self.delegate != nil) {
        switch (status) {
            case NSStreamStatusNotOpen:
            case NSStreamStatusOpening:
            case NSStreamStatusReading:
            case NSStreamStatusWriting:
            case NSStreamStatusClosed:
            case NSStreamStatusError:
                break;
            case NSStreamStatusOpen:
                [self.delegate stream: self handleEvent: NSStreamEventOpenCompleted];
                break;
            case NSStreamStatusAtEnd:
                [self.delegate stream: self handleEvent: NSStreamEventEndEncountered];
                break;
        }
    }
}

- (NSStreamStatus) streamStatus {
    return _streamStatus;
}

- (void) setStreamError:(NSError*) streamError {
    _streamError = streamError;
    if (self.delegate != nil) {
        [self.delegate stream: self handleEvent: NSStreamEventErrorOccurred];
    }
}

- (void) setDelegate:(id<NSStreamDelegate>) delegate {
    _delegate = delegate;
}

- (id<NSStreamDelegate>) delegate {
    return _delegate;
}

- (NSError*) streamError {
    return _streamError;
}

- (void) close {
    self->streamStatus = NSStreamStatusClosed;
}

@end
