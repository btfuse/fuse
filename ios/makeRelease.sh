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
assetGitTagAvailable $VERSION

echo $VERSION > VERSION

spushd BTFuse/configs
    echo "// This is an auto-generated file, do not edit!" > version.xcconfig
    echo "CURRENT_PROJECT_VERSION = $VERSION" >> version.xcconfig
    echo "MARKETING_VERSION = $VERSION" >> version.xcconfig
spopd

./build.sh
./test.sh

git add VERSION BTFuse/configs/version.xcconfig
git add VERSION
git commit -m "iOS Release: $VERSION"
git push
git tag -a $VERSION -m "iOS Release: $VERSION"
git push --tags

gh release create $VERSION \
    ./dist/BTFuse.xcframework.zip \
    ./dist/BTFuse.xcframework.zip.sha1.txt \
    ./dist/BTFuse.framework.dSYM.zip \
    ./dist/BTFuse.framework.dSYM.zip.sha1.txt \
    ./dist/BTFuseTestTools.xcframework.zip \
    ./dist/BTFuseTestTools.xcframework.zip.sha1.txt \
    ./dist/BTFuseTestTools.framework.dSYM.zip \
    ./dist/BTFuseTestTools.framework.dSYM.zip.sha1.txt \
    --verify-tag --generate-notes

./podPublish.sh
