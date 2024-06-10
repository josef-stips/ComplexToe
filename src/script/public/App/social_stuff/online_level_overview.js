// on online level click
class onlineLevelOverviewHandler {
    constructor(level) {
        this.level = level;
        this.personal_data_for_level = null;

        this.comments_handler = new level_comments_handler(this);
    };

    init() {
        this.events();
        this.init_DOM();
        this.init_grid();
        this.init_personal_data_for_level();
        this.comments_handler.events();

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

        level_scene_comments_btn.addEventListener("click", () => {
            this.comments_handler.open();
        });

        comments_close_btn.addEventListener("click", () => {
            this.comments_handler.close();
        });
    };

    init_DOM() {
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

                this.personal_data_for_level = cb;
                level_scene_progress_text.textContent = `${cb[this.level["id"]]["points_made"]} / ${this.level["required_points"]} Points`;
            });

        } catch (error) {
            this.abort(error);
        };
    };
};

// comments

class level_comments_handler {
    constructor(parent) {
        this.parent = parent;
    };

    events() {
        comments_main_form.removeEventListener("submit", comments_main_form.event);

        comments_main_form.addEventListener("submit", comments_main_form.event = (e) => {
            let text = comments_submit_input.value;

            e.preventDefault();

            if (text.length > 0 && text.length < 275) {
                this.submit(text);
                comments_submit_input.value = null;

            } else return;
        });
    };

    open() {
        DisplayPopUp_PopAnimation(comments_pop_up, "flex", true);

        comments_list.textContent = null;
        this.load();
    };

    close() {
        comments_pop_up.style.display = "none";
        DarkLayer.style.display = "none";
    };

    load() {
        try {
            socket.emit("load_comments", this.parent.level["id"], Number(localStorage.getItem("PlayerID")), (messages, personal_reactions) => {

                console.log(messages, personal_reactions);

                if (!messages) return;

                if (!personal_reactions) {
                    messages.forEach(message => this.add(message, null));

                } else {
                    messages.forEach(message => this.add(message, personal_reactions[message["comment_id"]]));
                };
            });

        } catch (error) {
            console.log(error);
        };
    };

    submit(text) {
        try {
            socket.emit("submit_comment_to_level", text, this.parent.level["id"], Number(localStorage.getItem("PlayerID")), localStorage.getItem("UserName"), this.parent.personal_data_for_level, cb => {
                this.add(cb);
            });

        } catch (error) {
            console.log(error);
        };
    };

    add(message_data, personal_reaction) {
        console.log(message_data, personal_reaction);

        message_data["comment_date"] = formatDate(message_data["comment_date"]);

        let message_wrapper = document.createElement("div");
        let message_author = document.createElement("h2");
        let message_points_got = document.createElement("i");
        let message_text = document.createElement("p");
        let message_footer = document.createElement("div");
        let message_date = document.createElement("div");
        let message_reaction_wrapper = document.createElement("div");
        let message_like_btn = document.createElement("div");
        let message_dislike_btn = document.createElement("div");

        message_author.style.fontSize = "4vh";
        message_points_got.style.fontSize = "2vh";
        message_text.style.fontSize = "3vh";
        message_text.style.overflowWrap = "anywhere";
        message_text.style.textAlign = "left";
        message_text.style.marginTop = "1.25vh";

        message_wrapper.classList.add("clan_chat_message");
        message_reaction_wrapper.classList.add("message_reaction_wrapper");
        message_footer.classList.add("message_footer");
        message_date.classList.add("bg_info_in_text_blob");
        message_points_got.classList.add("bg_info_in_text_blob");

        message_dislike_btn.className = "fa-solid fa-thumbs-down dislike_btn";
        message_like_btn.className = "fa-solid fa-thumbs-up like_btn";

        message_like_btn.setAttribute("comment_reaction", personal_reaction);

        if (personal_reaction == false) {
            message_dislike_btn.style.color = "var(--line-color)";
        };

        console.log(message_data["required_points"], this.parent.level);

        if (message_data["player_points"] == null) {
            message_points_got.textContent = `Points: 0 / ${this.parent.level["required_points"]}`;

        } else {
            message_points_got.textContent = `Points: ${message_data["player_points"]} / ${this.parent.level["required_points"]}`;
        };

        message_text.textContent = message_data["comment_text"];
        message_date.textContent = message_data["comment_date"];
        message_author.textContent = message_data["player_name"];
        message_date.textContent = message_data["comment_date"];
        message_dislike_btn.textContent = message_data["dislikes"];
        message_like_btn.textContent = message_data["likes"];

        message_wrapper.appendChild(message_author);
        message_wrapper.appendChild(message_points_got);
        message_wrapper.appendChild(message_text);
        message_wrapper.appendChild(message_footer);
        message_footer.appendChild(message_date);
        message_footer.appendChild(message_reaction_wrapper);
        message_reaction_wrapper.appendChild(message_like_btn);
        message_reaction_wrapper.appendChild(message_dislike_btn);
        comments_list.appendChild(message_wrapper);

        message_wrapper.setAttribute("level_comment_id", message_data["comment_id"]);

        this.message_events(message_wrapper, message_like_btn, message_dislike_btn,
            message_data["player_id"]
        );
    };

    message_events(message_element, like_btn, dislike_btn, player_id) {
        message_element.addEventListener("click", () => {
            try {
                socket.emit("GetDataByID", player_id, cb => {

                    if (player_id == Number(localStorage.getItem("PlayerID"))) {
                        OpenOwnUserProfile();
                        return;

                    } else {
                        ClickedOnPlayerInfo(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, cb);
                    };
                });

            } catch (error) {
                console.log(error);
            };
        });

        like_btn.addEventListener("click", (e) => {
            e.stopPropagation();

            dislike_btn.style.color = "var(--font-color)";

            if (like_btn.getAttribute("comment_reaction") != "true") {

                if (like_btn.getAttribute("comment_reaction") == "false") {

                    dislike_btn.textContent = Number(dislike_btn.textContent) - 1;
                    socket.emit("undislike_level_comment", this.parent.level["id"], Number(localStorage.getItem("PlayerID")),
                        Number(message_element.getAttribute("level_comment_id")));
                };

                socket.emit("like_level_comment", this.parent.level["id"], Number(localStorage.getItem("PlayerID")),
                    Number(message_element.getAttribute("level_comment_id")));

                like_btn.textContent = Number(like_btn.textContent) + 1;
                like_btn.style.color = "var(--line-color)";

                like_btn.setAttribute("comment_reaction", "true");

            } else if (like_btn.getAttribute("comment_reaction") == "true") {

                like_btn.setAttribute("comment_reaction", "null");

                socket.emit("unlike_level_comment", this.parent.level["id"], Number(localStorage.getItem("PlayerID")),
                    Number(message_element.getAttribute("level_comment_id")));

                like_btn.textContent = Number(like_btn.textContent) - 1;
                like_btn.style.color = "var(--font-color)";
            };
        });

        dislike_btn.addEventListener("click", (e) => {
            e.stopPropagation();

            like_btn.style.color = "var(--font-color)";

            if (like_btn.getAttribute("comment_reaction") != "false") {

                if (like_btn.getAttribute("comment_reaction") == "true") {

                    console.log(like_btn.getAttribute("comment_reaction"), like_btn.textContent, Number(like_btn.textContent))

                    like_btn.textContent = Number(like_btn.textContent) - 1;
                    socket.emit("unlike_level_comment", this.parent.level["id"], Number(localStorage.getItem("PlayerID")),
                        Number(message_element.getAttribute("level_comment_id")));
                };

                socket.emit("dislike_level_comment", this.parent.level["id"], Number(localStorage.getItem("PlayerID")),
                    message_element.getAttribute("level_comment_id"));

                dislike_btn.textContent = Number(dislike_btn.textContent) + 1;
                dislike_btn.style.color = "var(--line-color)";

                like_btn.setAttribute("comment_reaction", "false");

            } else if (like_btn.getAttribute("comment_reaction") == "false") {

                like_btn.setAttribute("comment_reaction", "null");

                socket.emit("undislike_level_comment", this.parent.level["id"], Number(localStorage.getItem("PlayerID")),
                    Number(message_element.getAttribute("level_comment_id")));

                dislike_btn.textContent = Number(dislike_btn.textContent) - 1;
                dislike_btn.style.color = "var(--font-color)";
            };
        });
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