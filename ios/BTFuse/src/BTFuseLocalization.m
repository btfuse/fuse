
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
#import <BTFuseLocalization.h>

@implementation BTFuseLocalization : NSObject

+ (NSString*) lookup: (NSString*) key {
    NSBundle* mainBundle = [NSBundle mainBundle];
    NSBundle* bundle = [NSBundle bundleForClass: [BTFuseLocalization class]];
    
    NSString* str = NSLocalizedStringWithDefaultValue(key, nil, mainBundle, nil, nil);
    
    if (str == nil) {
        // If we can't resolve the key, then default the text to the key. Make the error obvious in the UI so that it can
        // be corrected.
        str = NSLocalizedStringWithDefaultValue(key, nil, bundle, key, nil);
    }
    
    return str;
}

@end
