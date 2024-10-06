
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
#import <BTFuse/BTFusePlugin.h>
#import <BTFuse/BTFuseContext.h>
#import <BTFuse/BTFuseError.h>

@implementation BTFusePlugin  {
    NSMutableDictionary<NSString*, BTFusePluginAPIHandle>* $handles;
    __weak BTFuseContext* $context;
}

- (instancetype)init:(BTFuseContext*)context {
    self = [super init];
    
    $context = context;
    $handles = [[NSMutableDictionary alloc] init];
    [self initHandles];
    
    return self;
}

- (BTFuseContext*) getContext {
    return $context;
}

- (NSString*)getID {
    NSAssert(NO, @"BTFusePlugin.getID is abstract and must be overwritten by the concrete class.");
    return nil;
}

- (void) route:(NSString*) path withPacket:(BTFuseAPIPacket*) packet withResponse:(BTFuseAPIResponse*) response {
    BTFusePluginAPIHandle apiHandle = [$handles objectForKey: path];
    if (apiHandle == nil) {
        [response setStatus:BTFuseAPIResponseStatusError];
        [response setContentType:@"application/json"];
        NSError* error = nil;
        NSString* message = [[[BTFuseError alloc] init:@"BTFusePlugin" withCode:1 withMessage:@"No Handler"] serialize:error];
        NSData* msgData = [message dataUsingEncoding:NSUTF8StringEncoding];
        [response setContentLength: [msgData length]];
        [response didFinishHeaders];
        [response pushData:msgData];
        [response didFinish];
        return;
    }
    
    apiHandle(packet, response);
}

- (void) attachHandler:(NSString *)path callback:(BTFusePluginAPIHandle)callback {
    [$handles setObject:callback forKey:path];
}

- (void) initHandles {}

@end
