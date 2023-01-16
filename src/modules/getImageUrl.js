const { parse } = require('node-html-parser');

/**
 * الحصول على الصور من محتوى الـ html
 * @param {String} content html
 * @return {Array<String>}
 */

module.exports = async function getImageUrl(content) {

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

        if (img?.length === 0 && Ogimg) {

            return [Ogimg?.getAttribute('content')]
        }


        else {

            return content?.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
                ?.map(x => x?.replace(/.*src="([^"]*)".*/, '$1')) || []
        }


    } catch (error) {

        return []
    }
}