/* PACKAGES */
const { ipcRenderer, shell } = require('electron');

/* MODULES */
const window_controls = require('./modules/window_controls.js');
const dark = require('./modules/dark.js');
const getFeed = require('./modules/getFeed');
const add_rss = require('./modules/add_rss.js');

/* PAGES PRELOAD SCRIPT */
const home = require('./scripts/home.js');

/* DOM LOAD EVENT */
window.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();
  
  const appPath = await ipcRenderer.invoke("appPath");

  /* MODULES LOAD */
  window_controls(ipcRenderer);
  dark();
  add_rss(appPath);

  /* PAGES LOAD */
  await home(appPath);
});