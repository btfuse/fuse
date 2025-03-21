
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

#import <BTFuse/BTFuse.h>
#import <BTFuseNativeView/BTFuseNativeViewWebviewOverlay.h>
#import <BTFuseNativeView/BTFuseNativeViewWebviewOverlayController.h>

@implementation BTFuseNativeViewWebviewOverlayBuilder {
    NSString* $filepath;
    NSString* $html;
}

- (instancetype) init:(BTFuseContext*) context {
    self = [super init: context];
    
    $filepath = nil;
    $html = nil;
    
    return self;
}

- (void) setHTMLString:(NSString*) html {
    $html = html;
}

- (void) setFile:(NSString*) path {
    $filepath = path;
}

- (BTFuseNativeViewWebviewOverlayController*) build {
    if ($html == nil && $filepath == nil) {
        NSLog(@"Cannot build an overlay without HTML or a file path being set.");
        return nil;
    }
    
    BTFuseNativeViewWebviewOverlayController* overlayController = nil;
    
    if ($filepath != nil) {
        overlayController = [[BTFuseNativeViewWebviewOverlayController alloc] init: [self getContext] withPath: $filepath];
    }
    else {
        overlayController = [[BTFuseNativeViewWebviewOverlayController alloc] init: [self getContext] withHTML: $html];
    }
    
    return overlayController;
}

@end
