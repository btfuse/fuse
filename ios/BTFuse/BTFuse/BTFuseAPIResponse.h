
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

#ifndef BTFuseAPIResponse_h
#define BTFuseAPIResponse_h

#import <WebKit/WebKit.h>
#import <BTFuse/BTFuseError.h>
#import <mach/mach_time.h>
#import <BTFuse/BTFuseAPIClient.h>

@class BTFuseContext;

typedef NS_ENUM(NSUInteger, BTFuseAPIResponseStatus) {
    BTFuseAPIResponseStatusOk = 200,
    BTFuseAPIResponseStatusError = 400,
    BTFuseAPIResponseStatusInternalError = 500
};

@interface BTFuseAPIResponse: NSObject

- (instancetype) init NS_UNAVAILABLE;
- (instancetype) init:(BTFuseContext*) context client:(BTFuseAPIClient*) client NS_DESIGNATED_INITIALIZER;

// Header APIs
- (void) setStatus:(NSUInteger) status;
- (NSString*) getStatusText:(NSUInteger) status;
- (void) setContentLength:(NSUInteger) length;
- (void) setContentType:(NSString*) contentType;
- (void) didFinishHeaders;
- (void) finishHeaders:(NSUInteger) status withContentType:(NSString*) contentType withContentLength:(NSUInteger) contentLength;

// Data APIs
- (void) pushData:(NSData*) data;
- (void) didFinish;

- (void) didInternalError;
- (bool) isClosed;

// Convenience methods, if you don't need to chunk data
- (void) sendString:(NSString*) data;
- (void) sendData:(NSData*) data;
- (void) sendData:(NSDate*) data withType:(NSString*) type;
- (void) sendJSON:(NSDictionary*) data;
- (void) sendNoContent;
- (void) sendError:(BTFuseError*) error;

- (void) kill:(NSString*) message;

@end

#endif
