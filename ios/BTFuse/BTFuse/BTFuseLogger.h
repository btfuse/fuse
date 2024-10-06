
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

#ifndef BTFuseLogger_h
#define BTFuseLogger_h

#import <BTFuse/BTFuseLoggerLevel.h>

@class BTFuseContext;

@interface BTFuseLogger: NSObject

- (instancetype) init NS_UNAVAILABLE;
- (instancetype) init:(BTFuseContext*) context NS_DESIGNATED_INITIALIZER;

- (void) setLevel:(BTFuseLoggerLevel) level;
- (BTFuseLoggerLevel) getLevel;

- (void) setCallbackID:(NSString*) callbackID;

- (void) debug:(NSString*) format, ... NS_FORMAT_FUNCTION(1, 2);
- (void) info:(NSString*) format, ... NS_FORMAT_FUNCTION(1, 2);
- (void) warn:(NSString*) format, ... NS_FORMAT_FUNCTION(1, 2);
- (void) error:(NSString*) format, ... NS_FORMAT_FUNCTION(1, 2);

@end

#endif
