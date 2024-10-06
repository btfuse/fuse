
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
#import <Security/Security.h>
#import "BTFuseKeyPair.h"
#include <openssl/pem.h>
#include <openssl/pkcs12.h>
#include <openssl/obj_mac.h>
#import "BTFuseIDGenerator.h"

@implementation BTFuseKeyPair {
    EVP_PKEY* $key;
    X509* $certificate;
    BIO* $privateKeyData;
    SecIdentityRef $identity;
    SecTrustRef $trust;
    NSString* $identifier;
}

- (instancetype) init:(EVP_PKEY*) key certificate:(X509*) certificate identifier:(NSString*) identifier {
    self = [super init];
    
    $key = key;
    $certificate = certificate;
    $identifier = identifier;
    
    $privateKeyData = BIO_new(BIO_s_mem());
    
    if (!i2d_PrivateKey_bio($privateKeyData, $key)) {
        NSLog(@"Unable to fetch private key data");
        BIO_free($privateKeyData);
        X509_free($certificate);
        EVP_PKEY_free($key);
        return nil;
    }
    
    BTFuseIDGenerator* idgen = [[BTFuseIDGenerator alloc] init];
    NSString* pw = [idgen generate];
    const char* cPw = [pw UTF8String];
    
    PKCS12* p12 = PKCS12_create(cPw, "BTFuseAPIServerCertificates", $key, $certificate, NULL, NID_pbe_WithSHA1And3_Key_TripleDES_CBC, NID_pbe_WithSHA1And3_Key_TripleDES_CBC, 0, 0, 0);
    if (p12 == NULL) {
        NSLog(@"Unable to generate a P12 identity");
        return nil;
    }
    
    const EVP_MD* macAlgorithm = EVP_sha1();
    PKCS12_set_mac(p12, cPw, (int)strlen(cPw), NULL, 0, 2048, macAlgorithm);
    
    unsigned char* rawData = NULL;
    int size = i2d_PKCS12(p12, &rawData);
    
    if (size < 0) {
        PKCS12_free(p12);
        NSLog(@"Unable to encode P12 identity");
        return nil;
    }
    
    // Copy OpenSSL data into Objective-C dataland
    NSMutableData* data = [[NSMutableData alloc] init];
    [data setLength: size];
    void* buffer = [data mutableBytes];
    memcpy(buffer, rawData, size);
    free(rawData);
    PKCS12_free(p12);
    
    CFDataRef dataRef = (__bridge CFDataRef) data;
    
//    SecCertificateRef certRef = NULL;
    CFArrayRef items = NULL;
    
    OSStatus importStatus = SecPKCS12Import(
        dataRef,
        (__bridge CFDictionaryRef) @{
            (__bridge id)kSecImportExportPassphrase: pw
        },
        &items
    );
    
    if (importStatus != errSecSuccess) {
        NSLog(@"Failed to bridge PKCS12 with error: %d", (int)importStatus);
        return nil;
    }
    
    if (CFArrayGetCount(items) == 0) {
        NSLog(@"PKCS12 Import Failure, no objects found.");
        CFRelease(items);
        return nil;
    }
    
    CFDictionaryRef importItem = CFArrayGetValueAtIndex(items, 0);
    
    $identity = (SecIdentityRef) CFDictionaryGetValue(importItem, kSecImportItemIdentity);
    $trust = (SecTrustRef) CFDictionaryGetValue(importItem, kSecImportItemTrust);
    
    return self;
}


- (void) dealloc {}

- (SecKeyRef) getPrivate {
    char* rawData;
    NSMutableData* data = [[NSMutableData alloc] init];
    
    long dataLength = BIO_get_mem_data($privateKeyData, &rawData);
    
    if (dataLength < 0) {
        return nil;
    }
    
    [data setLength: dataLength];
    void* buffer = [data mutableBytes];
    memcpy(buffer, rawData, dataLength);
    
    return SecKeyCreateWithData(
        (__bridge CFDataRef)data,
        (__bridge CFDictionaryRef)@{
            (__bridge id)kSecAttrIsExtractable: @YES
        },
        NULL
    );
}

- (SecKeyRef) getPublic {
    unsigned char* rawData = NULL;
    int size = i2d_PublicKey($key, &rawData);
    
    if (size < 0) {
        return nil;
    }
    
    NSMutableData* data = [[NSMutableData alloc] init];
    [data setLength: size];
    void* buffer = [data mutableBytes];
    memcpy(buffer, rawData, size);
    free(rawData);
    
    return SecKeyCreateWithData(
        (__bridge CFDataRef)data,
        (__bridge CFDictionaryRef)@{
            (__bridge id)kSecAttrIsExtractable: @YES
        },
        NULL
    );
}

- (SecCertificateRef) getCertificate {
    unsigned char* rawData = NULL;
    int size = i2d_X509($certificate, &rawData);
    
    if (size < 0) {
        return nil;
    }
    
    NSMutableData* data = [[NSMutableData alloc] init];
    [data setLength: size];
    void* buffer = [data mutableBytes];
    memcpy(buffer, rawData, size);
    free(rawData);
    
    return SecCertificateCreateWithData(
        kCFAllocatorDefault,
        (__bridge CFDataRef)data
    );
}

- (SecIdentityRef) getIdentity {
    return $identity;
}

- (SecTrustRef) getTrust {
    return $trust;
}

- (NSString*) getIdentifier {
    return $identifier;
}

- (X509*) getX509 {
    return $certificate;
}

@end
