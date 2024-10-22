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
#import <BTFuseGoogleMap/BTFuseGoogleMapComponent.h>
#import <GoogleMaps/GoogleMaps.h>

@implementation BTFuseGoogleMapComponent {
    BTFuseContext* $context;
    NSString* $callbackID;
}

- (instancetype) init:(BTFuseContext*) context callbackID:(NSString*) callbackID {
    self = [super init];
    $context = context;
    $callbackID = callbackID;
    return self;
}

- (void) loadView {
    GMSMapViewOptions* options = [[GMSMapViewOptions alloc] init];
    options.camera = [GMSCameraPosition cameraWithLatitude:1.285
                                                        longitude:103.848
                                                             zoom:12];
//    options.frame = self.view.bounds;

    GMSMapView *mapView = [[GMSMapView alloc] initWithOptions:options];
    self.view = mapView;
}

- (void) viewDidLoad {
    [super viewDidLoad];
}

@end
