
fork="$1"

if [ -z "$fork" ]; then
    fork="btfuse"
fi

echo "Checking Fuse Docs..."
if [ ! -z "$(readlink -f ./fuse-docs)" ]; then
    git clone git@github.com:$fork/fuse-docs.git --recurse-submodules
fi

echo "Checking Fuse JS..."
if [ ! -z "$(readlink -f ./fuse-js)" ]; then
    git clone git@github.com:$fork/fuse-js.git --recurse-submodules
fi

if [ `uname` == "Darwin" ]; then
    echo "Checking Fuse iOS..."
    if [ ! -z "$(readlink -f ./fuse-ios)" ]; then
        git clone git@github.com:$fork/fuse-ios.git --recurse-submodules
    fi
else
    echo "Skipping Fuse iOS because we are not on a MacOS environment."
fi

echo "Checking Fuse Android..."
if [ ! -z "$(readlink -f ./fuse-android)" ]; then
    git clone git@github.com:$fork/fuse-android.git --recurse-submodules
fi

echo "Checking Fuse Test App..."
if [ ! -z "$(readlink -f ./fuse-test-app)" ]; then
    git clone git@github.com:$fork/fuse-test-app.git --recurse-submodules
fi

echo "Checking Fuse Echo Plugin..."
if [ ! -z "$(readlink -f ./fuse-echo)" ]; then
    git clone git@github.com:$fork/fuse-echo.git --recurse-submodules
fi
