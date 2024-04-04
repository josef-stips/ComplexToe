// random loading text in loading screen
function rnd_loadingText() {
    let rndIndex = Math.floor(Math.random() * 8);

    switch (rndIndex) {
        case 0:
            random_loadingText.textContent = "You need a profile to get skins";
            break;
        case 1:
            random_loadingText.textContent = "Seeing sunlight or playing advanture mode?";
            break;
        case 2:
            random_loadingText.textContent = "Server responded with shit";
            break;
        case 3:
            random_loadingText.textContent = "The probability of getting 10 X from a single treasure is one in 3000";
            break;
        case 4:
            let name = localStorage.getItem('UserName');
            name ? random_loadingText.textContent = `Hello ${name}! Did you already see sunlight today?` : random_loadingText.textContent = `Play the online mode or touch grass...`;
            break;
        case 5:
            random_loadingText.textContent = "Requesting shit from server...";
            break;
        case 6:
            random_loadingText.textContent = "Hey there, adventurer! Ever considered a break to smell the real roses?";
            break;
        case 7:
            let name2 = localStorage.getItem('UserName');
            name2 ? random_loadingText.textContent = `Greetings, ${name2}! Between quests, a bit of real-world sunshine, perhaps?` : random_loadingText.textContent = `Play the online mode or touch grass...`;
            break;
    };
};
rnd_loadingText();

// start of loading screen
// several things that load in the app gives progress points
let loading_progress = 0;
const loadingScreenFunc = () => { // starting value of progress is 10 because head info loaded
    // when DOM loaded => extra progress points
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            loading_progress = loading_progress + 65;
            loadingGame_ProcentDisplay.textContent = `${loading_progress}%`;
            loading_fill.style.width = `${loading_progress}%`;
        }, 10);
    });

    // when the function finished, it returns 24 points for the progress
    let AppLoaded_progressPoints = AppInit();

    // general stuff loaded
    loading_progress = loading_progress + AppLoaded_progressPoints;
    loadingGame_ProcentDisplay.textContent = `${loading_progress}%`;
    loading_fill.style.width = `${loading_progress}%`;

    // try to connect to server 
    try {
        socket = io("http://139.144.180.23", {
            // path: "http://139.144.180.23",
            // transports: ['websocket'],
        });
        // socket = io("http://localhost:3000", {
        //     // path: "http://localhost:3000",
        //     // transports: ['websocket'],
        // });
        window.socket = socket;

        socket.on('connect', () => {
            console.log('connected!  ' + socket.id);
        });

        loading_progress = loading_progress + 1;
        loadingGame_ProcentDisplay.textContent = `${loading_progress}%`;
        loading_fill.style.width = `${loading_progress}%`;

    } catch (error) { // error example: no internet
        console.log("error: ", error);

        DarkLayer.style.display = "block";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        AlertText.textContent = "It looks like you're offline! Try to reconnect.";
        DarkLayer.style.zIndex = "93000";

    } finally {
        // finally: check if loading progress finished
        checkLoadingProgress(loading_progress)
    };
};

// check if loading progress finished
function checkLoadingProgress() {
    if (loading_progress >= 100) {
        loadingScreen.style.display = "none";
        // start background music
        CreateMusicBars(audio);
        bodyBGIMG.forEach(e => e.style.display = "block");

        // start random icons on screen
        randomItemsOnScreen();

    } else {
        setTimeout(() => {
            checkLoadingProgress();
        }, 1000);
    };
};

// loads several dom head information dynamically
(function loadToHead() {
    try {
        let head = document.querySelector('head');
        // let script_fontawesome = document.createElement('script');
        let fonts_googleapis = document.createElement('link');
        let fonts_gstatic = document.createElement('link');
        let fonts_googleapis2 = document.createElement('link');
        let fonts_gstatic2 = document.createElement('link');
        let link_googleFont1 = document.createElement('link');
        let link_googleFont2 = document.createElement('link');

        // font awesome script
        // script_fontawesome.src = "https://kit.fontawesome.com/8f7afdedcd.js";
        // script_fontawesome.setAttribute("crossorigin", "anonymous");
        // google fonts tag 1
        fonts_googleapis.href = "https://fonts.googleapis.com";
        fonts_googleapis.rel = "preconnect";
        // google fonts tag 2
        fonts_gstatic.href = "https://fonts.gstatic.com";
        fonts_gstatic.setAttribute("crossorigin", true);
        // google fonts tag 3
        fonts_googleapis2.href = "https://fonts.googleapis.com";
        fonts_googleapis2.rel = "preconnect";
        // google fonts tag 4
        fonts_googleapis.href = "https://fonts.googleapis.com";
        fonts_googleapis.rel = "preconnect";
        // google fonts tag 5
        fonts_gstatic2.href = "https://fonts.gstatic.com";
        fonts_gstatic2.setAttribute("crossorigin", true);
        // font link 1 google
        link_googleFont1.href = "https://fonts.googleapis.com/css2?family=Geologica:wght@100;200;300;400;500;600;700;800;900&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
        link_googleFont1.rel = "stylesheet";
        // font link 1 google
        link_googleFont2.href = "https://fonts.googleapis.com/css2?family=Geologica:wght@100;200;300;400;500;600;700;800;900&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
        link_googleFont2.rel = "stylesheet";

        // head.appendChild(script_fontawesome);
        head.appendChild(fonts_googleapis);
        head.appendChild(fonts_gstatic);
        head.appendChild(fonts_googleapis2);
        head.appendChild(fonts_gstatic2);
        head.appendChild(link_googleFont2);
        head.appendChild(link_googleFont1);

        // when everything loaded to DOM => load things in loading screen
        loading_progress = loading_progress + 24;
        loadingScreenFunc();

    } catch (error) {
        console.log("error: " + error)

        DarkLayer.style.display = "block";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        AlertText.textContent = "It looks like you're offline! Try to reconnect.";
        DarkLayer.style.zIndex = "93000";

        loadingScreenFunc();
    };
})();

// app initialization and code --------------
function AppInit() {
    ini_LightDark_Mode();
    // local storage properties
    ElO_Points();
    OnlineMatchesWon();
    UserOfflineData();
    GameItems();
    // Check if fields are unlocked or not
    // The player can unlock these advanced fields by winning a specific amount of online matches
    locked_25x25();
    locked_30x30();
    locked_40x40();

    KI_Card_DescriptionDisplay.textContent = GameMode[1].description;
    OnlineFriend_Card_DescriptionDisplay.textContent = GameMode[2].description;
    ComputerFriend_Card_DescriptionDisplay.textContent = GameMode[3].description;

    checkForSettings();
    DisplayUserID();
    localItems();

    return 10;
};

function checkForSettings() {
    // check for the settings
    if (localStorage.getItem('sett-Secret') == "true") {
        document.getElementById('sett-secret').classList = "fa-regular fa-square-check checkBox";
        localStorage.setItem('sett-Secret', true);

    } else {
        document.getElementById('sett-secret').classList = "fa-regular fa-square checkBox";
        localStorage.setItem('sett-Secret', false);
    };

    if (localStorage.getItem('sett-MainCardAnimation')) {
        toggleMainCardAnimation("sett-MainCardAnimation");
    };

    if (localStorage.getItem('sett-MainCardSlideShow')) {
        MainCardDisplay("sett-MainCardSlideShow");
    };

    if (localStorage.getItem('sett-ShowFieldData')) {
        toggleFieldDataInGame("sett-ShowFieldData");
    };
    if (localStorage.getItem("sett-ShowBGColor")) {
        toggleShowBGColorInGame("sett-ShowBGColor");

    } else {
        localStorage.setItem("sett-ShowBGColor", "true");
    };

    if (localStorage.getItem('sett-DarkMode')) {
        // console.log(localStorage.getItem('sett-DarkMode'));
    };
    if (localStorage.getItem('sett-RoundEdges')) {
        // console.log(localStorage.getItem('sett-RoundEdges'));
    };

    if (localStorage.getItem('sett-ShowPing')) {
        // console.log(localStorage.getItem('sett-ShowPing'));
    };
    if (localStorage.getItem('ELO')) {
        // console.log(localStorage.getItem('ELO'));
    };
    if (localStorage.getItem('onlineMatches-won')) {
        // console.log(localStorage.getItem('onlineMatches-won'));
    };
};

const InitFullscreen = () => {
    if (localStorage.getItem("Fullscreen") == null) {
        localStorage.setItem("Fullscreen", true);
        settFullscreenBtn.classList = "fa-regular fa-check-square checkBox";
        window.App.ToggleFullScreen(true);
        settFullscreenBtn.setAttribute('marked', "true");

    } else if (localStorage.getItem("Fullscreen") == "false") {
        window.App.ToggleFullScreen(false);
        settFullscreenBtn.setAttribute('marked', "false");

    } else if (localStorage.getItem("Fullscreen") == "true") {
        window.App.ToggleFullScreen(true);
        settFullscreenBtn.classList = "fa-regular fa-check-square checkBox";
        settFullscreenBtn.setAttribute('marked', "true");
    };
};
InitFullscreen();

function ElO_Points() {
    let ELO_storage = localStorage.getItem('ELO');

    if (localStorage.getItem('ELO')) {
        ELO_Points_display.textContent = ELO_storage;
        userInfoSkillpoints.textContent = ELO_storage;

    } else {
        localStorage.setItem('ELO', '0');
        ELO_Points_display.textContent = localStorage.getItem('ELO');
        userInfoSkillpoints.textContent = localStorage.getItem('ELO');
    };
};

function OnlineMatchesWon() {
    let OnlineMatchesWon_storage = localStorage.getItem('onlineMatches-won');

    if (OnlineMatchesWon_storage) {
        userInfoOnlineMatchesWon.textContent = OnlineMatchesWon_storage;

    } else {
        localStorage.setItem('onlineMatches-won', 0);
        userInfoOnlineMatchesWon.textContent = localStorage.getItem('onlineMatches-won');
    };
};

// from app init which voids automatically at the start of the game
function UserOfflineData() {
    let name = localStorage.getItem('UserName');
    let icon = localStorage.getItem('UserIcon');
    let IconEleColor = localStorage.getItem('userInfoColor');
    let IconEleClass = localStorage.getItem('userInfoClass');

    if (!localStorage.getItem('current_used_skin')) {
        localStorage.setItem('current_used_skin', 'skin-default');
    };

    if (!localStorage.getItem('userInfoColor')) {
        localStorage.setItem('userInfoColor', 'white');
    };

    if (!localStorage.getItem('userInfoClass')) {
        localStorage.setItem('userInfoClass', "empty");
    };

    if (name && icon) {
        userInfoName.textContent = name;
        userInfoName.setAttribute('contenteditable', false)
        userInfoIcon.setAttribute('contenteditable', false)

        if (IconEleColor) {
            userInfoIcon.style.color = IconEleColor;
        };
        if (IconEleClass) {
            if (IconEleClass != 'empty') {
                let classArray = IconEleClass.split(" ");
                for (let i = 0; i < classArray.length; i++) {
                    userInfoIcon.classList.add(classArray[i]);
                };
            } else if (IconEleClass == "empty") {
                userInfoIcon.textContent = icon;
            };
        };
    } else { // user has not an account
        GetMessage_Btn.style.color = "rgb(80,80,80)";
        GetMessage_Btn.style.borderColor = "rgb(40,40,40)";
        GetMessage_Btn.removeEventListener('click', OpenGetMessagesPopUp);

        FriendsList_Btn.removeEventListener('click', OpenFriendsListPopUp);
        FriendsList_Btn.style.color = "rgb(80,80,80)";
        FriendsList_Btn.style.borderColor = "rgb(40,40,40)";

        SearchUser_Btn.removeEventListener('click', OpenSearchUserPopUp);
        SearchUser_Btn.style.color = "rgb(80,80,80)";
        SearchUser_Btn.style.borderColor = "rgb(40,40,40)";
    };
};

function GameItems() {
    let ItemX = localStorage.getItem('ItemX');
    let ItemDiamants = localStorage.getItem('GemsItem');

    if (ItemX && ItemDiamants) {
        Xicon.textContent = ItemX;
        gemsIcon.textContent = ItemDiamants;

    } else {
        localStorage.setItem('ItemX', 1);
        localStorage.setItem('GemsItem', 200);

        Xicon.textContent = 1;
        gemsIcon.textContent = 200;
    };
};

function InitOfficialPatterns_ToUI() {
    WinPatternsOverviewWrapper.textContent = null;

    for (const [key, val] of Object.entries(GamePatternsList)) {
        // console.log(key, val);
        createPattern_preview(key, val, WinPatternsOverviewWrapper, "level", undefined, 5, undefined, undefined, 5, undefined);
    };
};

function localItems() {
    // 100 recently used pattern from user
    Init_RecentUsedPatterns();
};

// 100 recently used pattern from user
function Init_RecentUsedPatterns() {
    // storage things
    let RecentUsedPatternsStorageObject = localStorage.getItem("100RecentUsedPatterns");
    let mostCommonPattern;

    if (RecentUsedPatternsStorageObject == null) {
        localStorage.setItem("100RecentUsedPatterns", "{}");
        localStorage.setItem("Last24HourUsedPatterns", "[]");

        userInfo_MostUsedPattern.textContent = "-";

    } else if (RecentUsedPatternsStorageObject) {
        // parse
        let recentUsedPatterns = JSON.parse(RecentUsedPatternsStorageObject);
        let PatternNames = Object.values(recentUsedPatterns).map(el => el[0]);

        if (PatternNames.length > 0) {
            mostCommonPattern = PatternNames.reduce((a, b, i, PatternNames) => (PatternNames.filter(v => v === a).length >= PatternNames.filter(v => v === b).length ? a : b));

            userInfo_MostUsedPattern.textContent = mostCommonPattern;

        } else {
            userInfo_MostUsedPattern.textContent = "-";
        };
    };

    if (!mostCommonPattern) {
        mostCommonPattern = "-";
    };

    // return for productive module reasons
    return mostCommonPattern;
};

// find pattern name
const FindPatternName = (els_list) => {
    let indexesOriginal = els_list.map(el => Number(el.getAttribute("cell-index")));

    let indexes = PatternStructureAsOrigin(boundaries, indexesOriginal, xCell_Amount);

    let is_official_pattern = false;

    // of this pattern its meta data
    let pattern_name;
    let pattern_indexes;

    // which patterns list (5, 10, 15, 20 etc.) to loop through
    let Patternslist = LoopInPatternList(xCell_Amount);

    if (Patternslist) {
        // check if this pattern is officical game pattern
        for (const [key, val] of Object.entries(Patternslist)) {
            // console.log(key, val, indexes);

            if (JSON.stringify(val) === JSON.stringify(indexes)) {
                is_official_pattern = true;
                pattern_name = key;
                pattern_indexes = val;
                break;
            };
        };
    };

    return pattern_name;
};

// player made a point with a win combination
const recentUsedPattern_add = (els_list) => { // els_list = array with the cell indexes
    console.log(els_list);

    // pattern index array like normal win pattern array
    let indexesOriginal = els_list;
    // console.log(boundaries, indexesOriginal, xCell_Amount);

    // win pattern with origin indexes of a NxN field
    let indexes = PatternStructureAsOrigin(boundaries, indexesOriginal, xCell_Amount);

    let is_official_pattern = false;

    // if pattern is not official, it cannot be added to the recent used pattern list
    let patternStorage = JSON.parse(localStorage.getItem("100RecentUsedPatterns"));

    // of this pattern its meta data
    let pattern_name;
    let pattern_indexes;

    // which patterns list (5, 10, 15, 20 etc.) to loop through
    let Patternslist = LoopInPatternList(xCell_Amount);

    // check if this pattern is officical game pattern
    if (Patternslist) {
        for (const [key, val] of Object.entries(Patternslist)) {
            // console.log(key, val, indexes);

            if (JSON.stringify(val) === JSON.stringify(indexes)) {
                is_official_pattern = true;
                pattern_name = key;
                pattern_indexes = val;
                break;
            };
        };
    };
    // console.log(indexes, is_official_pattern, pattern_name, pattern_indexes);

    // add just used win pattern to local storage
    if (is_official_pattern) {
        let origin_pattern_indexes = GamePatternsList[pattern_name]; // pattern indexes as origin 5x5
        let patternStorageLength = Object.keys(patternStorage).length;

        if (patternStorageLength > 0) {

            if (patternStorageLength == 100) {
                delete obj[Object.keys(patternStorage)[0]];

                patternStorage[patternStorageLength] = [pattern_name, origin_pattern_indexes];

            } else if (patternStorageLength < 100) {
                patternStorage[patternStorageLength] = [pattern_name, origin_pattern_indexes];
            };

        } else {

            patternStorage[0] = [pattern_name, origin_pattern_indexes];
        };
    };

    // save updated version in local storage
    localStorage.setItem("100RecentUsedPatterns", JSON.stringify(patternStorage));

    // add just used win pattern to daily challenge last 24 hour used patterns 
    let last24HoursUsedPatterns = JSON.parse(localStorage.getItem("Last24HourUsedPatterns"));
    last24HoursUsedPatterns.push(pattern_name);
    localStorage.setItem("Last24HourUsedPatterns", JSON.stringify(last24HoursUsedPatterns));
};

// check which game patterns list to loop through
function LoopInPatternList(x) {
    let list;

    switch (x) {
        case 5:
            list = GamePatternsList
            break;

        case 10:
            list = GamePatternsList10
            break;

        case 15:
            list = GamePatternsList15
            break;

        case 20:
            list = GamePatternsList20
            break;

        case 25:
            list = GamePatternsList25
            break;

        case 30:
            list = GamePatternsList30
            break;

        case 40:
            list = GamePatternsList40
            break;
    };

    return list;
};

// Set Light/Dark Mode
function Set_Light_Dark_Mode(from) { // legacy code. do not use
    // if (localStorage.getItem('sett-DarkMode') == "true") { // dark mode is already on, switch to light mode
    //     document.body.classList.remove('dark-mode');
    //     localStorage.setItem('sett-DarkMode', false);


    //     if (from == "moon") {
    //         settDarkMode.classList = "fa-regular fa-square checkBox";
    //         settDarkMode.setAttribute("marked", "false");
    //     };

    // } else { // light mode is already on, switch to dark mode
    //     document.body.classList.add('dark-mode');
    //     localStorage.setItem('sett-DarkMode', true);

    //     if (from == "moon") {
    //         settDarkMode.classList = "fa-regular fa-check-square checkBox";
    //         settDarkMode.setAttribute("marked", "true");
    //     };
    // };
    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    DarkLayer.style.display = "block";
    AlertText.textContent = "Do you really wanted to turn off the dark mode?!";
};

// set Light/Dark mode in the start of the app on the base of already existing data in localstorage
function ini_LightDark_Mode() {
    if (localStorage.getItem('sett-DarkMode') == undefined) {
        localStorage.setItem('sett-DarkMode', true);
    }

    if (localStorage.getItem('sett-DarkMode') == "true") { // dark mode is already on, switch to light mode
        document.body.classList.add('dark-mode');
        localStorage.setItem('sett-DarkMode', true);

        settDarkMode.classList = "fa-regular fa-check-square checkBox";
        settDarkMode.setAttribute("marked", "true");

    } else { // light mode is already on, switch to dark mode
        document.body.classList.remove('dark-mode');
        localStorage.setItem('sett-DarkMode', false);

        settDarkMode.classList = "fa-regular fa-square checkBox";
        settDarkMode.setAttribute("marked", "false");
    };
};