
# Fuse Android

This is the Android Fuse module, providing the platform implementation for the Fuse framework on Android devices and simulators.

## Checking out the code

This module uses git submodules, clone via:

```
git clone https://github.com/btfuse/fuse.git --recurse-submodules
```

## Building

To build the AAR, run `./build.sh`. Otherwise, open the `android` in Android Studio and build the `fuse` module.

## Testing

Run `./test.sh` which will launch tests for all supported Android versions.

Alternatively, `test.sh` script also accepts the following arguments

|Command|Description|
|---|---|
|`./test.sh <API_LEVEL>`|Test against a specific API level using Gradle Managed Devices. Only API 28+ are supported.|
|`./test.sh local`|Runs local unit tests only. No android simulator or device needed, but most tests required an android environment.|
|`./test.sh device`|Use a connected device or simulator to run the tests|

