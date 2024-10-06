
# Fuse iOS

This is the iOS Fuse module, providing the platform implementation for the Fuse framework on iOS devices and simulators.

## Checking out the code

This module uses git submodules, clone via:

```
git clone https://github.com/btfuse/fuse-ios.git --recurse-submodules
```

## Building

To build the XCFramework, run `./build.sh`. Otherwise, open `BTFuse.xcworkspace` in XCode and build for for iOS or iOS Simulator target.

Note that first time builds will build OpenSSL which will take awhile.

## Testing

Run `./test.sh` which will launch tests for all supported iOS versions.
Alternatively you can run the tests for a specific device via XCode.
