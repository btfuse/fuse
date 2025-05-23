plugins {
    id("com.android.application")
}

android {
    namespace = "com.breautek.fuse.nativeview.testapp"
    compileSdk = 36

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

    defaultConfig {
        applicationId = "com.breautek.fuse.nativeview.testapp"
        minSdk = 29
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
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
}

dependencies {
    implementation(project(":fuse"))
    implementation(project(":plugins:nativeview"))
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.constraintlayout:constraintlayout:2.2.1")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
}

android.applicationVariants.configureEach {
    val variantName = this.baseName.replaceFirstChar(Char::titlecase)

    val prepareJSTask = tasks.register<Exec>("prepareJS${variantName}") {
        workingDir("../../testapp")
        commandLine("npm", "run", "build:android")
    }

    tasks.named("generate${variantName}Resources").configure {
        this.dependsOn(prepareJSTask)
    }
}
