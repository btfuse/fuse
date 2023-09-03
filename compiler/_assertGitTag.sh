
if git tag -l | grep -q "^$GIT_TAG$"; then
    echo "Tag $GIT_TAG already exists."
    exit 1
fi
