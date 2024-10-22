const { app, BrowserWindow, ipcMain, Menu, webContents } = require('electron');
const path = require('path');

let steam = true;
if (steam) {
    try {
        const steamworks = require("steamworks.js")
        const client = steamworks.init(2940750);

        console.log("steamworks, ", steamworks)
        console.log("client", client)
        console.log(client.getName())

        app.commandLine.appendSwitch("in-process-gpu")
        app.commandLine.appendSwitch("disable-direct-composition")
        app.allowRendererProcessReuse = false
    } catch (error) {
        console.log(error);
    };
};

let mainWindow;
const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        fullscreen: true,
        // icon: "/src/script/public/assets/images/icons/win/icon.ico",
        autoHideMenuBar: true,
        nodeIntegration: true,
        contextIsolation: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: true,
        },
    });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    // load content
    mainWindow.setAspectRatio(1280 / 720);
    mainWindow.loadFile(path.join(__dirname, 'script/public/index.html'));

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
};

// Menu.setApplicationMenu(null);

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
    mainWindow.setFullScreen(true);
});

ipcMain.on("DeactivateFullscreen", () => {
    mainWindow.setFullScreen(false);
});

ipcMain.handle('new_ach', (e, index) => {
    console.log('new_ach:', index);

    switch (index) {
        case 0:
            client.activateAchievement('CT_ACH_001');
            break;
        case 1:
            client.activateAchievement('CT_ACH_002');
            break;
        case 2:
            client.activateAchievement('CT_ACH_003');
            break;
        case 3:
            client.activateAchievement('CT_ACH_004');
            break;
        case 4:
            client.activateAchievement('CT_ACH_005');
            break;
        case 5:
            client.activateAchievement('CT_ACH_006');
            break;
        case 6:
            client.activateAchievement('CT_ACH_007');
            break;
        case 7:
            client.activateAchievement('CT_ACH_008');
            break;
        case 8:
            client.activateAchievement('CT_ACH_009');
            break;
        case 9:
            client.activateAchievement('CT_ACH_010');
            break;
        case 10:
            client.activateAchievement('CT_ACH_011');
            break;
        case 11:
            client.activateAchievement('CT_ACH_012');
            break;
        case 12:
            client.activateAchievement('CT_ACH_013');
            break;
        case 13:
            client.activateAchievement('CT_ACH_014');
            break;
        case 14:
            client.activateAchievement('CT_ACH_015');
            break;
        case 15:
            client.activateAchievement('CT_ACH_016');
            break;
        case 16:
            client.activateAchievement('CT_ACH_017');
            break;
        case 17:
            client.activateAchievement('CT_ACH_018');
            break;
        case 18:
            client.activateAchievement('CT_ACH_019');
            break;
        case 19:
            client.activateAchievement('CT_ACH_020');
            break;
        case 20:
            client.activateAchievement('CT_ACH_021');
            break;
        case 21:
            client.activateAchievement('CT_ACH_022');
            break;
        case 22:
            client.activateAchievement('CT_ACH_023');
            break;
        case 23:
            client.activateAchievement('CT_ACH_024');
            break;
        case 24:
            client.activateAchievement('CT_ACH_025');
            break;
        case 25:
            client.activateAchievement('CT_ACH_026');
            break;
        default:
            console.error('Index außerhalb des gültigen Bereichs');
            break;
    };
});