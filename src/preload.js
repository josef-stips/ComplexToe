let { ipcRenderer, contextBridge } = require('electron');

const ToggleFullScreen = (toggleCommand) => {
    toggleCommand ? ipcRenderer.send("ActivateFullscreen") : ipcRenderer.send("DeactivateFullscreen");
};

const new_achievement = (index) => {
    console.log(index);
    ipcRenderer.invoke('new_ach', index);
};

contextBridge.exposeInMainWorld('App', {
    ToggleFullScreen,
    new_achievement
});