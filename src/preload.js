/* PACKAGES */
const { ipcRenderer, shell } = require('electron');

/* MODULES */
const dark = require('./modules/dark.js');
const addRss = require('./modules/feeds/addRss.js');

/* PAGES PRELOAD SCRIPT */
const home = require('./scripts/home.js');

/* DOM LOAD EVENT */
window.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();
  
  const appPath = await ipcRenderer.invoke("appPath");

  /* Window Controls */
  document.getElementById('closed').addEventListener('click', e => ipcRenderer.send('closed'));
  document.getElementById('minimizable').addEventListener('click', e => ipcRenderer.send('minimizable'));
  document.getElementById('minimize').addEventListener('click', e => ipcRenderer.send('minimize'));
  document.getElementById('Refresh').addEventListener('click', e => document.location.reload());

  /* MODULES LOAD */
  dark();
  addRss(appPath);

  /* PAGES LOAD */
  await home(appPath);
});