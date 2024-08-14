// Everything about the achievements functionality
class Achievements {
    constructor() {
        this.achievementNames = [
            "The wanderer", // 0
            "The warrior", // 1
            "The ambitious", // 2
            "The extreme", // 3
            "First steps", // 4
            "Getting better…", // 5
            "Woah! Professional", // 6
            "Master", // 7
            "Champion", // 8
            "Invincible", // 9
            "Perfectionist", // 10
            "gras?", // 11
            "The chosen", // 12
            "Shop keeper", // 13
            "The conquerer", // 14
            "The creator", // 15
            "Mysterious paper", // 16

            "The player", // 17
            "The embracer", // 18
            "The supporter", // 19
            "The enjoyer", // 20
            "The socialiser", // 21
            "The creative", // 22
            "The builder", // 23
            "Never Give Up?", // 24
            "Criminal or just social?", // 25
        ];

        this.taskList = [
            "Complete the advanture map", // 0
            "Beat Oculum Solis on the adventure map", // 1
            "Unlock 30x30 field", // 2
            "Unlock 40x40 field", // 3
            "Get 1 online game win", // 4
            "Get 5 online game wins", // 5
            "Get 25 online game wins", // 6
            "Get 70 online game wins", // 7
            "Get 120 online game wins", // 8
            "Get 200 online game wins", // 9
            "Get 400 online game wins", // 10
            "Get 500 online game wins", // 11
            "Get 5000 online game wins", // 12
            "Purchase a skin for the first time using in-game currency", // 13
            "Verify a level for the first time", // 14
            "Publish a level for the first time", // 15
            "Collect 10 encrypted writings", // 16

            "Complete 10 user created level", // 17
            "Complete 50 user created level", // 18
            "Give 20 levels a rating", // 19
            "Play against 10 random player", // 20
            "Play against 50 random player", // 21
            "Create 5 costum patterns", // 22
            "Create 5 costum fields", // 23
            "Loose 100 times", // 24
            "Get a clan member", // 25
        ];

        this.reward_amount = {
                0: [1000, 12],
                1: [100, 2, 10],
                2: [100, 1],
                3: [250, 1],
                4: [125],
                5: [150, 1],
                6: [250, 1],
                7: [500, 1],
                8: [300, 2],
                9: [750, 1],
                10: [750, 1],
                11: [750, 1],
                12: [9999, 20],
                13: [50, 1],
                14: [100, 1],
                15: [250],
                16: [100, 1, 20],
                17: [1],
                18: [1],
                19: [1],
                20: [1],
                21: [1],
                22: [1],
                23: [1],
                24: [1],
                25: [1]
            },

            this.reward_names = {
                0: ["GemsItem", "ItemX"],
                1: ["GemsItem", "ItemX", "keys"],
                2: ["GemsItem", "ItemX"],
                3: ["GemsItem", "ItemX"],
                4: ["GemsItem"],
                5: ["GemsItem", "ItemX"],
                6: ["GemsItem", "ItemX"],
                7: ["GemsItem", "ItemX"],
                8: ["GemsItem", "ItemX"],
                9: ["GemsItem", "ItemX"],
                10: ["GemsItem", "ItemX"],
                11: ["GemsItem", "ItemX"],
                12: ["GemsItem", "ItemX"],
                13: ["GemsItem", "ItemX"],
                14: ["GemsItem", "ItemX"],
                15: ["GemsItem"],
                16: ["GemsItem", "ItemX", "keys"],

                17: ['bone'],
                18: ['atom'],
                19: ['calendar-check'],
                20: ['poo'],
                21: ['face-meh'],
                22: ['cat'],
                23: ['frog'],
                24: ['dog'],
                25: ['paint-roller'],
            },

            this.achievementImg = [
                "assets/game/warlock-eye.svg",
                "assets/game/cursed-star.svg",
                "assets/game/battle-axe.svg",
                "assets/game/sunken-eye.svg",
                "assets/game/gluttonous-smile.svg",
                "assets/game/semi-closed-eye.svg",
                "assets/game/crystal-eye.svg",
                "assets/game/wolf-head.svg",
                "assets/game/fire-iris.svg",
                "assets/game/minerals.svg",
                "assets/game/laurels-trophy.svg",
                "assets/game/crystal-bars.svg",
                "assets/game/lock-spy.svg",
                "assets/game/tied-scroll.svg",
                "assets/game/stone-crafting-white.svg",
                "assets/game/holy-grail.svg",
                "assets/game/wax-tablet.svg",

                "assets/game/fire-iris.svg",
                "assets/game/minerals.svg",
                "assets/game/laurels-trophy.svg",
                "assets/game/crystal-bars.svg",
                "assets/game/lock-spy.svg",
                "assets/game/tied-scroll.svg",
                "assets/game/stone-crafting-white.svg",
                "assets/game/holy-grail.svg",
                "assets/game/wax-tablet.svg",
            ];

        this.unlocked = {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
            13: false,
            14: false,
            15: false,
            16: false,
            17: false,
            18: false,
            19: false,
            20: false,
            21: false,
            22: false,
            23: false,
            24: false,
            25: false
        };

        this.achievements = {};
    }

    Init = () => {
        this.AchievementLockState();
        this.initializeAchievements();
        this.generate();
    };

    AchievementLockState = () => {
        let storage = localStorage.getItem("AchievementLockState");
        // console.log(storage);
        if (!storage) {
            localStorage.setItem("AchievementLockState", JSON.stringify(this.unlocked));

        } else {
            this.unlocked = JSON.parse(storage);
        };
    };

    initializeAchievements() {
        this.achievementNames.forEach((name, index) => {
            this.achievements[index] = {
                name: name,
                task: this.taskList[index],
                reward_names: this.reward_names[index],
                reward_amount: this.reward_amount[index],
                img: this.achievementImg[index],
                unlocked: this.unlocked[index]
            };
        });
    };

    generate = () => {
        Achievements_list.textContent = null;
        for (const [index, achievement] of Object.entries(this.achievements)) {
            const listItem = document.createElement('li');
            listItem.classList = "achievement_item";
            listItem.setAttribute('achievement_id', index);
            listItem.setAttribute('achievement_name', achievement.name);

            let wrapper = document.createElement("div");

            const h2 = document.createElement('h2');
            h2.textContent = achievement.name;
            wrapper.appendChild(h2);

            const rewardContainer = document.createElement('div');
            rewardContainer.style.display = "flex";
            rewardContainer.style.gap = "0.5em";

            listItem.addEventListener("click", () => {
                AlertText.textContent = achievement.task;
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                OpenedPopUp_WhereAlertPopUpNeeded = true;
            });

            // absolute pos. element
            let i_abso = document.createElement("i");
            i_abso.style.position = "absolute";
            i_abso.style.fontWeight = "600";
            i_abso.className = "fa-solid fa-check";
            i_abso.style.fontSize = "3vh";
            i_abso.style.right = "20px";
            i_abso.style.top = "0";
            i_abso.style.bottom = "0";
            i_abso.style.margin = "auto 0 auto auto";
            i_abso.style.display = "flex";
            i_abso.style.alignItems = "center";
            i_abso.style.color = "var(--line-color)";

            i_abso.classList.add("achievement_check_icon");

            i_abso.style = `
            position: absolute;
            font-weight: 600;
            font-size: 5vh;
            inset: 0 1vw 0 93%;
            bottom: 0px;
            margin: auto 0px auto auto;
            display: flex;
            align-items: center;
            color: var(--line-color);
        `;

            let img = document.createElement("img");
            img.src = achievement["img"];
            img.style = `    width: 10vh;
                            height: 10vh;`;

            for (let i = 0; i < achievement.reward_names.length; i++) {
                // list item style depends on its completion
                listItem.style.borderColor = !achievement.unlocked ? "#060708" : "var(--line-color)";

                if (!achievement.unlocked) {
                    listItem.addEventListener('mouseenter', () => listItem.classList.add('hovered'));
                    listItem.addEventListener('mouseleave', () => listItem.classList.remove('hovered'));

                } else {
                    listItem.appendChild(i_abso);
                };

                const span = document.createElement('span');
                span.classList = "achievement_list_item_reward_wrapper";
                span.setAttribute('achievement_reward_id', i);

                let fontawesome_code = (achievement.reward_names[i] === "GemsItem") ? "fa-solid fa-gem" : (achievement.reward_names[i] === "ItemX") ? "fa-solid fa-x" : "fa-solid fa-key";

                const i_el = document.createElement('i');
                i_el.classList = fontawesome_code;

                const p = document.createElement('p');
                p.textContent = achievement.reward_amount[i];

                if (achievement.reward_names[i] != "GemsItem" && achievement.reward_names[i] != "ItemX") {
                    let user_has_skin = skins[achievement.reward_names[i]];

                    if (user_has_skin) {
                        fontawesome_code = "fa-solid fa-gem";
                        p.textContent = '250';

                    } else {
                        fontawesome_code = `fa solid fa-${achievement.reward_names[i]}`;
                    };
                };

                span.appendChild(i_el);
                span.appendChild(p);
                rewardContainer.appendChild(span);
            };

            wrapper.appendChild(rewardContainer);
            listItem.appendChild(img);
            listItem.appendChild(wrapper);
            Achievements_list.appendChild(listItem);
        };
    };

    // user unlocked new achievement
    // simply check all requirements and refresh
    new = (index) => {
        // Get all achievements which are not unlocked
        let requirements = Object.keys(this.unlocked).filter(idx => this.unlocked[idx] !== true).map(Number);
        // console.log(requirements);

        // this achievement is already done
        if (!requirements.includes(index)) return;

        let onlineMatches = parseInt(localStorage.getItem("onlineMatches-won"));
        let completed_mapLevel10 = localStorage.getItem("completed_mapLevel10");
        let completed_mapLevel4 = localStorage.getItem("completed_mapLevel4");

        switch (index) {
            case 0: // complete advanture map
                if (!completed_mapLevel10 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 1: // beat first map advanture boss and complete the level
                if (completed_mapLevel4 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 2: // unlocked 30x30 field
                if (onlineMatches >= 10 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 3: // unlocked 40x40 field
                if (onlineMatches >= 30 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 4: // online wins 1
                if (onlineMatches >= 1 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 5: // online wins
                if (onlineMatches >= 5 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 6: // online wins 
                if (onlineMatches >= 25 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 7: // online wins 
                if (onlineMatches >= 70 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 8: // online wins 
                if (onlineMatches >= 120 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 9: // online wins 
                if (onlineMatches >= 200 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 10: // online wins 
                if (onlineMatches >= 400 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 11: // online wins 
                if (onlineMatches >= 500 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 12: // online wins 
                if (onlineMatches >= 5000 && !this.unlocked[index]) {
                    this.unlock_achievement(index);
                };
                break;
            case 13: // buy skin for the first time
                (!localStorage.getItem("UserBoughtSkinForTheFirstTime") && !this.unlocked[index]) && this.unlock_achievement(index);
                break;
            case 14: // beat your own level for the firs time to be able to publish it
                (!localStorage.getItem("UserVerifiedLevelForTheFirstTime") && !this.unlocked[index]) && this.unlock_achievement(index);
                break;
            case 15: // publish your own level for the first time
                (!localStorage.getItem("UserPublishedLevelForTheFirstTime") && !this.unlocked[index]) && this.unlock_achievement(index);
                break;
            case 16: // collect 10 encrypted writings
                (!localStorage.getItem("UserGot10EncryptedWritings") && !this.unlocked[index]) && this.unlock_achievement(index);
                break;

            case 17:
                if (ConqueredPlayerCreatedLevel() >= 10) this.unlock_achievement(index);
                break;
            case 18:
                if (ConqueredPlayerCreatedLevel() >= 50) this.unlock_achievement(index);
                break;
            case 19:
                if (GiveRatingToLevel() >= 20) this.unlock_achievement(index);
                break;
            case 20:
                if (PlayedAgainstNRandomPlayer() >= 10) this.unlock_achievement(index);
                break;
            case 21:
                if (PlayedAgainstNRandomPlayer() >= 50) this.unlock_achievement(index);
                break;
            case 22:
                if (CreateCostumPatternCounter() >= 5) this.unlock_achievement(index);
                break;
            case 23:
                if (CreateCostumFieldCounter() >= 5) this.unlock_achievement(index);
                break;
            case 24:
                if (LooseCounter() >= 100) this.unlock_achievement(index);
                break;
            case 25:
                OnceAClanMember() && this.unlock_achievement(index);
                break;
        };
    };

    // update html with new reward
    update_html = (X, Gem, key) => {
        KEYicon.textContent = key;
        mapKeyValueDisplay.textContent = key;
        Xicon.textContent = X;
        gemsIcon.textContent = Gem;
    };

    // add reward to storage from unlocked achievement
    add_reward = (achievement) => {
        let names = achievement.reward_names;
        let amount = achievement.reward_amount;

        let X = parseInt(localStorage.getItem("ItemX"));
        let Gems = parseInt(localStorage.getItem("GemsItem"));
        let keys = parseInt(localStorage.getItem("keys"));

        names.forEach((name_of_item, i) => {
            if (name_of_item == "ItemX") {
                X = X + amount[i];

            } else if (name_of_item == "GemsItem") {
                Gems = Gems + amount[i];

            } else if (name_of_item == "keys") {
                keys = keys + amount[i];

            } else { // skin

                if (skins[name_of_item]) { // user already has that skin
                    Gems = Gems + 250;

                } else { // user has not owned the skin. Now he gets it
                    skins[name_of_item] = true;
                    localStorage.setItem('Skins', JSON.stringify(skins));
                };
            };
        });

        // update storage with new values
        localStorage.setItem("ItemX", X);
        localStorage.setItem("GemsItem", Gems);
        localStorage.setItem("keys", keys);

        // update html
        this.update_html(X, Gems, keys);
    };

    // user gets reward + cool pop up animation from above
    unlock_achievement = (index) => {

        // first of all, save in storage
        this.unlocked[index] = true;
        localStorage.setItem("AchievementLockState", JSON.stringify(this.unlocked));

        // add reward to storage
        this.add_reward(this.achievements[index]);

        // get achievement with all its data
        let achievement = this.achievements[index];
        // get corresponding list element from achievements list to just add it to the pop up
        let element = document.querySelector(`[achievement_id="${index}"]`);
        let h2 = document.createElement("h2");
        h2.textContent = "Achievement unlocked!";

        newAchievementUnlockedPopUp.textContent = null;
        newAchievementUnlockedPopUp.appendChild(h2);
        newAchievementUnlockedPopUp.appendChild(element.cloneNode(true));
        newAchievementUnlockedPopUp.querySelector(`[achievement_id="${index}"]`).className = "newAchievementContent";

        // delete img element from list element in achievement pop up + manipulate other things
        newAchievementUnlockedPopUp.querySelector("li").querySelector("img").remove();
        newAchievementUnlockedPopUp.querySelector("li").querySelector(".achievement_check_icon") && newAchievementUnlockedPopUp.querySelector("li").querySelector(".achievement_check_icon").remove();
        newAchievementUnlockedPopUp.querySelector("li").querySelector("div").style.display = "flex";
        newAchievementUnlockedPopUp.querySelector("li").querySelector("div").style.flexDirection = "column";
        newAchievementUnlockedPopUp.querySelector("li").querySelector("div").style.alignItems = "center";

        // sound
        play_rewardSound();
        // animation
        newAchievementUnlockedPopUp.style.transition = "top 0.15s ease-in-out, opacity 0.1s ease-in";
        newAchievementUnlockedPopUp.style.opacity = "1";
        newAchievementUnlockedPopUp.style.top = "20px";
        setTimeout(() => {
            newAchievementUnlockedPopUp.style.transition = "top 0.15s ease-in-out, opacity 0.75s ease-out";
            newAchievementUnlockedPopUp.style.opacity = "0";
            setTimeout(() => {
                newAchievementUnlockedPopUp.style.top = "-25%";
            }, 800);
        }, 4000);
    };
};

let Achievement = new Achievements();
Achievement.Init();

// events
AchievementsBtn.addEventListener("click", () => {
    XP_Journey.style.display = "none";
    Achievement.Init();
    DisplayPopUp_PopAnimation(AchievementsPopUp, "flex", true);
});

AchievementsCloseBtn.addEventListener("click", () => {
    AchievementsPopUp.style.display = "none";
    DarkLayer.style.display = "none";
});