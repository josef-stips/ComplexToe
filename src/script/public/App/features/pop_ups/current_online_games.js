// everything about current online games pop up to watch online games
class GlobalOnlineGames_PopUp {
    constructor() {
        this.list = curr_games_list;
        this.game_instances = [];
        this.current_selected_game_instance = null;
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

        return new Promise(resolve => {
            socket.emit('get_curr_online_games', cb => {
                if (cb.length <= 0) {
                    this.list_msg('No online games to watch at the moment.');
                    return;
                };

                cb.map(game => this.generate_item(game));
                resolve();
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
};

// single game
class OnlineGame {
    constructor(parent, game_data) {
        this.game_handler = parent;
        this.game_data = game_data;
        this.players_data = game_data.player_data_rows;

        console.log(this.game_data);
        this.display();
    };

    display() {
        let item = document.createElement('li');
        this.declare_css_values(item);



        this.game_handler.list.append(item);
    };

    declare_css_values(item) {
        document.documentElement.style.setProperty(`--gradient-first-color-${this.game_data.RoomID}`, this.game_data.bgcolor1);
        document.documentElement.style.setProperty(`--gradient-second-color-${this.game_data.RoomID}`, this.game_data.bgcolor2);

        item.style.setProperty(`--first-color`, `var(--gradient-first-color-${this.game_data.RoomID})`);
        item.style.setProperty(`--second-color`, `var(--gradient-second-color-${this.game_data.RoomID})`);
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
    let box = new QABOX(1, [`You can only watch online games`], { 'online games': 'green' }, { 'Y': [0, 0, 0, 0] }, false);
    box.open();
});