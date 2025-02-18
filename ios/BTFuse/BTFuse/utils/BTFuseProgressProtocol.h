
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

#ifndef BTFuseProgressProtocol_h
#define BTFuseProgressProtocol_h

@protocol BTFuseProgressListenerProtocol;
@protocol BTFuseProgressProtocol

- (NSInteger) getMin;
- (NSInteger) getMax;
- (NSInteger) getValue;

- (void) setMin:(NSInteger) min;
- (void) setMax:(NSInteger) max;
- (void) setValue:(NSInteger) value;

- (bool) isComplete;

- (void) reset;

- (float) getNormalizedValue;

- (void) update:(NSInteger) value;
- (void) update:(NSInteger) value min:(nullable NSNumber*) min max:(nullable NSNumber*) max;

- (void) addListener:(_Nonnull id<BTFuseProgressListenerProtocol>) listener;
- (void) removeListener:(_Nonnull id<BTFuseProgressListenerProtocol>) listener;

@end

#endif
