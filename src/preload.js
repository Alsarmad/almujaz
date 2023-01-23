/* PACKAGES */
const { ipcRenderer } = require("electron");
const fs = require("fs-extra");
const path = require("path");

/* PAGES PRELOADS SCRIPTS */
let home = require("./scripts/home.js");
let discover = require("./scripts/discover.js");
let rss = require("./scripts/rss.js");
let favorite = require("./scripts/favorite.js");
let settings = require("./scripts/settings.js");
let info = require("./scripts/info.js");

/* MODULES */
let dark = require("./modules/dark.js");
let addRss = require("./modules/feeds/addRss.js");
let fetchFeeds = require("./modules/feeds/fetchFeeds.js");

/* DOM LOAD EVENT */
window.addEventListener("DOMContentLoaded", async (event) => {
  event.preventDefault();

  const appPath = await ipcRenderer.invoke("appPath");

  /* Window Controls */
  document.getElementById("closed").addEventListener("click", (e) => ipcRenderer.send("closed"));
  document.getElementById("minimizable").addEventListener("click", (e) => ipcRenderer.send("minimizable"));
  document.getElementById("minimize").addEventListener("click", (e) => ipcRenderer.send("minimize"));
  document.getElementById("Refresh").addEventListener("click", async (e) => {
    await fetchFeeds(appPath, fs, path);
    window.location.href = window.location.href;
  });

  /* MODULES LOAD */
  dark();
  addRss(appPath, fs, path);

  /* PAGES LOAD (SWITCH) */
  let pageFile = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
  switch (pageFile) {
    case "home.html":
      await home(appPath, fs, path);
      break;

    case "discover.html":
      await discover(appPath, fs, path);
      break;

    case "rss.html":
      await rss(appPath, fs, path);
      break;

    case "favorite.html":
      await favorite(appPath, fs, path);
      break;

    case "settings.html":
      await settings(appPath, fs, path);
      break;

    case "info.html":
      await info(appPath, fs, path);
      break;

    default:
      window.location.href = "./home.html";
      break;
  }
});
