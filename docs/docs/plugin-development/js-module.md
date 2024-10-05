
# JavaScript Module

This guide assumes you've already read and followed [Getting Started](getting-started.md). If not,
we strongly recommend beginning there first before proceeding.

A Fuse JS module is the webview runtime API into your plugin.
It is the common interface into your native code supplied by the native framework.

<div style="text-align: center">
    <img src="/res/JSModuleArchitecture.svg" />
</div>
</br />

## Development Tooling

The Fuse framework is written in TypeScript. While writing pure JS is also do-able, it would be recommended to build your JS module using TypeScript. Users of Fuse will be expecting type definitions and it will provide you the compiler checks necessary to have confidence that you're following the Fuse API as intended.

## WebView Runtime

The JS module are node modules however they **do not run** in a NodeJS environment. They will run in a webview environment in the native application shell. That is [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview?language=objc) on iOS, and [android.webkit.WebView](https://developer.android.com/reference/android/webkit/WebView) on Android.

These webview environments are more like a browser. Care needs to be taken to use browser APIs instead of NodeJS APIs.

## Preparing the package.json

To create a new JS module, simply create a new node package:

``` bash
npm init
```

And follow the prompts as you see fit, choosing the package name, etc.

When you're done, you'll have a fairly barebones `package.json` file.

Open it and add a `main` and `types` property:

``` json
{
    ...
    "main": "./lib/api.js",
    "types": "./lib/api.d.ts"
}
```

And while we are here, let's add some scripts:

``` json
{
    ...
    "scripts": {
        "build": "tsc"
    }
}
```

### Configuring the Fuse JS dependency

#### peerDependency

While your JS module will require a dependency on Fuse framework, it is important to declare the dependency as a `peerDependendency`.

A peer dependency is a kind of dependency where your module does not *provide* the dependency and instead the consuming application must install the dependency themselves. This is important because an Fuse JS Module **shall not** have their own embedded copy of the Fuse JS runtime. If they did, it will cause issues with duplicate/copied classes and state objects. Delegating the Fuse JS runtime to the application allows you to guarentee that a single Fuse JS runtime will be in the application.

NOTE: Using a `peerDependency` is not strictly for Fuse JS Modules, but for any library that wants to depend on the Fuse JS framework, including helper libraries that could be shared across multiple Fuse JS modules.

A `peerDependency` can be thought as the Fuse JS version range that is supported by your Fuse JS Module. When choosing a `peerDependency` version, choose lowest version possible that your Fuse JS Module will support, but keep the range open until the next major version update. Some examples may include:

|Use Case|Version Range Example|Reasoning|
|---|---|---|
|Tested against a single major version|`1.x`|Will allow any version inside a **MAJOR** version 1 range.
|Tested against 2 major versions|`1.x \|\| 2.x`|Will allow any version sinide a **MAJOR** version **or** 2 range.
|Requires a feature update|`>=1.1 <2`|Will allow any **MAJOR** version range of 1 with **MINOR** being >= 1.

This allows the application to choose a specific Fuse JS runtime that works for them, while keeping your Fuse JS module compatible with other installed Fuse JS modules.

WARNING: If your Fuse JS Module requires a strict version, it will
prevent your JS module from being installed with other modules that may require a newer patch.

The current recommendation for new Fuse JS modules is the following peer dependency:

``` json
{
    "peerDependencies": {
        "@btfuse/core": "0.7.x"
    }
}
```

#### devDependency

While the `peerDependency` described above is used to declare a supported version range of the Fuse JS runtime, it's not used when developing and testing your Fuse JS module. A locally installed version still needs to be installed for development purposes.

NPM allows both a `peerDependency` and a `devDependency` to co-exists. This will give access to TypeScript symbols and give the ability to TypeScript compile your Fuse JS module, or even write unit test using the Fuse JS testing library.

The `devDependency` declaration should be a version within the range of your `peerDependency`.

WARNING: If you install a `devDependency` that is outside of the range of your `peerDependency`, NPM will update your `peerDependency` potentially with a strict version requirement.

The exact version to choose as your `devDependency` will depend on your mantra. For example, choosing the lowest supported version will help ensure that a breaking change isn't introduced by accidentally using an API that might have been only added in a later feature update. Choosing the latest version of a given supported major will allow testing against the current release.

``` bash
npm install --save-dev @btfuse/core@0.x
```

### Additional dev dependencies

In addition to `@btfuse/core`, it's also recommended to install [TypeScript](https://www.typescriptlang.org/).

``` bash
npm install --save-dev typescript
```

NOTE: The remainder of this guide will assume you're using TypeScript. If you choose not to use TypeScript, you'll need to incorporate a bundler to import `@btfuse/core` modules.

TypeScript has a `tslib` package that imports reusable runtime helpers which can reduce code size. This should be installed as a `dependency`:

``` bash
npm install tslib
```

Both the `package.json` and `package-lock.json` can and should be committed into your Version Control System.

### Configuring TypeScript

Before we start coding, we must first configure TypeScript.
A quick way to do this is by issueing the init command:

``` bash
npx tsc --init
```

This will create a `tsconfig.json` file with some sensible defaults.

The following modifications are recommended:

|Setting|Value|
|---|---|
|`compilerOptions.target`|`"ES2017"`|
|`compilerOptions.module`|`"commonjs"`|
|`compilerOptions.moduleResolution`|`"node"`|
|`compilerOptions.declaration`|`true`|
|`compilerOptions.sourceMap`|`true`|
|`compilerOptions.outDir`|`"./lib"`|
|`compilerOptions.importHelpers`|`true`|
|`compilerOptions.sourceRoot`|`"/"`|
|`compilerOptions.inlineSources`|`true`|
|`compilerOptions.esModuleInterop`|`true`|
|`compilerOptions.forceConsistentCasingInFileNames`|`true`|
|`compilerOptions.strict`|`true`|
|`compilerOptions.noImplicitAny`|`true`|
|`compilerOptions.useUnknownInCatchVariables`|`true`|
|`compilerOptions.alwaysStrict`|`true`|
|`include`| <pre lang="json">[<br />&nbsp;&nbsp;"./src/*.ts",<br />&nbsp;&nbsp;"./src/**/*.ts"<br />]</pre>|
|`exclude`| <pre lang="json">[<br />&nbsp;&nbsp;"./lib",<br />&nbsp;&nbsp;"./spec"<br />]</pre>|

### Git Ignore

There are a few folders/files that should be added to the `.gitignore` file:

```
node_modules
/lib
.DS_Store
```

We ignore `node_modules` because it will include all your dependencies to build/run your library. `npm install` will sync this folder according to your `package.json` / `package-lock.json`.

`/lib` because this directory will contain your built JS artefacts.

`.DS_Store` is a common mac file that aids Finder, it doesn't need to be checked into the repository.

TIP: Additional folders and files will be added depending on if you support iOS and/or Android.

### NPM Ignore

Similar to `.gitignore`, NPM accepts a `.npmignore` which can be used
to ignore files while packing your distributable.

Include anything that shouldn't be included in your distributable.

```
spec
tsconfig.json
```

TIP: Additional folders and files will be added depending on if you support iOS and/or Android.

### Directory Structure

At this point, you're directory structure should look something like:

```
.
├── node_modules/
│   └── ...
├── .gitignore
├── .npmignore
├── package.json
├── package-lock.json
└── tsconfig.json
```

Let's add a new directory `src` with the files `api.ts` and `EchoPlugin.ts`:

```
.
├── node_modules/
│   └── ...
├── src/
│   ├── api.ts
│   └── EchoPlugin.ts
├── .gitignore
├── .npmignore
├── package.json
├── package-lock.json
└── tsconfig.json
```

The `src` folder will be the directory that contains your source implementation files.

We aren't ready to build yet, but when we are, a `lib` folder will appear containing the built JS.

## EchoPlugin.ts

Now let's implement our `EchoPlugin.ts` file.

It will include a class that has a public API `echo`, which takes in a single `string` parameter, and uses the native API. The native API will respond back with the `string` in which we return back.

NOTE: As a plugin guide that focuses purely on building a JS Module, this guide won't have a demonstratable code that can be ran.


```typescript linenums="1" title="/src/EchoPlugin.ts"
import {
    FusePlugin,
    ContentType,
    FuseAPIResponse
} from '@btfuse/core';

export class EchoPlugin extends FusePlugin {
    protected override _getID(): string {
        return 'EchoPlugin';
    }

    public async echo(message: string): Promise<string> {
        let response: FuseAPIResponse = await this._exec('/echo', ContentType.TEXT, message);
        return await response.readAsText();
    }
}
```

### Plugin ID

A plugin's only requirement is to provide an id via `_getID` method.

The ID shall be constant and unique, and should be replicated in the Android and iOS framework code. It is a glue piece that ties your JS module to the native code.

The ID must be unique to not clash with other plugins, so choose a descriptive name that represents your plugin. It's a good idea to prefix with your company name, or the initials of your company name, or a reverse domain.

For more information see the Getting Started [Plugin Identifiers](./getting-started.md#plugin-identifiers) section.

### echo Implementation

Let's break down our `echo` method that we have implemented.

``` typescript linenums="1"
public async echo(message: string): Promise<string> {
    let response: FuseAPIResponse = await this._exec('/echo', ContentType.TEXT, message);
    
    if (response.isError()) {
        throw await response.readAsError();
    }
    
    // For brevity, we are assuming the response data to be text.
    return await response.readAsText();
}
```

It accepts a `string`, and it returns a `Promise<string>`.

A `FusePlugin` has a protected method called `_exec` that accepts a endpoint, and 3 optional parameters, a `ContentType` and variant `TSerializable` type for data. The third `TAPIOpts` parameter will not be covered in this guide.

``` typescript
/**
 * The execution API. Concrete classes can call this to perform calls to the native side.
 *
 * The concrete class should expose public methods with type information exposed.
 *
 * @param method The method link, this should match the endpoint defined in the native API.
 * @param contentType the MIME type of the data you are passing in.
 * @param data - The data to pass to the native environment
 * @returns {FuseAPIResponse} The response body from native. FuseResponseReader has some utility methods to read the data in common formats (e.g. text or JSON)
 */
protected _exec(method: string, contentType?: string, data?: TSerializable, apiOpts?: TAPIOpts): Promise<FuseAPIResponse>;
```

Fuse supports a varying of different standard JS objects or primitive data types including:

- `string`
- `number`
- `boolean`
- `Date`
- `Error` (The standard JavaScript Error object)
- `Blob`
- `ArrayBuffer`

Additionally these custom interfaces are also supported:

- `ISerializable<any>` (any object that implements `serialize()` method in which returns a `TSerializable`)
- `Array<TSerializable>`
- `Record<string, TSerializable>` (any object whose properties consist solely of `TSerializable` values)

Due to some TypeScript caveats with index-based typings, if you have a concrete interface, it won't be allowed
to be used as a `TSerializable` object, even if the interface consist of supported types. To work around this,
a custom concrete interface can be wrapped by a `TFuseSerializable`.

``` typescript
// Private interface declaration
interface __MyInterface {
    name: string;
    age: number;
}

// Expose a TFuseSerializable version of __MyInterface
export type MyInterface = TFuseSerializable<__MyInterface>;
```

If the data is not already an `Blob`, then the data will be serialized into a `Blob`. Unlike other webview hybrid app platforms, Fuse takes a "binary-first" approach.

`ContentType` sets the `content-type` HTTP header, which can be read on the native side.

The `_exec` call will await for a `FuseAPIResponse` to return back from native. The `FuseAPIResponse` object wraps around the response data. Like sending data to native, native always replies back with binary data. The `FuseAPIResponse` provides several APIs to determine if the native sent an error, check the response type, and to read the data.

Here is a small overview:
``` typescript
export declare class FuseAPIResponse {
    isError(): boolean;
    getContentLength(): number;
    getContentType(): string;
    readAsArrayBuffer(): Promise<ArrayBuffer>;
    readAsBlob(): Promise<Blob>;
    readAsText(): Promise<string>;
    readAsJSON<T = unknown>(): Promise<T>;
    readAsError(): Promise<FuseError>;
    getHeaders(): Map<string, string[]>;
    getHeader(key: string): string[];
}
```

The first paramater is an API endpoint. It always starts with a `/` and will correspond to an API handler implemented on the native side. This is however out of scope of this guide.

### Callback Method

A callback is something that Fuse can create that contains an identifier that can be passed to native platform. The platform can then use the callback identifier to post a string back to at a later time or in a continuous, periodic fashion.

There are pros and cons to using callbacks. The HTTP API must resolve in a timely manner, whereas callbacks can be set and indefinitely awaited on. They are perfect for watch or listener APIs.

Additionally, the HTTP API must have exactly 1 response. Whereas a callback can be used several times, again making them good for watch and/or listener style APIs.

They however only support textual data and data transfer is not very efficient compared to the HTTP api. They are not suitable for sending large datasets or binary datasets.

A `FusePlugin` can create a callback using a protected `_createCallback` method:

``` typescript
let callbackID: string = this._createCallback((payload: string) => {
    // Callback was invoked!
});
```

The returned `callbackID` can be passed to the native platform where the native platform can use the `callbackID` to invoke the callback function in the webview, passing in textual data.

Callbacks are held in a global object and will not be released until the plugin calls `_releaseCallback` giving the `callbackID`. To avoid memory leaks, make sure to have a path to `_releaseCallback` once you're done using it.

Let's setup a new API that uses this callback method:

``` typescript
export class EchoPlugin extends FusePlugin {
    ...

    public async subscribe(cb: (data: string) => void): Promise<string> {
        let callbackID: string = this._createCallback((payload: string) => {
            cb(payload);
        });

        await this._exec('/registerCallback', ContentType.TEXT, callbackID);

        return callbackID;
    }

    public async unsubscribe(callbackID: string): Promise<void> {
        await this._exec('/unregisterCallback', ContentType.TEXT, callbackID);
        this._releaseCallback(callbackID);
    }
}
```

In this example, we create 2 new APIs, one that registers a callback to the native platform, and one that unregisters a callback.

The webview side will release the callback, but we also give the callback id to the native platform so it can also clean up native resources associated with the callback.

## Setting up the Public API

If you recall earlier, the Semantic Versioning Specification calls for an explicit declaration of your public API.

Let's add that now in our `src/api.ts` file:

``` typescript
export {EchoPlugin} from './EchoPlugin.ts';
```

That was easy!

Now anybody importing your package can do so via:

``` typescript
import {EchoPlugin} from 'my-package';
```

If your JS module is a simple enough module, you may want to add a default export:

``` typescript title="/src/EchoPlugin.ts"
import {EchoPlugin} from './EchoPlugin';

export {EchoPlugin};
export default EchoPlugin;
```

## Testing

While it is possible to include a test app within your native project that imports
the JS module, along with your native framework that is out of scope of this guide.

However, we can still talk about unit testing and mock the Fuse API.

[JestJS](https://jestjs.io/) is an excellent JavaScript unit testing framework built by Meta. It's highly scalable and performant, can run tests concurrently, and has community support for TypeScript.

``` bash
npm install --save-dev @types/jest jest ts-jest ts-node jest-environment-jsdom
```

By default, Jest only works within a "NodeJS" environment, therefore `jest-environment-jsdom` is needed to simulate a browser environment.

Let's create a `jest.config.ts` file now

``` typescript linenums="1" title="/jest.config.ts"
import type {Config} from 'jest';

export const JEST_CONFIG: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    verbose: true,
    testMatch: [ '**/spec/**/*.spec.ts' ],
    collectCoverageFrom: [ '**/src/**/*.ts' ]
};

export default JEST_CONFIG;
```

Now let's update our NPM scripts to use Jest during `npm test`. Edit `package.json`:

``` json
{
    ...
    "scripts": {
        ...
        "test": "jest"
    }
}
```

And finally let's create our unit test folder structure. Create a `spec/EchoPlugin.spec.ts` file.

With the new files created, your directory structure should look like:

```
.
├── spec/
│   └── EchoPlugin.spec.ts
├── jest.config.ts
├── package.json
└── ...
```

Inside `spec/EchoPlugin.spec.ts`:

``` typescript linenums="1" title="/spec/EchoPlugin.spec.ts"
// Import your plugin
import {EchoPlugin} from '../src/EchoPlugin';

// Import test code
import {
    FuseContext,
    FuseTestContextBuilder,
    FuseContext,
    FuesTestAPI
} from '@btfuse/core/lib/test/api';

// Make a test wrapper that exposes the underlying FuseAPI.
class TestEchoPlugin extends EchoPlugin {
    public getAPI(): FuseTestAPI {
        // When using a FuseTestContextBuilder, the FuseAPI will be a FuseTestAPI instance.
        return <FuseTestAPI>this._getAPI();
    }
}

describe('EchoPlugin', () => {
    let context: FuseContext = null;
    let plugin: EchoPlugin = null;
    let api: FuseTestAPI = null;

    beforeAll(async () => {
        let builder: FuseTestContextBuilder = new FuseTestContextBuilder();
        context = await builder.build();
        plugin = new TestEchoPlugin(context);
        api = plugin.getAPI();
    });

    it('should respond with same content', async () => {
        // Don't actually try to make network requests. (TODO: Correct <any> hack)
        jest.spyOn(<any>api, '_doRequest').mockReturnValue(Promise.resolve("Hello Test!"));

        const message: string = 'Hello Test!';

        let response: string = await plugin.echo(message);

        expect(response).toBe(message);
    });
});
```

TIP: `@btfuse/core/lib/test/api` exports all symbols that `@btfuse/core` exports, in addition to other test-only helper code.

NOTE: Do not import `@btfuse/core/lib/test/api` from any code that will be distributed to your final product.

WARNING: Only `@btfuse/core` or `@btfuse/core/lib/test/api` shall be imported. These are considered Fuse's public API. Importing specific modules by path couples your project to Fuse's project structure and allows access to internal private implementations. Only import and use symbols exported from `@btfuse/core` or `@btfuse/core/lib/test/api`.

To run your tests, run: `npm test`

## Distributing your JS Module

See the NPM docs:

- [Publishing unscoped public packages](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)
- [Publishing scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
- [Publishing private packages](https://docs.npmjs.com/creating-and-publishing-private-packages)

## Next Steps

This concludes the Fuse JS Module guide, but this example Fuse plugin is incomplete. It only contains the JS module, but for Fuse plugins to be useful, they need a native implementation that corresponds to our `/echo` API request.

Moving forward, See the the list of native platform guides:

- [iOS Plugin Guide](ios-module.md)
- [Android Plugin Guide](android-module.md)
