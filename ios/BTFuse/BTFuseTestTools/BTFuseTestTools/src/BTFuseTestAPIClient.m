
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
#import <BTFuseTestTools/BTFuseTestAPIClient.h>

@implementation BTFuseTestAPIClientResponse

- (instancetype) initWithCode:(NSNumber*) code data:(NSData*) data {
    self = [super init];
    
    self.status = code;
    self.data = data;
    
    return self;
}

- (bool) isError {
    return [self.status integerValue] >= 400;
}

@end

@implementation BTFuseTestAPIClientBuilder

- (BTFuseTestAPIClient*) build {
    return [
        [BTFuseTestAPIClient alloc]
        init:       self.pluginID
        secret:     self.apiSecret
        port:       [self.apiPort intValue]
        endpoint:   self.endpoint
        data:       self.data
        type:       self.contentType
    ];
}

@end

@interface BTFuseTestAPIClient () {
    NSString* $pluginID;
    NSString* $apiSecret;
    int $apiPort;
    NSString* $endpoint;
    NSData* $data;
    NSString* $type;
    NSString* SECRET_HEADER;
    NSString* API_ENDPOINT_BASE;
}
@end

@implementation BTFuseTestAPIClient

- (instancetype) init:(NSString*) pluginID secret:(NSString*) secret port:(int) port endpoint:(NSString*) endpoint data:(NSData*) data type:(NSString*) type {
    self = [super init];
    
    $pluginID = pluginID;
    $apiSecret = secret;
    $apiPort = port;
    $endpoint = endpoint;
    $data = data;
    $type = type;
    
    SECRET_HEADER = @"X-Fuse-Secret";
    API_ENDPOINT_BASE = @"https://localhost";
    
    return self;
}

- (NSString*) $getURL {
    return [NSString stringWithFormat:@"%@:%d/api/%@%@", API_ENDPOINT_BASE, $apiPort, $pluginID, $endpoint];
}

- (void) URLSession:(NSURLSession*) session didReceiveChallenge:(NSURLAuthenticationChallenge*) challenge
    completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition, NSURLCredential* _Nullable)) completionHandler
{
    // This is a test class, let's just accept all certificates
    if ([challenge.protectionSpace.authenticationMethod isEqualToString:NSURLAuthenticationMethodServerTrust]) {
         NSURLCredential *credential = [NSURLCredential credentialForTrust:challenge.protectionSpace.serverTrust];
         completionHandler(NSURLSessionAuthChallengeUseCredential, credential);
    }
    else {
        // Handle other types of challenges here
        completionHandler(NSURLSessionAuthChallengePerformDefaultHandling, nil);
    }
}

- (void) execute:(BTFuseTestAPIClientCallback) callback {
    NSURL* url = [NSURL URLWithString:[self $getURL]];
    NSMutableURLRequest* request = [NSMutableURLRequest requestWithURL: url];
    [request setHTTPMethod: @"POST"];
    [request setValue: $apiSecret forHTTPHeaderField:SECRET_HEADER];
    if ($type != nil) {
        [request setValue:$type forHTTPHeaderField:@"Content-Type"];
    }
    if ($data != nil) {
        [request setHTTPBody: $data];
    }
    
    NSURLSessionConfiguration* configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
    
//    NSURLSession* session = [NSURLSession sharedSession];
    NSOperationQueue* queue = [[NSOperationQueue alloc] init];
    NSURLSession* session = [NSURLSession sessionWithConfiguration: configuration delegate: self delegateQueue: queue];

    NSURLSessionDataTask* task = [session dataTaskWithRequest: request completionHandler:^(NSData* _Nullable data, NSURLResponse* _Nullable response, NSError* _Nullable error) {
        if (error) {
            callback(error, nil);
            return;
        }
        
        if (![response isKindOfClass:[NSHTTPURLResponse class]]) {
            NSError* error = [[NSError alloc] initWithDomain:@"BTFuseTestAPIClient" code: 0 userInfo:@{
                NSLocalizedDescriptionKey: @"Did not receive a HTTP response"
            }];
            callback(error, nil);
            return;
        }
        
        NSHTTPURLResponse* httpResponse = (NSHTTPURLResponse*)response;
        
        NSData* responseData = nil;
        if (data) {
            responseData = data;
        }
        else {
            responseData = [[NSData alloc] init];
        }
        
        BTFuseTestAPIClientResponse* res = [[BTFuseTestAPIClientResponse alloc] initWithCode:@(httpResponse.statusCode) data:responseData];
        callback(nil, res);
    }];
    
    [task resume];
}

@end
