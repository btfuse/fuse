
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

#import <BTFuse/BTFuseProgress.h>

@implementation BTFuseProgress {
    NSInteger $value;
    NSInteger $min;
    NSInteger $max;
    NSMutableArray<id<BTFuseProgressListenerProtocol>>* $listeners;
}

- (instancetype) init {
    self = [super init];
    
    $listeners = [[NSMutableArray alloc] init];
    $value = 0;
    $min = 0;
    $max = 100;
    
    return self;
}

- (instancetype) init:(NSInteger) value {
    self = [super init];
    
    $listeners = [[NSMutableArray alloc] init];
    $value = value;
    $min = 0;
    $max = 100;
    
    return self;
}

- (instancetype) init:(NSInteger) value min:(NSInteger) min max:(NSInteger) max {
    self = [super init];
    
    $listeners = [[NSMutableArray alloc] init];
    $value = value;
    $min = min;
    $max = max;
    
    return self;
}

- (void) setMax:(NSInteger) max {
    $max = max;
    [self $emit];
}

- (void) setMin:(NSInteger) min {
    $min = min;
    [self $emit];
}

- (void) setValue:(NSInteger) value {
    $value = value;
    [self $emit];
}

- (NSInteger) getMax {
    return $max;
}

- (NSInteger) getMin {
    return $min;
}

- (NSInteger) getValue {
    return $value;
}

- (void) reset {
    [self setValue: $min];
}

- (bool) isComplete {
    return $max == $value;
}

- (void) update:(NSInteger) value {
    [self update: value min: nil max: nil];
}

- (void) update:(NSInteger) value min:(NSNumber*) min max:(NSNumber*) max {
    if (min != nil) {
        $min = [min integerValue];
    }
    
    if (max != nil) {
        $max = [max integerValue];
    }
    
    $value = value;
    [self $emit];
}

- (float) getNormalizedValue {
    float min = (float) $min;
    float max = (float) $max;
    float value = (float) $value;
    
    return ((value - min) / (max - min));
}

- (void) addListener:(id<BTFuseProgressListenerProtocol>) listener {
    @synchronized ($listeners) {
        [$listeners addObject: listener];
    }
}

- (void) removeListener:(id<BTFuseProgressListenerProtocol>) listener {
    @synchronized ($listeners) {
        [$listeners removeObject: listener];
    }
}

- (void) $emit {
    NSArray<id<BTFuseProgressListenerProtocol>>* listeners = nil;
    @synchronized ($listeners) {
        listeners = [$listeners copy];
    }
    
    for (id<BTFuseProgressListenerProtocol> listener in listeners) {
        [listener onProgressUpdate: self];
    }
}

@end
