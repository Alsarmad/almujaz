const fs = require('fs-extra');
const path = require('path');

module.exports = async function home(appPath) {

    if (document.getElementById("home")) {

        const feedUrlJson = fs.readJsonSync(path.join(appPath, "./feedUrl.json"));
        const versionJson = fs.readJsonSync(path.join(appPath, "./version.json"));
        const numberWebsite = document.getElementById('numberWebsite');
        const numberFeeds = document.getElementById('numberFeeds');
        const menu_home = document.getElementById('menu_home');
        const almujaz_version = document.getElementById('almujaz_version');
        const rssFile = fs.readJsonSync(path.join(appPath, "./rssMap.json"));
        let arr = []

        numberWebsite.innerText = feedUrlJson.length;

        for (let item of feedUrlJson) {
            let itemJson = fs.readJsonSync(path.join(appPath, `./Rss/${rssFile[item].rssID}.json`));
            if (Object.keys(itemJson).length !== 0) {

                arr.push(itemJson?.items?.length)

            }
        }

        numberFeeds.innerText = arr.length !== 0 ? arr.reduce((a, b) => {
            return a + b;
        }) : 0


        menu_home.addEventListener('click', e => {
            window.location.href = './home.html'
        });

        almujaz_version.innerText = `v${versionJson.currentVersion}`
    }
}