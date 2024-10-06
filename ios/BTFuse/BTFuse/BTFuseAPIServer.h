
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

#ifndef BTFuseAPIServer_h
#define BTFuseAPIServer_h

#import <BTFuse/BTFuseContext.h>
#import "BTFuseKeyPair.h"

extern const uint32_t BTFUSEAPISERVER_BUFFER_SIZE;

@interface BTFuseAPIServer: NSObject

- (instancetype) init NS_UNAVAILABLE;
- (instancetype) init:(BTFuseContext*) context;
- (int) getPort;
- (NSString*) getSecret;
- (BTFuseContext*) getContext;
- (BTFuseKeyPair*) getKeypair;

@end

#endif
