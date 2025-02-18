
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

#import <Foundation/Foundation.h>

#import <BTFuse/BTFuseProgressContext.h>
#import <BTFuse/BTFuseProgress.h>
#import <BTFuse/BTFuseWeightedResolutionStrategy.h>

@implementation BTFuseProgressContext {
    NSMutableArray<id<BTFuseProgressContextListenerProtocol>>* $listeners;
    NSMutableDictionary* $pmap;
    id<BTFuseProgressResolutionStrategyProtocol> $resolutionStrategy;
}

- (instancetype) init {
    self = [super init];
    
    $listeners = [[NSMutableArray alloc] init];
    $pmap = [[NSMutableDictionary alloc] init];
    $resolutionStrategy = [[BTFuseWeightedResolutionStrategy alloc] init];
    
    return self;
}

- (void) setResolutionStrategy:(id<BTFuseProgressResolutionStrategyProtocol>) strategy {
    $resolutionStrategy = strategy;
}

- (id<BTFuseProgressResolutionStrategyProtocol>) getResolutionStrategy {
    return $resolutionStrategy;
}

- (void) onProgressUpdate:(_Nonnull id<BTFuseProgressProtocol>) progress {
    [self $emit];
}

- (void) $emit {
    NSArray<id<BTFuseProgressContextListenerProtocol>>* listeners = nil;
    @synchronized ($listeners) {
        listeners = [$listeners copy];
    }
    
    for (id<BTFuseProgressContextListenerProtocol> listener in listeners) {
        [listener onProgressContextUpdate: self];
    }
}

- (void) createProgress:(NSString*) ident {
    @synchronized ($pmap) {
        BTFuseProgress* p = [[BTFuseProgress alloc] init];
        [$pmap setObject: p forKey: ident];
        [p addListener: self];
    }
}

- (NSInteger) getMax {
    NSInteger max = 0;
    
    @synchronized ($pmap) {
        for (NSString* ident in $pmap) {
            BTFuseProgress* p = [$pmap objectForKey: ident];
            max += [p getMax];
        }
    }
    
    return max;
}

- (NSInteger) getValue {
    NSInteger value = 0;
    
    @synchronized ($pmap) {
        for (NSString* ident in $pmap) {
            BTFuseProgress* p = [$pmap objectForKey: ident];
            value += [p getValue];
        }
    }
    
    return value;
}

- (void) reset {
    @synchronized ($pmap) {
        for (NSString* ident in $pmap) {
            BTFuseProgress* p = [$pmap objectForKey: ident];
            [p reset];
        }
    }
}

- (float) getNormalizedValue {
    NSArray* progresses = nil;
    @synchronized ($pmap) {
        progresses = [$pmap allValues];
    }
    
    return [$resolutionStrategy execute: progresses];
}

- (void) update:(NSString* _Nonnull) ident value:(NSInteger) value {
    [self update: ident value: value min: 0 max: nil];
}

- (void) update:(NSString* _Nonnull) ident value:(NSInteger) value min:(nullable NSNumber*) min max:(nullable NSNumber*) max {
    BTFuseProgress* progress = nil;
    @synchronized ($pmap) {
        progress = [$pmap objectForKey: ident];
    }
    
    [progress update: value min: 0 max: max];
}

- (void) set:(NSString*) ident max:(NSInteger) max {
    BTFuseProgress* progress = nil;
    @synchronized ($pmap) {
        progress = [$pmap objectForKey: ident];
    }
    [progress setMax: max];
}

- (void) set:(NSString*) ident value:(NSInteger) value {
    BTFuseProgress* progress = nil;
    @synchronized ($pmap) {
        progress = [$pmap objectForKey: ident];
    }
    [progress setValue: value];
}

- (void) addListener:(id<BTFuseProgressContextListenerProtocol>) listener {
    @synchronized ($listeners) {
        [$listeners addObject: listener];
    }
    
    [listener onProgressContextUpdate: self];
}

- (void) removeListener:(id<BTFuseProgressContextListenerProtocol>) listener {
    @synchronized ($listeners) {
        [$listeners removeObject: listener];
    }
}

- (bool) isComplete:(NSString*) ident {
    BTFuseProgress* progress = nil;
    @synchronized ($pmap) {
        progress = [$pmap objectForKey: ident];
    }
    
    return [progress isComplete];
}

- (bool) isComplete {
    @synchronized ($pmap) {
        for (NSString* ident in $pmap) {
            BTFuseProgress* p = [$pmap objectForKey: ident];
            if (![p isComplete]) {
                return false;
            }
        }
    }
    return true;
}

@end
