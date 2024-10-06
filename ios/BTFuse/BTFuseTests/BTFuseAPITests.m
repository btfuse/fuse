
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
#import <XCTest/XCTest.h>
#import <BTFuse/BTFuse.h>
#import <BTFuseTestTools/BTFuseTestTools.h>
#import <EchoPlugin.h>

@interface BTFuseAPITests : XCTestCase <BTFuseTestControllerDelegate> {
    BTFuseTestViewController* $viewController;
    BTFuseTestAPIClientBuilder* $apiBuilder;
    BTFuseTestSetupCompletionHandler $onSetupComplete;
}

@end

@implementation BTFuseAPITests

- (void) onContextReady:(BTFuseContext*) context {
    $apiBuilder = [[BTFuseTestAPIClientBuilder alloc] init];
    
    [context registerPlugin: [[EchoPlugin alloc] init: context]];
    
    $apiBuilder.apiPort = @([context getAPIPort]);
    $apiBuilder.apiSecret = [context getAPISecret];
    $apiBuilder.pluginID = @"echo";
    $apiBuilder.contentType = @"text/plain";
}

- (void) onBeforeWebviewLoad {}

- (void) onReady {
    $onSetupComplete(NULL);
}

- (void) setUpWithCompletionHandler:(BTFuseTestSetupCompletionHandler) completion {
    $viewController = [[BTFuseTestViewController alloc] init: self];
    [$viewController loadViewIfNeeded];
    $onSetupComplete = completion;
}

- (void) tearDown {
    $viewController = nil;
}

- (void) testSimpleEchoRequest {
    $apiBuilder.endpoint = @"/echo";
    $apiBuilder.data = [@"Hello Test!" dataUsingEncoding:NSUTF8StringEncoding];
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription:@"testSimpleEchoRequest"];
    
    [client execute:^(NSError * _Nullable error, BTFuseTestAPIClientResponse * _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData:response.data encoding:NSUTF8StringEncoding];
        XCTAssertTrue([payload isEqualToString:@"Hello Test!"], @"Payload should echo input");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testThreadedRequest {
    $apiBuilder.endpoint = @"/threadtest";
    $apiBuilder.data = [@"Hello Test!" dataUsingEncoding:NSUTF8StringEncoding];
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription:@"testThreadedRequest"];
    
    [client execute:^(NSError * _Nullable error, BTFuseTestAPIClientResponse * _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData:response.data encoding:NSUTF8StringEncoding];
        XCTAssertTrue([payload isEqualToString:@"Hello Test!"], @"Payload should echo input");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testStreamReader {
    $apiBuilder.endpoint = @"/echoWithReader";
    $apiBuilder.data = [@"Hello Test!" dataUsingEncoding:NSUTF8StringEncoding];
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription:@"testSimpleEchoRequest"];
    
    [client execute:^(NSError * _Nullable error, BTFuseTestAPIClientResponse * _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData:response.data encoding:NSUTF8StringEncoding];
        XCTAssertTrue([payload isEqualToString:@"Hello Test!"], @"Payload should echo input");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

@end
