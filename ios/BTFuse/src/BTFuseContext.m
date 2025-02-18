
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
#import <BTFuseSchemeHandler.h>
#import <BTFuse/BTFusePlugin.h>
#import <BTFuseAPIRouter.h>
#import <BTFuse/BTFuseAPIPacket.h>
#import <BTFuse/BTFuseAPIResponse.h>
#import <BTFuse/BTFuseRuntime.h>
#import <BTFuse/BTFuseViewController.h>
#import <BTFuse/BTFuseAPIServer.h>
#import <BTFuse/BTFuse.h>
#import "BTFuseWebviewNavigationDelegate.h"

NSString* BTFUSECONTEXT_LOAD_CORE = @"FuseContext_Core";
NSString* BTFUSECONTEXT_LOAD_API_SERVER = @"FuseContext_API_Server";
NSString* BTFUSECONTEXT_LOAD_CORE_PLUGINS = @"FuseContext_Core_Plugins";
NSString* BTFUSECONTEXT_LOAD_WEBVIEW = @"FuseContext_Webview";

/**
    BTFuseContext is the main context file representing the runtime environment.
 */
@implementation BTFuseContext {
    NSMutableDictionary<NSString*, BTFusePlugin*>* $pluginMap;
    BTFuseAPIRouter* $apiRouter;
    BTFuseAPIResponseFactory* $responseFactory;
    BTFuseLogger* $logger;
    BTFuseAPIServer* $apiServer;
    id<BTFuseContextDelegate> $contextDelegate;
    BTFuseProgressContext* $loadProgress;
}

- (instancetype) init:(id<BTFuseContextDelegate>) delegate {
    self = [super init];
    
    $loadProgress = [[BTFuseProgressContext alloc] init];
    
    [$loadProgress createProgress: BTFUSECONTEXT_LOAD_CORE];
    [$loadProgress createProgress: BTFUSECONTEXT_LOAD_API_SERVER];
    [$loadProgress createProgress: BTFUSECONTEXT_LOAD_CORE_PLUGINS];
    [$loadProgress createProgress: BTFUSECONTEXT_LOAD_WEBVIEW];
    
    [$loadProgress set:BTFUSECONTEXT_LOAD_CORE          max: 1];
    [$loadProgress set:BTFUSECONTEXT_LOAD_API_SERVER    max: 1];
    [$loadProgress set:BTFUSECONTEXT_LOAD_CORE_PLUGINS  max: 1];
    [$loadProgress set:BTFUSECONTEXT_LOAD_WEBVIEW       max: 1];
    
    [$loadProgress addListener: self];
    
    $contextDelegate = delegate;
    $logger = [[BTFuseLogger alloc] init: self];
    
    NSBundle* bundle = [NSBundle bundleForClass: [BTFuseContext class]];
    NSString* version = [bundle objectForInfoDictionaryKey: @"CFBundleShortVersionString"];
    NSString* build = [bundle objectForInfoDictionaryKey: @"CFBundleVersion"];
    [$logger info:@"Fuse %@ (%@)", version, build];
    
    $responseFactory = [[BTFuseAPIResponseFactory alloc] init];
    $apiRouter = [[BTFuseAPIRouter alloc] init: self];
    $pluginMap = [[NSMutableDictionary alloc] init];
    
    [$loadProgress update: BTFUSECONTEXT_LOAD_CORE value: 1];
    
    [self registerPlugin:[[BTFuseRuntime alloc] init: self]];
    [$loadProgress update: BTFUSECONTEXT_LOAD_CORE_PLUGINS value: 1];
    
    return self;
}

- (void) initAPIServer {
    if ($apiServer != nil) return;
    
    $apiServer = [[BTFuseAPIServer alloc] init: self];
    [$loadProgress update: BTFUSECONTEXT_LOAD_API_SERVER value: 1];
}

- (void) onProgressContextUpdate:(id<BTFuseProgressContextProtocol>) progress {
    if ([progress isComplete]) {
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self->$contextDelegate onFuseLoad];
        });
    }
}

- (void) execCallback:(NSString*) callbackID withData:(NSString*) data {
    [$contextDelegate dispatchToWebview: callbackID withData: data];
}

- (void) execCallback:(NSString*) callbackID {
    [$contextDelegate dispatchToWebview: callbackID];
}

- (UIView*) getLayout {
    return [$contextDelegate getLayout];
}

- (WKWebView*) getWebview {
    return [$contextDelegate getWebview];
}

- (BTFuseAPIRouter*) getAPIRouter {
    return $apiRouter;
}

- (void) registerPlugin:(BTFusePlugin *)plugin {
    if ([$pluginMap objectForKey:[plugin getID]] != nil) {
        NSLog(@"A plugin is already registered for %@", [plugin getID]);
        return;
    }
    
    [$pluginMap setObject:plugin forKey:[plugin getID]];
}

- (BTFusePlugin*) getPlugin:(NSString*)pluginID {
    return [$pluginMap objectForKey:pluginID];
}

- (nonnull BTFuseAPIResponseFactory*) getResponseFactory {
    return $responseFactory;
}

- (void) setResponseFactory:(nonnull BTFuseAPIResponseFactory*) factory {
    $responseFactory = factory;
}

- (int) getAPIPort {
    return [$apiServer getPort];
}

- (NSString*) getAPISecret {
    return [$apiServer getSecret];
}

- (nonnull NSString*) getAPIKeyIdentifier {
    BTFuseKeyPair* kp = [$apiServer getKeypair];
    return [kp getIdentifier];
}

- (BTFuseLogger*) getLogger {
    return $logger;
}

- (nonnull id<WKNavigationDelegate>) createWebviewNavigationDelegate {
    return [[BTFuseWebviewNavigationDelegate alloc] init: self keypair: [$apiServer getKeypair]];
}

- (nonnull NSString*) getHost {
    return @"localhost";
}

- (nonnull BTFuseProgressContext*) getProgressContext {
    return $loadProgress;
}

- (void) onWebviewReady {
    [$loadProgress update: BTFUSECONTEXT_LOAD_WEBVIEW value: 1];
}

@end
