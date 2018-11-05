const glob = require('glob');
const path = require('path');
const alias = {};
const srcDir = glob.sync(`${__dirname}/../src/*/`);
srcDir.forEach(item => {
    const splicedDirName = item.split('/');
    const alisaName = splicedDirName[splicedDirName.length - 2];
    alias[alisaName] = path.resolve(item);
});
module.exports = alias;
