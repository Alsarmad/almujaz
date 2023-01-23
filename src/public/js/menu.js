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
  window.location.href = './discover.html'
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