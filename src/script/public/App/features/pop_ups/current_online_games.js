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

        this.list.textContent = null;
        this.list.append(fetch_spinner);
        fetch_spinner.setAttribute('in_use', 'true');

        return new Promise(resolve => {
            socket.emit('get_curr_online_games', cb => {
                if (cb.length <= 0) {
                    this.list_msg('No online games to watch at the moment.');
                    return;
                };

                setTimeout(() => {
                    fetch_spinner.setAttribute('in_use', 'false');

                    this.list.textContent = null;
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
        let level_name = document.createElement('h1');
        let level_player_display = document.createElement('span');
        let player1_display = document.createElement('p');
        let player2_display = document.createElement('p');
        let point_relation = document.createElement('p');
        let blocker_el = document.createElement('p');
        let roomID_el = document.createElement('p');

        wrapper1.classList.add('game_item_wrapper1');
        wrapper2.classList.add('game_item_wrapper2');
        wrapper22.classList.add('game_item_wrapper22');
        wrapper21.classList.add('game_item_wrapper21');
        level_player_display.classList.add('game_item_player_wrapper');

        player1_display.classList.add('cursor_btn');
        player2_display.classList.add('cursor_btn');

        level_icon.src = data.costumIcon;
        level_name.textContent = data.fieldTitle;
        player1_display.textContent = `${data.player1_name} vs`;
        player2_display.textContent = `${data.player2_name}`;
        point_relation.textContent = `${data.p1_points ? data.p1_points : 0}:${data.p2_points ? data.p2_points : 0}`;
        blocker_el.textContent = `blocker: ${data.player3_id ? data.player3_name : 'None'}`;
        roomID_el.textContent = `ID: ${data.RoomID}`;

        blocker_el.style.margin = `0.5vw`;
        point_relation.style.margin = `0.5vw`;
        roomID_el.style.width = `max-content`;

        this.declare_css_values(item);
        this.init_player_events(player1_display, player2_display, data.player1_id, data.player2_id);

        this.game_handler.list.append(item);
        item.appendChild(wrapper1);
        item.appendChild(wrapper2);
        wrapper1.appendChild(level_icon);
        wrapper22.appendChild(level_name);
        wrapper22.appendChild(level_player_display);
        level_player_display.appendChild(player1_display);
        level_player_display.appendChild(player2_display);
        wrapper2.appendChild(wrapper22);
        wrapper22.appendChild(roomID_el);
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
            socket.emit('try_to_watch_game', this.game_data.RoomID, cb => {

                if (cb) {
                    this.open_game();
                    resolve(true);

                } else {
                    resolve(false);
                };
            });
        });
    };

    open_game() {

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