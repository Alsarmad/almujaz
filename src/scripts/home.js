module.exports = async function home(getFeed) {
    
    // example rss
    const feed = await getFeed({
        feedUrl: "https://christitus.com/categories/linux/index.xml",
        feedItem: 1,
    });
    
    const title = document.getElementById("feed-titel");
    const content = document.getElementById("feed-content");

    title.innerHTML = feed.title;
    content.innerHTML = feed.content;
}