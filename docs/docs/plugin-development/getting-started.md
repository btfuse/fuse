
# Getting Started

Fuse Framework provides a protocol for extending the behaviour of the webview. The protocol allows the JS in the webview to make calls over to the native environment via an embedded API server.

This guide is in 4 parts:

- Prerequisites (We are here!)
- JS Modules
- Android Modules
- iOS Modules

Naturally, if a module is for a specific platform, then an implementation for that platform can be omitted.

## Plugin Architecture

Let's take a look at a overview diagram.

<div style="text-align: center">
    <img src="/res/JSModuleArchitecture.svg" />
</div>
</br />

An application is split between two environments: 1) The Native platform and 2) The webview.

On the Native platform side, we have a `FuseContext` class created by the application, which holds all the states including active `FusePlugin` instances. An `API Server` receives messages from the webview, and uses a `FuseAPIRouter` to dispatch those messages to the appropriate `FusePlugin`. A `FusePlugin` implements API handlers to handle the request, perform work using native device APIs and may respond back to the webview.

On the webview side, share some "sister" objects. There is a `FuseContext` who serves a similar role to the native's `FuseContext`, but it holds the state on the webview. It also maintains a reference of all active `FusePlugin` instances created on the webview side. A `FusePlugin` may implement public APIs usable by the application in which calls on the `FuseAPI` which dispatches to the native's `API Server`.

If this doesn't make much sense right now, don't fret. We will dig into more details later.

### Plugin Identifiers

A plugin has an identifier which is provided by a concrete implementation.
The ID shall be constant and unique, and should be replicated in the Android and iOS framework code. It is a glue piece that ties your JS module to the native code.

The ID must be unique to not clash with other plugins, so choose a descriptive name that represents your plugin. It's a good idea to prefix with your company name, or the initials of your company name, or a reverse domain.

NOTE: Breautek reserves the prefixes `Fuse`, `BT`, and `BTFuse`.

NOTE: The ID is used inside a HTTP URL, therefore choose URL safe characters.

Let's assume your company is `Super Example Incorporated` then

Good examples include (but not limited to):

- `SuperExampleEcho`
- `SEIEcho`
- `SEI_Echo`
- `SEI-Echo`
- `com.superexample.echo`

Bad examples includes (but not limited to):

- `Echo` (too generic)
- `FuseEcho` (Using a reserved prefix)
- `ApacheEcho` (Using a prefix that is likely used by another corporation)
- `BTEcho` (Another reserved prefix)

## Plugin Directory Structure

While there is nothing that requires this structure, this guide will recommend and assume the following directory structure:

```
.
├── android/
├── ios/
├── src/
└── spec/
```

|directory|purpose|
|---|---|
|`android/`|The directory that contains the android project.|
|`ios/`|The directory that contains the ios project.|
|`src/`|The directory that contains the JS project.|
|`spec/`|The directory that contains JS test code.|

Additional files and directories will be created later.

## Distribution Mechanisms

Your Fuse Plugin will use several distribution mechanisms. Unlike other platforms,
Fuse embraces the "native" way of distribution.

|Module|Distribution Method|
|---|---|
|JS|tarball via NPM|
|Android|AAR via maven|
|iOS|via XCFramework|

These distribution methods aren't the only way but they are more-or-less the official way.

NOTE: Apple does not have an official way to manage or distribute XCFrameworks.
Fuse distributes their XCframeworks via GitHub Releases and offers a bash script
to download and sync xcframeworks.<br /><br />
There are however, third-party ways of distributing XCFrameworks which can be used as well (e.g. CocoaPods, Carthage, etc...)

Fuse uses native distribution channels to take advantage of native dependency management systems. Because of this, the modules should only contain relevant resources. For example the NPM package should only contain the JS runtime code, 
and the XCFramework/AAR should only contain the native framework executable.

### Version Management

The Fuse plugin is made up of 2-3 modules (the JS package, and the native framework).
This has some pros and cons:

**Pros**:

- Ability to update and release patches of your JS module independently of your native framework.
- Decoupling of the JS module to the native framework allows
you to swap out native implementations (e.g. A free vs paid version of a library).
- Allows you to distribute your plugin via standard distribution channels.

**Cons**:

- The decoupled nature allows users to mix and match your native framework version and JS module version that is potentially incompatible.
- Can be more difficult to manage, and errors arising from
version mismatches can be difficult to recognize.

While these guidelines are not set in stone, we would highly recommend adopting [semver](https://semver.org/) Semantic Versioning.

At a glance:

> Given a version number MAJOR.MINOR.PATCH, increment the:
> 
> 1. MAJOR version when you make incompatible API changes
> 2. MINOR version when you add functionality in a backward compatible manner
> 3. PATCH version when you make backward compatible bug fixes

In otherwords, if your native API changes in such a way that it requires modifications to your JS module, both your native API and JS module should have a **MAJOR** version increment.

Adding a new API to the native framework doesn't affect the JS module, it simply just won't be *exposed* and therefore this update could be a **MINOR** version update because it is still backwards compatible. The JS Module could then be updated to include this new API, which as long as no existing features depend on this API, it can be considered *non-breaking* and be released as a **MINOR** version update.

## Further Reading

This concludes the getting started.
The information contained here is useful knowledge to know while developing your JS and native modules.

At this point, it would be recommended to read [JS Module Guide](js-module.md) next, which goes more in depth on implementing a Fuse JS plugin.
