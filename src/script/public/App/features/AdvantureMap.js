// Check for map level - initializ
function UnlockedMapLevel() {
    if (!localStorage.getItem('unlocked_mapLevels')) {
        // current info about each single map level
        // 1: unlocked or not , 2: how many keys player need to unlock level, 3: name of the level
        // 4: dificulty in procent 0-100, 5: field size 6: font-awesome-icon, 7: allowed,patterns, 8: speech bubble text, 9: required amount of points to win, 10: Inner Game Mode
        let mapLevels = {
            1: [true, 0, "The beginning of agony", 20, 20, "fa-solid fa-skull", ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
                    "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2", "branch3", "branch4", "special1", "special2"
                ],
                ["Here begins the journey to become king and defeat your greatest enemy. Do you really think you will survive this?",
                    "To conquer this level you have to score 5 points against your enemy."
                ], 5, InnerGameModes[3]
            ], // level 1 is unlocked by default
            2: [false, 2, "extinct happiness", 30, 20, "fa-solid fa-skull", ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
                    "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2"
                ],
                ["Congrats on winning the first level in this deadly journey. But this is still only the beginning...",
                    "To conquer this level you have to score 7 points against your enemy."
                ], 7, InnerGameModes[3]
            ],
            3: [false, 6, "villain steps", 35, 25, "fa-solid fa-skull", ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
                    "W1", "W2", "W3", "W4", "star", "diamond", "branch1"
                ],
                ["With every level it gets more serious now. Keep your eyes open!",
                    "To conquer this level you have to score 8 points against your enemy."
                ], 8, InnerGameModes[1]
            ],
            4: [false, 4, "traces of the eye", 55, 25, "fa-solid fa-skull", ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
                    "W1", "W2", "W3", "W4", "star", "diamond", "branch1"
                ],
                ["You entered the really dangerous side of this journey now. Will you survive?",
                    "To conquer this level you have to score 10 points against your enemy."
                ], 10, InnerGameModes[2]
            ],
            5: [false, 5, "bloodbath", 55, 25, "fa-solid fa-skull", ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
                    "W1", "W2", "W3", "W4", "star", "diamond", "branch1"
                ],
                ["Are you struggling? You have survived half of the journey. You can see the blood of the previous players who tried this level.",
                    "To conquer this level you have to score 11 points against your enemy."
                ], 11, InnerGameModes[3]
            ],
            6: [false, 5, "wide forest", 65, 25, "fa-solid fa-skull", ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
                    "W1", "W2", "W3"
                ],
                ["Most of the players here have already given up or lost their way. Do you really want to continue or give up?",
                    "To conquer this level you have to score 7 points against your enemy."
                ], 7, InnerGameModes[1]
            ],
            7: [false, 5, "silent cave", 75, 30, "fa-solid fa-skull", ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4"],
                ["The playing field has become larger. More room for your frustration to spread.",
                    "To conquer this level you have to score 9 points against your enemy."
                ], 9, InnerGameModes[1]
            ],
            8: [false, 5, "unknown dungeon", 85, 30, "fa-solid fa-skull", ["hor", "vert", "dia", "dia2", "L1", "L2"],
                ["Only the top 0.4% of players reached this level. Congratulations! But don't be too optimistic..",
                    "To conquer this level you have to score 13 points against your enemy."
                ], 13, InnerGameModes[2]
            ],
            9: [false, 5, "Last step before death", 90, 30, "fa-solid fa-skull", ["hor", "vert", "dia", "dia2", "L1"],
                ["Holy! This is the last step before you are never seen again. I don't know if you can do it.",
                    "To conquer this level you have to score 15 points against your enemy and defeat the evil sun."
                ], 15, InnerGameModes[3]
            ],
            10: [false, 5, "The eye", 100, 30, "fa-solid fa-skull", ["hor", "vert", "dia"],
                ["Never before has a player come this far. The almighty eye is invincible and sees everything, so it will destroy you instantly.",
                    "To conquer this level you have to score 20 points and defeat the eye."
                ], 20, InnerGameModes[3]
            ],
        };

        // level descriptions
        const levelDescriptions = {
            1: "Welcome to the world of adventure! This is the beginning of your journey, where you acquaint yourself with the basics. But be warned, the real challenge awaits you.",
            2: "The place of once-extinct happiness is now abandoned and shrouded in darkness. The secrets lurking in this gloomy environment will test your determination.",
            3: "Step by step, you approach the realm of evil. The scouting skills you've acquired so far will be crucial to overcome the impending horrors.",
            4: "Traces of the mysterious eye become visible. Darkness intensifies, but so does your determination. Will you be able to endure the gaze of the unknown?",
            5: "The world is shaken by a bloodbath. You must prove yourself in this bloody carnage and continue your journey as you battle against enemies.",
            6: "The forest stretches in all directions, and the paths are numerous. The confusion and enigmatic challenges grow as you delve deeper into the woods.",
            7: "A mysterious silence prevails in this cave. You will uncover dark secrets and unforeseen dangers. Keep your senses sharp to survive.",
            8: "Darkness will be your constant companion in this unknown dungeon. Here, the trials are the toughest, but you must remain steadfast to survive.",
            9: "You stand on the brink of death. The final trials are the most challenging, but also the most crucial. Your survival now depends on your skills.",
            10: "You've made it to the Eye of the Unknown, the end boss of your journey. The ultimate battle between light and darkness awaits. Are you ready to become the evil to fight the evil?"
        };

        localStorage.setItem('mapLevel_descriptions', JSON.stringify(levelDescriptions));
        localStorage.setItem('unlocked_mapLevels', JSON.stringify(mapLevels));
    };

    // check if level is already completed, if yes change map level icon
    mapLevelIcon();
};

// check wether a level is completed or not, alter map icon
function mapLevelIcon() {
    // length of level amount
    let level_amount = Object.keys(JSON.parse(localStorage.getItem("unlocked_mapLevels"))).length;

    // i = 1 so the first level gets skipped
    for (let i = 1; i < level_amount; i++) {
        let level = document.querySelector(`[level="${i + 1}"]`);
        let completed = localStorage.getItem(`completed_mapLevel${i}`); // if completed previous level

        // check if player completed this level
        if (i + 1 != 9 && i + 1 != 10) { // level 9 and 10 have their own icon regardless wether they are unlocked or not
            if (completed) {
                level.className = `fa-regular fa-circle-dot mapLevel_Btn`; // completed
            } else {
                level.className = `fa-solid fa-lock mapLevel_Btn`; // not completed
            };
        };
    };
};

let current_selected_level = null;

// In the advanture Map there are items the player can set free by completing a level
// The first item can be selected for free
function UnlockedMapItems() {
    let mapItems = [...mapItem];

    // display key value in map and lobby
    if (!localStorage.getItem('keys')) localStorage.setItem('keys', 0);
    mapKeyValueDisplay.textContent = localStorage.getItem('keys');
    KEYicon.textContent = localStorage.getItem('keys')

    // The first item is for free
    if (!localStorage.getItem("unlocked_mapItem_1")) {
        localStorage.setItem('unlocked_mapItem1', true);
    };

    // If player not opened map item n 
    mapItem.forEach((value, key) => {
        // add eventlistener
        value.addEventListener('click', () => {
            let completed;

            if (value == mapItem[0]) {
                completed = true;
            } else {
                completed = localStorage.getItem(`completed_mapLevel${key}`);
            };

            if (!localStorage.getItem(`opened_mapItem${key + 1}`) && completed) {
                let keys = parseInt(localStorage.getItem('keys'));

                localStorage.setItem(`opened_mapItem${key + 1}`, true);

                // animation
                // position of mapKey
                let KeyRect = mapKey.getBoundingClientRect();
                // position of clicked map item gets calculated in ItemAnimation function 
                let Item = mapItem[key]; // nth item

                let count = 0
                let startAnimation = setInterval(() => {
                    count++;
                    ItemAnimation('fa-solid fa-key', KeyRect, true, Item) // third param: fromMap, forth param: start position of clicked item

                    // max. 5 keys to get
                    if (count >= 5) {
                        clearInterval(startAnimation);
                        startAnimation = null;
                    };
                }, 100);

                // Bug fixes
                setTimeout(() => {
                    mapKey.style.animation = "unset";
                }, 1000);
                value.style.animation = "unset";
            };
        });

        // Check for all map items if they are already opened
        if (!localStorage.getItem(`opened_mapItem${key + 1}`) && localStorage.getItem(`unlocked_mapItem${key + 1}`)) {
            value.style.animation = "2s infinite treasure_availible ease-in-out";

        } else {
            value.style.animation = "none";
        };
    });
};
UnlockedMapItems();
UnlockedMapLevel();

// event listener for map level
MapLevelBtns.forEach((item, k) => {
    item.addEventListener('click', () => {
        let unlocked_mapLevels = JSON.parse(localStorage.getItem('unlocked_mapLevels'));
        let mapLevel_descriptions = JSON.parse(localStorage.getItem('mapLevel_descriptions'));

        // Check if level is unlocked
        if (unlocked_mapLevels[k + 1][0]) {
            DarkLayer.style.display = 'block';
            mapLevelOverview.style.display = 'flex';
            mapLevelTitle.textContent = unlocked_mapLevels[k + 1][2];

            // for better user experience
            MapLevel_IconInput.value = null;
            MapLevel_NameInput.value = null;
            MapLevel_IconInput.style.display = 'block';
            Map_SkinInputDisplay.style.display = 'none';
            MapLevel_SetIconLabel.style.display = 'block';

            // parse default data
            MapLevel_IconInput.style.color = localStorage.getItem('userInfoColor');
            if (localStorage.getItem('userInfoColor') == "var(--font-color)") {
                MapLevel_IconInput.style.color = "black";
            };

            if (localStorage.getItem('UserName')) {
                MapLevel_NameInput.value = localStorage.getItem('UserName');
                MapLevel_IconInput.value = localStorage.getItem('UserIcon');
            };

            if (localStorage.getItem('userInfoClass') != "empty") {
                MapLevel_IconInput.style.display = 'none';
                MapLevel_SetIconLabel.style.display = 'none';
                Map_SkinInputDisplay.style.display = 'block';

                Map_SkinInputDisplaySkin.className = 'fa-solid fa-' + localStorage.getItem('current_used_skin');
            };

            // for level data
            setTimeout(() => {
                let width = 100 - unlocked_mapLevels[k + 1][3];
                MapLevel_Bar_fillElement.style.transition = "all 1s ease-in-out";
                MapLevel_Bar_fillElement.style.width = `${width}%`;
            }, 1);
            mapLevel_description.textContent = mapLevel_descriptions[k + 1];

            // allowed patterns text
            let patterns = unlocked_mapLevels[k + 1][6];
            if (patterns.length == 20) {
                mapLevel_AllowedPatterns_Text.textContent = "All patterns are allowed";
            } else {
                mapLevel_AllowedPatterns_Text.textContent = patterns.join(', ');
            };

            // initialize current selected level
            current_selected_level = k + 1;

            // check if user completed this level
            let mapLevel = localStorage.getItem(`completed_mapLevel${k + 1}`);

            // if it exists => user completed this level => do sutff
            if (mapLevel) { // update conquered map level display on level overview pop up
                conquered_MapLevel_Display.textContent = "Yes";
            } else {
                conquered_MapLevel_Display.textContent = "Nope";
            };

            // inner game mode display
            let innerGameMode = unlocked_mapLevels[k + 1][9];
            mapLevel_ModeDisplay.textContent = `Mode: ${innerGameMode}`;

        } else {
            // Level is not unlocked
            DarkLayer.style.display = 'block';
            alertPopUp.style.display = 'flex';
            AlertText.textContent = `Collect ${unlocked_mapLevels[k + 1][1]} keys and complete the previous level to unlock this one.`;
        };
    });
});

// check which level the user already conquered
function conqueredLevels() {
    for (let i = 0; i <= 10; i++) {
        let mapLevel_completed = localStorage.getItem(`completed_mapLevel${i}`);
        let mapLevel_unlocked = localStorage.getItem(`completed_mapLevel${i - 1}`);

        // if it exists => user completed this level => do sutff
        if (mapLevel_completed) { // update conquered map level display on level overview pop up
            conquered_MapLevel_Display.textContent = "Yes";
        };

        // If user unlocked the next level but didn't conquered it yet
        if (!mapLevel_completed && mapLevel_unlocked) {
            MapLevelBtns[i - 1].style.animation = "floating-el 5s infinite";
        };
    };
};
conqueredLevels();

// planet
planet.addEventListener('click', () => {
    // sound
    playBtn_Audio_2();

    // style animation
    DarkLayer.style.backgroundColor = 'black';
    DarkLayer.style.display = 'block';
    DarkLayer.style.transition = 'opacity 0.1s ease-in';
    DarkLayer.style.opacity = '0';

    setTimeout(() => {
        DarkLayer.style.opacity = '1';
        setTimeout(() => {
            AdvantureMap.style.display = 'flex';
            gameModeCards_Div.style.display = 'none';
        }, 100);
    }, 100);

    setTimeout(() => {
        DarkLayer.style.opacity = '0';

        setTimeout(() => {
            DarkLayer.style.display = 'none';
            DarkLayer.style.transition = 'none';
            DarkLayer.style.opacity = '1';
            DarkLayer.style.backgroundColor = 'rgba(0, 0, 0, 0.87)';
        }, 400);
    }, 400);

    inAdvantureMode = true;

    playMapTheme();
});

AdvantureMapBackbtn.addEventListener('click', () => {
    // sound
    playBtn_Audio_2();

    // style animation
    DarkLayer.style.backgroundColor = 'black';
    DarkLayer.style.display = 'block';
    DarkLayer.style.transition = 'opacity 0.1s ease-in';
    DarkLayer.style.opacity = '0';

    setTimeout(() => {
        DarkLayer.style.opacity = '1';
        setTimeout(() => {
            AdvantureMap.style.display = 'none';
            gameModeCards_Div.style.display = 'flex';
        }, 100);
    }, 100);

    setTimeout(() => {
        DarkLayer.style.opacity = '0';

        setTimeout(() => {
            DarkLayer.style.display = 'none';
            DarkLayer.style.transition = 'none';
            DarkLayer.style.opacity = '1';
            DarkLayer.style.backgroundColor = 'rgba(0, 0, 0, 0.87)';
        }, 400);
    }, 400);

    inAdvantureMode = false;

    playGameTheme();
});

// close button for single level overview pop up
closeMapLevelOverviewBtn.addEventListener('click', () => {
    DarkLayer.style.display = 'none';
    mapLevelOverview.style.display = 'none';
    MapLevel_Bar_fillElement.style.width = "100%";
});

// Map player data input
MapLevel_NameInput.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^A-Za-z]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    };
});

MapLevel_IconInput.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^A-Za-z]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    };

    MapLevel_IconInput.style.color = localStorage.getItem('userInfoColor');
    if (localStorage.getItem('userInfoColor') == "var(--font-color)") {
        MapLevel_IconInput.style.color = "black";
    };
});

// start map level button
startMapLevelBtn.addEventListener('click', () => {
    // If user set icon and name, game can be ini. and started
    if (MapLevel_NameInput.value != "" && MapLevel_IconInput.value != "" && MapLevel_IconInput.value != "Y") {
        let user_unlocked_Advanced_fields = true;

        // for better user experience (not important)
        MapLevel_Bar_fillElement.style.width = "100%";

        // html stuff
        mapLevelOverview.style.display = 'none';
        AdvantureMap.style.display = 'none';
        lobbyHeader.style.borderBottom = 'none';

        // initialize game with the right values
        let unlocked_mapLevels = JSON.parse(localStorage.getItem('unlocked_mapLevels'));
        let field_size = unlocked_mapLevels[current_selected_level][4];
        let allowed_patterns = unlocked_mapLevels[current_selected_level][6]; // array
        let required_amount_to_win = unlocked_mapLevels[current_selected_level][8]; // int

        // If user did not unlock field 25x25 or field 30x30
        if (DataFields[`${field_size}x${field_size}`] == undefined) {
            DataFields['25x25'] = document.querySelector('#twentyfivextwentyfive');
            DataFields['30x30'] = document.querySelector('#thirtyxthirty');
            user_unlocked_Advanced_fields = false;
        };

        curr_field_ele = DataFields[`${field_size}x${field_size}`];

        curr_mode = GameMode[1].opponent;
        curr_name1 = MapLevel_NameInput.value;
        curr_name2 = 'The unknown'; // Bot
        curr_form1 = MapLevel_IconInput.value;
        curr_form2 = 'Y' // Bot        
        curr_innerGameMode = unlocked_mapLevels[current_selected_level][9];

        initializeGame(curr_field_ele, undefined, undefined, allowed_patterns, unlocked_mapLevels[current_selected_level][2], required_amount_to_win, curr_innerGameMode);

        // delete values again
        if (!user_unlocked_Advanced_fields) {
            delete DataFields['25x25'];
            delete DataFields['30x30'];
        };

        // start speech bubbles
        level_startSpeechBubbles();

        // play theme music 
        PauseMusic();
        switch (current_selected_level) {
            case 10: // last level
                CreateMusicBars(theEye_theme);
                break;

            default:
                // random default music
                let r = Math.floor(Math.random() * 3);

                if (r == 1) {
                    CreateMusicBars(default_MapLevel_theme);
                } else CreateMusicBars(default_MapLevel_theme2);

                break;
        };
    };
});

// when the user starts a level, speech bubbles occur
// animation and initialization for speech bubbles
function level_startSpeechBubbles() {
    // animation
    animatedPopUp.style.display = 'block';
    animatedPopUp.style.animation = "animated_popUp 1s ease";
    // start text
    let unlocked_mapLevels = JSON.parse(localStorage.getItem('unlocked_mapLevels'));
    let level_text = unlocked_mapLevels[current_selected_level][7];

    // new ini text
    let TextHead = document.createElement("h2");
    let newText = document.createTextNode(level_text[0]);
    TextHead.classList.add("newText")
    TextHead.appendChild(newText);
    animatedPopMain.appendChild(TextHead);
    animatedPopMain.querySelectorAll("h2")[0].style.display = "none";
    animatedPopMain.querySelectorAll("h2")[1].style.display = "none";
};

// user won advanture level and got back to the advanture map
function UserWon_AdvantureLevel(won_levelIndex) {
    let nextLevel;
    switch (won_levelIndex) {
        default: // default: normal level
        // if level not conquered yet 
            if (!localStorage.getItem(`completed_mapLevel${won_levelIndex}`)) {
                nextLevel = document.querySelector(`[level="${won_levelIndex + 1}"]`);
                nextLevel.style.animation = "unlock_field 3s ease-in-out";

                // animation
                if (won_levelIndex + 1 != 9 && won_levelIndex + 1 != 10) {
                    setTimeout(() => {
                        nextLevel.style.transition = "opacity 300ms linear";
                        nextLevel.style.opacity = "0";

                        setTimeout(() => {
                            nextLevel.style.opacity = "1";
                            nextLevel.className = "fa-regular fa-circle-dot";
                            nextLevel.classList.add('mapLevel_Btn');
                        }, 500);
                        nextLevel.style.animation = "none";
                    }, 3000);

                } else { // The level 9 and 10 (the two last boss level) have an another animation
                    nextLevel.style.animation = "floating-el 5s infinite";
                };

                // localstorage things
                localStorage.setItem(`unlocked_mapItem${won_levelIndex + 1}`, true);
                localStorage.setItem(`completed_mapLevel${won_levelIndex}`, true);

                let LevelData = JSON.parse(localStorage.getItem('unlocked_mapLevels'));
                LevelData[won_levelIndex + 1][0] = true;
                localStorage.setItem(`unlocked_mapLevels`, JSON.stringify(LevelData));

                // animation for item that got availible
                mapItem[won_levelIndex].style.animation = "2s infinite treasure_availible ease-in-out";

                // update conquered map level display on level overview pop up
                conquered_MapLevel_Display.textContent = "Yes";
            };
        break;

        case 10: // boss level
            // if boss level not completed yet
                if (!localStorage.getItem(`completed_mapLevel${won_levelIndex}`)) {

                    // localstorage things
                    localStorage.setItem(`completed_mapLevel${won_levelIndex}`, true);

                    // animation for item that got availible
                    mapItem[won_levelIndex].style.animation = "2s infinite treasure_availible ease-in-out";

                    // update conquered map level display on level overview pop up
                    conquered_MapLevel_Display.textContent = "Yes";
                };
            break;
    };
};