# Copyright 2025 Breautek 

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

source build-tools/DirectoryTools.sh

PLATFORM_ANDROID="android"
PLATFORM_IOS="ios"
PLATFORM_JS="js"

MODULE_CORE="core"
MODULE_TEST_TOOLS="testtools"
MODULE_FILESYSTEM="filesystem"
MODULE_NATIVE_VIEW="nativeview"
MODULE_GOOGLE_MAPS="googlemaps"
MODULE_LOCATION="location"
MODULE_SQLITE="sqlite"
MODULE_SQLITE_LIB="sqlitelib"

SUPPORTED_PLATFORMS=(
    "$PLATFORM_ANDROID"
    "$PLATFORM_IOS"
    "$PLATFORM_JS"
)

SUPPORTED_MODULES=(
    "$MODULE_CORE"
    "$MODULE_TEST_TOOLS"
    "$MODULE_FILESYSTEM"
    "$MODULE_NATIVE_VIEW"
    "$MODULE_GOOGLE_MAPS"
    "$MODULE_LOCATION"
    "$MODULE_SQLITE"
    "$MODULE_SQLITE_LIB"
)

SUPPORTED_ANDROID_VERSIONS=(
    30
    31
    32
    33
    34
    35
)

DIST_DIR=`pwd`/dist
mkdir -p $DIST_DIR

spushd android
    ANDROID_PROJECT_DIR=`pwd`
    GRADLE=`pwd`/gradlew
spopd
