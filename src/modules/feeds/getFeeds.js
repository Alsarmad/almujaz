const { parse } = require('rss-to-json');
const getImageUrl = require('./getImageUrl.js');

module.exports = async function getFeeds(options) {

    try {

        const rss = await parse(options.feedUrl);

        if (options.feedAll) {

            let Array = []

            for (const iterator of rss.items) {


                Array.push({ 
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
                ...rss.items[options.feedItem], 
                image: await getImageUrl(rss.items[options.feedItem]?.content || rss.items[options.feedItem]?.description, rss.link)
            }

        }


    } catch (error) {

        console.log(error);
        return false;

    }

};

// "https://blog.rn0x.me/feed",