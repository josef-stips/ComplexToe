class social_scene_class {
    constructor() {
        this.clan_handler = new clan_handler();
    };

    init() {
        this.display("flex");
    };

    display(type) {
        DarkLayerAnimation(online_stuff_scene, gameModeCards_Div);
    };

    events() {
        online_stuff_close_btn.addEventListener("click", () => {
            DarkLayerAnimation(gameModeCards_Div, online_stuff_scene);

            inPlayerLevelsScene = false;
        });

        social_stuff_cards[0].addEventListener("click", () => {
            if (localStorage.getItem("UserName")) {
                curr_mode = GameMode[4].opponent;
                inPlayerLevelsScene = false;

                sceneMode.full();

                // pause music in create level mode
                PauseMusic();

                // User entered create level modeD
                let NewField = new NewLevel();
                NewCreativeLevel = NewField;
                NewCreativeLevel.Init();

                InitCreateLevelScene();

                CreateLevelScene_CheckIn();
                online_stuff_scene.style.display = "none";

                creative_level_instance = NewCreativeLevel;
            };
        });

        social_stuff_cards[1].addEventListener("click", () => {
            use_scene.open("social_scene", "Recent Players", online_stuff_scene);
            recent_players_handler.open();
        });

        social_stuff_cards[2].addEventListener("click", () => {
            use_scene.open("social_scene", "Best Players", online_stuff_scene);
            best_players_handler.open();
        });

        social_stuff_cards[3].addEventListener("click", () => {
            use_scene.open("social_scene", "Player Levels", online_stuff_scene);
            player_levels_handler.OpenSearch();

            inPlayerLevelsScene = true;
        });

        social_stuff_cards[4].addEventListener("click", () => {
            tournament_handler.tournament_btn_click_ev();
        });

        social_stuff_cards[5].addEventListener("click", () => {
            this.clan_handler.popular_view();
            DarkLayerAnimation(clan_search_pop_up, online_stuff_scene);
        });

        clan_search_closeBtn.addEventListener("click", () => {
            DarkLayerAnimation(online_stuff_scene, clan_search_pop_up);
        });

        clan_search_input.addEventListener("keyup", (e) => {
            e.preventDefault();

            if (e.key === "Enter") {
                this.search_clans();
            };
        });

        clan_search_btn.addEventListener("click", () => {
            this.search_clans();
        });

        clan_pop_up_close_btn.addEventListener("click", () => {
            clan_overview_pop_up.style.display = "none";
            clan_overview_pop_up.style.zIndex = "10005";

            // console.log(this.clan_handler.clan_pop_up_opened_in_pop_up);

            if (this.clan_handler.clan_pop_up_opened_in_pop_up &&
                getComputedStyle(userInfoPopUp).display != "none" ||
                getComputedStyle(FriendsListPopUp).display != "none" ||
                getComputedStyle(scoreboard_pop_up).display != "none"
            ) {
                DarkLayer.style.display = "flex";

            } else {
                DarkLayer.style.display = "none";
            };

            this.clan_handler.clan_pop_up_opened_in_pop_up = false;
        });

        leave_clan_btn.addEventListener("click", async() => { // user is in this clan
            let t_cache = await isInTournaments();

            if (newClan.current_clan_data["is_in_clan"] &&
                newClan.current_clan_data["clan_id"] == newClan.current_selected_clan_id && !t_cache.clientIsIn) {

                try {
                    socket.emit("leave_clan", localStorage.getItem("PlayerID"), newClan.current_clan_data["role"],
                        JSON.stringify(newClan.init_clan_member_storage_data),
                        newClan.current_selected_clan_id, cb => {

                            if (cb) {

                                OpenedPopUp_WhereAlertPopUpNeeded = false;
                                AlertText.textContent = "You successfully left the clan.";
                                clan_overview_pop_up.style.display = "none";
                                userInfoPopUp.style.display = "none";

                                clan_chat.message_cache = [];

                                if (getComputedStyle(clan_chat_pop_up).display == "flex") {
                                    DarkLayerAnimation(gameModeCards_Div, clan_chat_pop_up).then(() => {

                                        setTimeout(() => {
                                            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                                        }, 400);
                                    });
                                    sceneMode.default();

                                } else {
                                    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                                };

                                // update data in local storage
                                newClan.update_data(cb, false, true);
                            };
                        });

                } catch (error) {
                    AlertText.textContent = "Something went wrong...";
                    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                };

            } else {
                if (Object.keys(t_cache).length > 0 && t_cache.clientIsIn) {
                    OpenedPopUp_WhereAlertPopUpNeeded = true;
                    AlertText.textContent = "You cannot leave your clan as a tournament participant.";
                    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                };
            };
        });

        join_clan_btn.addEventListener("click", async() => {
            let t_cache = await isInTournaments();

            if (!newClan.current_clan_data["is_in_clan"] &&
                newClan.current_clan_data["clan_id"] != newClan.current_selected_clan_id && !t_cache.clientIsIn) {

                try {
                    socket.emit("join_clan", Number(localStorage.getItem("PlayerID")),
                        newClan.current_selected_clan_id, async(can_join, clan_data, player_data) => {

                            if (can_join == true) {
                                clan_chat.message_cache = [];

                                // update data in local storage
                                await newClan.update_data(clan_data);

                                OpenedPopUp_WhereAlertPopUpNeeded = false;
                                AlertText.textContent = "You successfully joined the clan!";
                                clan_overview_pop_up.style.display = "none";
                                userInfoPopUp.style.display = "none";

                                close_all_scenes();
                                sceneMode.full();
                                clan_chat.open();
                                DarkLayerAnimation(clan_chat_pop_up, clan_search_pop_up).then(() => {

                                    setTimeout(() => {
                                        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                                    }, 1200);
                                });

                                OnceAClanMember(true);
                                Achievement.new(25)

                            } else if (can_join == "request_sended") {

                                OpenedPopUp_WhereAlertPopUpNeeded = true;
                                AlertText.textContent = "You already sended a request to this clan. Wait for an answer.";
                                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);

                            } else if (can_join == "full") {

                                OpenedPopUp_WhereAlertPopUpNeeded = true;
                                AlertText.textContent = "Unfortunately, the clan is full. It has 50/50 members.";
                                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);

                            } else { // player has to request getting a member of the clan because he was already a member but got kicked or left

                                clan_overview_pop_up.style.display = "none";
                                clan_action_reason_handler.open(player_data, "join_request", clan_data);
                            };
                        });

                } catch (error) {
                    AlertText.textContent = "Something went wrong...";
                    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                };

            } else {
                AlertText.textContent = "You can't join the clan.";
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                OpenedPopUp_WhereAlertPopUpNeeded = true;
            };
        });
    };

    search_clans() {
        let text = clan_search_input.value;

        if (text.length > 0) {

            this.clan_handler.search(text);
            this.clan_handler.title(`results for "${text}"`);
            // clan_search_input.value = null;

        } else {
            this.clan_handler.popular_view();
        };
    };
};

class player_levels_handler_wrapper extends NewLevel {
    constructor() {
        super();

        this.online_level_overview_handler = null;
    };

    init() {
        this.events();
    };

    events() {
        player_level_search_btn.addEventListener("click", () => {
            if (SearchLevelInput.value.length > 0) {
                this.RequestLevelSearchResults(SearchLevelInput.value);
            };
        });
    };

    RequestLevelSearchResults(text) {
        try {
            socket.emit("RequestOnlineLevels", text, levels => {
                this.DisplayLevelSearchResults(levels);
            });

        } catch (error) {
            AlertText.textContent = "Something went wrong!";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        };
    };

    DisplayLevelSearchResults = (levels) => {
        player_levels_results_list.textContent = null;

        // no level found
        if (levels.length <= 0) {
            let p = document.createElement("p");
            p.textContent = "No level found";
            p.style.margin = "50px 0 0 0";
            p.style.fontSize = "5vh";
            p.style.fontWeight = "600";

            player_levels_results_list.appendChild(p);

        } else { // levels exist
            levels.forEach(level => {
                this.AddLevelToList(level);
            });
        };
    };

    AddLevelToList = (level, correspondPlayer) => {
        let li = document.createElement("li");
        li.classList = "player_level_result_item";

        let level_theme = (level.bg1 == "0") ? "white" : this.PossibleColors[parseInt(level.bg1)];
        let secondary_color = (level.bg2 == "0") ? "white" : this.PossibleColors[parseInt(level.bg2)];

        let span = document.createElement("span");
        span.textContent = level.level_name;
        span.style.color = level_theme;

        if (level.level_name.length >= 18) {
            span.style.fontSize = "4vh";
        } else {
            span.style.fontSize = "6vh";
        };

        let span1 = document.createElement("span");
        span1.classList = "LevelIconWrapper"
        span1.style.border = `0.7vh solid ${level_theme}`;
        li.style.background = `${addAlphaToColor(secondary_color == "white" ? "#777777" : secondary_color, 0.15)}`;

        let div1 = document.createElement("div");
        let div2 = document.createElement("div");

        let InnerP = document.createElement("p");
        InnerP.textContent = `Level ID: 0${level.id}`;

        div1.classList = "LevelListItem_InnerWrapper1";
        div2.classList = "LevelListItem_InnerWrapper2";
        div2.style.marginBottom = '1vh';

        // Display from which player the level is. User can also click on the name of player to look at this profile
        if (correspondPlayer) {
            let InnerSpan = document.createElement("span");
            let PlayerNameP = document.createElement("p");
            InnerSpan.textContent = `from `;
            PlayerNameP.textContent = `${correspondPlayer.player_name}`;
            PlayerNameP.classList = "Level_PlayerName";

            let player = correspondPlayer;
            let player_id = player.player_id;

            // click event
            PlayerNameP.addEventListener("click", (e) => {
                e.stopPropagation();

                DarkLayer.style.display = "block";
                if (player_id != localStorage.getItem("PlayerID")) { // User clicks on other players profile
                    ClickedOnPlayerInfo(player);

                } else { // User clicks on his own profile
                    OpenOwnUserProfile();
                };
            });

            div2.appendChild(InnerSpan);
            div2.appendChild(PlayerNameP);
        };

        div2.appendChild(InnerP);

        let img = document.createElement("img");
        img.src = this.Settings.levelicon[parseInt(level.icon)];
        img.width = "32";
        img.height = "32";

        li.addEventListener("click", () => {
            DarkLayerAnimation(online_level_scene, multiple_use_scene).then(() => {
                // console.log(level, level.CreatorBeatIt, level.costum_patterns);

                this.selectedLevel = [parseInt(level.bg1), parseInt(level.bg2), level.required_points, level.player_timer, parseInt(level.icon), parseInt(level.bg_music), JSON.parse(level.pattern), level.field, level.level_name, level.level_status,
                    true, level.id, level.publish_date, level.CreatorBeatIt, level.creation_date, JSON.parse(level.costum_patterns), JSON.parse(level.costum_field)
                ];

                this.online_level_overview_handler = new onlineLevelOverviewHandler(level, correspondPlayer);
                this.online_level_overview_handler.init();
            });
        });

        span1.appendChild(img);
        div1.appendChild(span);
        div1.appendChild(span1)
        li.appendChild(div1);
        li.appendChild(div2);
        player_levels_results_list.appendChild(li);
    };

    OpenSearch = () => {
        SearchLevelInput.focus();

        player_levels_results_list.textContent = null;
        this.selectedLevel = undefined;

        try {
            socket.emit("DisplayAllOnlineLevel", ((levels, players) => {

                if (levels.length >= 1) {

                    levels.forEach((level, index) => {
                        this.AddLevelToList(level, players[index][0]);
                    });
                };
            }));

        } catch (error) {
            console.log(error);
        };
    };
};

class recentPlayersHandler {
    constructor() {

    };

    events() {

    };

    async open() {
        await this.fetch();
    };

    async fetch() {
        try {
            recent_players_list.textContent = null;
            recent_players_list.append(fetch_spinner);
            fetch_spinner.setAttribute('in_use', 'true');

            await socket.emit("get_recent_players", cb => {
                setTimeout(() => {
                    fetch_spinner.setAttribute('in_use', 'false');
                    recent_players_list.textContent = null;
                    this.load(cb);
                }, 500);
            });

        } catch (error) {
            this.abort(new Error("no players found."));
        };
    };

    load(results) {
        recent_players_list.textContent = null;

        results.forEach(data => {
            this.player(data);
        });
    };

    player(player_data, list = recent_players_list) {
        let div = document.createElement("div");
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");
        let span3 = document.createElement("span");
        let first_wrapper = document.createElement("div");
        let isInClanEl = document.createElement("p");
        let lastTimeOnlineEl = document.createElement("p");

        first_wrapper.classList.add("player_list_item_first_wrapper");
        span3.classList.add("player_list_item_additional_text_wrapper");

        let self = player_data["player_id"] == Number(localStorage.getItem("PlayerID"));

        div.addEventListener('click', () => {
            if (self) {
                OpenOwnUserProfile();

            } else {
                ClickedOnPlayerInfo(player_data);
            };
        });

        if (!player_data["player_icon"] && !player_data["playerInfoClass"]) {
            player_data["player_icon"] = "X";
            player_data["playerInfoClass"] = "empty";
        };

        if (player_data["playerInfoClass"] == "empty") { // user has standard skin
            span2.classList = "userInfo-Icon userInfoEditable";
            span2.textContent = player_data["player_icon"];
            span2.style.color = player_data["playerInfoColor"];

        } else { // user has advanced skin
            span2.classList = "userInfo-Icon userInfoEditable " + player_data["playerInfoClass"];
            span2.textContent = null;
            span2.style.color = "var(--font-color)";
        };

        let date = formatDate(player_data["last_connection"]).split(",");

        lastTimeOnlineEl.textContent = `last time online: ${date[0] + date[1]}`;
        isInClanEl.textContent = !player_data["clan_data"]?.is_in_clan ? "loner" : "clan member";

        // wrapper
        div.classList.add("recent_player_item");

        // display name
        span1.classList.add("scoreboard_player_name");
        span1.textContent = !player_data["player_name"] ? "no name" : player_data["player_name"];

        if (self) {
            span1.textContent = "You";
        };

        // display icon
        span2.classList.add("scoreboard_player_icon");

        // add to document
        first_wrapper.appendChild(span2);
        first_wrapper.appendChild(span1);
        div.appendChild(first_wrapper);
        div.appendChild(span3);
        span3.appendChild(isInClanEl);
        span3.appendChild(lastTimeOnlineEl);
        list.appendChild(div);
    };

    abort(message) {
        recent_players_list.textContent = message;
    };
};

class bestPlayersHandler {
    constructor() {
        this.players_type = 'global';
        this.filter = null;
    };

    events() {
        best_player_tabs.forEach(el => {

            el.addEventListener('click', () => {
                best_player_tabs.forEach(ele => ele.setAttribute("active_tap", "false"));
                el.setAttribute("active_tap", "true");

                this.players_type = el.getAttribute('players_type');
                this.fetch();
            });
        });

        best_player_filter.forEach(el => {

            el.addEventListener('click', () => {
                let change_to_active = true;

                if (el.getAttribute('active_filter') == 'true') {
                    change_to_active = false;
                    this.filter = null;

                } else {
                    this.filter = el.getAttribute('list_filter_type');
                };

                best_player_filter.forEach(ele => ele.setAttribute("active_filter", "false"));
                el.setAttribute('active_filter', change_to_active);

                this.fetch();
            });
        });
    };

    open() {
        this.fetch();
    };

    fetch() {
        try {
            best_players_list.textContent = null;
            best_players_list.append(fetch_spinner);
            fetch_spinner.setAttribute('in_use', 'true');

            socket.emit(`top_100_players_${this.players_type}`, Number(localStorage.getItem("PlayerID")), this.filter, (cb) => {
                setTimeout(() => {
                    fetch_spinner.setAttribute('in_use', 'false');
                    best_players_list.textContent = null;
                    this.load(cb);
                }, 500);
            });

        } catch (error) {
            this.abort(new Error("No players found."));
        };
    };

    load(player_data) {
        player_data.forEach(data => {
            // console.log(data, best_players_list);
            try {
                recent_players_handler.player(data, best_players_list);
            } catch (error) {
                console.log(error);
            };
        });
    };

    abort(message) {
        best_players_list.textContent = message;
    };
};

let social_scene = new social_scene_class();
social_scene.events();

player_levels_handler = new player_levels_handler_wrapper();
creative_level_instance = player_levels_handler
player_levels_handler.init();

let recent_players_handler = new recentPlayersHandler();
recent_players_handler.events();

let best_players_handler = new bestPlayersHandler();
best_players_handler.events();