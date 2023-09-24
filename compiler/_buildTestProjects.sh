
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

echo "_buildTestProjects.sh script is deprecated"

# Build the test echo plugin
cd plugins/echo
npm install file:../../fuse-js/fuse.tgz
npx tsc
TGZ_NAME=$(npm pack --pack-destination)
mv ./$TGZ_NAME ./echo-plugin.tgz
cd  ../..

# Build the test permission plugin
cd plugins/permission
npm install file:../../fuse-js/fuse.tgz
npx tsc
TGZ_NAME=$(npm pack --pack-destination)
mv ./$TGZ_NAME ./permission-plugin.tgz
cd  ../..

# Build the test app JS
cd testapp
npm install file:../fuse-js/fuse.tgz
npm install file:../plugins/echo/echo-plugin.tgz
npm install file:../plugins/permission/permission-plugin.tgz
npx webpack --config ./webpack.config.js --mode development --progress
cp ./build/* ./ios/testapp/assets/
cp ./build/* ./android/testapp/src/main/assets/
node scripts/generateTestFile.js 
cp ./largeFile.txt ./ios/testapp/assets/
mkdir -p ./android/testapp/src/main/assets
cp ./largeFile.txt ./android/testapp/src/main/assets/
cd ..
