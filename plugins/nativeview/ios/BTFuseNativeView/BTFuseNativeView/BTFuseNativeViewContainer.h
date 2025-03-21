
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

#ifndef BTFuseNativeViewContainer_h
#define BTFuseNativeViewContainer_h

#import <UIKit/UIKit.h>
#import <BTFuseNativeView/BTFuseNativeViewRect.h>
#import <BTFuseNativeView/BTFuseNativeViewOverlayBuilder.h>
#import <BTFuseNativeView/BTFuseNativeViewWebviewOverlayController.h>
#import <CoreGraphics/CoreGraphics.h>

@interface BTFuseNativeViewContainerView: UIView

- (void) setRectManager:(BTFuseNativeViewOverlayRectManager*) rectManager;

@end

@interface BTFuseNativeViewContainer: UIViewController
- (instancetype) init:(BTFuseContext*) context;
- (instancetype) init:(BTFuseContext*) context withRect:(CGRect) rect;
//- (instancetype) initWithCoder:(NSCoder*) coder NS_UNAVAILABLE;
//- (instancetype) initWithFrame:(CGRect) frame NS_UNAVAILABLE;
- (instancetype) init NS_UNAVAILABLE;

- (void) setContent:(UIView*) view;
- (void) setOverlay:(BTFuseNativeViewWebviewOverlayController*) overlayController;

- (NSString*) getID;

@end

#endif
