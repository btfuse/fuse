
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

#import <BTFuseNativeView/BTFuseNativeViewPlugin.h>
#import <BTFuseNativeView/BTFuseNativeViewContainer.h>
#import <BTFuseNativeView/BTFuseNativeViewRect.h>
#import <BTFuseNativeView/BTFuseNativeViewOverlayBuilder.h>
#import <BTFuseNativeView/BTFuseNativeViewWebviewOverlay.h>
#import <BTFuseNativeView/BTFuseNativeViewRoot.h>
#import <CoreGraphics/CoreGraphics.h>

@implementation BTFuseNativeViewPlugin {
    NSMutableDictionary<NSString*, BTFuseNativeViewContainer*>* $views;
    BTFuseNativeViewRoot* $container;
}

- (instancetype) init:(BTFuseContext*) context {
    self = [super init: context];
    
    $views = [[NSMutableDictionary alloc] init];
    
    UIView* layout = [context getLayout];
    
    WKWebView* webview = [context getWebview];
    UIView* contentView = [webview.scrollView.subviews firstObject];
    $container = [[BTFuseNativeViewRoot alloc] initWithFrame: contentView.frame];
    $container.backgroundColor = [UIColor clearColor];
    $container.opaque = false;
    
    [
        webview.scrollView
        addObserver: self
        forKeyPath: @"contentSize"
        options: NSKeyValueObservingOptionNew | NSKeyValueObservingOptionOld | NSKeyValueObservingOptionInitial
        context: NULL
    ];
    
    $container.layer.name = @"BTFuseNativeViewPlugin Root Container";
    
    [layout addSubview: $container];
    
    return self;
}

- (void) observeValueForKeyPath:(NSString*) keyPath ofObject:(id) object change:(NSDictionary<NSKeyValueChangeKey,id>*) change context:(void*) context {
    if (![keyPath isEqualToString: @"contentSize"]) {
        return;
    }
    
    UIScrollView* view = (UIScrollView*) object;
    UIEdgeInsets insets = view.adjustedContentInset;
    CGRect frame = view.frame;
    
    CGRect containerFrame = CGRectMake(
        frame.origin.x + insets.left,
        frame.origin.y + insets.top,
        0.0f,
        0.0f
    );
    
    $container.frame = containerFrame;
}

- (NSString*) getID {
    return @"FuseNativeView";
}

- (void) initHandles {
    __weak BTFuseNativeViewPlugin* weakSelf = self;
    
    [self attachHandler:@"/create" callback:^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        NSError* error = nil;
        NSDictionary* params = [packet readAsJSONObject: &error];
        if (error != nil) {
            [response sendError:[[BTFuseError alloc] init:@"FuseNativeView" withCode: 0 withError: error]];
            return;
        }
        
        dispatch_async(dispatch_get_main_queue(), ^{
            [weakSelf $createView:params response:response];
        });
    }];
    
    [self attachHandler:@"/update" callback:^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        NSError* error = nil;
        NSDictionary* params = [packet readAsJSONObject: &error];
        if (error != nil) {
            [response sendError:[[BTFuseError alloc] init:@"FuseNativeView" withCode: 0 withError: error]];
            return;
        }
        
        dispatch_async(dispatch_get_main_queue(), ^{
            [weakSelf $updateView:params response:response];
        });
    }];
    
    [self attachHandler:@"/delete" callback:^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        NSString* viewID = [packet readAsString];
        
        dispatch_async(dispatch_get_main_queue(), ^{
            [weakSelf $deleteView:viewID response:response];
        });
    }];
}

- (void) $createView:(NSDictionary*) params response:(BTFuseAPIResponse*) response {
    NSDictionary* jRect = [params objectForKey: @"rect"];
    
    if (jRect == nil) {
        [response sendError: [[BTFuseError alloc] init:[self getID] withCode: 0 withMessage:@"Rect is required."]];
        return;
    };
    
    NSDictionary* options = [params objectForKey: @"options"];
    if (options == nil) {
        options = [[NSDictionary alloc] init];
    }
    
    NSString* overlayHTML = [options objectForKey: @"overlayHTML"];
    NSString* overlayFile = [options objectForKey: @"overlayFile"];
    
    BTFuseNativeViewWebviewOverlayBuilder* overlayBuilder = nil;
    
    if (overlayHTML != nil) {
        overlayBuilder = [[BTFuseNativeViewWebviewOverlayBuilder alloc] init: [self getContext]];
        [overlayBuilder setHTMLString: overlayHTML];
    }
    else if (overlayFile != nil) {
        overlayBuilder = [[BTFuseNativeViewWebviewOverlayBuilder alloc] init: [self getContext]];
        [overlayBuilder setFile: overlayFile];
    }
    
    CGRect rect = [BTFuseNativeViewRect fromJSON: jRect];
    
    BTFuseNativeViewContainer* containerController = [[BTFuseNativeViewContainer alloc] init: [self getContext] withRect: rect];
    
    if (overlayBuilder != nil) {
        BTFuseNativeViewWebviewOverlayController* overlayController = [overlayBuilder build];
//        [containerController addChildViewController: overlayController];
        overlayController.view.translatesAutoresizingMaskIntoConstraints = NO;
        [containerController setOverlay: overlayController];
//        [containerController.view addSubview: overlayController.view];
        
        [
            NSLayoutConstraint
            constraintWithItem: overlayController.view
            attribute: NSLayoutAttributeTop
            relatedBy: NSLayoutRelationEqual
            toItem: containerController.view
            attribute: NSLayoutAttributeTop
            multiplier:1.0
            constant:0.0
        ].active = YES;
        
        [
            NSLayoutConstraint
            constraintWithItem: overlayController.view
            attribute: NSLayoutAttributeBottom
            relatedBy: NSLayoutRelationEqual
            toItem: containerController.view
            attribute: NSLayoutAttributeBottom
            multiplier:1.0
            constant:0.0
        ].active = YES;
        
        [
            NSLayoutConstraint
            constraintWithItem: overlayController.view
            attribute: NSLayoutAttributeLeft
            relatedBy: NSLayoutRelationEqual
            toItem: containerController.view
            attribute: NSLayoutAttributeLeft
            multiplier:1.0
            constant:0.0
        ].active = YES;
        
        [
            NSLayoutConstraint
            constraintWithItem: overlayController.view
            attribute: NSLayoutAttributeRight
            relatedBy: NSLayoutRelationEqual
            toItem: containerController.view
            attribute: NSLayoutAttributeRight
            multiplier:1.0
            constant:0.0
        ].active = YES;
    }
    
    @synchronized ($views) {
        [$views setObject: containerController forKey: [containerController getID]];
    }
    [$container addSubview: containerController.view];
    
    [response sendString: [containerController getID]];
}

- (void) $updateView:(NSDictionary*) options response:(BTFuseAPIResponse*) response {
    NSString* nodeID = [options objectForKey:@"id"];
    
    if (nodeID == nil) {
        [response sendError: [[BTFuseError alloc] init:[self getID] withCode: 0 withMessage:@"id is required."]];
        return;
    }
    
    NSDictionary* jRect = [options objectForKey: @"rect"];
    
    if (jRect == nil) {
        [response sendError: [[BTFuseError alloc] init:[self getID] withCode: 0 withMessage:@"Rect is required."]];
        return;
    };
    
    BTFuseNativeViewContainer* viewController = nil;
    @synchronized($views) {
        viewController = [$views objectForKey: nodeID];
    }
    
    if (viewController == nil) {
        [response sendError: [[BTFuseError alloc] init:[self getID] withCode: 0 withMessage:@"View not found."]];
        return;
    }
    
    viewController.view.frame = [BTFuseNativeViewRect fromJSON: jRect];
    
    [response sendNoContent];
}

- (void) $deleteView:(NSString*) viewID response:(BTFuseAPIResponse*) response {
    BTFuseNativeViewContainer* nview = nil;
    @synchronized ($views) {
        nview = [$views objectForKey: viewID];
    }
    
    if (nview == nil) {
        BTFuseError* error = [
            [BTFuseError alloc]
            init: @"FuseNativeView"
            withCode: 0
            withMessage: [NSString stringWithFormat:@"No view found with \"%@\"", viewID]
        ];
        [response sendError: error];
        return;
    }
    
    @synchronized ($views) {
        [$views removeObjectForKey: viewID];
    }
    
    [nview.view removeFromSuperview];
    
    [response sendNoContent];
}

- (BTFuseNativeViewContainer*) getViewByID:(NSString*) viewID {
    BTFuseNativeViewContainer* container = nil;
    @synchronized ($views) {
        container = [$views objectForKey: viewID];
    }
    return container;
}

@end
