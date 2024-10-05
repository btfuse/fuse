plugins {
    id("com.android.library")
    id("maven-publish")
}

android {
    namespace = "com.breautek.fuse.testtools"
    compileSdk = 34

    defaultConfig {
        minSdk = 24

        aarMetadata {
            minCompileSdk = 24
        }

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
}

dependencies {
    implementation("org.bouncycastle:bcpkix-jdk18on:1.77")
    implementation("com.squareup.okhttp3:okhttp:4.9.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("com.googlecode.junit-toolbox:junit-toolbox:2.4")
    compileOnly(project(":fuse"))
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
}

publishing {
    publications {
        create<MavenPublication>("release") {
            groupId = "com.breautek.fuse"
            artifactId = "test-tools"
            version = "0.0.2"

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
