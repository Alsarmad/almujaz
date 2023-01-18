const { parse } = require('rss-to-json');
const getImageUrl = require('./getImageUrl.js');

module.exports = async function getFeed(appPath, options) {

    try {

        const rss = await parse(options.feedUrl);
        const content = rss.items[options.feedItem]?.content || rss.items[options.feedItem]?.description;

        return {
            title: rss.title,
            description: rss.description,
            link: rss.link,
            icon: rss.image,
            image: await getImageUrl(content, rss.link),
            category: rss.category,
            items: rss.items[options.feedItem]
        };
        
    } catch(error) {
        console.log(error);
        return false;
    }
};

// "https://blog.rn0x.me/feed",
// 	"https://christitus.com/categories/linux/index.xml"