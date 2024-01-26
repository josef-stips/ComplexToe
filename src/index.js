const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        fullscreen: true,
        // icon: "/src/script/public/assets/images/icons/win/icon.ico",
        autoHideMenuBar: true,
        nodeIntegration: true,
        contextIsolation: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: false,
        },
    });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    // load content
    mainWindow.loadFile(path.join(__dirname, 'script/public/index.html'));
    // Open the DevTools.
    // window.webContents.openDevTools();
};

Menu.setApplicationMenu(null);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        };
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

// on ipcMain
ipcMain.on("ActivateFullscreen", () => {
    mainWindow.setFullScreen(true); // Aktiviert den Fullscreen-Modus
});

ipcMain.on("DeactivateFullscreen", () => {
    mainWindow.setFullScreen(false); // Deaktiviert den Fullscreen-Modus
});