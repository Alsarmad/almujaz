const fs = require('fs-extra');
const path = require('path');
const getFeed = require('./getFeed.js');

module.exports = async function feed(appPath) {

    while (true) {

        await new Promise(resolve => setTimeout(resolve, 1000));
        const feedUrlJson = fs.readJsonSync(path.join(appPath, "./feedUrl.json"));

        for (const item of feedUrlJson) {

            const Hostname = new URL(item)?.hostname;
            const itemJson = fs.readJsonSync(path.join(appPath, `./Rss/${Hostname}.json`));

            if (itemJson.length === 0) {

                const Number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

                for (const iterator of Number) {

                    await new Promise(resolve => setTimeout(resolve, 1000));
                    let feed = await getFeed(appPath, {
                        feedUrl: item,
                        feedItem: iterator
                    });

                    if (itemJson.some(e => e?.items?.link.includes(feed?.items?.link)) === false) {

                        itemJson.unshift(feed);
                        fs.writeJsonSync(path.join(appPath, `./Rss/${Hostname}.json`), itemJson, { spaces: '\t' });

                    }

                }

            }

            else {

                let feed = await getFeed(appPath, {
                    feedUrl: item,
                    feedItem: 0
                });

                if (itemJson.some(e => e?.items?.link.includes(feed?.items?.link)) === false) {

                    itemJson.unshift(feed);
                    fs.writeJsonSync(path.join(appPath, `./Rss/${Hostname}.json`), itemJson, { spaces: '\t' });

                }

            }

        }

    }
}