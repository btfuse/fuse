// swift-tools-version:6.0

import PackageDescription

/*
Copyright 2025 Breautek

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

let package = Package(
    name: "BTFuse",
    platforms: [.iOS(.v15)],
    products: [
        .library(name: "BTFuse", targets: ["BTFuse"]),
        .library(name: "BTFuseTestTools", targets: ["BTFuseTestTools"])
    ],
    targets: [
        .binaryTarget(
            name: "BTFuse",
            url: "https://github.com/btfuse/fuse/releases/download/ios%2Fcore%2F$VERSION$/BTFuse.xcframework.zip",
            checksum: "$CORE_CHECKSUM$"
        ),
        .binaryTarget(
            name: "BTFuseTestTools",
            url: "https://github.com/btfuse/fuse/releases/download/ios%2Fcore%2F$VERSION$/BTFuseTestTools.xcframework.zip",
            checksum: "$TESTTOOLS_CHECKSUM$"
        )
    ]
)
