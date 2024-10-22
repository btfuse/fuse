/*
Copyright 2024 Breautek

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

#import "ViewController.h"
#import <BTFuseNativeView/BTFuseNativeView.h>
#import <BTFuseGoogleMap/BTFuseGoogleMap.h>

@implementation ViewController {
    BTFuseViewController* $fuseController;
}

- (void) onContextReady {}

- (void) onWebviewReady {
    BTFuseContext* context = [$fuseController getContext];
    
    if (@available(iOS 16.4, *)) {
        [context getWebview].inspectable = true;
    }
}

- (void) onBeforeWebviewLoad {
    NSString* secretsPath = [[NSBundle mainBundle] pathForResource: @"secrets" ofType: @"plist"];
    NSDictionary* secrets = [NSDictionary dictionaryWithContentsOfFile: secretsPath];

    BTFuseContext* context = [$fuseController getContext];
    BTFuseNativeViewPlugin* nvapi = [[BTFuseNativeViewPlugin alloc] init: context];
    [context registerPlugin: nvapi];
    [context registerPlugin: [[BTFuseGoogleMapPlugin alloc] init: context withNativeViewAPI: nvapi apiKey: [secrets objectForKey:@"GOOGLE_MAP_API_KEY"]]];
}


- (void) viewDidLoad {
    [super viewDidLoad];
    $fuseController = [[BTFuseViewController alloc] init: self];
    [$fuseController attach: self];
}

@end
