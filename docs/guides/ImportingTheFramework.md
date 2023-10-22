
# Importing Fuse

The Fuse Framework is separated by several components, a web package for the JS/webview runtime, and
a native platform package. Each package will have their own [semver](https://semver.org/) version numbers.

In the future, there will be a posted compatibility matrix, but at this time of writing, several changes
are happening at a quick pace which may also including breaking changes.

Importing the Fuse Framework will be slightly different depending on what platform you're working with, and whether you're authoring
an application or a library.

# Importing the Fuse JS library

Starting with the common package, install [@btfuse/core](https://www.npmjs.com/package/@btfuse/core) as a dev dependency:

```
npm install @btfuse/core --save-dev
```

It may seem counter-intuitive to install the package as a dev dependendency when it's needed for the runtime of your library or application, however the JS core framework is not built to be directly deployed and ran in the browser.

For application projects, we assume you'll be using a bundler such as [Webpack](https://webpack.js.org/) to build your application JS.
Any bundler should work, for as long as the bundler understands CommonJS. However, for webpack, there isn't any special configuration needed
to include Fuse into your project.

For library projects, you don't need to use any bundler, but you'll want to also add `@btfuse/core` as a `peerDependency`. Be sure to use a loosy version range such as `1.x` or `>= 1.1 <2`.

<!--
Too much info, and not import for importing the framework, this should be moved to another guide more tailored to authoring plugins
Generally speaking, your library should:

1. always support the lowest version possible
2. always support all versions up to the next major version (e.g. if you support `1.0.0`, you should support `1.0.1`, `1.1`, `1.2`, ..., `1.155.0`, so on)
3. support multiple major version ranges, if your library can work on those versions (e.g. if any introduced breaking changes doesn't affect or can be mitigated by your library)
4. never depend on an exact version, e.g: `"@nsbfuse/core": "1.2.3"` will forcefully lock users trying to consume your library to a specific version of the Fuse JS framework.
-->

For TypeScript users, the Fuse JS framework is written in TypeScript and typings will be automatically available to be consumed when importing the module.

The distributed files are not the authored source files. The source files can be viewed or built from the [fuse-js](https://github.com/btfuse/fuse-js) repository.

<!-- TODO: Link to a Getting Started Guide -->

# Importing the Native Framework

The second component is the native framework side. There is a native library distributed as a XC Framework for iOS, and an AAR for Android.
If you're only concerned with one of the platform, feel free to skip on to the appropriate section.

## Android Fuse Framework

The Fuse android framework is hosted on an Apache Archiva distrbution server hosted by [Breautek](https://archiva.breautek.com).

You can access the server by adding the following to your Gradle project:

`settings.gradle`:
```groovy
dependencyResolutionManagement {
    ...

    repositories {
        ...

        maven {
            url = 'https://archiva.breautek.com/repository/breautek'
        }
    }
}
```

Now inside your application module, add the `implementation` line:

```groovy
dependencies {
    ...
    implementation 'com.breautek.fuse:core:<version>'
}
```

See the [Releases](https://github.com/btfuse/fuse-android/releases) page for released versions.

If you're authoring a library, then `compileOnly` should be used instead of `implementation`:

```groovy
dependencies {
    ...
    compileOnly 'com.breautek.fuse:core:<version>'
}
```

This ensures that you can compile and resolve symbols for distribution, without actually embedding the framework itself.

The distributed files do not contain source symbols. The source files can be viewed or built from the [fuse-android](https://github.com/btfuse/fuse-android) repository.

## iOS Fuse Framework

Unlike the JS framework and the Android framework, the iOS framework doesn't have any managed distribution channels.
Not for a lack of trying, I've spent a considerable amount of time making CocoaPods & SPM work, so if you'll like to consult on this task, have a look at [Issue #2](https://github.com/btfuse/fuse-ios/issues/2), and feel free to reach out.

However, despite lacking a dependency artefact system, it is still easy to import the Fuse Framework into your project.

1. Download the BTFuse.xcframework.zip file from the [Releases](https://github.com/btfuse/fuse-ios/releases) page
2. Extract and store it where it makes sense in your project. (You may want to `.gitignore` the contents and have a ZIP file to pull in a specific version)
3. Drag and drop `BTFuse.xcframework` into XCode. By default the framework will be added as `Embed & Sign`

If you're authoring a Fuse library, then mark `BTFuse.xcframework` as `Do not embed`.
This can be done by going to:
1. The project pane
2. Click your project's target
3. Click on `General` tab
4. Under the `Frameworks and Libraries` section, change `BTFuse.xcframework` to `Do not embed`

Not embedding the framework will avoid conflicts with other plugins or the application importing your library.

The distributed files do not contain source symbols. The source files can be viewed or built from the [fuse-ios](https://github.com/btfuse/fuse-ios) repository.
