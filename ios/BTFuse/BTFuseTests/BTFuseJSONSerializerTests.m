
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

@interface BTFuseJSONSerializerTests : XCTestCase {}
    
@end

@implementation BTFuseJSONSerializerTests

- (void) setUp {}

- (void) tearDown {}

- (void) testShouldNotHaveLinebreaks {
    NSError* error = nil;
    NSString* json = [BTFuseJSONSerializer serialize:@{
        @"test": @(123)
    } withError:&error];
    
    XCTAssertEqualObjects(json, @"{\"test\":123}");
}

@end
