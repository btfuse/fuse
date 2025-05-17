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

spushd android
    ./gradlew :plugins:sqlite:test
    assertLastCall
spopd

if [[ -z "$sdkVersion" ]]; then
    for sdkVersion in "${SUPPORTED_ANDROID_VERSIONS[@]}"; do
        spushd android
            ./gradlew :plugins:sqlite:api${sdkVersion}DebugAndroidTest
            assertLastCall
        spopd
    done
else
    spushd android
        ./gradlew :plugins:sqlite:api${sdkVersion}DebugAndroidTest
        assertLastCall
    spopd
fi

