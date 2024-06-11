// User wants to create a new online level
class NewLevel {
    constructor(bgcolor1 = 0, bgcolor2 = 0, requiredpoints = 10, playertimer = 2, icon = 7, bgmusic = 0, allowedpatterns = [
        "hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
        "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2", "branch3", "branch4", "special1", "special2"
    ], cellgrid = 4, name = "Your level name", status = 0, isSaved = true, id = 0, selectedLevel = undefined, costumPatterns = {}, costumField = {}) {

        this.PossibleColors = {
            0: "#ffffff00",
            1: "#6a676780",
            2: "#00000080",
            3: "#91212180",
            4: "#66282880",
            5: "#401f3b80",
            6: "#203a2080",
            7: "#50542780",
            8: "#1a476a80",
            9: "#7e211a7a",
            10: "#481d0f99",
            11: "#ffffff0f"
        };

        this.Settings = {
            "bgcolor1": this.PossibleColors,
            "bgcolor2": this.PossibleColors,

            "requiredpoints": {
                0: 10
            },
            "playertimer": {
                0: 5,
                1: 15,
                2: 30,
                3: 50,
                4: 70
            },
            "levelicon": {
                0: "assets/game/wolf-head.svg",
                1: "assets/game/winged-sword.svg",
                2: "assets/game/warlock-eye.svg",
                3: "assets/game/sunken-eye.svg",
                4: "assets/game/ore.svg",
                5: "assets/game/minerals.svg",
                6: "assets/game/crystal-eye.svg",
                7: "assets/game/fangs.svg",
                8: "assets/game/bleeding-eye.svg",
                9: "assets/game/crystal-bars.svg",
                10: "assets/game/battle-axe.svg",
                11: "assets/game/tribal-mask.svg",
                12: "assets/game/shattered-sword.svg",
                13: "assets/game/gluttonous-smile.svg",
                14: "assets/game/book-cover.svg"
            },
            "bgmusic": {
                0: "no bg music",
                1: "assets/Maps/Quick_Death.mp3",
                2: "assets/Maps/March_into_fire.mp3",
                3: "assets/Maps/Long_Funeral.mp3",
                4: "assets/Maps/Impossible_survival.mp3",
                5: "assets/Maps/Merciful_slaughter.mp3",
                6: "assets/Maps/Ground_destroyer.mp3",
                7: "assets/Maps/Tunnel_of_truth.mp3",
            },
            "allowedpatterns": {
                0: [
                    "hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
                    "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2", "branch3", "branch4", "special1", "special2"
                ]
            },
            "cellgrid": {
                0: 5,
                1: 10,
                2: 15,
                3: 20,
                4: 25,
                5: 30
            }
        };

        this.CurrentSelectedSetting = {
            "bgcolor1": bgcolor1, // selection
            "bgcolor2": bgcolor2, // selection

            "requiredpoints": requiredpoints, // costum
            "playertimer": playertimer, // selection
            "levelicon": icon, // selection,
            "bgmusic": bgmusic,

            "allowedpatterns": allowedpatterns,
            "cellgrid": cellgrid, // selection
            "name": name, // costum
            "status": status, // 0: unpublished 1: published
            "isSaved": isSaved,
            "id": id,

            "costumPatterns": costumPatterns,
            // how this object looks like:
            // { 
            //     patternName: {
            //         name: patternName,
            //         structure: [0,1,2,3,4]
            //     }
            // }

            "costumField": costumField,
            // example:
            // name: "costumFieldNameFromUser",
            // x: 5,
            // y: 5
        };

        // on every input the player does to the affection of the current level has to be recognized and saved in the history
        // by saving the level the history will be deleted
        this.history = {
            // All types of settings can be here
        };
        this.historyIndex = 0;

        // user selected level in level list
        this.selectedLevel = selectedLevel;

        // which action should be done after the user hit an option in the save warning pop up?
        // Does he originally wanted to leave or go to the level list
        this.ActionAfterSaveOrNotSaveButton = "leave";

        // Is the player in searching mode ?
        this.Searching = false;
    };

    // Init new Level
    Init = (DisplayWorkbench) => {
        // check for localstorage object
        if (!localStorage.getItem("SavedLevels")) {
            localStorage.setItem("SavedLevels", "{}");
        };

        // Display workbench and undisplay level list
        if (!DisplayWorkbench) {
            this.StartLevelList();
        } else {
            this.StartWorkbench();
        };
        // Init current settings
        this.InitCurrentSettings(this.CurrentSelectedSetting.bgmusic, this.CurrentSelectedSetting.bgcolor1, this.CurrentSelectedSetting.bgcolor2,
            this.CurrentSelectedSetting.requiredpoints, this.CurrentSelectedSetting.playertimer, this.CurrentSelectedSetting.levelicon, this.CurrentSelectedSetting.cellgrid,
            this.CurrentSelectedSetting.allowedpatterns, this.CurrentSelectedSetting.status, this.CurrentSelectedSetting.name, this.CurrentSelectedSetting.id,
            this.CurrentSelectedSetting.costumPatterns, this.CurrentSelectedSetting.costumField);

        // Init carets
        this.InitInput();

        // Bug fix
        document.querySelector(".lobby-footer").style.width = "10%";
        document.querySelector(".lobby-footer").style.margin = "0 auto 0 auto";
    };

    // Many Functions 

    SaveInHistory = (type, newVal) => {
        this.history[this.historyIndex] = [type, newVal];
        this.historyIndex++;
    };

    // back to history
    UndoHistory = () => {
        if (Object.keys(this.history)[this.historyIndex - 1]) { // if there is a previous item in history
            // delete current state in history
            delete this.history[this.historyIndex];

            // decrease history position
            this.historyIndex--;

            let previousStepInHistory = this.history[this.historyIndex];
            this.CurrentSelectedSetting[previousStepInHistory[0]] = previousStepInHistory[1];

            console.log(this.history, previousStepInHistory[0], previousStepInHistory[1], this.historyIndex, this.CurrentSelectedSetting);

            // Refresh current settings
            this.InitCurrentSettings(this.CurrentSelectedSetting.bgmusic, this.CurrentSelectedSetting.bgcolor1, this.CurrentSelectedSetting.bgcolor2,
                this.CurrentSelectedSetting.requiredpoints, this.CurrentSelectedSetting.playertimer, this.CurrentSelectedSetting.levelicon, this.CurrentSelectedSetting.cellgrid,
                this.CurrentSelectedSetting.allowedpatterns, this.CurrentSelectedSetting.status, this.CurrentSelectedSetting.name, this.CurrentSelectedSetting.id,
                this.CurrentSelectedSetting.costumPatterns, this.CurrentSelectedSetting.costumField);
        };
    };

    // Delete and completely remove and kill created level
    Delete = () => {
        // history is empty which means no settings where made so nothing to delete
        if (Object.keys(this.history).length >= 0) {
            return;

        } else {
            this.history = {};
        };
    };

    // Save level in database
    Save = () => {
        return new Promise((done) => {
            DarkLayer.style.display = "block";
            // check if there is something to save
            if (this.history != {}) {
                try {
                    socket.emit("SaveCurrentLevel", localStorage.getItem("PlayerID"), this.CurrentSelectedSetting, cb => {
                        this.CurrentSelectedSetting.id = cb; // cb: id generated by database for level
                        workbench_levelID_display.textContent = `ID ${this.CurrentSelectedSetting.id}`;

                        // save level in localstorage
                        let SavedLevels = JSON.parse(localStorage.getItem("SavedLevels"));
                        SavedLevels[this.CurrentSelectedSetting.id] = this.CurrentSelectedSetting;
                        localStorage.setItem("SavedLevels", JSON.stringify(SavedLevels));

                        // copy saved information from current settings object to current selected level object so everything is equally updated
                        if (this.selectedLevel != undefined) {
                            this.selectedLevel[0] = this.CurrentSelectedSetting.bgcolor1;
                            this.selectedLevel[1] = this.CurrentSelectedSetting.bgcolor2;
                            this.selectedLevel[2] = this.CurrentSelectedSetting.requiredpoints;
                            this.selectedLevel[3] = this.CurrentSelectedSetting.playertimer
                            this.selectedLevel[4] = this.CurrentSelectedSetting.levelicon
                            this.selectedLevel[5] = this.CurrentSelectedSetting.bgmusic
                            this.selectedLevel[6] = this.CurrentSelectedSetting.allowedpatterns
                            this.selectedLevel[7] = this.CurrentSelectedSetting.cellgrid
                            this.selectedLevel[8] = this.CurrentSelectedSetting.name
                            this.selectedLevel[9] = this.CurrentSelectedSetting.status
                            this.selectedLevel[11] = this.CurrentSelectedSetting.id
                            this.selectedLevel[15] = this.CurrentSelectedSetting.costumPatterns
                            this.selectedLevel[16] = this.CurrentSelectedSetting.costumField
                        };

                        this.history = {};
                        DarkLayer.style.display = "none";
                        done();
                    });

                } catch (error) {
                    console.log(error);
                    AlertText.textContent = "Something went wrong!";
                    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                    return false;
                };
            };
        });
    };

    // display workbench
    StartWorkbench = (DisplayWorkbench) => {
        CreateLevel_Workbench.style.display = "flex";
        CreateLevel_LevelList.style.display = "none";

        ShowLevelListBtn.style.display = "flex";
        ShowWorkbenchBtn.style.display = "none";

        CreateLevel_Title.textContent = "Workbench";
        UndoChangeBtn.style.display = "block";

        SearchLevelsBtn.style.display = "none";
        CloseSearchLevelsBtn.style.display = "none";
        SearchLevelInputWrapper.style.display = "none";
        CreateLevel_Title.style.display = "block";


        if (this.CurrentSelectedSetting.id == 0) {
            workbench_levelID_display.textContent = "ID none";
        } else {
            workbench_levelID_display.textContent = `ID ${this.CurrentSelectedSetting.id}`;
        };

        // If other level selected paste its data into current settings
        if (this.selectedLevel != undefined) {

            this.InitCurrentSettings(this.selectedLevel[5], this.selectedLevel[0], this.selectedLevel[1], this.selectedLevel[2], this.selectedLevel[3], this.selectedLevel[4],
                this.selectedLevel[7], this.selectedLevel[6], this.selectedLevel[9], this.selectedLevel[8], this.selectedLevel[11], this.selectedLevel[15], this.selectedLevel[16]);
        };

        // level music preview stuff
        CheckForBGmusic();

        // costum field from user stuff
        this.drawCostumUserField();
    };

    // display level list
    StartLevelList = (Display, DisplayList) => {

        console.log(DisplayList);

        // get levels user created
        if (DisplayList == undefined) {
            try {
                socket.emit("RequestLevels", localStorage.getItem("PlayerID"), levels => {
                    console.log(levels);

                    if (levels.length <= 0) { // no levels
                        [...LevelList_list.querySelectorAll("li")].forEach(el => el.remove());
                        ReplaceText_Levellist[1].style.display = "flex";

                    } else { // create level display
                        ReplaceText_Levellist[1].style.display = "none";
                        [...LevelList_list.querySelectorAll("li")].forEach(el => el.remove());

                        // create every single level
                        levels.forEach(level => {
                            this.AddLevelToList(level);
                        });
                    };
                });

            } catch (error) {
                console.log(error);
                AlertText.textContent = "Levels could not be loaded! Something is wrong...";
                DarkLayer.style.display = "block";
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
            };
        };

        if (Display == false) {
            UndoChangeBtn.style.display = "block";
            SearchLevelsBtn.style.display = "none";
            CreateLevel_LevelList.style.display = "none";
            CreateLevel_Workbench.style.display = "flex";
            ShowLevelListBtn.style.display = "flex";
            ShowWorkbenchBtn.style.display = "none";
            CreateLevel_Title.textContent = "Workbench";

        } else {
            UndoChangeBtn.style.display = "none";
            SearchLevelsBtn.style.display = "block";
            CreateLevel_LevelList.style.display = "flex";
            CreateLevel_Workbench.style.display = "none";
            ShowLevelListBtn.style.display = "none";
            ShowWorkbenchBtn.style.display = "flex";
            CreateLevel_Title.textContent = "Your created Levels";
        };

        LevelList_PublishStatusDisplay.style.display = "none";
        LevelList_createDateDisplay.style.display = "none";

        PublishLevelBtn.style.display = "none";
        unpublishLevelBtn.style.display = "none";
        PreviewLevelBtn.style.display = "none";

        if (this.selectedLevel == undefined) {
            CurrentSelectedLevel_Display.textContent = "selected level: ";

        } else {
            CurrentSelectedLevel_Display.textContent = `selected level: ${this.selectedLevel[8]} - ID ${this.selectedLevel[11]}`;

            LevelList_PublishStatusDisplay.style.display = "block";
            LevelList_createDateDisplay.style.display = "block";

            if (this.selectedLevel[9] == 0) {
                // Display publish level buttons right
                PublishLevelBtn.style.display = "block";
                unpublishLevelBtn.style.display = "none";

                LevelList_PublishStatusDisplay.textContent = "unpublished";
                LevelList_PublishStatusDisplay.style.color = "rgb(255, 152, 0)";

            } else {
                // Display publish level buttons right
                PublishLevelBtn.style.display = "none";
                unpublishLevelBtn.style.display = "block";

                LevelList_PublishStatusDisplay.textContent = `published - ${this.selectedLevel[12]}`;
                LevelList_PublishStatusDisplay.style.color = "lawngreen";
            };

            const dateParts = JSON.parse(this.selectedLevel[14]).split("T")[0].split("-");
            const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;

            LevelList_createDateDisplay.textContent = `creation date ${formattedDate}`;
        };
    };

    AddLevelToList = (level, correspondPlayer) => {
        let li = document.createElement("li");
        li.classList = "Level_InLevelList";

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
            PlayerNameP.addEventListener("click", () => {
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
            // console.log(level, level.CreatorBeatIt, level.costum_patterns);

            this.selectedLevel = [parseInt(level.bg1), parseInt(level.bg2), level.required_points, level.player_timer, parseInt(level.icon), parseInt(level.bg_music), JSON.parse(level.pattern), level.field, level.level_name, level.level_status,
                true, level.id, level.publish_date, level.CreatorBeatIt, level.creation_date, JSON.parse(level.costum_patterns), JSON.parse(level.costum_field)
            ];

            CurrentSelectedLevel_Display.textContent = `selected level: ${this.selectedLevel[8]} - ID ${this.selectedLevel[11]}`;

            if (!this.Searching) LevelList_PublishStatusDisplay.style.display = "block";
            LevelList_createDateDisplay.style.display = "block";

            if (level.level_status == 0) {
                // Display publish level buttons right
                if (!this.Searching) {
                    PublishLevelBtn.style.display = "block";
                    unpublishLevelBtn.style.display = "none";

                    EditLevelBtn_ListBtn.style.display = "block";
                    RemoveLevelBtn.style.display = "block";
                    PreviewLevelBtn.style.display = "none";

                } else {
                    PublishLevelBtn.style.display = "none";
                    unpublishLevelBtn.style.display = "none";
                    PreviewLevelBtn.style.display = "none";
                };

                LevelList_PublishStatusDisplay.textContent = "unpublished";
                LevelList_PublishStatusDisplay.style.color = "rgb(255, 152, 0)";

            } else {
                // Display publish level buttons right
                if (!this.Searching) {
                    PublishLevelBtn.style.display = "none";
                    unpublishLevelBtn.style.display = "block";
                    PreviewLevelBtn.style.display = "block";

                } else {
                    PublishLevelBtn.style.display = "none";
                    unpublishLevelBtn.style.display = "none";
                    PreviewLevelBtn.style.display = "none";
                };

                EditLevelBtn_ListBtn.style.display = "none";
                RemoveLevelBtn.style.display = "none";

                const dateParts = JSON.parse(level.publish_date).split("T")[0].split("-");
                const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;

                LevelList_PublishStatusDisplay.textContent = `published - ${formattedDate}`;
                LevelList_PublishStatusDisplay.style.color = "lawngreen";
            };

            const dateParts = JSON.parse(level.creation_date).split("T")[0].split("-");
            const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;

            LevelList_createDateDisplay.textContent = `creation date ${formattedDate}`;
        });

        span1.appendChild(img);
        div1.appendChild(span);
        div1.appendChild(span1)
        li.appendChild(div1);
        li.appendChild(div2);
        LevelList_list.appendChild(li);
    };

    // Generate field on given xy length
    GenerateField = async(x, y, workbench_grid = workbench_cellGrid) => {
        workbench_grid.textContent = null;
        workbench_LevelFieldSize_Display.textContent = `${x}x${y}`;

        for (let i = 0; i < x * y; i++) {
            // create single cell
            let cell = document.createElement('div');
            cell.className = "cell createlevelscene_cell";
            cell.setAttribute('cell-index', i);

            workbench_grid.appendChild(cell);
        };

        let smallerCoord = x > y ? y : x;

        workbench_grid.style.gridTemplateColumns = `repeat(${x}, 1fr)`;

        if (x !== y) {

            if (x > y) {
                workbench_grid.style.gridAutoRows = "min-content";
                StaticCellScale(workbench_grid);

                workbenchMiddle_main.style.display = "flex";
                workbench_grid.style.height = "auto";
                workbench_grid.style.overflow = "unset";
                workbenchMiddle_main.style.overflow = "unset";
                // workbench_cellGrid.style.minHeight = "-webkit-fill-available";
                // workbenchMiddle_main.style.overflow = "scroll";

            } else if (x < y) {
                workbench_grid.style.height = "100vh";
                workbench_grid.style.overflow = "scroll";
                workbenchMiddle_main.style.overflow = "scroll";
                // workbenchMain_middle.style.position = "fixed";
                workbenchMiddle_main.style.display = "block";
                workbenchMiddle_main.style.height = "55%";
                document.querySelector(".workbenchMain_left").style.width = "25%";
                document.querySelector(".workbenchMain_right").style.width = "17.5%";
                // workbench_cellGrid.style.minHeight = "var(--max-cellGrid-size)"

                workbench_grid.style.gridAutoRows = "unset";
            };

        } else if (x === y) {
            workbenchMiddle_main.style.display = "flex";
            workbench_grid.style.gridAutoRows = "unset";
            workbench_grid.style.height = "auto";
            workbench_grid.style.overflow = "unset";
            workbenchMiddle_main.style.overflow = "unset";
            // workbench_cellGrid.style.height = "";
            // workbenchMiddle_main.style.display = "flex";
            // workbenchMiddle_main.style.overflow = "unset";
            // workbench_cellGrid.style.minHeight = "var(--max-cellGrid-size)"
        };
    };

    // Init current settings on level
    InitCurrentSettings = (music, bg1, bg2, points, clock, icon, field, patterns, status, name, id, costumPatterns, costumField) => {
        // console.log(music, bg1, bg2, points, clock, icon, field, patterns, status, name, id, costumPatterns);

        // bg music 
        if (music !== undefined) {
            LevelMusicDisplay.textContent = this.Settings.bgmusic[music].replace("assets/Maps/", "");
            this.CurrentSelectedSetting.bgmusic = music;
        };
        // bg colors
        if (bg1 !== undefined) {
            levelBackgroundColor_HexDisplay1.textContent = this.PossibleColors[bg1];
            levelBackgroundColor_ColorDisplay1.style.backgroundColor = this.PossibleColors[bg1];
            this.CurrentSelectedSetting.bgcolor1 = bg1;
        };
        if (bg2 !== undefined) {
            levelBackgroundColor_HexDisplay2.textContent = this.PossibleColors[bg2];
            levelBackgroundColor_ColorDisplay2.style.backgroundColor = this.PossibleColors[bg2];
            this.CurrentSelectedSetting.bgcolor2 = bg2;
        };
        // required points to win
        if (points !== undefined) {
            this.CurrentSelectedSetting.requiredpoints = points;
            levelRequiredPointsToWinDisplay.textContent = this.CurrentSelectedSetting.requiredpoints;
        };
        // player timer
        if (clock !== undefined) {
            levelPlayerClockDisplay.textContent = `${this.Settings.playertimer[clock]} sec.`;
            this.CurrentSelectedSetting.playertimer = clock;
        };
        // level icon
        if (icon !== undefined) {
            LevelIconDisplay.src = this.Settings.levelicon[icon];
            this.CurrentSelectedSetting.levelicon = icon;
        };
        // field size
        if (field !== undefined) {
            this.CurrentSelectedSetting.cellgrid = field;
            this.GenerateField(this.Settings.cellgrid[field], this.Settings.cellgrid[field]);
        };
        // allowed patterns
        if (patterns !== undefined) {
            this.InitPatterns(patterns);
            this.CurrentSelectedSetting.allowedpatterns = patterns;
        };
        // set publish status
        if (status !== undefined) {
            this.CurrentSelectedSetting.status = status;
            if (status == 1) {
                worbench_LevelStatus.style.color = "lawngreen";
                worbench_LevelStatus.textContent = "published";

            } else if (status == 0) {
                worbench_LevelStatus.style.color = "#ff9800"; // orange
                worbench_LevelStatus.textContent = "unpublished";
            };
        };
        // set name
        if (name !== undefined) {
            this.CurrentSelectedSetting.name = name;
            workbench_LevelName_Display.textContent = this.CurrentSelectedSetting.name;
        };
        // set id
        if (id !== undefined) {
            this.CurrentSelectedSetting.id = id;
            if (this.CurrentSelectedSetting.id == 0) {
                workbench_levelID_display.textContent = "ID none";
            } else {
                workbench_levelID_display.textContent = `ID ${this.CurrentSelectedSetting.id}`;
            };
        };
        // set costum patterns
        if (costumPatterns !== undefined) {
            this.CurrentSelectedSetting.costumPatterns = costumPatterns;
        };
        // set costum field
        if (costumField !== undefined) {
            this.CurrentSelectedSetting.costumField = costumField;
            this.drawCostumUserField();
        };
    };

    // Init Carets of workbench 
    InitInput = () => {
        // first, remove all event listener to prevent multiple ones which are causing bugs
        ChangeSetting_leftCaret_All.forEach(caret => { caret.removeEventListener("click", caret.fn) });
        ChangeSetting_rightCaret_All.forEach(caret => { caret.removeEventListener("click", caret.fn) });
        levelRequiredPointsToWinDisplay.removeEventListener("keyup", levelRequiredPointsToWinDisplay.fn);
        workbench_LevelName_Display.removeEventListener("keyup", workbench_LevelName_Display.fn);
        UndoChangeBtn.removeEventListener("click", UndoChangeBtn.fn);

        // update data on caret input
        ChangeSetting_leftCaret_All.forEach(caretLeft => {
            caretLeft.addEventListener("click", caretLeft.fn = () => {
                let forSetting = caretLeft.getAttribute("for");
                let correspondingCurrentSetting = this.CurrentSelectedSetting[forSetting]; // index as int

                if (correspondingCurrentSetting <= 0) {
                    return;

                } else {
                    // update value in current setting object
                    this.CurrentSelectedSetting[forSetting] = correspondingCurrentSetting - 1;

                    // refresh settings
                    this.InitCurrentSettings(this.CurrentSelectedSetting.bgmusic, this.CurrentSelectedSetting.bgcolor1, this.CurrentSelectedSetting.bgcolor2,
                        this.CurrentSelectedSetting.requiredpoints, this.CurrentSelectedSetting.playertimer, this.CurrentSelectedSetting.levelicon, this.CurrentSelectedSetting.cellgrid,
                        this.CurrentSelectedSetting.allowedpatterns, this.CurrentSelectedSetting.status, this.CurrentSelectedSetting.name, this.CurrentSelectedSetting.id,
                        this.CurrentSelectedSetting.costumPatterns, this.CurrentSelectedSetting.costumField);

                    // save in history
                    this.SaveInHistory(forSetting, this.CurrentSelectedSetting[forSetting] + 1);
                };

                CheckForBGmusic();
            });
        });

        // update data on caret input
        ChangeSetting_rightCaret_All.forEach(caretLeft => {
            caretLeft.addEventListener("click", caretLeft.fn = () => {
                let forSetting = caretLeft.getAttribute("for");
                let correspondingSetting = this.Settings[forSetting];
                let correspondingCurrentSetting = this.CurrentSelectedSetting[forSetting]; // index as int

                if (correspondingCurrentSetting >= Object.keys(correspondingSetting).length - 1 && forSetting != "requiredpoints" || forSetting == "requiredpoints" &&
                    correspondingCurrentSetting >= 999) {
                    return;

                } else {
                    // update value in current setting object
                    this.CurrentSelectedSetting[forSetting] = correspondingCurrentSetting + 1;

                    // refresh settings
                    this.InitCurrentSettings(this.CurrentSelectedSetting.bgmusic, this.CurrentSelectedSetting.bgcolor1, this.CurrentSelectedSetting.bgcolor2,
                        this.CurrentSelectedSetting.requiredpoints, this.CurrentSelectedSetting.playertimer, this.CurrentSelectedSetting.levelicon, this.CurrentSelectedSetting.cellgrid,
                        this.CurrentSelectedSetting.allowedpatterns, this.CurrentSelectedSetting.status, this.CurrentSelectedSetting.name, this.CurrentSelectedSetting.id,
                        this.CurrentSelectedSetting.costumPatterns, this.CurrentSelectedSetting.costumField);

                    // save in history
                    this.SaveInHistory(forSetting, this.CurrentSelectedSetting[forSetting] - 1);
                };

                CheckForBGmusic();
            });
        });

        // update data on user input
        levelRequiredPointsToWinDisplay.addEventListener("keyup", levelRequiredPointsToWinDisplay.fn = () => {
            this.CurrentSelectedSetting.requiredpoints = parseInt(levelRequiredPointsToWinDisplay.textContent);

            // save in history
            this.SaveInHistory("requiredpoints", this.CurrentSelectedSetting.requiredpoints);
        });

        workbench_LevelName_Display.addEventListener("keyup", workbench_LevelName_Display.fn = () => {
            this.CurrentSelectedSetting.name = workbench_LevelName_Display.textContent;

            // save in history
            this.SaveInHistory("name", this.CurrentSelectedSetting.name);
        });

        // undo stuff
        UndoChangeBtn.addEventListener("click", UndoChangeBtn.fn = () => { this.UndoHistory() });
    };

    // patterns
    InitPatterns = (patterns) => {
        Workbench_togglePatternBtn.forEach(el => {
            let target = el;
            let TargetFor = target.getAttribute("for-pattern").replace(/_4x4|_5x5/g, "");

            if (patterns.includes(TargetFor)) {
                target.setAttribute("active", "true");
                target.classList.replace("fa-square", "fa-square-check");

            } else {
                target.setAttribute("active", "false");
                target.classList.replace("fa-square-check", "fa-square");
            };
        });
    };

    // init pattern checkbox display on costum patterns
    InitCostumPatterns = (costumPatterns) => {
        console.log(costumPatterns);

        if (Object.keys(costumPatterns).length <= 0) {
            costum_patterns_overview_from_level.textContent = "No costum patterns are used in this level.";
            return;

        } else {
            costum_patterns_overview_from_level.textContent = null;
        };

        for (const [pattern, index] of Object.entries(costumPatterns)) {
            console.log(pattern, index);

            createPattern_preview(pattern, index[pattern]["structure"].map(i => Number(i)), costum_patterns_overview_from_level, "remove");
        };
    };

    // init costum field display on costum field ui 
    // It can be only ONE costum field selected for a costum level
    InitCostumField = (costumField) => {
        console.log(costumField);

        if (Object.keys(costumField).length <= 0) {
            costumFieldCurrentLevelGrid.textContent = "No costum field is used in this current level.";
            SelectedCostumFieldText.style.display = "none";
            return;

        } else {
            costumFieldCurrentLevelGrid.textContent = null;
            SelectedCostumFieldText.style.display = "block";
        };

        // create costum field
        let x = costumField["x"];
        let y = costumField["y"];
        let name = costumField["name"];

        createPattern_preview(name, [], costumFieldCurrentLevelGrid, "remove", undefined, x, "scroll", undefined, y, "field");
    };

    // init and start game with given game data
    startGame = (mode) => {
        let FieldSize = `${this.Settings.cellgrid[this.selectedLevel[7]]}x${this.Settings.cellgrid[this.selectedLevel[7]]}`;
        var user_unlocked_Advanced_fields_online = true;

        // If player haven't unlocked advanced fields but the level is an advanced field, unlock it and delete it later after level creation
        if (DataFields[FieldSize] == undefined) {
            DataFields['25x25'] = document.querySelector('#twentyfivextwentyfive');
            DataFields['30x30'] = document.querySelector('#thirtyxthirty');
            DataFields['40x40'] = document.querySelector('#fortyxforty');
            user_unlocked_Advanced_fields_online = false;
        };

        // close pop up 
        ChooseBetweenModesPopUp.style.display = "none";

        // Playing in created level true
        PlayingInCreatedLevel = true;

        bgcolor1 = this.PossibleColors[this.selectedLevel[0]];
        bgcolor2 = this.PossibleColors[this.selectedLevel[1]];

        SetGameData_Label[2].style.display = "block";
        SetGameModeList.style.display = "block";

        // set game data
        curr_field_ele = DataFields[FieldSize];

        switch (mode) {
            case 0: // offline mode
                curr_mode = GameMode[3].opponent;

                UserClicksNxNDefaultSettings(true); // true: player can only change his name and icon  
                UserClicksOfflineModeCard(curr_field_ele);
                break;

            case 1: // online mode
                curr_mode = GameMode[2].opponent;

                UserClicksNxNDefaultSettings(true); // true: player can only change his name and icon  
                InitGameDataForPopUp(false);

                // // initialize game with given data and start game
                // UserCreateRoom(true, this.Settings.playertimer[this.selectedLevel[3]], "Boneyard", localStorage.getItem("UserName"), false,
                //     this.selectedLevel[2], this.selectedLevel[6]); // create lobby with data from current selected level. the user can't change anything
                break;
        };

        // delete advanced data fields again if generated
        if (!user_unlocked_Advanced_fields_online) {
            delete DataFields['25x25'];
            delete DataFields['30x30'];
            delete DataFields['40x40'];
        };
    };

    // legacy code. moved to other file
    // search for levels functionality
    // OpenSearch = () => {
    //     CreateLevel_Title.style.display = "none";
    //     SearchLevelInputWrapper.style.display = "flex";

    //     SearchLevelInput.focus();

    //     LevelList_list.textContent = null;

    //     EditLevelBtn_ListBtn.style.display = "none";
    //     RemoveLevelBtn.style.display = "none";
    //     PublishLevelBtn.style.display = "none";
    //     LevelList_PublishStatusDisplay.style.display = "none";

    //     this.selectedLevel = undefined;
    //     this.Searching = true;

    //     this.StartLevelList(undefined, false); // false : Don't display list of player's created levels

    //     SearchLevelsBtn.style.display = "none";
    //     CloseSearchLevelsBtn.style.display = "block";

    //     try {
    //         socket.emit("DisplayAllOnlineLevel", ((levels, players) => {
    //             // console.log(levels, players);
    //             if (levels.length >= 1) {
    //                 levels.forEach((level, index) => {
    //                     // console.log(level, index, players[index][0])

    //                     this.AddLevelToList(level, players[index][0]);
    //                 });
    //             };
    //         }));

    //     } catch (error) {
    //         console.log(error);
    //     };
    // };

    // CloseSearch = (ShowLevelList) => {
    //     CreateLevel_Title.style.display = "block";
    //     SearchLevelInputWrapper.style.display = "none";

    //     SearchLevelsBtn.style.display = "block";
    //     CloseSearchLevelsBtn.style.display = "none";

    //     SearchLevelInput.value = null;
    //     LevelList_list.textContent = null;

    //     EditLevelBtn_ListBtn.style.display = "block";
    //     RemoveLevelBtn.style.display = "block";
    //     PublishLevelBtn.style.display = "block";
    //     LevelList_PublishStatusDisplay.style.display = "block";

    //     this.selectedLevel = undefined;
    //     this.Searching = false;

    //     this.StartLevelList(ShowLevelList); // false : Don't display the level list tab itself but just refresh its content
    // };

    RequestLevelSearchResults = (text) => {
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
        LevelList_list.textContent = null;

        // no level found
        if (levels.length <= 0) {
            let p = document.createElement("p");
            p.textContent = "No level found";
            p.style.margin = "50px 0 0 0";
            p.style.fontSize = "40px";
            p.style.fontWeight = "600";

            LevelList_list.appendChild(p);

        } else { // levels exist
            levels.forEach(level => {
                this.AddLevelToList(level);
            });
        };
    };

    // User beat his own level and verified it. now it is ready to publish
    verified = () => {
        try {
            socket.emit("UserVerifiedLevel", this.selectedLevel[11], confirmationStatus => {
                this.selectedLevel[13] = confirmationStatus;

                if (!localStorage.getItem("UserVerifiedLevelForTheFirstTime")) {
                    Achievement.new(14);
                    localStorage.setItem("UserVerifiedLevelForTheFirstTime", "true");
                };
            });

        } catch (error) {
            AlertText.textContent = "Something went wrong! Level could not be verified...";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        };
    };

    // user opens bg music preview for current bg music selected
    music_preview = () => {
        if (this.CurrentSelectedSetting.bgmusic > 0) {
            let music_src = this.Settings.bgmusic[this.CurrentSelectedSetting.bgmusic];

            console.log(music_src);

            // select audio src element and add current music file as source to it
            let audio_src_el = MusicPreviewAudioSlider.children[0]
            audio_src_el.src = "";
            audio_src_el.src = music_src;

            // set volume
            MusicPreviewAudioSlider.volume = appVolume;

            MusicPreviewAudioSlider.load();

            // init. title of sound
            MusicPreviewPopUp_title.textContent = music_src.replace(/^.*\/|\.[^.]*$/g, '');
        };
    };

    stop_music_preview = () => {
        let audio_src_el = MusicPreviewAudioSlider.children[0]
        audio_src_el.src = "";

        MusicPreviewAudioSlider.pause()
        MusicPreviewAudioSlider.currentTime = 0;
    };

    // about costum patterns
    toggle_costum_pattern = (method, patternName, patternStructure) => {
        // toggle pattern in meta data of this level
        if (method == "add") {
            // add pattern to object
            this.CurrentSelectedSetting.costumPatterns[patternName] = {
                [patternName]: {

                    name: patternName,
                    structure: patternStructure
                }
            };

        } else if (method == "remove") {
            // delete pattern from object
            if (this.CurrentSelectedSetting.costumPatterns[patternName]) {
                delete this.CurrentSelectedSetting.costumPatterns[patternName];

            };
        };

        this.SaveInHistory("costumPatterns", this.CurrentSelectedSetting.costumPatterns);

        console.log(this.CurrentSelectedSetting.costumPatterns);
    };

    // toggle costum field in creative level
    toggle_costum_field = (method, fieldName, x, y) => {
        console.log(method);

        // toggle field in meta data of this level
        if (method == "add") {
            // add field to object

            this.CurrentSelectedSetting.costumField = {
                "name": fieldName,
                "x": x,
                "y": y
            };

        } else if (method == "remove") {
            // delete field from object
            this.CurrentSelectedSetting.costumField = {};
        };

        this.SaveInHistory("costumField", this.CurrentSelectedSetting.costumField);

        console.log(this.CurrentSelectedSetting.costumField);
    };

    // check if pattern exists in the level storage 
    // if a pattern exists in a level it means it is used in the level
    is_pattern_in_level = (patternName) => {
        let patternInMetaData = this.CurrentSelectedSetting.costumPatterns[patternName];

        // if pattern could not be found
        if (!patternInMetaData) {
            return false;

        } else return true; // found
    };

    // check if costum field from user exists in the level storage
    // if pattern exists it means it is used as the main field in the level
    is_field_in_level = (fieldName) => {
        let fieldInMetaData = this.CurrentSelectedSetting.costumField["name"] == fieldName;

        // if field could not be found
        if (!fieldInMetaData) {
            return false;

        } else return true; // found
    };

    // draw costum user field the user selected as field for the level on main ui of new creative level ui
    drawCostumUserField = () => {
        if (Object.keys(this.CurrentSelectedSetting.costumField).length <= 0) {
            return;

        } else {
            toggleCellGridCarets("none");

            this.GenerateField(this.CurrentSelectedSetting.costumField["x"], this.CurrentSelectedSetting.costumField["y"]);
        };
    };

    // display default cell grid preview
    drawDefaultFields = () => {
        toggleCellGridCarets("flex");

        let fieldCoord = this.Settings.cellgrid[this.CurrentSelectedSetting.cellgrid];
        this.GenerateField(fieldCoord, fieldCoord);
    };
};

// add user costum pattern to win conditions
const NewCreativeLevel_GenerateCostumPatterns = (costumPatternsFromThirdParty, costumXCoordFromThirdParty) => { // costumPatternsFromThirdParty : from database for online game
    console.log(costumPatternsFromThirdParty, NewCreativeLevel, costumXCoordFromThirdParty);

    let patterns;
    if (NewCreativeLevel) {
        patterns = NewCreativeLevel.selectedLevel[15];

    } else if (!NewCreativeLevel && !inPlayerLevelsScene) {
        patterns = costumPatternsFromThirdParty;

    } else if (inPlayerLevelsScene) {
        patterns = JSON.parse(player_levels_handler.online_level_overview_handler.level["costum_patterns"]);
    };

    if (patterns && NewCreativeLevel) {
        // generate
        for (const [pattern, index] of Object.entries(patterns)) {
            // console.log(pattern, index);

            let structure = index[pattern]["structure"];
            let xCellAmount;

            if (!isNaN(costumXCoordFromThirdParty)) {
                xCellAmount = costumXCoordFromThirdParty;

            } else {
                xCellAmount = NewCreativeLevel.Settings.cellgrid[NewCreativeLevel.selectedLevel[7]];
            };

            console.log(structure, xCellAmount);

            CostumWinPattern(structure, xCellAmount, yCell_Amount);
        };

    } else if (costumPatternsFromThirdParty) {

        // generate
        for (const [pattern, index] of Object.entries(patterns)) {
            // console.log(pattern, index);

            let structure = index[pattern]["structure"]
            let xCellAmount = costumXCoordFromThirdParty;

            console.log(structure, xCellAmount);

            CostumWinPattern(structure, xCellAmount, yCell_Amount);
        };
    };
};

// show patterns in game info pop up
const NewCreativeLevel_DisplayCostumPatternsInGamePopUp = () => {
    let patterns;
    if (NewCreativeLevel) {
        patterns = NewCreativeLevel.selectedLevel[15];

    } else if (!NewCreativeLevel && !inPlayerLevelsScene) {
        patterns = costumPatternsFromThirdParty;

    } else if (inPlayerLevelsScene) {
        patterns = JSON.parse(player_levels_handler.online_level_overview_handler.level["costum_patterns"]);
    };

    // delete previous costum user cell grids 
    let previousCellGrids = document.querySelectorAll(`[ingame_preview="true"]`);

    [...previousCellGrids].forEach(grid => {
        grid.remove();
    });

    if (patterns && NewCreativeLevel) {
        // generate
        for (const [pattern, index] of Object.entries(patterns)) {
            console.log(pattern, index);

            let structure = index[pattern]["structure"];
            let xCellAmount = NewCreativeLevel.Settings.cellgrid[NewCreativeLevel.selectedLevel[7]];

            // console.log(structure, xCellAmount);

            // show in game info pop up
            createPattern_preview(pattern, structure, PatternGridWrapperForCostumPatterns, "level", "ingame_preview");
        };

    } else {
        // generate
        for (const [pattern, index] of Object.entries(patterns)) {
            console.log(pattern, index);

            let structure = index[pattern]["structure"];
            let xCellAmount = costumXFromThirdParty;

            // console.log(structure, xCellAmount);

            // show in game info pop up
            createPattern_preview(pattern, structure, PatternGridWrapperForCostumPatterns, "level", "ingame_preview");
        };
    };
};

// initialize general scene
const InitCreateLevelScene = () => {
    // User wants to publish a level 
    PublishLevelBtn.addEventListener("click", () => {
        try {
            socket.emit("Check_UserVerifiedLevel", NewCreativeLevel.selectedLevel[11], cb => {

                // if player beat it
                if (cb) {
                    try {
                        socket.emit("PublishLevel", NewCreativeLevel.selectedLevel[11], cb => {
                            if (!localStorage.getItem("UserPublishedLevelForTheFirstTime")) {
                                Achievement.new(15);
                                localStorage.setItem("UserPublishedLevelForTheFirstTime", "true");
                            };

                            // refresh level instance
                            let NewField = new NewLevel();
                            NewCreativeLevel = NewField;
                            NewCreativeLevel.Init();

                            AlertText.textContent = "Level is successfully published";
                            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                        });

                    } catch (error) {
                        console.log(error);
                        AlertText.textContent = "Something went wrong! Level could not be published. Try it again later";
                        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                    };

                } else {
                    AlertText.textContent = "You have to conquer the level to publish it";
                    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                };
            });

        } catch (error) {
            AlertText.textContent = "Something went wrong.";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
            return;
        };
    });

    unpublishLevelBtn.addEventListener("click", () => {
        if (NewCreativeLevel.selectedLevel[9] == 1) { // Creator of level beat it which means he has the right to publish the level
            try {
                socket.emit("UnpublishLevel", NewCreativeLevel.selectedLevel[11], cb => {
                    // refresh page
                    let NewField = new NewLevel();
                    NewCreativeLevel = NewField;
                    NewCreativeLevel.Init();

                    AlertText.textContent = "Level is successfully unpublished. To publish it you have to beat the level again.";
                    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);

                    PlayLevelBtn_ListBtn.style.display = "flex";
                    EditLevelBtn_ListBtn.style.display = "flex";
                    RemoveLevelBtn.style.display = "flex";

                });
            } catch (error) {
                console.log(error);
                AlertText.textContent = "Something went wrong! Level could not be unpublished. Try it again later";
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
            };
        };
    });

    // Search Level click event 
    SearchLevelsBtn.addEventListener("click", () => {
        NewCreativeLevel.OpenSearch();
    });

    CloseSearchLevelsBtn.addEventListener("click", () => {
        NewCreativeLevel.CloseSearch();
    });

    // legacy. code moved to script.js
    // SearchLevelInput.addEventListener("keyup", (e) => {
    //     if (e.key == "Enter") {
    //         e.preventDefault();
    //         NewCreativeLevel.RequestLevelSearchResults(SearchLevelInput.value);
    //     };
    // });

    // start event listener
    EditLevelBtn_ListBtn.addEventListener('click', () => {
        // console.log(NewCreativeLevel);

        if (NewCreativeLevel.selectedLevel == undefined) {
            AlertText.textContent = "select a level to edit";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);

        } else if (NewCreativeLevel.selectedLevel != undefined && NewCreativeLevel.selectedLevel[9] == 0) { // if user selected level and level is not published
            // User entered create level mode
            let NewField = new NewLevel(NewCreativeLevel.selectedLevel[0], NewCreativeLevel.selectedLevel[1], NewCreativeLevel.selectedLevel[2],
                NewCreativeLevel.selectedLevel[3], NewCreativeLevel.selectedLevel[4], NewCreativeLevel.selectedLevel[5], NewCreativeLevel.selectedLevel[6],
                NewCreativeLevel.selectedLevel[7], NewCreativeLevel.selectedLevel[8], NewCreativeLevel.selectedLevel[9], NewCreativeLevel.selectedLevel[10], NewCreativeLevel.selectedLevel[11],
                NewCreativeLevel.selectedLevel, NewCreativeLevel.selectedLevel[15], NewCreativeLevel.selectedLevel[16]);
            NewCreativeLevel = NewField;
            NewCreativeLevel.Init(true);

        } else if (NewCreativeLevel.selectedLevel != undefined && NewCreativeLevel.selectedLevel[9] == 1) { // level is published, can't be edited
            AlertText.textContent = "You can't edit a level once it's published";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        };
    });

    PreviewLevelBtn.addEventListener("click", () => {
        if (NewCreativeLevel.selectedLevel == undefined) {

            AlertText.textContent = "select a level to preview it";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);

        } else {
            DarkLayerAnimation(online_level_scene, multiple_use_scene).then(async() => {

                await socket.emit("request_level_for_id", NewCreativeLevel.selectedLevel[11], (level) => {

                    player_levels_handler.online_level_overview_handler = new onlineLevelOverviewHandler();
                    player_levels_handler.online_level_overview_handler.level = level;
                    player_levels_handler.online_level_overview_handler.init();

                    CreateLevelScene.style.display = "none";
                    sceneMode.default();
                });
            });
        };
    });

    CreateLevel_leaveSceneBtn.addEventListener('click', () => {
        if (Object.keys(NewCreativeLevel.history).length <= 0) {
            LeaveCreateLevelScene();

        } else {
            NewCreativeLevel.ActionAfterSaveOrNotSaveButton = "leave";
            DisplayPopUp_PopAnimation(saveLevelWarning, "flex", true);
        };
    });

    // switch between workbench and level list
    ShowLevelListBtn.addEventListener("click", () => {
        if (Object.keys(NewCreativeLevel.history).length <= 0) {
            NewCreativeLevel.StartLevelList();

        } else {
            NewCreativeLevel.ActionAfterSaveOrNotSaveButton = "list";
            DisplayPopUp_PopAnimation(saveLevelWarning, "flex", true);
        };
    });

    ShowWorkbenchBtn.addEventListener("click", () => {
        NewCreativeLevel.StartWorkbench();
    });

    // Help Button
    CreateLevelHelpButton.addEventListener("click", () => {
        DisplayPopUp_PopAnimation(CreateLevel_helpPopUp, "flex", true);
    });

    CreateLevel_HelpPopUpCloseBtn.addEventListener("click", () => {
        CreateLevel_helpPopUp.style.display = "none";
        DarkLayer.style.display = "none";
    });

    // save warning pop up
    saveLevelBtn_FromWarning.addEventListener("click", () => {
        let result = NewCreativeLevel.Save();
        saveLevelWarning.style.display = "none";
        if (result == false) {
            AlertText.textContent = "Something went wrong!";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
            // console.log(result);

        } else {
            DarkLayer.style.display = "none";

            if (NewCreativeLevel.ActionAfterSaveOrNotSaveButton == "leave") {
                LeaveCreateLevelScene();

            } else if (NewCreativeLevel.ActionAfterSaveOrNotSaveButton == "list") {
                DarkLayerAnimation(CreateLevel_LevelList, CreateLevel_Workbench).then(() => {
                    NewCreativeLevel.StartLevelList();
                });
            };
        };
    });

    NotSaveLevelBtn_FromWarning.addEventListener("click", () => {
        saveLevelWarning.style.display = "none";
        DarkLayer.style.display = "none";

        if (NewCreativeLevel.ActionAfterSaveOrNotSaveButton == "leave") {
            LeaveCreateLevelScene();

        } else if (NewCreativeLevel.ActionAfterSaveOrNotSaveButton == "list") {
            NewCreativeLevel.history = {};
            NewCreativeLevel.StartLevelList();
        };
    });

    closeSaveLevelWarning.addEventListener("click", () => {
        saveLevelWarning.style.display = "none";
        DarkLayer.style.display = "none";
    });

    SaveLevelBtn.addEventListener("click", () => {
        let result = NewCreativeLevel.Save();
        if (result == false) {
            saveLevelWarning.style.display = "none";
            AlertText.textContent = "Something went wrong!";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
            // console.log(result);
        };
    });

    AddLevelBtn.addEventListener("click", () => {
        // User started new level
        let NewField = new NewLevel();
        NewCreativeLevel = NewField;
        NewCreativeLevel.Init(true); // true : Display work bench
    });

    // remove event listener
    Workbench_togglePatternBtn.forEach(toggle_button => { toggle_button.removeEventListener("click", toggle_button.fn) });

    // toggle pattern 
    Workbench_togglePatternBtn.forEach(toggle_button => {
        toggle_button.addEventListener("click", toggle_button.fn = (e) => {

            let toggler = e.target;
            let state = toggler.getAttribute("active");
            let target = toggler.getAttribute("for-pattern").replace(/_4x4|_5x5/g, "");

            console.log(toggler, state, target);

            switch (state) {
                case "true":
                    toggler.setAttribute("active", "false");
                    toggler.classList.replace("fa-square-check", "fa-square");

                    // save in history
                    NewCreativeLevel.SaveInHistory("allowedpatterns", NewCreativeLevel.CurrentSelectedSetting.allowedpatterns);

                    NewCreativeLevel.CurrentSelectedSetting.allowedpatterns = NewCreativeLevel.CurrentSelectedSetting.allowedpatterns.filter(pattern => pattern !== target);
                    break;

                case "false":
                    toggler.setAttribute("active", "true");
                    toggler.classList.replace("fa-square", "fa-square-check");

                    NewCreativeLevel.SaveInHistory("allowedpatterns", NewCreativeLevel.CurrentSelectedSetting.allowedpatterns);

                    if (!NewCreativeLevel.CurrentSelectedSetting.allowedpatterns.includes(target)) { // if it doesn't exists in the array, add it to it
                        NewCreativeLevel.CurrentSelectedSetting.allowedpatterns.push(target);
                    };
                    break;
            };
        });
    });

    // allowed patterns container scroll buttons
    AllowedPatternsContainer_ScrollBtn.forEach(e => e.addEventListener("click", () => {
        let type = e.getAttribute("scroll-type");
        let Container = (NewCreativeLevel.CurrentSelectedSetting.cellgrid == 0) ? CreateLevel_4x4_AllowedPatterns : CreateLevel_5x5_AllowedPatterns;

        switch (type) {
            case "up":
                Container.scrollTop -= 180;
                break;

            case "down":
                Container.scrollTop += 180;
                break;
        };
    }));

    // remove level button
    RemoveLevelBtn.addEventListener("click", () => {
        if (NewCreativeLevel.selectedLevel != undefined) {
            DisplayPopUp_PopAnimation(removeWarning, "flex", true);
        } else {
            AlertText.textContent = "Select a level to remove";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        };
    });

    removeLevelBtnNo.addEventListener("click", () => {
        removeWarning.style.display = "none";
        DarkLayer.style.display = "none";
    });

    removeLevelBtnYes.addEventListener("click", () => {
        try {
            socket.emit("RemoveLevel", NewCreativeLevel.selectedLevel[11], cb => {
                // refresh page
                let NewField = new NewLevel();
                NewCreativeLevel = NewField;
                NewCreativeLevel.Init();

                removeWarning.style.display = "none";
                DarkLayer.style.display = "none";
            });

        } catch (error) {
            console.log(error);
            AlertText.textContent = "something went wrong.";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        };
    });

    closeDeleteWarning.addEventListener("click", () => {
        removeWarning.style.display = "none";
        DarkLayer.style.display = "none";
    });

    // Play level button
    PlayLevelBtn.addEventListener("click", () => {
        if (NewCreativeLevel.selectedLevel != undefined) {
            NewCreativeLevel.Save().then(() => {
                DisplayPopUp_PopAnimation(ChooseBetweenModesPopUp, "flex", true);
            });

        } else {
            AlertText.textContent = "Select a level to play";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        };
    });

    PlayLevelBtn_ListBtn.addEventListener("click", () => {
        if (NewCreativeLevel.selectedLevel != undefined) {
            DisplayPopUp_PopAnimation(ChooseBetweenModesPopUp, "flex", true);
        } else {
            AlertText.textContent = "Select a level to play it";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        };
    });

    CreateLevel_musicPreviewBtn.addEventListener("click", () => {
        DisplayPopUp_PopAnimation(CreateLevel_MusicPreviewPopUp, "flex", true);

        NewCreativeLevel.music_preview();
    });

    MusicPreview_closeBtn.addEventListener("click", () => {
        CreateLevel_MusicPreviewPopUp.style.display = "none";
        DarkLayer.style.display = "none";

        NewCreativeLevel.stop_music_preview();
    });

    CreateLevel_CreateOwnStuff_btn.addEventListener("click", () => {
        let tab_index = 1;

        let tab = document.querySelector(`.tab[target_container="${tab_index}"]`);
        let container = document.querySelector(`.tab_container[content_container="${tab_index}"]`);

        deactivateTabs();
        default_tab_content_view(container); // target container where all the tab content displays

        DisplayPopUp_PopAnimation(CreateOwnStuffPopUp, "flex", true);

        // activate tab element visualy
        tab.setAttribute("active_tap", "true");
    });

    tabContainer1_closeBtn.addEventListener("click", () => {
        CreateOwnStuffPopUp.style.display = "none";
        DarkLayer.style.display = "none";

        if (Object.keys(NewCreativeLevel.CurrentSelectedSetting.costumField).length <= 0) {
            NewCreativeLevel.drawDefaultFields();

        } else {
            NewCreativeLevel.drawCostumUserField()
        };
    });

    tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => {
            deactivateTabs();

            tab.setAttribute("active_tap", true);

            // indicate container to display tab content
            let target_container_index = tab.getAttribute("target_container");
            let target_container = document.querySelector(`[content_container="${target_container_index}"]`);

            // indicate tab content to display in container
            let content_index = tab.getAttribute("content");
            let content_el = document.querySelector(`[tab_content="${target_container_index}${content_index}"]`);

            activateTabContent(target_container, content_el);
        });
    });

    CreateCostumField_btn.addEventListener("click", () => {
        CreateOwnStuffPopUp.style.display = "none";

        DisplayPopUp_PopAnimation(createCostumField_popUp, "flex", true);

        generateField_preview(5, 5, createCostumField_Field);

        createCostumField_xInput.textContent = "5";
        createCostumField_yInput.textContent = "5";

        createCostumField_title.textContent = "field name";
    });

    CreateCostumPattern_btn.addEventListener("click", () => {
        CreateOwnStuffPopUp.style.display = "none";

        DisplayPopUp_PopAnimation(createCostumPattern_popUp, "flex", true);

        generateField_preview(5, 5, createCostumPattern_Field, true);

        createCostumPattern_title.textContent = "pattern name";
    });

    createCostumField_helpButton.addEventListener("click", () => {
        OpenedPopUp_WhereAlertPopUpNeeded = true;
        AlertText.textContent = "Input the dimensions of your new custom field. The maximum allowable dimensions are 30x30. Provide a creative name for your field.";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    });

    createCostumPattern_helpButton.addEventListener("click", () => {
        OpenedPopUp_WhereAlertPopUpNeeded = true;
        AlertText.textContent = 'Input your pattern by clicking into the cells of the field. There are no limitations on your pattern. Provide a creative name for it. Just click "Create!" if you are done.';
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    });

    createCostumPattern_closeBtn.addEventListener("click", () => {
        createCostumPattern_popUp.style.display = "none";
        DarkLayer.style.display = "none";
    });

    createCostumField_closeBtn.addEventListener("click", () => {
        createCostumField_popUp.style.display = "none";
        DarkLayer.style.display = "none";
    });

    CreateField_createField_btn.addEventListener("click", () => {
        // let sameCoord = createCostumField_xInput.textContent == createCostumField_yInput.textContent;
        let sameCoord = true;

        if (createCostumField_title.textContent != "field name" && sameCoord) {
            createNewCostumField();

        } else {
            OpenedPopUp_WhereAlertPopUpNeeded = true;

            // AlertText.textContent = "Build your new field and provide a costum name for it. The x and y axes should be the same.";
            AlertText.textContent = "Build your new field and provide a costum name for it.";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        };
    });

    CreatePattern_createPattern_btn.addEventListener("click", () => {
        let drawed = checkUserDrawnPattern();
        let existsInGame = checkCostumPatternAlreadyInGame();
        let minimumIndexesRequiremementCheck = minimumIndexesRequiremement(3);
        let CorrespondingPattenStoragePattern = document.querySelector(`[costum_pattern_name="${createCostumPattern_title.textContent}"][right="personal"]`);

        // console.log(drawed, createCostumPattern_title.textContent, minimumIndexesRequiremementCheck, existsInGame, " exists ?", CorrespondingPattenStoragePattern);

        // user must provide costum name and atleast one drawed pattern
        if (createCostumPattern_title.textContent != "pattern name" && createCostumPattern_title.textContent != "" && drawed && !existsInGame && minimumIndexesRequiremementCheck) {

            createNewCostumPattern();

        } else {
            OpenedPopUp_WhereAlertPopUpNeeded = true;

            AlertText.textContent = "Draw your new pattern and provide a custom name for it. Minimum drawing on 3 cells is required. You cannot draw a pattern already existing in the game.";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        };
    });

};

// leave create level scene
const LeaveCreateLevelScene = () => {
    window.location.reload();
};

// check wether user has selected a song for the level or not
const CheckForBGmusic = () => {
    let music_status = NewCreativeLevel.CurrentSelectedSetting.bgmusic;

    if (music_status >= 1) {
        CreateLevel_musicPreviewBtn.style.display = "flex";

    } else {
        CreateLevel_musicPreviewBtn.style.display = "none";
    };
};

// toggle cell grid carets
const toggleCellGridCarets = (method) => {
    let cellGridCarets = document.querySelectorAll(`[for="cellgrid"]`);
    [...cellGridCarets].map(caret => caret.style.display = method);
};