
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
#import <BTFuseAPIRouter.h>
#import <BTFuse/BTFuseContext.h>
#import <BTFuse/BTFusePlugin.h>
#import <BTFuse/BTFuseError.h>

@implementation BTFuseAPIRouter {
    __weak BTFuseContext* $context;
}

- (instancetype) init: (BTFuseContext*) context {
    self = [super init];
    
    $context = context;
    
    return self;
}

- (BTFuseContext*) getContext {
    return $context;
}

- (void) execute:(BTFuseAPIPacket*) packet withResponse:(BTFuseAPIResponse*) response {
    NSString* route = [packet getRoute];
    
    NSArray* parts = [route componentsSeparatedByString: @"/"];
    
    if ([parts count] < 3) {
        [response setStatus:BTFuseAPIResponseStatusError];
        [response setContentType:@"application/json"];
        NSError* error = nil;
        NSString* message = [[[BTFuseError alloc] init:@"BTFuseAPIRouter" withCode:1 withMessage:@"Malformed route"] serialize:error];
        NSData* msgData = [message dataUsingEncoding:NSUTF8StringEncoding];
        [response setContentLength: [msgData length]];
        [response didFinishHeaders];
        [response pushData:msgData];
        [response didFinish];
        return;
    }
    
    NSString* pluginID = [parts objectAtIndex: 2];
    BTFusePlugin* plugin = [$context getPlugin: pluginID];
    if (plugin == nil) {
        [response sendError:[[BTFuseError alloc] init:@"BTFuse" withCode:0 withMessage:[NSString stringWithFormat: @"Unknown Plugin: %@", pluginID]]];
        return;
    }
    
    NSMutableArray* components = [parts mutableCopy];
    
    [components removeObjectsInRange: NSMakeRange(0, 3)]; //Removes /, api, and the plugin ID from components, and leaves /methodName
    NSString* servicePath = [@"/" stringByAppendingString:[components componentsJoinedByString:@"/"]];
    
    [plugin route: servicePath withPacket: packet withResponse: response];
}

@end
