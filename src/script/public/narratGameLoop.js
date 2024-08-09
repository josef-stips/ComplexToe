// Enable this when releasing for steam
const useSteam = true;

class SteamPlugin {
    constructor() {
        this.onNarratSetup();
    };

    onNarratSetup() {
        console.log("Loading steam plugin - Creating a game loop to force screen refresh");
        const canvas = document.createElement("canvas");
        canvas.id = "fake-refresh-steam";
        canvas.width = 1;
        canvas.height = 1;
        canvas.style.position = "fixed";
        canvas.style.inset = "0";
        canvas.style.margin = "auto";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "30000";
        canvas.style.width = `100vw`;
        canvas.style.height = `100vh`;
        document.body.appendChild(canvas);
        fakeGameloopForSteam();
    };
};

function fakeGameloopForSteam() {
    const canvas = document.getElementById("fake-refresh-steam");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
    ctx.fillRect(0, 0, 1, 1);
    requestAnimationFrame(fakeGameloopForSteam);
};

window.addEventListener("load", () => {
    if (useSteam) {
        new SteamPlugin();
    };
});