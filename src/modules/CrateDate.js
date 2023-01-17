const fs = require('fs-extra');
const path = require('path');

module.exports = function CrateDate(appPath) {

    const feedUrl = fs.existsSync(path.join(appPath, "./feedUrl.json"));
    const folderRss = fs.existsSync(path.join(appPath, "./Rss"));

    if (folderRss === false) {

        fs.mkdirsSync(path.join(appPath, '/Rss'), { recursive: true });
        
    }
    
    if (feedUrl === false) {

        fs.writeJsonSync(path.join(appPath, './feedUrl.json'), [], { spaces: '\t' });
        
    }

}