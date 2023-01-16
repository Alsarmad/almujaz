require('v8-compile-cache');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const IpcMain = require('./scripts/ipcMain.js');

const createWindow = () => {
  var mainWindow;

  mainWindow = new BrowserWindow({
    width: 980,
    height: 600,
    center: true,
    show: false,
    frame: false,
    title: "Almujaz - الموجز",
    //icon: path.join(__dirname, '../build/icons/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      sandbox: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'pages/home.html'));
  mainWindow.webContents.openDevTools();
  //mainWindow.removeMenu();
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });
  mainWindow.on('minimize', (event) => {
    event?.preventDefault();
    //mainWindow?.hide();
  });
  mainWindow?.on('closed', (event) => {
    event?.preventDefault();
    mainWindow = null
    app?.quit();
  });

  // Communicate asynchronously from the main process to renderer processes.

  IpcMain(ipcMain, mainWindow);

};

app.on('ready', (e) => {

  e.preventDefault();
  app.setAppUserModelId("org.alsarmad.almujaz");
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});