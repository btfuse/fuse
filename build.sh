
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

source build-tools/DirectoryTools.sh

if [ "$1" == "" ]; then # build everything
    source compiler/_buildCore.sh
    source compiler/_buildTestProjects.sh
    source compiler/_buildIOS.sh
    spushd fuse-android
        ./build.sh
    spopd
elif [ "$1" == "core" ]; then
    source compiler/_buildCore.sh
elif [ "$1" == "tests" ]; then
    source compiler/_buildTestProjects.sh
elif [ "$1" == "ios" ]; then
    source compiler/_buildIOS.sh
elif [ "$1" == "android" ]; then
    spushd fuse-android
        ./build.sh
    spopd
else
    echo "Unsupported build target: $1"
    exit 1
fi

exit 0
