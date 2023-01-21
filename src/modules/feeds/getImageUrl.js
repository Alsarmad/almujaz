const { parse } = require('node-html-parser');
const fetch = require('node-fetch');

/**
 * الحصول على الصور من محتوى الـ html
 * @param {String} content html
 * @param {String} feedUrl url
 * @returns
 */

module.exports = async function getImageUrl(content, feedUrl) {

    try {

        let img = parse(content)?.querySelectorAll('img');
        let Ogimg = parse(content)?.querySelector('meta[property=og:image]');
        let array = []

        if (img?.length !== 0) {

            for (let item of img) {
                array.push(item?.getAttribute('src'))
            }

            return array
        }

        else if (img?.length === 0 && Ogimg) {

            return [Ogimg?.getAttribute('content')]
        }

        else {

            let response = await fetch(feedUrl);
            let text = await response?.text();

            return text?.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
                ?.map(x => x?.replace(/.*src="([^"]*)".*/, '$1'))

        }


    } catch (error) {

        return []
    }
}