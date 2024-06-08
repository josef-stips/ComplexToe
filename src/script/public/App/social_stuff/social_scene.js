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
        });

        social_stuff_cards[2].addEventListener("click", () => {
            use_scene.open("social_scene", "Best Players", online_stuff_scene);
        });

        social_stuff_cards[3].addEventListener("click", () => {
            use_scene.open("social_scene", "Player Levels", online_stuff_scene);
            player_levels_handler.OpenSearch();

            inPlayerLevelsScene = true;
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
            DarkLayer.style.display = "none";
        });

        leave_clan_btn.addEventListener("click", () => { // user is in this clan
            if (newClan.current_clan_data["is_in_clan"] &&
                newClan.current_clan_data["clan_id"] == newClan.current_selected_clan_id) {

                try {
                    DarkLayer.style.display = "block";
                    socket.emit("leave_clan", localStorage.getItem("PlayerID"), cb => {

                        if (cb) {

                            AlertText.textContent = "You successfully left the clan.";
                            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                            clan_overview_pop_up.style.display = "none";
                        };
                    });

                } catch (error) {
                    AlertText.textContent = "Something went wrong...";
                    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                };
            };
        });

        join_clan_btn.addEventListener("click", () => {
            if (!newClan.current_clan_data["is_in_clan"] &&
                newClan.current_clan_data["clan_id"] != newClan.current_selected_clan_id) {

                try {
                    socket.emit("join_clan", localStorage.getItem("PlayerID"), cb => {

                        if (cb) {

                            AlertText.textContent = "You successfully joined the clan!";
                            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                            clan_overview_pop_up.style.display = "none";
                        };
                    });

                } catch (error) {
                    AlertText.textContent = "Something went wrong...";
                    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                };

            } else {
                AlertText.textContent = "You can't join the clan.";
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
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

class clan_handler {
    constructor() {
        this.views = {
            0: "popular",
            1: "search"
        };

        this.view = this.views[0];

        this.clan_roles = {
            0: "admin",
            1: "dikaios",
            2: "sophron",
            3: "member"
        };

        this.clan_role_responsibilities = {
            "leader": 0b1111,
            "dikaios": 0b0111,
            "sophron": 0b0011,
            "member": 0b0000
        };
    };

    search(query) {
        try {
            socket.emit("clan_search", query, results => {
                console.log(results);

                if (results.length <= 0) {
                    clan_search_list.textContent = "Nothing found!"
                    return;
                };

                clan_search_list.textContent = null;

                results.map(data => {
                    this.item(data);
                });
            });

        } catch (error) {
            clan_search_list.textContent = "Something went wrong!";
        };
    };

    async item(data) {
        let list_item = document.createElement("li");
        let item_text = document.createElement("h2");
        let item_img = document.createElement("img");

        let colors = this.create_clan_css_propertys(data);

        list_item.classList.add("default_sb_item");
        list_item.setAttribute("result_clan_id", data["id"]);
        item_text.style.webkitBackgroundClip = "text";
        item_text.style.backgroundClip = "text";

        item_text.style.setProperty(`--first-color`, `var(--gradient-first-color-${data["id"]})`);
        item_text.style.setProperty(`--second-color`, `var(--gradient-second-color-${data["id"]})`);

        list_item.addEventListener("mouseover", () => {
            item_text.style.setProperty(`--first-color`, `var(--gradient-second-color-${data["id"]})`);
            item_text.style.setProperty(`--second-color`, `var(--gradient-first-color-${data["id"]})`);
        });

        list_item.addEventListener("mouseout", () => {
            item_text.style.setProperty(`--first-color`, `var(--gradient-first-color-${data["id"]})`);
            item_text.style.setProperty(`--second-color`, `var(--gradient-second-color-${data["id"]})`);
        });

        item_img.style.setProperty('--clan-border-color', `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`);

        item_img.src = `assets/game/${data["logo"]}`;
        item_text.textContent = data["name"];

        list_item.appendChild(item_img);
        list_item.appendChild(item_text);
        clan_search_list.appendChild(list_item);

        list_item.addEventListener("click", () => {
            this.item_click(data);
        });
    };

    item_click(data) {
        try {
            console.log(data);

            // click event on admin name
            this.admin_name_click(data);

            // generate member list items
            for (const [id, member_data] of Object.entries(data["members"])) {
                this.member_item(id, member_data);
            };

            DisplayPopUp_PopAnimation(clan_overview_pop_up, "flex", true);

            let colors = this.create_clan_css_propertys(data);

            clan_name_el.style.setProperty("--gradient-first-color", `var(--gradient-first-color-${data["id"]})`);
            clan_name_el.style.setProperty("--gradient-second-color", `var(--gradient-second-color-${data["id"]})`);

            clan_name_el.textContent = data["name"];
            clan_logo_el.src = `assets/game/${data["logo"]}`;
            clan_description_el.textContent = data["description"];
            clan_level_el.textContent = data["level"];
            clan_members_title.textContent = `Members (${Object.keys(data["members"]).length})`;
            clan_id_el.textContent = data["id"];
            newClan.current_selected_clan_id = data["id"];

            this.display_action_btn(data["id"]);

        } catch (error) {
            console.log(error);
        };
    };

    member_item(member_id, member_data) {
        clan_member_list.textContent = null;

        try {
            socket.emit("GetDataByID", member_id, data => {

                let list_item = document.createElement("li");
                let item_text = document.createElement("h2");
                let item_img = document.createElement("p");
                let item_text_wrapper = document.createElement("div");
                let item_role = document.createElement("i");
                let kick_btn = document.createElement("p");
                let promote_btn = document.createElement("p");
                let wrapper2 = document.createElement("div");

                let member_icon = this.member_role_icon(member_data["role"]);
                member_icon.classList.add("clan_member_accessory");

                list_item.classList.add("default_sb_item");
                list_item.style.padding = "0";
                item_text.textContent = data["player_name"];
                item_text.style.background = "unset";
                item_text.style.webkitTextFillColor = "unset";
                item_text.style.fontSize = "5vh";
                item_img.style.fontSize = "4.5vh";
                item_role.classList.add("member_role_text");
                item_role.textContent = member_data["role"];
                item_text_wrapper.classList.add("member_text_wrapper");
                kick_btn.classList.add("member_kick_btn");
                kick_btn.textContent = "kick";
                promote_btn.textContent = "promote";
                promote_btn.classList.add("member_promote_btn");
                promote_btn.classList.add("default_btn");
                kick_btn.classList.add("default_btn");
                wrapper2.classList.add("member_item_wrapper2");

                DisplayPlayerIcon_at_el(item_img, data["playerInfoClass"], data["playerInfoColor"], data["player_icon"]);
                this.role_btns_events(kick_btn, promote_btn);

                wrapper2.appendChild(kick_btn);
                wrapper2.appendChild(promote_btn);
                item_text_wrapper.appendChild(item_text);
                item_text_wrapper.appendChild(item_role);
                list_item.appendChild(member_icon);
                list_item.appendChild(item_img);
                list_item.appendChild(item_text_wrapper);
                list_item.appendChild(wrapper2);
                clan_member_list.appendChild(list_item);

                list_item.removeEventListener("click", list_item.event);
                list_item.addEventListener("click", list_item.event = () => {
                    this.member_click(data);
                });
            });

        } catch (error) {
            this.error_opening_clan(error);
        };
    };

    member_click(data) {
        if (Number(localStorage.getItem("PlayerID")) == data["player_id"]) {
            OpenOwnUserProfile();

        } else {
            ClickedOnPlayerInfo(
                data["player_name"],
                data["player_id"],
                data["player_icon"],
                data["playerInfoClass"],
                data["playerInfoColor"],
                data["quote"],
                data["onlineGamesWon"],
                data["XP"],
                data["currentUsedSkin"],
                data["last_connection"],
                data["commonPattern"]
            );
        };
    };

    member_role_icon(role) {
        let icon = document.createElement("i");

        switch (role) {
            case this.clan_roles[0]: // leader

                icon.className = "fa-solid fa-crown";
                return icon;

            case this.clan_roles[1]: // dikaios

                return icon;

            case this.clan_roles[2]: // sophron

                return icon;

            case this.clan_roles[3]: // member

                return icon;
        };
    };

    admin_name_click(data) {
        socket.emit("GetDataByID", data["admin"]["id"], cb => {

            // set clan leader name
            clan_admin_name.style.setProperty("--first-color", `var(--gradient-first-color-${data["id"]})`);
            clan_admin_name.style.setProperty("--second-color", `var(--gradient-second-color-${data["id"]})`);

            clan_admin_name.setAttribute("clan_admin_id", data["admin"]["id"]);
            clan_admin_name.textContent = cb["player_name"];

            clan_admin_name.removeEventListener("click", clan_admin_name.event);

            console.log(cb);
            clan_admin_name.addEventListener("click", clan_admin_name.event = () => {
                if (Number(localStorage.getItem("PlayerID")) == cb["player_id"]) {
                    OpenOwnUserProfile();

                } else {
                    ClickedOnPlayerInfo(
                        cb["player_name"],
                        cb["player_id"],
                        cb["player_icon"],
                        cb["playerInfoClass"],
                        cb["playerInfoColor"],
                        cb["quote"],
                        cb["onlineGamesWon"],
                        cb["XP"],
                        cb["currentUsedSkin"],
                        cb["last_connection"],
                        cb["commonPattern"]
                    );
                };
            });
        });
    };

    display_action_btn(clan_id) {
        if (clan_id == newClan.current_clan_data["clan_id"]) {

            leave_clan_btn.style.display = "contents";
            join_clan_btn.style.display = "none";

        } else {
            leave_clan_btn.style.display = "none";
            join_clan_btn.style.display = "contents";
        };
    };

    role_btns_events(kick_btn, promote_btn) {

    };

    title = (text) => clan_search_title.textContent = text;

    placeholder_text() {
        this.title(null);
        clan_search_list.textContent = "Find good clans to fight together!";
    };

    popular_view() {
        try {
            this.title("popular clans");
            clan_search_input.value = null;

            socket.emit("popular_clans", results => {
                console.log(results);

                if (!results) {
                    this.placeholder_text();
                    return;
                };

                clan_search_list.textContent = null;

                results.map(result => {
                    this.item(result);
                });
            });

        } catch (error) {
            this.placeholder_text();
        };
    };

    error_opening_clan(err) {
        console.log(err);

        clan_overview_pop_up.style.display = "none";
        AlertText.textContent = "Something went wrong!";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    };

    create_clan_handler() {

    };

    create_clan_css_propertys(data) {
        let colors = [];

        colors[0] = newClan.level_color[data["level"]][0];
        colors[1] = newClan.level_color[data["level"]][1];

        document.documentElement.style.setProperty(`--gradient-first-color-${data["id"]}`, colors[0]);
        document.documentElement.style.setProperty(`--gradient-second-color-${data["id"]}`, colors[1]);

        return colors;
    };
};

class create_clan_handler {
    constructor() {
        this.current_logo_index = 0;

        this.clan_logos = {
            0: "caesar.svg",
            1: "book-cover.svg",
            2: "crenulated-shield.svg",
            3: "wolf-head.svg",
            4: "pirate-flag.svg",
            5: "burning-skull.svg",
            6: "fire-axe.svg",
            7: "crossed-axes.svg",
            8: "horned-helm.svg",
            9: "dwarf-helmet.svg",
            10: "bandit.svg",
            11: "frog-prince.svg",
            12: "battle-gear.svg",
            13: "crowned-skull.svg",
            14: "visored-helm.svg",
            15: "mustache.svg",
            16: "overlord-helm.svg",
            17: "duck.svg",
            18: "horse-head.svg",
            19: "rooster.svg",
            20: "sheep.svg",
            21: "goat.svg",
            22: "donkey.svg",
            23: "cow.svg",
            24: "rabbit.svg",
            25: "condor-emblem.svg",
            26: "chicken-oven.svg",
        };

        this.name = "";
        this.logo = "";
        this.description = "";

        this.allowed_keys = [
            "Backspace",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Delete",
            "End",
            "Home"
        ];
    };

    init() {
        this.events();
    };

    start_pop_up() {
        create_clan_name.value = null;
        create_clan_description.value = null;
        create_clan_logo.src = "assets/game/caesar.svg";
        CreateClanHandler.current_logo_index = 0;
    };

    events() {
        create_clan_close_btn.addEventListener("click", () => {
            create_clan_pop_up.style.display = "none";
            DarkLayer.style.display = "none";
        });

        create_clan_form.addEventListener("submit", (e) => {
            e.preventDefault();
        });

        create_clan_description_pop_up_btn.addEventListener("click", () => {
            DisplayPopUp_PopAnimation(clan_description_pop_up, "flex", true);
            clan_description_text.textContent = create_clan_description.value;
        });

        clan_description_close_btn.addEventListener("click", () => {
            clan_description_pop_up.style.display = "none";
        });

        create_clan_inputs.forEach((input, i) => {
            let max_text_length = input.getAttribute("input_for") == "name" ? 20 : 200;

            input.addEventListener("keydown", (e) => {
                let len = input.value.length;

                if (len > max_text_length && !this.allowed_keys.includes(e.key)) {
                    e.preventDefault();
                    return;
                };
            });
        });

        create_clan_caret_left.addEventListener("click", () => {
            this.current_logo_index > 0 && this.current_logo_index--;
            this.update_logo();
        });

        create_clan_caret_right.addEventListener("click", () => {
            this.current_logo_index < Object.keys(this.clan_logos).length - 1 && this.current_logo_index++;
            this.update_logo();
        });

        create_clan_btn.addEventListener("click", () => {
            if (create_clan_name.value.length > 0 &&
                create_clan_description.value.length > 0) {
                this.create_clan();
            };
        });

        clan_description_detail_btn.addEventListener("click", () => {
            DisplayPopUp_PopAnimation(clan_description_pop_up, "flex", true);
            clan_description_text.textContent = clan_description_el.textContent;
        });

        create_clan_reload_btn.addEventListener("click", () => {
            this.start_pop_up();
        });
    };

    update_logo() {
        create_clan_logo.src = `assets/game/${this.clan_logos[this.current_logo_index]}`;
    };

    create_clan() {
        this.name = create_clan_name.value;
        this.description = create_clan_description.value;
        this.logo = this.clan_logos[this.current_logo_index];

        try {
            socket.emit("create_clan",
                this.name,
                this.logo,
                this.description,
                parseInt(localStorage.getItem("PlayerID")), data => {

                    if (!data) {
                        AlertText.textContent = "Something went wrong!";
                        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                        return;
                    };

                    // open clan pop up and close create clan pop up
                    create_clan_pop_up.style.display = "none";
                    social_scene.clan_handler.item_click(data);
                });

        } catch (error) {
            AlertText.textContent = "Something went wrong!";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        };
    };
};

class player_levels_handler_wrapper extends NewLevel {
    constructor() {
        super();
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
            p.style.fontSize = "40px";
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

        let span = document.createElement("span");
        span.textContent = level.level_name;
        span.style.color = level_theme;

        if (level.level_name.length >= 18) {
            span.style.fontSize = "var(--Text-font-size)";
        } else {
            span.style.fontSize = "4vh";
        };

        let span1 = document.createElement("span");
        span1.classList = "LevelIconWrapper"
        span1.style.border = `5px solid ${level_theme}`;

        let div1 = document.createElement("div");
        let div2 = document.createElement("div");

        let InnerP = document.createElement("p");
        InnerP.textContent = `Level ID: 0${level.id}`;

        div1.classList = "LevelListItem_InnerWrapper1";
        div2.classList = "LevelListItem_InnerWrapper2";

        // Display from which player the level is. User can also click on the name of player to look at this profile
        if (correspondPlayer) {
            let InnerSpan = document.createElement("span");
            let PlayerNameP = document.createElement("p");
            InnerSpan.textContent = `from `;
            PlayerNameP.textContent = `${correspondPlayer.player_name}`;
            PlayerNameP.classList = "Level_PlayerName";

            let player = correspondPlayer;
            let player_name = player.player_name;
            let player_id = player.player_id;
            let player_icon = player.player_icon;
            let playerInfoClass = player.playerInfoClass;
            let playerInfoColor = player.playerInfoColor;
            let quote = player.quote;
            let onlineGamesWon = player.onlineGamesWon;
            let XP = player.XP;
            let currentUsedSkin = player.currentUsedSkin;
            let last_connection = player.last_connection;

            // click event
            PlayerNameP.addEventListener("click", (e) => {
                e.stopPropagation();

                DarkLayer.style.display = "block";
                if (player_id != localStorage.getItem("PlayerID")) { // User clicks on other players profile
                    ClickedOnPlayerInfo(player_name, player_id, player_icon, playerInfoClass, playerInfoColor, quote, onlineGamesWon, XP, currentUsedSkin, last_connection);

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


                let online_level_overview_handler = new onlineLevelOverviewHandler(level);
                online_level_overview_handler.init();
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

let social_scene = new social_scene_class();
social_scene.events();

let CreateClanHandler = new create_clan_handler();
CreateClanHandler.init();

player_levels_handler = new player_levels_handler_wrapper();
creative_level_instance = player_levels_handler
player_levels_handler.init();