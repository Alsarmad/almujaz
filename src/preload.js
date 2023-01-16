/* PACKAGES */
const { ipcRenderer, shell } = require('electron');

/* MODULES */
const window_controls = require('./modules/window_controls.js');
const dark = require('./modules/dark.js');
const getFeed = require('./modules/getFeed');

/* PAGES PRELOAD SCRIPT */
const home = require('./scripts/home.js');

/* DOM LOAD EVENT */
window.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();
  
  /* MODULES LOAD */
  window_controls(ipcRenderer);
  dark();

  /* PAGES LOAD */
  home(getFeed);
});