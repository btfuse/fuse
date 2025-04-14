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

source build-tools/DirectoryTools.sh

tagMessage="Fuse Android Filesystem Release: $version"

function onPreRelease {
    spushd plugins/filesystem/android
        echo $version > VERSION
        git add VERSION
    spopd
}

function publishRelease {
    spushd android
        ./gradlew :plugins:filesystem:publishReleasePublicationToMavenRepository
    spopd
}

files=(
    "plugins/filesystem/dist/android/filesystem-$variable-debug.aar"
    "plugins/filesystem/dist/android/filesystem-$variable-debug.aar.sha1.txt"
    "plugins/filesystem/dist/android/filesystem-$variable.aar"
    "plugins/filesystem/dist/android/filesystem-$variable.aar.sha1.txt"
)
