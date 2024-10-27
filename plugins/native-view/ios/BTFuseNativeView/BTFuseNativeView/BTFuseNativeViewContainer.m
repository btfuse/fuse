
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
#import <BTFuseNativeView/BTFuseNativeViewContainer.h>

@implementation BTFuseNativeViewContainerView {
    __weak BTFuseNativeViewOverlayRectManager* $rectManager;
}

- (void) setRectManager:(BTFuseNativeViewOverlayRectManager*) rectManager {
    $rectManager = rectManager;
}

- (UIView*) hitTest:(CGPoint) point withEvent:(UIEvent*) event {
    if (!$rectManager) {
        return [super hitTest: point withEvent: event];
    }
    
    if ([self.subviews count] > 1) {
        NSArray* rects = [$rectManager getRects];
        bool shouldDelegateToOverlay = false;
        
        for (NSDictionary* jRect in rects) {
            CGRect rect = [BTFuseNativeViewRect fromJSON: jRect];
            if (CGRectContainsPoint(rect, point)) {
                // Touch is within one of the rects, delegate to webView
                shouldDelegateToOverlay = true;
                break;
            }
        }
        
        if (shouldDelegateToOverlay) {
            return [[self.subviews lastObject] hitTest: point  withEvent: event];
        }
        else {
            UIView *nativeView = [self.subviews firstObject];
            CGPoint pointInNativeView = [self convertPoint:point toView:nativeView];
            return [nativeView hitTest:pointInNativeView withEvent:event];
        }
    }
        
    return [super hitTest: point withEvent: event];;
}

@end

@implementation BTFuseNativeViewContainer {
    BTFuseContext* $context;
    NSString* $ident;
    BTFuseNativeViewWebviewOverlayController* $overlayController;
}

- (instancetype) init:(BTFuseContext*) context {
    self = [self init:context withRect:CGRectMake(0.0f, 0.0f, 0.0f, 0.0f)];
    return self;
}

- (instancetype) init:(BTFuseContext*) context withRect:(CGRect) rect {
    self = [super init];
    
    $context = context;
    NSUUID *uuid = [NSUUID UUID];
    $ident = [uuid UUIDString];
    
    self.view.frame = rect;
    
    [self.view setBackgroundColor: [UIColor clearColor]];
//    [self setBackgroundColor: [UIColor redColor]];
    
    return self;
}

- (void) loadView {
    self.view = [[BTFuseNativeViewContainerView alloc] init];
}

- (NSString*) getID {
    return $ident;
}

- (void) setContent:(UIView*) view {
    [self.view insertSubview: view atIndex: 0];
}

- (void) setOverlay:(BTFuseNativeViewWebviewOverlayController*) overlayController {
    [self addChildViewController: overlayController];
    [self.view addSubview: overlayController.view];
    [(BTFuseNativeViewContainerView*)self.view setRectManager: [overlayController getRectManager]];
}

//- (void) touchesBegan:(NSSet<UITouch*>*)touches withEvent:(UIEvent*) event {
//    NSLog(@"Received touch event on container view");
//    [super touchesBegan:touches withEvent:event];
//}

@end
