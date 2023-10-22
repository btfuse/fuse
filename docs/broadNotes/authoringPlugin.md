
Authoring a plugin generally involves the following steps

1. Create a repo

If your plugin will have a JS implementation:
1. npm init, choose your NPM package name
2. install the following dev dependencies:
    - `typescript`
    - `@btfuse/core`
3. add `@btfuse/core` as a peerDependency, using a loose enough version range, but a version range that will limit breaking changes.
4. Create your tsconfig via `npx tsc init`
5. create `src/api.ts` to export your public API.
6. Update your scripts to build your lib
7. gitignore `lib/`
8. npmignore `android/` and `ios/`

If you have a Android implementation:
1. Create a new android library project inside `android/`
2. Add the maven repo to dependency resolution (`settings.gradle`)

```
maven {
    url = 'https://archiva.breautek.com/repository/breautek'
}
```

3. If you intend to publish your artefact, add `maven-publish` plugin
4. add inside `android`

```
defaultConfig {
    minSdk 24

    aarMetadata {
        minCompileSdk 24
    }

    testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    consumerProguardFiles "consumer-rules.pro"
}
```

and

```
publishing {
    singleVariant('release') {
        withSourcesJar()
    }
}
```

5. add a loosely enough version range dependency:

`compileOnly 'com.breautek.fuse:core:0.7.0'`

