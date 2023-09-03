
if git tag -l | grep -q "^$GIT_TAG$"; then
    echo "Tag $VERSION already exists."
    exit 1
fi
