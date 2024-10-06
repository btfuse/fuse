
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
#import "BTFuseAPIServerHeaders.h"

@implementation BTFuseAPIServerHeaders

- (instancetype) init {
    self = [super init];

    $headers = [[NSMutableDictionary alloc] init];
    $method = nil;
    $version = nil;
    $path = nil;

    return self;
}

- (void) setMethod:(NSString*) method {
    $method = method;
}

- (void) setVersion:(NSString*) version {
    $version = version;
}

- (void) setPath:(NSString*) path {
    $path = path;
}

- (void) setHeader:(NSString*) name withValue:(NSString*) value {
    [$headers setObject:value forKey:name];
}

- (NSString*) getMethod {
    return $method;
}

- (NSString*) getVersion {
    return $version;
}

- (NSString*) getPath {
    return $path;
}

- (NSString*) getHeader:(NSString*) name {
    return [$headers objectForKey:name];
}

- (NSDictionary*) getHeaders {
    return $headers;
}

@end

