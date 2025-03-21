
/*
Copyright 2023-2024 Breautek 

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

#ifndef BTFuseNativeViewOverlayBuilder_h
#define BTFuseNativeViewOverlayBuilder_h

#import <BTFuse/BTFuse.h>

@interface BTFuseNativeViewOverlayRectManager: NSObject

- (instancetype) init NS_DESIGNATED_INITIALIZER;

- (void) setRects:(NSString*) serializedRects;
- (NSArray*) getRects;

@end

@interface BTFuseNativeViewOverlayBuilder: NSObject

- (instancetype) init NS_UNAVAILABLE;
- (instancetype) init:(BTFuseContext*) context NS_DESIGNATED_INITIALIZER;

- (BTFuseContext*) getContext;

@end

#endif
