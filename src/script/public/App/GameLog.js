// all about players game log
class gameLogHandler {
    constructor() {
        this.self_player_id = Number(localStorage.getItem("PlayerID"));
        this.log_cache = [];
    };

    init() {
        gameLog_btn.addEventListener("click", () => {
            this.open();
        });

        gameLog_closeBtn.addEventListener("click", () => {
            this.close();
        });

        gameLog_search_input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                this.search(e.target.value);
            };
        });
    };

    open() {
        // open pop up
        settingsWindow.style.display = "none";
        DisplayPopUp_PopAnimation(gameLog_popUp, "flex", true);

        // load entriesfrom server
        this.load_from_server();
    };

    close() {
        gameLog_popUp.style.display = "none";
        DisplayPopUp_PopAnimation(settingsWindow, "flex", true);
    };

    search(query) {

    };

    load_to_DOM(logs) {
        logs.map(entry => {
            this.load_element(entry);
        });
    };

    load_element(entry) {

    };

    load_to_server() {

    };

    load_from_server() {
        socket.emit("load_gameLog", this.self_player_id, cb => {

        });
    };
};

class gameLogEntry {
    constructor() {

    };
};

let game_log_handler = new gameLogHandler();
game_log_handler.init();