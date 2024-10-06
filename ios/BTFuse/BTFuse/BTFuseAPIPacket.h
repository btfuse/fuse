
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

#ifndef BTFuseAPIPacket_h
#define BTFuseAPIPacket_h

#import <Foundation/Foundation.h>
#import <BTFuse/BTFuseAPIClient.h>

@class BTFuseContext;

@interface BTFuseAPIPacket: NSObject

- (instancetype) init NS_UNAVAILABLE;
- (instancetype) init:(BTFuseContext*) context route:(NSString*) route headers:(NSDictionary*) headers client:(BTFuseAPIClient*) client NS_DESIGNATED_INITIALIZER;

- (NSString*) getRoute;
- (BTFuseAPIClient*) getClient;
- (uint64_t) getContentLength;
- (NSString*) getContentType;

/**
    Reads the packet as a string.
    Do not call on the main thread.
 */
- (NSString*) readAsString;

/**
    Reads the packet as binary.
    Do not call on the main thread.
 */
- (NSData*) readAsBinary;

/**
    Reads the packet as a JSON/Dictionary object.
    Do not call on the main thread.
 */
- (NSDictionary*) readAsJSONObject:(NSError**) error;

/**
    Reads the packet as an array.
    Do not call on the main thread.
 */
- (NSArray*) readAsJSONArray:(NSError**) error;

@end

#endif
