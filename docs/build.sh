
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

source ../build-tools/DirectoryTools.sh
source ../build-tools/assertions.sh

npx typedoc --options typedoc.fusejs.json
spushd ../android
    ./gradlew :fuse:generateJavadoc
spopd

rm -rf ./docs/ref/fuse-android
cp -r ../android/fuse/build/docs/javadoc ./docs/ref/fuse-android

# If not GH action, then source virtual env.
# CI doesn't need virtual environments, it gets scaffolded with the proper
# environment and destroyed.
if [ ! -n "$GITHUB_ACTIONS" ]; then
    source ./venv/bin/activate
fi

if [ "$1" == "serve" ]; then
    mkdocs serve
else
    mkdocs build
fi

if [ ! -n "$GITHUB_ACTIONS" ]; then
    deactivate
fi
