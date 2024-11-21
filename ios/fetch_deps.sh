#!/bin/bash

# Copyright 2024 Breautek 

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

mkdir -p third_party

OPENSSL_VERSION="3.2.0-fuse-2"
GOOGLE_MAPS_VERSION="9.1.1"

cd third_party

rm -rf google-maps
mkdir -p google-maps
spushd google-maps
    wget https://dl.google.com/geosdk/swiftpm/$GOOGLE_MAPS_VERSION/GoogleMaps_3p.xcframework.zip
    wget https://dl.google.com/geosdk/swiftpm/$GOOGLE_MAPS_VERSION/GoogleMapsBase_3p.xcframework.zip
    wget https://dl.google.com/geosdk/swiftpm/$GOOGLE_MAPS_VERSION/GoogleMapsCore_3p.xcframework.zip
    wget https://dl.google.com/geosdk/swiftpm/$GOOGLE_MAPS_VERSION/GoogleMapsResources.zip

    unzip GoogleMaps_3p.xcframework.zip
    unzip GoogleMapsBase_3p.xcframework.zip
    unzip GoogleMapsCore_3p.xcframework.zip
    unzip GoogleMapsResource.zip

    rm -f *.zip
spopd

rm -rf openssl
mkdir -p openssl
spushd openssl
    wget https://github.com/btfuse/openssl/releases/download/$OPENSSL_VERSION/OpenSSL.xcframework.zip

    unzip OpenSSL.xcframework.zip

    rm -f *.zip
spopd
