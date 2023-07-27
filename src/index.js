const { app, BrowserWindow } = require('electron');
const server = require('./server');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

let windows = new Set();

const createWindow = () => {
    // Create the browser window.
    let window = new BrowserWindow({
        width: 1000,
        height: 800,
        fullscreen: true,
        // autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    windows.add(window)

    window.on("closed", () => {
        windows.delete(window);
        window = null;
    });

    // load content
    window.loadURL('http://localhost:3000');

    // Open the DevTools.
    window.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (BrowserWindow.getAllWindows().length === 0) {
    //     createWindow();
    // }

    if (windows.size === 0) {
        createWindow();
    };
});