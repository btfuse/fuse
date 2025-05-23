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

    compileSdk = 36
    buildToolsVersion = "36.0.0"

    buildFeatures {
        buildConfig = true
    }

    defaultConfig {
        minSdk = 29

        aarMetadata {
            minCompileSdk = 29
        }

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        testInstrumentationRunnerArguments["clearPackageData"] = "true"

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
        targetSdk = 36
        execution = "ANDROIDX_TEST_ORCHESTRATOR"

        packaging {
            // https://issuetracker.google.com/issues/379732901?pli=1
            resources.excludes.addAll(
                listOf(
                    "META-INF/versions/**",
                    "META-INF/AL2.0",
                    "META-INF/LGPL2.1",
                    "META-INF/DEPENDENCIES",
                    "META-INF/NOTICE",
                    "META-INF/LICENSE",
                    "META-INF/LICENSE.txt",
                    "META-INF/NOTICE.txt",
                )
            )
        }

        managedDevices {
            allDevices {
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
                    systemImageSource = "aosp"
                }

                register("api32", ManagedVirtualDevice::class) {
                    device = "Pixel 7"
                    apiLevel = 32
                    systemImageSource = "aosp"
                }

                register("api33", ManagedVirtualDevice::class) {
                    device = "Pixel 7"
                    apiLevel = 33
                    systemImageSource = "aosp"
                }

                register("api34", ManagedVirtualDevice::class) {
                    device = "Nexus One"
                    apiLevel = 34
                    systemImageSource = "aosp"
                }

                register("api35", ManagedVirtualDevice::class) {
                    device = "Nexus One"
                    apiLevel = 35
                    systemImageSource = "aosp"
                }
            }
        }
    }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.webkit:webkit:1.13.0")
    implementation("androidx.fragment:fragment:1.8.6")
    implementation("org.bouncycastle:bcprov-jdk18on:1.80")
    implementation("org.bouncycastle:bcpkix-jdk18on:1.80")

    testImplementation("junit:junit:4.13.2")

    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
    androidTestImplementation("androidx.test:rules:1.6.1")
    androidTestUtil("androidx.test:orchestrator:1.5.1")

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
            url = uri("https://nexus.breautek.com/repository/android")
            credentials {
                username = findProperty("breautek.repository.user").toString()
                password = findProperty("breautek.repository.password").toString()
            }
        }
    }
}

android.libraryVariants.configureEach {
    if (this.name.equals("release")) {
        val variant = this
        val variantNameCapitalized = name.replaceFirstChar { it.uppercase() }
        tasks.register<Javadoc>("generateJavadoc") {
            dependsOn(variant.javaCompileProvider)
            dependsOn("generateReleaseResources")

            description = "Generates a Javadoc"
            source = variant.javaCompileProvider.get().source
            classpath += files(android.bootClasspath)
            classpath += files(File("${android.sdkDirectory}/platforms/${android.compileSdkVersion}/android.jar"))
            classpath += files(variant.javaCompileProvider.get().classpath.files)

            val generatedR = file("build/generated/not_namespaced_r_class_sources/${variant.name}/generate${variantNameCapitalized}RFile")
            val generatedBuildConfig = file("build/generated/source/buildConfig/${variant.name}")
            if (generatedR.exists()) {
                classpath += files(generatedR)
            }
            if (generatedBuildConfig.exists()) {
                classpath += files(generatedBuildConfig)
            }

            options {
                windowTitle("Fuse Android")
                encoding("UTF-8")
                header = "<div style=\"display:flex;justify-content:center;height:100%;width:100%;align-items:center;\"><a href=\"/\">Main Documentation</a></div>"
            }
        }
    }
}
