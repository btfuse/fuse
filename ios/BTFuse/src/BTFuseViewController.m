
/*
Copyright 2023 Breautek

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
#import <BTFuse/BTFuseContext.h>
#import <BTFuse/BTFuseViewController.h>
#import <BTFuse/BTFuseSchemeHandler.h>
#import <BTFuse/BTFuseWebviewUIDelegation.h>
#import "BTFuseWebviewNavigationDelegate.h"
#import "BTFuseAPIServer.h"
#import <BTFuse/BTFuseLogger.h>
#import <BTFuse/BTFuseLoggerLevel.h>

@implementation BTFuseViewController {
    BTFuseContext* $context;
    WKWebView* $webview;
    BTFuseWebviewUIDelegation* $webviewUIDelegation;
    BTFuseWebviewNavigationDelegate* $webviewNavigationDelegation;
    id<BTFuseViewControllerDelegate> $delegate;
}

- (instancetype) init:(id<BTFuseViewControllerDelegate>) delegate {
    self = [super init];
    
    $delegate = delegate;
    $webview = nil;
    $context = nil;
    $webviewUIDelegation = nil;
    $webviewNavigationDelegation = nil;
    
    return self;
}

- (void) dispatchToWebview:(NSString*) callbackID {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSString* js = [[NSString alloc] initWithFormat:@"window.__btfuse_doCallback(\"%@\");", callbackID];
        [self->$webview evaluateJavaScript:js completionHandler:nil];
    });
}

- (void) dispatchToWebview:(NSString*) callbackID withData:(NSString*) data {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSString* escapedData = [[data stringByReplacingOccurrencesOfString:@"\"" withString:@"\\\""] stringByReplacingOccurrencesOfString:@"\n" withString:@"\\n"];
        NSString* js = [[NSString alloc] initWithFormat:@"window.__btfuse_doCallback(\"%@\",\"%@\");", callbackID, escapedData];
        [self->$webview evaluateJavaScript:js completionHandler:nil];
    });
}

- (void) viewDidLoad {
    [super viewDidLoad];
    
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
        self->$context = [[BTFuseContext alloc] init: self];
        
        [self->$delegate onContextReady];
        
        dispatch_async(dispatch_get_main_queue(), ^ {
            self->$webviewUIDelegation = [[BTFuseWebviewUIDelegation alloc] init];
            self->$webviewNavigationDelegation = [self->$context createWebviewNavigationDelegate];
            
            WKWebViewConfiguration* configuration = [[WKWebViewConfiguration alloc] init];
            [configuration.userContentController addScriptMessageHandlerWithReply: self contentWorld: WKContentWorld.pageWorld name:@"getAPIPort"];
            [configuration.userContentController addScriptMessageHandlerWithReply: self contentWorld: WKContentWorld.pageWorld name:@"getAPISecret"];
            [configuration.userContentController addScriptMessageHandler: self name:@"log"];
            [configuration.userContentController addScriptMessageHandler: self name:@"setLogCallback"];

            NSString* fuseBuildTag = @"Release";
            #ifdef DEBUG
                fuseBuildTag = @"Debug";
            #endif
            // TODO: Pull Version information somehow
            configuration.applicationNameForUserAgent = [NSString stringWithFormat:@"FuseRuntime (%@ %@ Build", @"0.0.0", fuseBuildTag];

            //TODO: pass the configuration object to a overridable method to give a chance for application-level configuration
            [configuration setURLSchemeHandler: [
                [BTFuseSchemeHandler alloc] init: self->$context]
                forURLScheme: @"BTfuse"
            ];
            
            self->$webview = [[WKWebView alloc] initWithFrame: CGRectZero configuration: configuration];
            self->$webview.UIDelegate = self->$webviewUIDelegation;
            self->$webview.navigationDelegate = self->$webviewNavigationDelegation;
            
            [self addChildViewController: self->$webviewUIDelegation];
            [self.view addSubview: self->$webviewUIDelegation.view];
            [self->$webviewUIDelegation didMoveToParentViewController: self];
            
            // Calculate or determine the desired frame
            CGRect webviewFrame = CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height);
            
            // Set the frame for the WKWebView
            self->$webview.frame = webviewFrame;
            
            [self->$delegate onWebviewReady];
            
            // Add the WKWebView as a subview
            [self.view addSubview: self->$webview];
            
            [self->$delegate onBeforeWebviewLoad];
            NSURL* url = [NSURL URLWithString: [NSString stringWithFormat: @"btfuse://%@/assets/index.html", [self->$context getHost]]];
            NSURLRequest* request = [NSURLRequest requestWithURL:url];
            [self->$webview loadRequest:request];
        });
    });
}

- (void) attach:(UIViewController*) controller {
    [controller addChildViewController: self];
    [controller.view addSubview: self.view];
    [self didMoveToParentViewController: controller];
}


- (WKWebView*) getWebview {
    return $webview;
}

- (UIView*) getLayout {
    return self.view;
}

- (BTFuseContext*) getContext {
    return $context;
}

- (void) userContentController:(WKUserContentController*) userContentController didReceiveScriptMessage:(WKScriptMessage*) message {
    if ([message.name isEqualToString:@"log"] /* && [message.body isKindOfClass:[NSString class]]*/) {
        if ([message.body isKindOfClass:[NSArray class]]) {
            NSArray* logArgs = message.body;
            if ([logArgs count] < 2) {
                NSLog(@"Received log from webview but with invalid arguments.");
            }
            
            BTFuseLoggerLevel level = [[logArgs objectAtIndex: 0] unsignedIntValue];
            NSString* levelLabel = BTFuseLoggerLevel_toString(level);
            NSString* content = [logArgs objectAtIndex: 1];
            
            NSLog(@"[%@]: %@", levelLabel, content);
        }
        else {
            NSLog(@"Received log from webview but with invalid arguments.");
        }
    }
    else if ([message.name isEqualToString:@"setLogCallback"]) {
        if ([message.body isKindOfClass:[NSString class]]) {
            NSString* callbackID = message.body;
            [[$context getLogger] setCallbackID: callbackID];
        }
    }
}

- (void)    userContentController:(WKUserContentController*) userContentController
            didReceiveScriptMessage:(WKScriptMessage*) message
            replyHandler:(void (^)(id _Nullable, NSString* _Nullable)) replyHandler
{
    if ([message.name isEqualToString:@"getAPIPort" ]) {
        int port = [$context getAPIPort];
        replyHandler([[NSNumber alloc] initWithInt:port], nil);
        return;
    }
    else if ([message.name isEqualToString:@"getAPISecret"]) {
        NSString* secret = [$context getAPISecret];
        replyHandler(secret, nil);
        return;
    }
    
    replyHandler(nil, @"Unhandled Script");
}

@end
