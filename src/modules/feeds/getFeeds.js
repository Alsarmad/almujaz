const { parse } = require('rss-to-json');
const getImageUrl = require('./getImageUrl.js');

module.exports = async (options) => {

    try {

        const rss = await parse(options.feedUrl);

        if (options.feedAll) {

            let Array = []

            for (let iterator of rss?.items) {


                Array.push({
                    feedId: Math.random().toString(36).substring(2),
                    ...iterator,
                    image: await getImageUrl(iterator?.content || iterator?.description, rss.link)
                });

            }

            return {
                title: rss.title,
                description: rss.description,
                link: rss.link,
                icon: rss.image,
                category: rss.category,
                items: Array
            };

        }

        else {

            return {
                feedId: Math.random().toString(36).substring(2),
                ...rss.items[options.feedItem],
                image: await getImageUrl(rss.items[options.feedItem]?.content || rss.items[options.feedItem]?.description, rss.link)
            }

        }


    } catch (error) {

        console.log(error);
        return false;

    }

};