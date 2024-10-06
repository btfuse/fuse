
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
#import <Network/Network.h>
#import <CommonCrypto/CommonRandom.h>
#import <CoreFoundation/CoreFoundation.h>
#import "BTFuseAPIServer.h"
#import "BTFuseAPIResponse.h"
#import "BTFuseAPIPacket.h"
#import "BTFuseAPIRouter.h"
#import <BTFuse/BTFuseLogger.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#import <BTFuse/BTFuseAPIClient.h>
#import "BTFuseKeyFactory.h"
#import "BTFuseKeyPair.h"

const uint32_t BTFUSEAPISERVER_BUFFER_SIZE = 1024 * 1024; //1mb

@implementation BTFuseAPIServer {
    BTFuseContext* $context;
    int $sockFD;
    int $port;
    NSString* $secret;
    nw_listener_t $networkListener;
    struct sockaddr_in $serverAddress;
    nw_parameters_t $networkParams;
    nw_endpoint_t $networkEndpoint;
    dispatch_queue_t $networkServerThread;
    BTFuseKeyPair* $keypair;
}


NSString* $generateSecret(void) {
    size_t secretLength = 32; // Length in bytes
    uint8_t secretBytes[secretLength];
    
    OSStatus status = SecRandomCopyBytes(kSecRandomDefault, secretLength, secretBytes);
    if (status != errSecSuccess) {
        // Handle the error, generating a secure random secret failed
        return nil;
    }
    
    NSMutableString *secretString = [NSMutableString stringWithCapacity:secretLength * 2];
    for (size_t i = 0; i < secretLength; i++) {
        [secretString appendFormat:@"%02x", secretBytes[i]];
    }
    
    return [secretString copy];
}

- (instancetype) init:(BTFuseContext*) context {
    self = [super init];
    
    $context = context;
    
    BTFuseLogger* logger = [$context getLogger];
    
    $secret = $generateSecret();
    if ($secret == nil) {
        [logger error:@"BTFuseAPIServer: Secret Generation Failure"];
        return nil;
    }
    
    BTFuseKeyFactory* keyFactory = [BTFuseKeyFactory getInstance];
    $keypair = [keyFactory create];
    
    if ($keypair == nil) {
        [logger error:@"BTFuseAPIServer: Key Generation Failure"];
        return nil;
    }
    
    $networkServerThread = dispatch_queue_create("com.breautek.fuse.BTFuseAPIServer", DISPATCH_QUEUE_SERIAL);
    
    $networkParams = nw_parameters_create_secure_tcp(
        // TLS
        ^(nw_protocol_options_t options) {
            sec_protocol_options_t secureOptions = nw_tls_copy_sec_protocol_options(options);

            BTFuseAPIServer* server = self;
            
            SecIdentityRef identityRef = [server->$keypair getIdentity];
            sec_identity_t identity = sec_identity_create(identityRef);

            sec_protocol_options_set_local_identity(secureOptions, identity);
            sec_protocol_options_set_tls_server_name(secureOptions, "localhost");

            sec_protocol_options_set_challenge_block(secureOptions, ^(sec_protocol_metadata_t metadata, sec_protocol_challenge_complete_t complete) {
                NSLog(@"Received identity challenge");
                complete(identity);
            }, server->$networkServerThread);
        },
        NW_PARAMETERS_DEFAULT_CONFIGURATION //TCP
    );
    
    $serverAddress.sin_family = AF_INET;
    $serverAddress.sin_addr.s_addr = inet_addr("127.0.0.1");
    $serverAddress.sin_port = htons(0);
    $serverAddress.sin_len = sizeof($serverAddress);
    $networkEndpoint = nw_endpoint_create_address((const struct sockaddr*)&$serverAddress);
    nw_parameters_set_local_endpoint($networkParams, $networkEndpoint);

    $networkListener = nw_listener_create($networkParams);
    
    nw_listener_set_queue($networkListener, $networkServerThread);
    nw_listener_set_new_connection_limit($networkListener, NW_LISTENER_INFINITE_CONNECTION_LIMIT);
    nw_listener_set_new_connection_handler($networkListener, ^(nw_connection_t connection) {
        NSLog(@"Accepting new connection...");
        
        dispatch_queue_t connQueue = dispatch_queue_create("com.breautek.fuse.BTFuseAPIServer_ConnQueue", DISPATCH_QUEUE_SERIAL);
        nw_connection_set_queue(connection, connQueue);

        BTFuseAPIClient* client = [[BTFuseAPIClient alloc] init: connection];
        
        [client start:^(NSError* error) {
            if (error != nil) {
                [client close];
                return;
            }
            
            NSString* method = [client getHTTPMethod];
            BTFuseLogger* logger = [[self getContext] getLogger];
            [logger info: @"API Server Request (%@): (%@) %@", [client getID], method, [client getHTTPPath]];
            
            BTFuseContext* context = [self getContext];
            
            if ([method isEqualToString: @"OPTIONS"]) {
                BTFuseAPIResponse* res = [[context getResponseFactory] create: context client: client];
                [res sendNoContent];
                return;
            }
            
            NSString* givenSecret = [client getHTTPHeader:@"X-Fuse-Secret"];
            if (![[self getSecret] isEqualToString: givenSecret]) {
                [client close];
                return;
            }
            
            BTFuseAPIResponse* res = [[context getResponseFactory] create: context client: client];
            BTFuseAPIPacket* packet = [[BTFuseAPIPacket alloc] init: context route:[client getHTTPPath] headers: [client getHTTPHeaders] client:client];
            
            [[context getAPIRouter] execute: packet withResponse: res];
        }];
    });
    
    __block dispatch_semaphore_t onAPIServerReady = dispatch_semaphore_create(0);
    
    nw_listener_set_state_changed_handler($networkListener, ^(nw_listener_state_t state, nw_error_t error) {
        if (state == nw_connection_state_failed) {
            NSLog(@"Failed to open API server: %d", nw_error_get_error_code(error));
            return;
        }
        
        self->$port = nw_listener_get_port(self->$networkListener);
        dispatch_semaphore_signal(onAPIServerReady);
    });
    
    nw_listener_start($networkListener);
    
    dispatch_semaphore_wait(onAPIServerReady, DISPATCH_TIME_FOREVER);
    
    return self;
}

- (int) getPort {
    if ($port == 0) {
        NSLog(@"Warning: API Server has not been initialized.");
    }
    return $port;
}

- (NSString*) getSecret {
    return $secret;
}

- (BTFuseContext*) getContext {
    return $context;
}

- (BTFuseKeyPair*) getKeypair {
    return $keypair;
}

@end
