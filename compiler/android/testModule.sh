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
source compiler/vars.sh

if [ -z "$MODULE_ID" ]; then
    echo "MODULE_ID variable is required."
    exit 2
fi

spushd android
    ./gradlew :$MODULE_ID:test
    assertLastCall
spopd

if [[ "$sdkVersion" == "device" ]]; then
    spushd android
        ./gradlew :$MODULE_ID:cAT
    spopd
elif [[ -z "$sdkVersion" ]]; then
    for sdkVersion in "${SUPPORTED_ANDROID_VERSIONS[@]}"; do
        spushd android
            ./gradlew :$MODULE_ID:api${sdkVersion}DebugAndroidTest
            assertLastCall
        spopd
    done
else
    spushd android
        ./gradlew :$MODULE_ID:api${sdkVersion}DebugAndroidTest
        assertLastCall
    spopd
fi

