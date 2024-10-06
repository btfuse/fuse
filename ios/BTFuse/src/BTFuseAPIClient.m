
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
#import <BTFuse/BTFuseAPIClient.h>
#import "BTFuseAPIClientInputStream.h"
#import "BTFuseAPIClientOutputStream.h"
#import "BTFuseAPIServerHeaders.h"
#import <BTFuse/BTFuseIDGenerator.h>
#import "BTFuseNWErrorFactory.h"

@implementation BTFuseAPIClient {
    NSString* $ident;
    nw_connection_t $connection;
    BTFuseAPIClientInputStream* $input;
    BTFuseAPIClientOutputStream* $output;
    BTFuseAPIServerHeaders* $headers;
    nw_connection_state_t $connState;
    dispatch_queue_t $clientQueue;
    dispatch_semaphore_t $isReady;
}

- (instancetype) init:(nw_connection_t) connection {
    self = [super init];
    
    $isReady = dispatch_semaphore_create(0);
    
    BTFuseIDGenerator* idgen = [[BTFuseIDGenerator alloc] init];
    $ident = [idgen generate];
    
    $clientQueue = dispatch_queue_create("com.breautek.fuse.BTFuseAPIClient_ClientQueue", DISPATCH_QUEUE_SERIAL);
    
    $connection = connection;
    
    nw_connection_set_state_changed_handler(connection, ^(nw_connection_state_t state, nw_error_t _Nullable nwError) {
        if (nwError != nil) {
            NSError* error = [BTFuseNWErrorFactory create: nwError];
        
            NSLog(@"Error in State Change");
            NSLog(@"Error: %@", [error localizedDescription]);
            
            [self close];
            return;
        }
        
        self->$connState = state;
        
        if (state == nw_connection_state_ready) {
            dispatch_semaphore_signal(self->$isReady);
        }
    });
    
    nw_connection_start(connection);
    
    $input = [[BTFuseAPIClientInputStream alloc] init: $connection];
    $output = [[BTFuseAPIClientOutputStream alloc] init: $connection];
    
    return self;
}

- (NSString*) getID {
    return $ident;
}

- (NSInteger) write:(NSData*) buffer {
    return [$output write: [buffer bytes] maxLength: [buffer length]];
}

- (void) start:(void (^)(NSError* error)) completionBlock {
    dispatch_async($clientQueue, ^{
        dispatch_semaphore_wait(self->$isReady, DISPATCH_TIME_FOREVER);
        
        self->$headers = [self $parseHeaders];
        
        NSError* error = nil;
        
        if (self->$headers == nil) {
            error = [
                [NSError alloc]
                initWithDomain: @"BTFuseAPIClient"
                code: 0
                userInfo: @{
                    NSLocalizedDescriptionKey: @"Unable to parse HTTP headers"
                }
            ];
        }
        
        completionBlock(error);
    });
}

- (NSInputStream*) getInputStream {
    return $input;
}

- (NSOutputStream*) getOutputStream {
    return $output;
}

- (nw_connection_state_t) getConnectionState {
    return $connState;
}

- (NSString*) $readLine:(NSInputStream*) input {
    NSMutableData* buffer = [[NSMutableData alloc] init];
    uint8_t p = '\0';
    uint8_t c = '\0';

    while (true) {
        NSInteger bytesRead = [input read: &c maxLength:1];

        if (bytesRead <= 0) {
            [self close];
            break;
        }

        if (p == '\r' && c == '\n') {
            break;
        }

        if (c != '\r' && c != '\n') {
            [buffer appendBytes: &c length: sizeof(c)];
        }

        p = c;
    }

    if (buffer.length == 0) {
        return nil;
    }
    else {
        return [[NSString alloc] initWithData: buffer encoding: NSUTF8StringEncoding];
    }
}

- (BTFuseAPIServerHeaders*) $parseHeaders {
    BTFuseAPIServerHeaders* headers = [[BTFuseAPIServerHeaders alloc] init];
    
    NSInputStream* input = $input;
    
    NSString* initialLine = [self $readLine: input];
    if (initialLine == nil) {
        return nil;
    }
    
    NSArray<NSString*>* initParts = [initialLine componentsSeparatedByString:@" "];
    if (initParts.count < 3) {
        return nil;
    }
    
    [headers setMethod: [initParts objectAtIndex: 0]];
    [headers setPath: [initParts objectAtIndex: 1]];
    [headers setVersion: [initParts objectAtIndex: 2]];
    
    while (true) {
        NSString* line = [self $readLine: input];

        if (line == nil) {
            break;
        }
        
        NSArray<NSString*>* parts = [line componentsSeparatedByString:@":"];
        NSString* headerKey = [parts[0] stringByTrimmingCharactersInSet: NSCharacterSet.whitespaceAndNewlineCharacterSet];
        NSString* headerValue;
        
        if (parts.count > 2) {
            // There was additional : in the value
            headerValue = [line substringFromIndex:headerKey.length + 1];
        }
        else {
            headerValue = parts[1];
        }
        
        [headers setHeader:headerKey withValue:[headerValue stringByTrimmingCharactersInSet: NSCharacterSet.whitespaceAndNewlineCharacterSet]];
    }
    
    return headers;
}

- (NSString*) getHTTPHeader:(NSString*) name {
    return [$headers getHeader: name];
}

- (NSDictionary*) getHTTPHeaders {
    return [$headers getHeaders];
}

- (NSString*) getHTTPMethod {
    return [$headers getMethod];
}

- (NSString*) getHTTPVersion {
    return [$headers getVersion];
}

- (NSString*) getHTTPPath {
    return [$headers getPath];
}

- (void) close {
    [$input close];
    [$output close]; // closing the output stream also closes the connection
}

- (NSInteger) read:(NSMutableData*) buffer length:(uint32_t) length {
    NSUInteger totalBytesRead = 0;
    NSUInteger bytesRead = 0;
    
    [buffer setLength:length];
    
    NSUInteger bytesRequired = length;
    
    while (totalBytesRead < length) {
        uint8_t tempBuffer[bytesRequired];
        bytesRead = [$input read: tempBuffer maxLength: bytesRequired];
        if (bytesRead < 0) {
            return totalBytesRead;
        }
        
        [buffer replaceBytesInRange:NSMakeRange(totalBytesRead, bytesRead) withBytes:tempBuffer];
        totalBytesRead += bytesRead;
    }
    
    return totalBytesRead;
}

@end
