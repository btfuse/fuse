
/*
Copyright Breautek

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

#import <BTFuse/BTFuse.h>
#import <BTFuseTestTools/BTFuseTestTools.h>
#import <BTFuseFilesystem/BTFuseFilesystem.h>
#import <XCTest/XCTest.h>

@interface BTFuseFilesystemTests : XCTestCase <BTFuseTestControllerDelegate> {
    BTFuseTestViewController* $viewController;
    BTFuseTestAPIClientBuilder* $apiBuilder;
    BTFuseTestSetupCompletionHandler $onSetupComplete;
    NSString* $testDataPath;
}

@end

@implementation BTFuseFilesystemTests

- (void) onBeforeWebviewLoad {}

- (void) onContextReady:(BTFuseContext*) context {
    $apiBuilder = [[BTFuseTestAPIClientBuilder alloc] init];
    
    [context registerPlugin: [[BTFuseFilesystemPlugin alloc] init: context]];
    
    $apiBuilder.apiPort = @([context getAPIPort]);
    $apiBuilder.apiSecret = [context getAPISecret];
    $apiBuilder.pluginID = @"FuseFilesystem";
    $apiBuilder.contentType = @"text/plain";
}

- (void) onReady {
    $onSetupComplete(NULL);
}

- (void) setUpWithCompletionHandler:(BTFuseTestSetupCompletionHandler) completion {
    $viewController = [[BTFuseTestViewController alloc] init: self];
    [$viewController loadViewIfNeeded];
    
    NSArray* paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString* documentsDirectory = [paths firstObject];
    
    $testDataPath = [documentsDirectory stringByAppendingPathComponent:@"testData"];
    
    NSFileManager* fileManager = [NSFileManager defaultManager];
    [fileManager createDirectoryAtPath: $testDataPath withIntermediateDirectories: false attributes:nil error: nil];
    
    [self createFileForTypeTest];
    [self createFileForSizeTest];
    [self createFileForReadTest];
    [self createFileForTruncateTest: @"1"];
    [self createFileForTruncateTest: @"2"];
    [self createFileForAppendTest: @"1"];
    [self createFileForWriteTest: @"1"];
    [self createFileForWriteTest: @"2"];
    [self createFileForDeleteTest: @"1"];
    [self createFileForRecursiveDeleteTest];
    [self createFileForExistTest];
    
    $onSetupComplete = completion;
}

- (void) tearDown {
    $viewController = nil;
    
    NSFileManager* fileManager = [NSFileManager defaultManager];
    NSError* error = nil;
    [fileManager removeItemAtPath: $testDataPath error: &error];
    
    if (error != nil) {
        NSLog(@"Error at cleaning test data directory: %@", error);
    }
}

#pragma mark Setup APIs

- (void) createFileForTypeTest {
    NSString* filePath = [$testDataPath stringByAppendingPathComponent:@"fileForTypeTest"];

    NSFileManager* fileManager = [NSFileManager defaultManager];
    
    [fileManager removeItemAtPath: filePath error: nil];
    
    if (![fileManager createFileAtPath:filePath contents:nil attributes:nil]) {
        NSLog(@"Failed to create file type test file");
    }
}

- (void) createFileForSizeTest {
    NSString* filePath = [$testDataPath stringByAppendingPathComponent:@"fileForSizeTest"];
    
    NSMutableData* data = [[NSMutableData alloc] initWithLength: 512];

    NSFileManager* fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtPath: filePath error: nil];
    if (![fileManager createFileAtPath:filePath contents: data attributes:nil]) {
        NSLog(@"Failed to create file type test file");
    }
}

- (void) createFileForReadTest {
    NSString* filePath = [$testDataPath stringByAppendingPathComponent:@"fileForReadTest"];
    
    NSMutableData* data = [[NSMutableData alloc] initWithData: [@"Hello Test File!" dataUsingEncoding:NSUTF8StringEncoding]];

    NSFileManager* fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtPath: filePath error: nil];
    if (![fileManager createFileAtPath:filePath contents: data attributes:nil]) {
        NSLog(@"Failed to create file read test file");
    }
}

- (void) createFileForExistTest {
    NSString* filePath = [$testDataPath stringByAppendingPathComponent:@"fileForExistTest"];
    
    NSMutableData* data = [[NSMutableData alloc] initWithData: [@"Hello Test File!" dataUsingEncoding:NSUTF8StringEncoding]];

    NSFileManager* fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtPath: filePath error: nil];
    if (![fileManager createFileAtPath:filePath contents: data attributes:nil]) {
        NSLog(@"Failed to create file read test file");
    }
}

- (void) createFileForAppendTest:(NSString*) ident {
    NSString* filePath = [[$testDataPath stringByAppendingPathComponent:@"fileForAppendTest"] stringByAppendingString: ident];
    
    NSMutableData* data = [[NSMutableData alloc] initWithData: [@"Hello Test File!" dataUsingEncoding:NSUTF8StringEncoding]];

    NSFileManager* fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtPath: filePath error: nil];
    if (![fileManager createFileAtPath:filePath contents: data attributes:nil]) {
        NSLog(@"Failed to create file read test file");
    }
}

- (void) createFileForTruncateTest:(NSString*) ident {
    NSString* filePath = [[$testDataPath stringByAppendingPathComponent:@"fileForTruncateTest"] stringByAppendingString: ident];
    
    NSMutableData* data = [[NSMutableData alloc] initWithData: [@"Hello Test File!" dataUsingEncoding:NSUTF8StringEncoding]];

    NSFileManager* fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtPath: filePath error: nil];
    if (![fileManager createFileAtPath:filePath contents: data attributes:nil]) {
        NSLog(@"Failed to create file read test file");
    }
}

- (void) createFileForWriteTest:(NSString*) ident {
    NSString* filePath = [[$testDataPath stringByAppendingPathComponent:@"fileForWriteTest"] stringByAppendingString: ident];
    
    NSMutableData* data = [[NSMutableData alloc] initWithData: [@"Initial State!" dataUsingEncoding:NSUTF8StringEncoding]];

    NSFileManager* fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtPath: filePath error: nil];
    if (![fileManager createFileAtPath:filePath contents: data attributes:nil]) {
        NSLog(@"Failed to create file read test file");
    }
}

- (void) createFileForRecursiveDeleteTest {
    NSString* dirPath = [$testDataPath stringByAppendingPathComponent:@"recursiveDelete"];
    NSFileManager* fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtPath: dirPath error: nil];
    
    [fileManager createDirectoryAtPath: dirPath withIntermediateDirectories: false attributes: nil error: nil];
    NSString* filePath = [dirPath stringByAppendingPathComponent: @"recursiveFile"];
    
    NSMutableData* data = [[NSMutableData alloc] initWithData: [@"Hello Test File!" dataUsingEncoding:NSUTF8StringEncoding]];

    [fileManager removeItemAtPath: filePath error: nil];
    if (![fileManager createFileAtPath:filePath contents: data attributes:nil]) {
        NSLog(@"Failed to create file read test file");
    }
}

- (void) createFileForDeleteTest:(NSString*) ident {
    NSString* filePath = [[$testDataPath stringByAppendingPathComponent:@"fileForDeleteTest"] stringByAppendingString: ident];
    
    NSMutableData* data = [[NSMutableData alloc] initWithData: [@"Initial State!" dataUsingEncoding:NSUTF8StringEncoding]];

    NSFileManager* fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtPath: filePath error: nil];
    if (![fileManager createFileAtPath:filePath contents: data attributes:nil]) {
        NSLog(@"Failed to create file read test file");
    }
}

#pragma mark Util APIs

- (NSData*) toJSON:(NSDictionary*) obj {
    return [NSJSONSerialization dataWithJSONObject: obj options: 0 error: nil];
}

- (NSData*) createParamsBuffer:(NSString*) data {
    return [self createParamsBuffer: data withContent:[[NSData alloc] init]];
}

- (NSData*) createParamsBuffer:(NSString*) data withContent:(NSData*) content {
    NSData* dataBytes = [data dataUsingEncoding:NSUTF8StringEncoding];
    uint32_t dataLength = (uint32_t) [dataBytes length];
    NSMutableData* buffer = [NSMutableData dataWithCapacity:(dataLength + 4)];

    uint32_t dataLengthBE = CFSwapInt32HostToBig((uint32_t)dataLength);
    [buffer appendBytes:(const void*)&dataLengthBE length: sizeof(dataLengthBE)];

    [buffer appendData: dataBytes];
    [buffer appendData: content];
    
    return buffer;
}

#pragma mark Test Cases

- (void) testFileNonExist {
    $apiBuilder.endpoint = @"/file/exists";
    
    NSString* path = [$testDataPath stringByAppendingPathComponent:@"fileForExistTest_doesNotExist"];
    
    $apiBuilder.data = [path dataUsingEncoding: NSUTF8StringEncoding];
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqual([response.status integerValue], 200);
        XCTAssertEqualObjects(payload, @"false");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testFileExist {
    $apiBuilder.endpoint = @"/file/exists";
    
    NSString* path = [$testDataPath stringByAppendingPathComponent:@"fileForExistTest"];
    
    $apiBuilder.data = [path dataUsingEncoding: NSUTF8StringEncoding];
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqual([response.status integerValue], 200);
        XCTAssertEqualObjects(payload, @"true");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testDeleteFileRecursively {
    $apiBuilder.endpoint = @"/file/remove";
    
    NSString* path = [$testDataPath stringByAppendingPathComponent:@"recursiveDelete"];
    
    NSData* params = [NSJSONSerialization
        dataWithJSONObject: @{
            @"path": path,
            @"recursive": @(true)
        }
        options: 0
        error: nil
    ];
    
    $apiBuilder.data = params;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqual([response.status integerValue], 200);
        XCTAssertEqualObjects(payload, @"true");
        
        NSFileManager* fm = [NSFileManager defaultManager];
        XCTAssertFalse([fm fileExistsAtPath: path]);
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testDeleteNonExistentFile {
    $apiBuilder.endpoint = @"/file/remove";
    
    NSString* path = [$testDataPath stringByAppendingPathComponent:@"fileForDeleteTest_doesNotExist"];
    
    NSData* params = [NSJSONSerialization
        dataWithJSONObject: @{
            @"path": path,
            @"recursive": @(false)
        }
        options: 0
        error: nil
    ];
    
    $apiBuilder.data = params;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqual([response.status integerValue], 200);
        XCTAssertEqualObjects(payload, @"false");
        
        NSFileManager* fm = [NSFileManager defaultManager];
        XCTAssertFalse([fm fileExistsAtPath: path]);
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testDeleteFile {
    $apiBuilder.endpoint = @"/file/remove";
    
    NSString* path = [$testDataPath stringByAppendingPathComponent:@"fileForDeleteTest1"];
    
    NSData* params = [NSJSONSerialization
        dataWithJSONObject: @{
            @"path": path,
            @"recursive": @(false)
        }
        options: 0
        error: nil
    ];
    
    $apiBuilder.data = params;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqual([response.status integerValue], 200);
        XCTAssertEqualObjects(payload, @"true");
        
        NSFileManager* fm = [NSFileManager defaultManager];
        XCTAssertFalse([fm fileExistsAtPath: path]);
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testWriteFileWithOffset {
    $apiBuilder.endpoint = @"/file/write";
    
    NSString* path = [$testDataPath stringByAppendingPathComponent:@"fileForWriteTest1"];
    NSDictionary* jparams = @{
        @"path": path,
        @"offset": @(2)
    };
    
    NSData* params = [
        self
        createParamsBuffer: [[NSString alloc] initWithData: [NSJSONSerialization dataWithJSONObject: jparams options: 0 error: nil] encoding: NSUTF8StringEncoding]
        withContent: [@"Rewrite" dataUsingEncoding:NSUTF8StringEncoding]
    ];
    
    $apiBuilder.data = params;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqual([response.status integerValue], 200);
        
        NSError* e = nil;
        
        {
            NSFileHandle* fileHandle = [NSFileHandle fileHandleForReadingAtPath: path];
        
            if (!fileHandle) {
                XCTFail("Could not open file");
            }
            
            NSData* data = [fileHandle readDataToEndOfFileAndReturnError: &e];
            if (e != nil) {
                XCTFail(@"File Read Error");
            }
            
            NSString* newFileContents = [[NSString alloc] initWithData: data encoding: NSUTF8StringEncoding];
            XCTAssertEqualObjects(newFileContents, @"InRewritetate!");
        
            [fileHandle closeFile];
        }
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testWriteFile {
    $apiBuilder.endpoint = @"/file/write";
    
    NSString* path = [$testDataPath stringByAppendingPathComponent:@"fileForWriteTest1"];
    NSDictionary* jparams = @{
        @"path": path,
        @"offset": @(0)
    };
    
    NSData* params = [
        self
        createParamsBuffer: [[NSString alloc] initWithData: [NSJSONSerialization dataWithJSONObject: jparams options: 0 error: nil] encoding: NSUTF8StringEncoding]
        withContent: [@"Rewrite" dataUsingEncoding:NSUTF8StringEncoding]
    ];
    
    $apiBuilder.data = params;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqual([response.status integerValue], 200);
        
        NSError* e = nil;
        
        {
            NSFileHandle* fileHandle = [NSFileHandle fileHandleForReadingAtPath: path];
        
            if (!fileHandle) {
                XCTFail("Could not open file");
            }
            
            NSData* data = [fileHandle readDataToEndOfFileAndReturnError: &e];
            if (e != nil) {
                XCTFail(@"File Read Error");
            }
            
            NSString* newFileContents = [[NSString alloc] initWithData: data encoding: NSUTF8StringEncoding];
            XCTAssertEqualObjects(newFileContents, @"Rewrite State!");
        
            [fileHandle closeFile];
        }
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testAppendFile {
    $apiBuilder.endpoint = @"/file/append";
    
    NSString* path = [$testDataPath stringByAppendingPathComponent:@"fileForAppendTest1"];
    NSData* params = [self createParamsBuffer: path withContent: [@"new content" dataUsingEncoding:NSUTF8StringEncoding]];
    
    $apiBuilder.data = params;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqual([response.status integerValue], 200);
        
        NSError* e = nil;
        
        {
            NSFileHandle* fileHandle = [NSFileHandle fileHandleForReadingAtPath: path];
        
            if (!fileHandle) {
                XCTFail("Could not open file");
            }
            
            NSData* data = [fileHandle readDataToEndOfFileAndReturnError: &e];
            if (e != nil) {
                XCTFail(@"File Read Error");
            }
            
            NSString* newFileContents = [[NSString alloc] initWithData: data encoding: NSUTF8StringEncoding];
            XCTAssertEqualObjects(newFileContents, @"Hello Test File!new content");
        
            [fileHandle closeFile];
        }
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testTruncateFileWithNewContent {
    $apiBuilder.endpoint = @"/file/truncate";
    
    NSString* path = [$testDataPath stringByAppendingPathComponent:@"fileForTruncateTest2"];
    NSData* params = [self createParamsBuffer: path withContent: [@"new content" dataUsingEncoding:NSUTF8StringEncoding]];
    
    $apiBuilder.data = params;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqual([response.status integerValue], 200);
        
        NSFileManager* fm = [NSFileManager defaultManager];
        NSError* e = nil;
        
        {
            NSDictionary* attributes = [fm attributesOfItemAtPath: path error: &e];
            if (e != nil) {
                XCTFail("Error testing for size");
            }
            
            NSNumber* fileSize = [attributes objectForKey:NSFileSize];
            XCTAssertEqual([fileSize unsignedLongValue], [payload integerValue]);
        }
        
        {
            NSFileHandle* fileHandle = [NSFileHandle fileHandleForReadingAtPath: path];
        
            if (!fileHandle) {
                XCTFail("Could not open file");
            }
            
            NSData* data = [fileHandle readDataToEndOfFileAndReturnError: &e];
            if (e != nil) {
                XCTFail(@"File Read Error");
            }
            
            NSString* newFileContents = [[NSString alloc] initWithData: data encoding: NSUTF8StringEncoding];
            XCTAssertEqualObjects(newFileContents, @"new content");
        
            [fileHandle closeFile];
        }
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testTruncateFile {
    $apiBuilder.endpoint = @"/file/truncate";
    
    NSString* path = [$testDataPath stringByAppendingPathComponent:@"fileForTruncateTest1"];
    NSData* params = [self createParamsBuffer: path];
    
    $apiBuilder.data = params;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        NSFileManager* fm = [NSFileManager defaultManager];
        NSError* e = nil;
        NSDictionary* attributes = [fm attributesOfItemAtPath: path error: &e];
        if (e != nil) {
            XCTFail("Error testing for size");
        }
        
        NSNumber* fileSize = [attributes objectForKey:NSFileSize];
        XCTAssertEqual([fileSize unsignedLongValue], 0);
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testFullFileReadWithOffset {
    $apiBuilder.endpoint = @"/file/read";
    
    NSData* data = [self toJSON: @{
        @"path": [$testDataPath stringByAppendingPathComponent:@"fileForReadTest"],
        @"length": @(-1),
        @"offset": @(2)
    }];
    
    $apiBuilder.data = data;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqualObjects(payload, @"llo Test File!");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testPartialFileReadWithOffset {
    $apiBuilder.endpoint = @"/file/read";
    
    NSData* data = [self toJSON: @{
        @"path": [$testDataPath stringByAppendingPathComponent:@"fileForReadTest"],
        @"length": @(2),
        @"offset": @(1)
    }];
    
    $apiBuilder.data = data;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqualObjects(payload, @"el");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testPartialFileRead {
    $apiBuilder.endpoint = @"/file/read";
    
    NSData* data = [self toJSON: @{
        @"path": [$testDataPath stringByAppendingPathComponent:@"fileForReadTest"],
        @"length": @(2),
        @"offset": @(0)
    }];
    
    $apiBuilder.data = data;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqualObjects(payload, @"He");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testFullFileRead {
    $apiBuilder.endpoint = @"/file/read";
    
    NSData* data = [self toJSON: @{
        @"path": [$testDataPath stringByAppendingPathComponent:@"fileForReadTest"],
        @"length": @(-1),
        @"offset": @(0)
    }];
    
    $apiBuilder.data = data;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: NSStringFromSelector(_cmd)];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqualObjects(payload, @"Hello Test File!");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testCanMkdirWithRecursion {
    $apiBuilder.endpoint = @"/file/mkdir";
    
    NSData* data = [self toJSON: @{
        @"path": [$testDataPath stringByAppendingPathComponent:@"recursive/directory"],
        @"recursive": @(true)
    }];
    
    $apiBuilder.data = data;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: @"testCanMkdirWithRecursion"];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqualObjects(payload, @"true", @"should be true to indicate directory was created.");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testCanMkdirWithoutRecursion {
    $apiBuilder.endpoint = @"/file/mkdir";
    
    NSData* data = [self toJSON: @{
        @"path": [$testDataPath stringByAppendingPathComponent:@"nonRecursiveDirectory"],
        @"recursive": @(false)
    }];
    
    $apiBuilder.data = data;
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: @"testCanMkdirWithoutRecursion"];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        XCTAssertEqualObjects(payload, @"true", @"should be true to indicate directory was created.");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testShouldBeSize512 {
    $apiBuilder.endpoint = @"/file/size";

    // Now, you can create or access files within the documentsDirectory
    NSString* filePath = [$testDataPath stringByAppendingPathComponent:@"fileForSizeTest"];
    
    $apiBuilder.data = [filePath dataUsingEncoding: NSUTF8StringEncoding];
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: @"testShouldBeSize512"];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            NSLog(@"%@", payload);
            XCTFail("File API errored");
        }
        
        NSInteger itype = [payload integerValue];
        
        XCTAssertEqual(itype, 512, @"should be 512 bytes");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testShouldBeFileType {
    $apiBuilder.endpoint = @"/file/type";

    // Now, you can create or access files within the documentsDirectory
    NSString* filePath = [$testDataPath stringByAppendingPathComponent:@"fileForTypeTest"];
    
    $apiBuilder.data = [filePath dataUsingEncoding: NSUTF8StringEncoding];
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: @"testShouldBeFileType"];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            XCTFail("File API errored");
        }
        
        NSInteger itype = [payload integerValue];
        
        XCTAssertEqual(itype, BTFuseFilesystemFileTypeFile, @"should be file type");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

- (void) testShouldBeDirectoryType {
    $apiBuilder.endpoint = @"/file/type";
    $apiBuilder.data = [@"/" dataUsingEncoding: NSUTF8StringEncoding];
    
    BTFuseTestAPIClient* client = [$apiBuilder build];
    
    XCTestExpectation* expectation = [self expectationWithDescription: @"testShouldBeDirectoryType"];
    
    [client execute:^(NSError* _Nullable error, BTFuseTestAPIClientResponse* _Nullable response) {
        XCTAssertNil(error, @"Error should be nil");
        
        NSString* payload = [[NSString alloc] initWithData: response.data encoding: NSUTF8StringEncoding];
        
        if ([response.status integerValue] >= 400) {
            XCTFail("File API errored");
        }
        
        NSInteger itype = [payload integerValue];
        
        XCTAssertEqual(itype, BTFuseFilesystemFileTypeDirectory, @"should be directory type");
        
        [expectation fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:30.0 handler:nil];
}

@end
