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

        gameLog_search_input.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();

            } else {
                this.search_query = e.target.value;
                this.search(this.search_query);
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

        gameLog_list.textContent = null;
    };

    search(query) {
        this.entries.map((entry, idx) => {
            console.log(idx, entry);

            if (query.length <= 0) {
                gameLog_list.children[gameLog_list.children.length - 1].style.borderTop = '0.4vh solid white';
                entry.list_el.style.display = 'flex';
                return;
            };

            if (entry.id != query) {
                entry.list_el.style.display = 'none'
                entry.list_el.style.borderTop = 'none';

            } else {
                entry.list_el.style.display = 'flex';
                entry.list_el.style.borderTop = '0.4vh solid white';
            };
        });
    };

    load_to_DOM(logs) {
        gameLog_list.textContent = null;
        this.log_cache = [];

        logs.map(async(entry, i) => {
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

    load_to_server(all_game_data_for_log) {
        socket.emit("update_gameLog", all_game_data_for_log, cb => {
            if (!cb) new Error("Something went wrong while inserting into the gamelogs table");
            game_log_handler.have_to_update = true;
        });
    };

    load_from_server() {
        this.log_cache = [];
        this.entries = [];

        gameLog_list.textContent = null;
        gameLog_list.append(fetch_spinner);
        fetch_spinner.setAttribute('in_use', 'true');

        socket.emit("load_gameLog", this.self_player_id, cb => {
            this.have_to_update = false;
            console.log(cb);

            if (!cb || cb.length <= 0) {
                this.load_error("Seems like you have not played a game yet. Every game you played is listed here.");
                return;
            };

            setTimeout(() => {
                fetch_spinner.setAttribute('in_use', 'false');
                gameLog_list.textContent = null;
                this.load_to_DOM(cb);
            }, 500);

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
        this.id = entry_data.id;
        this.list_el = undefined;
    };

    load() {
        return new Promise(async resolve => {
            let opponent_id = this.entry.p1_id == this.entry_handler.self_player_id ? this.entry.p2_id : this.entry.p1_id;
            let is_match_won = opponent_id != this.entry.p1_id ? this.entry.p1_points > this.entry.p2_points ? true : false : false;
            let primary_color = is_match_won ? 'royalblue' : 'red';
            // console.log(this.entry, opponent_id);

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

            this.list_el = l_item;

            // div1 things
            generateField_preview(this.entry.field_size[0], this.entry.field_size[1], field_wrapper, null);
            [...field_wrapper.querySelectorAll(`.cell`)].map(el => el.style.boxShadow = `0 0 0 0.2vh ${primary_color}`);

            // div2 things
            let opponent_data = !this.entry_handler.opponent_data_cache[opponent_id] ? opponent_id != -1 ? await this.entry_handler.get_data_from_opponent(opponent_id) : null : this.entry_handler.opponent_data_cache[opponent_id];

            // load other id also to cache so client has not to load it from the server again
            await this.entry_handler.get_data_from_opponent(opponent_id == this.entry.p1_id ? this.entry.p2_id : this.entry.p1_id);

            div2_innerWrapper.textContent = `Match vs\xa0`;

            opponent_name_el.textContent = `${this.entry.p2_name}`;
            opponent_name_el.style.color = `${primary_color}`;
            points_el.textContent = opponent_id != this.entry.p1_id ? `\xa0 ${this.entry.p1_points} : ${this.entry.p2_points}` : `\xa0 ${this.entry.p2_points} : ${this.entry.p1_points}`;

            match_won_el.textContent = is_match_won ? 'match won' : 'match lost';

            play_btn.className = 'fas fa-play default_btn';
            details_btn.className = 'fa-solid fa-ellipsis-vertical default_btn';

            // div3 things
            date_el.textContent = `${formatDate(this.entry.match_date)} |\xa0 entry ID: ${this.entry.id}`;

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

            opponent_name_el.addEventListener('click', () => {
                opponent_id != -1 && ClickedOnPlayerInfo(opponent_data);
            });

            details_btn.addEventListener('click', async() => {
                DisplayPopUp_PopAnimation(gameEntry_details_pop_up, "flex", true);
                gameLog_popUp.style.display = "none";

                await this.open_details(this.entry);

                resolve();
            });

            play_btn.addEventListener('click', () => {
                this.start_game_preview(this.entry.field_size[0], this.entry);
            });
        });
    };

    async open_details(entry) {
        let p2_final_name = entry.p2_id != -1 ? this.entry_handler.opponent_data_cache[entry.p2_id].player_name : entry.p2_name;

        gameEntry_gameType_el.textContent = entry.game_mode;
        gameEntry_pointsToWin_el.textContent = entry.points_to_win;
        gameEntry_fieldMode_el.textContent = entry.field_mode;
        gameEntry_fieldSize_el.textContent = `${entry.field_size[0]}x${entry.field_size[1]}`;
        gameEntry_patternsUsed_el.textContent = `${entry.patterns_used.map(i => i.pattern).join(', ')}`;
        gameEntry_gameDuration_el.textContent = `${entry.game_duration} sec.`;
        gameEntry_playerClock_el.textContent = `${entry.player_clock} sec.`;
        gameEntry_levelName_el.textContent = `${entry.level_name}`;
        gameEntry_levelID_el.textContent = `${entry.level_id}`;
        gameEntry_playerPoints_el.textContent = `
            ${this.entry_handler.opponent_data_cache[entry.p1_id].player_name} : ${entry.p1_points}, ${p2_final_name} : ${entry.p2_points}
        `;

        gameEntry_blockerUsed_el.textContent = `${entry.p3_id == -1 && entry.blocker_name.length <= 1 ? "nope" : await this.player3_name_display(entry.p3_id) || entry.blocker_name}`;

        chat_scroll_to_top("instant", gameEntry_details_list);
    };

    async start_game_preview(x, entry) {
        curr_field_ele = DataFields[`${x}x${x}`];

        review_mode = true;

        close_all_scenes();

        gameLog_popUp.style.display = 'none';

        DarkLayerAnimation(GameField, gameModeCards_Div);
        initializeGame(null, null, null, null, null, null, null, null, null, null, null, null, true, entry);

        OnlinePlayerIDs = {
            1: entry.p1_id,
            2: entry.p2_id,
            3: entry.p3_id
        };
    };

    async player3_name_display(p3_id) {
        if (!this.entry_handler.opponent_data_cache[p3_id]) {

            try {
                let data = await this.entry_handler.get_data_from_opponent(p3_id);
                return data.player_name;

            } catch (error) {
                console.log(error);
                return false;
            };
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