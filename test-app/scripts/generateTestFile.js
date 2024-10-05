'use strict';

const FS = require('fs');

if (FS.existsSync('./largeFile.txt')) {
    return;
}

console.log('Generating large test data file... This may take awhile.');

let writer = FS.createWriteStream('./largeFile.txt', 'utf-8');

(async () => {
    for (let i = 0; i <= 104857600; i++) {
        await new Promise((resolve, reject) => {
            writer.write((i % 10).toString(), (e) => {
                if (e) {
                    reject(e);
                    return;
                }

                resolve();
            });
        });
    }

    writer.close();
})();

