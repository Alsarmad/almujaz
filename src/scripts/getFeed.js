const Parser = require('rss-parser');
const getImageUrl = require('./getImageUrl.js');

/**
 * 
 * @param {String} feedUrl Feed link
 * @returns 
 */

module.exports = async function getFeed(feedUrl) {

    const parser = await new Parser({ timed: 600000 }).parseURL(feedUrl)
        .catch(e => { throw new Error(`The feed is not found from the ${feedUrl}`) });

    return {
        webUrl: parser?.link,
        feedUrl: feedUrl,
        webName: parser?.title,
        title: parser?.items?.[0]?.title,
        fullcontent: parser?.items?.[0]?.['content:encoded'],
        content: parser?.items?.[0]?.content,
        link: parser?.items?.[0]?.link,
        author: parser?.items?.[0]?.['dc:creator'] || parser?.items?.[0]?.creator,
        isoDate: parser?.items?.[0]?.isoDate,
        icon: parser?.image?.url,
        language: parser?.language,
        image: await getImageUrl(parser?.items?.[0]?.['content:encoded']).catch(e => { throw new Error(`The images is not found from the ${feedUrl}`) }),
        categories: parser?.items?.[0]?.categories
    }

}