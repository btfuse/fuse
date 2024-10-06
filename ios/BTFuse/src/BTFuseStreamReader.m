
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
#import <BTFuse/BTFuseStreamReader.h>

const char* BTFUSE_FILESYSTEM_READER_QUEUE = "com.breautek.btfuse.Reader";

@implementation BTFuseStreamReader {
    NSInputStream* $stream;
    dispatch_semaphore_t $readSemaphore;
    NSError* $error;
}

- (instancetype) init:(NSInputStream*) stream {
    self = [super init];
    
    $stream = stream;
    $stream.delegate = self;
    $error = nil;
    $readSemaphore = dispatch_semaphore_create(0);
    
    return self;
}

- (void) stream:(NSStream*) stream handleEvent:(NSStreamEvent) event {
    if (stream != $stream) {
        return;
    }
    
    switch (event) {
        case NSStreamEventHasBytesAvailable:
        case NSStreamEventEndEncountered:
            dispatch_semaphore_signal($readSemaphore);
            break;
        case NSStreamEventErrorOccurred:
            NSLog(@"Stream encountered an error: %@", [stream streamError].localizedDescription);
            $error = [stream streamError];
            dispatch_semaphore_signal($readSemaphore);
            break;
        case NSStreamEventOpenCompleted:
        default: break;
    }
}

- (int64_t) read:(uint8_t*) buffer maxBytes:(uint32_t) max {
    if (!$stream.hasBytesAvailable && $stream.streamStatus != NSStreamEventEndEncountered) {
        dispatch_semaphore_wait($readSemaphore, DISPATCH_TIME_FOREVER);
    }
    
    if ($error != nil) {
        return -1;
    }
    
    return [$stream read: buffer maxLength: max];
}

- (void) dealloc {
    $stream = nil;
}

@end
