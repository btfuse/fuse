#!/bin/sh

# Copyright 2023 Norman Breau 

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

PWD=`pwd`

cd $REPO

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "Not in a Git repository."
    exit 1
fi

if ! git diff-index --quiet HEAD --; then
    echo "Git repository is not clean. There are uncommitted changes."
    exit 1
fi

cd $PWD
