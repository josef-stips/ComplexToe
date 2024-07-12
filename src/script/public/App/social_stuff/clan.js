class clan {
    constructor() {
        this.level_xp_requirement = {
            1: 0,
            2: 100,
            3: 300,
            4: 700,
            5: 900,
            6: 1100,
            7: 1500,
            8: 1900,
            9: 2200,
            10: 3000,
            11: 5000,
            12: 6000,
            13: 8000,
            14: 10000,
            15: 12000,
            16: 14000,
            17: 16000,
            18: 17000,
            19: 18000,
            20: 19000,
            21: 20000,
            22: 21000,
            23: 22000,
            24: 23000,
            25: 24000,
            26: 25000,
            27: 26000,
            28: 27000,
            29: 28000,
            30: 29000,
            31: 30000,
            32: 31000,
            33: 32000,
            34: 33000,
            35: 34000,
            36: 35000,
            37: 36000,
            38: 37000,
            39: 38000,
            40: 40000
        };

        this.level_color = {
            1: { 0: "#6328c1", 1: "#228d65" },
            2: { 0: "#F6C900", 1: "#48DBFB" },
            3: { 0: "#FF006C", 1: "#FF0000" },
            4: { 0: "#FF5733", 1: "#FFC300" },
            5: { 0: "#6F1E51", 1: "#833471" },
            6: { 0: "#0652DD", 1: "#833471" },
            7: { 0: "#ED4C67", 1: "#F79F1F" },
            8: { 0: "#0A3D62", 1: "#0C2461" },
            9: { 0: "#7D6608", 1: "#8E44AD" },
            10: { 0: "#6A89CC", 1: "#78e08f" },
            11: { 0: "#2C3A47", 1: "#d1ccc0" },
            12: { 0: "#a29bfe", 1: "#6c5ce7" },
            13: { 0: "#55efc4", 1: "#81ecec" },
            14: { 0: "#ff7979", 1: "#ffbe76" },
            15: { 0: "#badc58", 1: "#f9ca24" },
            16: { 0: "#f0932b", 1: "#eb4d4b" },
            17: { 0: "#7ed6df", 1: "#e056fd" },
            18: { 0: "#ff9ff3", 1: "#feca57" },
            19: { 0: "#ffda79", 1: "#ff6b81" },
            20: { 0: "#3c40c6", 1: "#e74c3c" },
            21: { 0: "#f1c40f", 1: "#2980b9" },
            22: { 0: "#3498db", 1: "#e74c3c" },
            23: { 0: "#6F1E51", 1: "#0652DD" },
            24: { 0: "#0A3D62", 1: "#833471" },
            25: { 0: "#7D6608", 1: "#8E44AD" },
            26: { 0: "#0A3D62", 1: "#48DBFB" },
            27: { 0: "#ED4C67", 1: "#F79F1F" },
            28: { 0: "#0A3D62", 1: "#0C2461" },
            29: { 0: "#7D6608", 1: "#8E44AD" },
            30: { 0: "#6A89CC", 1: "#78e08f" },
            31: { 0: "#2C3A47", 1: "#d1ccc0" },
            32: { 0: "#a29bfe", 1: "#6c5ce7" },
            33: { 0: "#55efc4", 1: "#81ecec" },
            34: { 0: "#ff7979", 1: "#ffbe76" },
            35: { 0: "#badc58", 1: "#f9ca24" },
            36: { 0: "#f0932b", 1: "#eb4d4b" },
            37: { 0: "#7ed6df", 1: "#e056fd" },
            38: { 0: "#ff9ff3", 1: "#feca57" },
            39: { 0: "#ffda79", 1: "#ff6b81" },
            40: { 0: "#3c40c6", 1: "#e74c3c" }
        };

        this.init_clan_member_storage_data = {
            "is_in_clan": false,
            "clan_id": null,
            "role": "member"
        };

        this.current_clan_data = {};
        this.current_clan_all_data = null;
        this.roomID = null;

        this.current_selected_clan_id = null;
    };

    async init() {
        this.storage_data();
        await this.get_clan_data();
        await this.connect_to_clan_room();

        let db_clan_chat = await this.current_clan_all_data["chat"];
        clan_chat.message_cache = db_clan_chat ? db_clan_chat : [];
    };

    storage_data() {
        let is_clan_member = localStorage.getItem("clan_member_data");

        if (!is_clan_member) {
            localStorage.setItem("clan_member_data", JSON.stringify(this.init_clan_member_storage_data));
            this.current_clan_data = this.init_clan_member_storage_data;

        } else {
            this.current_clan_data = JSON.parse(is_clan_member);
        };
    };

    async update_data(data, create_action, leave_clan = false) {
        console.log(data);

        let role;
        let get_member = true; // opposite of leave clan

        // user created clan. otherwise joined clan as member
        if (create_action) {
            role = "leader";

        } else {
            role = "member";

            if (data["role"]) {
                role = data["role"];
            };
        };

        if (leave_clan) {
            get_member = false;
            role = null;
            data["id"] = null;
        };

        this.current_clan_data = {
            "is_in_clan": get_member,
            "clan_id": data["id"],
            "role": role
        };

        await socket.emit("update_clan_data", JSON.stringify(this.current_clan_data),
            Number(localStorage.getItem("PlayerID")), async cb => {

                localStorage.setItem("clan_member_data", JSON.stringify(this.current_clan_data));
                await this.get_clan_data();
            });
    };

    get_clan_data() {
        return new Promise(resolve => {

            socket.emit("get_clan_data", this.current_clan_data["clan_id"], cb => {
                // console.log(cb);

                if (cb) {
                    this.current_clan_all_data = cb;
                    resolve();
                };
            });
        });
    };

    async connect_to_clan_room() {
        let id = this.current_clan_data["clan_id"];

        await socket.emit("connect_to_clan_room", id, clanPlaygroundHandler.self_player_id, cb => {
            if (!cb) new Error("couldn't connect to clan room.");

            // for (id of cb) {
            //     !clanPlaygroundHandler.player_cache[id] && (clanPlaygroundHandler.player_cache[id] = new playground_player(id, { x: 0, y: 0 }));
            //     !clanPlaygroundHandler.player_cache[id] && clanPlaygroundHandler.player_cache[id].init();
            // };
        });
    };

    // update XP of player in clan data
    async send_XP_to_clan() {
        return new Promise(resolve => {
            let player_XP = Number(localStorage.getItem("ELO"));
            let clan_id = this.current_clan_data["clan_id"];

            // console.log(player_XP);
            socket.emit("send_XP_to_clan", clan_id, clanPlaygroundHandler.self_player_id, player_XP, cb => {
                newClan.current_clan_all_data = cb;

                resolve();
            });
        });
    };

    async new_clan_level(new_level) {
        console.log(new_level);
    };
};

class clan_chat_pop_up_class {
    constructor() {
        this.message_cache = [];
        this.lastDate = null;
    };

    init() {
        this.events();
    };

    async open() {
        this.lastDate = null;

        await StartLoad(clan_chat_pop_up, gameModeCards_Div);

        await newClan.connect_to_clan_room();
        await newClan.send_XP_to_clan();
        await this.parse_data();
        await clanPlaygroundHandler.open();
        sceneMode.full();

        await FinishLoad(clan_chat_pop_up, gameModeCards_Div);
    };

    events() {
        clan_chat_back_btn.addEventListener("click", () => {
            socket.emit("leave_clan_room", newClan.roomID, newClan.current_clan_data["clan_id"], clanPlaygroundHandler.self_player_id);

            // this.message_cache = [];
            // this.lastDate = null;

            DarkLayerAnimation(gameModeCards_Div, clan_chat_pop_up).then(() => {
                sceneMode.default();
            });
        });

        clan_chat_message_input.addEventListener("keydown", (e) => {
            let max_text_length = 200;
            let text = clan_chat_message_input.value;

            if (text.length > max_text_length && !CreateClanHandler.allowed_keys.includes(e.key)) {
                e.preventDefault();
                return;
            };
        });

        clan_chat_form.addEventListener("submit", async(e) => {
            e.preventDefault();

            let text = clan_chat_message_input.value;

            if (text.length > 0) {
                clan_chat_message_input.value = null;
                await this.pass_message(text);

                setTimeout(() => {
                    chat_scroll_to_bottom('instant', clan_chat_chat);
                }, 100);
            };
        });

        clan_chat_header.removeEventListener("click", clan_chat_header.clickEvent);

        clan_chat_header.addEventListener("click", clan_chat_header.clickEvent = async() => {
            await newClan.get_clan_data();
            await social_scene.clan_handler.item_click(newClan.current_clan_all_data);
        });
    };

    async parse_data() {
        let msg_cache = this.message_cache ? Object.keys(this.message_cache).length > 0 : false;

        // !msg_cache && await newClan.get_clan_data();

        newClan.roomID = newClan.current_clan_all_data.room_id;

        clan_chat_header_clan_name.textContent = newClan.current_clan_all_data["name"];
        clan_chat_header_clan_logo.src = `assets/game/${newClan.current_clan_all_data["logo"]}`;

        clanPlaygroundHandler.clan_level = newClan.current_clan_all_data.level;

        await this.parse_chat(newClan.current_clan_all_data["chat"], msg_cache);
    };

    async parse_chat(clan_all_chat_data, msg_cache) {
        return new Promise(async resolve => {
            let msgs = !msg_cache && clan_all_chat_data ? clan_all_chat_data : this.message_cache;

            if (this.message_cache.length <= 0 && clan_all_chat_data) this.message_cache = clan_all_chat_data;
            clan_chat_chat.textContent = null;
            // console.log(msgs);

            if (msgs) {
                for (const message of msgs) {
                    this.new_date_msg(message);

                    try {
                        // console.log(message);
                        if (message["type"] == "human") {

                            const { data, author_role, author_name } = await this.get_author_data_of_msg(message);
                            message["role"] = author_role;

                            this.new_message(message, data);

                        } else if (message["type"] == "clan_msg" || message["type"] == "promotion") {

                            this.clan_msg(message["message"]);

                        } else if (message["type"] == "join_request") {

                            this.join_request_msg(message, message["player_data"]);
                        };

                    } catch (error) {
                        console.error("Error getting author data:", error);
                    };
                };

                setTimeout(() => {
                    chat_scroll_to_bottom('smooth', clan_chat_chat);
                    resolve();
                }, 200);
            };
        });
    };

    new_date_msg(message) {
        const date = new Date(message["date"]);
        let day = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();

        if (date.getDate() + date.getFullYear() == new Date().getDate() + new Date().getFullYear()) {
            day = "today";
        };

        if (this.lastDate != day) {
            this.clan_msg(day);
            date.getMonth();
        };

        this.lastDate = day;
    };

    get_author_data_of_msg = (message) => {
        return new Promise((resolve, reject) => {
            let author_role;
            let author_name;

            if (newClan.current_clan_all_data["members"][message["from"]]) {
                author_role = newClan.current_clan_all_data["members"][message["from"]]["role"];
                author_name = newClan.current_clan_all_data["members"][message["from"]]["name"];

            } else {
                author_role = newClan.current_clan_all_data["previous_members"][message["from"]]["role"];
                author_name = newClan.current_clan_all_data["previous_members"][message["from"]]["name"];
            };

            socket.emit("GetDataByID", message["from"], data => resolve({ data, author_role, author_name }));
        });
    };

    async pass_message(text) {
        await socket.emit("pass_clan_message", text, Number(localStorage.getItem("PlayerID")), newClan.current_clan_data["clan_id"]);
    };

    clan_msg(text) {
        let message_wrapper = document.createElement("div");

        message_wrapper.classList.add("neutral_clan_message");
        message_wrapper.textContent = text;

        clan_chat_chat.appendChild(message_wrapper);

        chat_scroll_to_bottom('instant', clan_chat_chat);
    };

    join_request_msg(msg, player) {
        console.log(msg, player);

        let msg_wrapper = document.createElement("div");
        let msg_upper = document.createElement("div");
        let msg_lower = document.createElement("div");
        let msg_accept = document.createElement("i");
        let msg_reject = document.createElement("i");
        let text_el = document.createElement("p");
        let details_btn = document.createElement("p");

        details_btn.className = "fa-solid fa-question cursor_btn";

        details_btn.addEventListener("click", () => {
            AlertText.textContent = msg.request_text;
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        });

        msg_wrapper.setAttribute("from", "join_request");
        msg_wrapper.setAttribute("message_player_id", player.player_id);
        msg_wrapper.setAttribute("message_id", msg.msg_id);

        msg_wrapper.classList.add("clan_chat_message");
        msg_upper.classList.add("clan_chat_message_upper");
        msg_lower.classList.add("clan_chat_message_lower");

        msg_accept.className = "fa-solid fa-check clan_request_msg_accept_btn";
        msg_reject.className = "fas fa-x clan_request_msg_reject_btn";

        text_el.textContent = msg.message;

        msg_wrapper.appendChild(msg_upper);
        msg_wrapper.appendChild(msg_lower);
        msg_lower.appendChild(msg_accept);
        msg_lower.appendChild(msg_reject);
        msg_lower.appendChild(details_btn);
        msg_upper.appendChild(text_el);
        clan_chat_chat.appendChild(msg_wrapper);

        text_el.addEventListener("click", () => {
            ClickedOnPlayerInfo(player);
        });

        msg_accept.addEventListener("click", () => {
            socket.emit("accept_clan_request", player.player_id, newClan.current_clan_all_data["id"], cb => {

                console.log(cb);
                socket.emit("remove_clan_msg", newClan.current_clan_data["clan_id"], msg.msg_id);
            });
        });

        msg_reject.addEventListener("click", () => {
            if (newClan.current_clan_data.role == social_scene.clan_handler.clan_roles[0] || newClan.current_clan_data.role == social_scene.clan_handler.clan_roles[1]) {

                socket.emit("remove_clan_msg", newClan.current_clan_data["clan_id"], msg.msg_id);

            } else {
                AlertText.textContent = `Only the ${social_scene.clan_handler.clan_roles[0]} and the ${social_scene.clan_handler.clan_roles[1]} can modify join requests!`;
            };
        });
    };

    async new_message(msg, author_data) {
        let self_id = Number(localStorage.getItem("PlayerID"));
        let message_author_type = self_id == author_data["player_id"] ? "self" : "other";

        let message_wrapper = document.createElement("div");
        let player_name_wrapper = document.createElement("div");
        let player_role_wrapper = document.createElement("div");
        let message_text_wrapper = document.createElement("div");
        let message_date_wrapper = document.createElement("div");

        player_name_wrapper.addEventListener("click", async() => {
            if (message_author_type == "self") {
                author_data["player_name"] = author_data["player_name"] + " (You)";
                OpenOwnUserProfile();

            } else {

                ClickedOnPlayerInfo(author_data);
            };
        });

        message_date_wrapper.textContent = returnTimeOfDate(msg["date"]);
        message_text_wrapper.textContent = msg["message"];
        player_role_wrapper.textContent = msg["role"];
        player_name_wrapper.textContent = message_author_type == "self" ? "You" : author_data["player_name"];

        message_wrapper.setAttribute("from", message_author_type);
        message_wrapper.setAttribute("message_player_id", author_data["player_id"]);

        message_wrapper.classList.add("clan_chat_message");
        player_name_wrapper.classList.add("clan_chat_message_player_name");
        player_role_wrapper.classList.add("clan_chat_message_player_role");
        message_text_wrapper.classList.add("clan_chat_message_player_message");
        message_date_wrapper.classList.add("clan_message_date");

        if (message_author_type == "self") {
            message_wrapper.style.borderColor = `var(--gradient-first-color-${clanPlaygroundHandler.clan_level})`;

        } else {
            message_wrapper.style.borderColor = `var(--gradient-second-color-${clanPlaygroundHandler.clan_level})`;
        };

        message_wrapper.appendChild(player_name_wrapper);
        message_wrapper.appendChild(player_role_wrapper);
        message_wrapper.appendChild(message_text_wrapper);
        message_wrapper.appendChild(message_date_wrapper);
        clan_chat_chat.appendChild(message_wrapper);
    };
};

class clan_playground_handler {
    constructor() {
        this.playground = clan_chat_playground;
        this.self_character = clan_playground_character;
        this.viewport = clan_playground_viewport;

        this.back_btn = clan_chat_back_btn;
        this.self_character_coords = { x: 30, y: 30 };
        this.self_character_size = 32;
        this.speed = 1;
        this.playground_height = this.playground.clientHeight;
        this.playground_width = this.playground.clientWidth;
        this.clan_level = null;

        this.keys_pressed = {};
        this.can_leave = false;

        this.player_cache = {};
        this.self_player_id = self_id();

        // elements
        this.XP_bar = null;
        this.XP_text = null;
        this.level_text = null;
        this.bar_color = null;

        this.playground_field = null;
        this.playground_field_title = null;
    };

    init() {
        this.character_control();
    };

    async open() {
        this.clan_level = await newClan.current_clan_all_data["level"];
        this.playground_height = this.playground.clientHeight;
        this.playground_width = this.playground.clientWidth;
        this.self_character_size = 32;
        this.player_cache = {};

        [...this.playground.children].forEach(el => {
            if (el.classList.contains("clan_playground_character")) el.remove();
        });

        setTimeout(async() => {
            await this.send_coords();
        }, 400);

        this.generate_field();
        this.init_clan_level_bar(newClan.current_clan_all_data["XP"], newClan.current_clan_all_data["level"]);

        this.init_DOM_colors();
    };

    init_DOM_colors() {
        clan_chat_header.style.borderColor = `var(--gradient-second-color-${clanPlaygroundHandler.clan_level})`;
        document.querySelector(".clan_chat_leftWrapper").style.borderColor = `var(--gradient-second-color-${clanPlaygroundHandler.clan_level})`;
    };

    generate_field() {
        document.querySelector(".playground_field_wrapper") && document.querySelector(".playground_field_wrapper").remove();

        let field_wrapper = document.createElement("div");
        let field = document.createElement("div");
        let field_title = document.createElement("h1");

        field_wrapper.classList.add("playground_field_wrapper");
        field.classList.add("playground_field");
        field_title.classList.add("playground_field_title");

        field_title.textContent = `${this.clan_level}x${this.clan_level} clan field`;

        field_wrapper.appendChild(field_title);
        field_wrapper.appendChild(field);
        this.playground.appendChild(field_wrapper);

        this.playground_field = field;
        this.playground_field_title = field_title;

        generateField_preview(this.clan_level, this.clan_level, this.playground_field, null, true);
        this.init_field_color(this.playground_field, this.playground_field_title);
    };

    async init_clan_level_bar(clan_XP, clan_level) {
        this.bar_color = newClan.level_color[this.clan_level][1];
        this.clan_level = clan_level;

        this.init_DOM_colors();

        let wrapper = document.querySelector(".playground_field_wrapper");
        let bar_wrapper = document.createElement("div");
        let bar = document.createElement("div");
        let text = document.createElement("div");
        let XP_text = document.createElement("div");

        this.XP_bar = bar;
        this.XP_text = XP_text;
        this.level_text = text

        bar_wrapper.classList.add("clan_level_bar_wrapper");
        bar.classList.add("clan_level_bar");

        bar_wrapper.appendChild(text);
        bar_wrapper.appendChild(bar);
        bar_wrapper.appendChild(XP_text);
        wrapper.appendChild(bar_wrapper);

        // logic
        let next_level = Number(Object.keys(newClan.level_xp_requirement)[clan_level]);
        let last_XP = newClan.level_xp_requirement[clan_level];

        if (!next_level) {
            bar.style.background = `linear-gradient(105deg, ${this.bar_color} 100%, transparent 0% )`;

            text.textContent = `max. level ${clan_level}`;
            XP_text.textContent = `XP ${clan_XP} / ${last_XP}`;
            return;
        };

        let XP_for_next_level = newClan.level_xp_requirement[clan_level + 1];

        // let difference = (clan_XP / (XP_for_next_level)) * 100;
        let difference = ((clan_XP - last_XP) / (XP_for_next_level - last_XP)) * 100;

        text.textContent = `level ${clan_level}`;
        XP_text.textContent = `XP ${clan_XP} / ${XP_for_next_level}`;
        this.playground_field_title.textContent = `${clan_level}x${clan_level} clan field`;

        // console.log(difference, 1 / 5 * difference, clan_XP, XP_for_next_level, next_level, clan_level);
        for (let i = 0; i <= difference; i += 1 / 150 * difference) {
            await sleep(20);
            bar.style.background = `linear-gradient(105deg, ${this.bar_color} ${i}%, transparent 0% )`;
        };
        // console.log("fertig")

        if (difference >= 100) {
            this.clan_level = next_level;

            generateField_preview(next_level, next_level, this.playground_field, null, true);
            this.init_field_color(this.playground_field, this.playground_field_title);

            this.update_clan_level_bar(clan_XP, next_level);
        };
    };

    async update_clan_level_bar(clan_XP, clan_level) {
        let next_level = Number(Object.keys(newClan.level_xp_requirement)[clan_level]);
        let next_level_XP = newClan.level_xp_requirement[next_level];
        let last_level_XP = newClan.level_xp_requirement[clan_level];

        if (!next_level) {
            this.XP_bar.style.background = `linear-gradient(105deg, ${this.bar_color} 100%, transparent 0% )`;
            return;
        };

        // let difference = (clan_XP / (next_level_XP)) * 100;
        let difference = ((clan_XP - last_XP) / (next_level_XP - last_level_XP)) * 100;

        this.level_text.textContent = `level ${clan_level}`;
        this.XP_text.textContent = `XP ${clan_XP} / ${next_level_XP}`;
        this.playground_field_title.textContent = `${clan_level}x${clan_level} clan field`;

        this.XP_bar.style.background = `linear-gradient(105deg, ${this.bar_color} 0%, transparent 0% )`;

        // console.log(difference, 1 / 5 * difference, clan_XP, next_level_XP, next_level, clan_level);
        for (let i = 0; i <= difference; i += 1 / 150 * difference) {
            await sleep(20);
            this.XP_bar.style.background = `linear-gradient(105deg, ${this.bar_color} ${i}%, transparent 0% )`;
        };
        // console.log("fertig")

        if (difference >= 100) {

            setTimeout(() => {
                this.clan_level = next_level;

                generateField_preview(next_level, next_level, this.playground_field, null, true);
                this.init_field_color(this.playground_field, this.playground_field_title);

                this.update_clan_level_bar(clan_XP, next_level);
            }, 500);
        };
    };

    init_field_color(field, title) {
        let colors = [];

        colors[0] = newClan.level_color[this.clan_level][0];
        colors[1] = newClan.level_color[this.clan_level][1];

        document.documentElement.style.setProperty(`--gradient-first-color-${this.clan_level}`, colors[0]);
        document.documentElement.style.setProperty(`--gradient-second-color-${this.clan_level}`, colors[1]);

        title.style.setProperty(`--first-color`, `var(--gradient-first-color-${this.clan_level})`);
        title.style.setProperty(`--second-color`, `var(--gradient-second-color-${this.clan_level})`);
        title.style.backgroundClip = "text";

        field.style.setProperty(`--first-color`, `var(--gradient-first-color-${this.clan_level})`);
        field.style.setProperty(`--second-color`, `var(--gradient-second-color-${this.clan_level})`);
    };

    init_character() {
        DisplayPlayerIcon_at_el(this.self_character,
            localStorage.getItem("userInfoClass"),
            localStorage.getItem("userInfoColor"),
            localStorage.getItem("UserIcon")
        );
        this.self_character.classList.add("clan_playground_character");
    };

    init_character_position() {
        this.self_character_coords = { x: 300, y: 300 };
        this.update_position();
        this.check_collision();
        this.init_character();
    };

    character_control() {
        this.playground.addEventListener("click", (e) => {
            this.playground.focus();
        });

        window.addEventListener("keydown", (e) => {

            if (getComputedStyle(clan_chat_pop_up).display != "none") {
                this.keys_pressed[e.key] = true;
            };
        });

        window.addEventListener("keyup", (e) => {
            if (getComputedStyle(clan_chat_pop_up).display != "none") {
                this.keys_pressed[e.key] = false;
            };
        });

        this.animate_character();
    };

    animate_character() {
        let update_needed = false;

        if ((this.keys_pressed['ArrowUp']) && this.self_character_coords.y > 0) {
            this.self_character_coords.y -= this.speed;
            update_needed = true;
        };

        if ((this.keys_pressed['ArrowDown']) && this.self_character_coords.y < 85) {
            this.self_character_coords.y += this.speed;
            update_needed = true;
        };

        if ((this.keys_pressed['ArrowLeft']) && this.self_character_coords.x > 0) {
            this.self_character_coords.x -= this.speed;
            update_needed = true;
        };

        if ((this.keys_pressed['ArrowRight']) && this.self_character_coords.x < 100) {
            this.self_character_coords.x += this.speed;
            update_needed = true;
        };

        if (this.keys_pressed['Enter'] && this.can_leave) this.back_btn.click();
        if (update_needed) this.send_coords();

        requestAnimationFrame(() => this.animate_character());
    };

    update_position(character, character_coords, character_id) {
        character.style.left = `${character_coords.x}vh`;
        character.style.top = `${character_coords.y}vh`;

        // centrate viewport
        if (character_id == this.self_player_id) {
            const offsetX = Math.max(character_coords.x - 75, 0);
            const offsetY = Math.max(character_coords.y - 75, 0);

            this.playground.style.left = `${-offsetX}vh`;
            this.playground.style.top = `${-offsetY}vh`;
        };
    };

    check_collision(character) {
        this.self_character_rect = character.getBoundingClientRect();
        this.back_btn_rect = this.back_btn.getBoundingClientRect();

        this.check_collision_on_back_btn(this.self_character_rect, this.back_btn_rect) ? this.display_leave_text("block") : this.display_leave_text("none");
    };

    check_collision_on_back_btn(rect1, rect2) {
        return !(rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom);
    };

    display_leave_text(type) {
        clan_playground_leave_text.style.display = type;
        this.can_leave = type == "none" ? false : true;
    };

    async send_coords() {
        await socket.emit("playground_player_moves", Number(localStorage.getItem("PlayerID")), localStorage.getItem("userInfoClass"), localStorage.getItem("userInfoColor"),
            localStorage.getItem("UserIcon"),
            this.self_character_coords, newClan.roomID);
    };
};

// player x got kicked out of clan by y
socket.on("player_got_kicked", (player_name, kicker_name, player_id, clanData) => {
    clan_chat.clan_msg(`${kicker_name} kicked ${player_name} out of the clan`);

    if (player_id == clanPlaygroundHandler.self_player_id) {

        if (getComputedStyle(clan_chat_pop_up).display != "none") {

            clan_pop_up_close_btn.click();

            setTimeout(async() => {
                await universal_clan_msg_handler.check(0);
            }, 200);

            clan_btn_notify_label.style.display = "none";

        } else {

            clan_btn_notify_label.style.display = "flex";
        };

        newClan.update_data(clanData, false, true);
    };
});

// player joined clan
socket.on("player_joined_clan", player_name => {
    clan_chat.clan_msg(`${player_name} joined the clan`);
});

// player left clan
socket.on("player_left_clan", player_name => {
    clan_chat.clan_msg(`${player_name} left the clan`);
});

// server updated XP and level of clan
socket.on("update_clan_XP_bar", (newXP, clanLevel) => {
    // console.log(newXP, clanLevel);

    clanPlaygroundHandler.clan_level = clanLevel;

    clanPlaygroundHandler.generate_field();
    clanPlaygroundHandler.init_clan_level_bar(newXP, clanLevel);
});

// client recieves position of other player in the room
socket.on("recieve_player_coords", (player_id, coords, UserInfoClass, UserInfoColor, UserIcon) => {
    // console.log(player_id, coords);

    if (!clanPlaygroundHandler.player_cache[player_id]) {

        clanPlaygroundHandler.player_cache[player_id] = new playground_player(player_id, coords, UserInfoClass, UserInfoColor, UserIcon);
        clanPlaygroundHandler.player_cache[player_id].init();

    } else {
        clanPlaygroundHandler.player_cache[player_id].coords = coords;
        clanPlaygroundHandler.player_cache[player_id].update();
    };
});

socket.on("player_leaves_clan_room", player_id => {
    clanPlaygroundHandler.player_cache[player_id] && clanPlaygroundHandler.player_cache[player_id].disconnect();
});

socket.on("rm_clan_msg", msg_id => {
    let el = clan_chat_chat.querySelector(`[from="join_request"][message_id="${msg_id}"]`);
    el && el.remove();
    clan_chat.message_cache.splice(msg_id, 1);
});

class playground_player {
    constructor(id, coords, UserInfoClass, UserInfoColor, UserIcon) {
        this.self_element = null;
        this.skin = null;
        this.self_id = id;
        this.coords = coords;
        this.UserInfoClass = UserInfoClass;
        this.UserInfoColor = UserInfoColor;
        this.UserIcon = UserIcon;
    };

    init() {
        this.self_element = document.createElement("p");
        this.self_element.setAttribute("playground_character_id", this.self_id);
        DisplayPlayerIcon_at_el(this.self_element, this.UserInfoClass, this.UserInfoColor, this.UserIcon);
        this.self_element.classList.remove("userInfoEditable");
        this.self_element.classList.add("clan_playground_character");

        clan_chat_playground.appendChild(this.self_element);
        clanPlaygroundHandler.update_position(this.self_element, this.coords, this.self_id);
    };

    update() {
        clanPlaygroundHandler.update_position(this.self_element, this.coords, this.self_id);
        if (clanPlaygroundHandler.self_player_id == this.self_id) clanPlaygroundHandler.check_collision(this.self_element);
    };

    disconnect() {
        this.self_element.remove();
        delete clanPlaygroundHandler.player_cache[this.self_id];
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
            clan_info_pen.style.display = "none";
        });

        clan_description_close_btn.addEventListener("click", () => {
            clan_description_pop_up.style.display = "none";
            clan_description_text.readOnly = true;
            clan_desc_save_btn.style.display = "none";
        });

        create_clan_inputs.forEach((input, i) => {
            let max_text_length = input.getAttribute("input_for") == "name" ? 20 : 200;

            input.addEventListener("keydown", (e) => {
                let len = input.value.length;

                if (len >= max_text_length && !this.allowed_keys.includes(e.key)) {
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

        create_clan_btn.addEventListener("click", create_clan_btn.ev = () => {
            if (create_clan_name.value.length > 0 &&
                create_clan_description.value.length > 0) {
                this.create_clan();

                create_clan_btn.style.pointerEvents = "none";

                // bug prevention of creating multiple clans
                setTimeout(() => {
                    create_clan_btn.style.pointerEvents = "all";
                }, 5000);
            };
        });

        clan_description_detail_btn.addEventListener("click", () => {
            DisplayPopUp_PopAnimation(clan_description_pop_up, "flex", true);
            clan_description_text.value = clan_description_el.textContent;

            if (newClan.current_clan_data.clan_id == newClan.current_selected_clan_id && newClan.current_clan_data.role == "leader" || newClan.current_clan_data.role == "dikaios") {
                clan_info_pen.style.display = "flex";

            } else {
                clan_info_pen.style.display = "none";
            };
        });

        create_clan_reload_btn.addEventListener("click", () => {
            this.start_pop_up();
        });

        clan_info_pen.removeEventListener("click", clan_info_pen.ev);

        clan_info_pen.addEventListener("click", clan_info_pen.ev = () => {
            clan_description_text.readOnly = false;
            clan_description_text.focus();
            clan_desc_save_btn.style.display = "flex";
        });

        clan_desc_save_btn.removeEventListener("click", clan_desc_save_btn.ev);

        clan_desc_save_btn.addEventListener("click", clan_desc_save_btn.ev = () => {
            let desc = clan_description_text.value;

            socket.emit("update_clan_desc", newClan.current_selected_clan_id, desc, cb => {
                OpenedPopUp_WhereAlertPopUpNeeded = true;

                if (!cb) {
                    AlertText.textContent = "something went wrong. May try again?";

                } else {
                    AlertText.textContent = "Clan description successfully updated!";
                    clan_description_el.textContent = desc;
                };

                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                clan_description_close_btn.click();
            });
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
                parseInt(localStorage.getItem("PlayerID")), async data => {

                    clan_chat.message_cache = [];

                    if (!data) {
                        AlertText.textContent = "Something went wrong!";
                        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                        return;
                    };

                    await newClan.update_data(data, true);

                    // open clan pop up and close create clan pop up
                    create_clan_pop_up.style.display = "none";
                    multiple_use_scene.style.display = "none";

                    await clan_chat.open();

                    setTimeout(() => {
                        // social_scene.clan_handler.item_click(data);
                    }, 1000);
                });

        } catch (error) {
            AlertText.textContent = "Something went wrong!";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
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
            0: "leader",
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

        this.clan_pop_up_opened_in_pop_up = false;

        this.self_role = "";
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
        let details_wrapper = document.createElement("div");
        let member_count_el = document.createElement("p");

        let colors = this.create_clan_css_propertys(data);

        list_item.classList.add("default_sb_item");
        details_wrapper.classList.add("clan_list_item_details_wrapper");

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

        member_count_el.textContent = `${Object.keys(data.members).length} members`;

        details_wrapper.appendChild(member_count_el);
        list_item.appendChild(item_img);
        list_item.appendChild(item_text);
        list_item.appendChild(details_wrapper);
        clan_search_list.appendChild(list_item);

        list_item.addEventListener("click", () => {
            this.item_click(data);
        });
    };

    item_click(data) {
        try {
            // console.log(data);
            if (data["members"][Number(localStorage.getItem("PlayerID"))]) {

                this.self_role = data["members"][Number(localStorage.getItem("PlayerID"))]["role"];

            } else {
                this.self_role = null;
            };

            // click event on admin name
            this.admin_name_click(data);

            // sort members after date
            let members_arr = Object.entries(data["members"]).map(([id, val]) => ({ id, ...val }));

            // console.log(data["members"], members_arr)
            members_arr = members_arr.sort((a, b) => new Date(a.join_date) - new Date(b.join_date));
            // console.log(members_arr);

            let sorted_member_data = members_arr.reduce((obj, item) => {
                obj[item.id] = item;
                delete item.id;
                return obj;
            }, {});

            // generate member list items
            for (const [id, member_data] of Object.entries(sorted_member_data)) {
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
            clan_best_level.textContent = data["best_level"];
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

        // console.log(member_data, member_data["join_date"]);

        try {
            socket.emit("GetDataByID", member_id, data => {
                let you_tag = clanPlaygroundHandler.self_player_id == data["player_id"] ? "(You)" : "";

                let list_item = document.createElement("li");
                let item_text = document.createElement("h2");
                let item_img = document.createElement("p");
                let item_text_wrapper = document.createElement("div");
                let item_role = document.createElement("i");
                let kick_btn = document.createElement("p");
                let promote_btn = document.createElement("p");
                let wrapper2 = document.createElement("div");
                let join_date_el = document.createElement("p");
                let small_text_wrapper = document.createElement("div");

                let member_icon = this.member_role_icon(member_data["role"]);
                member_icon.classList.add("clan_member_accessory");

                list_item.classList.add("default_sb_item");
                list_item.classList.add("clan_member_list_item");
                list_item.style.padding = "0";
                item_text.textContent = data["player_name"] + " " + you_tag;
                item_text.style.background = "unset";
                item_text.style.webkitTextFillColor = "unset";
                item_text.style.fontSize = "4.5vh";
                item_text.style.textWrap = "nowrap";
                item_img.style.fontSize = "4.5vh";
                item_role.classList.add("member_role_text");
                item_role.textContent = member_data["role"];
                small_text_wrapper.classList.add("small_text_wrapper");
                join_date_el.textContent = "joined on " + member_data["join_date"];
                join_date_el.classList.add("join_date_el");
                item_text_wrapper.classList.add("member_text_wrapper");
                kick_btn.classList.add("member_kick_btn");
                kick_btn.textContent = "kick";
                promote_btn.textContent = "promote";
                promote_btn.classList.add("member_promote_btn");
                promote_btn.classList.add("default_btn");
                kick_btn.classList.add("default_btn");
                wrapper2.classList.add("member_item_wrapper2");

                DisplayPlayerIcon_at_el(item_img, data["playerInfoClass"], data["playerInfoColor"], data["player_icon"]);
                this.role_btns_events(kick_btn, promote_btn, member_data["role"], this.self_role, data);

                wrapper2.appendChild(kick_btn);
                wrapper2.appendChild(promote_btn);
                item_text_wrapper.appendChild(item_text);
                small_text_wrapper.appendChild(item_role);
                small_text_wrapper.appendChild(join_date_el);
                item_text_wrapper.appendChild(small_text_wrapper);
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
        userInfoPopUp.style.zIndex = "10011";

        if (Number(localStorage.getItem("PlayerID")) == data["player_id"]) {
            OpenOwnUserProfile();

        } else {
            ClickedOnPlayerInfo(data);
        };
    };

    member_role_icon(role) {
        let icon = document.createElement("img");
        icon.style.width = "6vh";
        icon.style.height = "6vh";

        switch (role) {
            case this.clan_roles[0]: // leader

                icon.src = "assets/game/stone-throne.svg";
                return icon;

            case this.clan_roles[1]: // dikaios

                icon.src = "assets/game/elf-helmet.svg";
                return icon;

            case this.clan_roles[2]: // sophron

                icon.src = "assets/game/spartan-helmet.svg";
                return icon;

            case this.clan_roles[3]: // member

                icon.src = "assets/game/bandana.svg";
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

            clan_creation_date.textContent = formatDate(data.creation_date);

            clan_admin_name.addEventListener("click", clan_admin_name.event = () => {
                userInfoPopUp.style.zIndex = "10011";

                if (Number(localStorage.getItem("PlayerID")) == cb["player_id"]) {
                    OpenOwnUserProfile();

                } else {
                    ClickedOnPlayerInfo(cb);
                };
            });
        });
    };

    display_action_btn(clan_id) {
        // console.log(clan_id, newClan.current_clan_data["clan_id"], newClan);

        if (clan_id == newClan.current_clan_data["clan_id"]) {

            leave_clan_btn.style.display = "contents";
            join_clan_btn.style.display = "none";

        } else {
            leave_clan_btn.style.display = "none";
            join_clan_btn.style.display = "contents";
        };
    };

    role_btns_events(kick_btn, promote_btn, member_role, self_role, member_data) {
        // console.log(kick_btn, promote_btn, member_role, self_role, member_data);

        switch (self_role) {
            case this.clan_roles[0]: // leader

                if (member_role == this.clan_roles[0]) { // leader
                    this.role_btns_display(kick_btn, promote_btn, "none", "none", member_data);

                } else if (member_role == this.clan_roles[1]) { // dikaios
                    this.role_btns_display(kick_btn, promote_btn, "flex", "none", member_data);

                } else if (member_role == this.clan_roles[2]) { // sophron
                    this.role_btns_display(kick_btn, promote_btn, "flex", "flex", member_data);

                } else if (member_role == this.clan_roles[3]) { // member
                    this.role_btns_display(kick_btn, promote_btn, "flex", "flex", member_data);
                };
                break;

            case this.clan_roles[1]: // dikaios

                if (member_role == this.clan_roles[0]) { // leader
                    this.role_btns_display(kick_btn, promote_btn, "none", "none", member_data);

                } else if (member_role == this.clan_roles[1]) { // dikaios
                    this.role_btns_display(kick_btn, promote_btn, "none", "none", member_data);

                } else if (member_role == this.clan_roles[2]) { // sophron
                    this.role_btns_display(kick_btn, promote_btn, "flex", "none", member_data);

                } else if (member_role == this.clan_roles[3]) { // member
                    this.role_btns_display(kick_btn, promote_btn, "flex", "flex", member_data);
                };
                break;

            case this.clan_roles[2]: // sophron

                if (member_role == this.clan_roles[0]) { // leader
                    this.role_btns_display(kick_btn, promote_btn, "none", "none", member_data);

                } else if (member_role == this.clan_roles[1]) { // dikaios
                    this.role_btns_display(kick_btn, promote_btn, "none", "none", member_data);

                } else if (member_role == this.clan_roles[2]) { // sophron
                    this.role_btns_display(kick_btn, promote_btn, "none", "none", member_data);

                } else if (member_role == this.clan_roles[3]) { // member
                    this.role_btns_display(kick_btn, promote_btn, "flex", "none", member_data);
                };
                break;

            case this.clan_roles[3]: // member

                if (member_role == this.clan_roles[0]) { // leader
                    this.role_btns_display(kick_btn, promote_btn, "none", "none", member_data);

                } else if (member_role == this.clan_roles[1]) { // dikaios
                    this.role_btns_display(kick_btn, promote_btn, "none", "none", member_data);

                } else if (member_role == this.clan_roles[2]) { // sophron
                    this.role_btns_display(kick_btn, promote_btn, "none", "none", member_data);

                } else if (member_role == this.clan_roles[3]) { // member
                    this.role_btns_display(kick_btn, promote_btn, "none", "none", member_data);
                };
                break;

            case null:
                this.role_btns_display(kick_btn, promote_btn, "none", "none", member_data);
        };
    };

    role_btns_display(kick_btn, promote_btn, display1, display2, member_data) {
        kick_btn.style.display = display1;
        promote_btn.style.display = display2;

        kick_btn.removeEventListener("click", kick_btn.ev);
        promote_btn.removeEventListener("click", promote_btn.ev);

        if (display1 != "none") {

            kick_btn.addEventListener("click", kick_btn.ev = (event) => {
                event.stopPropagation();

                clan_action_reason_handler.open(member_data, "kick");
            });
        };

        if (display2 != "none") {

            promote_btn.addEventListener("click", promote_btn.ev = (event) => {
                event.stopPropagation();

                clan_action_reason_handler.open(member_data, "promote");
            });
        };
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

    create_clan_css_propertys(data) {
        let colors = [];

        colors[0] = newClan.level_color[data["level"]][0];
        colors[1] = newClan.level_color[data["level"]][1];

        document.documentElement.style.setProperty(`--gradient-first-color-${data["id"]}`, colors[0]);
        document.documentElement.style.setProperty(`--gradient-second-color-${data["id"]}`, colors[1]);

        return colors;
    };
};

class clan_action_reason_pop_up_handler {
    constructor() {
        this.action_type = null;

        this.member_data = null;
        this.clan_data = null;
        this.reason = "";

        this.kicked_player_cache = [];
    };

    init() {
        this.ev();
    };

    ev() {
        clan_reason_close_btn.addEventListener("click", () => {

            clan_reason_text_input.value = null;
            clan_action_reason_pop_up.style.display = "none";

            if (getComputedStyle(clan_overview_pop_up).display == "none") {
                DarkLayer.style.display = "none";
            };
        });

        clan_reason_text_input.addEventListener("keydown", (e) => {
            this.reason = clan_reason_text_input.value;
        });

        clan_reason_form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (this.reason.length > 0 && this.reason.length < 255) {
                this.action_ev();
            };
        });
    };

    action_ev() {
        switch (this.action_type) {
            case "kick":
                this.submit_kick();
                break;

            case "join_request":
                this.submit_join_request();
                break;

            case "promote":
                this.submit_promotion();
                break;
        };
    };

    open(member_data, action_type, clan_data) {
        DisplayPopUp_PopAnimation(clan_action_reason_pop_up, "flex", true);
        clan_reason_text_input.value = "";

        this.member_data = member_data;
        this.action_type = action_type;
        this.clan_data = clan_data;
    };

    submit_kick() {
        console.log(this.reason, this.member_data)

        if (this.kicked_player_cache.includes(this.member_data)) return;

        socket.emit("kick_member", this.member_data["player_id"], this.member_data["clan_data"]["clan_id"], localStorage.getItem("UserName"),
            Number(localStorage.getItem("PlayerID")), this.reason, cb => {

                if (cb) {
                    clan_pop_up_close_btn.click();
                    clan_reason_close_btn.click();

                    this.kicked_player_cache.push(this.member_data);
                };
            });
    };

    submit_promotion() {
        console.log(this.reason, this.member_data)

        socket.emit("promote_member", this.member_data.player_id, newClan.current_selected_clan_id, clan_reason_text_input.value, cb => {
            clan_action_reason_pop_up.style.display = "none";
            clan_overview_pop_up.style.display = "none";

            if (!cb) {
                AlertText.textContent = "Something went wrong! Try again later.";

            } else {
                AlertText.textContent = `You promoted ${this.member_data.player_name} to ${cb.new_role}`;
            };

            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        });
    };

    submit_join_request() {
        console.log(this.reason, this.member_data)

        socket.emit("clan_join_request", this.member_data, this.clan_data, clan_reason_text_input.value, cb => {

            clan_action_reason_pop_up.style.display = "none";

            if (cb) {
                AlertText.textContent = "Join Request successfully sended to the clan!";

            } else {
                AlertText.textContent = "Something went wrong. Did you already sent a request?";
            };

            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        });
    };
};

class universal_clan_msg_pop_up_handler {
    constructor() {

    };

    async init() {
        this.events();
        await this.check(1000);
    };

    events() {

    };

    // check for ingoing messages in db
    async check(delay) {
        return new Promise(async resolve => {

            try {
                await socket.emit("check_for_ingoing_clan_msgs", Number(localStorage.getItem("PlayerID")), newClan.current_clan_data["clan_id"], cb => {
                    // console.log(cb);

                    if (!cb) {
                        resolve();
                        return;
                    };

                    setTimeout(() => {
                        resolve();
                        DisplayPopUp_PopAnimation(clan_universal_msg_pop_up, "flex", true);
                    }, delay);

                    this.init_content(cb);
                });

            } catch (error) {
                resolve();
                new Error("couldn't load ingoing clan messages.");
            };
        });
    };

    init_content(data) {
        this.close_all_content();
        this.open_conent(data["msg_type"]);

        clan_universal_msg_ok_btn.removeEventListener("click", clan_universal_msg_ok_btn.event);
        clan_universal_kick_content_kicker_name.removeEventListener("click", clan_universal_kick_content_kicker_name.event);

        switch (data["msg_type"]) {

            case "kick":
                this.kick_action(data);
                break;

            case "promote":
                this.promote_action(data);
                break;

            case "tournament":

                break;

            case "clan_level":

                break;

            case "request_accepted":
                this.request_accepted_action(data);
                break;
        };
    };

    promote_action(data) {
        clan_msg_promote_text_clan_name.textContent = data.clan_name;
        clan_msg_promote_text.textContent = data.new_role;
        clan_msg_promote_text_old_role.textContent = data.old_role;
        clan_content_promote_reason.textContent = data.promote_reason;

        clan_universal_msg_ok_btn.addEventListener("click", () => {
            clan_universal_msg_pop_up.style.display = "none";
            DarkLayer.style.display = "none";

            newClan.current_clan_data.role = data.new_role;
            newClan.current_clan_data.id = data.clan_id;

            newClan.update_data(newClan.current_clan_data);
            socket.emit("clean_personal_clan_msgs", clanPlaygroundHandler.self_player_id);
        });
    };

    kick_action(data) {
        clan_content_kick_reason.value = data["kick_reason"];
        clan_universal_kick_content_kicker_name.textContent = data["kicker_name"];

        clan_universal_msg_ok_btn.addEventListener("click", () => {
            clan_universal_msg_pop_up.style.display = "none";
            DarkLayer.style.display = "none";

            if (getComputedStyle(multiple_use_scene).display == "none") {
                DarkLayerAnimation(gameModeCards_Div, clan_chat_pop_up).then(() => {
                    sceneMode.default();
                });
            };

            newClan.current_clan_data = { is_in_clan: false, clan_id: null, role: null };
            newClan.update_data(newClan.current_clan_data, false, true);
            socket.emit("clean_personal_clan_msgs", clanPlaygroundHandler.self_player_id);
        });

        clan_universal_kick_content_kicker_name.addEventListener("click", async() => {
            await socket.emit("GetDataByID", data["kicker_id"], cb => {
                ClickedOnPlayerInfo(cb);
            });
        });
    };

    request_accepted_action(data) {
        clan_universal_msg_ok_btn.addEventListener("click", () => {
            clan_universal_msg_pop_up.style.display = "none";
            DarkLayer.style.display = "none";

            if (getComputedStyle(multiple_use_scene).display != "none") {
                multiple_use_scene.style.display = "none";
                sceneMode.full();
                clan_chat.open();
            };

            newClan.current_clan_data = {
                "is_in_clan": true,
                "id": data["clan_id"],
                "role": "member"
            };

            newClan.update_data(newClan.current_clan_data, false, false);
            socket.emit("clean_personal_clan_msgs", clanPlaygroundHandler.self_player_id);
        });

        clan_content_request_accepted_clan_name.textContent = data["clan_name"];
    };

    close_all_content() {
        [...clan_universal_content].forEach(content => content.style.display = "none");
    };

    open_conent(type) {
        [...clan_universal_content].find(content => content.getAttribute(`for`) == type).style.display = "flex";
    };
};

let newClan = new clan();
newClan.init();

let clan_chat = new clan_chat_pop_up_class();
clan_chat.init();

let clanPlaygroundHandler = new clan_playground_handler();
clanPlaygroundHandler.init();

let CreateClanHandler = new create_clan_handler();
CreateClanHandler.init();

let clan_action_reason_handler = new clan_action_reason_pop_up_handler();
clan_action_reason_handler.init();

// recieve from clan room
socket.on("new_clan_message", async(message, author_data, msg_type = "human") => {
    console.log(message);

    if (author_data) {
        message.name = author_data.player_name;
    };

    clan_chat.message_cache.push(message);
    clan_chat.new_date_msg(message);

    if (msg_type == "human") {
        clan_chat.new_message(message, author_data)

    } else if (msg_type == "promotion") {

        clan_chat.clan_msg(message.message);

        if (author_data.player_id == Number(localStorage.getItem("PlayerID"))) {

            if (getComputedStyle(clan_chat_pop_up).display != "none") {
                universal_clan_msg_handler.check(0);

            } else {
                clan_btn_notify_label.style.display = "flex";
            };
        };

    } else if (msg_type == "join_request") {

        clan_chat.join_request_msg(message, message.player_data);

    } else if (msg_type == "clan_msg") {

        clan_chat.clan_msg(message.message);
    };

    chat_scroll_to_bottom('instant', clan_chat_chat);

    if (getComputedStyle(clan_chat_pop_up).display == "none") {
        clan_btn_notify_label.style.display = "flex";

    } else {
        clan_btn_notify_label.style.display = "none";
    };
});