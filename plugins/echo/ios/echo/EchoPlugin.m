
/*
Copyright 2023 Norman Breau

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

#import "EchoPlugin.h"
#import <NBSFuse/NBSFuseContext.h>

@implementation EchoPlugin

- (NSString*) getID {
    return @"echo";
}

- (void) initHandles {
    __weak EchoPlugin* weakSelf = self;
    
    [self attachHandler:@"/echo" callback:^void(NSData *data, NBSFuseAPIResponse* response) {
        [weakSelf doEcho:data withResponse:response];
    }];
    
    [self attachHandler:@"/big" callback:^(NSData *data, NBSFuseAPIResponse *response) {
        NSString* bundlePath = [[NSBundle mainBundle] resourcePath];
        NSString* assetPath = [bundlePath stringByAppendingPathComponent:@"/assets/largeFile.txt"];
        
        NSFileManager* fileManager = [NSFileManager defaultManager];
        NSDictionary* fileAttributes = [fileManager attributesOfItemAtPath:assetPath error:nil];

        NSNumber* fileSizeNumber = [fileAttributes objectForKey:NSFileSize];
        
        [response setStatus: NBSFuseAPIResponseStatusOk];
        [response setContentType:@"text/plain"];
        [response setContentLength: [fileSizeNumber unsignedIntegerValue]];
        [response didFinishHeaders];
        
        NSInputStream *inputStream = [NSInputStream inputStreamWithFileAtPath:assetPath];
        [inputStream open];

        NSUInteger bufferSize =  256 * 1024; // Adjust this according to your needs
        uint8_t buffer[bufferSize];
        NSInteger bytesRead = 0;

        while ([inputStream hasBytesAvailable]) {
            bytesRead = [inputStream read:buffer maxLength:bufferSize];
            if (bytesRead > 0) {
                NSData* data = [NSData dataWithBytes:buffer length:bytesRead];

                [response pushData:data];
            }
        }

        [inputStream close];
        
        [response didFinish];
    }];
    
    [self attachHandler:@"/subscribe" callback:^(NSData* data, NBSFuseAPIResponse* response) {
        NSString* callbackID = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        
        __block int num = 0;
        [NSTimer scheduledTimerWithTimeInterval:1.0 repeats:true block:^(NSTimer * _Nonnull timer) {
            num++;
            
            [[self getContext] execCallback:callbackID withData:[[NSString alloc] initWithFormat:@"%d", num]];
        }];
        
        [response didFinishHeaders];
        [response didFinish];
    }];
}

- (void) doEcho:(NSData*)data withResponse:(NBSFuseAPIResponse*) response {
    [response setStatus: NBSFuseAPIResponseStatusOk];
    [response setContentType:@"text/plain"];
    [response setContentLength: [data length]];
    [response didFinishHeaders];
    [response pushData:data];
    [response didFinish];
}

@end
