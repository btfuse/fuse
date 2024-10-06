
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

assertMac "Mac is required to build Fuse Documentation"

echo "Building Fuse JS Reference Documentation..."
npx typedoc --options typedoc.fusejs.json

echo "Building Fuse Android Reference Documentation..."
spushd ../android
    ./gradlew :fuse:generateJavadoc
spopd

echo "Building Fuse iOS Reference Documentation..."
doxygen ../ios/Doxyfile
# spushd ../ios
#     xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuse -configuration Release -destination 'generic/platform=iOS' docbuild
#     xcodebuild -quiet -workspace BTFuse.xcworkspace -scheme BTFuseTestTools -configuration Release -destination 'generic/platform=iOS' docbuild

#     iosBuild=$(echo "$(xcodebuild -workspace BTFuse.xcworkspace -scheme BTFuse -configuration Release -sdk iphoneos -showBuildSettings | grep -E '^\s*CONFIGURATION_BUILD_DIR =' | awk -F '= ' '{print $2}' | xargs)")
#     simBuild=$(echo "$(xcodebuild -workspace BTFuse.xcworkspace -scheme BTFuse -configuration Debug -sdk iphonesimulator -showBuildSettings | grep -E '^\s*CONFIGURATION_BUILD_DIR =' | awk -F '= ' '{print $2}' | xargs)")

#     rm -rf ../docs/build
#     mkdir -p ../docs/build
    
#     rm -rf ../docs/docs/ref/fuse-ios
#     mkdir -p ../docs/docs/ref/fuse-ios

#     xcrun docc convert ./Overview.docc  --fallback-display-name BTFuse --output-dir ../docs/build/Overview.doccarchive
#     xcrun docc merge ../docs/build/Overview.doccarchive $iosBuild/BTFuse.doccarchive $iosBuild/BTFuseTestTools.doccarchive --output-path ../docs/build/merged.doccarchive
#     xcrun docc process-archive transform-for-static-hosting ../docs/build/merged.doccarchive --hosting-base-path ref/fuse-ios --output-path ../docs/docs/ref/fuse-ios/
# spopd

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
