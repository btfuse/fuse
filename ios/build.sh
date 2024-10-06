
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

source build-tools/assertions.sh
source build-tools/DirectoryTools.sh
source build-tools/Checksum.sh

assertMac "Mac is required to build Fuse iOS"

if [ "$CI" != "true" ]; then
    if [ -z "$BTFUSE_CODESIGN_IDENTITY" ]; then
        echo "BTFUSE_CODESIGN_IDENTITY environment variable is required."
        exit 2
    fi
fi

echo "Building Fuse iOS Framework $(cat ./VERSION)..."

rm -rf dist
mkdir -p dist

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

echo "Building Documentation..."
xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuse -configuration Release -destination 'generic/platform=iOS' docbuild
xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuseTestTools -configuration Release -destination 'generic/platform=iOS' docbuild

iosBuild=$(echo "$(xcodebuild -workspace BTFuse.xcworkspace -scheme BTFuse -configuration Release -sdk iphoneos -showBuildSettings | grep -E '^\s*CONFIGURATION_BUILD_DIR =' | awk -F '= ' '{print $2}' | xargs)")
simBuild=$(echo "$(xcodebuild -workspace BTFuse.xcworkspace -scheme BTFuse -configuration Debug -sdk iphonesimulator -showBuildSettings | grep -E '^\s*CONFIGURATION_BUILD_DIR =' | awk -F '= ' '{print $2}' | xargs)")
iosTestToolsBuild=$(echo "$(xcodebuild -workspace BTFuse.xcworkspace -scheme BTFuseTestTools -configuration Release -sdk iphoneos -showBuildSettings | grep -E '^\s*CONFIGURATION_BUILD_DIR =' | awk -F '= ' '{print $2}' | xargs)")
simTestToolsBuild=$(echo "$(xcodebuild -workspace BTFuse.xcworkspace -scheme BTFuseTestTools -configuration Debug -sdk iphonesimulator -showBuildSettings | grep -E '^\s*CONFIGURATION_BUILD_DIR =' | awk -F '= ' '{print $2}' | xargs)")

mkdir -p dist/docs/intermediates
mkdir -p dist/docs/out
xcrun docc convert ./Overview.docc  --fallback-display-name BTFuse --output-dir dist/docs/intermediates/Overview.doccarchive
xcrun docc merge ./dist/docs/intermediates/Overview.doccarchive $iosBuild/BTFuse.doccarchive $iosBuild/BTFuseTestTools.doccarchive --output-path dist/docs/out/

# intermediatesDir=$iosBuild/../../Intermediates.noindex/
# mkdir -p dist/docs/intermediates/
# cp -r $intermediatesDir/BTFuse.build/Release-iphoneos/BTFuse.build/symbol-graph dist/docs/intermediates
# cp -r $intermediatesDir/BTFuseTestTools.build/Release-iphoneos/BTFuseTestTools.build/symbol-graph dist/docs/intermediates

# xcrun docc convert --output-dir dist/docs/doc.doccarchive --additional-symbol-graph-dir dist/docs/intermediates/x

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

cp -r $iosBuild/BTFuse.framework.dSYM ./dist/
cp -r $iosTestToolsBuild/BTFuseTestTools.framework.dSYM ./dist

echo "Packing XCFramework..."
xcodebuild -create-xcframework \
    -framework $iosBuild/BTFuse.framework \
    -debug-symbols $iosBuild/BTFuse.framework.dSYM \
    -framework $simBuild/BTFuse.framework \
    -output dist/BTFuse.xcframework
assertLastCall
xcodebuild -create-xcframework \
    -framework $iosTestToolsBuild/BTFuseTestTools.framework \
    -debug-symbols $iosTestToolsBuild/BTFuseTestTools.framework.dSYM \
    -framework $simTestToolsBuild/BTFuseTestTools.framework \
    -output dist/BTFuseTestTools.xcframework
assertLastCall

spushd dist
    zip -r BTFuse.xcframework.zip BTFuse.xcframework > /dev/null
    zip -r BTFuse.framework.dSYM.zip BTFuse.framework.dSYM > /dev/null
    zip -r BTFuseTestTools.xcframework.zip BTFuseTestTools.xcframework > /dev/null
    zip -r BTFuseTestTools.framework.dSYM.zip BTFuseTestTools.framework.dSYM > /dev/null
    # tar -czvf dist/docs.tar.gz -C dist/docs .
    sha1_compute BTFuse.xcframework.zip
    sha1_compute BTFuse.framework.dSYM.zip
    sha1_compute BTFuseTestTools.xcframework.zip
    sha1_compute BTFuseTestTools.framework.dSYM.zip
spopd

VERSION=$(cat ./VERSION)
FUSE_CHECKSUM=$(cat ./dist/BTFuse.xcframework.zip.sha1.txt)
TESTTOOLS_CHECKSUM=$(cat ./dist/BTFuseTestTools.xcframework.zip.sha1.txt)

btfusePodSpecTemplate=$(<BTFuse.podspec.template)
btfuseTestToolsPodSpecTemplate=$(<BTFuseTestTools.podspec.template)

btfusePodSpecTemplate=${btfusePodSpecTemplate//\$VERSION\$/$VERSION}
btfusePodSpecTemplate=${btfusePodSpecTemplate//\$CHECKSUM\$/$FUSE_CHECKSUM}
btfuseTestToolsPodSpecTemplate=${btfuseTestToolsPodSpecTemplate//\$VERSION\$/$VERSION}
btfuseTestToolsPodSpecTemplate=${btfuseTestToolsPodSpecTemplate//\$CHECKSUM\$/$TESTTOOLS_CHECKSUM}

# Write the final result to BTFuse.podspec
echo "$btfusePodSpecTemplate" > BTFuse.podspec
echo "$btfuseTestToolsPodSpecTemplate" > BTFuseTestTools.podspec
