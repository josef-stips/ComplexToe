// all about players game log
class gameLogHandler {
    constructor() {
        this.self_player_id = Number(localStorage.getItem("PlayerID"));
        this.log_cache = [];
        this.loaded = false;
        this.search_query = "";

        // every time the game log gets updated the server sends a message to let the client know to update the game log
        this.have_to_update = true;
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
                this.search(this.search_query);

            } else {
                this.search_query = e.target.value;
            };
        });
    };

    open() {
        // open pop up
        settingsWindow.style.display = "none";
        DisplayPopUp_PopAnimation(gameLog_popUp, "flex", true);

        // load entries from server or cache
        this.have_to_update ? this.load_from_server() : this.load_from_cache();
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

    load_error(err) {
        gameLog_list.textContent = err;
    };

    load_element(entry) {

    };

    load_to_server() {

    };

    load_from_server() {
        socket.emit("load_gameLog", this.self_player_id, cb => {
            this.have_to_update = false;
            console.log(cb);

            if (!cb) {
                this.load_error("Seems like you have not played a game yet. Every game you played is listed here.");
                return;
            };

            this.load_to_DOM(cb);
        });
    };

    load_from_cache() {
        this.load_to_DOM(this.log_cache);
    };
};

class gameLogEntry {
    constructor() {

    };
};

let game_log_handler = new gameLogHandler();
game_log_handler.init();