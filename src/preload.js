/* PACKAGES */
const { ipcRenderer, shell } = require('electron');

/* MODULES */
const dark = require('./modules/dark.js');
const addRss = require('./modules/feeds/addRss.js');
const fetchFeeds = require('./modules/feeds/fetchFeeds.js');

/* PAGES PRELOAD SCRIPT */
const home = require('./scripts/home.js');
const rss = require('./scripts/rss.js');
const explore = require('./scripts/explore.js');
const favorite = require('./scripts/favorite.js');
const settings = require('./scripts/settings.js');
const info = require('./scripts/info.js');

/* DOM LOAD EVENT */
window.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();

  const appPath = await ipcRenderer.invoke("appPath");

  /* Window Controls */
  document.getElementById('closed').addEventListener('click', e => ipcRenderer.send('closed'));
  document.getElementById('minimizable').addEventListener('click', e => ipcRenderer.send('minimizable'));
  document.getElementById('minimize').addEventListener('click', e => ipcRenderer.send('minimize'));
  document.getElementById('Refresh').addEventListener('click', async e => {
    await fetchFeeds(appPath);
    document.location.reload();
  });

  /* Menu */
  const menu_home = document.getElementById('menu_home');
  const menu_rss = document.getElementById('menu_rss');
  const menu_explore = document.getElementById('menu_explore');
  const menu_favorite = document.getElementById('menu_favorite');
  const menu_settings = document.getElementById('menu_settings');
  const menu_info = document.getElementById('menu_info');

  menu_home.addEventListener('click', e => {
    window.location.href = './home.html'
  });

  menu_rss.addEventListener('click', e => {
    window.location.href = './rss.html'
  });

  menu_explore.addEventListener('click', e => {
    window.location.href = './explore.html'
  });

  menu_favorite.addEventListener('click', e => {
    window.location.href = './favorite.html'
  });

  menu_settings.addEventListener('click', e => {
    window.location.href = './settings.html'
  });

  menu_info.addEventListener('click', e => {
    window.location.href = './info.html'
  });

  /* MODULES LOAD */
  dark();
  addRss(appPath);

  /* PAGES LOAD */
  await home(appPath);
  await rss(appPath);
  await explore(appPath);
  await favorite(appPath);
  await settings(appPath);
  await info(appPath);
});