
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
#import <BTFuseNativeView/BTFuseNativeViewWebviewOverlayController.h>
#import <BTFuseNativeView/BTFuseNativeViewOverlayBuilder.h>

@implementation BTFuseNativeViewWebviewOverlayController {
    BTFuseContext* $context;
    WKWebView* $webview;
    NSString* $path;
    NSString* $html;
    BTFuseNativeViewOverlayRectManager* $rectManager;
}

- (instancetype) init:(BTFuseContext*) context withPath:(NSString*) path {
    self = [super init];
    
    $context = context;
    $path = path;
    $html = nil;
    $webview = nil;
    $rectManager = [[BTFuseNativeViewOverlayRectManager alloc] init];
    
    return self;
}

- (instancetype) init:(BTFuseContext*) context withHTML:(NSString*) html {
    self = [super init];
    
    $context = context;
    $path = nil;
    $html = html;
    $webview = nil;
    $rectManager = [[BTFuseNativeViewOverlayRectManager alloc] init];
    
    return self;
}

- (WKWebView*) createWebview {
    WKWebViewConfiguration* config = [[WKWebViewConfiguration alloc] init];
    [config setURLSchemeHandler: [[BTFuseSchemeHandler alloc] init: $context] forURLScheme: @"btfuse"];
    
    WKUserContentController* domRectAPI = [[WKUserContentController alloc] init];
    [domRectAPI addScriptMessageHandler:self name:@"setDOMRects"];
    config.userContentController = domRectAPI;
    
    WKWebView* webview = [[WKWebView alloc] initWithFrame: self.view.bounds configuration: config];
    
    webview.navigationDelegate = self;
    
    webview.backgroundColor = [UIColor clearColor];
    webview.opaque = NO;
    
    #ifdef DEBUG
        if (@available(iOS 16.4, *)) {
            webview.inspectable = true;
        }
    #endif
    
    return webview;
}

- (void) viewDidLoad {

    $webview = [self createWebview];
    
    $webview.translatesAutoresizingMaskIntoConstraints = NO;
    
    [self.view addSubview: $webview];
    
    [
        NSLayoutConstraint
        constraintWithItem: $webview
        attribute: NSLayoutAttributeTop
        relatedBy: NSLayoutRelationEqual
        toItem: self.view
        attribute: NSLayoutAttributeTop
        multiplier:1.0
        constant:0.0
    ].active = YES;
    
    [
        NSLayoutConstraint
        constraintWithItem: $webview
        attribute: NSLayoutAttributeBottom
        relatedBy: NSLayoutRelationEqual
        toItem: self.view
        attribute: NSLayoutAttributeBottom
        multiplier:1.0
        constant:0.0
    ].active = YES;
    
    [
        NSLayoutConstraint
        constraintWithItem: $webview
        attribute: NSLayoutAttributeLeft
        relatedBy: NSLayoutRelationEqual
        toItem: self.view
        attribute: NSLayoutAttributeLeft
        multiplier:1.0
        constant:0.0
    ].active = YES;
    
    [
        NSLayoutConstraint
        constraintWithItem: $webview
        attribute: NSLayoutAttributeRight
        relatedBy: NSLayoutRelationEqual
        toItem: self.view
        attribute: NSLayoutAttributeRight
        multiplier:1.0
        constant:0.0
    ].active = YES;

    if ($path != nil) {
        NSString* endpoint = [NSString stringWithFormat: @"btfuse://%@%@", [$context getHost], $path];
        
        NSLog(@"Loading Overlay: %@", endpoint);
        
        NSURL* url = [NSURL URLWithString: endpoint];
        NSURLRequest* request = [NSURLRequest requestWithURL: url];
        [$webview loadRequest: request];
    }
    else if ($html != nil) {
        NSLog(@"TODO: Load from inline HTML");
    }
    else {
        NSLog(@"Native View Overlay loaded with no file or HTML set.");
    }
}

- (WKWebView*) getWebview {
    return $webview;
}

- (void) webView:(WKWebView*) webview didFinishNavigation:(WKNavigation*) navigation {
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSBundle* bundle = [NSBundle bundleWithIdentifier: @"com.breautek.fuse.BTFuseNativeView"];
        if (bundle == nil) {
            NSLog(@"Error: Cannot find Native View Framework Bundle.");
            return;
        }
        
        NSURL* jsAPIFile = [bundle URLForResource: @"BTFuseNativeViewOverlay" withExtension: @"js" subdirectory: @"assets"];
        
        if (!jsAPIFile) {
            NSLog(@"Error: BTFuseNativeViewOverlay.js not found.");
            return;
        }
        
        NSError* error = nil;
        NSString* jsAPI = [NSString stringWithContentsOfURL: jsAPIFile encoding: NSUTF8StringEncoding error: &error];
        if (error != nil) {
            NSLog(@"Error: Reading BTFuseNativeViewOverlay.js");
            return;
        }
        
        dispatch_async(dispatch_get_main_queue(), ^{
            [webview evaluateJavaScript: jsAPI completionHandler: nil];
        });
    });
}

- (void) userContentController:(WKUserContentController*) userContentController didReceiveScriptMessage:(WKScriptMessage*) message {
    if (![message.name isEqualToString:@"setDOMRects"]) {
        return;
    }
    
    [$rectManager setRects: message.body];
}

- (BTFuseNativeViewOverlayRectManager*) getRectManager {
    return $rectManager;
}

@end
