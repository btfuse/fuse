
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
}

- (instancetype) init:(id<BTFuseContextDelegate>) delegate {
    self = [super init];
    
    $contextDelegate = delegate;
    $logger = [[BTFuseLogger alloc] init: self];
    
    NSBundle* bundle = [NSBundle bundleForClass: [BTFuseContext class]];
    NSString* version = [bundle objectForInfoDictionaryKey: @"CFBundleShortVersionString"];
    NSString* build = [bundle objectForInfoDictionaryKey: @"CFBundleVersion"];
    [$logger info:@"Fuse %@ (%@)", version, build];
    
    $apiServer = [[BTFuseAPIServer alloc] init: self];
    
    $responseFactory = [[BTFuseAPIResponseFactory alloc] init];
    $apiRouter = [[BTFuseAPIRouter alloc] init: self];
    $pluginMap = [[NSMutableDictionary alloc] init];
    
    [self registerPlugin:[[BTFuseRuntime alloc] init: self]];
    
    return self;
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

@end
