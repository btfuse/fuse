
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

#import <permissionplugin/PPlugin.h>
#import <NBSFuse/NBSFuseContext.h>
#import <NBSFuse/NBSFuseAPIPacket.h>

@implementation PermissionPlugin

- (instancetype) init:(NBSFuseContext*) context {
    self = [super init: context];
    
    $lm = [[CLLocationManager alloc] init];
    $lm.delegate = self;
    
    return self;
}

- (NSString*) getID {
    return @"PermissionPlugin";
}

- (void) requestPermission:(NBSFuseAPIPacket*) packet response:(NBSFuseAPIResponse*) response {
    // Check for location services availability and authorization status
    if ([CLLocationManager locationServicesEnabled]) {
        if ([CLLocationManager authorizationStatus] == kCLAuthorizationStatusNotDetermined) {
            [$lm requestWhenInUseAuthorization]; // or requestAlwaysAuthorization for background location access
        } else if ([CLLocationManager authorizationStatus] == kCLAuthorizationStatusAuthorizedWhenInUse || [CLLocationManager authorizationStatus] == kCLAuthorizationStatusAuthorizedAlways) {
            // Location services are authorized; you can start using location updates
            [$lm startUpdatingLocation];
        }
    } else {
        // Location services are not enabled; handle accordingly
        [response sendError:[[NBSFuseError alloc] init:@"PermissionPlugin" withCode:0 withMessage:@"Location Services are not enabled"]];
    }
}

- (void) initHandles {
    __weak PermissionPlugin* weakSelf = self;
    [self attachHandler:@"/requestPermission" callback:^void(NBSFuseAPIPacket* packet, NBSFuseAPIResponse* response) {
        [weakSelf requestPermission:packet response:response];
    }];
}

@end
