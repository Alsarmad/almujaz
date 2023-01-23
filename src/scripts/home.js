module.exports = async (appPath, fs, path) => {

    const feedUrlJson = fs.readJsonSync(path.join(appPath, "./feedUrl.json"));
    const versionJson = fs.readJsonSync(path.join(appPath, "./version.json"));
    const rssFile = fs.readJsonSync(path.join(appPath, "./rssMap.json"));

    let numberWebsite = document.getElementById('numberWebsite');
    let numberFeeds = document.getElementById('numberFeeds');
    let almujaz_version = document.getElementById('almujaz_version');
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


    almujaz_version.innerText = `v${versionJson.currentVersion}`

};