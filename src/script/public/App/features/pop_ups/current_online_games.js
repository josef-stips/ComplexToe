// everything about current online games pop up to watch online games
class GlobalOnlineGames_PopUp {
    constructor() {
        this.list = curr_games_list;
        this.search_input = SearchCurrentGame;
        this.game_instances = [];
        this.current_selected_game_instance = null;

        this.cache = [];
    };

    async open() {
        this.current_selected_game_instance = null;
        curr_selected_online_game_el.textContent = `selected: None`;

        DisplayPopUp_PopAnimation(current_games_pop_up, 'flex', true);
        await this.fetch();
    };

    close() {
        current_games_pop_up.style.display = 'none';
        DarkLayer.style.display = 'none';
    };

    fetch() {
        this.list.textContent = null;
        this.cache = [];
        this.game_instances = [];
        this.current_selected_game_instance = null;

        this.list.textContent = null;
        this.list.append(fetch_spinner);
        fetch_spinner.setAttribute('in_use', 'true');

        return new Promise(resolve => {
            socket.emit('get_curr_online_games', cb => {

                setTimeout(() => {
                    fetch_spinner.setAttribute('in_use', 'false');
                    this.list.textContent = null;

                    if (cb.length <= 0) {
                        this.list_msg('No online games to watch at the moment.');
                        return;
                    };

                    this.cache = cb;
                    cb.map(game => this.generate_item(game));
                    resolve();
                }, 600);
            });
        });
    };

    list_msg(msg) {
        let p = document.createElement('p');
        p.style.margin = `5vh 0 0 0`;
        p.style.fontWeight = `500`;
        p.textContent = msg;
        this.list.append(p);
        return;
    };

    generate_item(game_data) {
        this.game_instances.push(new OnlineGame(this, game_data));
    };

    search(query) {
        this.list.textContent = null;

        if (query.trim().length <= 0) {
            this.cache.map(game => this.generate_item(game));
            return;
        };

        this.cache.map(game => game.RoomID == Number(query) && this.generate_item(game));
    };
};

// single game
class OnlineGame {
    constructor(parent, game_data) {
        this.game_handler = parent;
        this.game_data = game_data;
        this.players_data = game_data.player_data_rows;

        console.log(this.game_data);
        this.display(game_data);
    };

    display(data) {
        let item = document.createElement('li');
        let wrapper1 = document.createElement('div');
        let wrapper2 = document.createElement('div');
        let wrapper21 = document.createElement('div');
        let wrapper22 = document.createElement('div');
        let level_icon = document.createElement('img');
        let level_icon_fontAwesome = document.createElement('i');
        let level_name = document.createElement('h1');
        let level_player_display = document.createElement('span');
        let player1_display = document.createElement('p');
        let player2_display = document.createElement('p');
        let point_relation = document.createElement('p');
        let blocker_el = document.createElement('p');
        let roomID_el = document.createElement('p');
        let watcher_el = document.createElement('p');

        wrapper1.classList.add('game_item_wrapper1');
        wrapper2.classList.add('game_item_wrapper2');
        wrapper22.classList.add('game_item_wrapper22');
        wrapper21.classList.add('game_item_wrapper21');
        level_player_display.classList.add('game_item_player_wrapper');
        watcher_el.classList.add('game_item_watcher_count_el');
        watcher_el.classList.add('fa-solid');
        watcher_el.classList.add('fa-eye');
        player1_display.classList.add('cursor_btn');
        player2_display.classList.add('cursor_btn');

        if (data.costumIcon) {
            level_icon.src = data.costumIcon;
            wrapper1.appendChild(level_icon);

        } else {

            if (Fields[data.fieldIndex]['icon-img']) {
                level_icon.src = Fields[data.fieldIndex]['icon-img'];

                if (Fields[data.fieldIndex].name == 'Quick Death') {
                    level_icon.style.transform = `rotate(90deg)`;
                };

                if (Fields[data.fieldIndex].name == 'Long funeral') {
                    level_icon.style.transform = `scaleX(-1) rotate(90deg)`;
                };

                wrapper1.appendChild(level_icon);

            } else {
                level_icon_fontAwesome.className = Fields[data.fieldIndex]['icon'];
                wrapper1.appendChild(level_icon_fontAwesome);
            };
        };

        level_name.textContent = data.fieldTitle;
        player1_display.textContent = `${data.player1_name} vs`;
        player2_display.textContent = `${data.player2_name}`;
        point_relation.textContent = `${data.p1_points ? data.p1_points : 0}:${data.p2_points ? data.p2_points : 0}`;
        blocker_el.textContent = `blocker: ${data.player3_id ? data.player3_name : 'None'}`;
        roomID_el.textContent = `ID: ${data.RoomID}`;
        watcher_el.textContent = `${data.watching_count}`;

        item.style.cursor = 'pointer';
        blocker_el.style.margin = `0.5vw`;
        point_relation.style.margin = `0.5vw`;
        roomID_el.style.width = `max-content`;

        this.declare_css_values(item);
        this.init_player_events(player1_display, player2_display, data.player1_id, data.player2_id);
        this.watch_event(item, data);

        this.game_handler.list.append(item);
        item.appendChild(wrapper1);
        item.appendChild(wrapper2);
        wrapper22.appendChild(level_name);
        wrapper22.appendChild(level_player_display);
        level_player_display.appendChild(player1_display);
        level_player_display.appendChild(player2_display);
        wrapper2.appendChild(wrapper22);
        wrapper22.appendChild(roomID_el);
        wrapper22.appendChild(watcher_el);
        wrapper2.appendChild(wrapper21);
        wrapper21.appendChild(point_relation);
        wrapper21.appendChild(blocker_el);
    };

    declare_css_values(item) {
        document.documentElement.style.setProperty(`--gradient-first-color-${this.game_data.RoomID}`, this.game_data.bgcolor1);
        document.documentElement.style.setProperty(`--gradient-second-color-${this.game_data.RoomID}`, this.game_data.bgcolor2);

        item.style.setProperty(`--first-color`, `var(--gradient-first-color-${this.game_data.RoomID})`);
        item.style.setProperty(`--second-color`, `var(--gradient-second-color-${this.game_data.RoomID})`);
    };

    watch_event(item, data) {
        item.addEventListener('click', () => {
            this.game_handler.current_selected_game_instance = this;
            curr_selected_online_game_el.textContent = `selected: ${data.RoomID}`;
        });
    };

    init_player_events(p1_el, p2_el, p1_id, p2_id) {
        p1_el.addEventListener('click', () => {
            socket.emit("GetDataByID", p1_id, cb => {
                ClickedOnPlayerInfo(cb);
            });
        });

        p2_el.addEventListener('click', () => {
            socket.emit("GetDataByID", p2_id, cb => {
                ClickedOnPlayerInfo(cb);
            });
        });
    };

    watch() {
        return new Promise(resolve => {
            watch_mode = true;

            socket.emit('try_to_watch_game', this.game_data.RoomID, cb => {

                if (cb.success) {
                    personal_GameData.role = 'watcher';
                    personal_GameData.currGameID = this.game_data.RoomID;

                    this.open_game(this.game_data);
                    resolve(true);

                } else {
                    resolve(false);
                };
            });
        });
    };

    open_game(data = this.game_data) {
        StartLoad(GameField, gameModeFields_Div);

        this.watch_mode_handler = new watchModeHandler(data);
        this.watch_mode_handler.init();

        watch_mode = true;
        CloseOnlinePopUps(true);

        cellGrid.style.opacity = '1';
        gameLog_btn.classList.add('blured');
        document.querySelector('.GameField-info-corner').style.display = "flex";
        OnlineChat_btn.style.display = "none";
        GameFieldHeaderUnder.style.display = 'flex';
        AdvantureMode_SpellDisplay.style.display = 'none';
        MaxAmountOfMovesGameDisplay.style.display = 'none';
        chooseWinnerWindowBtn.style.display = 'none';
        GiveUp_btn.style.display = 'none';
        restartBtn.style.display = 'none';
        cellGrid.style.display = 'grid';
        cellGrid.style.pointerEvents = 'none';
        lobbyFooter.style.background = "#15171a";
        lobbyFooter.style.width = "100%";
        review_moves_wrapper.style.display = 'none';
        review_mode_action_wrapper.style.display = 'none';
        review_mode_game_footer.style.display = 'none';
        statusText.style.display = 'flex';
        OnlineChat_btn.style.display = 'none';
        GameField_AveragePlayTimeDisplay.textContent = `ave. playtime ${Fields[data.fieldIndex].averagePlayTime}`;
        GameField_TimeMonitor.textContent = '0 s.';
        GameField_FieldSizeDisplay.textContent = `${data.x_and_y[0]}x${data.x_and_y[1]}`;
        GameField_BlockAmountDisplay.textContent = `${data.x_and_y[0] * data.x_and_y[1]}`;
        statusText.textContent = null;
        scorePlayer1.style.display = 'flex';
        scorePlayer2.style.display = 'flex';
        pointsToAchieve_ScoreBar[0].style.display = 'flex';
        pointsToAchieve_ScoreBar[1].style.display = 'flex';
        watching_count_el.style.display = 'flex';
        watching_count_el.textContent = `watching: ${data.watching_count}`;
        YouWatchGameEl.style.display = 'flex';
        GameFieldHeaderUnderBody.style.display = 'flex';

        sceneMode.default();

        ChangeGameBG(data.bgcolor1, data.bgcolor2);
        PauseMusic();

        curr_music_name = document.querySelector(`audio#${data.curr_music_name}`);;
        CreateMusicBars(curr_music_name);

        points_to_win = data.pointsToWin;
        running = true;
        win_found = false;

        StartLoad(GameField, gameModeFields_Div);
    };
};

class watchModeHandler {
    constructor(data) {
        this.data = data;
    };

    init() {
        this.init_player_icon(this.data);
        this.init_field(this.data);
    };

    init_player_icon(entry) {
        let p1_icon_wrapper = document.createElement('i');
        let p2_icon_wrapper = document.createElement('i');

        if (entry.player1_advancedIcon != 'empty') {
            DisplayPlayerIcon_at_el(p1_icon_wrapper, entry.player1_advancedIcon, entry.player1_color, entry.player1_advancedIcon);

        } else {
            p1_icon_wrapper.textContent = `- ${entry.player1_icon}`;
        };

        if (entry.player2_advancedIcon != 'empty') {
            DisplayPlayerIcon_at_el(p2_icon_wrapper, entry.player2_advancedIcon, entry.player2_color, entry.player2_advancedIcon);

        } else {
            p2_icon_wrapper.textContent = `- ${entry.player2_icon}`;
        };

        namePlayer1.textContent = entry.player1_name;
        namePlayer2.textContent = entry.player2_name;

        namePlayer1.style.color = entry.player1_IconColor;
        namePlayer2.style.color = entry.player2_IconColor;

        scorePlayer1.textContent = entry.p1_points;
        scorePlayer2.textContent = entry.p2_points;

        p1_icon_wrapper.classList.add('p_icon_wrapper');
        p2_icon_wrapper.classList.add('p_icon_wrapper');

        namePlayer1.append(p1_icon_wrapper);
        namePlayer2.append(p2_icon_wrapper);

        player1_score_bar_wrapper.style.background = `linear-gradient(105deg, #3f51b5 ${(entry.p1_points / this.data.pointsToWin) * 100}%, transparent ${5}%)`;
        player2_score_bar_wrapper.style.background = `linear-gradient(-105deg, darkred ${(entry.p2_points / this.data.pointsToWin) * 100}%, transparent ${5}%)`;

        pointsToAchieve_ScoreBar[0].textContent = `/ ${this.data.pointsToWin}`;
        pointsToAchieve_ScoreBar[1].textContent = `/ ${this.data.pointsToWin}`;

        PlayerData[1].AdvancedSkin = `cell ${entry.player1_advancedIcon}`;
        PlayerData[2].AdvancedSkin = `cell ${entry.player2_advancedIcon}`;

        PlayerData[1].PlayerForm = entry.player1_icon;
        PlayerData[2].PlayerForm = entry.player2_icon;

        PlayerData[1].PlayerName = entry.player1_name;
        PlayerData[2].PlayerName = entry.player2_name;

        PlayerData[3].PlayerName = entry.player3_name;

        score_Player1_numb = entry.p1_points;
        score_Player2_numb = entry.p2_points;
    };

    init_field(entry) {
        xCell_Amount = entry.x_and_y[0];
        yCell_Amount = entry.x_and_y[1];

        CreateOptions();
        CalculateBoundaries();
        CreateField();
        CreateWinConditions(entry.x_and_y[0], entry.x_and_y[1], JSON.parse(entry.win_patterns));

        this.cells = [...cellGrid.children];
        cells = this.cells;

        GameData.InnerGameMode = entry.InnerGameMode;

        setTimeout(() => {
            const cellWidth = this.cells[0].getBoundingClientRect().width;
            cells.forEach(cell => {
                cell.style.width = `${cellWidth}px`;
                cell.style.height = `${cellWidth}px`;
            });
        }, 1000);

        if (entry.boneyard_arr != null) {
            entry.boneyard_arr.map((index, i) => {
                index == "%%" && (cells[i].style.background = 'white');
            });
        };

        options = JSON.parse(entry.fieldoptions);

        this.init_cells(options, entry);

        setTimeout(() => {
            FinishLoad(GameField, gameModeFields_Div);
        }, 1000);
    };

    init_cells(options, entry) {
        for (let i = 0; i < options.length; i++) {
            let element = options[i];
            let px = null;
            let px_adv_icon = null;
            let px_color = null;

            if (element == entry.player1_icon.toUpperCase() || element == entry.player1_advancedIcon) {
                px = entry.player1_icon;
                px_adv_icon = entry.player1_advancedIcon;
                px_color = entry.player1_IconColor;

            } else if (element == entry.player2_icon.toUpperCase() || element == entry.player2_advancedIcon) {
                px = entry.player2_icon;
                px_adv_icon = entry.player2_advancedIcon;
                px_color = entry.player2_IconColor;
            };

            if (!px) continue;

            if (element != '' && !cells[i].classList.contains('colored-cell') && px_adv_icon == "empty" && !cells[i].classList.contains("draw") && !cells[i].classList.contains("death-cell")) {

                cells[i].style.color = px_color;
                cells[i].classList.add('colored-cell');

                cells[i].textContent = element;

                cells[i].className = cells[i].className.replace(px_adv_icon, "");
                cells[i].className = cells[i].className.replace(px_adv_icon, "");

                cells[i].style.opacity = "1";
                cells[i].classList.add("draw");

                all_game_moves.push(i);

            } else if (element != '' && !cells[i].classList.contains('colored-cell') && px_adv_icon != "empty" && !cells[i].classList.contains("draw") && !cells[i].classList.contains("death-cell")) {

                cells[i].style.color = "var(--font-color)";
                cells[i].className = `cell ${px_adv_icon}`;
                cells[i].textContent = "";

                cells[i].style.opacity = "1";
                cells[i].classList.add("draw");

                all_game_moves.push(i);
            };

            checkWinner(false, "fromClick");

            if (entry.win_combinations) {
                entry.win_combinations.forEach((comb, index) => JSON.parse(comb).forEach(i => single_CellBlock(cells[i], undefined, comb)));
            };
        };
    };
};

let global_online_games_handler = new GlobalOnlineGames_PopUp();

WatchGame_btn.addEventListener('click', () => {
    play_btn4_sound();
    global_online_games_handler.open();
});

curr_games_watch_btn.addEventListener('click', () => {
    if (!global_online_games_handler.current_selected_game_instance) return;

    global_online_games_handler.current_selected_game_instance.watch()
        .then(result => {
            if (!result) {
                OpenedPopUp_WhereAlertPopUpNeeded = true;
                AlertText.textContent = 'You cannot watch this game anymore.';
                DisplayPopUp_PopAnimation(alertPopUp, 'flex', true);
            };
        });
});

curr_games_pop_up_close_btn.addEventListener('click', () => {
    global_online_games_handler.close();
});

curr_games_pop_up_quest_btn.addEventListener('click', () => {
    let box = new QABOX(2, [`You can only watch online games.`, `select a game by clicking its row and click on "watch".`], { 'online games': 'green', 'select': 'green' }, { 'Y': [0, 0, 0, 0], 's': [0, 0, 0, 0] }, false);
    box.open();
});

SearchCurrentGame.addEventListener('keyup', (e) => {
    global_online_games_handler.search(e.target.value);
});