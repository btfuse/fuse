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

#import "ViewController.h"
#import <EchoPlugin.h>

@interface ViewController ()

@end

@implementation ViewController

- (instancetype) init {
    self = [super init];
    
    [self initialize];
    
    return self;
}

- (instancetype) initWithNibName:(NSString*) nibNameOrNil bundle:(NSBundle*) nibBundleOrNil {
    self = [super initWithNibName: nibNameOrNil bundle: nibBundleOrNil];
    
    [self initialize];
    
    return self;
}

- (instancetype) initWithCoder:(NSCoder*) coder {
    self = [super initWithCoder: coder];
    
    [self initialize];
    
    return self;
}

- (void) initialize {
    self.$context = [[NBSFuseContext alloc] init];
    [self.$context registerPlugin:[[EchoPlugin alloc] init: self.$context]];
    
    if (@available(iOS 16.4, *)) {
        [self.$context getWebview].inspectable = true;
    }
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    UIViewController* fuseController = [self.$context getViewController];
    
    [self addChildViewController: fuseController];
    [self.view addSubview: fuseController.view];
}


@end
