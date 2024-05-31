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

    update_data() {

    };

    get_clan_data() {
        socket.emit("get_clan_data", this.current_clan_data["clan_id"], cb => {

            console.log(cb);
            if (cb) {
                this.current_clan_all_data = cb;
            };
        });
    };
};

class clan_chat_pop_up_class {
    constructor() {

    };

    init() {
        this.events();
    };

    open() {
        DarkLayerAnimation(clan_chat_pop_up, gameModeCards_Div).then(() => {
            sceneMode.full();
            clanPlaygroundHandler.open();
            clanPlaygroundHandler.generate_field();
        });
    };

    events() {
        clan_chat_back_btn.addEventListener("click", () => {
            DarkLayerAnimation(gameModeCards_Div, clan_chat_pop_up).then(() => {
                sceneMode.default();
            });
        });

        clan_chat_form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
    };
};

class clan_playground_handler {
    constructor() {
        this.playground = clan_chat_playground;
        this.self_character = clan_playground_character;
        this.viewport = clan_playground_viewport;

        this.self_character_coords = { x: 200, y: 200 };
        this.self_character_size = 30;
        this.playground_height = this.playground.clientHeight;
        this.playground_width = this.playground.clientWidth;
        this.clan_level = null;
    };

    init() {
        this.init_character();
        this.character_control();
        this.update_position();
    };

    open() {
        this.playground_height = this.playground.clientHeight;
        this.playground_width = this.playground.clientWidth;
    };

    generate_field() {
        // this.clan_level = newClan.current_clan_all_data["level"];
        this.clan_level = 40;

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
    };

    init_character() {
        DisplayPlayerIcon_at_el(this.self_character,
            localStorage.getItem("userInfoClass"),
            localStorage.getItem("userInfoColor"),
            localStorage.getItem("UserIcon")
        );
        this.self_character.classList.add("clan_playground_character");
    };

    character_control() {
        this.playground.addEventListener("click", (e) => {
            this.playground.focus();
        });

        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    if (clanPlaygroundHandler.self_character_coords["y"] > 0) {
                        clanPlaygroundHandler.self_character_coords.y = clanPlaygroundHandler.self_character_coords.y - 5;
                    };
                    break;

                case "ArrowDown":
                    if (clanPlaygroundHandler.self_character_coords["y"] < this.playground_height - this.self_character_size * 4) {
                        clanPlaygroundHandler.self_character_coords.y = clanPlaygroundHandler.self_character_coords.y + 5;
                    };
                    break;

                case "ArrowLeft":
                    if (clanPlaygroundHandler.self_character_coords["x"] > 0) {
                        clanPlaygroundHandler.self_character_coords.x = clanPlaygroundHandler.self_character_coords.x - 5;
                    };
                    break;

                case "ArrowRight":
                    if (clanPlaygroundHandler.self_character_coords["x"] < this.playground_width - this.self_character_size) {
                        clanPlaygroundHandler.self_character_coords.x = clanPlaygroundHandler.self_character_coords.x + 5;
                    };
                    break;
            };

            clanPlaygroundHandler.update_position();
        });
    };

    update_position() {
        this.self_character.style.left = `${this.self_character_coords.x}px`;
        this.self_character.style.top = `${this.self_character_coords.y}px`;

        // Kamera zentrieren
        const viewportWidth = this.viewport.clientWidth;
        const viewportHeight = this.viewport.clientHeight;
        const offsetX = this.self_character_coords.x - viewportWidth / 2;
        const offsetY = this.self_character_coords.y - viewportHeight / 2;

        // this.playground.style.left = `${-offsetX}px`;
        // this.playground.style.top = `${-offsetY}px`;
    };
};

let newClan = new clan();
newClan.init();

let clan_chat = new clan_chat_pop_up_class();
clan_chat.init();

let clanPlaygroundHandler = new clan_playground_handler();
clanPlaygroundHandler.init();