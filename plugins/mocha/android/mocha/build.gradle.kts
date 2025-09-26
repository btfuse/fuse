import com.android.build.api.dsl.ManagedVirtualDevice

plugins {
    id("com.android.library")
    id("maven-publish")
}

android {
    namespace = "com.breautek.fuse.mocha"
    compileSdk = 36

    defaultConfig {
        minSdk = 29

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
//        testInstrumentationRunnerArguments["clearPackageData"] = "true"
        testInstrumentationRunnerArguments["runnerBuilder"] = "de.mannodermaus.junit5.AndroidJUnit5Builder"

        consumerProguardFiles("consumer-rules.pro")
    }

    buildTypes {
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

//        execution = "ANDROIDX_TEST_ORCHESTRATOR"

        packaging {
            // https://issuetracker.google.com/issues/379732901?pli=1
            resources.excludes.addAll(
                listOf(
                    "META-INF/versions/**",
                    "META-INF/AL2.0",
                    "META-INF/LGPL2.1",
                    "META-INF/DEPENDENCIES",
                    "META-INF/NOTICE",
                    "META-INF/LICENSE*",
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
                    systemImageSource = "aosp" // aosp-atd seems unstable on API 31
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

//                register("api36", ManagedVirtualDevice::class) {
//                    device = "Nexus One"
//                    apiLevel = 36
//                    systemImageSource = "aosp"
//                }
            }
        }
    }
}

dependencies {
    compileOnly(project(":fuse"))
    compileOnly(project(":fuseTestTools"))
    compileOnly("androidx.test:runner:1.7.0")
    compileOnly("org.junit.jupiter:junit-jupiter-api:5.13.4")
    compileOnly("org.junit.jupiter:junit-jupiter-params:5.13.4")
    compileOnly("de.mannodermaus.junit5:android-test-core:1.8.0")
    compileOnly("de.mannodermaus.junit5:android-test-extensions:1.8.0")


    implementation("androidx.appcompat:appcompat:1.7.1")
    implementation("com.google.android.material:material:1.13.0")
    implementation("org.junit.jupiter:junit-jupiter-api:5.13.4")

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.13.4")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.13.4")
    testImplementation("org.junit.jupiter:junit-jupiter-params:5.13.4")

    androidTestImplementation(project(":fuse"))
    androidTestImplementation(project(":fuseTestTools"))
    androidTestImplementation("androidx.test:runner:1.7.0")
    androidTestImplementation("org.junit.jupiter:junit-jupiter-api:5.13.4")
    androidTestRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.13.4")
    androidTestImplementation("org.junit.jupiter:junit-jupiter-params:5.13.4")
    androidTestImplementation("de.mannodermaus.junit5:android-test-core:1.8.0")
    androidTestRuntimeOnly("de.mannodermaus.junit5:android-test-runner:1.8.0")
    androidTestImplementation("de.mannodermaus.junit5:android-test-extensions:1.8.0")
}

publishing {
    publications {
        create<MavenPublication>("release") {
            groupId = "com.breautek.fuse"
            artifactId = "mocha"
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

