/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../js/node_modules/tslib/tslib.es6.mjs":
/*!****************************************************!*\
  !*** ../../../js/node_modules/tslib/tslib.es6.mjs ***!
  \****************************************************/
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
/* harmony export */   __rewriteRelativeImportExtension: () => (/* binding */ __rewriteRelativeImportExtension),
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

var ownKeys = function(o) {
  ownKeys = Object.getOwnPropertyNames || function (o) {
    var ar = [];
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
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

function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
      });
  }
  return path;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
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
  __rewriteRelativeImportExtension,
});


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/index.js":
/*!***************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.version = exports.validate = exports.v7 = exports.v6ToV1 = exports.v6 = exports.v5 = exports.v4 = exports.v3 = exports.v1ToV6 = exports.v1 = exports.stringify = exports.parse = exports.NIL = exports.MAX = void 0;
var max_js_1 = __webpack_require__(/*! ./max.js */ "../../../js/node_modules/uuid/dist/cjs-browser/max.js");
Object.defineProperty(exports, "MAX", ({ enumerable: true, get: function () { return max_js_1.default; } }));
var nil_js_1 = __webpack_require__(/*! ./nil.js */ "../../../js/node_modules/uuid/dist/cjs-browser/nil.js");
Object.defineProperty(exports, "NIL", ({ enumerable: true, get: function () { return nil_js_1.default; } }));
var parse_js_1 = __webpack_require__(/*! ./parse.js */ "../../../js/node_modules/uuid/dist/cjs-browser/parse.js");
Object.defineProperty(exports, "parse", ({ enumerable: true, get: function () { return parse_js_1.default; } }));
var stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../../js/node_modules/uuid/dist/cjs-browser/stringify.js");
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return stringify_js_1.default; } }));
var v1_js_1 = __webpack_require__(/*! ./v1.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v1.js");
Object.defineProperty(exports, "v1", ({ enumerable: true, get: function () { return v1_js_1.default; } }));
var v1ToV6_js_1 = __webpack_require__(/*! ./v1ToV6.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v1ToV6.js");
Object.defineProperty(exports, "v1ToV6", ({ enumerable: true, get: function () { return v1ToV6_js_1.default; } }));
var v3_js_1 = __webpack_require__(/*! ./v3.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v3.js");
Object.defineProperty(exports, "v3", ({ enumerable: true, get: function () { return v3_js_1.default; } }));
var v4_js_1 = __webpack_require__(/*! ./v4.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v4.js");
Object.defineProperty(exports, "v4", ({ enumerable: true, get: function () { return v4_js_1.default; } }));
var v5_js_1 = __webpack_require__(/*! ./v5.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v5.js");
Object.defineProperty(exports, "v5", ({ enumerable: true, get: function () { return v5_js_1.default; } }));
var v6_js_1 = __webpack_require__(/*! ./v6.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v6.js");
Object.defineProperty(exports, "v6", ({ enumerable: true, get: function () { return v6_js_1.default; } }));
var v6ToV1_js_1 = __webpack_require__(/*! ./v6ToV1.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v6ToV1.js");
Object.defineProperty(exports, "v6ToV1", ({ enumerable: true, get: function () { return v6ToV1_js_1.default; } }));
var v7_js_1 = __webpack_require__(/*! ./v7.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v7.js");
Object.defineProperty(exports, "v7", ({ enumerable: true, get: function () { return v7_js_1.default; } }));
var validate_js_1 = __webpack_require__(/*! ./validate.js */ "../../../js/node_modules/uuid/dist/cjs-browser/validate.js");
Object.defineProperty(exports, "validate", ({ enumerable: true, get: function () { return validate_js_1.default; } }));
var version_js_1 = __webpack_require__(/*! ./version.js */ "../../../js/node_modules/uuid/dist/cjs-browser/version.js");
Object.defineProperty(exports, "version", ({ enumerable: true, get: function () { return version_js_1.default; } }));


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/max.js":
/*!*************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/max.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = 'ffffffff-ffff-ffff-ffff-ffffffffffff';


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/md5.js":
/*!*************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/md5.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function md5(bytes) {
    const words = uint8ToUint32(bytes);
    const md5Bytes = wordsToMd5(words, bytes.length * 8);
    return uint32ToUint8(md5Bytes);
}
function uint32ToUint8(input) {
    const bytes = new Uint8Array(input.length * 4);
    for (let i = 0; i < input.length * 4; i++) {
        bytes[i] = (input[i >> 2] >>> ((i % 4) * 8)) & 0xff;
    }
    return bytes;
}
function getOutputLength(inputLength8) {
    return (((inputLength8 + 64) >>> 9) << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
    const xpad = new Uint32Array(getOutputLength(len)).fill(0);
    xpad.set(x);
    xpad[len >> 5] |= 0x80 << len % 32;
    xpad[xpad.length - 1] = len;
    x = xpad;
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;
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
    return Uint32Array.of(a, b, c, d);
}
function uint8ToUint32(input) {
    if (input.length === 0) {
        return new Uint32Array();
    }
    const output = new Uint32Array(getOutputLength(input.length * 8)).fill(0);
    for (let i = 0; i < input.length; i++) {
        output[i >> 2] |= (input[i] & 0xff) << ((i % 4) * 8);
    }
    return output;
}
function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
}
function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}
function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
exports["default"] = md5;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/native.js":
/*!****************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/native.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
exports["default"] = { randomUUID };


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/nil.js":
/*!*************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/nil.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = '00000000-0000-0000-0000-000000000000';


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/parse.js":
/*!***************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/parse.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_js_1 = __webpack_require__(/*! ./validate.js */ "../../../js/node_modules/uuid/dist/cjs-browser/validate.js");
function parse(uuid) {
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Invalid UUID');
    }
    let v;
    return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 0xff, ((v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000) & 0xff, (v / 0x100000000) & 0xff, (v >>> 24) & 0xff, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff);
}
exports["default"] = parse;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/regex.js":
/*!***************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/regex.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/rng.js":
/*!*************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/rng.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}
exports["default"] = rng;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/sha1.js":
/*!**************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/sha1.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function f(s, x, y, z) {
    switch (s) {
        case 0:
            return (x & y) ^ (~x & z);
        case 1:
            return x ^ y ^ z;
        case 2:
            return (x & y) ^ (x & z) ^ (y & z);
        case 3:
            return x ^ y ^ z;
    }
}
function ROTL(x, n) {
    return (x << n) | (x >>> (32 - n));
}
function sha1(bytes) {
    const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
    const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
    const newBytes = new Uint8Array(bytes.length + 1);
    newBytes.set(bytes);
    newBytes[bytes.length] = 0x80;
    bytes = newBytes;
    const l = bytes.length / 4 + 2;
    const N = Math.ceil(l / 16);
    const M = new Array(N);
    for (let i = 0; i < N; ++i) {
        const arr = new Uint32Array(16);
        for (let j = 0; j < 16; ++j) {
            arr[j] =
                (bytes[i * 64 + j * 4] << 24) |
                    (bytes[i * 64 + j * 4 + 1] << 16) |
                    (bytes[i * 64 + j * 4 + 2] << 8) |
                    bytes[i * 64 + j * 4 + 3];
        }
        M[i] = arr;
    }
    M[N - 1][14] = ((bytes.length - 1) * 8) / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = ((bytes.length - 1) * 8) & 0xffffffff;
    for (let i = 0; i < N; ++i) {
        const W = new Uint32Array(80);
        for (let t = 0; t < 16; ++t) {
            W[t] = M[i][t];
        }
        for (let t = 16; t < 80; ++t) {
            W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
        }
        let a = H[0];
        let b = H[1];
        let c = H[2];
        let d = H[3];
        let e = H[4];
        for (let t = 0; t < 80; ++t) {
            const s = Math.floor(t / 20);
            const T = (ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t]) >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
        }
        H[0] = (H[0] + a) >>> 0;
        H[1] = (H[1] + b) >>> 0;
        H[2] = (H[2] + c) >>> 0;
        H[3] = (H[3] + d) >>> 0;
        H[4] = (H[4] + e) >>> 0;
    }
    return Uint8Array.of(H[0] >> 24, H[0] >> 16, H[0] >> 8, H[0], H[1] >> 24, H[1] >> 16, H[1] >> 8, H[1], H[2] >> 24, H[2] >> 16, H[2] >> 8, H[2], H[3] >> 24, H[3] >> 16, H[3] >> 8, H[3], H[4] >> 24, H[4] >> 16, H[4] >> 8, H[4]);
}
exports["default"] = sha1;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/stringify.js":
/*!*******************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/stringify.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unsafeStringify = void 0;
const validate_js_1 = __webpack_require__(/*! ./validate.js */ "../../../js/node_modules/uuid/dist/cjs-browser/validate.js");
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]).toLowerCase();
}
exports.unsafeStringify = unsafeStringify;
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
exports["default"] = stringify;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/v1.js":
/*!************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/v1.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateV1State = void 0;
const rng_js_1 = __webpack_require__(/*! ./rng.js */ "../../../js/node_modules/uuid/dist/cjs-browser/rng.js");
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../../js/node_modules/uuid/dist/cjs-browser/stringify.js");
const _state = {};
function v1(options, buf, offset) {
    let bytes;
    const isV6 = options?._v6 ?? false;
    if (options) {
        const optionsKeys = Object.keys(options);
        if (optionsKeys.length === 1 && optionsKeys[0] === '_v6') {
            options = undefined;
        }
    }
    if (options) {
        bytes = v1Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.nsecs, options.clockseq, options.node, buf, offset);
    }
    else {
        const now = Date.now();
        const rnds = (0, rng_js_1.default)();
        updateV1State(_state, now, rnds);
        bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, isV6 ? undefined : _state.clockseq, isV6 ? undefined : _state.node, buf, offset);
    }
    return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
}
function updateV1State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.nsecs ??= 0;
    if (now === state.msecs) {
        state.nsecs++;
        if (state.nsecs >= 10000) {
            state.node = undefined;
            state.nsecs = 0;
        }
    }
    else if (now > state.msecs) {
        state.nsecs = 0;
    }
    else if (now < state.msecs) {
        state.node = undefined;
    }
    if (!state.node) {
        state.node = rnds.slice(10, 16);
        state.node[0] |= 0x01;
        state.clockseq = ((rnds[8] << 8) | rnds[9]) & 0x3fff;
    }
    state.msecs = now;
    return state;
}
exports.updateV1State = updateV1State;
function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf, offset = 0) {
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
    }
    else {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
    }
    msecs ??= Date.now();
    nsecs ??= 0;
    clockseq ??= ((rnds[8] << 8) | rnds[9]) & 0x3fff;
    node ??= rnds.slice(10, 16);
    msecs += 12219292800000;
    const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    buf[offset++] = (tl >>> 24) & 0xff;
    buf[offset++] = (tl >>> 16) & 0xff;
    buf[offset++] = (tl >>> 8) & 0xff;
    buf[offset++] = tl & 0xff;
    const tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
    buf[offset++] = (tmh >>> 8) & 0xff;
    buf[offset++] = tmh & 0xff;
    buf[offset++] = ((tmh >>> 24) & 0xf) | 0x10;
    buf[offset++] = (tmh >>> 16) & 0xff;
    buf[offset++] = (clockseq >>> 8) | 0x80;
    buf[offset++] = clockseq & 0xff;
    for (let n = 0; n < 6; ++n) {
        buf[offset++] = node[n];
    }
    return buf;
}
exports["default"] = v1;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/v1ToV6.js":
/*!****************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/v1ToV6.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const parse_js_1 = __webpack_require__(/*! ./parse.js */ "../../../js/node_modules/uuid/dist/cjs-browser/parse.js");
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../../js/node_modules/uuid/dist/cjs-browser/stringify.js");
function v1ToV6(uuid) {
    const v1Bytes = typeof uuid === 'string' ? (0, parse_js_1.default)(uuid) : uuid;
    const v6Bytes = _v1ToV6(v1Bytes);
    return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v6Bytes) : v6Bytes;
}
exports["default"] = v1ToV6;
function _v1ToV6(v1Bytes) {
    return Uint8Array.of(((v1Bytes[6] & 0x0f) << 4) | ((v1Bytes[7] >> 4) & 0x0f), ((v1Bytes[7] & 0x0f) << 4) | ((v1Bytes[4] & 0xf0) >> 4), ((v1Bytes[4] & 0x0f) << 4) | ((v1Bytes[5] & 0xf0) >> 4), ((v1Bytes[5] & 0x0f) << 4) | ((v1Bytes[0] & 0xf0) >> 4), ((v1Bytes[0] & 0x0f) << 4) | ((v1Bytes[1] & 0xf0) >> 4), ((v1Bytes[1] & 0x0f) << 4) | ((v1Bytes[2] & 0xf0) >> 4), 0x60 | (v1Bytes[2] & 0x0f), v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
}


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/v3.js":
/*!************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/v3.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URL = exports.DNS = void 0;
const md5_js_1 = __webpack_require__(/*! ./md5.js */ "../../../js/node_modules/uuid/dist/cjs-browser/md5.js");
const v35_js_1 = __webpack_require__(/*! ./v35.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v35.js");
var v35_js_2 = __webpack_require__(/*! ./v35.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v35.js");
Object.defineProperty(exports, "DNS", ({ enumerable: true, get: function () { return v35_js_2.DNS; } }));
Object.defineProperty(exports, "URL", ({ enumerable: true, get: function () { return v35_js_2.URL; } }));
function v3(value, namespace, buf, offset) {
    return (0, v35_js_1.default)(0x30, md5_js_1.default, value, namespace, buf, offset);
}
v3.DNS = v35_js_1.DNS;
v3.URL = v35_js_1.URL;
exports["default"] = v3;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/v35.js":
/*!*************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/v35.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URL = exports.DNS = exports.stringToBytes = void 0;
const parse_js_1 = __webpack_require__(/*! ./parse.js */ "../../../js/node_modules/uuid/dist/cjs-browser/parse.js");
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../../js/node_modules/uuid/dist/cjs-browser/stringify.js");
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}
exports.stringToBytes = stringToBytes;
exports.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(version, hash, value, namespace, buf, offset) {
    const valueBytes = typeof value === 'string' ? stringToBytes(value) : value;
    const namespaceBytes = typeof namespace === 'string' ? (0, parse_js_1.default)(namespace) : namespace;
    if (typeof namespace === 'string') {
        namespace = (0, parse_js_1.default)(namespace);
    }
    if (namespace?.length !== 16) {
        throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    }
    let bytes = new Uint8Array(16 + valueBytes.length);
    bytes.set(namespaceBytes);
    bytes.set(valueBytes, namespaceBytes.length);
    bytes = hash(bytes);
    bytes[6] = (bytes[6] & 0x0f) | version;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(bytes);
}
exports["default"] = v35;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/v4.js":
/*!************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/v4.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const native_js_1 = __webpack_require__(/*! ./native.js */ "../../../js/node_modules/uuid/dist/cjs-browser/native.js");
const rng_js_1 = __webpack_require__(/*! ./rng.js */ "../../../js/node_modules/uuid/dist/cjs-browser/rng.js");
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../../js/node_modules/uuid/dist/cjs-browser/stringify.js");
function v4(options, buf, offset) {
    if (native_js_1.default.randomUUID && !buf && !options) {
        return native_js_1.default.randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? (0, rng_js_1.default)();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(rnds);
}
exports["default"] = v4;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/v5.js":
/*!************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/v5.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URL = exports.DNS = void 0;
const sha1_js_1 = __webpack_require__(/*! ./sha1.js */ "../../../js/node_modules/uuid/dist/cjs-browser/sha1.js");
const v35_js_1 = __webpack_require__(/*! ./v35.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v35.js");
var v35_js_2 = __webpack_require__(/*! ./v35.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v35.js");
Object.defineProperty(exports, "DNS", ({ enumerable: true, get: function () { return v35_js_2.DNS; } }));
Object.defineProperty(exports, "URL", ({ enumerable: true, get: function () { return v35_js_2.URL; } }));
function v5(value, namespace, buf, offset) {
    return (0, v35_js_1.default)(0x50, sha1_js_1.default, value, namespace, buf, offset);
}
v5.DNS = v35_js_1.DNS;
v5.URL = v35_js_1.URL;
exports["default"] = v5;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/v6.js":
/*!************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/v6.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../../js/node_modules/uuid/dist/cjs-browser/stringify.js");
const v1_js_1 = __webpack_require__(/*! ./v1.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v1.js");
const v1ToV6_js_1 = __webpack_require__(/*! ./v1ToV6.js */ "../../../js/node_modules/uuid/dist/cjs-browser/v1ToV6.js");
function v6(options, buf, offset) {
    options ??= {};
    offset ??= 0;
    let bytes = (0, v1_js_1.default)({ ...options, _v6: true }, new Uint8Array(16));
    bytes = (0, v1ToV6_js_1.default)(bytes);
    if (buf) {
        for (let i = 0; i < 16; i++) {
            buf[offset + i] = bytes[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(bytes);
}
exports["default"] = v6;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/v6ToV1.js":
/*!****************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/v6ToV1.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const parse_js_1 = __webpack_require__(/*! ./parse.js */ "../../../js/node_modules/uuid/dist/cjs-browser/parse.js");
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../../js/node_modules/uuid/dist/cjs-browser/stringify.js");
function v6ToV1(uuid) {
    const v6Bytes = typeof uuid === 'string' ? (0, parse_js_1.default)(uuid) : uuid;
    const v1Bytes = _v6ToV1(v6Bytes);
    return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v1Bytes) : v1Bytes;
}
exports["default"] = v6ToV1;
function _v6ToV1(v6Bytes) {
    return Uint8Array.of(((v6Bytes[3] & 0x0f) << 4) | ((v6Bytes[4] >> 4) & 0x0f), ((v6Bytes[4] & 0x0f) << 4) | ((v6Bytes[5] & 0xf0) >> 4), ((v6Bytes[5] & 0x0f) << 4) | (v6Bytes[6] & 0x0f), v6Bytes[7], ((v6Bytes[1] & 0x0f) << 4) | ((v6Bytes[2] & 0xf0) >> 4), ((v6Bytes[2] & 0x0f) << 4) | ((v6Bytes[3] & 0xf0) >> 4), 0x10 | ((v6Bytes[0] & 0xf0) >> 4), ((v6Bytes[0] & 0x0f) << 4) | ((v6Bytes[1] & 0xf0) >> 4), v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
}


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/v7.js":
/*!************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/v7.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateV7State = void 0;
const rng_js_1 = __webpack_require__(/*! ./rng.js */ "../../../js/node_modules/uuid/dist/cjs-browser/rng.js");
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../../js/node_modules/uuid/dist/cjs-browser/stringify.js");
const _state = {};
function v7(options, buf, offset) {
    let bytes;
    if (options) {
        bytes = v7Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.seq, buf, offset);
    }
    else {
        const now = Date.now();
        const rnds = (0, rng_js_1.default)();
        updateV7State(_state, now, rnds);
        bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
    }
    return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
}
function updateV7State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.seq ??= 0;
    if (now > state.msecs) {
        state.seq = (rnds[6] << 23) | (rnds[7] << 16) | (rnds[8] << 8) | rnds[9];
        state.msecs = now;
    }
    else {
        state.seq = (state.seq + 1) | 0;
        if (state.seq === 0) {
            state.msecs++;
        }
    }
    return state;
}
exports.updateV7State = updateV7State;
function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
    }
    else {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
    }
    msecs ??= Date.now();
    seq ??= ((rnds[6] * 0x7f) << 24) | (rnds[7] << 16) | (rnds[8] << 8) | rnds[9];
    buf[offset++] = (msecs / 0x10000000000) & 0xff;
    buf[offset++] = (msecs / 0x100000000) & 0xff;
    buf[offset++] = (msecs / 0x1000000) & 0xff;
    buf[offset++] = (msecs / 0x10000) & 0xff;
    buf[offset++] = (msecs / 0x100) & 0xff;
    buf[offset++] = msecs & 0xff;
    buf[offset++] = 0x70 | ((seq >>> 28) & 0x0f);
    buf[offset++] = (seq >>> 20) & 0xff;
    buf[offset++] = 0x80 | ((seq >>> 14) & 0x3f);
    buf[offset++] = (seq >>> 6) & 0xff;
    buf[offset++] = ((seq << 2) & 0xff) | (rnds[10] & 0x03);
    buf[offset++] = rnds[11];
    buf[offset++] = rnds[12];
    buf[offset++] = rnds[13];
    buf[offset++] = rnds[14];
    buf[offset++] = rnds[15];
    return buf;
}
exports["default"] = v7;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/validate.js":
/*!******************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/validate.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const regex_js_1 = __webpack_require__(/*! ./regex.js */ "../../../js/node_modules/uuid/dist/cjs-browser/regex.js");
function validate(uuid) {
    return typeof uuid === 'string' && regex_js_1.default.test(uuid);
}
exports["default"] = validate;


/***/ }),

/***/ "../../../js/node_modules/uuid/dist/cjs-browser/version.js":
/*!*****************************************************************!*\
  !*** ../../../js/node_modules/uuid/dist/cjs-browser/version.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_js_1 = __webpack_require__(/*! ./validate.js */ "../../../js/node_modules/uuid/dist/cjs-browser/validate.js");
function version(uuid) {
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Invalid UUID');
    }
    return parseInt(uuid.slice(14, 15), 16);
}
exports["default"] = version;


/***/ }),

/***/ "../../../js/src/AbstractFuseAPIFactory.ts":
/*!*************************************************!*\
  !*** ../../../js/src/AbstractFuseAPIFactory.ts ***!
  \*************************************************/
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

/***/ "../../../js/src/AbstractFuseLoggerFactory.ts":
/*!****************************************************!*\
  !*** ../../../js/src/AbstractFuseLoggerFactory.ts ***!
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
exports.AbstractFuseLoggerFactory = void 0;
/**
 * An FuseLogger factory for creating logging instances.
 */
class AbstractFuseLoggerFactory {
    constructor() { }
}
exports.AbstractFuseLoggerFactory = AbstractFuseLoggerFactory;


/***/ }),

/***/ "../../../js/src/ContentType.ts":
/*!**************************************!*\
  !*** ../../../js/src/ContentType.ts ***!
  \**************************************/
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

/***/ "../../../js/src/FuseAPI.ts":
/*!**********************************!*\
  !*** ../../../js/src/FuseAPI.ts ***!
  \**********************************/
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
const FuseSerializer_1 = __webpack_require__(/*! ./FuseSerializer */ "../../../js/src/FuseSerializer.ts");
const FuseCallbackManager_1 = __webpack_require__(/*! ./FuseCallbackManager */ "../../../js/src/FuseCallbackManager.ts");
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

/***/ "../../../js/src/FuseAPIFactory.ts":
/*!*****************************************!*\
  !*** ../../../js/src/FuseAPIFactory.ts ***!
  \*****************************************/
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
const AbstractFuseAPIFactory_1 = __webpack_require__(/*! ./AbstractFuseAPIFactory */ "../../../js/src/AbstractFuseAPIFactory.ts");
const Platform_1 = __webpack_require__(/*! ./Platform */ "../../../js/src/Platform.ts");
const IOSSchemeFuseAPI_1 = __webpack_require__(/*! ./ios/IOSSchemeFuseAPI */ "../../../js/src/ios/IOSSchemeFuseAPI.ts");
const AndroidSchemeFuseAPI_1 = __webpack_require__(/*! ./android/AndroidSchemeFuseAPI */ "../../../js/src/android/AndroidSchemeFuseAPI.ts");
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

/***/ "../../../js/src/FuseAPIResponse.ts":
/*!******************************************!*\
  !*** ../../../js/src/FuseAPIResponse.ts ***!
  \******************************************/
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
const FuseResponseReader_1 = __webpack_require__(/*! ./FuseResponseReader */ "../../../js/src/FuseResponseReader.ts");
const FuseError_1 = __webpack_require__(/*! ./FuseError */ "../../../js/src/FuseError.ts");
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

/***/ "../../../js/src/FuseCallbackManager.ts":
/*!**********************************************!*\
  !*** ../../../js/src/FuseCallbackManager.ts ***!
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
exports.FuseCallbackManager = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "../../../js/node_modules/tslib/tslib.es6.mjs");
const UUID = tslib_1.__importStar(__webpack_require__(/*! uuid */ "../../../js/node_modules/uuid/dist/cjs-browser/index.js"));
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

/***/ "../../../js/src/FuseContext.ts":
/*!**************************************!*\
  !*** ../../../js/src/FuseContext.ts ***!
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
exports.FuseContext = void 0;
const FuseRuntime_1 = __webpack_require__(/*! ./plugins/FuseRuntime */ "../../../js/src/plugins/FuseRuntime.ts");
const Version_1 = __webpack_require__(/*! ./Version */ "../../../js/src/Version.ts");
const FuseMemoryStore_1 = __webpack_require__(/*! ./plugins/FuseMemoryStore */ "../../../js/src/plugins/FuseMemoryStore.ts");
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
        this.$memStore = new FuseMemoryStore_1.FuseMemoryStore(this);
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
    getMemoryStore() {
        return this.$memStore;
    }
}
exports.FuseContext = FuseContext;


/***/ }),

/***/ "../../../js/src/FuseContextBuilder.ts":
/*!*********************************************!*\
  !*** ../../../js/src/FuseContextBuilder.ts ***!
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
exports.FuseContextBuilder = void 0;
const FuseAPIFactory_1 = __webpack_require__(/*! ./FuseAPIFactory */ "../../../js/src/FuseAPIFactory.ts");
const FuseContextFactory_1 = __webpack_require__(/*! ./FuseContextFactory */ "../../../js/src/FuseContextFactory.ts");
const FuseLoggerFactory_1 = __webpack_require__(/*! ./FuseLoggerFactory */ "../../../js/src/FuseLoggerFactory.ts");
const FuseLoggerLevel_1 = __webpack_require__(/*! ./FuseLoggerLevel */ "../../../js/src/FuseLoggerLevel.ts");
const PlatformResolver_1 = __webpack_require__(/*! ./PlatformResolver */ "../../../js/src/PlatformResolver.ts");
class FuseContextBuilder {
    constructor() {
        this.$loggerFactory = null;
        this.$apiFactory = null;
        this.$platformResolver = new PlatformResolver_1.PlatformResolver();
        this.$contextFactory = null;
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
    setContextFactory(factory) {
        this.$contextFactory = factory;
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
        let contextFactory = this.$contextFactory;
        if (contextFactory === null) {
            contextFactory = new FuseContextFactory_1.FuseContextFactory();
        }
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

/***/ "../../../js/src/FuseContextFactory.ts":
/*!*********************************************!*\
  !*** ../../../js/src/FuseContextFactory.ts ***!
  \*********************************************/
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
const AndroidFuseContext_1 = __webpack_require__(/*! ./android/AndroidFuseContext */ "../../../js/src/android/AndroidFuseContext.ts");
const IOSFuseContext_1 = __webpack_require__(/*! ./ios/IOSFuseContext */ "../../../js/src/ios/IOSFuseContext.ts");
const Platform_1 = __webpack_require__(/*! ./Platform */ "../../../js/src/Platform.ts");
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

/***/ "../../../js/src/FuseError.ts":
/*!************************************!*\
  !*** ../../../js/src/FuseError.ts ***!
  \************************************/
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

/***/ "../../../js/src/FuseLogger.ts":
/*!*************************************!*\
  !*** ../../../js/src/FuseLogger.ts ***!
  \*************************************/
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
const FuseLoggerLevel_1 = __webpack_require__(/*! ./FuseLoggerLevel */ "../../../js/src/FuseLoggerLevel.ts");
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

/***/ "../../../js/src/FuseLoggerFactory.ts":
/*!********************************************!*\
  !*** ../../../js/src/FuseLoggerFactory.ts ***!
  \********************************************/
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
const FuseLogger_1 = __webpack_require__(/*! ./FuseLogger */ "../../../js/src/FuseLogger.ts");
const Platform_1 = __webpack_require__(/*! ./Platform */ "../../../js/src/Platform.ts");
const IOSFuseLogger_1 = __webpack_require__(/*! ./ios/IOSFuseLogger */ "../../../js/src/ios/IOSFuseLogger.ts");
const AndroidFuseLogger_1 = __webpack_require__(/*! ./android/AndroidFuseLogger */ "../../../js/src/android/AndroidFuseLogger.ts");
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

/***/ "../../../js/src/FuseLoggerLevel.ts":
/*!******************************************!*\
  !*** ../../../js/src/FuseLoggerLevel.ts ***!
  \******************************************/
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

/***/ "../../../js/src/FusePermissionGrantResult.ts":
/*!****************************************************!*\
  !*** ../../../js/src/FusePermissionGrantResult.ts ***!
  \****************************************************/
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
const FusePermissionState_1 = __webpack_require__(/*! ./FusePermissionState */ "../../../js/src/FusePermissionState.ts");
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

/***/ "../../../js/src/FusePermissionRequest.ts":
/*!************************************************!*\
  !*** ../../../js/src/FusePermissionRequest.ts ***!
  \************************************************/
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
const ContentType_1 = __webpack_require__(/*! ./ContentType */ "../../../js/src/ContentType.ts");
const FuseError_1 = __webpack_require__(/*! ./FuseError */ "../../../js/src/FuseError.ts");
const FusePermissionGrantResult_1 = __webpack_require__(/*! ./FusePermissionGrantResult */ "../../../js/src/FusePermissionGrantResult.ts");
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

/***/ "../../../js/src/FusePermissionState.ts":
/*!**********************************************!*\
  !*** ../../../js/src/FusePermissionState.ts ***!
  \**********************************************/
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

/***/ "../../../js/src/FusePlugin.ts":
/*!*************************************!*\
  !*** ../../../js/src/FusePlugin.ts ***!
  \*************************************/
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
const FuseSerializer_1 = __webpack_require__(/*! ./FuseSerializer */ "../../../js/src/FuseSerializer.ts");
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

/***/ "../../../js/src/FuseResponseReader.ts":
/*!*********************************************!*\
  !*** ../../../js/src/FuseResponseReader.ts ***!
  \*********************************************/
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

/***/ "../../../js/src/FuseSerializer.ts":
/*!*****************************************!*\
  !*** ../../../js/src/FuseSerializer.ts ***!
  \*****************************************/
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

/***/ "../../../js/src/HTTPFuseAPI.ts":
/*!**************************************!*\
  !*** ../../../js/src/HTTPFuseAPI.ts ***!
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
exports.HTTPFuseAPI = void 0;
const ContentType_1 = __webpack_require__(/*! ./ContentType */ "../../../js/src/ContentType.ts");
const FuseAPI_1 = __webpack_require__(/*! ./FuseAPI */ "../../../js/src/FuseAPI.ts");
const FuseAPIResponse_1 = __webpack_require__(/*! ./FuseAPIResponse */ "../../../js/src/FuseAPIResponse.ts");
const FuseError_1 = __webpack_require__(/*! ./FuseError */ "../../../js/src/FuseError.ts");
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

/***/ "../../../js/src/Platform.ts":
/*!***********************************!*\
  !*** ../../../js/src/Platform.ts ***!
  \***********************************/
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

/***/ "../../../js/src/PlatformResolver.ts":
/*!*******************************************!*\
  !*** ../../../js/src/PlatformResolver.ts ***!
  \*******************************************/
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
const Platform_1 = __webpack_require__(/*! ./Platform */ "../../../js/src/Platform.ts");
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

/***/ "../../../js/src/Version.ts":
/*!**********************************!*\
  !*** ../../../js/src/Version.ts ***!
  \**********************************/
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

/***/ "../../../js/src/android/AndroidFuseContext.ts":
/*!*****************************************************!*\
  !*** ../../../js/src/android/AndroidFuseContext.ts ***!
  \*****************************************************/
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
const FuseContext_1 = __webpack_require__(/*! ../FuseContext */ "../../../js/src/FuseContext.ts");
const Platform_1 = __webpack_require__(/*! ../Platform */ "../../../js/src/Platform.ts");
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

/***/ "../../../js/src/android/AndroidFuseLogger.ts":
/*!****************************************************!*\
  !*** ../../../js/src/android/AndroidFuseLogger.ts ***!
  \****************************************************/
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
const FuseLogger_1 = __webpack_require__(/*! ../FuseLogger */ "../../../js/src/FuseLogger.ts");
const FuseCallbackManager_1 = __webpack_require__(/*! ../FuseCallbackManager */ "../../../js/src/FuseCallbackManager.ts");
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

/***/ "../../../js/src/android/AndroidSchemeFuseAPI.ts":
/*!*******************************************************!*\
  !*** ../../../js/src/android/AndroidSchemeFuseAPI.ts ***!
  \*******************************************************/
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
const HTTPFuseAPI_1 = __webpack_require__(/*! ../HTTPFuseAPI */ "../../../js/src/HTTPFuseAPI.ts");
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

/***/ "../../../js/src/api.ts":
/*!******************************!*\
  !*** ../../../js/src/api.ts ***!
  \******************************/
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
/// <reference path="./android/internal/BTFuseNative.d.ts" />
/// <reference path="./ios/internal/messageHandlers.d.ts" />
// Common API
var Platform_1 = __webpack_require__(/*! ./Platform */ "../../../js/src/Platform.ts");
Object.defineProperty(exports, "Platform", ({ enumerable: true, get: function () { return Platform_1.Platform; } }));
var PlatformResolver_1 = __webpack_require__(/*! ./PlatformResolver */ "../../../js/src/PlatformResolver.ts");
Object.defineProperty(exports, "PlatformResolver", ({ enumerable: true, get: function () { return PlatformResolver_1.PlatformResolver; } }));
var FuseContext_1 = __webpack_require__(/*! ./FuseContext */ "../../../js/src/FuseContext.ts");
Object.defineProperty(exports, "FuseContext", ({ enumerable: true, get: function () { return FuseContext_1.FuseContext; } }));
var FuseContextBuilder_1 = __webpack_require__(/*! ./FuseContextBuilder */ "../../../js/src/FuseContextBuilder.ts");
Object.defineProperty(exports, "FuseContextBuilder", ({ enumerable: true, get: function () { return FuseContextBuilder_1.FuseContextBuilder; } }));
var Version_1 = __webpack_require__(/*! ./Version */ "../../../js/src/Version.ts");
Object.defineProperty(exports, "Version", ({ enumerable: true, get: function () { return Version_1.Version; } }));
var FuseAPI_1 = __webpack_require__(/*! ./FuseAPI */ "../../../js/src/FuseAPI.ts");
Object.defineProperty(exports, "FuseAPI", ({ enumerable: true, get: function () { return FuseAPI_1.FuseAPI; } }));
var FuseCallbackManager_1 = __webpack_require__(/*! ./FuseCallbackManager */ "../../../js/src/FuseCallbackManager.ts");
Object.defineProperty(exports, "FuseCallbackManager", ({ enumerable: true, get: function () { return FuseCallbackManager_1.FuseCallbackManager; } }));
var FuseAPIResponse_1 = __webpack_require__(/*! ./FuseAPIResponse */ "../../../js/src/FuseAPIResponse.ts");
Object.defineProperty(exports, "FuseAPIResponse", ({ enumerable: true, get: function () { return FuseAPIResponse_1.FuseAPIResponse; } }));
var ContentType_1 = __webpack_require__(/*! ./ContentType */ "../../../js/src/ContentType.ts");
Object.defineProperty(exports, "ContentType", ({ enumerable: true, get: function () { return ContentType_1.ContentType; } }));
var FuseResponseReader_1 = __webpack_require__(/*! ./FuseResponseReader */ "../../../js/src/FuseResponseReader.ts");
Object.defineProperty(exports, "FuseResponseReader", ({ enumerable: true, get: function () { return FuseResponseReader_1.FuseResponseReader; } }));
var FuseAPIFactory_1 = __webpack_require__(/*! ./FuseAPIFactory */ "../../../js/src/FuseAPIFactory.ts");
Object.defineProperty(exports, "FuseAPIFactory", ({ enumerable: true, get: function () { return FuseAPIFactory_1.FuseAPIFactory; } }));
var AbstractFuseAPIFactory_1 = __webpack_require__(/*! ./AbstractFuseAPIFactory */ "../../../js/src/AbstractFuseAPIFactory.ts");
Object.defineProperty(exports, "AbstractFuseAPIFactory", ({ enumerable: true, get: function () { return AbstractFuseAPIFactory_1.AbstractFuseAPIFactory; } }));
var FuseRuntime_1 = __webpack_require__(/*! ./plugins/FuseRuntime */ "../../../js/src/plugins/FuseRuntime.ts");
Object.defineProperty(exports, "FuseRuntime", ({ enumerable: true, get: function () { return FuseRuntime_1.FuseRuntime; } }));
var FusePlugin_1 = __webpack_require__(/*! ./FusePlugin */ "../../../js/src/FusePlugin.ts");
Object.defineProperty(exports, "FusePlugin", ({ enumerable: true, get: function () { return FusePlugin_1.FusePlugin; } }));
var HTTPFuseAPI_1 = __webpack_require__(/*! ./HTTPFuseAPI */ "../../../js/src/HTTPFuseAPI.ts");
Object.defineProperty(exports, "HTTPFuseAPI", ({ enumerable: true, get: function () { return HTTPFuseAPI_1.HTTPFuseAPI; } }));
var FuseError_1 = __webpack_require__(/*! ./FuseError */ "../../../js/src/FuseError.ts");
Object.defineProperty(exports, "FuseError", ({ enumerable: true, get: function () { return FuseError_1.FuseError; } }));
var FuseSerializer_1 = __webpack_require__(/*! ./FuseSerializer */ "../../../js/src/FuseSerializer.ts");
Object.defineProperty(exports, "FuseSerializer", ({ enumerable: true, get: function () { return FuseSerializer_1.FuseSerializer; } }));
var FusePermissionState_1 = __webpack_require__(/*! ./FusePermissionState */ "../../../js/src/FusePermissionState.ts");
Object.defineProperty(exports, "FusePermissionState", ({ enumerable: true, get: function () { return FusePermissionState_1.FusePermissionState; } }));
var FusePermissionRequest_1 = __webpack_require__(/*! ./FusePermissionRequest */ "../../../js/src/FusePermissionRequest.ts");
Object.defineProperty(exports, "FusePermissionRequest", ({ enumerable: true, get: function () { return FusePermissionRequest_1.FusePermissionRequest; } }));
var FusePermissionGrantResult_1 = __webpack_require__(/*! ./FusePermissionGrantResult */ "../../../js/src/FusePermissionGrantResult.ts");
Object.defineProperty(exports, "FusePermissionGrantResult", ({ enumerable: true, get: function () { return FusePermissionGrantResult_1.FusePermissionGrantResult; } }));
// Logger
var FuseLoggerLevel_1 = __webpack_require__(/*! ./FuseLoggerLevel */ "../../../js/src/FuseLoggerLevel.ts");
Object.defineProperty(exports, "FuseLoggerLevel", ({ enumerable: true, get: function () { return FuseLoggerLevel_1.FuseLoggerLevel; } }));
var FuseLogger_1 = __webpack_require__(/*! ./FuseLogger */ "../../../js/src/FuseLogger.ts");
Object.defineProperty(exports, "FuseLogger", ({ enumerable: true, get: function () { return FuseLogger_1.FuseLogger; } }));
Object.defineProperty(exports, "FuseLoggerSerializer", ({ enumerable: true, get: function () { return FuseLogger_1.FuseLoggerSerializer; } }));
var AbstractFuseLoggerFactory_1 = __webpack_require__(/*! ./AbstractFuseLoggerFactory */ "../../../js/src/AbstractFuseLoggerFactory.ts");
Object.defineProperty(exports, "AbstractFuseLoggerFactory", ({ enumerable: true, get: function () { return AbstractFuseLoggerFactory_1.AbstractFuseLoggerFactory; } }));
var FuseLoggerFactory_1 = __webpack_require__(/*! ./FuseLoggerFactory */ "../../../js/src/FuseLoggerFactory.ts");
Object.defineProperty(exports, "FuseLoggerFactory", ({ enumerable: true, get: function () { return FuseLoggerFactory_1.FuseLoggerFactory; } }));
// iOS Specific APIs / Implementations
var IOSSchemeFuseAPI_1 = __webpack_require__(/*! ./ios/IOSSchemeFuseAPI */ "../../../js/src/ios/IOSSchemeFuseAPI.ts");
Object.defineProperty(exports, "IOSSchemeFuseAPI", ({ enumerable: true, get: function () { return IOSSchemeFuseAPI_1.IOSSchemeFuseAPI; } }));
var IOSFuseLogger_1 = __webpack_require__(/*! ./ios/IOSFuseLogger */ "../../../js/src/ios/IOSFuseLogger.ts");
Object.defineProperty(exports, "IOSFuseLogger", ({ enumerable: true, get: function () { return IOSFuseLogger_1.IOSFuseLogger; } }));
// Android Specific APIs / Implementations
var AndroidSchemeFuseAPI_1 = __webpack_require__(/*! ./android/AndroidSchemeFuseAPI */ "../../../js/src/android/AndroidSchemeFuseAPI.ts");
Object.defineProperty(exports, "AndroidSchemeFuseAPI", ({ enumerable: true, get: function () { return AndroidSchemeFuseAPI_1.AndroidSchemeFuseAPI; } }));
var AndroidFuseLogger_1 = __webpack_require__(/*! ./android/AndroidFuseLogger */ "../../../js/src/android/AndroidFuseLogger.ts");
Object.defineProperty(exports, "AndroidFuseLogger", ({ enumerable: true, get: function () { return AndroidFuseLogger_1.AndroidFuseLogger; } }));


/***/ }),

/***/ "../../../js/src/ios/IOSFuseContext.ts":
/*!*********************************************!*\
  !*** ../../../js/src/ios/IOSFuseContext.ts ***!
  \*********************************************/
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
const FuseContext_1 = __webpack_require__(/*! ../FuseContext */ "../../../js/src/FuseContext.ts");
const Platform_1 = __webpack_require__(/*! ../Platform */ "../../../js/src/Platform.ts");
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

/***/ "../../../js/src/ios/IOSFuseLogger.ts":
/*!********************************************!*\
  !*** ../../../js/src/ios/IOSFuseLogger.ts ***!
  \********************************************/
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
const FuseLogger_1 = __webpack_require__(/*! ../FuseLogger */ "../../../js/src/FuseLogger.ts");
const FuseCallbackManager_1 = __webpack_require__(/*! ../FuseCallbackManager */ "../../../js/src/FuseCallbackManager.ts");
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

/***/ "../../../js/src/ios/IOSSchemeFuseAPI.ts":
/*!***********************************************!*\
  !*** ../../../js/src/ios/IOSSchemeFuseAPI.ts ***!
  \***********************************************/
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
const HTTPFuseAPI_1 = __webpack_require__(/*! ../HTTPFuseAPI */ "../../../js/src/HTTPFuseAPI.ts");
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

/***/ "../../../js/src/plugins/FuseMemoryStore.ts":
/*!**************************************************!*\
  !*** ../../../js/src/plugins/FuseMemoryStore.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023-2025 Breautek

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
exports.FuseMemoryStore = void 0;
const ContentType_1 = __webpack_require__(/*! ../ContentType */ "../../../js/src/ContentType.ts");
const FusePlugin_1 = __webpack_require__(/*! ../FusePlugin */ "../../../js/src/FusePlugin.ts");
/**
 * A class to interface with native memory store object
 * These memory stores can store stateful strings. This state
 * is kept in memory even if the OS destroys the application's UI while
 * the application is in the background.
 *
 * This is not to be confused with persistent storage. The memory
 * store is intended to simply store state in between a paused application.
 * If the application completely gets closed, destroyed or stopped by the user,
 * the memory store will be cleared.
 */
class FuseMemoryStore extends FusePlugin_1.FusePlugin {
    constructor(context) {
        super(context);
    }
    _getID() {
        return 'FuseMemoryStore';
    }
    /**
     * @param key - A name for the value
     * @param value - The value to store, only stringified data is permitted
     */
    async set(key, value) {
        await this._exec('/set', ContentType_1.ContentType.JSON, {
            key: key,
            value: value
        });
    }
    /**
     * @param key - The stored key
     * @returns
     */
    async get(key) {
        let response = await this._exec('/get', ContentType_1.ContentType.TEXT, key);
        return await response.readAsText();
    }
}
exports.FuseMemoryStore = FuseMemoryStore;


/***/ }),

/***/ "../../../js/src/plugins/FuseRuntime.ts":
/*!**********************************************!*\
  !*** ../../../js/src/plugins/FuseRuntime.ts ***!
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
exports.FuseRuntime = void 0;
const ContentType_1 = __webpack_require__(/*! ../ContentType */ "../../../js/src/ContentType.ts");
const FusePlugin_1 = __webpack_require__(/*! ../FusePlugin */ "../../../js/src/FusePlugin.ts");
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

/***/ "../src/FuseLocationAccuracy.ts":
/*!**************************************!*\
  !*** ../src/FuseLocationAccuracy.ts ***!
  \**************************************/
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
exports.FuseLocationAccuracy = void 0;
var FuseLocationAccuracy;
(function (FuseLocationAccuracy) {
    FuseLocationAccuracy[FuseLocationAccuracy["COARSE"] = 0] = "COARSE";
    FuseLocationAccuracy[FuseLocationAccuracy["FINE"] = 1] = "FINE";
})(FuseLocationAccuracy || (exports.FuseLocationAccuracy = FuseLocationAccuracy = {}));


/***/ }),

/***/ "../src/FuseLocationEventType.ts":
/*!***************************************!*\
  !*** ../src/FuseLocationEventType.ts ***!
  \***************************************/
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
exports.FuseLocationEventType = void 0;
var FuseLocationEventType;
(function (FuseLocationEventType) {
    FuseLocationEventType[FuseLocationEventType["AVAILABILITY"] = 0] = "AVAILABILITY";
    FuseLocationEventType[FuseLocationEventType["LOCATION"] = 1] = "LOCATION";
})(FuseLocationEventType || (exports.FuseLocationEventType = FuseLocationEventType = {}));


/***/ }),

/***/ "../src/FuseLocationPlugin.ts":
/*!************************************!*\
  !*** ../src/FuseLocationPlugin.ts ***!
  \************************************/
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
exports.FuseLocationPlugin = void 0;
const core_1 = __webpack_require__(/*! @btfuse/core */ "../../../js/src/api.ts");
const FuseLocationSubscription_1 = __webpack_require__(/*! ./FuseLocationSubscription */ "../src/FuseLocationSubscription.ts");
class FuseLocationPlugin extends core_1.FusePlugin {
    constructor(context) {
        super(context);
        this.$callbackID = null;
        this.$subscriptions = [];
    }
    _getID() {
        return 'FuseLocation';
    }
    async watch(accuracy, justificationHandler) {
        let builder = new FuseLocationSubscription_1.FuseLocationSubscriptionOptionsBuilder();
        builder.setAccuracy(accuracy);
        return await this.subscribe(builder.build(), justificationHandler);
    }
    async $init() {
        if (this.$callbackID !== null) {
            return;
        }
        this.$callbackID = this._createCallback((data) => {
            let event = null;
            try {
                event = JSON.parse(data);
            }
            catch (ex) {
                this.getContext().getLogger().error('Error parsing Location Update event', core_1.FuseError.wrap(ex));
                return;
            }
            for (let i = 0; i < this.$subscriptions.length; i++) {
                let sub = this.$subscriptions[i];
                try {
                    sub.notify(event);
                }
                catch (ex) {
                    this.getContext().getLogger().error('FuseLocationSubscription Handler Error:', core_1.FuseError.wrap(ex));
                }
            }
        });
        await this._exec('/callback', core_1.ContentType.TEXT, this.$callbackID);
    }
    async subscribe(options, justificationHandler) {
        if (this.$callbackID === null) {
            await this.$init();
        }
        let subscription = await this._subscribe(options, justificationHandler);
        this.$subscriptions.push(subscription);
        return subscription;
    }
    async unsubscribe(subscription) {
        let index = this.$subscriptions.indexOf(subscription);
        if (index > -1) {
            this.$subscriptions.splice(index, 1);
        }
        await this._exec('/unsubscribe', core_1.ContentType.TEXT, subscription.getID());
    }
}
exports.FuseLocationPlugin = FuseLocationPlugin;


/***/ }),

/***/ "../src/FuseLocationPluginFactory.ts":
/*!*******************************************!*\
  !*** ../src/FuseLocationPluginFactory.ts ***!
  \*******************************************/
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
exports.FuseLocationPluginFactory = void 0;
const core_1 = __webpack_require__(/*! @btfuse/core */ "../../../js/src/api.ts");
const AndroidFuseLocationPlugin_1 = __webpack_require__(/*! ./android/AndroidFuseLocationPlugin */ "../src/android/AndroidFuseLocationPlugin.ts");
const IOSFuseLocationPlugin_1 = __webpack_require__(/*! ./ios/IOSFuseLocationPlugin */ "../src/ios/IOSFuseLocationPlugin.ts");
class FuseLocationPluginFactory {
    constructor() { }
    create(context) {
        switch (context.getPlatform()) {
            case core_1.Platform.ANDROID: return new AndroidFuseLocationPlugin_1.AndroidFuseLocationPlugin(context);
            case core_1.Platform.IOS: return new IOSFuseLocationPlugin_1.IOSFuseLocationPlugin(context);
            default: throw new core_1.FuseError('FuseLocationPluginFactory', `Unsupported platform: ${context.getPlatform()}`);
        }
    }
}
exports.FuseLocationPluginFactory = FuseLocationPluginFactory;


/***/ }),

/***/ "../src/FuseLocationSubscription.ts":
/*!******************************************!*\
  !*** ../src/FuseLocationSubscription.ts ***!
  \******************************************/
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
exports.FuseLocationSubscription = exports.FuseLocationSubscriptionOptionsBuilder = void 0;
const core_1 = __webpack_require__(/*! @btfuse/core */ "../../../js/src/api.ts");
const FuseLocationAccuracy_1 = __webpack_require__(/*! ./FuseLocationAccuracy */ "../src/FuseLocationAccuracy.ts");
const FuseLocationEventType_1 = __webpack_require__(/*! ./FuseLocationEventType */ "../src/FuseLocationEventType.ts");
class FuseLocationSubscriptionOptionsBuilder {
    constructor() {
        this.$accuracy = FuseLocationAccuracy_1.FuseLocationAccuracy.COARSE;
        this.$interval = 1000;
    }
    /**
     * Sets the desired accuracy.
     *
     * Whether this is honoured depends if the user grants the appropriate permission.
     *
     * @default FuseLocationAccuracy.COARSE
     * @param accuracy
     * @returns
     */
    setAccuracy(accuracy) {
        this.$accuracy = accuracy;
        return this;
    }
    /**
     * The interval to receive GPS points. This acts like a hint but events
     * may come quicker or slower than the desired interval. Several deciding factors
     * including but not limited to other services also using GPS and the GPS health.
     *
     * @default 1000
     * @param interval
     * @returns
     */
    setInterval(interval) {
        this.$interval = interval;
        return this;
    }
    build() {
        return {
            accuracy: this.$accuracy,
            interval: this.$interval
        };
    }
}
exports.FuseLocationSubscriptionOptionsBuilder = FuseLocationSubscriptionOptionsBuilder;
class FuseLocationSubscription {
    constructor(plugin, id, options, grantResult) {
        this.$plugin = plugin;
        this.$id = id;
        this.$callbacks = [];
        this.$options = options;
        this.$grants = grantResult;
    }
    getID() {
        return this.$id;
    }
    isAuthorized() {
        return this.$grants.isGranted(this.$desiredAccuracy);
    }
    register(cb) {
        this.$callbacks.push(cb);
    }
    unregister(cb) {
        let idx = this.$callbacks.indexOf(cb);
        if (idx > -1) {
            this.$callbacks.splice(idx, 1);
        }
    }
    notify(event) {
        if (event.type === FuseLocationEventType_1.FuseLocationEventType.LOCATION) {
            for (let i = 0; i < this.$callbacks.length; i++) {
                let cb = this.$callbacks[i];
                try {
                    cb(event.data);
                }
                catch (ex) {
                    this.$plugin.getContext().getLogger().error("TFuseLocationHandler error", core_1.FuseError.wrap(ex));
                }
            }
        }
        else {
            this.$plugin.getContext().getLogger().info("Received unhandled Availability event");
            console.log(event);
        }
    }
    async assertSettings() {
        return await this.$plugin.assertSettings(Object.assign(Object.assign({}, this.$options), { subscriptionID: this.getID() }));
    }
    async release() {
        await this.$plugin.unsubscribe(this);
    }
}
exports.FuseLocationSubscription = FuseLocationSubscription;
;


/***/ }),

/***/ "../src/android/AndroidFuseLocationPlugin.ts":
/*!***************************************************!*\
  !*** ../src/android/AndroidFuseLocationPlugin.ts ***!
  \***************************************************/
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
exports.AndroidFuseLocationPlugin = void 0;
const core_1 = __webpack_require__(/*! @btfuse/core */ "../../../js/src/api.ts");
const FuseLocationPlugin_1 = __webpack_require__(/*! ../FuseLocationPlugin */ "../src/FuseLocationPlugin.ts");
const FuseLocationSubscription_1 = __webpack_require__(/*! ../FuseLocationSubscription */ "../src/FuseLocationSubscription.ts");
class AndroidFuseLocationPlugin extends FuseLocationPlugin_1.FuseLocationPlugin {
    async assertSettings(options) {
        let res = await this._exec('/assertSettings', core_1.ContentType.JSON, options);
        return res.readAsJSON();
    }
    async _subscribe(options, justificationHandler) {
        let permRequest = new core_1.FusePermissionRequest(this._createAPIBridge('/requestPermissions'), [options.accuracy], justificationHandler);
        let grantResult = null;
        grantResult = await permRequest.request();
        let subscriptionID = null;
        let res = await this._exec('/subscribe', core_1.ContentType.JSON, options);
        subscriptionID = await res.readAsText();
        return new FuseLocationSubscription_1.FuseLocationSubscription(this, subscriptionID, options, grantResult);
    }
}
exports.AndroidFuseLocationPlugin = AndroidFuseLocationPlugin;


/***/ }),

/***/ "../src/api.ts":
/*!*********************!*\
  !*** ../src/api.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Norman Breau

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
exports.FuseLocationAccuracy = exports.FuseLocationEventType = exports.FuseLocationSubscriptionOptionsBuilder = exports.FuseLocationSubscription = exports.FuseLocationPluginFactory = exports.FuseLocationPlugin = void 0;
var FuseLocationPlugin_1 = __webpack_require__(/*! ./FuseLocationPlugin */ "../src/FuseLocationPlugin.ts");
Object.defineProperty(exports, "FuseLocationPlugin", ({ enumerable: true, get: function () { return FuseLocationPlugin_1.FuseLocationPlugin; } }));
var FuseLocationPluginFactory_1 = __webpack_require__(/*! ./FuseLocationPluginFactory */ "../src/FuseLocationPluginFactory.ts");
Object.defineProperty(exports, "FuseLocationPluginFactory", ({ enumerable: true, get: function () { return FuseLocationPluginFactory_1.FuseLocationPluginFactory; } }));
var FuseLocationSubscription_1 = __webpack_require__(/*! ./FuseLocationSubscription */ "../src/FuseLocationSubscription.ts");
Object.defineProperty(exports, "FuseLocationSubscription", ({ enumerable: true, get: function () { return FuseLocationSubscription_1.FuseLocationSubscription; } }));
Object.defineProperty(exports, "FuseLocationSubscriptionOptionsBuilder", ({ enumerable: true, get: function () { return FuseLocationSubscription_1.FuseLocationSubscriptionOptionsBuilder; } }));
var FuseLocationEventType_1 = __webpack_require__(/*! ./FuseLocationEventType */ "../src/FuseLocationEventType.ts");
Object.defineProperty(exports, "FuseLocationEventType", ({ enumerable: true, get: function () { return FuseLocationEventType_1.FuseLocationEventType; } }));
var FuseLocationAccuracy_1 = __webpack_require__(/*! ./FuseLocationAccuracy */ "../src/FuseLocationAccuracy.ts");
Object.defineProperty(exports, "FuseLocationAccuracy", ({ enumerable: true, get: function () { return FuseLocationAccuracy_1.FuseLocationAccuracy; } }));


/***/ }),

/***/ "../src/ios/IOSFuseLocationPlugin.ts":
/*!*******************************************!*\
  !*** ../src/ios/IOSFuseLocationPlugin.ts ***!
  \*******************************************/
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
exports.IOSFuseLocationPlugin = void 0;
const core_1 = __webpack_require__(/*! @btfuse/core */ "../../../js/src/api.ts");
const FuseLocationPlugin_1 = __webpack_require__(/*! ../FuseLocationPlugin */ "../src/FuseLocationPlugin.ts");
const FuseLocationSubscription_1 = __webpack_require__(/*! ../FuseLocationSubscription */ "../src/FuseLocationSubscription.ts");
class IOSFuseLocationPlugin extends FuseLocationPlugin_1.FuseLocationPlugin {
    async assertSettings(options) {
        let res = await this._exec('/assertSettings', core_1.ContentType.JSON, options);
        return res.readAsJSON();
    }
    async _subscribe(options, justificationHandler) {
        let res = await this._exec('/subscribe', core_1.ContentType.JSON, options);
        if (res.isError()) {
            throw await res.readAsError();
        }
        let data = await res.readAsJSON();
        if (!data.subscriptionID) {
            throw new core_1.FuseError('FuseLocation', 'Missing subscription ID from result');
        }
        return new FuseLocationSubscription_1.FuseLocationSubscription(this, data.subscriptionID, options, new core_1.FusePermissionGrantResult(data.grants));
    }
}
exports.IOSFuseLocationPlugin = IOSFuseLocationPlugin;


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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/

/*
   Copyright 2019 Total Pave Inc.

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
const core_1 = __webpack_require__(/*! @btfuse/core */ "../../../js/src/api.ts");
const location_1 = __webpack_require__(/*! @btfuse/location */ "../src/api.ts");
let dataContainer;
let plugin;
async function createListener(mode) {
    let subscription = await plugin.watch(mode, async () => {
        return true;
    });
    subscription.register((points) => {
        let lastPoint = null;
        for (let i = 0; i < points.length; i++) {
            lastPoint = points[i];
        }
        if (!lastPoint) {
            return;
        }
        dataContainer.innerHTML = '';
        let data = document.createElement('pre');
        data.innerHTML = JSON.stringify(lastPoint, null, 4);
        dataContainer.appendChild(data);
    });
    return subscription;
}
window.onload = async () => {
    let builder = new core_1.FuseContextBuilder();
    let context = await builder.build();
    plugin = new location_1.FuseLocationPluginFactory().create(context);
    window.plugin = plugin;
    let currentMode = null;
    let toggleFineBtn = document.createElement('button');
    toggleFineBtn.innerHTML = 'Toggle Fine Location';
    let toggleCoarseBtn = document.createElement('button');
    toggleCoarseBtn.innerHTML = 'Toggle Coarse Location';
    let checkBtn = document.createElement('button');
    checkBtn.innerHTML = 'Check Settings';
    let subscription = null;
    toggleFineBtn.addEventListener('click', async () => {
        if (subscription) {
            await subscription.release();
            subscription = null;
            dataContainer.innerHTML = '';
            if (currentMode !== location_1.FuseLocationAccuracy.FINE) {
                subscription = await createListener(location_1.FuseLocationAccuracy.FINE);
                currentMode = location_1.FuseLocationAccuracy.FINE;
            }
            else {
                currentMode = null;
            }
        }
        else {
            subscription = await createListener(location_1.FuseLocationAccuracy.FINE);
            currentMode = location_1.FuseLocationAccuracy.FINE;
        }
    });
    toggleCoarseBtn.addEventListener('click', async () => {
        if (subscription) {
            await subscription.release();
            subscription = null;
            dataContainer.innerHTML = '';
            if (currentMode !== location_1.FuseLocationAccuracy.COARSE) {
                subscription = await createListener(location_1.FuseLocationAccuracy.COARSE);
                currentMode = location_1.FuseLocationAccuracy.COARSE;
            }
            else {
                currentMode = null;
            }
        }
        else {
            subscription = await createListener(location_1.FuseLocationAccuracy.COARSE);
            currentMode = location_1.FuseLocationAccuracy.COARSE;
        }
    });
    checkBtn.addEventListener('click', async () => {
        if (!subscription) {
            dataContainer.innerHTML = 'subscription required.';
            return;
        }
        console.log(await subscription.assertSettings());
    });
    dataContainer = document.createElement('div');
    document.body.appendChild(toggleFineBtn);
    document.body.appendChild(toggleCoarseBtn);
    document.body.appendChild(checkBtn);
    document.body.appendChild(dataContainer);
    await context.onWebviewReady();
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0sR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBZTtRQUM1QyxNQUFNLEtBQUssR0FBYSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNDLElBQUksS0FBSyxHQUFXLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLEtBQUssR0FBVyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxLQUFLLEdBQVcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDZixLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztRQUVELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDZixLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztRQUVELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDZixLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxD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OUMsQ0FBQztpQkFDSSxDQUFDO2dCQUNGLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDdkIsQ0FBQztRQUNMLENBQUM7YUFDSSxDQUFDO1lBQ0YsWUFBWSxHQUFHLE1BQU0sY0FBYyxDQUFDLCtCQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pFLFdBQVcsR0FBRywrQkFBb0IsQ0FBQyxNQUFNLENBQUM7UUFDOUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtRQUMxQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDaEIsYUFBYSxDQUFDLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQztZQUNuRCxPQUFPO1FBQ1gsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUVILGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXpDLE1BQU0sT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25DLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uLi8uLi8uLi9qcy9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2Lm1qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9janMtYnJvd3Nlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9janMtYnJvd3Nlci9tYXguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY2pzLWJyb3dzZXIvbWQ1LmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2Nqcy1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9janMtYnJvd3Nlci9uaWwuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY2pzLWJyb3dzZXIvcGFyc2UuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY2pzLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY2pzLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2Nqcy1icm93c2VyL3NoYTEuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY2pzLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2Nqcy1icm93c2VyL3YxLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2Nqcy1icm93c2VyL3YxVG9WNi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9janMtYnJvd3Nlci92My5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9janMtYnJvd3Nlci92MzUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY2pzLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY2pzLWJyb3dzZXIvdjUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY2pzLWJyb3dzZXIvdjYuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY2pzLWJyb3dzZXIvdjZUb1YxLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2Nqcy1icm93c2VyL3Y3LmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2Nqcy1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2Nqcy1icm93c2VyL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL3NyYy9BYnN0cmFjdEZ1c2VBUElGYWN0b3J5LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvc3JjL0NvbnRlbnRUeXBlLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvRnVzZUFQSS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvc3JjL0Z1c2VBUElGYWN0b3J5LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvRnVzZUFQSVJlc3BvbnNlLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvRnVzZUNhbGxiYWNrTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvc3JjL0Z1c2VDb250ZXh0LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvRnVzZUNvbnRleHRCdWlsZGVyLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvRnVzZUNvbnRleHRGYWN0b3J5LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvRnVzZUVycm9yLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvRnVzZUxvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvc3JjL0Z1c2VMb2dnZXJGYWN0b3J5LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvRnVzZUxvZ2dlckxldmVsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvc3JjL0Z1c2VQZXJtaXNzaW9uUmVxdWVzdC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvc3JjL0Z1c2VQZXJtaXNzaW9uU3RhdGUudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL3NyYy9GdXNlUGx1Z2luLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvRnVzZVJlc3BvbnNlUmVhZGVyLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvRnVzZVNlcmlhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL3NyYy9IVFRQRnVzZUFQSS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvc3JjL1BsYXRmb3JtLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvUGxhdGZvcm1SZXNvbHZlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvc3JjL1ZlcnNpb24udHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL3NyYy9hbmRyb2lkL0FuZHJvaWRGdXNlQ29udGV4dC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvc3JjL2FuZHJvaWQvQW5kcm9pZEZ1c2VMb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL3NyYy9hbmRyb2lkL0FuZHJvaWRTY2hlbWVGdXNlQVBJLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvYXBpLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvaW9zL0lPU0Z1c2VDb250ZXh0LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvaW9zL0lPU0Z1c2VMb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2pzL3NyYy9pb3MvSU9TU2NoZW1lRnVzZUFQSS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vanMvc3JjL3BsdWdpbnMvRnVzZU1lbW9yeVN0b3JlLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9qcy9zcmMvcGx1Z2lucy9GdXNlUnVudGltZS50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0Z1c2VMb2NhdGlvbkFjY3VyYWN5LnRzIiwid2VicGFjazovLy8uLi9zcmMvRnVzZUxvY2F0aW9uRXZlbnRUeXBlLnRzIiwid2VicGFjazovLy8uLi9zcmMvRnVzZUxvY2F0aW9uUGx1Z2luLnRzIiwid2VicGFjazovLy8uLi9zcmMvRnVzZUxvY2F0aW9uUGx1Z2luRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0Z1c2VMb2NhdGlvblN1YnNjcmlwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL2FuZHJvaWQvQW5kcm9pZEZ1c2VMb2NhdGlvblBsdWdpbi50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL2FwaS50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL2lvcy9JT1NGdXNlTG9jYXRpb25QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cblxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXG5cbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xuICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xuICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufVxuXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdDtcbiAgfVxuICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgdFtwXSA9IHNbcF07XG4gIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgfVxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XG4gIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxuICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xuICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XG4gIHZhciBfLCBkb25lID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XG4gICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcbiAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xuICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcbiAgICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XG4gIGRvbmUgPSB0cnVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcbiAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XG4gIH1cbiAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcbiAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxuICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxuICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XG4gIHZhciBpLCBwO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICByZXR1cm4gY29va2VkO1xufTtcblxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgb1tcImRlZmF1bHRcIl0gPSB2O1xufTtcblxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XG4gIG93bktleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiAobykge1xuICAgIHZhciBhciA9IFtdO1xuICAgIGZvciAodmFyIGsgaW4gbykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSkgYXJbYXIubGVuZ3RoXSA9IGs7XG4gICAgcmV0dXJuIGFyO1xuICB9O1xuICByZXR1cm4gb3duS2V5cyhvKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XG4gIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcbiAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcbiAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xuICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcbiAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XG4gIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XG4gICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xuICAgIGlmIChhc3luYykge1xuICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XG4gICAgfVxuICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcbiAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xuICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcbiAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcbiAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xuICB9XG4gIGVsc2UgaWYgKGFzeW5jKSB7XG4gICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcbiAgZnVuY3Rpb24gZmFpbChlKSB7XG4gICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xuICAgIGVudi5oYXNFcnJvciA9IHRydWU7XG4gIH1cbiAgdmFyIHIsIHMgPSAwO1xuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIHdoaWxlIChyID0gZW52LnN0YWNrLnBvcCgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIXIuYXN5bmMgJiYgcyA9PT0gMSkgcmV0dXJuIHMgPSAwLCBlbnYuc3RhY2sucHVzaChyKSwgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihuZXh0KTtcbiAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcbiAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgcyB8PSAxO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZmFpbChlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xuICB9XG4gIHJldHVybiBuZXh0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbihwYXRoLCBwcmVzZXJ2ZUpzeCkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XG4gICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xuICAgICAgICAgIHJldHVybiB0c3ggPyBwcmVzZXJ2ZUpzeCA/IFwiLmpzeFwiIDogXCIuanNcIiA6IGQgJiYgKCFleHQgfHwgIWNtKSA/IG0gOiAoZCArIGV4dCArIFwiLlwiICsgY20udG9Mb3dlckNhc2UoKSArIFwianNcIik7XG4gICAgICB9KTtcbiAgfVxuICByZXR1cm4gcGF0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBfX2V4dGVuZHMsXG4gIF9fYXNzaWduLFxuICBfX3Jlc3QsXG4gIF9fZGVjb3JhdGUsXG4gIF9fcGFyYW0sXG4gIF9fZXNEZWNvcmF0ZSxcbiAgX19ydW5Jbml0aWFsaXplcnMsXG4gIF9fcHJvcEtleSxcbiAgX19zZXRGdW5jdGlvbk5hbWUsXG4gIF9fbWV0YWRhdGEsXG4gIF9fYXdhaXRlcixcbiAgX19nZW5lcmF0b3IsXG4gIF9fY3JlYXRlQmluZGluZyxcbiAgX19leHBvcnRTdGFyLFxuICBfX3ZhbHVlcyxcbiAgX19yZWFkLFxuICBfX3NwcmVhZCxcbiAgX19zcHJlYWRBcnJheXMsXG4gIF9fc3ByZWFkQXJyYXksXG4gIF9fYXdhaXQsXG4gIF9fYXN5bmNHZW5lcmF0b3IsXG4gIF9fYXN5bmNEZWxlZ2F0b3IsXG4gIF9fYXN5bmNWYWx1ZXMsXG4gIF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxuICBfX2ltcG9ydFN0YXIsXG4gIF9faW1wb3J0RGVmYXVsdCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEluLFxuICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcbiAgX19kaXNwb3NlUmVzb3VyY2VzLFxuICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbixcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmVyc2lvbiA9IGV4cG9ydHMudmFsaWRhdGUgPSBleHBvcnRzLnY3ID0gZXhwb3J0cy52NlRvVjEgPSBleHBvcnRzLnY2ID0gZXhwb3J0cy52NSA9IGV4cG9ydHMudjQgPSBleHBvcnRzLnYzID0gZXhwb3J0cy52MVRvVjYgPSBleHBvcnRzLnYxID0gZXhwb3J0cy5zdHJpbmdpZnkgPSBleHBvcnRzLnBhcnNlID0gZXhwb3J0cy5OSUwgPSBleHBvcnRzLk1BWCA9IHZvaWQgMDtcbnZhciBtYXhfanNfMSA9IHJlcXVpcmUoXCIuL21heC5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk1BWFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWF4X2pzXzEuZGVmYXVsdDsgfSB9KTtcbnZhciBuaWxfanNfMSA9IHJlcXVpcmUoXCIuL25pbC5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5JTFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmlsX2pzXzEuZGVmYXVsdDsgfSB9KTtcbnZhciBwYXJzZV9qc18xID0gcmVxdWlyZShcIi4vcGFyc2UuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwYXJzZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFyc2VfanNfMS5kZWZhdWx0OyB9IH0pO1xudmFyIHN0cmluZ2lmeV9qc18xID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyaW5naWZ5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdHJpbmdpZnlfanNfMS5kZWZhdWx0OyB9IH0pO1xudmFyIHYxX2pzXzEgPSByZXF1aXJlKFwiLi92MS5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInYxXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB2MV9qc18xLmRlZmF1bHQ7IH0gfSk7XG52YXIgdjFUb1Y2X2pzXzEgPSByZXF1aXJlKFwiLi92MVRvVjYuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2MVRvVjZcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHYxVG9WNl9qc18xLmRlZmF1bHQ7IH0gfSk7XG52YXIgdjNfanNfMSA9IHJlcXVpcmUoXCIuL3YzLmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHYzX2pzXzEuZGVmYXVsdDsgfSB9KTtcbnZhciB2NF9qc18xID0gcmVxdWlyZShcIi4vdjQuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2NFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdjRfanNfMS5kZWZhdWx0OyB9IH0pO1xudmFyIHY1X2pzXzEgPSByZXF1aXJlKFwiLi92NS5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInY1XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB2NV9qc18xLmRlZmF1bHQ7IH0gfSk7XG52YXIgdjZfanNfMSA9IHJlcXVpcmUoXCIuL3Y2LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjZcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHY2X2pzXzEuZGVmYXVsdDsgfSB9KTtcbnZhciB2NlRvVjFfanNfMSA9IHJlcXVpcmUoXCIuL3Y2VG9WMS5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInY2VG9WMVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdjZUb1YxX2pzXzEuZGVmYXVsdDsgfSB9KTtcbnZhciB2N19qc18xID0gcmVxdWlyZShcIi4vdjcuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2N1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdjdfanNfMS5kZWZhdWx0OyB9IH0pO1xudmFyIHZhbGlkYXRlX2pzXzEgPSByZXF1aXJlKFwiLi92YWxpZGF0ZS5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZhbGlkYXRlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWxpZGF0ZV9qc18xLmRlZmF1bHQ7IH0gfSk7XG52YXIgdmVyc2lvbl9qc18xID0gcmVxdWlyZShcIi4vdmVyc2lvbi5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZlcnNpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZlcnNpb25fanNfMS5kZWZhdWx0OyB9IH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSAnZmZmZmZmZmYtZmZmZi1mZmZmLWZmZmYtZmZmZmZmZmZmZmZmJztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gbWQ1KGJ5dGVzKSB7XG4gICAgY29uc3Qgd29yZHMgPSB1aW50OFRvVWludDMyKGJ5dGVzKTtcbiAgICBjb25zdCBtZDVCeXRlcyA9IHdvcmRzVG9NZDUod29yZHMsIGJ5dGVzLmxlbmd0aCAqIDgpO1xuICAgIHJldHVybiB1aW50MzJUb1VpbnQ4KG1kNUJ5dGVzKTtcbn1cbmZ1bmN0aW9uIHVpbnQzMlRvVWludDgoaW5wdXQpIHtcbiAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGlucHV0Lmxlbmd0aCAqIDQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoICogNDsgaSsrKSB7XG4gICAgICAgIGJ5dGVzW2ldID0gKGlucHV0W2kgPj4gMl0gPj4+ICgoaSAlIDQpICogOCkpICYgMHhmZjtcbiAgICB9XG4gICAgcmV0dXJuIGJ5dGVzO1xufVxuZnVuY3Rpb24gZ2V0T3V0cHV0TGVuZ3RoKGlucHV0TGVuZ3RoOCkge1xuICAgIHJldHVybiAoKChpbnB1dExlbmd0aDggKyA2NCkgPj4+IDkpIDw8IDQpICsgMTQgKyAxO1xufVxuZnVuY3Rpb24gd29yZHNUb01kNSh4LCBsZW4pIHtcbiAgICBjb25zdCB4cGFkID0gbmV3IFVpbnQzMkFycmF5KGdldE91dHB1dExlbmd0aChsZW4pKS5maWxsKDApO1xuICAgIHhwYWQuc2V0KHgpO1xuICAgIHhwYWRbbGVuID4+IDVdIHw9IDB4ODAgPDwgbGVuICUgMzI7XG4gICAgeHBhZFt4cGFkLmxlbmd0aCAtIDFdID0gbGVuO1xuICAgIHggPSB4cGFkO1xuICAgIGxldCBhID0gMTczMjU4NDE5MztcbiAgICBsZXQgYiA9IC0yNzE3MzM4Nzk7XG4gICAgbGV0IGMgPSAtMTczMjU4NDE5NDtcbiAgICBsZXQgZCA9IDI3MTczMzg3ODtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgIGNvbnN0IG9sZGEgPSBhO1xuICAgICAgICBjb25zdCBvbGRiID0gYjtcbiAgICAgICAgY29uc3Qgb2xkYyA9IGM7XG4gICAgICAgIGNvbnN0IG9sZGQgPSBkO1xuICAgICAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpXSwgNywgLTY4MDg3NjkzNik7XG4gICAgICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgICAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE3LCA2MDYxMDU4MTkpO1xuICAgICAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgM10sIDIyLCAtMTA0NDUyNTMzMCk7XG4gICAgICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNywgLTE3NjQxODg5Nyk7XG4gICAgICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA1XSwgMTIsIDEyMDAwODA0MjYpO1xuICAgICAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XG4gICAgICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNywgMTc3MDAzNTQxNik7XG4gICAgICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcbiAgICAgICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XG4gICAgICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDcsIDE4MDQ2MDM2ODIpO1xuICAgICAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICAgICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcbiAgICAgICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsIDEyMzY1MzUzMjkpO1xuICAgICAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApO1xuICAgICAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgNl0sIDksIC0xMDY5NTAxNjMyKTtcbiAgICAgICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsIDY0MzcxNzcxMyk7XG4gICAgICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMik7XG4gICAgICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNSwgLTcwMTU1ODY5MSk7XG4gICAgICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKTtcbiAgICAgICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpO1xuICAgICAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcbiAgICAgICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDldLCA1LCA1Njg0NDY0MzgpO1xuICAgICAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MCk7XG4gICAgICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgICAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgOF0sIDIwLCAxMTYzNTMxNTAxKTtcbiAgICAgICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpO1xuICAgICAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMl0sIDksIC01MTQwMzc4NCk7XG4gICAgICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTQsIDE3MzUzMjg0NzMpO1xuICAgICAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuICAgICAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgNV0sIDQsIC0zNzg1NTgpO1xuICAgICAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XG4gICAgICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE2LCAxODM5MDMwNTYyKTtcbiAgICAgICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDE0XSwgMjMsIC0zNTMwOTU1Nik7XG4gICAgICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNCwgLTE1MzA5OTIwNjApO1xuICAgICAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgNF0sIDExLCAxMjcyODkzMzUzKTtcbiAgICAgICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7XG4gICAgICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDQsIDY4MTI3OTE3NCk7XG4gICAgICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2ldLCAxMSwgLTM1ODUzNzIyMik7XG4gICAgICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xuICAgICAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgNl0sIDIzLCA3NjAyOTE4OSk7XG4gICAgICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNCwgLTY0MDM2NDQ4Nyk7XG4gICAgICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTtcbiAgICAgICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTYsIDUzMDc0MjUyMCk7XG4gICAgICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xuICAgICAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpXSwgNiwgLTE5ODYzMDg0NCk7XG4gICAgICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyA3XSwgMTAsIDExMjY4OTE0MTUpO1xuICAgICAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgICAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgNV0sIDIxLCAtNTc0MzQwNTUpO1xuICAgICAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA2LCAxNzAwNDg1NTcxKTtcbiAgICAgICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xuICAgICAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xuICAgICAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNiwgMTg3MzMxMzM1OSk7XG4gICAgICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpO1xuICAgICAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XG4gICAgICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAxMzA5MTUxNjQ5KTtcbiAgICAgICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA2LCAtMTQ1NTIzMDcwKTtcbiAgICAgICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KTtcbiAgICAgICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNSwgNzE4Nzg3MjU5KTtcbiAgICAgICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDldLCAyMSwgLTM0MzQ4NTU1MSk7XG4gICAgICAgIGEgPSBzYWZlQWRkKGEsIG9sZGEpO1xuICAgICAgICBiID0gc2FmZUFkZChiLCBvbGRiKTtcbiAgICAgICAgYyA9IHNhZmVBZGQoYywgb2xkYyk7XG4gICAgICAgIGQgPSBzYWZlQWRkKGQsIG9sZGQpO1xuICAgIH1cbiAgICByZXR1cm4gVWludDMyQXJyYXkub2YoYSwgYiwgYywgZCk7XG59XG5mdW5jdGlvbiB1aW50OFRvVWludDMyKGlucHV0KSB7XG4gICAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQzMkFycmF5KCk7XG4gICAgfVxuICAgIGNvbnN0IG91dHB1dCA9IG5ldyBVaW50MzJBcnJheShnZXRPdXRwdXRMZW5ndGgoaW5wdXQubGVuZ3RoICogOCkpLmZpbGwoMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgICBvdXRwdXRbaSA+PiAyXSB8PSAoaW5wdXRbaV0gJiAweGZmKSA8PCAoKGkgJSA0KSAqIDgpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuZnVuY3Rpb24gc2FmZUFkZCh4LCB5KSB7XG4gICAgY29uc3QgbHN3ID0gKHggJiAweGZmZmYpICsgKHkgJiAweGZmZmYpO1xuICAgIGNvbnN0IG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICAgIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweGZmZmYpO1xufVxuZnVuY3Rpb24gYml0Um90YXRlTGVmdChudW0sIGNudCkge1xuICAgIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbn1cbmZ1bmN0aW9uIG1kNWNtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gICAgcmV0dXJuIHNhZmVBZGQoYml0Um90YXRlTGVmdChzYWZlQWRkKHNhZmVBZGQoYSwgcSksIHNhZmVBZGQoeCwgdCkpLCBzKSwgYik7XG59XG5mdW5jdGlvbiBtZDVmZihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgcmV0dXJuIG1kNWNtbigoYiAmIGMpIHwgKH5iICYgZCksIGEsIGIsIHgsIHMsIHQpO1xufVxuZnVuY3Rpb24gbWQ1Z2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgIHJldHVybiBtZDVjbW4oKGIgJiBkKSB8IChjICYgfmQpLCBhLCBiLCB4LCBzLCB0KTtcbn1cbmZ1bmN0aW9uIG1kNWhoKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICByZXR1cm4gbWQ1Y21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG59XG5mdW5jdGlvbiBtZDVpaShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgcmV0dXJuIG1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gbWQ1O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0cy5kZWZhdWx0ID0geyByYW5kb21VVUlEIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9ICcwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAnO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB2YWxpZGF0ZV9qc18xID0gcmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIik7XG5mdW5jdGlvbiBwYXJzZSh1dWlkKSB7XG4gICAgaWYgKCEoMCwgdmFsaWRhdGVfanNfMS5kZWZhdWx0KSh1dWlkKSkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICAgIH1cbiAgICBsZXQgdjtcbiAgICByZXR1cm4gVWludDhBcnJheS5vZigodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMCwgOCksIDE2KSkgPj4+IDI0LCAodiA+Pj4gMTYpICYgMHhmZiwgKHYgPj4+IDgpICYgMHhmZiwgdiAmIDB4ZmYsICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSg5LCAxMyksIDE2KSkgPj4+IDgsIHYgJiAweGZmLCAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE4KSwgMTYpKSA+Pj4gOCwgdiAmIDB4ZmYsICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxOSwgMjMpLCAxNikpID4+PiA4LCB2ICYgMHhmZiwgKCh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgyNCwgMzYpLCAxNikpIC8gMHgxMDAwMDAwMDAwMCkgJiAweGZmLCAodiAvIDB4MTAwMDAwMDAwKSAmIDB4ZmYsICh2ID4+PiAyNCkgJiAweGZmLCAodiA+Pj4gMTYpICYgMHhmZiwgKHYgPj4+IDgpICYgMHhmZiwgdiAmIDB4ZmYpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gcGFyc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtOF1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwfGZmZmZmZmZmLWZmZmYtZmZmZi1mZmZmLWZmZmZmZmZmZmZmZikkL2k7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmZ1bmN0aW9uIHJuZygpIHtcbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgICBpZiAodHlwZW9mIGNyeXB0byA9PT0gJ3VuZGVmaW5lZCcgfHwgIWNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBnZXRSYW5kb21WYWx1ZXMgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBybmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGYocywgeCwgeSwgeikge1xuICAgIHN3aXRjaCAocykge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gKHggJiB5KSBeICh+eCAmIHopO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4geCBeIHkgXiB6O1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gKHggJiB5KSBeICh4ICYgeikgXiAoeSAmIHopO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICByZXR1cm4geCBeIHkgXiB6O1xuICAgIH1cbn1cbmZ1bmN0aW9uIFJPVEwoeCwgbikge1xuICAgIHJldHVybiAoeCA8PCBuKSB8ICh4ID4+PiAoMzIgLSBuKSk7XG59XG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gICAgY29uc3QgSyA9IFsweDVhODI3OTk5LCAweDZlZDllYmExLCAweDhmMWJiY2RjLCAweGNhNjJjMWQ2XTtcbiAgICBjb25zdCBIID0gWzB4Njc0NTIzMDEsIDB4ZWZjZGFiODksIDB4OThiYWRjZmUsIDB4MTAzMjU0NzYsIDB4YzNkMmUxZjBdO1xuICAgIGNvbnN0IG5ld0J5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZXMubGVuZ3RoICsgMSk7XG4gICAgbmV3Qnl0ZXMuc2V0KGJ5dGVzKTtcbiAgICBuZXdCeXRlc1tieXRlcy5sZW5ndGhdID0gMHg4MDtcbiAgICBieXRlcyA9IG5ld0J5dGVzO1xuICAgIGNvbnN0IGwgPSBieXRlcy5sZW5ndGggLyA0ICsgMjtcbiAgICBjb25zdCBOID0gTWF0aC5jZWlsKGwgLyAxNik7XG4gICAgY29uc3QgTSA9IG5ldyBBcnJheShOKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE47ICsraSkge1xuICAgICAgICBjb25zdCBhcnIgPSBuZXcgVWludDMyQXJyYXkoMTYpO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDE2OyArK2opIHtcbiAgICAgICAgICAgIGFycltqXSA9XG4gICAgICAgICAgICAgICAgKGJ5dGVzW2kgKiA2NCArIGogKiA0XSA8PCAyNCkgfFxuICAgICAgICAgICAgICAgICAgICAoYnl0ZXNbaSAqIDY0ICsgaiAqIDQgKyAxXSA8PCAxNikgfFxuICAgICAgICAgICAgICAgICAgICAoYnl0ZXNbaSAqIDY0ICsgaiAqIDQgKyAyXSA8PCA4KSB8XG4gICAgICAgICAgICAgICAgICAgIGJ5dGVzW2kgKiA2NCArIGogKiA0ICsgM107XG4gICAgICAgIH1cbiAgICAgICAgTVtpXSA9IGFycjtcbiAgICB9XG4gICAgTVtOIC0gMV1bMTRdID0gKChieXRlcy5sZW5ndGggLSAxKSAqIDgpIC8gTWF0aC5wb3coMiwgMzIpO1xuICAgIE1bTiAtIDFdWzE0XSA9IE1hdGguZmxvb3IoTVtOIC0gMV1bMTRdKTtcbiAgICBNW04gLSAxXVsxNV0gPSAoKGJ5dGVzLmxlbmd0aCAtIDEpICogOCkgJiAweGZmZmZmZmZmO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgKytpKSB7XG4gICAgICAgIGNvbnN0IFcgPSBuZXcgVWludDMyQXJyYXkoODApO1xuICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDE2OyArK3QpIHtcbiAgICAgICAgICAgIFdbdF0gPSBNW2ldW3RdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHQgPSAxNjsgdCA8IDgwOyArK3QpIHtcbiAgICAgICAgICAgIFdbdF0gPSBST1RMKFdbdCAtIDNdIF4gV1t0IC0gOF0gXiBXW3QgLSAxNF0gXiBXW3QgLSAxNl0sIDEpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhID0gSFswXTtcbiAgICAgICAgbGV0IGIgPSBIWzFdO1xuICAgICAgICBsZXQgYyA9IEhbMl07XG4gICAgICAgIGxldCBkID0gSFszXTtcbiAgICAgICAgbGV0IGUgPSBIWzRdO1xuICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDgwOyArK3QpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBNYXRoLmZsb29yKHQgLyAyMCk7XG4gICAgICAgICAgICBjb25zdCBUID0gKFJPVEwoYSwgNSkgKyBmKHMsIGIsIGMsIGQpICsgZSArIEtbc10gKyBXW3RdKSA+Pj4gMDtcbiAgICAgICAgICAgIGUgPSBkO1xuICAgICAgICAgICAgZCA9IGM7XG4gICAgICAgICAgICBjID0gUk9UTChiLCAzMCkgPj4+IDA7XG4gICAgICAgICAgICBiID0gYTtcbiAgICAgICAgICAgIGEgPSBUO1xuICAgICAgICB9XG4gICAgICAgIEhbMF0gPSAoSFswXSArIGEpID4+PiAwO1xuICAgICAgICBIWzFdID0gKEhbMV0gKyBiKSA+Pj4gMDtcbiAgICAgICAgSFsyXSA9IChIWzJdICsgYykgPj4+IDA7XG4gICAgICAgIEhbM10gPSAoSFszXSArIGQpID4+PiAwO1xuICAgICAgICBIWzRdID0gKEhbNF0gKyBlKSA+Pj4gMDtcbiAgICB9XG4gICAgcmV0dXJuIFVpbnQ4QXJyYXkub2YoSFswXSA+PiAyNCwgSFswXSA+PiAxNiwgSFswXSA+PiA4LCBIWzBdLCBIWzFdID4+IDI0LCBIWzFdID4+IDE2LCBIWzFdID4+IDgsIEhbMV0sIEhbMl0gPj4gMjQsIEhbMl0gPj4gMTYsIEhbMl0gPj4gOCwgSFsyXSwgSFszXSA+PiAyNCwgSFszXSA+PiAxNiwgSFszXSA+PiA4LCBIWzNdLCBIWzRdID4+IDI0LCBIWzRdID4+IDE2LCBIWzRdID4+IDgsIEhbNF0pO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gc2hhMTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51bnNhZmVTdHJpbmdpZnkgPSB2b2lkIDA7XG5jb25zdCB2YWxpZGF0ZV9qc18xID0gcmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIik7XG5jb25zdCBieXRlVG9IZXggPSBbXTtcbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAgIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArXG4gICAgICAgIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICtcbiAgICAgICAgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gK1xuICAgICAgICAnLScgK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArXG4gICAgICAgIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICtcbiAgICAgICAgJy0nICtcbiAgICAgICAgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArXG4gICAgICAgICctJyArXG4gICAgICAgIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICtcbiAgICAgICAgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gK1xuICAgICAgICAnLScgK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5leHBvcnRzLnVuc2FmZVN0cmluZ2lmeSA9IHVuc2FmZVN0cmluZ2lmeTtcbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTtcbiAgICBpZiAoISgwLCB2YWxpZGF0ZV9qc18xLmRlZmF1bHQpKHV1aWQpKSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gICAgfVxuICAgIHJldHVybiB1dWlkO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gc3RyaW5naWZ5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVwZGF0ZVYxU3RhdGUgPSB2b2lkIDA7XG5jb25zdCBybmdfanNfMSA9IHJlcXVpcmUoXCIuL3JuZy5qc1wiKTtcbmNvbnN0IHN0cmluZ2lmeV9qc18xID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuY29uc3QgX3N0YXRlID0ge307XG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIGxldCBieXRlcztcbiAgICBjb25zdCBpc1Y2ID0gb3B0aW9ucz8uX3Y2ID8/IGZhbHNlO1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnNLZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gICAgICAgIGlmIChvcHRpb25zS2V5cy5sZW5ndGggPT09IDEgJiYgb3B0aW9uc0tleXNbMF0gPT09ICdfdjYnKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIGJ5dGVzID0gdjFCeXRlcyhvcHRpb25zLnJhbmRvbSA/PyBvcHRpb25zLnJuZz8uKCkgPz8gKDAsIHJuZ19qc18xLmRlZmF1bHQpKCksIG9wdGlvbnMubXNlY3MsIG9wdGlvbnMubnNlY3MsIG9wdGlvbnMuY2xvY2tzZXEsIG9wdGlvbnMubm9kZSwgYnVmLCBvZmZzZXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3Qgcm5kcyA9ICgwLCBybmdfanNfMS5kZWZhdWx0KSgpO1xuICAgICAgICB1cGRhdGVWMVN0YXRlKF9zdGF0ZSwgbm93LCBybmRzKTtcbiAgICAgICAgYnl0ZXMgPSB2MUJ5dGVzKHJuZHMsIF9zdGF0ZS5tc2VjcywgX3N0YXRlLm5zZWNzLCBpc1Y2ID8gdW5kZWZpbmVkIDogX3N0YXRlLmNsb2Nrc2VxLCBpc1Y2ID8gdW5kZWZpbmVkIDogX3N0YXRlLm5vZGUsIGJ1Ziwgb2Zmc2V0KTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZiA/PyAoMCwgc3RyaW5naWZ5X2pzXzEudW5zYWZlU3RyaW5naWZ5KShieXRlcyk7XG59XG5mdW5jdGlvbiB1cGRhdGVWMVN0YXRlKHN0YXRlLCBub3csIHJuZHMpIHtcbiAgICBzdGF0ZS5tc2VjcyA/Pz0gLUluZmluaXR5O1xuICAgIHN0YXRlLm5zZWNzID8/PSAwO1xuICAgIGlmIChub3cgPT09IHN0YXRlLm1zZWNzKSB7XG4gICAgICAgIHN0YXRlLm5zZWNzKys7XG4gICAgICAgIGlmIChzdGF0ZS5uc2VjcyA+PSAxMDAwMCkge1xuICAgICAgICAgICAgc3RhdGUubm9kZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHN0YXRlLm5zZWNzID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChub3cgPiBzdGF0ZS5tc2Vjcykge1xuICAgICAgICBzdGF0ZS5uc2VjcyA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vdyA8IHN0YXRlLm1zZWNzKSB7XG4gICAgICAgIHN0YXRlLm5vZGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICghc3RhdGUubm9kZSkge1xuICAgICAgICBzdGF0ZS5ub2RlID0gcm5kcy5zbGljZSgxMCwgMTYpO1xuICAgICAgICBzdGF0ZS5ub2RlWzBdIHw9IDB4MDE7XG4gICAgICAgIHN0YXRlLmNsb2Nrc2VxID0gKChybmRzWzhdIDw8IDgpIHwgcm5kc1s5XSkgJiAweDNmZmY7XG4gICAgfVxuICAgIHN0YXRlLm1zZWNzID0gbm93O1xuICAgIHJldHVybiBzdGF0ZTtcbn1cbmV4cG9ydHMudXBkYXRlVjFTdGF0ZSA9IHVwZGF0ZVYxU3RhdGU7XG5mdW5jdGlvbiB2MUJ5dGVzKHJuZHMsIG1zZWNzLCBuc2VjcywgY2xvY2tzZXEsIG5vZGUsIGJ1Ziwgb2Zmc2V0ID0gMCkge1xuICAgIGlmIChybmRzLmxlbmd0aCA8IDE2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmFuZG9tIGJ5dGVzIGxlbmd0aCBtdXN0IGJlID49IDE2Jyk7XG4gICAgfVxuICAgIGlmICghYnVmKSB7XG4gICAgICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IG9mZnNldCArIDE2ID4gYnVmLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYFVVSUQgYnl0ZSByYW5nZSAke29mZnNldH06JHtvZmZzZXQgKyAxNX0gaXMgb3V0IG9mIGJ1ZmZlciBib3VuZHNgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtc2VjcyA/Pz0gRGF0ZS5ub3coKTtcbiAgICBuc2VjcyA/Pz0gMDtcbiAgICBjbG9ja3NlcSA/Pz0gKChybmRzWzhdIDw8IDgpIHwgcm5kc1s5XSkgJiAweDNmZmY7XG4gICAgbm9kZSA/Pz0gcm5kcy5zbGljZSgxMCwgMTYpO1xuICAgIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuICAgIGNvbnN0IHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICAgIGJ1ZltvZmZzZXQrK10gPSAodGwgPj4+IDI0KSAmIDB4ZmY7XG4gICAgYnVmW29mZnNldCsrXSA9ICh0bCA+Pj4gMTYpICYgMHhmZjtcbiAgICBidWZbb2Zmc2V0KytdID0gKHRsID4+PiA4KSAmIDB4ZmY7XG4gICAgYnVmW29mZnNldCsrXSA9IHRsICYgMHhmZjtcbiAgICBjb25zdCB0bWggPSAoKG1zZWNzIC8gMHgxMDAwMDAwMDApICogMTAwMDApICYgMHhmZmZmZmZmO1xuICAgIGJ1ZltvZmZzZXQrK10gPSAodG1oID4+PiA4KSAmIDB4ZmY7XG4gICAgYnVmW29mZnNldCsrXSA9IHRtaCAmIDB4ZmY7XG4gICAgYnVmW29mZnNldCsrXSA9ICgodG1oID4+PiAyNCkgJiAweGYpIHwgMHgxMDtcbiAgICBidWZbb2Zmc2V0KytdID0gKHRtaCA+Pj4gMTYpICYgMHhmZjtcbiAgICBidWZbb2Zmc2V0KytdID0gKGNsb2Nrc2VxID4+PiA4KSB8IDB4ODA7XG4gICAgYnVmW29mZnNldCsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcbiAgICBmb3IgKGxldCBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgICAgICBidWZbb2Zmc2V0KytdID0gbm9kZVtuXTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1Zjtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHYxO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBwYXJzZV9qc18xID0gcmVxdWlyZShcIi4vcGFyc2UuanNcIik7XG5jb25zdCBzdHJpbmdpZnlfanNfMSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcbmZ1bmN0aW9uIHYxVG9WNih1dWlkKSB7XG4gICAgY29uc3QgdjFCeXRlcyA9IHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyA/ICgwLCBwYXJzZV9qc18xLmRlZmF1bHQpKHV1aWQpIDogdXVpZDtcbiAgICBjb25zdCB2NkJ5dGVzID0gX3YxVG9WNih2MUJ5dGVzKTtcbiAgICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnID8gKDAsIHN0cmluZ2lmeV9qc18xLnVuc2FmZVN0cmluZ2lmeSkodjZCeXRlcykgOiB2NkJ5dGVzO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gdjFUb1Y2O1xuZnVuY3Rpb24gX3YxVG9WNih2MUJ5dGVzKSB7XG4gICAgcmV0dXJuIFVpbnQ4QXJyYXkub2YoKCh2MUJ5dGVzWzZdICYgMHgwZikgPDwgNCkgfCAoKHYxQnl0ZXNbN10gPj4gNCkgJiAweDBmKSwgKCh2MUJ5dGVzWzddICYgMHgwZikgPDwgNCkgfCAoKHYxQnl0ZXNbNF0gJiAweGYwKSA+PiA0KSwgKCh2MUJ5dGVzWzRdICYgMHgwZikgPDwgNCkgfCAoKHYxQnl0ZXNbNV0gJiAweGYwKSA+PiA0KSwgKCh2MUJ5dGVzWzVdICYgMHgwZikgPDwgNCkgfCAoKHYxQnl0ZXNbMF0gJiAweGYwKSA+PiA0KSwgKCh2MUJ5dGVzWzBdICYgMHgwZikgPDwgNCkgfCAoKHYxQnl0ZXNbMV0gJiAweGYwKSA+PiA0KSwgKCh2MUJ5dGVzWzFdICYgMHgwZikgPDwgNCkgfCAoKHYxQnl0ZXNbMl0gJiAweGYwKSA+PiA0KSwgMHg2MCB8ICh2MUJ5dGVzWzJdICYgMHgwZiksIHYxQnl0ZXNbM10sIHYxQnl0ZXNbOF0sIHYxQnl0ZXNbOV0sIHYxQnl0ZXNbMTBdLCB2MUJ5dGVzWzExXSwgdjFCeXRlc1sxMl0sIHYxQnl0ZXNbMTNdLCB2MUJ5dGVzWzE0XSwgdjFCeXRlc1sxNV0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVSTCA9IGV4cG9ydHMuRE5TID0gdm9pZCAwO1xuY29uc3QgbWQ1X2pzXzEgPSByZXF1aXJlKFwiLi9tZDUuanNcIik7XG5jb25zdCB2MzVfanNfMSA9IHJlcXVpcmUoXCIuL3YzNS5qc1wiKTtcbnZhciB2MzVfanNfMiA9IHJlcXVpcmUoXCIuL3YzNS5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkROU1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdjM1X2pzXzIuRE5TOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVVJMXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB2MzVfanNfMi5VUkw7IH0gfSk7XG5mdW5jdGlvbiB2Myh2YWx1ZSwgbmFtZXNwYWNlLCBidWYsIG9mZnNldCkge1xuICAgIHJldHVybiAoMCwgdjM1X2pzXzEuZGVmYXVsdCkoMHgzMCwgbWQ1X2pzXzEuZGVmYXVsdCwgdmFsdWUsIG5hbWVzcGFjZSwgYnVmLCBvZmZzZXQpO1xufVxudjMuRE5TID0gdjM1X2pzXzEuRE5TO1xudjMuVVJMID0gdjM1X2pzXzEuVVJMO1xuZXhwb3J0cy5kZWZhdWx0ID0gdjM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVVJMID0gZXhwb3J0cy5ETlMgPSBleHBvcnRzLnN0cmluZ1RvQnl0ZXMgPSB2b2lkIDA7XG5jb25zdCBwYXJzZV9qc18xID0gcmVxdWlyZShcIi4vcGFyc2UuanNcIik7XG5jb25zdCBzdHJpbmdpZnlfanNfMSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcbmZ1bmN0aW9uIHN0cmluZ1RvQnl0ZXMoc3RyKSB7XG4gICAgc3RyID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpO1xuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoc3RyLmxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgYnl0ZXNbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ5dGVzO1xufVxuZXhwb3J0cy5zdHJpbmdUb0J5dGVzID0gc3RyaW5nVG9CeXRlcztcbmV4cG9ydHMuRE5TID0gJzZiYTdiODEwLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnRzLlVSTCA9ICc2YmE3YjgxMS05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZnVuY3Rpb24gdjM1KHZlcnNpb24sIGhhc2gsIHZhbHVlLCBuYW1lc3BhY2UsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgY29uc3QgdmFsdWVCeXRlcyA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBzdHJpbmdUb0J5dGVzKHZhbHVlKSA6IHZhbHVlO1xuICAgIGNvbnN0IG5hbWVzcGFjZUJ5dGVzID0gdHlwZW9mIG5hbWVzcGFjZSA9PT0gJ3N0cmluZycgPyAoMCwgcGFyc2VfanNfMS5kZWZhdWx0KShuYW1lc3BhY2UpIDogbmFtZXNwYWNlO1xuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgICBuYW1lc3BhY2UgPSAoMCwgcGFyc2VfanNfMS5kZWZhdWx0KShuYW1lc3BhY2UpO1xuICAgIH1cbiAgICBpZiAobmFtZXNwYWNlPy5sZW5ndGggIT09IDE2KSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcignTmFtZXNwYWNlIG11c3QgYmUgYXJyYXktbGlrZSAoMTYgaXRlcmFibGUgaW50ZWdlciB2YWx1ZXMsIDAtMjU1KScpO1xuICAgIH1cbiAgICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheSgxNiArIHZhbHVlQnl0ZXMubGVuZ3RoKTtcbiAgICBieXRlcy5zZXQobmFtZXNwYWNlQnl0ZXMpO1xuICAgIGJ5dGVzLnNldCh2YWx1ZUJ5dGVzLCBuYW1lc3BhY2VCeXRlcy5sZW5ndGgpO1xuICAgIGJ5dGVzID0gaGFzaChieXRlcyk7XG4gICAgYnl0ZXNbNl0gPSAoYnl0ZXNbNl0gJiAweDBmKSB8IHZlcnNpb247XG4gICAgYnl0ZXNbOF0gPSAoYnl0ZXNbOF0gJiAweDNmKSB8IDB4ODA7XG4gICAgaWYgKGJ1Zikge1xuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICAgICAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlc1tpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH1cbiAgICByZXR1cm4gKDAsIHN0cmluZ2lmeV9qc18xLnVuc2FmZVN0cmluZ2lmeSkoYnl0ZXMpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gdjM1O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBuYXRpdmVfanNfMSA9IHJlcXVpcmUoXCIuL25hdGl2ZS5qc1wiKTtcbmNvbnN0IHJuZ19qc18xID0gcmVxdWlyZShcIi4vcm5nLmpzXCIpO1xuY29uc3Qgc3RyaW5naWZ5X2pzXzEgPSByZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIik7XG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIGlmIChuYXRpdmVfanNfMS5kZWZhdWx0LnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmF0aXZlX2pzXzEuZGVmYXVsdC5yYW5kb21VVUlEKCk7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSA/PyBvcHRpb25zLnJuZz8uKCkgPz8gKDAsIHJuZ19qc18xLmRlZmF1bHQpKCk7XG4gICAgaWYgKHJuZHMubGVuZ3RoIDwgMTYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSYW5kb20gYnl0ZXMgbGVuZ3RoIG11c3QgYmUgPj0gMTYnKTtcbiAgICB9XG4gICAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICAgIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcbiAgICBpZiAoYnVmKSB7XG4gICAgICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAxNiA+IGJ1Zi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBVVUlEIGJ5dGUgcmFuZ2UgJHtvZmZzZXR9OiR7b2Zmc2V0ICsgMTV9IGlzIG91dCBvZiBidWZmZXIgYm91bmRzYCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICAgICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuICAgIHJldHVybiAoMCwgc3RyaW5naWZ5X2pzXzEudW5zYWZlU3RyaW5naWZ5KShybmRzKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHY0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVSTCA9IGV4cG9ydHMuRE5TID0gdm9pZCAwO1xuY29uc3Qgc2hhMV9qc18xID0gcmVxdWlyZShcIi4vc2hhMS5qc1wiKTtcbmNvbnN0IHYzNV9qc18xID0gcmVxdWlyZShcIi4vdjM1LmpzXCIpO1xudmFyIHYzNV9qc18yID0gcmVxdWlyZShcIi4vdjM1LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRE5TXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB2MzVfanNfMi5ETlM7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJVUkxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHYzNV9qc18yLlVSTDsgfSB9KTtcbmZ1bmN0aW9uIHY1KHZhbHVlLCBuYW1lc3BhY2UsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgcmV0dXJuICgwLCB2MzVfanNfMS5kZWZhdWx0KSgweDUwLCBzaGExX2pzXzEuZGVmYXVsdCwgdmFsdWUsIG5hbWVzcGFjZSwgYnVmLCBvZmZzZXQpO1xufVxudjUuRE5TID0gdjM1X2pzXzEuRE5TO1xudjUuVVJMID0gdjM1X2pzXzEuVVJMO1xuZXhwb3J0cy5kZWZhdWx0ID0gdjU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHN0cmluZ2lmeV9qc18xID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuY29uc3QgdjFfanNfMSA9IHJlcXVpcmUoXCIuL3YxLmpzXCIpO1xuY29uc3QgdjFUb1Y2X2pzXzEgPSByZXF1aXJlKFwiLi92MVRvVjYuanNcIik7XG5mdW5jdGlvbiB2NihvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIG9wdGlvbnMgPz89IHt9O1xuICAgIG9mZnNldCA/Pz0gMDtcbiAgICBsZXQgYnl0ZXMgPSAoMCwgdjFfanNfMS5kZWZhdWx0KSh7IC4uLm9wdGlvbnMsIF92NjogdHJ1ZSB9LCBuZXcgVWludDhBcnJheSgxNikpO1xuICAgIGJ5dGVzID0gKDAsIHYxVG9WNl9qc18xLmRlZmF1bHQpKGJ5dGVzKTtcbiAgICBpZiAoYnVmKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgICAgICAgICAgYnVmW29mZnNldCArIGldID0gYnl0ZXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG4gICAgcmV0dXJuICgwLCBzdHJpbmdpZnlfanNfMS51bnNhZmVTdHJpbmdpZnkpKGJ5dGVzKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHY2O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBwYXJzZV9qc18xID0gcmVxdWlyZShcIi4vcGFyc2UuanNcIik7XG5jb25zdCBzdHJpbmdpZnlfanNfMSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcbmZ1bmN0aW9uIHY2VG9WMSh1dWlkKSB7XG4gICAgY29uc3QgdjZCeXRlcyA9IHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyA/ICgwLCBwYXJzZV9qc18xLmRlZmF1bHQpKHV1aWQpIDogdXVpZDtcbiAgICBjb25zdCB2MUJ5dGVzID0gX3Y2VG9WMSh2NkJ5dGVzKTtcbiAgICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnID8gKDAsIHN0cmluZ2lmeV9qc18xLnVuc2FmZVN0cmluZ2lmeSkodjFCeXRlcykgOiB2MUJ5dGVzO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gdjZUb1YxO1xuZnVuY3Rpb24gX3Y2VG9WMSh2NkJ5dGVzKSB7XG4gICAgcmV0dXJuIFVpbnQ4QXJyYXkub2YoKCh2NkJ5dGVzWzNdICYgMHgwZikgPDwgNCkgfCAoKHY2Qnl0ZXNbNF0gPj4gNCkgJiAweDBmKSwgKCh2NkJ5dGVzWzRdICYgMHgwZikgPDwgNCkgfCAoKHY2Qnl0ZXNbNV0gJiAweGYwKSA+PiA0KSwgKCh2NkJ5dGVzWzVdICYgMHgwZikgPDwgNCkgfCAodjZCeXRlc1s2XSAmIDB4MGYpLCB2NkJ5dGVzWzddLCAoKHY2Qnl0ZXNbMV0gJiAweDBmKSA8PCA0KSB8ICgodjZCeXRlc1syXSAmIDB4ZjApID4+IDQpLCAoKHY2Qnl0ZXNbMl0gJiAweDBmKSA8PCA0KSB8ICgodjZCeXRlc1szXSAmIDB4ZjApID4+IDQpLCAweDEwIHwgKCh2NkJ5dGVzWzBdICYgMHhmMCkgPj4gNCksICgodjZCeXRlc1swXSAmIDB4MGYpIDw8IDQpIHwgKCh2NkJ5dGVzWzFdICYgMHhmMCkgPj4gNCksIHY2Qnl0ZXNbOF0sIHY2Qnl0ZXNbOV0sIHY2Qnl0ZXNbMTBdLCB2NkJ5dGVzWzExXSwgdjZCeXRlc1sxMl0sIHY2Qnl0ZXNbMTNdLCB2NkJ5dGVzWzE0XSwgdjZCeXRlc1sxNV0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVwZGF0ZVY3U3RhdGUgPSB2b2lkIDA7XG5jb25zdCBybmdfanNfMSA9IHJlcXVpcmUoXCIuL3JuZy5qc1wiKTtcbmNvbnN0IHN0cmluZ2lmeV9qc18xID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuY29uc3QgX3N0YXRlID0ge307XG5mdW5jdGlvbiB2NyhvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIGxldCBieXRlcztcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBieXRlcyA9IHY3Qnl0ZXMob3B0aW9ucy5yYW5kb20gPz8gb3B0aW9ucy5ybmc/LigpID8/ICgwLCBybmdfanNfMS5kZWZhdWx0KSgpLCBvcHRpb25zLm1zZWNzLCBvcHRpb25zLnNlcSwgYnVmLCBvZmZzZXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3Qgcm5kcyA9ICgwLCBybmdfanNfMS5kZWZhdWx0KSgpO1xuICAgICAgICB1cGRhdGVWN1N0YXRlKF9zdGF0ZSwgbm93LCBybmRzKTtcbiAgICAgICAgYnl0ZXMgPSB2N0J5dGVzKHJuZHMsIF9zdGF0ZS5tc2VjcywgX3N0YXRlLnNlcSwgYnVmLCBvZmZzZXQpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmID8/ICgwLCBzdHJpbmdpZnlfanNfMS51bnNhZmVTdHJpbmdpZnkpKGJ5dGVzKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVY3U3RhdGUoc3RhdGUsIG5vdywgcm5kcykge1xuICAgIHN0YXRlLm1zZWNzID8/PSAtSW5maW5pdHk7XG4gICAgc3RhdGUuc2VxID8/PSAwO1xuICAgIGlmIChub3cgPiBzdGF0ZS5tc2Vjcykge1xuICAgICAgICBzdGF0ZS5zZXEgPSAocm5kc1s2XSA8PCAyMykgfCAocm5kc1s3XSA8PCAxNikgfCAocm5kc1s4XSA8PCA4KSB8IHJuZHNbOV07XG4gICAgICAgIHN0YXRlLm1zZWNzID0gbm93O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUuc2VxID0gKHN0YXRlLnNlcSArIDEpIHwgMDtcbiAgICAgICAgaWYgKHN0YXRlLnNlcSA9PT0gMCkge1xuICAgICAgICAgICAgc3RhdGUubXNlY3MrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG59XG5leHBvcnRzLnVwZGF0ZVY3U3RhdGUgPSB1cGRhdGVWN1N0YXRlO1xuZnVuY3Rpb24gdjdCeXRlcyhybmRzLCBtc2Vjcywgc2VxLCBidWYsIG9mZnNldCA9IDApIHtcbiAgICBpZiAocm5kcy5sZW5ndGggPCAxNikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JhbmRvbSBieXRlcyBsZW5ndGggbXVzdCBiZSA+PSAxNicpO1xuICAgIH1cbiAgICBpZiAoIWJ1Zikge1xuICAgICAgICBidWYgPSBuZXcgVWludDhBcnJheSgxNik7XG4gICAgICAgIG9mZnNldCA9IDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgKyAxNiA+IGJ1Zi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBVVUlEIGJ5dGUgcmFuZ2UgJHtvZmZzZXR9OiR7b2Zmc2V0ICsgMTV9IGlzIG91dCBvZiBidWZmZXIgYm91bmRzYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbXNlY3MgPz89IERhdGUubm93KCk7XG4gICAgc2VxID8/PSAoKHJuZHNbNl0gKiAweDdmKSA8PCAyNCkgfCAocm5kc1s3XSA8PCAxNikgfCAocm5kc1s4XSA8PCA4KSB8IHJuZHNbOV07XG4gICAgYnVmW29mZnNldCsrXSA9IChtc2VjcyAvIDB4MTAwMDAwMDAwMDApICYgMHhmZjtcbiAgICBidWZbb2Zmc2V0KytdID0gKG1zZWNzIC8gMHgxMDAwMDAwMDApICYgMHhmZjtcbiAgICBidWZbb2Zmc2V0KytdID0gKG1zZWNzIC8gMHgxMDAwMDAwKSAmIDB4ZmY7XG4gICAgYnVmW29mZnNldCsrXSA9IChtc2VjcyAvIDB4MTAwMDApICYgMHhmZjtcbiAgICBidWZbb2Zmc2V0KytdID0gKG1zZWNzIC8gMHgxMDApICYgMHhmZjtcbiAgICBidWZbb2Zmc2V0KytdID0gbXNlY3MgJiAweGZmO1xuICAgIGJ1ZltvZmZzZXQrK10gPSAweDcwIHwgKChzZXEgPj4+IDI4KSAmIDB4MGYpO1xuICAgIGJ1ZltvZmZzZXQrK10gPSAoc2VxID4+PiAyMCkgJiAweGZmO1xuICAgIGJ1ZltvZmZzZXQrK10gPSAweDgwIHwgKChzZXEgPj4+IDE0KSAmIDB4M2YpO1xuICAgIGJ1ZltvZmZzZXQrK10gPSAoc2VxID4+PiA2KSAmIDB4ZmY7XG4gICAgYnVmW29mZnNldCsrXSA9ICgoc2VxIDw8IDIpICYgMHhmZikgfCAocm5kc1sxMF0gJiAweDAzKTtcbiAgICBidWZbb2Zmc2V0KytdID0gcm5kc1sxMV07XG4gICAgYnVmW29mZnNldCsrXSA9IHJuZHNbMTJdO1xuICAgIGJ1ZltvZmZzZXQrK10gPSBybmRzWzEzXTtcbiAgICBidWZbb2Zmc2V0KytdID0gcm5kc1sxNF07XG4gICAgYnVmW29mZnNldCsrXSA9IHJuZHNbMTVdO1xuICAgIHJldHVybiBidWY7XG59XG5leHBvcnRzLmRlZmF1bHQgPSB2NztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVnZXhfanNfMSA9IHJlcXVpcmUoXCIuL3JlZ2V4LmpzXCIpO1xuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICAgIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgcmVnZXhfanNfMS5kZWZhdWx0LnRlc3QodXVpZCk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSB2YWxpZGF0ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdmFsaWRhdGVfanNfMSA9IHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpO1xuZnVuY3Rpb24gdmVyc2lvbih1dWlkKSB7XG4gICAgaWYgKCEoMCwgdmFsaWRhdGVfanNfMS5kZWZhdWx0KSh1dWlkKSkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VJbnQodXVpZC5zbGljZSgxNCwgMTUpLCAxNik7XG59XG5leHBvcnRzLmRlZmF1bHQgPSB2ZXJzaW9uO1xuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge0Z1c2VBUEl9IGZyb20gJy4vRnVzZUFQSSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vUGxhdGZvcm0nO1xuXG4vKipcbiAqIEFuIGZhY3RvcnkgY2xhc3MgdGhhdCBkZWZpbmVzIHRoZSBiYXNlIHNpZ25hdHVyZSBmb3IgY3JlYXRpbmcgYSBGdXNlQVBJIGJyaWRnZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudCBhIGNyZWF0ZSBBUEkgdGhhdCByZXR1cm5zIGEgRnVzZUFQSSBmb3IgdGhlIGdpdmVuIFBsYXRmb3JtXG4gICAgICogXG4gICAgICogQHBhcmFtIHBsYXRmb3JtIC0gVGhlIGN1cnJlbnQgcGxhdGZvcm0gcnVudGltZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBjcmVhdGUocGxhdGZvcm06IFBsYXRmb3JtKTogRnVzZUFQSTtcbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgSUZ1c2VMb2dnZXIgfSBmcm9tIFwiLi9JRnVzZUxvZ2dlclwiO1xuXG4vKipcbiAqIEFuIEZ1c2VMb2dnZXIgZmFjdG9yeSBmb3IgY3JlYXRpbmcgbG9nZ2luZyBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5IHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50IHRvIGNyZWF0ZSBhIEZ1c2VMb2dnZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgY3JlYXRlKCk6IElGdXNlTG9nZ2VyO1xufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vKipcbiAqIFNvbWUgY29tbW9uIGRhdGEgdHlwZXNcbiAqL1xuZXhwb3J0IGVudW0gQ29udGVudFR5cGUge1xuICAgIFRFWFQgICAgICAgICAgICA9ICd0ZXh0L3BsYWluJyxcbiAgICBKU09OICAgICAgICAgICAgPSAnYXBwbGljYXRpb24vanNvbicsXG4gICAgSkFWQVNDUklQVCAgICAgID0gJ3RleHQvamF2YXNjcmlwdCcsIC8vIFJGQyA5MjM5XG4gICAgV0FTTSAgICAgICAgICAgID0gJ2FwcGxpY2F0aW9uL3dhc20nLFxuICAgIEJJTkFSWSAgICAgICAgICA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nXG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IEZ1c2VBUElSZXNwb25zZSB9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmltcG9ydCB7IFRTZXJpYWxpemFibGUgfSBmcm9tICcuL1RTZXJpYWxpemFibGUnO1xuaW1wb3J0IHsgRnVzZVNlcmlhbGl6ZXIgfSBmcm9tICcuL0Z1c2VTZXJpYWxpemVyJztcbmltcG9ydCB7IEZ1c2VDYWxsYmFja01hbmFnZXIsIFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyIH0gZnJvbSAnLi9GdXNlQ2FsbGJhY2tNYW5hZ2VyJztcblxuLyoqXG4gKiBHZW5lcmljIEFQSSByZXNwb25zZSBkYXRhIHR5cGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBURnVzZUFQSVJlc3BvbnNlRGF0YSB7XG4gICAga2VlcDogYm9vbGVhbjtcbiAgICBkYXRhPzogQmxvYjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRnVzZUFQSUNhbGxQYWNrZXQge1xuICAgIHJvdXRlOiBzdHJpbmc7XG4gICAgY2FsbGJhY2tJRDogc3RyaW5nO1xuICAgIGJvZHk6IEJsb2I7XG4gICAgY29udGVudFR5cGU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciB0aGUgRnVzZSBBUEkgYnJpZGdlIGZvciBleGNoYW5naW5nIGRhdGEgd2l0aCB0aGUgbmF0aXZlIHBsYXRmb3JtXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGdXNlQVBJIHtcblxuICAgIHByaXZhdGUgJHNlcmlhbGl6ZXI6IEZ1c2VTZXJpYWxpemVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLiRzZXJpYWxpemVyID0gdGhpcy5fY3JlYXRlU2VyaWFsaXplcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY3JlYXRlU2VyaWFsaXplcigpOiBGdXNlU2VyaWFsaXplciB7XG4gICAgICAgIHJldHVybiBuZXcgRnVzZVNlcmlhbGl6ZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2VyaWFsaXplcigpOiBGdXNlU2VyaWFsaXplciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzZXJpYWxpemVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRvIGltcGxlbWVudCBleGVjdXRlIG5hdGl2ZSBicmlkZ2UgbG9naWNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gcGx1Z2luSUQgLSBUaGUgcGx1Z2luIElEXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIEFQSSBtZXRob2RcbiAgICAgKiBAcGFyYW0gYXJncyAtIEFQSSBhcmd1bWVudHMgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF9leGVjdXRlKHBsdWdpbklEOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBjb250ZW50VHlwZTogc3RyaW5nLCBhcmdzOiBCbG9iKTogUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+O1xuXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVSb3V0ZShwbHVnaW5JRDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgL2FwaS8ke3BsdWdpbklEfSR7bWV0aG9kfWA7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGV4ZWN1dGUocGx1Z2luSUQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGNvbnRlbnRUeXBlOiBzdHJpbmcsIGFyZ3M6IFRTZXJpYWxpemFibGUpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhlY3V0ZShwbHVnaW5JRCwgbWV0aG9kLCBjb250ZW50VHlwZSwgdGhpcy4kc2VyaWFsaXplci5zZXJpYWxpemUoYXJncykpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDYWxsYmFja0NvbnRleHQoY2I6IFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEZ1c2VDYWxsYmFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVDYWxsYmFjayhjYik7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbGVhc2VDYWxsYmFjayhpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIEZ1c2VDYWxsYmFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlQ2FsbGJhY2soaWQpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gJy4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5pbXBvcnQgeyBGdXNlQVBJIH0gZnJvbSAnLi9GdXNlQVBJJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9QbGF0Zm9ybSc7XG5pbXBvcnQgeyBJT1NTY2hlbWVGdXNlQVBJIH0gZnJvbSBcIi4vaW9zL0lPU1NjaGVtZUZ1c2VBUElcIjtcbmltcG9ydCB7IEFuZHJvaWRTY2hlbWVGdXNlQVBJIH0gZnJvbSAnLi9hbmRyb2lkL0FuZHJvaWRTY2hlbWVGdXNlQVBJJztcblxuLyoqXG4gKiBBIEZ1c2VBUEkgZmFjdG9yeSB0aGF0IHVzZXMgdGhlIEhUVFAvYXBwIHNjaGVtZSBhcyB0aGUgYnJpZGdlLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZUFQSUZhY3RvcnkgZXh0ZW5kcyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcbiAgICBcbiAgICBwcml2YXRlICRpb3NTY2hlbWU6IEZ1c2VBUEk7XG4gICAgcHJpdmF0ZSAkYW5kcm9pZFNjaGVtZTogRnVzZUFQSTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBSZWFsaXN0aWNhbGx5IHRoZXJlIHdpbGwgb25seSBiZSBvbmUgb3IgdGhlIG90aGVyIHNldC5cbiAgICAgICAgdGhpcy4kaW9zU2NoZW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy4kYW5kcm9pZFNjaGVtZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIG92ZXJyaWRlIGNyZWF0ZShwbGF0Zm9ybTogUGxhdGZvcm0pOiBGdXNlQVBJIHtcbiAgICAgICAgc3dpdGNoIChwbGF0Zm9ybSkge1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5JT1M6IHJldHVybiB0aGlzLl9jcmVhdGVpT1NBUEkoKTtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uQU5EUk9JRDogcmV0dXJuIHRoaXMuX2NyZWF0ZUFuZHJvaWRBUEkoKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgcGxhdGZvcm06ICcgKyBwbGF0Zm9ybSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZWlPU0FQSSgpOiBGdXNlQVBJIHtcbiAgICAgICAgaWYgKCF0aGlzLiRpb3NTY2hlbWUpIHtcbiAgICAgICAgICAgIHRoaXMuJGlvc1NjaGVtZSA9IG5ldyBJT1NTY2hlbWVGdXNlQVBJKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJGlvc1NjaGVtZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZUFuZHJvaWRBUEkoKTogRnVzZUFQSSB7XG4gICAgICAgIGlmICghdGhpcy4kYW5kcm9pZFNjaGVtZSkge1xuICAgICAgICAgICAgdGhpcy4kYW5kcm9pZFNjaGVtZSA9IG5ldyBBbmRyb2lkU2NoZW1lRnVzZUFQSSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLiRhbmRyb2lkU2NoZW1lO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgRnVzZVJlc3BvbnNlUmVhZGVyIH0gZnJvbSBcIi4vRnVzZVJlc3BvbnNlUmVhZGVyXCI7XG5pbXBvcnQgeyBGdXNlRXJyb3IsIElGdXNlRXJyb3JTZXJpYWxpemVkIH0gZnJvbSAnLi9GdXNlRXJyb3InO1xuXG5leHBvcnQgY2xhc3MgRnVzZUFQSVJlc3BvbnNlIHtcbiAgICBwcml2YXRlICRjb250ZW50OiBBcnJheUJ1ZmZlcjtcbiAgICBwcml2YXRlICRoZWFkZXJzOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG4gICAgcHJpdmF0ZSAkc3RhdHVzOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29udGVudDogQXJyYXlCdWZmZXIsIGhlYWRlcnM6IHN0cmluZyB8IG51bGwsIHN0YXR1czogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuJHN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy4kY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuJGhlYWRlcnMgPSB0aGlzLiRwYXJzZUhlYWRlcnMoaGVhZGVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRXJyb3IoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdGF0dXMgPj0gNDAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDb250ZW50TGVuZ3RoKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGxlblN0cjogc3RyaW5nID0gdGhpcy4kaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpPy5bMF07XG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHBhcnNlSW50KGxlblN0cik7XG4gICAgICAgIGlmIChpc05hTihsZW5ndGgpKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbnRlbnRUeXBlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiRoZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk/LlswXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVhZEFzQXJyYXlCdWZmZXIoKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29udGVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVhZEFzQmxvYigpOiBQcm9taXNlPEJsb2I+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFt0aGlzLiRjb250ZW50XSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlYWRBc1RleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEZ1c2VSZXNwb25zZVJlYWRlci5yZWFkQXNUZXh0KHRoaXMuJGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWFkQXNKU09OPFQgPSB1bmtub3duPigpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEZ1c2VSZXNwb25zZVJlYWRlci5yZWFkQXNKU09OKHRoaXMuJGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWFkQXNFcnJvcigpOiBQcm9taXNlPEZ1c2VFcnJvcj4ge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkRXJyb3I6IElGdXNlRXJyb3JTZXJpYWxpemVkID0gYXdhaXQgRnVzZVJlc3BvbnNlUmVhZGVyLnJlYWRBc0pTT04odGhpcy4kY29udGVudCk7XG4gICAgICAgIHJldHVybiBGdXNlRXJyb3IuZnJvbVNlcmlhbGl6ZWQoc2VyaWFsaXplZEVycm9yKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SGVhZGVycygpOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kaGVhZGVycztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SGVhZGVyKGtleTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy4kaGVhZGVycy5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlICRwYXJzZUhlYWRlcnMoaGVhZGVyczogc3RyaW5nIHwgbnVsbCk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiB7XG4gICAgICAgIGNvbnN0IG1hcDogTWFwPHN0cmluZywgc3RyaW5nW10+ID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGlmICghaGVhZGVycykge1xuICAgICAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IGhlYWRlcnMuc3BsaXQoJ1xcclxcbicpO1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmU6IHN0cmluZ1tdID0gbGluZXNbaV0uc3BsaXQoJzonKTtcbiAgICAgICAgICAgIGNvbnN0IGtleTogc3RyaW5nID0gbGluZVswXTtcbiAgICAgICAgICAgIGlmICghbWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgbWFwLnNldChrZXksIFtdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaGVhZGVyVmFsdWU6IHN0cmluZ1tdID0gbWFwLmdldChrZXkpO1xuICAgICAgICAgICAgaGVhZGVyVmFsdWUucHVzaChsaW5lWzFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge1xuICAgIFROYXRpdmVDYWxsYmFja0Z1bmN0aW9uXG59IGZyb20gJy4vaW50ZXJuYWxzJztcbmltcG9ydCAqIGFzIFVVSUQgZnJvbSAndXVpZCc7XG5cbmV4cG9ydCB0eXBlIFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyID0gKGRhdGE6IHN0cmluZykgPT4gdm9pZDtcblxud2luZG93Ll9fYnRmdXNlX2NhbGxiYWNrcyA9IG5ldyBNYXA8c3RyaW5nLCBUTmF0aXZlQ2FsbGJhY2tGdW5jdGlvbj4oKTtcblxud2luZG93Ll9fYnRmdXNlX2RvQ2FsbGJhY2sgPSBmdW5jdGlvbihjYWxsYmFja0lEOiBzdHJpbmcsIGRhdGE6IHN0cmluZykge1xuICAgIGlmIChjYWxsYmFja0lEICYmIHdpbmRvdy5fX2J0ZnVzZV9jYWxsYmFja3MuaGFzKGNhbGxiYWNrSUQpKSB7XG4gICAgICAgIHdpbmRvdy5fX2J0ZnVzZV9jYWxsYmFja3MuZ2V0KGNhbGxiYWNrSUQpKGRhdGEpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQSBzaW5nbGV0b24gbWFuYWdlciB0byBtYW5hZ2UgbmF0aXZlIGNhbGxiYWNrcy5cbiAqIFxuICogQ3JlYXRlIGEgY2FsbGJhY2sgY29udGV4dCBhbmQgcGFzcyB0aGUgcmV0dXJuIGNvbnRleHQgaWQgdG8gbmF0aXZlIGNsaWVudHMsXG4gKiBpbiB3aGljaCB0aGV5IGNhbiB1c2UgdG8gcmVzcG9uZCBiYWNrLlxuICogXG4gKiBOb3RlIHRoYXQgcGx1Z2luIEFQSXMgYXJlIGZhciBtb3JlIGVmZmljaWVudCBhbmQgY2FuIGhhbmRsZSBhIGRpdmVyc2Ugc2V0IG9mIGRhdGEsXG4gKiBpbmNsdWRpbmcgbGFyZ2UgcGF5bG9hZHMsIHNvIHdoZW4gcG9zc2libGUgaXQncyBiZXN0IHRvIHVzZSBhIHBsdWdpbiBBUEkgaW5zdGVhZCBvZiBhXG4gKiBjYWxsYmFjayBBUEkuXG4gKiBcbiAqIFRoaXMgY2FsbGJhY2sgQVBJIGlzIGhvd2V2ZXIsIHVzZWZ1bCBmb3IgYnVpbGRpbmcgbGlzdGVuZXIga2luZCBvZiBzZXJ2aWNlcyB3aGVyZSB0aGUgbmF0aXZlXG4gKiBuZWVkcyB0byBjb250aW5vdXNseSBjYWxsYmFjayB0byB0aGUgd2VidmlldyB3aXRoIHNtYWxsIGRhdGEgcGFja2V0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VDYWxsYmFja01hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljICRpbnN0YW5jZTogRnVzZUNhbGxiYWNrTWFuYWdlcjtcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBGdXNlQ2FsbGJhY2tNYW5hZ2VyIHtcbiAgICAgICAgaWYgKCFGdXNlQ2FsbGJhY2tNYW5hZ2VyLiRpbnN0YW5jZSkge1xuICAgICAgICAgICAgRnVzZUNhbGxiYWNrTWFuYWdlci4kaW5zdGFuY2UgPSBuZXcgRnVzZUNhbGxiYWNrTWFuYWdlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEZ1c2VDYWxsYmFja01hbmFnZXIuJGluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDYWxsYmFjayhjYjogVEZ1c2VBUElDYWxsYmFja0hhbmRsZXIpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBpZDogc3RyaW5nID0gVVVJRC52NCgpO1xuICAgICAgICB3aW5kb3cuX19idGZ1c2VfY2FsbGJhY2tzLnNldChpZCwgKGRhdGE6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgY2IoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVsZWFzZUNhbGxiYWNrKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgd2luZG93Ll9fYnRmdXNlX2NhbGxiYWNrcy5kZWxldGUoaWQpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gJy4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gXCIuL1BsYXRmb3JtXCI7XG5pbXBvcnQge1xuICAgIEZ1c2VSdW50aW1lLFxuICAgIElSdW50aW1lSW5mbyxcbiAgICBUUGF1c2VDYWxsYmFja0hhbmRsZXIsXG4gICAgVFJlc3VtZUNhbGxiYWNrSGFuZGxlclxufSBmcm9tICcuL3BsdWdpbnMvRnVzZVJ1bnRpbWUnO1xuaW1wb3J0IHtWZXJzaW9ufSBmcm9tICcuL1ZlcnNpb24nO1xuaW1wb3J0IHtJRnVzZUxvZ2dlcn0gZnJvbSAnLi9JRnVzZUxvZ2dlcic7XG5pbXBvcnQgeyBGdXNlTWVtb3J5U3RvcmUgfSBmcm9tICcuL3BsdWdpbnMvRnVzZU1lbW9yeVN0b3JlJztcblxuLyoqXG4gKiBBIGNvbnRleHQgY2xhc3MgdGhhdCBob2xkcyBGdXNlIEZyYW1ld29yayBzdGF0ZVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRnVzZUNvbnRleHQge1xuICAgIHByaXZhdGUgJHBsYXRmb3JtOiBQbGF0Zm9ybTtcbiAgICBwcml2YXRlICRydW50aW1lOiBGdXNlUnVudGltZTtcbiAgICBwcml2YXRlICRydW50aW1lVmVyc2lvbjogVmVyc2lvbjtcbiAgICBwcml2YXRlICRydW50aW1lSW5mbzogSVJ1bnRpbWVJbmZvO1xuICAgIHByaXZhdGUgJGRlZmF1bHRBUElGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5O1xuICAgIHByaXZhdGUgJGxvZ2dlcjogSUZ1c2VMb2dnZXI7XG4gICAgcHJpdmF0ZSAkbWVtU3RvcmU6IEZ1c2VNZW1vcnlTdG9yZTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgICAgICBhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5LFxuICAgICAgICBsb2dnZXI6IElGdXNlTG9nZ2VyXG4gICAgKSB7XG4gICAgICAgIHRoaXMuJHBsYXRmb3JtID0gcGxhdGZvcm07XG4gICAgICAgIHRoaXMuJGxvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuJHJ1bnRpbWVWZXJzaW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy4kZGVmYXVsdEFQSUZhY3RvcnkgPSBhcGlGYWN0b3J5O1xuICAgICAgICB0aGlzLiRydW50aW1lID0gbmV3IEZ1c2VSdW50aW1lKHRoaXMpO1xuICAgICAgICB0aGlzLiRtZW1TdG9yZSA9IG5ldyBGdXNlTWVtb3J5U3RvcmUodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldExvZ2dlcigpOiBJRnVzZUxvZ2dlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRsb2dnZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERlZmF1bHRBUElGYWN0b3J5KCk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZGVmYXVsdEFQSUZhY3Rvcnk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBsYXRmb3JtKCk6IFBsYXRmb3JtIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHBsYXRmb3JtO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZ2V0UnVudGltZSgpOiBGdXNlUnVudGltZSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRydW50aW1lO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgJGdldFJ1bnRpbWVJbmZvKCk6IFByb21pc2U8SVJ1bnRpbWVJbmZvPiB7XG4gICAgICAgIGlmICghdGhpcy4kcnVudGltZUluZm8pIHtcbiAgICAgICAgICAgIHRoaXMuJHJ1bnRpbWVJbmZvID0gYXdhaXQgdGhpcy4kcnVudGltZS5nZXRJbmZvKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy4kcnVudGltZUluZm87XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGdldFBsYXRmb3JtVmVyc2lvbigpOiBQcm9taXNlPFZlcnNpb24+IHtcbiAgICAgICAgaWYgKCF0aGlzLiRydW50aW1lVmVyc2lvbikge1xuICAgICAgICAgICAgY29uc3QgaW5mbzogSVJ1bnRpbWVJbmZvID0gYXdhaXQgdGhpcy4kZ2V0UnVudGltZUluZm8oKTtcbiAgICAgICAgICAgIHRoaXMuJHJ1bnRpbWVWZXJzaW9uID0gVmVyc2lvbi5wYXJzZVZlcnNpb25TdHJpbmcoaW5mby52ZXJzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJ1bnRpbWVWZXJzaW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBpc0RlYnVnTW9kZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgaW5mbzogSVJ1bnRpbWVJbmZvID0gYXdhaXQgdGhpcy4kZ2V0UnVudGltZUluZm8oKTtcbiAgICAgICAgcmV0dXJuIGluZm8uZGVidWdNb2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWdpc3RlclBhdXNlSGFuZGxlcihjYWxsYmFjazogVFBhdXNlQ2FsbGJhY2tIYW5kbGVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuJHJ1bnRpbWUucmVnaXN0ZXJQYXVzZUhhbmRsZXIoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1bnJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNhbGxiYWNrSUQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy4kcnVudGltZS51bnJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNhbGxiYWNrSUQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWdpc3RlclJlc3VtZUhhbmRsZXIoY2FsbGJhY2s6IFRSZXN1bWVDYWxsYmFja0hhbmRsZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy4kcnVudGltZS5yZWdpc3RlclJlc3VtZUhhbmRsZXIoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1bnJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYWxsYmFja0lEOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuJHJ1bnRpbWUudW5yZWdpc3RlclJlc3VtZUhhbmRsZXIoY2FsbGJhY2tJRCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1lbW9yeVN0b3JlKCk6IEZ1c2VNZW1vcnlTdG9yZSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRtZW1TdG9yZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25XZWJ2aWV3UmVhZHkoKTogUHJvbWlzZTx2b2lkPjtcbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gXCIuL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnlcIjtcbmltcG9ydCB7IEFic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnkgfSBmcm9tIFwiLi9BYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5XCI7XG5pbXBvcnQgeyBGdXNlQVBJRmFjdG9yeSB9IGZyb20gXCIuL0Z1c2VBUElGYWN0b3J5XCI7XG5pbXBvcnQgeyBGdXNlQ29udGV4dCB9IGZyb20gXCIuL0Z1c2VDb250ZXh0XCI7XG5pbXBvcnQgeyBGdXNlQ29udGV4dEZhY3RvcnkgfSBmcm9tICcuL0Z1c2VDb250ZXh0RmFjdG9yeSc7XG5pbXBvcnQgeyBGdXNlTG9nZ2VyRmFjdG9yeSB9IGZyb20gXCIuL0Z1c2VMb2dnZXJGYWN0b3J5XCI7XG5pbXBvcnQgeyBGdXNlTG9nZ2VyTGV2ZWwgfSBmcm9tIFwiLi9GdXNlTG9nZ2VyTGV2ZWxcIjtcbmltcG9ydCB7IElGdXNlTG9nZ2VyIH0gZnJvbSBcIi4vSUZ1c2VMb2dnZXJcIjtcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSBcIi4vUGxhdGZvcm1cIjtcbmltcG9ydCB7IFBsYXRmb3JtUmVzb2x2ZXIgfSBmcm9tIFwiLi9QbGF0Zm9ybVJlc29sdmVyXCI7XG5cbmV4cG9ydCBjbGFzcyBGdXNlQ29udGV4dEJ1aWxkZXIge1xuICAgIHByaXZhdGUgJHBsYXRmb3JtUmVzb2x2ZXI6IFBsYXRmb3JtUmVzb2x2ZXI7XG4gICAgcHJpdmF0ZSAkbG9nZ2VyRmFjdG9yeTogQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSB8IG51bGw7XG4gICAgcHJpdmF0ZSAkYXBpRmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB8IG51bGw7XG4gICAgcHJpdmF0ZSAkY29udGV4dEZhY3Rvcnk6IEZ1c2VDb250ZXh0RmFjdG9yeSB8IG51bGw7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuJGxvZ2dlckZhY3RvcnkgPSBudWxsO1xuICAgICAgICB0aGlzLiRhcGlGYWN0b3J5ID0gbnVsbDtcbiAgICAgICAgdGhpcy4kcGxhdGZvcm1SZXNvbHZlciA9IG5ldyBQbGF0Zm9ybVJlc29sdmVyKCk7XG4gICAgICAgIHRoaXMuJGNvbnRleHRGYWN0b3J5ID0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UGxhdGZvcm1SZXNvbHZlcihyZXNvbHZlcjogUGxhdGZvcm1SZXNvbHZlcik6IEZ1c2VDb250ZXh0QnVpbGRlciB7XG4gICAgICAgIHRoaXMuJHBsYXRmb3JtUmVzb2x2ZXIgPSByZXNvbHZlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEFQSUZhY3RvcnkoZmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSk6IEZ1c2VDb250ZXh0QnVpbGRlciB7XG4gICAgICAgIHRoaXMuJGFwaUZhY3RvcnkgPSBmYWN0b3J5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TG9nZ2VyRmFjdG9yeShmYWN0b3J5OiBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5KTogRnVzZUNvbnRleHRCdWlsZGVyIHtcbiAgICAgICAgdGhpcy4kbG9nZ2VyRmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDb250ZXh0RmFjdG9yeShmYWN0b3J5OiBGdXNlQ29udGV4dEZhY3RvcnkpOiBGdXNlQ29udGV4dEJ1aWxkZXIge1xuICAgICAgICB0aGlzLiRjb250ZXh0RmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBfaXNEZWJ1Z01vZGUoY29udGV4dDogRnVzZUNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGNvbnRleHQuaXNEZWJ1Z01vZGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgYnVpbGQoKTogUHJvbWlzZTxGdXNlQ29udGV4dD4ge1xuICAgICAgICBjb25zdCBwbGF0Zm9ybTogUGxhdGZvcm0gPSB0aGlzLiRwbGF0Zm9ybVJlc29sdmVyLnJlc29sdmUoKTtcblxuICAgICAgICBsZXQgYXBpRmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeTtcbiAgICAgICAgaWYgKHRoaXMuJGFwaUZhY3RvcnkpIHtcbiAgICAgICAgICAgIGFwaUZhY3RvcnkgPSB0aGlzLiRhcGlGYWN0b3J5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXBpRmFjdG9yeSA9IG5ldyBGdXNlQVBJRmFjdG9yeSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxvZ2dlckZhY3Rvcnk6IEFic3RyYWN0RnVzZUxvZ2dlckZhY3Rvcnk7XG4gICAgICAgIGlmICh0aGlzLiRsb2dnZXJGYWN0b3J5KSB7XG4gICAgICAgICAgICBsb2dnZXJGYWN0b3J5ID0gdGhpcy4kbG9nZ2VyRmFjdG9yeVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyRmFjdG9yeSA9IG5ldyBGdXNlTG9nZ2VyRmFjdG9yeShwbGF0Zm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29udGV4dEZhY3Rvcnk6IEZ1c2VDb250ZXh0RmFjdG9yeSA9IHRoaXMuJGNvbnRleHRGYWN0b3J5O1xuICAgICAgICBpZiAoY29udGV4dEZhY3RvcnkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRleHRGYWN0b3J5ID0gbmV3IEZ1c2VDb250ZXh0RmFjdG9yeSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGV4dDogRnVzZUNvbnRleHQgPSBjb250ZXh0RmFjdG9yeS5jcmVhdGUocGxhdGZvcm0sIGFwaUZhY3RvcnksIGxvZ2dlckZhY3RvcnkuY3JlYXRlKCkpO1xuXG4gICAgICAgIGNvbnN0IGlzRGVidWdNb2RlOiBib29sZWFuID0gYXdhaXQgdGhpcy5faXNEZWJ1Z01vZGUoY29udGV4dCk7XG4gICAgICAgIGNvbnN0IGxvZ2dlcjogSUZ1c2VMb2dnZXIgPSBjb250ZXh0LmdldExvZ2dlcigpO1xuICAgICAgICBsb2dnZXIuZW5hYmxlTmF0aXZlQnJpZGdlKGlzRGVidWdNb2RlKTtcbiAgICAgICAgbGV0IGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWwgPSBsb2dnZXIuZ2V0TGV2ZWwoKTtcbiAgICAgICAgbGV2ZWwgfD0gRnVzZUxvZ2dlckxldmVsLkRFQlVHO1xuICAgICAgICBsb2dnZXIuc2V0TGV2ZWwobGV2ZWwpO1xuXG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDI0IEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gJy4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5pbXBvcnQgeyBBbmRyb2lkRnVzZUNvbnRleHQgfSBmcm9tICcuL2FuZHJvaWQvQW5kcm9pZEZ1c2VDb250ZXh0JztcbmltcG9ydCB7IEZ1c2VDb250ZXh0IH0gZnJvbSAnLi9GdXNlQ29udGV4dCc7XG5pbXBvcnQgeyBJRnVzZUxvZ2dlciB9IGZyb20gJy4vSUZ1c2VMb2dnZXInO1xuaW1wb3J0IHsgSU9TRnVzZUNvbnRleHQgfSBmcm9tICcuL2lvcy9JT1NGdXNlQ29udGV4dCc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vUGxhdGZvcm0nO1xuXG5leHBvcnQgY2xhc3MgRnVzZUNvbnRleHRGYWN0b3J5IHtcbiAgICBwdWJsaWMgY3JlYXRlKHBsYXRmb3JtOiBQbGF0Zm9ybSwgYXBpRmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSwgbG9nZ2VyOiBJRnVzZUxvZ2dlcik6IEZ1c2VDb250ZXh0IHtcbiAgICAgICAgc3dpdGNoIChwbGF0Zm9ybSkge1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5BTkRST0lEOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQW5kcm9pZEZ1c2VDb250ZXh0KGFwaUZhY3RvcnksIGxvZ2dlcik7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLklPUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IElPU0Z1c2VDb250ZXh0KGFwaUZhY3RvcnksIGxvZ2dlcik7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLlRFU1Q6IHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBJU2VyaWFsaXphYmxlIH0gZnJvbSBcIi4vSVNlcmlhbGl6YWJsZVwiO1xuaW1wb3J0IHsgVEZ1c2VTZXJpYWxpemFibGUgfSBmcm9tIFwiLi9UU2VyaWFsaXphYmxlXCI7XG5cbi8qKlxuICogQSB1bmlvbiBvZiBhY2NlcHRhYmxlIHR5cGUgZm9yIGVycm9yIGNhdXNlcy5cbiAqL1xuZXhwb3J0IHR5cGUgVEZ1c2VFcnJvckNhdXNlID0gc3RyaW5nIHwgRXJyb3IgfCBGdXNlRXJyb3IgfCBudWxsO1xuXG5pbnRlcmZhY2UgX0lGdXNlRXJyb3JTZXJpYWxpemVkIHtcbiAgICBkb21haW46IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIHN0YWNrPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEEgdHlwZSB0aGF0IHJlcHJlc2VudHMgYSBmdXNlIGVycm9yIGluIGEgc2VyaWFsaXplZCBzdGF0ZS5cbiAqL1xuZXhwb3J0IHR5cGUgSUZ1c2VFcnJvclNlcmlhbGl6ZWQgPSBURnVzZVNlcmlhbGl6YWJsZTxfSUZ1c2VFcnJvclNlcmlhbGl6ZWQ+O1xuXG4vKipcbiAqIEEgc3RydWN0dXJlZCBlcnJvciBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlRXJyb3IgZXh0ZW5kcyBFcnJvciBpbXBsZW1lbnRzIElTZXJpYWxpemFibGUge1xuICAgIHByaXZhdGUgJGRvbWFpbjogc3RyaW5nO1xuICAgIHByaXZhdGUgJG1lc3NhZ2U6IHN0cmluZztcbiAgICBwcml2YXRlICRjYXVzZTogVEZ1c2VFcnJvckNhdXNlO1xuICAgIHByaXZhdGUgJGNvZGU6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkb21haW4gLSBUaGUgZXJyb3IgZG9tYWluLCB1c3VhbGx5IHJlcHJlc2VudHMgYSBsaWJyYXJ5LCBjbGFzcywgb3IgcGx1Z2luLlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIC0gVGhlIGVycm9yIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0gY2F1c2UgLSBUaGUgdW5kZXJseWluZyBjYXVzZSBvZiB0aGUgZXJyb3IuIE1heSBiZSBudWxsLlxuICAgICAqIEBwYXJhbSBjb2RlIC0gQW4gZXJyb3IgY29kZS4gTWF5IGJlIG51bGwuXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGRvbWFpbjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGNhdXNlPzogVEZ1c2VFcnJvckNhdXNlLCBjb2RlPzogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIHRoaXMuJGRvbWFpbiA9IGRvbWFpbjtcbiAgICAgICAgdGhpcy4kbWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuJGNvZGUgPSBjb2RlIHx8IDA7XG4gICAgICAgIHRoaXMuJGNhdXNlID0gY2F1c2UgfHwgbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgZXJyb3IgbWVzc2FnZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRNZXNzYWdlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiRtZXNzYWdlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBlcnJvciBkb21haW4sIHVzdWFsbHkgcmVwcmVzZW50aW5nIGEgbGlicmFyeSwgY2xhc3MsIG9yIHBsdWdpbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RG9tYWluKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiRkb21haW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGVycm9yIGNvZGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q29kZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgdW5kZXJseWluZyBjYXVzZSBvZiB0aGUgZXJyb3IsIGlmIGtub3duLiBNYXkgYmUgbnVsbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q2F1c2UoKTogVEZ1c2VFcnJvckNhdXNlIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjYXVzZTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgQSBzZXJpYWxpemVkIG9iamVjdCByZXByZXNlbnRpbmcgYW4gZXJyb3IuXG4gICAgICovXG4gICAgcHVibGljIHNlcmlhbGl6ZSgpOiBJRnVzZUVycm9yU2VyaWFsaXplZCB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkb21haW46IHRoaXMuZ2V0RG9tYWluKCksXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLmdldE1lc3NhZ2UoKSxcbiAgICAgICAgICAgIGNvZGU6IHRoaXMuZ2V0Q29kZSgpLFxuICAgICAgICAgICAgc3RhY2s6IHRoaXMuc3RhY2tcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyB0aGUgZ2l2ZW4gb2JqZWN0IGludG8gYSBGdXNlRXJyb3Igb2JqZWN0LiBBY2NlcHRzIHNldmVyYWwgZGlmZmVyZW50XG4gICAgICogZm9ybWF0cywgd2hpY2ggaW5mbHVlbmNlcyB0aGUgYmVoYXZpb3VyIG9mIHRoaXMgbWV0aG9kLlxuICAgICAqIFxuICAgICAqIElmIHRoZSBpbnB1dCBpcyBhIHN0cmluZywgYSBGdXNlRXJyb3Igb2JqZWN0IGlzIGNyZWF0ZWQgd2l0aCB0aGUgc3RyaW5nIGFzXG4gICAgICogdGhlIGVycm9yIG1lc3NhZ2Ugb2YgYW4gdW5rbm93biBkb21haW4uXG4gICAgICogXG4gICAgICogSWYgdGhlIGlucHV0IGlzIGEgRnVzZUVycm9yLCB0aGVuIHRoaXMgbWV0aG9kIGRvZXMgbm90aGluZyBidXQgcGFzc2VzIHRocm91Z2hcbiAgICAgKiB0aGUgRnVzZUVycm9yLiBUaGUgcmV0dXJuZWQgRnVzZUVycm9yIGlzIHRoZSBpbnB1dCBGdXNlRXJyb3IsIGEgY29weSBpcyBub3QgbWFkZS5cbiAgICAgKiBcbiAgICAgKiBJZiB0aGUgaW5wdXQgaXMgYW4gRXJyb3IsIHRoZW4gYSBGdXNlRXJyb3IgaXMgY3JlYXRlZCB1c2luZyB0aGUgbmFtZSBhcyB0aGVcbiAgICAgKiBkb21haW4sIGFuZCBpdCdzIG1lc3NhZ2UgYXMgdGhlIGVycm9yIG1lc3NhZ2UuIFRoZSBlcnJvciBvYmplY3QgaXMgYWxzbyB1c2VkXG4gICAgICogYXMgdGhlIEZ1c2VFcnJvcidzIGNhdXNlIHBhcmFtZXRlci5cbiAgICAgKiBcbiAgICAgKiBJZiB0aGUgaW5wdXQgaXMgb2YgdGhlIHNoYXBlIG9mIElGdXNlRXJyb3JTZXJpYWxpemVkLCB0aGVuIHRoZSBvYmplY3QgaXNcbiAgICAgKiBkZXNlcmlhbGl6ZWQgaW50byBhIEZ1c2VFcnJvciBpbnN0YW5jZS5cbiAgICAgKiBcbiAgICAgKiBJZiBhbnkgb3RoZXIgdHlwZSBvZiBvYmplY3QgaXMgZ2l2ZW4sIGFuIGNvbnNvbGUgZXJyb3IgbWVzc2FnZSB3aWxsIGJlIFxuICAgICAqIHByaW50ZWQgYW5kIGEgXCJGdXNlRXJyb3JcIiBkb21haW4gZXJyb3Igd2lsbCBiZSByZXR1cm5lZCBzdGF0aW5nIHRoZSBlcnJvclxuICAgICAqIGlzIG5vdCB3cmFwcGFibGUuXG4gICAgICogXG4gICAgICogQHBhcmFtIGVycm9yIC0gQSB2YWx1ZSB0aGF0IGNhbiByZXByZXNlbnQgYW4gZXJyb3JcbiAgICAgKiBAcmV0dXJucyBBIEZ1c2VFcnJvciBpbnN0YW5jZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgd3JhcChlcnJvcjogc3RyaW5nIHwgRXJyb3IgfCBGdXNlRXJyb3IgfCBJRnVzZUVycm9yU2VyaWFsaXplZCB8IHVua25vd24pOiBGdXNlRXJyb3Ige1xuICAgICAgICBsZXQgZmVycjogRnVzZUVycm9yID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGZlcnIgPSBuZXcgRnVzZUVycm9yKCdVbmtub3duJywgZXJyb3IsIG51bGwsIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgRnVzZUVycm9yKSB7XG4gICAgICAgICAgICBmZXJyID0gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgZmVyciA9IG5ldyBGdXNlRXJyb3IoZXJyb3IubmFtZSwgZXJyb3IubWVzc2FnZSwgZXJyb3IsIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEZ1c2VFcnJvci4kaXNTZXJpYWxpemVkRnVzZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgZmVyciA9IEZ1c2VFcnJvci5mcm9tU2VyaWFsaXplZChlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbndyYXBwYWJsZSBFcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIGZlcnIgPSBuZXcgRnVzZUVycm9yKCdGdXNlRXJyb3InLCAnVW53cmFwcGFibGUgZXJyb3InLCBudWxsLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmZXJyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc2VyaWFsaXplcyBhbmQgY3JlYXRlcyBhIG5ldyBGdXNlRXJyb3IgaW5zdGFuY2VcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZXJyb3IgLSBUaGUgc2VyaWFsaXplZCBlcnJvciBvYmplY3RcbiAgICAgKiBAcmV0dXJucyBBIEZ1c2VFcnJvciBpbnN0YW5jZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVNlcmlhbGl6ZWQoZXJyb3I6IElGdXNlRXJyb3JTZXJpYWxpemVkKTogRnVzZUVycm9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGdXNlRXJyb3IoZXJyb3IuZG9tYWluLCBlcnJvci5tZXNzYWdlLCBudWxsLCBlcnJvci5jb2RlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiAnRnVzZUVycm9yJztcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHByaXZhdGUgc3RhdGljICRpc1NlcmlhbGl6ZWRGdXNlRXJyb3IoZXJyb3I6IGFueSk6IGVycm9yIGlzIElGdXNlRXJyb3JTZXJpYWxpemVkIHtcbiAgICAgICAgcmV0dXJuICdtZXNzYWdlJyBpbiBlcnJvciAmJiAnZG9tYWluJyBpbiBlcnJvciAmJiAnY29kZScgaW4gZXJyb3I7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge1xuICAgIElGdXNlTG9nZ2VyLCBJTmF0aXZlTG9nRW50cnlcbn0gZnJvbSAnLi9JRnVzZUxvZ2dlcic7XG5pbXBvcnQge1RTZXJpYWxpemFibGV9IGZyb20gJy4vVFNlcmlhbGl6YWJsZSc7XG5pbXBvcnQge0lTZXJpYWxpemFibGV9IGZyb20gJy4vSVNlcmlhbGl6YWJsZSc7XG5pbXBvcnQgeyBGdXNlTG9nZ2VyTGV2ZWwgfSBmcm9tICcuL0Z1c2VMb2dnZXJMZXZlbCc7XG5cbi8qKlxuICogQSBzZXJpYWxpemVyIGZvciBsb2dnaW5nLiBUaGlzIGlzIGRpZmZlcmVudCB0aGFuIGEge0BsaW5rIEZ1c2VTZXJpYWxpemVyfSBpblxuICogdGhhdCBpbiBzZXJpYWxpemVyIHRyYW5zZm9ybXMgb2JqZWN0cyBpbnRvIGEgcHJpbnRhYmxlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VMb2dnZXJTZXJpYWxpemVyIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVUb1N0cmluZyhvYmo6IFRTZXJpYWxpemFibGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplUHJpbWl0aXZlVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplRGF0ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5faXNJU2VyaWFsaXphYmxlKG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVUb1N0cmluZyhvYmouc2VyaWFsaXplKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplRXJyb3JUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2hlbiBhbGwgZWxzZSBmYWlscywgYXR0ZW1wdCB0byBKU09OIHN0cmluZ2lmeVxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCA0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZVByaW1pdGl2ZVRvU3RyaW5nKG9iajogbnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBvYmoudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZUVycm9yVG9TdHJpbmcob2JqOiBFcnJvcik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRFcnJvciA9IHtcbiAgICAgICAgICAgIG5hbWU6IG9iai5uYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogb2JqLm1lc3NhZ2UsXG4gICAgICAgICAgICBzdGFjazogb2JqLnN0YWNrXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHNlcmlhbGl6ZWRFcnJvciwgbnVsbCwgNCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVEYXRlVG9TdHJpbmcob2JqOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIG9iai50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZW1hcmtzXG4gICAgICogU2VyaWFsaXplcyBhbiBvYmplY3QgaW50byBhIHByaW50YWJsZSBzdHJpbmcuXG4gICAgICogXG4gICAgICogQHBhcmFtIG9iaiAtIFRoZSBvYmplY3QgdG8gc2VyaWFsaXplXG4gICAgICogQHJldHVybnMgQSBwcmludGFibGUgc3RyaW5nXG4gICAgICovXG4gICAgcHVibGljIHNlcmlhbGl6ZShvYmo6IFRTZXJpYWxpemFibGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdXQ6IHN0cmluZyA9IG51bGw7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICBvdXQgPSBgW0Jsb2IgJHtvYmoudHlwZSB8fCAnQmluYXJ5J30gKCR7b2JqLnNpemV9IGJ5dGVzKV1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCBvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBvdXQgPSB0aGlzLl9zZXJpYWxpemVUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBvdXQgPSBgW0FycmF5QnVmZmVyICgke29iai5ieXRlTGVuZ3RofSBieXRlcyldYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9pc0lTZXJpYWxpemFibGUob2JqKSkge1xuICAgICAgICAgICAgb3V0ID0gdGhpcy5zZXJpYWxpemUob2JqLnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHNob3VsZCBiZSBlaXRoZXIgSlNPTiBvYmplY3RzIG9yIGpzb24gYXJyYXlzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgICAgIG91dCA9IHRoaXMuX3NlcmlhbGl6ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcHJvdGVjdGVkIF9pc0lTZXJpYWxpemFibGUoeDogYW55KTogeCBpcyBJU2VyaWFsaXphYmxlIHtcbiAgICAgICAgcmV0dXJuICEheC5zZXJpYWxpemUgJiYgdHlwZW9mIHguc2VyaWFsaXplID09PSAnZnVuY3Rpb24nO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBIGJhc2UgbG9nZ2VyIGltcGxlbWVudGF0aW9uIHdoaWNoIGluY2x1ZGVzIGEgc2VyaWFsaXplciBmb3IgY29tbW9uIHR5cGVzLlxuICogSXQgd2lsbCBzZXJpYWxpemUvYWNjZXB0IGFsbCB2YWx1ZXMgdGhhdCBUU2VyaWFsaXphYmxlIGFjY2VwdHMsIGhvd2V2ZXIgQmxvYi9BcnJheUJ1ZmZlclxuICogb3Igb3RoZXIgYmluYXJ5IGRhdGEgdHlwZXMgd2lsbCBub3QgYmUgc2VyaWFsaXplZC4gSW5zdGVhZCBpdCB3aWxsIHByaW50IGFuXG4gKiBvYmplY3QgaWRlbnRpZmllciwgd2l0aCBtaW1lIHR5cGUgaWYgcHJlc2VudCwgYWxvbmcgd2l0aCB0aGUgc2l6ZSBvZiB0aGUgYnVmZmVyLlxuICogXG4gKiBUaGUgYmFzZSBsb2dnZXIgZG9lcyBub3QgcHJvdmlkZSBhbnkgbmF0aXZlIGJyaWRnaW5nLiBXaGlsZSB1c2FibGUgZm9yIHB1cmVseSB3ZWJ2aWV3IHNpZGUsXG4gKiB1c2UgdGhlIEZ1c2VMb2dnZXJGYWN0b3J5IHRvIGdldCBhIGxvZ2dlciBzcGVjaWZpYyBmb3IgeW91ciBydW50aW1lIGVudmlyb25tZW50LlxuICovXG5leHBvcnQgY2xhc3MgRnVzZUxvZ2dlciBpbXBsZW1lbnRzIElGdXNlTG9nZ2VyIHtcbiAgICBwcml2YXRlICRsZXZlbDogRnVzZUxvZ2dlckxldmVsO1xuICAgIHByaXZhdGUgJGVuYWJsZU5hdGl2ZUJyaWRnZTogYm9vbGVhbjtcbiAgICBwcml2YXRlICRzZXJpYWxpemVyOiBGdXNlTG9nZ2VyU2VyaWFsaXplcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy4kZW5hYmxlTmF0aXZlQnJpZGdlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kbGV2ZWwgPSBGdXNlTG9nZ2VyTGV2ZWwuSU5GTyB8IEZ1c2VMb2dnZXJMZXZlbC5XQVJOIHwgRnVzZUxvZ2dlckxldmVsLkVSUk9SO1xuICAgICAgICB0aGlzLiRzZXJpYWxpemVyID0gbmV3IEZ1c2VMb2dnZXJTZXJpYWxpemVyKCk7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyTmF0aXZlQ2FsYmxhY2soKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3JlZ2lzdGVyTmF0aXZlQ2FsYmxhY2soKTogdm9pZCB7fVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGxldmVsIC0gQSBiaXRtYXNrIG9wdGlvbiB0byBpbmRpY2F0ZSB3aGljaCBsZXZlbHMgdG8gbG9nLlxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogVG8gcmVwb3J0IG9uIFdBUk4gYW5kIEVSUk9SIG9ubHksIHlvdSB3b3VsZCBzZXQ6XG4gICAgICogXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGxvZ2dlci5zZXRMZXZlbChGdXNlTG9nZ2VyTGV2ZWwuV0FSTiB8IEZ1c2VMb2dnZXJMZXZlbC5FUlJPUik7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgcHVibGljIHNldExldmVsKGxldmVsOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy4kbGV2ZWwgPSBsZXZlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBUaGUgY3VycmVudCBsb2cgbGV2ZWwgYml0bWFzay5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0TGV2ZWwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGxldmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZW1hcmtzXG4gICAgICogSWYgZW5hYmxlZCwgVGhlIG5hdGl2ZSBGdXNlTG9nZ2VyIHdpbGwgcGFzcyBuYXRpdmUgbG9nIG1lc3NhZ2VzIHRvXG4gICAgICogdGhlIHdlYnZpZXcgYW5kIHdpbGwgYmUgbG9nZ2VkIGludG8gdGhlIEpTIGNvbnNvbGUuIExvZ3MgcGFzc2VkIHRocm91Z2hcbiAgICAgKiB0aGlzIGxvZ2dlciB3aWxsIGFsc28gYmUgcGFzc2VkIHRvIHRoZSBuYXRpdmUgZW52aXJvbm1lbnQgYW5kIHdpbGwgYmVcbiAgICAgKiBsb2dnZWQgaW4gdGhlIG5hdGl2ZSdzIGxvZ2dpbmcgY29uc29sZS5cbiAgICAgKiBcbiAgICAgKiBUaGlzIGNhbiBiZSBoZWxwZnVsIGluIGRlYnVnZ2luZyB3aGVyZSBhbGwgbG9ncyB3aWxsIGJlIGluIHRoZSBzYW1lIHBsYWNlLFxuICAgICAqIGhvd2V2ZXIsIGxvZ2dpbmcgY2FuIGJlIHZlcmJvc2UgYW5kIGNhbiBjYXVzZSBhIGRlZ3JhdGlvbiBvZiBwZXJmb3JtYW5jZSxcbiAgICAgKiB0aGVyZWZvcmUgaXQgbWF5IG5vdCBiZSBkZXNpcmFibGUgdG8gaGF2ZSBlbmFibGVkIGZvciBwcm9kdWN0aW9uIGJ1aWxkcy5cbiAgICAgKiBcbiAgICAgKiBUaGlzIGZlYXR1cmUgaXMgY3VycmVudGx5IGVuYWJsZWQgYnkgZGVmYXVsdCwgaG93ZXZlciB0aGlzIGlzIHN1YmplY3QgdG9cbiAgICAgKiBjaGFuZ2UuXG4gICAgICogXG4gICAgICogQHBhcmFtIGZsYWcgLSBlbmFibGVzIHRoZSBuYXRpdmUgYnJpZGdlIGxvZ2dpbmcgaWYgZW5hYmxlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZW5hYmxlTmF0aXZlQnJpZGdlKGZsYWc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy4kZW5hYmxlTmF0aXZlQnJpZGdlID0gISFmbGFnO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25OYXRpdmVMb2dFbnRyeShlbnRyeTogSU5hdGl2ZUxvZ0VudHJ5KTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuZ2V0TGV2ZWwoKSAmIGVudHJ5LmxldmVsKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LmxldmVsID09PSBGdXNlTG9nZ2VyTGV2ZWwuU0lMRU5UKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGVudHJ5LmxldmVsKSB7XG4gICAgICAgICAgICBjYXNlIEZ1c2VMb2dnZXJMZXZlbC5ERUJVRzpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKGVudHJ5Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBGdXNlTG9nZ2VyTGV2ZWwuSU5GTzpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oZW50cnkubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZ1c2VMb2dnZXJMZXZlbC5XQVJOOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlbnRyeS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRnVzZUxvZ2dlckxldmVsLkVSUk9SOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZW50cnkubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAdmlydHVhbCAtIEltcGxlbWVudGF0b3JzIHVzZSB0aGlzIG1ldGhvZCB0byBjYWxsIG9uIHRoZSBuYXRpdmUgbG9nZ2luZyBBUEkuXG4gICAgICogQHBhcmFtIGxldmVsIC0gVGhlIGxvZyBsZXZlbCBmb3IgdGhpcyBsb2cgcHJpbnRcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSAtIE92ZXJyaWRhYmxlIGhvb2sgdG8gc2VuZCBsb2dzIHRvIHRoZSBuYXRpdmUgZW52aXJvbm1lbnRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2xvZ1RvTmF0aXZlKGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWwsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge31cblxuICAgIHByaXZhdGUgJGxvZ1RvTmF0aXZlKGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWwsIGFyZ3M6IFRTZXJpYWxpemFibGVbXSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuJGVuYWJsZU5hdGl2ZUJyaWRnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZEFyZ3M6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNlcmlhbGl6ZWRBcmdzLnB1c2godGhpcy4kc2VyaWFsaXplci5zZXJpYWxpemUoYXJnc1tpXSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9nVG9OYXRpdmUobGV2ZWwsIHNlcmlhbGl6ZWRBcmdzLmpvaW4oJ1xcdCcpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJncyAtIHZhcmlhZGljIGFyZ3VtZW50cyBvZiBzZXJpYWxpemFibGUgb2JqZWN0cyB0byBsb2cgdG8gdGhlIGNvbnNvbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVidWcoLi4uYXJnczogVFNlcmlhbGl6YWJsZVtdKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuJGxldmVsICYgRnVzZUxvZ2dlckxldmVsLkRFQlVHKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5kZWJ1ZyguLi5hcmdzKTtcbiAgICAgICAgdGhpcy4kbG9nVG9OYXRpdmUoRnVzZUxvZ2dlckxldmVsLkRFQlVHLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJncyAtIHZhcmlhZGljIGFyZ3VtZW50cyBvZiBzZXJpYWxpemFibGUgb2JqZWN0cyB0byBsb2cgdG8gdGhlIGNvbnNvbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5mbyguLi5hcmdzOiBUU2VyaWFsaXphYmxlW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy4kbGV2ZWwgJiBGdXNlTG9nZ2VyTGV2ZWwuSU5GTykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUuaW5mbyguLi5hcmdzKTtcbiAgICAgICAgdGhpcy4kbG9nVG9OYXRpdmUoRnVzZUxvZ2dlckxldmVsLklORk8sIGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmdzIC0gdmFyaWFkaWMgYXJndW1lbnRzIG9mIHNlcmlhbGl6YWJsZSBvYmplY3RzIHRvIGxvZyB0byB0aGUgY29uc29sZVxuICAgICAqL1xuICAgIHB1YmxpYyB3YXJuKC4uLmFyZ3M6IFRTZXJpYWxpemFibGVbXSk6IHZvaWQge1xuICAgICAgICBpZiAoISh0aGlzLiRsZXZlbCAmIEZ1c2VMb2dnZXJMZXZlbC5XQVJOKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS53YXJuKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLiRsb2dUb05hdGl2ZShGdXNlTG9nZ2VyTGV2ZWwuV0FSTiwgYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZ3MgLSB2YXJpYWRpYyBhcmd1bWVudHMgb2Ygc2VyaWFsaXphYmxlIG9iamVjdHMgdG8gbG9nIHRvIHRoZSBjb25zb2xlXG4gICAgICovXG4gICAgcHVibGljIGVycm9yKC4uLmFyZ3M6IFRTZXJpYWxpemFibGVbXSk6IHZvaWQge1xuICAgICAgICBpZiAoISh0aGlzLiRsZXZlbCAmIEZ1c2VMb2dnZXJMZXZlbC5FUlJPUikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoLi4uYXJncyk7XG4gICAgICAgIHRoaXMuJGxvZ1RvTmF0aXZlKEZ1c2VMb2dnZXJMZXZlbC5FUlJPUiwgYXJncyk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBGdXNlTG9nZ2VyIH0gZnJvbSBcIi4vRnVzZUxvZ2dlclwiO1xuaW1wb3J0IHsgSUZ1c2VMb2dnZXIgfSBmcm9tIFwiLi9JRnVzZUxvZ2dlclwiO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9QbGF0Zm9ybVwiO1xuaW1wb3J0IHtJT1NGdXNlTG9nZ2VyfSBmcm9tICcuL2lvcy9JT1NGdXNlTG9nZ2VyJztcbmltcG9ydCB7QW5kcm9pZEZ1c2VMb2dnZXJ9IGZyb20gJy4vYW5kcm9pZC9BbmRyb2lkRnVzZUxvZ2dlcic7XG5cbi8qKlxuICogQSBkZWZhdWx0IGxvZ2dlciBmYWN0b3J5IGZvciBjcmVhdGluZyBsb2dnZXJzIGZvciB0aGUgZ2l2ZW4gcGxhdGZvcm0uXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlTG9nZ2VyRmFjdG9yeSB7XG4gICAgcHJpdmF0ZSAkcGxhdGZvcm06IFBsYXRmb3JtO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHBsYXRmb3JtIC0gVGhlIGN1cnJlbnQgUGxhdGZvcm0gaW4gdGhpcyBydW50aW1lIGVudmlyb25tZW50XG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xuICAgICAgICB0aGlzLiRwbGF0Zm9ybSA9IHBsYXRmb3JtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBGdXNlTG9nZ2VyIGZvciB0aGUgY3VycmVudCBQbGF0Zm9ybS5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBBIGxvZ2dlciBpbnN0YW5jZSAgIFxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGUoKTogSUZ1c2VMb2dnZXIge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuJHBsYXRmb3JtKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLklPUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IElPU0Z1c2VMb2dnZXIoKTtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uQU5EUk9JRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFuZHJvaWRGdXNlTG9nZ2VyKCk7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLlRFU1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGdXNlTG9nZ2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogQSBiaXRtYXNrIG9wdGlvbiBvZiBsb2dnZXIgbGV2ZWxzXG4gKi9cbmV4cG9ydCBlbnVtIEZ1c2VMb2dnZXJMZXZlbCB7XG4gICAgU0lMRU5UICA9IDAsXG4gICAgREVCVUcgICA9IDEsXG4gICAgSU5GTyAgICA9IDIsXG4gICAgV0FSTiAgICA9IDQsXG4gICAgRVJST1IgICA9IDhcbn1cbiIsIlxuXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge0lGdXNlR3JhbnRSZXN1bHR9IGZyb20gJy4vSUZ1c2VHcmFudFJlc3VsdCc7XG5pbXBvcnQge0Z1c2VQZXJtaXNzaW9uU3RhdGV9IGZyb20gJy4vRnVzZVBlcm1pc3Npb25TdGF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uIGV4dGVuZHMgbnVtYmVyID0gbnVtYmVyPiB7XG4gICAgcHJpdmF0ZSAkcmVzdWx0czogSUZ1c2VHcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbj47XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocmVzdWx0czogSUZ1c2VHcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4pIHtcbiAgICAgICAgdGhpcy4kcmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgfVxuXG4gICAgcHVibGljIGlzR3JhbnRlZChwZXJtaXNzaW9uOiBUU3VwcG9ydGVkUGVybWlzc2lvbik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcmVzdWx0c1twZXJtaXNzaW9uXSA9PT0gRnVzZVBlcm1pc3Npb25TdGF0ZS5HUkFOVEVEO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0FsbEdyYW50ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLiRyZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4kcmVzdWx0c1tpXSAhPT0gRnVzZVBlcm1pc3Npb25TdGF0ZS5HUkFOVEVEKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHJlamVjdEp1c3RpZmljYXRpb25zKCk6IHZvaWQge1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy4kcmVzdWx0cykge1xuICAgICAgICAgICAgaWYgKHRoaXMuJHJlc3VsdHNbaV0gPT09IEZ1c2VQZXJtaXNzaW9uU3RhdGUuUkVRVUlSRVNfSlVTVElGSUNBVElPTikge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJlc3VsdHNbaV0gPSBGdXNlUGVybWlzc2lvblN0YXRlLkRFTklFRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG91bGRKdXN0aWZ5KCk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy4kcmVzdWx0cykge1xuICAgICAgICAgICAgaWYgKHRoaXMuJHJlc3VsdHNbaV0gPT09IEZ1c2VQZXJtaXNzaW9uU3RhdGUuUkVRVUlSRVNfSlVTVElGSUNBVElPTikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQ29udGVudFR5cGUgfSBmcm9tICcuL0NvbnRlbnRUeXBlJztcbmltcG9ydCB7IEZ1c2VBUElSZXNwb25zZSB9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmltcG9ydCB7IEZ1c2VFcnJvciB9IGZyb20gJy4vRnVzZUVycm9yJztcbmltcG9ydCB7VEFQSUJyaWRnZUZ1bmN0aW9ufSBmcm9tICcuL0Z1c2VQbHVnaW4nO1xuaW1wb3J0IHtJRnVzZVBlcm1pc3Npb25SZXF1ZXN0fSBmcm9tICcuL0lGdXNlUGVybWlzc2lvblJlcXVlc3QnO1xuaW1wb3J0IHsgVEZ1c2VTZXJpYWxpemFibGUgfSBmcm9tICcuL1RTZXJpYWxpemFibGUnO1xuaW1wb3J0IHtGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0fSBmcm9tICcuL0Z1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQnO1xuXG4vKipcbiAqIEludm9rZWQgdG8gaGFuZGxlIHdoZW4gcGVybWlzc2lvbiBqdXN0aWZpY2F0aW9uIGlzIG5lY2Vzc2FyeS5cbiAqIFxuICogVGhpcyBpcyBhbiBhbmRyb2lkIGNvbmNlcHQsIHNvIGl0IHdpbGwgb25seSBiZSBpbnZva2VkIG9uIEFuZHJvaWQgZGV2aWNlcyxcbiAqIGFzIGlPUyBoYXMganVzdGlmaWNhdGlvbiB0ZXh0IGVtYmVkZGVkIGludG8gdGhlIGFjdHVhbCBwZXJtaXNzaW9uIHByb21wdC5cbiAqIFxuICogVXNlciBkaWFsb2cgc2hvdWxkIGJlIGRpc3BsYXllZCB0byBleHBsYWluIHdoeSB0aGUgYXBwIHdhbnRzIHRvIHVzZSB0aGUgcGVybWlzc2lvbi5cbiAqIEFuZHJvaWQgcmVjb21tZW5kcyBnaXZpbmcgdGhlIHVzZXIgdGhlIGFiaWxpdHkgdG8gYWNjZXB0IG9yIGRlbnkgYXQgdGhpcyB0aW1lLCBpZiB0aGUgdXNlciBkZW55LFxuICogdGhlbiByZXNvbHZlIHRoZSBwcm9taXNlIHdpbGwgZmFsc2UuXG4gKiBcbiAqIFJldHVybiB0cnVlIGlmIHRoZSBwZXJtaXNzaW9uIHJlcXVlc3Qgc2hvdWxkIHByb2NlZWQuXG4gKi9cbmV4cG9ydCB0eXBlIFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIgPSAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuXG5pbnRlcmZhY2UgX19JUGVybWlzc2lvblJlcXVlc3RBcmd1bWVudHM8VCBleHRlbmRzIG51bWJlcj4ge1xuICAgIHBlcm1pc3Npb25TZXQ6IFRbXTtcbiAgICBpc0p1c3RpZmllZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgVEZ1c2VQZXJtaXNzaW9uUmVxdWVzdEFyZ3VtZW50czxUIGV4dGVuZHMgbnVtYmVyPiA9IFRGdXNlU2VyaWFsaXphYmxlPF9fSVBlcm1pc3Npb25SZXF1ZXN0QXJndW1lbnRzPFQ+PjtcblxuZXhwb3J0IHR5cGUgVEZ1c2VBUElQZXJtaXNzaW9uUmVxdWVzdDxUIGV4dGVuZHMgbnVtYmVyID0gbnVtYmVyPiA9IFRBUElCcmlkZ2VGdW5jdGlvbjxDb250ZW50VHlwZS5KU09OLCBURnVzZVBlcm1pc3Npb25SZXF1ZXN0QXJndW1lbnRzPFQ+PjtcblxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHRvIGhhbmRsZSBwZXJtaXNzaW9uIHJlcXVlc3QuXG4gKiBDb25jcmV0ZSBjbGFzc2VzIHNob3VsZCBpbXBsZW1lbnQgdGhlIHByb3RlY3RlZCBfcmVxdWVzdCBtZXRob2QgdG8gY2FsbCBvbiB0aGVpclxuICogcGVybWlzc2lvbiByZXF1ZXN0IEZ1c2UgQVBJLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZVBlcm1pc3Npb25SZXF1ZXN0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uIGV4dGVuZHMgbnVtYmVyPiBpbXBsZW1lbnRzIElGdXNlUGVybWlzc2lvblJlcXVlc3Q8VFN1cHBvcnRlZFBlcm1pc3Npb24+IHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBUQUc6IHN0cmluZyA9ICdQZXJtaXNzaW9uUmVxdWVzdCc7XG5cbiAgICBwcml2YXRlICRhcGk6IFRGdXNlQVBJUGVybWlzc2lvblJlcXVlc3Q8VFN1cHBvcnRlZFBlcm1pc3Npb24+O1xuICAgIHByaXZhdGUgJHBlcm1pc3Npb25TZXQ6IFRTdXBwb3J0ZWRQZXJtaXNzaW9uW107XG4gICAgcHJpdmF0ZSAkanVzdGlmaWNhdGlvbkhhbmRsZXI6IFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIgfCBudWxsO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGFwaUJyaWRnZTogVEZ1c2VBUElQZXJtaXNzaW9uUmVxdWVzdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4sIHBlcm1pc3Npb25TZXQ6IFRTdXBwb3J0ZWRQZXJtaXNzaW9uW10sIGp1c3RpZmljYXRpb25IYW5kbGVyOiBURnVzZUp1c3RpZmljYXRpb25IYW5kbGVyID0gbnVsbCkge1xuICAgICAgICBpZiAoIXBlcm1pc3Npb25TZXQgfHwgKHBlcm1pc3Npb25TZXQgJiYgcGVybWlzc2lvblNldC5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRnVzZUVycm9yKEZ1c2VQZXJtaXNzaW9uUmVxdWVzdC5UQUcsICdBdCBsZWFzdCBvbmUgcGVybWlzc2lvbiBpcyByZXF1aXJlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kYXBpID0gYXBpQnJpZGdlO1xuICAgICAgICB0aGlzLiRwZXJtaXNzaW9uU2V0ID0gcGVybWlzc2lvblNldDtcbiAgICAgICAgdGhpcy4kanVzdGlmaWNhdGlvbkhhbmRsZXIgPSBqdXN0aWZpY2F0aW9uSGFuZGxlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGVybWlzc2lvblNldCgpOiBUU3VwcG9ydGVkUGVybWlzc2lvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHBlcm1pc3Npb25TZXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyAkcmVxdWVzdChpc0p1c3RpZmllZDogYm9vbGVhbik6IFByb21pc2U8RnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IEZ1c2VBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMuJGFwaShDb250ZW50VHlwZS5KU09OLCB7XG4gICAgICAgICAgICBwZXJtaXNzaW9uU2V0OiB0aGlzLmdldFBlcm1pc3Npb25TZXQoKSxcbiAgICAgICAgICAgIGlzSnVzdGlmaWVkOiBpc0p1c3RpZmllZFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICB0aHJvdyBhd2FpdCByZXNwb25zZS5yZWFkQXNFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0KGF3YWl0IHJlc3BvbnNlLnJlYWRBc0pTT04oKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyAkb25KdXN0aWZpY2F0aW9uUmVxdWVzdCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCF0aGlzLiRqdXN0aWZpY2F0aW9uSGFuZGxlcikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdQZXJtaXNzaW9uIHJlcXVpcmVzIGp1c3RpZmljYXRpb24sIGJ1dCB0aGlzIHJlcXVlc3QgaGFzIG5vIFRKdXN0aWZpY2F0aW9uSGFuZGxlcicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuJGp1c3RpZmljYXRpb25IYW5kbGVyKCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBhc3luYyByZXF1ZXN0KCk6IFByb21pc2U8RnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4+IHtcbiAgICAgICAgbGV0IHJlc3VsdHM6IEZ1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQ8VFN1cHBvcnRlZFBlcm1pc3Npb24+ID0gYXdhaXQgdGhpcy4kcmVxdWVzdChmYWxzZSk7XG5cbiAgICAgICAgaWYgKHJlc3VsdHMuc2hvdWxkSnVzdGlmeSgpKSB7XG4gICAgICAgICAgICBpZiAoYXdhaXQgdGhpcy4kb25KdXN0aWZpY2F0aW9uUmVxdWVzdCgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IGF3YWl0IHRoaXMuJHJlcXVlc3QodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnJlamVjdEp1c3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogQSBzZXQgb2YgY29uc3RhbnRzIHJlcHJlc2VudGluZyBwZXJtaXNzaW9uIHN0YXRlcy5cbiAqL1xuZXhwb3J0IGVudW0gRnVzZVBlcm1pc3Npb25TdGF0ZSB7XG4gICAgR1JBTlRFRCxcbiAgICBSRVFVSVJFU19KVVNUSUZJQ0FUSU9OLFxuICAgIERFTklFRFxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSBcIi4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeVwiO1xuaW1wb3J0IHsgRnVzZUFQSSB9IGZyb20gXCIuL0Z1c2VBUElcIjtcbmltcG9ydCB7VEZ1c2VBUElDYWxsYmFja0hhbmRsZXJ9IGZyb20gJy4vRnVzZUNhbGxiYWNrTWFuYWdlcic7XG5pbXBvcnQgeyBGdXNlQ29udGV4dCB9IGZyb20gXCIuL0Z1c2VDb250ZXh0XCI7XG5pbXBvcnQge0Z1c2VBUElSZXNwb25zZX0gZnJvbSAnLi9GdXNlQVBJUmVzcG9uc2UnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9QbGF0Zm9ybVwiO1xuaW1wb3J0IHsgQ29udGVudFR5cGUgfSBmcm9tIFwiLi9Db250ZW50VHlwZVwiO1xuaW1wb3J0IHsgVFNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL1RTZXJpYWxpemFibGVcIjtcbmltcG9ydCB7IEZ1c2VTZXJpYWxpemVyIH0gZnJvbSBcIi4vRnVzZVNlcmlhbGl6ZXJcIjtcblxuZXhwb3J0IHR5cGUgVEFQSUJyaWRnZUZ1bmN0aW9uPFRDb250ZW50VHlwZSBleHRlbmRzIENvbnRlbnRUeXBlID0gQ29udGVudFR5cGUsIFREYXRhIGV4dGVuZHMgVFNlcmlhbGl6YWJsZSA9IFRTZXJpYWxpemFibGU+ID0gKHR5cGU/OiBUQ29udGVudFR5cGUsIGRhdGE/OiBURGF0YSkgPT4gUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+O1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIEZ1c2UgUGx1Z2luc1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRnVzZVBsdWdpbjxUQVBJT3B0cyA9IHVua25vd24+IHtcbiAgICBwcml2YXRlICRjb250ZXh0OiBGdXNlQ29udGV4dDtcbiAgICBwcml2YXRlICRhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEZ1c2VDb250ZXh0KSB7XG4gICAgICAgIHRoaXMuJGNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLiRhcGlGYWN0b3J5ID0gdGhpcy5fY3JlYXRlQVBJRmFjdG9yeSgpIHx8IGNvbnRleHQuZ2V0RGVmYXVsdEFQSUZhY3RvcnkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBBUEkgYnJpZGdlXG4gICAgICogQHBhcmFtIHBsYXRmb3JtIC0gVGhlIHJ1bnRpbWUgcGxhdGZvcm1cbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZUFQSShwbGF0Zm9ybTogUGxhdGZvcm0pOiBGdXNlQVBJIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFQSUZhY3RvcnkoKS5jcmVhdGUocGxhdGZvcm0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBcbiAgICAgKiBDcmVhdGUgYSBjb25jcmV0ZSB7QGxpbmsgRnVzZUFQSX0gZmFjdG9yeSBjYXBhYmxlIG9mIGNyZWF0aW5nIEZ1c2VBUElcbiAgICAgKiBpbnN0YW5jZSBmb3IgdGhlIGN1cnJlbnQgcnVudGltZS5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBBIGNvbmNyZXRlIHtAbGluayBGdXNlQVBJfSBGYWN0b3J5XG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVBUElGYWN0b3J5KCk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBUaGUgY29uY3JldGUgQVBJIGZhY3RvcnlcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2dldEFQSUZhY3RvcnkoKTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRhcGlGYWN0b3J5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRBUElPcHRzIGlzIGEgcGx1Z2luIGdlbmVyaWMgdHlwZSBkZWNsYXJpbmcgb3B0aW9ucy5cbiAgICAgKiBVc2VyIG1heSB1c2UgdGhpcyB0byBkZWNsYXJlIGEgcGF0aCBvbiBob3cgdG8gZ2V0IGEgcGFydGljdWxhciBGdXNlQVBJLlxuICAgICAqIFxuICAgICAqIFRoaXMgQVBJIG1heSBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXMgdG8gdXRpbGlzZSB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBpcyB0byBzaW1wbHkgcmV0dXJuIGEgc3RhbmRhcmQgRnVzZUFQSS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gb3B0cyAtIEFQSSBvcHRpb25zXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9nZXRBUEkob3B0cz86IFRBUElPcHRzKTogRnVzZUFQSSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRnZXRBUEkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RhbmRhcmQgRnVzZUFQSVxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHByaXZhdGUgJGdldEFQSSgpOiBGdXNlQVBJIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFQSUZhY3RvcnkoKS5jcmVhdGUodGhpcy5nZXRDb250ZXh0KCkuZ2V0UGxhdGZvcm0oKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNhbGxiYWNrIGNvbnRleHQgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIG5hdGl2ZVxuICAgICAqIFRoZSBuYXRpdmUgY29kZSBjYW4gdXNlIHRoZSBjYWxsYmFja0lEIHRvIGNhbGxiYWNrIHRvIHRoZSBKUyBjb2RlLlxuICAgICAqIFxuICAgICAqIFRoZSBjYWxsYmFjayBjYW4gYmUgdXNlZCBzZXZlcmFsIHRpbWVzLlxuICAgICAqIFxuICAgICAqIFJlbGVhc2UgdGhlIGNhbGxiYWNrIHVzaW5nIF9yZWxlYXNlQ2FsbGJhY2sgd2l0aCB0aGUgZ2l2ZW4gY2FsbGJhY2tJRC5cbiAgICAgKiBUaGVzZSBBUEkgdXNhZ2VzIHNob3VsZCBiZSBwYXJ0IG9mIHlvdXIgcGx1Z2luIEFQSS4gV2hlbiByZWxlYXNpbmcgYSBjYWxsYmFjayxcbiAgICAgKiBhIHN0YW5kYXJkIEFQSSBjYWxsIHNob3VsZCBiZSBtYWRlIHRvIHlvdXIgcGx1Z2luIHRvIHRlbGwgdGhlIG5hdGl2ZSBzaWRlIHRoYXRcbiAgICAgKiB0aGUgY2FsbGJhY2sgaXMgbm8gbG9uZ2VyIHVzYWJsZSwgYW5kIGl0IHNob3VsZCBjbGVhbiB1cCB0aGUgbmF0aXZlIHJlc291cmNlcyBzdXJyb3VuZGluZ1xuICAgICAqIHRoZSBjYWxsYmFjayBjb250ZXh0LlxuICAgICAqIFxuICAgICAqIE5vdGUgdGhhdCBjYWxsYmFjayBkYXRhIHBheWxvYWRzIG9ubHkgc3VwcG9ydHMgc3RyaW5ncy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY2IgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gXG4gICAgICogQHJldHVybnMgU3RyaW5nIC0gY2FsbGJhY2tJRFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfY3JlYXRlQ2FsbGJhY2soY2I6IFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyLCBhcGlPcHRzPzogVEFQSU9wdHMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QVBJKGFwaU9wdHMpLmNyZWF0ZUNhbGxiYWNrQ29udGV4dChjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVsZWFzZXMgYSBjcmVhdGVkIGNhbGxiYWNrLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBpZCAtIGNhbGxiYWNrSURcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX3JlbGVhc2VDYWxsYmFjayhpZDogc3RyaW5nLCBhcGlPcHRzPzogVEFQSU9wdHMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZ2V0QVBJKGFwaU9wdHMpLnJlbGVhc2VDYWxsYmFjayhpZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgRnVzZUNvbnRleHRcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBUaGUgY3VycmVudCBjb250ZXh0XG4gICAgICovXG4gICAgcHVibGljIGdldENvbnRleHQoKTogRnVzZUNvbnRleHQge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29udGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIFxuICAgICAqIENvbmNyZXRlIGNsYXNzZXMgc2hvdWxkIGltcGxlbWVudCBhbmQgcmV0dXJuIGEgc3RyaW5nIHRoYXQgdW5pcXVlbHkgcmVwcmVzZW50cyB0aGlzIHBsdWdpbi5cbiAgICAgKiBUaGUgc3RyaW5nIG11c3QgY29uZm9ybSB0byBVUkwgZnJhZ21lbnQgcnVsZXMuIEl0IHNoYWxsIG9ubHkgY29udGFpbiB0aGUgZm9sbG93aW5nIGNoYXJhY3RlcnM6XG4gICAgICogIC0gQWxwaGFiZXRpY2FsIGxldHRlcnNcbiAgICAgKiAgLSBOdW1iZXJzXG4gICAgICogIC0gZG90cyBhbmQgaHlwaGVuc1xuICAgICAqIFxuICAgICAqIEB2aXJ0dWFsXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF9nZXRJRCgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwbHVnaW4gSURcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0SUQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldElEKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGV4ZWN1dGlvbiBBUEkuIENvbmNyZXRlIGNsYXNzZXMgY2FuIGNhbGwgdGhpcyB0byBwZXJmb3JtIGNhbGxzIHRvIHRoZSBuYXRpdmUgc2lkZS5cbiAgICAgKiBcbiAgICAgKiBUaGUgY29uY3JldGUgY2xhc3Mgc2hvdWxkIGV4cG9zZSBwdWJsaWMgbWV0aG9kcyB3aXRoIHR5cGUgaW5mb3JtYXRpb24gZXhwb3NlZC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbWV0aG9kIC0gVGhlIG1ldGhvZCBsaW5rLCB0aGlzIHNob3VsZCBtYXRjaCB0aGUgZW5kcG9pbnQgZGVmaW5lZCBpbiB0aGUgbmF0aXZlIEFQSS5cbiAgICAgKiBAcGFyYW0gY29udGVudFR5cGUgLSB0aGUgTUlNRSB0eXBlIG9mIHRoZSBkYXRhIHlvdSBhcmUgcGFzc2luZyBpbi5cbiAgICAgKiBAcGFyYW0gZGF0YSAtIFRoZSBkYXRhIHRvIHBhc3MgdG8gdGhlIG5hdGl2ZSBlbnZpcm9ubWVudFxuICAgICAqIEByZXR1cm5zIFRoZSByZXNwb25zZSBib2R5IGZyb20gbmF0aXZlLiBGdXNlUmVzcG9uc2VSZWFkZXIgaGFzIHNvbWUgdXRpbGl0eSBtZXRob2RzIHRvIHJlYWQgdGhlIGRhdGEgaW4gY29tbW9uIGZvcm1hdHMgKGUuZy4gdGV4dCBvciBKU09OKVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhc3luYyBfZXhlYyhtZXRob2Q6IHN0cmluZywgY29udGVudFR5cGU/OiBzdHJpbmcsIGRhdGE/OiBUU2VyaWFsaXphYmxlLCBhcGlPcHRzPzogVEFQSU9wdHMpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fZ2V0QVBJKGFwaU9wdHMpLmV4ZWN1dGUodGhpcy5nZXRJRCgpLCBtZXRob2QsIGNvbnRlbnRUeXBlLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIFRoaXMgaXMgdXNlZnVsIHdoZW4geW91IHdhbnQgdG8gdXNlIGFuIEFQSSBhcyBhIGNhbGxiYWNrLCB3aXRob3V0IGV4cG9zaW5nXG4gICAgICogdGhlIHBsdWdpbiBpbXBsZW1lbnRhdGlvbi4gVGhlIHJldHVybmVkIGZ1bmN0aW9uIGlzIGEgYm91bmRlZCBmdW5jdGlvbi5cbiAgICAgKiBXaGVuIGludm9rZWQsIGl0IHdpbGwgY2FsbCBvbiB0aGUgQVBJIGVuZHBvaW50IGFuZCByZXR1cm5zIGEge0BsaW5rIEZ1c2VBUElSZXNwb25zZX1cbiAgICAgKiBhc3luY2hyb25vdXNseS5cbiAgICAgKiBcbiAgICAgKiBAc2VhbGVkXG4gICAgICogQHBhcmFtIHJvdXRlIC0gVGhlIEFQSSBlbmQgcG9pbnRcbiAgICAgKiBAcGFyYW0gc2VyaWFsaXplciAtIFRoZSBzZXJpYWxpemVyIHRvIHVzZS4gRGVmYXVsdHMgdG8ge0BsaW5rIEZ1c2VTZXJpYWxpemVyfSB3aGljaCBpcyBhIHNlbnNpYmxlIHNlcmlhbGl6ZXIuXG4gICAgICogQHJldHVybnMgQSBjb250ZXh0LWJpbmRpbmcgZnVuY3Rpb24gdGhhdCBjYW4gYmUgZ2l2ZW4gdG8gYW5vdGhlciBvYmplY3QuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVBUElCcmlkZ2Uocm91dGU6IHN0cmluZywgc2VyaWFsaXplcj86IEZ1c2VTZXJpYWxpemVyKTogVEFQSUJyaWRnZUZ1bmN0aW9uIHtcbiAgICAgICAgaWYgKCFzZXJpYWxpemVyKSB7XG4gICAgICAgICAgICBzZXJpYWxpemVyID0gbmV3IEZ1c2VTZXJpYWxpemVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXN5bmMgKHR5cGU/OiBDb250ZW50VHlwZSwgZGF0YT86IFRTZXJpYWxpemFibGUpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2V4ZWMocm91dGUsIHR5cGUsIHNlcmlhbGl6ZXIuc2VyaWFsaXplKGRhdGEpKTtcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogQSBzdGF0aWMgY2xhc3Mgd2l0aCBjb252ZW5pZW5jZSBtZXRob2RzIGZvciByZWFkaW5nIGNvbW1vblxuICogcmVzcG9uc2UgY29udGVudCBib2R5IGZvcm1hdHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlUmVzcG9uc2VSZWFkZXIge1xuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBSZWFkcyB0aGUgZGF0YSBidWZmZXIgYXMgYSBzdHJpbmdcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZGF0YSAtIGlucHV0IGRhdGFcbiAgICAgKiBAcmV0dXJucyBUaGUgYnVmZmVyIGNvbnRlbnRzIGFzIGEgc3RyaW5nXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyByZWFkQXNUZXh0KGRhdGE6IEFycmF5QnVmZmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVhZGVyOiBGaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSg8c3RyaW5nPnJlYWRlci5yZXN1bHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlYWRlci5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KG5ldyBCbG9iKFtkYXRhXSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIFJlYWRzIHRoZSBnaXZlbiBkYXRhIGJ1ZmZlciBhcyBhIEpTT04gb2JqZWN0LiBUaGUgSlNPTiBvYmplY3RcbiAgICAgKiBjYW4gYmUgdHlwZWQgYXMgVCBnZW5lcmljLiBObyB2YWxpZGF0aW9ucyBvY2N1cnMgb24gd2hldGhlciB0aGUgZ2l2ZW5cbiAgICAgKiBkYXRhIGlzIGFjdHVhbGx5IGEgdHlwZSBvZiBULlxuICAgICAqIFxuICAgICAqIEB0aHJvd3Mge0BsaW5rIFN5bnRheEVycm9yfVxuICAgICAqIElmIGRhdGEgaXMgbm90IHBhcnNlYWJsZSBhcyBKU09OLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBkYXRhIC0gaW5wdXQgZGF0YVxuICAgICAqIEByZXR1cm5zIFRoZSBidWZmZXIgY29udGVudHMgYXMgYSBKU09OIG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlYWRBc0pTT048VD4oZGF0YTogQXJyYXlCdWZmZXIpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgY29uc3Qgc3RyOiBzdHJpbmcgPSBhd2FpdCB0aGlzLnJlYWRBc1RleHQoZGF0YSk7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cik7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBJU2VyaWFsaXphYmxlIH0gZnJvbSBcIi4vSVNlcmlhbGl6YWJsZVwiO1xuaW1wb3J0IHsgVFNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL1RTZXJpYWxpemFibGVcIjtcblxuLyoqXG4gKiBBIGNsYXNzIHRvIHNlcmlhbGl6ZSBzZXZlcmFsIGRpZmZlcmVudCB0eXBlcyBvZiBvYmplY3RzIGludG8gYSBkYXRhIHN0cnVjdHVyZVxuICogdGhhdCBjYW4gYmUgcmVjb25zdHJ1Y3RlZCBhY3Jvc3MgdGhlIEZ1c2UgQVBJIGJyaWRnZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VTZXJpYWxpemVyIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVUb1N0cmluZyhvYmo6IFRTZXJpYWxpemFibGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplUHJpbWl0aXZlVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplRGF0ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5faXNJU2VyaWFsaXphYmxlKG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVUb1N0cmluZyhvYmouc2VyaWFsaXplKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplRXJyb3JUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2hlbiBhbGwgZWxzZSBmYWlscywgYXR0ZW1wdCB0byBKU09OIHN0cmluZ2lmeVxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZVByaW1pdGl2ZVRvU3RyaW5nKG9iajogbnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBvYmoudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZUVycm9yVG9TdHJpbmcob2JqOiBFcnJvcik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRFcnJvciA9IHtcbiAgICAgICAgICAgIG5hbWU6IG9iai5uYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogb2JqLm1lc3NhZ2UsXG4gICAgICAgICAgICBzdGFjazogb2JqLnN0YWNrXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHNlcmlhbGl6ZWRFcnJvciwgbnVsbCwgNCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVEYXRlVG9TdHJpbmcob2JqOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIG9iai50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlcmlhbGl6ZXMgdGhlIGdpdmVuIG9iamVjdCBpbnRvIGEgYmxvYi5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gb2JqIC0gQSBzdXBwb3J0ZWQgc2VyaWFsaXphYmxlIG9iamVjdC4gU2VlIHtAbGluayBUU2VyaWFsaXphYmxlfSBmb3JcbiAgICAgKiBhIGxpc3Qgb2YgY3VycmVudGx5IHN1cHBvcnRlZCB0eXBlc1xuICAgICAqIEByZXR1cm5zIEEgc2VyaWFsaXplZCBibG9iXG4gICAgICovXG4gICAgcHVibGljIHNlcmlhbGl6ZShvYmo6IFRTZXJpYWxpemFibGUpOiBCbG9iIHtcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYmluOiBCbG9iO1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgYmluID0gb2JqO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCBvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqKV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbb2JqXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5faXNJU2VyaWFsaXphYmxlKG9iaikpIHtcbiAgICAgICAgICAgIGJpbiA9IG5ldyBCbG9iKFt0aGlzLnNlcmlhbGl6ZShvYmouc2VyaWFsaXplKCkpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBzaG91bGQgYmUgZWl0aGVyIEpTT04gb2JqZWN0cyBvciBqc29uIGFycmF5cyBhdCB0aGlzIHBvaW50XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqKV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJpbjtcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHByb3RlY3RlZCBfaXNJU2VyaWFsaXphYmxlKHg6IGFueSk6IHggaXMgSVNlcmlhbGl6YWJsZSB7XG4gICAgICAgIHJldHVybiAhIXguc2VyaWFsaXplICYmIHR5cGVvZiB4LnNlcmlhbGl6ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IENvbnRlbnRUeXBlIH0gZnJvbSAnLi9Db250ZW50VHlwZSc7XG5pbXBvcnQge0Z1c2VBUEl9IGZyb20gJy4vRnVzZUFQSSc7XG5pbXBvcnQgeyBGdXNlQVBJUmVzcG9uc2UgfSBmcm9tICcuL0Z1c2VBUElSZXNwb25zZSc7XG5pbXBvcnQge0Z1c2VFcnJvcn0gZnJvbSAnLi9GdXNlRXJyb3InO1xuXG4vKipcbiAqIEEgRnVzZSBBUEkgaW1wbGVtZW50YXRpb24gdGhhdCB1c2VzIEhUVFAgcHJvdG9jb2wgdG8gbWFrZSBuYXRpdmUgY2FsbHNcbiAqL1xuZXhwb3J0IGNsYXNzIEhUVFBGdXNlQVBJIGV4dGVuZHMgRnVzZUFQSSB7XG4gICAgXG4gICAgcHJvdGVjdGVkIGFzeW5jIF9nZXRFbmRwb2ludCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIF9pbml0SGVhZGVycyh4aHI6IFhNTEh0dHBSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7fVxuXG4gICAgcHVibGljIGFzeW5jIGJ1aWxkUm91dGUocGx1Z2luSUQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBlbmRwb2ludDogc3RyaW5nID0gYXdhaXQgdGhpcy5fZ2V0RW5kcG9pbnQoKTtcbiAgICAgICAgcmV0dXJuIGAke2VuZHBvaW50fSR7dGhpcy5fY3JlYXRlUm91dGUocGx1Z2luSUQsIG1ldGhvZCl9YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX2V4ZWN1dGUocGx1Z2luSUQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGNvbnRlbnRUeXBlOiBzdHJpbmcsIGRhdGE6IEJsb2IpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCB4aHI6IFhNTEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICB4aHIub3BlbignUE9TVCcsIGF3YWl0IHRoaXMuYnVpbGRSb3V0ZShwbHVnaW5JRCwgbWV0aG9kKSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjb250ZW50VHlwZSA9IENvbnRlbnRUeXBlLkJJTkFSWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuX2luaXRIZWFkZXJzKHhocik7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9kb1JlcXVlc3QoeGhyLCBkYXRhKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2RvUmVxdWVzdCh4aHI6IFhNTEh0dHBSZXF1ZXN0LCBkYXRhOiBCbG9iKTogUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogRnVzZUFQSVJlc3BvbnNlID0gbmV3IEZ1c2VBUElSZXNwb25zZSh4aHIucmVzcG9uc2UsIHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSwgeGhyLnN0YXR1cyk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmlzRXJyb3IoKSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoYXdhaXQgcmVzcG9uc2UucmVhZEFzRXJyb3IoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBGdXNlRXJyb3IoJ0Z1c2VBUEknLCAnTmV0d29yayBFcnJvcicpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbnRpbWVvdXQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRnVzZUVycm9yKCdGdXNlQVBJJywgJ0FQSSBUaW1lb3V0JykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fZG9TZW5kKHhociwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZG9TZW5kKHhocjogWE1MSHR0cFJlcXVlc3QsIGRhdGE6IEJsb2IpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCAmJiBkYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICB4aHIuc2VuZChkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogRW51bWVyYXRpb24gZm9yIHN1cHBvcnRlZCBwbGF0Zm9ybXNcbiAqL1xuZXhwb3J0IGVudW0gUGxhdGZvcm0ge1xuICAgIElPUyA9IDEsXG4gICAgQU5EUk9JRCxcbiAgICAvKipcbiAgICAgKiBTcGVjaWFsaXplZCBwbGF0Zm9ybSB1c2VkIGZvciB0ZXN0IGVudmlyb25tZW50cyxcbiAgICAgKiB3aWxsIG5vdCBiZSB1c2VkIGZvciByZWd1bGFyIHJ1bnRpbWVzLlxuICAgICAqL1xuICAgIFRFU1Rcbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9QbGF0Zm9ybVwiO1xuXG4vKipcbiAqIEEgc3RyYXRlZ3kgdG8gcmVzb2x2ZSB0aGUgcnVudGltZSdzIHBsYXRmb3JtXG4gKi9cbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybVJlc29sdmVyIHtcbiAgICBwdWJsaWMgcmVzb2x2ZSgpOiBQbGF0Zm9ybSB7XG4gICAgICAgIGlmICh0aGlzLmlzSU9TRW52aXJvbm1lbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIFBsYXRmb3JtLklPUztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoZSBvbmx5IG90aGVyIHN1cHBvcnRlZCBwbGF0Zm9ybSBpcyBBbmRyb2lkLCBzb1xuICAgICAgICAgICAgLy8gaXQncyBhc3N1bWVkXG4gICAgICAgICAgICByZXR1cm4gUGxhdGZvcm0uQU5EUk9JRDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc0lPU0Vudmlyb25tZW50KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wgPT09ICdidGZ1c2U6JztcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNBbmRyb2lkRW52aXJvbm1lbnQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5pc0lPU0Vudmlyb25tZW50KCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCByZXByZXNlbnRzIGEge0BsaW5rIGh0dHBzOi8vc2VtdmVyLm9yZy99IHZlcnNpb25pbmcuXG4gKi9cbmV4cG9ydCBjbGFzcyBWZXJzaW9uIHtcbiAgICBwcml2YXRlICRtYWpvcjogbnVtYmVyO1xuICAgIHByaXZhdGUgJG1pbm9yOiBudW1iZXI7XG4gICAgcHJpdmF0ZSAkcGF0Y2g/OiBudW1iZXI7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExFU1NfVEhBTjogbnVtYmVyID0gLTE7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFUVVBTDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdSRUFURVJfVEhBTjogbnVtYmVyID0gMTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihtYWpvcjogbnVtYmVyLCBtaW5vcj86IG51bWJlciwgcGF0Y2g/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy4kbWFqb3IgPSBtYWpvcjtcbiAgICAgICAgdGhpcy4kbWlub3IgPSBtaW5vciB8fCAwO1xuICAgICAgICB0aGlzLiRwYXRjaCA9IHBhdGNoIHx8IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBQYXJzZXMgYSBzZW12ZXItZm9ybWF0dGVkIHZlcnNpb24gc3RyaW5nIGFuZCBjcmVhdGVzIGEgVmVyc2lvbiBvYmplY3QuXG4gICAgICogRG9lcyBub3Qgc3VwcG9ydCBwcmUtcmVsZWFzZSBsYWJlbHMsIHdoaWNoIHdpbGwgYmUgY2hvcHBlZCBvZmYuXG4gICAgICogSWYgYW55IGRvdCBub3RhdGlvbiBzZWdtZW50IGlzIG1pc3Npbmcgb3IgaXMgbm90IHBhcnNlYWJsZSBhcyBhbiBpbnRlZ2VyLFxuICAgICAqIGl0IHdpbGwgZGVmYXVsdCB0byAwLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB2ZXJzaW9uIC0gU2VtdmVyIGZvcm1hdHRlZCB2ZXJzaW9uIHN0cmluZ1xuICAgICAqIEByZXR1cm5zIEEgdmVyc2lvbiBvYmplY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHBhcnNlVmVyc2lvblN0cmluZyh2ZXJzaW9uOiBzdHJpbmcpOiBWZXJzaW9uIHtcbiAgICAgICAgY29uc3QgcGFydHM6IHN0cmluZ1tdID0gdmVyc2lvbi5zcGxpdCgnLicpO1xuXG4gICAgICAgIGxldCBtYWpvcjogbnVtYmVyID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICBsZXQgbWlub3I6IG51bWJlciA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICAgICAgbGV0IHBhdGNoOiBudW1iZXIgPSBwYXJzZUludChwYXJ0c1syXSk7XG5cbiAgICAgICAgaWYgKGlzTmFOKG1ham9yKSkge1xuICAgICAgICAgICAgbWFqb3IgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKG1pbm9yKSkge1xuICAgICAgICAgICAgbWlub3IgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKHBhdGNoKSkge1xuICAgICAgICAgICAgcGF0Y2ggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWZXJzaW9uKG1ham9yLCBtaW5vciwgcGF0Y2gpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBzZWFsZWRcbiAgICAgKiBAcmV0dXJucyBUaGUgbWFqb3IgY29tcG9uZW50IG9mIHRoaXMgdmVyc2lvblxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRNYWpvcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kbWFqb3I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHNlYWxlZFxuICAgICAqIEByZXR1cm5zIFRoZSBtaW5vciBjb21wb25lbnQgb2YgdGhpcyB2ZXJzaW9uXG4gICAgICovXG4gICAgcHVibGljIGdldE1pbm9yKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRtaW5vcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc2VhbGVkXG4gICAgICogQHJldHVybnMgVGhlIHBhdGNoIGNvbXBvbmVudCBvZiB0aGlzIHZlcnNpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UGF0Y2goKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHBhdGNoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBzZWFsZWRcbiAgICAgKiBAcmV0dXJucyBBIHNlbXZlci1mb3JtYXR0ZWQgc3RyaW5nXG4gICAgICovXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLiRtYWpvcn0uJHt0aGlzLiRtaW5vcn0uJHt0aGlzLiRwYXRjaH1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBzZWFsZWRcbiAgICAgKiBAcGFyYW0gYiAtIFRoZSByaWdodCBzaWRlIHZlcnNpb25cbiAgICAgKiBAcmVtYXJrc1xuICAgICAqICBUaGlzIGlzIHRoZSBlcXVpdmlsYW50IGluIHVzaW5nIGBWZXJzaW9uLmNvbXBhcmUodGhpcywgYilgLlxuICAgICAqICBTZWUge0BsaW5rIGNvcG1hcmV9IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICovXG4gICAgcHVibGljIGNvbXBhcmUoYjogVmVyc2lvbik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBWZXJzaW9uLmNvbXBhcmUodGhpcywgYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBDb21wYXJlcyB0aGlzIHZlcnNpb24gd2l0aCBhbm90aGVyLiBJZiBsZWZ0IHNpZGUgaXMgZ3JlYXRlciB0aGFuIHJpZ2h0IHNpZGUsXG4gICAgICoge0BsaW5rIEdSRUFURVJfVEhBTn0gaXMgcmV0dXJuZWQuIElmIHRoZXkgYXJlIGVxdWFsLCB7QGxpbmsgRVFVQUx9IGlzIHJldHVybmVkLlxuICAgICAqIE90aGVyd2lzZSwge0BsaW5rIExFU1NfVEhBTn0gaXMgcmV0dXJuZWQuXG4gICAgICogXG4gICAgICogQHBhcmFtIGxocyAtIFRoZSBsZWZ0IHNpZGUgdmVyc2lvblxuICAgICAqIEBwYXJhbSByaHMgLSBUaGUgcmlnaHQgc2lkZSB2ZXJzaW9uXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb21wYXJlKGxoczogVmVyc2lvbiwgcmhzOiBWZXJzaW9uKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGxocy4kbWFqb3IgPT09IHJocy4kbWFqb3IgJiYgbGhzLiRtaW5vciA9PT0gcmhzLiRtaW5vciAmJiBsaHMuJHBhdGNoID09PSByaHMuJHBhdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gVmVyc2lvbi5FUVVBTDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaHMuJG1ham9yID09PSByaHMuJG1ham9yKSB7XG4gICAgICAgICAgICBpZiAobGhzLiRtaW5vciA9PT0gcmhzLiRtaW5vcikge1xuICAgICAgICAgICAgICAgIGlmIChsaHMuJHBhdGNoID09PSByaHMuJHBhdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3VsZG4ndCBoYXZlIHJlYWNoZWQgaGVyZS4uLiBhcyBpdCBzaG91bGQgaGF2ZSBiZWVuIGNhdWdodCBieSB0aGUgc2ltcGxlIHRlc3QgYWJvdmUgZmlyc3RcbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0IGZvciBjb25zaXN0ZW5jeSB3ZSB3aWxsIGtlZXAgaXQgaGVyZS5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZlcnNpb24uRVFVQUxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsaHMuJHBhdGNoID4gcmhzLiRwYXRjaCA/IFZlcnNpb24uR1JFQVRFUl9USEFOIDogVmVyc2lvbi5MRVNTX1RIQU47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxocy4kbWlub3IgPiByaHMuJG1pbm9yID8gVmVyc2lvbi5HUkVBVEVSX1RIQU4gOiBWZXJzaW9uLkxFU1NfVEhBTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBsaHMuJG1ham9yID4gcmhzLiRtYWpvciA/IFZlcnNpb24uR1JFQVRFUl9USEFOIDogVmVyc2lvbi5MRVNTX1RIQU47XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyNCBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IEFic3RyYWN0RnVzZUFQSUZhY3RvcnkgfSBmcm9tICcuLi9BYnN0cmFjdEZ1c2VBUElGYWN0b3J5JztcbmltcG9ydCB7IEZ1c2VDb250ZXh0IH0gZnJvbSAnLi4vRnVzZUNvbnRleHQnO1xuaW1wb3J0IHsgSUZ1c2VMb2dnZXIgfSBmcm9tICcuLi9JRnVzZUxvZ2dlcic7XG5pbXBvcnQgeyBJSW5zZXQgfSBmcm9tICcuLi9JSW5zZXQnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuLi9QbGF0Zm9ybSc7XG5cbmV4cG9ydCBjbGFzcyBBbmRyb2lkRnVzZUNvbnRleHQgZXh0ZW5kcyBGdXNlQ29udGV4dCB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGFwaUZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3RvcnksIGxvZ2dlcjogSUZ1c2VMb2dnZXIpIHtcbiAgICAgICAgc3VwZXIoUGxhdGZvcm0uQU5EUk9JRCwgYXBpRmFjdG9yeSwgbG9nZ2VyKTtcblxuICAgICAgICB0aGlzLl9nZXRSdW50aW1lKCkucmVnaXN0ZXJJbnNldEhhbmRsZXIoKGluc2V0OiBJSW5zZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHI6IEhUTUxIdG1sRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJzpyb290Jyk7XG4gICAgICAgICAgICByLnN0eWxlLnNldFByb3BlcnR5KCctLWZ1c2UtaW5zZXQtdG9wJywgYCR7aW5zZXQudG9wfXB4YCk7XG4gICAgICAgICAgICByLnN0eWxlLnNldFByb3BlcnR5KCctLWZ1c2UtaW5zZXQtYm90dG9tJywgYCR7aW5zZXQuYm90dG9tfXB4YCk7XG4gICAgICAgICAgICByLnN0eWxlLnNldFByb3BlcnR5KCctLWZ1c2UtaW5zZXQtbGVmdCcsIGAke2luc2V0LmxlZnR9cHhgKTtcbiAgICAgICAgICAgIHIuc3R5bGUuc2V0UHJvcGVydHkoJy0tZnVzZS1pbnNldC1yaWdodCcsIGAke2luc2V0LnJpZ2h0fXB4YCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBvbldlYnZpZXdSZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgd2luZG93LkJURnVzZU5hdGl2ZS5vbldlYnZpZXdSZWFkeSgpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgSU5hdGl2ZUxvZ0VudHJ5IH0gZnJvbSAnLi4vSUZ1c2VMb2dnZXInO1xuaW1wb3J0IHtGdXNlTG9nZ2VyfSBmcm9tICcuLi9GdXNlTG9nZ2VyJztcbmltcG9ydCB7RnVzZUxvZ2dlckxldmVsfSBmcm9tICcuLi9GdXNlTG9nZ2VyTGV2ZWwnO1xuaW1wb3J0IHsgRnVzZUNhbGxiYWNrTWFuYWdlciB9IGZyb20gJy4uL0Z1c2VDYWxsYmFja01hbmFnZXInO1xuXG5leHBvcnQgY2xhc3MgQW5kcm9pZEZ1c2VMb2dnZXIgZXh0ZW5kcyBGdXNlTG9nZ2VyIHtcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2xvZ1RvTmF0aXZlKGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWwsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB3aW5kb3cuQlRGdXNlTmF0aXZlLmxvZyhsZXZlbCwgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF9yZWdpc3Rlck5hdGl2ZUNhbGJsYWNrKCk6IHZvaWQge1xuICAgICAgICB3aW5kb3cuQlRGdXNlTmF0aXZlLnNldExvZ0NhbGxiYWNrKEZ1c2VDYWxsYmFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVDYWxsYmFjaygocGF5bG9hZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW50cnk6IElOYXRpdmVMb2dFbnRyeSA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGVudHJ5ID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fb25OYXRpdmVMb2dFbnRyeShlbnRyeSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7SFRUUEZ1c2VBUEl9IGZyb20gJy4uL0hUVFBGdXNlQVBJJztcblxuLyoqXG4gKiBBIEZ1c2UgQVBJIGltcGxlbWVudGF0aW9uIGZvciBhbiBlbWJlZGRlZCBIVFRQIHNlcnZlciB0byBicmlkZ2UgdGhlIEpTIGFuZCBOYXRpdmUgQVBJIGNhbGxzLlxuICovXG5leHBvcnQgY2xhc3MgQW5kcm9pZFNjaGVtZUZ1c2VBUEkgZXh0ZW5kcyBIVFRQRnVzZUFQSSB7XG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIF9nZXRFbmRwb2ludCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYGh0dHBzOi8vbG9jYWxob3N0OiR7d2luZG93LkJURnVzZU5hdGl2ZS5nZXRBUElQb3J0KCl9YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX2luaXRIZWFkZXJzKHhocjogWE1MSHR0cFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtRnVzZS1TZWNyZXQnLCB3aW5kb3cuQlRGdXNlTmF0aXZlLmdldEFQSVNlY3JldCgpKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2FuZHJvaWQvaW50ZXJuYWwvQlRGdXNlTmF0aXZlLmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW9zL2ludGVybmFsL21lc3NhZ2VIYW5kbGVycy5kLnRzXCIgLz5cblxuXG4vLyBDb21tb24gQVBJXG5leHBvcnQge1BsYXRmb3JtfSBmcm9tICcuL1BsYXRmb3JtJztcbmV4cG9ydCB7UGxhdGZvcm1SZXNvbHZlcn0gZnJvbSAnLi9QbGF0Zm9ybVJlc29sdmVyJztcbmV4cG9ydCB7RnVzZUNvbnRleHR9IGZyb20gJy4vRnVzZUNvbnRleHQnO1xuZXhwb3J0IHtGdXNlQ29udGV4dEJ1aWxkZXJ9IGZyb20gJy4vRnVzZUNvbnRleHRCdWlsZGVyJztcbmV4cG9ydCB7VmVyc2lvbn0gZnJvbSAnLi9WZXJzaW9uJztcbmV4cG9ydCB7XG4gICAgRnVzZUFQSSxcbiAgICBURnVzZUFQSVJlc3BvbnNlRGF0YSxcbiAgICBJRnVzZUFQSUNhbGxQYWNrZXRcbn0gZnJvbSAnLi9GdXNlQVBJJztcbmV4cG9ydCB7RnVzZUNhbGxiYWNrTWFuYWdlciwgVEZ1c2VBUElDYWxsYmFja0hhbmRsZXJ9IGZyb20gJy4vRnVzZUNhbGxiYWNrTWFuYWdlcic7XG5leHBvcnQge0Z1c2VBUElSZXNwb25zZX0gZnJvbSAnLi9GdXNlQVBJUmVzcG9uc2UnO1xuZXhwb3J0IHtDb250ZW50VHlwZX0gZnJvbSAnLi9Db250ZW50VHlwZSc7XG5leHBvcnQge0Z1c2VSZXNwb25zZVJlYWRlcn0gZnJvbSAnLi9GdXNlUmVzcG9uc2VSZWFkZXInO1xuZXhwb3J0IHtGdXNlQVBJRmFjdG9yeX0gZnJvbSAnLi9GdXNlQVBJRmFjdG9yeSc7XG5leHBvcnQge0Fic3RyYWN0RnVzZUFQSUZhY3Rvcnl9IGZyb20gJy4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5leHBvcnQge1xuICAgIEZ1c2VSdW50aW1lLFxuICAgIFRQYXVzZUNhbGxiYWNrSGFuZGxlcixcbiAgICBUUmVzdW1lQ2FsbGJhY2tIYW5kbGVyLFxuICAgIElSdW50aW1lSW5mb1xufSBmcm9tICcuL3BsdWdpbnMvRnVzZVJ1bnRpbWUnO1xuZXhwb3J0IHtGdXNlUGx1Z2luLCBUQVBJQnJpZGdlRnVuY3Rpb259IGZyb20gJy4vRnVzZVBsdWdpbic7XG5leHBvcnQge0hUVFBGdXNlQVBJfSBmcm9tICcuL0hUVFBGdXNlQVBJJztcbmV4cG9ydCB7RnVzZUVycm9yfSBmcm9tICcuL0Z1c2VFcnJvcic7XG5cbi8vIFV0aWxpdGllc1xuZXhwb3J0IHtJSW5zZXR9IGZyb20gJy4vSUluc2V0JztcbmV4cG9ydCB7SVNlcmlhbGl6YWJsZX0gZnJvbSAnLi9JU2VyaWFsaXphYmxlJztcbmV4cG9ydCB7VFNlcmlhbGl6YWJsZSwgVEZ1c2VTZXJpYWxpemFibGV9IGZyb20gJy4vVFNlcmlhbGl6YWJsZSc7XG5leHBvcnQge0Z1c2VTZXJpYWxpemVyfSBmcm9tICcuL0Z1c2VTZXJpYWxpemVyJztcbmV4cG9ydCB7SUZ1c2VQZXJtaXNzaW9uUmVxdWVzdH0gZnJvbSAnLi9JRnVzZVBlcm1pc3Npb25SZXF1ZXN0JztcbmV4cG9ydCB7RnVzZVBlcm1pc3Npb25TdGF0ZX0gZnJvbSAnLi9GdXNlUGVybWlzc2lvblN0YXRlJztcbmV4cG9ydCB7XG4gICAgRnVzZVBlcm1pc3Npb25SZXF1ZXN0LFxuICAgIFRGdXNlQVBJUGVybWlzc2lvblJlcXVlc3QsXG4gICAgVEZ1c2VKdXN0aWZpY2F0aW9uSGFuZGxlcixcbiAgICBURnVzZVBlcm1pc3Npb25SZXF1ZXN0QXJndW1lbnRzXG59IGZyb20gJy4vRnVzZVBlcm1pc3Npb25SZXF1ZXN0JztcbmV4cG9ydCB7SUZ1c2VHcmFudFJlc3VsdH0gZnJvbSAnLi9JRnVzZUdyYW50UmVzdWx0JztcbmV4cG9ydCB7RnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdH0gZnJvbSAnLi9GdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0JztcblxuLy8gTG9nZ2VyXG5leHBvcnQge0Z1c2VMb2dnZXJMZXZlbH0gZnJvbSAnLi9GdXNlTG9nZ2VyTGV2ZWwnO1xuZXhwb3J0IHtJRnVzZUxvZ2dlciwgSU5hdGl2ZUxvZ0VudHJ5fSBmcm9tICcuL0lGdXNlTG9nZ2VyJztcbmV4cG9ydCB7RnVzZUxvZ2dlciwgRnVzZUxvZ2dlclNlcmlhbGl6ZXJ9IGZyb20gJy4vRnVzZUxvZ2dlcic7XG5leHBvcnQge0Fic3RyYWN0RnVzZUxvZ2dlckZhY3Rvcnl9IGZyb20gJy4vQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSc7XG5leHBvcnQge0Z1c2VMb2dnZXJGYWN0b3J5fSBmcm9tICcuL0Z1c2VMb2dnZXJGYWN0b3J5JztcblxuLy8gaU9TIFNwZWNpZmljIEFQSXMgLyBJbXBsZW1lbnRhdGlvbnNcbmV4cG9ydCB7SU9TU2NoZW1lRnVzZUFQSX0gZnJvbSAnLi9pb3MvSU9TU2NoZW1lRnVzZUFQSSc7XG5leHBvcnQge0lPU0Z1c2VMb2dnZXJ9IGZyb20gJy4vaW9zL0lPU0Z1c2VMb2dnZXInO1xuXG4vLyBBbmRyb2lkIFNwZWNpZmljIEFQSXMgLyBJbXBsZW1lbnRhdGlvbnNcbmV4cG9ydCB7QW5kcm9pZFNjaGVtZUZ1c2VBUEl9IGZyb20gJy4vYW5kcm9pZC9BbmRyb2lkU2NoZW1lRnVzZUFQSSc7XG5leHBvcnQge0FuZHJvaWRGdXNlTG9nZ2VyfSBmcm9tICcuL2FuZHJvaWQvQW5kcm9pZEZ1c2VMb2dnZXInO1xuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjQgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSAnLi4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5pbXBvcnQgeyBGdXNlQ29udGV4dCB9IGZyb20gJy4uL0Z1c2VDb250ZXh0JztcbmltcG9ydCB7IElGdXNlTG9nZ2VyIH0gZnJvbSAnLi4vSUZ1c2VMb2dnZXInO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuLi9QbGF0Zm9ybSc7XG5cbmV4cG9ydCBjbGFzcyBJT1NGdXNlQ29udGV4dCBleHRlbmRzIEZ1c2VDb250ZXh0IHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYXBpRmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSwgbG9nZ2VyOiBJRnVzZUxvZ2dlciwpIHtcbiAgICAgICAgc3VwZXIoUGxhdGZvcm0uSU9TLCBhcGlGYWN0b3J5LCBsb2dnZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBvbldlYnZpZXdSZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMub25XZWJ2aWV3UmVhZHkucG9zdE1lc3NhZ2UoJycpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgSU5hdGl2ZUxvZ0VudHJ5IH0gZnJvbSAnLi4vSUZ1c2VMb2dnZXInO1xuaW1wb3J0IHsgRnVzZUxvZ2dlciB9IGZyb20gXCIuLi9GdXNlTG9nZ2VyXCI7XG5pbXBvcnQgeyBGdXNlTG9nZ2VyTGV2ZWwgfSBmcm9tIFwiLi4vRnVzZUxvZ2dlckxldmVsXCI7XG5pbXBvcnQgeyBGdXNlQ2FsbGJhY2tNYW5hZ2VyIH0gZnJvbSAnLi4vRnVzZUNhbGxiYWNrTWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBJT1NGdXNlTG9nZ2VyIGV4dGVuZHMgRnVzZUxvZ2dlciB7XG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF9sb2dUb05hdGl2ZShsZXZlbDogRnVzZUxvZ2dlckxldmVsLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMubG9nLnBvc3RNZXNzYWdlKFtsZXZlbCwgbWVzc2FnZV0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfcmVnaXN0ZXJOYXRpdmVDYWxibGFjaygpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuc2V0TG9nQ2FsbGJhY2sucG9zdE1lc3NhZ2UoRnVzZUNhbGxiYWNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUNhbGxiYWNrKChwYXlsb2FkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnRyeTogSU5hdGl2ZUxvZ0VudHJ5ID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZW50cnkgPSBKU09OLnBhcnNlKHBheWxvYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9vbk5hdGl2ZUxvZ0VudHJ5KGVudHJ5KTtcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtIVFRQRnVzZUFQSX0gZnJvbSAnLi4vSFRUUEZ1c2VBUEknO1xuXG4vKipcbiAqIEEgRnVzZSBBUEkgaW1wbGVtZW50YXRpb24gZm9yIGlPUyB0aGF0IHVzZXMgV0tVUkxTY2hlbWVIYW5kbGVyIHRvIGJyaWRnZSB0aGUgSlMgYW5kIE5hdGl2ZSBBUEkgY2FsbHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBJT1NTY2hlbWVGdXNlQVBJIGV4dGVuZHMgSFRUUEZ1c2VBUEkge1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBhc3luYyBfZ2V0RW5kcG9pbnQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGBodHRwczovL2xvY2FsaG9zdDoke2F3YWl0IHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLmdldEFQSVBvcnQucG9zdE1lc3NhZ2UoXCJcIil9YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX2luaXRIZWFkZXJzKHhocjogWE1MSHR0cFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtRnVzZS1TZWNyZXQnLCBhd2FpdCB3aW5kb3cud2Via2l0Lm1lc3NhZ2VIYW5kbGVycy5nZXRBUElTZWNyZXQucG9zdE1lc3NhZ2UoXCJcIikpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzLTIwMjUgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBDb250ZW50VHlwZSB9IGZyb20gJy4uL0NvbnRlbnRUeXBlJztcbmltcG9ydCB7IEZ1c2VDb250ZXh0IH0gZnJvbSAnLi4vRnVzZUNvbnRleHQnO1xuaW1wb3J0IHtGdXNlUGx1Z2lufSBmcm9tICcuLi9GdXNlUGx1Z2luJztcbmltcG9ydCB7RnVzZUFQSVJlc3BvbnNlfSBmcm9tICcuLi9GdXNlQVBJUmVzcG9uc2UnO1xuXG4vKipcbiAqIEEgY2xhc3MgdG8gaW50ZXJmYWNlIHdpdGggbmF0aXZlIG1lbW9yeSBzdG9yZSBvYmplY3RcbiAqIFRoZXNlIG1lbW9yeSBzdG9yZXMgY2FuIHN0b3JlIHN0YXRlZnVsIHN0cmluZ3MuIFRoaXMgc3RhdGVcbiAqIGlzIGtlcHQgaW4gbWVtb3J5IGV2ZW4gaWYgdGhlIE9TIGRlc3Ryb3lzIHRoZSBhcHBsaWNhdGlvbidzIFVJIHdoaWxlXG4gKiB0aGUgYXBwbGljYXRpb24gaXMgaW4gdGhlIGJhY2tncm91bmQuXG4gKiBcbiAqIFRoaXMgaXMgbm90IHRvIGJlIGNvbmZ1c2VkIHdpdGggcGVyc2lzdGVudCBzdG9yYWdlLiBUaGUgbWVtb3J5XG4gKiBzdG9yZSBpcyBpbnRlbmRlZCB0byBzaW1wbHkgc3RvcmUgc3RhdGUgaW4gYmV0d2VlbiBhIHBhdXNlZCBhcHBsaWNhdGlvbi5cbiAqIElmIHRoZSBhcHBsaWNhdGlvbiBjb21wbGV0ZWx5IGdldHMgY2xvc2VkLCBkZXN0cm95ZWQgb3Igc3RvcHBlZCBieSB0aGUgdXNlcixcbiAqIHRoZSBtZW1vcnkgc3RvcmUgd2lsbCBiZSBjbGVhcmVkLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZU1lbW9yeVN0b3JlIGV4dGVuZHMgRnVzZVBsdWdpbiB7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29udGV4dDogRnVzZUNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF9nZXRJRCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ0Z1c2VNZW1vcnlTdG9yZSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGtleSAtIEEgbmFtZSBmb3IgdGhlIHZhbHVlXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIHN0b3JlLCBvbmx5IHN0cmluZ2lmaWVkIGRhdGEgaXMgcGVybWl0dGVkXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLl9leGVjKCcvc2V0JywgQ29udGVudFR5cGUuSlNPTiwge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGtleSAtIFRoZSBzdG9yZWQga2V5XG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldChrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGxldCByZXNwb25zZTogRnVzZUFQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZXhlYygnL2dldCcsIENvbnRlbnRUeXBlLlRFWFQsIGtleSk7XG4gICAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5yZWFkQXNUZXh0KCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBDb250ZW50VHlwZSB9IGZyb20gJy4uL0NvbnRlbnRUeXBlJztcbmltcG9ydCB7IEZ1c2VDb250ZXh0IH0gZnJvbSAnLi4vRnVzZUNvbnRleHQnO1xuaW1wb3J0IHtGdXNlUGx1Z2lufSBmcm9tICcuLi9GdXNlUGx1Z2luJztcbmltcG9ydCB7RnVzZUFQSVJlc3BvbnNlfSBmcm9tICcuLi9GdXNlQVBJUmVzcG9uc2UnO1xuaW1wb3J0IHsgVEluc2V0Q2FsbGJhY2sgfSBmcm9tICcuLi9USW5zZXRDYWxsYmFjayc7XG5cbmV4cG9ydCB0eXBlIFRQYXVzZUNhbGxiYWNrSGFuZGxlciA9ICgpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBUUmVzdW1lQ2FsbGJhY2tIYW5kbGVyID0gKCkgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBJUnVudGltZUluZm8ge1xuICAgIHZlcnNpb246IHN0cmluZztcbiAgICBkZWJ1Z01vZGU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBGdXNlUnVudGltZSBleHRlbmRzIEZ1c2VQbHVnaW4ge1xuICAgIHByaXZhdGUgJGNhbGxiYWNrSURzOiBzdHJpbmdbXTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBGdXNlQ29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy4kY2FsbGJhY2tJRHMgPSBbXTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2dldElEKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnRnVzZVJ1bnRpbWUnO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgYXN5bmMgZ2V0SW5mbygpOiBQcm9taXNlPElSdW50aW1lSW5mbz4ge1xuICAgICAgICBjb25zdCBkYXRhOiBGdXNlQVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9leGVjKCcvaW5mbycpO1xuICAgICAgICByZXR1cm4gYXdhaXQgZGF0YS5yZWFkQXNKU09OKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNiOiBUUGF1c2VDYWxsYmFja0hhbmRsZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjYklEOiBzdHJpbmcgPSB0aGlzLl9jcmVhdGVDYWxsYmFjaygocGF5bG9hZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB0aGlzLl9leGVjKCcvcmVnaXN0ZXJQYXVzZUhhbmRsZXInLCBDb250ZW50VHlwZS5URVhULCBjYklEKTtcbiAgICAgICAgdGhpcy4kY2FsbGJhY2tJRHMucHVzaChjYklEKTtcblxuICAgICAgICByZXR1cm4gY2JJRDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdW5yZWdpc3RlclBhdXNlSGFuZGxlcihjYWxsYmFja0lEOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3VucmVnaXN0ZXJQYXVzZUhhbmRsZXInLCBDb250ZW50VHlwZS5URVhULCBjYWxsYmFja0lEKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXJSZXN1bWVIYW5kbGVyKGNiOiBUUmVzdW1lQ2FsbGJhY2tIYW5kbGVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgY2JJRDogc3RyaW5nID0gdGhpcy5fY3JlYXRlQ2FsbGJhY2soKHBheWxvYWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3JlZ2lzdGVyUmVzdW1lSGFuZGxlcicsIENvbnRlbnRUeXBlLlRFWFQsIGNiSUQpO1xuICAgICAgICB0aGlzLiRjYWxsYmFja0lEcy5wdXNoKGNiSUQpO1xuXG4gICAgICAgIHJldHVybiBjYklEO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1bnJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYWxsYmFja0lEOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3VucmVnaXN0ZXJSZXN1bWVIYW5kbGVyJywgQ29udGVudFR5cGUuVEVYVCwgY2FsbGJhY2tJRCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlZ2lzdGVySW5zZXRIYW5kbGVyKGNiOiBUSW5zZXRDYWxsYmFjayk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGNiSUQ6IHN0cmluZyA9IHRoaXMuX2NyZWF0ZUNhbGxiYWNrKChwYXlsb2FkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNiKEpTT04ucGFyc2UocGF5bG9hZCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB0aGlzLl9leGVjKCcvcmVnaXN0ZXIvY2FsbGJhY2svaW5zZXRzJywgQ29udGVudFR5cGUuVEVYVCwgY2JJRCk7XG5cbiAgICAgICAgcmV0dXJuIGNiSUQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHVucmVnaXN0ZXJJbnNldEhhbmRsZXIoY2FsbGJhY2tJRDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMuX2V4ZWMoJy91bnJlZ2lzdGVyL2NhbGxiYWNrL2luc2V0cycsIENvbnRlbnRUeXBlLlRFWFQsIGNhbGxiYWNrSUQpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrIFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmV4cG9ydCBlbnVtIEZ1c2VMb2NhdGlvbkFjY3VyYWN5IHtcbiAgICBDT0FSU0UsXG4gICAgRklORVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWsgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuZXhwb3J0IGVudW0gRnVzZUxvY2F0aW9uRXZlbnRUeXBlIHtcbiAgICBBVkFJTEFCSUxJVFksXG4gICAgTE9DQVRJT05cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrIFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7XG4gICAgQ29udGVudFR5cGUsXG4gICAgRnVzZVBsdWdpbixcbiAgICBURnVzZUp1c3RpZmljYXRpb25IYW5kbGVyLFxuICAgIEZ1c2VDb250ZXh0LFxuICAgIEZ1c2VFcnJvclxufSBmcm9tICdAYnRmdXNlL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBGdXNlTG9jYXRpb25TdWJzY3JpcHRpb24sXG4gICAgRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9uc0J1aWxkZXIsXG4gICAgSUZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnNcbn0gZnJvbSAnLi9GdXNlTG9jYXRpb25TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgRnVzZUxvY2F0aW9uQWNjdXJhY3kgfSBmcm9tICcuL0Z1c2VMb2NhdGlvbkFjY3VyYWN5JztcbmltcG9ydCB7IElGdXNlTG9jYXRpb25VcGRhdGVFdmVudCB9IGZyb20gJy4vSUZ1c2VMb2NhdGlvblVwZGF0ZUV2ZW50JztcbmltcG9ydCB7IElGdXNlTG9jYXRpb25TZXR0aW5nc1N0YXRlIH0gZnJvbSAnLi9JRnVzZUxvY2F0aW9uU2V0dGluZ3NTdGF0ZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGdXNlTG9jYXRpb25QbHVnaW4gZXh0ZW5kcyBGdXNlUGx1Z2luIHtcbiAgICBwcml2YXRlICRjYWxsYmFja0lEOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSAkc3Vic2NyaXB0aW9uczogRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uW107XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29udGV4dDogRnVzZUNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMuJGNhbGxiYWNrSUQgPSBudWxsO1xuICAgICAgICB0aGlzLiRzdWJzY3JpcHRpb25zID0gW107XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF9nZXRJRCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ0Z1c2VMb2NhdGlvbic7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHdhdGNoKGFjY3VyYWN5OiBGdXNlTG9jYXRpb25BY2N1cmFjeSwganVzdGlmaWNhdGlvbkhhbmRsZXI6IFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIpOiBQcm9taXNlPEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbj4ge1xuICAgICAgICBsZXQgYnVpbGRlcjogRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9uc0J1aWxkZXIgPSBuZXcgRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9uc0J1aWxkZXIoKTtcbiAgICAgICAgYnVpbGRlci5zZXRBY2N1cmFjeShhY2N1cmFjeSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnN1YnNjcmliZShidWlsZGVyLmJ1aWxkKCksIGp1c3RpZmljYXRpb25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jICRpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy4kY2FsbGJhY2tJRCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kY2FsbGJhY2tJRCA9IHRoaXMuX2NyZWF0ZUNhbGxiYWNrKChkYXRhOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBldmVudDogSUZ1c2VMb2NhdGlvblVwZGF0ZUV2ZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb250ZXh0KCkuZ2V0TG9nZ2VyKCkuZXJyb3IoJ0Vycm9yIHBhcnNpbmcgTG9jYXRpb24gVXBkYXRlIGV2ZW50JywgRnVzZUVycm9yLndyYXAoZXgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLiRzdWJzY3JpcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN1YjogRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy4kc3Vic2NyaXB0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzdWIubm90aWZ5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29udGV4dCgpLmdldExvZ2dlcigpLmVycm9yKCdGdXNlTG9jYXRpb25TdWJzY3JpcHRpb24gSGFuZGxlciBFcnJvcjonLCBGdXNlRXJyb3Iud3JhcChleCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL2NhbGxiYWNrJywgQ29udGVudFR5cGUuVEVYVCwgdGhpcy4kY2FsbGJhY2tJRCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBhYnN0cmFjdCBhc3NlcnRTZXR0aW5ncyhvcHRpb25zOiBJRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9ucyk6IFByb21pc2U8SUZ1c2VMb2NhdGlvblNldHRpbmdzU3RhdGU+O1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF9zdWJzY3JpYmUob3B0aW9uczogSUZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnMsIGp1c3RpZmljYXRpb25IYW5kbGVyOiBURnVzZUp1c3RpZmljYXRpb25IYW5kbGVyKTogUHJvbWlzZTxGdXNlTG9jYXRpb25TdWJzY3JpcHRpb24+O1xuXG4gICAgcHVibGljIGFzeW5jIHN1YnNjcmliZShvcHRpb25zOiBJRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9ucywganVzdGlmaWNhdGlvbkhhbmRsZXI6IFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIpOiBQcm9taXNlPEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbj4ge1xuICAgICAgICBpZiAodGhpcy4kY2FsbGJhY2tJRCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy4kaW5pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbjogRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uID0gYXdhaXQgdGhpcy5fc3Vic2NyaWJlKG9wdGlvbnMsIGp1c3RpZmljYXRpb25IYW5kbGVyKTtcblxuICAgICAgICB0aGlzLiRzdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcblxuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1bnN1YnNjcmliZShzdWJzY3JpcHRpb246IEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuJHN1YnNjcmlwdGlvbnMuaW5kZXhPZihzdWJzY3JpcHRpb24pO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy4kc3Vic2NyaXB0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3Vuc3Vic2NyaWJlJywgQ29udGVudFR5cGUuVEVYVCwgc3Vic2NyaXB0aW9uLmdldElEKCkpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrIFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IEZ1c2VDb250ZXh0LCBGdXNlRXJyb3IsIFBsYXRmb3JtIH0gZnJvbSBcIkBidGZ1c2UvY29yZVwiO1xuaW1wb3J0IHsgRnVzZUxvY2F0aW9uUGx1Z2luIH0gZnJvbSBcIi4vRnVzZUxvY2F0aW9uUGx1Z2luXCI7XG5pbXBvcnQgeyBBbmRyb2lkRnVzZUxvY2F0aW9uUGx1Z2luIH0gZnJvbSBcIi4vYW5kcm9pZC9BbmRyb2lkRnVzZUxvY2F0aW9uUGx1Z2luXCI7XG5pbXBvcnQgeyBJT1NGdXNlTG9jYXRpb25QbHVnaW4gfSBmcm9tIFwiLi9pb3MvSU9TRnVzZUxvY2F0aW9uUGx1Z2luXCI7XG5cbmV4cG9ydCBjbGFzcyBGdXNlTG9jYXRpb25QbHVnaW5GYWN0b3J5IHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIGNyZWF0ZShjb250ZXh0OiBGdXNlQ29udGV4dCk6IEZ1c2VMb2NhdGlvblBsdWdpbiB7XG4gICAgICAgIHN3aXRjaCAoY29udGV4dC5nZXRQbGF0Zm9ybSgpKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLkFORFJPSUQ6IHJldHVybiBuZXcgQW5kcm9pZEZ1c2VMb2NhdGlvblBsdWdpbihjb250ZXh0KTtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uSU9TOiByZXR1cm4gbmV3IElPU0Z1c2VMb2NhdGlvblBsdWdpbihjb250ZXh0KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBGdXNlRXJyb3IoJ0Z1c2VMb2NhdGlvblBsdWdpbkZhY3RvcnknLCBgVW5zdXBwb3J0ZWQgcGxhdGZvcm06ICR7Y29udGV4dC5nZXRQbGF0Zm9ybSgpfWApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWsgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtcbiAgICBGdXNlRXJyb3IsXG4gICAgRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdCxcbiAgICBURnVzZVNlcmlhbGl6YWJsZVxufSBmcm9tICdAYnRmdXNlL2NvcmUnO1xuaW1wb3J0IHsgRnVzZUxvY2F0aW9uQWNjdXJhY3kgfSBmcm9tICcuL0Z1c2VMb2NhdGlvbkFjY3VyYWN5JztcbmltcG9ydCB7XG4gICAgVEZ1c2VHZW9sb2NhdGlvblBvaW50XG59IGZyb20gJy4vVEZ1c2VHZW9sb2NhdGlvblBvaW50JztcbmltcG9ydCB7IElGdXNlTG9jYXRpb25BdmFpbGFiaWxpdHlFdmVudCB9IGZyb20gJy4vSUZ1c2VMb2NhdGlvbkF2YWlsYWJpbGl0eUV2ZW50JztcbmltcG9ydCB7IElGdXNlTG9jYXRpb25VcGRhdGVFdmVudCB9IGZyb20gJy4vSUZ1c2VMb2NhdGlvblVwZGF0ZUV2ZW50JztcbmltcG9ydCB7IEZ1c2VMb2NhdGlvbkV2ZW50VHlwZSB9IGZyb20gJy4vRnVzZUxvY2F0aW9uRXZlbnRUeXBlJztcbmltcG9ydCB7IElGdXNlTG9jYXRpb25TZXR0aW5nc1N0YXRlIH0gZnJvbSAnLi9JRnVzZUxvY2F0aW9uU2V0dGluZ3NTdGF0ZSc7XG5pbXBvcnQgeyBGdXNlTG9jYXRpb25QbHVnaW4gfSBmcm9tICcuL0Z1c2VMb2NhdGlvblBsdWdpbic7XG5cbmludGVyZmFjZSBfX0lGdXNlTG9jYXRpb25TdWJzY3JpcHRpb25PcHRpb25zIHtcbiAgICBhY2N1cmFjeTogRnVzZUxvY2F0aW9uQWNjdXJhY3k7XG4gICAgaW50ZXJ2YWw6IG51bWJlcjtcbiAgICBzdWJzY3JpcHRpb25JRD86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSUZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnMgPSBURnVzZVNlcmlhbGl6YWJsZTxfX0lGdXNlTG9jYXRpb25TdWJzY3JpcHRpb25PcHRpb25zPjtcblxuZXhwb3J0IGNsYXNzIEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnNCdWlsZGVyIHtcbiAgICBwcml2YXRlICRhY2N1cmFjeTogRnVzZUxvY2F0aW9uQWNjdXJhY3k7XG4gICAgcHJpdmF0ZSAkaW50ZXJ2YWw6IG51bWJlcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy4kYWNjdXJhY3kgPSBGdXNlTG9jYXRpb25BY2N1cmFjeS5DT0FSU0U7XG4gICAgICAgIHRoaXMuJGludGVydmFsID0gMTAwMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkZXNpcmVkIGFjY3VyYWN5LlxuICAgICAqIFxuICAgICAqIFdoZXRoZXIgdGhpcyBpcyBob25vdXJlZCBkZXBlbmRzIGlmIHRoZSB1c2VyIGdyYW50cyB0aGUgYXBwcm9wcmlhdGUgcGVybWlzc2lvbi5cbiAgICAgKiBcbiAgICAgKiBAZGVmYXVsdCBGdXNlTG9jYXRpb25BY2N1cmFjeS5DT0FSU0VcbiAgICAgKiBAcGFyYW0gYWNjdXJhY3kgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIHNldEFjY3VyYWN5KGFjY3VyYWN5OiBGdXNlTG9jYXRpb25BY2N1cmFjeSk6IEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnNCdWlsZGVyIHtcbiAgICAgICAgdGhpcy4kYWNjdXJhY3kgPSBhY2N1cmFjeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGludGVydmFsIHRvIHJlY2VpdmUgR1BTIHBvaW50cy4gVGhpcyBhY3RzIGxpa2UgYSBoaW50IGJ1dCBldmVudHNcbiAgICAgKiBtYXkgY29tZSBxdWlja2VyIG9yIHNsb3dlciB0aGFuIHRoZSBkZXNpcmVkIGludGVydmFsLiBTZXZlcmFsIGRlY2lkaW5nIGZhY3RvcnNcbiAgICAgKiBpbmNsdWRpbmcgYnV0IG5vdCBsaW1pdGVkIHRvIG90aGVyIHNlcnZpY2VzIGFsc28gdXNpbmcgR1BTIGFuZCB0aGUgR1BTIGhlYWx0aC5cbiAgICAgKiBcbiAgICAgKiBAZGVmYXVsdCAxMDAwXG4gICAgICogQHBhcmFtIGludGVydmFsIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRJbnRlcnZhbChpbnRlcnZhbDogbnVtYmVyKTogRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9uc0J1aWxkZXIge1xuICAgICAgICB0aGlzLiRpbnRlcnZhbCA9IGludGVydmFsO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgYnVpbGQoKTogSUZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWNjdXJhY3k6IHRoaXMuJGFjY3VyYWN5LFxuICAgICAgICAgICAgaW50ZXJ2YWw6IHRoaXMuJGludGVydmFsXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBURnVzZUxvY2F0aW9uSGFuZGxlciA9IChwb2ludDogUmVhZG9ubHk8VEZ1c2VHZW9sb2NhdGlvblBvaW50PltdKSA9PiB2b2lkO1xuXG5leHBvcnQgY2xhc3MgRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uIHtcbiAgICBwcml2YXRlICRwbHVnaW46IEZ1c2VMb2NhdGlvblBsdWdpbjtcbiAgICBwcml2YXRlICRjYWxsYmFja3M6IFRGdXNlTG9jYXRpb25IYW5kbGVyW107XG4gICAgcHJpdmF0ZSAkZGVzaXJlZEFjY3VyYWN5OiBGdXNlTG9jYXRpb25BY2N1cmFjeTtcbiAgICBwcml2YXRlICRncmFudHM6IEZ1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQ8RnVzZUxvY2F0aW9uQWNjdXJhY3k+O1xuICAgIHByaXZhdGUgJGlkOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSAkb3B0aW9uczogSUZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnM7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocGx1Z2luOiBGdXNlTG9jYXRpb25QbHVnaW4sIGlkOiBzdHJpbmcsIG9wdGlvbnM6IElGdXNlTG9jYXRpb25TdWJzY3JpcHRpb25PcHRpb25zLCBncmFudFJlc3VsdDogRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdDxGdXNlTG9jYXRpb25BY2N1cmFjeT4pIHtcbiAgICAgICAgdGhpcy4kcGx1Z2luID0gcGx1Z2luO1xuICAgICAgICB0aGlzLiRpZCA9IGlkO1xuICAgICAgICB0aGlzLiRjYWxsYmFja3MgPSBbXTtcbiAgICAgICAgdGhpcy4kb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMuJGdyYW50cyA9IGdyYW50UmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJRCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy4kaWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGlzQXV0aG9yaXplZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGdyYW50cy5pc0dyYW50ZWQodGhpcy4kZGVzaXJlZEFjY3VyYWN5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXIoY2I6IFRGdXNlTG9jYXRpb25IYW5kbGVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuJGNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdW5yZWdpc3RlcihjYjogVEZ1c2VMb2NhdGlvbkhhbmRsZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlkeDogbnVtYmVyID0gdGhpcy4kY2FsbGJhY2tzLmluZGV4T2YoY2IpO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJGNhbGxiYWNrcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBub3RpZnkoZXZlbnQ6IElGdXNlTG9jYXRpb25BdmFpbGFiaWxpdHlFdmVudCB8IElGdXNlTG9jYXRpb25VcGRhdGVFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gRnVzZUxvY2F0aW9uRXZlbnRUeXBlLkxPQ0FUSU9OKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy4kY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNiOiBURnVzZUxvY2F0aW9uSGFuZGxlciA9IHRoaXMuJGNhbGxiYWNrc1tpXTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjYihldmVudC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2goZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGx1Z2luLmdldENvbnRleHQoKS5nZXRMb2dnZXIoKS5lcnJvcihcIlRGdXNlTG9jYXRpb25IYW5kbGVyIGVycm9yXCIsIEZ1c2VFcnJvci53cmFwKGV4KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kcGx1Z2luLmdldENvbnRleHQoKS5nZXRMb2dnZXIoKS5pbmZvKFwiUmVjZWl2ZWQgdW5oYW5kbGVkIEF2YWlsYWJpbGl0eSBldmVudFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBhc3NlcnRTZXR0aW5ncygpOiBQcm9taXNlPElGdXNlTG9jYXRpb25TZXR0aW5nc1N0YXRlPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLiRwbHVnaW4uYXNzZXJ0U2V0dGluZ3Moe1xuICAgICAgICAgICAgLi4udGhpcy4kb3B0aW9ucyxcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbklEOiB0aGlzLmdldElEKClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMuJHBsdWdpbi51bnN1YnNjcmliZSh0aGlzKTtcbiAgICB9XG59O1xuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWsgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtcbiAgICBDb250ZW50VHlwZSxcbiAgICBGdXNlQVBJUmVzcG9uc2UsXG4gICAgRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdCxcbiAgICBGdXNlUGVybWlzc2lvblJlcXVlc3QsXG4gICAgVEZ1c2VKdXN0aWZpY2F0aW9uSGFuZGxlclxufSBmcm9tIFwiQGJ0ZnVzZS9jb3JlXCI7XG5pbXBvcnQgeyBGdXNlTG9jYXRpb25QbHVnaW4gfSBmcm9tIFwiLi4vRnVzZUxvY2F0aW9uUGx1Z2luXCI7XG5pbXBvcnQgeyBGdXNlTG9jYXRpb25TdWJzY3JpcHRpb24sIElGdXNlTG9jYXRpb25TdWJzY3JpcHRpb25PcHRpb25zIH0gZnJvbSBcIi4uL0Z1c2VMb2NhdGlvblN1YnNjcmlwdGlvblwiO1xuaW1wb3J0IHsgSUZ1c2VMb2NhdGlvblNldHRpbmdzU3RhdGUgfSBmcm9tIFwiLi4vSUZ1c2VMb2NhdGlvblNldHRpbmdzU3RhdGVcIjtcbmltcG9ydCB7IEZ1c2VMb2NhdGlvbkFjY3VyYWN5IH0gZnJvbSBcIi4uL0Z1c2VMb2NhdGlvbkFjY3VyYWN5XCI7XG5cbmV4cG9ydCBjbGFzcyBBbmRyb2lkRnVzZUxvY2F0aW9uUGx1Z2luIGV4dGVuZHMgRnVzZUxvY2F0aW9uUGx1Z2luIHtcbiAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgYXNzZXJ0U2V0dGluZ3Mob3B0aW9uczogSUZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnMpOiBQcm9taXNlPElGdXNlTG9jYXRpb25TZXR0aW5nc1N0YXRlPiB7XG4gICAgICAgIGxldCByZXM6IEZ1c2VBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMuX2V4ZWMoJy9hc3NlcnRTZXR0aW5ncycsIENvbnRlbnRUeXBlLkpTT04sIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gcmVzLnJlYWRBc0pTT04oKTtcbiAgICB9XG4gICAgXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIF9zdWJzY3JpYmUob3B0aW9uczogSUZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnMsIGp1c3RpZmljYXRpb25IYW5kbGVyOiBURnVzZUp1c3RpZmljYXRpb25IYW5kbGVyKTogUHJvbWlzZTxGdXNlTG9jYXRpb25TdWJzY3JpcHRpb24+IHtcbiAgICAgICAgbGV0IHBlcm1SZXF1ZXN0OiBGdXNlUGVybWlzc2lvblJlcXVlc3Q8RnVzZUxvY2F0aW9uQWNjdXJhY3k+ID0gbmV3IEZ1c2VQZXJtaXNzaW9uUmVxdWVzdCh0aGlzLl9jcmVhdGVBUElCcmlkZ2UoJy9yZXF1ZXN0UGVybWlzc2lvbnMnKSwgW29wdGlvbnMuYWNjdXJhY3ldLCBqdXN0aWZpY2F0aW9uSGFuZGxlcik7XG4gICAgICAgIGxldCBncmFudFJlc3VsdDogRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdDxGdXNlTG9jYXRpb25BY2N1cmFjeT4gPSBudWxsO1xuICAgICAgICBncmFudFJlc3VsdCA9IGF3YWl0IHBlcm1SZXF1ZXN0LnJlcXVlc3QoKTtcblxuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uSUQ6IHN0cmluZyA9IG51bGw7XG4gICAgICAgIGxldCByZXM6IEZ1c2VBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMuX2V4ZWMoJy9zdWJzY3JpYmUnLCBDb250ZW50VHlwZS5KU09OLCBvcHRpb25zKTtcbiAgICAgICAgc3Vic2NyaXB0aW9uSUQgPSBhd2FpdCByZXMucmVhZEFzVGV4dCgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uKHRoaXMsIHN1YnNjcmlwdGlvbklELCBvcHRpb25zLCBncmFudFJlc3VsdCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmV4cG9ydCB7XG4gICAgRnVzZUxvY2F0aW9uUGx1Z2luXG59IGZyb20gJy4vRnVzZUxvY2F0aW9uUGx1Z2luJztcbmV4cG9ydCB7RnVzZUxvY2F0aW9uUGx1Z2luRmFjdG9yeX0gZnJvbSAnLi9GdXNlTG9jYXRpb25QbHVnaW5GYWN0b3J5JztcbmV4cG9ydCB7XG4gICAgRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uLFxuICAgIEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnNCdWlsZGVyLFxuICAgIElGdXNlTG9jYXRpb25TdWJzY3JpcHRpb25PcHRpb25zLFxuICAgIFRGdXNlTG9jYXRpb25IYW5kbGVyXG59IGZyb20gJy4vRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uJztcbmV4cG9ydCB7RnVzZUxvY2F0aW9uRXZlbnRUeXBlfSBmcm9tICcuL0Z1c2VMb2NhdGlvbkV2ZW50VHlwZSc7XG5leHBvcnQge0lGdXNlTG9jYXRpb25VcGRhdGVFdmVudH0gZnJvbSAnLi9JRnVzZUxvY2F0aW9uVXBkYXRlRXZlbnQnO1xuZXhwb3J0IHtJRnVzZUxvY2F0aW9uQXZhaWxhYmlsaXR5RXZlbnR9IGZyb20gJy4vSUZ1c2VMb2NhdGlvbkF2YWlsYWJpbGl0eUV2ZW50JztcbmV4cG9ydCB7RnVzZUxvY2F0aW9uQWNjdXJhY3l9IGZyb20gJy4vRnVzZUxvY2F0aW9uQWNjdXJhY3knO1xuZXhwb3J0IHtcbiAgICBURnVzZUdlb2xvY2F0aW9uUG9pbnQsXG4gICAgSUZ1c2VHZW9sb2NhdGlvblByb3BlcnRpZXNcbn0gZnJvbSAnLi9URnVzZUdlb2xvY2F0aW9uUG9pbnQnO1xuZXhwb3J0IHtJRnVzZUxvY2F0aW9uU2V0dGluZ3NTdGF0ZX0gZnJvbSAnLi9JRnVzZUxvY2F0aW9uU2V0dGluZ3NTdGF0ZSc7XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRlayBcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge1xuICAgIENvbnRlbnRUeXBlLFxuICAgIEZ1c2VBUElSZXNwb25zZSxcbiAgICBGdXNlRXJyb3IsXG4gICAgRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdCxcbiAgICBJRnVzZUdyYW50UmVzdWx0LFxuICAgIFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXJcbn0gZnJvbSBcIkBidGZ1c2UvY29yZVwiO1xuaW1wb3J0IHsgRnVzZUxvY2F0aW9uUGx1Z2luIH0gZnJvbSBcIi4uL0Z1c2VMb2NhdGlvblBsdWdpblwiO1xuaW1wb3J0IHsgRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uLCBJRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9ucyB9IGZyb20gXCIuLi9GdXNlTG9jYXRpb25TdWJzY3JpcHRpb25cIjtcbmltcG9ydCB7IElGdXNlTG9jYXRpb25TZXR0aW5nc1N0YXRlIH0gZnJvbSBcIi4uL0lGdXNlTG9jYXRpb25TZXR0aW5nc1N0YXRlXCI7XG5pbXBvcnQgeyBGdXNlTG9jYXRpb25BY2N1cmFjeSB9IGZyb20gXCIuLi9GdXNlTG9jYXRpb25BY2N1cmFjeVwiO1xuXG5pbnRlcmZhY2UgSVN1YnNjcmlwdGlvblJlc3BvbnNlIHtcbiAgICBzdWJzY3JpcHRpb25JRDogc3RyaW5nO1xuICAgIGdyYW50czogSUZ1c2VHcmFudFJlc3VsdDxGdXNlTG9jYXRpb25BY2N1cmFjeT47XG59XG5cbmV4cG9ydCBjbGFzcyBJT1NGdXNlTG9jYXRpb25QbHVnaW4gZXh0ZW5kcyBGdXNlTG9jYXRpb25QbHVnaW4ge1xuICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBhc3NlcnRTZXR0aW5ncyhvcHRpb25zOiBJRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9ucyk6IFByb21pc2U8SUZ1c2VMb2NhdGlvblNldHRpbmdzU3RhdGU+IHtcbiAgICAgICAgbGV0IHJlczogRnVzZUFQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZXhlYygnL2Fzc2VydFNldHRpbmdzJywgQ29udGVudFR5cGUuSlNPTiwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiByZXMucmVhZEFzSlNPTigpO1xuICAgIH1cbiAgICBcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX3N1YnNjcmliZShvcHRpb25zOiBJRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9ucywganVzdGlmaWNhdGlvbkhhbmRsZXI6IFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIpOiBQcm9taXNlPEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbj4ge1xuICAgICAgICBsZXQgcmVzOiBGdXNlQVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9leGVjKCcvc3Vic2NyaWJlJywgQ29udGVudFR5cGUuSlNPTiwgb3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHJlcy5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgIHRocm93IGF3YWl0IHJlcy5yZWFkQXNFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZGF0YTogSVN1YnNjcmlwdGlvblJlc3BvbnNlID0gYXdhaXQgcmVzLnJlYWRBc0pTT04oKTtcblxuICAgICAgICBpZiAoIWRhdGEuc3Vic2NyaXB0aW9uSUQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBGdXNlRXJyb3IoJ0Z1c2VMb2NhdGlvbicsICdNaXNzaW5nIHN1YnNjcmlwdGlvbiBJRCBmcm9tIHJlc3VsdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBGdXNlTG9jYXRpb25TdWJzY3JpcHRpb24odGhpcywgZGF0YS5zdWJzY3JpcHRpb25JRCwgb3B0aW9ucywgbmV3IEZ1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQoZGF0YS5ncmFudHMpKTtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG4gICBDb3B5cmlnaHQgMjAxOSBUb3RhbCBQYXZlIEluYy5cblxuICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAgIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cbiAgIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAgIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAgIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge1xuICAgIEZ1c2VDb250ZXh0LFxuICAgIEZ1c2VDb250ZXh0QnVpbGRlclxufSBmcm9tICdAYnRmdXNlL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIEZ1c2VMb2NhdGlvblBsdWdpbixcbiAgICBGdXNlTG9jYXRpb25BY2N1cmFjeSxcbiAgICBGdXNlTG9jYXRpb25TdWJzY3JpcHRpb24sXG4gICAgVEZ1c2VHZW9sb2NhdGlvblBvaW50LFxuICAgIEZ1c2VMb2NhdGlvblBsdWdpbkZhY3Rvcnlcbn0gZnJvbSAnQGJ0ZnVzZS9sb2NhdGlvbic7XG5cbmxldCBkYXRhQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcbmxldCBwbHVnaW46IEZ1c2VMb2NhdGlvblBsdWdpbjtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTGlzdGVuZXIobW9kZTogRnVzZUxvY2F0aW9uQWNjdXJhY3kpOiBQcm9taXNlPEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbj4ge1xuICAgIGxldCBzdWJzY3JpcHRpb246IEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbiA9IGF3YWl0IHBsdWdpbi53YXRjaChtb2RlLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gICAgc3Vic2NyaXB0aW9uLnJlZ2lzdGVyKChwb2ludHM6IFJlYWRvbmx5PFRGdXNlR2VvbG9jYXRpb25Qb2ludD5bXSkgPT4ge1xuICAgICAgICBsZXQgbGFzdFBvaW50OiBURnVzZUdlb2xvY2F0aW9uUG9pbnQgfCBudWxsID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGFzdFBvaW50ID0gcG9pbnRzW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFsYXN0UG9pbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGFDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgbGV0IGRhdGE6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gICAgICAgIGRhdGEuaW5uZXJIVE1MID0gSlNPTi5zdHJpbmdpZnkobGFzdFBvaW50LCBudWxsLCA0KTtcbiAgICAgICAgZGF0YUNvbnRhaW5lci5hcHBlbmRDaGlsZChkYXRhKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJzY3JpcHRpb247XG59XG5cbndpbmRvdy5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGJ1aWxkZXI6IEZ1c2VDb250ZXh0QnVpbGRlciA9IG5ldyBGdXNlQ29udGV4dEJ1aWxkZXIoKTtcbiAgICBsZXQgY29udGV4dDogRnVzZUNvbnRleHQgPSBhd2FpdCBidWlsZGVyLmJ1aWxkKCk7XG4gICAgcGx1Z2luID0gbmV3IEZ1c2VMb2NhdGlvblBsdWdpbkZhY3RvcnkoKS5jcmVhdGUoY29udGV4dCk7XG4gICAgKHdpbmRvdyBhcyBhbnkpLnBsdWdpbiA9IHBsdWdpbjtcblxuICAgIGxldCBjdXJyZW50TW9kZTogRnVzZUxvY2F0aW9uQWNjdXJhY3kgfCBudWxsID0gbnVsbDtcblxuICAgIGxldCB0b2dnbGVGaW5lQnRuOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRvZ2dsZUZpbmVCdG4uaW5uZXJIVE1MID0gJ1RvZ2dsZSBGaW5lIExvY2F0aW9uJztcblxuICAgIGxldCB0b2dnbGVDb2Fyc2VCdG46IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdG9nZ2xlQ29hcnNlQnRuLmlubmVySFRNTCA9ICdUb2dnbGUgQ29hcnNlIExvY2F0aW9uJztcbiAgICBcbiAgICBsZXQgY2hlY2tCdG46IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY2hlY2tCdG4uaW5uZXJIVE1MID0gJ0NoZWNrIFNldHRpbmdzJztcbiAgICBcblxuICAgIGxldCBzdWJzY3JpcHRpb246IEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuXG4gICAgdG9nZ2xlRmluZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgYXdhaXQgc3Vic2NyaXB0aW9uLnJlbGVhc2UoKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgICAgICBkYXRhQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudE1vZGUgIT09IEZ1c2VMb2NhdGlvbkFjY3VyYWN5LkZJTkUpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBhd2FpdCBjcmVhdGVMaXN0ZW5lcihGdXNlTG9jYXRpb25BY2N1cmFjeS5GSU5FKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50TW9kZSA9IEZ1c2VMb2NhdGlvbkFjY3VyYWN5LkZJTkU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50TW9kZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBhd2FpdCBjcmVhdGVMaXN0ZW5lcihGdXNlTG9jYXRpb25BY2N1cmFjeS5GSU5FKTtcbiAgICAgICAgICAgIGN1cnJlbnRNb2RlID0gRnVzZUxvY2F0aW9uQWNjdXJhY3kuRklORTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdG9nZ2xlQ29hcnNlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBhd2FpdCBzdWJzY3JpcHRpb24ucmVsZWFzZSgpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIGRhdGFDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjdXJyZW50TW9kZSAhPT0gRnVzZUxvY2F0aW9uQWNjdXJhY3kuQ09BUlNFKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gYXdhaXQgY3JlYXRlTGlzdGVuZXIoRnVzZUxvY2F0aW9uQWNjdXJhY3kuQ09BUlNFKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50TW9kZSA9IEZ1c2VMb2NhdGlvbkFjY3VyYWN5LkNPQVJTRTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRNb2RlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IGF3YWl0IGNyZWF0ZUxpc3RlbmVyKEZ1c2VMb2NhdGlvbkFjY3VyYWN5LkNPQVJTRSk7XG4gICAgICAgICAgICBjdXJyZW50TW9kZSA9IEZ1c2VMb2NhdGlvbkFjY3VyYWN5LkNPQVJTRTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY2hlY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBkYXRhQ29udGFpbmVyLmlubmVySFRNTCA9ICdzdWJzY3JpcHRpb24gcmVxdWlyZWQuJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKGF3YWl0IHN1YnNjcmlwdGlvbi5hc3NlcnRTZXR0aW5ncygpKTtcbiAgICB9KTtcblxuICAgIGRhdGFDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodG9nZ2xlRmluZUJ0bik7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b2dnbGVDb2Fyc2VCdG4pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2hlY2tCdG4pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGF0YUNvbnRhaW5lcik7XG5cbiAgICBhd2FpdCBjb250ZXh0Lm9uV2Vidmlld1JlYWR5KCk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9