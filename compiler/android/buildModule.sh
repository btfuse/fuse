
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
source build-tools/Checksum.sh

if [ -z "$MODULE_ID" ]; then
    echo "MODULE_ID variable is required."
    exit 2
fi

if [ -z "$MODULE_NAME" ]; then
    echo "MODULE_NAME variable is required."
    exit 2
fi

if [ -z "$MODULE_MARKET_NAME" ]; then
    echo "MODULE_MARKET_NAME variable is required."
    exit 2
fi

if [ -z "$MODULE_DIR" ]; then
    echo "MODULE_DIR variable is required."
    exit 2
fi

MODULE_PATH="${MODULE_ID//:/\/}"

MODULE_DIST_DIR="$DIST_DIR/android/$MODULE_PATH"
mkdir -p $MODULE_DIST_DIR

spushd $MODULE_DIR
    VERSION=$(< "./VERSION")

    echo "Building Fuse $MODULE_MARKET_NAME Android Framework $VERSION..."

    spushd $ANDROID_PROJECT_DIR
        $GRADLE :plugins:$MODULE_ID:build
        assertLastCall
    spopd

    OUTPUT_NAME="${MODULE_ID//:/_}"

    cp build/outputs/aar/*.aar $MODULE_DIST_DIR/
    assertLastCall
        
    spushd $MODULE_DIST_DIR
        BIN_NAME="${MODULE_ID##*:}"
        
        mv $BIN_NAME-debug.aar $OUTPUT_NAME-$VERSION-debug.aar
        mv $BIN_NAME-release.aar $OUTPUT_NAME-$VERSION.aar
        sha1_compute $OUTPUT_NAME-$VERSION-debug.aar
        sha1_compute $OUTPUT_NAME-$VERSION.aar
    spopd
spopd
