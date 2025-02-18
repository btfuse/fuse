cd ../android
npm run build
cd ../cordova-test-app
cordova platform remove @btfuse/cordova-android
cordova platform add file:../android --verbose
