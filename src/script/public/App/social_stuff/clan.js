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
            "clan_id": null
        };

        this.current_clan_data = {};
        this.current_clan_all_data = null;

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

    update_data(data) {
        console.log(data);

        socket.emit("update_clan_data", data["id"],
            Number(localStorage.getItem("PlayerID")), async cb => {

                this.current_clan_data = {
                    "is_in_clan": true,
                    "clan_id": data["id"]
                };

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

    events() {

    };
};

class clan_chat_pop_up_class {
    constructor() {

    };

    init() {
        this.events();
    };

    open() {
        DarkLayerAnimation(clan_chat_pop_up, gameModeCards_Div).then(async() => {
            sceneMode.full();
            clanPlaygroundHandler.open();
            await this.parse_data();

            clan_chat_chat.scrollTo({
                top: clan_chat_chat.scrollHeight,
                behavior: 'smooth'
            });
        });
    };

    events() {
        clan_chat_back_btn.addEventListener("click", () => {
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

                clan_chat_chat.textContent = null;
                clan_chat_message_input.value = null;

                await this.pass_message(text);

                setTimeout(() => {
                    clan_chat_chat.scrollTo({
                        top: clan_chat_chat.scrollHeight,
                        behavior: 'instant'
                    });
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
        await newClan.get_clan_data();
        clan_chat_chat.textContent = null;

        clan_chat_header_clan_name.textContent = newClan.current_clan_all_data["name"];
        clan_chat_header_clan_logo.src = `assets/game/${newClan.current_clan_all_data["logo"]}`;

        if (newClan.current_clan_all_data["chat"]) {

            for (const message of newClan.current_clan_all_data["chat"]) {
                let author_role = newClan.current_clan_all_data["members"][message["from"]]["role"];
                let author_name = newClan.current_clan_all_data["members"][message["from"]]["name"];

                this.new_message(message["message"], author_name, message["from"], author_role, message["date"]);
            };
        };
    };

    async pass_message(text) {
        await socket.emit("pass_clan_message", text, Number(localStorage.getItem("PlayerID")), newClan.current_clan_data["clan_id"], (newChat, playerData, playerRole) => {

            for (const message of newChat) {
                this.new_message(message["message"], playerData["player_name"], playerData["player_id"], playerRole, message["date"]);
            };
        });
    };

    async new_message(text, player_name, player_id, player_role, message_date) {
        let self_id = Number(localStorage.getItem("PlayerID"));

        let message_author_type = self_id == player_id ? "self" : "other";

        let message_wrapper = document.createElement("div");
        let player_name_wrapper = document.createElement("div");
        let player_role_wrapper = document.createElement("div");
        let message_text_wrapper = document.createElement("div");
        let message_date_wrapper = document.createElement("div");

        player_name_wrapper.addEventListener("click", async() => {
            if (message_author_type == "self") {
                player_name = player_name + " (You)";
                OpenOwnUserProfile();

            } else {

                try {
                    await socket.emit("GetDataByID", player_id, player_data => {
                        ClickedOnPlayerInfo(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, player_data
                        );
                    });

                } catch (error) {
                    console.log(error);

                    AlertText.textContent = "Something went wrong!";
                    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                };
            };
        });

        message_date_wrapper.textContent = message_date;
        message_text_wrapper.textContent = text;
        player_role_wrapper.textContent = player_role;
        player_name_wrapper.textContent = player_name;

        message_wrapper.setAttribute("from", message_author_type);
        message_wrapper.setAttribute("message_player_id", player_id);

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
        this.self_character_coords = { x: 300, y: 300 };
        this.self_character_size = this.self_character.getBoundingClientRect().width;
        this.speed = 10;
        this.playground_height = this.playground.clientHeight;
        this.playground_width = this.playground.clientWidth;
        this.clan_level = null;

        this.keys_pressed = {};
        this.can_leave = false;
    };

    init() {
        this.init_character();
        this.character_control();
        this.update_position();
    };

    async open() {
        await newClan.get_clan_data();
        this.clan_level = await newClan.current_clan_all_data["level"];

        this.playground_height = this.playground.clientHeight;
        this.playground_width = this.playground.clientWidth;
        this.self_character_size = this.self_character.getBoundingClientRect().height;
        this.init_character_position();
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

        generateField_preview(this.clan_level, this.clan_level, field, null);
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

        if ((this.keys_pressed['ArrowDown']) && this.self_character_coords.y < this.playground_height - this.self_character_size) {
            this.self_character_coords.y += this.speed;
            update_needed = true;
        };

        if ((this.keys_pressed['ArrowLeft']) && this.self_character_coords.x > 0) {
            this.self_character_coords.x -= this.speed;
            update_needed = true;
        };

        if ((this.keys_pressed['ArrowRight']) && this.self_character_coords.x < this.playground_width - this.self_character_size) {
            this.self_character_coords.x += this.speed;
            update_needed = true;
        };

        if (this.keys_pressed['Enter'] && this.can_leave) {
            this.back_btn.click();
        };

        if (update_needed) {
            this.update_position();
            this.check_collision();
        };

        requestAnimationFrame(() => this.animate_character());
    };

    update_position() {
        this.self_character.style.left = `${this.self_character_coords.x}px`;
        this.self_character.style.top = `${this.self_character_coords.y}px`;

        // centrate viewport
        const viewportWidth = this.viewport.clientWidth;
        const viewportHeight = this.viewport.clientHeight;
        const offsetX = Math.max(this.self_character_coords.x - (viewportWidth * 4 / 5), 0);
        const offsetY = Math.max(this.self_character_coords.y - (viewportHeight * 4 / 5), 0);

        this.playground.style.left = `${-offsetX}px`;
        this.playground.style.top = `${-offsetY}px`;
    };

    check_collision() {
        this.self_character_rect = this.self_character.getBoundingClientRect();
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

    send_coords() {
        socket.emit("playground_player_moves", Number(localStorage.getItem("PlayerID")), this.self_character_coords);
    };
};

let newClan = new clan();
newClan.init();

let clan_chat = new clan_chat_pop_up_class();
clan_chat.init();

let clanPlaygroundHandler = new clan_playground_handler();
clanPlaygroundHandler.init();