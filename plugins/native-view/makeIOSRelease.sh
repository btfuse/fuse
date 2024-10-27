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

if [ -z "$BTFUSE_CODESIGN_IDENTITY" ]; then
    echo "BTFUSE_CODESIGN_IDENTITY environment variable is required."
    exit 2
fi

VERSION="$1"

assertVersion $VERSION
assetGitTagAvailable "ios/$VERSION"

echo $VERSION > ios/VERSION
BUILD_NO=$(< "./ios/BUILD")
BUILD_NO=$((BUILD_NO + 1))
echo $BUILD_NO > ./ios/BUILD

./buildIOS.sh
./test.sh

git add ios/VERSION ios/BUILD
git commit -m "iOS Release: $VERSION"
git push
git tag -a ios/$VERSION -m "iOS Release: $VERSION"
git push --tags

gh release create ios/$VERSION \
    ./dist/ios/BTFuseNativeView.xcframework.zip \
    ./dist/ios/BTFuseNativeView.xcframework.zip.sha1.txt \
    ./dist/ios/BTFuseNativeView.framework.dSYM.zip \
    ./dist/ios/BTFuseNativeView.framework.dSYM.zip.sha1.txt \
    --verify-tag --generate-notes

pod spec lint BTFuseNativeView.podspec
assertLastCall

pod repo push breautek BTFuseNativeView.podspec
