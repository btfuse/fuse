
# Copyright 2023 Norman Breau 

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

echo "_buildIOS.sh script is deprecated"

cd fuse-ios

xcodebuild \
    -project NBSFuse/NBSFuse.xcodeproj \
    -scheme NBSFuse \
    -sdk iphoneos \
    -configuration Debug \
    -destination "generic/platform=iOS" \
    -derivedDataPath ./build \
    build

xcodebuild \
    -project NBSFuse/NBSFuse.xcodeproj \
    -scheme NBSFuse \
    -sdk iphonesimulator \
    -configuration Debug \
    -destination "generic/platform=iOS Simulator" \
    -derivedDataPath ./build \
    build

xcodebuild \
    -project NBSFuse/NBSFuse.xcodeproj \
    -scheme NBSFuse \
    -sdk iphoneos \
    -configuration Release \
    -destination "generic/platform=iOS" \
    -derivedDataPath ./build \
    build

xcodebuild \
    -project NBSFuse/NBSFuse.xcodeproj \
    -scheme NBSFuse \
    -sdk iphonesimulator \
    -configuration Release \
    -destination "generic/platform=iOS Simulator" \
    -derivedDataPath ./build \
    build

rm -rf ./build/NBSFuse-debug.xcframework
rm -rf ./build/NBSFuse.xcframework

xcodebuild -create-xcframework \
    -framework ./build/Build/Products/Debug-iphonesimulator/NBSFuse.framework \
    -framework ./build/Build/Products/Debug-iphoneos/NBSFuse.framework \
    -output ./build/NBSFuse-debug.xcframework

xcodebuild -create-xcframework \
    -framework ./build/Build/Products/Release-iphonesimulator/NBSFuse.framework \
    -framework ./build/Build/Products/Release-iphoneos/NBSFuse.framework \
    -output ./build/NBSFuse.xcframework

cd ..
