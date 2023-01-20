const fs = require('fs-extra');
const path = require('path');
const isUrl = require('./isUrl.js');

module.exports = function add_rss(appPath) {

    const feedUrl = fs.existsSync(path.join(appPath, "./feedUrl.json"));
    const add = document.getElementById('add');
    const add_Content = document.getElementById('add_Content');
    const add_input_close = document.getElementById('add_input_close');
    const input_button = document.getElementById('input_button');
    const input_ok = document.getElementById('input_ok');
    const add_input_url = document.getElementById('add_input_url');

    add.addEventListener('click', async () => {
        add_Content.style.display = 'block'
    });

    add_input_close.addEventListener('click', async () => {
        add_Content.style.display = 'none'
    });

    input_button.addEventListener('click', async () => {

        if (feedUrl) {

            const feedUrlJson = fs.readJsonSync(path.join(appPath, "./feedUrl.json"));
            const url = add_input_url.value;
            input_ok.style.display = 'block'

            if (isUrl(url)) {

                const Hostname = new URL(url)?.hostname;

                if (feedUrlJson.includes(url) === false) {

                    input_ok.style.color = '#1b7a07'
                    input_ok.innerText = 'تم إضافة الرابط'
                    add_input_url.value = ''
                    feedUrlJson.unshift(url);
                    fs.writeJsonSync(path.join(appPath, './feedUrl.json'), feedUrlJson, { spaces: '\t' });
                    fs.writeJsonSync(path.join(appPath, `./Rss/${Hostname}.json`), [], { spaces: '\t' });

                }

                else {

                    input_ok.style.color = '#eb0000'
                    input_ok.innerText = 'الرابط موجود بالفعل'
                    add_input_url.value = ''

                }

            }

            else {
                input_ok.style.color = '#eb0000'
                input_ok.innerText = 'قم بإدخال الرابط بشكل صحيح'
                add_input_url.value = ''
            }

            setTimeout(() => {
                input_ok.style.display = 'none'
            }, 2000);

        }

    });

}