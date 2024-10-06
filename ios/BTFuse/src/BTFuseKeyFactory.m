
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
#import "BTFuseKeyFactory.h"
#import "BTFuseKeyPair.h"
#import "BTFuseIDGenerator.h"
#include <openssl/pem.h>
#include <openssl/x509.h>
#include <openssl/rsa.h>

@implementation BTFuseKeyFactory

- (instancetype) init {
    self = [super init];
    
    return self;
}

+ (instancetype) getInstance {
    static BTFuseKeyFactory* instance = nil;
    static dispatch_once_t construct;
    dispatch_once(&construct, ^{
        instance = [[self alloc] init];
    });
    return instance;
}

- (BTFuseKeyPair*) create {
    
    EVP_PKEY* key = EVP_RSA_gen(2048);
    
    if (!key) {
        NSLog(@"Error generating keypair");
        return nil;
    }
    
    X509* x509 = X509_new();
    if (!x509) {
        NSLog(@"Error generating certificate");
        EVP_PKEY_free(key);
        return nil;
    }
    
    ASN1_INTEGER_set(X509_get_serialNumber(x509), 1);
    
    // Make certificate valid for a year
    X509_gmtime_adj(X509_get_notBefore(x509), 0);
    X509_gmtime_adj(X509_get_notAfter(x509), 31536000L);
    X509_set_pubkey(x509, key);
    
    BTFuseIDGenerator* idgen = [[BTFuseIDGenerator alloc] init];
    NSString* nsSignature = [idgen generate];
    
    unsigned char* signature = (unsigned char*)strdup([nsSignature UTF8String]);
    
    X509_NAME* name = X509_get_subject_name(x509);
    
    X509_NAME_add_entry_by_txt(name, "CN", MBSTRING_ASC, (unsigned char *)"localhost", -1, -1, 0);
    X509_NAME_add_entry_by_txt(name, "OU", MBSTRING_ASC, (unsigned char *)"Fuse", -1, -1, 0);
    X509_NAME_add_entry_by_txt(name, "O", MBSTRING_ASC, (unsigned char *)"Breautek", -1, -1, 0);
    X509_NAME_add_entry_by_txt(name, "L", MBSTRING_ASC, (unsigned char *)"Moncton", -1, -1, 0);
    X509_NAME_add_entry_by_txt(name, "ST", MBSTRING_ASC, (unsigned char *)"NB", -1, -1, 0);
    X509_NAME_add_entry_by_txt(name, "C", MBSTRING_ASC, (unsigned char *)"Canada", -1, -1, 0);
    X509_NAME_add_entry_by_txt(name, "UID", MBSTRING_ASC, signature, -1, -1, 0);
    X509_set_issuer_name(x509, name);
    
    if (!X509_sign(x509, key, EVP_sha384())) {
        NSLog(@"Unable to sign certificate");
        X509_free(x509);
        EVP_PKEY_free(key);
        return nil;
    }
    
    // From this point on, BTFuseKeyPair will assume ownership of the key and x509 objects
    
    return [[BTFuseKeyPair alloc] init: key certificate: x509 identifier: nsSignature];
}

@end
