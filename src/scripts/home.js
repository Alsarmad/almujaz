const fs = require('fs-extra');
const path = require('path');

module.exports = async function home(appPath) {

    if (document.getElementById("home")) {

        const feedUrlJson = fs.readJsonSync(path.join(appPath, "./feedUrl.json"));
        const allFeed = document.getElementById('allFeed');
        const viewFeed = document.getElementById('viewFeed');
        const rssFile = fs.readJsonSync(path.join(appPath, "./rssMap.json"));

        for (const item of feedUrlJson) {

            let itemJson = fs.readJsonSync(path.join(appPath, `./Rss/${rssFile[item].rssID}.json`));

            for (const iterator of itemJson?.items) {

                let createLi = document.createElement("li");
                let creatimg = document.createElement('img');
                let creatp = document.createElement('p');

                allFeed.appendChild(createLi);
                createLi.id = iterator?.feedId;
                createLi.className = 'allFeed_li'
                createLi.appendChild(creatimg);
                creatimg.src = iterator?.image && iterator?.image?.[0]?.includes('http') && iterator?.image?.length !== 0 ? iterator?.image?.[0] : '../public/icon/rss.png';
                creatimg.className = 'allFeed_image';
                createLi.appendChild(creatp);
                creatp.innerText = iterator?.title
                creatp.className = 'allFeed_title'

            }

            allFeed.style.display = 'flex'

            const allFeed_li = document.getElementsByClassName('allFeed_li');

            Array.from(allFeed_li).forEach((event, item) => {

                document.getElementById(event.id).addEventListener('click', e => {

                    for (const Feedfind of itemJson.items) {

                        if (Feedfind.feedId === event.id) {

                            allFeed.style.display = 'none';
                            viewFeed.style.display = 'block';

                            viewFeed.innerHTML = Feedfind?.content ? Feedfind.content : Feedfind.description;
                            window.scrollTo({ top: 0 })
                            console.log(event.id);

                        }

                    }
                })
            })

        }


    }
}