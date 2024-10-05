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
    constructor(platform, apiFactory, loggerFactory) {
        this.$platform = platform;
        this.$logger = loggerFactory.create();
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
const FuseContext_1 = __webpack_require__(/*! ./FuseContext */ "./node_modules/@btfuse/core/lib/FuseContext.js");
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
        const context = new FuseContext_1.FuseContext(platform, apiFactory, loggerFactory);
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
/* global Reflect, Promise, SuppressedError, Symbol */

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
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
  return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
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
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
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
    (async () => {
        let response = await echoPlugin.echo('Hi from TS');
        // alert(response);
        appendInfo(response);
        context.getLogger().info(`ECHO RESPONSE: ${response}`);
        let timeDiv = document.createElement('div');
        document.body.appendChild(timeDiv);
        setInterval(() => {
            timeDiv.innerHTML = new Date().toISOString();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixhQUFhO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrQkFBZTs7Ozs7Ozs7OztBQ3ZNakI7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0Ysa0JBQWU7QUFDZjtBQUNBLGVBQWUsa0JBQWU7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LEVBQUUsQ0FBQyxDQUFDO1FBRWpELDhDQUE4QztRQUM5QywyQkFBMkI7UUFDM0IsTUFBTTtJQUNWLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFTCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLElBQUksRUFBRTtRQUMvQixJQUFJLElBQUksR0FBRyxNQUFNLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFFRCxNQUFjLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztJQUV0QyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDbEQsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLGdCQUFTLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0csQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Fic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9Db250ZW50VHlwZS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VBUEkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlQVBJRmFjdG9yeS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VBUElSZXNwb25zZS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VDYWxsYmFja01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlQ29udGV4dC50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VDb250ZXh0QnVpbGRlci50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VFcnJvci50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VMb2dnZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlTG9nZ2VyRmFjdG9yeS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VMb2dnZXJMZXZlbC50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlUGVybWlzc2lvblJlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9GdXNlUGVybWlzc2lvblN0YXRlLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vRnVzZVBsdWdpbi50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VSZXNwb25zZVJlYWRlci50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0Z1c2VTZXJpYWxpemVyLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vSFRUUEZ1c2VBUEkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9QbGF0Zm9ybS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL1BsYXRmb3JtUmVzb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9WZXJzaW9uLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vYW5kcm9pZC9BbmRyb2lkRnVzZUxvZ2dlci50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL2FuZHJvaWQvQW5kcm9pZFNjaGVtZUZ1c2VBUEkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9hcGkudHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uLi8uLi8uLi8uLi9pb3MvSU9TRnVzZUxvZ2dlci50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL2lvcy9JT1NTY2hlbWVGdXNlQVBJLnRzIiwid2VicGFjazovL3Rlc3RhcHAvLi4vLi4vLi4vLi4vcGx1Z2lucy9GdXNlUnVudGltZS50cyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4uLy4uLy4uLy4uL0VjaG9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9pbmRleC5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL21heC5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL21kNS5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL25pbC5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3BhcnNlLmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9zaGExLmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjEuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92MVRvVjYuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92My5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3YzNS5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjUuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92Ni5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3Y2VG9WMS5qcyIsIndlYnBhY2s6Ly90ZXN0YXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3Y3LmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92ZXJzaW9uLmpzIiwid2VicGFjazovL3Rlc3RhcHAvLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2Lm1qcyIsIndlYnBhY2s6Ly90ZXN0YXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Rlc3RhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rlc3RhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90ZXN0YXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGVzdGFwcC8uL3NyYy9BcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge0Z1c2VBUEl9IGZyb20gJy4vRnVzZUFQSSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vUGxhdGZvcm0nO1xuXG4vKipcbiAqIEFuIGZhY3RvcnkgY2xhc3MgdGhhdCBkZWZpbmVzIHRoZSBiYXNlIHNpZ25hdHVyZSBmb3IgY3JlYXRpbmcgYSBGdXNlQVBJIGJyaWRnZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudCBhIGNyZWF0ZSBBUEkgdGhhdCByZXR1cm5zIGEgRnVzZUFQSSBmb3IgdGhlIGdpdmVuIFBsYXRmb3JtXG4gICAgICogXG4gICAgICogQHBhcmFtIHBsYXRmb3JtIC0gVGhlIGN1cnJlbnQgcGxhdGZvcm0gcnVudGltZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBjcmVhdGUocGxhdGZvcm06IFBsYXRmb3JtKTogRnVzZUFQSTtcbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgSUZ1c2VMb2dnZXIgfSBmcm9tIFwiLi9JRnVzZUxvZ2dlclwiO1xuXG4vKipcbiAqIEFuIEZ1c2VMb2dnZXIgZmFjdG9yeSBmb3IgY3JlYXRpbmcgbG9nZ2luZyBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5IHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50IHRvIGNyZWF0ZSBhIEZ1c2VMb2dnZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgY3JlYXRlKCk6IElGdXNlTG9nZ2VyO1xufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vKipcbiAqIFNvbWUgY29tbW9uIGRhdGEgdHlwZXNcbiAqL1xuZXhwb3J0IGVudW0gQ29udGVudFR5cGUge1xuICAgIFRFWFQgICAgICAgICAgICA9ICd0ZXh0L3BsYWluJyxcbiAgICBKU09OICAgICAgICAgICAgPSAnYXBwbGljYXRpb24vanNvbicsXG4gICAgSkFWQVNDUklQVCAgICAgID0gJ3RleHQvamF2YXNjcmlwdCcsIC8vIFJGQyA5MjM5XG4gICAgV0FTTSAgICAgICAgICAgID0gJ2FwcGxpY2F0aW9uL3dhc20nLFxuICAgIEJJTkFSWSAgICAgICAgICA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nXG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IEZ1c2VBUElSZXNwb25zZSB9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmltcG9ydCB7IFRTZXJpYWxpemFibGUgfSBmcm9tICcuL1RTZXJpYWxpemFibGUnO1xuaW1wb3J0IHsgRnVzZVNlcmlhbGl6ZXIgfSBmcm9tICcuL0Z1c2VTZXJpYWxpemVyJztcbmltcG9ydCB7IEZ1c2VDYWxsYmFja01hbmFnZXIsIFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyIH0gZnJvbSAnLi9GdXNlQ2FsbGJhY2tNYW5hZ2VyJztcblxuLyoqXG4gKiBHZW5lcmljIEFQSSByZXNwb25zZSBkYXRhIHR5cGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBURnVzZUFQSVJlc3BvbnNlRGF0YSB7XG4gICAga2VlcDogYm9vbGVhbjtcbiAgICBkYXRhPzogQmxvYjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRnVzZUFQSUNhbGxQYWNrZXQge1xuICAgIHJvdXRlOiBzdHJpbmc7XG4gICAgY2FsbGJhY2tJRDogc3RyaW5nO1xuICAgIGJvZHk6IEJsb2I7XG4gICAgY29udGVudFR5cGU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciB0aGUgRnVzZSBBUEkgYnJpZGdlIGZvciBleGNoYW5naW5nIGRhdGEgd2l0aCB0aGUgbmF0aXZlIHBsYXRmb3JtXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGdXNlQVBJIHtcblxuICAgIHByaXZhdGUgJHNlcmlhbGl6ZXI6IEZ1c2VTZXJpYWxpemVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLiRzZXJpYWxpemVyID0gdGhpcy5fY3JlYXRlU2VyaWFsaXplcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY3JlYXRlU2VyaWFsaXplcigpOiBGdXNlU2VyaWFsaXplciB7XG4gICAgICAgIHJldHVybiBuZXcgRnVzZVNlcmlhbGl6ZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2VyaWFsaXplcigpOiBGdXNlU2VyaWFsaXplciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzZXJpYWxpemVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRvIGltcGxlbWVudCBleGVjdXRlIG5hdGl2ZSBicmlkZ2UgbG9naWNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gcGx1Z2luSUQgLSBUaGUgcGx1Z2luIElEXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIEFQSSBtZXRob2RcbiAgICAgKiBAcGFyYW0gYXJncyAtIEFQSSBhcmd1bWVudHMgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF9leGVjdXRlKHBsdWdpbklEOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBjb250ZW50VHlwZTogc3RyaW5nLCBhcmdzOiBCbG9iKTogUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+O1xuXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVSb3V0ZShwbHVnaW5JRDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgL2FwaS8ke3BsdWdpbklEfSR7bWV0aG9kfWA7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGV4ZWN1dGUocGx1Z2luSUQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGNvbnRlbnRUeXBlOiBzdHJpbmcsIGFyZ3M6IFRTZXJpYWxpemFibGUpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhlY3V0ZShwbHVnaW5JRCwgbWV0aG9kLCBjb250ZW50VHlwZSwgdGhpcy4kc2VyaWFsaXplci5zZXJpYWxpemUoYXJncykpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDYWxsYmFja0NvbnRleHQoY2I6IFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEZ1c2VDYWxsYmFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVDYWxsYmFjayhjYik7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbGVhc2VDYWxsYmFjayhpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIEZ1c2VDYWxsYmFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlQ2FsbGJhY2soaWQpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gJy4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5pbXBvcnQgeyBGdXNlQVBJIH0gZnJvbSAnLi9GdXNlQVBJJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9QbGF0Zm9ybSc7XG5pbXBvcnQgeyBJT1NTY2hlbWVGdXNlQVBJIH0gZnJvbSBcIi4vaW9zL0lPU1NjaGVtZUZ1c2VBUElcIjtcbmltcG9ydCB7IEFuZHJvaWRTY2hlbWVGdXNlQVBJIH0gZnJvbSAnLi9hbmRyb2lkL0FuZHJvaWRTY2hlbWVGdXNlQVBJJztcblxuLyoqXG4gKiBBIEZ1c2VBUEkgZmFjdG9yeSB0aGF0IHVzZXMgdGhlIEhUVFAvYXBwIHNjaGVtZSBhcyB0aGUgYnJpZGdlLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZUFQSUZhY3RvcnkgZXh0ZW5kcyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcbiAgICBcbiAgICBwcml2YXRlICRpb3NTY2hlbWU6IEZ1c2VBUEk7XG4gICAgcHJpdmF0ZSAkYW5kcm9pZFNjaGVtZTogRnVzZUFQSTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBSZWFsaXN0aWNhbGx5IHRoZXJlIHdpbGwgb25seSBiZSBvbmUgb3IgdGhlIG90aGVyIHNldC5cbiAgICAgICAgdGhpcy4kaW9zU2NoZW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy4kYW5kcm9pZFNjaGVtZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIG92ZXJyaWRlIGNyZWF0ZShwbGF0Zm9ybTogUGxhdGZvcm0pOiBGdXNlQVBJIHtcbiAgICAgICAgc3dpdGNoIChwbGF0Zm9ybSkge1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5JT1M6IHJldHVybiB0aGlzLl9jcmVhdGVpT1NBUEkoKTtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uQU5EUk9JRDogcmV0dXJuIHRoaXMuX2NyZWF0ZUFuZHJvaWRBUEkoKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgcGxhdGZvcm06ICcgKyBwbGF0Zm9ybSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZWlPU0FQSSgpOiBGdXNlQVBJIHtcbiAgICAgICAgaWYgKCF0aGlzLiRpb3NTY2hlbWUpIHtcbiAgICAgICAgICAgIHRoaXMuJGlvc1NjaGVtZSA9IG5ldyBJT1NTY2hlbWVGdXNlQVBJKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJGlvc1NjaGVtZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZUFuZHJvaWRBUEkoKTogRnVzZUFQSSB7XG4gICAgICAgIGlmICghdGhpcy4kYW5kcm9pZFNjaGVtZSkge1xuICAgICAgICAgICAgdGhpcy4kYW5kcm9pZFNjaGVtZSA9IG5ldyBBbmRyb2lkU2NoZW1lRnVzZUFQSSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLiRhbmRyb2lkU2NoZW1lO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgRnVzZVJlc3BvbnNlUmVhZGVyIH0gZnJvbSBcIi4vRnVzZVJlc3BvbnNlUmVhZGVyXCI7XG5pbXBvcnQgeyBGdXNlRXJyb3IsIElGdXNlRXJyb3JTZXJpYWxpemVkIH0gZnJvbSAnLi9GdXNlRXJyb3InO1xuXG5leHBvcnQgY2xhc3MgRnVzZUFQSVJlc3BvbnNlIHtcbiAgICBwcml2YXRlICRjb250ZW50OiBBcnJheUJ1ZmZlcjtcbiAgICBwcml2YXRlICRoZWFkZXJzOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG4gICAgcHJpdmF0ZSAkc3RhdHVzOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29udGVudDogQXJyYXlCdWZmZXIsIGhlYWRlcnM6IHN0cmluZyB8IG51bGwsIHN0YXR1czogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuJHN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy4kY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuJGhlYWRlcnMgPSB0aGlzLiRwYXJzZUhlYWRlcnMoaGVhZGVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRXJyb3IoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdGF0dXMgPj0gNDAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDb250ZW50TGVuZ3RoKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGxlblN0cjogc3RyaW5nID0gdGhpcy4kaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpPy5bMF07XG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHBhcnNlSW50KGxlblN0cik7XG4gICAgICAgIGlmIChpc05hTihsZW5ndGgpKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbnRlbnRUeXBlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiRoZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk/LlswXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVhZEFzQXJyYXlCdWZmZXIoKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29udGVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVhZEFzQmxvYigpOiBQcm9taXNlPEJsb2I+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFt0aGlzLiRjb250ZW50XSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlYWRBc1RleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEZ1c2VSZXNwb25zZVJlYWRlci5yZWFkQXNUZXh0KHRoaXMuJGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWFkQXNKU09OPFQgPSB1bmtub3duPigpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEZ1c2VSZXNwb25zZVJlYWRlci5yZWFkQXNKU09OKHRoaXMuJGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWFkQXNFcnJvcigpOiBQcm9taXNlPEZ1c2VFcnJvcj4ge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkRXJyb3I6IElGdXNlRXJyb3JTZXJpYWxpemVkID0gYXdhaXQgRnVzZVJlc3BvbnNlUmVhZGVyLnJlYWRBc0pTT04odGhpcy4kY29udGVudCk7XG4gICAgICAgIHJldHVybiBGdXNlRXJyb3IuZnJvbVNlcmlhbGl6ZWQoc2VyaWFsaXplZEVycm9yKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SGVhZGVycygpOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kaGVhZGVycztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SGVhZGVyKGtleTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy4kaGVhZGVycy5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlICRwYXJzZUhlYWRlcnMoaGVhZGVyczogc3RyaW5nIHwgbnVsbCk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiB7XG4gICAgICAgIGNvbnN0IG1hcDogTWFwPHN0cmluZywgc3RyaW5nW10+ID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGlmICghaGVhZGVycykge1xuICAgICAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IGhlYWRlcnMuc3BsaXQoJ1xcclxcbicpO1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmU6IHN0cmluZ1tdID0gbGluZXNbaV0uc3BsaXQoJzonKTtcbiAgICAgICAgICAgIGNvbnN0IGtleTogc3RyaW5nID0gbGluZVswXTtcbiAgICAgICAgICAgIGlmICghbWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgbWFwLnNldChrZXksIFtdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaGVhZGVyVmFsdWU6IHN0cmluZ1tdID0gbWFwLmdldChrZXkpO1xuICAgICAgICAgICAgaGVhZGVyVmFsdWUucHVzaChsaW5lWzFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge1xuICAgIFROYXRpdmVDYWxsYmFja0Z1bmN0aW9uXG59IGZyb20gJy4vaW50ZXJuYWxzJztcbmltcG9ydCAqIGFzIFVVSUQgZnJvbSAndXVpZCc7XG5cbmV4cG9ydCB0eXBlIFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyID0gKGRhdGE6IHN0cmluZykgPT4gdm9pZDtcblxud2luZG93Ll9fYnRmdXNlX2NhbGxiYWNrcyA9IG5ldyBNYXA8c3RyaW5nLCBUTmF0aXZlQ2FsbGJhY2tGdW5jdGlvbj4oKTtcblxud2luZG93Ll9fYnRmdXNlX2RvQ2FsbGJhY2sgPSBmdW5jdGlvbihjYWxsYmFja0lEOiBzdHJpbmcsIGRhdGE6IHN0cmluZykge1xuICAgIGlmIChjYWxsYmFja0lEICYmIHdpbmRvdy5fX2J0ZnVzZV9jYWxsYmFja3MuaGFzKGNhbGxiYWNrSUQpKSB7XG4gICAgICAgIHdpbmRvdy5fX2J0ZnVzZV9jYWxsYmFja3MuZ2V0KGNhbGxiYWNrSUQpKGRhdGEpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQSBzaW5nbGV0b24gbWFuYWdlciB0byBtYW5hZ2UgbmF0aXZlIGNhbGxiYWNrcy5cbiAqIFxuICogQ3JlYXRlIGEgY2FsbGJhY2sgY29udGV4dCBhbmQgcGFzcyB0aGUgcmV0dXJuIGNvbnRleHQgaWQgdG8gbmF0aXZlIGNsaWVudHMsXG4gKiBpbiB3aGljaCB0aGV5IGNhbiB1c2UgdG8gcmVzcG9uZCBiYWNrLlxuICogXG4gKiBOb3RlIHRoYXQgcGx1Z2luIEFQSXMgYXJlIGZhciBtb3JlIGVmZmljaWVudCBhbmQgY2FuIGhhbmRsZSBhIGRpdmVyc2Ugc2V0IG9mIGRhdGEsXG4gKiBpbmNsdWRpbmcgbGFyZ2UgcGF5bG9hZHMsIHNvIHdoZW4gcG9zc2libGUgaXQncyBiZXN0IHRvIHVzZSBhIHBsdWdpbiBBUEkgaW5zdGVhZCBvZiBhXG4gKiBjYWxsYmFjayBBUEkuXG4gKiBcbiAqIFRoaXMgY2FsbGJhY2sgQVBJIGlzIGhvd2V2ZXIsIHVzZWZ1bCBmb3IgYnVpbGRpbmcgbGlzdGVuZXIga2luZCBvZiBzZXJ2aWNlcyB3aGVyZSB0aGUgbmF0aXZlXG4gKiBuZWVkcyB0byBjb250aW5vdXNseSBjYWxsYmFjayB0byB0aGUgd2VidmlldyB3aXRoIHNtYWxsIGRhdGEgcGFja2V0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VDYWxsYmFja01hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljICRpbnN0YW5jZTogRnVzZUNhbGxiYWNrTWFuYWdlcjtcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBGdXNlQ2FsbGJhY2tNYW5hZ2VyIHtcbiAgICAgICAgaWYgKCFGdXNlQ2FsbGJhY2tNYW5hZ2VyLiRpbnN0YW5jZSkge1xuICAgICAgICAgICAgRnVzZUNhbGxiYWNrTWFuYWdlci4kaW5zdGFuY2UgPSBuZXcgRnVzZUNhbGxiYWNrTWFuYWdlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEZ1c2VDYWxsYmFja01hbmFnZXIuJGluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDYWxsYmFjayhjYjogVEZ1c2VBUElDYWxsYmFja0hhbmRsZXIpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBpZDogc3RyaW5nID0gVVVJRC52NCgpO1xuICAgICAgICB3aW5kb3cuX19idGZ1c2VfY2FsbGJhY2tzLnNldChpZCwgKGRhdGE6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgY2IoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVsZWFzZUNhbGxiYWNrKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgd2luZG93Ll9fYnRmdXNlX2NhbGxiYWNrcy5kZWxldGUoaWQpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gJy4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gXCIuL1BsYXRmb3JtXCI7XG5pbXBvcnQge1xuICAgIEZ1c2VSdW50aW1lLFxuICAgIElSdW50aW1lSW5mbyxcbiAgICBUUGF1c2VDYWxsYmFja0hhbmRsZXIsXG4gICAgVFJlc3VtZUNhbGxiYWNrSGFuZGxlclxufSBmcm9tICcuL3BsdWdpbnMvRnVzZVJ1bnRpbWUnO1xuaW1wb3J0IHtWZXJzaW9ufSBmcm9tICcuL1ZlcnNpb24nO1xuaW1wb3J0IHtJRnVzZUxvZ2dlcn0gZnJvbSAnLi9JRnVzZUxvZ2dlcic7XG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5IH0gZnJvbSAnLi9BYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5JztcblxuLyoqXG4gKiBBIGNvbnRleHQgY2xhc3MgdGhhdCBob2xkcyBGdXNlIEZyYW1ld29yayBzdGF0ZVxuICovXG5leHBvcnQgY2xhc3MgRnVzZUNvbnRleHQge1xuICAgIHByaXZhdGUgJHBsYXRmb3JtOiBQbGF0Zm9ybTtcbiAgICBwcml2YXRlICRydW50aW1lOiBGdXNlUnVudGltZTtcbiAgICBwcml2YXRlICRydW50aW1lVmVyc2lvbjogVmVyc2lvbjtcbiAgICBwcml2YXRlICRydW50aW1lSW5mbzogSVJ1bnRpbWVJbmZvO1xuICAgIHByaXZhdGUgJGRlZmF1bHRBUElGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5O1xuICAgIC8vIHByaXZhdGUgJGRlZmF1bHRMb2dnZXI6IElGdXNlTG9nZ2VyO1xuICAgIHByaXZhdGUgJGxvZ2dlcjogSUZ1c2VMb2dnZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgICAgYXBpRmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSxcbiAgICAgICAgbG9nZ2VyRmFjdG9yeTogQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeVxuICAgICkge1xuICAgICAgICB0aGlzLiRwbGF0Zm9ybSA9IHBsYXRmb3JtO1xuICAgICAgICB0aGlzLiRsb2dnZXIgPSBsb2dnZXJGYWN0b3J5LmNyZWF0ZSgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy4kcnVudGltZVZlcnNpb24gPSBudWxsO1xuICAgICAgICB0aGlzLiRkZWZhdWx0QVBJRmFjdG9yeSA9IGFwaUZhY3Rvcnk7XG4gICAgICAgIHRoaXMuJHJ1bnRpbWUgPSBuZXcgRnVzZVJ1bnRpbWUodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldExvZ2dlcigpOiBJRnVzZUxvZ2dlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRsb2dnZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERlZmF1bHRBUElGYWN0b3J5KCk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZGVmYXVsdEFQSUZhY3Rvcnk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBsYXRmb3JtKCk6IFBsYXRmb3JtIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHBsYXRmb3JtO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgJGdldFJ1bnRpbWVJbmZvKCk6IFByb21pc2U8SVJ1bnRpbWVJbmZvPiB7XG4gICAgICAgIGlmICghdGhpcy4kcnVudGltZUluZm8pIHtcbiAgICAgICAgICAgIHRoaXMuJHJ1bnRpbWVJbmZvID0gYXdhaXQgdGhpcy4kcnVudGltZS5nZXRJbmZvKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy4kcnVudGltZUluZm87XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGdldFBsYXRmb3JtVmVyc2lvbigpOiBQcm9taXNlPFZlcnNpb24+IHtcbiAgICAgICAgaWYgKCF0aGlzLiRydW50aW1lVmVyc2lvbikge1xuICAgICAgICAgICAgY29uc3QgaW5mbzogSVJ1bnRpbWVJbmZvID0gYXdhaXQgdGhpcy4kZ2V0UnVudGltZUluZm8oKTtcbiAgICAgICAgICAgIHRoaXMuJHJ1bnRpbWVWZXJzaW9uID0gVmVyc2lvbi5wYXJzZVZlcnNpb25TdHJpbmcoaW5mby52ZXJzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJ1bnRpbWVWZXJzaW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBpc0RlYnVnTW9kZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgaW5mbzogSVJ1bnRpbWVJbmZvID0gYXdhaXQgdGhpcy4kZ2V0UnVudGltZUluZm8oKTtcbiAgICAgICAgcmV0dXJuIGluZm8uZGVidWdNb2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWdpc3RlclBhdXNlSGFuZGxlcihjYWxsYmFjazogVFBhdXNlQ2FsbGJhY2tIYW5kbGVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuJHJ1bnRpbWUucmVnaXN0ZXJQYXVzZUhhbmRsZXIoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1bnJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNhbGxiYWNrSUQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy4kcnVudGltZS51bnJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNhbGxiYWNrSUQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWdpc3RlclJlc3VtZUhhbmRsZXIoY2FsbGJhY2s6IFRSZXN1bWVDYWxsYmFja0hhbmRsZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy4kcnVudGltZS5yZWdpc3RlclJlc3VtZUhhbmRsZXIoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1bnJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYWxsYmFja0lEOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuJHJ1bnRpbWUudW5yZWdpc3RlclJlc3VtZUhhbmRsZXIoY2FsbGJhY2tJRCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSBcIi4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeVwiO1xuaW1wb3J0IHsgQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSB9IGZyb20gXCIuL0Fic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnlcIjtcbmltcG9ydCB7IEZ1c2VBUElGYWN0b3J5IH0gZnJvbSBcIi4vRnVzZUFQSUZhY3RvcnlcIjtcbmltcG9ydCB7IEZ1c2VDb250ZXh0IH0gZnJvbSBcIi4vRnVzZUNvbnRleHRcIjtcbmltcG9ydCB7IEZ1c2VMb2dnZXJGYWN0b3J5IH0gZnJvbSBcIi4vRnVzZUxvZ2dlckZhY3RvcnlcIjtcbmltcG9ydCB7IEZ1c2VMb2dnZXJMZXZlbCB9IGZyb20gXCIuL0Z1c2VMb2dnZXJMZXZlbFwiO1xuaW1wb3J0IHsgSUZ1c2VMb2dnZXIgfSBmcm9tIFwiLi9JRnVzZUxvZ2dlclwiO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9QbGF0Zm9ybVwiO1xuaW1wb3J0IHsgUGxhdGZvcm1SZXNvbHZlciB9IGZyb20gXCIuL1BsYXRmb3JtUmVzb2x2ZXJcIjtcblxuZXhwb3J0IGNsYXNzIEZ1c2VDb250ZXh0QnVpbGRlciB7XG4gICAgcHJpdmF0ZSAkcGxhdGZvcm1SZXNvbHZlcjogUGxhdGZvcm1SZXNvbHZlcjtcbiAgICBwcml2YXRlICRsb2dnZXJGYWN0b3J5OiBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5IHwgbnVsbDtcbiAgICBwcml2YXRlICRhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHwgbnVsbDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy4kbG9nZ2VyRmFjdG9yeSA9IG51bGw7XG4gICAgICAgIHRoaXMuJGFwaUZhY3RvcnkgPSBudWxsO1xuICAgICAgICB0aGlzLiRwbGF0Zm9ybVJlc29sdmVyID0gbmV3IFBsYXRmb3JtUmVzb2x2ZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UGxhdGZvcm1SZXNvbHZlcihyZXNvbHZlcjogUGxhdGZvcm1SZXNvbHZlcik6IEZ1c2VDb250ZXh0QnVpbGRlciB7XG4gICAgICAgIHRoaXMuJHBsYXRmb3JtUmVzb2x2ZXIgPSByZXNvbHZlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEFQSUZhY3RvcnkoZmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSk6IEZ1c2VDb250ZXh0QnVpbGRlciB7XG4gICAgICAgIHRoaXMuJGFwaUZhY3RvcnkgPSBmYWN0b3J5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TG9nZ2VyRmFjdG9yeShmYWN0b3J5OiBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5KTogRnVzZUNvbnRleHRCdWlsZGVyIHtcbiAgICAgICAgdGhpcy4kbG9nZ2VyRmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBfaXNEZWJ1Z01vZGUoY29udGV4dDogRnVzZUNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGNvbnRleHQuaXNEZWJ1Z01vZGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgYnVpbGQoKTogUHJvbWlzZTxGdXNlQ29udGV4dD4ge1xuICAgICAgICBjb25zdCBwbGF0Zm9ybTogUGxhdGZvcm0gPSB0aGlzLiRwbGF0Zm9ybVJlc29sdmVyLnJlc29sdmUoKTtcblxuICAgICAgICBsZXQgYXBpRmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeTtcbiAgICAgICAgaWYgKHRoaXMuJGFwaUZhY3RvcnkpIHtcbiAgICAgICAgICAgIGFwaUZhY3RvcnkgPSB0aGlzLiRhcGlGYWN0b3J5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXBpRmFjdG9yeSA9IG5ldyBGdXNlQVBJRmFjdG9yeSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxvZ2dlckZhY3Rvcnk6IEFic3RyYWN0RnVzZUxvZ2dlckZhY3Rvcnk7XG4gICAgICAgIGlmICh0aGlzLiRsb2dnZXJGYWN0b3J5KSB7XG4gICAgICAgICAgICBsb2dnZXJGYWN0b3J5ID0gdGhpcy4kbG9nZ2VyRmFjdG9yeVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyRmFjdG9yeSA9IG5ldyBGdXNlTG9nZ2VyRmFjdG9yeShwbGF0Zm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250ZXh0OiBGdXNlQ29udGV4dCA9IG5ldyBGdXNlQ29udGV4dChwbGF0Zm9ybSwgYXBpRmFjdG9yeSwgbG9nZ2VyRmFjdG9yeSk7XG5cbiAgICAgICAgY29uc3QgaXNEZWJ1Z01vZGU6IGJvb2xlYW4gPSBhd2FpdCB0aGlzLl9pc0RlYnVnTW9kZShjb250ZXh0KTtcbiAgICAgICAgY29uc3QgbG9nZ2VyOiBJRnVzZUxvZ2dlciA9IGNvbnRleHQuZ2V0TG9nZ2VyKCk7XG4gICAgICAgIGxvZ2dlci5lbmFibGVOYXRpdmVCcmlkZ2UoaXNEZWJ1Z01vZGUpO1xuICAgICAgICBsZXQgbGV2ZWw6IEZ1c2VMb2dnZXJMZXZlbCA9IGxvZ2dlci5nZXRMZXZlbCgpO1xuICAgICAgICBsZXZlbCB8PSBGdXNlTG9nZ2VyTGV2ZWwuREVCVUc7XG4gICAgICAgIGxvZ2dlci5zZXRMZXZlbChsZXZlbCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBJU2VyaWFsaXphYmxlIH0gZnJvbSBcIi4vSVNlcmlhbGl6YWJsZVwiO1xuaW1wb3J0IHsgVEZ1c2VTZXJpYWxpemFibGUgfSBmcm9tIFwiLi9UU2VyaWFsaXphYmxlXCI7XG5cbi8qKlxuICogQSB1bmlvbiBvZiBhY2NlcHRhYmxlIHR5cGUgZm9yIGVycm9yIGNhdXNlcy5cbiAqL1xuZXhwb3J0IHR5cGUgVEZ1c2VFcnJvckNhdXNlID0gc3RyaW5nIHwgRXJyb3IgfCBGdXNlRXJyb3IgfCBudWxsO1xuXG5pbnRlcmZhY2UgX0lGdXNlRXJyb3JTZXJpYWxpemVkIHtcbiAgICBkb21haW46IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIHN0YWNrPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEEgdHlwZSB0aGF0IHJlcHJlc2VudHMgYSBmdXNlIGVycm9yIGluIGEgc2VyaWFsaXplZCBzdGF0ZS5cbiAqL1xuZXhwb3J0IHR5cGUgSUZ1c2VFcnJvclNlcmlhbGl6ZWQgPSBURnVzZVNlcmlhbGl6YWJsZTxfSUZ1c2VFcnJvclNlcmlhbGl6ZWQ+O1xuXG4vKipcbiAqIEEgc3RydWN0dXJlZCBlcnJvciBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlRXJyb3IgZXh0ZW5kcyBFcnJvciBpbXBsZW1lbnRzIElTZXJpYWxpemFibGUge1xuICAgIHByaXZhdGUgJGRvbWFpbjogc3RyaW5nO1xuICAgIHByaXZhdGUgJG1lc3NhZ2U6IHN0cmluZztcbiAgICBwcml2YXRlICRjYXVzZTogVEZ1c2VFcnJvckNhdXNlO1xuICAgIHByaXZhdGUgJGNvZGU6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkb21haW4gLSBUaGUgZXJyb3IgZG9tYWluLCB1c3VhbGx5IHJlcHJlc2VudHMgYSBsaWJyYXJ5LCBjbGFzcywgb3IgcGx1Z2luLlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIC0gVGhlIGVycm9yIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0gY2F1c2UgLSBUaGUgdW5kZXJseWluZyBjYXVzZSBvZiB0aGUgZXJyb3IuIE1heSBiZSBudWxsLlxuICAgICAqIEBwYXJhbSBjb2RlIC0gQW4gZXJyb3IgY29kZS4gTWF5IGJlIG51bGwuXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGRvbWFpbjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGNhdXNlPzogVEZ1c2VFcnJvckNhdXNlLCBjb2RlPzogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIHRoaXMuJGRvbWFpbiA9IGRvbWFpbjtcbiAgICAgICAgdGhpcy4kbWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuJGNvZGUgPSBjb2RlIHx8IDA7XG4gICAgICAgIHRoaXMuJGNhdXNlID0gY2F1c2UgfHwgbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgZXJyb3IgbWVzc2FnZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRNZXNzYWdlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiRtZXNzYWdlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBlcnJvciBkb21haW4sIHVzdWFsbHkgcmVwcmVzZW50aW5nIGEgbGlicmFyeSwgY2xhc3MsIG9yIHBsdWdpbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RG9tYWluKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiRkb21haW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGVycm9yIGNvZGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q29kZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgdW5kZXJseWluZyBjYXVzZSBvZiB0aGUgZXJyb3IsIGlmIGtub3duLiBNYXkgYmUgbnVsbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q2F1c2UoKTogVEZ1c2VFcnJvckNhdXNlIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjYXVzZTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgQSBzZXJpYWxpemVkIG9iamVjdCByZXByZXNlbnRpbmcgYW4gZXJyb3IuXG4gICAgICovXG4gICAgcHVibGljIHNlcmlhbGl6ZSgpOiBJRnVzZUVycm9yU2VyaWFsaXplZCB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkb21haW46IHRoaXMuZ2V0RG9tYWluKCksXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLmdldE1lc3NhZ2UoKSxcbiAgICAgICAgICAgIGNvZGU6IHRoaXMuZ2V0Q29kZSgpLFxuICAgICAgICAgICAgc3RhY2s6IHRoaXMuc3RhY2tcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyB0aGUgZ2l2ZW4gb2JqZWN0IGludG8gYSBGdXNlRXJyb3Igb2JqZWN0LiBBY2NlcHRzIHNldmVyYWwgZGlmZmVyZW50XG4gICAgICogZm9ybWF0cywgd2hpY2ggaW5mbHVlbmNlcyB0aGUgYmVoYXZpb3VyIG9mIHRoaXMgbWV0aG9kLlxuICAgICAqIFxuICAgICAqIElmIHRoZSBpbnB1dCBpcyBhIHN0cmluZywgYSBGdXNlRXJyb3Igb2JqZWN0IGlzIGNyZWF0ZWQgd2l0aCB0aGUgc3RyaW5nIGFzXG4gICAgICogdGhlIGVycm9yIG1lc3NhZ2Ugb2YgYW4gdW5rbm93biBkb21haW4uXG4gICAgICogXG4gICAgICogSWYgdGhlIGlucHV0IGlzIGEgRnVzZUVycm9yLCB0aGVuIHRoaXMgbWV0aG9kIGRvZXMgbm90aGluZyBidXQgcGFzc2VzIHRocm91Z2hcbiAgICAgKiB0aGUgRnVzZUVycm9yLiBUaGUgcmV0dXJuZWQgRnVzZUVycm9yIGlzIHRoZSBpbnB1dCBGdXNlRXJyb3IsIGEgY29weSBpcyBub3QgbWFkZS5cbiAgICAgKiBcbiAgICAgKiBJZiB0aGUgaW5wdXQgaXMgYW4gRXJyb3IsIHRoZW4gYSBGdXNlRXJyb3IgaXMgY3JlYXRlZCB1c2luZyB0aGUgbmFtZSBhcyB0aGVcbiAgICAgKiBkb21haW4sIGFuZCBpdCdzIG1lc3NhZ2UgYXMgdGhlIGVycm9yIG1lc3NhZ2UuIFRoZSBlcnJvciBvYmplY3QgaXMgYWxzbyB1c2VkXG4gICAgICogYXMgdGhlIEZ1c2VFcnJvcidzIGNhdXNlIHBhcmFtZXRlci5cbiAgICAgKiBcbiAgICAgKiBJZiB0aGUgaW5wdXQgaXMgb2YgdGhlIHNoYXBlIG9mIElGdXNlRXJyb3JTZXJpYWxpemVkLCB0aGVuIHRoZSBvYmplY3QgaXNcbiAgICAgKiBkZXNlcmlhbGl6ZWQgaW50byBhIEZ1c2VFcnJvciBpbnN0YW5jZS5cbiAgICAgKiBcbiAgICAgKiBJZiBhbnkgb3RoZXIgdHlwZSBvZiBvYmplY3QgaXMgZ2l2ZW4sIGFuIGNvbnNvbGUgZXJyb3IgbWVzc2FnZSB3aWxsIGJlIFxuICAgICAqIHByaW50ZWQgYW5kIGEgXCJGdXNlRXJyb3JcIiBkb21haW4gZXJyb3Igd2lsbCBiZSByZXR1cm5lZCBzdGF0aW5nIHRoZSBlcnJvclxuICAgICAqIGlzIG5vdCB3cmFwcGFibGUuXG4gICAgICogXG4gICAgICogQHBhcmFtIGVycm9yIC0gQSB2YWx1ZSB0aGF0IGNhbiByZXByZXNlbnQgYW4gZXJyb3JcbiAgICAgKiBAcmV0dXJucyBBIEZ1c2VFcnJvciBpbnN0YW5jZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgd3JhcChlcnJvcjogc3RyaW5nIHwgRXJyb3IgfCBGdXNlRXJyb3IgfCBJRnVzZUVycm9yU2VyaWFsaXplZCB8IHVua25vd24pOiBGdXNlRXJyb3Ige1xuICAgICAgICBsZXQgZmVycjogRnVzZUVycm9yID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGZlcnIgPSBuZXcgRnVzZUVycm9yKCdVbmtub3duJywgZXJyb3IsIG51bGwsIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgRnVzZUVycm9yKSB7XG4gICAgICAgICAgICBmZXJyID0gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgZmVyciA9IG5ldyBGdXNlRXJyb3IoZXJyb3IubmFtZSwgZXJyb3IubWVzc2FnZSwgZXJyb3IsIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEZ1c2VFcnJvci4kaXNTZXJpYWxpemVkRnVzZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgZmVyciA9IEZ1c2VFcnJvci5mcm9tU2VyaWFsaXplZChlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbndyYXBwYWJsZSBFcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIGZlcnIgPSBuZXcgRnVzZUVycm9yKCdGdXNlRXJyb3InLCAnVW53cmFwcGFibGUgZXJyb3InLCBudWxsLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmZXJyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc2VyaWFsaXplcyBhbmQgY3JlYXRlcyBhIG5ldyBGdXNlRXJyb3IgaW5zdGFuY2VcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZXJyb3IgLSBUaGUgc2VyaWFsaXplZCBlcnJvciBvYmplY3RcbiAgICAgKiBAcmV0dXJucyBBIEZ1c2VFcnJvciBpbnN0YW5jZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVNlcmlhbGl6ZWQoZXJyb3I6IElGdXNlRXJyb3JTZXJpYWxpemVkKTogRnVzZUVycm9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGdXNlRXJyb3IoZXJyb3IuZG9tYWluLCBlcnJvci5tZXNzYWdlLCBudWxsLCBlcnJvci5jb2RlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiAnRnVzZUVycm9yJztcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHByaXZhdGUgc3RhdGljICRpc1NlcmlhbGl6ZWRGdXNlRXJyb3IoZXJyb3I6IGFueSk6IGVycm9yIGlzIElGdXNlRXJyb3JTZXJpYWxpemVkIHtcbiAgICAgICAgcmV0dXJuICdtZXNzYWdlJyBpbiBlcnJvciAmJiAnZG9tYWluJyBpbiBlcnJvciAmJiAnY29kZScgaW4gZXJyb3I7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge1xuICAgIElGdXNlTG9nZ2VyLCBJTmF0aXZlTG9nRW50cnlcbn0gZnJvbSAnLi9JRnVzZUxvZ2dlcic7XG5pbXBvcnQge1RTZXJpYWxpemFibGV9IGZyb20gJy4vVFNlcmlhbGl6YWJsZSc7XG5pbXBvcnQge0lTZXJpYWxpemFibGV9IGZyb20gJy4vSVNlcmlhbGl6YWJsZSc7XG5pbXBvcnQgeyBGdXNlTG9nZ2VyTGV2ZWwgfSBmcm9tICcuL0Z1c2VMb2dnZXJMZXZlbCc7XG5cbi8qKlxuICogQSBzZXJpYWxpemVyIGZvciBsb2dnaW5nLiBUaGlzIGlzIGRpZmZlcmVudCB0aGFuIGEge0BsaW5rIEZ1c2VTZXJpYWxpemVyfSBpblxuICogdGhhdCBpbiBzZXJpYWxpemVyIHRyYW5zZm9ybXMgb2JqZWN0cyBpbnRvIGEgcHJpbnRhYmxlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VMb2dnZXJTZXJpYWxpemVyIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVUb1N0cmluZyhvYmo6IFRTZXJpYWxpemFibGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplUHJpbWl0aXZlVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplRGF0ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5faXNJU2VyaWFsaXphYmxlKG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVUb1N0cmluZyhvYmouc2VyaWFsaXplKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplRXJyb3JUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2hlbiBhbGwgZWxzZSBmYWlscywgYXR0ZW1wdCB0byBKU09OIHN0cmluZ2lmeVxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCA0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZVByaW1pdGl2ZVRvU3RyaW5nKG9iajogbnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBvYmoudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZUVycm9yVG9TdHJpbmcob2JqOiBFcnJvcik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRFcnJvciA9IHtcbiAgICAgICAgICAgIG5hbWU6IG9iai5uYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogb2JqLm1lc3NhZ2UsXG4gICAgICAgICAgICBzdGFjazogb2JqLnN0YWNrXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHNlcmlhbGl6ZWRFcnJvciwgbnVsbCwgNCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVEYXRlVG9TdHJpbmcob2JqOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIG9iai50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZW1hcmtzXG4gICAgICogU2VyaWFsaXplcyBhbiBvYmplY3QgaW50byBhIHByaW50YWJsZSBzdHJpbmcuXG4gICAgICogXG4gICAgICogQHBhcmFtIG9iaiAtIFRoZSBvYmplY3QgdG8gc2VyaWFsaXplXG4gICAgICogQHJldHVybnMgQSBwcmludGFibGUgc3RyaW5nXG4gICAgICovXG4gICAgcHVibGljIHNlcmlhbGl6ZShvYmo6IFRTZXJpYWxpemFibGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdXQ6IHN0cmluZyA9IG51bGw7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICBvdXQgPSBgW0Jsb2IgJHtvYmoudHlwZSB8fCAnQmluYXJ5J30gKCR7b2JqLnNpemV9IGJ5dGVzKV1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCBvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBvdXQgPSB0aGlzLl9zZXJpYWxpemVUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBvdXQgPSBgW0FycmF5QnVmZmVyICgke29iai5ieXRlTGVuZ3RofSBieXRlcyldYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9pc0lTZXJpYWxpemFibGUob2JqKSkge1xuICAgICAgICAgICAgb3V0ID0gdGhpcy5zZXJpYWxpemUob2JqLnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHNob3VsZCBiZSBlaXRoZXIgSlNPTiBvYmplY3RzIG9yIGpzb24gYXJyYXlzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgICAgIG91dCA9IHRoaXMuX3NlcmlhbGl6ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcHJvdGVjdGVkIF9pc0lTZXJpYWxpemFibGUoeDogYW55KTogeCBpcyBJU2VyaWFsaXphYmxlIHtcbiAgICAgICAgcmV0dXJuICEheC5zZXJpYWxpemUgJiYgdHlwZW9mIHguc2VyaWFsaXplID09PSAnZnVuY3Rpb24nO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBIGJhc2UgbG9nZ2VyIGltcGxlbWVudGF0aW9uIHdoaWNoIGluY2x1ZGVzIGEgc2VyaWFsaXplciBmb3IgY29tbW9uIHR5cGVzLlxuICogSXQgd2lsbCBzZXJpYWxpemUvYWNjZXB0IGFsbCB2YWx1ZXMgdGhhdCBUU2VyaWFsaXphYmxlIGFjY2VwdHMsIGhvd2V2ZXIgQmxvYi9BcnJheUJ1ZmZlclxuICogb3Igb3RoZXIgYmluYXJ5IGRhdGEgdHlwZXMgd2lsbCBub3QgYmUgc2VyaWFsaXplZC4gSW5zdGVhZCBpdCB3aWxsIHByaW50IGFuXG4gKiBvYmplY3QgaWRlbnRpZmllciwgd2l0aCBtaW1lIHR5cGUgaWYgcHJlc2VudCwgYWxvbmcgd2l0aCB0aGUgc2l6ZSBvZiB0aGUgYnVmZmVyLlxuICogXG4gKiBUaGUgYmFzZSBsb2dnZXIgZG9lcyBub3QgcHJvdmlkZSBhbnkgbmF0aXZlIGJyaWRnaW5nLiBXaGlsZSB1c2FibGUgZm9yIHB1cmVseSB3ZWJ2aWV3IHNpZGUsXG4gKiB1c2UgdGhlIEZ1c2VMb2dnZXJGYWN0b3J5IHRvIGdldCBhIGxvZ2dlciBzcGVjaWZpYyBmb3IgeW91ciBydW50aW1lIGVudmlyb25tZW50LlxuICovXG5leHBvcnQgY2xhc3MgRnVzZUxvZ2dlciBpbXBsZW1lbnRzIElGdXNlTG9nZ2VyIHtcbiAgICBwcml2YXRlICRsZXZlbDogRnVzZUxvZ2dlckxldmVsO1xuICAgIHByaXZhdGUgJGVuYWJsZU5hdGl2ZUJyaWRnZTogYm9vbGVhbjtcbiAgICBwcml2YXRlICRzZXJpYWxpemVyOiBGdXNlTG9nZ2VyU2VyaWFsaXplcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy4kZW5hYmxlTmF0aXZlQnJpZGdlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kbGV2ZWwgPSBGdXNlTG9nZ2VyTGV2ZWwuSU5GTyB8IEZ1c2VMb2dnZXJMZXZlbC5XQVJOIHwgRnVzZUxvZ2dlckxldmVsLkVSUk9SO1xuICAgICAgICB0aGlzLiRzZXJpYWxpemVyID0gbmV3IEZ1c2VMb2dnZXJTZXJpYWxpemVyKCk7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyTmF0aXZlQ2FsYmxhY2soKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3JlZ2lzdGVyTmF0aXZlQ2FsYmxhY2soKTogdm9pZCB7fVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGxldmVsIC0gQSBiaXRtYXNrIG9wdGlvbiB0byBpbmRpY2F0ZSB3aGljaCBsZXZlbHMgdG8gbG9nLlxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogVG8gcmVwb3J0IG9uIFdBUk4gYW5kIEVSUk9SIG9ubHksIHlvdSB3b3VsZCBzZXQ6XG4gICAgICogXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGxvZ2dlci5zZXRMZXZlbChGdXNlTG9nZ2VyTGV2ZWwuV0FSTiB8IEZ1c2VMb2dnZXJMZXZlbC5FUlJPUik7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgcHVibGljIHNldExldmVsKGxldmVsOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy4kbGV2ZWwgPSBsZXZlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBUaGUgY3VycmVudCBsb2cgbGV2ZWwgYml0bWFzay5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0TGV2ZWwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGxldmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZW1hcmtzXG4gICAgICogSWYgZW5hYmxlZCwgVGhlIG5hdGl2ZSBGdXNlTG9nZ2VyIHdpbGwgcGFzcyBuYXRpdmUgbG9nIG1lc3NhZ2VzIHRvXG4gICAgICogdGhlIHdlYnZpZXcgYW5kIHdpbGwgYmUgbG9nZ2VkIGludG8gdGhlIEpTIGNvbnNvbGUuIExvZ3MgcGFzc2VkIHRocm91Z2hcbiAgICAgKiB0aGlzIGxvZ2dlciB3aWxsIGFsc28gYmUgcGFzc2VkIHRvIHRoZSBuYXRpdmUgZW52aXJvbm1lbnQgYW5kIHdpbGwgYmVcbiAgICAgKiBsb2dnZWQgaW4gdGhlIG5hdGl2ZSdzIGxvZ2dpbmcgY29uc29sZS5cbiAgICAgKiBcbiAgICAgKiBUaGlzIGNhbiBiZSBoZWxwZnVsIGluIGRlYnVnZ2luZyB3aGVyZSBhbGwgbG9ncyB3aWxsIGJlIGluIHRoZSBzYW1lIHBsYWNlLFxuICAgICAqIGhvd2V2ZXIsIGxvZ2dpbmcgY2FuIGJlIHZlcmJvc2UgYW5kIGNhbiBjYXVzZSBhIGRlZ3JhdGlvbiBvZiBwZXJmb3JtYW5jZSxcbiAgICAgKiB0aGVyZWZvcmUgaXQgbWF5IG5vdCBiZSBkZXNpcmFibGUgdG8gaGF2ZSBlbmFibGVkIGZvciBwcm9kdWN0aW9uIGJ1aWxkcy5cbiAgICAgKiBcbiAgICAgKiBUaGlzIGZlYXR1cmUgaXMgY3VycmVudGx5IGVuYWJsZWQgYnkgZGVmYXVsdCwgaG93ZXZlciB0aGlzIGlzIHN1YmplY3QgdG9cbiAgICAgKiBjaGFuZ2UuXG4gICAgICogXG4gICAgICogQHBhcmFtIGZsYWcgLSBlbmFibGVzIHRoZSBuYXRpdmUgYnJpZGdlIGxvZ2dpbmcgaWYgZW5hYmxlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZW5hYmxlTmF0aXZlQnJpZGdlKGZsYWc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy4kZW5hYmxlTmF0aXZlQnJpZGdlID0gISFmbGFnO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25OYXRpdmVMb2dFbnRyeShlbnRyeTogSU5hdGl2ZUxvZ0VudHJ5KTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuZ2V0TGV2ZWwoKSAmIGVudHJ5LmxldmVsKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LmxldmVsID09PSBGdXNlTG9nZ2VyTGV2ZWwuU0lMRU5UKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGVudHJ5LmxldmVsKSB7XG4gICAgICAgICAgICBjYXNlIEZ1c2VMb2dnZXJMZXZlbC5ERUJVRzpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKGVudHJ5Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBGdXNlTG9nZ2VyTGV2ZWwuSU5GTzpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oZW50cnkubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZ1c2VMb2dnZXJMZXZlbC5XQVJOOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlbnRyeS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRnVzZUxvZ2dlckxldmVsLkVSUk9SOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZW50cnkubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAdmlydHVhbCAtIEltcGxlbWVudGF0b3JzIHVzZSB0aGlzIG1ldGhvZCB0byBjYWxsIG9uIHRoZSBuYXRpdmUgbG9nZ2luZyBBUEkuXG4gICAgICogQHBhcmFtIGxldmVsIC0gVGhlIGxvZyBsZXZlbCBmb3IgdGhpcyBsb2cgcHJpbnRcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSAtIE92ZXJyaWRhYmxlIGhvb2sgdG8gc2VuZCBsb2dzIHRvIHRoZSBuYXRpdmUgZW52aXJvbm1lbnRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2xvZ1RvTmF0aXZlKGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWwsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge31cblxuICAgIHByaXZhdGUgJGxvZ1RvTmF0aXZlKGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWwsIGFyZ3M6IFRTZXJpYWxpemFibGVbXSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuJGVuYWJsZU5hdGl2ZUJyaWRnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZEFyZ3M6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNlcmlhbGl6ZWRBcmdzLnB1c2godGhpcy4kc2VyaWFsaXplci5zZXJpYWxpemUoYXJnc1tpXSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9nVG9OYXRpdmUobGV2ZWwsIHNlcmlhbGl6ZWRBcmdzLmpvaW4oJ1xcdCcpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJncyAtIHZhcmlhZGljIGFyZ3VtZW50cyBvZiBzZXJpYWxpemFibGUgb2JqZWN0cyB0byBsb2cgdG8gdGhlIGNvbnNvbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVidWcoLi4uYXJnczogVFNlcmlhbGl6YWJsZVtdKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuJGxldmVsICYgRnVzZUxvZ2dlckxldmVsLkRFQlVHKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5kZWJ1ZyguLi5hcmdzKTtcbiAgICAgICAgdGhpcy4kbG9nVG9OYXRpdmUoRnVzZUxvZ2dlckxldmVsLkRFQlVHLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJncyAtIHZhcmlhZGljIGFyZ3VtZW50cyBvZiBzZXJpYWxpemFibGUgb2JqZWN0cyB0byBsb2cgdG8gdGhlIGNvbnNvbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5mbyguLi5hcmdzOiBUU2VyaWFsaXphYmxlW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy4kbGV2ZWwgJiBGdXNlTG9nZ2VyTGV2ZWwuSU5GTykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUuaW5mbyguLi5hcmdzKTtcbiAgICAgICAgdGhpcy4kbG9nVG9OYXRpdmUoRnVzZUxvZ2dlckxldmVsLklORk8sIGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmdzIC0gdmFyaWFkaWMgYXJndW1lbnRzIG9mIHNlcmlhbGl6YWJsZSBvYmplY3RzIHRvIGxvZyB0byB0aGUgY29uc29sZVxuICAgICAqL1xuICAgIHB1YmxpYyB3YXJuKC4uLmFyZ3M6IFRTZXJpYWxpemFibGVbXSk6IHZvaWQge1xuICAgICAgICBpZiAoISh0aGlzLiRsZXZlbCAmIEZ1c2VMb2dnZXJMZXZlbC5XQVJOKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS53YXJuKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLiRsb2dUb05hdGl2ZShGdXNlTG9nZ2VyTGV2ZWwuV0FSTiwgYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZ3MgLSB2YXJpYWRpYyBhcmd1bWVudHMgb2Ygc2VyaWFsaXphYmxlIG9iamVjdHMgdG8gbG9nIHRvIHRoZSBjb25zb2xlXG4gICAgICovXG4gICAgcHVibGljIGVycm9yKC4uLmFyZ3M6IFRTZXJpYWxpemFibGVbXSk6IHZvaWQge1xuICAgICAgICBpZiAoISh0aGlzLiRsZXZlbCAmIEZ1c2VMb2dnZXJMZXZlbC5FUlJPUikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoLi4uYXJncyk7XG4gICAgICAgIHRoaXMuJGxvZ1RvTmF0aXZlKEZ1c2VMb2dnZXJMZXZlbC5FUlJPUiwgYXJncyk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBGdXNlTG9nZ2VyIH0gZnJvbSBcIi4vRnVzZUxvZ2dlclwiO1xuaW1wb3J0IHsgSUZ1c2VMb2dnZXIgfSBmcm9tIFwiLi9JRnVzZUxvZ2dlclwiO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9QbGF0Zm9ybVwiO1xuaW1wb3J0IHtJT1NGdXNlTG9nZ2VyfSBmcm9tICcuL2lvcy9JT1NGdXNlTG9nZ2VyJztcbmltcG9ydCB7QW5kcm9pZEZ1c2VMb2dnZXJ9IGZyb20gJy4vYW5kcm9pZC9BbmRyb2lkRnVzZUxvZ2dlcic7XG5cbi8qKlxuICogQSBkZWZhdWx0IGxvZ2dlciBmYWN0b3J5IGZvciBjcmVhdGluZyBsb2dnZXJzIGZvciB0aGUgZ2l2ZW4gcGxhdGZvcm0uXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlTG9nZ2VyRmFjdG9yeSB7XG4gICAgcHJpdmF0ZSAkcGxhdGZvcm06IFBsYXRmb3JtO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHBsYXRmb3JtIC0gVGhlIGN1cnJlbnQgUGxhdGZvcm0gaW4gdGhpcyBydW50aW1lIGVudmlyb25tZW50XG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xuICAgICAgICB0aGlzLiRwbGF0Zm9ybSA9IHBsYXRmb3JtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBGdXNlTG9nZ2VyIGZvciB0aGUgY3VycmVudCBQbGF0Zm9ybS5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBBIGxvZ2dlciBpbnN0YW5jZSAgIFxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGUoKTogSUZ1c2VMb2dnZXIge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuJHBsYXRmb3JtKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLklPUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IElPU0Z1c2VMb2dnZXIoKTtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uQU5EUk9JRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFuZHJvaWRGdXNlTG9nZ2VyKCk7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLlRFU1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGdXNlTG9nZ2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogQSBiaXRtYXNrIG9wdGlvbiBvZiBsb2dnZXIgbGV2ZWxzXG4gKi9cbmV4cG9ydCBlbnVtIEZ1c2VMb2dnZXJMZXZlbCB7XG4gICAgU0lMRU5UICA9IDAsXG4gICAgREVCVUcgICA9IDEsXG4gICAgSU5GTyAgICA9IDIsXG4gICAgV0FSTiAgICA9IDQsXG4gICAgRVJST1IgICA9IDhcbn1cbiIsIlxuXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge0lGdXNlR3JhbnRSZXN1bHR9IGZyb20gJy4vSUZ1c2VHcmFudFJlc3VsdCc7XG5pbXBvcnQge0Z1c2VQZXJtaXNzaW9uU3RhdGV9IGZyb20gJy4vRnVzZVBlcm1pc3Npb25TdGF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uIGV4dGVuZHMgbnVtYmVyID0gbnVtYmVyPiB7XG4gICAgcHJpdmF0ZSAkcmVzdWx0czogSUZ1c2VHcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbj47XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocmVzdWx0czogSUZ1c2VHcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4pIHtcbiAgICAgICAgdGhpcy4kcmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgfVxuXG4gICAgcHVibGljIGlzR3JhbnRlZChwZXJtaXNzaW9uOiBUU3VwcG9ydGVkUGVybWlzc2lvbik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcmVzdWx0c1twZXJtaXNzaW9uXSA9PT0gRnVzZVBlcm1pc3Npb25TdGF0ZS5HUkFOVEVEO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0FsbEdyYW50ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLiRyZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4kcmVzdWx0c1tpXSAhPT0gRnVzZVBlcm1pc3Npb25TdGF0ZS5HUkFOVEVEKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHJlamVjdEp1c3RpZmljYXRpb25zKCk6IHZvaWQge1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy4kcmVzdWx0cykge1xuICAgICAgICAgICAgaWYgKHRoaXMuJHJlc3VsdHNbaV0gPT09IEZ1c2VQZXJtaXNzaW9uU3RhdGUuUkVRVUlSRVNfSlVTVElGSUNBVElPTikge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJlc3VsdHNbaV0gPSBGdXNlUGVybWlzc2lvblN0YXRlLkRFTklFRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG91bGRKdXN0aWZ5KCk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy4kcmVzdWx0cykge1xuICAgICAgICAgICAgaWYgKHRoaXMuJHJlc3VsdHNbaV0gPT09IEZ1c2VQZXJtaXNzaW9uU3RhdGUuUkVRVUlSRVNfSlVTVElGSUNBVElPTikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQ29udGVudFR5cGUgfSBmcm9tICcuL0NvbnRlbnRUeXBlJztcbmltcG9ydCB7IEZ1c2VBUElSZXNwb25zZSB9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmltcG9ydCB7IEZ1c2VFcnJvciB9IGZyb20gJy4vRnVzZUVycm9yJztcbmltcG9ydCB7VEFQSUJyaWRnZUZ1bmN0aW9ufSBmcm9tICcuL0Z1c2VQbHVnaW4nO1xuaW1wb3J0IHtJRnVzZVBlcm1pc3Npb25SZXF1ZXN0fSBmcm9tICcuL0lGdXNlUGVybWlzc2lvblJlcXVlc3QnO1xuaW1wb3J0IHsgVEZ1c2VTZXJpYWxpemFibGUgfSBmcm9tICcuL1RTZXJpYWxpemFibGUnO1xuaW1wb3J0IHtGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0fSBmcm9tICcuL0Z1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQnO1xuXG4vKipcbiAqIEludm9rZWQgdG8gaGFuZGxlIHdoZW4gcGVybWlzc2lvbiBqdXN0aWZpY2F0aW9uIGlzIG5lY2Vzc2FyeS5cbiAqIFxuICogVGhpcyBpcyBhbiBhbmRyb2lkIGNvbmNlcHQsIHNvIGl0IHdpbGwgb25seSBiZSBpbnZva2VkIG9uIEFuZHJvaWQgZGV2aWNlcyxcbiAqIGFzIGlPUyBoYXMganVzdGlmaWNhdGlvbiB0ZXh0IGVtYmVkZGVkIGludG8gdGhlIGFjdHVhbCBwZXJtaXNzaW9uIHByb21wdC5cbiAqIFxuICogVXNlciBkaWFsb2cgc2hvdWxkIGJlIGRpc3BsYXllZCB0byBleHBsYWluIHdoeSB0aGUgYXBwIHdhbnRzIHRvIHVzZSB0aGUgcGVybWlzc2lvbi5cbiAqIEFuZHJvaWQgcmVjb21tZW5kcyBnaXZpbmcgdGhlIHVzZXIgdGhlIGFiaWxpdHkgdG8gYWNjZXB0IG9yIGRlbnkgYXQgdGhpcyB0aW1lLCBpZiB0aGUgdXNlciBkZW55LFxuICogdGhlbiByZXNvbHZlIHRoZSBwcm9taXNlIHdpbGwgZmFsc2UuXG4gKiBcbiAqIFJldHVybiB0cnVlIGlmIHRoZSBwZXJtaXNzaW9uIHJlcXVlc3Qgc2hvdWxkIHByb2NlZWQuXG4gKi9cbmV4cG9ydCB0eXBlIFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIgPSAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuXG5pbnRlcmZhY2UgX19JUGVybWlzc2lvblJlcXVlc3RBcmd1bWVudHM8VCBleHRlbmRzIG51bWJlcj4ge1xuICAgIHBlcm1pc3Npb25TZXQ6IFRbXTtcbiAgICBpc0p1c3RpZmllZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgVEZ1c2VQZXJtaXNzaW9uUmVxdWVzdEFyZ3VtZW50czxUIGV4dGVuZHMgbnVtYmVyPiA9IFRGdXNlU2VyaWFsaXphYmxlPF9fSVBlcm1pc3Npb25SZXF1ZXN0QXJndW1lbnRzPFQ+PjtcblxuZXhwb3J0IHR5cGUgVEZ1c2VBUElQZXJtaXNzaW9uUmVxdWVzdDxUIGV4dGVuZHMgbnVtYmVyID0gbnVtYmVyPiA9IFRBUElCcmlkZ2VGdW5jdGlvbjxDb250ZW50VHlwZS5KU09OLCBURnVzZVBlcm1pc3Npb25SZXF1ZXN0QXJndW1lbnRzPFQ+PjtcblxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHRvIGhhbmRsZSBwZXJtaXNzaW9uIHJlcXVlc3QuXG4gKiBDb25jcmV0ZSBjbGFzc2VzIHNob3VsZCBpbXBsZW1lbnQgdGhlIHByb3RlY3RlZCBfcmVxdWVzdCBtZXRob2QgdG8gY2FsbCBvbiB0aGVpclxuICogcGVybWlzc2lvbiByZXF1ZXN0IEZ1c2UgQVBJLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZVBlcm1pc3Npb25SZXF1ZXN0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uIGV4dGVuZHMgbnVtYmVyPiBpbXBsZW1lbnRzIElGdXNlUGVybWlzc2lvblJlcXVlc3Q8VFN1cHBvcnRlZFBlcm1pc3Npb24+IHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBUQUc6IHN0cmluZyA9ICdQZXJtaXNzaW9uUmVxdWVzdCc7XG5cbiAgICBwcml2YXRlICRhcGk6IFRGdXNlQVBJUGVybWlzc2lvblJlcXVlc3Q8VFN1cHBvcnRlZFBlcm1pc3Npb24+O1xuICAgIHByaXZhdGUgJHBlcm1pc3Npb25TZXQ6IFRTdXBwb3J0ZWRQZXJtaXNzaW9uW107XG4gICAgcHJpdmF0ZSAkanVzdGlmaWNhdGlvbkhhbmRsZXI6IFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIgfCBudWxsO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGFwaUJyaWRnZTogVEZ1c2VBUElQZXJtaXNzaW9uUmVxdWVzdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4sIHBlcm1pc3Npb25TZXQ6IFRTdXBwb3J0ZWRQZXJtaXNzaW9uW10sIGp1c3RpZmljYXRpb25IYW5kbGVyOiBURnVzZUp1c3RpZmljYXRpb25IYW5kbGVyID0gbnVsbCkge1xuICAgICAgICBpZiAoIXBlcm1pc3Npb25TZXQgfHwgKHBlcm1pc3Npb25TZXQgJiYgcGVybWlzc2lvblNldC5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRnVzZUVycm9yKEZ1c2VQZXJtaXNzaW9uUmVxdWVzdC5UQUcsICdBdCBsZWFzdCBvbmUgcGVybWlzc2lvbiBpcyByZXF1aXJlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kYXBpID0gYXBpQnJpZGdlO1xuICAgICAgICB0aGlzLiRwZXJtaXNzaW9uU2V0ID0gcGVybWlzc2lvblNldDtcbiAgICAgICAgdGhpcy4kanVzdGlmaWNhdGlvbkhhbmRsZXIgPSBqdXN0aWZpY2F0aW9uSGFuZGxlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGVybWlzc2lvblNldCgpOiBUU3VwcG9ydGVkUGVybWlzc2lvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHBlcm1pc3Npb25TZXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyAkcmVxdWVzdChpc0p1c3RpZmllZDogYm9vbGVhbik6IFByb21pc2U8RnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IEZ1c2VBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMuJGFwaShDb250ZW50VHlwZS5KU09OLCB7XG4gICAgICAgICAgICBwZXJtaXNzaW9uU2V0OiB0aGlzLmdldFBlcm1pc3Npb25TZXQoKSxcbiAgICAgICAgICAgIGlzSnVzdGlmaWVkOiBpc0p1c3RpZmllZFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICB0aHJvdyBhd2FpdCByZXNwb25zZS5yZWFkQXNFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0KGF3YWl0IHJlc3BvbnNlLnJlYWRBc0pTT04oKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyAkb25KdXN0aWZpY2F0aW9uUmVxdWVzdCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCF0aGlzLiRqdXN0aWZpY2F0aW9uSGFuZGxlcikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdQZXJtaXNzaW9uIHJlcXVpcmVzIGp1c3RpZmljYXRpb24sIGJ1dCB0aGlzIHJlcXVlc3QgaGFzIG5vIFRKdXN0aWZpY2F0aW9uSGFuZGxlcicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuJGp1c3RpZmljYXRpb25IYW5kbGVyKCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBhc3luYyByZXF1ZXN0KCk6IFByb21pc2U8RnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4+IHtcbiAgICAgICAgbGV0IHJlc3VsdHM6IEZ1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQ8VFN1cHBvcnRlZFBlcm1pc3Npb24+ID0gYXdhaXQgdGhpcy4kcmVxdWVzdChmYWxzZSk7XG5cbiAgICAgICAgaWYgKHJlc3VsdHMuc2hvdWxkSnVzdGlmeSgpKSB7XG4gICAgICAgICAgICBpZiAoYXdhaXQgdGhpcy4kb25KdXN0aWZpY2F0aW9uUmVxdWVzdCgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IGF3YWl0IHRoaXMuJHJlcXVlc3QodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnJlamVjdEp1c3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogQSBzZXQgb2YgY29uc3RhbnRzIHJlcHJlc2VudGluZyBwZXJtaXNzaW9uIHN0YXRlcy5cbiAqL1xuZXhwb3J0IGVudW0gRnVzZVBlcm1pc3Npb25TdGF0ZSB7XG4gICAgR1JBTlRFRCxcbiAgICBSRVFVSVJFU19KVVNUSUZJQ0FUSU9OLFxuICAgIERFTklFRFxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSBcIi4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeVwiO1xuaW1wb3J0IHsgRnVzZUFQSSB9IGZyb20gXCIuL0Z1c2VBUElcIjtcbmltcG9ydCB7VEZ1c2VBUElDYWxsYmFja0hhbmRsZXJ9IGZyb20gJy4vRnVzZUNhbGxiYWNrTWFuYWdlcic7XG5pbXBvcnQgeyBGdXNlQ29udGV4dCB9IGZyb20gXCIuL0Z1c2VDb250ZXh0XCI7XG5pbXBvcnQge0Z1c2VBUElSZXNwb25zZX0gZnJvbSAnLi9GdXNlQVBJUmVzcG9uc2UnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9QbGF0Zm9ybVwiO1xuaW1wb3J0IHsgQ29udGVudFR5cGUgfSBmcm9tIFwiLi9Db250ZW50VHlwZVwiO1xuaW1wb3J0IHsgVFNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL1RTZXJpYWxpemFibGVcIjtcbmltcG9ydCB7IEZ1c2VTZXJpYWxpemVyIH0gZnJvbSBcIi4vRnVzZVNlcmlhbGl6ZXJcIjtcblxuZXhwb3J0IHR5cGUgVEFQSUJyaWRnZUZ1bmN0aW9uPFRDb250ZW50VHlwZSBleHRlbmRzIENvbnRlbnRUeXBlID0gQ29udGVudFR5cGUsIFREYXRhIGV4dGVuZHMgVFNlcmlhbGl6YWJsZSA9IFRTZXJpYWxpemFibGU+ID0gKHR5cGU/OiBUQ29udGVudFR5cGUsIGRhdGE/OiBURGF0YSkgPT4gUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+O1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIEZ1c2UgUGx1Z2luc1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRnVzZVBsdWdpbjxUQVBJT3B0cyA9IHVua25vd24+IHtcbiAgICBwcml2YXRlICRjb250ZXh0OiBGdXNlQ29udGV4dDtcbiAgICBwcml2YXRlICRhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEZ1c2VDb250ZXh0KSB7XG4gICAgICAgIHRoaXMuJGNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLiRhcGlGYWN0b3J5ID0gdGhpcy5fY3JlYXRlQVBJRmFjdG9yeSgpIHx8IGNvbnRleHQuZ2V0RGVmYXVsdEFQSUZhY3RvcnkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBBUEkgYnJpZGdlXG4gICAgICogQHBhcmFtIHBsYXRmb3JtIC0gVGhlIHJ1bnRpbWUgcGxhdGZvcm1cbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZUFQSShwbGF0Zm9ybTogUGxhdGZvcm0pOiBGdXNlQVBJIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFQSUZhY3RvcnkoKS5jcmVhdGUocGxhdGZvcm0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBcbiAgICAgKiBDcmVhdGUgYSBjb25jcmV0ZSB7QGxpbmsgRnVzZUFQSX0gZmFjdG9yeSBjYXBhYmxlIG9mIGNyZWF0aW5nIEZ1c2VBUElcbiAgICAgKiBpbnN0YW5jZSBmb3IgdGhlIGN1cnJlbnQgcnVudGltZS5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBBIGNvbmNyZXRlIHtAbGluayBGdXNlQVBJfSBGYWN0b3J5XG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVBUElGYWN0b3J5KCk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBUaGUgY29uY3JldGUgQVBJIGZhY3RvcnlcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2dldEFQSUZhY3RvcnkoKTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRhcGlGYWN0b3J5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRBUElPcHRzIGlzIGEgcGx1Z2luIGdlbmVyaWMgdHlwZSBkZWNsYXJpbmcgb3B0aW9ucy5cbiAgICAgKiBVc2VyIG1heSB1c2UgdGhpcyB0byBkZWNsYXJlIGEgcGF0aCBvbiBob3cgdG8gZ2V0IGEgcGFydGljdWxhciBGdXNlQVBJLlxuICAgICAqIFxuICAgICAqIFRoaXMgQVBJIG1heSBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXMgdG8gdXRpbGlzZSB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBpcyB0byBzaW1wbHkgcmV0dXJuIGEgc3RhbmRhcmQgRnVzZUFQSS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gb3B0cyAtIEFQSSBvcHRpb25zXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9nZXRBUEkob3B0cz86IFRBUElPcHRzKTogRnVzZUFQSSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRnZXRBUEkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RhbmRhcmQgRnVzZUFQSVxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHByaXZhdGUgJGdldEFQSSgpOiBGdXNlQVBJIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFQSUZhY3RvcnkoKS5jcmVhdGUodGhpcy5nZXRDb250ZXh0KCkuZ2V0UGxhdGZvcm0oKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNhbGxiYWNrIGNvbnRleHQgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIG5hdGl2ZVxuICAgICAqIFRoZSBuYXRpdmUgY29kZSBjYW4gdXNlIHRoZSBjYWxsYmFja0lEIHRvIGNhbGxiYWNrIHRvIHRoZSBKUyBjb2RlLlxuICAgICAqIFxuICAgICAqIFRoZSBjYWxsYmFjayBjYW4gYmUgdXNlZCBzZXZlcmFsIHRpbWVzLlxuICAgICAqIFxuICAgICAqIFJlbGVhc2UgdGhlIGNhbGxiYWNrIHVzaW5nIF9yZWxlYXNlQ2FsbGJhY2sgd2l0aCB0aGUgZ2l2ZW4gY2FsbGJhY2tJRC5cbiAgICAgKiBUaGVzZSBBUEkgdXNhZ2VzIHNob3VsZCBiZSBwYXJ0IG9mIHlvdXIgcGx1Z2luIEFQSS4gV2hlbiByZWxlYXNpbmcgYSBjYWxsYmFjayxcbiAgICAgKiBhIHN0YW5kYXJkIEFQSSBjYWxsIHNob3VsZCBiZSBtYWRlIHRvIHlvdXIgcGx1Z2luIHRvIHRlbGwgdGhlIG5hdGl2ZSBzaWRlIHRoYXRcbiAgICAgKiB0aGUgY2FsbGJhY2sgaXMgbm8gbG9uZ2VyIHVzYWJsZSwgYW5kIGl0IHNob3VsZCBjbGVhbiB1cCB0aGUgbmF0aXZlIHJlc291cmNlcyBzdXJyb3VuZGluZ1xuICAgICAqIHRoZSBjYWxsYmFjayBjb250ZXh0LlxuICAgICAqIFxuICAgICAqIE5vdGUgdGhhdCBjYWxsYmFjayBkYXRhIHBheWxvYWRzIG9ubHkgc3VwcG9ydHMgc3RyaW5ncy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY2IgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gXG4gICAgICogQHJldHVybnMgU3RyaW5nIC0gY2FsbGJhY2tJRFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfY3JlYXRlQ2FsbGJhY2soY2I6IFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyLCBhcGlPcHRzPzogVEFQSU9wdHMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QVBJKGFwaU9wdHMpLmNyZWF0ZUNhbGxiYWNrQ29udGV4dChjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVsZWFzZXMgYSBjcmVhdGVkIGNhbGxiYWNrLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBpZCAtIGNhbGxiYWNrSURcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX3JlbGVhc2VDYWxsYmFjayhpZDogc3RyaW5nLCBhcGlPcHRzPzogVEFQSU9wdHMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZ2V0QVBJKGFwaU9wdHMpLnJlbGVhc2VDYWxsYmFjayhpZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgRnVzZUNvbnRleHRcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBUaGUgY3VycmVudCBjb250ZXh0XG4gICAgICovXG4gICAgcHVibGljIGdldENvbnRleHQoKTogRnVzZUNvbnRleHQge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29udGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIFxuICAgICAqIENvbmNyZXRlIGNsYXNzZXMgc2hvdWxkIGltcGxlbWVudCBhbmQgcmV0dXJuIGEgc3RyaW5nIHRoYXQgdW5pcXVlbHkgcmVwcmVzZW50cyB0aGlzIHBsdWdpbi5cbiAgICAgKiBUaGUgc3RyaW5nIG11c3QgY29uZm9ybSB0byBVUkwgZnJhZ21lbnQgcnVsZXMuIEl0IHNoYWxsIG9ubHkgY29udGFpbiB0aGUgZm9sbG93aW5nIGNoYXJhY3RlcnM6XG4gICAgICogIC0gQWxwaGFiZXRpY2FsIGxldHRlcnNcbiAgICAgKiAgLSBOdW1iZXJzXG4gICAgICogIC0gZG90cyBhbmQgaHlwaGVuc1xuICAgICAqIFxuICAgICAqIEB2aXJ0dWFsXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF9nZXRJRCgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwbHVnaW4gSURcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0SUQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldElEKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGV4ZWN1dGlvbiBBUEkuIENvbmNyZXRlIGNsYXNzZXMgY2FuIGNhbGwgdGhpcyB0byBwZXJmb3JtIGNhbGxzIHRvIHRoZSBuYXRpdmUgc2lkZS5cbiAgICAgKiBcbiAgICAgKiBUaGUgY29uY3JldGUgY2xhc3Mgc2hvdWxkIGV4cG9zZSBwdWJsaWMgbWV0aG9kcyB3aXRoIHR5cGUgaW5mb3JtYXRpb24gZXhwb3NlZC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbWV0aG9kIC0gVGhlIG1ldGhvZCBsaW5rLCB0aGlzIHNob3VsZCBtYXRjaCB0aGUgZW5kcG9pbnQgZGVmaW5lZCBpbiB0aGUgbmF0aXZlIEFQSS5cbiAgICAgKiBAcGFyYW0gY29udGVudFR5cGUgLSB0aGUgTUlNRSB0eXBlIG9mIHRoZSBkYXRhIHlvdSBhcmUgcGFzc2luZyBpbi5cbiAgICAgKiBAcGFyYW0gZGF0YSAtIFRoZSBkYXRhIHRvIHBhc3MgdG8gdGhlIG5hdGl2ZSBlbnZpcm9ubWVudFxuICAgICAqIEByZXR1cm5zIFRoZSByZXNwb25zZSBib2R5IGZyb20gbmF0aXZlLiBGdXNlUmVzcG9uc2VSZWFkZXIgaGFzIHNvbWUgdXRpbGl0eSBtZXRob2RzIHRvIHJlYWQgdGhlIGRhdGEgaW4gY29tbW9uIGZvcm1hdHMgKGUuZy4gdGV4dCBvciBKU09OKVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhc3luYyBfZXhlYyhtZXRob2Q6IHN0cmluZywgY29udGVudFR5cGU/OiBzdHJpbmcsIGRhdGE/OiBUU2VyaWFsaXphYmxlLCBhcGlPcHRzPzogVEFQSU9wdHMpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fZ2V0QVBJKGFwaU9wdHMpLmV4ZWN1dGUodGhpcy5nZXRJRCgpLCBtZXRob2QsIGNvbnRlbnRUeXBlLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIFRoaXMgaXMgdXNlZnVsIHdoZW4geW91IHdhbnQgdG8gdXNlIGFuIEFQSSBhcyBhIGNhbGxiYWNrLCB3aXRob3V0IGV4cG9zaW5nXG4gICAgICogdGhlIHBsdWdpbiBpbXBsZW1lbnRhdGlvbi4gVGhlIHJldHVybmVkIGZ1bmN0aW9uIGlzIGEgYm91bmRlZCBmdW5jdGlvbi5cbiAgICAgKiBXaGVuIGludm9rZWQsIGl0IHdpbGwgY2FsbCBvbiB0aGUgQVBJIGVuZHBvaW50IGFuZCByZXR1cm5zIGEge0BsaW5rIEZ1c2VBUElSZXNwb25zZX1cbiAgICAgKiBhc3luY2hyb25vdXNseS5cbiAgICAgKiBcbiAgICAgKiBAc2VhbGVkXG4gICAgICogQHBhcmFtIHJvdXRlIC0gVGhlIEFQSSBlbmQgcG9pbnRcbiAgICAgKiBAcGFyYW0gc2VyaWFsaXplciAtIFRoZSBzZXJpYWxpemVyIHRvIHVzZS4gRGVmYXVsdHMgdG8ge0BsaW5rIEZ1c2VTZXJpYWxpemVyfSB3aGljaCBpcyBhIHNlbnNpYmxlIHNlcmlhbGl6ZXIuXG4gICAgICogQHJldHVybnMgQSBjb250ZXh0LWJpbmRpbmcgZnVuY3Rpb24gdGhhdCBjYW4gYmUgZ2l2ZW4gdG8gYW5vdGhlciBvYmplY3QuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVBUElCcmlkZ2Uocm91dGU6IHN0cmluZywgc2VyaWFsaXplcj86IEZ1c2VTZXJpYWxpemVyKTogVEFQSUJyaWRnZUZ1bmN0aW9uIHtcbiAgICAgICAgaWYgKCFzZXJpYWxpemVyKSB7XG4gICAgICAgICAgICBzZXJpYWxpemVyID0gbmV3IEZ1c2VTZXJpYWxpemVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXN5bmMgKHR5cGU/OiBDb250ZW50VHlwZSwgZGF0YT86IFRTZXJpYWxpemFibGUpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2V4ZWMocm91dGUsIHR5cGUsIHNlcmlhbGl6ZXIuc2VyaWFsaXplKGRhdGEpKTtcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogQSBzdGF0aWMgY2xhc3Mgd2l0aCBjb252ZW5pZW5jZSBtZXRob2RzIGZvciByZWFkaW5nIGNvbW1vblxuICogcmVzcG9uc2UgY29udGVudCBib2R5IGZvcm1hdHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlUmVzcG9uc2VSZWFkZXIge1xuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBSZWFkcyB0aGUgZGF0YSBidWZmZXIgYXMgYSBzdHJpbmdcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZGF0YSAtIGlucHV0IGRhdGFcbiAgICAgKiBAcmV0dXJucyBUaGUgYnVmZmVyIGNvbnRlbnRzIGFzIGEgc3RyaW5nXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyByZWFkQXNUZXh0KGRhdGE6IEFycmF5QnVmZmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVhZGVyOiBGaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSg8c3RyaW5nPnJlYWRlci5yZXN1bHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlYWRlci5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KG5ldyBCbG9iKFtkYXRhXSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIFJlYWRzIHRoZSBnaXZlbiBkYXRhIGJ1ZmZlciBhcyBhIEpTT04gb2JqZWN0LiBUaGUgSlNPTiBvYmplY3RcbiAgICAgKiBjYW4gYmUgdHlwZWQgYXMgVCBnZW5lcmljLiBObyB2YWxpZGF0aW9ucyBvY2N1cnMgb24gd2hldGhlciB0aGUgZ2l2ZW5cbiAgICAgKiBkYXRhIGlzIGFjdHVhbGx5IGEgdHlwZSBvZiBULlxuICAgICAqIFxuICAgICAqIEB0aHJvd3Mge0BsaW5rIFN5bnRheEVycm9yfVxuICAgICAqIElmIGRhdGEgaXMgbm90IHBhcnNlYWJsZSBhcyBKU09OLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBkYXRhIC0gaW5wdXQgZGF0YVxuICAgICAqIEByZXR1cm5zIFRoZSBidWZmZXIgY29udGVudHMgYXMgYSBKU09OIG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlYWRBc0pTT048VD4oZGF0YTogQXJyYXlCdWZmZXIpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgY29uc3Qgc3RyOiBzdHJpbmcgPSBhd2FpdCB0aGlzLnJlYWRBc1RleHQoZGF0YSk7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cik7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBJU2VyaWFsaXphYmxlIH0gZnJvbSBcIi4vSVNlcmlhbGl6YWJsZVwiO1xuaW1wb3J0IHsgVFNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL1RTZXJpYWxpemFibGVcIjtcblxuLyoqXG4gKiBBIGNsYXNzIHRvIHNlcmlhbGl6ZSBzZXZlcmFsIGRpZmZlcmVudCB0eXBlcyBvZiBvYmplY3RzIGludG8gYSBkYXRhIHN0cnVjdHVyZVxuICogdGhhdCBjYW4gYmUgcmVjb25zdHJ1Y3RlZCBhY3Jvc3MgdGhlIEZ1c2UgQVBJIGJyaWRnZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VTZXJpYWxpemVyIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVUb1N0cmluZyhvYmo6IFRTZXJpYWxpemFibGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplUHJpbWl0aXZlVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplRGF0ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5faXNJU2VyaWFsaXphYmxlKG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVUb1N0cmluZyhvYmouc2VyaWFsaXplKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplRXJyb3JUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2hlbiBhbGwgZWxzZSBmYWlscywgYXR0ZW1wdCB0byBKU09OIHN0cmluZ2lmeVxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZVByaW1pdGl2ZVRvU3RyaW5nKG9iajogbnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBvYmoudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZUVycm9yVG9TdHJpbmcob2JqOiBFcnJvcik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRFcnJvciA9IHtcbiAgICAgICAgICAgIG5hbWU6IG9iai5uYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogb2JqLm1lc3NhZ2UsXG4gICAgICAgICAgICBzdGFjazogb2JqLnN0YWNrXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHNlcmlhbGl6ZWRFcnJvciwgbnVsbCwgNCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVEYXRlVG9TdHJpbmcob2JqOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIG9iai50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlcmlhbGl6ZXMgdGhlIGdpdmVuIG9iamVjdCBpbnRvIGEgYmxvYi5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gb2JqIC0gQSBzdXBwb3J0ZWQgc2VyaWFsaXphYmxlIG9iamVjdC4gU2VlIHtAbGluayBUU2VyaWFsaXphYmxlfSBmb3JcbiAgICAgKiBhIGxpc3Qgb2YgY3VycmVudGx5IHN1cHBvcnRlZCB0eXBlc1xuICAgICAqIEByZXR1cm5zIEEgc2VyaWFsaXplZCBibG9iXG4gICAgICovXG4gICAgcHVibGljIHNlcmlhbGl6ZShvYmo6IFRTZXJpYWxpemFibGUpOiBCbG9iIHtcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYmluOiBCbG9iO1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgYmluID0gb2JqO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCBvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqKV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbb2JqXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5faXNJU2VyaWFsaXphYmxlKG9iaikpIHtcbiAgICAgICAgICAgIGJpbiA9IG5ldyBCbG9iKFt0aGlzLnNlcmlhbGl6ZShvYmouc2VyaWFsaXplKCkpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBzaG91bGQgYmUgZWl0aGVyIEpTT04gb2JqZWN0cyBvciBqc29uIGFycmF5cyBhdCB0aGlzIHBvaW50XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqKV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJpbjtcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHByb3RlY3RlZCBfaXNJU2VyaWFsaXphYmxlKHg6IGFueSk6IHggaXMgSVNlcmlhbGl6YWJsZSB7XG4gICAgICAgIHJldHVybiAhIXguc2VyaWFsaXplICYmIHR5cGVvZiB4LnNlcmlhbGl6ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IENvbnRlbnRUeXBlIH0gZnJvbSAnLi9Db250ZW50VHlwZSc7XG5pbXBvcnQge0Z1c2VBUEl9IGZyb20gJy4vRnVzZUFQSSc7XG5pbXBvcnQgeyBGdXNlQVBJUmVzcG9uc2UgfSBmcm9tICcuL0Z1c2VBUElSZXNwb25zZSc7XG5pbXBvcnQge0Z1c2VFcnJvcn0gZnJvbSAnLi9GdXNlRXJyb3InO1xuXG4vKipcbiAqIEEgRnVzZSBBUEkgaW1wbGVtZW50YXRpb24gdGhhdCB1c2VzIEhUVFAgcHJvdG9jb2wgdG8gbWFrZSBuYXRpdmUgY2FsbHNcbiAqL1xuZXhwb3J0IGNsYXNzIEhUVFBGdXNlQVBJIGV4dGVuZHMgRnVzZUFQSSB7XG4gICAgXG4gICAgcHJvdGVjdGVkIGFzeW5jIF9nZXRFbmRwb2ludCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIF9pbml0SGVhZGVycyh4aHI6IFhNTEh0dHBSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7fVxuXG4gICAgcHVibGljIGFzeW5jIGJ1aWxkUm91dGUocGx1Z2luSUQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBlbmRwb2ludDogc3RyaW5nID0gYXdhaXQgdGhpcy5fZ2V0RW5kcG9pbnQoKTtcbiAgICAgICAgcmV0dXJuIGAke2VuZHBvaW50fSR7dGhpcy5fY3JlYXRlUm91dGUocGx1Z2luSUQsIG1ldGhvZCl9YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX2V4ZWN1dGUocGx1Z2luSUQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGNvbnRlbnRUeXBlOiBzdHJpbmcsIGRhdGE6IEJsb2IpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCB4aHI6IFhNTEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICB4aHIub3BlbignUE9TVCcsIGF3YWl0IHRoaXMuYnVpbGRSb3V0ZShwbHVnaW5JRCwgbWV0aG9kKSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjb250ZW50VHlwZSA9IENvbnRlbnRUeXBlLkJJTkFSWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuX2luaXRIZWFkZXJzKHhocik7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9kb1JlcXVlc3QoeGhyLCBkYXRhKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2RvUmVxdWVzdCh4aHI6IFhNTEh0dHBSZXF1ZXN0LCBkYXRhOiBCbG9iKTogUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogRnVzZUFQSVJlc3BvbnNlID0gbmV3IEZ1c2VBUElSZXNwb25zZSh4aHIucmVzcG9uc2UsIHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSwgeGhyLnN0YXR1cyk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmlzRXJyb3IoKSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoYXdhaXQgcmVzcG9uc2UucmVhZEFzRXJyb3IoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBGdXNlRXJyb3IoJ0Z1c2VBUEknLCAnTmV0d29yayBFcnJvcicpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbnRpbWVvdXQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRnVzZUVycm9yKCdGdXNlQVBJJywgJ0FQSSBUaW1lb3V0JykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fZG9TZW5kKHhociwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZG9TZW5kKHhocjogWE1MSHR0cFJlcXVlc3QsIGRhdGE6IEJsb2IpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCAmJiBkYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICB4aHIuc2VuZChkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogRW51bWVyYXRpb24gZm9yIHN1cHBvcnRlZCBwbGF0Zm9ybXNcbiAqL1xuZXhwb3J0IGVudW0gUGxhdGZvcm0ge1xuICAgIElPUyA9IDEsXG4gICAgQU5EUk9JRCxcbiAgICAvKipcbiAgICAgKiBTcGVjaWFsaXplZCBwbGF0Zm9ybSB1c2VkIGZvciB0ZXN0IGVudmlyb25tZW50cyxcbiAgICAgKiB3aWxsIG5vdCBiZSB1c2VkIGZvciByZWd1bGFyIHJ1bnRpbWVzLlxuICAgICAqL1xuICAgIFRFU1Rcbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9QbGF0Zm9ybVwiO1xuXG4vKipcbiAqIEEgc3RyYXRlZ3kgdG8gcmVzb2x2ZSB0aGUgcnVudGltZSdzIHBsYXRmb3JtXG4gKi9cbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybVJlc29sdmVyIHtcbiAgICBwdWJsaWMgcmVzb2x2ZSgpOiBQbGF0Zm9ybSB7XG4gICAgICAgIGlmICh0aGlzLmlzSU9TRW52aXJvbm1lbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIFBsYXRmb3JtLklPUztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoZSBvbmx5IG90aGVyIHN1cHBvcnRlZCBwbGF0Zm9ybSBpcyBBbmRyb2lkLCBzb1xuICAgICAgICAgICAgLy8gaXQncyBhc3N1bWVkXG4gICAgICAgICAgICByZXR1cm4gUGxhdGZvcm0uQU5EUk9JRDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc0lPU0Vudmlyb25tZW50KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wgPT09ICdidGZ1c2U6JztcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNBbmRyb2lkRW52aXJvbm1lbnQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5pc0lPU0Vudmlyb25tZW50KCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCByZXByZXNlbnRzIGEge0BsaW5rIGh0dHBzOi8vc2VtdmVyLm9yZy99IHZlcnNpb25pbmcuXG4gKi9cbmV4cG9ydCBjbGFzcyBWZXJzaW9uIHtcbiAgICBwcml2YXRlICRtYWpvcjogbnVtYmVyO1xuICAgIHByaXZhdGUgJG1pbm9yOiBudW1iZXI7XG4gICAgcHJpdmF0ZSAkcGF0Y2g/OiBudW1iZXI7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExFU1NfVEhBTjogbnVtYmVyID0gLTE7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFUVVBTDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdSRUFURVJfVEhBTjogbnVtYmVyID0gMTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihtYWpvcjogbnVtYmVyLCBtaW5vcj86IG51bWJlciwgcGF0Y2g/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy4kbWFqb3IgPSBtYWpvcjtcbiAgICAgICAgdGhpcy4kbWlub3IgPSBtaW5vciB8fCAwO1xuICAgICAgICB0aGlzLiRwYXRjaCA9IHBhdGNoIHx8IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBQYXJzZXMgYSBzZW12ZXItZm9ybWF0dGVkIHZlcnNpb24gc3RyaW5nIGFuZCBjcmVhdGVzIGEgVmVyc2lvbiBvYmplY3QuXG4gICAgICogRG9lcyBub3Qgc3VwcG9ydCBwcmUtcmVsZWFzZSBsYWJlbHMsIHdoaWNoIHdpbGwgYmUgY2hvcHBlZCBvZmYuXG4gICAgICogSWYgYW55IGRvdCBub3RhdGlvbiBzZWdtZW50IGlzIG1pc3Npbmcgb3IgaXMgbm90IHBhcnNlYWJsZSBhcyBhbiBpbnRlZ2VyLFxuICAgICAqIGl0IHdpbGwgZGVmYXVsdCB0byAwLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB2ZXJzaW9uIC0gU2VtdmVyIGZvcm1hdHRlZCB2ZXJzaW9uIHN0cmluZ1xuICAgICAqIEByZXR1cm5zIEEgdmVyc2lvbiBvYmplY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHBhcnNlVmVyc2lvblN0cmluZyh2ZXJzaW9uOiBzdHJpbmcpOiBWZXJzaW9uIHtcbiAgICAgICAgY29uc3QgcGFydHM6IHN0cmluZ1tdID0gdmVyc2lvbi5zcGxpdCgnLicpO1xuXG4gICAgICAgIGxldCBtYWpvcjogbnVtYmVyID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICBsZXQgbWlub3I6IG51bWJlciA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICAgICAgbGV0IHBhdGNoOiBudW1iZXIgPSBwYXJzZUludChwYXJ0c1syXSk7XG5cbiAgICAgICAgaWYgKGlzTmFOKG1ham9yKSkge1xuICAgICAgICAgICAgbWFqb3IgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKG1pbm9yKSkge1xuICAgICAgICAgICAgbWlub3IgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKHBhdGNoKSkge1xuICAgICAgICAgICAgcGF0Y2ggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWZXJzaW9uKG1ham9yLCBtaW5vciwgcGF0Y2gpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBzZWFsZWRcbiAgICAgKiBAcmV0dXJucyBUaGUgbWFqb3IgY29tcG9uZW50IG9mIHRoaXMgdmVyc2lvblxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRNYWpvcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kbWFqb3I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHNlYWxlZFxuICAgICAqIEByZXR1cm5zIFRoZSBtaW5vciBjb21wb25lbnQgb2YgdGhpcyB2ZXJzaW9uXG4gICAgICovXG4gICAgcHVibGljIGdldE1pbm9yKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRtaW5vcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc2VhbGVkXG4gICAgICogQHJldHVybnMgVGhlIHBhdGNoIGNvbXBvbmVudCBvZiB0aGlzIHZlcnNpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UGF0Y2goKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHBhdGNoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBzZWFsZWRcbiAgICAgKiBAcmV0dXJucyBBIHNlbXZlci1mb3JtYXR0ZWQgc3RyaW5nXG4gICAgICovXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLiRtYWpvcn0uJHt0aGlzLiRtaW5vcn0uJHt0aGlzLiRwYXRjaH1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBzZWFsZWRcbiAgICAgKiBAcGFyYW0gYiAtIFRoZSByaWdodCBzaWRlIHZlcnNpb25cbiAgICAgKiBAcmVtYXJrc1xuICAgICAqICBUaGlzIGlzIHRoZSBlcXVpdmlsYW50IGluIHVzaW5nIGBWZXJzaW9uLmNvbXBhcmUodGhpcywgYilgLlxuICAgICAqICBTZWUge0BsaW5rIGNvcG1hcmV9IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICovXG4gICAgcHVibGljIGNvbXBhcmUoYjogVmVyc2lvbik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBWZXJzaW9uLmNvbXBhcmUodGhpcywgYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBDb21wYXJlcyB0aGlzIHZlcnNpb24gd2l0aCBhbm90aGVyLiBJZiBsZWZ0IHNpZGUgaXMgZ3JlYXRlciB0aGFuIHJpZ2h0IHNpZGUsXG4gICAgICoge0BsaW5rIEdSRUFURVJfVEhBTn0gaXMgcmV0dXJuZWQuIElmIHRoZXkgYXJlIGVxdWFsLCB7QGxpbmsgRVFVQUx9IGlzIHJldHVybmVkLlxuICAgICAqIE90aGVyd2lzZSwge0BsaW5rIExFU1NfVEhBTn0gaXMgcmV0dXJuZWQuXG4gICAgICogXG4gICAgICogQHBhcmFtIGxocyAtIFRoZSBsZWZ0IHNpZGUgdmVyc2lvblxuICAgICAqIEBwYXJhbSByaHMgLSBUaGUgcmlnaHQgc2lkZSB2ZXJzaW9uXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb21wYXJlKGxoczogVmVyc2lvbiwgcmhzOiBWZXJzaW9uKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGxocy4kbWFqb3IgPT09IHJocy4kbWFqb3IgJiYgbGhzLiRtaW5vciA9PT0gcmhzLiRtaW5vciAmJiBsaHMuJHBhdGNoID09PSByaHMuJHBhdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gVmVyc2lvbi5FUVVBTDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaHMuJG1ham9yID09PSByaHMuJG1ham9yKSB7XG4gICAgICAgICAgICBpZiAobGhzLiRtaW5vciA9PT0gcmhzLiRtaW5vcikge1xuICAgICAgICAgICAgICAgIGlmIChsaHMuJHBhdGNoID09PSByaHMuJHBhdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3VsZG4ndCBoYXZlIHJlYWNoZWQgaGVyZS4uLiBhcyBpdCBzaG91bGQgaGF2ZSBiZWVuIGNhdWdodCBieSB0aGUgc2ltcGxlIHRlc3QgYWJvdmUgZmlyc3RcbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0IGZvciBjb25zaXN0ZW5jeSB3ZSB3aWxsIGtlZXAgaXQgaGVyZS5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZlcnNpb24uRVFVQUxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsaHMuJHBhdGNoID4gcmhzLiRwYXRjaCA/IFZlcnNpb24uR1JFQVRFUl9USEFOIDogVmVyc2lvbi5MRVNTX1RIQU47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxocy4kbWlub3IgPiByaHMuJG1pbm9yID8gVmVyc2lvbi5HUkVBVEVSX1RIQU4gOiBWZXJzaW9uLkxFU1NfVEhBTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBsaHMuJG1ham9yID4gcmhzLiRtYWpvciA/IFZlcnNpb24uR1JFQVRFUl9USEFOIDogVmVyc2lvbi5MRVNTX1RIQU47XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IElOYXRpdmVMb2dFbnRyeSB9IGZyb20gJy4uL0lGdXNlTG9nZ2VyJztcbmltcG9ydCB7RnVzZUxvZ2dlcn0gZnJvbSAnLi4vRnVzZUxvZ2dlcic7XG5pbXBvcnQge0Z1c2VMb2dnZXJMZXZlbH0gZnJvbSAnLi4vRnVzZUxvZ2dlckxldmVsJztcbmltcG9ydCB7IEZ1c2VDYWxsYmFja01hbmFnZXIgfSBmcm9tICcuLi9GdXNlQ2FsbGJhY2tNYW5hZ2VyJztcblxuZXhwb3J0IGNsYXNzIEFuZHJvaWRGdXNlTG9nZ2VyIGV4dGVuZHMgRnVzZUxvZ2dlciB7XG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF9sb2dUb05hdGl2ZShsZXZlbDogRnVzZUxvZ2dlckxldmVsLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LkJURnVzZU5hdGl2ZS5sb2cobGV2ZWwsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfcmVnaXN0ZXJOYXRpdmVDYWxibGFjaygpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LkJURnVzZU5hdGl2ZS5zZXRMb2dDYWxsYmFjayhGdXNlQ2FsbGJhY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQ2FsbGJhY2soKHBheWxvYWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IGVudHJ5OiBJTmF0aXZlTG9nRW50cnkgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBlbnRyeSA9IEpTT04ucGFyc2UocGF5bG9hZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX29uTmF0aXZlTG9nRW50cnkoZW50cnkpO1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge0hUVFBGdXNlQVBJfSBmcm9tICcuLi9IVFRQRnVzZUFQSSc7XG5cbi8qKlxuICogQSBGdXNlIEFQSSBpbXBsZW1lbnRhdGlvbiBmb3IgYW4gZW1iZWRkZWQgSFRUUCBzZXJ2ZXIgdG8gYnJpZGdlIHRoZSBKUyBhbmQgTmF0aXZlIEFQSSBjYWxscy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFuZHJvaWRTY2hlbWVGdXNlQVBJIGV4dGVuZHMgSFRUUEZ1c2VBUEkge1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBhc3luYyBfZ2V0RW5kcG9pbnQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGBodHRwczovL2xvY2FsaG9zdDoke3dpbmRvdy5CVEZ1c2VOYXRpdmUuZ2V0QVBJUG9ydCgpfWA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIF9pbml0SGVhZGVycyh4aHI6IFhNTEh0dHBSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUZ1c2UtU2VjcmV0Jywgd2luZG93LkJURnVzZU5hdGl2ZS5nZXRBUElTZWNyZXQoKSk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vLyBDb21tb24gQVBJXG5leHBvcnQge1BsYXRmb3JtfSBmcm9tICcuL1BsYXRmb3JtJztcbmV4cG9ydCB7UGxhdGZvcm1SZXNvbHZlcn0gZnJvbSAnLi9QbGF0Zm9ybVJlc29sdmVyJztcbmV4cG9ydCB7RnVzZUNvbnRleHR9IGZyb20gJy4vRnVzZUNvbnRleHQnO1xuZXhwb3J0IHtGdXNlQ29udGV4dEJ1aWxkZXJ9IGZyb20gJy4vRnVzZUNvbnRleHRCdWlsZGVyJztcbmV4cG9ydCB7VmVyc2lvbn0gZnJvbSAnLi9WZXJzaW9uJztcbmV4cG9ydCB7XG4gICAgRnVzZUFQSSxcbiAgICBURnVzZUFQSVJlc3BvbnNlRGF0YSxcbiAgICBJRnVzZUFQSUNhbGxQYWNrZXRcbn0gZnJvbSAnLi9GdXNlQVBJJztcbmV4cG9ydCB7RnVzZUNhbGxiYWNrTWFuYWdlciwgVEZ1c2VBUElDYWxsYmFja0hhbmRsZXJ9IGZyb20gJy4vRnVzZUNhbGxiYWNrTWFuYWdlcic7XG5leHBvcnQge0Z1c2VBUElSZXNwb25zZX0gZnJvbSAnLi9GdXNlQVBJUmVzcG9uc2UnO1xuZXhwb3J0IHtDb250ZW50VHlwZX0gZnJvbSAnLi9Db250ZW50VHlwZSc7XG5leHBvcnQge0Z1c2VSZXNwb25zZVJlYWRlcn0gZnJvbSAnLi9GdXNlUmVzcG9uc2VSZWFkZXInO1xuZXhwb3J0IHtGdXNlQVBJRmFjdG9yeX0gZnJvbSAnLi9GdXNlQVBJRmFjdG9yeSc7XG5leHBvcnQge0Fic3RyYWN0RnVzZUFQSUZhY3Rvcnl9IGZyb20gJy4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5leHBvcnQge1xuICAgIEZ1c2VSdW50aW1lLFxuICAgIFRQYXVzZUNhbGxiYWNrSGFuZGxlcixcbiAgICBUUmVzdW1lQ2FsbGJhY2tIYW5kbGVyLFxuICAgIElSdW50aW1lSW5mb1xufSBmcm9tICcuL3BsdWdpbnMvRnVzZVJ1bnRpbWUnO1xuZXhwb3J0IHtGdXNlUGx1Z2luLCBUQVBJQnJpZGdlRnVuY3Rpb259IGZyb20gJy4vRnVzZVBsdWdpbic7XG5leHBvcnQge0hUVFBGdXNlQVBJfSBmcm9tICcuL0hUVFBGdXNlQVBJJztcbmV4cG9ydCB7RnVzZUVycm9yfSBmcm9tICcuL0Z1c2VFcnJvcic7XG5cbi8vIFV0aWxpdGllc1xuZXhwb3J0IHtJU2VyaWFsaXphYmxlfSBmcm9tICcuL0lTZXJpYWxpemFibGUnO1xuZXhwb3J0IHtUU2VyaWFsaXphYmxlLCBURnVzZVNlcmlhbGl6YWJsZX0gZnJvbSAnLi9UU2VyaWFsaXphYmxlJztcbmV4cG9ydCB7RnVzZVNlcmlhbGl6ZXJ9IGZyb20gJy4vRnVzZVNlcmlhbGl6ZXInO1xuZXhwb3J0IHtJRnVzZVBlcm1pc3Npb25SZXF1ZXN0fSBmcm9tICcuL0lGdXNlUGVybWlzc2lvblJlcXVlc3QnO1xuZXhwb3J0IHtGdXNlUGVybWlzc2lvblN0YXRlfSBmcm9tICcuL0Z1c2VQZXJtaXNzaW9uU3RhdGUnO1xuZXhwb3J0IHtcbiAgICBGdXNlUGVybWlzc2lvblJlcXVlc3QsXG4gICAgVEZ1c2VBUElQZXJtaXNzaW9uUmVxdWVzdCxcbiAgICBURnVzZUp1c3RpZmljYXRpb25IYW5kbGVyLFxuICAgIFRGdXNlUGVybWlzc2lvblJlcXVlc3RBcmd1bWVudHNcbn0gZnJvbSAnLi9GdXNlUGVybWlzc2lvblJlcXVlc3QnO1xuZXhwb3J0IHtJRnVzZUdyYW50UmVzdWx0fSBmcm9tICcuL0lGdXNlR3JhbnRSZXN1bHQnO1xuZXhwb3J0IHtGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0fSBmcm9tICcuL0Z1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQnO1xuXG4vLyBMb2dnZXJcbmV4cG9ydCB7RnVzZUxvZ2dlckxldmVsfSBmcm9tICcuL0Z1c2VMb2dnZXJMZXZlbCc7XG5leHBvcnQge0lGdXNlTG9nZ2VyLCBJTmF0aXZlTG9nRW50cnl9IGZyb20gJy4vSUZ1c2VMb2dnZXInO1xuZXhwb3J0IHtGdXNlTG9nZ2VyLCBGdXNlTG9nZ2VyU2VyaWFsaXplcn0gZnJvbSAnLi9GdXNlTG9nZ2VyJztcbmV4cG9ydCB7QWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeX0gZnJvbSAnLi9BYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5JztcbmV4cG9ydCB7RnVzZUxvZ2dlckZhY3Rvcnl9IGZyb20gJy4vRnVzZUxvZ2dlckZhY3RvcnknO1xuXG4vLyBpT1MgU3BlY2lmaWMgQVBJcyAvIEltcGxlbWVudGF0aW9uc1xuZXhwb3J0IHtJT1NTY2hlbWVGdXNlQVBJfSBmcm9tICcuL2lvcy9JT1NTY2hlbWVGdXNlQVBJJztcbmV4cG9ydCB7SU9TRnVzZUxvZ2dlcn0gZnJvbSAnLi9pb3MvSU9TRnVzZUxvZ2dlcic7XG5cbi8vIEFuZHJvaWQgU3BlY2lmaWMgQVBJcyAvIEltcGxlbWVudGF0aW9uc1xuZXhwb3J0IHtBbmRyb2lkU2NoZW1lRnVzZUFQSX0gZnJvbSAnLi9hbmRyb2lkL0FuZHJvaWRTY2hlbWVGdXNlQVBJJztcbmV4cG9ydCB7QW5kcm9pZEZ1c2VMb2dnZXJ9IGZyb20gJy4vYW5kcm9pZC9BbmRyb2lkRnVzZUxvZ2dlcic7XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IElOYXRpdmVMb2dFbnRyeSB9IGZyb20gJy4uL0lGdXNlTG9nZ2VyJztcbmltcG9ydCB7IEZ1c2VMb2dnZXIgfSBmcm9tIFwiLi4vRnVzZUxvZ2dlclwiO1xuaW1wb3J0IHsgRnVzZUxvZ2dlckxldmVsIH0gZnJvbSBcIi4uL0Z1c2VMb2dnZXJMZXZlbFwiO1xuaW1wb3J0IHsgRnVzZUNhbGxiYWNrTWFuYWdlciB9IGZyb20gJy4uL0Z1c2VDYWxsYmFja01hbmFnZXInO1xuXG5leHBvcnQgY2xhc3MgSU9TRnVzZUxvZ2dlciBleHRlbmRzIEZ1c2VMb2dnZXIge1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfbG9nVG9OYXRpdmUobGV2ZWw6IEZ1c2VMb2dnZXJMZXZlbCwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLmxvZy5wb3N0TWVzc2FnZShbbGV2ZWwsIG1lc3NhZ2VdKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX3JlZ2lzdGVyTmF0aXZlQ2FsYmxhY2soKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLnNldExvZ0NhbGxiYWNrLnBvc3RNZXNzYWdlKEZ1c2VDYWxsYmFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVDYWxsYmFjaygocGF5bG9hZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW50cnk6IElOYXRpdmVMb2dFbnRyeSA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGVudHJ5ID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fb25OYXRpdmVMb2dFbnRyeShlbnRyeSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7SFRUUEZ1c2VBUEl9IGZyb20gJy4uL0hUVFBGdXNlQVBJJztcblxuLyoqXG4gKiBBIEZ1c2UgQVBJIGltcGxlbWVudGF0aW9uIGZvciBpT1MgdGhhdCB1c2VzIFdLVVJMU2NoZW1lSGFuZGxlciB0byBicmlkZ2UgdGhlIEpTIGFuZCBOYXRpdmUgQVBJIGNhbGxzLlxuICovXG5leHBvcnQgY2xhc3MgSU9TU2NoZW1lRnVzZUFQSSBleHRlbmRzIEhUVFBGdXNlQVBJIHtcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX2dldEVuZHBvaW50KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBgaHR0cHM6Ly9sb2NhbGhvc3Q6JHthd2FpdCB3aW5kb3cud2Via2l0Lm1lc3NhZ2VIYW5kbGVycy5nZXRBUElQb3J0LnBvc3RNZXNzYWdlKFwiXCIpfWA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIF9pbml0SGVhZGVycyh4aHI6IFhNTEh0dHBSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUZ1c2UtU2VjcmV0JywgYXdhaXQgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuZ2V0QVBJU2VjcmV0LnBvc3RNZXNzYWdlKFwiXCIpKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IENvbnRlbnRUeXBlIH0gZnJvbSAnLi4vQ29udGVudFR5cGUnO1xuaW1wb3J0IHsgRnVzZUNvbnRleHQgfSBmcm9tICcuLi9GdXNlQ29udGV4dCc7XG5pbXBvcnQge0Z1c2VQbHVnaW59IGZyb20gJy4uL0Z1c2VQbHVnaW4nO1xuaW1wb3J0IHtGdXNlQVBJUmVzcG9uc2V9IGZyb20gJy4uL0Z1c2VBUElSZXNwb25zZSc7XG5cbmV4cG9ydCB0eXBlIFRQYXVzZUNhbGxiYWNrSGFuZGxlciA9ICgpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBUUmVzdW1lQ2FsbGJhY2tIYW5kbGVyID0gKCkgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBJUnVudGltZUluZm8ge1xuICAgIHZlcnNpb246IHN0cmluZztcbiAgICBkZWJ1Z01vZGU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBGdXNlUnVudGltZSBleHRlbmRzIEZ1c2VQbHVnaW4ge1xuICAgIHByaXZhdGUgJGNhbGxiYWNrSURzOiBzdHJpbmdbXTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBGdXNlQ29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy4kY2FsbGJhY2tJRHMgPSBbXTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2dldElEKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnRnVzZVJ1bnRpbWUnO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgYXN5bmMgZ2V0SW5mbygpOiBQcm9taXNlPElSdW50aW1lSW5mbz4ge1xuICAgICAgICBjb25zdCBkYXRhOiBGdXNlQVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9leGVjKCcvaW5mbycpO1xuICAgICAgICByZXR1cm4gYXdhaXQgZGF0YS5yZWFkQXNKU09OKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNiOiBUUGF1c2VDYWxsYmFja0hhbmRsZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjYklEOiBzdHJpbmcgPSB0aGlzLl9jcmVhdGVDYWxsYmFjaygocGF5bG9hZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB0aGlzLl9leGVjKCcvcmVnaXN0ZXJQYXVzZUhhbmRsZXInLCBDb250ZW50VHlwZS5URVhULCBjYklEKTtcbiAgICAgICAgdGhpcy4kY2FsbGJhY2tJRHMucHVzaChjYklEKTtcblxuICAgICAgICByZXR1cm4gY2JJRDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdW5yZWdpc3RlclBhdXNlSGFuZGxlcihjYWxsYmFja0lEOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3VucmVnaXN0ZXJQYXVzZUhhbmRsZXInLCBDb250ZW50VHlwZS5URVhULCBjYWxsYmFja0lEKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXJSZXN1bWVIYW5kbGVyKGNiOiBUUmVzdW1lQ2FsbGJhY2tIYW5kbGVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgY2JJRDogc3RyaW5nID0gdGhpcy5fY3JlYXRlQ2FsbGJhY2soKHBheWxvYWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3JlZ2lzdGVyUmVzdW1lSGFuZGxlcicsIENvbnRlbnRUeXBlLlRFWFQsIGNiSUQpO1xuICAgICAgICB0aGlzLiRjYWxsYmFja0lEcy5wdXNoKGNiSUQpO1xuXG4gICAgICAgIHJldHVybiBjYklEO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1bnJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYWxsYmFja0lEOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3VucmVnaXN0ZXJSZXN1bWVIYW5kbGVyJywgQ29udGVudFR5cGUuVEVYVCwgY2FsbGJhY2tJRCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWsgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtcbiAgICBGdXNlUGx1Z2luLFxuICAgIENvbnRlbnRUeXBlLFxuICAgIEZ1c2VBUElSZXNwb25zZVxufSBmcm9tICdAYnRmdXNlL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgRWNob1BsdWdpbiBleHRlbmRzIEZ1c2VQbHVnaW4ge1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfZ2V0SUQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdlY2hvJztcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZWNobyhtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBsZXQgcjogRnVzZUFQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZXhlYygnL2VjaG8nLCBDb250ZW50VHlwZS5URVhULCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHIucmVhZEFzVGV4dCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBzdWJzY3JpYmUoY2I6IChkYXRhOiBzdHJpbmcpID0+IHZvaWQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBsZXQgY2FsbGJhY2tJRDogc3RyaW5nID0gdGhpcy5fY3JlYXRlQ2FsbGJhY2soKHBheWxvYWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY2IocGF5bG9hZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuX2V4ZWMoJy9zdWJzY3JpYmUnLCBDb250ZW50VHlwZS5URVhULCBjYWxsYmFja0lEKTtcblxuICAgICAgICByZXR1cm4gY2FsbGJhY2tJRDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgYmlnUmVzcG9uc2UoKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgICAgICBsZXQgcjogRnVzZUFQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZXhlYygnL2JpZycpO1xuICAgICAgICByZXR1cm4gYXdhaXQgci5yZWFkQXNBcnJheUJ1ZmZlcigpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTUFYXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9tYXguZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOSUxcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX25pbC5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInBhcnNlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9wYXJzZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0cmluZ2lmeVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjFcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2MVRvVjZcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YxVG9WLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YyLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjRcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YzLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3Y0LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjZcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3Y1LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjZUb1YxXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92NlRvVi5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInY3XCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92Ni5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZhbGlkYXRlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92YWxpZGF0ZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZlcnNpb25cIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3ZlcnNpb24uZGVmYXVsdDtcbiAgfVxufSk7XG52YXIgX21heCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbWF4LmpzXCIpKTtcbnZhciBfbmlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9uaWwuanNcIikpO1xudmFyIF9wYXJzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcGFyc2UuanNcIikpO1xudmFyIF9zdHJpbmdpZnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKSk7XG52YXIgX3YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YxLmpzXCIpKTtcbnZhciBfdjFUb1YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YxVG9WNi5qc1wiKSk7XG52YXIgX3YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92My5qc1wiKSk7XG52YXIgX3YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NC5qc1wiKSk7XG52YXIgX3Y0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NS5qc1wiKSk7XG52YXIgX3Y1ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92Ni5qc1wiKSk7XG52YXIgX3Y2VG9WID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NlRvVjEuanNcIikpO1xudmFyIF92NiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjcuanNcIikpO1xudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xudmFyIF92ZXJzaW9uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92ZXJzaW9uLmpzXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9ICdmZmZmZmZmZi1mZmZmLWZmZmYtZmZmZi1mZmZmZmZmZmZmZmYnOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuLypcbiAqIEJyb3dzZXItY29tcGF0aWJsZSBKYXZhU2NyaXB0IE1ENVxuICpcbiAqIE1vZGlmaWNhdGlvbiBvZiBKYXZhU2NyaXB0IE1ENVxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvSmF2YVNjcmlwdC1NRDVcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSwgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQmFzZWQgb25cbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXG4gKiBWZXJzaW9uIDIuMiBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDlcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIG1vcmUgaW5mby5cbiAqL1xuZnVuY3Rpb24gbWQ1KGJ5dGVzKSB7XG4gIGlmICh0eXBlb2YgYnl0ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShtc2cubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXNbaV0gPSBtc2cuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1kNVRvSGV4RW5jb2RlZEFycmF5KHdvcmRzVG9NZDUoYnl0ZXNUb1dvcmRzKGJ5dGVzKSwgYnl0ZXMubGVuZ3RoICogOCkpO1xufVxuXG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGFuIGFycmF5IG9mIGJ5dGVzXG4gKi9cbmZ1bmN0aW9uIG1kNVRvSGV4RW5jb2RlZEFycmF5KGlucHV0KSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgdmFyIGxlbmd0aDMyID0gaW5wdXQubGVuZ3RoICogMzI7XG4gIHZhciBoZXhUYWIgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoMzI7IGkgKz0gOCkge1xuICAgIHZhciB4ID0gaW5wdXRbaSA+PiA1XSA+Pj4gaSAlIDMyICYgMHhmZjtcbiAgICB2YXIgaGV4ID0gcGFyc2VJbnQoaGV4VGFiLmNoYXJBdCh4ID4+PiA0ICYgMHgwZikgKyBoZXhUYWIuY2hhckF0KHggJiAweDBmKSwgMTYpO1xuICAgIG91dHB1dC5wdXNoKGhleCk7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgb3V0cHV0IGxlbmd0aCB3aXRoIHBhZGRpbmcgYW5kIGJpdCBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gZ2V0T3V0cHV0TGVuZ3RoKGlucHV0TGVuZ3RoOCkge1xuICByZXR1cm4gKGlucHV0TGVuZ3RoOCArIDY0ID4+PiA5IDw8IDQpICsgMTQgKyAxO1xufVxuXG4vKlxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAqL1xuZnVuY3Rpb24gd29yZHNUb01kNSh4LCBsZW4pIHtcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCBsZW4gJSAzMjtcbiAgeFtnZXRPdXRwdXRMZW5ndGgobGVuKSAtIDFdID0gbGVuO1xuICB2YXIgYSA9IDE3MzI1ODQxOTM7XG4gIHZhciBiID0gLTI3MTczMzg3OTtcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcbiAgdmFyIGQgPSAyNzE3MzM4Nzg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICB2YXIgb2xkYSA9IGE7XG4gICAgdmFyIG9sZGIgPSBiO1xuICAgIHZhciBvbGRjID0gYztcbiAgICB2YXIgb2xkZCA9IGQ7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaV0sIDcsIC02ODA4NzY5MzYpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTcsIDYwNjEwNTgxOSk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNywgLTE3NjQxODg5Nyk7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDVdLCAxMiwgMTIwMDA4MDQyNik7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA3LCAxNzcwMDM1NDE2KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA3LCAxODA0NjAzNjgyKTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAxMjM2NTM1MzI5KTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyA2XSwgOSwgLTEwNjk1MDE2MzIpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCA2NDM3MTc3MTMpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMik7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA1LCAtNzAxNTU4NjkxKTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCA5LCAzODAxNjA4Myk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNSwgNTY4NDQ2NDM4KTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MCk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDhdLCAyMCwgMTE2MzUzMTUwMSk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAyXSwgOSwgLTUxNDAzNzg0KTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgN10sIDE0LCAxNzM1MzI4NDczKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNCwgLTM3ODU1OCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE2LCAxODM5MDMwNTYyKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMV0sIDQsIC0xNTMwOTkyMDYwKTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgNF0sIDExLCAxMjcyODkzMzUzKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgN10sIDE2LCAtMTU1NDk3NjMyKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDQsIDY4MTI3OTE3NCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaV0sIDExLCAtMzU4NTM3MjIyKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgM10sIDE2LCAtNzIyNTIxOTc5KTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgNl0sIDIzLCA3NjAyOTE4OSk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDldLCA0LCAtNjQwMzY0NDg3KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTYsIDUzMDc0MjUyMCk7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDJdLCAyMywgLTk5NTMzODY1MSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaV0sIDYsIC0xOTg2MzA4NDQpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyA3XSwgMTAsIDExMjY4OTE0MTUpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDVdLCAyMSwgLTU3NDM0MDU1KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA2LCAxNzAwNDg1NTcxKTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgM10sIDEwLCAtMTg5NDk4NjYwNik7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA2LCAxODczMzEzMzU5KTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDEzXSwgMjEsIDEzMDkxNTE2NDkpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNiwgLTE0NTUyMzA3MCk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE1LCA3MTg3ODcyNTkpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xuICAgIGEgPSBzYWZlQWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlQWRkKGIsIG9sZGIpO1xuICAgIGMgPSBzYWZlQWRkKGMsIG9sZGMpO1xuICAgIGQgPSBzYWZlQWRkKGQsIG9sZGQpO1xuICB9XG4gIHJldHVybiBbYSwgYiwgYywgZF07XG59XG5cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IGJ5dGVzIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcbiAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICovXG5mdW5jdGlvbiBieXRlc1RvV29yZHMoaW5wdXQpIHtcbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICB2YXIgbGVuZ3RoOCA9IGlucHV0Lmxlbmd0aCAqIDg7XG4gIHZhciBvdXRwdXQgPSBuZXcgVWludDMyQXJyYXkoZ2V0T3V0cHV0TGVuZ3RoKGxlbmd0aDgpKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg4OyBpICs9IDgpIHtcbiAgICBvdXRwdXRbaSA+PiA1XSB8PSAoaW5wdXRbaSAvIDhdICYgMHhmZikgPDwgaSAlIDMyO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbi8qXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICovXG5mdW5jdGlvbiBzYWZlQWRkKHgsIHkpIHtcbiAgdmFyIGxzdyA9ICh4ICYgMHhmZmZmKSArICh5ICYgMHhmZmZmKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gbXN3IDw8IDE2IHwgbHN3ICYgMHhmZmZmO1xufVxuXG4vKlxuICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICovXG5mdW5jdGlvbiBiaXRSb3RhdGVMZWZ0KG51bSwgY250KSB7XG4gIHJldHVybiBudW0gPDwgY250IHwgbnVtID4+PiAzMiAtIGNudDtcbn1cblxuLypcbiAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gKi9cbmZ1bmN0aW9uIG1kNWNtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gIHJldHVybiBzYWZlQWRkKGJpdFJvdGF0ZUxlZnQoc2FmZUFkZChzYWZlQWRkKGEsIHEpLCBzYWZlQWRkKHgsIHQpKSwgcyksIGIpO1xufVxuZnVuY3Rpb24gbWQ1ZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBjIHwgfmIgJiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cbmZ1bmN0aW9uIG1kNWdnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgZCB8IGMgJiB+ZCwgYSwgYiwgeCwgcywgdCk7XG59XG5mdW5jdGlvbiBtZDVoaChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cbmZ1bmN0aW9uIG1kNWlpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gbWQ1OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSB7XG4gIHJhbmRvbVVVSURcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSAnMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwJzsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbmZ1bmN0aW9uIHBhcnNlKHV1aWQpIHtcbiAgaWYgKCEoMCwgX3ZhbGlkYXRlLmRlZmF1bHQpKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuICB2YXIgdjtcbiAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDE2KTtcblxuICAvLyBQYXJzZSAjIyMjIyMjIy0uLi4uLS4uLi4tLi4uLi0uLi4uLi4uLi4uLi5cbiAgYXJyWzBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDAsIDgpLCAxNikpID4+PiAyNDtcbiAgYXJyWzFdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMl0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzNdID0gdiAmIDB4ZmY7XG5cbiAgLy8gUGFyc2UgLi4uLi4uLi4tIyMjIy0uLi4uLS4uLi4tLi4uLi4uLi4uLi4uXG4gIGFycls0XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSg5LCAxMyksIDE2KSkgPj4+IDg7XG4gIGFycls1XSA9IHYgJiAweGZmO1xuXG4gIC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tIyMjIy0uLi4uLS4uLi4uLi4uLi4uLlxuICBhcnJbNl0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE4KSwgMTYpKSA+Pj4gODtcbiAgYXJyWzddID0gdiAmIDB4ZmY7XG5cbiAgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0uLi4uLSMjIyMtLi4uLi4uLi4uLi4uXG4gIGFycls4XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxOSwgMjMpLCAxNikpID4+PiA4O1xuICBhcnJbOV0gPSB2ICYgMHhmZjtcblxuICAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLS4uLi4tLi4uLi0jIyMjIyMjIyMjIyNcbiAgLy8gKFVzZSBcIi9cIiB0byBhdm9pZCAzMi1iaXQgdHJ1bmNhdGlvbiB3aGVuIGJpdC1zaGlmdGluZyBoaWdoLW9yZGVyIGJ5dGVzKVxuICBhcnJbMTBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDI0LCAzNiksIDE2KSkgLyAweDEwMDAwMDAwMDAwICYgMHhmZjtcbiAgYXJyWzExXSA9IHYgLyAweDEwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMl0gPSB2ID4+PiAyNCAmIDB4ZmY7XG4gIGFyclsxM10gPSB2ID4+PiAxNiAmIDB4ZmY7XG4gIGFyclsxNF0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzE1XSA9IHYgJiAweGZmO1xuICByZXR1cm4gYXJyO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gcGFyc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLThdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMHxmZmZmZmZmZi1mZmZmLWZmZmYtZmZmZi1mZmZmZmZmZmZmZmYpJC9pOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gcm5nO1xuLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5cbnZhciBnZXRSYW5kb21WYWx1ZXM7XG52YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5mdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuLy8gQWRhcHRlZCBmcm9tIENocmlzIFZlbmVzcycgU0hBMSBjb2RlIGF0XG4vLyBodHRwOi8vd3d3Lm1vdmFibGUtdHlwZS5jby51ay9zY3JpcHRzL3NoYTEuaHRtbFxuZnVuY3Rpb24gZihzLCB4LCB5LCB6KSB7XG4gIHN3aXRjaCAocykge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiB4ICYgeSBeIH54ICYgejtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4ICYgeSBeIHggJiB6IF4geSAmIHo7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIHggXiB5IF4gejtcbiAgfVxufVxuZnVuY3Rpb24gUk9UTCh4LCBuKSB7XG4gIHJldHVybiB4IDw8IG4gfCB4ID4+PiAzMiAtIG47XG59XG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gIHZhciBLID0gWzB4NWE4Mjc5OTksIDB4NmVkOWViYTEsIDB4OGYxYmJjZGMsIDB4Y2E2MmMxZDZdO1xuICB2YXIgSCA9IFsweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLCAweDEwMzI1NDc2LCAweGMzZDJlMWYwXTtcbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgbXNnID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGJ5dGVzKSk7IC8vIFVURjggZXNjYXBlXG5cbiAgICBieXRlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlcy5wdXNoKG1zZy5jaGFyQ29kZUF0KGkpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoYnl0ZXMpKSB7XG4gICAgLy8gQ29udmVydCBBcnJheS1saWtlIHRvIEFycmF5XG4gICAgYnl0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChieXRlcyk7XG4gIH1cbiAgYnl0ZXMucHVzaCgweDgwKTtcbiAgdmFyIGwgPSBieXRlcy5sZW5ndGggLyA0ICsgMjtcbiAgdmFyIE4gPSBNYXRoLmNlaWwobCAvIDE2KTtcbiAgdmFyIE0gPSBuZXcgQXJyYXkoTik7XG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBOOyArK19pKSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50MzJBcnJheSgxNik7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICBhcnJbal0gPSBieXRlc1tfaSAqIDY0ICsgaiAqIDRdIDw8IDI0IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgMV0gPDwgMTYgfCBieXRlc1tfaSAqIDY0ICsgaiAqIDQgKyAyXSA8PCA4IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgM107XG4gICAgfVxuICAgIE1bX2ldID0gYXJyO1xuICB9XG4gIE1bTiAtIDFdWzE0XSA9IChieXRlcy5sZW5ndGggLSAxKSAqIDggLyBNYXRoLnBvdygyLCAzMik7XG4gIE1bTiAtIDFdWzE0XSA9IE1hdGguZmxvb3IoTVtOIC0gMV1bMTRdKTtcbiAgTVtOIC0gMV1bMTVdID0gKGJ5dGVzLmxlbmd0aCAtIDEpICogOCAmIDB4ZmZmZmZmZmY7XG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IE47ICsrX2kyKSB7XG4gICAgdmFyIFcgPSBuZXcgVWludDMyQXJyYXkoODApO1xuICAgIGZvciAodmFyIHQgPSAwOyB0IDwgMTY7ICsrdCkge1xuICAgICAgV1t0XSA9IE1bX2kyXVt0XTtcbiAgICB9XG4gICAgZm9yICh2YXIgX3QgPSAxNjsgX3QgPCA4MDsgKytfdCkge1xuICAgICAgV1tfdF0gPSBST1RMKFdbX3QgLSAzXSBeIFdbX3QgLSA4XSBeIFdbX3QgLSAxNF0gXiBXW190IC0gMTZdLCAxKTtcbiAgICB9XG4gICAgdmFyIGEgPSBIWzBdO1xuICAgIHZhciBiID0gSFsxXTtcbiAgICB2YXIgYyA9IEhbMl07XG4gICAgdmFyIGQgPSBIWzNdO1xuICAgIHZhciBlID0gSFs0XTtcbiAgICBmb3IgKHZhciBfdDIgPSAwOyBfdDIgPCA4MDsgKytfdDIpIHtcbiAgICAgIHZhciBzID0gTWF0aC5mbG9vcihfdDIgLyAyMCk7XG4gICAgICB2YXIgVCA9IFJPVEwoYSwgNSkgKyBmKHMsIGIsIGMsIGQpICsgZSArIEtbc10gKyBXW190Ml0gPj4+IDA7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IFJPVEwoYiwgMzApID4+PiAwO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gVDtcbiAgICB9XG4gICAgSFswXSA9IEhbMF0gKyBhID4+PiAwO1xuICAgIEhbMV0gPSBIWzFdICsgYiA+Pj4gMDtcbiAgICBIWzJdID0gSFsyXSArIGMgPj4+IDA7XG4gICAgSFszXSA9IEhbM10gKyBkID4+PiAwO1xuICAgIEhbNF0gPSBIWzRdICsgZSA+Pj4gMDtcbiAgfVxuICByZXR1cm4gW0hbMF0gPj4gMjQgJiAweGZmLCBIWzBdID4+IDE2ICYgMHhmZiwgSFswXSA+PiA4ICYgMHhmZiwgSFswXSAmIDB4ZmYsIEhbMV0gPj4gMjQgJiAweGZmLCBIWzFdID4+IDE2ICYgMHhmZiwgSFsxXSA+PiA4ICYgMHhmZiwgSFsxXSAmIDB4ZmYsIEhbMl0gPj4gMjQgJiAweGZmLCBIWzJdID4+IDE2ICYgMHhmZiwgSFsyXSA+PiA4ICYgMHhmZiwgSFsyXSAmIDB4ZmYsIEhbM10gPj4gMjQgJiAweGZmLCBIWzNdID4+IDE2ICYgMHhmZiwgSFszXSA+PiA4ICYgMHhmZiwgSFszXSAmIDB4ZmYsIEhbNF0gPj4gMjQgJiAweGZmLCBIWzRdID4+IDE2ICYgMHhmZiwgSFs0XSA+PiA4ICYgMHhmZiwgSFs0XSAmIDB4ZmZdO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gc2hhMTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbmV4cG9ydHMudW5zYWZlU3RyaW5naWZ5ID0gdW5zYWZlU3RyaW5naWZ5O1xudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5mdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICAvL1xuICAvLyBOb3RlIHRvIGZ1dHVyZS1zZWxmOiBObywgeW91IGNhbid0IHJlbW92ZSB0aGUgYHRvTG93ZXJDYXNlKClgIGNhbGwuXG4gIC8vIFJFRjogaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNjc3I2lzc3VlY29tbWVudC0xNzU3MzUxMzUxXG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIHZhciB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTtcbiAgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuICBpZiAoISgwLCBfdmFsaWRhdGUuZGVmYXVsdCkodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG4gIHJldHVybiB1dWlkO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gc3RyaW5naWZ5OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9ybmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JuZy5qc1wiKSk7XG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG52YXIgX2Nsb2Nrc2VxO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBuZXcgQXJyYXkoMTYpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGU7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXE7XG5cbiAgLy8gdjEgb25seTogVXNlIGNhY2hlZCBgbm9kZWAgYW5kIGBjbG9ja3NlcWAgdmFsdWVzXG4gIGlmICghb3B0aW9ucy5fdjYpIHtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIG5vZGUgPSBfbm9kZUlkO1xuICAgIH1cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXE7XG4gICAgfVxuICB9XG5cbiAgLy8gSGFuZGxlIGNhc2VzIHdoZXJlIHdlIG5lZWQgZW50cm9weS4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3Vlc1xuICAvLyByZWxhdGVkIHRvIGluc3VmZmljaWVudCBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gICAgLy8gUmFuZG9taXplIG5vZGVcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICBub2RlID0gW3NlZWRCeXRlc1swXSwgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1dO1xuXG4gICAgICAvLyB2MSBvbmx5OiBjYWNoZSBub2RlIHZhbHVlIGZvciByZXVzZVxuICAgICAgaWYgKCFfbm9kZUlkICYmICFvcHRpb25zLl92Nikge1xuICAgICAgICAvLyBwZXIgUkZDNDEyMiA0LjU6IFNldCBNQUMgbXVsdGljYXN0IGJpdCAodjEgb25seSlcbiAgICAgICAgbm9kZVswXSB8PSAweDAxOyAvLyBTZXQgbXVsdGljYXN0IGJpdFxuXG4gICAgICAgIF9ub2RlSWQgPSBub2RlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJhbmRvbWl6ZSBjbG9ja3NlcVxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgICAgaWYgKF9jbG9ja3NlcSA9PT0gdW5kZWZpbmVkICYmICFvcHRpb25zLl92Nikge1xuICAgICAgICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyB2MSAmIHY2IHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzbyB0aW1lIGlzXG4gIC8vIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IERhdGUubm93KCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSBtc2VjcyAtIF9sYXN0TVNlY3MgKyAobnNlY3MgLSBfbGFzdE5TZWNzKSAvIDEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInV1aWQudjEoKTogQ2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjXCIpO1xuICB9XG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cbiAgcmV0dXJuIGJ1ZiB8fCAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKGIpO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gdjE7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2MVRvVjY7XG52YXIgX3BhcnNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9wYXJzZS5qc1wiKSk7XG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbi8qKlxuICogQ29udmVydCBhIHYxIFVVSUQgdG8gYSB2NiBVVUlEXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8VWludDhBcnJheX0gdXVpZCAtIFRoZSB2MSBVVUlEIHRvIGNvbnZlcnQgdG8gdjZcbiAqIEByZXR1cm5zIHtzdHJpbmd8VWludDhBcnJheX0gVGhlIHY2IFVVSUQgYXMgdGhlIHNhbWUgdHlwZSBhcyB0aGUgYHV1aWRgIGFyZ1xuICogKHN0cmluZyBvciBVaW50OEFycmF5KVxuICovXG5mdW5jdGlvbiB2MVRvVjYodXVpZCkge1xuICB2YXIgdjFCeXRlcyA9IHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyA/ICgwLCBfcGFyc2UuZGVmYXVsdCkodXVpZCkgOiB1dWlkO1xuICB2YXIgdjZCeXRlcyA9IF92MVRvVjYodjFCeXRlcyk7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgPyAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKHY2Qnl0ZXMpIDogdjZCeXRlcztcbn1cblxuLy8gRG8gdGhlIGZpZWxkIHRyYW5zZm9ybWF0aW9uIG5lZWRlZCBmb3IgdjEgLT4gdjZcbmZ1bmN0aW9uIF92MVRvVjYodjFCeXRlcywgcmFuZG9taXplID0gZmFsc2UpIHtcbiAgcmV0dXJuIFVpbnQ4QXJyYXkub2YoKHYxQnl0ZXNbNl0gJiAweDBmKSA8PCA0IHwgdjFCeXRlc1s3XSA+PiA0ICYgMHgwZiwgKHYxQnl0ZXNbN10gJiAweDBmKSA8PCA0IHwgKHYxQnl0ZXNbNF0gJiAweGYwKSA+PiA0LCAodjFCeXRlc1s0XSAmIDB4MGYpIDw8IDQgfCAodjFCeXRlc1s1XSAmIDB4ZjApID4+IDQsICh2MUJ5dGVzWzVdICYgMHgwZikgPDwgNCB8ICh2MUJ5dGVzWzBdICYgMHhmMCkgPj4gNCwgKHYxQnl0ZXNbMF0gJiAweDBmKSA8PCA0IHwgKHYxQnl0ZXNbMV0gJiAweGYwKSA+PiA0LCAodjFCeXRlc1sxXSAmIDB4MGYpIDw8IDQgfCAodjFCeXRlc1syXSAmIDB4ZjApID4+IDQsIDB4NjAgfCB2MUJ5dGVzWzJdICYgMHgwZiwgdjFCeXRlc1szXSwgdjFCeXRlc1s4XSwgdjFCeXRlc1s5XSwgdjFCeXRlc1sxMF0sIHYxQnl0ZXNbMTFdLCB2MUJ5dGVzWzEyXSwgdjFCeXRlc1sxM10sIHYxQnl0ZXNbMTRdLCB2MUJ5dGVzWzE1XSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YzNS5qc1wiKSk7XG52YXIgX21kID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9tZDUuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxudmFyIHYzID0gKDAsIF92LmRlZmF1bHQpKCd2MycsIDB4MzAsIF9tZC5kZWZhdWx0KTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHYzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5VUkwgPSBleHBvcnRzLkROUyA9IHZvaWQgMDtcbmV4cG9ydHMuZGVmYXVsdCA9IHYzNTtcbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xudmFyIF9wYXJzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcGFyc2UuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuZnVuY3Rpb24gc3RyaW5nVG9CeXRlcyhzdHIpIHtcbiAgc3RyID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpOyAvLyBVVEY4IGVzY2FwZVxuXG4gIHZhciBieXRlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGJ5dGVzLnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpO1xuICB9XG4gIHJldHVybiBieXRlcztcbn1cbnZhciBETlMgPSBleHBvcnRzLkROUyA9ICc2YmE3YjgxMC05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xudmFyIFVSTCA9IGV4cG9ydHMuVVJMID0gJzZiYTdiODExLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5mdW5jdGlvbiB2MzUobmFtZSwgdmVyc2lvbiwgaGFzaGZ1bmMpIHtcbiAgZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKHZhbHVlLCBuYW1lc3BhY2UsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIF9uYW1lc3BhY2U7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gc3RyaW5nVG9CeXRlcyh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgbmFtZXNwYWNlID0gKDAsIF9wYXJzZS5kZWZhdWx0KShuYW1lc3BhY2UpO1xuICAgIH1cbiAgICBpZiAoKChfbmFtZXNwYWNlID0gbmFtZXNwYWNlKSA9PT0gbnVsbCB8fCBfbmFtZXNwYWNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbmFtZXNwYWNlLmxlbmd0aCkgIT09IDE2KSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ05hbWVzcGFjZSBtdXN0IGJlIGFycmF5LWxpa2UgKDE2IGl0ZXJhYmxlIGludGVnZXIgdmFsdWVzLCAwLTI1NSknKTtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlIGhhc2ggb2YgbmFtZXNwYWNlIGFuZCB2YWx1ZSwgUGVyIDQuM1xuICAgIC8vIEZ1dHVyZTogVXNlIHNwcmVhZCBzeW50YXggd2hlbiBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3JtcywgZS5nLiBgYnl0ZXMgPVxuICAgIC8vIGhhc2hmdW5jKFsuLi5uYW1lc3BhY2UsIC4uLiB2YWx1ZV0pYFxuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KDE2ICsgdmFsdWUubGVuZ3RoKTtcbiAgICBieXRlcy5zZXQobmFtZXNwYWNlKTtcbiAgICBieXRlcy5zZXQodmFsdWUsIG5hbWVzcGFjZS5sZW5ndGgpO1xuICAgIGJ5dGVzID0gaGFzaGZ1bmMoYnl0ZXMpO1xuICAgIGJ5dGVzWzZdID0gYnl0ZXNbNl0gJiAweDBmIHwgdmVyc2lvbjtcbiAgICBieXRlc1s4XSA9IGJ5dGVzWzhdICYgMHgzZiB8IDB4ODA7XG4gICAgaWYgKGJ1Zikge1xuICAgICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgYnVmW29mZnNldCArIGldID0gYnl0ZXNbaV07XG4gICAgICB9XG4gICAgICByZXR1cm4gYnVmO1xuICAgIH1cbiAgICByZXR1cm4gKDAsIF9zdHJpbmdpZnkudW5zYWZlU3RyaW5naWZ5KShieXRlcyk7XG4gIH1cblxuICAvLyBGdW5jdGlvbiNuYW1lIGlzIG5vdCBzZXR0YWJsZSBvbiBzb21lIHBsYXRmb3JtcyAoIzI3MClcbiAgdHJ5IHtcbiAgICBnZW5lcmF0ZVVVSUQubmFtZSA9IG5hbWU7XG4gIH0gY2F0Y2ggKGVycikge31cblxuICAvLyBGb3IgQ29tbW9uSlMgZGVmYXVsdCBleHBvcnQgc3VwcG9ydFxuICBnZW5lcmF0ZVVVSUQuRE5TID0gRE5TO1xuICBnZW5lcmF0ZVVVSUQuVVJMID0gVVJMO1xuICByZXR1cm4gZ2VuZXJhdGVVVUlEO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9uYXRpdmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL25hdGl2ZS5qc1wiKSk7XG52YXIgX3JuZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcm5nLmpzXCIpKTtcbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKF9uYXRpdmUuZGVmYXVsdC5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gX25hdGl2ZS5kZWZhdWx0LnJhbmRvbVVVSUQoKTtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuICByZXR1cm4gKDAsIF9zdHJpbmdpZnkudW5zYWZlU3RyaW5naWZ5KShybmRzKTtcbn1cbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHY0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MzUuanNcIikpO1xudmFyIF9zaGEgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3NoYTEuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxudmFyIHY1ID0gKDAsIF92LmRlZmF1bHQpKCd2NScsIDB4NTAsIF9zaGEuZGVmYXVsdCk7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSB2NTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHY2O1xudmFyIF9zdHJpbmdpZnkgPSByZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIik7XG52YXIgX3YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YxLmpzXCIpKTtcbnZhciBfdjFUb1YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YxVG9WNi5qc1wiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgZGVmYXVsdDogZSB9OyB9XG5mdW5jdGlvbiBvd25LZXlzKGUsIHIpIHsgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpOyByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgcikuZW51bWVyYWJsZTsgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7IH0gcmV0dXJuIHQ7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQoZSkgeyBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykgeyB2YXIgdCA9IG51bGwgIT0gYXJndW1lbnRzW3JdID8gYXJndW1lbnRzW3JdIDoge307IHIgJSAyID8gb3duS2V5cyhPYmplY3QodCksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0W3JdKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsIHIpKTsgfSk7IH0gcmV0dXJuIGU7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0KSB7IHJldHVybiAociA9IF90b1Byb3BlcnR5S2V5KHIpKSBpbiBlID8gT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIHsgdmFsdWU6IHQsIGVudW1lcmFibGU6ICEwLCBjb25maWd1cmFibGU6ICEwLCB3cml0YWJsZTogITAgfSkgOiBlW3JdID0gdCwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbi8qKlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXk9fSBidWZcbiAqIEBwYXJhbSB7bnVtYmVyPX0gb2Zmc2V0XG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB2NihvcHRpb25zID0ge30sIGJ1Ziwgb2Zmc2V0ID0gMCkge1xuICAvLyB2NiBpcyB2MSB3aXRoIGRpZmZlcmVudCBmaWVsZCBsYXlvdXQsIHNvIHdlIHN0YXJ0IHdpdGggYSB2MSBVVUlELCBhbGJlaXRcbiAgLy8gd2l0aCBzbGlnaHRseSBkaWZmZXJlbnQgYmVoYXZpb3IgYXJvdW5kIGhvdyB0aGUgY2xvY2tfc2VxIGFuZCBub2RlIGZpZWxkc1xuICAvLyBhcmUgcmFuZG9taXplZCwgd2hpY2ggaXMgd2h5IHdlIGNhbGwgdjEgd2l0aCBfdjY6IHRydWUuXG4gIHZhciBieXRlcyA9ICgwLCBfdi5kZWZhdWx0KShfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIG9wdGlvbnMpLCB7fSwge1xuICAgIF92NjogdHJ1ZVxuICB9KSwgbmV3IFVpbnQ4QXJyYXkoMTYpKTtcblxuICAvLyBSZW9yZGVyIHRoZSBmaWVsZHMgdG8gdjYgbGF5b3V0LlxuICBieXRlcyA9ICgwLCBfdjFUb1YuZGVmYXVsdCkoYnl0ZXMpO1xuXG4gIC8vIFJldHVybiBhcyBhIGJ5dGUgYXJyYXkgaWYgcmVxdWVzdGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGVzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gYnVmO1xuICB9XG4gIHJldHVybiAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKGJ5dGVzKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHY2VG9WMTtcbnZhciBfcGFyc2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3BhcnNlLmpzXCIpKTtcbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuLyoqXG4gKiBDb252ZXJ0IGEgdjYgVVVJRCB0byBhIHYxIFVVSURcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xVaW50OEFycmF5fSB1dWlkIC0gVGhlIHY2IFVVSUQgdG8gY29udmVydCB0byB2NlxuICogQHJldHVybnMge3N0cmluZ3xVaW50OEFycmF5fSBUaGUgdjEgVVVJRCBhcyB0aGUgc2FtZSB0eXBlIGFzIHRoZSBgdXVpZGAgYXJnXG4gKiAoc3RyaW5nIG9yIFVpbnQ4QXJyYXkpXG4gKi9cbmZ1bmN0aW9uIHY2VG9WMSh1dWlkKSB7XG4gIHZhciB2NkJ5dGVzID0gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnID8gKDAsIF9wYXJzZS5kZWZhdWx0KSh1dWlkKSA6IHV1aWQ7XG4gIHZhciB2MUJ5dGVzID0gX3Y2VG9WMSh2NkJ5dGVzKTtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyA/ICgwLCBfc3RyaW5naWZ5LnVuc2FmZVN0cmluZ2lmeSkodjFCeXRlcykgOiB2MUJ5dGVzO1xufVxuXG4vLyBEbyB0aGUgZmllbGQgdHJhbnNmb3JtYXRpb24gbmVlZGVkIGZvciB2NiAtPiB2MVxuZnVuY3Rpb24gX3Y2VG9WMSh2NkJ5dGVzKSB7XG4gIHJldHVybiBVaW50OEFycmF5Lm9mKCh2NkJ5dGVzWzNdICYgMHgwZikgPDwgNCB8IHY2Qnl0ZXNbNF0gPj4gNCAmIDB4MGYsICh2NkJ5dGVzWzRdICYgMHgwZikgPDwgNCB8ICh2NkJ5dGVzWzVdICYgMHhmMCkgPj4gNCwgKHY2Qnl0ZXNbNV0gJiAweDBmKSA8PCA0IHwgdjZCeXRlc1s2XSAmIDB4MGYsIHY2Qnl0ZXNbN10sICh2NkJ5dGVzWzFdICYgMHgwZikgPDwgNCB8ICh2NkJ5dGVzWzJdICYgMHhmMCkgPj4gNCwgKHY2Qnl0ZXNbMl0gJiAweDBmKSA8PCA0IHwgKHY2Qnl0ZXNbM10gJiAweGYwKSA+PiA0LCAweDEwIHwgKHY2Qnl0ZXNbMF0gJiAweGYwKSA+PiA0LCAodjZCeXRlc1swXSAmIDB4MGYpIDw8IDQgfCAodjZCeXRlc1sxXSAmIDB4ZjApID4+IDQsIHY2Qnl0ZXNbOF0sIHY2Qnl0ZXNbOV0sIHY2Qnl0ZXNbMTBdLCB2NkJ5dGVzWzExXSwgdjZCeXRlc1sxMl0sIHY2Qnl0ZXNbMTNdLCB2NkJ5dGVzWzE0XSwgdjZCeXRlc1sxNV0pO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9ybmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JuZy5qc1wiKSk7XG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbi8qKlxuICogVVVJRCBWNyAtIFVuaXggRXBvY2ggdGltZS1iYXNlZCBVVUlEXG4gKlxuICogVGhlIElFVEYgaGFzIHB1Ymxpc2hlZCBSRkM5NTYyLCBpbnRyb2R1Y2luZyAzIG5ldyBVVUlEIHZlcnNpb25zICg2LDcsOCkuIFRoaXNcbiAqIGltcGxlbWVudGF0aW9uIG9mIFY3IGlzIGJhc2VkIG9uIHRoZSBhY2NlcHRlZCwgdGhvdWdoIG5vdCB5ZXQgYXBwcm92ZWQsXG4gKiByZXZpc2lvbnMuXG4gKlxuICogUkZDIDk1NjI6aHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzk1NjIuaHRtbCBVbml2ZXJzYWxseSBVbmlxdWVcbiAqIElEZW50aWZpZXJzIChVVUlEcylcblxuICpcbiAqIFNhbXBsZSBWNyB2YWx1ZTpcbiAqIGh0dHBzOi8vd3d3LnJmYy1lZGl0b3Iub3JnL3JmYy9yZmM5NTYyLmh0bWwjbmFtZS1leGFtcGxlLW9mLWEtdXVpZHY3LXZhbHVlXG4gKlxuICogTW9ub3RvbmljIEJpdCBMYXlvdXQ6IFJGQyByZmM5NTYyLjYuMiBNZXRob2QgMSwgRGVkaWNhdGVkIENvdW50ZXIgQml0cyByZWY6XG4gKiAgICAgaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzk1NjIuaHRtbCNzZWN0aW9uLTYuMi01LjFcbiAqXG4gKiAgIDAgICAgICAgICAgICAgICAgICAgMSAgICAgICAgICAgICAgICAgICAyICAgICAgICAgICAgICAgICAgIDMgMCAxIDIgMyA0IDUgNlxuICogICA3IDggOSAwIDEgMiAzIDQgNSA2IDcgOCA5IDAgMSAyIDMgNCA1IDYgNyA4IDkgMCAxXG4gKiAgKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLStcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICB1bml4X3RzX21zICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rXG4gKiAgfCAgICAgICAgICB1bml4X3RzX21zICAgICAgICAgICB8ICB2ZXIgIHwgICAgICAgIHNlcV9oaSAgICAgICAgIHxcbiAqICArLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstK1xuICogIHx2YXJ8ICAgICAgICAgICAgICAgc2VxX2xvdyAgICAgICAgICAgICAgIHwgICAgICAgIHJhbmQgICAgICAgICB8XG4gKiAgKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLStcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rXG4gKlxuICogc2VxIGlzIGEgMzEgYml0IHNlcmlhbGl6ZWQgY291bnRlcjsgY29tcHJpc2VkIG9mIDEyIGJpdCBzZXFfaGkgYW5kIDE5IGJpdFxuICogc2VxX2xvdywgYW5kIHJhbmRvbWx5IGluaXRpYWxpemVkIHVwb24gdGltZXN0YW1wIGNoYW5nZS4gMzEgYml0IGNvdW50ZXIgc2l6ZVxuICogd2FzIHNlbGVjdGVkIGFzIGFueSBiaXR3aXNlIG9wZXJhdGlvbnMgaW4gbm9kZSBhcmUgZG9uZSBhcyBfc2lnbmVkXyAzMiBiaXRcbiAqIGludHMuIHdlIGV4Y2x1ZGUgdGhlIHNpZ24gYml0LlxuICovXG5cbnZhciBfc2VxTG93ID0gbnVsbDtcbnZhciBfc2VxSGlnaCA9IG51bGw7XG52YXIgX21zZWNzID0gMDtcbmZ1bmN0aW9uIHY3KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8vIGluaXRpYWxpemUgYnVmZmVyIGFuZCBwb2ludGVyXG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBuZXcgVWludDhBcnJheSgxNik7XG5cbiAgLy8gcm5kcyBpcyBVaW50OEFycmF5KDE2KSBmaWxsZWQgd2l0aCByYW5kb20gYnl0ZXNcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gIC8vIG1pbGxpc2Vjb25kcyBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBEYXRlLm5vdygpO1xuXG4gIC8vIHNlcSBpcyB1c2VyIHByb3ZpZGVkIDMxIGJpdCBjb3VudGVyXG4gIHZhciBzZXEgPSBvcHRpb25zLnNlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5zZXEgOiBudWxsO1xuXG4gIC8vIGluaXRpYWxpemUgbG9jYWwgc2VxIGhpZ2gvbG93IHBhcnRzXG4gIHZhciBzZXFIaWdoID0gX3NlcUhpZ2g7XG4gIHZhciBzZXFMb3cgPSBfc2VxTG93O1xuXG4gIC8vIGNoZWNrIGlmIGNsb2NrIGhhcyBhZHZhbmNlZCBhbmQgdXNlciBoYXMgbm90IHByb3ZpZGVkIG1zZWNzXG4gIGlmIChtc2VjcyA+IF9tc2VjcyAmJiBvcHRpb25zLm1zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBfbXNlY3MgPSBtc2VjcztcblxuICAgIC8vIHVubGVzcyB1c2VyIHByb3ZpZGVkIHNlcSwgcmVzZXQgc2VxIHBhcnRzXG4gICAgaWYgKHNlcSAhPT0gbnVsbCkge1xuICAgICAgc2VxSGlnaCA9IG51bGw7XG4gICAgICBzZXFMb3cgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHdlIGhhdmUgYSB1c2VyIHByb3ZpZGVkIHNlcVxuICBpZiAoc2VxICE9PSBudWxsKSB7XG4gICAgLy8gdHJpbSBwcm92aWRlZCBzZXEgdG8gMzEgYml0cyBvZiB2YWx1ZSwgYXZvaWRpbmcgb3ZlcmZsb3dcbiAgICBpZiAoc2VxID4gMHg3ZmZmZmZmZikge1xuICAgICAgc2VxID0gMHg3ZmZmZmZmZjtcbiAgICB9XG5cbiAgICAvLyBzcGxpdCBwcm92aWRlZCBzZXEgaW50byBoaWdoL2xvdyBwYXJ0c1xuICAgIHNlcUhpZ2ggPSBzZXEgPj4+IDE5ICYgMHhmZmY7XG4gICAgc2VxTG93ID0gc2VxICYgMHg3ZmZmZjtcbiAgfVxuXG4gIC8vIHJhbmRvbWx5IGluaXRpYWxpemUgc2VxXG4gIGlmIChzZXFIaWdoID09PSBudWxsIHx8IHNlcUxvdyA9PT0gbnVsbCkge1xuICAgIHNlcUhpZ2ggPSBybmRzWzZdICYgMHg3ZjtcbiAgICBzZXFIaWdoID0gc2VxSGlnaCA8PCA4IHwgcm5kc1s3XTtcbiAgICBzZXFMb3cgPSBybmRzWzhdICYgMHgzZjsgLy8gcGFkIGZvciB2YXJcbiAgICBzZXFMb3cgPSBzZXFMb3cgPDwgOCB8IHJuZHNbOV07XG4gICAgc2VxTG93ID0gc2VxTG93IDw8IDUgfCBybmRzWzEwXSA+Pj4gMztcbiAgfVxuXG4gIC8vIGluY3JlbWVudCBzZXEgaWYgd2l0aGluIG1zZWNzIHdpbmRvd1xuICBpZiAobXNlY3MgKyAxMDAwMCA+IF9tc2VjcyAmJiBzZXEgPT09IG51bGwpIHtcbiAgICBpZiAoKytzZXFMb3cgPiAweDdmZmZmKSB7XG4gICAgICBzZXFMb3cgPSAwO1xuICAgICAgaWYgKCsrc2VxSGlnaCA+IDB4ZmZmKSB7XG4gICAgICAgIHNlcUhpZ2ggPSAwO1xuXG4gICAgICAgIC8vIGluY3JlbWVudCBpbnRlcm5hbCBfbXNlY3MuIHRoaXMgYWxsb3dzIHVzIHRvIGNvbnRpbnVlIGluY3JlbWVudGluZ1xuICAgICAgICAvLyB3aGlsZSBzdGF5aW5nIG1vbm90b25pYy4gTm90ZSwgb25jZSB3ZSBoaXQgMTBrIG1pbGxpc2Vjb25kcyBiZXlvbmQgc3lzdGVtXG4gICAgICAgIC8vIGNsb2NrLCB3ZSB3aWxsIHJlc2V0IGJyZWFraW5nIG1vbm90b25pY2l0eSAoYWZ0ZXIgKDJeMzEpKjEwMDAwIGdlbmVyYXRpb25zKVxuICAgICAgICBfbXNlY3MrKztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gcmVzZXR0aW5nOyB3ZSBoYXZlIGFkdmFuY2VkIG1vcmUgdGhhblxuICAgIC8vIDEwayBtaWxsaXNlY29uZHMgYmV5b25kIHN5c3RlbSBjbG9ja1xuICAgIF9tc2VjcyA9IG1zZWNzO1xuICB9XG4gIF9zZXFIaWdoID0gc2VxSGlnaDtcbiAgX3NlcUxvdyA9IHNlcUxvdztcblxuICAvLyBbYnl0ZXMgMC01XSA0OCBiaXRzIG9mIGxvY2FsIHRpbWVzdGFtcFxuICBiW2krK10gPSBfbXNlY3MgLyAweDEwMDAwMDAwMDAwICYgMHhmZjtcbiAgYltpKytdID0gX21zZWNzIC8gMHgxMDAwMDAwMDAgJiAweGZmO1xuICBiW2krK10gPSBfbXNlY3MgLyAweDEwMDAwMDAgJiAweGZmO1xuICBiW2krK10gPSBfbXNlY3MgLyAweDEwMDAwICYgMHhmZjtcbiAgYltpKytdID0gX21zZWNzIC8gMHgxMDAgJiAweGZmO1xuICBiW2krK10gPSBfbXNlY3MgJiAweGZmO1xuXG4gIC8vIFtieXRlIDZdIC0gc2V0IDQgYml0cyBvZiB2ZXJzaW9uICg3KSB3aXRoIGZpcnN0IDQgYml0cyBzZXFfaGlcbiAgYltpKytdID0gc2VxSGlnaCA+Pj4gNCAmIDB4MGYgfCAweDcwO1xuXG4gIC8vIFtieXRlIDddIHJlbWFpbmluZyA4IGJpdHMgb2Ygc2VxX2hpXG4gIGJbaSsrXSA9IHNlcUhpZ2ggJiAweGZmO1xuXG4gIC8vIFtieXRlIDhdIC0gdmFyaWFudCAoMiBiaXRzKSwgZmlyc3QgNiBiaXRzIHNlcV9sb3dcbiAgYltpKytdID0gc2VxTG93ID4+PiAxMyAmIDB4M2YgfCAweDgwO1xuXG4gIC8vIFtieXRlIDldIDggYml0cyBzZXFfbG93XG4gIGJbaSsrXSA9IHNlcUxvdyA+Pj4gNSAmIDB4ZmY7XG5cbiAgLy8gW2J5dGUgMTBdIHJlbWFpbmluZyA1IGJpdHMgc2VxX2xvdywgMyBiaXRzIHJhbmRvbVxuICBiW2krK10gPSBzZXFMb3cgPDwgMyAmIDB4ZmYgfCBybmRzWzEwXSAmIDB4MDc7XG5cbiAgLy8gW2J5dGVzIDExLTE1XSBhbHdheXMgcmFuZG9tXG4gIGJbaSsrXSA9IHJuZHNbMTFdO1xuICBiW2krK10gPSBybmRzWzEyXTtcbiAgYltpKytdID0gcm5kc1sxM107XG4gIGJbaSsrXSA9IHJuZHNbMTRdO1xuICBiW2krK10gPSBybmRzWzE1XTtcbiAgcmV0dXJuIGJ1ZiB8fCAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKGIpO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gdjc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3JlZ2V4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9yZWdleC5qc1wiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgZGVmYXVsdDogZSB9OyB9XG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgX3JlZ2V4LmRlZmF1bHQudGVzdCh1dWlkKTtcbn1cbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHZhbGlkYXRlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuZnVuY3Rpb24gdmVyc2lvbih1dWlkKSB7XG4gIGlmICghKDAsIF92YWxpZGF0ZS5kZWZhdWx0KSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignSW52YWxpZCBVVUlEJyk7XG4gIH1cbiAgcmV0dXJuIHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE1KSwgMTYpO1xufVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gdmVyc2lvbjsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cblxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wgKi9cblxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XG4gIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XG4gIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59XG5cbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcbiAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0O1xuICB9XG4gIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcbiAgdmFyIHQgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICB0W3BdID0gc1twXTtcbiAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICB9XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcbiAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XG4gIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XG4gIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xuICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcbiAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xuICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcbiAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xuICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XG4gICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xuICAgICAgfVxuICB9XG4gIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcbiAgZG9uZSA9IHRydWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xuICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcbiAgfVxuICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xuICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgb1trMl0gPSBtW2tdO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xuICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XG4gIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICB9XG4gIH07XG4gIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XG4gIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgaWYgKCFtKSByZXR1cm4gbztcbiAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gIHRyeSB7XG4gICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgfVxuICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gIH1cbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcbiAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XG4gIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXG4gICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcbiAgICAgICAgICByW2tdID0gYVtqXTtcbiAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XG4gIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcbiAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cbiAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxuICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cbiAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xuICB2YXIgaSwgcDtcbiAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xuICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cbiAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcbiAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cbiAgcmV0dXJuIGNvb2tlZDtcbn07XG5cbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gIG9bXCJkZWZhdWx0XCJdID0gdjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XG4gIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xuICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XG4gIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xuICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcbiAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcbiAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xuICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XG4gICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIHdoaWxlIChlbnYuc3RhY2subGVuZ3RoKSB7XG4gICAgICB2YXIgcmVjID0gZW52LnN0YWNrLnBvcCgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlYy5kaXNwb3NlICYmIHJlYy5kaXNwb3NlLmNhbGwocmVjLnZhbHVlKTtcbiAgICAgICAgaWYgKHJlYy5hc3luYykgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgZmFpbChlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xuICB9XG4gIHJldHVybiBuZXh0KCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgX19leHRlbmRzLFxuICBfX2Fzc2lnbixcbiAgX19yZXN0LFxuICBfX2RlY29yYXRlLFxuICBfX3BhcmFtLFxuICBfX21ldGFkYXRhLFxuICBfX2F3YWl0ZXIsXG4gIF9fZ2VuZXJhdG9yLFxuICBfX2NyZWF0ZUJpbmRpbmcsXG4gIF9fZXhwb3J0U3RhcixcbiAgX192YWx1ZXMsXG4gIF9fcmVhZCxcbiAgX19zcHJlYWQsXG4gIF9fc3ByZWFkQXJyYXlzLFxuICBfX3NwcmVhZEFycmF5LFxuICBfX2F3YWl0LFxuICBfX2FzeW5jR2VuZXJhdG9yLFxuICBfX2FzeW5jRGVsZWdhdG9yLFxuICBfX2FzeW5jVmFsdWVzLFxuICBfX21ha2VUZW1wbGF0ZU9iamVjdCxcbiAgX19pbXBvcnRTdGFyLFxuICBfX2ltcG9ydERlZmF1bHQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRJbixcbiAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXG4gIF9fZGlzcG9zZVJlc291cmNlcyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtcbiAgICBGdXNlQ29udGV4dCxcbiAgICBGdXNlQ29udGV4dEJ1aWxkZXIsXG4gICAgRnVzZUVycm9yXG59IGZyb20gJ0BidGZ1c2UvY29yZSc7XG5pbXBvcnQge0VjaG9QbHVnaW59IGZyb20gJ2VjaG8nO1xuXG52YXIgc2xlZXAgPSAobXM6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSwgbXMpO1xuICAgIH0pO1xufVxuXG4oYXN5bmMgKCkgPT4ge1xuICAgIGxldCBidWlsZGVyOiBGdXNlQ29udGV4dEJ1aWxkZXIgPSBuZXcgRnVzZUNvbnRleHRCdWlsZGVyKCk7XG4gICAgbGV0IGNvbnRleHQ6IEZ1c2VDb250ZXh0ID0gYXdhaXQgYnVpbGRlci5idWlsZCgpO1xuICAgIGxldCBlY2hvUGx1Z2luOiBFY2hvUGx1Z2luID0gbmV3IEVjaG9QbHVnaW4oY29udGV4dCk7XG5cbiAgICBjb250ZXh0LnJlZ2lzdGVyUGF1c2VIYW5kbGVyKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ09OIFBBVVNFIScpO1xuICAgIH0pO1xuXG4gICAgY29udGV4dC5yZWdpc3RlclJlc3VtZUhhbmRsZXIoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnT04gUkVTVU1FIScpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gYXBwZW5kSW5mbyhtc2c6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBsZXQgZGl2OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gbXNnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuXG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBzdHJpbmcgPSBhd2FpdCBlY2hvUGx1Z2luLmVjaG8oJ0hpIGZyb20gVFMnKTtcbiAgICAgICAgLy8gYWxlcnQocmVzcG9uc2UpO1xuICAgICAgICBhcHBlbmRJbmZvKHJlc3BvbnNlKTtcblxuICAgICAgICBjb250ZXh0LmdldExvZ2dlcigpLmluZm8oYEVDSE8gUkVTUE9OU0U6ICR7cmVzcG9uc2V9YCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgdGltZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRpbWVEaXYpO1xuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aW1lRGl2LmlubmVySFRNTCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgbGV0IGRlYnVnOiBib29sZWFuID0gYXdhaXQgY29udGV4dC5pc0RlYnVnTW9kZSgpO1xuICAgICAgICBhcHBlbmRJbmZvKGBEZWJ1ZzogJHtkZWJ1ZyA/ICd0cnVlJyA6ICdmYWxzZSd9YCk7XG5cbiAgICAgICAgLy8gYXdhaXQgZWNob1BsdWdpbi5zdWJzY3JpYmUoKGQ6IHN0cmluZykgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ2QnLCBkKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfSkoKTtcblxuICAgIGRvY3VtZW50LmJvZHkub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IHJlc3AgPSBhd2FpdCBlY2hvUGx1Z2luLmJpZ1Jlc3BvbnNlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdiaWcgcmVzcCcsIHJlc3ApO1xuICAgIH07XG5cbiAgICAod2luZG93IGFzIGFueSkuZnVzZWNvbnRleHQgPSBjb250ZXh0O1xuICAgIFxuICAgIGNvbnRleHQuZ2V0TG9nZ2VyKCkuaW5mbygndGVzdCBsb2cgZnJvbSB3ZWJ2aWV3Jyk7XG4gICAgY29udGV4dC5nZXRMb2dnZXIoKS5lcnJvcihuZXcgRnVzZUVycm9yKCdUZXN0RXJyb3InLCAndGVzdCBmdXNlIGVycm9yJywgbmV3IEVycm9yKCdDYXVzZWQgZXJyb3InKSwgMSkpO1xufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==