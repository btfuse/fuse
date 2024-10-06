
/*
Copyright Breautek

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

#ifndef BTFuseStreamReader_h
#define BTFuseStreamReader_h

/**
    The NSInputStream object is non-blocking, requiring a delegate implementation
    to listen for stream events to determine when it's safe to read the stream, and to determine
    when the stream has ended.
    
    This makes it difficult to use in context of a thread, so this object can be used as the stream
    delegate to respond to events and to block the thread when necessary for the read calls. This
    API will behave similar to the C read API.
    
    Do not read streams on the main thread
 */
@interface BTFuseStreamReader: NSObject<NSStreamDelegate>

- (instancetype) init:(NSInputStream*) stream;

/**
    On success, the number of bytes read is returned (zero indicates
       end of file), and the file position is advanced by this number.
       It is not an error if this number is smaller than the number of
       bytes requested; this may happen for example because fewer bytes
       are actually available right now.
       On error, -1 is returned
 */
- (int64_t) read:(uint8_t*) buffer maxBytes:(uint32_t) max;

@end

#endif
