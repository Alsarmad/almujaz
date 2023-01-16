module.exports = function IpcMain(ipcMain, mainWindow) {

    ipcMain.on('closed', () => mainWindow?.close());
    ipcMain.on('minimizable', () => {

        if (mainWindow?.isMaximized()) mainWindow?.unmaximize();
        else mainWindow?.maximize();

    });
    ipcMain.on('minimize', () => mainWindow?.minimize());

}