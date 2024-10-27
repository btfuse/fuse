
/*
Copyright 2023-2024 Breautek

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
#import <BTFuse/BTFuse.h>
#import <BTFuseNativeView/BTFuseNativeView.h>

@implementation ViewController {
    BTFuseViewController* $fuseController;
}

- (void) onContextReady {}

- (void) onWebviewReady {
    if (@available(iOS 16.4, *)) {
        [[$fuseController getContext] getWebview].inspectable = true;
    }
}

- (void) onBeforeWebviewLoad {
    BTFuseContext* context = [$fuseController getContext];
    [context registerPlugin:[[BTFuseNativeViewPlugin alloc] init: context]];
}

- (void) viewDidLoad {
    [super viewDidLoad];
    
    $fuseController = [[BTFuseViewController alloc] init: self];
    
    [self addChildViewController: $fuseController];
    [self.view addSubview: $fuseController.view];
    [$fuseController didMoveToParentViewController: self];
}

@end
