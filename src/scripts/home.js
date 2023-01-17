
module.exports = async function home(appPath, getFeed) {

    if(document.getElementById("home")) {
        document.getElementById("getFeed").addEventListener("click", async () => {
            
            // example rss
            const feed = await getFeed(appPath, {
                feedUrl: document.getElementById("feedUrl").value,
                feedItem: document.getElementById("feedItem").value
            });

            // RSS
            const rss_link = document.getElementById("rss_link");
            const rss_title = document.getElementById("rss_title");
            const rss_description = document.getElementById("rss_description");
            rss_link.href = feed.link;
            rss_title.innerHTML = feed.title;
            rss_description.innerHTML = feed.description;

            // ITEMS (FEEDS)
            const item_link = document.getElementById("item_link");
            const item_title = document.getElementById("item_title");
            const item_createdAt = document.getElementById("item_createdAt");
            const item_description = document.getElementById("item_description");
            item_link.href = feed.items.link;
            item_title.innerHTML = feed.items.title;
            item_createdAt.innerHTML = new Date(feed.items.published);
            item_description.innerHTML = feed.items.description;

        });
    }
}