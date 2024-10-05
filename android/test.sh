#!/bin/bash

# Copyright 2023-2024 Breautek 

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

target="$1"

if [ "$target" == "" ]; then
    # There's a bug that prevents concurrent tests to run via GMD
    # ./gradlew \
    #     --parallel :fuse:test \
    #     --parallel :fuse:api27DebugAndroidTest \
    #     --parallel :fuse:api28DebugAndroidTest \
    #     --parallel :fuse:api29DebugAndroidTest 
    #     # --parallel :fuse:api30DebugAndroidTest \
    #     # --parallel :fuse:api31DebugAndroidTest \
    #     # --parallel :fuse:api32DebugAndroidTest \
    #     # --parallel :fuse:api33DebugAndroidTest \
    #     # --parallel :fuse:api34DebugAndroidTest
    # assertLastCall

    ./gradlew :fuse:test
    assertLastCall

    ./gradlew :fuse:api28DebugAndroidTest
    assertLastCall
    ./gradlew :fuse:api29DebugAndroidTest
    assertLastCall
    ./gradlew :fuse:api30DebugAndroidTest
    assertLastCall
    ./gradlew :fuse:api31DebugAndroidTest
    assertLastCall
    ./gradlew :fuse:api32DebugAndroidTest
    assertLastCall
    ./gradlew :fuse:api33DebugAndroidTest
    assertLastCall
    ./gradlew :fuse:api34DebugAndroidTest
    assertLastCall
elif [ "$target" == "local" ]; then
    ./gradlew :fuse:test
    assertLastCall
elif [ "$target" == "device" ]; then
    ./gradlew :fuse:cAT
    assertLastCall
else
    ./gradlew :fuse:api${target}DebugAndroidTest
    assertLastCall
fi
