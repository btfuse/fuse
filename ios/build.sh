
#!/bin/bash

# Copyright 2023 Breautek 

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Purpose
#
# Builds and prepares the project for release.
# If you're developing or contributing to the Fuse framework, you'll want to open
# the XCWorkspace in XCode instead.
#
# This script will 
#   1.  Clean your build environment for a fresh build.
#   2.  Run tests, this may take awhile.
#   3.  Copy files to a dist/ directory.

source ../build-tools/assertions.sh
source ../build-tools/DirectoryTools.sh
source ../build-tools/Checksum.sh

assertMac "Mac is required to build Fuse iOS"

if [ "$CI" != "true" ]; then
    if [ -z "$BTFUSE_CODESIGN_IDENTITY" ]; then
        echo "BTFUSE_CODESIGN_IDENTITY environment variable is required."
        exit 2
    fi
fi

DIST_DIR="dist/ios/core"

echo "Building Fuse iOS Framework $(cat ./VERSION)..."

rm -rf $DIST_DIR
mkdir -p $DIST_DIR

echo "Cleaning the workspace..."
# Clean the build
# XCode can do a poor job in detecting if object code should recompile, particularly when messing with
# build configuration settings. This will ensure that the produced binary will be representative.
xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuse -configuration Release -destination "generic/platform=iOS" clean
assertLastCall
xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuse -configuration Debug -destination "generic/platform=iOS Simulator" clean
assertLastCall
xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuseTestTools -configuration Release -destination "generic/platform=iOS" clean
assertLastCall
xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuseTestTools -configuration Debug -destination "generic/platform=iOS Simulator" clean
assertLastCall

echo "Building iOS framework..."
# Now build the iOS platform target in Release mode. We will continue to use Debug mode for iOS Simulator targets.
xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuse -configuration Release -destination "generic/platform=iOS" build
assertLastCall
xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuseTestTools -configuration Release -destination "generic/platform=iOS" build
assertLastCall
echo "Building iOS Simulator framework..."
xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuse -configuration Debug -destination "generic/platform=iOS Simulator" build
assertLastCall
xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuseTestTools -configuration Debug -destination "generic/platform=iOS Simulator" build
assertLastCall

iosBuild=$(echo "$(xcodebuild -workspace BTFuse.xcworkspace -scheme BTFuse -configuration Release -sdk iphoneos -showBuildSettings | grep -E '^\s*CONFIGURATION_BUILD_DIR =' | awk -F '= ' '{print $2}' | xargs)")
simBuild=$(echo "$(xcodebuild -workspace BTFuse.xcworkspace -scheme BTFuse -configuration Debug -sdk iphonesimulator -showBuildSettings | grep -E '^\s*CONFIGURATION_BUILD_DIR =' | awk -F '= ' '{print $2}' | xargs)")
iosTestToolsBuild=$(echo "$(xcodebuild -workspace BTFuse.xcworkspace -scheme BTFuseTestTools -configuration Release -sdk iphoneos -showBuildSettings | grep -E '^\s*CONFIGURATION_BUILD_DIR =' | awk -F '= ' '{print $2}' | xargs)")
simTestToolsBuild=$(echo "$(xcodebuild -workspace BTFuse.xcworkspace -scheme BTFuseTestTools -configuration Debug -sdk iphonesimulator -showBuildSettings | grep -E '^\s*CONFIGURATION_BUILD_DIR =' | awk -F '= ' '{print $2}' | xargs)")

if [ "$CI" == "true" ]; then
    echo "Skipping CodeSign (CI Build)"
else
    echo "Signing iOS build..."
    codesign -s $BTFUSE_CODESIGN_IDENTITY --deep $iosBuild/BTFuse.framework
    assertLastCall
    codesign -s $BTFUSE_CODESIGN_IDENTITY --deep $iosTestToolsBuild/BTFuseTestTools.framework
    assertLastCall

    echo "Verifying iOS Build"
    codesign -dvvvv $iosBuild/BTFuse.framework
    assertLastCall
    codesign -dvvvv $iosTestToolsBuild/BTFuseTestTools.framework
    assertLastCall
fi

cp -r $iosBuild/BTFuse.framework.dSYM $DIST_DIR
cp -r $iosTestToolsBuild/BTFuseTestTools.framework.dSYM $DIST_DIR

echo "Packing XCFramework..."
xcodebuild -create-xcframework \
    -framework $iosBuild/BTFuse.framework \
    -debug-symbols $iosBuild/BTFuse.framework.dSYM \
    -framework $simBuild/BTFuse.framework \
    -output $DIST_DIR/BTFuse.xcframework
assertLastCall
xcodebuild -create-xcframework \
    -framework $iosTestToolsBuild/BTFuseTestTools.framework \
    -debug-symbols $iosTestToolsBuild/BTFuseTestTools.framework.dSYM \
    -framework $simTestToolsBuild/BTFuseTestTools.framework \
    -output $DIST_DIR/BTFuseTestTools.xcframework
assertLastCall

spushd $DIST_DIR
    zip -r BTFuse.xcframework.zip BTFuse.xcframework > /dev/null
    zip -r BTFuse.framework.dSYM.zip BTFuse.framework.dSYM > /dev/null
    zip -r BTFuseTestTools.xcframework.zip BTFuseTestTools.xcframework > /dev/null
    zip -r BTFuseTestTools.framework.dSYM.zip BTFuseTestTools.framework.dSYM > /dev/null
    sha1_compute BTFuse.xcframework.zip
    sha1_compute BTFuse.framework.dSYM.zip
    sha1_compute BTFuseTestTools.xcframework.zip
    sha1_compute BTFuseTestTools.framework.dSYM.zip
    sha256_compute BTFuse.xcframework.zip
    sha256_compute BTFuse.framework.dSYM.zip
    sha256_compute BTFuseTestTools.xcframework.zip
    sha256_compute BTFuseTestTools.framework.dSYM.zip
spopd

VERSION=$(cat ./VERSION)
FUSE_CHECKSUM=$(cat $DIST_DIR/BTFuse.xcframework.zip.sha256.txt)
TESTTOOLS_CHECKSUM=$(cat $DIST_DIR/BTFuseTestTools.xcframework.zip.sha256.txt)

btfuseSPMTemplate=$(<Package.template.swift)

btfuseSPMTemplate=${btfuseSPMTemplate//\$VERSION\$/$VERSION}
btfuseSPMTemplate=${btfuseSPMTemplate//\$CORE_CHECKSUM\$/$FUSE_CHECKSUM}
btfuseSPMTemplate=${btfuseSPMTemplate//\$TESTTOOLS_CHECKSUM\$/$TESTTOOLS_CHECKSUM}

# Write the final result to BTFuse.podspec
echo "$btfuseSPMTemplate" > $DIST_DIR/Package.swift
