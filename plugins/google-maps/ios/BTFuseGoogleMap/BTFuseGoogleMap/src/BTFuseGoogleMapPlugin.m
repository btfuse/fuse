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

#import <Foundation/Foundation.h>
#import <BTFuseGoogleMap/BTFuseGoogleMapPlugin.h>
#import <BTFuseGoogleMap/BTFuseGoogleMapComponent.h>
#import <GoogleMaps/GoogleMaps.h>

@implementation BTFuseGoogleMapPlugin {
    NSMutableDictionary* $maps;
    BTFuseNativeViewPlugin* $nvapi;
    NSString* $apiKey;
}

- (instancetype) init:(BTFuseContext*) context withNativeViewAPI:(BTFuseNativeViewPlugin*) nvapi apiKey:(NSString*) apiKey {
    self = [super init:context];
    
    $nvapi = nvapi;
    $maps = [[NSMutableDictionary alloc] init];
    $apiKey = apiKey;
    
    bool successful = [GMSServices provideAPIKey: $apiKey];
    if (!successful) {
        NSLog(@"Google Maps API Key error.");
    }
    
    return self;
}

- (NSString*) getID {
    return @"FuseGoogleMaps";
}

- (void) initHandles {
    __weak BTFuseGoogleMapPlugin* weakSelf = self;
    [self attachHandler:@"/create" callback:^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        BTFuseGoogleMapPlugin* strongSelf = weakSelf;
        
        NSError* error = nil;
        NSDictionary* params = [packet readAsJSONObject: &error];
        if (error != nil) {
            [response sendError:[
                [BTFuseError alloc]
                    init:[strongSelf getID]
                    withCode: 0
                    withError: error
                ]
            ];
            return;
        }
        
        NSString* viewID = [params objectForKey:@"node"];
        BTFuseNativeViewContainer* view = [strongSelf->$nvapi getViewByID: viewID];
        if (view == nil) {
            [response sendError:[[BTFuseError alloc] init:[strongSelf getID] withCode: 0 withMessage: @"No view found."]];
            return;
        }
        
        dispatch_async(dispatch_get_main_queue(), ^{
            BTFuseGoogleMapComponent* component = [[BTFuseGoogleMapComponent alloc] init: [strongSelf getContext] callbackID: nil];
            
            @synchronized (strongSelf->$maps) {
                [strongSelf->$maps setObject: component forKey: viewID];
            }
            
            [view setContent: component.view];
            component.view.translatesAutoresizingMaskIntoConstraints = false;
            
            [
                NSLayoutConstraint
                constraintWithItem: component.view
                attribute: NSLayoutAttributeTop
                relatedBy: NSLayoutRelationEqual
                toItem: view.view
                attribute: NSLayoutAttributeTop
                multiplier:1.0
                constant:0.0
            ].active = YES;
            
            [
                NSLayoutConstraint
                constraintWithItem: component.view
                attribute: NSLayoutAttributeBottom
                relatedBy: NSLayoutRelationEqual
                toItem: view.view
                attribute: NSLayoutAttributeBottom
                multiplier:1.0
                constant:0.0
            ].active = YES;
            
            [
                NSLayoutConstraint
                constraintWithItem: component.view
                attribute: NSLayoutAttributeLeft
                relatedBy: NSLayoutRelationEqual
                toItem: view.view
                attribute: NSLayoutAttributeLeft
                multiplier:1.0
                constant:0.0
            ].active = YES;
            
            [
                NSLayoutConstraint
                constraintWithItem: component.view
                attribute: NSLayoutAttributeRight
                relatedBy: NSLayoutRelationEqual
                toItem: view.view
                attribute: NSLayoutAttributeRight
                multiplier:1.0
                constant:0.0
            ].active = YES;
            
            [response sendNoContent];
        });
    }];
    
    
}

@end
