const Parser = require('rss-parser');
const getImageUrl = require('./getImageUrl.js');

/**
 * 
 * @param {Object} options
 * @returns 
 */

module.exports = async function getFeed(options) {

    // feed url (ex: https://christitus.com/categories/linux/index.xml/)
    const feedUrl = options.feedUrl;

    // get specefic feed item by number
    const feedItem = options.feedItem || 0;

    const parser = await new Parser({ timed: 600000 }).parseURL(feedUrl)
        .catch(e => { throw new Error(`The feed is not found from the ${feedUrl}`) });

    return {
        webUrl: parser?.link,
        feedUrl: feedUrl,
        webName: parser?.title,
        title: parser?.items?.[feedItem]?.title,
        fullcontent: parser?.items?.[feedItem]?.['content:encoded'],
        content: parser?.items?.[feedItem]?.content,
        link: parser?.items?.[feedItem]?.link,
        author: parser?.items?.[feedItem]?.['dc:creator'] || parser?.items?.[feedItem]?.creator,
        isoDate: parser?.items?.[feedItem]?.isoDate,
        icon: parser?.image?.url,
        language: parser?.language,
        image: await getImageUrl(parser?.items?.[feedItem]?.['content:encoded']).catch(e => { throw new Error(`The images is not found from the ${feedUrl}`) }),
        categories: parser?.items?.[feedItem]?.categories
    }

}