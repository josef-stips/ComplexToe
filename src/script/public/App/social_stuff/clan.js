class clan {
    constructor() {
        this.level_xp_requirement = {
            1: 0,
            2: 1000,
            3: 2000,
            4: 3000,
            5: 4000,
            6: 5000,
            7: 6000,
            8: 7000,
            9: 8000,
            10: 9000,
            11: 10000,
            12: 11000,
            13: 12000,
            14: 13000,
            15: 14000,
            16: 15000,
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
            1: ["#6328c1", "#228d65"],
            2: ["#F6C900", "#48DBFB"],
            3: ["#FF006C", "#FF0000"],
            4: ["#FF5733", "#FFC300"],
            5: ["#6F1E51", "#833471"],
            6: ["#0652DD", "#833471"],
            7: ["#ED4C67", "#F79F1F"],
            8: ["#0A3D62", "#0C2461"],
            9: ["#7D6608", "#8E44AD"],
            10: ["#6A89CC", "#78e08f"],
            11: ["#2C3A47", "#d1ccc0"],
            12: ["#a29bfe", "#6c5ce7"],
            13: ["#55efc4", "#81ecec"],
            14: ["#ff7979", "#ffbe76"],
            15: ["#badc58", "#f9ca24"],
            16: ["#f0932b", "#eb4d4b"],
            17: ["#7ed6df", "#e056fd"],
            18: ["#ff9ff3", "#feca57"],
            19: ["#ffda79", "#ff6b81"],
            20: ["#3c40c6", "#e74c3c"],
            21: ["#f1c40f", "#2980b9"],
            22: ["#3498db", "#e74c3c"],
            23: ["#6F1E51", "#0652DD"],
            24: ["#0A3D62", "#833471"],
            25: ["#7D6608", "#8E44AD"],
            26: ["#0A3D62", "#48DBFB"],
            27: ["#ED4C67", "#F79F1F"],
            28: ["#0A3D62", "#0C2461"],
            29: ["#7D6608", "#8E44AD"],
            30: ["#6A89CC", "#78e08f"],
            31: ["#2C3A47", "#d1ccc0"],
            32: ["#a29bfe", "#6c5ce7"],
            33: ["#55efc4", "#81ecec"],
            34: ["#ff7979", "#ffbe76"],
            35: ["#badc58", "#f9ca24"],
            36: ["#f0932b", "#eb4d4b"],
            37: ["#7ed6df", "#e056fd"],
            38: ["#ff9ff3", "#feca57"],
            39: ["#ffda79", "#ff6b81"],
            40: ["#3c40c6", "#e74c3c"]
        };

        this.init_clan_member_storage_data = {
            "is_in_clan": false,
            "clan_id": null,
            "role": "leader"
        };

        this.current_clan_data = {};
        this.current_clan_all_data = null;
        this.roomID = null;

        this.current_selected_clan_id = null;
    };

    init() {
        this.storage_data();
        this.get_clan_data();
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

    async get_clan_data() {
        await socket.emit("get_clan_data", this.current_clan_data["clan_id"], cb => {

            // console.log(cb);
            if (cb) {
                this.current_clan_all_data = cb;
            };
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
};

class clan_chat_pop_up_class {
    constructor() {
        this.message_cache = [];
        this.lastDate = null;
    };

    init() {
        this.events();
    };

    open() {
        this.lastDate = null;

        DarkLayerAnimation(clan_chat_pop_up, gameModeCards_Div).then(async() => {
            await newClan.connect_to_clan_room();
            await this.parse_data();
            clanPlaygroundHandler.open();
            sceneMode.full();

            setTimeout(() => {
                chat_scroll_to_bottom('smooth', clan_chat_chat);
            }, 200);
        });
    };

    events() {
        clan_chat_back_btn.addEventListener("click", () => {
            socket.emit("leave_clan_room", newClan.roomID, newClan.current_clan_data["clan_id"], clanPlaygroundHandler.self_player_id);

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
        let msg_cache = Object.keys(this.message_cache).length > 0;

        !msg_cache && await newClan.get_clan_data();

        newClan.roomID = newClan.current_clan_all_data.room_id;

        clan_chat_header_clan_name.textContent = newClan.current_clan_all_data["name"];
        clan_chat_header_clan_logo.src = `assets/game/${newClan.current_clan_all_data["logo"]}`;

        this.parse_chat(newClan.current_clan_all_data["chat"], msg_cache);
    };

    async parse_chat(clan_all_chat_data, msg_cache) {
        let msgs = !msg_cache && clan_all_chat_data ? clan_all_chat_data : this.message_cache;

        if (this.message_cache.length <= 0) this.message_cache = newClan.current_clan_all_data["chat"];

        clan_chat_chat.textContent = null;

        if (msgs) {
            for (const message of msgs) {

                this.new_date_msg(message);

                try {
                    const { data, author_role, author_name } = await this.get_author_data_of_msg(message);

                    message["role"] = author_role;
                    this.new_message(message, data);

                } catch (error) {
                    console.error("Error getting author data:", error);
                };
            };
        };
    };

    new_date_msg(message) {
        const date = new Date(message["date"]);
        const day = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();

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

        message_date_wrapper.textContent = msg["date"];
        message_text_wrapper.textContent = msg["message"];
        player_role_wrapper.textContent = msg["role"];
        player_name_wrapper.textContent = author_data["player_name"];

        message_wrapper.setAttribute("from", message_author_type);
        message_wrapper.setAttribute("message_player_id", author_data["player_id"]);

        message_wrapper.classList.add("clan_chat_message");
        player_name_wrapper.classList.add("clan_chat_message_player_name");
        player_role_wrapper.classList.add("clan_chat_message_player_role");
        message_text_wrapper.classList.add("clan_chat_message_player_message");
        message_date_wrapper.classList.add("clan_message_date");

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

        generateField_preview(this.clan_level, this.clan_level, field, null, true);
        this.init_field_color(field, field_title);
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
            this.keys_pressed[e.key] = true;
        });

        window.addEventListener("keyup", (e) => {
            this.keys_pressed[e.key] = false;
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
        await socket.emit("playground_player_moves", Number(localStorage.getItem("PlayerID")), this.self_character_coords, newClan.roomID);
    };
};

// client recieves position of other player in the room
socket.on("recieve_player_coords", (player_id, coords) => {
    // console.log(player_id, coords);

    if (!clanPlaygroundHandler.player_cache[player_id]) {

        clanPlaygroundHandler.player_cache[player_id] = new playground_player(player_id, coords);
        clanPlaygroundHandler.player_cache[player_id].init();

    } else {
        clanPlaygroundHandler.player_cache[player_id].coords = coords;
        clanPlaygroundHandler.player_cache[player_id].update();
    };
});

socket.on("player_leaves_clan_room", player_id => {
    clanPlaygroundHandler.player_cache[player_id] && clanPlaygroundHandler.player_cache[player_id].disconnect();
});

class playground_player {
    constructor(id, coords) {
        this.self_element = null;
        this.skin = null;
        this.self_id = id;
        this.coords = coords;
    };

    init() {
        this.self_element = document.createElement("p");
        this.self_element.classList.add("clan_playground_character");
        this.self_element.setAttribute("playground_character_id", this.self_id);
        this.self_element.textContent = "X";

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
                parseInt(localStorage.getItem("PlayerID")), async data => {

                    if (!data) {
                        AlertText.textContent = "Something went wrong!";
                        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                        return;
                    };

                    await newClan.update_data(data, true);

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

            if (data["members"][Number(localStorage.getItem("PlayerID"))]) {

                this.self_role = data["members"][Number(localStorage.getItem("PlayerID"))]["role"];

            } else {
                this.self_role = null;
            };

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
                list_item.classList.add("clan_member_list_item");
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
                this.role_btns_events(kick_btn, promote_btn, member_data["role"], this.self_role);

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
        console.log(clan_id, newClan.current_clan_data["clan_id"], newClan);

        if (clan_id == newClan.current_clan_data["clan_id"]) {

            leave_clan_btn.style.display = "contents";
            join_clan_btn.style.display = "none";

        } else {
            leave_clan_btn.style.display = "none";
            join_clan_btn.style.display = "contents";
        };
    };

    role_btns_events(kick_btn, promote_btn, member_role, self_role) {
        console.log(kick_btn, promote_btn, member_role, self_role);

        switch (self_role) {
            case this.clan_roles[0]: // leader

                if (member_role == this.clan_roles[0]) { // leader
                    this.role_btns_display(kick_btn, promote_btn, "none", "none");

                } else if (member_role == this.clan_roles[1]) { // dikaios
                    this.role_btns_display(kick_btn, promote_btn, "flex", "none");

                } else if (member_role == this.clan_roles[2]) { // sophron
                    this.role_btns_display(kick_btn, promote_btn, "flex", "flex");

                } else if (member_role == this.clan_roles[3]) { // member
                    this.role_btns_display(kick_btn, promote_btn, "flex", "flex");
                };
                break;

            case this.clan_roles[1]: // dikaios

                if (member_role == this.clan_roles[0]) { // leader
                    this.role_btns_display(kick_btn, promote_btn, "none", "none");

                } else if (member_role == this.clan_roles[1]) { // dikaios
                    this.role_btns_display(kick_btn, promote_btn, "none", "none");

                } else if (member_role == this.clan_roles[2]) { // sophron
                    this.role_btns_display(kick_btn, promote_btn, "flex", "none");

                } else if (member_role == this.clan_roles[3]) { // member
                    this.role_btns_display(kick_btn, promote_btn, "flex", "flex");
                };
                break;

            case this.clan_roles[2]: // sophron

                if (member_role == this.clan_roles[0]) { // leader
                    this.role_btns_display(kick_btn, promote_btn, "none", "none");

                } else if (member_role == this.clan_roles[1]) { // dikaios
                    this.role_btns_display(kick_btn, promote_btn, "none", "none");

                } else if (member_role == this.clan_roles[2]) { // sophron
                    this.role_btns_display(kick_btn, promote_btn, "none", "none");

                } else if (member_role == this.clan_roles[3]) { // member
                    this.role_btns_display(kick_btn, promote_btn, "flex", "none");
                };
                break;

            case this.clan_roles[3]: // member

                if (member_role == this.clan_roles[0]) { // leader
                    this.role_btns_display(kick_btn, promote_btn, "none", "none");

                } else if (member_role == this.clan_roles[1]) { // dikaios
                    this.role_btns_display(kick_btn, promote_btn, "none", "none");

                } else if (member_role == this.clan_roles[2]) { // sophron
                    this.role_btns_display(kick_btn, promote_btn, "none", "none");

                } else if (member_role == this.clan_roles[3]) { // member
                    this.role_btns_display(kick_btn, promote_btn, "none", "none");
                };
                break;

            case null:
                this.role_btns_display(kick_btn, promote_btn, "none", "none");
        };
    };

    role_btns_display(kick_btn, promote_btn, display1, display2) {
        kick_btn.style.display = display1;
        promote_btn.style.display = display2;
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

let newClan = new clan();
newClan.init();

let clan_chat = new clan_chat_pop_up_class();
clan_chat.init();

let clanPlaygroundHandler = new clan_playground_handler();
clanPlaygroundHandler.init();

let CreateClanHandler = new create_clan_handler();
CreateClanHandler.init();

// recieve from clan room
socket.on("new_clan_message", async(message, author_data) => {
    console.log(message);

    clan_chat.message_cache.push({
        message: message["message"],
        from: message["from"],
        date: message["date"],
        role: author_data["player_name"],
        name: message["role"]
    });

    clan_chat.new_date_msg(message);

    clan_chat.new_message(message, author_data);
    chat_scroll_to_bottom('instant', clan_chat_chat);
});