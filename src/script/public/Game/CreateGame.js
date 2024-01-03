// User wants to create a new online level
class NewLevel {
    constructor(bgcolor1 = 0, bgcolor2 = 0, requiredpoints = 10, playertimer = 2, icon = 7, bgmusic = 0, allowedpatterns = [
        "hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
        "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2", "branch3", "branch4", "special1", "special2"
    ], cellgrid = 4, name = "Your level name", status = 0, isSaved = true, id = 0) {
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
                1: "assets/Maps/Ground_destroyer.mp3",
                2: "assets/Maps/Impossible_survival.mp3",
                3: "assets/Maps/Long_funeral.mp3",
                4: "assets/Maps/March_into_fire.mp3",
                5: "assets/Maps/Merciful_slaughter.mp3",
                6: "assets/Maps/Quick_Death.mp3",
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
        this.selectedLevel = undefined;
    };

    // Init new Level
    Init = () => {
        // check for localstorage object
        if (!localStorage.getItem("SavedLevels")) {
            localStorage.setItem("SavedLevels", "{}");
        };

        // init app in general
        this.InitScene();
        // Display workbench and undisplay level list
        this.StartWorkbench();
        // Init current settings
        this.InitCurrentSettings(this.CurrentSelectedSetting.bgmusic, this.CurrentSelectedSetting.bgcolor1, this.CurrentSelectedSetting.bgcolor2,
            this.CurrentSelectedSetting.requiredpoints, this.CurrentSelectedSetting.playertimer, this.CurrentSelectedSetting.levelicon, this.CurrentSelectedSetting.cellgrid,
            this.CurrentSelectedSetting.allowedpatterns, this.CurrentSelectedSetting.status, this.CurrentSelectedSetting.name, this.CurrentSelectedSetting.id);
        // Init carets
        this.InitInput();
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
        DarkLayer.style.display = "block";
        try {
            socket.emit("SaveCurrentLevel", localStorage.getItem("PlayerID"), this.CurrentSelectedSetting, cb => {
                if (!cb) {
                    return false;
                };
                this.CurrentSelectedSetting.id = cb; // cb: id generated by database for level

                // save level in localstorage
                let SavedLevels = JSON.parse(localStorage.getItem("SavedLevels"));
                SavedLevels[this.CurrentSelectedSetting.id] = this.CurrentSelectedSetting;
                localStorage.setItem("SavedLevels", JSON.stringify(SavedLevels));

            });
            this.history = {};
            DarkLayer.style.display = "none";
            return true;

        } catch (error) {
            console.log(error);
            AlertText.textContent = "Something went wrong!";
            DarkLayer.style.display = "block";
            alertPopUp.style.display = "flex";
            return false;
        };
    };

    // init whole scene in general
    InitScene = () => {
        InitCreateLevelScene();
    };

    // display workbench
    StartWorkbench = () => {
        CreateLevel_Workbench.style.display = "flex";
        CreateLevel_LevelList.style.display = "none";

        ShowLevelListBtn.style.display = "flex";
        ShowWorkbenchBtn.style.display = "none";

        CreateLevel_Title.textContent = "Workbench";
        UndoChangeBtn.style.display = "block";
    };

    // display level list
    StartLevelList = () => {
        // get levels user created
        try {
            socket.emit("RequestLevels", localStorage.getItem("PlayerID"), levels => {
                console.log(levels);

                if (levels.length <= 0) { // no levels
                    ReplaceText_Levellist.style.display = "block";

                } else { // create level display
                    ReplaceText_Levellist.style.display = "none";
                    LevelList_list.textContent = null;

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

        CreateLevel_LevelList.style.display = "flex";
        CreateLevel_Workbench.style.display = "none";

        ShowLevelListBtn.style.display = "none";
        ShowWorkbenchBtn.style.display = "flex";

        CreateLevel_Title.textContent = "Level list";
        UndoChangeBtn.style.display = "none";
    };

    AddLevelToList = (level) => {
        let li = document.createElement("li");
        li.classList = "Level_InLevelList";

        let span = document.createElement("span");
        span.textContent = level.level_name;

        let span1 = document.createElement("span");
        span1.classList = "LevelIconWrapper"

        let img = document.createElement("img");
        img.src = this.Settings.levelicon[parseInt(level.icon)];
        img.width = "32";
        img.height = "32";

        li.addEventListener("click", () => {
            this.selectedLevel = level.level_name;
            CurrentSelectedLevel_Display.textContent = `selected level: ${this.selectedLevel}`;

            // User entered create level mode
            let NewField = new NewLevel(level.bg1, level.bg2, level.required_points, level.player_timer, level.icon, level.bg_music, level.pattern, level.field, level.level_name, level.level_status,
                true, level.id);
            NewCreativeLevel = NewField;
            NewCreativeLevel.Init();
        });

        span1.appendChild(img);
        li.appendChild(span);
        li.appendChild(span1);
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
        };
    };

    // Init Carets of workbench 
    InitInput = () => {
        // update data on caret input
        ChangeSetting_leftCaret_All.forEach(caretLeft => {
            caretLeft.addEventListener("click", () => {
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
            caretLeft.addEventListener("click", () => {
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
        levelRequiredPointsToWinDisplay.addEventListener("keyup", () => {
            this.CurrentSelectedSetting.requiredpoints = parseInt(levelRequiredPointsToWinDisplay.textContent);

            // save in history
            this.SaveInHistory("requiredpoints", this.CurrentSelectedSetting.requiredpoints);
        });

        workbench_LevelName_Display.addEventListener("keyup", (event) => {
            this.CurrentSelectedSetting.name = workbench_LevelName_Display.textContent;

            // save in history
            this.SaveInHistory("name", this.CurrentSelectedSetting.name);
        });

        // undo stuff
        UndoChangeBtn.addEventListener("click", this.UndoHistory);
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
};

// initialize general scene
const InitCreateLevelScene = () => {
    // start event listener
    CreateLevel_leaveSceneBtn.addEventListener('click', () => {
        if (Object.keys(NewCreativeLevel.history).length <= 0) {
            LeaveCreateLevelScene();

        } else {
            saveLevelWarning.style.display = "flex";
            DarkLayer.style.display = "block";
        };
    });

    // switch between workbench and level list
    ShowLevelListBtn.addEventListener("click", () => {
        if (Object.keys(NewCreativeLevel.history).length <= 0) {
            NewCreativeLevel.StartLevelList();

        } else {
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
        if (!result) {
            AlertText.textContent = "Something went wrong!";
            DarkLayer.style.display = "block";
            alertPopUp.style.display = "flex";
            console.log(result);

        } else {
            DarkLayer.style.display = "none";
        };
    });

    NotSaveLevelBtn_FromWarning.addEventListener("click", () => {
        saveLevelWarning.style.display = "none";
        DarkLayer.style.display = "none";
    });

    closeSaveLevelWarning.addEventListener("click", () => {
        saveLevelWarning.style.display = "none";
        DarkLayer.style.display = "none";
    });

    SaveLevelBtn.addEventListener("click", () => {
        let result = NewCreativeLevel.Save();
        if (!result) {
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
        NewCreativeLevel.Init();
    });

    // toggle pattern 
    Workbench_togglePatternBtn.forEach(toggle_button => {
        toggle_button.addEventListener("click", (e) => {
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
};

// leave create level scene
const LeaveCreateLevelScene = () => {
    saveLevelWarning.style.display = "none";
    DarkLayer.style.display = "none";
    DarkLayerAnimation(gameModeCards_Div, CreateLevelScene);
    setTimeout(() => {
        PauseMusic();
        playGameTheme();
    }, 500);
};