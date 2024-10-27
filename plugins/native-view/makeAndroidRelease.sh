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

source build-tools/assertions.sh
source build-tools/DirectoryTools.sh

assertMac "Mac is required for publishing"
assertGitRepo
assertCleanRepo

VERSION="$1"

assertVersion $VERSION
assetGitTagAvailable "android/$VERSION"

echo $VERSION > android/VERSION
BUILD_NO=$(< "./android/BUILD")
BUILD_NO=$((BUILD_NO + 1))
echo $BUILD_NO > ./android/BUILD

./buildAndroid.sh
./test.sh

git add android/VERSION android/BUILD
git commit -m "Android Release: $VERSION"
git push
git tag -a android/$VERSION -m "Android Release: $VERSION"
git push --tags

gh release create android/$VERSION \
    ./dist/android/nativeview-debug.aar \
    ./dist/android/nativeview-debug.aar.sha1.txt \
    ./dist/android/nativeview-release.aar \
    ./dist/android/nativeview-release.aar.sha1.txt \
    --verify-tag --generate-notes

spushd android
    ./gradlew :nativeview:publishReleasePublicationToMavenRepository
spopd
