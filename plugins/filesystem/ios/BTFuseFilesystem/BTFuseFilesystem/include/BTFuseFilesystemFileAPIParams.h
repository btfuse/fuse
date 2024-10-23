
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

#ifndef BTFuseFilesystemFileAPIParams_h
#define BTFuseFilesystemFileAPIParams_h

#import <BTFuse/BTFuse.h>

@interface BTFuseFilesystemFileAPIParams: NSObject

- (instancetype) init NS_UNAVAILABLE;
- (instancetype) init:(NSNumber*) headerContentLength data:(NSData*) data NS_DESIGNATED_INITIALIZER;

- (NSData*) getParams;
- (NSNumber*) getContentLength;
//+ (BTFuseFilesystemFileAPIParams*) parse:(NSNumber*) contentLengthHv input:(NSInputStream*) io error:(BTFuseError**) error;

@end

//typedef void (^BTFuseFilesystemFileAPIParamsParserCallback)(BTFuseFilesystemFileAPIParams* params, BTFuseError* error);

@interface BTFuseFilesystemFileAPIParamsParser: NSObject // <NSStreamDelegate>

- (instancetype) init NS_UNAVAILABLE;
//- (instancetype) init:(NSNumber*) contentLengthHv input:(NSInputStream*) io callback:(BTFuseFilesystemFileAPIParamsParserCallback) callback;
//- (void) parse;
+ (BTFuseFilesystemFileAPIParams*) parse:(NSNumber*) contentLengthHv chunkSize:(uint32_t) chunkSize reader:(BTFuseStreamReader*) io error:(BTFuseError**) error;

@end

#endif
