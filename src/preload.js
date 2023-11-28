let { ipcRenderer, contextBridge } = require('electron');

const ToggleFullScreen = (toggleCommand) => {
    toggleCommand ? ipcRenderer.send("ActivateFullscreen") : ipcRenderer.send("DeactivateFullscreen");
};

contextBridge.exposeInMainWorld('App', {
    ToggleFullScreen: ToggleFullScreen
});