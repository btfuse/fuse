
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

#import <BTFuse/BTFuseLogger.h>
#import <BTFuse/BTFuseContext.h>

@implementation BTFuseLogger {
    BTFuseLoggerLevel $level;
    BTFuseContext* $context;
    NSString* $callbackID;
}

- (instancetype) init:(BTFuseContext*) context {
    self = [super init];
    
    $context = context;
    $level = BTFuseLoggerLevelInfo | BTFuseLoggerLevelWarn | BTFuseLoggerLevelError;
    
    #ifdef DEBUG
        $level |= BTFuseLoggerLevelDebug;
    #endif
    
    return self;
}

- (void) setLevel:(BTFuseLoggerLevel) level {
    $level = level;
}

- (BTFuseLoggerLevel) getLevel {
    return $level;
}

- (void) setCallbackID:(NSString*) callbackID {
    $callbackID = callbackID;
}

- (void) $bridgeToWebview:(BTFuseLoggerLevel) level message:(NSString*) message {
    if ($callbackID == nil) {
        return;
    }
    
    NSDictionary* packet = @{
        @"level": @(level),
        @"message": message
    };
    
    NSError* error = nil;
    NSData* serialized = [NSJSONSerialization dataWithJSONObject: packet options: 0 error: &error];

    if (!serialized) {
        NSLog(@"Packet Serialization Error: %@", error);
        return;
    }
    
    NSString* json = [[NSString alloc] initWithData: serialized encoding: NSUTF8StringEncoding];
    [$context execCallback: $callbackID withData:json];
}

- (void) debug:(NSString*) format, ... __attribute__((format(NSString, 1, 2))) {
    if (!($level & BTFuseLoggerLevelDebug)) {
        return;
    }
    
    va_list args;
    va_start(args, format);
    NSString* message = [[NSString alloc] initWithFormat:format arguments:args];
    va_end(args);
    
    NSLog(@"[%@]: %@", BTFuseLoggerLevel_toString(BTFuseLoggerLevelDebug), message);
    [self $bridgeToWebview:BTFuseLoggerLevelDebug message: message];
}

- (void) info:(NSString*) format, ... __attribute__((format(NSString, 1, 2))) {
    if (!($level & BTFuseLoggerLevelInfo)) {
        return;
    }
    
    va_list args;
    va_start(args, format);
    NSString* message = [[NSString alloc] initWithFormat:format arguments:args];
    va_end(args);
    
    NSLog(@"[%@]: %@", BTFuseLoggerLevel_toString(BTFuseLoggerLevelInfo), message);
    [self $bridgeToWebview:BTFuseLoggerLevelInfo message: message];
}

- (void) warn:(NSString*) format, ... __attribute__((format(NSString, 1, 2))) {
    if (!($level & BTFuseLoggerLevelWarn)) {
        return;
    }
    
    va_list args;
    va_start(args, format);
    NSString* message = [[NSString alloc] initWithFormat:format arguments:args];
    va_end(args);
    
    NSLog(@"[%@]: %@", BTFuseLoggerLevel_toString(BTFuseLoggerLevelWarn), message);
    [self $bridgeToWebview:BTFuseLoggerLevelWarn message: message];
}

- (void) error:(NSString*) format, ... __attribute__((format(NSString, 1, 2))) {
    if (!($level & BTFuseLoggerLevelError)) {
        return;
    }
    
    va_list args;
    va_start(args, format);
    NSString* message = [[NSString alloc] initWithFormat:format arguments:args];
    va_end(args);
    
    NSLog(@"[%@]: %@", BTFuseLoggerLevel_toString(BTFuseLoggerLevelError), message);
    [self $bridgeToWebview:BTFuseLoggerLevelError message: message];
}

@end
