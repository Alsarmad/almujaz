const fs = require('fs-extra');
const path = require('path');

module.exports = (appPath, currentVersion) => {

    fs.existsSync(path.join(appPath, "../Almujaz")) ? true : 
        fs.mkdirsSync(path.join(appPath, '../Almujaz'), { recursive: true });

    fs.writeJsonSync(path.join(appPath, './version.json'), {
        currentVersion: currentVersion,
        alreadyChecked: false,
        latestRelease: "0.0.0"
    }, { spaces: '\t' });

    fs.existsSync(path.join(appPath, "./Rss")) ? true : 
        fs.mkdirsSync(path.join(appPath, './Rss'), { recursive: true });

    fs.existsSync(path.join(appPath, "./feedUrl.json")) ? true : 
        fs.writeJsonSync(path.join(appPath, './feedUrl.json'), [], { spaces: '\t' });

    fs.existsSync(path.join(appPath, "./rssMap.json")) ? true :
        fs.writeJsonSync(path.join(appPath, './rssMap.json'), {}, { spaces: '\t' });

};