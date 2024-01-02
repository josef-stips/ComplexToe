// User wants to create a new online level
class NewLevel {
    constructor() {
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
                0: 4,
                1: 5,
                2: 10,
                3: 15,
                4: 20,
                5: 25,
                6: 30
            }
        };

        this.CurrentSelectedSetting = {
            "bgcolor1": 0, // selection
            "bgcolor2": 0, // selection

            "requiredpoints": 10, // costum
            "playertimer": 2, // selection
            "levelicon": 7, // selection,
            "bgmusic": 0,

            "allowedpatterns": [
                "hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
                "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2", "branch3", "branch4", "special1", "special2"
            ],
            "cellgrid": 4, // selection
            "name": "Your level name", // costum
        };
    };

    // Init new Level
    Init = () => {
        // Display workbench and undisplay level list
        this.StartWorkbench();
        // Init current settings
        this.InitCurrentSettings(this.CurrentSelectedSetting.bgmusic, this.CurrentSelectedSetting.bgcolor1, this.CurrentSelectedSetting.bgcolor2,
            this.CurrentSelectedSetting.requiredpoints, this.CurrentSelectedSetting.playertimer, this.CurrentSelectedSetting.levelicon, this.CurrentSelectedSetting.cellgrid);
        // Init carets
        this.InitInput();
    };

    // Delete and completely remove and kill created level
    Delete = () => {

    };

    // Many Functions 

    // display workbench
    StartWorkbench = () => {
        CreateLevel_Workbench.style.display = "flex";
        CreateLevel_LevelList.style.display = "none";
    };

    // display level list
    StartLevelList = () => {
        CreateLevel_LevelList.style.display = "flex";
        CreateLevel_Workbench.style.display = "none";
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

            let Cell = await ConfigureCellSize(cell, size);
            workbench_cellGrid.appendChild(Cell);
        };

        let cellSize;
        if (size == 5) {
            cellSize = "10.4vh";
        } else if (size == 10) {
            cellSize = "5vh";
        } else if (size == 15) {
            cellSize = "3.05vh";
        } else if (size == 20) {
            cellSize = "2.34vh";
        } else if (size == 4) {
            cellSize = "12.4vh";
        } else if (size == 25) {
            cellSize = "1.75vh";
        } else if (size == 30) {
            cellSize = "1.4vh";
        };

        workbench_cellGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        // workbench_cellGrid.style.gridAutoRows = cellSize;
    };

    // Init current settings on level
    InitCurrentSettings = (music, bg1, bg2, points, clock, icon, field, patterns) => {
        // bg music 
        if (music !== false) LevelMusicDisplay.textContent = this.Settings.bgmusic[music].replace("assets/Maps/", "");
        // bg colors
        if (bg1 !== false) levelBackgroundColor_ColorDisplay1.style.backgroundColor = this.PossibleColors[bg1];
        if (bg2 !== false) levelBackgroundColor_ColorDisplay2.style.backgroundColor = this.PossibleColors[bg2];
        if (bg1 !== false) levelBackgroundColor_HexDisplay1.textContent = this.PossibleColors[bg1];
        if (bg2 !== false) levelBackgroundColor_HexDisplay2.textContent = this.PossibleColors[bg2];
        // required points to win
        if (points !== false) this.Settings.requiredpoints.pointUserSelected = points;
        if (points !== false) levelRequiredPointsToWinDisplay.textContent = this.Settings.requiredpoints.pointUserSelected;
        // player timer
        if (clock !== false) levelPlayerClockDisplay.textContent = `${this.Settings.playertimer[clock]} sec.`;
        // level icon
        if (icon !== false) LevelIconDisplay.src = this.Settings.levelicon[icon];
        // field size
        if (field !== false) this.GenerateField(this.Settings.cellgrid[field]);
        // allowed patterns
        if (patterns !== false) this.CurrentSelectedSetting.allowedpatterns = patterns;
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
                        this.CurrentSelectedSetting.allowedpatterns)
                };
            });
        });

        // update data on caret input
        ChangeSetting_rightCaret_All.forEach(caretLeft => {
            caretLeft.addEventListener("click", () => {
                let forSetting = caretLeft.getAttribute("for");
                let correspondingSetting = this.Settings[forSetting];
                let correspondingCurrentSetting = this.CurrentSelectedSetting[forSetting]; // index as int

                if (correspondingCurrentSetting >= Object.keys(correspondingSetting).length - 1 && forSetting != "requiredpoints") {
                    return;

                } else {
                    // update value in current setting object
                    this.CurrentSelectedSetting[forSetting] = correspondingCurrentSetting + 1;

                    // refresh settings
                    this.InitCurrentSettings(this.CurrentSelectedSetting.bgmusic, this.CurrentSelectedSetting.bgcolor1, this.CurrentSelectedSetting.bgcolor2,
                        this.CurrentSelectedSetting.requiredpoints, this.CurrentSelectedSetting.playertimer, this.CurrentSelectedSetting.levelicon, this.CurrentSelectedSetting.cellgrid,
                        this.CurrentSelectedSetting.allowedpatterns)
                };
            });
        });

        // bug fix
        levelRequiredPointsToWinDisplay.addEventListener("keydown", (event) => {
            let len = event.target.textContent.trim().length;
            if (len === 1 && event.key == "Backspace" || len === 1 && event.key == "Delete") {
                event.preventDefault();
                return false;
            };
        });

        // update data on user input
        levelRequiredPointsToWinDisplay.addEventListener("keyup", () => {
            this.CurrentSelectedSetting.requiredpoints = parseInt(levelRequiredPointsToWinDisplay.textContent);
        });

        workbench_LevelName_Display.addEventListener("keyup", (event) => {
            this.CurrentSelectedSetting.name = parseInt(workbench_LevelName_Display.textContent);
        });
    };
};