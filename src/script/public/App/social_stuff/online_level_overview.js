// on online level click
class onlineLevelOverviewHandler {
    constructor(level) {
        this.level = level;
    };

    init() {
        this.events();
        this.init_DOM();
        this.init_grid();
        this.init_personal_data_for_level();

        console.log(this.level);
    };

    abort(err) {
        console.log(err);
        AlertText.textContent = "Something went wrong while loading.";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    };

    events() {
        level_scene_back_btn.removeEventListener("click", level_scene_back_btn.click);
        level_scene_back_btn.addEventListener("click", level_scene_back_btn.click = () => {
            DarkLayerAnimation(multiple_use_scene, online_level_scene).then(() => {

                Lobby.style.background = ``;
                theme.start();
            });
        });

        level_scene_start_btn.addEventListener("click", () => {
            DisplayPopUp_PopAnimation(ChooseBetweenModesPopUp, "flex", true);
        });
    };

    init_DOM() {
        let play_btn = document.querySelector(`.level_scene_start_btn > i`);
        let bg1 = player_levels_handler.Settings.bgcolor1[this.level["bg1"]];
        let bg2 = player_levels_handler.Settings.bgcolor2[this.level["bg2"]];

        document.documentElement.style.setProperty("--gradient-first-color", bg1);
        document.documentElement.style.setProperty("--gradient-second-color", bg2);
        Lobby.style.background = `linear-gradient(45deg, ${bg1}, ${bg2})`;

        online_level_scene_title.textContent = this.level["level_name"];
    };

    init_grid() {
        let xy = player_levels_handler.Settings.cellgrid[this.level["field"]];

        if (this.level["costum_field"] != "{}") {
            xy = JSON.parse(this.level["costum_field"]);
        };

        player_levels_handler.GenerateField(xy, xy, level_scene_grid);
    };

    init_personal_data_for_level() {
        try {
            socket.emit("check_personal_data_for_level_x", Number(localStorage.getItem("PlayerID")), this.level["id"], cb => {
                console.log(cb);

                if (!cb) return;


            });

        } catch (error) {
            this.abort(error);
        };
    };
};

chooseModeCloseBtn.addEventListener("click", () => {
    ChooseBetweenModesPopUp.style.display = "none";
    DarkLayer.style.display = "none";
});

OnlineModeBtn.addEventListener("click", () => {
    player_levels_handler.startGame(1);
});

OfflineModeBtn.addEventListener("click", () => {
    player_levels_handler.startGame(0);
});