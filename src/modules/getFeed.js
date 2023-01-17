const { parse } = require('rss-to-json');

module.exports = async function getFeed(appPath, options) {

    try {

        var rss = await parse(options.feedUrl);

        return {
            title: rss.title,
            description: rss.description,
            link: rss.link,
            image: rss.image,
            category: rss.category,
            items: rss.items[options.feedItem]
        };
        
    } catch(error) {
        console.log(error);
        return false;
    }
};