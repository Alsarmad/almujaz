/*
    *  (EN) THIS FILE WILL MAKE PERFORMANCE ISSUES AND WILL BE CHANGED SOON
    * (AR) هذا الملف سوف يسبب بمشاكل في الاداء سوف يتم تغييره قريبا
*/

const fs = require('fs-extra');
const path = require('path');
const getFeed = require('./getFeeds.js');

module.exports = async function fetchFeeds(appPath, time) {

    setInterval(async () => {
        const feedUrlJson = fs.readJsonSync(path.join(appPath, "./feedUrl.json"));

        for (const item of feedUrlJson) {

            const rssFile = await fs.readJsonSync(path.join(appPath, "./rssMap.json"));
            const itemJson = fs.readJsonSync(path.join(appPath, `./Rss/${rssFile[item].rssID}.json`));

            if (Object.keys(itemJson).length === 0) {

                let feed = await getFeed({
                    feedUrl: item,
                    feedAll: true
                });

                fs.writeJsonSync(path.join(appPath, `./Rss/${rssFile[item].rssID}.json`), feed, { spaces: '\t' });

            } else {

                let feed = await getFeed({
                    feedUrl: item,
                    feedItem: 0,
                    feedAll: false
                });

                if (itemJson.items.some(e => e?.link.includes(feed?.link)) === false) {

                    itemJson.items.unshift(feed);
                    fs.writeJsonSync(path.join(appPath, `./Rss/${rssFile[item].rssID}.json`), itemJson, { spaces: '\t' });

                }

            }

        }
    }, time);
}