#!/bin/bash

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

source compiler/vars.sh
source build-tools/assertions.sh

platform="$1"
module="$2"

#region Input Validations

if [[ -z "$platform" ]]; then
    echo "Error: platform cannot be empty."
    exit 1
fi

if [[ -z "$module" ]]; then
    echo "Error: module cannot be empty."
    exit 1
fi

isPlatformValid=false
for valid in "${SUPPORTED_PLATFORMS[@]}"; do
    if [[ "$platform" == "$valid" ]]; then
        isPlatformValid=true
        break
    fi
done

isModuleValid=false
for valid in "${SUPPORTED_MODULES[@]}"; do
    if [[ "$module" == "$valid" ]]; then
        isModuleValid=true
        break
    fi
done

if [[ "$isPlatformValid" == false ]]; then
    echo "Error: Invalid platform '$platform'. Allowed values are: ${SUPPORTED_PLATFORMS[*]}."
    exit 1
fi

if [[ "$isModuleValid" == false ]]; then
    echo "Error: Invalid module '$module'. Allowed values are: ${SUPPORTED_MODULES[*]}."
    exit 1
fi

#endregion

case "$module" in
    $MODULE_CORE)
        source compiler/$platform/buildCore.sh
    ;;
    $MODULE_FILESYSTEM)
        source compiler/$platform/buildFilesystem.sh
    ;;
    $MODULE_NATIVE_VIEW)
        source compiler/$platform/buildNativeView.sh
    ;;
    $MODULE_GOOGLE_MAPS)
        source compiler/$platform/buildGoogleMaps.sh
    ;;
esac
