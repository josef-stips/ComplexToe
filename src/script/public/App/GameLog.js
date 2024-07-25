// all about players game log
class gameLogHandler {
    constructor() {
        this.self_player_id = Number(localStorage.getItem("PlayerID"));
        this.log_cache = []; // json data cache
        this.entries = []; // entry class cache
        this.opponent_data_cache = {}; // opponent data cache
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
        gameLog_list.textContent = null;

        logs.map(async entry => {
            // add entry data to cache
            this.log_cache.push(entry);

            // create entry instance
            this.entries.push(new gameLogEntry(entry, this));
            await this.entries[this.entries.length - 1].load();
        });
    };

    load_error(err) {
        gameLog_list.textContent = err;
    };

    get_data_from_opponent(opponent_id) {
        return new Promise(resolve => {
            socket.emit("GetDataByID", opponent_id, cb => {
                this.opponent_data_cache[opponent_id] = cb;
                resolve(cb);
            });
        });
    };

    load_to_server() {

    };

    load_from_server() {
        this.log_cache = [];
        this.entries = [];

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
    constructor(entry_data, entry_handler) {
        this.entry = entry_data;
        this.entry_handler = entry_handler;
    };

    async load() {
        let opponent_id = this.entry.p1_id == this.entry_handler.self_player_id ? this.entry.p2_id : this.entry.p1_id;
        console.log(this.entry, opponent_id);

        let l_item = document.createElement("li");
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let div2_innerWrapper = document.createElement("div");
        let div3 = document.createElement("div");
        let div4 = document.createElement("div");
        let field_wrapper = document.createElement("div");
        let opponent_name_el = document.createElement("p");
        let points_el = document.createElement('p');
        let btns_list = document.createElement('ul');
        let list_btn1 = document.createElement('li');
        let list_btn2 = document.createElement('li');
        let play_btn = document.createElement('i');
        let details_btn = document.createElement('i');
        let date_el = document.createElement('p');
        let match_won_el = document.createElement('p');

        l_item.classList.add('gameLog_entry');
        div1.classList.add('gameLog_entry_bg');
        div2.classList.add('gameLog_entry_wrapper1');
        div3.classList.add('gameLog_entry_wrapper2');
        field_wrapper.classList.add('gameLog_entry_bg_field');
        opponent_name_el.classList.add('cursor_pointer');
        btns_list.classList.add('gameEntry_btns_list');
        match_won_el.classList.add('gameEntry_match_state_el');
        div2_innerWrapper.classList.add('gameEntry_wrapper1_inner')

        // div1 things
        generateField_preview(this.entry.field_size[0], this.entry.field_size[1], field_wrapper, null);
        [...field_wrapper.querySelectorAll(`.cell`)].map(el => el.style.boxShadow = `0 0 0 0.2vh ${this.entry.bg1}`);

        // div2 things
        let opponent_data = !this.entry_handler.opponent_data_cache[opponent_id] ? await this.entry_handler.get_data_from_opponent(opponent_id) : this.entry_handler.opponent_data_cache[opponent_id];

        // load other id also to cache so client has not to load it from the server again
        await this.entry_handler.get_data_from_opponent(opponent_id == this.entry.p1_id ? this.entry.p2_id : this.entry.p1_id);

        div2_innerWrapper.textContent = `Match vs\xa0`;

        opponent_name_el.textContent = `${opponent_data.player_name}`;
        opponent_name_el.style.color = `${this.entry.bg1}`;
        points_el.textContent = opponent_id != this.entry.p1_id ? `\xa0 ${this.entry.p1_points} : ${this.entry.p2_points}` : `\xa0 ${this.entry.p2_points} : ${this.entry.p1_points}`;

        match_won_el.textContent = opponent_id != this.entry.p1_id ? this.entry.p1_points > this.entry.p2_points ? `match won` : `match lost` : `match lost`;

        opponent_name_el.addEventListener('click', () => {
            ClickedOnPlayerInfo(opponent_data);
        });

        details_btn.addEventListener('click', () => {
            DisplayPopUp_PopAnimation(gameEntry_details_pop_up, "flex", true);
            gameLog_popUp.style.display = "none";

            this.open_details(this.entry);
        });

        play_btn.className = 'fas fa-play default_btn';
        details_btn.className = 'fa-solid fa-ellipsis-vertical default_btn';

        // div3 things
        date_el.textContent = `played on ${formatDate(this.entry.match_date)} |\xa0 entry ID: ${this.entry.id}`;

        div1.appendChild(field_wrapper);
        div2_innerWrapper.appendChild(opponent_name_el);
        div2_innerWrapper.appendChild(points_el);
        div2_innerWrapper.appendChild(btns_list);
        btns_list.appendChild(list_btn1);
        btns_list.appendChild(list_btn2);
        list_btn1.appendChild(play_btn);
        list_btn2.appendChild(details_btn);
        div2.appendChild(div2_innerWrapper);
        div2.appendChild(match_won_el);
        l_item.appendChild(div1);
        l_item.appendChild(div2);
        l_item.appendChild(div3);
        div3.appendChild(date_el);
        gameLog_list.appendChild(l_item);
    };

    async open_details(entry) {
        gameEntry_gameType_el.textContent = entry.game_mode;
        gameEntry_pointsToWin_el.textContent = entry.points_to_win;
        gameEntry_fieldMode_el.textContent = entry.field_mode;
        gameEntry_fieldSize_el.textContent = `${entry.field_size[0]}x${entry.field_size[1]}`;
        gameEntry_patternsUsed_el.textContent = `${entry.patterns_used.join(', ')}`;
        gameEntry_gameDuration_el.textContent = `${entry.game_duration} sec.`;
        gameEntry_playerClock_el.textContent = `${entry.player_clock} sec.`;
        gameEntry_levelName_el.textContent = `${entry.level_name}`;
        gameEntry_levelID_el.textContent = `${entry.level_id}`;
        gameEntry_playerPoints_el.textContent = `
            ${this.entry_handler.opponent_data_cache[entry.p1_id].player_name} : ${entry.p1_points}, ${this.entry_handler.opponent_data_cache[entry.p2_id].player_name} : ${entry.p2_points}
        `;
        gameEntry_blockerUsed_el.textContent = `${entry.p3_id == -1 ? "nope" : await this.player3_name_display(entry.p3_id)}`;

        chat_scroll_to_top("instant", gameEntry_details_list);
    };

    async player3_name_display(p3_id) {
        if (!this.entry_handler.opponent_data_cache[p3_id]) {
            let data = await this.entry_handler.get_data_from_opponent(p3_id);
            return data.player_name;
        };

        return this.entry_handler.opponent_data_cache[p3_id].player_name;
    };
};

let game_log_handler = new gameLogHandler();
game_log_handler.init();

// game entry details pop up stuff
gameEntry_details_closeBtn.addEventListener("click", () => {
    DisplayPopUp_PopAnimation(gameLog_popUp, "flex", true);
    gameEntry_details_pop_up.style.display = "none";
});