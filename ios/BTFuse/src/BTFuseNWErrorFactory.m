
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
#import "BTFuseNWErrorFactory.h"

@implementation BTFuseNWErrorFactory

+ (NSError*) create:(nw_error_t) nwError {
    nw_error_domain_t nwDomainCode = nw_error_get_error_domain(nwError);
    NSString* domain;
    CFStringRef domainRef = nil;
    switch (nwDomainCode) {
        case nw_error_domain_invalid:
        default:
            domain = @"invalid";
            break;
        case nw_error_domain_dns:
            domainRef = kNWErrorDomainDNS;
            break;
        case nw_error_domain_tls:
            domainRef = kNWErrorDomainTLS;
            break;
        case nw_error_domain_posix:
            domainRef = kNWErrorDomainPOSIX;
            break;
    }
    
    if (domainRef != nil) {
        CFIndex length = CFStringGetLength(domainRef);
        char buffer[length + 1];
        CFStringGetCString(domainRef, buffer, sizeof(buffer), kCFStringEncodingUTF8);
        domain = (__bridge_transfer NSString*)CFStringCreateWithCString(NULL, buffer, kCFStringEncodingUTF8);
    }
        
    return [
        [NSError alloc]
        initWithDomain: domain
        code: nw_error_get_error_code(nwError)
        userInfo: @{}
    ];
}

@end
