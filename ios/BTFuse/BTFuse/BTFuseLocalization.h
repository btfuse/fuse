
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

#ifndef BTFuseLocalization_h
#define BTFuseLocalization_h

/**
    A static class that will look for strings in the mainBundle, and fallback to the framework bundle.
    This offers a chance for the application to override UI text that the framework produces.
 */
@interface BTFuseLocalization: NSObject

- (instancetype) init NS_UNAVAILABLE;

+ (NSString*) lookup:(NSString*) key;

@end


#endif
