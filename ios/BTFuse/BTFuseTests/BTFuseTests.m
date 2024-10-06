
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

#import <XCTest/XCTest.h>
#import <BTFuse/BTFuse.h>
#import <BTFuseTestTools/BTFuseTestTools.h>

@interface BTFuseTests : XCTestCase <BTFuseTestControllerDelegate>  {
    BTFuseTestViewController* $viewController;
    BTFuseTestSetupCompletionHandler $onSetupComplete;
}
    
@end

@implementation BTFuseTests

- (void) onContextReady:(BTFuseContext*) context {}
- (void) onBeforeWebviewLoad {}
- (void) onReady {
    $onSetupComplete(NULL);
}

- (void) setUpWithCompletionHandler:(BTFuseTestSetupCompletionHandler) completion {
    $onSetupComplete = completion;
    $viewController = [[BTFuseTestViewController alloc] init: self];
    [$viewController loadViewIfNeeded];
}

- (void) tearDown {
    $viewController = nil;
}

- (void) testShouldHaveContext {
    BTFuseContext* context = [$viewController getContext];
    XCTAssertNotNil(context, @"BTFuseContext should not be nil");
}

- (void) testShouldHaveWebview {
    WKWebView* webview = [$viewController getWebview];
    XCTAssertNotNil(webview, @"WKWebView should not be nil");
}

- (void) testShouldHaveAPIPort {
    BTFuseContext* context = [$viewController getContext];
    int port = [context getAPIPort];
    XCTAssertTrue(port > 1024 && port < 65535, @"Fuse API Port should be > 1024 and < 65535");
}

- (void) testShouldHaveAPISecret {
    BTFuseContext* context = [$viewController getContext];
    NSString* secret = [context getAPISecret];
    XCTAssertNotNil(secret, @"API Fuse Secret should not be nil");
}

@end
