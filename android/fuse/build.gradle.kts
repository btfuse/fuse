import com.android.build.api.dsl.ManagedVirtualDevice

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

plugins {
    id("com.android.library")
    id("maven-publish")
}

android {
    namespace = "com.breautek.fuse"

    compileSdk = 34
    buildToolsVersion = "34.0.0"

    buildFeatures {
        buildConfig = true
    }

    defaultConfig {
        minSdk = 26

        aarMetadata {
            minCompileSdk = 26
        }

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        consumerProguardFiles("consumer-rules.pro")

        buildConfigField("String", "FUSE_VERSION", "\"" + file("../VERSION").readText().trim() + "\"")
    }

    buildTypes {
        debug {
            isMinifyEnabled = false
        }

        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    publishing {
        singleVariant("release") {
            withSourcesJar()
        }
    }

    testOptions {
        targetSdk = 34

        managedDevices {
            devices {
                register("api28", ManagedVirtualDevice::class) {
                    device = "Pixel 7"
                    apiLevel = 28
                    systemImageSource = "aosp"
                }

                register("api29", ManagedVirtualDevice::class) {
                    device = "Pixel 7"
                    apiLevel = 29
                    systemImageSource = "aosp"
                }

                register("api30", ManagedVirtualDevice::class) {
                    device = "Pixel 7"
                    apiLevel = 30
                    systemImageSource = "aosp-atd"
                }

                register("api31", ManagedVirtualDevice::class) {
                    device = "Pixel 7"
                    apiLevel = 31
                    systemImageSource = "aosp-atd"
                }

                register("api32", ManagedVirtualDevice::class) {
                    device = "Pixel 7"
                    apiLevel = 32
                    systemImageSource = "aosp-atd"
                }

                register("api33", ManagedVirtualDevice::class) {
                    device = "Pixel 7"
                    apiLevel = 33
                    systemImageSource = "aosp-atd"
                }

                register("api34", ManagedVirtualDevice::class) {
                    device = "Nexus One"
                    apiLevel = 34
                    systemImageSource = "aosp-atd"
                }
            }
        }
    }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.webkit:webkit:1.12.0")
    implementation("org.bouncycastle:bcprov-jdk18on:1.77")
    implementation("org.bouncycastle:bcpkix-jdk18on:1.77")

    testImplementation("junit:junit:4.13.2")

    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
    androidTestImplementation("androidx.test:rules:1.6.1")

    androidTestImplementation(project(":EchoPlugin"))
    androidTestImplementation(project(":fuseTestTools"))
}

publishing {
    publications {
        create<MavenPublication>("release") {
            groupId = "com.breautek.fuse"
            artifactId = "core"
            version = file("../VERSION").readText().trim()

            afterEvaluate {
                from(components["release"])
            }
        }
    }

    repositories {
        maven {
            url = uri("https://archiva.breautek.com/repository/breautek")
            credentials {
                username = findProperty("breautek.repository.user").toString()
                password = findProperty("breautek.repository.password").toString()
            }
        }
    }
}

android.libraryVariants.configureEach {
    if (this.name.equals("release")) {
        val variant  = this
        tasks.register<Javadoc>("generateJavadoc") {
            description = "Generates a Javadoc"
            source = variant.javaCompileProvider.get().source
            classpath = files(variant.javaCompileProvider.get().classpath.files)

            options {
                encoding("UTF-8")
                header = "<div style=\"display:flex;justify-content:center;height:100%;width:100%;align-items:center;\"><a href=\"/\">Main Documentation</a></div>"
            }
        }
    }
}
