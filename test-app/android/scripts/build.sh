
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

source ../../build-tools/DirectoryTools.sh
source ../../build-tools/assertions.sh

assetDir="$(pwd)/$1"

if [ -z "$assetDir" ]; then
    echo "Asset directory argument is required"
    exit 1
fi

spushd ../../test-app
    node scripts/generateTestFile.js 
    assertLastCall

    mkdir -p $assetDir
    cp ./largeFile.txt "$assetDir"
    ASSET_DIR="$assetDir" npx webpack --mode development --config webpack.config.android.js
    assertLastCall
spopd
