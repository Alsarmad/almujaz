const fs = require('fs-extra');
const path = require('path');

module.exports = (appPath, currentVersion) => {

    fs.writeJsonSync(path.join(appPath, './version.json'), {
        currentVersion: currentVersion,
        alreadyChecked: false,
        latestRelease: "0.0.0"
    }, { spaces: '\t' });

};