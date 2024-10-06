
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

#ifndef BTFuseKeyPair_h
#define BTFuseKeyPair_h

#import <Security/Security.h>
#include <openssl/x509.h>

@interface BTFuseKeyPair: NSObject

- (instancetype) init NS_UNAVAILABLE;
- (instancetype) init:(EVP_PKEY*) key certificate:(X509*) certificate identifier:(NSString*) identifier;

- (SecKeyRef) getPrivate;
- (SecKeyRef) getPublic;
- (SecCertificateRef) getCertificate;
- (SecIdentityRef) getIdentity;
- (SecTrustRef) getTrust;
- (NSString*) getIdentifier;
- (X509*) getX509;

@end

#endif
