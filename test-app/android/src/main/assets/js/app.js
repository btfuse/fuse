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
    _getRuntime() {
        return this.$runtime;
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
        this._getRuntime().registerInsetHandler((inset) => {
            const r = document.querySelector(':root');
            r.style.setProperty('--fuse-inset-top', `${inset.top}px`);
            r.style.setProperty('--fuse-inset-bottom', `${inset.bottom}px`);
            r.style.setProperty('--fuse-inset-left', `${inset.left}px`);
            r.style.setProperty('--fuse-inset-right', `${inset.right}px`);
        });
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
    async registerInsetHandler(cb) {
        const cbID = this._createCallback((payload) => {
            cb(JSON.parse(payload));
        });
        await this._exec('/register/callback/insets', ContentType_1.ContentType.TEXT, cbID);
        return cbID;
    }
    async unregisterInsetHandler(callbackID) {
        await this._exec('/unregister/callback/insets', ContentType_1.ContentType.TEXT, callbackID);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZixLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztRQUVELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDZixLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzFELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxPQUFPLENBQUMsQ0FBVTtRQUNyQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQVksRUFBRSxHQUFZO1FBQzVDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDekIsQ0FBQztRQUVELElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDNUIsSUFBSSxHQUFHLENBQUMsTUFBTSxL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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7O0FBRW5EO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGFBQWE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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bEMsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNiLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM3QyxJQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDN0IsQ0FBQztRQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVULElBQUksS0FBSyxHQUFZLE1BQU0sT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pELFVBQVUsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWpELDhDQUE4QztRQUM5QywyQkFBMkI7UUFDM0IsTUFBTTtJQUNWLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFTCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLElBQUksRUFBRTtRQUMvQixJQUFJLElBQUksR0FBRyxNQUFNLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFFRCxNQUFjLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztJQUV0QyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDbEQsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLGdCQUFTLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFHM0csQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Fic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9Db250ZW50VHlwZS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VBUEkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlQVBJRmFjdG9yeS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VBUElSZXNwb25zZS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VDYWxsYmFja01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlQ29udGV4dC50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VDb250ZXh0QnVpbGRlci50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VDb250ZXh0RmFjdG9yeS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VFcnJvci50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VMb2dnZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlTG9nZ2VyRmFjdG9yeS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VMb2dnZXJMZXZlbC50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlUGVybWlzc2lvblJlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlUGVybWlzc2lvblN0YXRlLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vRnVzZVBsdWdpbi50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VSZXNwb25zZVJlYWRlci50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VTZXJpYWxpemVyLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vSFRUUEZ1c2VBUEkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9QbGF0Zm9ybS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL1BsYXRmb3JtUmVzb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9WZXJzaW9uLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vYW5kcm9pZC9BbmRyb2lkRnVzZUNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9hbmRyb2lkL0FuZHJvaWRGdXNlTG9nZ2VyLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vYW5kcm9pZC9BbmRyb2lkU2NoZW1lRnVzZUFQSS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL2FwaS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL2lvcy9JT1NGdXNlQ29udGV4dC50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL2lvcy9JT1NGdXNlTG9nZ2VyLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vaW9zL0lPU1NjaGVtZUZ1c2VBUEkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9wbHVnaW5zL0Z1c2VSdW50aW1lLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vRWNob1BsdWdpbi50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL2luZGV4LmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvbWF4LmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvbWQ1LmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvbmlsLmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvcGFyc2UuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3NoYTEuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92MS5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3YxVG9WNi5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3YzLmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjM1LmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92NS5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3Y2LmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjZUb1YxLmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjcuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIiwid2VicGFjazovL3Rlc3RhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGVzdGFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Rlc3RhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vc3JjL0FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7RnVzZUFQSX0gZnJvbSAnLi9GdXNlQVBJJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9QbGF0Zm9ybSc7XG5cbi8qKlxuICogQW4gZmFjdG9yeSBjbGFzcyB0aGF0IGRlZmluZXMgdGhlIGJhc2Ugc2lnbmF0dXJlIGZvciBjcmVhdGluZyBhIEZ1c2VBUEkgYnJpZGdlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0RnVzZUFQSUZhY3Rvcnkge1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50IGEgY3JlYXRlIEFQSSB0aGF0IHJldHVybnMgYSBGdXNlQVBJIGZvciB0aGUgZ2l2ZW4gUGxhdGZvcm1cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gcGxhdGZvcm0gLSBUaGUgY3VycmVudCBwbGF0Zm9ybSBydW50aW1lXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGNyZWF0ZShwbGF0Zm9ybTogUGxhdGZvcm0pOiBGdXNlQVBJO1xufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBJRnVzZUxvZ2dlciB9IGZyb20gXCIuL0lGdXNlTG9nZ2VyXCI7XG5cbi8qKlxuICogQW4gRnVzZUxvZ2dlciBmYWN0b3J5IGZvciBjcmVhdGluZyBsb2dnaW5nIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0RnVzZUxvZ2dlckZhY3Rvcnkge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdG8gY3JlYXRlIGEgRnVzZUxvZ2dlclxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBjcmVhdGUoKTogSUZ1c2VMb2dnZXI7XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogU29tZSBjb21tb24gZGF0YSB0eXBlc1xuICovXG5leHBvcnQgZW51bSBDb250ZW50VHlwZSB7XG4gICAgVEVYVCAgICAgICAgICAgID0gJ3RleHQvcGxhaW4nLFxuICAgIEpTT04gICAgICAgICAgICA9ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICBKQVZBU0NSSVBUICAgICAgPSAndGV4dC9qYXZhc2NyaXB0JywgLy8gUkZDIDkyMzlcbiAgICBXQVNNICAgICAgICAgICAgPSAnYXBwbGljYXRpb24vd2FzbScsXG4gICAgQklOQVJZICAgICAgICAgID0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSdcbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgRnVzZUFQSVJlc3BvbnNlIH0gZnJvbSAnLi9GdXNlQVBJUmVzcG9uc2UnO1xuaW1wb3J0IHsgVFNlcmlhbGl6YWJsZSB9IGZyb20gJy4vVFNlcmlhbGl6YWJsZSc7XG5pbXBvcnQgeyBGdXNlU2VyaWFsaXplciB9IGZyb20gJy4vRnVzZVNlcmlhbGl6ZXInO1xuaW1wb3J0IHsgRnVzZUNhbGxiYWNrTWFuYWdlciwgVEZ1c2VBUElDYWxsYmFja0hhbmRsZXIgfSBmcm9tICcuL0Z1c2VDYWxsYmFja01hbmFnZXInO1xuXG4vKipcbiAqIEdlbmVyaWMgQVBJIHJlc3BvbnNlIGRhdGEgdHlwZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRGdXNlQVBJUmVzcG9uc2VEYXRhIHtcbiAgICBrZWVwOiBib29sZWFuO1xuICAgIGRhdGE/OiBCbG9iO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGdXNlQVBJQ2FsbFBhY2tldCB7XG4gICAgcm91dGU6IHN0cmluZztcbiAgICBjYWxsYmFja0lEOiBzdHJpbmc7XG4gICAgYm9keTogQmxvYjtcbiAgICBjb250ZW50VHlwZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIHRoZSBGdXNlIEFQSSBicmlkZ2UgZm9yIGV4Y2hhbmdpbmcgZGF0YSB3aXRoIHRoZSBuYXRpdmUgcGxhdGZvcm1cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZ1c2VBUEkge1xuXG4gICAgcHJpdmF0ZSAkc2VyaWFsaXplcjogRnVzZVNlcmlhbGl6ZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuJHNlcmlhbGl6ZXIgPSB0aGlzLl9jcmVhdGVTZXJpYWxpemVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVTZXJpYWxpemVyKCk6IEZ1c2VTZXJpYWxpemVyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGdXNlU2VyaWFsaXplcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZXJpYWxpemVyKCk6IEZ1c2VTZXJpYWxpemVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNlcmlhbGl6ZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdG8gaW1wbGVtZW50IGV4ZWN1dGUgbmF0aXZlIGJyaWRnZSBsb2dpY1xuICAgICAqIFxuICAgICAqIEBwYXJhbSBwbHVnaW5JRCAtIFRoZSBwbHVnaW4gSURcbiAgICAgKiBAcGFyYW0gbWV0aG9kIC0gQVBJIG1ldGhvZFxuICAgICAqIEBwYXJhbSBhcmdzIC0gQVBJIGFyZ3VtZW50cyBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2V4ZWN1dGUocGx1Z2luSUQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGNvbnRlbnRUeXBlOiBzdHJpbmcsIGFyZ3M6IEJsb2IpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT47XG5cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZVJvdXRlKHBsdWdpbklEOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAvYXBpLyR7cGx1Z2luSUR9JHttZXRob2R9YDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZXhlY3V0ZShwbHVnaW5JRDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgY29udGVudFR5cGU6IHN0cmluZywgYXJnczogVFNlcmlhbGl6YWJsZSk6IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leGVjdXRlKHBsdWdpbklELCBtZXRob2QsIGNvbnRlbnRUeXBlLCB0aGlzLiRzZXJpYWxpemVyLnNlcmlhbGl6ZShhcmdzKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZUNhbGxiYWNrQ29udGV4dChjYjogVEZ1c2VBUElDYWxsYmFja0hhbmRsZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gRnVzZUNhbGxiYWNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUNhbGxiYWNrKGNiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVsZWFzZUNhbGxiYWNrKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgRnVzZUNhbGxiYWNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VDYWxsYmFjayhpZCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSAnLi9BYnN0cmFjdEZ1c2VBUElGYWN0b3J5JztcbmltcG9ydCB7IEZ1c2VBUEkgfSBmcm9tICcuL0Z1c2VBUEknO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL1BsYXRmb3JtJztcbmltcG9ydCB7IElPU1NjaGVtZUZ1c2VBUEkgfSBmcm9tIFwiLi9pb3MvSU9TU2NoZW1lRnVzZUFQSVwiO1xuaW1wb3J0IHsgQW5kcm9pZFNjaGVtZUZ1c2VBUEkgfSBmcm9tICcuL2FuZHJvaWQvQW5kcm9pZFNjaGVtZUZ1c2VBUEknO1xuXG4vKipcbiAqIEEgRnVzZUFQSSBmYWN0b3J5IHRoYXQgdXNlcyB0aGUgSFRUUC9hcHAgc2NoZW1lIGFzIHRoZSBicmlkZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlQVBJRmFjdG9yeSBleHRlbmRzIEFic3RyYWN0RnVzZUFQSUZhY3Rvcnkge1xuICAgIFxuICAgIHByaXZhdGUgJGlvc1NjaGVtZTogRnVzZUFQSTtcbiAgICBwcml2YXRlICRhbmRyb2lkU2NoZW1lOiBGdXNlQVBJO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIFJlYWxpc3RpY2FsbHkgdGhlcmUgd2lsbCBvbmx5IGJlIG9uZSBvciB0aGUgb3RoZXIgc2V0LlxuICAgICAgICB0aGlzLiRpb3NTY2hlbWUgPSBudWxsO1xuICAgICAgICB0aGlzLiRhbmRyb2lkU2NoZW1lID0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3ZlcnJpZGUgY3JlYXRlKHBsYXRmb3JtOiBQbGF0Zm9ybSk6IEZ1c2VBUEkge1xuICAgICAgICBzd2l0Y2ggKHBsYXRmb3JtKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLklPUzogcmV0dXJuIHRoaXMuX2NyZWF0ZWlPU0FQSSgpO1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5BTkRST0lEOiByZXR1cm4gdGhpcy5fY3JlYXRlQW5kcm9pZEFQSSgpO1xuICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBwbGF0Zm9ybTogJyArIHBsYXRmb3JtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY3JlYXRlaU9TQVBJKCk6IEZ1c2VBUEkge1xuICAgICAgICBpZiAoIXRoaXMuJGlvc1NjaGVtZSkge1xuICAgICAgICAgICAgdGhpcy4kaW9zU2NoZW1lID0gbmV3IElPU1NjaGVtZUZ1c2VBUEkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kaW9zU2NoZW1lO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY3JlYXRlQW5kcm9pZEFQSSgpOiBGdXNlQVBJIHtcbiAgICAgICAgaWYgKCF0aGlzLiRhbmRyb2lkU2NoZW1lKSB7XG4gICAgICAgICAgICB0aGlzLiRhbmRyb2lkU2NoZW1lID0gbmV3IEFuZHJvaWRTY2hlbWVGdXNlQVBJKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJGFuZHJvaWRTY2hlbWU7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBGdXNlUmVzcG9uc2VSZWFkZXIgfSBmcm9tIFwiLi9GdXNlUmVzcG9uc2VSZWFkZXJcIjtcbmltcG9ydCB7IEZ1c2VFcnJvciwgSUZ1c2VFcnJvclNlcmlhbGl6ZWQgfSBmcm9tICcuL0Z1c2VFcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBGdXNlQVBJUmVzcG9uc2Uge1xuICAgIHByaXZhdGUgJGNvbnRlbnQ6IEFycmF5QnVmZmVyO1xuICAgIHByaXZhdGUgJGhlYWRlcnM6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgICBwcml2YXRlICRzdGF0dXM6IG51bWJlcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZW50OiBBcnJheUJ1ZmZlciwgaGVhZGVyczogc3RyaW5nIHwgbnVsbCwgc3RhdHVzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy4kc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB0aGlzLiRjb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy4kaGVhZGVycyA9IHRoaXMuJHBhcnNlSGVhZGVycyhoZWFkZXJzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNFcnJvcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHN0YXR1cyA+PSA0MDA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbnRlbnRMZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgbGVuU3RyOiBzdHJpbmcgPSB0aGlzLiRoZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk/LlswXTtcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gcGFyc2VJbnQobGVuU3RyKTtcbiAgICAgICAgaWYgKGlzTmFOKGxlbmd0aCkpIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q29udGVudFR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKT8uWzBdO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWFkQXNBcnJheUJ1ZmZlcigpOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjb250ZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWFkQXNCbG9iKCk6IFByb21pc2U8QmxvYj4ge1xuICAgICAgICByZXR1cm4gbmV3IEJsb2IoW3RoaXMuJGNvbnRlbnRdKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVhZEFzVGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgRnVzZVJlc3BvbnNlUmVhZGVyLnJlYWRBc1RleHQodGhpcy4kY29udGVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlYWRBc0pTT048VCA9IHVua25vd24+KCk6IFByb21pc2U8VD4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgRnVzZVJlc3BvbnNlUmVhZGVyLnJlYWRBc0pTT04odGhpcy4kY29udGVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlYWRBc0Vycm9yKCk6IFByb21pc2U8RnVzZUVycm9yPiB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRFcnJvcjogSUZ1c2VFcnJvclNlcmlhbGl6ZWQgPSBhd2FpdCBGdXNlUmVzcG9uc2VSZWFkZXIucmVhZEFzSlNPTih0aGlzLiRjb250ZW50KTtcbiAgICAgICAgcmV0dXJuIEZ1c2VFcnJvci5mcm9tU2VyaWFsaXplZChzZXJpYWxpemVkRXJyb3IpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRIZWFkZXJzKCk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRoZWFkZXJzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRIZWFkZXIoa2V5OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRoZWFkZXJzLmdldChrZXkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgJHBhcnNlSGVhZGVycyhoZWFkZXJzOiBzdHJpbmcgfCBudWxsKTogTWFwPHN0cmluZywgc3RyaW5nW10+IHtcbiAgICAgICAgY29uc3QgbWFwOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4gPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gaGVhZGVycy5zcGxpdCgnXFxyXFxuJyk7XG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGluZTogc3RyaW5nW10gPSBsaW5lc1tpXS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgY29uc3Qga2V5OiBzdHJpbmcgPSBsaW5lWzBdO1xuICAgICAgICAgICAgaWYgKCFtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICBtYXAuc2V0KGtleSwgW10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJWYWx1ZTogc3RyaW5nW10gPSBtYXAuZ2V0KGtleSk7XG4gICAgICAgICAgICBoZWFkZXJWYWx1ZS5wdXNoKGxpbmVbMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7XG4gICAgVE5hdGl2ZUNhbGxiYWNrRnVuY3Rpb25cbn0gZnJvbSAnLi9pbnRlcm5hbHMnO1xuaW1wb3J0ICogYXMgVVVJRCBmcm9tICd1dWlkJztcblxuZXhwb3J0IHR5cGUgVEZ1c2VBUElDYWxsYmFja0hhbmRsZXIgPSAoZGF0YTogc3RyaW5nKSA9PiB2b2lkO1xuXG53aW5kb3cuX19idGZ1c2VfY2FsbGJhY2tzID0gbmV3IE1hcDxzdHJpbmcsIFROYXRpdmVDYWxsYmFja0Z1bmN0aW9uPigpO1xuXG53aW5kb3cuX19idGZ1c2VfZG9DYWxsYmFjayA9IGZ1bmN0aW9uKGNhbGxiYWNrSUQ6IHN0cmluZywgZGF0YTogc3RyaW5nKSB7XG4gICAgaWYgKGNhbGxiYWNrSUQgJiYgd2luZG93Ll9fYnRmdXNlX2NhbGxiYWNrcy5oYXMoY2FsbGJhY2tJRCkpIHtcbiAgICAgICAgd2luZG93Ll9fYnRmdXNlX2NhbGxiYWNrcy5nZXQoY2FsbGJhY2tJRCkoZGF0YSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBBIHNpbmdsZXRvbiBtYW5hZ2VyIHRvIG1hbmFnZSBuYXRpdmUgY2FsbGJhY2tzLlxuICogXG4gKiBDcmVhdGUgYSBjYWxsYmFjayBjb250ZXh0IGFuZCBwYXNzIHRoZSByZXR1cm4gY29udGV4dCBpZCB0byBuYXRpdmUgY2xpZW50cyxcbiAqIGluIHdoaWNoIHRoZXkgY2FuIHVzZSB0byByZXNwb25kIGJhY2suXG4gKiBcbiAqIE5vdGUgdGhhdCBwbHVnaW4gQVBJcyBhcmUgZmFyIG1vcmUgZWZmaWNpZW50IGFuZCBjYW4gaGFuZGxlIGEgZGl2ZXJzZSBzZXQgb2YgZGF0YSxcbiAqIGluY2x1ZGluZyBsYXJnZSBwYXlsb2Fkcywgc28gd2hlbiBwb3NzaWJsZSBpdCdzIGJlc3QgdG8gdXNlIGEgcGx1Z2luIEFQSSBpbnN0ZWFkIG9mIGFcbiAqIGNhbGxiYWNrIEFQSS5cbiAqIFxuICogVGhpcyBjYWxsYmFjayBBUEkgaXMgaG93ZXZlciwgdXNlZnVsIGZvciBidWlsZGluZyBsaXN0ZW5lciBraW5kIG9mIHNlcnZpY2VzIHdoZXJlIHRoZSBuYXRpdmVcbiAqIG5lZWRzIHRvIGNvbnRpbm91c2x5IGNhbGxiYWNrIHRvIHRoZSB3ZWJ2aWV3IHdpdGggc21hbGwgZGF0YSBwYWNrZXRzLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZUNhbGxiYWNrTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgJGluc3RhbmNlOiBGdXNlQ2FsbGJhY2tNYW5hZ2VyO1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEZ1c2VDYWxsYmFja01hbmFnZXIge1xuICAgICAgICBpZiAoIUZ1c2VDYWxsYmFja01hbmFnZXIuJGluc3RhbmNlKSB7XG4gICAgICAgICAgICBGdXNlQ2FsbGJhY2tNYW5hZ2VyLiRpbnN0YW5jZSA9IG5ldyBGdXNlQ2FsbGJhY2tNYW5hZ2VyKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRnVzZUNhbGxiYWNrTWFuYWdlci4kaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZUNhbGxiYWNrKGNiOiBURnVzZUFQSUNhbGxiYWNrSGFuZGxlcik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGlkOiBzdHJpbmcgPSBVVUlELnY0KCk7XG4gICAgICAgIHdpbmRvdy5fX2J0ZnVzZV9jYWxsYmFja3Muc2V0KGlkLCAoZGF0YTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgICAgICAgICBjYihkYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWxlYXNlQ2FsbGJhY2soaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB3aW5kb3cuX19idGZ1c2VfY2FsbGJhY2tzLmRlbGV0ZShpZCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSAnLi9BYnN0cmFjdEZ1c2VBUElGYWN0b3J5JztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSBcIi4vUGxhdGZvcm1cIjtcbmltcG9ydCB7XG4gICAgRnVzZVJ1bnRpbWUsXG4gICAgSVJ1bnRpbWVJbmZvLFxuICAgIFRQYXVzZUNhbGxiYWNrSGFuZGxlcixcbiAgICBUUmVzdW1lQ2FsbGJhY2tIYW5kbGVyXG59IGZyb20gJy4vcGx1Z2lucy9GdXNlUnVudGltZSc7XG5pbXBvcnQge1ZlcnNpb259IGZyb20gJy4vVmVyc2lvbic7XG5pbXBvcnQge0lGdXNlTG9nZ2VyfSBmcm9tICcuL0lGdXNlTG9nZ2VyJztcbmltcG9ydCB7IEFic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnkgfSBmcm9tICcuL0Fic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnknO1xuXG4vKipcbiAqIEEgY29udGV4dCBjbGFzcyB0aGF0IGhvbGRzIEZ1c2UgRnJhbWV3b3JrIHN0YXRlXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGdXNlQ29udGV4dCB7XG4gICAgcHJpdmF0ZSAkcGxhdGZvcm06IFBsYXRmb3JtO1xuICAgIHByaXZhdGUgJHJ1bnRpbWU6IEZ1c2VSdW50aW1lO1xuICAgIHByaXZhdGUgJHJ1bnRpbWVWZXJzaW9uOiBWZXJzaW9uO1xuICAgIHByaXZhdGUgJHJ1bnRpbWVJbmZvOiBJUnVudGltZUluZm87XG4gICAgcHJpdmF0ZSAkZGVmYXVsdEFQSUZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnk7XG4gICAgcHJpdmF0ZSAkbG9nZ2VyOiBJRnVzZUxvZ2dlcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgICAgICBhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5LFxuICAgICAgICBsb2dnZXI6IElGdXNlTG9nZ2VyXG4gICAgKSB7XG4gICAgICAgIHRoaXMuJHBsYXRmb3JtID0gcGxhdGZvcm07XG4gICAgICAgIHRoaXMuJGxvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuJHJ1bnRpbWVWZXJzaW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy4kZGVmYXVsdEFQSUZhY3RvcnkgPSBhcGlGYWN0b3J5O1xuICAgICAgICB0aGlzLiRydW50aW1lID0gbmV3IEZ1c2VSdW50aW1lKHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRMb2dnZXIoKTogSUZ1c2VMb2dnZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kbG9nZ2VyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREZWZhdWx0QVBJRmFjdG9yeSgpOiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGRlZmF1bHRBUElGYWN0b3J5O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQbGF0Zm9ybSgpOiBQbGF0Zm9ybSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRwbGF0Zm9ybTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2dldFJ1bnRpbWUoKTogRnVzZVJ1bnRpbWUge1xuICAgICAgICByZXR1cm4gdGhpcy4kcnVudGltZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jICRnZXRSdW50aW1lSW5mbygpOiBQcm9taXNlPElSdW50aW1lSW5mbz4ge1xuICAgICAgICBpZiAoIXRoaXMuJHJ1bnRpbWVJbmZvKSB7XG4gICAgICAgICAgICB0aGlzLiRydW50aW1lSW5mbyA9IGF3YWl0IHRoaXMuJHJ1bnRpbWUuZ2V0SW5mbygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJHJ1bnRpbWVJbmZvO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBnZXRQbGF0Zm9ybVZlcnNpb24oKTogUHJvbWlzZTxWZXJzaW9uPiB7XG4gICAgICAgIGlmICghdGhpcy4kcnVudGltZVZlcnNpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm86IElSdW50aW1lSW5mbyA9IGF3YWl0IHRoaXMuJGdldFJ1bnRpbWVJbmZvKCk7XG4gICAgICAgICAgICB0aGlzLiRydW50aW1lVmVyc2lvbiA9IFZlcnNpb24ucGFyc2VWZXJzaW9uU3RyaW5nKGluZm8udmVyc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLiRydW50aW1lVmVyc2lvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgaXNEZWJ1Z01vZGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGluZm86IElSdW50aW1lSW5mbyA9IGF3YWl0IHRoaXMuJGdldFJ1bnRpbWVJbmZvKCk7XG4gICAgICAgIHJldHVybiBpbmZvLmRlYnVnTW9kZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXJQYXVzZUhhbmRsZXIoY2FsbGJhY2s6IFRQYXVzZUNhbGxiYWNrSGFuZGxlcik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLiRydW50aW1lLnJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdW5yZWdpc3RlclBhdXNlSGFuZGxlcihjYWxsYmFja0lEOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuJHJ1bnRpbWUudW5yZWdpc3RlclBhdXNlSGFuZGxlcihjYWxsYmFja0lEKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXJSZXN1bWVIYW5kbGVyKGNhbGxiYWNrOiBUUmVzdW1lQ2FsbGJhY2tIYW5kbGVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuJHJ1bnRpbWUucmVnaXN0ZXJSZXN1bWVIYW5kbGVyKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdW5yZWdpc3RlclJlc3VtZUhhbmRsZXIoY2FsbGJhY2tJRDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLiRydW50aW1lLnVucmVnaXN0ZXJSZXN1bWVIYW5kbGVyKGNhbGxiYWNrSUQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhYnN0cmFjdCBvbldlYnZpZXdSZWFkeSgpOiBQcm9taXNlPHZvaWQ+O1xufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSBcIi4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeVwiO1xuaW1wb3J0IHsgQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSB9IGZyb20gXCIuL0Fic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnlcIjtcbmltcG9ydCB7IEFuZHJvaWRGdXNlQ29udGV4dCB9IGZyb20gJy4vYW5kcm9pZC9BbmRyb2lkRnVzZUNvbnRleHQnO1xuaW1wb3J0IHsgRnVzZUFQSUZhY3RvcnkgfSBmcm9tIFwiLi9GdXNlQVBJRmFjdG9yeVwiO1xuaW1wb3J0IHsgRnVzZUNvbnRleHQgfSBmcm9tIFwiLi9GdXNlQ29udGV4dFwiO1xuaW1wb3J0IHsgRnVzZUNvbnRleHRGYWN0b3J5IH0gZnJvbSAnLi9GdXNlQ29udGV4dEZhY3RvcnknO1xuaW1wb3J0IHsgRnVzZUxvZ2dlckZhY3RvcnkgfSBmcm9tIFwiLi9GdXNlTG9nZ2VyRmFjdG9yeVwiO1xuaW1wb3J0IHsgRnVzZUxvZ2dlckxldmVsIH0gZnJvbSBcIi4vRnVzZUxvZ2dlckxldmVsXCI7XG5pbXBvcnQgeyBJRnVzZUxvZ2dlciB9IGZyb20gXCIuL0lGdXNlTG9nZ2VyXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gXCIuL1BsYXRmb3JtXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybVJlc29sdmVyIH0gZnJvbSBcIi4vUGxhdGZvcm1SZXNvbHZlclwiO1xuXG5leHBvcnQgY2xhc3MgRnVzZUNvbnRleHRCdWlsZGVyIHtcbiAgICBwcml2YXRlICRwbGF0Zm9ybVJlc29sdmVyOiBQbGF0Zm9ybVJlc29sdmVyO1xuICAgIHByaXZhdGUgJGxvZ2dlckZhY3Rvcnk6IEFic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnkgfCBudWxsO1xuICAgIHByaXZhdGUgJGFwaUZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3RvcnkgfCBudWxsO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLiRsb2dnZXJGYWN0b3J5ID0gbnVsbDtcbiAgICAgICAgdGhpcy4kYXBpRmFjdG9yeSA9IG51bGw7XG4gICAgICAgIHRoaXMuJHBsYXRmb3JtUmVzb2x2ZXIgPSBuZXcgUGxhdGZvcm1SZXNvbHZlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRQbGF0Zm9ybVJlc29sdmVyKHJlc29sdmVyOiBQbGF0Zm9ybVJlc29sdmVyKTogRnVzZUNvbnRleHRCdWlsZGVyIHtcbiAgICAgICAgdGhpcy4kcGxhdGZvcm1SZXNvbHZlciA9IHJlc29sdmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0QVBJRmFjdG9yeShmYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5KTogRnVzZUNvbnRleHRCdWlsZGVyIHtcbiAgICAgICAgdGhpcy4kYXBpRmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRMb2dnZXJGYWN0b3J5KGZhY3Rvcnk6IEFic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnkpOiBGdXNlQ29udGV4dEJ1aWxkZXIge1xuICAgICAgICB0aGlzLiRsb2dnZXJGYWN0b3J5ID0gZmFjdG9yeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIF9pc0RlYnVnTW9kZShjb250ZXh0OiBGdXNlQ29udGV4dCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgY29udGV4dC5pc0RlYnVnTW9kZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBidWlsZCgpOiBQcm9taXNlPEZ1c2VDb250ZXh0PiB7XG4gICAgICAgIGNvbnN0IHBsYXRmb3JtOiBQbGF0Zm9ybSA9IHRoaXMuJHBsYXRmb3JtUmVzb2x2ZXIucmVzb2x2ZSgpO1xuXG4gICAgICAgIGxldCBhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5O1xuICAgICAgICBpZiAodGhpcy4kYXBpRmFjdG9yeSkge1xuICAgICAgICAgICAgYXBpRmFjdG9yeSA9IHRoaXMuJGFwaUZhY3Rvcnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhcGlGYWN0b3J5ID0gbmV3IEZ1c2VBUElGYWN0b3J5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG9nZ2VyRmFjdG9yeTogQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeTtcbiAgICAgICAgaWYgKHRoaXMuJGxvZ2dlckZhY3RvcnkpIHtcbiAgICAgICAgICAgIGxvZ2dlckZhY3RvcnkgPSB0aGlzLiRsb2dnZXJGYWN0b3J5XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXJGYWN0b3J5ID0gbmV3IEZ1c2VMb2dnZXJGYWN0b3J5KHBsYXRmb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRleHRGYWN0b3J5OiBGdXNlQ29udGV4dEZhY3RvcnkgPSBuZXcgRnVzZUNvbnRleHRGYWN0b3J5KCk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQ6IEZ1c2VDb250ZXh0ID0gY29udGV4dEZhY3RvcnkuY3JlYXRlKHBsYXRmb3JtLCBhcGlGYWN0b3J5LCBsb2dnZXJGYWN0b3J5LmNyZWF0ZSgpKTtcblxuICAgICAgICBjb25zdCBpc0RlYnVnTW9kZTogYm9vbGVhbiA9IGF3YWl0IHRoaXMuX2lzRGVidWdNb2RlKGNvbnRleHQpO1xuICAgICAgICBjb25zdCBsb2dnZXI6IElGdXNlTG9nZ2VyID0gY29udGV4dC5nZXRMb2dnZXIoKTtcbiAgICAgICAgbG9nZ2VyLmVuYWJsZU5hdGl2ZUJyaWRnZShpc0RlYnVnTW9kZSk7XG4gICAgICAgIGxldCBsZXZlbDogRnVzZUxvZ2dlckxldmVsID0gbG9nZ2VyLmdldExldmVsKCk7XG4gICAgICAgIGxldmVsIHw9IEZ1c2VMb2dnZXJMZXZlbC5ERUJVRztcbiAgICAgICAgbG9nZ2VyLnNldExldmVsKGxldmVsKTtcblxuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyNCBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IEFic3RyYWN0RnVzZUFQSUZhY3RvcnkgfSBmcm9tICcuL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnknO1xuaW1wb3J0IHsgQW5kcm9pZEZ1c2VDb250ZXh0IH0gZnJvbSAnLi9hbmRyb2lkL0FuZHJvaWRGdXNlQ29udGV4dCc7XG5pbXBvcnQgeyBGdXNlQ29udGV4dCB9IGZyb20gJy4vRnVzZUNvbnRleHQnO1xuaW1wb3J0IHsgSUZ1c2VMb2dnZXIgfSBmcm9tICcuL0lGdXNlTG9nZ2VyJztcbmltcG9ydCB7IElPU0Z1c2VDb250ZXh0IH0gZnJvbSAnLi9pb3MvSU9TRnVzZUNvbnRleHQnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL1BsYXRmb3JtJztcblxuZXhwb3J0IGNsYXNzIEZ1c2VDb250ZXh0RmFjdG9yeSB7XG4gICAgcHVibGljIGNyZWF0ZShwbGF0Zm9ybTogUGxhdGZvcm0sIGFwaUZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3RvcnksIGxvZ2dlcjogSUZ1c2VMb2dnZXIpOiBGdXNlQ29udGV4dCB7XG4gICAgICAgIHN3aXRjaCAocGxhdGZvcm0pIHtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uQU5EUk9JRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFuZHJvaWRGdXNlQ29udGV4dChhcGlGYWN0b3J5LCBsb2dnZXIpO1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5JT1M6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJT1NGdXNlQ29udGV4dChhcGlGYWN0b3J5LCBsb2dnZXIpO1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5URVNUOiByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgSVNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL0lTZXJpYWxpemFibGVcIjtcbmltcG9ydCB7IFRGdXNlU2VyaWFsaXphYmxlIH0gZnJvbSBcIi4vVFNlcmlhbGl6YWJsZVwiO1xuXG4vKipcbiAqIEEgdW5pb24gb2YgYWNjZXB0YWJsZSB0eXBlIGZvciBlcnJvciBjYXVzZXMuXG4gKi9cbmV4cG9ydCB0eXBlIFRGdXNlRXJyb3JDYXVzZSA9IHN0cmluZyB8IEVycm9yIHwgRnVzZUVycm9yIHwgbnVsbDtcblxuaW50ZXJmYWNlIF9JRnVzZUVycm9yU2VyaWFsaXplZCB7XG4gICAgZG9tYWluOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBzdGFjaz86IHN0cmluZztcbn1cblxuLyoqXG4gKiBBIHR5cGUgdGhhdCByZXByZXNlbnRzIGEgZnVzZSBlcnJvciBpbiBhIHNlcmlhbGl6ZWQgc3RhdGUuXG4gKi9cbmV4cG9ydCB0eXBlIElGdXNlRXJyb3JTZXJpYWxpemVkID0gVEZ1c2VTZXJpYWxpemFibGU8X0lGdXNlRXJyb3JTZXJpYWxpemVkPjtcblxuLyoqXG4gKiBBIHN0cnVjdHVyZWQgZXJyb3Igb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgRnVzZUVycm9yIGV4dGVuZHMgRXJyb3IgaW1wbGVtZW50cyBJU2VyaWFsaXphYmxlIHtcbiAgICBwcml2YXRlICRkb21haW46IHN0cmluZztcbiAgICBwcml2YXRlICRtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSAkY2F1c2U6IFRGdXNlRXJyb3JDYXVzZTtcbiAgICBwcml2YXRlICRjb2RlOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZG9tYWluIC0gVGhlIGVycm9yIGRvbWFpbiwgdXN1YWxseSByZXByZXNlbnRzIGEgbGlicmFyeSwgY2xhc3MsIG9yIHBsdWdpbi5cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSAtIFRoZSBlcnJvciBtZXNzYWdlXG4gICAgICogQHBhcmFtIGNhdXNlIC0gVGhlIHVuZGVybHlpbmcgY2F1c2Ugb2YgdGhlIGVycm9yLiBNYXkgYmUgbnVsbC5cbiAgICAgKiBAcGFyYW0gY29kZSAtIEFuIGVycm9yIGNvZGUuIE1heSBiZSBudWxsLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihkb21haW46IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjYXVzZT86IFRGdXNlRXJyb3JDYXVzZSwgY29kZT86IG51bWJlcikge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB0aGlzLiRkb21haW4gPSBkb21haW47XG4gICAgICAgIHRoaXMuJG1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLiRjb2RlID0gY29kZSB8fCAwO1xuICAgICAgICB0aGlzLiRjYXVzZSA9IGNhdXNlIHx8IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGVycm9yIG1lc3NhZ2VcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0TWVzc2FnZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy4kbWVzc2FnZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgZXJyb3IgZG9tYWluLCB1c3VhbGx5IHJlcHJlc2VudGluZyBhIGxpYnJhcnksIGNsYXNzLCBvciBwbHVnaW4uXG4gICAgICovXG4gICAgcHVibGljIGdldERvbWFpbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy4kZG9tYWluO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBlcnJvciBjb2RlXG4gICAgICovXG4gICAgcHVibGljIGdldENvZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvZGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIHVuZGVybHlpbmcgY2F1c2Ugb2YgdGhlIGVycm9yLCBpZiBrbm93bi4gTWF5IGJlIG51bGwuXG4gICAgICovXG4gICAgcHVibGljIGdldENhdXNlKCk6IFRGdXNlRXJyb3JDYXVzZSB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy4kY2F1c2U7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIEEgc2VyaWFsaXplZCBvYmplY3QgcmVwcmVzZW50aW5nIGFuIGVycm9yLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXJpYWxpemUoKTogSUZ1c2VFcnJvclNlcmlhbGl6ZWQge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZG9tYWluOiB0aGlzLmdldERvbWFpbigpLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5nZXRNZXNzYWdlKCksXG4gICAgICAgICAgICBjb2RlOiB0aGlzLmdldENvZGUoKSxcbiAgICAgICAgICAgIHN0YWNrOiB0aGlzLnN0YWNrXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JhcHMgdGhlIGdpdmVuIG9iamVjdCBpbnRvIGEgRnVzZUVycm9yIG9iamVjdC4gQWNjZXB0cyBzZXZlcmFsIGRpZmZlcmVudFxuICAgICAqIGZvcm1hdHMsIHdoaWNoIGluZmx1ZW5jZXMgdGhlIGJlaGF2aW91ciBvZiB0aGlzIG1ldGhvZC5cbiAgICAgKiBcbiAgICAgKiBJZiB0aGUgaW5wdXQgaXMgYSBzdHJpbmcsIGEgRnVzZUVycm9yIG9iamVjdCBpcyBjcmVhdGVkIHdpdGggdGhlIHN0cmluZyBhc1xuICAgICAqIHRoZSBlcnJvciBtZXNzYWdlIG9mIGFuIHVua25vd24gZG9tYWluLlxuICAgICAqIFxuICAgICAqIElmIHRoZSBpbnB1dCBpcyBhIEZ1c2VFcnJvciwgdGhlbiB0aGlzIG1ldGhvZCBkb2VzIG5vdGhpbmcgYnV0IHBhc3NlcyB0aHJvdWdoXG4gICAgICogdGhlIEZ1c2VFcnJvci4gVGhlIHJldHVybmVkIEZ1c2VFcnJvciBpcyB0aGUgaW5wdXQgRnVzZUVycm9yLCBhIGNvcHkgaXMgbm90IG1hZGUuXG4gICAgICogXG4gICAgICogSWYgdGhlIGlucHV0IGlzIGFuIEVycm9yLCB0aGVuIGEgRnVzZUVycm9yIGlzIGNyZWF0ZWQgdXNpbmcgdGhlIG5hbWUgYXMgdGhlXG4gICAgICogZG9tYWluLCBhbmQgaXQncyBtZXNzYWdlIGFzIHRoZSBlcnJvciBtZXNzYWdlLiBUaGUgZXJyb3Igb2JqZWN0IGlzIGFsc28gdXNlZFxuICAgICAqIGFzIHRoZSBGdXNlRXJyb3IncyBjYXVzZSBwYXJhbWV0ZXIuXG4gICAgICogXG4gICAgICogSWYgdGhlIGlucHV0IGlzIG9mIHRoZSBzaGFwZSBvZiBJRnVzZUVycm9yU2VyaWFsaXplZCwgdGhlbiB0aGUgb2JqZWN0IGlzXG4gICAgICogZGVzZXJpYWxpemVkIGludG8gYSBGdXNlRXJyb3IgaW5zdGFuY2UuXG4gICAgICogXG4gICAgICogSWYgYW55IG90aGVyIHR5cGUgb2Ygb2JqZWN0IGlzIGdpdmVuLCBhbiBjb25zb2xlIGVycm9yIG1lc3NhZ2Ugd2lsbCBiZSBcbiAgICAgKiBwcmludGVkIGFuZCBhIFwiRnVzZUVycm9yXCIgZG9tYWluIGVycm9yIHdpbGwgYmUgcmV0dXJuZWQgc3RhdGluZyB0aGUgZXJyb3JcbiAgICAgKiBpcyBub3Qgd3JhcHBhYmxlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBlcnJvciAtIEEgdmFsdWUgdGhhdCBjYW4gcmVwcmVzZW50IGFuIGVycm9yXG4gICAgICogQHJldHVybnMgQSBGdXNlRXJyb3IgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHdyYXAoZXJyb3I6IHN0cmluZyB8IEVycm9yIHwgRnVzZUVycm9yIHwgSUZ1c2VFcnJvclNlcmlhbGl6ZWQgfCB1bmtub3duKTogRnVzZUVycm9yIHtcbiAgICAgICAgbGV0IGZlcnI6IEZ1c2VFcnJvciA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBmZXJyID0gbmV3IEZ1c2VFcnJvcignVW5rbm93bicsIGVycm9yLCBudWxsLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEZ1c2VFcnJvcikge1xuICAgICAgICAgICAgZmVyciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGZlcnIgPSBuZXcgRnVzZUVycm9yKGVycm9yLm5hbWUsIGVycm9yLm1lc3NhZ2UsIGVycm9yLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChGdXNlRXJyb3IuJGlzU2VyaWFsaXplZEZ1c2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgIGZlcnIgPSBGdXNlRXJyb3IuZnJvbVNlcmlhbGl6ZWQoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW53cmFwcGFibGUgRXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICBmZXJyID0gbmV3IEZ1c2VFcnJvcignRnVzZUVycm9yJywgJ1Vud3JhcHBhYmxlIGVycm9yJywgbnVsbCwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmVycjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXNlcmlhbGl6ZXMgYW5kIGNyZWF0ZXMgYSBuZXcgRnVzZUVycm9yIGluc3RhbmNlXG4gICAgICogXG4gICAgICogQHBhcmFtIGVycm9yIC0gVGhlIHNlcmlhbGl6ZWQgZXJyb3Igb2JqZWN0XG4gICAgICogQHJldHVybnMgQSBGdXNlRXJyb3IgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21TZXJpYWxpemVkKGVycm9yOiBJRnVzZUVycm9yU2VyaWFsaXplZCk6IEZ1c2VFcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgRnVzZUVycm9yKGVycm9yLmRvbWFpbiwgZXJyb3IubWVzc2FnZSwgbnVsbCwgZXJyb3IuY29kZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gJ0Z1c2VFcnJvcic7XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBwcml2YXRlIHN0YXRpYyAkaXNTZXJpYWxpemVkRnVzZUVycm9yKGVycm9yOiBhbnkpOiBlcnJvciBpcyBJRnVzZUVycm9yU2VyaWFsaXplZCB7XG4gICAgICAgIHJldHVybiAnbWVzc2FnZScgaW4gZXJyb3IgJiYgJ2RvbWFpbicgaW4gZXJyb3IgJiYgJ2NvZGUnIGluIGVycm9yO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtcbiAgICBJRnVzZUxvZ2dlciwgSU5hdGl2ZUxvZ0VudHJ5XG59IGZyb20gJy4vSUZ1c2VMb2dnZXInO1xuaW1wb3J0IHtUU2VyaWFsaXphYmxlfSBmcm9tICcuL1RTZXJpYWxpemFibGUnO1xuaW1wb3J0IHtJU2VyaWFsaXphYmxlfSBmcm9tICcuL0lTZXJpYWxpemFibGUnO1xuaW1wb3J0IHsgRnVzZUxvZ2dlckxldmVsIH0gZnJvbSAnLi9GdXNlTG9nZ2VyTGV2ZWwnO1xuXG4vKipcbiAqIEEgc2VyaWFsaXplciBmb3IgbG9nZ2luZy4gVGhpcyBpcyBkaWZmZXJlbnQgdGhhbiBhIHtAbGluayBGdXNlU2VyaWFsaXplcn0gaW5cbiAqIHRoYXQgaW4gc2VyaWFsaXplciB0cmFuc2Zvcm1zIG9iamVjdHMgaW50byBhIHByaW50YWJsZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlTG9nZ2VyU2VyaWFsaXplciB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHByb3RlY3RlZCBfc2VyaWFsaXplVG9TdHJpbmcob2JqOiBUU2VyaWFsaXphYmxlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVByaW1pdGl2ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZURhdGVUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzSVNlcmlhbGl6YWJsZShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqLnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZUVycm9yVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gYWxsIGVsc2UgZmFpbHMsIGF0dGVtcHQgdG8gSlNPTiBzdHJpbmdpZnlcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgNCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVQcmltaXRpdmVUb1N0cmluZyhvYmo6IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVFcnJvclRvU3RyaW5nKG9iajogRXJyb3IpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkRXJyb3IgPSB7XG4gICAgICAgICAgICBuYW1lOiBvYmoubmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG9iai5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhY2s6IG9iai5zdGFja1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShzZXJpYWxpemVkRXJyb3IsIG51bGwsIDQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2VyaWFsaXplRGF0ZVRvU3RyaW5nKG9iajogRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBvYmoudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIFNlcmlhbGl6ZXMgYW4gb2JqZWN0IGludG8gYSBwcmludGFibGUgc3RyaW5nLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBvYmogLSBUaGUgb2JqZWN0IHRvIHNlcmlhbGl6ZVxuICAgICAqIEByZXR1cm5zIEEgcHJpbnRhYmxlIHN0cmluZ1xuICAgICAqL1xuICAgIHB1YmxpYyBzZXJpYWxpemUob2JqOiBUU2VyaWFsaXphYmxlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3V0OiBzdHJpbmcgPSBudWxsO1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgb3V0ID0gYFtCbG9iICR7b2JqLnR5cGUgfHwgJ0JpbmFyeSd9ICgke29iai5zaXplfSBieXRlcyldYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgb2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgb3V0ID0gdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgb3V0ID0gYFtBcnJheUJ1ZmZlciAoJHtvYmouYnl0ZUxlbmd0aH0gYnl0ZXMpXWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5faXNJU2VyaWFsaXphYmxlKG9iaikpIHtcbiAgICAgICAgICAgIG91dCA9IHRoaXMuc2VyaWFsaXplKG9iai5zZXJpYWxpemUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBzaG91bGQgYmUgZWl0aGVyIEpTT04gb2JqZWN0cyBvciBqc29uIGFycmF5cyBhdCB0aGlzIHBvaW50XG4gICAgICAgICAgICBvdXQgPSB0aGlzLl9zZXJpYWxpemVUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHByb3RlY3RlZCBfaXNJU2VyaWFsaXphYmxlKHg6IGFueSk6IHggaXMgSVNlcmlhbGl6YWJsZSB7XG4gICAgICAgIHJldHVybiAhIXguc2VyaWFsaXplICYmIHR5cGVvZiB4LnNlcmlhbGl6ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG59XG5cbi8qKlxuICogQSBiYXNlIGxvZ2dlciBpbXBsZW1lbnRhdGlvbiB3aGljaCBpbmNsdWRlcyBhIHNlcmlhbGl6ZXIgZm9yIGNvbW1vbiB0eXBlcy5cbiAqIEl0IHdpbGwgc2VyaWFsaXplL2FjY2VwdCBhbGwgdmFsdWVzIHRoYXQgVFNlcmlhbGl6YWJsZSBhY2NlcHRzLCBob3dldmVyIEJsb2IvQXJyYXlCdWZmZXJcbiAqIG9yIG90aGVyIGJpbmFyeSBkYXRhIHR5cGVzIHdpbGwgbm90IGJlIHNlcmlhbGl6ZWQuIEluc3RlYWQgaXQgd2lsbCBwcmludCBhblxuICogb2JqZWN0IGlkZW50aWZpZXIsIHdpdGggbWltZSB0eXBlIGlmIHByZXNlbnQsIGFsb25nIHdpdGggdGhlIHNpemUgb2YgdGhlIGJ1ZmZlci5cbiAqIFxuICogVGhlIGJhc2UgbG9nZ2VyIGRvZXMgbm90IHByb3ZpZGUgYW55IG5hdGl2ZSBicmlkZ2luZy4gV2hpbGUgdXNhYmxlIGZvciBwdXJlbHkgd2VidmlldyBzaWRlLFxuICogdXNlIHRoZSBGdXNlTG9nZ2VyRmFjdG9yeSB0byBnZXQgYSBsb2dnZXIgc3BlY2lmaWMgZm9yIHlvdXIgcnVudGltZSBlbnZpcm9ubWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VMb2dnZXIgaW1wbGVtZW50cyBJRnVzZUxvZ2dlciB7XG4gICAgcHJpdmF0ZSAkbGV2ZWw6IEZ1c2VMb2dnZXJMZXZlbDtcbiAgICBwcml2YXRlICRlbmFibGVOYXRpdmVCcmlkZ2U6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSAkc2VyaWFsaXplcjogRnVzZUxvZ2dlclNlcmlhbGl6ZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuJGVuYWJsZU5hdGl2ZUJyaWRnZSA9IHRydWU7XG4gICAgICAgIHRoaXMuJGxldmVsID0gRnVzZUxvZ2dlckxldmVsLklORk8gfCBGdXNlTG9nZ2VyTGV2ZWwuV0FSTiB8IEZ1c2VMb2dnZXJMZXZlbC5FUlJPUjtcbiAgICAgICAgdGhpcy4kc2VyaWFsaXplciA9IG5ldyBGdXNlTG9nZ2VyU2VyaWFsaXplcigpO1xuICAgICAgICB0aGlzLl9yZWdpc3Rlck5hdGl2ZUNhbGJsYWNrKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9yZWdpc3Rlck5hdGl2ZUNhbGJsYWNrKCk6IHZvaWQge31cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBsZXZlbCAtIEEgYml0bWFzayBvcHRpb24gdG8gaW5kaWNhdGUgd2hpY2ggbGV2ZWxzIHRvIGxvZy5cbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIFRvIHJlcG9ydCBvbiBXQVJOIGFuZCBFUlJPUiBvbmx5LCB5b3Ugd291bGQgc2V0OlxuICAgICAqIFxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsb2dnZXIuc2V0TGV2ZWwoRnVzZUxvZ2dlckxldmVsLldBUk4gfCBGdXNlTG9nZ2VyTGV2ZWwuRVJST1IpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRMZXZlbChsZXZlbDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuJGxldmVsID0gbGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHJldHVybnMgVGhlIGN1cnJlbnQgbG9nIGxldmVsIGJpdG1hc2suXG4gICAgICovXG4gICAgcHVibGljIGdldExldmVsKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRsZXZlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIElmIGVuYWJsZWQsIFRoZSBuYXRpdmUgRnVzZUxvZ2dlciB3aWxsIHBhc3MgbmF0aXZlIGxvZyBtZXNzYWdlcyB0b1xuICAgICAqIHRoZSB3ZWJ2aWV3IGFuZCB3aWxsIGJlIGxvZ2dlZCBpbnRvIHRoZSBKUyBjb25zb2xlLiBMb2dzIHBhc3NlZCB0aHJvdWdoXG4gICAgICogdGhpcyBsb2dnZXIgd2lsbCBhbHNvIGJlIHBhc3NlZCB0byB0aGUgbmF0aXZlIGVudmlyb25tZW50IGFuZCB3aWxsIGJlXG4gICAgICogbG9nZ2VkIGluIHRoZSBuYXRpdmUncyBsb2dnaW5nIGNvbnNvbGUuXG4gICAgICogXG4gICAgICogVGhpcyBjYW4gYmUgaGVscGZ1bCBpbiBkZWJ1Z2dpbmcgd2hlcmUgYWxsIGxvZ3Mgd2lsbCBiZSBpbiB0aGUgc2FtZSBwbGFjZSxcbiAgICAgKiBob3dldmVyLCBsb2dnaW5nIGNhbiBiZSB2ZXJib3NlIGFuZCBjYW4gY2F1c2UgYSBkZWdyYXRpb24gb2YgcGVyZm9ybWFuY2UsXG4gICAgICogdGhlcmVmb3JlIGl0IG1heSBub3QgYmUgZGVzaXJhYmxlIHRvIGhhdmUgZW5hYmxlZCBmb3IgcHJvZHVjdGlvbiBidWlsZHMuXG4gICAgICogXG4gICAgICogVGhpcyBmZWF0dXJlIGlzIGN1cnJlbnRseSBlbmFibGVkIGJ5IGRlZmF1bHQsIGhvd2V2ZXIgdGhpcyBpcyBzdWJqZWN0IHRvXG4gICAgICogY2hhbmdlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBmbGFnIC0gZW5hYmxlcyB0aGUgbmF0aXZlIGJyaWRnZSBsb2dnaW5nIGlmIGVuYWJsZWQuXG4gICAgICovXG4gICAgcHVibGljIGVuYWJsZU5hdGl2ZUJyaWRnZShmbGFnOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuJGVuYWJsZU5hdGl2ZUJyaWRnZSA9ICEhZmxhZztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uTmF0aXZlTG9nRW50cnkoZW50cnk6IElOYXRpdmVMb2dFbnRyeSk6IHZvaWQge1xuICAgICAgICBpZiAoISh0aGlzLmdldExldmVsKCkgJiBlbnRyeS5sZXZlbCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS5sZXZlbCA9PT0gRnVzZUxvZ2dlckxldmVsLlNJTEVOVCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChlbnRyeS5sZXZlbCkge1xuICAgICAgICAgICAgY2FzZSBGdXNlTG9nZ2VyTGV2ZWwuREVCVUc6XG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhlbnRyeS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRnVzZUxvZ2dlckxldmVsLklORk86XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGVudHJ5Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBGdXNlTG9nZ2VyTGV2ZWwuV0FSTjpcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZW50cnkubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZ1c2VMb2dnZXJMZXZlbC5FUlJPUjpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVudHJ5Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHZpcnR1YWwgLSBJbXBsZW1lbnRhdG9ycyB1c2UgdGhpcyBtZXRob2QgdG8gY2FsbCBvbiB0aGUgbmF0aXZlIGxvZ2dpbmcgQVBJLlxuICAgICAqIEBwYXJhbSBsZXZlbCAtIFRoZSBsb2cgbGV2ZWwgZm9yIHRoaXMgbG9nIHByaW50XG4gICAgICogQHBhcmFtIG1lc3NhZ2UgLSBPdmVycmlkYWJsZSBob29rIHRvIHNlbmQgbG9ncyB0byB0aGUgbmF0aXZlIGVudmlyb25tZW50XG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9sb2dUb05hdGl2ZShsZXZlbDogRnVzZUxvZ2dlckxldmVsLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHt9XG5cbiAgICBwcml2YXRlICRsb2dUb05hdGl2ZShsZXZlbDogRnVzZUxvZ2dlckxldmVsLCBhcmdzOiBUU2VyaWFsaXphYmxlW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLiRlbmFibGVOYXRpdmVCcmlkZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRBcmdzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzZXJpYWxpemVkQXJncy5wdXNoKHRoaXMuJHNlcmlhbGl6ZXIuc2VyaWFsaXplKGFyZ3NbaV0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xvZ1RvTmF0aXZlKGxldmVsLCBzZXJpYWxpemVkQXJncy5qb2luKCdcXHQnKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZ3MgLSB2YXJpYWRpYyBhcmd1bWVudHMgb2Ygc2VyaWFsaXphYmxlIG9iamVjdHMgdG8gbG9nIHRvIHRoZSBjb25zb2xlXG4gICAgICovXG4gICAgcHVibGljIGRlYnVnKC4uLmFyZ3M6IFRTZXJpYWxpemFibGVbXSk6IHZvaWQge1xuICAgICAgICBpZiAoISh0aGlzLiRsZXZlbCAmIEZ1c2VMb2dnZXJMZXZlbC5ERUJVRykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUuZGVidWcoLi4uYXJncyk7XG4gICAgICAgIHRoaXMuJGxvZ1RvTmF0aXZlKEZ1c2VMb2dnZXJMZXZlbC5ERUJVRywgYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZ3MgLSB2YXJpYWRpYyBhcmd1bWVudHMgb2Ygc2VyaWFsaXphYmxlIG9iamVjdHMgdG8gbG9nIHRvIHRoZSBjb25zb2xlXG4gICAgICovXG4gICAgcHVibGljIGluZm8oLi4uYXJnczogVFNlcmlhbGl6YWJsZVtdKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuJGxldmVsICYgRnVzZUxvZ2dlckxldmVsLklORk8pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmluZm8oLi4uYXJncyk7XG4gICAgICAgIHRoaXMuJGxvZ1RvTmF0aXZlKEZ1c2VMb2dnZXJMZXZlbC5JTkZPLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJncyAtIHZhcmlhZGljIGFyZ3VtZW50cyBvZiBzZXJpYWxpemFibGUgb2JqZWN0cyB0byBsb2cgdG8gdGhlIGNvbnNvbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgd2FybiguLi5hcmdzOiBUU2VyaWFsaXphYmxlW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy4kbGV2ZWwgJiBGdXNlTG9nZ2VyTGV2ZWwuV0FSTikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUud2FybiguLi5hcmdzKTtcbiAgICAgICAgdGhpcy4kbG9nVG9OYXRpdmUoRnVzZUxvZ2dlckxldmVsLldBUk4sIGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmdzIC0gdmFyaWFkaWMgYXJndW1lbnRzIG9mIHNlcmlhbGl6YWJsZSBvYmplY3RzIHRvIGxvZyB0byB0aGUgY29uc29sZVxuICAgICAqL1xuICAgIHB1YmxpYyBlcnJvciguLi5hcmdzOiBUU2VyaWFsaXphYmxlW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy4kbGV2ZWwgJiBGdXNlTG9nZ2VyTGV2ZWwuRVJST1IpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmVycm9yKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLiRsb2dUb05hdGl2ZShGdXNlTG9nZ2VyTGV2ZWwuRVJST1IsIGFyZ3MpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgRnVzZUxvZ2dlciB9IGZyb20gXCIuL0Z1c2VMb2dnZXJcIjtcbmltcG9ydCB7IElGdXNlTG9nZ2VyIH0gZnJvbSBcIi4vSUZ1c2VMb2dnZXJcIjtcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSBcIi4vUGxhdGZvcm1cIjtcbmltcG9ydCB7SU9TRnVzZUxvZ2dlcn0gZnJvbSAnLi9pb3MvSU9TRnVzZUxvZ2dlcic7XG5pbXBvcnQge0FuZHJvaWRGdXNlTG9nZ2VyfSBmcm9tICcuL2FuZHJvaWQvQW5kcm9pZEZ1c2VMb2dnZXInO1xuXG4vKipcbiAqIEEgZGVmYXVsdCBsb2dnZXIgZmFjdG9yeSBmb3IgY3JlYXRpbmcgbG9nZ2VycyBmb3IgdGhlIGdpdmVuIHBsYXRmb3JtLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZUxvZ2dlckZhY3Rvcnkge1xuICAgIHByaXZhdGUgJHBsYXRmb3JtOiBQbGF0Zm9ybTtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBwbGF0Zm9ybSAtIFRoZSBjdXJyZW50IFBsYXRmb3JtIGluIHRoaXMgcnVudGltZSBlbnZpcm9ubWVudFxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwbGF0Zm9ybTogUGxhdGZvcm0pIHtcbiAgICAgICAgdGhpcy4kcGxhdGZvcm0gPSBwbGF0Zm9ybTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgRnVzZUxvZ2dlciBmb3IgdGhlIGN1cnJlbnQgUGxhdGZvcm0uXG4gICAgICogXG4gICAgICogQHJldHVybnMgQSBsb2dnZXIgaW5zdGFuY2UgICBcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlKCk6IElGdXNlTG9nZ2VyIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLiRwbGF0Zm9ybSkge1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5JT1M6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJT1NGdXNlTG9nZ2VyKCk7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLkFORFJPSUQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBbmRyb2lkRnVzZUxvZ2dlcigpO1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5URVNUOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRnVzZUxvZ2dlcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vKipcbiAqIEEgYml0bWFzayBvcHRpb24gb2YgbG9nZ2VyIGxldmVsc1xuICovXG5leHBvcnQgZW51bSBGdXNlTG9nZ2VyTGV2ZWwge1xuICAgIFNJTEVOVCAgPSAwLFxuICAgIERFQlVHICAgPSAxLFxuICAgIElORk8gICAgPSAyLFxuICAgIFdBUk4gICAgPSA0LFxuICAgIEVSUk9SICAgPSA4XG59XG4iLCJcblxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtJRnVzZUdyYW50UmVzdWx0fSBmcm9tICcuL0lGdXNlR3JhbnRSZXN1bHQnO1xuaW1wb3J0IHtGdXNlUGVybWlzc2lvblN0YXRlfSBmcm9tICcuL0Z1c2VQZXJtaXNzaW9uU3RhdGUnO1xuXG5leHBvcnQgY2xhc3MgRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbiBleHRlbmRzIG51bWJlciA9IG51bWJlcj4ge1xuICAgIHByaXZhdGUgJHJlc3VsdHM6IElGdXNlR3JhbnRSZXN1bHQ8VFN1cHBvcnRlZFBlcm1pc3Npb24+O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHJlc3VsdHM6IElGdXNlR3JhbnRSZXN1bHQ8VFN1cHBvcnRlZFBlcm1pc3Npb24+KSB7XG4gICAgICAgIHRoaXMuJHJlc3VsdHMgPSByZXN1bHRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0dyYW50ZWQocGVybWlzc2lvbjogVFN1cHBvcnRlZFBlcm1pc3Npb24pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlc3VsdHNbcGVybWlzc2lvbl0gPT09IEZ1c2VQZXJtaXNzaW9uU3RhdGUuR1JBTlRFRDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNBbGxHcmFudGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy4kcmVzdWx0cykge1xuICAgICAgICAgICAgaWYgKHRoaXMuJHJlc3VsdHNbaV0gIT09IEZ1c2VQZXJtaXNzaW9uU3RhdGUuR1JBTlRFRCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWplY3RKdXN0aWZpY2F0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMuJHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiRyZXN1bHRzW2ldID09PSBGdXNlUGVybWlzc2lvblN0YXRlLlJFUVVJUkVTX0pVU1RJRklDQVRJT04pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyZXN1bHRzW2ldID0gRnVzZVBlcm1pc3Npb25TdGF0ZS5ERU5JRUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdWxkSnVzdGlmeSgpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMuJHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiRyZXN1bHRzW2ldID09PSBGdXNlUGVybWlzc2lvblN0YXRlLlJFUVVJUkVTX0pVU1RJRklDQVRJT04pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IENvbnRlbnRUeXBlIH0gZnJvbSAnLi9Db250ZW50VHlwZSc7XG5pbXBvcnQgeyBGdXNlQVBJUmVzcG9uc2UgfSBmcm9tICcuL0Z1c2VBUElSZXNwb25zZSc7XG5pbXBvcnQgeyBGdXNlRXJyb3IgfSBmcm9tICcuL0Z1c2VFcnJvcic7XG5pbXBvcnQge1RBUElCcmlkZ2VGdW5jdGlvbn0gZnJvbSAnLi9GdXNlUGx1Z2luJztcbmltcG9ydCB7SUZ1c2VQZXJtaXNzaW9uUmVxdWVzdH0gZnJvbSAnLi9JRnVzZVBlcm1pc3Npb25SZXF1ZXN0JztcbmltcG9ydCB7IFRGdXNlU2VyaWFsaXphYmxlIH0gZnJvbSAnLi9UU2VyaWFsaXphYmxlJztcbmltcG9ydCB7RnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdH0gZnJvbSAnLi9GdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0JztcblxuLyoqXG4gKiBJbnZva2VkIHRvIGhhbmRsZSB3aGVuIHBlcm1pc3Npb24ganVzdGlmaWNhdGlvbiBpcyBuZWNlc3NhcnkuXG4gKiBcbiAqIFRoaXMgaXMgYW4gYW5kcm9pZCBjb25jZXB0LCBzbyBpdCB3aWxsIG9ubHkgYmUgaW52b2tlZCBvbiBBbmRyb2lkIGRldmljZXMsXG4gKiBhcyBpT1MgaGFzIGp1c3RpZmljYXRpb24gdGV4dCBlbWJlZGRlZCBpbnRvIHRoZSBhY3R1YWwgcGVybWlzc2lvbiBwcm9tcHQuXG4gKiBcbiAqIFVzZXIgZGlhbG9nIHNob3VsZCBiZSBkaXNwbGF5ZWQgdG8gZXhwbGFpbiB3aHkgdGhlIGFwcCB3YW50cyB0byB1c2UgdGhlIHBlcm1pc3Npb24uXG4gKiBBbmRyb2lkIHJlY29tbWVuZHMgZ2l2aW5nIHRoZSB1c2VyIHRoZSBhYmlsaXR5IHRvIGFjY2VwdCBvciBkZW55IGF0IHRoaXMgdGltZSwgaWYgdGhlIHVzZXIgZGVueSxcbiAqIHRoZW4gcmVzb2x2ZSB0aGUgcHJvbWlzZSB3aWxsIGZhbHNlLlxuICogXG4gKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgcGVybWlzc2lvbiByZXF1ZXN0IHNob3VsZCBwcm9jZWVkLlxuICovXG5leHBvcnQgdHlwZSBURnVzZUp1c3RpZmljYXRpb25IYW5kbGVyID0gKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcblxuaW50ZXJmYWNlIF9fSVBlcm1pc3Npb25SZXF1ZXN0QXJndW1lbnRzPFQgZXh0ZW5kcyBudW1iZXI+IHtcbiAgICBwZXJtaXNzaW9uU2V0OiBUW107XG4gICAgaXNKdXN0aWZpZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCB0eXBlIFRGdXNlUGVybWlzc2lvblJlcXVlc3RBcmd1bWVudHM8VCBleHRlbmRzIG51bWJlcj4gPSBURnVzZVNlcmlhbGl6YWJsZTxfX0lQZXJtaXNzaW9uUmVxdWVzdEFyZ3VtZW50czxUPj47XG5cbmV4cG9ydCB0eXBlIFRGdXNlQVBJUGVybWlzc2lvblJlcXVlc3Q8VCBleHRlbmRzIG51bWJlciA9IG51bWJlcj4gPSBUQVBJQnJpZGdlRnVuY3Rpb248Q29udGVudFR5cGUuSlNPTiwgVEZ1c2VQZXJtaXNzaW9uUmVxdWVzdEFyZ3VtZW50czxUPj47XG5cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyB0byBoYW5kbGUgcGVybWlzc2lvbiByZXF1ZXN0LlxuICogQ29uY3JldGUgY2xhc3NlcyBzaG91bGQgaW1wbGVtZW50IHRoZSBwcm90ZWN0ZWQgX3JlcXVlc3QgbWV0aG9kIHRvIGNhbGwgb24gdGhlaXJcbiAqIHBlcm1pc3Npb24gcmVxdWVzdCBGdXNlIEFQSS5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VQZXJtaXNzaW9uUmVxdWVzdDxUU3VwcG9ydGVkUGVybWlzc2lvbiBleHRlbmRzIG51bWJlcj4gaW1wbGVtZW50cyBJRnVzZVBlcm1pc3Npb25SZXF1ZXN0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPiB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVEFHOiBzdHJpbmcgPSAnUGVybWlzc2lvblJlcXVlc3QnO1xuXG4gICAgcHJpdmF0ZSAkYXBpOiBURnVzZUFQSVBlcm1pc3Npb25SZXF1ZXN0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPjtcbiAgICBwcml2YXRlICRwZXJtaXNzaW9uU2V0OiBUU3VwcG9ydGVkUGVybWlzc2lvbltdO1xuICAgIHByaXZhdGUgJGp1c3RpZmljYXRpb25IYW5kbGVyOiBURnVzZUp1c3RpZmljYXRpb25IYW5kbGVyIHwgbnVsbDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhcGlCcmlkZ2U6IFRGdXNlQVBJUGVybWlzc2lvblJlcXVlc3Q8VFN1cHBvcnRlZFBlcm1pc3Npb24+LCBwZXJtaXNzaW9uU2V0OiBUU3VwcG9ydGVkUGVybWlzc2lvbltdLCBqdXN0aWZpY2F0aW9uSGFuZGxlcjogVEZ1c2VKdXN0aWZpY2F0aW9uSGFuZGxlciA9IG51bGwpIHtcbiAgICAgICAgaWYgKCFwZXJtaXNzaW9uU2V0IHx8IChwZXJtaXNzaW9uU2V0ICYmIHBlcm1pc3Npb25TZXQubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEZ1c2VFcnJvcihGdXNlUGVybWlzc2lvblJlcXVlc3QuVEFHLCAnQXQgbGVhc3Qgb25lIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGFwaSA9IGFwaUJyaWRnZTtcbiAgICAgICAgdGhpcy4kcGVybWlzc2lvblNldCA9IHBlcm1pc3Npb25TZXQ7XG4gICAgICAgIHRoaXMuJGp1c3RpZmljYXRpb25IYW5kbGVyID0ganVzdGlmaWNhdGlvbkhhbmRsZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBlcm1pc3Npb25TZXQoKTogVFN1cHBvcnRlZFBlcm1pc3Npb25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRwZXJtaXNzaW9uU2V0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgJHJlcXVlc3QoaXNKdXN0aWZpZWQ6IGJvb2xlYW4pOiBQcm9taXNlPEZ1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQ8VFN1cHBvcnRlZFBlcm1pc3Npb24+PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBGdXNlQVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLiRhcGkoQ29udGVudFR5cGUuSlNPTiwge1xuICAgICAgICAgICAgcGVybWlzc2lvblNldDogdGhpcy5nZXRQZXJtaXNzaW9uU2V0KCksXG4gICAgICAgICAgICBpc0p1c3RpZmllZDogaXNKdXN0aWZpZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmlzRXJyb3IoKSkge1xuICAgICAgICAgICAgdGhyb3cgYXdhaXQgcmVzcG9uc2UucmVhZEFzRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdChhd2FpdCByZXNwb25zZS5yZWFkQXNKU09OKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgJG9uSnVzdGlmaWNhdGlvblJlcXVlc3QoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGlmICghdGhpcy4kanVzdGlmaWNhdGlvbkhhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignUGVybWlzc2lvbiByZXF1aXJlcyBqdXN0aWZpY2F0aW9uLCBidXQgdGhpcyByZXF1ZXN0IGhhcyBubyBUSnVzdGlmaWNhdGlvbkhhbmRsZXInKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLiRqdXN0aWZpY2F0aW9uSGFuZGxlcigpO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgYXN5bmMgcmVxdWVzdCgpOiBQcm9taXNlPEZ1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQ8VFN1cHBvcnRlZFBlcm1pc3Npb24+PiB7XG4gICAgICAgIGxldCByZXN1bHRzOiBGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPiA9IGF3YWl0IHRoaXMuJHJlcXVlc3QoZmFsc2UpO1xuXG4gICAgICAgIGlmIChyZXN1bHRzLnNob3VsZEp1c3RpZnkoKSkge1xuICAgICAgICAgICAgaWYgKGF3YWl0IHRoaXMuJG9uSnVzdGlmaWNhdGlvblJlcXVlc3QoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBhd2FpdCB0aGlzLiRyZXF1ZXN0KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5yZWplY3RKdXN0aWZpY2F0aW9ucygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vKipcbiAqIEEgc2V0IG9mIGNvbnN0YW50cyByZXByZXNlbnRpbmcgcGVybWlzc2lvbiBzdGF0ZXMuXG4gKi9cbmV4cG9ydCBlbnVtIEZ1c2VQZXJtaXNzaW9uU3RhdGUge1xuICAgIEdSQU5URUQsXG4gICAgUkVRVUlSRVNfSlVTVElGSUNBVElPTixcbiAgICBERU5JRURcbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gXCIuL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnlcIjtcbmltcG9ydCB7IEZ1c2VBUEkgfSBmcm9tIFwiLi9GdXNlQVBJXCI7XG5pbXBvcnQge1RGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyfSBmcm9tICcuL0Z1c2VDYWxsYmFja01hbmFnZXInO1xuaW1wb3J0IHsgRnVzZUNvbnRleHQgfSBmcm9tIFwiLi9GdXNlQ29udGV4dFwiO1xuaW1wb3J0IHtGdXNlQVBJUmVzcG9uc2V9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSBcIi4vUGxhdGZvcm1cIjtcbmltcG9ydCB7IENvbnRlbnRUeXBlIH0gZnJvbSBcIi4vQ29udGVudFR5cGVcIjtcbmltcG9ydCB7IFRTZXJpYWxpemFibGUgfSBmcm9tIFwiLi9UU2VyaWFsaXphYmxlXCI7XG5pbXBvcnQgeyBGdXNlU2VyaWFsaXplciB9IGZyb20gXCIuL0Z1c2VTZXJpYWxpemVyXCI7XG5cbmV4cG9ydCB0eXBlIFRBUElCcmlkZ2VGdW5jdGlvbjxUQ29udGVudFR5cGUgZXh0ZW5kcyBDb250ZW50VHlwZSA9IENvbnRlbnRUeXBlLCBURGF0YSBleHRlbmRzIFRTZXJpYWxpemFibGUgPSBUU2VyaWFsaXphYmxlPiA9ICh0eXBlPzogVENvbnRlbnRUeXBlLCBkYXRhPzogVERhdGEpID0+IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPjtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBGdXNlIFBsdWdpbnNcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZ1c2VQbHVnaW48VEFQSU9wdHMgPSB1bmtub3duPiB7XG4gICAgcHJpdmF0ZSAkY29udGV4dDogRnVzZUNvbnRleHQ7XG4gICAgcHJpdmF0ZSAkYXBpRmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBGdXNlQ29udGV4dCkge1xuICAgICAgICB0aGlzLiRjb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy4kYXBpRmFjdG9yeSA9IHRoaXMuX2NyZWF0ZUFQSUZhY3RvcnkoKSB8fCBjb250ZXh0LmdldERlZmF1bHRBUElGYWN0b3J5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgQVBJIGJyaWRnZVxuICAgICAqIEBwYXJhbSBwbGF0Zm9ybSAtIFRoZSBydW50aW1lIHBsYXRmb3JtXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVBUEkocGxhdGZvcm06IFBsYXRmb3JtKTogRnVzZUFQSSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRBUElGYWN0b3J5KCkuY3JlYXRlKHBsYXRmb3JtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIFxuICAgICAqIEByZW1hcmtzXG4gICAgICogXG4gICAgICogQ3JlYXRlIGEgY29uY3JldGUge0BsaW5rIEZ1c2VBUEl9IGZhY3RvcnkgY2FwYWJsZSBvZiBjcmVhdGluZyBGdXNlQVBJXG4gICAgICogaW5zdGFuY2UgZm9yIHRoZSBjdXJyZW50IHJ1bnRpbWUuXG4gICAgICogXG4gICAgICogQHJldHVybnMgQSBjb25jcmV0ZSB7QGxpbmsgRnVzZUFQSX0gRmFjdG9yeVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfY3JlYXRlQVBJRmFjdG9yeSgpOiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHJldHVybnMgVGhlIGNvbmNyZXRlIEFQSSBmYWN0b3J5XG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9nZXRBUElGYWN0b3J5KCk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnkge1xuICAgICAgICByZXR1cm4gdGhpcy4kYXBpRmFjdG9yeTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUQVBJT3B0cyBpcyBhIHBsdWdpbiBnZW5lcmljIHR5cGUgZGVjbGFyaW5nIG9wdGlvbnMuXG4gICAgICogVXNlciBtYXkgdXNlIHRoaXMgdG8gZGVjbGFyZSBhIHBhdGggb24gaG93IHRvIGdldCBhIHBhcnRpY3VsYXIgRnVzZUFQSS5cbiAgICAgKiBcbiAgICAgKiBUaGlzIEFQSSBtYXkgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzIHRvIHV0aWxpc2UgdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gaXMgdG8gc2ltcGx5IHJldHVybiBhIHN0YW5kYXJkIEZ1c2VBUEkuXG4gICAgICogXG4gICAgICogQHBhcmFtIG9wdHMgLSBBUEkgb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfZ2V0QVBJKG9wdHM/OiBUQVBJT3B0cyk6IEZ1c2VBUEkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZ2V0QVBJKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0YW5kYXJkIEZ1c2VBUElcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwcml2YXRlICRnZXRBUEkoKTogRnVzZUFQSSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRBUElGYWN0b3J5KCkuY3JlYXRlKHRoaXMuZ2V0Q29udGV4dCgpLmdldFBsYXRmb3JtKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjYWxsYmFjayBjb250ZXh0IHRoYXQgY2FuIGJlIHBhc3NlZCB0byBuYXRpdmVcbiAgICAgKiBUaGUgbmF0aXZlIGNvZGUgY2FuIHVzZSB0aGUgY2FsbGJhY2tJRCB0byBjYWxsYmFjayB0byB0aGUgSlMgY29kZS5cbiAgICAgKiBcbiAgICAgKiBUaGUgY2FsbGJhY2sgY2FuIGJlIHVzZWQgc2V2ZXJhbCB0aW1lcy5cbiAgICAgKiBcbiAgICAgKiBSZWxlYXNlIHRoZSBjYWxsYmFjayB1c2luZyBfcmVsZWFzZUNhbGxiYWNrIHdpdGggdGhlIGdpdmVuIGNhbGxiYWNrSUQuXG4gICAgICogVGhlc2UgQVBJIHVzYWdlcyBzaG91bGQgYmUgcGFydCBvZiB5b3VyIHBsdWdpbiBBUEkuIFdoZW4gcmVsZWFzaW5nIGEgY2FsbGJhY2ssXG4gICAgICogYSBzdGFuZGFyZCBBUEkgY2FsbCBzaG91bGQgYmUgbWFkZSB0byB5b3VyIHBsdWdpbiB0byB0ZWxsIHRoZSBuYXRpdmUgc2lkZSB0aGF0XG4gICAgICogdGhlIGNhbGxiYWNrIGlzIG5vIGxvbmdlciB1c2FibGUsIGFuZCBpdCBzaG91bGQgY2xlYW4gdXAgdGhlIG5hdGl2ZSByZXNvdXJjZXMgc3Vycm91bmRpbmdcbiAgICAgKiB0aGUgY2FsbGJhY2sgY29udGV4dC5cbiAgICAgKiBcbiAgICAgKiBOb3RlIHRoYXQgY2FsbGJhY2sgZGF0YSBwYXlsb2FkcyBvbmx5IHN1cHBvcnRzIHN0cmluZ3MuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNiIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIFxuICAgICAqIEByZXR1cm5zIFN0cmluZyAtIGNhbGxiYWNrSURcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZUNhbGxiYWNrKGNiOiBURnVzZUFQSUNhbGxiYWNrSGFuZGxlciwgYXBpT3B0cz86IFRBUElPcHRzKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFQSShhcGlPcHRzKS5jcmVhdGVDYWxsYmFja0NvbnRleHQoY2IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbGVhc2VzIGEgY3JlYXRlZCBjYWxsYmFjay5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaWQgLSBjYWxsYmFja0lEXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9yZWxlYXNlQ2FsbGJhY2soaWQ6IHN0cmluZywgYXBpT3B0cz86IFRBUElPcHRzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2dldEFQSShhcGlPcHRzKS5yZWxlYXNlQ2FsbGJhY2soaWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIEZ1c2VDb250ZXh0XG4gICAgICogXG4gICAgICogQHJldHVybnMgVGhlIGN1cnJlbnQgY29udGV4dFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRDb250ZXh0KCk6IEZ1c2VDb250ZXh0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvbnRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBcbiAgICAgKiBDb25jcmV0ZSBjbGFzc2VzIHNob3VsZCBpbXBsZW1lbnQgYW5kIHJldHVybiBhIHN0cmluZyB0aGF0IHVuaXF1ZWx5IHJlcHJlc2VudHMgdGhpcyBwbHVnaW4uXG4gICAgICogVGhlIHN0cmluZyBtdXN0IGNvbmZvcm0gdG8gVVJMIGZyYWdtZW50IHJ1bGVzLiBJdCBzaGFsbCBvbmx5IGNvbnRhaW4gdGhlIGZvbGxvd2luZyBjaGFyYWN0ZXJzOlxuICAgICAqICAtIEFscGhhYmV0aWNhbCBsZXR0ZXJzXG4gICAgICogIC0gTnVtYmVyc1xuICAgICAqICAtIGRvdHMgYW5kIGh5cGhlbnNcbiAgICAgKiBcbiAgICAgKiBAdmlydHVhbFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfZ2V0SUQoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcGx1Z2luIElEXG4gICAgICovXG4gICAgcHVibGljIGdldElEKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRJRCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBleGVjdXRpb24gQVBJLiBDb25jcmV0ZSBjbGFzc2VzIGNhbiBjYWxsIHRoaXMgdG8gcGVyZm9ybSBjYWxscyB0byB0aGUgbmF0aXZlIHNpZGUuXG4gICAgICogXG4gICAgICogVGhlIGNvbmNyZXRlIGNsYXNzIHNob3VsZCBleHBvc2UgcHVibGljIG1ldGhvZHMgd2l0aCB0eXBlIGluZm9ybWF0aW9uIGV4cG9zZWQuXG4gICAgICogXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIFRoZSBtZXRob2QgbGluaywgdGhpcyBzaG91bGQgbWF0Y2ggdGhlIGVuZHBvaW50IGRlZmluZWQgaW4gdGhlIG5hdGl2ZSBBUEkuXG4gICAgICogQHBhcmFtIGNvbnRlbnRUeXBlIC0gdGhlIE1JTUUgdHlwZSBvZiB0aGUgZGF0YSB5b3UgYXJlIHBhc3NpbmcgaW4uXG4gICAgICogQHBhcmFtIGRhdGEgLSBUaGUgZGF0YSB0byBwYXNzIHRvIHRoZSBuYXRpdmUgZW52aXJvbm1lbnRcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgYm9keSBmcm9tIG5hdGl2ZS4gRnVzZVJlc3BvbnNlUmVhZGVyIGhhcyBzb21lIHV0aWxpdHkgbWV0aG9kcyB0byByZWFkIHRoZSBkYXRhIGluIGNvbW1vbiBmb3JtYXRzIChlLmcuIHRleHQgb3IgSlNPTilcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYXN5bmMgX2V4ZWMobWV0aG9kOiBzdHJpbmcsIGNvbnRlbnRUeXBlPzogc3RyaW5nLCBkYXRhPzogVFNlcmlhbGl6YWJsZSwgYXBpT3B0cz86IFRBUElPcHRzKTogUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2dldEFQSShhcGlPcHRzKS5leGVjdXRlKHRoaXMuZ2V0SUQoKSwgbWV0aG9kLCBjb250ZW50VHlwZSwgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBUaGlzIGlzIHVzZWZ1bCB3aGVuIHlvdSB3YW50IHRvIHVzZSBhbiBBUEkgYXMgYSBjYWxsYmFjaywgd2l0aG91dCBleHBvc2luZ1xuICAgICAqIHRoZSBwbHVnaW4gaW1wbGVtZW50YXRpb24uIFRoZSByZXR1cm5lZCBmdW5jdGlvbiBpcyBhIGJvdW5kZWQgZnVuY3Rpb24uXG4gICAgICogV2hlbiBpbnZva2VkLCBpdCB3aWxsIGNhbGwgb24gdGhlIEFQSSBlbmRwb2ludCBhbmQgcmV0dXJucyBhIHtAbGluayBGdXNlQVBJUmVzcG9uc2V9XG4gICAgICogYXN5bmNocm9ub3VzbHkuXG4gICAgICogXG4gICAgICogQHNlYWxlZFxuICAgICAqIEBwYXJhbSByb3V0ZSAtIFRoZSBBUEkgZW5kIHBvaW50XG4gICAgICogQHBhcmFtIHNlcmlhbGl6ZXIgLSBUaGUgc2VyaWFsaXplciB0byB1c2UuIERlZmF1bHRzIHRvIHtAbGluayBGdXNlU2VyaWFsaXplcn0gd2hpY2ggaXMgYSBzZW5zaWJsZSBzZXJpYWxpemVyLlxuICAgICAqIEByZXR1cm5zIEEgY29udGV4dC1iaW5kaW5nIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGdpdmVuIHRvIGFub3RoZXIgb2JqZWN0LlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfY3JlYXRlQVBJQnJpZGdlKHJvdXRlOiBzdHJpbmcsIHNlcmlhbGl6ZXI/OiBGdXNlU2VyaWFsaXplcik6IFRBUElCcmlkZ2VGdW5jdGlvbiB7XG4gICAgICAgIGlmICghc2VyaWFsaXplcikge1xuICAgICAgICAgICAgc2VyaWFsaXplciA9IG5ldyBGdXNlU2VyaWFsaXplcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFzeW5jICh0eXBlPzogQ29udGVudFR5cGUsIGRhdGE/OiBUU2VyaWFsaXphYmxlKTogUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9leGVjKHJvdXRlLCB0eXBlLCBzZXJpYWxpemVyLnNlcmlhbGl6ZShkYXRhKSk7XG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vKipcbiAqIEEgc3RhdGljIGNsYXNzIHdpdGggY29udmVuaWVuY2UgbWV0aG9kcyBmb3IgcmVhZGluZyBjb21tb25cbiAqIHJlc3BvbnNlIGNvbnRlbnQgYm9keSBmb3JtYXRzLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZVJlc3BvbnNlUmVhZGVyIHtcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cblxuICAgIC8qKlxuICAgICAqIEByZW1hcmtzXG4gICAgICogUmVhZHMgdGhlIGRhdGEgYnVmZmVyIGFzIGEgc3RyaW5nXG4gICAgICogXG4gICAgICogQHBhcmFtIGRhdGEgLSBpbnB1dCBkYXRhXG4gICAgICogQHJldHVybnMgVGhlIGJ1ZmZlciBjb250ZW50cyBhcyBhIHN0cmluZ1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcmVhZEFzVGV4dChkYXRhOiBBcnJheUJ1ZmZlcik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlYWRlcjogRmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoPHN0cmluZz5yZWFkZXIucmVzdWx0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZWFkZXIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZWFkZXIucmVhZEFzVGV4dChuZXcgQmxvYihbZGF0YV0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBSZWFkcyB0aGUgZ2l2ZW4gZGF0YSBidWZmZXIgYXMgYSBKU09OIG9iamVjdC4gVGhlIEpTT04gb2JqZWN0XG4gICAgICogY2FuIGJlIHR5cGVkIGFzIFQgZ2VuZXJpYy4gTm8gdmFsaWRhdGlvbnMgb2NjdXJzIG9uIHdoZXRoZXIgdGhlIGdpdmVuXG4gICAgICogZGF0YSBpcyBhY3R1YWxseSBhIHR5cGUgb2YgVC5cbiAgICAgKiBcbiAgICAgKiBAdGhyb3dzIHtAbGluayBTeW50YXhFcnJvcn1cbiAgICAgKiBJZiBkYXRhIGlzIG5vdCBwYXJzZWFibGUgYXMgSlNPTi5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZGF0YSAtIGlucHV0IGRhdGFcbiAgICAgKiBAcmV0dXJucyBUaGUgYnVmZmVyIGNvbnRlbnRzIGFzIGEgSlNPTiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyByZWFkQXNKU09OPFQ+KGRhdGE6IEFycmF5QnVmZmVyKTogUHJvbWlzZTxUPiB7XG4gICAgICAgIGNvbnN0IHN0cjogc3RyaW5nID0gYXdhaXQgdGhpcy5yZWFkQXNUZXh0KGRhdGEpO1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHIpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgSVNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL0lTZXJpYWxpemFibGVcIjtcbmltcG9ydCB7IFRTZXJpYWxpemFibGUgfSBmcm9tIFwiLi9UU2VyaWFsaXphYmxlXCI7XG5cbi8qKlxuICogQSBjbGFzcyB0byBzZXJpYWxpemUgc2V2ZXJhbCBkaWZmZXJlbnQgdHlwZXMgb2Ygb2JqZWN0cyBpbnRvIGEgZGF0YSBzdHJ1Y3R1cmVcbiAqIHRoYXQgY2FuIGJlIHJlY29uc3RydWN0ZWQgYWNyb3NzIHRoZSBGdXNlIEFQSSBicmlkZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlU2VyaWFsaXplciB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHByb3RlY3RlZCBfc2VyaWFsaXplVG9TdHJpbmcob2JqOiBUU2VyaWFsaXphYmxlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVByaW1pdGl2ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZURhdGVUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzSVNlcmlhbGl6YWJsZShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqLnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZUVycm9yVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gYWxsIGVsc2UgZmFpbHMsIGF0dGVtcHQgdG8gSlNPTiBzdHJpbmdpZnlcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVQcmltaXRpdmVUb1N0cmluZyhvYmo6IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVFcnJvclRvU3RyaW5nKG9iajogRXJyb3IpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkRXJyb3IgPSB7XG4gICAgICAgICAgICBuYW1lOiBvYmoubmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG9iai5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhY2s6IG9iai5zdGFja1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShzZXJpYWxpemVkRXJyb3IsIG51bGwsIDQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2VyaWFsaXplRGF0ZVRvU3RyaW5nKG9iajogRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBvYmoudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXJpYWxpemVzIHRoZSBnaXZlbiBvYmplY3QgaW50byBhIGJsb2IuXG4gICAgICogXG4gICAgICogQHBhcmFtIG9iaiAtIEEgc3VwcG9ydGVkIHNlcmlhbGl6YWJsZSBvYmplY3QuIFNlZSB7QGxpbmsgVFNlcmlhbGl6YWJsZX0gZm9yXG4gICAgICogYSBsaXN0IG9mIGN1cnJlbnRseSBzdXBwb3J0ZWQgdHlwZXNcbiAgICAgKiBAcmV0dXJucyBBIHNlcmlhbGl6ZWQgYmxvYlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXJpYWxpemUob2JqOiBUU2VyaWFsaXphYmxlKTogQmxvYiB7XG4gICAgICAgIGlmIChvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJpbjogQmxvYjtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgIGJpbiA9IG9iajtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgb2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgYmluID0gbmV3IEJsb2IoW3RoaXMuX3NlcmlhbGl6ZVRvU3RyaW5nKG9iaildKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgYmluID0gbmV3IEJsb2IoW29ial0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzSVNlcmlhbGl6YWJsZShvYmopKSB7XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbdGhpcy5zZXJpYWxpemUob2JqLnNlcmlhbGl6ZSgpKV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGVpdGhlciBKU09OIG9iamVjdHMgb3IganNvbiBhcnJheXMgYXQgdGhpcyBwb2ludFxuICAgICAgICAgICAgYmluID0gbmV3IEJsb2IoW3RoaXMuX3NlcmlhbGl6ZVRvU3RyaW5nKG9iaildKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiaW47XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBwcm90ZWN0ZWQgX2lzSVNlcmlhbGl6YWJsZSh4OiBhbnkpOiB4IGlzIElTZXJpYWxpemFibGUge1xuICAgICAgICByZXR1cm4gISF4LnNlcmlhbGl6ZSAmJiB0eXBlb2YgeC5zZXJpYWxpemUgPT09ICdmdW5jdGlvbic7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBDb250ZW50VHlwZSB9IGZyb20gJy4vQ29udGVudFR5cGUnO1xuaW1wb3J0IHtGdXNlQVBJfSBmcm9tICcuL0Z1c2VBUEknO1xuaW1wb3J0IHsgRnVzZUFQSVJlc3BvbnNlIH0gZnJvbSAnLi9GdXNlQVBJUmVzcG9uc2UnO1xuaW1wb3J0IHtGdXNlRXJyb3J9IGZyb20gJy4vRnVzZUVycm9yJztcblxuLyoqXG4gKiBBIEZ1c2UgQVBJIGltcGxlbWVudGF0aW9uIHRoYXQgdXNlcyBIVFRQIHByb3RvY29sIHRvIG1ha2UgbmF0aXZlIGNhbGxzXG4gKi9cbmV4cG9ydCBjbGFzcyBIVFRQRnVzZUFQSSBleHRlbmRzIEZ1c2VBUEkge1xuICAgIFxuICAgIHByb3RlY3RlZCBhc3luYyBfZ2V0RW5kcG9pbnQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBfaW5pdEhlYWRlcnMoeGhyOiBYTUxIdHRwUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge31cblxuICAgIHB1YmxpYyBhc3luYyBidWlsZFJvdXRlKHBsdWdpbklEOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgZW5kcG9pbnQ6IHN0cmluZyA9IGF3YWl0IHRoaXMuX2dldEVuZHBvaW50KCk7XG4gICAgICAgIHJldHVybiBgJHtlbmRwb2ludH0ke3RoaXMuX2NyZWF0ZVJvdXRlKHBsdWdpbklELCBtZXRob2QpfWA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIF9leGVjdXRlKHBsdWdpbklEOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBjb250ZW50VHlwZTogc3RyaW5nLCBkYXRhOiBCbG9iKTogUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgeGhyOiBYTUxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCBhd2FpdCB0aGlzLmJ1aWxkUm91dGUocGx1Z2luSUQsIG1ldGhvZCkpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY29udGVudFR5cGUgPSBDb250ZW50VHlwZS5CSU5BUlk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLl9pbml0SGVhZGVycyh4aHIpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fZG9SZXF1ZXN0KHhociwgZGF0YSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9kb1JlcXVlc3QoeGhyOiBYTUxIdHRwUmVxdWVzdCwgZGF0YTogQmxvYik6IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IEZ1c2VBUElSZXNwb25zZSA9IG5ldyBGdXNlQVBJUmVzcG9uc2UoeGhyLnJlc3BvbnNlLCB4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCksIHhoci5zdGF0dXMpO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGF3YWl0IHJlc3BvbnNlLnJlYWRBc0Vycm9yKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRnVzZUVycm9yKCdGdXNlQVBJJywgJ05ldHdvcmsgRXJyb3InKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEZ1c2VFcnJvcignRnVzZUFQSScsICdBUEkgVGltZW91dCcpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX2RvU2VuZCh4aHIsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2RvU2VuZCh4aHI6IFhNTEh0dHBSZXF1ZXN0LCBkYXRhOiBCbG9iKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQgJiYgZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgeGhyLnNlbmQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vKipcbiAqIEVudW1lcmF0aW9uIGZvciBzdXBwb3J0ZWQgcGxhdGZvcm1zXG4gKi9cbmV4cG9ydCBlbnVtIFBsYXRmb3JtIHtcbiAgICBJT1MgPSAxLFxuICAgIEFORFJPSUQsXG4gICAgLyoqXG4gICAgICogU3BlY2lhbGl6ZWQgcGxhdGZvcm0gdXNlZCBmb3IgdGVzdCBlbnZpcm9ubWVudHMsXG4gICAgICogd2lsbCBub3QgYmUgdXNlZCBmb3IgcmVndWxhciBydW50aW1lcy5cbiAgICAgKi9cbiAgICBURVNUXG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSBcIi4vUGxhdGZvcm1cIjtcblxuLyoqXG4gKiBBIHN0cmF0ZWd5IHRvIHJlc29sdmUgdGhlIHJ1bnRpbWUncyBwbGF0Zm9ybVxuICovXG5leHBvcnQgY2xhc3MgUGxhdGZvcm1SZXNvbHZlciB7XG4gICAgcHVibGljIHJlc29sdmUoKTogUGxhdGZvcm0ge1xuICAgICAgICBpZiAodGhpcy5pc0lPU0Vudmlyb25tZW50KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBQbGF0Zm9ybS5JT1M7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGUgb25seSBvdGhlciBzdXBwb3J0ZWQgcGxhdGZvcm0gaXMgQW5kcm9pZCwgc29cbiAgICAgICAgICAgIC8vIGl0J3MgYXNzdW1lZFxuICAgICAgICAgICAgcmV0dXJuIFBsYXRmb3JtLkFORFJPSUQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNJT1NFbnZpcm9ubWVudCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uLnByb3RvY29sID09PSAnYnRmdXNlOic7XG4gICAgfVxuXG4gICAgcHVibGljIGlzQW5kcm9pZEVudmlyb25tZW50KCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNJT1NFbnZpcm9ubWVudCgpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgcmVwcmVzZW50cyBhIHtAbGluayBodHRwczovL3NlbXZlci5vcmcvfSB2ZXJzaW9uaW5nLlxuICovXG5leHBvcnQgY2xhc3MgVmVyc2lvbiB7XG4gICAgcHJpdmF0ZSAkbWFqb3I6IG51bWJlcjtcbiAgICBwcml2YXRlICRtaW5vcjogbnVtYmVyO1xuICAgIHByaXZhdGUgJHBhdGNoPzogbnVtYmVyO1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBMRVNTX1RIQU46IG51bWJlciA9IC0xO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVFVQUw6IG51bWJlciA9IDA7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHUkVBVEVSX1RIQU46IG51bWJlciA9IDE7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IobWFqb3I6IG51bWJlciwgbWlub3I/OiBudW1iZXIsIHBhdGNoPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuJG1ham9yID0gbWFqb3I7XG4gICAgICAgIHRoaXMuJG1pbm9yID0gbWlub3IgfHwgMDtcbiAgICAgICAgdGhpcy4kcGF0Y2ggPSBwYXRjaCB8fCAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZW1hcmtzXG4gICAgICogUGFyc2VzIGEgc2VtdmVyLWZvcm1hdHRlZCB2ZXJzaW9uIHN0cmluZyBhbmQgY3JlYXRlcyBhIFZlcnNpb24gb2JqZWN0LlxuICAgICAqIERvZXMgbm90IHN1cHBvcnQgcHJlLXJlbGVhc2UgbGFiZWxzLCB3aGljaCB3aWxsIGJlIGNob3BwZWQgb2ZmLlxuICAgICAqIElmIGFueSBkb3Qgbm90YXRpb24gc2VnbWVudCBpcyBtaXNzaW5nIG9yIGlzIG5vdCBwYXJzZWFibGUgYXMgYW4gaW50ZWdlcixcbiAgICAgKiBpdCB3aWxsIGRlZmF1bHQgdG8gMC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdmVyc2lvbiAtIFNlbXZlciBmb3JtYXR0ZWQgdmVyc2lvbiBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyBBIHZlcnNpb24gb2JqZWN0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZVZlcnNpb25TdHJpbmcodmVyc2lvbjogc3RyaW5nKTogVmVyc2lvbiB7XG4gICAgICAgIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IHZlcnNpb24uc3BsaXQoJy4nKTtcblxuICAgICAgICBsZXQgbWFqb3I6IG51bWJlciA9IHBhcnNlSW50KHBhcnRzWzBdKTtcbiAgICAgICAgbGV0IG1pbm9yOiBudW1iZXIgPSBwYXJzZUludChwYXJ0c1sxXSk7XG4gICAgICAgIGxldCBwYXRjaDogbnVtYmVyID0gcGFyc2VJbnQocGFydHNbMl0pO1xuXG4gICAgICAgIGlmIChpc05hTihtYWpvcikpIHtcbiAgICAgICAgICAgIG1ham9yID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc05hTihtaW5vcikpIHtcbiAgICAgICAgICAgIG1pbm9yID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc05hTihwYXRjaCkpIHtcbiAgICAgICAgICAgIHBhdGNoID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgVmVyc2lvbihtYWpvciwgbWlub3IsIHBhdGNoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc2VhbGVkXG4gICAgICogQHJldHVybnMgVGhlIG1ham9yIGNvbXBvbmVudCBvZiB0aGlzIHZlcnNpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0TWFqb3IoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG1ham9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBzZWFsZWRcbiAgICAgKiBAcmV0dXJucyBUaGUgbWlub3IgY29tcG9uZW50IG9mIHRoaXMgdmVyc2lvblxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRNaW5vcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kbWlub3I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHNlYWxlZFxuICAgICAqIEByZXR1cm5zIFRoZSBwYXRjaCBjb21wb25lbnQgb2YgdGhpcyB2ZXJzaW9uXG4gICAgICovXG4gICAgcHVibGljIGdldFBhdGNoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRwYXRjaDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc2VhbGVkXG4gICAgICogQHJldHVybnMgQSBzZW12ZXItZm9ybWF0dGVkIHN0cmluZ1xuICAgICAqL1xuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy4kbWFqb3J9LiR7dGhpcy4kbWlub3J9LiR7dGhpcy4kcGF0Y2h9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc2VhbGVkXG4gICAgICogQHBhcmFtIGIgLSBUaGUgcmlnaHQgc2lkZSB2ZXJzaW9uXG4gICAgICogQHJlbWFya3NcbiAgICAgKiAgVGhpcyBpcyB0aGUgZXF1aXZpbGFudCBpbiB1c2luZyBgVmVyc2lvbi5jb21wYXJlKHRoaXMsIGIpYC5cbiAgICAgKiAgU2VlIHtAbGluayBjb3BtYXJlfSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb21wYXJlKGI6IFZlcnNpb24pOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gVmVyc2lvbi5jb21wYXJlKHRoaXMsIGIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZW1hcmtzXG4gICAgICogQ29tcGFyZXMgdGhpcyB2ZXJzaW9uIHdpdGggYW5vdGhlci4gSWYgbGVmdCBzaWRlIGlzIGdyZWF0ZXIgdGhhbiByaWdodCBzaWRlLFxuICAgICAqIHtAbGluayBHUkVBVEVSX1RIQU59IGlzIHJldHVybmVkLiBJZiB0aGV5IGFyZSBlcXVhbCwge0BsaW5rIEVRVUFMfSBpcyByZXR1cm5lZC5cbiAgICAgKiBPdGhlcndpc2UsIHtAbGluayBMRVNTX1RIQU59IGlzIHJldHVybmVkLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBsaHMgLSBUaGUgbGVmdCBzaWRlIHZlcnNpb25cbiAgICAgKiBAcGFyYW0gcmhzIC0gVGhlIHJpZ2h0IHNpZGUgdmVyc2lvblxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29tcGFyZShsaHM6IFZlcnNpb24sIHJoczogVmVyc2lvbik6IG51bWJlciB7XG4gICAgICAgIGlmIChsaHMuJG1ham9yID09PSByaHMuJG1ham9yICYmIGxocy4kbWlub3IgPT09IHJocy4kbWlub3IgJiYgbGhzLiRwYXRjaCA9PT0gcmhzLiRwYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIFZlcnNpb24uRVFVQUw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGhzLiRtYWpvciA9PT0gcmhzLiRtYWpvcikge1xuICAgICAgICAgICAgaWYgKGxocy4kbWlub3IgPT09IHJocy4kbWlub3IpIHtcbiAgICAgICAgICAgICAgICBpZiAobGhzLiRwYXRjaCA9PT0gcmhzLiRwYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaG91bGRuJ3QgaGF2ZSByZWFjaGVkIGhlcmUuLi4gYXMgaXQgc2hvdWxkIGhhdmUgYmVlbiBjYXVnaHQgYnkgdGhlIHNpbXBsZSB0ZXN0IGFib3ZlIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1dCBmb3IgY29uc2lzdGVuY3kgd2Ugd2lsbCBrZWVwIGl0IGhlcmUuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBWZXJzaW9uLkVRVUFMXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGhzLiRwYXRjaCA+IHJocy4kcGF0Y2ggPyBWZXJzaW9uLkdSRUFURVJfVEhBTiA6IFZlcnNpb24uTEVTU19USEFOO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaHMuJG1pbm9yID4gcmhzLiRtaW5vciA/IFZlcnNpb24uR1JFQVRFUl9USEFOIDogVmVyc2lvbi5MRVNTX1RIQU47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbGhzLiRtYWpvciA+IHJocy4kbWFqb3IgPyBWZXJzaW9uLkdSRUFURVJfVEhBTiA6IFZlcnNpb24uTEVTU19USEFOO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjQgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSAnLi4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5pbXBvcnQgeyBGdXNlQ29udGV4dCB9IGZyb20gJy4uL0Z1c2VDb250ZXh0JztcbmltcG9ydCB7IElGdXNlTG9nZ2VyIH0gZnJvbSAnLi4vSUZ1c2VMb2dnZXInO1xuaW1wb3J0IHsgSUluc2V0IH0gZnJvbSAnLi4vSUluc2V0JztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi4vUGxhdGZvcm0nO1xuXG5leHBvcnQgY2xhc3MgQW5kcm9pZEZ1c2VDb250ZXh0IGV4dGVuZHMgRnVzZUNvbnRleHQge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5LCBsb2dnZXI6IElGdXNlTG9nZ2VyLCkge1xuICAgICAgICBzdXBlcihQbGF0Zm9ybS5BTkRST0lELCBhcGlGYWN0b3J5LCBsb2dnZXIpO1xuXG4gICAgICAgIHRoaXMuX2dldFJ1bnRpbWUoKS5yZWdpc3Rlckluc2V0SGFuZGxlcigoaW5zZXQ6IElJbnNldCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcjogSFRNTEh0bWxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignOnJvb3QnKTtcbiAgICAgICAgICAgIHIuc3R5bGUuc2V0UHJvcGVydHkoJy0tZnVzZS1pbnNldC10b3AnLCBgJHtpbnNldC50b3B9cHhgKTtcbiAgICAgICAgICAgIHIuc3R5bGUuc2V0UHJvcGVydHkoJy0tZnVzZS1pbnNldC1ib3R0b20nLCBgJHtpbnNldC5ib3R0b219cHhgKTtcbiAgICAgICAgICAgIHIuc3R5bGUuc2V0UHJvcGVydHkoJy0tZnVzZS1pbnNldC1sZWZ0JywgYCR7aW5zZXQubGVmdH1weGApO1xuICAgICAgICAgICAgci5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1mdXNlLWluc2V0LXJpZ2h0JywgYCR7aW5zZXQucmlnaHR9cHhgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIG9uV2Vidmlld1JlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB3aW5kb3cuQlRGdXNlTmF0aXZlLm9uV2Vidmlld1JlYWR5KCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBJTmF0aXZlTG9nRW50cnkgfSBmcm9tICcuLi9JRnVzZUxvZ2dlcic7XG5pbXBvcnQge0Z1c2VMb2dnZXJ9IGZyb20gJy4uL0Z1c2VMb2dnZXInO1xuaW1wb3J0IHtGdXNlTG9nZ2VyTGV2ZWx9IGZyb20gJy4uL0Z1c2VMb2dnZXJMZXZlbCc7XG5pbXBvcnQgeyBGdXNlQ2FsbGJhY2tNYW5hZ2VyIH0gZnJvbSAnLi4vRnVzZUNhbGxiYWNrTWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBBbmRyb2lkRnVzZUxvZ2dlciBleHRlbmRzIEZ1c2VMb2dnZXIge1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfbG9nVG9OYXRpdmUobGV2ZWw6IEZ1c2VMb2dnZXJMZXZlbCwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy5CVEZ1c2VOYXRpdmUubG9nKGxldmVsLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX3JlZ2lzdGVyTmF0aXZlQ2FsYmxhY2soKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy5CVEZ1c2VOYXRpdmUuc2V0TG9nQ2FsbGJhY2soRnVzZUNhbGxiYWNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUNhbGxiYWNrKChwYXlsb2FkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnRyeTogSU5hdGl2ZUxvZ0VudHJ5ID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZW50cnkgPSBKU09OLnBhcnNlKHBheWxvYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9vbk5hdGl2ZUxvZ0VudHJ5KGVudHJ5KTtcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtIVFRQRnVzZUFQSX0gZnJvbSAnLi4vSFRUUEZ1c2VBUEknO1xuXG4vKipcbiAqIEEgRnVzZSBBUEkgaW1wbGVtZW50YXRpb24gZm9yIGFuIGVtYmVkZGVkIEhUVFAgc2VydmVyIHRvIGJyaWRnZSB0aGUgSlMgYW5kIE5hdGl2ZSBBUEkgY2FsbHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbmRyb2lkU2NoZW1lRnVzZUFQSSBleHRlbmRzIEhUVFBGdXNlQVBJIHtcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX2dldEVuZHBvaW50KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBgaHR0cHM6Ly9sb2NhbGhvc3Q6JHt3aW5kb3cuQlRGdXNlTmF0aXZlLmdldEFQSVBvcnQoKX1gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBhc3luYyBfaW5pdEhlYWRlcnMoeGhyOiBYTUxIdHRwUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1GdXNlLVNlY3JldCcsIHdpbmRvdy5CVEZ1c2VOYXRpdmUuZ2V0QVBJU2VjcmV0KCkpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLy8gQ29tbW9uIEFQSVxuZXhwb3J0IHtQbGF0Zm9ybX0gZnJvbSAnLi9QbGF0Zm9ybSc7XG5leHBvcnQge1BsYXRmb3JtUmVzb2x2ZXJ9IGZyb20gJy4vUGxhdGZvcm1SZXNvbHZlcic7XG5leHBvcnQge0Z1c2VDb250ZXh0fSBmcm9tICcuL0Z1c2VDb250ZXh0JztcbmV4cG9ydCB7RnVzZUNvbnRleHRCdWlsZGVyfSBmcm9tICcuL0Z1c2VDb250ZXh0QnVpbGRlcic7XG5leHBvcnQge1ZlcnNpb259IGZyb20gJy4vVmVyc2lvbic7XG5leHBvcnQge1xuICAgIEZ1c2VBUEksXG4gICAgVEZ1c2VBUElSZXNwb25zZURhdGEsXG4gICAgSUZ1c2VBUElDYWxsUGFja2V0XG59IGZyb20gJy4vRnVzZUFQSSc7XG5leHBvcnQge0Z1c2VDYWxsYmFja01hbmFnZXIsIFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyfSBmcm9tICcuL0Z1c2VDYWxsYmFja01hbmFnZXInO1xuZXhwb3J0IHtGdXNlQVBJUmVzcG9uc2V9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmV4cG9ydCB7Q29udGVudFR5cGV9IGZyb20gJy4vQ29udGVudFR5cGUnO1xuZXhwb3J0IHtGdXNlUmVzcG9uc2VSZWFkZXJ9IGZyb20gJy4vRnVzZVJlc3BvbnNlUmVhZGVyJztcbmV4cG9ydCB7RnVzZUFQSUZhY3Rvcnl9IGZyb20gJy4vRnVzZUFQSUZhY3RvcnknO1xuZXhwb3J0IHtBYnN0cmFjdEZ1c2VBUElGYWN0b3J5fSBmcm9tICcuL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnknO1xuZXhwb3J0IHtcbiAgICBGdXNlUnVudGltZSxcbiAgICBUUGF1c2VDYWxsYmFja0hhbmRsZXIsXG4gICAgVFJlc3VtZUNhbGxiYWNrSGFuZGxlcixcbiAgICBJUnVudGltZUluZm9cbn0gZnJvbSAnLi9wbHVnaW5zL0Z1c2VSdW50aW1lJztcbmV4cG9ydCB7RnVzZVBsdWdpbiwgVEFQSUJyaWRnZUZ1bmN0aW9ufSBmcm9tICcuL0Z1c2VQbHVnaW4nO1xuZXhwb3J0IHtIVFRQRnVzZUFQSX0gZnJvbSAnLi9IVFRQRnVzZUFQSSc7XG5leHBvcnQge0Z1c2VFcnJvcn0gZnJvbSAnLi9GdXNlRXJyb3InO1xuXG4vLyBVdGlsaXRpZXNcbmV4cG9ydCB7SUluc2V0fSBmcm9tICcuL0lJbnNldCc7XG5leHBvcnQge0lTZXJpYWxpemFibGV9IGZyb20gJy4vSVNlcmlhbGl6YWJsZSc7XG5leHBvcnQge1RTZXJpYWxpemFibGUsIFRGdXNlU2VyaWFsaXphYmxlfSBmcm9tICcuL1RTZXJpYWxpemFibGUnO1xuZXhwb3J0IHtGdXNlU2VyaWFsaXplcn0gZnJvbSAnLi9GdXNlU2VyaWFsaXplcic7XG5leHBvcnQge0lGdXNlUGVybWlzc2lvblJlcXVlc3R9IGZyb20gJy4vSUZ1c2VQZXJtaXNzaW9uUmVxdWVzdCc7XG5leHBvcnQge0Z1c2VQZXJtaXNzaW9uU3RhdGV9IGZyb20gJy4vRnVzZVBlcm1pc3Npb25TdGF0ZSc7XG5leHBvcnQge1xuICAgIEZ1c2VQZXJtaXNzaW9uUmVxdWVzdCxcbiAgICBURnVzZUFQSVBlcm1pc3Npb25SZXF1ZXN0LFxuICAgIFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIsXG4gICAgVEZ1c2VQZXJtaXNzaW9uUmVxdWVzdEFyZ3VtZW50c1xufSBmcm9tICcuL0Z1c2VQZXJtaXNzaW9uUmVxdWVzdCc7XG5leHBvcnQge0lGdXNlR3JhbnRSZXN1bHR9IGZyb20gJy4vSUZ1c2VHcmFudFJlc3VsdCc7XG5leHBvcnQge0Z1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHR9IGZyb20gJy4vRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdCc7XG5cbi8vIExvZ2dlclxuZXhwb3J0IHtGdXNlTG9nZ2VyTGV2ZWx9IGZyb20gJy4vRnVzZUxvZ2dlckxldmVsJztcbmV4cG9ydCB7SUZ1c2VMb2dnZXIsIElOYXRpdmVMb2dFbnRyeX0gZnJvbSAnLi9JRnVzZUxvZ2dlcic7XG5leHBvcnQge0Z1c2VMb2dnZXIsIEZ1c2VMb2dnZXJTZXJpYWxpemVyfSBmcm9tICcuL0Z1c2VMb2dnZXInO1xuZXhwb3J0IHtBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5fSBmcm9tICcuL0Fic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnknO1xuZXhwb3J0IHtGdXNlTG9nZ2VyRmFjdG9yeX0gZnJvbSAnLi9GdXNlTG9nZ2VyRmFjdG9yeSc7XG5cbi8vIGlPUyBTcGVjaWZpYyBBUElzIC8gSW1wbGVtZW50YXRpb25zXG5leHBvcnQge0lPU1NjaGVtZUZ1c2VBUEl9IGZyb20gJy4vaW9zL0lPU1NjaGVtZUZ1c2VBUEknO1xuZXhwb3J0IHtJT1NGdXNlTG9nZ2VyfSBmcm9tICcuL2lvcy9JT1NGdXNlTG9nZ2VyJztcblxuLy8gQW5kcm9pZCBTcGVjaWZpYyBBUElzIC8gSW1wbGVtZW50YXRpb25zXG5leHBvcnQge0FuZHJvaWRTY2hlbWVGdXNlQVBJfSBmcm9tICcuL2FuZHJvaWQvQW5kcm9pZFNjaGVtZUZ1c2VBUEknO1xuZXhwb3J0IHtBbmRyb2lkRnVzZUxvZ2dlcn0gZnJvbSAnLi9hbmRyb2lkL0FuZHJvaWRGdXNlTG9nZ2VyJztcbiIsIlxuLypcbkNvcHlyaWdodCAyMDI0IEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gJy4uL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnknO1xuaW1wb3J0IHsgRnVzZUNvbnRleHQgfSBmcm9tICcuLi9GdXNlQ29udGV4dCc7XG5pbXBvcnQgeyBJRnVzZUxvZ2dlciB9IGZyb20gJy4uL0lGdXNlTG9nZ2VyJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi4vUGxhdGZvcm0nO1xuXG5leHBvcnQgY2xhc3MgSU9TRnVzZUNvbnRleHQgZXh0ZW5kcyBGdXNlQ29udGV4dCB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGFwaUZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3RvcnksIGxvZ2dlcjogSUZ1c2VMb2dnZXIsKSB7XG4gICAgICAgIHN1cGVyKFBsYXRmb3JtLklPUywgYXBpRmFjdG9yeSwgbG9nZ2VyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgb25XZWJ2aWV3UmVhZHkoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLm9uV2Vidmlld1JlYWR5LnBvc3RNZXNzYWdlKCcnKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IElOYXRpdmVMb2dFbnRyeSB9IGZyb20gJy4uL0lGdXNlTG9nZ2VyJztcbmltcG9ydCB7IEZ1c2VMb2dnZXIgfSBmcm9tIFwiLi4vRnVzZUxvZ2dlclwiO1xuaW1wb3J0IHsgRnVzZUxvZ2dlckxldmVsIH0gZnJvbSBcIi4uL0Z1c2VMb2dnZXJMZXZlbFwiO1xuaW1wb3J0IHsgRnVzZUNhbGxiYWNrTWFuYWdlciB9IGZyb20gJy4uL0Z1c2VDYWxsYmFja01hbmFnZXInO1xuXG5leHBvcnQgY2xhc3MgSU9TRnVzZUxvZ2dlciBleHRlbmRzIEZ1c2VMb2dnZXIge1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfbG9nVG9OYXRpdmUobGV2ZWw6IEZ1c2VMb2dnZXJMZXZlbCwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLmxvZy5wb3N0TWVzc2FnZShbbGV2ZWwsIG1lc3NhZ2VdKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX3JlZ2lzdGVyTmF0aXZlQ2FsYmxhY2soKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLnNldExvZ0NhbGxiYWNrLnBvc3RNZXNzYWdlKEZ1c2VDYWxsYmFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVDYWxsYmFjaygocGF5bG9hZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW50cnk6IElOYXRpdmVMb2dFbnRyeSA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGVudHJ5ID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fb25OYXRpdmVMb2dFbnRyeShlbnRyeSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7SFRUUEZ1c2VBUEl9IGZyb20gJy4uL0hUVFBGdXNlQVBJJztcblxuLyoqXG4gKiBBIEZ1c2UgQVBJIGltcGxlbWVudGF0aW9uIGZvciBpT1MgdGhhdCB1c2VzIFdLVVJMU2NoZW1lSGFuZGxlciB0byBicmlkZ2UgdGhlIEpTIGFuZCBOYXRpdmUgQVBJIGNhbGxzLlxuICovXG5leHBvcnQgY2xhc3MgSU9TU2NoZW1lRnVzZUFQSSBleHRlbmRzIEhUVFBGdXNlQVBJIHtcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX2dldEVuZHBvaW50KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBgaHR0cHM6Ly9sb2NhbGhvc3Q6JHthd2FpdCB3aW5kb3cud2Via2l0Lm1lc3NhZ2VIYW5kbGVycy5nZXRBUElQb3J0LnBvc3RNZXNzYWdlKFwiXCIpfWA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIF9pbml0SGVhZGVycyh4aHI6IFhNTEh0dHBSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUZ1c2UtU2VjcmV0JywgYXdhaXQgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuZ2V0QVBJU2VjcmV0LnBvc3RNZXNzYWdlKFwiXCIpKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IENvbnRlbnRUeXBlIH0gZnJvbSAnLi4vQ29udGVudFR5cGUnO1xuaW1wb3J0IHsgRnVzZUNvbnRleHQgfSBmcm9tICcuLi9GdXNlQ29udGV4dCc7XG5pbXBvcnQge0Z1c2VQbHVnaW59IGZyb20gJy4uL0Z1c2VQbHVnaW4nO1xuaW1wb3J0IHtGdXNlQVBJUmVzcG9uc2V9IGZyb20gJy4uL0Z1c2VBUElSZXNwb25zZSc7XG5pbXBvcnQgeyBUSW5zZXRDYWxsYmFjayB9IGZyb20gJy4uL1RJbnNldENhbGxiYWNrJztcblxuZXhwb3J0IHR5cGUgVFBhdXNlQ2FsbGJhY2tIYW5kbGVyID0gKCkgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIFRSZXN1bWVDYWxsYmFja0hhbmRsZXIgPSAoKSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSdW50aW1lSW5mbyB7XG4gICAgdmVyc2lvbjogc3RyaW5nO1xuICAgIGRlYnVnTW9kZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIEZ1c2VSdW50aW1lIGV4dGVuZHMgRnVzZVBsdWdpbiB7XG4gICAgcHJpdmF0ZSAkY2FsbGJhY2tJRHM6IHN0cmluZ1tdO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEZ1c2VDb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLiRjYWxsYmFja0lEcyA9IFtdO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfZ2V0SUQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdGdXNlUnVudGltZSc7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBhc3luYyBnZXRJbmZvKCk6IFByb21pc2U8SVJ1bnRpbWVJbmZvPiB7XG4gICAgICAgIGNvbnN0IGRhdGE6IEZ1c2VBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMuX2V4ZWMoJy9pbmZvJyk7XG4gICAgICAgIHJldHVybiBhd2FpdCBkYXRhLnJlYWRBc0pTT04oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXJQYXVzZUhhbmRsZXIoY2I6IFRQYXVzZUNhbGxiYWNrSGFuZGxlcik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGNiSUQ6IHN0cmluZyA9IHRoaXMuX2NyZWF0ZUNhbGxiYWNrKChwYXlsb2FkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuX2V4ZWMoJy9yZWdpc3RlclBhdXNlSGFuZGxlcicsIENvbnRlbnRUeXBlLlRFWFQsIGNiSUQpO1xuICAgICAgICB0aGlzLiRjYWxsYmFja0lEcy5wdXNoKGNiSUQpO1xuXG4gICAgICAgIHJldHVybiBjYklEO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1bnJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNhbGxiYWNrSUQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLl9leGVjKCcvdW5yZWdpc3RlclBhdXNlSGFuZGxlcicsIENvbnRlbnRUeXBlLlRFWFQsIGNhbGxiYWNrSUQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWdpc3RlclJlc3VtZUhhbmRsZXIoY2I6IFRSZXN1bWVDYWxsYmFja0hhbmRsZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjYklEOiBzdHJpbmcgPSB0aGlzLl9jcmVhdGVDYWxsYmFjaygocGF5bG9hZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB0aGlzLl9leGVjKCcvcmVnaXN0ZXJSZXN1bWVIYW5kbGVyJywgQ29udGVudFR5cGUuVEVYVCwgY2JJRCk7XG4gICAgICAgIHRoaXMuJGNhbGxiYWNrSURzLnB1c2goY2JJRCk7XG5cbiAgICAgICAgcmV0dXJuIGNiSUQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHVucmVnaXN0ZXJSZXN1bWVIYW5kbGVyKGNhbGxiYWNrSUQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLl9leGVjKCcvdW5yZWdpc3RlclJlc3VtZUhhbmRsZXInLCBDb250ZW50VHlwZS5URVhULCBjYWxsYmFja0lEKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXJJbnNldEhhbmRsZXIoY2I6IFRJbnNldENhbGxiYWNrKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgY2JJRDogc3RyaW5nID0gdGhpcy5fY3JlYXRlQ2FsbGJhY2soKHBheWxvYWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY2IoSlNPTi5wYXJzZShwYXlsb2FkKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuX2V4ZWMoJy9yZWdpc3Rlci9jYWxsYmFjay9pbnNldHMnLCBDb250ZW50VHlwZS5URVhULCBjYklEKTtcblxuICAgICAgICByZXR1cm4gY2JJRDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdW5yZWdpc3Rlckluc2V0SGFuZGxlcihjYWxsYmFja0lEOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3VucmVnaXN0ZXIvY2FsbGJhY2svaW5zZXRzJywgQ29udGVudFR5cGUuVEVYVCwgY2FsbGJhY2tJRCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWsgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtcbiAgICBGdXNlUGx1Z2luLFxuICAgIENvbnRlbnRUeXBlLFxuICAgIEZ1c2VBUElSZXNwb25zZVxufSBmcm9tICdAYnRmdXNlL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgRWNob1BsdWdpbiBleHRlbmRzIEZ1c2VQbHVnaW4ge1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfZ2V0SUQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdlY2hvJztcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZWNobyhtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBsZXQgcjogRnVzZUFQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZXhlYygnL2VjaG8nLCBDb250ZW50VHlwZS5URVhULCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHIucmVhZEFzVGV4dCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBzdWJzY3JpYmUoY2I6IChkYXRhOiBzdHJpbmcpID0+IHZvaWQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBsZXQgY2FsbGJhY2tJRDogc3RyaW5nID0gdGhpcy5fY3JlYXRlQ2FsbGJhY2soKHBheWxvYWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY2IocGF5bG9hZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuX2V4ZWMoJy9zdWJzY3JpYmUnLCBDb250ZW50VHlwZS5URVhULCBjYWxsYmFja0lEKTtcblxuICAgICAgICByZXR1cm4gY2FsbGJhY2tJRDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgYmlnUmVzcG9uc2UoKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgICAgICBsZXQgcjogRnVzZUFQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZXhlYygnL2JpZycpO1xuICAgICAgICByZXR1cm4gYXdhaXQgci5yZWFkQXNBcnJheUJ1ZmZlcigpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTUFYXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9tYXguZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOSUxcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX25pbC5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInBhcnNlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9wYXJzZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0cmluZ2lmeVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjFcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2MVRvVjZcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YxVG9WLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YyLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjRcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YzLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3Y0LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjZcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3Y1LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjZUb1YxXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92NlRvVi5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInY3XCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92Ni5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZhbGlkYXRlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92YWxpZGF0ZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZlcnNpb25cIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3ZlcnNpb24uZGVmYXVsdDtcbiAgfVxufSk7XG52YXIgX21heCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbWF4LmpzXCIpKTtcbnZhciBfbmlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9uaWwuanNcIikpO1xudmFyIF9wYXJzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcGFyc2UuanNcIikpO1xudmFyIF9zdHJpbmdpZnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKSk7XG52YXIgX3YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YxLmpzXCIpKTtcbnZhciBfdjFUb1YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YxVG9WNi5qc1wiKSk7XG52YXIgX3YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92My5qc1wiKSk7XG52YXIgX3YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NC5qc1wiKSk7XG52YXIgX3Y0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NS5qc1wiKSk7XG52YXIgX3Y1ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92Ni5qc1wiKSk7XG52YXIgX3Y2VG9WID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NlRvVjEuanNcIikpO1xudmFyIF92NiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjcuanNcIikpO1xudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xudmFyIF92ZXJzaW9uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92ZXJzaW9uLmpzXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9ICdmZmZmZmZmZi1mZmZmLWZmZmYtZmZmZi1mZmZmZmZmZmZmZmYnOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuLypcbiAqIEJyb3dzZXItY29tcGF0aWJsZSBKYXZhU2NyaXB0IE1ENVxuICpcbiAqIE1vZGlmaWNhdGlvbiBvZiBKYXZhU2NyaXB0IE1ENVxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvSmF2YVNjcmlwdC1NRDVcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSwgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQmFzZWQgb25cbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXG4gKiBWZXJzaW9uIDIuMiBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDlcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIG1vcmUgaW5mby5cbiAqL1xuZnVuY3Rpb24gbWQ1KGJ5dGVzKSB7XG4gIGlmICh0eXBlb2YgYnl0ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShtc2cubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXNbaV0gPSBtc2cuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1kNVRvSGV4RW5jb2RlZEFycmF5KHdvcmRzVG9NZDUoYnl0ZXNUb1dvcmRzKGJ5dGVzKSwgYnl0ZXMubGVuZ3RoICogOCkpO1xufVxuXG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGFuIGFycmF5IG9mIGJ5dGVzXG4gKi9cbmZ1bmN0aW9uIG1kNVRvSGV4RW5jb2RlZEFycmF5KGlucHV0KSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgdmFyIGxlbmd0aDMyID0gaW5wdXQubGVuZ3RoICogMzI7XG4gIHZhciBoZXhUYWIgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoMzI7IGkgKz0gOCkge1xuICAgIHZhciB4ID0gaW5wdXRbaSA+PiA1XSA+Pj4gaSAlIDMyICYgMHhmZjtcbiAgICB2YXIgaGV4ID0gcGFyc2VJbnQoaGV4VGFiLmNoYXJBdCh4ID4+PiA0ICYgMHgwZikgKyBoZXhUYWIuY2hhckF0KHggJiAweDBmKSwgMTYpO1xuICAgIG91dHB1dC5wdXNoKGhleCk7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgb3V0cHV0IGxlbmd0aCB3aXRoIHBhZGRpbmcgYW5kIGJpdCBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gZ2V0T3V0cHV0TGVuZ3RoKGlucHV0TGVuZ3RoOCkge1xuICByZXR1cm4gKGlucHV0TGVuZ3RoOCArIDY0ID4+PiA5IDw8IDQpICsgMTQgKyAxO1xufVxuXG4vKlxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAqL1xuZnVuY3Rpb24gd29yZHNUb01kNSh4LCBsZW4pIHtcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCBsZW4gJSAzMjtcbiAgeFtnZXRPdXRwdXRMZW5ndGgobGVuKSAtIDFdID0gbGVuO1xuICB2YXIgYSA9IDE3MzI1ODQxOTM7XG4gIHZhciBiID0gLTI3MTczMzg3OTtcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcbiAgdmFyIGQgPSAyNzE3MzM4Nzg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICB2YXIgb2xkYSA9IGE7XG4gICAgdmFyIG9sZGIgPSBiO1xuICAgIHZhciBvbGRjID0gYztcbiAgICB2YXIgb2xkZCA9IGQ7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaV0sIDcsIC02ODA4NzY5MzYpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTcsIDYwNjEwNTgxOSk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNywgLTE3NjQxODg5Nyk7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDVdLCAxMiwgMTIwMDA4MDQyNik7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA3LCAxNzcwMDM1NDE2KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA3LCAxODA0NjAzNjgyKTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAxMjM2NTM1MzI5KTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyA2XSwgOSwgLTEwNjk1MDE2MzIpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCA2NDM3MTc3MTMpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMik7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA1LCAtNzAxNTU4NjkxKTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCA5LCAzODAxNjA4Myk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNSwgNTY4NDQ2NDM4KTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MCk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDhdLCAyMCwgMTE2MzUzMTUwMSk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAyXSwgOSwgLTUxNDAzNzg0KTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgN10sIDE0LCAxNzM1MzI4NDczKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNCwgLTM3ODU1OCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE2LCAxODM5MDMwNTYyKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMV0sIDQsIC0xNTMwOTkyMDYwKTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgNF0sIDExLCAxMjcyODkzMzUzKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgN10sIDE2LCAtMTU1NDk3NjMyKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDQsIDY4MTI3OTE3NCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaV0sIDExLCAtMzU4NTM3MjIyKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgM10sIDE2LCAtNzIyNTIxOTc5KTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgNl0sIDIzLCA3NjAyOTE4OSk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDldLCA0LCAtNjQwMzY0NDg3KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTYsIDUzMDc0MjUyMCk7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDJdLCAyMywgLTk5NTMzODY1MSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaV0sIDYsIC0xOTg2MzA4NDQpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyA3XSwgMTAsIDExMjY4OTE0MTUpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDVdLCAyMSwgLTU3NDM0MDU1KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA2LCAxNzAwNDg1NTcxKTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgM10sIDEwLCAtMTg5NDk4NjYwNik7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA2LCAxODczMzEzMzU5KTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDEzXSwgMjEsIDEzMDkxNTE2NDkpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNiwgLTE0NTUyMzA3MCk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE1LCA3MTg3ODcyNTkpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xuICAgIGEgPSBzYWZlQWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlQWRkKGIsIG9sZGIpO1xuICAgIGMgPSBzYWZlQWRkKGMsIG9sZGMpO1xuICAgIGQgPSBzYWZlQWRkKGQsIG9sZGQpO1xuICB9XG4gIHJldHVybiBbYSwgYiwgYywgZF07XG59XG5cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IGJ5dGVzIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcbiAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICovXG5mdW5jdGlvbiBieXRlc1RvV29yZHMoaW5wdXQpIHtcbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICB2YXIgbGVuZ3RoOCA9IGlucHV0Lmxlbmd0aCAqIDg7XG4gIHZhciBvdXRwdXQgPSBuZXcgVWludDMyQXJyYXkoZ2V0T3V0cHV0TGVuZ3RoKGxlbmd0aDgpKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg4OyBpICs9IDgpIHtcbiAgICBvdXRwdXRbaSA+PiA1XSB8PSAoaW5wdXRbaSAvIDhdICYgMHhmZikgPDwgaSAlIDMyO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbi8qXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICovXG5mdW5jdGlvbiBzYWZlQWRkKHgsIHkpIHtcbiAgdmFyIGxzdyA9ICh4ICYgMHhmZmZmKSArICh5ICYgMHhmZmZmKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gbXN3IDw8IDE2IHwgbHN3ICYgMHhmZmZmO1xufVxuXG4vKlxuICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICovXG5mdW5jdGlvbiBiaXRSb3RhdGVMZWZ0KG51bSwgY250KSB7XG4gIHJldHVybiBudW0gPDwgY250IHwgbnVtID4+PiAzMiAtIGNudDtcbn1cblxuLypcbiAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gKi9cbmZ1bmN0aW9uIG1kNWNtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gIHJldHVybiBzYWZlQWRkKGJpdFJvdGF0ZUxlZnQoc2FmZUFkZChzYWZlQWRkKGEsIHEpLCBzYWZlQWRkKHgsIHQpKSwgcyksIGIpO1xufVxuZnVuY3Rpb24gbWQ1ZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBjIHwgfmIgJiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cbmZ1bmN0aW9uIG1kNWdnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgZCB8IGMgJiB+ZCwgYSwgYiwgeCwgcywgdCk7XG59XG5mdW5jdGlvbiBtZDVoaChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cbmZ1bmN0aW9uIG1kNWlpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gbWQ1OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSB7XG4gIHJhbmRvbVVVSURcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSAnMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwJzsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbmZ1bmN0aW9uIHBhcnNlKHV1aWQpIHtcbiAgaWYgKCEoMCwgX3ZhbGlkYXRlLmRlZmF1bHQpKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuICB2YXIgdjtcbiAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDE2KTtcblxuICAvLyBQYXJzZSAjIyMjIyMjIy0uLi4uLS4uLi4tLi4uLi0uLi4uLi4uLi4uLi5cbiAgYXJyWzBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDAsIDgpLCAxNikpID4+PiAyNDtcbiAgYXJyWzFdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMl0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzNdID0gdiAmIDB4ZmY7XG5cbiAgLy8gUGFyc2UgLi4uLi4uLi4tIyMjIy0uLi4uLS4uLi4tLi4uLi4uLi4uLi4uXG4gIGFycls0XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSg5LCAxMyksIDE2KSkgPj4+IDg7XG4gIGFycls1XSA9IHYgJiAweGZmO1xuXG4gIC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tIyMjIy0uLi4uLS4uLi4uLi4uLi4uLlxuICBhcnJbNl0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE4KSwgMTYpKSA+Pj4gODtcbiAgYXJyWzddID0gdiAmIDB4ZmY7XG5cbiAgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0uLi4uLSMjIyMtLi4uLi4uLi4uLi4uXG4gIGFycls4XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxOSwgMjMpLCAxNikpID4+PiA4O1xuICBhcnJbOV0gPSB2ICYgMHhmZjtcblxuICAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLS4uLi4tLi4uLi0jIyMjIyMjIyMjIyNcbiAgLy8gKFVzZSBcIi9cIiB0byBhdm9pZCAzMi1iaXQgdHJ1bmNhdGlvbiB3aGVuIGJpdC1zaGlmdGluZyBoaWdoLW9yZGVyIGJ5dGVzKVxuICBhcnJbMTBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDI0LCAzNiksIDE2KSkgLyAweDEwMDAwMDAwMDAwICYgMHhmZjtcbiAgYXJyWzExXSA9IHYgLyAweDEwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMl0gPSB2ID4+PiAyNCAmIDB4ZmY7XG4gIGFyclsxM10gPSB2ID4+PiAxNiAmIDB4ZmY7XG4gIGFyclsxNF0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzE1XSA9IHYgJiAweGZmO1xuICByZXR1cm4gYXJyO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gcGFyc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLThdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMHxmZmZmZmZmZi1mZmZmLWZmZmYtZmZmZi1mZmZmZmZmZmZmZmYpJC9pOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gcm5nO1xuLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5cbnZhciBnZXRSYW5kb21WYWx1ZXM7XG52YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5mdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuLy8gQWRhcHRlZCBmcm9tIENocmlzIFZlbmVzcycgU0hBMSBjb2RlIGF0XG4vLyBodHRwOi8vd3d3Lm1vdmFibGUtdHlwZS5jby51ay9zY3JpcHRzL3NoYTEuaHRtbFxuZnVuY3Rpb24gZihzLCB4LCB5LCB6KSB7XG4gIHN3aXRjaCAocykge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiB4ICYgeSBeIH54ICYgejtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4ICYgeSBeIHggJiB6IF4geSAmIHo7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIHggXiB5IF4gejtcbiAgfVxufVxuZnVuY3Rpb24gUk9UTCh4LCBuKSB7XG4gIHJldHVybiB4IDw8IG4gfCB4ID4+PiAzMiAtIG47XG59XG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gIHZhciBLID0gWzB4NWE4Mjc5OTksIDB4NmVkOWViYTEsIDB4OGYxYmJjZGMsIDB4Y2E2MmMxZDZdO1xuICB2YXIgSCA9IFsweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLCAweDEwMzI1NDc2LCAweGMzZDJlMWYwXTtcbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgbXNnID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGJ5dGVzKSk7IC8vIFVURjggZXNjYXBlXG5cbiAgICBieXRlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlcy5wdXNoKG1zZy5jaGFyQ29kZUF0KGkpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoYnl0ZXMpKSB7XG4gICAgLy8gQ29udmVydCBBcnJheS1saWtlIHRvIEFycmF5XG4gICAgYnl0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChieXRlcyk7XG4gIH1cbiAgYnl0ZXMucHVzaCgweDgwKTtcbiAgdmFyIGwgPSBieXRlcy5sZW5ndGggLyA0ICsgMjtcbiAgdmFyIE4gPSBNYXRoLmNlaWwobCAvIDE2KTtcbiAgdmFyIE0gPSBuZXcgQXJyYXkoTik7XG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBOOyArK19pKSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50MzJBcnJheSgxNik7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICBhcnJbal0gPSBieXRlc1tfaSAqIDY0ICsgaiAqIDRdIDw8IDI0IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgMV0gPDwgMTYgfCBieXRlc1tfaSAqIDY0ICsgaiAqIDQgKyAyXSA8PCA4IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgM107XG4gICAgfVxuICAgIE1bX2ldID0gYXJyO1xuICB9XG4gIE1bTiAtIDFdWzE0XSA9IChieXRlcy5sZW5ndGggLSAxKSAqIDggLyBNYXRoLnBvdygyLCAzMik7XG4gIE1bTiAtIDFdWzE0XSA9IE1hdGguZmxvb3IoTVtOIC0gMV1bMTRdKTtcbiAgTVtOIC0gMV1bMTVdID0gKGJ5dGVzLmxlbmd0aCAtIDEpICogOCAmIDB4ZmZmZmZmZmY7XG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IE47ICsrX2kyKSB7XG4gICAgdmFyIFcgPSBuZXcgVWludDMyQXJyYXkoODApO1xuICAgIGZvciAodmFyIHQgPSAwOyB0IDwgMTY7ICsrdCkge1xuICAgICAgV1t0XSA9IE1bX2kyXVt0XTtcbiAgICB9XG4gICAgZm9yICh2YXIgX3QgPSAxNjsgX3QgPCA4MDsgKytfdCkge1xuICAgICAgV1tfdF0gPSBST1RMKFdbX3QgLSAzXSBeIFdbX3QgLSA4XSBeIFdbX3QgLSAxNF0gXiBXW190IC0gMTZdLCAxKTtcbiAgICB9XG4gICAgdmFyIGEgPSBIWzBdO1xuICAgIHZhciBiID0gSFsxXTtcbiAgICB2YXIgYyA9IEhbMl07XG4gICAgdmFyIGQgPSBIWzNdO1xuICAgIHZhciBlID0gSFs0XTtcbiAgICBmb3IgKHZhciBfdDIgPSAwOyBfdDIgPCA4MDsgKytfdDIpIHtcbiAgICAgIHZhciBzID0gTWF0aC5mbG9vcihfdDIgLyAyMCk7XG4gICAgICB2YXIgVCA9IFJPVEwoYSwgNSkgKyBmKHMsIGIsIGMsIGQpICsgZSArIEtbc10gKyBXW190Ml0gPj4+IDA7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IFJPVEwoYiwgMzApID4+PiAwO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gVDtcbiAgICB9XG4gICAgSFswXSA9IEhbMF0gKyBhID4+PiAwO1xuICAgIEhbMV0gPSBIWzFdICsgYiA+Pj4gMDtcbiAgICBIWzJdID0gSFsyXSArIGMgPj4+IDA7XG4gICAgSFszXSA9IEhbM10gKyBkID4+PiAwO1xuICAgIEhbNF0gPSBIWzRdICsgZSA+Pj4gMDtcbiAgfVxuICByZXR1cm4gW0hbMF0gPj4gMjQgJiAweGZmLCBIWzBdID4+IDE2ICYgMHhmZiwgSFswXSA+PiA4ICYgMHhmZiwgSFswXSAmIDB4ZmYsIEhbMV0gPj4gMjQgJiAweGZmLCBIWzFdID4+IDE2ICYgMHhmZiwgSFsxXSA+PiA4ICYgMHhmZiwgSFsxXSAmIDB4ZmYsIEhbMl0gPj4gMjQgJiAweGZmLCBIWzJdID4+IDE2ICYgMHhmZiwgSFsyXSA+PiA4ICYgMHhmZiwgSFsyXSAmIDB4ZmYsIEhbM10gPj4gMjQgJiAweGZmLCBIWzNdID4+IDE2ICYgMHhmZiwgSFszXSA+PiA4ICYgMHhmZiwgSFszXSAmIDB4ZmYsIEhbNF0gPj4gMjQgJiAweGZmLCBIWzRdID4+IDE2ICYgMHhmZiwgSFs0XSA+PiA4ICYgMHhmZiwgSFs0XSAmIDB4ZmZdO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gc2hhMTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbmV4cG9ydHMudW5zYWZlU3RyaW5naWZ5ID0gdW5zYWZlU3RyaW5naWZ5O1xudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5mdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICAvL1xuICAvLyBOb3RlIHRvIGZ1dHVyZS1zZWxmOiBObywgeW91IGNhbid0IHJlbW92ZSB0aGUgYHRvTG93ZXJDYXNlKClgIGNhbGwuXG4gIC8vIFJFRjogaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNjc3I2lzc3VlY29tbWVudC0xNzU3MzUxMzUxXG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIHZhciB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTtcbiAgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuICBpZiAoISgwLCBfdmFsaWRhdGUuZGVmYXVsdCkodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG4gIHJldHVybiB1dWlkO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gc3RyaW5naWZ5OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9ybmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JuZy5qc1wiKSk7XG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG52YXIgX2Nsb2Nrc2VxO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBuZXcgQXJyYXkoMTYpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGU7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXE7XG5cbiAgLy8gdjEgb25seTogVXNlIGNhY2hlZCBgbm9kZWAgYW5kIGBjbG9ja3NlcWAgdmFsdWVzXG4gIGlmICghb3B0aW9ucy5fdjYpIHtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIG5vZGUgPSBfbm9kZUlkO1xuICAgIH1cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXE7XG4gICAgfVxuICB9XG5cbiAgLy8gSGFuZGxlIGNhc2VzIHdoZXJlIHdlIG5lZWQgZW50cm9weS4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3Vlc1xuICAvLyByZWxhdGVkIHRvIGluc3VmZmljaWVudCBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gICAgLy8gUmFuZG9taXplIG5vZGVcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICBub2RlID0gW3NlZWRCeXRlc1swXSwgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1dO1xuXG4gICAgICAvLyB2MSBvbmx5OiBjYWNoZSBub2RlIHZhbHVlIGZvciByZXVzZVxuICAgICAgaWYgKCFfbm9kZUlkICYmICFvcHRpb25zLl92Nikge1xuICAgICAgICAvLyBwZXIgUkZDNDEyMiA0LjU6IFNldCBNQUMgbXVsdGljYXN0IGJpdCAodjEgb25seSlcbiAgICAgICAgbm9kZVswXSB8PSAweDAxOyAvLyBTZXQgbXVsdGljYXN0IGJpdFxuXG4gICAgICAgIF9ub2RlSWQgPSBub2RlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJhbmRvbWl6ZSBjbG9ja3NlcVxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgICAgaWYgKF9jbG9ja3NlcSA9PT0gdW5kZWZpbmVkICYmICFvcHRpb25zLl92Nikge1xuICAgICAgICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyB2MSAmIHY2IHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzbyB0aW1lIGlzXG4gIC8vIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IERhdGUubm93KCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSBtc2VjcyAtIF9sYXN0TVNlY3MgKyAobnNlY3MgLSBfbGFzdE5TZWNzKSAvIDEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInV1aWQudjEoKTogQ2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjXCIpO1xuICB9XG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cbiAgcmV0dXJuIGJ1ZiB8fCAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKGIpO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gdjE7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2MVRvVjY7XG52YXIgX3BhcnNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9wYXJzZS5qc1wiKSk7XG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbi8qKlxuICogQ29udmVydCBhIHYxIFVVSUQgdG8gYSB2NiBVVUlEXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8VWludDhBcnJheX0gdXVpZCAtIFRoZSB2MSBVVUlEIHRvIGNvbnZlcnQgdG8gdjZcbiAqIEByZXR1cm5zIHtzdHJpbmd8VWludDhBcnJheX0gVGhlIHY2IFVVSUQgYXMgdGhlIHNhbWUgdHlwZSBhcyB0aGUgYHV1aWRgIGFyZ1xuICogKHN0cmluZyBvciBVaW50OEFycmF5KVxuICovXG5mdW5jdGlvbiB2MVRvVjYodXVpZCkge1xuICB2YXIgdjFCeXRlcyA9IHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyA/ICgwLCBfcGFyc2UuZGVmYXVsdCkodXVpZCkgOiB1dWlkO1xuICB2YXIgdjZCeXRlcyA9IF92MVRvVjYodjFCeXRlcyk7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgPyAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKHY2Qnl0ZXMpIDogdjZCeXRlcztcbn1cblxuLy8gRG8gdGhlIGZpZWxkIHRyYW5zZm9ybWF0aW9uIG5lZWRlZCBmb3IgdjEgLT4gdjZcbmZ1bmN0aW9uIF92MVRvVjYodjFCeXRlcywgcmFuZG9taXplID0gZmFsc2UpIHtcbiAgcmV0dXJuIFVpbnQ4QXJyYXkub2YoKHYxQnl0ZXNbNl0gJiAweDBmKSA8PCA0IHwgdjFCeXRlc1s3XSA+PiA0ICYgMHgwZiwgKHYxQnl0ZXNbN10gJiAweDBmKSA8PCA0IHwgKHYxQnl0ZXNbNF0gJiAweGYwKSA+PiA0LCAodjFCeXRlc1s0XSAmIDB4MGYpIDw8IDQgfCAodjFCeXRlc1s1XSAmIDB4ZjApID4+IDQsICh2MUJ5dGVzWzVdICYgMHgwZikgPDwgNCB8ICh2MUJ5dGVzWzBdICYgMHhmMCkgPj4gNCwgKHYxQnl0ZXNbMF0gJiAweDBmKSA8PCA0IHwgKHYxQnl0ZXNbMV0gJiAweGYwKSA+PiA0LCAodjFCeXRlc1sxXSAmIDB4MGYpIDw8IDQgfCAodjFCeXRlc1syXSAmIDB4ZjApID4+IDQsIDB4NjAgfCB2MUJ5dGVzWzJdICYgMHgwZiwgdjFCeXRlc1szXSwgdjFCeXRlc1s4XSwgdjFCeXRlc1s5XSwgdjFCeXRlc1sxMF0sIHYxQnl0ZXNbMTFdLCB2MUJ5dGVzWzEyXSwgdjFCeXRlc1sxM10sIHYxQnl0ZXNbMTRdLCB2MUJ5dGVzWzE1XSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YzNS5qc1wiKSk7XG52YXIgX21kID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9tZDUuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxudmFyIHYzID0gKDAsIF92LmRlZmF1bHQpKCd2MycsIDB4MzAsIF9tZC5kZWZhdWx0KTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHYzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5VUkwgPSBleHBvcnRzLkROUyA9IHZvaWQgMDtcbmV4cG9ydHMuZGVmYXVsdCA9IHYzNTtcbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xudmFyIF9wYXJzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcGFyc2UuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuZnVuY3Rpb24gc3RyaW5nVG9CeXRlcyhzdHIpIHtcbiAgc3RyID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpOyAvLyBVVEY4IGVzY2FwZVxuXG4gIHZhciBieXRlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGJ5dGVzLnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpO1xuICB9XG4gIHJldHVybiBieXRlcztcbn1cbnZhciBETlMgPSBleHBvcnRzLkROUyA9ICc2YmE3YjgxMC05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xudmFyIFVSTCA9IGV4cG9ydHMuVVJMID0gJzZiYTdiODExLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5mdW5jdGlvbiB2MzUobmFtZSwgdmVyc2lvbiwgaGFzaGZ1bmMpIHtcbiAgZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKHZhbHVlLCBuYW1lc3BhY2UsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIF9uYW1lc3BhY2U7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gc3RyaW5nVG9CeXRlcyh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgbmFtZXNwYWNlID0gKDAsIF9wYXJzZS5kZWZhdWx0KShuYW1lc3BhY2UpO1xuICAgIH1cbiAgICBpZiAoKChfbmFtZXNwYWNlID0gbmFtZXNwYWNlKSA9PT0gbnVsbCB8fCBfbmFtZXNwYWNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbmFtZXNwYWNlLmxlbmd0aCkgIT09IDE2KSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ05hbWVzcGFjZSBtdXN0IGJlIGFycmF5LWxpa2UgKDE2IGl0ZXJhYmxlIGludGVnZXIgdmFsdWVzLCAwLTI1NSknKTtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlIGhhc2ggb2YgbmFtZXNwYWNlIGFuZCB2YWx1ZSwgUGVyIDQuM1xuICAgIC8vIEZ1dHVyZTogVXNlIHNwcmVhZCBzeW50YXggd2hlbiBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3JtcywgZS5nLiBgYnl0ZXMgPVxuICAgIC8vIGhhc2hmdW5jKFsuLi5uYW1lc3BhY2UsIC4uLiB2YWx1ZV0pYFxuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KDE2ICsgdmFsdWUubGVuZ3RoKTtcbiAgICBieXRlcy5zZXQobmFtZXNwYWNlKTtcbiAgICBieXRlcy5zZXQodmFsdWUsIG5hbWVzcGFjZS5sZW5ndGgpO1xuICAgIGJ5dGVzID0gaGFzaGZ1bmMoYnl0ZXMpO1xuICAgIGJ5dGVzWzZdID0gYnl0ZXNbNl0gJiAweDBmIHwgdmVyc2lvbjtcbiAgICBieXRlc1s4XSA9IGJ5dGVzWzhdICYgMHgzZiB8IDB4ODA7XG4gICAgaWYgKGJ1Zikge1xuICAgICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgYnVmW29mZnNldCArIGldID0gYnl0ZXNbaV07XG4gICAgICB9XG4gICAgICByZXR1cm4gYnVmO1xuICAgIH1cbiAgICByZXR1cm4gKDAsIF9zdHJpbmdpZnkudW5zYWZlU3RyaW5naWZ5KShieXRlcyk7XG4gIH1cblxuICAvLyBGdW5jdGlvbiNuYW1lIGlzIG5vdCBzZXR0YWJsZSBvbiBzb21lIHBsYXRmb3JtcyAoIzI3MClcbiAgdHJ5IHtcbiAgICBnZW5lcmF0ZVVVSUQubmFtZSA9IG5hbWU7XG4gIH0gY2F0Y2ggKGVycikge31cblxuICAvLyBGb3IgQ29tbW9uSlMgZGVmYXVsdCBleHBvcnQgc3VwcG9ydFxuICBnZW5lcmF0ZVVVSUQuRE5TID0gRE5TO1xuICBnZW5lcmF0ZVVVSUQuVVJMID0gVVJMO1xuICByZXR1cm4gZ2VuZXJhdGVVVUlEO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9uYXRpdmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL25hdGl2ZS5qc1wiKSk7XG52YXIgX3JuZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcm5nLmpzXCIpKTtcbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKF9uYXRpdmUuZGVmYXVsdC5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gX25hdGl2ZS5kZWZhdWx0LnJhbmRvbVVVSUQoKTtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuICByZXR1cm4gKDAsIF9zdHJpbmdpZnkudW5zYWZlU3RyaW5naWZ5KShybmRzKTtcbn1cbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHY0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MzUuanNcIikpO1xudmFyIF9zaGEgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3NoYTEuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxudmFyIHY1ID0gKDAsIF92LmRlZmF1bHQpKCd2NScsIDB4NTAsIF9zaGEuZGVmYXVsdCk7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSB2NTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHY2O1xudmFyIF9zdHJpbmdpZnkgPSByZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIik7XG52YXIgX3YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YxLmpzXCIpKTtcbnZhciBfdjFUb1YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YxVG9WNi5qc1wiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgZGVmYXVsdDogZSB9OyB9XG5mdW5jdGlvbiBvd25LZXlzKGUsIHIpIHsgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpOyByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgcikuZW51bWVyYWJsZTsgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7IH0gcmV0dXJuIHQ7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQoZSkgeyBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykgeyB2YXIgdCA9IG51bGwgIT0gYXJndW1lbnRzW3JdID8gYXJndW1lbnRzW3JdIDoge307IHIgJSAyID8gb3duS2V5cyhPYmplY3QodCksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0W3JdKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsIHIpKTsgfSk7IH0gcmV0dXJuIGU7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0KSB7IHJldHVybiAociA9IF90b1Byb3BlcnR5S2V5KHIpKSBpbiBlID8gT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIHsgdmFsdWU6IHQsIGVudW1lcmFibGU6ICEwLCBjb25maWd1cmFibGU6ICEwLCB3cml0YWJsZTogITAgfSkgOiBlW3JdID0gdCwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbi8qKlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXk9fSBidWZcbiAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0XG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB2NihvcHRpb25zID0ge30sIGJ1Ziwgb2Zmc2V0ID0gMCkge1xuICAvLyB2NiBpcyB2MSB3aXRoIGRpZmZlcmVudCBmaWVsZCBsYXlvdXQsIHNvIHdlIHN0YXJ0IHdpdGggYSB2MSBVVUlELCBhbGJlaXRcbiAgLy8gd2l0aCBzbGlnaHRseSBkaWZmZXJlbnQgYmVoYXZpb3IgYXJvdW5kIGhvdyB0aGUgY2xvY2tfc2VxIGFuZCBub2RlIGZpZWxkc1xuICAvLyBhcmUgcmFuZG9taXplZCwgd2hpY2ggaXMgd2h5IHdlIGNhbGwgdjEgd2l0aCBfdjY6IHRydWUuXG4gIHZhciBieXRlcyA9ICgwLCBfdi5kZWZhdWx0KShfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIG9wdGlvbnMpLCB7fSwge1xuICAgIF92NjogdHJ1ZVxuICB9KSwgbmV3IFVpbnQ4QXJyYXkoMTYpKTtcblxuICAvLyBSZW9yZGVyIHRoZSBmaWVsZHMgdG8gdjYgbGF5b3V0LlxuICBieXRlcyA9ICgwLCBfdjFUb1YuZGVmYXVsdCkoYnl0ZXMpO1xuXG4gIC8vIFJldHVybiBhcyBhIGJ5dGUgYXJyYXkgaWYgcmVxdWVzdGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGVzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gYnVmO1xuICB9XG4gIHJldHVybiAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKGJ5dGVzKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHY2VG9WMTtcbnZhciBfcGFyc2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3BhcnNlLmpzXCIpKTtcbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuLyoqXG4gKiBDb252ZXJ0IGEgdjYgVVVJRCB0byBhIHYxIFVVSURcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xVaW50OEFycmF5fSB1dWlkIC0gVGhlIHY2IFVVSUQgdG8gY29udmVydCB0byB2NlxuICogQHJldHVybnMge3N0cmluZ3xVaW50OEFycmF5fSBUaGUgdjEgVVVJRCBhcyB0aGUgc2FtZSB0eXBlIGFzIHRoZSBgdXVpZGAgYXJnXG4gKiAoc3RyaW5nIG9yIFVpbnQ4QXJyYXkpXG4gKi9cbmZ1bmN0aW9uIHY2VG9WMSh1dWlkKSB7XG4gIHZhciB2NkJ5dGVzID0gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnID8gKDAsIF9wYXJzZS5kZWZhdWx0KSh1dWlkKSA6IHV1aWQ7XG4gIHZhciB2MUJ5dGVzID0gX3Y2VG9WMSh2NkJ5dGVzKTtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyA/ICgwLCBfc3RyaW5naWZ5LnVuc2FmZVN0cmluZ2lmeSkodjFCeXRlcykgOiB2MUJ5dGVzO1xufVxuXG4vLyBEbyB0aGUgZmllbGQgdHJhbnNmb3JtYXRpb24gbmVlZGVkIGZvciB2NiAtPiB2MVxuZnVuY3Rpb24gX3Y2VG9WMSh2NkJ5dGVzKSB7XG4gIHJldHVybiBVaW50OEFycmF5Lm9mKCh2NkJ5dGVzWzNdICYgMHgwZikgPDwgNCB8IHY2Qnl0ZXNbNF0gPj4gNCAmIDB4MGYsICh2NkJ5dGVzWzRdICYgMHgwZikgPDwgNCB8ICh2NkJ5dGVzWzVdICYgMHhmMCkgPj4gNCwgKHY2Qnl0ZXNbNV0gJiAweDBmKSA8PCA0IHwgdjZCeXRlc1s2XSAmIDB4MGYsIHY2Qnl0ZXNbN10sICh2NkJ5dGVzWzFdICYgMHgwZikgPDwgNCB8ICh2NkJ5dGVzWzJdICYgMHhmMCkgPj4gNCwgKHY2Qnl0ZXNbMl0gJiAweDBmKSA8PCA0IHwgKHY2Qnl0ZXNbM10gJiAweGYwKSA+PiA0LCAweDEwIHwgKHY2Qnl0ZXNbMF0gJiAweGYwKSA+PiA0LCAodjZCeXRlc1swXSAmIDB4MGYpIDw8IDQgfCAodjZCeXRlc1sxXSAmIDB4ZjApID4+IDQsIHY2Qnl0ZXNbOF0sIHY2Qnl0ZXNbOV0sIHY2Qnl0ZXNbMTBdLCB2NkJ5dGVzWzExXSwgdjZCeXRlc1sxMl0sIHY2Qnl0ZXNbMTNdLCB2NkJ5dGVzWzE0XSwgdjZCeXRlc1sxNV0pO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9ybmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JuZy5qc1wiKSk7XG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbi8qKlxuICogVVVJRCBWNyAtIFVuaXggRXBvY2ggdGltZS1iYXNlZCBVVUlEXG4gKlxuICogVGhlIElFVEYgaGFzIHB1Ymxpc2hlZCBSRkM5NTYyLCBpbnRyb2R1Y2luZyAzIG5ldyBVVUlEIHZlcnNpb25zICg2LDcsOCkuIFRoaXNcbiAqIGltcGxlbWVudGF0aW9uIG9mIFY3IGlzIGJhc2VkIG9uIHRoZSBhY2NlcHRlZCwgdGhvdWdoIG5vdCB5ZXQgYXBwcm92ZWQsXG4gKiByZXZpc2lvbnMuXG4gKlxuICogUkZDIDk1NjI6aHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzk1NjIuaHRtbCBVbml2ZXJzYWxseSBVbmlxdWVcbiAqIElEZW50aWZpZXJzIChVVUlEcylcblxuICpcbiAqIFNhbXBsZSBWNyB2YWx1ZTpcbiAqIGh0dHBzOi8vd3d3LnJmYy1lZGl0b3Iub3JnL3JmYy9yZmM5NTYyLmh0bWwjbmFtZS1leGFtcGxlLW9mLWEtdXVpZHY3LXZhbHVlXG4gKlxuICogTW9ub3RvbmljIEJpdCBMYXlvdXQ6IFJGQyByZmM5NTYyLjYuMiBNZXRob2QgMSwgRGVkaWNhdGVkIENvdW50ZXIgQml0cyByZWY6XG4gKiAgICAgaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzk1NjIuaHRtbCNzZWN0aW9uLTYuMi01LjFcbiAqXG4gKiAgIDAgICAgICAgICAgICAgICAgICAgMSAgICAgICAgICAgICAgICAgICAyICAgICAgICAgICAgICAgICAgIDMgMCAxIDIgMyA0IDUgNlxuICogICA3IDggOSAwIDEgMiAzIDQgNSA2IDcgOCA5IDAgMSAyIDMgNCA1IDYgNyA4IDkgMCAxXG4gKiAgKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLStcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICB1bml4X3RzX21zICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rXG4gKiAgfCAgICAgICAgICB1bml4X3RzX21zICAgICAgICAgICB8ICB2ZXIgIHwgICAgICAgIHNlcV9oaSAgICAgICAgIHxcbiAqICArLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstK1xuICogIHx2YXJ8ICAgICAgICAgICAgICAgc2VxX2xvdyAgICAgICAgICAgICAgIHwgICAgICAgIHJhbmQgICAgICAgICB8XG4gKiAgKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLStcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rXG4gKlxuICogc2VxIGlzIGEgMzEgYml0IHNlcmlhbGl6ZWQgY291bnRlcjsgY29tcHJpc2VkIG9mIDEyIGJpdCBzZXFfaGkgYW5kIDE5IGJpdFxuICogc2VxX2xvdywgYW5kIHJhbmRvbWx5IGluaXRpYWxpemVkIHVwb24gdGltZXN0YW1wIGNoYW5nZS4gMzEgYml0IGNvdW50ZXIgc2l6ZVxuICogd2FzIHNlbGVjdGVkIGFzIGFueSBiaXR3aXNlIG9wZXJhdGlvbnMgaW4gbm9kZSBhcmUgZG9uZSBhcyBfc2lnbmVkXyAzMiBiaXRcbiAqIGludHMuIHdlIGV4Y2x1ZGUgdGhlIHNpZ24gYml0LlxuICovXG5cbnZhciBfc2VxTG93ID0gbnVsbDtcbnZhciBfc2VxSGlnaCA9IG51bGw7XG52YXIgX21zZWNzID0gMDtcbmZ1bmN0aW9uIHY3KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8vIGluaXRpYWxpemUgYnVmZmVyIGFuZCBwb2ludGVyXG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBuZXcgVWludDhBcnJheSgxNik7XG5cbiAgLy8gcm5kcyBpcyBVaW50OEFycmF5KDE2KSBmaWxsZWQgd2l0aCByYW5kb20gYnl0ZXNcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gIC8vIG1pbGxpc2Vjb25kcyBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBEYXRlLm5vdygpO1xuXG4gIC8vIHNlcSBpcyB1c2VyIHByb3ZpZGVkIDMxIGJpdCBjb3VudGVyXG4gIHZhciBzZXEgPSBvcHRpb25zLnNlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5zZXEgOiBudWxsO1xuXG4gIC8vIGluaXRpYWxpemUgbG9jYWwgc2VxIGhpZ2gvbG93IHBhcnRzXG4gIHZhciBzZXFIaWdoID0gX3NlcUhpZ2g7XG4gIHZhciBzZXFMb3cgPSBfc2VxTG93O1xuXG4gIC8vIGNoZWNrIGlmIGNsb2NrIGhhcyBhZHZhbmNlZCBhbmQgdXNlciBoYXMgbm90IHByb3ZpZGVkIG1zZWNzXG4gIGlmIChtc2VjcyA+IF9tc2VjcyAmJiBvcHRpb25zLm1zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBfbXNlY3MgPSBtc2VjcztcblxuICAgIC8vIHVubGVzcyB1c2VyIHByb3ZpZGVkIHNlcSwgcmVzZXQgc2VxIHBhcnRzXG4gICAgaWYgKHNlcSAhPT0gbnVsbCkge1xuICAgICAgc2VxSGlnaCA9IG51bGw7XG4gICAgICBzZXFMb3cgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHdlIGhhdmUgYSB1c2VyIHByb3ZpZGVkIHNlcVxuICBpZiAoc2VxICE9PSBudWxsKSB7XG4gICAgLy8gdHJpbSBwcm92aWRlZCBzZXEgdG8gMzEgYml0cyBvZiB2YWx1ZSwgYXZvaWRpbmcgb3ZlcmZsb3dcbiAgICBpZiAoc2VxID4gMHg3ZmZmZmZmZikge1xuICAgICAgc2VxID0gMHg3ZmZmZmZmZjtcbiAgICB9XG5cbiAgICAvLyBzcGxpdCBwcm92aWRlZCBzZXEgaW50byBoaWdoL2xvdyBwYXJ0c1xuICAgIHNlcUhpZ2ggPSBzZXEgPj4+IDE5ICYgMHhmZmY7XG4gICAgc2VxTG93ID0gc2VxICYgMHg3ZmZmZjtcbiAgfVxuXG4gIC8vIHJhbmRvbWx5IGluaXRpYWxpemUgc2VxXG4gIGlmIChzZXFIaWdoID09PSBudWxsIHx8IHNlcUxvdyA9PT0gbnVsbCkge1xuICAgIHNlcUhpZ2ggPSBybmRzWzZdICYgMHg3ZjtcbiAgICBzZXFIaWdoID0gc2VxSGlnaCA8PCA4IHwgcm5kc1s3XTtcbiAgICBzZXFMb3cgPSBybmRzWzhdICYgMHgzZjsgLy8gcGFkIGZvciB2YXJcbiAgICBzZXFMb3cgPSBzZXFMb3cgPDwgOCB8IHJuZHNbOV07XG4gICAgc2VxTG93ID0gc2VxTG93IDw8IDUgfCBybmRzWzEwXSA+Pj4gMztcbiAgfVxuXG4gIC8vIGluY3JlbWVudCBzZXEgaWYgd2l0aGluIG1zZWNzIHdpbmRvd1xuICBpZiAobXNlY3MgKyAxMDAwMCA+IF9tc2VjcyAmJiBzZXEgPT09IG51bGwpIHtcbiAgICBpZiAoKytzZXFMb3cgPiAweDdmZmZmKSB7XG4gICAgICBzZXFMb3cgPSAwO1xuICAgICAgaWYgKCsrc2VxSGlnaCA+IDB4ZmZmKSB7XG4gICAgICAgIHNlcUhpZ2ggPSAwO1xuXG4gICAgICAgIC8vIGluY3JlbWVudCBpbnRlcm5hbCBfbXNlY3MuIHRoaXMgYWxsb3dzIHVzIHRvIGNvbnRpbnVlIGluY3JlbWVudGluZ1xuICAgICAgICAvLyB3aGlsZSBzdGF5aW5nIG1vbm90b25pYy4gTm90ZSwgb25jZSB3ZSBoaXQgMTBrIG1pbGxpc2Vjb25kcyBiZXlvbmQgc3lzdGVtXG4gICAgICAgIC8vIGNsb2NrLCB3ZSB3aWxsIHJlc2V0IGJyZWFraW5nIG1vbm90b25pY2l0eSAoYWZ0ZXIgKDJeMzEpKjEwMDAwIGdlbmVyYXRpb25zKVxuICAgICAgICBfbXNlY3MrKztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gcmVzZXR0aW5nOyB3ZSBoYXZlIGFkdmFuY2VkIG1vcmUgdGhhblxuICAgIC8vIDEwayBtaWxsaXNlY29uZHMgYmV5b25kIHN5c3RlbSBjbG9ja1xuICAgIF9tc2VjcyA9IG1zZWNzO1xuICB9XG4gIF9zZXFIaWdoID0gc2VxSGlnaDtcbiAgX3NlcUxvdyA9IHNlcUxvdztcblxuICAvLyBbYnl0ZXMgMC01XSA0OCBiaXRzIG9mIGxvY2FsIHRpbWVzdGFtcFxuICBiW2krK10gPSBfbXNlY3MgLyAweDEwMDAwMDAwMDAwICYgMHhmZjtcbiAgYltpKytdID0gX21zZWNzIC8gMHgxMDAwMDAwMDAgJiAweGZmO1xuICBiW2krK10gPSBfbXNlY3MgLyAweDEwMDAwMDAgJiAweGZmO1xuICBiW2krK10gPSBfbXNlY3MgLyAweDEwMDAwICYgMHhmZjtcbiAgYltpKytdID0gX21zZWNzIC8gMHgxMDAgJiAweGZmO1xuICBiW2krK10gPSBfbXNlY3MgJiAweGZmO1xuXG4gIC8vIFtieXRlIDZdIC0gc2V0IDQgYml0cyBvZiB2ZXJzaW9uICg3KSB3aXRoIGZpcnN0IDQgYml0cyBzZXFfaGlcbiAgYltpKytdID0gc2VxSGlnaCA+Pj4gNCAmIDB4MGYgfCAweDcwO1xuXG4gIC8vIFtieXRlIDddIHJlbWFpbmluZyA4IGJpdHMgb2Ygc2VxX2hpXG4gIGJbaSsrXSA9IHNlcUhpZ2ggJiAweGZmO1xuXG4gIC8vIFtieXRlIDhdIC0gdmFyaWFudCAoMiBiaXRzKSwgZmlyc3QgNiBiaXRzIHNlcV9sb3dcbiAgYltpKytdID0gc2VxTG93ID4+PiAxMyAmIDB4M2YgfCAweDgwO1xuXG4gIC8vIFtieXRlIDldIDggYml0cyBzZXFfbG93XG4gIGJbaSsrXSA9IHNlcUxvdyA+Pj4gNSAmIDB4ZmY7XG5cbiAgLy8gW2J5dGUgMTBdIHJlbWFpbmluZyA1IGJpdHMgc2VxX2xvdywgMyBiaXRzIHJhbmRvbVxuICBiW2krK10gPSBzZXFMb3cgPDwgMyAmIDB4ZmYgfCBybmRzWzEwXSAmIDB4MDc7XG5cbiAgLy8gW2J5dGVzIDExLTE1XSBhbHdheXMgcmFuZG9tXG4gIGJbaSsrXSA9IHJuZHNbMTFdO1xuICBiW2krK10gPSBybmRzWzEyXTtcbiAgYltpKytdID0gcm5kc1sxM107XG4gIGJbaSsrXSA9IHJuZHNbMTRdO1xuICBiW2krK10gPSBybmRzWzE1XTtcbiAgcmV0dXJuIGJ1ZiB8fCAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKGIpO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gdjc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3JlZ2V4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9yZWdleC5qc1wiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgZGVmYXVsdDogZSB9OyB9XG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgX3JlZ2V4LmRlZmF1bHQudGVzdCh1dWlkKTtcbn1cbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHZhbGlkYXRlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuZnVuY3Rpb24gdmVyc2lvbih1dWlkKSB7XG4gIGlmICghKDAsIF92YWxpZGF0ZS5kZWZhdWx0KSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignSW52YWxpZCBVVUlEJyk7XG4gIH1cbiAgcmV0dXJuIHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE1KSwgMTYpO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gdmVyc2lvbjsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cblxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXG5cbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xuICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xuICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufVxuXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdDtcbiAgfVxuICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgdFtwXSA9IHNbcF07XG4gIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgfVxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XG4gIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxuICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xuICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XG4gIHZhciBfLCBkb25lID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XG4gICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcbiAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xuICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcbiAgICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XG4gIGRvbmUgPSB0cnVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcbiAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XG4gIH1cbiAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcbiAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxuICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxuICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XG4gIHZhciBpLCBwO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICByZXR1cm4gY29va2VkO1xufTtcblxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgb1tcImRlZmF1bHRcIl0gPSB2O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XG4gIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XG4gIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xuICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xuICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xuICAgIH1cbiAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XG4gICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XG4gICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcbiAgfVxuICBlbHNlIGlmIChhc3luYykge1xuICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XG4gIGZ1bmN0aW9uIGZhaWwoZSkge1xuICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcbiAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xuICB9XG4gIHZhciByLCBzID0gMDtcbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XG4gICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XG4gICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHMgfD0gMTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGZhaWwoZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcbiAgfVxuICByZXR1cm4gbmV4dCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIF9fZXh0ZW5kcyxcbiAgX19hc3NpZ24sXG4gIF9fcmVzdCxcbiAgX19kZWNvcmF0ZSxcbiAgX19wYXJhbSxcbiAgX19tZXRhZGF0YSxcbiAgX19hd2FpdGVyLFxuICBfX2dlbmVyYXRvcixcbiAgX19jcmVhdGVCaW5kaW5nLFxuICBfX2V4cG9ydFN0YXIsXG4gIF9fdmFsdWVzLFxuICBfX3JlYWQsXG4gIF9fc3ByZWFkLFxuICBfX3NwcmVhZEFycmF5cyxcbiAgX19zcHJlYWRBcnJheSxcbiAgX19hd2FpdCxcbiAgX19hc3luY0dlbmVyYXRvcixcbiAgX19hc3luY0RlbGVnYXRvcixcbiAgX19hc3luY1ZhbHVlcyxcbiAgX19tYWtlVGVtcGxhdGVPYmplY3QsXG4gIF9faW1wb3J0U3RhcixcbiAgX19pbXBvcnREZWZhdWx0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXG4gIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxuICBfX2Rpc3Bvc2VSZXNvdXJjZXMsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7XG4gICAgRnVzZUNvbnRleHQsXG4gICAgRnVzZUNvbnRleHRCdWlsZGVyLFxuICAgIEZ1c2VFcnJvclxufSBmcm9tICdAYnRmdXNlL2NvcmUnO1xuaW1wb3J0IHtFY2hvUGx1Z2lufSBmcm9tICdlY2hvJztcblxudmFyIHNsZWVwID0gKG1zOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0sIG1zKTtcbiAgICB9KTtcbn1cblxuKGFzeW5jICgpID0+IHtcbiAgICBsZXQgYnVpbGRlcjogRnVzZUNvbnRleHRCdWlsZGVyID0gbmV3IEZ1c2VDb250ZXh0QnVpbGRlcigpO1xuICAgIGxldCBjb250ZXh0OiBGdXNlQ29udGV4dCA9IGF3YWl0IGJ1aWxkZXIuYnVpbGQoKTtcbiAgICBsZXQgZWNob1BsdWdpbjogRWNob1BsdWdpbiA9IG5ldyBFY2hvUGx1Z2luKGNvbnRleHQpO1xuXG4gICAgY29udGV4dC5yZWdpc3RlclBhdXNlSGFuZGxlcigoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdPTiBQQVVTRSEnKTtcbiAgICB9KTtcblxuICAgIGNvbnRleHQucmVnaXN0ZXJSZXN1bWVIYW5kbGVyKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ09OIFJFU1VNRSEnKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGFwcGVuZEluZm8obXNnOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGRpdjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IG1zZztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cblxuICAgIGF3YWl0IChhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCByZXNwb25zZTogc3RyaW5nID0gYXdhaXQgZWNob1BsdWdpbi5lY2hvKCdIaSBmcm9tIFRTJyk7XG4gICAgICAgIC8vIGFsZXJ0KHJlc3BvbnNlKTtcbiAgICAgICAgYXBwZW5kSW5mbyhyZXNwb25zZSk7XG5cbiAgICAgICAgY29udGV4dC5nZXRMb2dnZXIoKS5pbmZvKGBFQ0hPIFJFU1BPTlNFOiAke3Jlc3BvbnNlfWApO1xuICAgICAgICBcbiAgICAgICAgbGV0IHRpbWVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aW1lRGl2KTtcbiAgICAgICAgbGV0IGZpcnN0VGltZUZpcmU6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aW1lRGl2LmlubmVySFRNTCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmIChmaXJzdFRpbWVGaXJlKSB7XG4gICAgICAgICAgICAgICAgZmlyc3RUaW1lRmlyZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnRleHQub25XZWJ2aWV3UmVhZHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgbGV0IGRlYnVnOiBib29sZWFuID0gYXdhaXQgY29udGV4dC5pc0RlYnVnTW9kZSgpO1xuICAgICAgICBhcHBlbmRJbmZvKGBEZWJ1ZzogJHtkZWJ1ZyA/ICd0cnVlJyA6ICdmYWxzZSd9YCk7XG5cbiAgICAgICAgLy8gYXdhaXQgZWNob1BsdWdpbi5zdWJzY3JpYmUoKGQ6IHN0cmluZykgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ2QnLCBkKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfSkoKTtcblxuICAgIGRvY3VtZW50LmJvZHkub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IHJlc3AgPSBhd2FpdCBlY2hvUGx1Z2luLmJpZ1Jlc3BvbnNlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdiaWcgcmVzcCcsIHJlc3ApO1xuICAgIH07XG5cbiAgICAod2luZG93IGFzIGFueSkuZnVzZWNvbnRleHQgPSBjb250ZXh0O1xuICAgIFxuICAgIGNvbnRleHQuZ2V0TG9nZ2VyKCkuaW5mbygndGVzdCBsb2cgZnJvbSB3ZWJ2aWV3Jyk7XG4gICAgY29udGV4dC5nZXRMb2dnZXIoKS5lcnJvcihuZXcgRnVzZUVycm9yKCdUZXN0RXJyb3InLCAndGVzdCBmdXNlIGVycm9yJywgbmV3IEVycm9yKCdDYXVzZWQgZXJyb3InKSwgMSkpO1xuXG5cbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=