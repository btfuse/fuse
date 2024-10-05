
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

// Common API
export {Platform} from './Platform';
export {PlatformResolver} from './PlatformResolver';
export {FuseContext} from './FuseContext';
export {FuseContextBuilder} from './FuseContextBuilder';
export {Version} from './Version';
export {
    FuseAPI,
    TFuseAPIResponseData,
    IFuseAPICallPacket
} from './FuseAPI';
export {FuseCallbackManager, TFuseAPICallbackHandler} from './FuseCallbackManager';
export {FuseAPIResponse} from './FuseAPIResponse';
export {ContentType} from './ContentType';
export {FuseResponseReader} from './FuseResponseReader';
export {FuseAPIFactory} from './FuseAPIFactory';
export {AbstractFuseAPIFactory} from './AbstractFuseAPIFactory';
export {
    FuseRuntime,
    TPauseCallbackHandler,
    TResumeCallbackHandler,
    IRuntimeInfo
} from './plugins/FuseRuntime';
export {FusePlugin, TAPIBridgeFunction} from './FusePlugin';
export {HTTPFuseAPI} from './HTTPFuseAPI';
export {FuseError} from './FuseError';

// Utilities
export {ISerializable} from './ISerializable';
export {TSerializable, TFuseSerializable} from './TSerializable';
export {FuseSerializer} from './FuseSerializer';
export {IFusePermissionRequest} from './IFusePermissionRequest';
export {FusePermissionState} from './FusePermissionState';
export {
    FusePermissionRequest,
    TFuseAPIPermissionRequest,
    TFuseJustificationHandler,
    TFusePermissionRequestArguments
} from './FusePermissionRequest';
export {IFuseGrantResult} from './IFuseGrantResult';
export {FusePermissionGrantResult} from './FusePermissionGrantResult';

// Logger
export {FuseLoggerLevel} from './FuseLoggerLevel';
export {IFuseLogger, INativeLogEntry} from './IFuseLogger';
export {FuseLogger, FuseLoggerSerializer} from './FuseLogger';
export {AbstractFuseLoggerFactory} from './AbstractFuseLoggerFactory';
export {FuseLoggerFactory} from './FuseLoggerFactory';

// iOS Specific APIs / Implementations
export {IOSSchemeFuseAPI} from './ios/IOSSchemeFuseAPI';
export {IOSFuseLogger} from './ios/IOSFuseLogger';

// Android Specific APIs / Implementations
export {AndroidSchemeFuseAPI} from './android/AndroidSchemeFuseAPI';
export {AndroidFuseLogger} from './android/AndroidFuseLogger';
