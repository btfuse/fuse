/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@btfuse/core/lib/AbstractFuseAPIFactory.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/AbstractFuseAPIFactory.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractFuseAPIFactory = void 0;
/**
 * An factory class that defines the base signature for creating a FuseAPI bridge object.
 */
class AbstractFuseAPIFactory {
}
exports.AbstractFuseAPIFactory = AbstractFuseAPIFactory;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/AbstractFuseLoggerFactory.js":
/*!********************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/AbstractFuseLoggerFactory.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractFuseLoggerFactory = void 0;
/**
 * An FuseLogger factory for creating logging instances.
 */
class AbstractFuseLoggerFactory {
    constructor() { }
}
exports.AbstractFuseLoggerFactory = AbstractFuseLoggerFactory;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/ContentType.js":
/*!******************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/ContentType.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContentType = void 0;
/**
 * Some common data types
 */
var ContentType;
(function (ContentType) {
    ContentType["TEXT"] = "text/plain";
    ContentType["JSON"] = "application/json";
    ContentType["JAVASCRIPT"] = "text/javascript";
    ContentType["WASM"] = "application/wasm";
    ContentType["BINARY"] = "application/octet-stream";
})(ContentType || (exports.ContentType = ContentType = {}));


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseAPI.js":
/*!**************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseAPI.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseAPI = void 0;
const FuseSerializer_1 = __webpack_require__(/*! ./FuseSerializer */ "./node_modules/@btfuse/core/lib/FuseSerializer.js");
const FuseCallbackManager_1 = __webpack_require__(/*! ./FuseCallbackManager */ "./node_modules/@btfuse/core/lib/FuseCallbackManager.js");
/**
 * Base class for the Fuse API bridge for exchanging data with the native platform
 */
class FuseAPI {
    constructor() {
        this.$serializer = this._createSerializer();
    }
    _createSerializer() {
        return new FuseSerializer_1.FuseSerializer();
    }
    getSerializer() {
        return this.$serializer;
    }
    _createRoute(pluginID, method) {
        return `/api/${pluginID}${method}`;
    }
    async execute(pluginID, method, contentType, args) {
        return this._execute(pluginID, method, contentType, this.$serializer.serialize(args));
    }
    createCallbackContext(cb) {
        return FuseCallbackManager_1.FuseCallbackManager.getInstance().createCallback(cb);
    }
    releaseCallback(id) {
        FuseCallbackManager_1.FuseCallbackManager.getInstance().releaseCallback(id);
    }
}
exports.FuseAPI = FuseAPI;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseAPIFactory.js":
/*!*********************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseAPIFactory.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseAPIFactory = void 0;
const AbstractFuseAPIFactory_1 = __webpack_require__(/*! ./AbstractFuseAPIFactory */ "./node_modules/@btfuse/core/lib/AbstractFuseAPIFactory.js");
const Platform_1 = __webpack_require__(/*! ./Platform */ "./node_modules/@btfuse/core/lib/Platform.js");
const IOSSchemeFuseAPI_1 = __webpack_require__(/*! ./ios/IOSSchemeFuseAPI */ "./node_modules/@btfuse/core/lib/ios/IOSSchemeFuseAPI.js");
const AndroidSchemeFuseAPI_1 = __webpack_require__(/*! ./android/AndroidSchemeFuseAPI */ "./node_modules/@btfuse/core/lib/android/AndroidSchemeFuseAPI.js");
/**
 * A FuseAPI factory that uses the HTTP/app scheme as the bridge.
 */
class FuseAPIFactory extends AbstractFuseAPIFactory_1.AbstractFuseAPIFactory {
    constructor() {
        super();
        // Realistically there will only be one or the other set.
        this.$iosScheme = null;
        this.$androidScheme = null;
    }
    create(platform) {
        switch (platform) {
            case Platform_1.Platform.IOS: return this._createiOSAPI();
            case Platform_1.Platform.ANDROID: return this._createAndroidAPI();
            default: throw new Error('Unsupported platform: ' + platform);
        }
    }
    _createiOSAPI() {
        if (!this.$iosScheme) {
            this.$iosScheme = new IOSSchemeFuseAPI_1.IOSSchemeFuseAPI();
        }
        return this.$iosScheme;
    }
    _createAndroidAPI() {
        if (!this.$androidScheme) {
            this.$androidScheme = new AndroidSchemeFuseAPI_1.AndroidSchemeFuseAPI();
        }
        return this.$androidScheme;
    }
}
exports.FuseAPIFactory = FuseAPIFactory;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseAPIResponse.js":
/*!**********************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseAPIResponse.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseAPIResponse = void 0;
const FuseResponseReader_1 = __webpack_require__(/*! ./FuseResponseReader */ "./node_modules/@btfuse/core/lib/FuseResponseReader.js");
const FuseError_1 = __webpack_require__(/*! ./FuseError */ "./node_modules/@btfuse/core/lib/FuseError.js");
class FuseAPIResponse {
    constructor(content, headers, status) {
        this.$status = status;
        this.$content = content;
        this.$headers = this.$parseHeaders(headers);
    }
    isError() {
        return this.$status >= 400;
    }
    getContentLength() {
        var _a;
        const lenStr = (_a = this.$headers.get('content-type')) === null || _a === void 0 ? void 0 : _a[0];
        let length = parseInt(lenStr);
        if (isNaN(length)) {
            length = 0;
        }
        return length;
    }
    getContentType() {
        var _a;
        return (_a = this.$headers.get('content-type')) === null || _a === void 0 ? void 0 : _a[0];
    }
    async readAsArrayBuffer() {
        return this.$content;
    }
    async readAsBlob() {
        return new Blob([this.$content]);
    }
    async readAsText() {
        return await FuseResponseReader_1.FuseResponseReader.readAsText(this.$content);
    }
    async readAsJSON() {
        return await FuseResponseReader_1.FuseResponseReader.readAsJSON(this.$content);
    }
    async readAsError() {
        const serializedError = await FuseResponseReader_1.FuseResponseReader.readAsJSON(this.$content);
        return FuseError_1.FuseError.fromSerialized(serializedError);
    }
    getHeaders() {
        return this.$headers;
    }
    getHeader(key) {
        return this.$headers.get(key);
    }
    $parseHeaders(headers) {
        const map = new Map();
        if (!headers) {
            return map;
        }
        const lines = headers.split('\r\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].split(':');
            const key = line[0];
            if (!map.has(key)) {
                map.set(key, []);
            }
            const headerValue = map.get(key);
            headerValue.push(line[1]);
        }
        return map;
    }
}
exports.FuseAPIResponse = FuseAPIResponse;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseCallbackManager.js":
/*!**************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseCallbackManager.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseCallbackManager = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
const UUID = tslib_1.__importStar(__webpack_require__(/*! uuid */ "./node_modules/uuid/dist/commonjs-browser/index.js"));
window.__btfuse_callbacks = new Map();
window.__btfuse_doCallback = function (callbackID, data) {
    if (callbackID && window.__btfuse_callbacks.has(callbackID)) {
        window.__btfuse_callbacks.get(callbackID)(data);
    }
};
/**
 * A singleton manager to manage native callbacks.
 *
 * Create a callback context and pass the return context id to native clients,
 * in which they can use to respond back.
 *
 * Note that plugin APIs are far more efficient and can handle a diverse set of data,
 * including large payloads, so when possible it's best to use a plugin API instead of a
 * callback API.
 *
 * This callback API is however, useful for building listener kind of services where the native
 * needs to continously callback to the webview with small data packets.
 */
class FuseCallbackManager {
    constructor() { }
    static getInstance() {
        if (!FuseCallbackManager.$instance) {
            FuseCallbackManager.$instance = new FuseCallbackManager();
        }
        return FuseCallbackManager.$instance;
    }
    createCallback(cb) {
        const id = UUID.v4();
        window.__btfuse_callbacks.set(id, (data) => {
            cb(data);
        });
        return id;
    }
    releaseCallback(id) {
        window.__btfuse_callbacks.delete(id);
    }
}
exports.FuseCallbackManager = FuseCallbackManager;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseContext.js":
/*!******************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseContext.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseContext = void 0;
const FuseRuntime_1 = __webpack_require__(/*! ./plugins/FuseRuntime */ "./node_modules/@btfuse/core/lib/plugins/FuseRuntime.js");
const Version_1 = __webpack_require__(/*! ./Version */ "./node_modules/@btfuse/core/lib/Version.js");
/**
 * A context class that holds Fuse Framework state
 */
class FuseContext {
    constructor(platform, apiFactory, logger) {
        this.$platform = platform;
        this.$logger = logger;
        this.$runtimeVersion = null;
        this.$defaultAPIFactory = apiFactory;
        this.$runtime = new FuseRuntime_1.FuseRuntime(this);
    }
    getLogger() {
        return this.$logger;
    }
    getDefaultAPIFactory() {
        return this.$defaultAPIFactory;
    }
    getPlatform() {
        return this.$platform;
    }
    async $getRuntimeInfo() {
        if (!this.$runtimeInfo) {
            this.$runtimeInfo = await this.$runtime.getInfo();
        }
        return this.$runtimeInfo;
    }
    async getPlatformVersion() {
        if (!this.$runtimeVersion) {
            const info = await this.$getRuntimeInfo();
            this.$runtimeVersion = Version_1.Version.parseVersionString(info.version);
        }
        return this.$runtimeVersion;
    }
    async isDebugMode() {
        const info = await this.$getRuntimeInfo();
        return info.debugMode;
    }
    async registerPauseHandler(callback) {
        return await this.$runtime.registerPauseHandler(callback);
    }
    async unregisterPauseHandler(callbackID) {
        return await this.$runtime.unregisterPauseHandler(callbackID);
    }
    async registerResumeHandler(callback) {
        return await this.$runtime.registerResumeHandler(callback);
    }
    async unregisterResumeHandler(callbackID) {
        return await this.$runtime.unregisterResumeHandler(callbackID);
    }
}
exports.FuseContext = FuseContext;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseContextBuilder.js":
/*!*************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseContextBuilder.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseContextBuilder = void 0;
const FuseAPIFactory_1 = __webpack_require__(/*! ./FuseAPIFactory */ "./node_modules/@btfuse/core/lib/FuseAPIFactory.js");
const FuseContextFactory_1 = __webpack_require__(/*! ./FuseContextFactory */ "./node_modules/@btfuse/core/lib/FuseContextFactory.js");
const FuseLoggerFactory_1 = __webpack_require__(/*! ./FuseLoggerFactory */ "./node_modules/@btfuse/core/lib/FuseLoggerFactory.js");
const FuseLoggerLevel_1 = __webpack_require__(/*! ./FuseLoggerLevel */ "./node_modules/@btfuse/core/lib/FuseLoggerLevel.js");
const PlatformResolver_1 = __webpack_require__(/*! ./PlatformResolver */ "./node_modules/@btfuse/core/lib/PlatformResolver.js");
class FuseContextBuilder {
    constructor() {
        this.$loggerFactory = null;
        this.$apiFactory = null;
        this.$platformResolver = new PlatformResolver_1.PlatformResolver();
    }
    setPlatformResolver(resolver) {
        this.$platformResolver = resolver;
        return this;
    }
    setAPIFactory(factory) {
        this.$apiFactory = factory;
        return this;
    }
    setLoggerFactory(factory) {
        this.$loggerFactory = factory;
        return this;
    }
    async _isDebugMode(context) {
        return await context.isDebugMode();
    }
    async build() {
        const platform = this.$platformResolver.resolve();
        let apiFactory;
        if (this.$apiFactory) {
            apiFactory = this.$apiFactory;
        }
        else {
            apiFactory = new FuseAPIFactory_1.FuseAPIFactory();
        }
        let loggerFactory;
        if (this.$loggerFactory) {
            loggerFactory = this.$loggerFactory;
        }
        else {
            loggerFactory = new FuseLoggerFactory_1.FuseLoggerFactory(platform);
        }
        const contextFactory = new FuseContextFactory_1.FuseContextFactory();
        const context = contextFactory.create(platform, apiFactory, loggerFactory.create());
        // const context: FuseContext = new FuseContext(platform, apiFactory, loggerFactory);
        const isDebugMode = await this._isDebugMode(context);
        const logger = context.getLogger();
        logger.enableNativeBridge(isDebugMode);
        let level = logger.getLevel();
        level |= FuseLoggerLevel_1.FuseLoggerLevel.DEBUG;
        logger.setLevel(level);
        return context;
    }
}
exports.FuseContextBuilder = FuseContextBuilder;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseContextFactory.js":
/*!*************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseContextFactory.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2024 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseContextFactory = void 0;
const AndroidFuseContext_1 = __webpack_require__(/*! ./android/AndroidFuseContext */ "./node_modules/@btfuse/core/lib/android/AndroidFuseContext.js");
const IOSFuseContext_1 = __webpack_require__(/*! ./ios/IOSFuseContext */ "./node_modules/@btfuse/core/lib/ios/IOSFuseContext.js");
const Platform_1 = __webpack_require__(/*! ./Platform */ "./node_modules/@btfuse/core/lib/Platform.js");
class FuseContextFactory {
    create(platform, apiFactory, logger) {
        switch (platform) {
            case Platform_1.Platform.ANDROID:
                return new AndroidFuseContext_1.AndroidFuseContext(apiFactory, logger);
            case Platform_1.Platform.IOS:
                return new IOSFuseContext_1.IOSFuseContext(apiFactory, logger);
            case Platform_1.Platform.TEST: return null;
        }
    }
}
exports.FuseContextFactory = FuseContextFactory;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseError.js":
/*!****************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseError.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseError = void 0;
/**
 * A structured error object.
 */
class FuseError extends Error {
    /**
     * @param domain - The error domain, usually represents a library, class, or plugin.
     * @param message - The error message
     * @param cause - The underlying cause of the error. May be null.
     * @param code - An error code. May be null.
     */
    constructor(domain, message, cause, code) {
        super(message);
        this.name = this.constructor.name;
        this.$domain = domain;
        this.$message = message;
        this.$code = code || 0;
        this.$cause = cause || null;
    }
    /**
     * @returns The error message
     */
    getMessage() {
        return this.$message;
    }
    /**
     * @returns The error domain, usually representing a library, class, or plugin.
     */
    getDomain() {
        return this.$domain;
    }
    /**
     * @returns The error code
     */
    getCode() {
        return this.$code;
    }
    /**
     * @returns The underlying cause of the error, if known. May be null.
     */
    getCause() {
        return this.$cause;
    }
    /**
     * @returns A serialized object representing an error.
     */
    serialize() {
        return {
            domain: this.getDomain(),
            message: this.getMessage(),
            code: this.getCode(),
            stack: this.stack
        };
    }
    /**
     * Wraps the given object into a FuseError object. Accepts several different
     * formats, which influences the behaviour of this method.
     *
     * If the input is a string, a FuseError object is created with the string as
     * the error message of an unknown domain.
     *
     * If the input is a FuseError, then this method does nothing but passes through
     * the FuseError. The returned FuseError is the input FuseError, a copy is not made.
     *
     * If the input is an Error, then a FuseError is created using the name as the
     * domain, and it's message as the error message. The error object is also used
     * as the FuseError's cause parameter.
     *
     * If the input is of the shape of IFuseErrorSerialized, then the object is
     * deserialized into a FuseError instance.
     *
     * If any other type of object is given, an console error message will be
     * printed and a "FuseError" domain error will be returned stating the error
     * is not wrappable.
     *
     * @param error - A value that can represent an error
     * @returns A FuseError instance
     */
    static wrap(error) {
        let ferr = null;
        if (typeof error === 'string') {
            ferr = new FuseError('Unknown', error, null, 0);
        }
        else if (error instanceof FuseError) {
            ferr = error;
        }
        else if (error instanceof Error) {
            ferr = new FuseError(error.name, error.message, error, 0);
        }
        else if (FuseError.$isSerializedFuseError(error)) {
            ferr = FuseError.fromSerialized(error);
        }
        else {
            console.error('Unwrappable Error', error);
            ferr = new FuseError('FuseError', 'Unwrappable error', null, 0);
        }
        return ferr;
    }
    /**
     * Deserializes and creates a new FuseError instance
     *
     * @param error - The serialized error object
     * @returns A FuseError instance
     */
    static fromSerialized(error) {
        return new FuseError(error.domain, error.message, null, error.code);
    }
    toString() {
        return 'FuseError';
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static $isSerializedFuseError(error) {
        return 'message' in error && 'domain' in error && 'code' in error;
    }
}
exports.FuseError = FuseError;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseLogger.js":
/*!*****************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseLogger.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLogger = exports.FuseLoggerSerializer = void 0;
const FuseLoggerLevel_1 = __webpack_require__(/*! ./FuseLoggerLevel */ "./node_modules/@btfuse/core/lib/FuseLoggerLevel.js");
/**
 * A serializer for logging. This is different than a {@link FuseSerializer} in
 * that in serializer transforms objects into a printable string representation.
 */
class FuseLoggerSerializer {
    constructor() { }
    _serializeToString(obj) {
        if (typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === 'string') {
            return this._serializePrimitiveToString(obj);
        }
        else if (obj instanceof Date) {
            return this._serializeDateToString(obj);
        }
        else if (this._isISerializable(obj)) {
            return this._serializeToString(obj.serialize());
        }
        else if (obj instanceof Error) {
            return this._serializeErrorToString(obj);
        }
        // When all else fails, attempt to JSON stringify
        return JSON.stringify(obj, null, 4);
    }
    _serializePrimitiveToString(obj) {
        return obj.toString();
    }
    _serializeErrorToString(obj) {
        const serializedError = {
            name: obj.name,
            message: obj.message,
            stack: obj.stack
        };
        return JSON.stringify(serializedError, null, 4);
    }
    _serializeDateToString(obj) {
        return obj.toISOString();
    }
    /**
     * @remarks
     * Serializes an object into a printable string.
     *
     * @param obj - The object to serialize
     * @returns A printable string
     */
    serialize(obj) {
        if (obj === null || obj === undefined) {
            return null;
        }
        let out = null;
        if (obj instanceof Blob) {
            out = `[Blob ${obj.type || 'Binary'} (${obj.size} bytes)]`;
        }
        else if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || obj instanceof Date) {
            out = this._serializeToString(obj);
        }
        else if (obj instanceof ArrayBuffer) {
            out = `[ArrayBuffer (${obj.byteLength} bytes)]`;
        }
        else if (this._isISerializable(obj)) {
            out = this.serialize(obj.serialize());
        }
        else {
            // should be either JSON objects or json arrays at this point
            out = this._serializeToString(obj);
        }
        return out;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _isISerializable(x) {
        return !!x.serialize && typeof x.serialize === 'function';
    }
}
exports.FuseLoggerSerializer = FuseLoggerSerializer;
/**
 * A base logger implementation which includes a serializer for common types.
 * It will serialize/accept all values that TSerializable accepts, however Blob/ArrayBuffer
 * or other binary data types will not be serialized. Instead it will print an
 * object identifier, with mime type if present, along with the size of the buffer.
 *
 * The base logger does not provide any native bridging. While usable for purely webview side,
 * use the FuseLoggerFactory to get a logger specific for your runtime environment.
 */
class FuseLogger {
    constructor() {
        this.$enableNativeBridge = true;
        this.$level = FuseLoggerLevel_1.FuseLoggerLevel.INFO | FuseLoggerLevel_1.FuseLoggerLevel.WARN | FuseLoggerLevel_1.FuseLoggerLevel.ERROR;
        this.$serializer = new FuseLoggerSerializer();
        this._registerNativeCalblack();
    }
    _registerNativeCalblack() { }
    /**
     *
     * @param level - A bitmask option to indicate which levels to log.
     *
     * @example
     * To report on WARN and ERROR only, you would set:
     *
     * ```typescript
     * logger.setLevel(FuseLoggerLevel.WARN | FuseLoggerLevel.ERROR);
     * ```
     */
    setLevel(level) {
        this.$level = level;
    }
    /**
     *
     * @returns The current log level bitmask.
     */
    getLevel() {
        return this.$level;
    }
    /**
     * @remarks
     * If enabled, The native FuseLogger will pass native log messages to
     * the webview and will be logged into the JS console. Logs passed through
     * this logger will also be passed to the native environment and will be
     * logged in the native's logging console.
     *
     * This can be helpful in debugging where all logs will be in the same place,
     * however, logging can be verbose and can cause a degration of performance,
     * therefore it may not be desirable to have enabled for production builds.
     *
     * This feature is currently enabled by default, however this is subject to
     * change.
     *
     * @param flag - enables the native bridge logging if enabled.
     */
    enableNativeBridge(flag) {
        this.$enableNativeBridge = !!flag;
    }
    _onNativeLogEntry(entry) {
        if (!(this.getLevel() & entry.level)) {
            return;
        }
        if (entry.level === FuseLoggerLevel_1.FuseLoggerLevel.SILENT) {
            return;
        }
        switch (entry.level) {
            case FuseLoggerLevel_1.FuseLoggerLevel.DEBUG:
                console.debug(entry.message);
                break;
            case FuseLoggerLevel_1.FuseLoggerLevel.INFO:
                console.info(entry.message);
                break;
            case FuseLoggerLevel_1.FuseLoggerLevel.WARN:
                console.warn(entry.message);
                break;
            case FuseLoggerLevel_1.FuseLoggerLevel.ERROR:
                console.error(entry.message);
                break;
        }
    }
    /**
     * @virtual - Implementators use this method to call on the native logging API.
     * @param level - The log level for this log print
     * @param message - Overridable hook to send logs to the native environment
     */
    _logToNative(level, message) { }
    $logToNative(level, args) {
        if (!this.$enableNativeBridge) {
            return;
        }
        const serializedArgs = [];
        for (let i = 0; i < args.length; i++) {
            serializedArgs.push(this.$serializer.serialize(args[i]));
        }
        this._logToNative(level, serializedArgs.join('\t'));
    }
    /**
     * @param args - variadic arguments of serializable objects to log to the console
     */
    debug(...args) {
        if (!(this.$level & FuseLoggerLevel_1.FuseLoggerLevel.DEBUG)) {
            return;
        }
        console.debug(...args);
        this.$logToNative(FuseLoggerLevel_1.FuseLoggerLevel.DEBUG, args);
    }
    /**
     * @param args - variadic arguments of serializable objects to log to the console
     */
    info(...args) {
        if (!(this.$level & FuseLoggerLevel_1.FuseLoggerLevel.INFO)) {
            return;
        }
        console.info(...args);
        this.$logToNative(FuseLoggerLevel_1.FuseLoggerLevel.INFO, args);
    }
    /**
     * @param args - variadic arguments of serializable objects to log to the console
     */
    warn(...args) {
        if (!(this.$level & FuseLoggerLevel_1.FuseLoggerLevel.WARN)) {
            return;
        }
        console.warn(...args);
        this.$logToNative(FuseLoggerLevel_1.FuseLoggerLevel.WARN, args);
    }
    /**
     * @param args - variadic arguments of serializable objects to log to the console
     */
    error(...args) {
        if (!(this.$level & FuseLoggerLevel_1.FuseLoggerLevel.ERROR)) {
            return;
        }
        console.error(...args);
        this.$logToNative(FuseLoggerLevel_1.FuseLoggerLevel.ERROR, args);
    }
}
exports.FuseLogger = FuseLogger;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseLoggerFactory.js":
/*!************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseLoggerFactory.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLoggerFactory = void 0;
const FuseLogger_1 = __webpack_require__(/*! ./FuseLogger */ "./node_modules/@btfuse/core/lib/FuseLogger.js");
const Platform_1 = __webpack_require__(/*! ./Platform */ "./node_modules/@btfuse/core/lib/Platform.js");
const IOSFuseLogger_1 = __webpack_require__(/*! ./ios/IOSFuseLogger */ "./node_modules/@btfuse/core/lib/ios/IOSFuseLogger.js");
const AndroidFuseLogger_1 = __webpack_require__(/*! ./android/AndroidFuseLogger */ "./node_modules/@btfuse/core/lib/android/AndroidFuseLogger.js");
/**
 * A default logger factory for creating loggers for the given platform.
 */
class FuseLoggerFactory {
    /**
     *
     * @param platform - The current Platform in this runtime environment
     */
    constructor(platform) {
        this.$platform = platform;
    }
    /**
     * Creates a FuseLogger for the current Platform.
     *
     * @returns A logger instance
     */
    create() {
        switch (this.$platform) {
            case Platform_1.Platform.IOS:
                return new IOSFuseLogger_1.IOSFuseLogger();
            case Platform_1.Platform.ANDROID:
                return new AndroidFuseLogger_1.AndroidFuseLogger();
            case Platform_1.Platform.TEST:
                return new FuseLogger_1.FuseLogger();
        }
    }
}
exports.FuseLoggerFactory = FuseLoggerFactory;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseLoggerLevel.js":
/*!**********************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseLoggerLevel.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLoggerLevel = void 0;
/**
 * A bitmask option of logger levels
 */
var FuseLoggerLevel;
(function (FuseLoggerLevel) {
    FuseLoggerLevel[FuseLoggerLevel["SILENT"] = 0] = "SILENT";
    FuseLoggerLevel[FuseLoggerLevel["DEBUG"] = 1] = "DEBUG";
    FuseLoggerLevel[FuseLoggerLevel["INFO"] = 2] = "INFO";
    FuseLoggerLevel[FuseLoggerLevel["WARN"] = 4] = "WARN";
    FuseLoggerLevel[FuseLoggerLevel["ERROR"] = 8] = "ERROR";
})(FuseLoggerLevel || (exports.FuseLoggerLevel = FuseLoggerLevel = {}));


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FusePermissionGrantResult.js":
/*!********************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FusePermissionGrantResult.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FusePermissionGrantResult = void 0;
const FusePermissionState_1 = __webpack_require__(/*! ./FusePermissionState */ "./node_modules/@btfuse/core/lib/FusePermissionState.js");
class FusePermissionGrantResult {
    constructor(results) {
        this.$results = results;
    }
    isGranted(permission) {
        return this.$results[permission] === FusePermissionState_1.FusePermissionState.GRANTED;
    }
    isAllGranted() {
        for (const i in this.$results) {
            if (this.$results[i] !== FusePermissionState_1.FusePermissionState.GRANTED) {
                return false;
            }
        }
        return true;
    }
    rejectJustifications() {
        for (const i in this.$results) {
            if (this.$results[i] === FusePermissionState_1.FusePermissionState.REQUIRES_JUSTIFICATION) {
                this.$results[i] = FusePermissionState_1.FusePermissionState.DENIED;
            }
        }
    }
    shouldJustify() {
        for (const i in this.$results) {
            if (this.$results[i] === FusePermissionState_1.FusePermissionState.REQUIRES_JUSTIFICATION) {
                return true;
            }
        }
        return false;
    }
}
exports.FusePermissionGrantResult = FusePermissionGrantResult;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FusePermissionRequest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FusePermissionRequest.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FusePermissionRequest = void 0;
const ContentType_1 = __webpack_require__(/*! ./ContentType */ "./node_modules/@btfuse/core/lib/ContentType.js");
const FuseError_1 = __webpack_require__(/*! ./FuseError */ "./node_modules/@btfuse/core/lib/FuseError.js");
const FusePermissionGrantResult_1 = __webpack_require__(/*! ./FusePermissionGrantResult */ "./node_modules/@btfuse/core/lib/FusePermissionGrantResult.js");
/**
 * Abstract class to handle permission request.
 * Concrete classes should implement the protected _request method to call on their
 * permission request Fuse API.
 */
class FusePermissionRequest {
    constructor(apiBridge, permissionSet, justificationHandler = null) {
        if (!permissionSet || (permissionSet && permissionSet.length === 0)) {
            throw new FuseError_1.FuseError(FusePermissionRequest.TAG, 'At least one permission is required');
        }
        this.$api = apiBridge;
        this.$permissionSet = permissionSet;
        this.$justificationHandler = justificationHandler;
    }
    getPermissionSet() {
        return this.$permissionSet;
    }
    async $request(isJustified) {
        const response = await this.$api(ContentType_1.ContentType.JSON, {
            permissionSet: this.getPermissionSet(),
            isJustified: isJustified
        });
        if (response.isError()) {
            throw await response.readAsError();
        }
        return new FusePermissionGrantResult_1.FusePermissionGrantResult(await response.readAsJSON());
    }
    async $onJustificationRequest() {
        if (!this.$justificationHandler) {
            console.warn('Permission requires justification, but this request has no TJustificationHandler');
            return false;
        }
        return await this.$justificationHandler();
    }
    async request() {
        let results = await this.$request(false);
        if (results.shouldJustify()) {
            if (await this.$onJustificationRequest()) {
                results = await this.$request(true);
            }
            else {
                results.rejectJustifications();
            }
        }
        return results;
    }
}
exports.FusePermissionRequest = FusePermissionRequest;
FusePermissionRequest.TAG = 'PermissionRequest';


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FusePermissionState.js":
/*!**************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FusePermissionState.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FusePermissionState = void 0;
/**
 * A set of constants representing permission states.
 */
var FusePermissionState;
(function (FusePermissionState) {
    FusePermissionState[FusePermissionState["GRANTED"] = 0] = "GRANTED";
    FusePermissionState[FusePermissionState["REQUIRES_JUSTIFICATION"] = 1] = "REQUIRES_JUSTIFICATION";
    FusePermissionState[FusePermissionState["DENIED"] = 2] = "DENIED";
})(FusePermissionState || (exports.FusePermissionState = FusePermissionState = {}));


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FusePlugin.js":
/*!*****************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FusePlugin.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FusePlugin = void 0;
const FuseSerializer_1 = __webpack_require__(/*! ./FuseSerializer */ "./node_modules/@btfuse/core/lib/FuseSerializer.js");
/**
 * Base class for Fuse Plugins
 */
class FusePlugin {
    constructor(context) {
        this.$context = context;
        this.$apiFactory = this._createAPIFactory() || context.getDefaultAPIFactory();
    }
    /**
     * Creates the API bridge
     * @param platform - The runtime platform
     * @returns
     */
    _createAPI(platform) {
        return this._getAPIFactory().create(platform);
    }
    /**
     * @virtual
     *
     * @remarks
     *
     * Create a concrete {@link FuseAPI} factory capable of creating FuseAPI
     * instance for the current runtime.
     *
     * @returns A concrete {@link FuseAPI} Factory
     */
    _createAPIFactory() {
        return null;
    }
    /**
     *
     * @returns The concrete API factory
     */
    _getAPIFactory() {
        return this.$apiFactory;
    }
    /**
     * TAPIOpts is a plugin generic type declaring options.
     * User may use this to declare a path on how to get a particular FuseAPI.
     *
     * This API may be overridden by subclasses to utilise the given options.
     * The default implementation is to simply return a standard FuseAPI.
     *
     * @param opts - API options
     * @returns
     */
    _getAPI(opts) {
        return this.$getAPI();
    }
    /**
     * Returns a standard FuseAPI
     * @returns
     */
    $getAPI() {
        return this._getAPIFactory().create(this.getContext().getPlatform());
    }
    /**
     * Creates a callback context that can be passed to native
     * The native code can use the callbackID to callback to the JS code.
     *
     * The callback can be used several times.
     *
     * Release the callback using _releaseCallback with the given callbackID.
     * These API usages should be part of your plugin API. When releasing a callback,
     * a standard API call should be made to your plugin to tell the native side that
     * the callback is no longer usable, and it should clean up the native resources surrounding
     * the callback context.
     *
     * Note that callback data payloads only supports strings.
     *
     * @param cb - The callback function
     * @returns String - callbackID
     */
    _createCallback(cb, apiOpts) {
        return this._getAPI(apiOpts).createCallbackContext(cb);
    }
    /**
     * Releases a created callback.
     *
     * @param id - callbackID
     */
    _releaseCallback(id, apiOpts) {
        this._getAPI(apiOpts).releaseCallback(id);
    }
    /**
     * Returns the FuseContext
     *
     * @returns The current context
     */
    getContext() {
        return this.$context;
    }
    /**
     * Returns the plugin ID
     */
    getID() {
        return this._getID();
    }
    /**
     * The execution API. Concrete classes can call this to perform calls to the native side.
     *
     * The concrete class should expose public methods with type information exposed.
     *
     * @param method - The method link, this should match the endpoint defined in the native API.
     * @param contentType - the MIME type of the data you are passing in.
     * @param data - The data to pass to the native environment
     * @returns The response body from native. FuseResponseReader has some utility methods to read the data in common formats (e.g. text or JSON)
     */
    async _exec(method, contentType, data, apiOpts) {
        return await this._getAPI(apiOpts).execute(this.getID(), method, contentType, data);
    }
    /**
     * @remarks
     * This is useful when you want to use an API as a callback, without exposing
     * the plugin implementation. The returned function is a bounded function.
     * When invoked, it will call on the API endpoint and returns a {@link FuseAPIResponse}
     * asynchronously.
     *
     * @sealed
     * @param route - The API end point
     * @param serializer - The serializer to use. Defaults to {@link FuseSerializer} which is a sensible serializer.
     * @returns A context-binding function that can be given to another object.
     */
    _createAPIBridge(route, serializer) {
        if (!serializer) {
            serializer = new FuseSerializer_1.FuseSerializer();
        }
        return async (type, data) => {
            return await this._exec(route, type, serializer.serialize(data));
        };
    }
}
exports.FusePlugin = FusePlugin;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseResponseReader.js":
/*!*************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseResponseReader.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseResponseReader = void 0;
/**
 * A static class with convenience methods for reading common
 * response content body formats.
 */
class FuseResponseReader {
    constructor() { }
    /**
     * @remarks
     * Reads the data buffer as a string
     *
     * @param data - input data
     * @returns The buffer contents as a string
     */
    static async readAsText(data) {
        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsText(new Blob([data]));
        });
    }
    /**
     * @remarks
     * Reads the given data buffer as a JSON object. The JSON object
     * can be typed as T generic. No validations occurs on whether the given
     * data is actually a type of T.
     *
     * @throws {@link SyntaxError}
     * If data is not parseable as JSON.
     *
     * @param data - input data
     * @returns The buffer contents as a JSON object.
     */
    static async readAsJSON(data) {
        const str = await this.readAsText(data);
        return JSON.parse(str);
    }
}
exports.FuseResponseReader = FuseResponseReader;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/FuseSerializer.js":
/*!*********************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/FuseSerializer.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseSerializer = void 0;
/**
 * A class to serialize several different types of objects into a data structure
 * that can be reconstructed across the Fuse API bridge.
 */
class FuseSerializer {
    constructor() { }
    _serializeToString(obj) {
        if (typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === 'string') {
            return this._serializePrimitiveToString(obj);
        }
        else if (obj instanceof Date) {
            return this._serializeDateToString(obj);
        }
        else if (this._isISerializable(obj)) {
            return this._serializeToString(obj.serialize());
        }
        else if (obj instanceof Error) {
            return this._serializeErrorToString(obj);
        }
        // When all else fails, attempt to JSON stringify
        return JSON.stringify(obj);
    }
    _serializePrimitiveToString(obj) {
        return obj.toString();
    }
    _serializeErrorToString(obj) {
        const serializedError = {
            name: obj.name,
            message: obj.message,
            stack: obj.stack
        };
        return JSON.stringify(serializedError, null, 4);
    }
    _serializeDateToString(obj) {
        return obj.toISOString();
    }
    /**
     * Serializes the given object into a blob.
     *
     * @param obj - A supported serializable object. See {@link TSerializable} for
     * a list of currently supported types
     * @returns A serialized blob
     */
    serialize(obj) {
        if (obj === null || obj === undefined) {
            return null;
        }
        let bin;
        if (obj instanceof Blob) {
            bin = obj;
        }
        else if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || obj instanceof Date) {
            bin = new Blob([this._serializeToString(obj)]);
        }
        else if (obj instanceof ArrayBuffer) {
            bin = new Blob([obj]);
        }
        else if (this._isISerializable(obj)) {
            bin = new Blob([this.serialize(obj.serialize())]);
        }
        else {
            // should be either JSON objects or json arrays at this point
            bin = new Blob([this._serializeToString(obj)]);
        }
        return bin;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _isISerializable(x) {
        return !!x.serialize && typeof x.serialize === 'function';
    }
}
exports.FuseSerializer = FuseSerializer;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/HTTPFuseAPI.js":
/*!******************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/HTTPFuseAPI.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HTTPFuseAPI = void 0;
const ContentType_1 = __webpack_require__(/*! ./ContentType */ "./node_modules/@btfuse/core/lib/ContentType.js");
const FuseAPI_1 = __webpack_require__(/*! ./FuseAPI */ "./node_modules/@btfuse/core/lib/FuseAPI.js");
const FuseAPIResponse_1 = __webpack_require__(/*! ./FuseAPIResponse */ "./node_modules/@btfuse/core/lib/FuseAPIResponse.js");
const FuseError_1 = __webpack_require__(/*! ./FuseError */ "./node_modules/@btfuse/core/lib/FuseError.js");
/**
 * A Fuse API implementation that uses HTTP protocol to make native calls
 */
class HTTPFuseAPI extends FuseAPI_1.FuseAPI {
    async _getEndpoint() {
        return '';
    }
    async _initHeaders(xhr) { }
    async buildRoute(pluginID, method) {
        const endpoint = await this._getEndpoint();
        return `${endpoint}${this._createRoute(pluginID, method)}`;
    }
    async _execute(pluginID, method, contentType, data) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.open('POST', await this.buildRoute(pluginID, method));
        if (!contentType) {
            contentType = ContentType_1.ContentType.BINARY;
        }
        if (contentType) {
            xhr.setRequestHeader('Content-Type', contentType);
        }
        await this._initHeaders(xhr);
        return await this._doRequest(xhr, data);
    }
    _doRequest(xhr, data) {
        return new Promise((resolve, reject) => {
            xhr.onload = async () => {
                const response = new FuseAPIResponse_1.FuseAPIResponse(xhr.response, xhr.getAllResponseHeaders(), xhr.status);
                if (response.isError()) {
                    reject(await response.readAsError());
                }
                else {
                    resolve(response);
                }
            };
            xhr.onerror = (e) => {
                reject(new FuseError_1.FuseError('FuseAPI', 'Network Error'));
            };
            xhr.ontimeout = (e) => {
                reject(new FuseError_1.FuseError('FuseAPI', 'API Timeout'));
            };
            this._doSend(xhr, data);
        });
    }
    _doSend(xhr, data) {
        if (data !== undefined && data !== null) {
            xhr.send(data);
        }
        else {
            xhr.send();
        }
    }
}
exports.HTTPFuseAPI = HTTPFuseAPI;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/Platform.js":
/*!***************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/Platform.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Platform = void 0;
/**
 * Enumeration for supported platforms
 */
var Platform;
(function (Platform) {
    Platform[Platform["IOS"] = 1] = "IOS";
    Platform[Platform["ANDROID"] = 2] = "ANDROID";
    /**
     * Specialized platform used for test environments,
     * will not be used for regular runtimes.
     */
    Platform[Platform["TEST"] = 3] = "TEST";
})(Platform || (exports.Platform = Platform = {}));


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/PlatformResolver.js":
/*!***********************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/PlatformResolver.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlatformResolver = void 0;
const Platform_1 = __webpack_require__(/*! ./Platform */ "./node_modules/@btfuse/core/lib/Platform.js");
/**
 * A strategy to resolve the runtime's platform
 */
class PlatformResolver {
    resolve() {
        if (this.isIOSEnvironment()) {
            return Platform_1.Platform.IOS;
        }
        else {
            // The only other supported platform is Android, so
            // it's assumed
            return Platform_1.Platform.ANDROID;
        }
    }
    isIOSEnvironment() {
        return location.protocol === 'btfuse:';
    }
    isAndroidEnvironment() {
        return !this.isIOSEnvironment();
    }
}
exports.PlatformResolver = PlatformResolver;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/Version.js":
/*!**************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/Version.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Version = void 0;
/**
 * A class that represents a {@link https://semver.org/} versioning.
 */
class Version {
    constructor(major, minor, patch) {
        this.$major = major;
        this.$minor = minor || 0;
        this.$patch = patch || 0;
    }
    /**
     * @remarks
     * Parses a semver-formatted version string and creates a Version object.
     * Does not support pre-release labels, which will be chopped off.
     * If any dot notation segment is missing or is not parseable as an integer,
     * it will default to 0.
     *
     * @param version - Semver formatted version string
     * @returns A version object
     */
    static parseVersionString(version) {
        const parts = version.split('.');
        let major = parseInt(parts[0]);
        let minor = parseInt(parts[1]);
        let patch = parseInt(parts[2]);
        if (isNaN(major)) {
            major = 0;
        }
        if (isNaN(minor)) {
            minor = 0;
        }
        if (isNaN(patch)) {
            patch = 0;
        }
        return new Version(major, minor, patch);
    }
    /**
     * @sealed
     * @returns The major component of this version
     */
    getMajor() {
        return this.$major;
    }
    /**
     * @sealed
     * @returns The minor component of this version
     */
    getMinor() {
        return this.$minor;
    }
    /**
     * @sealed
     * @returns The patch component of this version
     */
    getPatch() {
        return this.$patch;
    }
    /**
     * @sealed
     * @returns A semver-formatted string
     */
    toString() {
        return `${this.$major}.${this.$minor}.${this.$patch}`;
    }
    /**
     * @sealed
     * @param b - The right side version
     * @remarks
     *  This is the equivilant in using `Version.compare(this, b)`.
     *  See {@link copmare} for more details.
     */
    compare(b) {
        return Version.compare(this, b);
    }
    /**
     * @remarks
     * Compares this version with another. If left side is greater than right side,
     * {@link GREATER_THAN} is returned. If they are equal, {@link EQUAL} is returned.
     * Otherwise, {@link LESS_THAN} is returned.
     *
     * @param lhs - The left side version
     * @param rhs - The right side version
     * @returns
     */
    static compare(lhs, rhs) {
        if (lhs.$major === rhs.$major && lhs.$minor === rhs.$minor && lhs.$patch === rhs.$patch) {
            return Version.EQUAL;
        }
        if (lhs.$major === rhs.$major) {
            if (lhs.$minor === rhs.$minor) {
                if (lhs.$patch === rhs.$patch) {
                    // shouldn't have reached here... as it should have been caught by the simple test above first
                    // but for consistency we will keep it here.
                    return Version.EQUAL;
                }
                else {
                    return lhs.$patch > rhs.$patch ? Version.GREATER_THAN : Version.LESS_THAN;
                }
            }
            else {
                return lhs.$minor > rhs.$minor ? Version.GREATER_THAN : Version.LESS_THAN;
            }
        }
        else {
            return lhs.$major > rhs.$major ? Version.GREATER_THAN : Version.LESS_THAN;
        }
    }
}
exports.Version = Version;
Version.LESS_THAN = -1;
Version.EQUAL = 0;
Version.GREATER_THAN = 1;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/android/AndroidFuseContext.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/android/AndroidFuseContext.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2024 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndroidFuseContext = void 0;
const FuseContext_1 = __webpack_require__(/*! ../FuseContext */ "./node_modules/@btfuse/core/lib/FuseContext.js");
const Platform_1 = __webpack_require__(/*! ../Platform */ "./node_modules/@btfuse/core/lib/Platform.js");
class AndroidFuseContext extends FuseContext_1.FuseContext {
    constructor(apiFactory, logger) {
        super(Platform_1.Platform.ANDROID, apiFactory, logger);
    }
    async onWebviewReady() {
        window.BTFuseNative.onWebviewReady();
    }
}
exports.AndroidFuseContext = AndroidFuseContext;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/android/AndroidFuseLogger.js":
/*!********************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/android/AndroidFuseLogger.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndroidFuseLogger = void 0;
const FuseLogger_1 = __webpack_require__(/*! ../FuseLogger */ "./node_modules/@btfuse/core/lib/FuseLogger.js");
const FuseCallbackManager_1 = __webpack_require__(/*! ../FuseCallbackManager */ "./node_modules/@btfuse/core/lib/FuseCallbackManager.js");
class AndroidFuseLogger extends FuseLogger_1.FuseLogger {
    _logToNative(level, message) {
        window.BTFuseNative.log(level, message);
    }
    _registerNativeCalblack() {
        window.BTFuseNative.setLogCallback(FuseCallbackManager_1.FuseCallbackManager.getInstance().createCallback((payload) => {
            let entry = null;
            try {
                entry = JSON.parse(payload);
            }
            catch (ex) {
                return;
            }
            this._onNativeLogEntry(entry);
        }));
    }
}
exports.AndroidFuseLogger = AndroidFuseLogger;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/android/AndroidSchemeFuseAPI.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/android/AndroidSchemeFuseAPI.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndroidSchemeFuseAPI = void 0;
const HTTPFuseAPI_1 = __webpack_require__(/*! ../HTTPFuseAPI */ "./node_modules/@btfuse/core/lib/HTTPFuseAPI.js");
/**
 * A Fuse API implementation for an embedded HTTP server to bridge the JS and Native API calls.
 */
class AndroidSchemeFuseAPI extends HTTPFuseAPI_1.HTTPFuseAPI {
    async _getEndpoint() {
        return `https://localhost:${window.BTFuseNative.getAPIPort()}`;
    }
    async _initHeaders(xhr) {
        xhr.setRequestHeader('X-Fuse-Secret', window.BTFuseNative.getAPISecret());
    }
}
exports.AndroidSchemeFuseAPI = AndroidSchemeFuseAPI;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/api.js":
/*!**********************************************!*\
  !*** ./node_modules/@btfuse/core/lib/api.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndroidFuseLogger = exports.AndroidSchemeFuseAPI = exports.IOSFuseLogger = exports.IOSSchemeFuseAPI = exports.FuseLoggerFactory = exports.AbstractFuseLoggerFactory = exports.FuseLoggerSerializer = exports.FuseLogger = exports.FuseLoggerLevel = exports.FusePermissionGrantResult = exports.FusePermissionRequest = exports.FusePermissionState = exports.FuseSerializer = exports.FuseError = exports.HTTPFuseAPI = exports.FusePlugin = exports.FuseRuntime = exports.AbstractFuseAPIFactory = exports.FuseAPIFactory = exports.FuseResponseReader = exports.ContentType = exports.FuseAPIResponse = exports.FuseCallbackManager = exports.FuseAPI = exports.Version = exports.FuseContextBuilder = exports.FuseContext = exports.PlatformResolver = exports.Platform = void 0;
// Common API
var Platform_1 = __webpack_require__(/*! ./Platform */ "./node_modules/@btfuse/core/lib/Platform.js");
Object.defineProperty(exports, "Platform", ({ enumerable: true, get: function () { return Platform_1.Platform; } }));
var PlatformResolver_1 = __webpack_require__(/*! ./PlatformResolver */ "./node_modules/@btfuse/core/lib/PlatformResolver.js");
Object.defineProperty(exports, "PlatformResolver", ({ enumerable: true, get: function () { return PlatformResolver_1.PlatformResolver; } }));
var FuseContext_1 = __webpack_require__(/*! ./FuseContext */ "./node_modules/@btfuse/core/lib/FuseContext.js");
Object.defineProperty(exports, "FuseContext", ({ enumerable: true, get: function () { return FuseContext_1.FuseContext; } }));
var FuseContextBuilder_1 = __webpack_require__(/*! ./FuseContextBuilder */ "./node_modules/@btfuse/core/lib/FuseContextBuilder.js");
Object.defineProperty(exports, "FuseContextBuilder", ({ enumerable: true, get: function () { return FuseContextBuilder_1.FuseContextBuilder; } }));
var Version_1 = __webpack_require__(/*! ./Version */ "./node_modules/@btfuse/core/lib/Version.js");
Object.defineProperty(exports, "Version", ({ enumerable: true, get: function () { return Version_1.Version; } }));
var FuseAPI_1 = __webpack_require__(/*! ./FuseAPI */ "./node_modules/@btfuse/core/lib/FuseAPI.js");
Object.defineProperty(exports, "FuseAPI", ({ enumerable: true, get: function () { return FuseAPI_1.FuseAPI; } }));
var FuseCallbackManager_1 = __webpack_require__(/*! ./FuseCallbackManager */ "./node_modules/@btfuse/core/lib/FuseCallbackManager.js");
Object.defineProperty(exports, "FuseCallbackManager", ({ enumerable: true, get: function () { return FuseCallbackManager_1.FuseCallbackManager; } }));
var FuseAPIResponse_1 = __webpack_require__(/*! ./FuseAPIResponse */ "./node_modules/@btfuse/core/lib/FuseAPIResponse.js");
Object.defineProperty(exports, "FuseAPIResponse", ({ enumerable: true, get: function () { return FuseAPIResponse_1.FuseAPIResponse; } }));
var ContentType_1 = __webpack_require__(/*! ./ContentType */ "./node_modules/@btfuse/core/lib/ContentType.js");
Object.defineProperty(exports, "ContentType", ({ enumerable: true, get: function () { return ContentType_1.ContentType; } }));
var FuseResponseReader_1 = __webpack_require__(/*! ./FuseResponseReader */ "./node_modules/@btfuse/core/lib/FuseResponseReader.js");
Object.defineProperty(exports, "FuseResponseReader", ({ enumerable: true, get: function () { return FuseResponseReader_1.FuseResponseReader; } }));
var FuseAPIFactory_1 = __webpack_require__(/*! ./FuseAPIFactory */ "./node_modules/@btfuse/core/lib/FuseAPIFactory.js");
Object.defineProperty(exports, "FuseAPIFactory", ({ enumerable: true, get: function () { return FuseAPIFactory_1.FuseAPIFactory; } }));
var AbstractFuseAPIFactory_1 = __webpack_require__(/*! ./AbstractFuseAPIFactory */ "./node_modules/@btfuse/core/lib/AbstractFuseAPIFactory.js");
Object.defineProperty(exports, "AbstractFuseAPIFactory", ({ enumerable: true, get: function () { return AbstractFuseAPIFactory_1.AbstractFuseAPIFactory; } }));
var FuseRuntime_1 = __webpack_require__(/*! ./plugins/FuseRuntime */ "./node_modules/@btfuse/core/lib/plugins/FuseRuntime.js");
Object.defineProperty(exports, "FuseRuntime", ({ enumerable: true, get: function () { return FuseRuntime_1.FuseRuntime; } }));
var FusePlugin_1 = __webpack_require__(/*! ./FusePlugin */ "./node_modules/@btfuse/core/lib/FusePlugin.js");
Object.defineProperty(exports, "FusePlugin", ({ enumerable: true, get: function () { return FusePlugin_1.FusePlugin; } }));
var HTTPFuseAPI_1 = __webpack_require__(/*! ./HTTPFuseAPI */ "./node_modules/@btfuse/core/lib/HTTPFuseAPI.js");
Object.defineProperty(exports, "HTTPFuseAPI", ({ enumerable: true, get: function () { return HTTPFuseAPI_1.HTTPFuseAPI; } }));
var FuseError_1 = __webpack_require__(/*! ./FuseError */ "./node_modules/@btfuse/core/lib/FuseError.js");
Object.defineProperty(exports, "FuseError", ({ enumerable: true, get: function () { return FuseError_1.FuseError; } }));
var FuseSerializer_1 = __webpack_require__(/*! ./FuseSerializer */ "./node_modules/@btfuse/core/lib/FuseSerializer.js");
Object.defineProperty(exports, "FuseSerializer", ({ enumerable: true, get: function () { return FuseSerializer_1.FuseSerializer; } }));
var FusePermissionState_1 = __webpack_require__(/*! ./FusePermissionState */ "./node_modules/@btfuse/core/lib/FusePermissionState.js");
Object.defineProperty(exports, "FusePermissionState", ({ enumerable: true, get: function () { return FusePermissionState_1.FusePermissionState; } }));
var FusePermissionRequest_1 = __webpack_require__(/*! ./FusePermissionRequest */ "./node_modules/@btfuse/core/lib/FusePermissionRequest.js");
Object.defineProperty(exports, "FusePermissionRequest", ({ enumerable: true, get: function () { return FusePermissionRequest_1.FusePermissionRequest; } }));
var FusePermissionGrantResult_1 = __webpack_require__(/*! ./FusePermissionGrantResult */ "./node_modules/@btfuse/core/lib/FusePermissionGrantResult.js");
Object.defineProperty(exports, "FusePermissionGrantResult", ({ enumerable: true, get: function () { return FusePermissionGrantResult_1.FusePermissionGrantResult; } }));
// Logger
var FuseLoggerLevel_1 = __webpack_require__(/*! ./FuseLoggerLevel */ "./node_modules/@btfuse/core/lib/FuseLoggerLevel.js");
Object.defineProperty(exports, "FuseLoggerLevel", ({ enumerable: true, get: function () { return FuseLoggerLevel_1.FuseLoggerLevel; } }));
var FuseLogger_1 = __webpack_require__(/*! ./FuseLogger */ "./node_modules/@btfuse/core/lib/FuseLogger.js");
Object.defineProperty(exports, "FuseLogger", ({ enumerable: true, get: function () { return FuseLogger_1.FuseLogger; } }));
Object.defineProperty(exports, "FuseLoggerSerializer", ({ enumerable: true, get: function () { return FuseLogger_1.FuseLoggerSerializer; } }));
var AbstractFuseLoggerFactory_1 = __webpack_require__(/*! ./AbstractFuseLoggerFactory */ "./node_modules/@btfuse/core/lib/AbstractFuseLoggerFactory.js");
Object.defineProperty(exports, "AbstractFuseLoggerFactory", ({ enumerable: true, get: function () { return AbstractFuseLoggerFactory_1.AbstractFuseLoggerFactory; } }));
var FuseLoggerFactory_1 = __webpack_require__(/*! ./FuseLoggerFactory */ "./node_modules/@btfuse/core/lib/FuseLoggerFactory.js");
Object.defineProperty(exports, "FuseLoggerFactory", ({ enumerable: true, get: function () { return FuseLoggerFactory_1.FuseLoggerFactory; } }));
// iOS Specific APIs / Implementations
var IOSSchemeFuseAPI_1 = __webpack_require__(/*! ./ios/IOSSchemeFuseAPI */ "./node_modules/@btfuse/core/lib/ios/IOSSchemeFuseAPI.js");
Object.defineProperty(exports, "IOSSchemeFuseAPI", ({ enumerable: true, get: function () { return IOSSchemeFuseAPI_1.IOSSchemeFuseAPI; } }));
var IOSFuseLogger_1 = __webpack_require__(/*! ./ios/IOSFuseLogger */ "./node_modules/@btfuse/core/lib/ios/IOSFuseLogger.js");
Object.defineProperty(exports, "IOSFuseLogger", ({ enumerable: true, get: function () { return IOSFuseLogger_1.IOSFuseLogger; } }));
// Android Specific APIs / Implementations
var AndroidSchemeFuseAPI_1 = __webpack_require__(/*! ./android/AndroidSchemeFuseAPI */ "./node_modules/@btfuse/core/lib/android/AndroidSchemeFuseAPI.js");
Object.defineProperty(exports, "AndroidSchemeFuseAPI", ({ enumerable: true, get: function () { return AndroidSchemeFuseAPI_1.AndroidSchemeFuseAPI; } }));
var AndroidFuseLogger_1 = __webpack_require__(/*! ./android/AndroidFuseLogger */ "./node_modules/@btfuse/core/lib/android/AndroidFuseLogger.js");
Object.defineProperty(exports, "AndroidFuseLogger", ({ enumerable: true, get: function () { return AndroidFuseLogger_1.AndroidFuseLogger; } }));


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/ios/IOSFuseContext.js":
/*!*************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/ios/IOSFuseContext.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2024 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IOSFuseContext = void 0;
const FuseContext_1 = __webpack_require__(/*! ../FuseContext */ "./node_modules/@btfuse/core/lib/FuseContext.js");
const Platform_1 = __webpack_require__(/*! ../Platform */ "./node_modules/@btfuse/core/lib/Platform.js");
class IOSFuseContext extends FuseContext_1.FuseContext {
    constructor(apiFactory, logger) {
        super(Platform_1.Platform.IOS, apiFactory, logger);
    }
    async onWebviewReady() {
        await window.webkit.messageHandlers.onWebviewReady.postMessage('');
    }
}
exports.IOSFuseContext = IOSFuseContext;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/ios/IOSFuseLogger.js":
/*!************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/ios/IOSFuseLogger.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IOSFuseLogger = void 0;
const FuseLogger_1 = __webpack_require__(/*! ../FuseLogger */ "./node_modules/@btfuse/core/lib/FuseLogger.js");
const FuseCallbackManager_1 = __webpack_require__(/*! ../FuseCallbackManager */ "./node_modules/@btfuse/core/lib/FuseCallbackManager.js");
class IOSFuseLogger extends FuseLogger_1.FuseLogger {
    _logToNative(level, message) {
        window.webkit.messageHandlers.log.postMessage([level, message]);
    }
    _registerNativeCalblack() {
        window.webkit.messageHandlers.setLogCallback.postMessage(FuseCallbackManager_1.FuseCallbackManager.getInstance().createCallback((payload) => {
            let entry = null;
            try {
                entry = JSON.parse(payload);
            }
            catch (ex) {
                return;
            }
            this._onNativeLogEntry(entry);
        }));
    }
}
exports.IOSFuseLogger = IOSFuseLogger;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/ios/IOSSchemeFuseAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/ios/IOSSchemeFuseAPI.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IOSSchemeFuseAPI = void 0;
const HTTPFuseAPI_1 = __webpack_require__(/*! ../HTTPFuseAPI */ "./node_modules/@btfuse/core/lib/HTTPFuseAPI.js");
/**
 * A Fuse API implementation for iOS that uses WKURLSchemeHandler to bridge the JS and Native API calls.
 */
class IOSSchemeFuseAPI extends HTTPFuseAPI_1.HTTPFuseAPI {
    async _getEndpoint() {
        return `https://localhost:${await window.webkit.messageHandlers.getAPIPort.postMessage("")}`;
    }
    async _initHeaders(xhr) {
        xhr.setRequestHeader('X-Fuse-Secret', await window.webkit.messageHandlers.getAPISecret.postMessage(""));
    }
}
exports.IOSSchemeFuseAPI = IOSSchemeFuseAPI;


/***/ }),

/***/ "./node_modules/@btfuse/core/lib/plugins/FuseRuntime.js":
/*!**************************************************************!*\
  !*** ./node_modules/@btfuse/core/lib/plugins/FuseRuntime.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseRuntime = void 0;
const ContentType_1 = __webpack_require__(/*! ../ContentType */ "./node_modules/@btfuse/core/lib/ContentType.js");
const FusePlugin_1 = __webpack_require__(/*! ../FusePlugin */ "./node_modules/@btfuse/core/lib/FusePlugin.js");
class FuseRuntime extends FusePlugin_1.FusePlugin {
    constructor(context) {
        super(context);
        this.$callbackIDs = [];
    }
    _getID() {
        return 'FuseRuntime';
    }
    async getInfo() {
        const data = await this._exec('/info');
        return await data.readAsJSON();
    }
    async registerPauseHandler(cb) {
        const cbID = this._createCallback((payload) => {
            cb();
        });
        await this._exec('/registerPauseHandler', ContentType_1.ContentType.TEXT, cbID);
        this.$callbackIDs.push(cbID);
        return cbID;
    }
    async unregisterPauseHandler(callbackID) {
        await this._exec('/unregisterPauseHandler', ContentType_1.ContentType.TEXT, callbackID);
    }
    async registerResumeHandler(cb) {
        const cbID = this._createCallback((payload) => {
            cb();
        });
        await this._exec('/registerResumeHandler', ContentType_1.ContentType.TEXT, cbID);
        this.$callbackIDs.push(cbID);
        return cbID;
    }
    async unregisterResumeHandler(callbackID) {
        await this._exec('/unregisterResumeHandler', ContentType_1.ContentType.TEXT, callbackID);
    }
}
exports.FuseRuntime = FuseRuntime;


/***/ }),

/***/ "./node_modules/echo/lib/EchoPlugin.js":
/*!*********************************************!*\
  !*** ./node_modules/echo/lib/EchoPlugin.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EchoPlugin = void 0;
const core_1 = __webpack_require__(/*! @btfuse/core */ "./node_modules/@btfuse/core/lib/api.js");
class EchoPlugin extends core_1.FusePlugin {
    _getID() {
        return 'echo';
    }
    async echo(message) {
        let r = await this._exec('/echo', core_1.ContentType.TEXT, message);
        return await r.readAsText();
    }
    async subscribe(cb) {
        let callbackID = this._createCallback((payload) => {
            cb(payload);
        });
        await this._exec('/subscribe', core_1.ContentType.TEXT, callbackID);
        return callbackID;
    }
    async bigResponse() {
        let r = await this._exec('/big');
        return await r.readAsArrayBuffer();
    }
}
exports.EchoPlugin = EchoPlugin;


/***/ }),

/***/ "./node_modules/echo/lib/api.js":
/*!**************************************!*\
  !*** ./node_modules/echo/lib/api.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EchoPlugin = void 0;
var EchoPlugin_1 = __webpack_require__(/*! ./EchoPlugin */ "./node_modules/echo/lib/EchoPlugin.js");
Object.defineProperty(exports, "EchoPlugin", ({ enumerable: true, get: function () { return EchoPlugin_1.EchoPlugin; } }));


/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "MAX", ({
  enumerable: true,
  get: function get() {
    return _max.default;
  }
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function get() {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function get() {
    return _parse.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function get() {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function get() {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v1ToV6", ({
  enumerable: true,
  get: function get() {
    return _v1ToV.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function get() {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function get() {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function get() {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "v6", ({
  enumerable: true,
  get: function get() {
    return _v5.default;
  }
}));
Object.defineProperty(exports, "v6ToV1", ({
  enumerable: true,
  get: function get() {
    return _v6ToV.default;
  }
}));
Object.defineProperty(exports, "v7", ({
  enumerable: true,
  get: function get() {
    return _v6.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function get() {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function get() {
    return _version.default;
  }
}));
var _max = _interopRequireDefault(__webpack_require__(/*! ./max.js */ "./node_modules/uuid/dist/commonjs-browser/max.js"));
var _nil = _interopRequireDefault(__webpack_require__(/*! ./nil.js */ "./node_modules/uuid/dist/commonjs-browser/nil.js"));
var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/commonjs-browser/parse.js"));
var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js"));
var _v = _interopRequireDefault(__webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/commonjs-browser/v1.js"));
var _v1ToV = _interopRequireDefault(__webpack_require__(/*! ./v1ToV6.js */ "./node_modules/uuid/dist/commonjs-browser/v1ToV6.js"));
var _v2 = _interopRequireDefault(__webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/commonjs-browser/v3.js"));
var _v3 = _interopRequireDefault(__webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/commonjs-browser/v4.js"));
var _v4 = _interopRequireDefault(__webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/commonjs-browser/v5.js"));
var _v5 = _interopRequireDefault(__webpack_require__(/*! ./v6.js */ "./node_modules/uuid/dist/commonjs-browser/v6.js"));
var _v6ToV = _interopRequireDefault(__webpack_require__(/*! ./v6ToV1.js */ "./node_modules/uuid/dist/commonjs-browser/v6ToV1.js"));
var _v6 = _interopRequireDefault(__webpack_require__(/*! ./v7.js */ "./node_modules/uuid/dist/commonjs-browser/v7.js"));
var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/commonjs-browser/validate.js"));
var _version = _interopRequireDefault(__webpack_require__(/*! ./version.js */ "./node_modules/uuid/dist/commonjs-browser/version.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/max.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/max.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = 'ffffffff-ffff-ffff-ffff-ffffffffffff';

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/md5.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/md5.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);
    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}

/*
 * Convert an array of little-endian words to an array of bytes
 */
function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';
  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }
  return output;
}

/**
 * Calculate output length with padding and bit length
 */
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}

/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));
  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }
  return output;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var _default = exports["default"] = md5;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/native.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/native.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var _default = exports["default"] = {
  randomUUID
};

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/nil.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/nil.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = '00000000-0000-0000-0000-000000000000';

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/parse.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/parse.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/commonjs-browser/validate.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }
  var v;
  var arr = new Uint8Array(16);

  // Parse ########-....-....-....-............
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff;

  // Parse ........-####-....-....-............
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff;

  // Parse ........-....-####-....-............
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff;

  // Parse ........-....-....-####-............
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff;

  // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}
var _default = exports["default"] = parse;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/regex.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/regex.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/rng.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/rng.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).

var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }
  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/sha1.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/sha1.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];
    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);
  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);
    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }
    M[_i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);
    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }
    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }
    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];
    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}
var _default = exports["default"] = sha1;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/stringify.js":
/*!**************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/stringify.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.unsafeStringify = unsafeStringify;
var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/commonjs-browser/validate.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  //
  // Note to future-self: No, you can't remove the `toLowerCase()` call.
  // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
  var uuid = unsafeStringify(arr, offset);
  // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }
  return uuid;
}
var _default = exports["default"] = stringify;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v1.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v1.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/commonjs-browser/rng.js"));
var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node;
  var clockseq = options.clockseq;

  // v1 only: Use cached `node` and `clockseq` values
  if (!options._v6) {
    if (!node) {
      node = _nodeId;
    }
    if (clockseq == null) {
      clockseq = _clockseq;
    }
  }

  // Handle cases where we need entropy.  We do this lazily to minimize issues
  // related to insufficient system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng.default)();

    // Randomize node
    if (node == null) {
      node = [seedBytes[0], seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];

      // v1 only: cache node value for reuse
      if (!_nodeId && !options._v6) {
        // per RFC4122 4.5: Set MAC multicast bit (v1 only)
        node[0] |= 0x01; // Set multicast bit

        _nodeId = node;
      }
    }

    // Randomize clockseq
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
      if (_clockseq === undefined && !options._v6) {
        _clockseq = clockseq;
      }
    }
  }

  // v1 & v6 timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so time is
  // handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : Date.now();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || (0, _stringify.unsafeStringify)(b);
}
var _default = exports["default"] = v1;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v1ToV6.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v1ToV6.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = v1ToV6;
var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/commonjs-browser/parse.js"));
var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Convert a v1 UUID to a v6 UUID
 *
 * @param {string|Uint8Array} uuid - The v1 UUID to convert to v6
 * @returns {string|Uint8Array} The v6 UUID as the same type as the `uuid` arg
 * (string or Uint8Array)
 */
function v1ToV6(uuid) {
  var v1Bytes = typeof uuid === 'string' ? (0, _parse.default)(uuid) : uuid;
  var v6Bytes = _v1ToV6(v1Bytes);
  return typeof uuid === 'string' ? (0, _stringify.unsafeStringify)(v6Bytes) : v6Bytes;
}

// Do the field transformation needed for v1 -> v6
function _v1ToV6(v1Bytes, randomize = false) {
  return Uint8Array.of((v1Bytes[6] & 0x0f) << 4 | v1Bytes[7] >> 4 & 0x0f, (v1Bytes[7] & 0x0f) << 4 | (v1Bytes[4] & 0xf0) >> 4, (v1Bytes[4] & 0x0f) << 4 | (v1Bytes[5] & 0xf0) >> 4, (v1Bytes[5] & 0x0f) << 4 | (v1Bytes[0] & 0xf0) >> 4, (v1Bytes[0] & 0x0f) << 4 | (v1Bytes[1] & 0xf0) >> 4, (v1Bytes[1] & 0x0f) << 4 | (v1Bytes[2] & 0xf0) >> 4, 0x60 | v1Bytes[2] & 0x0f, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
}

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v3.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v3.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/commonjs-browser/v35.js"));
var _md = _interopRequireDefault(__webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/commonjs-browser/md5.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = exports["default"] = v3;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v35.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v35.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.URL = exports.DNS = void 0;
exports["default"] = v35;
var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");
var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/commonjs-browser/parse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];
  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
var DNS = exports.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = exports.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }
    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }
    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    }

    // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`
    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return (0, _stringify.unsafeStringify)(bytes);
  }

  // Function#name is not settable on some platforms (#270)
  try {
    generateUUID.name = name;
  } catch (err) {}

  // For CommonJS default export support
  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v4.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v4.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _native = _interopRequireDefault(__webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/commonjs-browser/native.js"));
var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/commonjs-browser/rng.js"));
var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function v4(options, buf, offset) {
  if (_native.default.randomUUID && !buf && !options) {
    return _native.default.randomUUID();
  }
  options = options || {};
  var rnds = options.random || (options.rng || _rng.default)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return (0, _stringify.unsafeStringify)(rnds);
}
var _default = exports["default"] = v4;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v5.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v5.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/commonjs-browser/v35.js"));
var _sha = _interopRequireDefault(__webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/commonjs-browser/sha1.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = exports["default"] = v5;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v6.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v6.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = v6;
var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");
var _v = _interopRequireDefault(__webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/commonjs-browser/v1.js"));
var _v1ToV = _interopRequireDefault(__webpack_require__(/*! ./v1ToV6.js */ "./node_modules/uuid/dist/commonjs-browser/v1ToV6.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 *
 * @param {object} options
 * @param {Uint8Array=} buf
 * @param {number=} offset
 * @returns
 */
function v6(options = {}, buf, offset = 0) {
  // v6 is v1 with different field layout, so we start with a v1 UUID, albeit
  // with slightly different behavior around how the clock_seq and node fields
  // are randomized, which is why we call v1 with _v6: true.
  var bytes = (0, _v.default)(_objectSpread(_objectSpread({}, options), {}, {
    _v6: true
  }), new Uint8Array(16));

  // Reorder the fields to v6 layout.
  bytes = (0, _v1ToV.default)(bytes);

  // Return as a byte array if requested
  if (buf) {
    for (var i = 0; i < 16; i++) {
      buf[offset + i] = bytes[i];
    }
    return buf;
  }
  return (0, _stringify.unsafeStringify)(bytes);
}

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v6ToV1.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v6ToV1.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = v6ToV1;
var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/commonjs-browser/parse.js"));
var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Convert a v6 UUID to a v1 UUID
 *
 * @param {string|Uint8Array} uuid - The v6 UUID to convert to v6
 * @returns {string|Uint8Array} The v1 UUID as the same type as the `uuid` arg
 * (string or Uint8Array)
 */
function v6ToV1(uuid) {
  var v6Bytes = typeof uuid === 'string' ? (0, _parse.default)(uuid) : uuid;
  var v1Bytes = _v6ToV1(v6Bytes);
  return typeof uuid === 'string' ? (0, _stringify.unsafeStringify)(v1Bytes) : v1Bytes;
}

// Do the field transformation needed for v6 -> v1
function _v6ToV1(v6Bytes) {
  return Uint8Array.of((v6Bytes[3] & 0x0f) << 4 | v6Bytes[4] >> 4 & 0x0f, (v6Bytes[4] & 0x0f) << 4 | (v6Bytes[5] & 0xf0) >> 4, (v6Bytes[5] & 0x0f) << 4 | v6Bytes[6] & 0x0f, v6Bytes[7], (v6Bytes[1] & 0x0f) << 4 | (v6Bytes[2] & 0xf0) >> 4, (v6Bytes[2] & 0x0f) << 4 | (v6Bytes[3] & 0xf0) >> 4, 0x10 | (v6Bytes[0] & 0xf0) >> 4, (v6Bytes[0] & 0x0f) << 4 | (v6Bytes[1] & 0xf0) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
}

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v7.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v7.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/commonjs-browser/rng.js"));
var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * UUID V7 - Unix Epoch time-based UUID
 *
 * The IETF has published RFC9562, introducing 3 new UUID versions (6,7,8). This
 * implementation of V7 is based on the accepted, though not yet approved,
 * revisions.
 *
 * RFC 9562:https://www.rfc-editor.org/rfc/rfc9562.html Universally Unique
 * IDentifiers (UUIDs)

 *
 * Sample V7 value:
 * https://www.rfc-editor.org/rfc/rfc9562.html#name-example-of-a-uuidv7-value
 *
 * Monotonic Bit Layout: RFC rfc9562.6.2 Method 1, Dedicated Counter Bits ref:
 *     https://www.rfc-editor.org/rfc/rfc9562.html#section-6.2-5.1
 *
 *   0                   1                   2                   3 0 1 2 3 4 5 6
 *   7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |                          unix_ts_ms                           |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |          unix_ts_ms           |  ver  |        seq_hi         |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |var|               seq_low               |        rand         |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |                             rand                              |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *
 * seq is a 31 bit serialized counter; comprised of 12 bit seq_hi and 19 bit
 * seq_low, and randomly initialized upon timestamp change. 31 bit counter size
 * was selected as any bitwise operations in node are done as _signed_ 32 bit
 * ints. we exclude the sign bit.
 */

var _seqLow = null;
var _seqHigh = null;
var _msecs = 0;
function v7(options, buf, offset) {
  options = options || {};

  // initialize buffer and pointer
  var i = buf && offset || 0;
  var b = buf || new Uint8Array(16);

  // rnds is Uint8Array(16) filled with random bytes
  var rnds = options.random || (options.rng || _rng.default)();

  // milliseconds since unix epoch, 1970-01-01 00:00
  var msecs = options.msecs !== undefined ? options.msecs : Date.now();

  // seq is user provided 31 bit counter
  var seq = options.seq !== undefined ? options.seq : null;

  // initialize local seq high/low parts
  var seqHigh = _seqHigh;
  var seqLow = _seqLow;

  // check if clock has advanced and user has not provided msecs
  if (msecs > _msecs && options.msecs === undefined) {
    _msecs = msecs;

    // unless user provided seq, reset seq parts
    if (seq !== null) {
      seqHigh = null;
      seqLow = null;
    }
  }

  // if we have a user provided seq
  if (seq !== null) {
    // trim provided seq to 31 bits of value, avoiding overflow
    if (seq > 0x7fffffff) {
      seq = 0x7fffffff;
    }

    // split provided seq into high/low parts
    seqHigh = seq >>> 19 & 0xfff;
    seqLow = seq & 0x7ffff;
  }

  // randomly initialize seq
  if (seqHigh === null || seqLow === null) {
    seqHigh = rnds[6] & 0x7f;
    seqHigh = seqHigh << 8 | rnds[7];
    seqLow = rnds[8] & 0x3f; // pad for var
    seqLow = seqLow << 8 | rnds[9];
    seqLow = seqLow << 5 | rnds[10] >>> 3;
  }

  // increment seq if within msecs window
  if (msecs + 10000 > _msecs && seq === null) {
    if (++seqLow > 0x7ffff) {
      seqLow = 0;
      if (++seqHigh > 0xfff) {
        seqHigh = 0;

        // increment internal _msecs. this allows us to continue incrementing
        // while staying monotonic. Note, once we hit 10k milliseconds beyond system
        // clock, we will reset breaking monotonicity (after (2^31)*10000 generations)
        _msecs++;
      }
    }
  } else {
    // resetting; we have advanced more than
    // 10k milliseconds beyond system clock
    _msecs = msecs;
  }
  _seqHigh = seqHigh;
  _seqLow = seqLow;

  // [bytes 0-5] 48 bits of local timestamp
  b[i++] = _msecs / 0x10000000000 & 0xff;
  b[i++] = _msecs / 0x100000000 & 0xff;
  b[i++] = _msecs / 0x1000000 & 0xff;
  b[i++] = _msecs / 0x10000 & 0xff;
  b[i++] = _msecs / 0x100 & 0xff;
  b[i++] = _msecs & 0xff;

  // [byte 6] - set 4 bits of version (7) with first 4 bits seq_hi
  b[i++] = seqHigh >>> 4 & 0x0f | 0x70;

  // [byte 7] remaining 8 bits of seq_hi
  b[i++] = seqHigh & 0xff;

  // [byte 8] - variant (2 bits), first 6 bits seq_low
  b[i++] = seqLow >>> 13 & 0x3f | 0x80;

  // [byte 9] 8 bits seq_low
  b[i++] = seqLow >>> 5 & 0xff;

  // [byte 10] remaining 5 bits seq_low, 3 bits random
  b[i++] = seqLow << 3 & 0xff | rnds[10] & 0x07;

  // [bytes 11-15] always random
  b[i++] = rnds[11];
  b[i++] = rnds[12];
  b[i++] = rnds[13];
  b[i++] = rnds[14];
  b[i++] = rnds[15];
  return buf || (0, _stringify.unsafeStringify)(b);
}
var _default = exports["default"] = v7;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/validate.js":
/*!*************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/validate.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _regex = _interopRequireDefault(__webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/commonjs-browser/regex.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}
var _default = exports["default"] = validate;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/version.js":
/*!************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/version.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/commonjs-browser/validate.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }
  return parseInt(uuid.slice(14, 15), 16);
}
var _default = exports["default"] = version;

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.mjs":
/*!******************************************!*\
  !*** ./node_modules/tslib/tslib.es6.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @btfuse/core */ "./node_modules/@btfuse/core/lib/api.js");
const echo_1 = __webpack_require__(/*! echo */ "./node_modules/echo/lib/api.js");
var sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};
(async () => {
    let builder = new core_1.FuseContextBuilder();
    let context = await builder.build();
    let echoPlugin = new echo_1.EchoPlugin(context);
    context.registerPauseHandler(() => {
        console.log('ON PAUSE!');
    });
    context.registerResumeHandler(() => {
        console.log('ON RESUME!');
    });
    function appendInfo(msg) {
        let div = document.createElement('div');
        div.innerHTML = msg;
        document.body.appendChild(div);
    }
    await (async () => {
        let response = await echoPlugin.echo('Hi from TS');
        // alert(response);
        appendInfo(response);
        context.getLogger().info(`ECHO RESPONSE: ${response}`);
        let timeDiv = document.createElement('div');
        document.body.appendChild(timeDiv);
        let firstTimeFire = true;
        setInterval(() => {
            timeDiv.innerHTML = new Date().toISOString();
            if (firstTimeFire) {
                firstTimeFire = false;
                context.onWebviewReady();
            }
        }, 1000);
        let debug = await context.isDebugMode();
        appendInfo(`Debug: ${debug ? 'true' : 'false'}`);
        // await echoPlugin.subscribe((d: string) => {
        //     console.log('d', d);
        // });
    })();
    document.body.onclick = async () => {
        let resp = await echoPlugin.bigResponse();
        console.log('big resp', resp);
    };
    window.fusecontext = context;
    context.getLogger().info('test log from webview');
    context.getLogger().error(new core_1.FuseError('TestError', 'test fuse error', new Error('Caused error'), 1));
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EOztBQUVuRDtBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixhQUFhO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrQkFBZTs7Ozs7Ozs7OztBQ3ZNakI7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0Ysa0JBQWU7QUFDZjtBQUNBLGVBQWUsa0JBQWU7QUFDOUI7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGtCQUFlO0FBQ2YsZUFBZSxrQkFBZTs7Ozs7Ozs7OztBQ05qQjs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTtBQUNmLHVDQUF1QyxtQkFBTyxDQUFDLDRFQUFlO0FBQzlELHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGtCQUFlOzs7Ozs7Ozs7O0FDM0NqQjs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTtBQUNmLGVBQWUsa0JBQWUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEdBQUc7Ozs7Ozs7Ozs7QUNOaEc7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0Ysa0JBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN0QmE7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0Ysa0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7O0FBRW5EO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFVBQVU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGtCQUFlOzs7Ozs7Ozs7O0FDakZqQjs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTtBQUNmLHVCQUF1QjtBQUN2Qix1Q0FBdUMsbUJBQU8sQ0FBQyw0RUFBZTtBQUM5RCxxQ0FBcUMsaUNBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWU7Ozs7Ozs7Ozs7QUNyQ2pCOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGtCQUFlO0FBQ2Ysa0NBQWtDLG1CQUFPLENBQUMsa0VBQVU7QUFDcEQsaUJBQWlCLG1CQUFPLENBQUMsOEVBQWdCO0FBQ3pDLHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DO0FBQ3BDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrQkFBZTs7Ozs7Ozs7OztBQ2xJakI7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0Ysa0JBQWU7QUFDZixvQ0FBb0MsbUJBQU8sQ0FBQyxzRUFBWTtBQUN4RCxpQkFBaUIsbUJBQU8sQ0FBQyw4RUFBZ0I7QUFDekMscUNBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLG1CQUFtQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3pCYTs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTtBQUNmLGdDQUFnQyxtQkFBTyxDQUFDLGtFQUFVO0FBQ2xELGlDQUFpQyxtQkFBTyxDQUFDLGtFQUFVO0FBQ25ELHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQSxlQUFlLGtCQUFlOzs7Ozs7Ozs7O0FDVmpCOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLFdBQVcsR0FBRyxXQUFXO0FBQ3pCLGtCQUFlO0FBQ2YsaUJBQWlCLG1CQUFPLENBQUMsOEVBQWdCO0FBQ3pDLG9DQUFvQyxtQkFBTyxDQUFDLHNFQUFZO0FBQ3hELHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQSwyQ0FBMkM7O0FBRTNDO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVztBQUNyQixVQUFVLFdBQVc7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDOURhOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGtCQUFlO0FBQ2YscUNBQXFDLG1CQUFPLENBQUMsd0VBQWE7QUFDMUQsa0NBQWtDLG1CQUFPLENBQUMsa0VBQVU7QUFDcEQsaUJBQWlCLG1CQUFPLENBQUMsOEVBQWdCO0FBQ3pDLHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGtCQUFlOzs7Ozs7Ozs7O0FDL0JqQjs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTtBQUNmLGdDQUFnQyxtQkFBTyxDQUFDLGtFQUFVO0FBQ2xELGtDQUFrQyxtQkFBTyxDQUFDLG9FQUFXO0FBQ3JELHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQSxlQUFlLGtCQUFlOzs7Ozs7Ozs7O0FDVmpCOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGtCQUFlO0FBQ2YsaUJBQWlCLG1CQUFPLENBQUMsOEVBQWdCO0FBQ3pDLGdDQUFnQyxtQkFBTyxDQUFDLGdFQUFTO0FBQ2pELG9DQUFvQyxtQkFBTyxDQUFDLHdFQUFhO0FBQ3pELHFDQUFxQyxpQ0FBaUM7QUFDdEUseUJBQXlCLHdCQUF3QixvQ0FBb0MseUNBQXlDLGtDQUFrQywwREFBMEQsMEJBQTBCO0FBQ3BQLDRCQUE0QixnQkFBZ0Isc0JBQXNCLE9BQU8sa0RBQWtELHNEQUFzRCw4QkFBOEIsbUpBQW1KLHFFQUFxRSxLQUFLO0FBQzVhLG9DQUFvQyxvRUFBb0UsMERBQTBEO0FBQ2xLLDZCQUE2QixtQ0FBbUM7QUFDaEUsOEJBQThCLDBDQUEwQywrQkFBK0Isb0JBQW9CLG1DQUFtQyxvQ0FBb0MsdUVBQXVFO0FBQ3pRO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxjQUFjO0FBQzFFO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN6Q2E7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0Ysa0JBQWU7QUFDZixvQ0FBb0MsbUJBQU8sQ0FBQyxzRUFBWTtBQUN4RCxpQkFBaUIsbUJBQU8sQ0FBQyw4RUFBZ0I7QUFDekMscUNBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixhQUFhLG1CQUFtQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3pCYTs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTtBQUNmLGtDQUFrQyxtQkFBTyxDQUFDLGtFQUFVO0FBQ3BELGlCQUFpQixtQkFBTyxDQUFDLDhFQUFnQjtBQUN6QyxxQ0FBcUMsaUNBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGtCQUFlOzs7Ozs7Ozs7O0FDdkpqQjs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTtBQUNmLG9DQUFvQyxtQkFBTyxDQUFDLHNFQUFZO0FBQ3hELHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrQkFBZTs7Ozs7Ozs7OztBQ1hqQjs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTtBQUNmLHVDQUF1QyxtQkFBTyxDQUFDLDRFQUFlO0FBQzlELHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrQkFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZDlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsZ0JBQWdCLHNDQUFzQyxrQkFBa0I7QUFDakYsd0JBQXdCO0FBQ3hCO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFTztBQUNQO0FBQ0EsK0NBQStDLE9BQU87QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxjQUFjO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsMkNBQTJDLFFBQVE7QUFDbkQ7QUFDQTs7QUFFTztBQUNQLGtDQUFrQztBQUNsQzs7QUFFTztBQUNQLHVCQUF1Qix1RkFBdUY7QUFDOUc7QUFDQTtBQUNBLHlHQUF5RztBQUN6RztBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0EsZ0VBQWdFO0FBQ2hFO0FBQ0EsOENBQThDLHlGQUF5RjtBQUN2SSw4REFBOEQsMkNBQTJDO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esa0JBQWtCLHlCQUF5QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBLDRDQUE0Qyx5RUFBeUU7QUFDckg7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1AsMEJBQTBCLCtEQUErRCxpQkFBaUI7QUFDMUc7QUFDQSxrQ0FBa0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNuRixpQ0FBaUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN0Riw4QkFBOEI7QUFDOUI7QUFDQSxHQUFHO0FBQ0g7O0FBRU87QUFDUCxZQUFZLDZCQUE2QiwwQkFBMEIsY0FBYyxxQkFBcUI7QUFDdEcsMklBQTJJLGNBQWM7QUFDekoscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsaUNBQWlDLFNBQVM7QUFDMUMsaUNBQWlDLFdBQVcsVUFBVTtBQUN0RCx3Q0FBd0MsY0FBYztBQUN0RDtBQUNBLDRHQUE0RyxPQUFPO0FBQ25ILCtFQUErRSxpQkFBaUI7QUFDaEcsdURBQXVELGdCQUFnQixRQUFRO0FBQy9FLDZDQUE2QyxnQkFBZ0IsZ0JBQWdCO0FBQzdFO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQSxRQUFRLFlBQVksYUFBYSxTQUFTLFVBQVU7QUFDcEQsa0NBQWtDLFNBQVM7QUFDM0M7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7O0FBRU07QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixNQUFNO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1AsMkJBQTJCLHNCQUFzQjtBQUNqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQLGdEQUFnRCxRQUFRO0FBQ3hELHVDQUF1QyxRQUFRO0FBQy9DLHVEQUF1RCxRQUFRO0FBQy9EO0FBQ0E7QUFDQTs7QUFFTztBQUNQLDJFQUEyRSxPQUFPO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSx3TUFBd00sY0FBYztBQUN0Tiw0QkFBNEIsc0JBQXNCO0FBQ2xELHdCQUF3QixZQUFZLHNCQUFzQixxQ0FBcUMsMkNBQTJDLE1BQU07QUFDaEosMEJBQTBCLE1BQU0saUJBQWlCLFlBQVk7QUFDN0QscUJBQXFCO0FBQ3JCLDRCQUE0QjtBQUM1QiwyQkFBMkI7QUFDM0IsMEJBQTBCO0FBQzFCOztBQUVPO0FBQ1A7QUFDQSxlQUFlLDZDQUE2QyxVQUFVLHNEQUFzRCxjQUFjO0FBQzFJLHdCQUF3Qiw2QkFBNkIsb0JBQW9CLHVDQUF1QyxrQkFBa0I7QUFDbEk7O0FBRU87QUFDUDtBQUNBO0FBQ0EseUdBQXlHLHVGQUF1RixjQUFjO0FBQzlNLHFCQUFxQiw4QkFBOEIsZ0RBQWdELHdEQUF3RDtBQUMzSiwyQ0FBMkMsc0NBQXNDLFVBQVUsbUJBQW1CLElBQUk7QUFDbEg7O0FBRU87QUFDUCwrQkFBK0IsdUNBQXVDLFlBQVksS0FBSyxPQUFPO0FBQzlGO0FBQ0E7O0FBRUE7QUFDQSx3Q0FBd0MsNEJBQTRCO0FBQ3BFLENBQUM7QUFDRDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1AsMkNBQTJDO0FBQzNDOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsTUFBTSxvQkFBb0IsWUFBWTtBQUM1RSxxQkFBcUIsOENBQThDO0FBQ25FO0FBQ0E7QUFDQSxxQkFBcUIsYUFBYTtBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUZBQXVGLFNBQVMsZ0JBQWdCO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7OztVQ3pYRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTEE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUYsaUdBSXNCO0FBQ3RCLGlGQUFnQztBQUVoQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQVUsRUFBaUIsRUFBRTtJQUN0QyxPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDakMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNSLElBQUksT0FBTyxHQUF1QixJQUFJLHlCQUFrQixFQUFFLENBQUM7SUFDM0QsSUFBSSxPQUFPLEdBQWdCLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pELElBQUksVUFBVSxHQUFlLElBQUksaUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVyRCxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxTQUFTLFVBQVUsQ0FBQyxHQUFXO1FBQzNCLElBQUksR0FBRyxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDZCxJQUFJLFFBQVEsR0FBVyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0QsbUJBQW1CO1FBQ25CLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyQixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRXZELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsSUFBSSxhQUFhLEdBQVksSUFBSSxDQUFDO1FBQ2xDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0MsSUFBSSxhQUFhLEVBQUUsQ0FBQztnQkFDaEIsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzdCLENBQUM7UUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxJQUFJLEtBQUssR0FBWSxNQUFNLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqRCxVQUFVLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVqRCw4Q0FBOEM7UUFDOUMsMkJBQTJCO1FBQzNCLE1BQU07SUFDVixDQUFDLENBQUMsRUFBRSxDQUFDO0lBRUwsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDL0IsSUFBSSxJQUFJLEdBQUcsTUFBTSxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUQsTUFBYyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7SUFFdEMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ2xELE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxnQkFBUyxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRzNHLENBQUMsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9BYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5LnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vQ29udGVudFR5cGUudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlQVBJLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vRnVzZUFQSUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlQVBJUmVzcG9uc2UudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlQ2FsbGJhY2tNYW5hZ2VyLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vRnVzZUNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlQ29udGV4dEJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlQ29udGV4dEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlRXJyb3IudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlTG9nZ2VyLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vRnVzZUxvZ2dlckZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlTG9nZ2VyTGV2ZWwudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0LnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vRnVzZVBlcm1pc3Npb25SZXF1ZXN0LnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vRnVzZVBlcm1pc3Npb25TdGF0ZS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VQbHVnaW4udHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlUmVzcG9uc2VSZWFkZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlU2VyaWFsaXplci50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0hUVFBGdXNlQVBJLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vUGxhdGZvcm0udHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9QbGF0Zm9ybVJlc29sdmVyLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vVmVyc2lvbi50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL2FuZHJvaWQvQW5kcm9pZEZ1c2VDb250ZXh0LnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vYW5kcm9pZC9BbmRyb2lkRnVzZUxvZ2dlci50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL2FuZHJvaWQvQW5kcm9pZFNjaGVtZUZ1c2VBUEkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9hcGkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9pb3MvSU9TRnVzZUNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9pb3MvSU9TRnVzZUxvZ2dlci50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL2lvcy9JT1NTY2hlbWVGdXNlQVBJLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vcGx1Z2lucy9GdXNlUnVudGltZS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0VjaG9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9pbmRleC5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL21heC5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL21kNS5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL25pbC5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3BhcnNlLmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9zaGExLmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjEuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92MVRvVjYuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92My5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3YzNS5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjUuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92Ni5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3Y2VG9WMS5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3Y3LmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92ZXJzaW9uLmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2Lm1qcyIsIndlYnBhY2s6Ly90ZXN0YXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Rlc3RhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rlc3RhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90ZXN0YXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL3NyYy9BcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge0Z1c2VBUEl9IGZyb20gJy4vRnVzZUFQSSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vUGxhdGZvcm0nO1xuXG4vKipcbiAqIEFuIGZhY3RvcnkgY2xhc3MgdGhhdCBkZWZpbmVzIHRoZSBiYXNlIHNpZ25hdHVyZSBmb3IgY3JlYXRpbmcgYSBGdXNlQVBJIGJyaWRnZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudCBhIGNyZWF0ZSBBUEkgdGhhdCByZXR1cm5zIGEgRnVzZUFQSSBmb3IgdGhlIGdpdmVuIFBsYXRmb3JtXG4gICAgICogXG4gICAgICogQHBhcmFtIHBsYXRmb3JtIC0gVGhlIGN1cnJlbnQgcGxhdGZvcm0gcnVudGltZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBjcmVhdGUocGxhdGZvcm06IFBsYXRmb3JtKTogRnVzZUFQSTtcbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgSUZ1c2VMb2dnZXIgfSBmcm9tIFwiLi9JRnVzZUxvZ2dlclwiO1xuXG4vKipcbiAqIEFuIEZ1c2VMb2dnZXIgZmFjdG9yeSBmb3IgY3JlYXRpbmcgbG9nZ2luZyBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5IHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50IHRvIGNyZWF0ZSBhIEZ1c2VMb2dnZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgY3JlYXRlKCk6IElGdXNlTG9nZ2VyO1xufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vKipcbiAqIFNvbWUgY29tbW9uIGRhdGEgdHlwZXNcbiAqL1xuZXhwb3J0IGVudW0gQ29udGVudFR5cGUge1xuICAgIFRFWFQgICAgICAgICAgICA9ICd0ZXh0L3BsYWluJyxcbiAgICBKU09OICAgICAgICAgICAgPSAnYXBwbGljYXRpb24vanNvbicsXG4gICAgSkFWQVNDUklQVCAgICAgID0gJ3RleHQvamF2YXNjcmlwdCcsIC8vIFJGQyA5MjM5XG4gICAgV0FTTSAgICAgICAgICAgID0gJ2FwcGxpY2F0aW9uL3dhc20nLFxuICAgIEJJTkFSWSAgICAgICAgICA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nXG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IEZ1c2VBUElSZXNwb25zZSB9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmltcG9ydCB7IFRTZXJpYWxpemFibGUgfSBmcm9tICcuL1RTZXJpYWxpemFibGUnO1xuaW1wb3J0IHsgRnVzZVNlcmlhbGl6ZXIgfSBmcm9tICcuL0Z1c2VTZXJpYWxpemVyJztcbmltcG9ydCB7IEZ1c2VDYWxsYmFja01hbmFnZXIsIFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyIH0gZnJvbSAnLi9GdXNlQ2FsbGJhY2tNYW5hZ2VyJztcblxuLyoqXG4gKiBHZW5lcmljIEFQSSByZXNwb25zZSBkYXRhIHR5cGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBURnVzZUFQSVJlc3BvbnNlRGF0YSB7XG4gICAga2VlcDogYm9vbGVhbjtcbiAgICBkYXRhPzogQmxvYjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRnVzZUFQSUNhbGxQYWNrZXQge1xuICAgIHJvdXRlOiBzdHJpbmc7XG4gICAgY2FsbGJhY2tJRDogc3RyaW5nO1xuICAgIGJvZHk6IEJsb2I7XG4gICAgY29udGVudFR5cGU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciB0aGUgRnVzZSBBUEkgYnJpZGdlIGZvciBleGNoYW5naW5nIGRhdGEgd2l0aCB0aGUgbmF0aXZlIHBsYXRmb3JtXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGdXNlQVBJIHtcblxuICAgIHByaXZhdGUgJHNlcmlhbGl6ZXI6IEZ1c2VTZXJpYWxpemVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLiRzZXJpYWxpemVyID0gdGhpcy5fY3JlYXRlU2VyaWFsaXplcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY3JlYXRlU2VyaWFsaXplcigpOiBGdXNlU2VyaWFsaXplciB7XG4gICAgICAgIHJldHVybiBuZXcgRnVzZVNlcmlhbGl6ZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2VyaWFsaXplcigpOiBGdXNlU2VyaWFsaXplciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzZXJpYWxpemVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRvIGltcGxlbWVudCBleGVjdXRlIG5hdGl2ZSBicmlkZ2UgbG9naWNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gcGx1Z2luSUQgLSBUaGUgcGx1Z2luIElEXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIEFQSSBtZXRob2RcbiAgICAgKiBAcGFyYW0gYXJncyAtIEFQSSBhcmd1bWVudHMgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF9leGVjdXRlKHBsdWdpbklEOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBjb250ZW50VHlwZTogc3RyaW5nLCBhcmdzOiBCbG9iKTogUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+O1xuXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVSb3V0ZShwbHVnaW5JRDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgL2FwaS8ke3BsdWdpbklEfSR7bWV0aG9kfWA7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGV4ZWN1dGUocGx1Z2luSUQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGNvbnRlbnRUeXBlOiBzdHJpbmcsIGFyZ3M6IFRTZXJpYWxpemFibGUpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhlY3V0ZShwbHVnaW5JRCwgbWV0aG9kLCBjb250ZW50VHlwZSwgdGhpcy4kc2VyaWFsaXplci5zZXJpYWxpemUoYXJncykpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDYWxsYmFja0NvbnRleHQoY2I6IFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEZ1c2VDYWxsYmFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVDYWxsYmFjayhjYik7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbGVhc2VDYWxsYmFjayhpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIEZ1c2VDYWxsYmFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlQ2FsbGJhY2soaWQpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gJy4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5pbXBvcnQgeyBGdXNlQVBJIH0gZnJvbSAnLi9GdXNlQVBJJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9QbGF0Zm9ybSc7XG5pbXBvcnQgeyBJT1NTY2hlbWVGdXNlQVBJIH0gZnJvbSBcIi4vaW9zL0lPU1NjaGVtZUZ1c2VBUElcIjtcbmltcG9ydCB7IEFuZHJvaWRTY2hlbWVGdXNlQVBJIH0gZnJvbSAnLi9hbmRyb2lkL0FuZHJvaWRTY2hlbWVGdXNlQVBJJztcblxuLyoqXG4gKiBBIEZ1c2VBUEkgZmFjdG9yeSB0aGF0IHVzZXMgdGhlIEhUVFAvYXBwIHNjaGVtZSBhcyB0aGUgYnJpZGdlLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZUFQSUZhY3RvcnkgZXh0ZW5kcyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcbiAgICBcbiAgICBwcml2YXRlICRpb3NTY2hlbWU6IEZ1c2VBUEk7XG4gICAgcHJpdmF0ZSAkYW5kcm9pZFNjaGVtZTogRnVzZUFQSTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBSZWFsaXN0aWNhbGx5IHRoZXJlIHdpbGwgb25seSBiZSBvbmUgb3IgdGhlIG90aGVyIHNldC5cbiAgICAgICAgdGhpcy4kaW9zU2NoZW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy4kYW5kcm9pZFNjaGVtZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIG92ZXJyaWRlIGNyZWF0ZShwbGF0Zm9ybTogUGxhdGZvcm0pOiBGdXNlQVBJIHtcbiAgICAgICAgc3dpdGNoIChwbGF0Zm9ybSkge1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5JT1M6IHJldHVybiB0aGlzLl9jcmVhdGVpT1NBUEkoKTtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uQU5EUk9JRDogcmV0dXJuIHRoaXMuX2NyZWF0ZUFuZHJvaWRBUEkoKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgcGxhdGZvcm06ICcgKyBwbGF0Zm9ybSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZWlPU0FQSSgpOiBGdXNlQVBJIHtcbiAgICAgICAgaWYgKCF0aGlzLiRpb3NTY2hlbWUpIHtcbiAgICAgICAgICAgIHRoaXMuJGlvc1NjaGVtZSA9IG5ldyBJT1NTY2hlbWVGdXNlQVBJKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJGlvc1NjaGVtZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZUFuZHJvaWRBUEkoKTogRnVzZUFQSSB7XG4gICAgICAgIGlmICghdGhpcy4kYW5kcm9pZFNjaGVtZSkge1xuICAgICAgICAgICAgdGhpcy4kYW5kcm9pZFNjaGVtZSA9IG5ldyBBbmRyb2lkU2NoZW1lRnVzZUFQSSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLiRhbmRyb2lkU2NoZW1lO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgRnVzZVJlc3BvbnNlUmVhZGVyIH0gZnJvbSBcIi4vRnVzZVJlc3BvbnNlUmVhZGVyXCI7XG5pbXBvcnQgeyBGdXNlRXJyb3IsIElGdXNlRXJyb3JTZXJpYWxpemVkIH0gZnJvbSAnLi9GdXNlRXJyb3InO1xuXG5leHBvcnQgY2xhc3MgRnVzZUFQSVJlc3BvbnNlIHtcbiAgICBwcml2YXRlICRjb250ZW50OiBBcnJheUJ1ZmZlcjtcbiAgICBwcml2YXRlICRoZWFkZXJzOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG4gICAgcHJpdmF0ZSAkc3RhdHVzOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29udGVudDogQXJyYXlCdWZmZXIsIGhlYWRlcnM6IHN0cmluZyB8IG51bGwsIHN0YXR1czogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuJHN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy4kY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuJGhlYWRlcnMgPSB0aGlzLiRwYXJzZUhlYWRlcnMoaGVhZGVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRXJyb3IoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdGF0dXMgPj0gNDAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDb250ZW50TGVuZ3RoKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGxlblN0cjogc3RyaW5nID0gdGhpcy4kaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpPy5bMF07XG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHBhcnNlSW50KGxlblN0cik7XG4gICAgICAgIGlmIChpc05hTihsZW5ndGgpKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbnRlbnRUeXBlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiRoZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk/LlswXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVhZEFzQXJyYXlCdWZmZXIoKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29udGVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVhZEFzQmxvYigpOiBQcm9taXNlPEJsb2I+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFt0aGlzLiRjb250ZW50XSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlYWRBc1RleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEZ1c2VSZXNwb25zZVJlYWRlci5yZWFkQXNUZXh0KHRoaXMuJGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWFkQXNKU09OPFQgPSB1bmtub3duPigpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEZ1c2VSZXNwb25zZVJlYWRlci5yZWFkQXNKU09OKHRoaXMuJGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWFkQXNFcnJvcigpOiBQcm9taXNlPEZ1c2VFcnJvcj4ge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkRXJyb3I6IElGdXNlRXJyb3JTZXJpYWxpemVkID0gYXdhaXQgRnVzZVJlc3BvbnNlUmVhZGVyLnJlYWRBc0pTT04odGhpcy4kY29udGVudCk7XG4gICAgICAgIHJldHVybiBGdXNlRXJyb3IuZnJvbVNlcmlhbGl6ZWQoc2VyaWFsaXplZEVycm9yKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SGVhZGVycygpOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kaGVhZGVycztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SGVhZGVyKGtleTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy4kaGVhZGVycy5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlICRwYXJzZUhlYWRlcnMoaGVhZGVyczogc3RyaW5nIHwgbnVsbCk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiB7XG4gICAgICAgIGNvbnN0IG1hcDogTWFwPHN0cmluZywgc3RyaW5nW10+ID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGlmICghaGVhZGVycykge1xuICAgICAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IGhlYWRlcnMuc3BsaXQoJ1xcclxcbicpO1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmU6IHN0cmluZ1tdID0gbGluZXNbaV0uc3BsaXQoJzonKTtcbiAgICAgICAgICAgIGNvbnN0IGtleTogc3RyaW5nID0gbGluZVswXTtcbiAgICAgICAgICAgIGlmICghbWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgbWFwLnNldChrZXksIFtdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaGVhZGVyVmFsdWU6IHN0cmluZ1tdID0gbWFwLmdldChrZXkpO1xuICAgICAgICAgICAgaGVhZGVyVmFsdWUucHVzaChsaW5lWzFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge1xuICAgIFROYXRpdmVDYWxsYmFja0Z1bmN0aW9uXG59IGZyb20gJy4vaW50ZXJuYWxzJztcbmltcG9ydCAqIGFzIFVVSUQgZnJvbSAndXVpZCc7XG5cbmV4cG9ydCB0eXBlIFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyID0gKGRhdGE6IHN0cmluZykgPT4gdm9pZDtcblxud2luZG93Ll9fYnRmdXNlX2NhbGxiYWNrcyA9IG5ldyBNYXA8c3RyaW5nLCBUTmF0aXZlQ2FsbGJhY2tGdW5jdGlvbj4oKTtcblxud2luZG93Ll9fYnRmdXNlX2RvQ2FsbGJhY2sgPSBmdW5jdGlvbihjYWxsYmFja0lEOiBzdHJpbmcsIGRhdGE6IHN0cmluZykge1xuICAgIGlmIChjYWxsYmFja0lEICYmIHdpbmRvdy5fX2J0ZnVzZV9jYWxsYmFja3MuaGFzKGNhbGxiYWNrSUQpKSB7XG4gICAgICAgIHdpbmRvdy5fX2J0ZnVzZV9jYWxsYmFja3MuZ2V0KGNhbGxiYWNrSUQpKGRhdGEpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQSBzaW5nbGV0b24gbWFuYWdlciB0byBtYW5hZ2UgbmF0aXZlIGNhbGxiYWNrcy5cbiAqIFxuICogQ3JlYXRlIGEgY2FsbGJhY2sgY29udGV4dCBhbmQgcGFzcyB0aGUgcmV0dXJuIGNvbnRleHQgaWQgdG8gbmF0aXZlIGNsaWVudHMsXG4gKiBpbiB3aGljaCB0aGV5IGNhbiB1c2UgdG8gcmVzcG9uZCBiYWNrLlxuICogXG4gKiBOb3RlIHRoYXQgcGx1Z2luIEFQSXMgYXJlIGZhciBtb3JlIGVmZmljaWVudCBhbmQgY2FuIGhhbmRsZSBhIGRpdmVyc2Ugc2V0IG9mIGRhdGEsXG4gKiBpbmNsdWRpbmcgbGFyZ2UgcGF5bG9hZHMsIHNvIHdoZW4gcG9zc2libGUgaXQncyBiZXN0IHRvIHVzZSBhIHBsdWdpbiBBUEkgaW5zdGVhZCBvZiBhXG4gKiBjYWxsYmFjayBBUEkuXG4gKiBcbiAqIFRoaXMgY2FsbGJhY2sgQVBJIGlzIGhvd2V2ZXIsIHVzZWZ1bCBmb3IgYnVpbGRpbmcgbGlzdGVuZXIga2luZCBvZiBzZXJ2aWNlcyB3aGVyZSB0aGUgbmF0aXZlXG4gKiBuZWVkcyB0byBjb250aW5vdXNseSBjYWxsYmFjayB0byB0aGUgd2VidmlldyB3aXRoIHNtYWxsIGRhdGEgcGFja2V0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VDYWxsYmFja01hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljICRpbnN0YW5jZTogRnVzZUNhbGxiYWNrTWFuYWdlcjtcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBGdXNlQ2FsbGJhY2tNYW5hZ2VyIHtcbiAgICAgICAgaWYgKCFGdXNlQ2FsbGJhY2tNYW5hZ2VyLiRpbnN0YW5jZSkge1xuICAgICAgICAgICAgRnVzZUNhbGxiYWNrTWFuYWdlci4kaW5zdGFuY2UgPSBuZXcgRnVzZUNhbGxiYWNrTWFuYWdlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEZ1c2VDYWxsYmFja01hbmFnZXIuJGluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDYWxsYmFjayhjYjogVEZ1c2VBUElDYWxsYmFja0hhbmRsZXIpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBpZDogc3RyaW5nID0gVVVJRC52NCgpO1xuICAgICAgICB3aW5kb3cuX19idGZ1c2VfY2FsbGJhY2tzLnNldChpZCwgKGRhdGE6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgY2IoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVsZWFzZUNhbGxiYWNrKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgd2luZG93Ll9fYnRmdXNlX2NhbGxiYWNrcy5kZWxldGUoaWQpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gJy4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gXCIuL1BsYXRmb3JtXCI7XG5pbXBvcnQge1xuICAgIEZ1c2VSdW50aW1lLFxuICAgIElSdW50aW1lSW5mbyxcbiAgICBUUGF1c2VDYWxsYmFja0hhbmRsZXIsXG4gICAgVFJlc3VtZUNhbGxiYWNrSGFuZGxlclxufSBmcm9tICcuL3BsdWdpbnMvRnVzZVJ1bnRpbWUnO1xuaW1wb3J0IHtWZXJzaW9ufSBmcm9tICcuL1ZlcnNpb24nO1xuaW1wb3J0IHtJRnVzZUxvZ2dlcn0gZnJvbSAnLi9JRnVzZUxvZ2dlcic7XG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5IH0gZnJvbSAnLi9BYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5JztcblxuLyoqXG4gKiBBIGNvbnRleHQgY2xhc3MgdGhhdCBob2xkcyBGdXNlIEZyYW1ld29yayBzdGF0ZVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRnVzZUNvbnRleHQge1xuICAgIHByaXZhdGUgJHBsYXRmb3JtOiBQbGF0Zm9ybTtcbiAgICBwcml2YXRlICRydW50aW1lOiBGdXNlUnVudGltZTtcbiAgICBwcml2YXRlICRydW50aW1lVmVyc2lvbjogVmVyc2lvbjtcbiAgICBwcml2YXRlICRydW50aW1lSW5mbzogSVJ1bnRpbWVJbmZvO1xuICAgIHByaXZhdGUgJGRlZmF1bHRBUElGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5O1xuICAgIHByaXZhdGUgJGxvZ2dlcjogSUZ1c2VMb2dnZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgICAgYXBpRmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSxcbiAgICAgICAgbG9nZ2VyOiBJRnVzZUxvZ2dlclxuICAgICkge1xuICAgICAgICB0aGlzLiRwbGF0Zm9ybSA9IHBsYXRmb3JtO1xuICAgICAgICB0aGlzLiRsb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiRydW50aW1lVmVyc2lvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuJGRlZmF1bHRBUElGYWN0b3J5ID0gYXBpRmFjdG9yeTtcbiAgICAgICAgdGhpcy4kcnVudGltZSA9IG5ldyBGdXNlUnVudGltZSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TG9nZ2VyKCk6IElGdXNlTG9nZ2VyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGxvZ2dlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGVmYXVsdEFQSUZhY3RvcnkoKTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRkZWZhdWx0QVBJRmFjdG9yeTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGxhdGZvcm0oKTogUGxhdGZvcm0ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcGxhdGZvcm07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyAkZ2V0UnVudGltZUluZm8oKTogUHJvbWlzZTxJUnVudGltZUluZm8+IHtcbiAgICAgICAgaWYgKCF0aGlzLiRydW50aW1lSW5mbykge1xuICAgICAgICAgICAgdGhpcy4kcnVudGltZUluZm8gPSBhd2FpdCB0aGlzLiRydW50aW1lLmdldEluZm8oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLiRydW50aW1lSW5mbztcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZ2V0UGxhdGZvcm1WZXJzaW9uKCk6IFByb21pc2U8VmVyc2lvbj4ge1xuICAgICAgICBpZiAoIXRoaXMuJHJ1bnRpbWVWZXJzaW9uKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZvOiBJUnVudGltZUluZm8gPSBhd2FpdCB0aGlzLiRnZXRSdW50aW1lSW5mbygpO1xuICAgICAgICAgICAgdGhpcy4kcnVudGltZVZlcnNpb24gPSBWZXJzaW9uLnBhcnNlVmVyc2lvblN0cmluZyhpbmZvLnZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy4kcnVudGltZVZlcnNpb247XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGlzRGVidWdNb2RlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBpbmZvOiBJUnVudGltZUluZm8gPSBhd2FpdCB0aGlzLiRnZXRSdW50aW1lSW5mbygpO1xuICAgICAgICByZXR1cm4gaW5mby5kZWJ1Z01vZGU7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNhbGxiYWNrOiBUUGF1c2VDYWxsYmFja0hhbmRsZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy4kcnVudGltZS5yZWdpc3RlclBhdXNlSGFuZGxlcihjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHVucmVnaXN0ZXJQYXVzZUhhbmRsZXIoY2FsbGJhY2tJRDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLiRydW50aW1lLnVucmVnaXN0ZXJQYXVzZUhhbmRsZXIoY2FsbGJhY2tJRCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYWxsYmFjazogVFJlc3VtZUNhbGxiYWNrSGFuZGxlcik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLiRydW50aW1lLnJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHVucmVnaXN0ZXJSZXN1bWVIYW5kbGVyKGNhbGxiYWNrSUQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy4kcnVudGltZS51bnJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYWxsYmFja0lEKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25XZWJ2aWV3UmVhZHkoKTogUHJvbWlzZTx2b2lkPjtcbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gXCIuL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnlcIjtcbmltcG9ydCB7IEFic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnkgfSBmcm9tIFwiLi9BYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5XCI7XG5pbXBvcnQgeyBGdXNlQVBJRmFjdG9yeSB9IGZyb20gXCIuL0Z1c2VBUElGYWN0b3J5XCI7XG5pbXBvcnQgeyBGdXNlQ29udGV4dCB9IGZyb20gXCIuL0Z1c2VDb250ZXh0XCI7XG5pbXBvcnQgeyBGdXNlQ29udGV4dEZhY3RvcnkgfSBmcm9tICcuL0Z1c2VDb250ZXh0RmFjdG9yeSc7XG5pbXBvcnQgeyBGdXNlTG9nZ2VyRmFjdG9yeSB9IGZyb20gXCIuL0Z1c2VMb2dnZXJGYWN0b3J5XCI7XG5pbXBvcnQgeyBGdXNlTG9nZ2VyTGV2ZWwgfSBmcm9tIFwiLi9GdXNlTG9nZ2VyTGV2ZWxcIjtcbmltcG9ydCB7IElGdXNlTG9nZ2VyIH0gZnJvbSBcIi4vSUZ1c2VMb2dnZXJcIjtcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSBcIi4vUGxhdGZvcm1cIjtcbmltcG9ydCB7IFBsYXRmb3JtUmVzb2x2ZXIgfSBmcm9tIFwiLi9QbGF0Zm9ybVJlc29sdmVyXCI7XG5cbmV4cG9ydCBjbGFzcyBGdXNlQ29udGV4dEJ1aWxkZXIge1xuICAgIHByaXZhdGUgJHBsYXRmb3JtUmVzb2x2ZXI6IFBsYXRmb3JtUmVzb2x2ZXI7XG4gICAgcHJpdmF0ZSAkbG9nZ2VyRmFjdG9yeTogQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSB8IG51bGw7XG4gICAgcHJpdmF0ZSAkYXBpRmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB8IG51bGw7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuJGxvZ2dlckZhY3RvcnkgPSBudWxsO1xuICAgICAgICB0aGlzLiRhcGlGYWN0b3J5ID0gbnVsbDtcbiAgICAgICAgdGhpcy4kcGxhdGZvcm1SZXNvbHZlciA9IG5ldyBQbGF0Zm9ybVJlc29sdmVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFBsYXRmb3JtUmVzb2x2ZXIocmVzb2x2ZXI6IFBsYXRmb3JtUmVzb2x2ZXIpOiBGdXNlQ29udGV4dEJ1aWxkZXIge1xuICAgICAgICB0aGlzLiRwbGF0Zm9ybVJlc29sdmVyID0gcmVzb2x2ZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBUElGYWN0b3J5KGZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3RvcnkpOiBGdXNlQ29udGV4dEJ1aWxkZXIge1xuICAgICAgICB0aGlzLiRhcGlGYWN0b3J5ID0gZmFjdG9yeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldExvZ2dlckZhY3RvcnkoZmFjdG9yeTogQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSk6IEZ1c2VDb250ZXh0QnVpbGRlciB7XG4gICAgICAgIHRoaXMuJGxvZ2dlckZhY3RvcnkgPSBmYWN0b3J5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgX2lzRGVidWdNb2RlKGNvbnRleHQ6IEZ1c2VDb250ZXh0KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCBjb250ZXh0LmlzRGVidWdNb2RlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGJ1aWxkKCk6IFByb21pc2U8RnVzZUNvbnRleHQ+IHtcbiAgICAgICAgY29uc3QgcGxhdGZvcm06IFBsYXRmb3JtID0gdGhpcy4kcGxhdGZvcm1SZXNvbHZlci5yZXNvbHZlKCk7XG5cbiAgICAgICAgbGV0IGFwaUZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnk7XG4gICAgICAgIGlmICh0aGlzLiRhcGlGYWN0b3J5KSB7XG4gICAgICAgICAgICBhcGlGYWN0b3J5ID0gdGhpcy4kYXBpRmFjdG9yeTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFwaUZhY3RvcnkgPSBuZXcgRnVzZUFQSUZhY3RvcnkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsb2dnZXJGYWN0b3J5OiBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5O1xuICAgICAgICBpZiAodGhpcy4kbG9nZ2VyRmFjdG9yeSkge1xuICAgICAgICAgICAgbG9nZ2VyRmFjdG9yeSA9IHRoaXMuJGxvZ2dlckZhY3RvcnlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlckZhY3RvcnkgPSBuZXcgRnVzZUxvZ2dlckZhY3RvcnkocGxhdGZvcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGV4dEZhY3Rvcnk6IEZ1c2VDb250ZXh0RmFjdG9yeSA9IG5ldyBGdXNlQ29udGV4dEZhY3RvcnkoKTtcbiAgICAgICAgY29uc3QgY29udGV4dDogRnVzZUNvbnRleHQgPSBjb250ZXh0RmFjdG9yeS5jcmVhdGUocGxhdGZvcm0sIGFwaUZhY3RvcnksIGxvZ2dlckZhY3RvcnkuY3JlYXRlKCkpO1xuICAgICAgICAvLyBjb25zdCBjb250ZXh0OiBGdXNlQ29udGV4dCA9IG5ldyBGdXNlQ29udGV4dChwbGF0Zm9ybSwgYXBpRmFjdG9yeSwgbG9nZ2VyRmFjdG9yeSk7XG5cbiAgICAgICAgY29uc3QgaXNEZWJ1Z01vZGU6IGJvb2xlYW4gPSBhd2FpdCB0aGlzLl9pc0RlYnVnTW9kZShjb250ZXh0KTtcbiAgICAgICAgY29uc3QgbG9nZ2VyOiBJRnVzZUxvZ2dlciA9IGNvbnRleHQuZ2V0TG9nZ2VyKCk7XG4gICAgICAgIGxvZ2dlci5lbmFibGVOYXRpdmVCcmlkZ2UoaXNEZWJ1Z01vZGUpO1xuICAgICAgICBsZXQgbGV2ZWw6IEZ1c2VMb2dnZXJMZXZlbCA9IGxvZ2dlci5nZXRMZXZlbCgpO1xuICAgICAgICBsZXZlbCB8PSBGdXNlTG9nZ2VyTGV2ZWwuREVCVUc7XG4gICAgICAgIGxvZ2dlci5zZXRMZXZlbChsZXZlbCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjQgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSAnLi9BYnN0cmFjdEZ1c2VBUElGYWN0b3J5JztcbmltcG9ydCB7IEFuZHJvaWRGdXNlQ29udGV4dCB9IGZyb20gJy4vYW5kcm9pZC9BbmRyb2lkRnVzZUNvbnRleHQnO1xuaW1wb3J0IHsgRnVzZUNvbnRleHQgfSBmcm9tICcuL0Z1c2VDb250ZXh0JztcbmltcG9ydCB7IElGdXNlTG9nZ2VyIH0gZnJvbSAnLi9JRnVzZUxvZ2dlcic7XG5pbXBvcnQgeyBJT1NGdXNlQ29udGV4dCB9IGZyb20gJy4vaW9zL0lPU0Z1c2VDb250ZXh0JztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9QbGF0Zm9ybSc7XG5cbmV4cG9ydCBjbGFzcyBGdXNlQ29udGV4dEZhY3Rvcnkge1xuICAgIHB1YmxpYyBjcmVhdGUocGxhdGZvcm06IFBsYXRmb3JtLCBhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5LCBsb2dnZXI6IElGdXNlTG9nZ2VyKTogRnVzZUNvbnRleHQge1xuICAgICAgICBzd2l0Y2ggKHBsYXRmb3JtKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLkFORFJPSUQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBbmRyb2lkRnVzZUNvbnRleHQoYXBpRmFjdG9yeSwgbG9nZ2VyKTtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uSU9TOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSU9TRnVzZUNvbnRleHQoYXBpRmFjdG9yeSwgbG9nZ2VyKTtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uVEVTVDogcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IElTZXJpYWxpemFibGUgfSBmcm9tIFwiLi9JU2VyaWFsaXphYmxlXCI7XG5pbXBvcnQgeyBURnVzZVNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL1RTZXJpYWxpemFibGVcIjtcblxuLyoqXG4gKiBBIHVuaW9uIG9mIGFjY2VwdGFibGUgdHlwZSBmb3IgZXJyb3IgY2F1c2VzLlxuICovXG5leHBvcnQgdHlwZSBURnVzZUVycm9yQ2F1c2UgPSBzdHJpbmcgfCBFcnJvciB8IEZ1c2VFcnJvciB8IG51bGw7XG5cbmludGVyZmFjZSBfSUZ1c2VFcnJvclNlcmlhbGl6ZWQge1xuICAgIGRvbWFpbjogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgc3RhY2s/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQSB0eXBlIHRoYXQgcmVwcmVzZW50cyBhIGZ1c2UgZXJyb3IgaW4gYSBzZXJpYWxpemVkIHN0YXRlLlxuICovXG5leHBvcnQgdHlwZSBJRnVzZUVycm9yU2VyaWFsaXplZCA9IFRGdXNlU2VyaWFsaXphYmxlPF9JRnVzZUVycm9yU2VyaWFsaXplZD47XG5cbi8qKlxuICogQSBzdHJ1Y3R1cmVkIGVycm9yIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VFcnJvciBleHRlbmRzIEVycm9yIGltcGxlbWVudHMgSVNlcmlhbGl6YWJsZSB7XG4gICAgcHJpdmF0ZSAkZG9tYWluOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSAkbWVzc2FnZTogc3RyaW5nO1xuICAgIHByaXZhdGUgJGNhdXNlOiBURnVzZUVycm9yQ2F1c2U7XG4gICAgcHJpdmF0ZSAkY29kZTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRvbWFpbiAtIFRoZSBlcnJvciBkb21haW4sIHVzdWFsbHkgcmVwcmVzZW50cyBhIGxpYnJhcnksIGNsYXNzLCBvciBwbHVnaW4uXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgLSBUaGUgZXJyb3IgbWVzc2FnZVxuICAgICAqIEBwYXJhbSBjYXVzZSAtIFRoZSB1bmRlcmx5aW5nIGNhdXNlIG9mIHRoZSBlcnJvci4gTWF5IGJlIG51bGwuXG4gICAgICogQHBhcmFtIGNvZGUgLSBBbiBlcnJvciBjb2RlLiBNYXkgYmUgbnVsbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoZG9tYWluOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgY2F1c2U/OiBURnVzZUVycm9yQ2F1c2UsIGNvZGU/OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgdGhpcy4kZG9tYWluID0gZG9tYWluO1xuICAgICAgICB0aGlzLiRtZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy4kY29kZSA9IGNvZGUgfHwgMDtcbiAgICAgICAgdGhpcy4kY2F1c2UgPSBjYXVzZSB8fCBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBlcnJvciBtZXNzYWdlXG4gICAgICovXG4gICAgcHVibGljIGdldE1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGVycm9yIGRvbWFpbiwgdXN1YWxseSByZXByZXNlbnRpbmcgYSBsaWJyYXJ5LCBjbGFzcywgb3IgcGx1Z2luLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXREb21haW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGRvbWFpbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgZXJyb3IgY29kZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRDb2RlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjb2RlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSB1bmRlcmx5aW5nIGNhdXNlIG9mIHRoZSBlcnJvciwgaWYga25vd24uIE1heSBiZSBudWxsLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRDYXVzZSgpOiBURnVzZUVycm9yQ2F1c2UgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNhdXNlO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBBIHNlcmlhbGl6ZWQgb2JqZWN0IHJlcHJlc2VudGluZyBhbiBlcnJvci5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VyaWFsaXplKCk6IElGdXNlRXJyb3JTZXJpYWxpemVkIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRvbWFpbjogdGhpcy5nZXREb21haW4oKSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMuZ2V0TWVzc2FnZSgpLFxuICAgICAgICAgICAgY29kZTogdGhpcy5nZXRDb2RlKCksXG4gICAgICAgICAgICBzdGFjazogdGhpcy5zdGFja1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdyYXBzIHRoZSBnaXZlbiBvYmplY3QgaW50byBhIEZ1c2VFcnJvciBvYmplY3QuIEFjY2VwdHMgc2V2ZXJhbCBkaWZmZXJlbnRcbiAgICAgKiBmb3JtYXRzLCB3aGljaCBpbmZsdWVuY2VzIHRoZSBiZWhhdmlvdXIgb2YgdGhpcyBtZXRob2QuXG4gICAgICogXG4gICAgICogSWYgdGhlIGlucHV0IGlzIGEgc3RyaW5nLCBhIEZ1c2VFcnJvciBvYmplY3QgaXMgY3JlYXRlZCB3aXRoIHRoZSBzdHJpbmcgYXNcbiAgICAgKiB0aGUgZXJyb3IgbWVzc2FnZSBvZiBhbiB1bmtub3duIGRvbWFpbi5cbiAgICAgKiBcbiAgICAgKiBJZiB0aGUgaW5wdXQgaXMgYSBGdXNlRXJyb3IsIHRoZW4gdGhpcyBtZXRob2QgZG9lcyBub3RoaW5nIGJ1dCBwYXNzZXMgdGhyb3VnaFxuICAgICAqIHRoZSBGdXNlRXJyb3IuIFRoZSByZXR1cm5lZCBGdXNlRXJyb3IgaXMgdGhlIGlucHV0IEZ1c2VFcnJvciwgYSBjb3B5IGlzIG5vdCBtYWRlLlxuICAgICAqIFxuICAgICAqIElmIHRoZSBpbnB1dCBpcyBhbiBFcnJvciwgdGhlbiBhIEZ1c2VFcnJvciBpcyBjcmVhdGVkIHVzaW5nIHRoZSBuYW1lIGFzIHRoZVxuICAgICAqIGRvbWFpbiwgYW5kIGl0J3MgbWVzc2FnZSBhcyB0aGUgZXJyb3IgbWVzc2FnZS4gVGhlIGVycm9yIG9iamVjdCBpcyBhbHNvIHVzZWRcbiAgICAgKiBhcyB0aGUgRnVzZUVycm9yJ3MgY2F1c2UgcGFyYW1ldGVyLlxuICAgICAqIFxuICAgICAqIElmIHRoZSBpbnB1dCBpcyBvZiB0aGUgc2hhcGUgb2YgSUZ1c2VFcnJvclNlcmlhbGl6ZWQsIHRoZW4gdGhlIG9iamVjdCBpc1xuICAgICAqIGRlc2VyaWFsaXplZCBpbnRvIGEgRnVzZUVycm9yIGluc3RhbmNlLlxuICAgICAqIFxuICAgICAqIElmIGFueSBvdGhlciB0eXBlIG9mIG9iamVjdCBpcyBnaXZlbiwgYW4gY29uc29sZSBlcnJvciBtZXNzYWdlIHdpbGwgYmUgXG4gICAgICogcHJpbnRlZCBhbmQgYSBcIkZ1c2VFcnJvclwiIGRvbWFpbiBlcnJvciB3aWxsIGJlIHJldHVybmVkIHN0YXRpbmcgdGhlIGVycm9yXG4gICAgICogaXMgbm90IHdyYXBwYWJsZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZXJyb3IgLSBBIHZhbHVlIHRoYXQgY2FuIHJlcHJlc2VudCBhbiBlcnJvclxuICAgICAqIEByZXR1cm5zIEEgRnVzZUVycm9yIGluc3RhbmNlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB3cmFwKGVycm9yOiBzdHJpbmcgfCBFcnJvciB8IEZ1c2VFcnJvciB8IElGdXNlRXJyb3JTZXJpYWxpemVkIHwgdW5rbm93bik6IEZ1c2VFcnJvciB7XG4gICAgICAgIGxldCBmZXJyOiBGdXNlRXJyb3IgPSBudWxsO1xuICAgICAgICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZmVyciA9IG5ldyBGdXNlRXJyb3IoJ1Vua25vd24nLCBlcnJvciwgbnVsbCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBGdXNlRXJyb3IpIHtcbiAgICAgICAgICAgIGZlcnIgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBmZXJyID0gbmV3IEZ1c2VFcnJvcihlcnJvci5uYW1lLCBlcnJvci5tZXNzYWdlLCBlcnJvciwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoRnVzZUVycm9yLiRpc1NlcmlhbGl6ZWRGdXNlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICBmZXJyID0gRnVzZUVycm9yLmZyb21TZXJpYWxpemVkKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Vud3JhcHBhYmxlIEVycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgZmVyciA9IG5ldyBGdXNlRXJyb3IoJ0Z1c2VFcnJvcicsICdVbndyYXBwYWJsZSBlcnJvcicsIG51bGwsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZlcnI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVzZXJpYWxpemVzIGFuZCBjcmVhdGVzIGEgbmV3IEZ1c2VFcnJvciBpbnN0YW5jZVxuICAgICAqIFxuICAgICAqIEBwYXJhbSBlcnJvciAtIFRoZSBzZXJpYWxpemVkIGVycm9yIG9iamVjdFxuICAgICAqIEByZXR1cm5zIEEgRnVzZUVycm9yIGluc3RhbmNlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tU2VyaWFsaXplZChlcnJvcjogSUZ1c2VFcnJvclNlcmlhbGl6ZWQpOiBGdXNlRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IEZ1c2VFcnJvcihlcnJvci5kb21haW4sIGVycm9yLm1lc3NhZ2UsIG51bGwsIGVycm9yLmNvZGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuICdGdXNlRXJyb3InO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcHJpdmF0ZSBzdGF0aWMgJGlzU2VyaWFsaXplZEZ1c2VFcnJvcihlcnJvcjogYW55KTogZXJyb3IgaXMgSUZ1c2VFcnJvclNlcmlhbGl6ZWQge1xuICAgICAgICByZXR1cm4gJ21lc3NhZ2UnIGluIGVycm9yICYmICdkb21haW4nIGluIGVycm9yICYmICdjb2RlJyBpbiBlcnJvcjtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7XG4gICAgSUZ1c2VMb2dnZXIsIElOYXRpdmVMb2dFbnRyeVxufSBmcm9tICcuL0lGdXNlTG9nZ2VyJztcbmltcG9ydCB7VFNlcmlhbGl6YWJsZX0gZnJvbSAnLi9UU2VyaWFsaXphYmxlJztcbmltcG9ydCB7SVNlcmlhbGl6YWJsZX0gZnJvbSAnLi9JU2VyaWFsaXphYmxlJztcbmltcG9ydCB7IEZ1c2VMb2dnZXJMZXZlbCB9IGZyb20gJy4vRnVzZUxvZ2dlckxldmVsJztcblxuLyoqXG4gKiBBIHNlcmlhbGl6ZXIgZm9yIGxvZ2dpbmcuIFRoaXMgaXMgZGlmZmVyZW50IHRoYW4gYSB7QGxpbmsgRnVzZVNlcmlhbGl6ZXJ9IGluXG4gKiB0aGF0IGluIHNlcmlhbGl6ZXIgdHJhbnNmb3JtcyBvYmplY3RzIGludG8gYSBwcmludGFibGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZUxvZ2dlclNlcmlhbGl6ZXIge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZVRvU3RyaW5nKG9iajogVFNlcmlhbGl6YWJsZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgdHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVQcmltaXRpdmVUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVEYXRlVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9pc0lTZXJpYWxpemFibGUob2JqKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVRvU3RyaW5nKG9iai5zZXJpYWxpemUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVFcnJvclRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXaGVuIGFsbCBlbHNlIGZhaWxzLCBhdHRlbXB0IHRvIEpTT04gc3RyaW5naWZ5XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIG51bGwsIDQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2VyaWFsaXplUHJpbWl0aXZlVG9TdHJpbmcob2JqOiBudW1iZXIgfCBzdHJpbmcgfCBib29sZWFuKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIG9iai50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2VyaWFsaXplRXJyb3JUb1N0cmluZyhvYmo6IEVycm9yKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZEVycm9yID0ge1xuICAgICAgICAgICAgbmFtZTogb2JqLm5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBvYmoubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YWNrOiBvYmouc3RhY2tcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc2VyaWFsaXplZEVycm9yLCBudWxsLCA0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZURhdGVUb1N0cmluZyhvYmo6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gb2JqLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBTZXJpYWxpemVzIGFuIG9iamVjdCBpbnRvIGEgcHJpbnRhYmxlIHN0cmluZy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gb2JqIC0gVGhlIG9iamVjdCB0byBzZXJpYWxpemVcbiAgICAgKiBAcmV0dXJucyBBIHByaW50YWJsZSBzdHJpbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VyaWFsaXplKG9iajogVFNlcmlhbGl6YWJsZSk6IHN0cmluZyB7XG4gICAgICAgIGlmIChvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG91dDogc3RyaW5nID0gbnVsbDtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgIG91dCA9IGBbQmxvYiAke29iai50eXBlIHx8ICdCaW5hcnknfSAoJHtvYmouc2l6ZX0gYnl0ZXMpXWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIG91dCA9IHRoaXMuX3NlcmlhbGl6ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIG91dCA9IGBbQXJyYXlCdWZmZXIgKCR7b2JqLmJ5dGVMZW5ndGh9IGJ5dGVzKV1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzSVNlcmlhbGl6YWJsZShvYmopKSB7XG4gICAgICAgICAgICBvdXQgPSB0aGlzLnNlcmlhbGl6ZShvYmouc2VyaWFsaXplKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGVpdGhlciBKU09OIG9iamVjdHMgb3IganNvbiBhcnJheXMgYXQgdGhpcyBwb2ludFxuICAgICAgICAgICAgb3V0ID0gdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBwcm90ZWN0ZWQgX2lzSVNlcmlhbGl6YWJsZSh4OiBhbnkpOiB4IGlzIElTZXJpYWxpemFibGUge1xuICAgICAgICByZXR1cm4gISF4LnNlcmlhbGl6ZSAmJiB0eXBlb2YgeC5zZXJpYWxpemUgPT09ICdmdW5jdGlvbic7XG4gICAgfVxufVxuXG4vKipcbiAqIEEgYmFzZSBsb2dnZXIgaW1wbGVtZW50YXRpb24gd2hpY2ggaW5jbHVkZXMgYSBzZXJpYWxpemVyIGZvciBjb21tb24gdHlwZXMuXG4gKiBJdCB3aWxsIHNlcmlhbGl6ZS9hY2NlcHQgYWxsIHZhbHVlcyB0aGF0IFRTZXJpYWxpemFibGUgYWNjZXB0cywgaG93ZXZlciBCbG9iL0FycmF5QnVmZmVyXG4gKiBvciBvdGhlciBiaW5hcnkgZGF0YSB0eXBlcyB3aWxsIG5vdCBiZSBzZXJpYWxpemVkLiBJbnN0ZWFkIGl0IHdpbGwgcHJpbnQgYW5cbiAqIG9iamVjdCBpZGVudGlmaWVyLCB3aXRoIG1pbWUgdHlwZSBpZiBwcmVzZW50LCBhbG9uZyB3aXRoIHRoZSBzaXplIG9mIHRoZSBidWZmZXIuXG4gKiBcbiAqIFRoZSBiYXNlIGxvZ2dlciBkb2VzIG5vdCBwcm92aWRlIGFueSBuYXRpdmUgYnJpZGdpbmcuIFdoaWxlIHVzYWJsZSBmb3IgcHVyZWx5IHdlYnZpZXcgc2lkZSxcbiAqIHVzZSB0aGUgRnVzZUxvZ2dlckZhY3RvcnkgdG8gZ2V0IGEgbG9nZ2VyIHNwZWNpZmljIGZvciB5b3VyIHJ1bnRpbWUgZW52aXJvbm1lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlTG9nZ2VyIGltcGxlbWVudHMgSUZ1c2VMb2dnZXIge1xuICAgIHByaXZhdGUgJGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWw7XG4gICAgcHJpdmF0ZSAkZW5hYmxlTmF0aXZlQnJpZGdlOiBib29sZWFuO1xuICAgIHByaXZhdGUgJHNlcmlhbGl6ZXI6IEZ1c2VMb2dnZXJTZXJpYWxpemVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLiRlbmFibGVOYXRpdmVCcmlkZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLiRsZXZlbCA9IEZ1c2VMb2dnZXJMZXZlbC5JTkZPIHwgRnVzZUxvZ2dlckxldmVsLldBUk4gfCBGdXNlTG9nZ2VyTGV2ZWwuRVJST1I7XG4gICAgICAgIHRoaXMuJHNlcmlhbGl6ZXIgPSBuZXcgRnVzZUxvZ2dlclNlcmlhbGl6ZXIoKTtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJOYXRpdmVDYWxibGFjaygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfcmVnaXN0ZXJOYXRpdmVDYWxibGFjaygpOiB2b2lkIHt9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbGV2ZWwgLSBBIGJpdG1hc2sgb3B0aW9uIHRvIGluZGljYXRlIHdoaWNoIGxldmVscyB0byBsb2cuXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBUbyByZXBvcnQgb24gV0FSTiBhbmQgRVJST1Igb25seSwgeW91IHdvdWxkIHNldDpcbiAgICAgKiBcbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbG9nZ2VyLnNldExldmVsKEZ1c2VMb2dnZXJMZXZlbC5XQVJOIHwgRnVzZUxvZ2dlckxldmVsLkVSUk9SKTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0TGV2ZWwobGV2ZWw6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLiRsZXZlbCA9IGxldmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIFRoZSBjdXJyZW50IGxvZyBsZXZlbCBiaXRtYXNrLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRMZXZlbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kbGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBJZiBlbmFibGVkLCBUaGUgbmF0aXZlIEZ1c2VMb2dnZXIgd2lsbCBwYXNzIG5hdGl2ZSBsb2cgbWVzc2FnZXMgdG9cbiAgICAgKiB0aGUgd2VidmlldyBhbmQgd2lsbCBiZSBsb2dnZWQgaW50byB0aGUgSlMgY29uc29sZS4gTG9ncyBwYXNzZWQgdGhyb3VnaFxuICAgICAqIHRoaXMgbG9nZ2VyIHdpbGwgYWxzbyBiZSBwYXNzZWQgdG8gdGhlIG5hdGl2ZSBlbnZpcm9ubWVudCBhbmQgd2lsbCBiZVxuICAgICAqIGxvZ2dlZCBpbiB0aGUgbmF0aXZlJ3MgbG9nZ2luZyBjb25zb2xlLlxuICAgICAqIFxuICAgICAqIFRoaXMgY2FuIGJlIGhlbHBmdWwgaW4gZGVidWdnaW5nIHdoZXJlIGFsbCBsb2dzIHdpbGwgYmUgaW4gdGhlIHNhbWUgcGxhY2UsXG4gICAgICogaG93ZXZlciwgbG9nZ2luZyBjYW4gYmUgdmVyYm9zZSBhbmQgY2FuIGNhdXNlIGEgZGVncmF0aW9uIG9mIHBlcmZvcm1hbmNlLFxuICAgICAqIHRoZXJlZm9yZSBpdCBtYXkgbm90IGJlIGRlc2lyYWJsZSB0byBoYXZlIGVuYWJsZWQgZm9yIHByb2R1Y3Rpb24gYnVpbGRzLlxuICAgICAqIFxuICAgICAqIFRoaXMgZmVhdHVyZSBpcyBjdXJyZW50bHkgZW5hYmxlZCBieSBkZWZhdWx0LCBob3dldmVyIHRoaXMgaXMgc3ViamVjdCB0b1xuICAgICAqIGNoYW5nZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZmxhZyAtIGVuYWJsZXMgdGhlIG5hdGl2ZSBicmlkZ2UgbG9nZ2luZyBpZiBlbmFibGVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBlbmFibGVOYXRpdmVCcmlkZ2UoZmxhZzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLiRlbmFibGVOYXRpdmVCcmlkZ2UgPSAhIWZsYWc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vbk5hdGl2ZUxvZ0VudHJ5KGVudHJ5OiBJTmF0aXZlTG9nRW50cnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy5nZXRMZXZlbCgpICYgZW50cnkubGV2ZWwpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkubGV2ZWwgPT09IEZ1c2VMb2dnZXJMZXZlbC5TSUxFTlQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZW50cnkubGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgRnVzZUxvZ2dlckxldmVsLkRFQlVHOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoZW50cnkubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZ1c2VMb2dnZXJMZXZlbC5JTkZPOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhlbnRyeS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRnVzZUxvZ2dlckxldmVsLldBUk46XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVudHJ5Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBGdXNlTG9nZ2VyTGV2ZWwuRVJST1I6XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlbnRyeS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEB2aXJ0dWFsIC0gSW1wbGVtZW50YXRvcnMgdXNlIHRoaXMgbWV0aG9kIHRvIGNhbGwgb24gdGhlIG5hdGl2ZSBsb2dnaW5nIEFQSS5cbiAgICAgKiBAcGFyYW0gbGV2ZWwgLSBUaGUgbG9nIGxldmVsIGZvciB0aGlzIGxvZyBwcmludFxuICAgICAqIEBwYXJhbSBtZXNzYWdlIC0gT3ZlcnJpZGFibGUgaG9vayB0byBzZW5kIGxvZ3MgdG8gdGhlIG5hdGl2ZSBlbnZpcm9ubWVudFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfbG9nVG9OYXRpdmUobGV2ZWw6IEZ1c2VMb2dnZXJMZXZlbCwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7fVxuXG4gICAgcHJpdmF0ZSAkbG9nVG9OYXRpdmUobGV2ZWw6IEZ1c2VMb2dnZXJMZXZlbCwgYXJnczogVFNlcmlhbGl6YWJsZVtdKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy4kZW5hYmxlTmF0aXZlQnJpZGdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZXJpYWxpemVkQXJnczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2VyaWFsaXplZEFyZ3MucHVzaCh0aGlzLiRzZXJpYWxpemVyLnNlcmlhbGl6ZShhcmdzW2ldKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb2dUb05hdGl2ZShsZXZlbCwgc2VyaWFsaXplZEFyZ3Muam9pbignXFx0JykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmdzIC0gdmFyaWFkaWMgYXJndW1lbnRzIG9mIHNlcmlhbGl6YWJsZSBvYmplY3RzIHRvIGxvZyB0byB0aGUgY29uc29sZVxuICAgICAqL1xuICAgIHB1YmxpYyBkZWJ1ZyguLi5hcmdzOiBUU2VyaWFsaXphYmxlW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy4kbGV2ZWwgJiBGdXNlTG9nZ2VyTGV2ZWwuREVCVUcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmRlYnVnKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLiRsb2dUb05hdGl2ZShGdXNlTG9nZ2VyTGV2ZWwuREVCVUcsIGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmdzIC0gdmFyaWFkaWMgYXJndW1lbnRzIG9mIHNlcmlhbGl6YWJsZSBvYmplY3RzIHRvIGxvZyB0byB0aGUgY29uc29sZVxuICAgICAqL1xuICAgIHB1YmxpYyBpbmZvKC4uLmFyZ3M6IFRTZXJpYWxpemFibGVbXSk6IHZvaWQge1xuICAgICAgICBpZiAoISh0aGlzLiRsZXZlbCAmIEZ1c2VMb2dnZXJMZXZlbC5JTkZPKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5pbmZvKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLiRsb2dUb05hdGl2ZShGdXNlTG9nZ2VyTGV2ZWwuSU5GTywgYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZ3MgLSB2YXJpYWRpYyBhcmd1bWVudHMgb2Ygc2VyaWFsaXphYmxlIG9iamVjdHMgdG8gbG9nIHRvIHRoZSBjb25zb2xlXG4gICAgICovXG4gICAgcHVibGljIHdhcm4oLi4uYXJnczogVFNlcmlhbGl6YWJsZVtdKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuJGxldmVsICYgRnVzZUxvZ2dlckxldmVsLldBUk4pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLndhcm4oLi4uYXJncyk7XG4gICAgICAgIHRoaXMuJGxvZ1RvTmF0aXZlKEZ1c2VMb2dnZXJMZXZlbC5XQVJOLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJncyAtIHZhcmlhZGljIGFyZ3VtZW50cyBvZiBzZXJpYWxpemFibGUgb2JqZWN0cyB0byBsb2cgdG8gdGhlIGNvbnNvbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZXJyb3IoLi4uYXJnczogVFNlcmlhbGl6YWJsZVtdKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuJGxldmVsICYgRnVzZUxvZ2dlckxldmVsLkVSUk9SKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5lcnJvciguLi5hcmdzKTtcbiAgICAgICAgdGhpcy4kbG9nVG9OYXRpdmUoRnVzZUxvZ2dlckxldmVsLkVSUk9SLCBhcmdzKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IEZ1c2VMb2dnZXIgfSBmcm9tIFwiLi9GdXNlTG9nZ2VyXCI7XG5pbXBvcnQgeyBJRnVzZUxvZ2dlciB9IGZyb20gXCIuL0lGdXNlTG9nZ2VyXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gXCIuL1BsYXRmb3JtXCI7XG5pbXBvcnQge0lPU0Z1c2VMb2dnZXJ9IGZyb20gJy4vaW9zL0lPU0Z1c2VMb2dnZXInO1xuaW1wb3J0IHtBbmRyb2lkRnVzZUxvZ2dlcn0gZnJvbSAnLi9hbmRyb2lkL0FuZHJvaWRGdXNlTG9nZ2VyJztcblxuLyoqXG4gKiBBIGRlZmF1bHQgbG9nZ2VyIGZhY3RvcnkgZm9yIGNyZWF0aW5nIGxvZ2dlcnMgZm9yIHRoZSBnaXZlbiBwbGF0Zm9ybS5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VMb2dnZXJGYWN0b3J5IHtcbiAgICBwcml2YXRlICRwbGF0Zm9ybTogUGxhdGZvcm07XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gcGxhdGZvcm0gLSBUaGUgY3VycmVudCBQbGF0Zm9ybSBpbiB0aGlzIHJ1bnRpbWUgZW52aXJvbm1lbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gICAgICAgIHRoaXMuJHBsYXRmb3JtID0gcGxhdGZvcm07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIEZ1c2VMb2dnZXIgZm9yIHRoZSBjdXJyZW50IFBsYXRmb3JtLlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIEEgbG9nZ2VyIGluc3RhbmNlICAgXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZSgpOiBJRnVzZUxvZ2dlciB7XG4gICAgICAgIHN3aXRjaCAodGhpcy4kcGxhdGZvcm0pIHtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uSU9TOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSU9TRnVzZUxvZ2dlcigpO1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5BTkRST0lEOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQW5kcm9pZEZ1c2VMb2dnZXIoKTtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uVEVTVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZ1c2VMb2dnZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLyoqXG4gKiBBIGJpdG1hc2sgb3B0aW9uIG9mIGxvZ2dlciBsZXZlbHNcbiAqL1xuZXhwb3J0IGVudW0gRnVzZUxvZ2dlckxldmVsIHtcbiAgICBTSUxFTlQgID0gMCxcbiAgICBERUJVRyAgID0gMSxcbiAgICBJTkZPICAgID0gMixcbiAgICBXQVJOICAgID0gNCxcbiAgICBFUlJPUiAgID0gOFxufVxuIiwiXG5cbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7SUZ1c2VHcmFudFJlc3VsdH0gZnJvbSAnLi9JRnVzZUdyYW50UmVzdWx0JztcbmltcG9ydCB7RnVzZVBlcm1pc3Npb25TdGF0ZX0gZnJvbSAnLi9GdXNlUGVybWlzc2lvblN0YXRlJztcblxuZXhwb3J0IGNsYXNzIEZ1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQ8VFN1cHBvcnRlZFBlcm1pc3Npb24gZXh0ZW5kcyBudW1iZXIgPSBudW1iZXI+IHtcbiAgICBwcml2YXRlICRyZXN1bHRzOiBJRnVzZUdyYW50UmVzdWx0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihyZXN1bHRzOiBJRnVzZUdyYW50UmVzdWx0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPikge1xuICAgICAgICB0aGlzLiRyZXN1bHRzID0gcmVzdWx0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNHcmFudGVkKHBlcm1pc3Npb246IFRTdXBwb3J0ZWRQZXJtaXNzaW9uKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRyZXN1bHRzW3Blcm1pc3Npb25dID09PSBGdXNlUGVybWlzc2lvblN0YXRlLkdSQU5URUQ7XG4gICAgfVxuXG4gICAgcHVibGljIGlzQWxsR3JhbnRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMuJHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiRyZXN1bHRzW2ldICE9PSBGdXNlUGVybWlzc2lvblN0YXRlLkdSQU5URUQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVqZWN0SnVzdGlmaWNhdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLiRyZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4kcmVzdWx0c1tpXSA9PT0gRnVzZVBlcm1pc3Npb25TdGF0ZS5SRVFVSVJFU19KVVNUSUZJQ0FUSU9OKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcmVzdWx0c1tpXSA9IEZ1c2VQZXJtaXNzaW9uU3RhdGUuREVOSUVEO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3VsZEp1c3RpZnkoKTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLiRyZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4kcmVzdWx0c1tpXSA9PT0gRnVzZVBlcm1pc3Npb25TdGF0ZS5SRVFVSVJFU19KVVNUSUZJQ0FUSU9OKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBDb250ZW50VHlwZSB9IGZyb20gJy4vQ29udGVudFR5cGUnO1xuaW1wb3J0IHsgRnVzZUFQSVJlc3BvbnNlIH0gZnJvbSAnLi9GdXNlQVBJUmVzcG9uc2UnO1xuaW1wb3J0IHsgRnVzZUVycm9yIH0gZnJvbSAnLi9GdXNlRXJyb3InO1xuaW1wb3J0IHtUQVBJQnJpZGdlRnVuY3Rpb259IGZyb20gJy4vRnVzZVBsdWdpbic7XG5pbXBvcnQge0lGdXNlUGVybWlzc2lvblJlcXVlc3R9IGZyb20gJy4vSUZ1c2VQZXJtaXNzaW9uUmVxdWVzdCc7XG5pbXBvcnQgeyBURnVzZVNlcmlhbGl6YWJsZSB9IGZyb20gJy4vVFNlcmlhbGl6YWJsZSc7XG5pbXBvcnQge0Z1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHR9IGZyb20gJy4vRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdCc7XG5cbi8qKlxuICogSW52b2tlZCB0byBoYW5kbGUgd2hlbiBwZXJtaXNzaW9uIGp1c3RpZmljYXRpb24gaXMgbmVjZXNzYXJ5LlxuICogXG4gKiBUaGlzIGlzIGFuIGFuZHJvaWQgY29uY2VwdCwgc28gaXQgd2lsbCBvbmx5IGJlIGludm9rZWQgb24gQW5kcm9pZCBkZXZpY2VzLFxuICogYXMgaU9TIGhhcyBqdXN0aWZpY2F0aW9uIHRleHQgZW1iZWRkZWQgaW50byB0aGUgYWN0dWFsIHBlcm1pc3Npb24gcHJvbXB0LlxuICogXG4gKiBVc2VyIGRpYWxvZyBzaG91bGQgYmUgZGlzcGxheWVkIHRvIGV4cGxhaW4gd2h5IHRoZSBhcHAgd2FudHMgdG8gdXNlIHRoZSBwZXJtaXNzaW9uLlxuICogQW5kcm9pZCByZWNvbW1lbmRzIGdpdmluZyB0aGUgdXNlciB0aGUgYWJpbGl0eSB0byBhY2NlcHQgb3IgZGVueSBhdCB0aGlzIHRpbWUsIGlmIHRoZSB1c2VyIGRlbnksXG4gKiB0aGVuIHJlc29sdmUgdGhlIHByb21pc2Ugd2lsbCBmYWxzZS5cbiAqIFxuICogUmV0dXJuIHRydWUgaWYgdGhlIHBlcm1pc3Npb24gcmVxdWVzdCBzaG91bGQgcHJvY2VlZC5cbiAqL1xuZXhwb3J0IHR5cGUgVEZ1c2VKdXN0aWZpY2F0aW9uSGFuZGxlciA9ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG5cbmludGVyZmFjZSBfX0lQZXJtaXNzaW9uUmVxdWVzdEFyZ3VtZW50czxUIGV4dGVuZHMgbnVtYmVyPiB7XG4gICAgcGVybWlzc2lvblNldDogVFtdO1xuICAgIGlzSnVzdGlmaWVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBURnVzZVBlcm1pc3Npb25SZXF1ZXN0QXJndW1lbnRzPFQgZXh0ZW5kcyBudW1iZXI+ID0gVEZ1c2VTZXJpYWxpemFibGU8X19JUGVybWlzc2lvblJlcXVlc3RBcmd1bWVudHM8VD4+O1xuXG5leHBvcnQgdHlwZSBURnVzZUFQSVBlcm1pc3Npb25SZXF1ZXN0PFQgZXh0ZW5kcyBudW1iZXIgPSBudW1iZXI+ID0gVEFQSUJyaWRnZUZ1bmN0aW9uPENvbnRlbnRUeXBlLkpTT04sIFRGdXNlUGVybWlzc2lvblJlcXVlc3RBcmd1bWVudHM8VD4+O1xuXG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgdG8gaGFuZGxlIHBlcm1pc3Npb24gcmVxdWVzdC5cbiAqIENvbmNyZXRlIGNsYXNzZXMgc2hvdWxkIGltcGxlbWVudCB0aGUgcHJvdGVjdGVkIF9yZXF1ZXN0IG1ldGhvZCB0byBjYWxsIG9uIHRoZWlyXG4gKiBwZXJtaXNzaW9uIHJlcXVlc3QgRnVzZSBBUEkuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlUGVybWlzc2lvblJlcXVlc3Q8VFN1cHBvcnRlZFBlcm1pc3Npb24gZXh0ZW5kcyBudW1iZXI+IGltcGxlbWVudHMgSUZ1c2VQZXJtaXNzaW9uUmVxdWVzdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4ge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRBRzogc3RyaW5nID0gJ1Blcm1pc3Npb25SZXF1ZXN0JztcblxuICAgIHByaXZhdGUgJGFwaTogVEZ1c2VBUElQZXJtaXNzaW9uUmVxdWVzdDxUU3VwcG9ydGVkUGVybWlzc2lvbj47XG4gICAgcHJpdmF0ZSAkcGVybWlzc2lvblNldDogVFN1cHBvcnRlZFBlcm1pc3Npb25bXTtcbiAgICBwcml2YXRlICRqdXN0aWZpY2F0aW9uSGFuZGxlcjogVEZ1c2VKdXN0aWZpY2F0aW9uSGFuZGxlciB8IG51bGw7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYXBpQnJpZGdlOiBURnVzZUFQSVBlcm1pc3Npb25SZXF1ZXN0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPiwgcGVybWlzc2lvblNldDogVFN1cHBvcnRlZFBlcm1pc3Npb25bXSwganVzdGlmaWNhdGlvbkhhbmRsZXI6IFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIgPSBudWxsKSB7XG4gICAgICAgIGlmICghcGVybWlzc2lvblNldCB8fCAocGVybWlzc2lvblNldCAmJiBwZXJtaXNzaW9uU2V0Lmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBGdXNlRXJyb3IoRnVzZVBlcm1pc3Npb25SZXF1ZXN0LlRBRywgJ0F0IGxlYXN0IG9uZSBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRhcGkgPSBhcGlCcmlkZ2U7XG4gICAgICAgIHRoaXMuJHBlcm1pc3Npb25TZXQgPSBwZXJtaXNzaW9uU2V0O1xuICAgICAgICB0aGlzLiRqdXN0aWZpY2F0aW9uSGFuZGxlciA9IGp1c3RpZmljYXRpb25IYW5kbGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQZXJtaXNzaW9uU2V0KCk6IFRTdXBwb3J0ZWRQZXJtaXNzaW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcGVybWlzc2lvblNldDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jICRyZXF1ZXN0KGlzSnVzdGlmaWVkOiBib29sZWFuKTogUHJvbWlzZTxGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPj4ge1xuICAgICAgICBjb25zdCByZXNwb25zZTogRnVzZUFQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy4kYXBpKENvbnRlbnRUeXBlLkpTT04sIHtcbiAgICAgICAgICAgIHBlcm1pc3Npb25TZXQ6IHRoaXMuZ2V0UGVybWlzc2lvblNldCgpLFxuICAgICAgICAgICAgaXNKdXN0aWZpZWQ6IGlzSnVzdGlmaWVkXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNwb25zZS5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgIHRocm93IGF3YWl0IHJlc3BvbnNlLnJlYWRBc0Vycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IEZ1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQoYXdhaXQgcmVzcG9uc2UucmVhZEFzSlNPTigpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jICRvbkp1c3RpZmljYXRpb25SZXF1ZXN0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAoIXRoaXMuJGp1c3RpZmljYXRpb25IYW5kbGVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1Blcm1pc3Npb24gcmVxdWlyZXMganVzdGlmaWNhdGlvbiwgYnV0IHRoaXMgcmVxdWVzdCBoYXMgbm8gVEp1c3RpZmljYXRpb25IYW5kbGVyJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy4kanVzdGlmaWNhdGlvbkhhbmRsZXIoKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGFzeW5jIHJlcXVlc3QoKTogUHJvbWlzZTxGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPj4ge1xuICAgICAgICBsZXQgcmVzdWx0czogRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4gPSBhd2FpdCB0aGlzLiRyZXF1ZXN0KGZhbHNlKTtcblxuICAgICAgICBpZiAocmVzdWx0cy5zaG91bGRKdXN0aWZ5KCkpIHtcbiAgICAgICAgICAgIGlmIChhd2FpdCB0aGlzLiRvbkp1c3RpZmljYXRpb25SZXF1ZXN0KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gYXdhaXQgdGhpcy4kcmVxdWVzdCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucmVqZWN0SnVzdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLyoqXG4gKiBBIHNldCBvZiBjb25zdGFudHMgcmVwcmVzZW50aW5nIHBlcm1pc3Npb24gc3RhdGVzLlxuICovXG5leHBvcnQgZW51bSBGdXNlUGVybWlzc2lvblN0YXRlIHtcbiAgICBHUkFOVEVELFxuICAgIFJFUVVJUkVTX0pVU1RJRklDQVRJT04sXG4gICAgREVOSUVEXG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IEFic3RyYWN0RnVzZUFQSUZhY3RvcnkgfSBmcm9tIFwiLi9BYnN0cmFjdEZ1c2VBUElGYWN0b3J5XCI7XG5pbXBvcnQgeyBGdXNlQVBJIH0gZnJvbSBcIi4vRnVzZUFQSVwiO1xuaW1wb3J0IHtURnVzZUFQSUNhbGxiYWNrSGFuZGxlcn0gZnJvbSAnLi9GdXNlQ2FsbGJhY2tNYW5hZ2VyJztcbmltcG9ydCB7IEZ1c2VDb250ZXh0IH0gZnJvbSBcIi4vRnVzZUNvbnRleHRcIjtcbmltcG9ydCB7RnVzZUFQSVJlc3BvbnNlfSBmcm9tICcuL0Z1c2VBUElSZXNwb25zZSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gXCIuL1BsYXRmb3JtXCI7XG5pbXBvcnQgeyBDb250ZW50VHlwZSB9IGZyb20gXCIuL0NvbnRlbnRUeXBlXCI7XG5pbXBvcnQgeyBUU2VyaWFsaXphYmxlIH0gZnJvbSBcIi4vVFNlcmlhbGl6YWJsZVwiO1xuaW1wb3J0IHsgRnVzZVNlcmlhbGl6ZXIgfSBmcm9tIFwiLi9GdXNlU2VyaWFsaXplclwiO1xuXG5leHBvcnQgdHlwZSBUQVBJQnJpZGdlRnVuY3Rpb248VENvbnRlbnRUeXBlIGV4dGVuZHMgQ29udGVudFR5cGUgPSBDb250ZW50VHlwZSwgVERhdGEgZXh0ZW5kcyBUU2VyaWFsaXphYmxlID0gVFNlcmlhbGl6YWJsZT4gPSAodHlwZT86IFRDb250ZW50VHlwZSwgZGF0YT86IFREYXRhKSA9PiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT47XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgRnVzZSBQbHVnaW5zXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGdXNlUGx1Z2luPFRBUElPcHRzID0gdW5rbm93bj4ge1xuICAgIHByaXZhdGUgJGNvbnRleHQ6IEZ1c2VDb250ZXh0O1xuICAgIHByaXZhdGUgJGFwaUZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnk7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29udGV4dDogRnVzZUNvbnRleHQpIHtcbiAgICAgICAgdGhpcy4kY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuJGFwaUZhY3RvcnkgPSB0aGlzLl9jcmVhdGVBUElGYWN0b3J5KCkgfHwgY29udGV4dC5nZXREZWZhdWx0QVBJRmFjdG9yeSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIEFQSSBicmlkZ2VcbiAgICAgKiBAcGFyYW0gcGxhdGZvcm0gLSBUaGUgcnVudGltZSBwbGF0Zm9ybVxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfY3JlYXRlQVBJKHBsYXRmb3JtOiBQbGF0Zm9ybSk6IEZ1c2VBUEkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QVBJRmFjdG9yeSgpLmNyZWF0ZShwbGF0Zm9ybSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIFxuICAgICAqIENyZWF0ZSBhIGNvbmNyZXRlIHtAbGluayBGdXNlQVBJfSBmYWN0b3J5IGNhcGFibGUgb2YgY3JlYXRpbmcgRnVzZUFQSVxuICAgICAqIGluc3RhbmNlIGZvciB0aGUgY3VycmVudCBydW50aW1lLlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIEEgY29uY3JldGUge0BsaW5rIEZ1c2VBUEl9IEZhY3RvcnlcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZUFQSUZhY3RvcnkoKTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIFRoZSBjb25jcmV0ZSBBUEkgZmFjdG9yeVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfZ2V0QVBJRmFjdG9yeSgpOiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGFwaUZhY3Rvcnk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVEFQSU9wdHMgaXMgYSBwbHVnaW4gZ2VuZXJpYyB0eXBlIGRlY2xhcmluZyBvcHRpb25zLlxuICAgICAqIFVzZXIgbWF5IHVzZSB0aGlzIHRvIGRlY2xhcmUgYSBwYXRoIG9uIGhvdyB0byBnZXQgYSBwYXJ0aWN1bGFyIEZ1c2VBUEkuXG4gICAgICogXG4gICAgICogVGhpcyBBUEkgbWF5IGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3NlcyB0byB1dGlsaXNlIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGlzIHRvIHNpbXBseSByZXR1cm4gYSBzdGFuZGFyZCBGdXNlQVBJLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBvcHRzIC0gQVBJIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2dldEFQSShvcHRzPzogVEFQSU9wdHMpOiBGdXNlQVBJIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGdldEFQSSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdGFuZGFyZCBGdXNlQVBJXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHJpdmF0ZSAkZ2V0QVBJKCk6IEZ1c2VBUEkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QVBJRmFjdG9yeSgpLmNyZWF0ZSh0aGlzLmdldENvbnRleHQoKS5nZXRQbGF0Zm9ybSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY2FsbGJhY2sgY29udGV4dCB0aGF0IGNhbiBiZSBwYXNzZWQgdG8gbmF0aXZlXG4gICAgICogVGhlIG5hdGl2ZSBjb2RlIGNhbiB1c2UgdGhlIGNhbGxiYWNrSUQgdG8gY2FsbGJhY2sgdG8gdGhlIEpTIGNvZGUuXG4gICAgICogXG4gICAgICogVGhlIGNhbGxiYWNrIGNhbiBiZSB1c2VkIHNldmVyYWwgdGltZXMuXG4gICAgICogXG4gICAgICogUmVsZWFzZSB0aGUgY2FsbGJhY2sgdXNpbmcgX3JlbGVhc2VDYWxsYmFjayB3aXRoIHRoZSBnaXZlbiBjYWxsYmFja0lELlxuICAgICAqIFRoZXNlIEFQSSB1c2FnZXMgc2hvdWxkIGJlIHBhcnQgb2YgeW91ciBwbHVnaW4gQVBJLiBXaGVuIHJlbGVhc2luZyBhIGNhbGxiYWNrLFxuICAgICAqIGEgc3RhbmRhcmQgQVBJIGNhbGwgc2hvdWxkIGJlIG1hZGUgdG8geW91ciBwbHVnaW4gdG8gdGVsbCB0aGUgbmF0aXZlIHNpZGUgdGhhdFxuICAgICAqIHRoZSBjYWxsYmFjayBpcyBubyBsb25nZXIgdXNhYmxlLCBhbmQgaXQgc2hvdWxkIGNsZWFuIHVwIHRoZSBuYXRpdmUgcmVzb3VyY2VzIHN1cnJvdW5kaW5nXG4gICAgICogdGhlIGNhbGxiYWNrIGNvbnRleHQuXG4gICAgICogXG4gICAgICogTm90ZSB0aGF0IGNhbGxiYWNrIGRhdGEgcGF5bG9hZHMgb25seSBzdXBwb3J0cyBzdHJpbmdzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBjYiAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiBcbiAgICAgKiBAcmV0dXJucyBTdHJpbmcgLSBjYWxsYmFja0lEXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVDYWxsYmFjayhjYjogVEZ1c2VBUElDYWxsYmFja0hhbmRsZXIsIGFwaU9wdHM/OiBUQVBJT3B0cyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRBUEkoYXBpT3B0cykuY3JlYXRlQ2FsbGJhY2tDb250ZXh0KGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWxlYXNlcyBhIGNyZWF0ZWQgY2FsbGJhY2suXG4gICAgICogXG4gICAgICogQHBhcmFtIGlkIC0gY2FsbGJhY2tJRFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfcmVsZWFzZUNhbGxiYWNrKGlkOiBzdHJpbmcsIGFwaU9wdHM/OiBUQVBJT3B0cyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9nZXRBUEkoYXBpT3B0cykucmVsZWFzZUNhbGxiYWNrKGlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBGdXNlQ29udGV4dFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIFRoZSBjdXJyZW50IGNvbnRleHRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q29udGV4dCgpOiBGdXNlQ29udGV4dCB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjb250ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZW1hcmtzXG4gICAgICogXG4gICAgICogQ29uY3JldGUgY2xhc3NlcyBzaG91bGQgaW1wbGVtZW50IGFuZCByZXR1cm4gYSBzdHJpbmcgdGhhdCB1bmlxdWVseSByZXByZXNlbnRzIHRoaXMgcGx1Z2luLlxuICAgICAqIFRoZSBzdHJpbmcgbXVzdCBjb25mb3JtIHRvIFVSTCBmcmFnbWVudCBydWxlcy4gSXQgc2hhbGwgb25seSBjb250YWluIHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVyczpcbiAgICAgKiAgLSBBbHBoYWJldGljYWwgbGV0dGVyc1xuICAgICAqICAtIE51bWJlcnNcbiAgICAgKiAgLSBkb3RzIGFuZCBoeXBoZW5zXG4gICAgICogXG4gICAgICogQHZpcnR1YWxcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2dldElEKCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHBsdWdpbiBJRFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRJRCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0SUQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZXhlY3V0aW9uIEFQSS4gQ29uY3JldGUgY2xhc3NlcyBjYW4gY2FsbCB0aGlzIHRvIHBlcmZvcm0gY2FsbHMgdG8gdGhlIG5hdGl2ZSBzaWRlLlxuICAgICAqIFxuICAgICAqIFRoZSBjb25jcmV0ZSBjbGFzcyBzaG91bGQgZXhwb3NlIHB1YmxpYyBtZXRob2RzIHdpdGggdHlwZSBpbmZvcm1hdGlvbiBleHBvc2VkLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBtZXRob2QgLSBUaGUgbWV0aG9kIGxpbmssIHRoaXMgc2hvdWxkIG1hdGNoIHRoZSBlbmRwb2ludCBkZWZpbmVkIGluIHRoZSBuYXRpdmUgQVBJLlxuICAgICAqIEBwYXJhbSBjb250ZW50VHlwZSAtIHRoZSBNSU1FIHR5cGUgb2YgdGhlIGRhdGEgeW91IGFyZSBwYXNzaW5nIGluLlxuICAgICAqIEBwYXJhbSBkYXRhIC0gVGhlIGRhdGEgdG8gcGFzcyB0byB0aGUgbmF0aXZlIGVudmlyb25tZW50XG4gICAgICogQHJldHVybnMgVGhlIHJlc3BvbnNlIGJvZHkgZnJvbSBuYXRpdmUuIEZ1c2VSZXNwb25zZVJlYWRlciBoYXMgc29tZSB1dGlsaXR5IG1ldGhvZHMgdG8gcmVhZCB0aGUgZGF0YSBpbiBjb21tb24gZm9ybWF0cyAoZS5nLiB0ZXh0IG9yIEpTT04pXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFzeW5jIF9leGVjKG1ldGhvZDogc3RyaW5nLCBjb250ZW50VHlwZT86IHN0cmluZywgZGF0YT86IFRTZXJpYWxpemFibGUsIGFwaU9wdHM/OiBUQVBJT3B0cyk6IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9nZXRBUEkoYXBpT3B0cykuZXhlY3V0ZSh0aGlzLmdldElEKCksIG1ldGhvZCwgY29udGVudFR5cGUsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZW1hcmtzXG4gICAgICogVGhpcyBpcyB1c2VmdWwgd2hlbiB5b3Ugd2FudCB0byB1c2UgYW4gQVBJIGFzIGEgY2FsbGJhY2ssIHdpdGhvdXQgZXhwb3NpbmdcbiAgICAgKiB0aGUgcGx1Z2luIGltcGxlbWVudGF0aW9uLiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gaXMgYSBib3VuZGVkIGZ1bmN0aW9uLlxuICAgICAqIFdoZW4gaW52b2tlZCwgaXQgd2lsbCBjYWxsIG9uIHRoZSBBUEkgZW5kcG9pbnQgYW5kIHJldHVybnMgYSB7QGxpbmsgRnVzZUFQSVJlc3BvbnNlfVxuICAgICAqIGFzeW5jaHJvbm91c2x5LlxuICAgICAqIFxuICAgICAqIEBzZWFsZWRcbiAgICAgKiBAcGFyYW0gcm91dGUgLSBUaGUgQVBJIGVuZCBwb2ludFxuICAgICAqIEBwYXJhbSBzZXJpYWxpemVyIC0gVGhlIHNlcmlhbGl6ZXIgdG8gdXNlLiBEZWZhdWx0cyB0byB7QGxpbmsgRnVzZVNlcmlhbGl6ZXJ9IHdoaWNoIGlzIGEgc2Vuc2libGUgc2VyaWFsaXplci5cbiAgICAgKiBAcmV0dXJucyBBIGNvbnRleHQtYmluZGluZyBmdW5jdGlvbiB0aGF0IGNhbiBiZSBnaXZlbiB0byBhbm90aGVyIG9iamVjdC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZUFQSUJyaWRnZShyb3V0ZTogc3RyaW5nLCBzZXJpYWxpemVyPzogRnVzZVNlcmlhbGl6ZXIpOiBUQVBJQnJpZGdlRnVuY3Rpb24ge1xuICAgICAgICBpZiAoIXNlcmlhbGl6ZXIpIHtcbiAgICAgICAgICAgIHNlcmlhbGl6ZXIgPSBuZXcgRnVzZVNlcmlhbGl6ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc3luYyAodHlwZT86IENvbnRlbnRUeXBlLCBkYXRhPzogVFNlcmlhbGl6YWJsZSk6IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fZXhlYyhyb3V0ZSwgdHlwZSwgc2VyaWFsaXplci5zZXJpYWxpemUoZGF0YSkpO1xuICAgICAgICB9O1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLyoqXG4gKiBBIHN0YXRpYyBjbGFzcyB3aXRoIGNvbnZlbmllbmNlIG1ldGhvZHMgZm9yIHJlYWRpbmcgY29tbW9uXG4gKiByZXNwb25zZSBjb250ZW50IGJvZHkgZm9ybWF0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VSZXNwb25zZVJlYWRlciB7XG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICAvKipcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIFJlYWRzIHRoZSBkYXRhIGJ1ZmZlciBhcyBhIHN0cmluZ1xuICAgICAqIFxuICAgICAqIEBwYXJhbSBkYXRhIC0gaW5wdXQgZGF0YVxuICAgICAqIEByZXR1cm5zIFRoZSBidWZmZXIgY29udGVudHMgYXMgYSBzdHJpbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlYWRBc1RleHQoZGF0YTogQXJyYXlCdWZmZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZWFkZXI6IEZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKDxzdHJpbmc+cmVhZGVyLnJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQobmV3IEJsb2IoW2RhdGFdKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZW1hcmtzXG4gICAgICogUmVhZHMgdGhlIGdpdmVuIGRhdGEgYnVmZmVyIGFzIGEgSlNPTiBvYmplY3QuIFRoZSBKU09OIG9iamVjdFxuICAgICAqIGNhbiBiZSB0eXBlZCBhcyBUIGdlbmVyaWMuIE5vIHZhbGlkYXRpb25zIG9jY3VycyBvbiB3aGV0aGVyIHRoZSBnaXZlblxuICAgICAqIGRhdGEgaXMgYWN0dWFsbHkgYSB0eXBlIG9mIFQuXG4gICAgICogXG4gICAgICogQHRocm93cyB7QGxpbmsgU3ludGF4RXJyb3J9XG4gICAgICogSWYgZGF0YSBpcyBub3QgcGFyc2VhYmxlIGFzIEpTT04uXG4gICAgICogXG4gICAgICogQHBhcmFtIGRhdGEgLSBpbnB1dCBkYXRhXG4gICAgICogQHJldHVybnMgVGhlIGJ1ZmZlciBjb250ZW50cyBhcyBhIEpTT04gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcmVhZEFzSlNPTjxUPihkYXRhOiBBcnJheUJ1ZmZlcik6IFByb21pc2U8VD4ge1xuICAgICAgICBjb25zdCBzdHI6IHN0cmluZyA9IGF3YWl0IHRoaXMucmVhZEFzVGV4dChkYXRhKTtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IElTZXJpYWxpemFibGUgfSBmcm9tIFwiLi9JU2VyaWFsaXphYmxlXCI7XG5pbXBvcnQgeyBUU2VyaWFsaXphYmxlIH0gZnJvbSBcIi4vVFNlcmlhbGl6YWJsZVwiO1xuXG4vKipcbiAqIEEgY2xhc3MgdG8gc2VyaWFsaXplIHNldmVyYWwgZGlmZmVyZW50IHR5cGVzIG9mIG9iamVjdHMgaW50byBhIGRhdGEgc3RydWN0dXJlXG4gKiB0aGF0IGNhbiBiZSByZWNvbnN0cnVjdGVkIGFjcm9zcyB0aGUgRnVzZSBBUEkgYnJpZGdlLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZVNlcmlhbGl6ZXIge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZVRvU3RyaW5nKG9iajogVFNlcmlhbGl6YWJsZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgdHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVQcmltaXRpdmVUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVEYXRlVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9pc0lTZXJpYWxpemFibGUob2JqKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVRvU3RyaW5nKG9iai5zZXJpYWxpemUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVFcnJvclRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXaGVuIGFsbCBlbHNlIGZhaWxzLCBhdHRlbXB0IHRvIEpTT04gc3RyaW5naWZ5XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2VyaWFsaXplUHJpbWl0aXZlVG9TdHJpbmcob2JqOiBudW1iZXIgfCBzdHJpbmcgfCBib29sZWFuKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIG9iai50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2VyaWFsaXplRXJyb3JUb1N0cmluZyhvYmo6IEVycm9yKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZEVycm9yID0ge1xuICAgICAgICAgICAgbmFtZTogb2JqLm5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBvYmoubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YWNrOiBvYmouc3RhY2tcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc2VyaWFsaXplZEVycm9yLCBudWxsLCA0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZURhdGVUb1N0cmluZyhvYmo6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gb2JqLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplcyB0aGUgZ2l2ZW4gb2JqZWN0IGludG8gYSBibG9iLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBvYmogLSBBIHN1cHBvcnRlZCBzZXJpYWxpemFibGUgb2JqZWN0LiBTZWUge0BsaW5rIFRTZXJpYWxpemFibGV9IGZvclxuICAgICAqIGEgbGlzdCBvZiBjdXJyZW50bHkgc3VwcG9ydGVkIHR5cGVzXG4gICAgICogQHJldHVybnMgQSBzZXJpYWxpemVkIGJsb2JcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VyaWFsaXplKG9iajogVFNlcmlhbGl6YWJsZSk6IEJsb2Ige1xuICAgICAgICBpZiAob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiaW46IEJsb2I7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICBiaW4gPSBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIGJpbiA9IG5ldyBCbG9iKFt0aGlzLl9zZXJpYWxpemVUb1N0cmluZyhvYmopXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIGJpbiA9IG5ldyBCbG9iKFtvYmpdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9pc0lTZXJpYWxpemFibGUob2JqKSkge1xuICAgICAgICAgICAgYmluID0gbmV3IEJsb2IoW3RoaXMuc2VyaWFsaXplKG9iai5zZXJpYWxpemUoKSldKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHNob3VsZCBiZSBlaXRoZXIgSlNPTiBvYmplY3RzIG9yIGpzb24gYXJyYXlzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgICAgIGJpbiA9IG5ldyBCbG9iKFt0aGlzLl9zZXJpYWxpemVUb1N0cmluZyhvYmopXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYmluO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcHJvdGVjdGVkIF9pc0lTZXJpYWxpemFibGUoeDogYW55KTogeCBpcyBJU2VyaWFsaXphYmxlIHtcbiAgICAgICAgcmV0dXJuICEheC5zZXJpYWxpemUgJiYgdHlwZW9mIHguc2VyaWFsaXplID09PSAnZnVuY3Rpb24nO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQ29udGVudFR5cGUgfSBmcm9tICcuL0NvbnRlbnRUeXBlJztcbmltcG9ydCB7RnVzZUFQSX0gZnJvbSAnLi9GdXNlQVBJJztcbmltcG9ydCB7IEZ1c2VBUElSZXNwb25zZSB9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmltcG9ydCB7RnVzZUVycm9yfSBmcm9tICcuL0Z1c2VFcnJvcic7XG5cbi8qKlxuICogQSBGdXNlIEFQSSBpbXBsZW1lbnRhdGlvbiB0aGF0IHVzZXMgSFRUUCBwcm90b2NvbCB0byBtYWtlIG5hdGl2ZSBjYWxsc1xuICovXG5leHBvcnQgY2xhc3MgSFRUUEZ1c2VBUEkgZXh0ZW5kcyBGdXNlQVBJIHtcbiAgICBcbiAgICBwcm90ZWN0ZWQgYXN5bmMgX2dldEVuZHBvaW50KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgX2luaXRIZWFkZXJzKHhocjogWE1MSHR0cFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHt9XG5cbiAgICBwdWJsaWMgYXN5bmMgYnVpbGRSb3V0ZShwbHVnaW5JRDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGVuZHBvaW50OiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9nZXRFbmRwb2ludCgpO1xuICAgICAgICByZXR1cm4gYCR7ZW5kcG9pbnR9JHt0aGlzLl9jcmVhdGVSb3V0ZShwbHVnaW5JRCwgbWV0aG9kKX1gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBhc3luYyBfZXhlY3V0ZShwbHVnaW5JRDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgY29udGVudFR5cGU6IHN0cmluZywgZGF0YTogQmxvYik6IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHhocjogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgIHhoci5vcGVuKCdQT1NUJywgYXdhaXQgdGhpcy5idWlsZFJvdXRlKHBsdWdpbklELCBtZXRob2QpKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlID0gQ29udGVudFR5cGUuQklOQVJZO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5faW5pdEhlYWRlcnMoeGhyKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2RvUmVxdWVzdCh4aHIsIGRhdGEpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZG9SZXF1ZXN0KHhocjogWE1MSHR0cFJlcXVlc3QsIGRhdGE6IEJsb2IpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB4aHIub25sb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBGdXNlQVBJUmVzcG9uc2UgPSBuZXcgRnVzZUFQSVJlc3BvbnNlKHhoci5yZXNwb25zZSwgeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLCB4aHIuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChhd2FpdCByZXNwb25zZS5yZWFkQXNFcnJvcigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEZ1c2VFcnJvcignRnVzZUFQSScsICdOZXR3b3JrIEVycm9yJykpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9udGltZW91dCA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBGdXNlRXJyb3IoJ0Z1c2VBUEknLCAnQVBJIFRpbWVvdXQnKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9kb1NlbmQoeGhyLCBkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9kb1NlbmQoeGhyOiBYTUxIdHRwUmVxdWVzdCwgZGF0YTogQmxvYik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkICYmIGRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHhoci5zZW5kKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLyoqXG4gKiBFbnVtZXJhdGlvbiBmb3Igc3VwcG9ydGVkIHBsYXRmb3Jtc1xuICovXG5leHBvcnQgZW51bSBQbGF0Zm9ybSB7XG4gICAgSU9TID0gMSxcbiAgICBBTkRST0lELFxuICAgIC8qKlxuICAgICAqIFNwZWNpYWxpemVkIHBsYXRmb3JtIHVzZWQgZm9yIHRlc3QgZW52aXJvbm1lbnRzLFxuICAgICAqIHdpbGwgbm90IGJlIHVzZWQgZm9yIHJlZ3VsYXIgcnVudGltZXMuXG4gICAgICovXG4gICAgVEVTVFxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gXCIuL1BsYXRmb3JtXCI7XG5cbi8qKlxuICogQSBzdHJhdGVneSB0byByZXNvbHZlIHRoZSBydW50aW1lJ3MgcGxhdGZvcm1cbiAqL1xuZXhwb3J0IGNsYXNzIFBsYXRmb3JtUmVzb2x2ZXIge1xuICAgIHB1YmxpYyByZXNvbHZlKCk6IFBsYXRmb3JtIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJT1NFbnZpcm9ubWVudCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gUGxhdGZvcm0uSU9TO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhlIG9ubHkgb3RoZXIgc3VwcG9ydGVkIHBsYXRmb3JtIGlzIEFuZHJvaWQsIHNvXG4gICAgICAgICAgICAvLyBpdCdzIGFzc3VtZWRcbiAgICAgICAgICAgIHJldHVybiBQbGF0Zm9ybS5BTkRST0lEO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzSU9TRW52aXJvbm1lbnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2J0ZnVzZTonO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0FuZHJvaWRFbnZpcm9ubWVudCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzSU9TRW52aXJvbm1lbnQoKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSB7QGxpbmsgaHR0cHM6Ly9zZW12ZXIub3JnL30gdmVyc2lvbmluZy5cbiAqL1xuZXhwb3J0IGNsYXNzIFZlcnNpb24ge1xuICAgIHByaXZhdGUgJG1ham9yOiBudW1iZXI7XG4gICAgcHJpdmF0ZSAkbWlub3I6IG51bWJlcjtcbiAgICBwcml2YXRlICRwYXRjaD86IG51bWJlcjtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTEVTU19USEFOOiBudW1iZXIgPSAtMTtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVRVUFMOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR1JFQVRFUl9USEFOOiBudW1iZXIgPSAxO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG1ham9yOiBudW1iZXIsIG1pbm9yPzogbnVtYmVyLCBwYXRjaD86IG51bWJlcikge1xuICAgICAgICB0aGlzLiRtYWpvciA9IG1ham9yO1xuICAgICAgICB0aGlzLiRtaW5vciA9IG1pbm9yIHx8IDA7XG4gICAgICAgIHRoaXMuJHBhdGNoID0gcGF0Y2ggfHwgMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIFBhcnNlcyBhIHNlbXZlci1mb3JtYXR0ZWQgdmVyc2lvbiBzdHJpbmcgYW5kIGNyZWF0ZXMgYSBWZXJzaW9uIG9iamVjdC5cbiAgICAgKiBEb2VzIG5vdCBzdXBwb3J0IHByZS1yZWxlYXNlIGxhYmVscywgd2hpY2ggd2lsbCBiZSBjaG9wcGVkIG9mZi5cbiAgICAgKiBJZiBhbnkgZG90IG5vdGF0aW9uIHNlZ21lbnQgaXMgbWlzc2luZyBvciBpcyBub3QgcGFyc2VhYmxlIGFzIGFuIGludGVnZXIsXG4gICAgICogaXQgd2lsbCBkZWZhdWx0IHRvIDAuXG4gICAgICogXG4gICAgICogQHBhcmFtIHZlcnNpb24gLSBTZW12ZXIgZm9ybWF0dGVkIHZlcnNpb24gc3RyaW5nXG4gICAgICogQHJldHVybnMgQSB2ZXJzaW9uIG9iamVjdFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcGFyc2VWZXJzaW9uU3RyaW5nKHZlcnNpb246IHN0cmluZyk6IFZlcnNpb24ge1xuICAgICAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSB2ZXJzaW9uLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgbGV0IG1ham9yOiBudW1iZXIgPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgIGxldCBtaW5vcjogbnVtYmVyID0gcGFyc2VJbnQocGFydHNbMV0pO1xuICAgICAgICBsZXQgcGF0Y2g6IG51bWJlciA9IHBhcnNlSW50KHBhcnRzWzJdKTtcblxuICAgICAgICBpZiAoaXNOYU4obWFqb3IpKSB7XG4gICAgICAgICAgICBtYWpvciA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4obWlub3IpKSB7XG4gICAgICAgICAgICBtaW5vciA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4ocGF0Y2gpKSB7XG4gICAgICAgICAgICBwYXRjaCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFZlcnNpb24obWFqb3IsIG1pbm9yLCBwYXRjaCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHNlYWxlZFxuICAgICAqIEByZXR1cm5zIFRoZSBtYWpvciBjb21wb25lbnQgb2YgdGhpcyB2ZXJzaW9uXG4gICAgICovXG4gICAgcHVibGljIGdldE1ham9yKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRtYWpvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc2VhbGVkXG4gICAgICogQHJldHVybnMgVGhlIG1pbm9yIGNvbXBvbmVudCBvZiB0aGlzIHZlcnNpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0TWlub3IoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG1pbm9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBzZWFsZWRcbiAgICAgKiBAcmV0dXJucyBUaGUgcGF0Y2ggY29tcG9uZW50IG9mIHRoaXMgdmVyc2lvblxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQYXRjaCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kcGF0Y2g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHNlYWxlZFxuICAgICAqIEByZXR1cm5zIEEgc2VtdmVyLWZvcm1hdHRlZCBzdHJpbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuJG1ham9yfS4ke3RoaXMuJG1pbm9yfS4ke3RoaXMuJHBhdGNofWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHNlYWxlZFxuICAgICAqIEBwYXJhbSBiIC0gVGhlIHJpZ2h0IHNpZGUgdmVyc2lvblxuICAgICAqIEByZW1hcmtzXG4gICAgICogIFRoaXMgaXMgdGhlIGVxdWl2aWxhbnQgaW4gdXNpbmcgYFZlcnNpb24uY29tcGFyZSh0aGlzLCBiKWAuXG4gICAgICogIFNlZSB7QGxpbmsgY29wbWFyZX0gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29tcGFyZShiOiBWZXJzaW9uKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIFZlcnNpb24uY29tcGFyZSh0aGlzLCBiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIENvbXBhcmVzIHRoaXMgdmVyc2lvbiB3aXRoIGFub3RoZXIuIElmIGxlZnQgc2lkZSBpcyBncmVhdGVyIHRoYW4gcmlnaHQgc2lkZSxcbiAgICAgKiB7QGxpbmsgR1JFQVRFUl9USEFOfSBpcyByZXR1cm5lZC4gSWYgdGhleSBhcmUgZXF1YWwsIHtAbGluayBFUVVBTH0gaXMgcmV0dXJuZWQuXG4gICAgICogT3RoZXJ3aXNlLCB7QGxpbmsgTEVTU19USEFOfSBpcyByZXR1cm5lZC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbGhzIC0gVGhlIGxlZnQgc2lkZSB2ZXJzaW9uXG4gICAgICogQHBhcmFtIHJocyAtIFRoZSByaWdodCBzaWRlIHZlcnNpb25cbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvbXBhcmUobGhzOiBWZXJzaW9uLCByaHM6IFZlcnNpb24pOiBudW1iZXIge1xuICAgICAgICBpZiAobGhzLiRtYWpvciA9PT0gcmhzLiRtYWpvciAmJiBsaHMuJG1pbm9yID09PSByaHMuJG1pbm9yICYmIGxocy4kcGF0Y2ggPT09IHJocy4kcGF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBWZXJzaW9uLkVRVUFMO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxocy4kbWFqb3IgPT09IHJocy4kbWFqb3IpIHtcbiAgICAgICAgICAgIGlmIChsaHMuJG1pbm9yID09PSByaHMuJG1pbm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxocy4kcGF0Y2ggPT09IHJocy4kcGF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hvdWxkbid0IGhhdmUgcmVhY2hlZCBoZXJlLi4uIGFzIGl0IHNob3VsZCBoYXZlIGJlZW4gY2F1Z2h0IGJ5IHRoZSBzaW1wbGUgdGVzdCBhYm92ZSBmaXJzdFxuICAgICAgICAgICAgICAgICAgICAvLyBidXQgZm9yIGNvbnNpc3RlbmN5IHdlIHdpbGwga2VlcCBpdCBoZXJlLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVmVyc2lvbi5FUVVBTFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxocy4kcGF0Y2ggPiByaHMuJHBhdGNoID8gVmVyc2lvbi5HUkVBVEVSX1RIQU4gOiBWZXJzaW9uLkxFU1NfVEhBTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGhzLiRtaW5vciA+IHJocy4kbWlub3IgPyBWZXJzaW9uLkdSRUFURVJfVEhBTiA6IFZlcnNpb24uTEVTU19USEFOO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGxocy4kbWFqb3IgPiByaHMuJG1ham9yID8gVmVyc2lvbi5HUkVBVEVSX1RIQU4gOiBWZXJzaW9uLkxFU1NfVEhBTjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDI0IEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gJy4uL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnknO1xuaW1wb3J0IHsgRnVzZUNvbnRleHQgfSBmcm9tICcuLi9GdXNlQ29udGV4dCc7XG5pbXBvcnQgeyBJRnVzZUxvZ2dlciB9IGZyb20gJy4uL0lGdXNlTG9nZ2VyJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi4vUGxhdGZvcm0nO1xuXG5leHBvcnQgY2xhc3MgQW5kcm9pZEZ1c2VDb250ZXh0IGV4dGVuZHMgRnVzZUNvbnRleHQge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5LCBsb2dnZXI6IElGdXNlTG9nZ2VyLCkge1xuICAgICAgICBzdXBlcihQbGF0Zm9ybS5BTkRST0lELCBhcGlGYWN0b3J5LCBsb2dnZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBvbldlYnZpZXdSZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgd2luZG93LkJURnVzZU5hdGl2ZS5vbldlYnZpZXdSZWFkeSgpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgSU5hdGl2ZUxvZ0VudHJ5IH0gZnJvbSAnLi4vSUZ1c2VMb2dnZXInO1xuaW1wb3J0IHtGdXNlTG9nZ2VyfSBmcm9tICcuLi9GdXNlTG9nZ2VyJztcbmltcG9ydCB7RnVzZUxvZ2dlckxldmVsfSBmcm9tICcuLi9GdXNlTG9nZ2VyTGV2ZWwnO1xuaW1wb3J0IHsgRnVzZUNhbGxiYWNrTWFuYWdlciB9IGZyb20gJy4uL0Z1c2VDYWxsYmFja01hbmFnZXInO1xuXG5leHBvcnQgY2xhc3MgQW5kcm9pZEZ1c2VMb2dnZXIgZXh0ZW5kcyBGdXNlTG9nZ2VyIHtcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2xvZ1RvTmF0aXZlKGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWwsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB3aW5kb3cuQlRGdXNlTmF0aXZlLmxvZyhsZXZlbCwgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF9yZWdpc3Rlck5hdGl2ZUNhbGJsYWNrKCk6IHZvaWQge1xuICAgICAgICB3aW5kb3cuQlRGdXNlTmF0aXZlLnNldExvZ0NhbGxiYWNrKEZ1c2VDYWxsYmFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVDYWxsYmFjaygocGF5bG9hZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW50cnk6IElOYXRpdmVMb2dFbnRyeSA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGVudHJ5ID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fb25OYXRpdmVMb2dFbnRyeShlbnRyeSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7SFRUUEZ1c2VBUEl9IGZyb20gJy4uL0hUVFBGdXNlQVBJJztcblxuLyoqXG4gKiBBIEZ1c2UgQVBJIGltcGxlbWVudGF0aW9uIGZvciBhbiBlbWJlZGRlZCBIVFRQIHNlcnZlciB0byBicmlkZ2UgdGhlIEpTIGFuZCBOYXRpdmUgQVBJIGNhbGxzLlxuICovXG5leHBvcnQgY2xhc3MgQW5kcm9pZFNjaGVtZUZ1c2VBUEkgZXh0ZW5kcyBIVFRQRnVzZUFQSSB7XG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIF9nZXRFbmRwb2ludCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYGh0dHBzOi8vbG9jYWxob3N0OiR7d2luZG93LkJURnVzZU5hdGl2ZS5nZXRBUElQb3J0KCl9YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX2luaXRIZWFkZXJzKHhocjogWE1MSHR0cFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtRnVzZS1TZWNyZXQnLCB3aW5kb3cuQlRGdXNlTmF0aXZlLmdldEFQSVNlY3JldCgpKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8vIENvbW1vbiBBUElcbmV4cG9ydCB7UGxhdGZvcm19IGZyb20gJy4vUGxhdGZvcm0nO1xuZXhwb3J0IHtQbGF0Zm9ybVJlc29sdmVyfSBmcm9tICcuL1BsYXRmb3JtUmVzb2x2ZXInO1xuZXhwb3J0IHtGdXNlQ29udGV4dH0gZnJvbSAnLi9GdXNlQ29udGV4dCc7XG5leHBvcnQge0Z1c2VDb250ZXh0QnVpbGRlcn0gZnJvbSAnLi9GdXNlQ29udGV4dEJ1aWxkZXInO1xuZXhwb3J0IHtWZXJzaW9ufSBmcm9tICcuL1ZlcnNpb24nO1xuZXhwb3J0IHtcbiAgICBGdXNlQVBJLFxuICAgIFRGdXNlQVBJUmVzcG9uc2VEYXRhLFxuICAgIElGdXNlQVBJQ2FsbFBhY2tldFxufSBmcm9tICcuL0Z1c2VBUEknO1xuZXhwb3J0IHtGdXNlQ2FsbGJhY2tNYW5hZ2VyLCBURnVzZUFQSUNhbGxiYWNrSGFuZGxlcn0gZnJvbSAnLi9GdXNlQ2FsbGJhY2tNYW5hZ2VyJztcbmV4cG9ydCB7RnVzZUFQSVJlc3BvbnNlfSBmcm9tICcuL0Z1c2VBUElSZXNwb25zZSc7XG5leHBvcnQge0NvbnRlbnRUeXBlfSBmcm9tICcuL0NvbnRlbnRUeXBlJztcbmV4cG9ydCB7RnVzZVJlc3BvbnNlUmVhZGVyfSBmcm9tICcuL0Z1c2VSZXNwb25zZVJlYWRlcic7XG5leHBvcnQge0Z1c2VBUElGYWN0b3J5fSBmcm9tICcuL0Z1c2VBUElGYWN0b3J5JztcbmV4cG9ydCB7QWJzdHJhY3RGdXNlQVBJRmFjdG9yeX0gZnJvbSAnLi9BYnN0cmFjdEZ1c2VBUElGYWN0b3J5JztcbmV4cG9ydCB7XG4gICAgRnVzZVJ1bnRpbWUsXG4gICAgVFBhdXNlQ2FsbGJhY2tIYW5kbGVyLFxuICAgIFRSZXN1bWVDYWxsYmFja0hhbmRsZXIsXG4gICAgSVJ1bnRpbWVJbmZvXG59IGZyb20gJy4vcGx1Z2lucy9GdXNlUnVudGltZSc7XG5leHBvcnQge0Z1c2VQbHVnaW4sIFRBUElCcmlkZ2VGdW5jdGlvbn0gZnJvbSAnLi9GdXNlUGx1Z2luJztcbmV4cG9ydCB7SFRUUEZ1c2VBUEl9IGZyb20gJy4vSFRUUEZ1c2VBUEknO1xuZXhwb3J0IHtGdXNlRXJyb3J9IGZyb20gJy4vRnVzZUVycm9yJztcblxuLy8gVXRpbGl0aWVzXG5leHBvcnQge0lTZXJpYWxpemFibGV9IGZyb20gJy4vSVNlcmlhbGl6YWJsZSc7XG5leHBvcnQge1RTZXJpYWxpemFibGUsIFRGdXNlU2VyaWFsaXphYmxlfSBmcm9tICcuL1RTZXJpYWxpemFibGUnO1xuZXhwb3J0IHtGdXNlU2VyaWFsaXplcn0gZnJvbSAnLi9GdXNlU2VyaWFsaXplcic7XG5leHBvcnQge0lGdXNlUGVybWlzc2lvblJlcXVlc3R9IGZyb20gJy4vSUZ1c2VQZXJtaXNzaW9uUmVxdWVzdCc7XG5leHBvcnQge0Z1c2VQZXJtaXNzaW9uU3RhdGV9IGZyb20gJy4vRnVzZVBlcm1pc3Npb25TdGF0ZSc7XG5leHBvcnQge1xuICAgIEZ1c2VQZXJtaXNzaW9uUmVxdWVzdCxcbiAgICBURnVzZUFQSVBlcm1pc3Npb25SZXF1ZXN0LFxuICAgIFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIsXG4gICAgVEZ1c2VQZXJtaXNzaW9uUmVxdWVzdEFyZ3VtZW50c1xufSBmcm9tICcuL0Z1c2VQZXJtaXNzaW9uUmVxdWVzdCc7XG5leHBvcnQge0lGdXNlR3JhbnRSZXN1bHR9IGZyb20gJy4vSUZ1c2VHcmFudFJlc3VsdCc7XG5leHBvcnQge0Z1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHR9IGZyb20gJy4vRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdCc7XG5cbi8vIExvZ2dlclxuZXhwb3J0IHtGdXNlTG9nZ2VyTGV2ZWx9IGZyb20gJy4vRnVzZUxvZ2dlckxldmVsJztcbmV4cG9ydCB7SUZ1c2VMb2dnZXIsIElOYXRpdmVMb2dFbnRyeX0gZnJvbSAnLi9JRnVzZUxvZ2dlcic7XG5leHBvcnQge0Z1c2VMb2dnZXIsIEZ1c2VMb2dnZXJTZXJpYWxpemVyfSBmcm9tICcuL0Z1c2VMb2dnZXInO1xuZXhwb3J0IHtBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5fSBmcm9tICcuL0Fic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnknO1xuZXhwb3J0IHtGdXNlTG9nZ2VyRmFjdG9yeX0gZnJvbSAnLi9GdXNlTG9nZ2VyRmFjdG9yeSc7XG5cbi8vIGlPUyBTcGVjaWZpYyBBUElzIC8gSW1wbGVtZW50YXRpb25zXG5leHBvcnQge0lPU1NjaGVtZUZ1c2VBUEl9IGZyb20gJy4vaW9zL0lPU1NjaGVtZUZ1c2VBUEknO1xuZXhwb3J0IHtJT1NGdXNlTG9nZ2VyfSBmcm9tICcuL2lvcy9JT1NGdXNlTG9nZ2VyJztcblxuLy8gQW5kcm9pZCBTcGVjaWZpYyBBUElzIC8gSW1wbGVtZW50YXRpb25zXG5leHBvcnQge0FuZHJvaWRTY2hlbWVGdXNlQVBJfSBmcm9tICcuL2FuZHJvaWQvQW5kcm9pZFNjaGVtZUZ1c2VBUEknO1xuZXhwb3J0IHtBbmRyb2lkRnVzZUxvZ2dlcn0gZnJvbSAnLi9hbmRyb2lkL0FuZHJvaWRGdXNlTG9nZ2VyJztcbiIsIlxuLypcbkNvcHlyaWdodCAyMDI0IEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gJy4uL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnknO1xuaW1wb3J0IHsgRnVzZUNvbnRleHQgfSBmcm9tICcuLi9GdXNlQ29udGV4dCc7XG5pbXBvcnQgeyBJRnVzZUxvZ2dlciB9IGZyb20gJy4uL0lGdXNlTG9nZ2VyJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi4vUGxhdGZvcm0nO1xuXG5leHBvcnQgY2xhc3MgSU9TRnVzZUNvbnRleHQgZXh0ZW5kcyBGdXNlQ29udGV4dCB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGFwaUZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3RvcnksIGxvZ2dlcjogSUZ1c2VMb2dnZXIsKSB7XG4gICAgICAgIHN1cGVyKFBsYXRmb3JtLklPUywgYXBpRmFjdG9yeSwgbG9nZ2VyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgb25XZWJ2aWV3UmVhZHkoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLm9uV2Vidmlld1JlYWR5LnBvc3RNZXNzYWdlKCcnKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IElOYXRpdmVMb2dFbnRyeSB9IGZyb20gJy4uL0lGdXNlTG9nZ2VyJztcbmltcG9ydCB7IEZ1c2VMb2dnZXIgfSBmcm9tIFwiLi4vRnVzZUxvZ2dlclwiO1xuaW1wb3J0IHsgRnVzZUxvZ2dlckxldmVsIH0gZnJvbSBcIi4uL0Z1c2VMb2dnZXJMZXZlbFwiO1xuaW1wb3J0IHsgRnVzZUNhbGxiYWNrTWFuYWdlciB9IGZyb20gJy4uL0Z1c2VDYWxsYmFja01hbmFnZXInO1xuXG5leHBvcnQgY2xhc3MgSU9TRnVzZUxvZ2dlciBleHRlbmRzIEZ1c2VMb2dnZXIge1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfbG9nVG9OYXRpdmUobGV2ZWw6IEZ1c2VMb2dnZXJMZXZlbCwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLmxvZy5wb3N0TWVzc2FnZShbbGV2ZWwsIG1lc3NhZ2VdKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX3JlZ2lzdGVyTmF0aXZlQ2FsYmxhY2soKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLnNldExvZ0NhbGxiYWNrLnBvc3RNZXNzYWdlKEZ1c2VDYWxsYmFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVDYWxsYmFjaygocGF5bG9hZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW50cnk6IElOYXRpdmVMb2dFbnRyeSA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGVudHJ5ID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fb25OYXRpdmVMb2dFbnRyeShlbnRyeSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7SFRUUEZ1c2VBUEl9IGZyb20gJy4uL0hUVFBGdXNlQVBJJztcblxuLyoqXG4gKiBBIEZ1c2UgQVBJIGltcGxlbWVudGF0aW9uIGZvciBpT1MgdGhhdCB1c2VzIFdLVVJMU2NoZW1lSGFuZGxlciB0byBicmlkZ2UgdGhlIEpTIGFuZCBOYXRpdmUgQVBJIGNhbGxzLlxuICovXG5leHBvcnQgY2xhc3MgSU9TU2NoZW1lRnVzZUFQSSBleHRlbmRzIEhUVFBGdXNlQVBJIHtcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX2dldEVuZHBvaW50KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBgaHR0cHM6Ly9sb2NhbGhvc3Q6JHthd2FpdCB3aW5kb3cud2Via2l0Lm1lc3NhZ2VIYW5kbGVycy5nZXRBUElQb3J0LnBvc3RNZXNzYWdlKFwiXCIpfWA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIF9pbml0SGVhZGVycyh4aHI6IFhNTEh0dHBSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUZ1c2UtU2VjcmV0JywgYXdhaXQgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuZ2V0QVBJU2VjcmV0LnBvc3RNZXNzYWdlKFwiXCIpKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IENvbnRlbnRUeXBlIH0gZnJvbSAnLi4vQ29udGVudFR5cGUnO1xuaW1wb3J0IHsgRnVzZUNvbnRleHQgfSBmcm9tICcuLi9GdXNlQ29udGV4dCc7XG5pbXBvcnQge0Z1c2VQbHVnaW59IGZyb20gJy4uL0Z1c2VQbHVnaW4nO1xuaW1wb3J0IHtGdXNlQVBJUmVzcG9uc2V9IGZyb20gJy4uL0Z1c2VBUElSZXNwb25zZSc7XG5cbmV4cG9ydCB0eXBlIFRQYXVzZUNhbGxiYWNrSGFuZGxlciA9ICgpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBUUmVzdW1lQ2FsbGJhY2tIYW5kbGVyID0gKCkgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBJUnVudGltZUluZm8ge1xuICAgIHZlcnNpb246IHN0cmluZztcbiAgICBkZWJ1Z01vZGU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBGdXNlUnVudGltZSBleHRlbmRzIEZ1c2VQbHVnaW4ge1xuICAgIHByaXZhdGUgJGNhbGxiYWNrSURzOiBzdHJpbmdbXTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBGdXNlQ29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy4kY2FsbGJhY2tJRHMgPSBbXTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2dldElEKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnRnVzZVJ1bnRpbWUnO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgYXN5bmMgZ2V0SW5mbygpOiBQcm9taXNlPElSdW50aW1lSW5mbz4ge1xuICAgICAgICBjb25zdCBkYXRhOiBGdXNlQVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9leGVjKCcvaW5mbycpO1xuICAgICAgICByZXR1cm4gYXdhaXQgZGF0YS5yZWFkQXNKU09OKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNiOiBUUGF1c2VDYWxsYmFja0hhbmRsZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjYklEOiBzdHJpbmcgPSB0aGlzLl9jcmVhdGVDYWxsYmFjaygocGF5bG9hZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB0aGlzLl9leGVjKCcvcmVnaXN0ZXJQYXVzZUhhbmRsZXInLCBDb250ZW50VHlwZS5URVhULCBjYklEKTtcbiAgICAgICAgdGhpcy4kY2FsbGJhY2tJRHMucHVzaChjYklEKTtcblxuICAgICAgICByZXR1cm4gY2JJRDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdW5yZWdpc3RlclBhdXNlSGFuZGxlcihjYWxsYmFja0lEOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3VucmVnaXN0ZXJQYXVzZUhhbmRsZXInLCBDb250ZW50VHlwZS5URVhULCBjYWxsYmFja0lEKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXJSZXN1bWVIYW5kbGVyKGNiOiBUUmVzdW1lQ2FsbGJhY2tIYW5kbGVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgY2JJRDogc3RyaW5nID0gdGhpcy5fY3JlYXRlQ2FsbGJhY2soKHBheWxvYWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3JlZ2lzdGVyUmVzdW1lSGFuZGxlcicsIENvbnRlbnRUeXBlLlRFWFQsIGNiSUQpO1xuICAgICAgICB0aGlzLiRjYWxsYmFja0lEcy5wdXNoKGNiSUQpO1xuXG4gICAgICAgIHJldHVybiBjYklEO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1bnJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYWxsYmFja0lEOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3VucmVnaXN0ZXJSZXN1bWVIYW5kbGVyJywgQ29udGVudFR5cGUuVEVYVCwgY2FsbGJhY2tJRCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWsgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtcbiAgICBGdXNlUGx1Z2luLFxuICAgIENvbnRlbnRUeXBlLFxuICAgIEZ1c2VBUElSZXNwb25zZVxufSBmcm9tICdAYnRmdXNlL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgRWNob1BsdWdpbiBleHRlbmRzIEZ1c2VQbHVnaW4ge1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfZ2V0SUQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdlY2hvJztcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZWNobyhtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBsZXQgcjogRnVzZUFQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZXhlYygnL2VjaG8nLCBDb250ZW50VHlwZS5URVhULCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHIucmVhZEFzVGV4dCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBzdWJzY3JpYmUoY2I6IChkYXRhOiBzdHJpbmcpID0+IHZvaWQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBsZXQgY2FsbGJhY2tJRDogc3RyaW5nID0gdGhpcy5fY3JlYXRlQ2FsbGJhY2soKHBheWxvYWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY2IocGF5bG9hZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuX2V4ZWMoJy9zdWJzY3JpYmUnLCBDb250ZW50VHlwZS5URVhULCBjYWxsYmFja0lEKTtcblxuICAgICAgICByZXR1cm4gY2FsbGJhY2tJRDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgYmlnUmVzcG9uc2UoKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgICAgICBsZXQgcjogRnVzZUFQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZXhlYygnL2JpZycpO1xuICAgICAgICByZXR1cm4gYXdhaXQgci5yZWFkQXNBcnJheUJ1ZmZlcigpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTUFYXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9tYXguZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOSUxcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX25pbC5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInBhcnNlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9wYXJzZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0cmluZ2lmeVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjFcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2MVRvVjZcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YxVG9WLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YyLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjRcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YzLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3Y0LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjZcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3Y1LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjZUb1YxXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92NlRvVi5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInY3XCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92Ni5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZhbGlkYXRlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92YWxpZGF0ZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZlcnNpb25cIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3ZlcnNpb24uZGVmYXVsdDtcbiAgfVxufSk7XG52YXIgX21heCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbWF4LmpzXCIpKTtcbnZhciBfbmlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9uaWwuanNcIikpO1xudmFyIF9wYXJzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcGFyc2UuanNcIikpO1xudmFyIF9zdHJpbmdpZnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKSk7XG52YXIgX3YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YxLmpzXCIpKTtcbnZhciBfdjFUb1YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YxVG9WNi5qc1wiKSk7XG52YXIgX3YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92My5qc1wiKSk7XG52YXIgX3YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NC5qc1wiKSk7XG52YXIgX3Y0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NS5qc1wiKSk7XG52YXIgX3Y1ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92Ni5qc1wiKSk7XG52YXIgX3Y2VG9WID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NlRvVjEuanNcIikpO1xudmFyIF92NiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjcuanNcIikpO1xudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xudmFyIF92ZXJzaW9uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92ZXJzaW9uLmpzXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9ICdmZmZmZmZmZi1mZmZmLWZmZmYtZmZmZi1mZmZmZmZmZmZmZmYnOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuLypcbiAqIEJyb3dzZXItY29tcGF0aWJsZSBKYXZhU2NyaXB0IE1ENVxuICpcbiAqIE1vZGlmaWNhdGlvbiBvZiBKYXZhU2NyaXB0IE1ENVxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvSmF2YVNjcmlwdC1NRDVcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSwgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQmFzZWQgb25cbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXG4gKiBWZXJzaW9uIDIuMiBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDlcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIG1vcmUgaW5mby5cbiAqL1xuZnVuY3Rpb24gbWQ1KGJ5dGVzKSB7XG4gIGlmICh0eXBlb2YgYnl0ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShtc2cubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXNbaV0gPSBtc2cuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1kNVRvSGV4RW5jb2RlZEFycmF5KHdvcmRzVG9NZDUoYnl0ZXNUb1dvcmRzKGJ5dGVzKSwgYnl0ZXMubGVuZ3RoICogOCkpO1xufVxuXG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGFuIGFycmF5IG9mIGJ5dGVzXG4gKi9cbmZ1bmN0aW9uIG1kNVRvSGV4RW5jb2RlZEFycmF5KGlucHV0KSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgdmFyIGxlbmd0aDMyID0gaW5wdXQubGVuZ3RoICogMzI7XG4gIHZhciBoZXhUYWIgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoMzI7IGkgKz0gOCkge1xuICAgIHZhciB4ID0gaW5wdXRbaSA+PiA1XSA+Pj4gaSAlIDMyICYgMHhmZjtcbiAgICB2YXIgaGV4ID0gcGFyc2VJbnQoaGV4VGFiLmNoYXJBdCh4ID4+PiA0ICYgMHgwZikgKyBoZXhUYWIuY2hhckF0KHggJiAweDBmKSwgMTYpO1xuICAgIG91dHB1dC5wdXNoKGhleCk7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgb3V0cHV0IGxlbmd0aCB3aXRoIHBhZGRpbmcgYW5kIGJpdCBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gZ2V0T3V0cHV0TGVuZ3RoKGlucHV0TGVuZ3RoOCkge1xuICByZXR1cm4gKGlucHV0TGVuZ3RoOCArIDY0ID4+PiA5IDw8IDQpICsgMTQgKyAxO1xufVxuXG4vKlxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAqL1xuZnVuY3Rpb24gd29yZHNUb01kNSh4LCBsZW4pIHtcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCBsZW4gJSAzMjtcbiAgeFtnZXRPdXRwdXRMZW5ndGgobGVuKSAtIDFdID0gbGVuO1xuICB2YXIgYSA9IDE3MzI1ODQxOTM7XG4gIHZhciBiID0gLTI3MTczMzg3OTtcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcbiAgdmFyIGQgPSAyNzE3MzM4Nzg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICB2YXIgb2xkYSA9IGE7XG4gICAgdmFyIG9sZGIgPSBiO1xuICAgIHZhciBvbGRjID0gYztcbiAgICB2YXIgb2xkZCA9IGQ7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaV0sIDcsIC02ODA4NzY5MzYpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTcsIDYwNjEwNTgxOSk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNywgLTE3NjQxODg5Nyk7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDVdLCAxMiwgMTIwMDA4MDQyNik7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA3LCAxNzcwMDM1NDE2KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA3LCAxODA0NjAzNjgyKTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAxMjM2NTM1MzI5KTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyA2XSwgOSwgLTEwNjk1MDE2MzIpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCA2NDM3MTc3MTMpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMik7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA1LCAtNzAxNTU4NjkxKTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCA5LCAzODAxNjA4Myk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNSwgNTY4NDQ2NDM4KTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MCk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDhdLCAyMCwgMTE2MzUzMTUwMSk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAyXSwgOSwgLTUxNDAzNzg0KTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgN10sIDE0LCAxNzM1MzI4NDczKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNCwgLTM3ODU1OCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE2LCAxODM5MDMwNTYyKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMV0sIDQsIC0xNTMwOTkyMDYwKTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgNF0sIDExLCAxMjcyODkzMzUzKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgN10sIDE2LCAtMTU1NDk3NjMyKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDQsIDY4MTI3OTE3NCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaV0sIDExLCAtMzU4NTM3MjIyKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgM10sIDE2LCAtNzIyNTIxOTc5KTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgNl0sIDIzLCA3NjAyOTE4OSk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDldLCA0LCAtNjQwMzY0NDg3KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTYsIDUzMDc0MjUyMCk7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDJdLCAyMywgLTk5NTMzODY1MSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaV0sIDYsIC0xOTg2MzA4NDQpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyA3XSwgMTAsIDExMjY4OTE0MTUpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDVdLCAyMSwgLTU3NDM0MDU1KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA2LCAxNzAwNDg1NTcxKTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgM10sIDEwLCAtMTg5NDk4NjYwNik7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA2LCAxODczMzEzMzU5KTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDEzXSwgMjEsIDEzMDkxNTE2NDkpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNiwgLTE0NTUyMzA3MCk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE1LCA3MTg3ODcyNTkpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xuICAgIGEgPSBzYWZlQWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlQWRkKGIsIG9sZGIpO1xuICAgIGMgPSBzYWZlQWRkKGMsIG9sZGMpO1xuICAgIGQgPSBzYWZlQWRkKGQsIG9sZGQpO1xuICB9XG4gIHJldHVybiBbYSwgYiwgYywgZF07XG59XG5cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IGJ5dGVzIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcbiAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICovXG5mdW5jdGlvbiBieXRlc1RvV29yZHMoaW5wdXQpIHtcbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICB2YXIgbGVuZ3RoOCA9IGlucHV0Lmxlbmd0aCAqIDg7XG4gIHZhciBvdXRwdXQgPSBuZXcgVWludDMyQXJyYXkoZ2V0T3V0cHV0TGVuZ3RoKGxlbmd0aDgpKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg4OyBpICs9IDgpIHtcbiAgICBvdXRwdXRbaSA+PiA1XSB8PSAoaW5wdXRbaSAvIDhdICYgMHhmZikgPDwgaSAlIDMyO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbi8qXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICovXG5mdW5jdGlvbiBzYWZlQWRkKHgsIHkpIHtcbiAgdmFyIGxzdyA9ICh4ICYgMHhmZmZmKSArICh5ICYgMHhmZmZmKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gbXN3IDw8IDE2IHwgbHN3ICYgMHhmZmZmO1xufVxuXG4vKlxuICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICovXG5mdW5jdGlvbiBiaXRSb3RhdGVMZWZ0KG51bSwgY250KSB7XG4gIHJldHVybiBudW0gPDwgY250IHwgbnVtID4+PiAzMiAtIGNudDtcbn1cblxuLypcbiAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gKi9cbmZ1bmN0aW9uIG1kNWNtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gIHJldHVybiBzYWZlQWRkKGJpdFJvdGF0ZUxlZnQoc2FmZUFkZChzYWZlQWRkKGEsIHEpLCBzYWZlQWRkKHgsIHQpKSwgcyksIGIpO1xufVxuZnVuY3Rpb24gbWQ1ZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBjIHwgfmIgJiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cbmZ1bmN0aW9uIG1kNWdnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgZCB8IGMgJiB+ZCwgYSwgYiwgeCwgcywgdCk7XG59XG5mdW5jdGlvbiBtZDVoaChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cbmZ1bmN0aW9uIG1kNWlpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gbWQ1OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSB7XG4gIHJhbmRvbVVVSURcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSAnMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwJzsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbmZ1bmN0aW9uIHBhcnNlKHV1aWQpIHtcbiAgaWYgKCEoMCwgX3ZhbGlkYXRlLmRlZmF1bHQpKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuICB2YXIgdjtcbiAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDE2KTtcblxuICAvLyBQYXJzZSAjIyMjIyMjIy0uLi4uLS4uLi4tLi4uLi0uLi4uLi4uLi4uLi5cbiAgYXJyWzBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDAsIDgpLCAxNikpID4+PiAyNDtcbiAgYXJyWzFdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMl0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzNdID0gdiAmIDB4ZmY7XG5cbiAgLy8gUGFyc2UgLi4uLi4uLi4tIyMjIy0uLi4uLS4uLi4tLi4uLi4uLi4uLi4uXG4gIGFycls0XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSg5LCAxMyksIDE2KSkgPj4+IDg7XG4gIGFycls1XSA9IHYgJiAweGZmO1xuXG4gIC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tIyMjIy0uLi4uLS4uLi4uLi4uLi4uLlxuICBhcnJbNl0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE4KSwgMTYpKSA+Pj4gODtcbiAgYXJyWzddID0gdiAmIDB4ZmY7XG5cbiAgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0uLi4uLSMjIyMtLi4uLi4uLi4uLi4uXG4gIGFycls4XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxOSwgMjMpLCAxNikpID4+PiA4O1xuICBhcnJbOV0gPSB2ICYgMHhmZjtcblxuICAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLS4uLi4tLi4uLi0jIyMjIyMjIyMjIyNcbiAgLy8gKFVzZSBcIi9cIiB0byBhdm9pZCAzMi1iaXQgdHJ1bmNhdGlvbiB3aGVuIGJpdC1zaGlmdGluZyBoaWdoLW9yZGVyIGJ5dGVzKVxuICBhcnJbMTBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDI0LCAzNiksIDE2KSkgLyAweDEwMDAwMDAwMDAwICYgMHhmZjtcbiAgYXJyWzExXSA9IHYgLyAweDEwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMl0gPSB2ID4+PiAyNCAmIDB4ZmY7XG4gIGFyclsxM10gPSB2ID4+PiAxNiAmIDB4ZmY7XG4gIGFyclsxNF0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzE1XSA9IHYgJiAweGZmO1xuICByZXR1cm4gYXJyO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gcGFyc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLThdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMHxmZmZmZmZmZi1mZmZmLWZmZmYtZmZmZi1mZmZmZmZmZmZmZmYpJC9pOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gcm5nO1xuLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5cbnZhciBnZXRSYW5kb21WYWx1ZXM7XG52YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5mdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuLy8gQWRhcHRlZCBmcm9tIENocmlzIFZlbmVzcycgU0hBMSBjb2RlIGF0XG4vLyBodHRwOi8vd3d3Lm1vdmFibGUtdHlwZS5jby51ay9zY3JpcHRzL3NoYTEuaHRtbFxuZnVuY3Rpb24gZihzLCB4LCB5LCB6KSB7XG4gIHN3aXRjaCAocykge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiB4ICYgeSBeIH54ICYgejtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4ICYgeSBeIHggJiB6IF4geSAmIHo7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIHggXiB5IF4gejtcbiAgfVxufVxuZnVuY3Rpb24gUk9UTCh4LCBuKSB7XG4gIHJldHVybiB4IDw8IG4gfCB4ID4+PiAzMiAtIG47XG59XG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gIHZhciBLID0gWzB4NWE4Mjc5OTksIDB4NmVkOWViYTEsIDB4OGYxYmJjZGMsIDB4Y2E2MmMxZDZdO1xuICB2YXIgSCA9IFsweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLCAweDEwMzI1NDc2LCAweGMzZDJlMWYwXTtcbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgbXNnID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGJ5dGVzKSk7IC8vIFVURjggZXNjYXBlXG5cbiAgICBieXRlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlcy5wdXNoKG1zZy5jaGFyQ29kZUF0KGkpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoYnl0ZXMpKSB7XG4gICAgLy8gQ29udmVydCBBcnJheS1saWtlIHRvIEFycmF5XG4gICAgYnl0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChieXRlcyk7XG4gIH1cbiAgYnl0ZXMucHVzaCgweDgwKTtcbiAgdmFyIGwgPSBieXRlcy5sZW5ndGggLyA0ICsgMjtcbiAgdmFyIE4gPSBNYXRoLmNlaWwobCAvIDE2KTtcbiAgdmFyIE0gPSBuZXcgQXJyYXkoTik7XG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBOOyArK19pKSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50MzJBcnJheSgxNik7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICBhcnJbal0gPSBieXRlc1tfaSAqIDY0ICsgaiAqIDRdIDw8IDI0IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgMV0gPDwgMTYgfCBieXRlc1tfaSAqIDY0ICsgaiAqIDQgKyAyXSA8PCA4IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgM107XG4gICAgfVxuICAgIE1bX2ldID0gYXJyO1xuICB9XG4gIE1bTiAtIDFdWzE0XSA9IChieXRlcy5sZW5ndGggLSAxKSAqIDggLyBNYXRoLnBvdygyLCAzMik7XG4gIE1bTiAtIDFdWzE0XSA9IE1hdGguZmxvb3IoTVtOIC0gMV1bMTRdKTtcbiAgTVtOIC0gMV1bMTVdID0gKGJ5dGVzLmxlbmd0aCAtIDEpICogOCAmIDB4ZmZmZmZmZmY7XG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IE47ICsrX2kyKSB7XG4gICAgdmFyIFcgPSBuZXcgVWludDMyQXJyYXkoODApO1xuICAgIGZvciAodmFyIHQgPSAwOyB0IDwgMTY7ICsrdCkge1xuICAgICAgV1t0XSA9IE1bX2kyXVt0XTtcbiAgICB9XG4gICAgZm9yICh2YXIgX3QgPSAxNjsgX3QgPCA4MDsgKytfdCkge1xuICAgICAgV1tfdF0gPSBST1RMKFdbX3QgLSAzXSBeIFdbX3QgLSA4XSBeIFdbX3QgLSAxNF0gXiBXW190IC0gMTZdLCAxKTtcbiAgICB9XG4gICAgdmFyIGEgPSBIWzBdO1xuICAgIHZhciBiID0gSFsxXTtcbiAgICB2YXIgYyA9IEhbMl07XG4gICAgdmFyIGQgPSBIWzNdO1xuICAgIHZhciBlID0gSFs0XTtcbiAgICBmb3IgKHZhciBfdDIgPSAwOyBfdDIgPCA4MDsgKytfdDIpIHtcbiAgICAgIHZhciBzID0gTWF0aC5mbG9vcihfdDIgLyAyMCk7XG4gICAgICB2YXIgVCA9IFJPVEwoYSwgNSkgKyBmKHMsIGIsIGMsIGQpICsgZSArIEtbc10gKyBXW190Ml0gPj4+IDA7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IFJPVEwoYiwgMzApID4+PiAwO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gVDtcbiAgICB9XG4gICAgSFswXSA9IEhbMF0gKyBhID4+PiAwO1xuICAgIEhbMV0gPSBIWzFdICsgYiA+Pj4gMDtcbiAgICBIWzJdID0gSFsyXSArIGMgPj4+IDA7XG4gICAgSFszXSA9IEhbM10gKyBkID4+PiAwO1xuICAgIEhbNF0gPSBIWzRdICsgZSA+Pj4gMDtcbiAgfVxuICByZXR1cm4gW0hbMF0gPj4gMjQgJiAweGZmLCBIWzBdID4+IDE2ICYgMHhmZiwgSFswXSA+PiA4ICYgMHhmZiwgSFswXSAmIDB4ZmYsIEhbMV0gPj4gMjQgJiAweGZmLCBIWzFdID4+IDE2ICYgMHhmZiwgSFsxXSA+PiA4ICYgMHhmZiwgSFsxXSAmIDB4ZmYsIEhbMl0gPj4gMjQgJiAweGZmLCBIWzJdID4+IDE2ICYgMHhmZiwgSFsyXSA+PiA4ICYgMHhmZiwgSFsyXSAmIDB4ZmYsIEhbM10gPj4gMjQgJiAweGZmLCBIWzNdID4+IDE2ICYgMHhmZiwgSFszXSA+PiA4ICYgMHhmZiwgSFszXSAmIDB4ZmYsIEhbNF0gPj4gMjQgJiAweGZmLCBIWzRdID4+IDE2ICYgMHhmZiwgSFs0XSA+PiA4ICYgMHhmZiwgSFs0XSAmIDB4ZmZdO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gc2hhMTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbmV4cG9ydHMudW5zYWZlU3RyaW5naWZ5ID0gdW5zYWZlU3RyaW5naWZ5O1xudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5mdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICAvL1xuICAvLyBOb3RlIHRvIGZ1dHVyZS1zZWxmOiBObywgeW91IGNhbid0IHJlbW92ZSB0aGUgYHRvTG93ZXJDYXNlKClgIGNhbGwuXG4gIC8vIFJFRjogaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNjc3I2lzc3VlY29tbWVudC0xNzU3MzUxMzUxXG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIHZhciB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTtcbiAgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuICBpZiAoISgwLCBfdmFsaWRhdGUuZGVmYXVsdCkodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG4gIHJldHVybiB1dWlkO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gc3RyaW5naWZ5OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9ybmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JuZy5qc1wiKSk7XG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG52YXIgX2Nsb2Nrc2VxO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBuZXcgQXJyYXkoMTYpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGU7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXE7XG5cbiAgLy8gdjEgb25seTogVXNlIGNhY2hlZCBgbm9kZWAgYW5kIGBjbG9ja3NlcWAgdmFsdWVzXG4gIGlmICghb3B0aW9ucy5fdjYpIHtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIG5vZGUgPSBfbm9kZUlkO1xuICAgIH1cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXE7XG4gICAgfVxuICB9XG5cbiAgLy8gSGFuZGxlIGNhc2VzIHdoZXJlIHdlIG5lZWQgZW50cm9weS4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3Vlc1xuICAvLyByZWxhdGVkIHRvIGluc3VmZmljaWVudCBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gICAgLy8gUmFuZG9taXplIG5vZGVcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICBub2RlID0gW3NlZWRCeXRlc1swXSwgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1dO1xuXG4gICAgICAvLyB2MSBvbmx5OiBjYWNoZSBub2RlIHZhbHVlIGZvciByZXVzZVxuICAgICAgaWYgKCFfbm9kZUlkICYmICFvcHRpb25zLl92Nikge1xuICAgICAgICAvLyBwZXIgUkZDNDEyMiA0LjU6IFNldCBNQUMgbXVsdGljYXN0IGJpdCAodjEgb25seSlcbiAgICAgICAgbm9kZVswXSB8PSAweDAxOyAvLyBTZXQgbXVsdGljYXN0IGJpdFxuXG4gICAgICAgIF9ub2RlSWQgPSBub2RlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJhbmRvbWl6ZSBjbG9ja3NlcVxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgICAgaWYgKF9jbG9ja3NlcSA9PT0gdW5kZWZpbmVkICYmICFvcHRpb25zLl92Nikge1xuICAgICAgICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyB2MSAmIHY2IHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzbyB0aW1lIGlzXG4gIC8vIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IERhdGUubm93KCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSBtc2VjcyAtIF9sYXN0TVNlY3MgKyAobnNlY3MgLSBfbGFzdE5TZWNzKSAvIDEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInV1aWQudjEoKTogQ2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjXCIpO1xuICB9XG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cbiAgcmV0dXJuIGJ1ZiB8fCAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKGIpO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gdjE7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2MVRvVjY7XG52YXIgX3BhcnNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9wYXJzZS5qc1wiKSk7XG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbi8qKlxuICogQ29udmVydCBhIHYxIFVVSUQgdG8gYSB2NiBVVUlEXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8VWludDhBcnJheX0gdXVpZCAtIFRoZSB2MSBVVUlEIHRvIGNvbnZlcnQgdG8gdjZcbiAqIEByZXR1cm5zIHtzdHJpbmd8VWludDhBcnJheX0gVGhlIHY2IFVVSUQgYXMgdGhlIHNhbWUgdHlwZSBhcyB0aGUgYHV1aWRgIGFyZ1xuICogKHN0cmluZyBvciBVaW50OEFycmF5KVxuICovXG5mdW5jdGlvbiB2MVRvVjYodXVpZCkge1xuICB2YXIgdjFCeXRlcyA9IHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyA/ICgwLCBfcGFyc2UuZGVmYXVsdCkodXVpZCkgOiB1dWlkO1xuICB2YXIgdjZCeXRlcyA9IF92MVRvVjYodjFCeXRlcyk7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgPyAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKHY2Qnl0ZXMpIDogdjZCeXRlcztcbn1cblxuLy8gRG8gdGhlIGZpZWxkIHRyYW5zZm9ybWF0aW9uIG5lZWRlZCBmb3IgdjEgLT4gdjZcbmZ1bmN0aW9uIF92MVRvVjYodjFCeXRlcywgcmFuZG9taXplID0gZmFsc2UpIHtcbiAgcmV0dXJuIFVpbnQ4QXJyYXkub2YoKHYxQnl0ZXNbNl0gJiAweDBmKSA8PCA0IHwgdjFCeXRlc1s3XSA+PiA0ICYgMHgwZiwgKHYxQnl0ZXNbN10gJiAweDBmKSA8PCA0IHwgKHYxQnl0ZXNbNF0gJiAweGYwKSA+PiA0LCAodjFCeXRlc1s0XSAmIDB4MGYpIDw8IDQgfCAodjFCeXRlc1s1XSAmIDB4ZjApID4+IDQsICh2MUJ5dGVzWzVdICYgMHgwZikgPDwgNCB8ICh2MUJ5dGVzWzBdICYgMHhmMCkgPj4gNCwgKHYxQnl0ZXNbMF0gJiAweDBmKSA8PCA0IHwgKHYxQnl0ZXNbMV0gJiAweGYwKSA+PiA0LCAodjFCeXRlc1sxXSAmIDB4MGYpIDw8IDQgfCAodjFCeXRlc1syXSAmIDB4ZjApID4+IDQsIDB4NjAgfCB2MUJ5dGVzWzJdICYgMHgwZiwgdjFCeXRlc1szXSwgdjFCeXRlc1s4XSwgdjFCeXRlc1s5XSwgdjFCeXRlc1sxMF0sIHYxQnl0ZXNbMTFdLCB2MUJ5dGVzWzEyXSwgdjFCeXRlc1sxM10sIHYxQnl0ZXNbMTRdLCB2MUJ5dGVzWzE1XSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YzNS5qc1wiKSk7XG52YXIgX21kID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9tZDUuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxudmFyIHYzID0gKDAsIF92LmRlZmF1bHQpKCd2MycsIDB4MzAsIF9tZC5kZWZhdWx0KTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHYzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5VUkwgPSBleHBvcnRzLkROUyA9IHZvaWQgMDtcbmV4cG9ydHMuZGVmYXVsdCA9IHYzNTtcbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xudmFyIF9wYXJzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcGFyc2UuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuZnVuY3Rpb24gc3RyaW5nVG9CeXRlcyhzdHIpIHtcbiAgc3RyID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpOyAvLyBVVEY4IGVzY2FwZVxuXG4gIHZhciBieXRlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGJ5dGVzLnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpO1xuICB9XG4gIHJldHVybiBieXRlcztcbn1cbnZhciBETlMgPSBleHBvcnRzLkROUyA9ICc2YmE3YjgxMC05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xudmFyIFVSTCA9IGV4cG9ydHMuVVJMID0gJzZiYTdiODExLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5mdW5jdGlvbiB2MzUobmFtZSwgdmVyc2lvbiwgaGFzaGZ1bmMpIHtcbiAgZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKHZhbHVlLCBuYW1lc3BhY2UsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIF9uYW1lc3BhY2U7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gc3RyaW5nVG9CeXRlcyh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgbmFtZXNwYWNlID0gKDAsIF9wYXJzZS5kZWZhdWx0KShuYW1lc3BhY2UpO1xuICAgIH1cbiAgICBpZiAoKChfbmFtZXNwYWNlID0gbmFtZXNwYWNlKSA9PT0gbnVsbCB8fCBfbmFtZXNwYWNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbmFtZXNwYWNlLmxlbmd0aCkgIT09IDE2KSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ05hbWVzcGFjZSBtdXN0IGJlIGFycmF5LWxpa2UgKDE2IGl0ZXJhYmxlIGludGVnZXIgdmFsdWVzLCAwLTI1NSknKTtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlIGhhc2ggb2YgbmFtZXNwYWNlIGFuZCB2YWx1ZSwgUGVyIDQuM1xuICAgIC8vIEZ1dHVyZTogVXNlIHNwcmVhZCBzeW50YXggd2hlbiBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3JtcywgZS5nLiBgYnl0ZXMgPVxuICAgIC8vIGhhc2hmdW5jKFsuLi5uYW1lc3BhY2UsIC4uLiB2YWx1ZV0pYFxuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KDE2ICsgdmFsdWUubGVuZ3RoKTtcbiAgICBieXRlcy5zZXQobmFtZXNwYWNlKTtcbiAgICBieXRlcy5zZXQodmFsdWUsIG5hbWVzcGFjZS5sZW5ndGgpO1xuICAgIGJ5dGVzID0gaGFzaGZ1bmMoYnl0ZXMpO1xuICAgIGJ5dGVzWzZdID0gYnl0ZXNbNl0gJiAweDBmIHwgdmVyc2lvbjtcbiAgICBieXRlc1s4XSA9IGJ5dGVzWzhdICYgMHgzZiB8IDB4ODA7XG4gICAgaWYgKGJ1Zikge1xuICAgICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgYnVmW29mZnNldCArIGldID0gYnl0ZXNbaV07XG4gICAgICB9XG4gICAgICByZXR1cm4gYnVmO1xuICAgIH1cbiAgICByZXR1cm4gKDAsIF9zdHJpbmdpZnkudW5zYWZlU3RyaW5naWZ5KShieXRlcyk7XG4gIH1cblxuICAvLyBGdW5jdGlvbiNuYW1lIGlzIG5vdCBzZXR0YWJsZSBvbiBzb21lIHBsYXRmb3JtcyAoIzI3MClcbiAgdHJ5IHtcbiAgICBnZW5lcmF0ZVVVSUQubmFtZSA9IG5hbWU7XG4gIH0gY2F0Y2ggKGVycikge31cblxuICAvLyBGb3IgQ29tbW9uSlMgZGVmYXVsdCBleHBvcnQgc3VwcG9ydFxuICBnZW5lcmF0ZVVVSUQuRE5TID0gRE5TO1xuICBnZW5lcmF0ZVVVSUQuVVJMID0gVVJMO1xuICByZXR1cm4gZ2VuZXJhdGVVVUlEO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9uYXRpdmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL25hdGl2ZS5qc1wiKSk7XG52YXIgX3JuZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcm5nLmpzXCIpKTtcbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKF9uYXRpdmUuZGVmYXVsdC5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gX25hdGl2ZS5kZWZhdWx0LnJhbmRvbVVVSUQoKTtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuICByZXR1cm4gKDAsIF9zdHJpbmdpZnkudW5zYWZlU3RyaW5naWZ5KShybmRzKTtcbn1cbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHY0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MzUuanNcIikpO1xudmFyIF9zaGEgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3NoYTEuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxudmFyIHY1ID0gKDAsIF92LmRlZmF1bHQpKCd2NScsIDB4NTAsIF9zaGEuZGVmYXVsdCk7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSB2NTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHY2O1xudmFyIF9zdHJpbmdpZnkgPSByZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIik7XG52YXIgX3YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YxLmpzXCIpKTtcbnZhciBfdjFUb1YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YxVG9WNi5qc1wiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgZGVmYXVsdDogZSB9OyB9XG5mdW5jdGlvbiBvd25LZXlzKGUsIHIpIHsgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpOyByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgcikuZW51bWVyYWJsZTsgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7IH0gcmV0dXJuIHQ7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQoZSkgeyBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykgeyB2YXIgdCA9IG51bGwgIT0gYXJndW1lbnRzW3JdID8gYXJndW1lbnRzW3JdIDoge307IHIgJSAyID8gb3duS2V5cyhPYmplY3QodCksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0W3JdKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsIHIpKTsgfSk7IH0gcmV0dXJuIGU7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0KSB7IHJldHVybiAociA9IF90b1Byb3BlcnR5S2V5KHIpKSBpbiBlID8gT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIHsgdmFsdWU6IHQsIGVudW1lcmFibGU6ICEwLCBjb25maWd1cmFibGU6ICEwLCB3cml0YWJsZTogITAgfSkgOiBlW3JdID0gdCwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbi8qKlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXk9fSBidWZcbiAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0XG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB2NihvcHRpb25zID0ge30sIGJ1Ziwgb2Zmc2V0ID0gMCkge1xuICAvLyB2NiBpcyB2MSB3aXRoIGRpZmZlcmVudCBmaWVsZCBsYXlvdXQsIHNvIHdlIHN0YXJ0IHdpdGggYSB2MSBVVUlELCBhbGJlaXRcbiAgLy8gd2l0aCBzbGlnaHRseSBkaWZmZXJlbnQgYmVoYXZpb3IgYXJvdW5kIGhvdyB0aGUgY2xvY2tfc2VxIGFuZCBub2RlIGZpZWxkc1xuICAvLyBhcmUgcmFuZG9taXplZCwgd2hpY2ggaXMgd2h5IHdlIGNhbGwgdjEgd2l0aCBfdjY6IHRydWUuXG4gIHZhciBieXRlcyA9ICgwLCBfdi5kZWZhdWx0KShfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIG9wdGlvbnMpLCB7fSwge1xuICAgIF92NjogdHJ1ZVxuICB9KSwgbmV3IFVpbnQ4QXJyYXkoMTYpKTtcblxuICAvLyBSZW9yZGVyIHRoZSBmaWVsZHMgdG8gdjYgbGF5b3V0LlxuICBieXRlcyA9ICgwLCBfdjFUb1YuZGVmYXVsdCkoYnl0ZXMpO1xuXG4gIC8vIFJldHVybiBhcyBhIGJ5dGUgYXJyYXkgaWYgcmVxdWVzdGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGVzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gYnVmO1xuICB9XG4gIHJldHVybiAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKGJ5dGVzKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHY2VG9WMTtcbnZhciBfcGFyc2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3BhcnNlLmpzXCIpKTtcbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuLyoqXG4gKiBDb252ZXJ0IGEgdjYgVVVJRCB0byBhIHYxIFVVSURcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xVaW50OEFycmF5fSB1dWlkIC0gVGhlIHY2IFVVSUQgdG8gY29udmVydCB0byB2NlxuICogQHJldHVybnMge3N0cmluZ3xVaW50OEFycmF5fSBUaGUgdjEgVVVJRCBhcyB0aGUgc2FtZSB0eXBlIGFzIHRoZSBgdXVpZGAgYXJnXG4gKiAoc3RyaW5nIG9yIFVpbnQ4QXJyYXkpXG4gKi9cbmZ1bmN0aW9uIHY2VG9WMSh1dWlkKSB7XG4gIHZhciB2NkJ5dGVzID0gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnID8gKDAsIF9wYXJzZS5kZWZhdWx0KSh1dWlkKSA6IHV1aWQ7XG4gIHZhciB2MUJ5dGVzID0gX3Y2VG9WMSh2NkJ5dGVzKTtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyA/ICgwLCBfc3RyaW5naWZ5LnVuc2FmZVN0cmluZ2lmeSkodjFCeXRlcykgOiB2MUJ5dGVzO1xufVxuXG4vLyBEbyB0aGUgZmllbGQgdHJhbnNmb3JtYXRpb24gbmVlZGVkIGZvciB2NiAtPiB2MVxuZnVuY3Rpb24gX3Y2VG9WMSh2NkJ5dGVzKSB7XG4gIHJldHVybiBVaW50OEFycmF5Lm9mKCh2NkJ5dGVzWzNdICYgMHgwZikgPDwgNCB8IHY2Qnl0ZXNbNF0gPj4gNCAmIDB4MGYsICh2NkJ5dGVzWzRdICYgMHgwZikgPDwgNCB8ICh2NkJ5dGVzWzVdICYgMHhmMCkgPj4gNCwgKHY2Qnl0ZXNbNV0gJiAweDBmKSA8PCA0IHwgdjZCeXRlc1s2XSAmIDB4MGYsIHY2Qnl0ZXNbN10sICh2NkJ5dGVzWzFdICYgMHgwZikgPDwgNCB8ICh2NkJ5dGVzWzJdICYgMHhmMCkgPj4gNCwgKHY2Qnl0ZXNbMl0gJiAweDBmKSA8PCA0IHwgKHY2Qnl0ZXNbM10gJiAweGYwKSA+PiA0LCAweDEwIHwgKHY2Qnl0ZXNbMF0gJiAweGYwKSA+PiA0LCAodjZCeXRlc1swXSAmIDB4MGYpIDw8IDQgfCAodjZCeXRlc1sxXSAmIDB4ZjApID4+IDQsIHY2Qnl0ZXNbOF0sIHY2Qnl0ZXNbOV0sIHY2Qnl0ZXNbMTBdLCB2NkJ5dGVzWzExXSwgdjZCeXRlc1sxMl0sIHY2Qnl0ZXNbMTNdLCB2NkJ5dGVzWzE0XSwgdjZCeXRlc1sxNV0pO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9ybmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JuZy5qc1wiKSk7XG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbi8qKlxuICogVVVJRCBWNyAtIFVuaXggRXBvY2ggdGltZS1iYXNlZCBVVUlEXG4gKlxuICogVGhlIElFVEYgaGFzIHB1Ymxpc2hlZCBSRkM5NTYyLCBpbnRyb2R1Y2luZyAzIG5ldyBVVUlEIHZlcnNpb25zICg2LDcsOCkuIFRoaXNcbiAqIGltcGxlbWVudGF0aW9uIG9mIFY3IGlzIGJhc2VkIG9uIHRoZSBhY2NlcHRlZCwgdGhvdWdoIG5vdCB5ZXQgYXBwcm92ZWQsXG4gKiByZXZpc2lvbnMuXG4gKlxuICogUkZDIDk1NjI6aHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzk1NjIuaHRtbCBVbml2ZXJzYWxseSBVbmlxdWVcbiAqIElEZW50aWZpZXJzIChVVUlEcylcblxuICpcbiAqIFNhbXBsZSBWNyB2YWx1ZTpcbiAqIGh0dHBzOi8vd3d3LnJmYy1lZGl0b3Iub3JnL3JmYy9yZmM5NTYyLmh0bWwjbmFtZS1leGFtcGxlLW9mLWEtdXVpZHY3LXZhbHVlXG4gKlxuICogTW9ub3RvbmljIEJpdCBMYXlvdXQ6IFJGQyByZmM5NTYyLjYuMiBNZXRob2QgMSwgRGVkaWNhdGVkIENvdW50ZXIgQml0cyByZWY6XG4gKiAgICAgaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzk1NjIuaHRtbCNzZWN0aW9uLTYuMi01LjFcbiAqXG4gKiAgIDAgICAgICAgICAgICAgICAgICAgMSAgICAgICAgICAgICAgICAgICAyICAgICAgICAgICAgICAgICAgIDMgMCAxIDIgMyA0IDUgNlxuICogICA3IDggOSAwIDEgMiAzIDQgNSA2IDcgOCA5IDAgMSAyIDMgNCA1IDYgNyA4IDkgMCAxXG4gKiAgKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLStcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICB1bml4X3RzX21zICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rXG4gKiAgfCAgICAgICAgICB1bml4X3RzX21zICAgICAgICAgICB8ICB2ZXIgIHwgICAgICAgIHNlcV9oaSAgICAgICAgIHxcbiAqICArLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstK1xuICogIHx2YXJ8ICAgICAgICAgICAgICAgc2VxX2xvdyAgICAgICAgICAgICAgIHwgICAgICAgIHJhbmQgICAgICAgICB8XG4gKiAgKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLStcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rXG4gKlxuICogc2VxIGlzIGEgMzEgYml0IHNlcmlhbGl6ZWQgY291bnRlcjsgY29tcHJpc2VkIG9mIDEyIGJpdCBzZXFfaGkgYW5kIDE5IGJpdFxuICogc2VxX2xvdywgYW5kIHJhbmRvbWx5IGluaXRpYWxpemVkIHVwb24gdGltZXN0YW1wIGNoYW5nZS4gMzEgYml0IGNvdW50ZXIgc2l6ZVxuICogd2FzIHNlbGVjdGVkIGFzIGFueSBiaXR3aXNlIG9wZXJhdGlvbnMgaW4gbm9kZSBhcmUgZG9uZSBhcyBfc2lnbmVkXyAzMiBiaXRcbiAqIGludHMuIHdlIGV4Y2x1ZGUgdGhlIHNpZ24gYml0LlxuICovXG5cbnZhciBfc2VxTG93ID0gbnVsbDtcbnZhciBfc2VxSGlnaCA9IG51bGw7XG52YXIgX21zZWNzID0gMDtcbmZ1bmN0aW9uIHY3KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8vIGluaXRpYWxpemUgYnVmZmVyIGFuZCBwb2ludGVyXG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBuZXcgVWludDhBcnJheSgxNik7XG5cbiAgLy8gcm5kcyBpcyBVaW50OEFycmF5KDE2KSBmaWxsZWQgd2l0aCByYW5kb20gYnl0ZXNcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gIC8vIG1pbGxpc2Vjb25kcyBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBEYXRlLm5vdygpO1xuXG4gIC8vIHNlcSBpcyB1c2VyIHByb3ZpZGVkIDMxIGJpdCBjb3VudGVyXG4gIHZhciBzZXEgPSBvcHRpb25zLnNlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5zZXEgOiBudWxsO1xuXG4gIC8vIGluaXRpYWxpemUgbG9jYWwgc2VxIGhpZ2gvbG93IHBhcnRzXG4gIHZhciBzZXFIaWdoID0gX3NlcUhpZ2g7XG4gIHZhciBzZXFMb3cgPSBfc2VxTG93O1xuXG4gIC8vIGNoZWNrIGlmIGNsb2NrIGhhcyBhZHZhbmNlZCBhbmQgdXNlciBoYXMgbm90IHByb3ZpZGVkIG1zZWNzXG4gIGlmIChtc2VjcyA+IF9tc2VjcyAmJiBvcHRpb25zLm1zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBfbXNlY3MgPSBtc2VjcztcblxuICAgIC8vIHVubGVzcyB1c2VyIHByb3ZpZGVkIHNlcSwgcmVzZXQgc2VxIHBhcnRzXG4gICAgaWYgKHNlcSAhPT0gbnVsbCkge1xuICAgICAgc2VxSGlnaCA9IG51bGw7XG4gICAgICBzZXFMb3cgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHdlIGhhdmUgYSB1c2VyIHByb3ZpZGVkIHNlcVxuICBpZiAoc2VxICE9PSBudWxsKSB7XG4gICAgLy8gdHJpbSBwcm92aWRlZCBzZXEgdG8gMzEgYml0cyBvZiB2YWx1ZSwgYXZvaWRpbmcgb3ZlcmZsb3dcbiAgICBpZiAoc2VxID4gMHg3ZmZmZmZmZikge1xuICAgICAgc2VxID0gMHg3ZmZmZmZmZjtcbiAgICB9XG5cbiAgICAvLyBzcGxpdCBwcm92aWRlZCBzZXEgaW50byBoaWdoL2xvdyBwYXJ0c1xuICAgIHNlcUhpZ2ggPSBzZXEgPj4+IDE5ICYgMHhmZmY7XG4gICAgc2VxTG93ID0gc2VxICYgMHg3ZmZmZjtcbiAgfVxuXG4gIC8vIHJhbmRvbWx5IGluaXRpYWxpemUgc2VxXG4gIGlmIChzZXFIaWdoID09PSBudWxsIHx8IHNlcUxvdyA9PT0gbnVsbCkge1xuICAgIHNlcUhpZ2ggPSBybmRzWzZdICYgMHg3ZjtcbiAgICBzZXFIaWdoID0gc2VxSGlnaCA8PCA4IHwgcm5kc1s3XTtcbiAgICBzZXFMb3cgPSBybmRzWzhdICYgMHgzZjsgLy8gcGFkIGZvciB2YXJcbiAgICBzZXFMb3cgPSBzZXFMb3cgPDwgOCB8IHJuZHNbOV07XG4gICAgc2VxTG93ID0gc2VxTG93IDw8IDUgfCBybmRzWzEwXSA+Pj4gMztcbiAgfVxuXG4gIC8vIGluY3JlbWVudCBzZXEgaWYgd2l0aGluIG1zZWNzIHdpbmRvd1xuICBpZiAobXNlY3MgKyAxMDAwMCA+IF9tc2VjcyAmJiBzZXEgPT09IG51bGwpIHtcbiAgICBpZiAoKytzZXFMb3cgPiAweDdmZmZmKSB7XG4gICAgICBzZXFMb3cgPSAwO1xuICAgICAgaWYgKCsrc2VxSGlnaCA+IDB4ZmZmKSB7XG4gICAgICAgIHNlcUhpZ2ggPSAwO1xuXG4gICAgICAgIC8vIGluY3JlbWVudCBpbnRlcm5hbCBfbXNlY3MuIHRoaXMgYWxsb3dzIHVzIHRvIGNvbnRpbnVlIGluY3JlbWVudGluZ1xuICAgICAgICAvLyB3aGlsZSBzdGF5aW5nIG1vbm90b25pYy4gTm90ZSwgb25jZSB3ZSBoaXQgMTBrIG1pbGxpc2Vjb25kcyBiZXlvbmQgc3lzdGVtXG4gICAgICAgIC8vIGNsb2NrLCB3ZSB3aWxsIHJlc2V0IGJyZWFraW5nIG1vbm90b25pY2l0eSAoYWZ0ZXIgKDJeMzEpKjEwMDAwIGdlbmVyYXRpb25zKVxuICAgICAgICBfbXNlY3MrKztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gcmVzZXR0aW5nOyB3ZSBoYXZlIGFkdmFuY2VkIG1vcmUgdGhhblxuICAgIC8vIDEwayBtaWxsaXNlY29uZHMgYmV5b25kIHN5c3RlbSBjbG9ja1xuICAgIF9tc2VjcyA9IG1zZWNzO1xuICB9XG4gIF9zZXFIaWdoID0gc2VxSGlnaDtcbiAgX3NlcUxvdyA9IHNlcUxvdztcblxuICAvLyBbYnl0ZXMgMC01XSA0OCBiaXRzIG9mIGxvY2FsIHRpbWVzdGFtcFxuICBiW2krK10gPSBfbXNlY3MgLyAweDEwMDAwMDAwMDAwICYgMHhmZjtcbiAgYltpKytdID0gX21zZWNzIC8gMHgxMDAwMDAwMDAgJiAweGZmO1xuICBiW2krK10gPSBfbXNlY3MgLyAweDEwMDAwMDAgJiAweGZmO1xuICBiW2krK10gPSBfbXNlY3MgLyAweDEwMDAwICYgMHhmZjtcbiAgYltpKytdID0gX21zZWNzIC8gMHgxMDAgJiAweGZmO1xuICBiW2krK10gPSBfbXNlY3MgJiAweGZmO1xuXG4gIC8vIFtieXRlIDZdIC0gc2V0IDQgYml0cyBvZiB2ZXJzaW9uICg3KSB3aXRoIGZpcnN0IDQgYml0cyBzZXFfaGlcbiAgYltpKytdID0gc2VxSGlnaCA+Pj4gNCAmIDB4MGYgfCAweDcwO1xuXG4gIC8vIFtieXRlIDddIHJlbWFpbmluZyA4IGJpdHMgb2Ygc2VxX2hpXG4gIGJbaSsrXSA9IHNlcUhpZ2ggJiAweGZmO1xuXG4gIC8vIFtieXRlIDhdIC0gdmFyaWFudCAoMiBiaXRzKSwgZmlyc3QgNiBiaXRzIHNlcV9sb3dcbiAgYltpKytdID0gc2VxTG93ID4+PiAxMyAmIDB4M2YgfCAweDgwO1xuXG4gIC8vIFtieXRlIDldIDggYml0cyBzZXFfbG93XG4gIGJbaSsrXSA9IHNlcUxvdyA+Pj4gNSAmIDB4ZmY7XG5cbiAgLy8gW2J5dGUgMTBdIHJlbWFpbmluZyA1IGJpdHMgc2VxX2xvdywgMyBiaXRzIHJhbmRvbVxuICBiW2krK10gPSBzZXFMb3cgPDwgMyAmIDB4ZmYgfCBybmRzWzEwXSAmIDB4MDc7XG5cbiAgLy8gW2J5dGVzIDExLTE1XSBhbHdheXMgcmFuZG9tXG4gIGJbaSsrXSA9IHJuZHNbMTFdO1xuICBiW2krK10gPSBybmRzWzEyXTtcbiAgYltpKytdID0gcm5kc1sxM107XG4gIGJbaSsrXSA9IHJuZHNbMTRdO1xuICBiW2krK10gPSBybmRzWzE1XTtcbiAgcmV0dXJuIGJ1ZiB8fCAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKGIpO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gdjc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3JlZ2V4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9yZWdleC5qc1wiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgZGVmYXVsdDogZSB9OyB9XG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgX3JlZ2V4LmRlZmF1bHQudGVzdCh1dWlkKTtcbn1cbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHZhbGlkYXRlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuZnVuY3Rpb24gdmVyc2lvbih1dWlkKSB7XG4gIGlmICghKDAsIF92YWxpZGF0ZS5kZWZhdWx0KSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignSW52YWxpZCBVVUlEJyk7XG4gIH1cbiAgcmV0dXJuIHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE1KSwgMTYpO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gdmVyc2lvbjsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cblxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXG5cbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xuICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xuICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufVxuXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdDtcbiAgfVxuICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgdFtwXSA9IHNbcF07XG4gIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgfVxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XG4gIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxuICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xuICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XG4gIHZhciBfLCBkb25lID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XG4gICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcbiAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xuICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcbiAgICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XG4gIGRvbmUgPSB0cnVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcbiAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XG4gIH1cbiAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcbiAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxuICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxuICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XG4gIHZhciBpLCBwO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICByZXR1cm4gY29va2VkO1xufTtcblxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgb1tcImRlZmF1bHRcIl0gPSB2O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XG4gIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XG4gIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xuICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xuICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xuICAgIH1cbiAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XG4gICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XG4gICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcbiAgfVxuICBlbHNlIGlmIChhc3luYykge1xuICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XG4gIGZ1bmN0aW9uIGZhaWwoZSkge1xuICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcbiAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xuICB9XG4gIHZhciByLCBzID0gMDtcbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XG4gICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XG4gICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHMgfD0gMTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGZhaWwoZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcbiAgfVxuICByZXR1cm4gbmV4dCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIF9fZXh0ZW5kcyxcbiAgX19hc3NpZ24sXG4gIF9fcmVzdCxcbiAgX19kZWNvcmF0ZSxcbiAgX19wYXJhbSxcbiAgX19tZXRhZGF0YSxcbiAgX19hd2FpdGVyLFxuICBfX2dlbmVyYXRvcixcbiAgX19jcmVhdGVCaW5kaW5nLFxuICBfX2V4cG9ydFN0YXIsXG4gIF9fdmFsdWVzLFxuICBfX3JlYWQsXG4gIF9fc3ByZWFkLFxuICBfX3NwcmVhZEFycmF5cyxcbiAgX19zcHJlYWRBcnJheSxcbiAgX19hd2FpdCxcbiAgX19hc3luY0dlbmVyYXRvcixcbiAgX19hc3luY0RlbGVnYXRvcixcbiAgX19hc3luY1ZhbHVlcyxcbiAgX19tYWtlVGVtcGxhdGVPYmplY3QsXG4gIF9faW1wb3J0U3RhcixcbiAgX19pbXBvcnREZWZhdWx0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXG4gIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxuICBfX2Rpc3Bvc2VSZXNvdXJjZXMsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7XG4gICAgRnVzZUNvbnRleHQsXG4gICAgRnVzZUNvbnRleHRCdWlsZGVyLFxuICAgIEZ1c2VFcnJvclxufSBmcm9tICdAYnRmdXNlL2NvcmUnO1xuaW1wb3J0IHtFY2hvUGx1Z2lufSBmcm9tICdlY2hvJztcblxudmFyIHNsZWVwID0gKG1zOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0sIG1zKTtcbiAgICB9KTtcbn1cblxuKGFzeW5jICgpID0+IHtcbiAgICBsZXQgYnVpbGRlcjogRnVzZUNvbnRleHRCdWlsZGVyID0gbmV3IEZ1c2VDb250ZXh0QnVpbGRlcigpO1xuICAgIGxldCBjb250ZXh0OiBGdXNlQ29udGV4dCA9IGF3YWl0IGJ1aWxkZXIuYnVpbGQoKTtcbiAgICBsZXQgZWNob1BsdWdpbjogRWNob1BsdWdpbiA9IG5ldyBFY2hvUGx1Z2luKGNvbnRleHQpO1xuXG4gICAgY29udGV4dC5yZWdpc3RlclBhdXNlSGFuZGxlcigoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdPTiBQQVVTRSEnKTtcbiAgICB9KTtcblxuICAgIGNvbnRleHQucmVnaXN0ZXJSZXN1bWVIYW5kbGVyKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ09OIFJFU1VNRSEnKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGFwcGVuZEluZm8obXNnOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGRpdjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IG1zZztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cblxuICAgIGF3YWl0IChhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCByZXNwb25zZTogc3RyaW5nID0gYXdhaXQgZWNob1BsdWdpbi5lY2hvKCdIaSBmcm9tIFRTJyk7XG4gICAgICAgIC8vIGFsZXJ0KHJlc3BvbnNlKTtcbiAgICAgICAgYXBwZW5kSW5mbyhyZXNwb25zZSk7XG5cbiAgICAgICAgY29udGV4dC5nZXRMb2dnZXIoKS5pbmZvKGBFQ0hPIFJFU1BPTlNFOiAke3Jlc3BvbnNlfWApO1xuICAgICAgICBcbiAgICAgICAgbGV0IHRpbWVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aW1lRGl2KTtcbiAgICAgICAgbGV0IGZpcnN0VGltZUZpcmU6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aW1lRGl2LmlubmVySFRNTCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmIChmaXJzdFRpbWVGaXJlKSB7XG4gICAgICAgICAgICAgICAgZmlyc3RUaW1lRmlyZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnRleHQub25XZWJ2aWV3UmVhZHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgbGV0IGRlYnVnOiBib29sZWFuID0gYXdhaXQgY29udGV4dC5pc0RlYnVnTW9kZSgpO1xuICAgICAgICBhcHBlbmRJbmZvKGBEZWJ1ZzogJHtkZWJ1ZyA/ICd0cnVlJyA6ICdmYWxzZSd9YCk7XG5cbiAgICAgICAgLy8gYXdhaXQgZWNob1BsdWdpbi5zdWJzY3JpYmUoKGQ6IHN0cmluZykgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ2QnLCBkKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfSkoKTtcblxuICAgIGRvY3VtZW50LmJvZHkub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IHJlc3AgPSBhd2FpdCBlY2hvUGx1Z2luLmJpZ1Jlc3BvbnNlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdiaWcgcmVzcCcsIHJlc3ApO1xuICAgIH07XG5cbiAgICAod2luZG93IGFzIGFueSkuZnVzZWNvbnRleHQgPSBjb250ZXh0O1xuICAgIFxuICAgIGNvbnRleHQuZ2V0TG9nZ2VyKCkuaW5mbygndGVzdCBsb2cgZnJvbSB3ZWJ2aWV3Jyk7XG4gICAgY29udGV4dC5nZXRMb2dnZXIoKS5lcnJvcihuZXcgRnVzZUVycm9yKCdUZXN0RXJyb3InLCAndGVzdCBmdXNlIGVycm9yJywgbmV3IEVycm9yKCdDYXVzZWQgZXJyb3InKSwgMSkpO1xuXG5cbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=