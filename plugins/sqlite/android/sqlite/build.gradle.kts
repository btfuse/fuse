
import com.android.build.api.dsl.ManagedVirtualDevice


plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
    id("maven-publish")
}

android {
    namespace = "com.breautek.fuse.sqlite"
    compileSdk = 36

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

    kotlinOptions {
        jvmTarget = "17"
    }

    publishing {
        singleVariant("release") {
            withSourcesJar()
        }
    }

    testOptions {
        targetSdk = 36

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

                register("api35", ManagedVirtualDevice::class) {
                    device = "Nexus One"
                    apiLevel = 35
                    systemImageSource = "aosp-atd"
                }
            }
        }
    }
}

android.testVariants.configureEach {
    val cap = name.replaceFirstChar(Char::titlecase) // e.g., "debugAndroidTest" -> "DebugAndroidTest"

    val prepareJSTest = tasks.register<Exec>("prepareJS${cap}") {
        workingDir("../../")
        commandLine("pwd")
        commandLine("npm", "run", "build:unit:test:android")
//        commandLine("./scripts/build.sh", "./src/androidTest/assets")
    }

    tasks.named("merge${cap}Assets").configure {
        dependsOn(prepareJSTest)
    }
}

//androidComponents {
//    onVariants(selector().all()) { variant ->
//        val cap = variant.name.replaceFirstChar(Char::titlecase)
//
//        // Only if this variant actually has androidTest
//        variant.androidTest?.let {
//            val prepareJSTest = tasks.register<Exec>("prepareJS${cap}AndroidTest") {
//                workingDir("../../")
//                commandLine("pwd")
////                commandLine("./scripts/build.sh", "./src/androidTest/assets")
//            }
//
//            // Hook before test assets are merged
//            tasks.named("merge${cap}AndroidTestAssets").configure {
//                dependsOn(prepareJSTest)
//            }
//        }
//    }
//}

dependencies {
    compileOnly(project(":fuse"))
    androidTestImplementation(project(":fuse"))
    androidTestImplementation(project(":fuseTestTools"))
    androidTestImplementation(project(":plugins:mocha"))
    implementation(project(":plugins:sqlite:lib"))
    implementation("androidx.appcompat:appcompat:1.7.1")
    implementation("com.google.android.material:material:1.12.0")
    implementation("com.google.android.gms:play-services-location:21.3.0")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
}

publishing {
    publications {
        create<MavenPublication>("release") {
            groupId = "com.breautek.fuse"
            artifactId = "sqlite"
            version = file("./VERSION").readText().trim()

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
