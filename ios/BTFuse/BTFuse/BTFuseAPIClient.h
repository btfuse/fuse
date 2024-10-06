
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

#ifndef BTFuseAPIClient_h
#define BTFuseAPIClient_h

#import <Foundation/Foundation.h>
#import <Network/Network.h>

@interface BTFuseAPIClient: NSObject

- (instancetype) init NS_UNAVAILABLE;
- (instancetype) init:(nw_connection_t) connection NS_DESIGNATED_INITIALIZER;

- (NSInputStream*) getInputStream;
- (NSOutputStream*) getOutputStream;

- (NSInteger) write:(NSData*) buffer;
- (NSInteger) read:(NSMutableData*) buffer length:(uint32_t) length;

- (void) start:(void (^)(NSError* error)) completionBlock;

- (NSString*) getID;

- (void) close;

/**
  States indicating whether a connection can be used to send and receive data.
  Can be one of:
    - nw_connection_state_invalid
    The connection is not valid.
    
    - nw_connection_state_waiting
    The connection is waiting for a network path change.
    
    - nw_connection_state_preparing
    The connection in the process of being established.
    
    - nw_connection_state_ready
    The connection is established, and ready to send and receive data.
    
    - nw_connection_state_failed
    The connection has disconnected or encountered an error.
    
    - nw_connection_state_cancelled
    The connection has been canceled.
 */
- (nw_connection_state_t) getConnectionState;

- (NSString*) getHTTPHeader: (NSString*) name;
- (NSDictionary*) getHTTPHeaders;
- (NSString*) getHTTPVersion;
- (NSString*) getHTTPMethod;
- (NSString*) getHTTPPath;

@end

#endif
