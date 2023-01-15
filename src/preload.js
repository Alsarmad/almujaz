/* packages */

/* preload scripts */
const home = require('./scripts/home.js');

/* DOM LOAD EVENT */
window.addEventListener('DOMContentLoaded', async (event) => {
  home();
});