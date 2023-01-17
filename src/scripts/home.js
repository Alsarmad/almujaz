const fs = require('fs-extra');
const path = require('path');

module.exports = async function home(appPath) {

    if (document.getElementById("home")) {

        const feedUrlJson = fs.readJsonSync(path.join(appPath, "./feedUrl.json"));
        const allFeed = document.getElementById('allFeed');
        const viewFeed = document.getElementById('viewFeed');

        for (const item of feedUrlJson) {

            let Hostname = new URL(item)?.hostname;
            let itemJson = fs.readJsonSync(path.join(appPath, `./Rss/${Hostname}.json`));

            for (const iterator of itemJson) {

                // await new Promise(resolve => setTimeout(resolve, 1000));

                let createLi = document.createElement("li");
                let creatimg = document.createElement('img');
                let creatp = document.createElement('p');

                allFeed.appendChild(createLi);
                createLi.id = iterator?.items?.title.replace(/ /g, '_');
                createLi.className = 'allFeed_li'
                createLi.appendChild(creatimg);
                creatimg.src = iterator?.image?.length !== 0 ? iterator?.image?.[0] : '../public/icon/rss.png';
                creatimg.className = 'allFeed_image';
                createLi.appendChild(creatp);
                creatp.innerText = iterator?.items?.title
                creatp.className = 'allFeed_title'

            }

            const allFeed_li = document.getElementsByClassName('allFeed_li');

            Array.from(allFeed_li).forEach((event, item) => {

                document.getElementById(event.id).addEventListener('click', e => {

                    const Feedfind = itemJson.find(e => e.items.title.replace(/ /g, '_') === event.id)

                    allFeed.style.display = 'none';
                    viewFeed.style.display = 'block';

                    viewFeed.innerHTML = Feedfind.items.description

                    console.log(event.id);

                })
            })

        }


    }
}