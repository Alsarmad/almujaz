const fs = require('fs-extra');
const path = require('path');

module.exports = (appPath, currentVersion) => {

    fs.existsSync(path.join(appPath, "./data")) ? true : fs.mkdirsSync(path.join(appPath, "/data"), { recursive: true });
    fs.writeJsonSync(path.join(appPath, './data/version.json'), {
            currentVersion: currentVersion,
            alreadyChecked: false,
            latestRelease: "0.0.0" 
    }, { spaces: '\t' });

};