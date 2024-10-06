
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

#ifndef BTFuseContext_H
#define BTFuseContext_H

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>
#import <BTFuse/BTFuseAPIResponseFactory.h>
#import <BTFuse/BTFuseContextDelegate.h>

@class BTFuseViewController;
@class BTFusePlugin;
@class BTFuseAPIRouter;
@class BTFuseLogger;

@interface BTFuseContext: NSObject

- (nonnull instancetype) init NS_UNAVAILABLE;
//- (nonnull instancetype) init NS_DESIGNATED_INITIALIZER;
- (nonnull instancetype) init:(nonnull id<BTFuseContextDelegate>) delegate;
//- (nonnull instancetype) init:(nonnull BTFuseViewController*) controller NS_DESIGNATED_INITIALIZER;
- (nonnull BTFuseAPIResponseFactory*) getResponseFactory;
- (void) setResponseFactory:(nonnull BTFuseAPIResponseFactory*) factory;
- (nullable WKWebView*) getWebview;
- (nonnull UIView*) getLayout;
//- (nonnull BTFuseViewController*) getViewController;
- (void) registerPlugin:(nonnull BTFusePlugin*)plugin;
- (nonnull BTFusePlugin*) getPlugin:(nonnull NSString*)pluginID;
- (nonnull BTFuseAPIRouter*) getAPIRouter;
- (void) execCallback:(nonnull NSString*) callbackID withData:(nonnull NSString*) data;
- (void) execCallback:(nonnull NSString*) callbackID;
- (int) getAPIPort;
- (nonnull NSString*) getAPIKeyIdentifier;
- (nonnull NSString*) getAPISecret;
- (nonnull BTFuseLogger*) getLogger;
- (nonnull id<WKNavigationDelegate>) createWebviewNavigationDelegate;
- (nonnull NSString*) getHost;

@end

#endif
