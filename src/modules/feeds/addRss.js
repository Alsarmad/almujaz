const generateRssFile = require("./generateRssFile.js");
const fetchFeeds = require('./fetchFeeds.js');

const isUrl = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

module.exports = async (appPath, fs, path) => {

    const feedUrl = fs.existsSync(path.join(appPath, "./feedUrl.json"));

    let add = document.getElementById('add');
    let add_Content = document.getElementById('add_Content');
    let add_input_close = document.getElementById('add_input_close');
    let input_button = document.getElementById('input_button');
    let input_ok = document.getElementById('input_ok');
    let add_input_url = document.getElementById('add_input_url');

    add.addEventListener('click', () => {
        add_Content.style.display = 'block'
    });

    add_input_close.addEventListener('click', () => {
        add_Content.style.display = 'none'
    });

    input_button.addEventListener('click', async () => {

        const feedUrlJson = fs.readJsonSync(path.join(appPath, "./feedUrl.json"));
        let url = add_input_url.value;
        let checkURL = url.replace(/^(https?:|)\/\//, '');
        input_ok.style.display = 'block'

        if (isUrl(url)) {

            try {

                if (!feedUrlJson.includes(url) && !feedUrlJson.includes("https://" + checkURL) && !feedUrlJson.includes("http://" + checkURL)) {

                    input_ok.style.color = '#1b7a07'
                    input_ok.innerText = 'تم إضافة الرابط'
                    add_input_url.value = ''
                    feedUrlJson.unshift(url);
                    fs.writeJsonSync(path.join(appPath, './feedUrl.json'), feedUrlJson, { spaces: '\t' });
                    await generateRssFile(url, appPath);
                    await fetchFeeds(appPath, fs, path);
                } else {

                    input_ok.style.color = '#eb0000'
                    input_ok.innerText = 'الرابط موجود بالفعل'
                    add_input_url.value = ''

                }

            } catch (error) {

                input_ok.style.color = '#eb0000'
                input_ok.innerText = 'قم بإدخال الرابط بشكل صحيح'
                add_input_url.value = ''
                console.log(error);
            }

        } else {

            input_ok.style.color = '#eb0000'
            input_ok.innerText = 'قم بإدخال الرابط بشكل صحيح'
            add_input_url.value = ''

        }

        setTimeout(() => {
            input_ok.style.display = 'none'
        }, 3500);

    });

}