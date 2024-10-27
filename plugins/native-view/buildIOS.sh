#!/bin/bash

# Copyright 2023-2024 Breautek 

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

source ../../build-tools/assertions.sh
source ../../build-tools/DirectoryTools.sh
source ../../build-tools/Checksum.sh

assertMac "Mac is required to build Fuse Native View iOS"

if [ -z "$BTFUSE_CODESIGN_IDENTITY" ]; then
    echo "BTFUSE_CODESIGN_IDENTITY environment variable is required."
    exit 2
fi

echo "Building Fuse Native View iOS Framework $(cat ./ios/VERSION)..."

rm -rf ./dist/ios
mkdir -p ./dist/ios

spushd dist/ios
    DIST_DIR=`pwd`
spopd

spushd ios
    VERSION=$(< VERSION)
    BUILD_NO=$(< BUILD)

    echo "// This is an auto-generated file, do not edit!" > BTFuseNativeView/VERSION.xcconfig
    echo "CURRENT_PROJECT_VERSION = $BUILD_NO" >> BTFuseNativeView/VERSION.xcconfig
    echo "MARKETING_VERSION = $VERSION" >> BTFuseNativeView/VERSION.xcconfig
spopd

echo "Cleaning the workspace..."
spushd ../../ios
    xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuseNativeView -configuration Release -destination "generic/platform=iOS" clean
    assertLastCall
    xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuseNativeView -configuration Debug -destination "generic/platform=iOS Simulator" clean
    assertLastCall

    echo "Building iOS framework..."
    xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuseNativeView -configuration Release -destination "generic/platform=iOS" build
    assertLastCall
    echo "Building iOS Simulator framework..."
    xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuseNativeView -configuration Debug -destination "generic/platform=iOS Simulator" build
    assertLastCall

    iosBuild=$(echo "$(xcodebuild -workspace BTFuse.xcworkspace -scheme BTFuseNativeView -configuration Release -sdk iphoneos -showBuildSettings | grep -E '^\s*CONFIGURATION_BUILD_DIR =' | awk -F '= ' '{print $2}' | xargs)")
    simBuild=$(echo "$(xcodebuild -workspace BTFuse.xcworkspace -scheme BTFuseNativeView -configuration Debug -sdk iphonesimulator -showBuildSettings | grep -E '^\s*CONFIGURATION_BUILD_DIR =' | awk -F '= ' '{print $2}' | xargs)")

    echo "Signing iOS build..."
    codesign -s $BTFUSE_CODESIGN_IDENTITY "$iosBuild/BTFuseNativeView.framework"

    echo "Verifying iOS Build"
    codesign -dvvvv "$iosBuild/BTFuseNativeView.framework"
    assertLastCall

    cp -r $iosBuild/BTFuseNativeView.framework.dSYM ../dist/ios/

    xcodebuild -create-xcframework \
        -framework $iosBuild/BTFuseNativeView.framework \
        -debug-symbols $iosBuild/BTFuseNativeView.framework.dSYM \
        -framework $simBuild/BTFuseNativeView.framework \
        -output $DIST_DIR/BTFuseNativeView.xcframework
    assertLastCall
spopd

spushd dist/ios
    zip -r BTFuseNativeView.xcframework.zip BTFuseNativeView.xcframework > /dev/null
    zip -r BTFuseNativeView.framework.dSYM.zip BTFuseNativeView.framework.dSYM > /dev/null
    sha1_compute BTFuseNativeView.xcframework.zip
    sha1_compute BTFuseNativeView.framework.dSYM.zip
spopd

CHECKSUM=$(cat ./dist/ios/BTFuseNativeView.xcframework.zip.sha1.txt)

podspec=$(<BTFuseNativeView.podspec.template)
podspec=${podspec//\$VERSION\$/$VERSION}
podspec=${podspec//\$CHECKSUM\$/$CHECKSUM}

echo "$podspec" > BTFuseNativeView.podspec
