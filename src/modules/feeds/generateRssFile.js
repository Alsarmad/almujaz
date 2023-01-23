const fs = require('fs');
const path = require('path');

const makeid = (length) => {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = async (url, appPath) => {

    const rssMap = JSON.parse(fs.readFileSync(path.join(appPath, "./rssMap.json"), 'utf-8'));
    let rssID = "rss_" + makeid(6);

    rssMap[url] = { hostName: new URL(url).hostname, rssID: rssID };
    fs.writeFileSync(path.join(appPath, `./rssMap.json`), JSON.stringify(rssMap, null, 4))
    fs.writeFileSync(path.join(appPath, `./Rss/${rssID}.json`), JSON.stringify({}, null, 4));

};