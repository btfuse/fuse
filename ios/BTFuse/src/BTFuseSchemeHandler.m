
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
#import <BTFuse/BTFusePlugin.h>
#import <BTFuseSchemeHandler.h>
#import <BTFuse/BTFuseAPIRouter.h>
#import <BTFuse/BTFuseAPIPacket.h>
#import <BTFuse/BTFuseAPIResponse.h>
#import <MobileCoreServices/MobileCoreServices.h>
#import <BTFuse/BTFuseLogger.h>
#import <UniformTypeIdentifiers/UniformTypeIdentifiers.h>

NSString* const SCHEME = @"btfuse";
NSString* const HOST = @"localhost";

@implementation BTFuseSchemeHandler  {
    __weak BTFuseContext* $context;
}

- (instancetype) init:(BTFuseContext*) context {
    self = [super init];
    
    $context = context;
    
    return self;
}

- (BTFuseContext*) getContext {
    return $context;
}

- (void)webView:(WKWebView*)webView startURLSchemeTask:(id<WKURLSchemeTask>)urlSchemeTask {
    NSURLRequest* request = urlSchemeTask.request;
    NSURL* requestURL = request.URL;
    NSString* scheme = requestURL.scheme;
    
    if (![scheme isEqualToString: SCHEME]) {
        [self sendErrorResponseWithStatusCode:404 toURLSchemeTask:urlSchemeTask];
        return;
    }
    
    NSString* path = requestURL.path;
    
    if (![requestURL.host isEqualToString: HOST]) {
        [self sendErrorResponseWithStatusCode:404 toURLSchemeTask:urlSchemeTask];
        return;
    }
    
    BTFuseLogger* logger = [$context getLogger];
    
    [logger info: @"Incoming DOM Request: %@", path];
    
    NSURL* route = [NSURL fileURLWithPath: path];
    
    NSString* routeService = route.pathComponents[1];
    
    if ([routeService isEqualToString:@"assets"]) {
        NSString* bundlePath = [[NSBundle mainBundle] resourcePath];
        NSString* assetPath = [bundlePath stringByAppendingPathComponent:path];
        NSData* content = [NSData dataWithContentsOfFile:assetPath];
        
        NSString* fileExtension = [requestURL pathExtension];
        UTType* uti = [UTType typeWithFilenameExtension: fileExtension];
        
        NSString* contentType = nil;
        
        if (uti == nil) {
            [logger warn: @"Could not discover MIME type for extension \"%@\". The webview will likely fail.", fileExtension];
            contentType = @"application/octet-stream";
        }
        else {
            contentType = [uti preferredMIMEType];
        }
        
        if (content) {
            NSURLResponse* response = [[NSURLResponse alloc] initWithURL:requestURL MIMEType: contentType expectedContentLength:content.length textEncodingName:@"utf-8"];
            [urlSchemeTask didReceiveResponse: response];
            [urlSchemeTask didReceiveData: content];
            [urlSchemeTask didFinish];
        }
        else {
            [self sendErrorResponseWithStatusCode:404 toURLSchemeTask:urlSchemeTask];
        }
    }
    else {
        [logger error:@"Unknown Service Route: %@", routeService];
        NSHTTPURLResponse* response = [[NSHTTPURLResponse alloc] initWithURL:urlSchemeTask.request.URL statusCode: 404 HTTPVersion:@"HTTP/1.1" headerFields:nil];
        [urlSchemeTask didReceiveResponse:response];
        [urlSchemeTask didFinish];
    }
}

- (void) webView:(nonnull WKWebView*) webView stopURLSchemeTask:(nonnull id<WKURLSchemeTask>) urlSchemeTask {}

- (void) sendErrorResponseWithStatusCode:(NSInteger) statusCode toURLSchemeTask:(id<WKURLSchemeTask> )urlSchemeTask {
    NSDictionary* statusCodeTexts = @{
        @(200): @"OK",
        @(404): @"Not Found",
        // Add more status codes and texts as needed
    };

    // Create a basic HTML response
    NSString* statusText = statusCodeTexts[@(statusCode)];
    NSString* errorHTML = [NSString stringWithFormat:@"<html><body><h1>%ld %@</h1></body></html>", (long)statusCode, statusText];
    NSData* errorData = [errorHTML dataUsingEncoding:NSUTF8StringEncoding];
    NSHTTPURLResponse* response = [[NSHTTPURLResponse alloc] initWithURL:urlSchemeTask.request.URL statusCode:statusCode HTTPVersion:@"HTTP/1.1" headerFields:nil];

    // Send the response
    [urlSchemeTask didReceiveResponse:response];
    [urlSchemeTask didReceiveData:errorData];
    [urlSchemeTask didFinish];
}

@end
