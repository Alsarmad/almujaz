const fs = require('fs-extra');
const path = require('path');
const getFeed = require('./getFeeds.js');

module.exports = async function fetchFeeds(appPath) {

    const feedUrlJson = fs.readJsonSync(path.join(appPath, "./feedUrl.json"));

    for (const item of feedUrlJson) {

        const rssFile = fs.readJsonSync(path.join(appPath, "./rssMap.json"));
        const feed = await getFeed({
            feedUrl: item,
            feedAll: true
        });

        fs.writeJsonSync(path.join(appPath, `./Rss/${rssFile[item].rssID}.json`), feed, { spaces: '\t' });
    }
}