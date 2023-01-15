const window_controls = require('./scripts/window_controls.js');
const home = require('./scripts/home.js');
const { ipcRenderer, shell } = require('electron');

/* DOM LOAD EVENT */
window.addEventListener('DOMContentLoaded', async (event) => {

  event.preventDefault();

  window_controls(ipcRenderer);
  home();
});