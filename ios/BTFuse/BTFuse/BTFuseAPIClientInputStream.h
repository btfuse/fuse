
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

#ifndef BTFuseAPIClientInputStream_h
#define BTFuseAPIClientInputStream_h

#import <Foundation/Foundation.h>
#import <Network/Network.h>

@interface BTFuseAPIClientInputStream: NSInputStream

@property (readonly) BOOL hasBytesAvailable;
@property (readonly) NSStreamStatus streamStatus;
@property (nullable, readonly, copy) NSError* streamError;
@property (nullable, atomic, weak) id<NSStreamDelegate> delegate;

- (instancetype _Nonnull) init:(nw_connection_t _Nonnull) connection;

@end

#endif
