
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

#import <BTFuse/BTFuseAPIPacket.h>
#import <BTFuse/BTFuseContext.h>
#import <BTFuse/BTFuseLogger.h>
#import <BTFuse/BTFuseStreamReader.h>

const uint32_t BTFUSE_API_PACKET_BUFFER_SIZE = 1024 * 1024 * 4;

@implementation BTFuseAPIPacket {
    NSString* $route;
    BTFuseAPIClient* $client;
    NSDictionary* $headers;
    BTFuseContext* $context;
    BTFuseStreamReader* $reader;
}

- (instancetype) init:(BTFuseContext*) context route:(NSString*) route headers:(NSDictionary*) headers client:(BTFuseAPIClient*) client {
    self = [super init];
    
    $context = context;
    $route = route;
    $headers = headers;
    $client = client;
    $reader = [[BTFuseStreamReader alloc] init: [$client getInputStream]];
    
    return self;
}

- (NSString*) getRoute {
    return $route;
}

- (BTFuseAPIClient*) getClient {
    return $client;
}

- (uint64_t) getContentLength {
    NSString* value = [$headers valueForKey: @"Content-Length"];
    return value.longLongValue;
}

- (NSString*) getContentType {
    return [$headers valueForKey: @"Content-Type"];
}

- (NSString*) readAsString {
    NSData* data = [self readAsBinary];
    return [[NSString alloc] initWithData: data encoding: NSUTF8StringEncoding];
}

- (NSData*) readAsBinary {
    uint64_t contentLength = [self getContentLength];
    uint64_t totalBytesRead = 0;
    
    NSMutableData* data = [[NSMutableData alloc] init];
    
    uint32_t chunkSize = BTFUSE_API_PACKET_BUFFER_SIZE;
    if (chunkSize > contentLength) {
        chunkSize = (uint32_t) contentLength;
    }
    
    uint8_t buffer[chunkSize];
    int64_t bytesRead = 0;
    
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
        
        bytesRead = [$reader read: buffer maxBytes: bytesToRead];
        
        if (bytesRead == -1) {
            NSLog(@"Socket Read Error");
            return nil;
        }
        
        totalBytesRead += bytesRead;
        [data appendBytes: buffer length: bytesRead];
    }
    
    return data;
}

- (NSDictionary*) readAsJSONObject:(NSError**) error {
    NSData* data = [self readAsBinary];
    return [NSJSONSerialization JSONObjectWithData: data options:NSJSONReadingMutableContainers error: error];
}

- (NSArray*) readAsJSONArray:(NSError**) error {
    NSData* data = [self readAsBinary];
    return [NSJSONSerialization JSONObjectWithData: data options:NSJSONReadingMutableContainers error: error];
}

@end
