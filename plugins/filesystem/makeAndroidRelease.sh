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

assertGitRepo
assertCleanRepo

VERSION="$1"

assertVersion $VERSION
assertGitTagAvailable "android/filesystem/$VERSION"

echo $VERSION > android/VERSION
BUILD_NO=$(< "./android/BUILD")
BUILD_NO=$((BUILD_NO + 1))
echo $BUILD_NO > ./android/BUILD

./buildAndroid.sh

spushd android
    ./gradlew :filesystem:test
    ./gradlew :filesystem:cAT
spopd

LAST_TAG=$(git tag --list "android/filesystem/*" --sort=-v:refname | head -n 1)

git add android/VERSION android/BUILD
git commit -m "Fuse Filesystem Android Release: $VERSION"
git push
git tag -a android/filesystem/$VERSION -m "Fuse Filesystem Android Release: $VERSION"
git push --tags

gh release create android/filesystem/$VERSION \
    ./dist/android/filesystem-debug.aar \
    ./dist/android/filesystem-debug.aar.sha1.txt \
    ./dist/android/filesystem-release.aar \
    ./dist/android/filesystem-release.aar.sha1.txt \
    --verify-tag --generate-notes \
    --notes-start-tag "$LAST_TAG"

spushd android
    ./gradlew :filesystem:publishReleasePublicationToMavenRepository
spopd
