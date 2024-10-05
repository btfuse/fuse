
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

import * as api from '../src/api';
import {AbstractFuseAPIFactory} from '../src/AbstractFuseAPIFactory';
import {AbstractFuseLoggerFactory} from '../src/AbstractFuseLoggerFactory';
import {ContentType} from '../src/ContentType';
import {
    FuseAPI
} from '../src/FuseAPI';
import {FuseAPIFactory} from '../src/FuseAPIFactory';
import {FuseAPIResponse} from '../src/FuseAPIResponse';
import {FuseContext} from '../src/FuseContext';
import {FuseContextBuilder} from '../src/FuseContextBuilder';
import {FuseError} from '../src/FuseError';
import {
    FuseLogger,
    FuseLoggerSerializer
} from '../src/FuseLogger';
import {FuseLoggerFactory} from '../src/FuseLoggerFactory';
import {FuseLoggerLevel} from '../src/FuseLoggerLevel';
import {FusePermissionGrantResult} from '../src/FusePermissionGrantResult';
import {
    FusePermissionRequest
} from '../src/FusePermissionRequest';
import {FusePermissionState} from '../src/FusePermissionState';
import {
    FusePlugin
} from '../src/FusePlugin';
import {FuseCallbackManager} from '../src/FuseCallbackManager';
import {FuseResponseReader} from '../src/FuseResponseReader';
import {FuseSerializer} from '../src/FuseSerializer';
import {HTTPFuseAPI} from '../src/HTTPFuseAPI';
import {Platform} from '../src/Platform';
import {PlatformResolver} from '../src/PlatformResolver';
import {Version} from '../src/Version';

import * as testAPI from '../src/test/api';
import {FuseTestAPI} from '../src/test/FuseTestAPI';
import {FuseTestAPIFactory} from '../src/test/FuseTestAPIFactory';
import {FuseTestContextBuilder} from '../src/test/FuseTestContextBuilder';
import {FuseTestPlataformResolver} from '../src/test/FuseTestPlatformResolver';
import {IOSFuseLogger} from '../src/ios/IOSFuseLogger';
import {IOSSchemeFuseAPI} from '../src/ios/IOSSchemeFuseAPI';
import {AndroidFuseLogger} from '../src/android/AndroidFuseLogger';
import {AndroidSchemeFuseAPI} from '../src/android/AndroidSchemeFuseAPI';

describe('Public API', () => {

    it('AbstractFuseAPIFactory', () => {
        expect(api.AbstractFuseAPIFactory).toBe(AbstractFuseAPIFactory);
    });

    it('AbstractFuseLoggerFactory', () => {
        expect(api.AbstractFuseLoggerFactory).toBe(AbstractFuseLoggerFactory);
    });

    it('ContentType', () => {
        expect(api.ContentType).toBe(ContentType);
    });

    describe('FuseCallbackManager', () => {
        it('', () => {
            expect(api.FuseCallbackManager).toBe(FuseCallbackManager);
        });

        it('TFuseAPICallbackHandler', () => {
            const test: api.TFuseAPICallbackHandler = null;
        });
    });

    describe('Fuse API', () => {
        it('FuseAPI', () => {
            expect(api.FuseAPI).toBe(FuseAPI);
        });
    
        it('TFuseAPICallbackHandler', () => {
            const test: api.TFuseAPICallbackHandler = null;
        });
    
        it('IFuseAPICallPacket', () => {
            const test: api.IFuseAPICallPacket = null;
        });
    
        it('TFuseAPIResponseData', () => {
            const test: api.TFuseAPIResponseData = null;
        });
    });

    it('FuseAPIFactory', () => {
        expect(api.FuseAPIFactory).toBe(FuseAPIFactory);
    });

    it('FuseAPIResponse', () => {
        expect(api.FuseAPIResponse).toBe(FuseAPIResponse);
    });

    it('FuseContext', () => {
        expect(api.FuseContext).toBe(FuseContext);
    });

    it('FuseContextBuilder', () => {
        expect(api.FuseContextBuilder).toBe(FuseContextBuilder);
    });

    it('FuseError', () => {
        expect(api.FuseError).toBe(FuseError);
    });

    describe('FuseLogger', () => {
        it('FuseLogger', () => {
            expect(api.FuseLogger).toBe(FuseLogger);
        });

        it('FuseLoggerSerializer', () => {
            expect(api.FuseLoggerSerializer).toBe(FuseLoggerSerializer);
        });
    });
    
    it('FuseLoggerFactory', () => {
        expect(api.FuseLoggerFactory).toBe(FuseLoggerFactory);
    });

    it('FuseLoggerLevel', () => {
        expect(api.FuseLoggerLevel).toBe(FuseLoggerLevel);
    });

    it('FusePermissionGrantResult', () => {
        expect(api.FusePermissionGrantResult).toBe(FusePermissionGrantResult);
    });

    describe('FusePermissionRequest', () => {
        it('FusePermissionRequest', () => {
            expect(api.FusePermissionRequest).toBe(FusePermissionRequest);
        });

        it('TFuseAPIPermissionRequest', () => {
            const test: api.TFuseAPIPermissionRequest = null;
        });

        it('TFuseJustificationHandler', () => {
            const test: api.TFuseJustificationHandler = null;
        });

        it('TFusePermissionRequestArguments', () => {
            const test: api.TFusePermissionRequestArguments<number> = null;
        });
    });

    it('FusePermissionStatus', () => {
        expect(api.FusePermissionState).toBe(FusePermissionState);
    });
    
    describe('FusePlugin', () => {
        it('FusePlugin', () => {
            expect(api.FusePlugin).toBe(FusePlugin);
        });

        it('TAPIBridgeFunction', () => {
            const test: api.TAPIBridgeFunction = null;
        });
    });

    it('FuseResponseReader', () => {
        expect(api.FuseResponseReader).toBe(FuseResponseReader);
    });

    it('FuseSerializer', () => {
        expect(api.FuseSerializer).toBe(FuseSerializer);
    });

    it('HTTPFuseAPI', () => {
        expect(api.HTTPFuseAPI).toBe(HTTPFuseAPI);
    });

    it('IFuseGrantResult', () => {
        const test: api.IFuseGrantResult<number> = null;
    });

    it('IFuseLogger', () => {
        const test: api.IFuseLogger = null;
    });

    it('INativeLogEntry', () => {
        const test: api.INativeLogEntry = null;
    });

    it('IFusePermissionRequest', () => {
        const test: api.IFusePermissionRequest = null;
    });

    it('ISerializable', () => {
        const test: api.ISerializable = null; 
    });

    it('Platform', () => {
        expect(api.Platform).toBe(Platform);
    });

    it('PlatformResolver', () => {
        expect(api.PlatformResolver).toBe(PlatformResolver);
    });

    describe('TSerializable', () => {
        it('TSerializable', () => {
            const test: api.TSerializable = null;
        });
    
        it('TFuseSerializable', () => {
            const test: api.TFuseSerializable<number> = null;
        });
    });

    it('Version', () => {
        expect(api.Version).toBe(Version);
    });

    describe('iOS Public APIs', () => {
        it('IOSFuseLogger', () => {
            expect(api.IOSFuseLogger).toBe(IOSFuseLogger);
        });

        it('IOSSchemeFuseAPI', () => {
            expect(api.IOSSchemeFuseAPI).toBe(IOSSchemeFuseAPI);
        });
    });

    describe('Android Public APIs', () => {
        it('AndroidFuseLogger', () => {
            expect(api.AndroidFuseLogger).toBe(AndroidFuseLogger);
        });

        it('IOSSchemeFuseAPI', () => {
            expect(api.AndroidSchemeFuseAPI).toBe(AndroidSchemeFuseAPI);
        });
    });

    describe('Public Test APIs', () => {
        it('FuseTestAPI', () => {
            expect(testAPI.FuseTestAPI).toBe(FuseTestAPI);
        });

        it('FuseTestAPIFactory', () => {
            expect(testAPI.FuseTestAPIFactory).toBe(FuseTestAPIFactory);
        });

        it('FuseTestContextBuilder', () => {
            expect(testAPI.FuseTestContextBuilder).toBe(FuseTestContextBuilder);
        });

        it('FuseTestPlataformResolver', () => {
            expect(testAPI.FuseTestPlataformResolver).toBe(FuseTestPlataformResolver);
        });
    });
});
