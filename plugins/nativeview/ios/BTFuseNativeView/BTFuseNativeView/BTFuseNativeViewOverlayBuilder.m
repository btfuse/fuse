
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

#import <Foundation/Foundation.h>
#import <BTFuseNativeView/BTFuseNativeViewOverlayBuilder.h>

@implementation BTFuseNativeViewOverlayRectManager {
    NSArray* $rects;
}

- (instancetype) init {
    self = [super init];
    
    $rects = [[NSArray alloc] init];
    
    return self;
}

- (void) setRects:(NSString*) serializedRects {
    NSError* error = nil;
    NSData* data = [serializedRects dataUsingEncoding:NSUTF8StringEncoding];
    NSArray* rects = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &error];
    
    if (error != nil) {
        NSLog(@"Unable to read serialized rects: %@", [error localizedDescription]);
        return;
    }
    
    @synchronized ($rects) {
        $rects = rects;
    }
}

- (NSArray*) getRects {
    NSArray* mc;
    @synchronized ($rects) {
        mc = [$rects copy];
    }
    return mc;
}

@end

@implementation BTFuseNativeViewOverlayBuilder {
    BTFuseContext* $context;
    BTFuseNativeViewOverlayRectManager* $rectManager;
}

- (instancetype) init:(BTFuseContext*) context {
    self = [super init];
    
    $context = context;
    $rectManager = [[BTFuseNativeViewOverlayRectManager alloc] init];
    
    return self;
}

- (BTFuseContext*) getContext {
    return $context;
}

@end
