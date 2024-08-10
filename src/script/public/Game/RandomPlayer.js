// everything about random player functionality
class RandomPlayerHandler {
    constructor() {

    };

    init() {
        this.events();
    };

    events() {
        // random game opponent button
        SearchRandomOpponent_btn.addEventListener("click", () => {
            random_player_mode = true;
            curr_mode = GameMode[2].opponent;
            play_btn4_sound();
            DisplayPopUp_PopAnimation(OnlineGame_iniPopUp, 'flex', true);
        });
    };

    create_lobby() {
        socket.emit('created_random_player_lobby', Number(localStorage.getItem("PlayerID")), Number(localStorage.getItem('ELO')), personal_GameData.currGameID, cb => {
            if (!cb) {
                AlertText.textContent = 'something went wrong.';
                DisplayPopUp_PopAnimation(alertPopUp, 'flex', true);
                return;
            };
        });
    };

    to_join_list() {

    };

    join_lobby() {

    };
};

const random_player_handler = new RandomPlayerHandler();
random_player_handler.init();