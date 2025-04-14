# Copyright 2023-2025 Breautek 

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

tagMessage="Fuse JS Native View Release: $version"

function onPreRelease {
    spushd plugins/nativeview
        npm version $version --no-git-tag-version
        assertLastCall
        git add package.json package-lock.json ../../package-lock.json
    spopd
}

function publishRelease {
    spushd plugins/nativeview
        npm pack
        assertLastCall
        npm publish btfuse-native-view-$version.tgz
        assertLastCall
    spopd
}

files=(
    "plugins/filesystem/btfuse-native-view-$version.tgz"
)
