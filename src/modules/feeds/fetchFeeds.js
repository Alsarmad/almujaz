const getFeed = require('./getFeeds.js');

module.exports = async function fetchFeeds(appPath, fs, path) {

    const feedUrlJson = fs.readJsonSync(path.join(appPath, "./feedUrl.json"));

    for (let item of feedUrlJson) {

        const rssFile = fs.readJsonSync(path.join(appPath, "./rssMap.json"));
        let feed = await getFeed({
            feedUrl: item,
            feedAll: true
        });

        fs.writeJsonSync(path.join(appPath, `./Rss/${rssFile[item].rssID}.json`), feed, { spaces: '\t' });
    }
}