
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

#import "EchoPlugin.h"
#import <BTFuse/BTFuse.h>

@implementation EchoPlugin

- (NSString*) getID {
    return @"echo";
}

- (void) initHandles {
    __weak EchoPlugin* weakSelf = self;
    
    [self attachHandler:@"/echo" callback:^void(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        NSData* message = [packet readAsBinary];
        [weakSelf doEcho: message withResponse:response];
    }];
    
    [self attachHandler:@"/echoWithReader" callback:^void(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        BTFuseStreamReader* reader = [[BTFuseStreamReader alloc] init: [[packet getClient] getInputStream]];
        
        NSMutableData* data = [[NSMutableData alloc] init];
        
        const int BUFFER_SIZE = 8;
        
        uint8_t buffer[BUFFER_SIZE];
        uint64_t bytesRead = 0;
        bool didError = false;
        while ((bytesRead = [reader read: buffer maxBytes: BUFFER_SIZE])) {
            if (bytesRead == -1) {
                didError = true;
                break;
            }
            
            [data appendBytes: buffer length: bytesRead];
        }
        
        [response sendData: data];
    }];
    
    [self attachHandler:@"/big" callback:^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        NSString* bundlePath = [[NSBundle mainBundle] resourcePath];
        NSString* assetPath = [bundlePath stringByAppendingPathComponent:@"/assets/largeFile.txt"];
        
        NSFileManager* fileManager = [NSFileManager defaultManager];
        NSDictionary* fileAttributes = [fileManager attributesOfItemAtPath:assetPath error:nil];

        NSNumber* fileSizeNumber = [fileAttributes objectForKey:NSFileSize];
        
        [response setStatus: BTFuseAPIResponseStatusOk];
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
    
    [self attachHandler:@"/subscribe" callback:^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        NSString* callbackID = [packet readAsString];
        
        __block int num = 0;
        dispatch_async(dispatch_get_main_queue(), ^{
            [NSTimer scheduledTimerWithTimeInterval:1.0 repeats:true block:^(NSTimer * _Nonnull timer) {
                num++;
                
                [[self getContext] execCallback:callbackID withData:[[NSString alloc] initWithFormat:@"%d", num]];
            }];
        });
        
        [response didFinishHeaders];
        [response didFinish];
    }];
    
    [self attachHandler:@"/threadtest" callback:^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_BACKGROUND, 0), ^{
            [self doEcho: [packet readAsBinary] withResponse:response];
        });
    }];
}

- (void) doEcho:(NSData*)data withResponse:(BTFuseAPIResponse*) response {
    [response setStatus: BTFuseAPIResponseStatusOk];
    [response setContentType:@"text/plain"];
    [response setContentLength: [data length]];
    [response didFinishHeaders];
    [response pushData:data];
    [response didFinish];
}

@end
