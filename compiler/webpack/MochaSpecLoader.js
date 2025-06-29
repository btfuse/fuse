
/*
Copyright 2025-2025 Breautek

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


const Path = require('path');
const Glob = require('glob');

/**
 * Find all test files
 */
module.exports = class MochaSpecLoader {
    static get(root = process.cwd()) {
        const files = Glob.sync('./**/*.spec.ts', {
            cwd: Path.resolve(root)
        });
        const entries = {};
        for (const file of files) {
            const name = Path.basename(file, '.ts'); // Only filename, no extension
            entries[name] = './' + Path.join(root, file);
        }
        return entries;
    }
};
