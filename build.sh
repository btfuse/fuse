
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

source ./build-tools/DirectoryTools.sh
source ./build-tools/assertions.sh

target="$1"

if [ -z "$target" ]; then
    echo "Target is required and must be either \"ios\" or \"android\"."
    exit 1
fi

# Build Core Lib
spushd fuse-js
    npx tsc
    TGZ_NAME=$(npm pack --pack-destination . --silent)
    mv ./$TGZ_NAME ./fuse.tgz
spopd

# Build the test echo plugin
spushd plugins/echo
    installResult=$(npm install file:../../fuse-js/fuse.tgz --no-progress)
    if [ $? -ne 0 ]; then
        echo $installResult
        exit $?
    fi
    npx tsc
    TGZ_NAME=$(npm pack --pack-destination . --silent)
    mv ./$TGZ_NAME ./echo-plugin.tgz
spopd

# Build the test app JS
spushd testapp
    installResult=$(npm install file:../fuse-js/fuse.tgz --no-progress)
    if [ $? -ne 0 ]; then
        echo $installResult
        exit $?
    fi
    installResult=$(npm install file:../plugins/echo/echo-plugin.tgz --no-progress)
    if [ $? -ne 0 ]; then
        echo $installResult
        exit $?
    fi

    node scripts/generateTestFile.js 

    if [ "$target" == "android" ]; then
        mkdir -p ./android/testapp/src/main/assets
        cp ./largeFile.txt ./android/testapp/src/main/assets/
        npx webpack --mode development --config webpack.config.android.js
        assertLastCall
    elif [ "$target" == "ios" ]; then
        cp ./largeFile.txt ./ios/testapp/assets/
        npx webpack --mode development --config webpack.config.ios.js
        assertLastCall
    fi
spopd
