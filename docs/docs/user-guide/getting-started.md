
# Getting Started

The Fuse Framework provides a means to build a native application with a webview user interface, without sacrificing the means to use device APIs from the webview.

This guide will go over how to setup the JavaScript environment and then will branch off into native environment. For plugin development, [click here](../plugin-development/getting-started.md).

For the purpose of this guide, we'll assume that you're starting off with an empty git repository.

## Requirements

To complete this guide you'll need:

- Current NodeJS LTS
- Webpack or another JS bundler

Additionally for Android development, Android Studio is required. For iOS development, XCode will be required. Details for each environment will be provided later.

## The JS Runtime

Start off with creating a NPM package by issuing: `npm init`. Fill out the NPM prompt to create a NPM package.

(Optional) Once you're done, go into `package.json` and add `"private": true` to prevent accidentally publishing your app to NPM.

A quick note regarding the JS environment. While we are working with node modules, the JS environment ran inside the app is not a NodeJS runtime. Care has to be taken not to use NodeJS-specific modules.

Fuse framework makes use of TypeScript so it will make sense to also use TypeScript to get the advantage of compilation checks and some level of type safety. Fuse is also distributed as a CommonJS module, which means it can't be ran inside directly inside the webview as is. We require a web bundler. This guide will use Webpack but any bundler should do.

Let's start with installing our dependencies:

``` bash
npm install --save-dev webpack webpack-cli copy-webpack-plugin typescript ts-loader source-map-loader @btfuse/core
```

### Configuration Files

Fuse is tailored to develop larger-scale projects, so bear with us as we setup our boilerplate project configuration. A basic Fuse project will typically contain Webpack (or some other JS bundler) as well as TypeScript.

NOTE: All paths mentioned will be assumed to be relative of your project root directory. In otherwords `/src/myFile.js` is expected to be located at `<your-project-root>/src/myFile.js`.

#### Configuring Webpack

NOTE: If you prefer to use another bundler and you have the experience, feel free to use a different bundler

[Webpack](https://webpack.js.org/) is a JS bundler which will be responsible for reading all your JS modules, and packing them into one or more JS chunks, including any dependencies that you may have, such as the Fuse Core runtime. Webpack operates using [Loaders](https://webpack.js.org/concepts/#loaders) which translates source code into JS runnable files. Webpack is a very powerful tool allowing you to modularize your JS application, pack web assets, and other useful features. Keen observers noticed we installed 2 loaders: `ts-loader` and `source-map-loader`, which is used to make Webpack utilise TypeScript as well as prepare sourcemaps in a consumable fashion.

Because we may be targeting more than a single platform, we will create a base `webpack.base.config.js` file which holds our common webpack configurations that can be shared across different targets. We will build more webpack configurations later in the Fuse Android & iOS User guides.

Let's start with creating `/webpack.base.config.js`:

TIP: The webpack config script is a node program, so Node APIs can be used here,
if desired.

``` javascript linenums="1" title="/webpack.base.config.js"
module.exports = {
    // inline source maps are recommended because the Dev Tools do not have
    // access to the native asset loaders.
    devtool: 'inline-source-map',

    entry: ['./src/App.ts'],
    stats: 'errors-warnings',
    output: {
        // This will be the supplied by the platform-specific config file.
        path: null,
        filename: 'app.js'
        publicPath: '/assets/'
    },
    resolve: {
        mainFields: [
            'main'
        ],
        extensions: [
            '.webpack.js',
            '.ts',
            '.js'
        ]
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /(\.tsx?|\.jsx?)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            { 
                // Lift the library source maps to the application level
                // so the browser will load them up
                test: /\.js$/, 
                enforce : 'pre',
                use: ["source-map-loader"]
            }
        ]
    }
    plugins: []
}
```

NOTE: As it stands, this base webpack will not compile any source code because we haven't defined a output path yet.

#### Configuring TypeScript

[TypeScript](https://www.typescriptlang.org/) projects expects a `tsconfig.json` file, so let's create a `/tsconfig.json` file right now.

Typescript can provide you with a base config with several, so run:

``` bash
npx tsc --init
```

We shall make some modifications to the created `tsconfig.json` file however. Uncomment/enable the following directives:

- `"inlineSourceMap": true`
- `"inlineSources": true`
- `"importHelpers": true`
- `"moduleResolution": "node10"`
- `"lib": ["DOM"]`

When you're done, your `/tsconfig.json` file should look something like this:

NOTE: Normally comments aren't allowed in JSON files, as the spec doesn't define the concept of comments,
however TypeScript uses JSON-C, a subset of JSON that supports comments.

``` json linenums="1" title="/tsconfig.json"
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "lib": ["DOM"],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```

#### Basic Application Source

Now we can start building a sample application. We'll make a `src` folder that will contain our web assets and TypeScript source code.

``` html linenums="1" title="/src/index.html"
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>My First Fuse Application</title>
        <script src="js/app.js"></script>
    </head>
    <body></body>
</html>
```

``` typescript linenums="1" title="/src/App.ts"
import {
    FuseContext,
    FuseContextBuilder,
    Platform,
    Version
} from '@btfuse/core';

(async () => {
    let builder: FuseContextBuilder = new FuseContextBuilder();
    let context: FuseContext = await builder.build();

    let platform: Platform = context.getPlatform();
    let version: Version = await context.getPlatformVersion();

    document.body.innerHTML = `
        Platform: ${platform}<br />
        Version: ${version.toString()}
    `;

    await context.onWebviewReady();
})();
```

This is a simple program that setups up a `FuseContext` and uses some built-in APIs to get the current platform runtime and the version and then finally update the HTML body node with the fetched information.

Finally the app calls `context.onWebviewReady` which is an API that tells the native that your web application has completed loaded. It ticks the loading progress and dismisses the loading screen if everything has finished loading. Ideally this is called after you have rendered your landing screen.

## Next Steps

We have setup the webview bits that are mostly common between the Android & iOS platform, however, we don't have something buildable yet!
Don't worry that's covered in our next guides.

Please see:

- <span class="broken-link">iOS User Guide</span>
- [Android User Guide](./android-guide.md)
