import com.android.build.api.dsl.ManagedVirtualDevice

plugins {
    id("com.android.library")
    id("maven-publish")
}

android {
    namespace = "com.breautek.fuse.filesystem"
    compileSdk = 35

    defaultConfig {
        minSdk = 29

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
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
        targetSdk = 35

        managedDevices {
            devices {
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
    compileOnly(project(":fuse"))
    androidTestImplementation(project(":fuse"))
    androidTestImplementation(project(":fuseTestTools"))
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
}

publishing {
    publications {
        create<MavenPublication>("release") {
            groupId = "com.breautek.fuse"
            artifactId = "filesystem"
            version = file("../VERSION").readText().trim()

            afterEvaluate {
                from(components["release"])
            }
        }
    }

    repositories {
        maven {
            url = uri("https://nexus.breautek.com/repository/breautek")
            credentials {
                username = findProperty("breautek.repository.user").toString()
                password = findProperty("breautek.repository.password").toString()
            }
        }
    }
}

