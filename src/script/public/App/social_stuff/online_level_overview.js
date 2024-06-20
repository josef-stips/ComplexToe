// on online level click
class onlineLevelOverviewHandler {
    constructor(level, author) {
        this.level = level;
        this.author = author;
        this.personal_data_for_level = null;

        this.comments_handler = new level_comments_handler(this);
        this.patterns_handler = new levelPatternsOverviewHandler(this);
        this.score_board = new OnlineLevelPlayerScoreBoardHandler(this);
    };

    async init() {
        console.log(this.level);

        this.init_DOM();
        this.init_grid();
        await this.init_personal_data_for_level();
        this.events();

        this.comments_handler.events();
        this.score_board.events();
        this.patterns_handler.init();
    };

    abort(err) {
        console.log(err);
        AlertText.textContent = "Something went wrong while loading.";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    };

    events() {
        level_scene_back_btn.removeEventListener("click", level_scene_back_btn.click);

        level_scene_back_btn.addEventListener("click", level_scene_back_btn.click = () => {
            if (!NewCreativeLevel) {
                DarkLayerAnimation(multiple_use_scene, online_level_scene).then(() => {

                    Lobby.style.background = ``;
                    theme.start();
                });

            } else {
                DarkLayerAnimation(CreateLevelScene, online_level_scene).then(() => {
                    sceneMode.full();
                    Lobby.style.background = ``;
                    theme.start();
                });
            };
        });

        level_scene_start_btn.removeEventListener("click", level_scene_start_btn.ev);

        level_scene_start_btn.addEventListener("click", level_scene_start_btn.ev = () => {
            DisplayPopUp_PopAnimation(ChooseBetweenModesPopUp, "flex", true);
        });

        level_scene_comments_btn.removeEventListener("click", level_scene_comments_btn.ev);

        level_scene_comments_btn.addEventListener("click", level_scene_comments_btn.ev = () => {
            this.comments_handler.open();
        });

        comments_close_btn.addEventListener("click", () => {
            this.comments_handler.close();
        });

        level_scene_likes_btn.removeEventListener("click", level_scene_likes_btn.ev);

        online_level_scene_author.removeEventListener("click", online_level_scene_author.ev);
        online_level_scene_author.addEventListener("click", online_level_scene_author.ev = () => {

            if (this.author["player_id"] == Number(localStorage.getItem("PlayerID"))) {
                OpenOwnUserProfile();

            } else {
                ClickedOnPlayerInfo(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.author);
            };
        });
    };

    init_DOM() {
        this.init_level_BG();

        online_level_scene_title.textContent = this.level["level_name"];
        online_level_scene_author.textContent = `by ${this.author["player_name"]}`;
    };

    init_level_BG() {
        let bg1 = player_levels_handler.Settings.bgcolor1[this.level["bg1"]];
        let bg2 = player_levels_handler.Settings.bgcolor2[this.level["bg2"]];

        document.documentElement.style.setProperty("--gradient-first-color", bg1);
        document.documentElement.style.setProperty("--gradient-second-color", bg2);
        Lobby.style.background = `linear-gradient(45deg, ${bg1}, ${bg2})`;
    };

    init_grid() {
        let xy = player_levels_handler.Settings.cellgrid[this.level["field"]];

        if (this.level["costum_field"] != "{}") {
            xy = JSON.parse(this.level["costum_field"]);
        };

        player_levels_handler.GenerateField(xy, xy, level_scene_grid);
    };

    async init_personal_data_for_level() {
        try {
            await socket.emit("check_personal_data_for_level_x", Number(localStorage.getItem("PlayerID")), this.level["id"], (cb, level_data) => {
                console.log(cb);
                this.fetch_reaction();

                level_likes_text.textContent = !level_data["likes"] ? "0" : level_data["likes"];

                if (!cb["points_made"]) {
                    this.placeholder_data_text();
                    return;
                };

                let points_made = cb["points_made"];
                let points_required = this.level["required_points"];

                this.personal_data_for_level = cb;
                this.progress_bar(points_made, points_required);
                level_scene_best_time.textContent = `best time: ${cb["best_time"]} seconds`;
            });

        } catch (error) {
            this.abort(error);
        };
    };

    progress_bar(points_made, points_required) {
        let progress = (points_made / points_required) * 100;

        level_scene_progress_text.textContent = `${points_made} / ${points_required} Points`;
        level_scene_progress_bar.style.background = `linear-gradient(90deg, white ${progress}%, transparent 0%)`;
    };

    placeholder_data_text() {
        level_scene_progress_text.textContent = `0 / ${this.level["required_points"]} Points`;
        level_scene_progress_bar.style.background = `linear-gradient(90deg, white 0%, transparent 0%)`;
        level_scene_best_time.textContent = `best time: 0 seconds`;
    };

    async fetch_reaction() {
        try {
            await socket.emit("fetch_users_level_reaction", this.level["id"], Number(localStorage.getItem("PlayerID")), cb => {

                if (cb.reaction == 1) {
                    level_scene_likes_btn.classList.add("active_like_btn");
                    level_scene_likes_btn.setAttribute("like_level_btn_is_active", "true");

                } else {
                    level_scene_likes_btn.classList.remove("active_like_btn");
                    level_scene_likes_btn.setAttribute("like_level_btn_is_active", null);

                    level_scene_likes_btn.addEventListener("click", level_scene_likes_btn.ev = () => {
                        this.like_level();
                    });
                };
            });

        } catch (error) {
            console.log(error);
        };
    };

    like_level() {
        try {
            socket.emit("like_level", this.level["id"], Number(localStorage.getItem("PlayerID")), cb => {
                level_scene_likes_btn.setAttribute("like_level_btn_is_active", "true");
                level_scene_likes_btn.classList.add("active_like_btn");
                level_likes_text.textContent = cb;
            });

        } catch (error) {
            console.log(error);
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

class levelPatternsOverviewHandler {
    constructor(parent) {
        this.parent = parent;
        this.level_all_pattern_names = [];
    };

    init() {
        this.events();
        this.all_patterns();
    };

    all_patterns() {
        this.parent.level.pattern && (this.level_all_pattern_names = JSON.parse(this.parent.level.pattern));

        if (this.parent.level.costum_patterns != "{}") {
            let costum_ps = Object.keys(JSON.parse(this.parent.level.costum_patterns));

            console.log(costum_ps);

            this.level_all_pattern_names.push(...costum_ps);
        };

        console.log(this.level_all_pattern_names);
    };

    events() {
        level_scene_patterns_btn.removeEventListener("click", level_scene_patterns_btn.ev);
        level_scene_patterns_btn.addEventListener("click", level_scene_patterns_btn.ev = () => {
            levels_patterns_pop_up.style.borderColor = "var(--gradient-first-color)";
            level_patterns_pop_up_header.style.borderColor = "var(--gradient-first-color)";
            this.open_patterns();
        });

        level_scene_common_pattern_btn.removeEventListener("click", level_scene_common_pattern_btn.ev);
        level_scene_common_pattern_btn.addEventListener("click", level_scene_common_pattern_btn.ev = () => {
            this.open_avg();
        });

        level_avg_close_btn.removeEventListener("click", level_avg_close_btn.ev);
        level_avg_close_btn.addEventListener("click", level_avg_close_btn.ev = () => {
            level_avg_pattern_pop_up.style.display = "none";
            DarkLayer.style.display = "none";
        });
    };

    open_patterns() {
        DisplayPopUp_PopAnimation(levels_patterns_pop_up, "flex", true);
        this.generate_patterns();
    };

    open_avg() {
        DisplayPopUp_PopAnimation(level_avg_pattern_pop_up, "flex", true);
        this.generate_avg_pattern();
    };

    generate_patterns() {
        level_patterns_inner_wrapper.textContent = null;
        let patterns = JSON.parse(this.parent.level["costum_patterns"]);
        let costum_patterns_n = 0;

        // costum patterns
        for (const [pattern, index] of Object.entries(patterns)) {
            let structure = index[pattern]["structure"];
            costum_patterns_n++;

            createPattern_preview(pattern, structure, level_patterns_inner_wrapper, "level");
        };

        // official patterns
        let off_pattern_names = JSON.parse(this.parent.level["pattern"]);
        let off_patterns = off_pattern_names.map(p => GamePatternsList[p]);

        for (const [index, structure] of off_patterns.entries()) {
            let pattern = off_pattern_names[index];

            createPattern_preview(pattern, structure, level_patterns_inner_wrapper, "level");
        };

        level_patterns_header_title.textContent =
            `Patterns in this level (${off_patterns.length + costum_patterns_n})`;
    };

    generate_avg_pattern() {
        level_avg_inner_wrapper.textContent = null;

        try {
            socket.emit("get_avg_pattern_of_level", this.parent.level["id"], cb => {
                console.log(cb);

                if (!cb) {
                    level_avg_inner_wrapper.textContent = "no current data available";
                    return;
                };

                let name = cb;
                let structure = GamePatternsList[cb];

                if (this.level_all_pattern_names.includes(cb)) {
                    createPattern_preview(name, structure, level_avg_inner_wrapper, "level");
                };
            });

        } catch (error) {
            console.log(error);
            level_avg_inner_wrapper.textContent = "couldn't load data";
        };
    };
};

class OnlineLevelPlayerScoreBoardHandler {
    constructor(parent) {
        this.parent = parent;
        this.required_points = parent.level["required_points"];
    };

    events() {
        level_scene_player_conquered_btn.removeEventListener("click", level_scene_player_conquered_btn.ev);
        level_scene_player_conquered_btn.addEventListener("click", level_scene_player_conquered_btn.ev = () => {
            this.open();
        });

        scoreboard_close_btn.removeEventListener("click", scoreboard_close_btn.ev);
        scoreboard_close_btn.addEventListener("click", scoreboard_close_btn.ev = () => {
            this.close();
        });
    };

    close() {
        scoreboard_pop_up.style.display = "none";
        DarkLayer.style.display = "none";
    };

    open() {
        DisplayPopUp_PopAnimation(scoreboard_pop_up, "flex", true);
        this.fetch();
    };

    fetch() {
        try {
            socket.emit("get_best_players_of_level", this.parent.level["id"], (level_player_data, player_data) => {
                if (level_player_data == null) {
                    this.abort();
                    return;
                };

                this.display(level_player_data, player_data);
            });

        } catch (error) {
            console.log(error);
            this.abort();
        };
    };

    display(level_player_data, player_data) {
        scoreboard_list.textContent = null;

        for (const [i, val] of level_player_data.entries()) {
            this.element(val, player_data[i]);
        };
    };

    element(level_player_data, player_data) {
        console.log(level_player_data, player_data);

        let div = document.createElement("div");
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");
        let span3 = document.createElement("span");
        let level_data1 = document.createElement("div");
        let level_data2 = document.createElement("div");

        div.addEventListener('click', () => {
            if (player_data["player_id"] == Number(localStorage.getItem("PlayerID"))) {
                OpenOwnUserProfile();

            } else {
                ClickedOnPlayerInfo(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, player_data);
            };
        });

        if (player_data["playerInfoClass"] == "empty") { // user has standard skin
            span2.classList = "userInfo-Icon userInfoEditable";
            span2.textContent = player_data["player_icon"];
            span2.style.color = player_data["playerInfoColor"];

        } else { // user has advanced skin
            span2.classList = "userInfo-Icon userInfoEditable " + player_data["playerInfoClass"];
            span2.textContent = null;
            span2.style.color = "var(--font-color)";
        };

        // wrapper
        div.classList.add("scoreboard_player");

        // display name
        span1.classList.add("scoreboard_player_name");
        span1.textContent = player_data["player_name"];

        // display icon
        span2.classList.add("scoreboard_player_icon");

        // level data wrapper
        span3.classList.add("scoreboard_player_data_wrapper");

        level_data1.textContent = `points: ${level_player_data.points_made} / ${this.required_points} `;
        level_data2.textContent = `best time: ${level_player_data.best_time} s.`;

        // add to document
        span3.appendChild(level_data1);
        span3.appendChild(level_data2);
        div.appendChild(span2);
        div.appendChild(span1);
        div.appendChild(span3);
        scoreboard_list.appendChild(div);
    };

    abort() {
        scoreboard_list.textContent = "no data could be shown";
    };
};

chooseModeCloseBtn.addEventListener("click", () => {
    ChooseBetweenModesPopUp.style.display = "none";
    DarkLayer.style.display = "none";
});

OnlineModeBtn.addEventListener("click", () => {
    !NewCreativeLevel ? player_levels_handler.startGame(1) : NewCreativeLevel.startGame(1);
});

OfflineModeBtn.addEventListener("click", () => {
    !NewCreativeLevel ? player_levels_handler.startGame(0) : NewCreativeLevel.startGame(0);
});

level_patterns_close_btn.removeEventListener("click", level_patterns_close_btn.ev);
level_patterns_close_btn.addEventListener("click", level_patterns_close_btn.ev = () => {
    levels_patterns_pop_up.style.display = "none";

    if (inAdvantureMode) {
        DisplayPopUp_PopAnimation(mapLevelOverview, "flex", true);

    } else {
        DarkLayer.style.display = "none";
    };
});