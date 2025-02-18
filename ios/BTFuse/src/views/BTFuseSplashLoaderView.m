
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
#import <BTFuse/BTFuseSplashLoaderView.h>
#import <BTFuse/BTFuseProgressContextProtocol.h>
#import <BTFuse/BTFuseProgressProtocol.h>
#import <BTFuse/BTFuseProgressListenerProtocol.h>
#import <BTFuse/BTFuseProgressContextListenerProtocol.h>
//#import <BTFuse/BTFuseProgressContext.h>

@interface BTFuseSplashLoaderView ()

@property (nonatomic, weak) IBOutlet UIImageView* uiImage;
@property (nonatomic, weak) IBOutlet UIProgressView* uiProgressbar;
@property (nonatomic, weak) IBOutlet UILabel* uiLabel;

@end

@implementation BTFuseSplashLoaderView

- (instancetype) initWithFrame:(CGRect) frame {
    self = [super initWithFrame:frame];
    if (self) {
        [self loadViewFromNib];
    }
    return self;
}

- (instancetype) initWithCoder:(NSCoder*) coder {
    self = [super initWithCoder:coder];
    if (self) {
        [self loadViewFromNib];
    }
    return self;
}

- (void) loadViewFromNib {
    NSBundle* bundle = [NSBundle bundleForClass:[self class]];
    UINib* nib = [UINib nibWithNibName:@"BTFuseSplashLoaderView" bundle:bundle];
    UIView* view = [[nib instantiateWithOwner:self options:nil] firstObject];
    view.frame = self.bounds;
    view.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    
    [self loadAppIcon];
    
    [self addSubview:view];
}

- (void) loadAppIcon {
    NSDictionary* infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSArray* iconsArray = infoDictionary[@"CFBundleIcons"][@"CFBundlePrimaryIcon"][@"CFBundleIconFiles"];
    NSString* iconName = iconsArray.lastObject; // The last item is usually the largest version
    self.uiImage.image = [UIImage imageNamed:iconName];
}

- (void) onProgressContextUpdate:(id<BTFuseProgressContextProtocol>) progress {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.uiProgressbar setProgress: [progress getNormalizedValue] animated: true];
    });
}

- (void) onProgressUpdate:(id<BTFuseProgressProtocol>) progress {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.uiProgressbar setProgress: [progress getNormalizedValue] animated: true];
    });
}

@end
