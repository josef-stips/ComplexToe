// User wants to create a new online level
class NewLevel {
    constructor(bgcolor1 = 0, bgcolor2 = 0, requiredpoints = 10, playertimer = 2, icon = 7, bgmusic = 0, allowedpatterns = [
        "hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
        "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2", "branch3", "branch4", "special1", "special2"
    ], cellgrid = 4, name = "Your level name", status = 0, isSaved = true, id = 0, selectedLevel = undefined) {
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
            "id": id
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
            this.CurrentSelectedSetting.allowedpatterns, this.CurrentSelectedSetting.status, this.CurrentSelectedSetting.name, this.CurrentSelectedSetting.id);
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
                this.CurrentSelectedSetting.allowedpatterns, this.CurrentSelectedSetting.status, this.CurrentSelectedSetting.name);
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
                        };

                        this.history = {};
                        DarkLayer.style.display = "none";
                        done();
                    });

                } catch (error) {
                    console.log(error);
                    AlertText.textContent = "Something went wrong!";
                    DarkLayer.style.display = "block";
                    alertPopUp.style.display = "flex";
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

        PlayLevelBtn.style.display = "none";

        this.CloseSearch(false);

        if (this.CurrentSelectedSetting.id == 0) {
            workbench_levelID_display.textContent = "ID none";
        } else {
            workbench_levelID_display.textContent = `ID ${this.CurrentSelectedSetting.id}`;
        };

        // If other level selected paste its data into current settings
        if (this.selectedLevel != undefined) {
            this.InitCurrentSettings(this.selectedLevel[5], this.selectedLevel[0], this.selectedLevel[1], this.selectedLevel[2], this.selectedLevel[3], this.selectedLevel[4],
                this.selectedLevel[7], this.selectedLevel[6], this.selectedLevel[9], this.selectedLevel[8], this.selectedLevel[11]);
        };
    };

    // display level list
    StartLevelList = (Display, DisplayList) => {
        // get levels user created
        if (DisplayList == undefined) {
            try {
                socket.emit("RequestLevels", localStorage.getItem("PlayerID"), levels => {
                    if (levels.length <= 0) { // no levels
                        ReplaceText_Levellist.style.display = "block";

                    } else { // create level display
                        ReplaceText_Levellist.style.display = "none";
                        LevelList_list.textContent = null;

                        console.log(levels);

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
                alertPopUp.style.display = "flex";
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

    AddLevelToList = (level) => {
        let li = document.createElement("li");
        li.classList = "Level_InLevelList";

        let level_theme = (level.bg1 == "0") ? "white" : this.PossibleColors[parseInt(level.bg1)];

        let span = document.createElement("span");
        span.textContent = level.level_name;
        span.style.color = level_theme;

        if (level.level_name.length >= 18) {
            span.style.fontSize = "var(--Text-font-size)";
        } else {
            span.style.fontSize = "inherit";
        };

        let span1 = document.createElement("span");
        span1.classList = "LevelIconWrapper"
        span1.style.border = `2px solid ${level_theme}`;

        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        div1.classList = "LevelListItem_InnerWrapper1";
        div2.classList = "LevelListItem_InnerWrapper2";

        div2.textContent = `Level ID: 0${level.id}`;

        let img = document.createElement("img");
        img.src = this.Settings.levelicon[parseInt(level.icon)];
        img.width = "32";
        img.height = "32";

        li.addEventListener("click", () => {
            console.log(level, level.CreatorBeatIt);

            this.selectedLevel = [parseInt(level.bg1), parseInt(level.bg2), level.required_points, level.player_timer, parseInt(level.icon), parseInt(level.bg_music), JSON.parse(level.pattern), level.field, level.level_name, level.level_status,
                true, level.id, level.publish_date, level.CreatorBeatIt, level.creation_date
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
                } else {
                    PublishLevelBtn.style.display = "none";
                    unpublishLevelBtn.style.display = "none";
                };

                LevelList_PublishStatusDisplay.textContent = "unpublished";
                LevelList_PublishStatusDisplay.style.color = "rgb(255, 152, 0)";

            } else {
                // Display publish level buttons right
                if (!this.Searching) {
                    PublishLevelBtn.style.display = "none";
                    unpublishLevelBtn.style.display = "block";
                } else {
                    PublishLevelBtn.style.display = "none";
                    unpublishLevelBtn.style.display = "none";
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
    GenerateField = async(size) => {
        workbench_cellGrid.textContent = null;
        workbench_LevelFieldSize_Display.textContent = `${size}x${size}`;

        for (let i = 0; i < size * size; i++) {
            // create single cell
            let cell = document.createElement('div');
            cell.classList = "cell";
            cell.setAttribute('cell-index', i);

            workbench_cellGrid.appendChild(cell);
        };

        workbench_cellGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    };

    // Init current settings on level
    InitCurrentSettings = (music, bg1, bg2, points, clock, icon, field, patterns, status, name, id) => {
        console.log(music, bg1, bg2, points, clock, icon, field, patterns, status, name, id);

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
            this.GenerateField(this.Settings.cellgrid[field]);
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
                        this.CurrentSelectedSetting.allowedpatterns, this.CurrentSelectedSetting.status, this.CurrentSelectedSetting.name);

                    // save in history
                    this.SaveInHistory(forSetting, this.CurrentSelectedSetting[forSetting] + 1);
                };
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
                        this.CurrentSelectedSetting.allowedpatterns, this.CurrentSelectedSetting.status, this.CurrentSelectedSetting.name)

                    // save in history
                    this.SaveInHistory(forSetting, this.CurrentSelectedSetting[forSetting] - 1);
                };
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

                // initialize game with given data and start game
                UserCreateRoom(true, this.Settings.playertimer[this.selectedLevel[3]], "Boneyard", localStorage.getItem("UserName"), false,
                    this.selectedLevel[2], this.selectedLevel[6]); // create lobby with data from current selected level. the user can't change anything
                break;
        };

        // delete advanced data fields again if generated
        if (!user_unlocked_Advanced_fields_online) {
            delete DataFields['25x25'];
            delete DataFields['30x30'];
            delete DataFields['40x40'];
        };
    };

    // search for levels functionality
    OpenSearch = () => {
        CreateLevel_Title.style.display = "none";
        SearchLevelInputWrapper.style.display = "flex";

        SearchLevelInput.focus();

        LevelList_list.textContent = null;

        EditLevelBtn_ListBtn.style.display = "none";
        RemoveLevelBtn.style.display = "none";
        PublishLevelBtn.style.display = "none";
        LevelList_PublishStatusDisplay.style.display = "none";

        this.selectedLevel = undefined;
        this.Searching = true;

        this.StartLevelList(undefined, false); // false : Don't display list of player's created levels

        SearchLevelsBtn.style.display = "none";
        CloseSearchLevelsBtn.style.display = "block";
    };

    CloseSearch = (ShowLevelList) => {
        CreateLevel_Title.style.display = "block";
        SearchLevelInputWrapper.style.display = "none";

        SearchLevelsBtn.style.display = "block";
        CloseSearchLevelsBtn.style.display = "none";

        SearchLevelInput.value = null;

        EditLevelBtn_ListBtn.style.display = "block";
        RemoveLevelBtn.style.display = "block";
        PublishLevelBtn.style.display = "block";
        LevelList_PublishStatusDisplay.style.display = "block";

        this.selectedLevel = undefined;
        this.Searching = false;

        this.StartLevelList(ShowLevelList); // false : Don't display the level list tab itself but just refresh its content
    };

    RequestLevelSearchResults = (text) => {
        try {
            socket.emit("RequestOnlineLevels", text, levels => {
                this.DisplayLevelSearchResults(levels);
            });

        } catch (error) {
            AlertText.textContent = "Something went wrong!";
            DarkLayer.style.display = "block";
            alertPopUp.style.display = "flex";
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
            });

        } catch (error) {
            AlertText.textContent = "Something went wrong! Level could not be verified...";
            DarkLayer.style.display = "block";
            alertPopUp.style.display = "flex";
        };
    };
};

// initialize general scene
const InitCreateLevelScene = () => {
    // User wants to publish a level 
    PublishLevelBtn.addEventListener("click", () => {
        if (NewCreativeLevel.selectedLevel[13] == 1 && NewCreativeLevel.selectedLevel[9] == 0) { // Creator of level beat it which means he has the right to publish the level
            try {
                socket.emit("PublishLevel", NewCreativeLevel.selectedLevel[11], cb => {
                    // refresh page
                    let NewField = new NewLevel();
                    NewCreativeLevel = NewField;
                    NewCreativeLevel.Init();

                    AlertText.textContent = "Level is successfully published";
                    alertPopUp.style.display = "flex";
                    DarkLayer.style.display = "block";
                });
            } catch (error) {
                console.log(error);
                AlertText.textContent = "Something went wrong! Level could not be published. Try it again later";
                alertPopUp.style.display = "flex";
                DarkLayer.style.display = "block";
            };

        } else if (NewCreativeLevel.selectedLevel[9] == 0) {
            AlertText.textContent = "You have to conquer the level to publish it";
            alertPopUp.style.display = "flex";
            DarkLayer.style.display = "block";
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

                    AlertText.textContent = "Level is successfully unpublished";
                    alertPopUp.style.display = "flex";
                    DarkLayer.style.display = "block";
                });
            } catch (error) {
                console.log(error);
                AlertText.textContent = "Something went wrong! Level could not be unpublished. Try it again later";
                alertPopUp.style.display = "flex";
                DarkLayer.style.display = "block";
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

    SearchLevelInput.addEventListener("keyup", (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            NewCreativeLevel.RequestLevelSearchResults(SearchLevelInput.value);
        };
    });

    // start event listener
    EditLevelBtn_ListBtn.addEventListener('click', () => {
        console.log(NewCreativeLevel);

        if (NewCreativeLevel.selectedLevel == undefined) {
            AlertText.textContent = "select a level to edit";
            alertPopUp.style.display = "flex";
            DarkLayer.style.display = "block";

        } else if (NewCreativeLevel.selectedLevel != undefined && NewCreativeLevel.selectedLevel[9] == 0) { // if user selected level and level is not published
            // User entered create level mode
            let NewField = new NewLevel(NewCreativeLevel.selectedLevel[0], NewCreativeLevel.selectedLevel[1], NewCreativeLevel.selectedLevel[2],
                NewCreativeLevel.selectedLevel[3], NewCreativeLevel.selectedLevel[4], NewCreativeLevel.selectedLevel[5], NewCreativeLevel.selectedLevel[6],
                NewCreativeLevel.selectedLevel[7], NewCreativeLevel.selectedLevel[8], NewCreativeLevel.selectedLevel[9], NewCreativeLevel.selectedLevel[10], NewCreativeLevel.selectedLevel[11],
                NewCreativeLevel.selectedLevel);
            NewCreativeLevel = NewField;
            NewCreativeLevel.Init(true);

        } else if (NewCreativeLevel.selectedLevel != undefined && NewCreativeLevel.selectedLevel[9] == 1) { // level is published, can't be edited
            AlertText.textContent = "You can't edit a level once it's published";
            alertPopUp.style.display = "flex";
            DarkLayer.style.display = "block";
        };
    });

    CreateLevel_leaveSceneBtn.addEventListener('click', () => {
        if (Object.keys(NewCreativeLevel.history).length <= 0) {
            LeaveCreateLevelScene();

        } else {
            NewCreativeLevel.ActionAfterSaveOrNotSaveButton = "leave";
            saveLevelWarning.style.display = "flex";
            DarkLayer.style.display = "block";
        };
    });

    // switch between workbench and level list
    ShowLevelListBtn.addEventListener("click", () => {
        if (Object.keys(NewCreativeLevel.history).length <= 0) {
            NewCreativeLevel.StartLevelList();

        } else {
            NewCreativeLevel.ActionAfterSaveOrNotSaveButton = "list";
            saveLevelWarning.style.display = "flex";
            DarkLayer.style.display = "block";
        };
    });

    ShowWorkbenchBtn.addEventListener("click", () => {
        NewCreativeLevel.StartWorkbench();
    });

    // Help Button
    CreateLevelHelpButton.addEventListener("click", () => {
        CreateLevel_helpPopUp.style.display = "flex";
        DarkLayer.style.display = "block";
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
            DarkLayer.style.display = "block";
            alertPopUp.style.display = "flex";
            console.log(result);

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
            DarkLayer.style.display = "block";
            alertPopUp.style.display = "flex";
            console.log(result);
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

            switch (state) {
                case "true":
                    toggler.setAttribute("active", "false");
                    toggler.classList.replace("fa-square-check", "fa-square");

                    // save in history
                    NewCreativeLevel.SaveInHistory("allowedpatterns", NewCreativeLevel.CurrentSelectedSetting.allowedpatterns);

                    NewCreativeLevel.CurrentSelectedSetting.allowedpatterns = NewCreativeLevel.CurrentSelectedSetting.allowedpatterns.filter(pattern => pattern !== target);
                    break;

                case "false":
                    toggler.setAttribute("active", "false");
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
            removeWarning.style.display = "flex";
            DarkLayer.style.display = "block";

        } else {
            AlertText.textContent = "Select a level to remove";
            DarkLayer.style.display = "block";
            alertPopUp.style.display = "flex";
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
            alertPopUp.style.display = "flex";
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
                ChooseBetweenModesPopUp.style.display = "flex";
                DarkLayer.style.display = "block";
            });

        } else {
            AlertText.textContent = "Select a level to play";
            DarkLayer.style.display = "block";
            alertPopUp.style.display = "flex";
        };
    });

    PlayLevelBtn_ListBtn.addEventListener("click", () => {
        if (NewCreativeLevel.selectedLevel != undefined) {
            ChooseBetweenModesPopUp.style.display = "flex";
            DarkLayer.style.display = "block";

        } else {
            AlertText.textContent = "Select a level to play it";
            DarkLayer.style.display = "block";
            alertPopUp.style.display = "flex";
        };
    });

    chooseModeCloseBtn.addEventListener("click", () => {
        ChooseBetweenModesPopUp.style.display = "none";
        DarkLayer.style.display = "none";
    });

    OnlineModeBtn.addEventListener("click", () => {
        NewCreativeLevel.startGame(1);
    });

    OfflineModeBtn.addEventListener("click", () => {
        NewCreativeLevel.startGame(0);
    });
};

// leave create level scene
const LeaveCreateLevelScene = () => {
    window.location.reload();
};