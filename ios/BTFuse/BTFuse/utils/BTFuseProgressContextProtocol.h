
/*
Copyright 2025 Breautek

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

#ifndef BTFuseProgressContextProtocol_h
#define BTFuseProgressContextProtocol_h

@protocol BTFuseProgressContextListenerProtocol;
@protocol BTFuseProgressContextProtocol <NSObject>

- (void) createProgress:(NSString* _Nonnull) ident;

- (NSInteger) getMax;
- (NSInteger) getValue;
- (void) set:(NSString* _Nonnull) ident max:(NSInteger) max;
- (void) set:(NSString* _Nonnull) ident value:(NSInteger) value;

- (bool) isComplete;
- (bool) isComplete:(NSString* _Nonnull) ident;

- (void) reset;

- (float) getNormalizedValue;

- (void) update:(NSString* _Nonnull) ident value:(NSInteger) value;
- (void) update:(NSString* _Nonnull) ident value:(NSInteger) value min:(nullable NSNumber*) min max:(nullable NSNumber*) max;

- (void) addListener:(_Nonnull id<BTFuseProgressContextListenerProtocol>) listener;
- (void) removeListener:(_Nonnull id<BTFuseProgressContextListenerProtocol>) listener;

@end

#endif
