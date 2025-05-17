/*
Copyright 2023 Breautek 

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

pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "Fuse"
include(":fuse")
include(":fuseTestTools")

include(":EchoPlugin")
project(":EchoPlugin").projectDir = File("../echo/android")

include(":testapp")
project(":testapp").projectDir = File("../test-app/android")

include(":plugins:location")
project(":plugins:location").projectDir = File("../plugins/location/android/location")
include(":plugins:location:testapp")
project(":plugins:location:testapp").projectDir = File("../plugins/location/android/testapp")

include(":plugins:nativeview")
project(":plugins:nativeview").projectDir = File("../plugins/nativeview/android/nativeview")
include(":plugins:nativeview:testapp")
project(":plugins:nativeview:testapp").projectDir = File("../plugins/nativeview/android/testapp")

include(":plugins:googlemaps")
project(":plugins:googlemaps").projectDir = File("../plugins/googlemaps/android/googlemaps")
include(":plugins:googlemaps:testapp")
project(":plugins:googlemaps:testapp").projectDir = File("../plugins/googlemaps/android/testapp")

include(":plugins:filesystem")
project(":plugins:filesystem").projectDir = File("../plugins/filesystem/android/filesystem")
include(":plugins:filesystem:testapp")
project(":plugins:filesystem:testapp").projectDir = File("../plugins/filesystem/android/testapp")

include(":plugins:sqlite")
project(":plugins:sqlite").projectDir = File("../plugins/sqlite/android/sqlite")
include(":plugins:sqlite:lib")
project(":plugins:sqlite:lib").projectDir = File("../plugins/sqlite/android/sqlite/lib")
