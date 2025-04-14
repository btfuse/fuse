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
version="$3"

assertGitRepo
assertCleanRepo

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

if [[ "$platform" == "ios" ]]; then
    assertMac "Mac is required for producing iOS builds."
fi

tag="$module/$platform/$version"

assertVersion $version
assertGitTagAvailable $tag

#endregion

LAST_TAG=$(git tag --list "$module/$platform/*" --sort=-v:refname | head -n 1)

case "$module" in
    $MODULE_CORE)
        source compiler/$platform/releaseCore.sh
    ;;
    $MODULE_TEST_TOOLS)
        source compiler/$platform/releaseTestTools.sh
    ;;
    $MODULE_FILESYSTEM)
        source compiler/$platform/releaseFilesystem.sh
    ;;
    $MODULE_NATIVE_VIEW)
        source compiler/$platform/releaseNativeView.sh
    ;;
    $MODULE_LOCATION)
        source compiler/$platform/releaseLocation.sh
    ;;
    # $MODULE_GOOGLE_MAPS)
    #     source compiler/$platform/releaseGoogleMaps.sh
    # ;;
    *)
        echo "Unknown module: '$module'" >&2
        exit 1
    ;;
esac

onPreRelease

./build.sh $platform $module

publishRelease

git commit -m "$tagMessage"
git push
git tag -a "$tag" -m "$tagMessage"
git push --tags

gh release create "$tag" \
    "${files[@]}" \
    --verify-tag --generate-notes \
    --notes-start-tag "$LAST_TAG"
