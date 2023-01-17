const { parse } = require('rss-to-json');
const getImageUrl = require('./getImageUrl.js');

module.exports = async function getFeed(appPath, options) {

    try {

        var rss = await parse(options.feedUrl);

        return {
            title: rss.title,
            description: rss.description,
            link: rss.link,
            icon: rss.image,
            image: await getImageUrl(rss.items[options.feedItem]?.description),
            category: rss.category,
            items: rss.items[options.feedItem]
        };
        
    } catch(error) {
        console.log(error);
        return false;
    }
};