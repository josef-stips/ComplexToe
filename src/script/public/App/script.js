// important data
let GameMode = {
    1: {
        "opponent": "KI", // This KI Mode doesn't exists as a mode anymore but as an info for advanture mode
        "icon": "fa-solid fa-robot",
        "description": "Create a level" // the "create level mode" was originally a Ki mode but the advanture map replaced it
    },
    2: {
        "opponent": "OnlineFriend", // Guy you send a link to so you can play with him together
        "icon": "fa-solid fa-user-group",
        "description": "Play online"
    },
    3: {
        "opponent": "ComputerFriend", // Guy on same computer
        "icon": "fa-solid fa-computer",
        "description": "Play offline"
    },
    4: {
        "opponent": "CreateLevel",
        "icon": "",
        "description": "Create Level",
    }
};

let Fields = {
    1: {
        "name": "Quick Death",
        "size": "5x5",
        "blocks": "25",
        "xyCellAmount": "5",
        "icon": "fa-solid fa-baby",
        "averagePlayTime": "30 seconds",
        "theme": ".../assets/Maps/Quick_Death.mp3",
        "theme_name": Quick_death_Theme,
    },
    2: {
        "name": "March into fire",
        "size": "10x10",
        "blocks": "100",
        "xyCellAmount": "10",
        "icon": "fa-solid fa-dragon",
        "averagePlayTime": "5 minutes",
        "theme": ".../assets/Maps/March_into_fire.mp3",
        "theme_name": March_into_fire_Theme,
    },
    3: {
        "name": "Tunnel of truth",
        "size": "15x15",
        "blocks": "225",
        "xyCellAmount": "15",
        "icon": "fa-solid fa-chess-knight",
        "averagePlayTime": "10 minutes",
        "theme": ".../assets/Maps/Tunnel_of_truth.mp3",
        "theme_name": Tunnel_of_truth_Theme,
    },
    4: {
        "name": "Long funeral",
        "size": "20x20",
        "blocks": "400",
        "xyCellAmount": "20",
        "icon": "fa-solid fa-skull",
        "averagePlayTime": "20 minutes",
        "theme": ".../assets/Maps/Long_Funeral.mp3",
        "theme_name": Long_funeral_Theme,
    },
    5: {
        "name": "Small Price",
        "size": "3x3",
        "blocks": "9",
        "xyCellAmount": "3",
        "icon": "fa-solid fa-chess-knight",
        "averagePlayTime": "30 seconds",
        "theme": ".../assets/Maps/Tunnel_of_truth.mp3",
        "theme_name": Quick_death_Theme,
    },
    6: {
        "name": "Thunder Advanture",
        "size": "4x4",
        "blocks": "16",
        "xyCellAmount": "4",
        "icon": "fa-solid fa-skull",
        "averagePlayTime": "1 minute",
        "theme": ".../assets/Maps/Long_Funeral.mp3",
        "theme_name": Long_funeral_Theme,
    },
    7: {
        "name": "random",
        "size": "???",
        "blocks": "???",
        "xyCellAmount": "???",
        "icon": "???",
        "averagePlayTime": "??? minutes",
        "theme": "???",
        "theme_name": "???",
    },
    8: {
        "name": "Ground destroyer",
        "size": "25x25",
        "blocks": "625",
        "xyCellAmount": "25",
        "icon": "fa-solid fa-hamsa",
        "averagePlayTime": "30 minutes",
        "theme": ".../assets/Maps/Ground_destroyer.mp3",
        "theme_name": Ground_destroyer_Theme,
    },
    9: {
        "name": "Impossible survival",
        "size": "30x30",
        "blocks": "900",
        "xyCellAmount": "30",
        "icon": "fa-solid fa-horse-head",
        "averagePlayTime": "2+ hours",
        "theme": ".../assets/Maps/Impossible_survival.mp3",
        "theme_name": Impossible_survival_Theme,
    },
    10: {
        "name": "Merciful slaughter",
        "size": "40x40",
        "blocks": "1600",
        "xyCellAmount": "40",
        "icon": "fa-solid fa-eye",
        "averagePlayTime": "5+ hours",
        "theme": ".../assets/Maps/Merciful_slaughter.mp3",
        "theme_name": Merciful_slaughter_Theme,
    },
};

// The user can switch between the different game data in the lobby
// *Online mode 
let LobbyDataSelections = {
    // Fieldsize
    1: {
        1: '5x5',
        2: '10x10',
        3: '15x15',
        4: '20x20',
        // 5: '25x25',
        // 6: '30x30',
        // 7: '40x40',
    },
    // Player clock
    2: {
        1: '5 seconds',
        2: '15 seconds',
        3: '30 seconds',
        4: '50 seconds',
        5: '70 seconds',
    },
    // Inner game mode
    3: {
        1: 'Boneyard',
        2: 'Blocker Combat',
        3: 'Free Fight',
    },
};

// to specicify in selection
let PlayerClockData = {
    '5 seconds': 5,
    '15 seconds': 15,
    '30 seconds': 30,
    '50 seconds': 50,
    '70 seconds': 70,
};

// to specicify in selection
let DataFields = {
    '5x5': document.querySelector('#FivexFive_Field'),
    '10x10': document.querySelector('#TenxTen_Field'),
    '15x15': document.querySelector('#FifTeenxFifTeen_Field'),
    '20x20': document.querySelector('#TwentyxTwentyField'),
    // '25x25': document.querySelector('#twentyfivextwentyfive'),
    // '30x30': document.querySelector('#thirtyxthirty'),
    // '40x40': document.querySelector('#fortyxforty'),
};

let curr_field_ele; //html element
let curr_name1 = ""; // from html input field
let curr_name2 = ""; // from html input field
let curr_form1 = ""; // player1 form (X, O etc.)
let curr_form2 = ""; // player2 form (X, O etc.)
let curr_innerGameMode = ""; // Inner Game Mode: Boneyard, Blocker Combat, Free Fight
let curr_selected_PlayerClock = ""; // Player selected a game clock for the game initializing ... This time says how much time the player has to set
let firstClock // First Player's clock
let secondClock // Second Player's clock

let gameCounter // Game's clock

let score_Player1_numb = 0;
let score_Player2_numb = 0;

let curr_mode = "";
let inAdvantureMode = false;

// for creating a profile
let userName = "";
let userIcon = "";

let UserEditsQuote = false;

let UserIsOnProfileFromOtherPlayer = false;

let AmountOfReceivedMessages = 0;
let AmountOfReceivedRequests = 0;

// The Alert pop up is a general pop up you can use for any scenario with personalized text
// Sometimes you open alert pop up while being in normal pop up and you don't want that the darkLayer in the background disapears
let OpenedPopUp_WhereAlertPopUpNeeded = false;

// allowed patterns choosed by player
// At the beginning all patterns are allowed, the user can choose which one to disable
let allowedPatternsFromUser = ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
    "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2", "branch3", "branch4", "special1", "special2"
];

// patterns of all official win patterns such as "hor", "vert" ...
let OfficialGamePatterns = [
    [0, 1, 2, 3],
    [0, 5, 10, 15],
    [0, 6, 12, 18],
    [3, 7, 11, 15],
    [0, 5, 10, 11, 12],
    [2, 7, 10, 11, 12],
    [0, 1, 2, 5, 10],
    [0, 1, 2, 7, 12],
    [0, 1, 6, 7, 12],
    [0, 5, 6, 11, 12],
    [1, 2, 5, 6, 10],
    [2, 6, 7, 10, 11],
    [0, 2, 6, 10, 12],
    [1, 5, 7, 11],
    [0, 2, 6, 11, 16],
    [1, 6, 11, 15, 17],
    [3, 5, 6, 7, 13],
    [0, 6, 7, 8, 10],
    [0, 1, 2, 5, 6],
    [0, 1, 5, 6, 7]
];

// origin patterns list on a 5x5 field
let GamePatternsList = {
    "hor": [0, 1, 2, 3],
    "vert": [0, 5, 10, 15],
    "dia": [0, 6, 12, 18],
    "dia2": [3, 7, 11, 15],
    "L1": [0, 5, 10, 11, 12],
    "L2": [2, 7, 10, 11, 12],
    "L3": [0, 1, 2, 5, 10],
    "L4": [0, 1, 2, 7, 12],
    "W1": [0, 1, 6, 7, 12],
    "W2": [0, 5, 6, 11, 12],
    "W3": [1, 2, 5, 6, 10],
    "W4": [2, 6, 7, 10, 11],
    "star": [0, 2, 6, 10, 12],
    "diamond": [1, 5, 7, 11],
    "branch1": [0, 2, 6, 11, 16],
    "branch2": [1, 6, 11, 15, 17],
    "branch3": [3, 5, 6, 7, 13],
    "branch4": [0, 6, 7, 8, 10],
    "special1": [0, 1, 2, 5, 6],
    "special2": [0, 1, 5, 6, 7]
}

// 10x10 field
let GamePatternsList10 = {
    "hor": [0, 1, 2, 3],
    "vert": [0, 10, 15, 20],
    "dia": [0, 11, 22, 33],
    "dia2": [3, 12, 21, 30],
    "L1": [0, 10, 20, 21, 22],
    "L2": [20, 21, 22, 12, 2],
    "L3": [0, 1, 2, 10, 20],
    "L4": [0, 1, 2, 12, 22],
    "W1": [0, 1, 11, 12, 22],
    "W2": [0, 10, 11, 21, 22],
    "W3": [1, 2, 10, 11, 20],
    "W4": [2, 11, 12, 20, 21],
    "star": [0, 2, 11, 20, 22],
    "diamond": [1, 10, 12, 21],
    "branch1": [0, 2, 11, 21, 31],
    "branch2": [1, 11, 21, 30, 32],
    "branch3": [10, 11, 12, 3, 23],
    "branch4": [0, 20, 11, 12, 13],
    "special1": [0, 1, 2, 10, 11],
    "special2": [0, 1, 10, 11, 12]
}

// 15x15 field
let GamePatternsList15 = {
    "hor": [0, 1, 2, 3],
    "vert": [0, 15, 30, 45],
    "dia": [0, 16, 32, 48],
    "dia2": [3, 17, 31, 45],
    "L1": [0, 15, 30, 31, 32],
    "L2": [30, 31, 32, 17, 2],
    "L3": [0, 1, 2, 15, 30],
    "L4": [0, 1, 2, 17, 32],
    "W1": [0, 1, 16, 17, 32],
    "W2": [0, 15, 16, 31, 32],
    "W3": [1, 2, 15, 16, 30],
    "W4": [2, 16, 17, 30, 31],
    "star": [0, 2, 16, 30, 32],
    "diamond": [1, 15, 17, 31],
    "branch1": [0, 2, 16, 31, 46],
    "branch2": [1, 16, 31, 45, 47],
    "branch3": [15, 16, 17, 3, 33],
    "branch4": [0, 16, 17, 18, 30],
    "special1": [0, 1, 2, 15, 16],
    "special2": [0, 1, 15, 16, 17]
}

// 20x20 field
let GamePatternsList20 = {
    "hor": [0, 1, 2, 3],
    "vert": [0, 20, 40, 60],
    "dia": [0, 21, 42, 63],
    "dia2": [3, 22, 41, 60],
    "L1": [0, 20, 40, 41, 42],
    "L2": [40, 41, 42, 22, 2],
    "L3": [0, 1, 2, 20, 40],
    "L4": [0, 1, 2, 22, 42],
    "W1": [0, 1, 21, 22, 42],
    "W2": [0, 20, 21, 41, 42],
    "W3": [1, 2, 20, 21, 40],
    "W4": [2, 21, 22, 40, 41],
    "star": [0, 2, 21, 40, 42],
    "diamond": [1, 20, 22, 41],
    "branch1": [0, 2, 21, 41, 61],
    "branch2": [1, 21, 41, 60, 62],
    "branch3": [3, 20, 21, 22, 43],
    "branch4": [0, 21, 22, 23, 40],
    "special1": [0, 1, 2, 20, 21],
    "special2": [0, 1, 20, 21, 22]
}

// 25x25 field
let GamePatternsList25 = {
    "hor": [0, 1, 2, 3],
    "vert": [0, 25, 50, 75],
    "dia": [0, 26, 52, 78],
    "dia2": [3, 27, 51, 75],
    "L1": [0, 25, 50, 51, 52],
    "L2": [2, 27, 52, 51, 50],
    "L3": [0, 1, 2, 25, 50],
    "L4": [0, 1, 2, 27, 52],
    "W1": [0, 1, 26, 27, 52],
    "W2": [0, 25, 26, 51, 52],
    "W3": [1, 2, 25, 26, 50],
    "W4": [2, 26, 27, 50, 51],
    "star": [0, 2, 26, 50, 52],
    "diamond": [1, 25, 27, 51],
    "branch1": [0, 2, 26, 51, 76],
    "branch2": [1, 26, 51, 75, 77],
    "branch3": [3, 25, 26, 27, 53],
    "branch4": [0, 26, 27, 28, 50],
    "special1": [0, 1, 2, 25, 26],
    "special2": [0, 1, 25, 26, 27]
}

// 30x30 field
let GamePatternsList30 = {
    "hor": [0, 1, 2, 3],
    "vert": [0, 30, 60, 90],
    "dia": [0, 30, 60, 90],
    "dia2": [3, 32, 61, 90],
    "L1": [0, 30, 60, 61, 62],
    "L2": [2, 32, 62, 61, 60],
    "L3": [0, 1, 2, 30, 60],
    "L4": [0, 1, 2, 32, 62],
    "W1": [0, 1, 31, 32, 62],
    "W2": [0, 30, 31, 61, 62],
    "W3": [1, 2, 30, 31, 60],
    "W4": [2, 31, 32, 60, 61],
    "star": [0, 2, 31, 60, 62],
    "diamond": [1, 30, 32, 61],
    "branch1": [0, 2, 31, 61, 91],
    "branch2": [1, 31, 61, 90, 92],
    "branch3": [3, 30, 31, 32, 63],
    "branch4": [0, 31, 32, 33, 60],
    "special1": [0, 1, 2, 30, 31],
    "special2": [0, 1, 30, 31, 32]
}

// 40x40 field
let GamePatternsList40 = {
    "hor": [0, 1, 2, 3],
    "vert": [0, 40, 80, 120],
    "dia": [0, 41, 82, 123],
    "dia2": [3, 42, 81, 120],
    "L1": [0, 40, 80, 81, 82],
    "L2": [2, 42, 80, 81, 82],
    "L3": [0, 1, 2, 40, 80],
    "L4": [0, 1, 2, 42, 82],
    "W1": [0, 1, 41, 42, 82],
    "W2": [0, 40, 41, 81, 82],
    "W3": [1, 2, 40, 41, 80],
    "W4": [2, 41, 42, 80, 81],
    "star": [0, 2, 41, 80, 82],
    "diamond": [1, 40, 42, 81],
    "branch1": [0, 2, 41, 81, 121],
    "branch2": [1, 41, 81, 120, 122],
    "branch3": [3, 40, 41, 42, 83],
    "branch4": [0, 41, 42, 43, 80],
    "special1": [0, 1, 2, 40, 41],
    "special2": [0, 1, 40, 41, 42]
}

// everything about the online chat in online game mode
let openedChat = false;
let recievedUnseenMessages = 0;
let personalname;

// Inner Game Modes
let InnerGameModes = {
    1: "Boneyard",
    2: "Blocker Combat",
    3: "Free Fight",
};

// Das ausgewählte Level entscheidet, wie schwer die KI sein soll und wie viele Blockaden gesetzt werden sollen 
let KI_Mode_Levels = {
    1: "Kindergarten",
    2: "Fastfood",
    3: "Death",
};
let curr_KI_Level;

// standard bg music volume
let appVolume = 0.02;
let sfxVolume = 0.15;
let bossModeIsActive = false;

// server thing ----------------

// This is for the online game mode
// This Object checks, if the user is connected to a room and which role he plays "admin" ? "user"
// It also checks if he wants to enter a game or not
let personal_GameData = {
    EnterOnlineGame: false,
    currGameID: null,
    role: 'user' // admin ? user
};

// (online mode) if the user creates a game so he is the admin and selected blocker combat mode
// A third player will be required for this so the game has a real blocker
// This variable checks wether a third player is required in the game or not
let thirdPlayer_required = false;

let socket;

// check if admin created a lobby based on a self created game from the game cards or on a costum level which a user can create and publish to the server
let PlayingInCreatedLevel = false;

// Request friends from database and take action
const RequestFriendsListFromDatabase = async() => {
    await socket.emit("RequestFriends", localStorage.getItem("PlayerID"), cb => {
        // small text with link to the "search player" pop-up if the user has no friends 
        let div = document.createElement("div");
        let p = document.createElement("p");
        p.textContent = "No friends. Wanna get some friends? Go outside or click";
        let span = document.createElement("span");
        span.textContent = "here";
        span.className = "ClickTextTo_SearchPlayersPopUp";
        span.addEventListener('click', () => {
            FriendsListPopUp.style.display = "none";
            DisplayPopUp_PopAnimation(SearchPlayerPopUp, "flex", true);
        });

        FriendsListInnerList.textContent = null;

        if (!cb) { // No friends
            div.append(p);
            div.appendChild(span);
            FriendsListInnerList.appendChild(div);

        } else { // Friends detected
            GenerateFriendsList(cb);
        };
    });
};

// about social activities
const OpenGetMessagesPopUp = () => { // open user messages pop up
    DisplayPopUp_PopAnimation(MessagesPopUp, "flex", true);
};

const OpenFriendsListPopUp = async() => { // "try" to open friends list
    // try to open friendslist
    try {
        await RequestFriendsListFromDatabase();
        DisplayPopUp_PopAnimation(FriendsListPopUp, "flex", true);

    } catch (error) {
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        AlertText.textContent = "something went wrong. Is it your connection?";
    };
};

const OpenSearchUserPopUp = () => { // open search pop up to search for users
    DisplayPopUp_PopAnimation(SearchPlayerPopUp, "flex", true);
    FoundPlayer_List.textContent = "Do you even have any real friends?";
};

// player is not friend of user and user clicks on friend option button
const AddFriend_OpenPopUp = () => {
    try {
        socket.emit("SendFriendRequest", localStorage.getItem("PlayerID"), UserID_OfCurrentVisitedProfile, cb => {
            if (cb == false) {
                AlertText.textContent = `You already sended a request to ${UserName_OfCurrentVisitedProfile}! Wait for his answer.`;
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
            } else if (cb == "FriendsNow") {
                AlertText.textContent = `${UserName_OfCurrentVisitedProfile} also sended you a friend request! You are friends with him now.`;
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
            };
        });

    } catch (error) {
        console.log(error)
        AlertText.textContent = "Something went wrong! Is it your connection? hihihi...";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    };
};

// player is friend of user and user clicks on friend option button 
const DeleteFriend_OpenPopUp = () => {
    DeleteFriend_PopUp.style.display = "flex";
};

const OpenSendMessagePopUp = () => {
    SendMessagePopUp.style.display = "flex";
    SendMessage_textArea.value = null;
    SendMessage_textArea.focus();
    SendMessageTo_PlayerNameDisplay.textContent = UserName_OfCurrentVisitedProfile;
};

// toggle little main card animation
const toggleMainCardAnimation = (setting) => {
    if (localStorage.getItem(setting) == "true") { // if setting is enabled

        gameModeCards.forEach(card => { card.style.animation = "animatedBorder 4s linear infinite" });

        localStorage.setItem(setting, "true");
        sett_MainCardAnimation.classList = "fa-regular fa-check-square checkBox";
        sett_MainCardAnimation.setAttribute("marked", "true");

    } else if (localStorage.getItem(setting) == "false") {

        gameModeCards.forEach(card => { card.style.animation = "unset" });

        localStorage.setItem(setting, "false");
        sett_MainCardAnimation.classList = "fa-regular fa-square checkBox";
        sett_MainCardAnimation.setAttribute("marked", "false");
    };
};

// toggle field data in game 
const toggleFieldDataInGame = (setting) => {
    if (localStorage.getItem(setting) == "true") { // if setting is enabled
        document.querySelector('.GameField-info-corner').style.display = "block";

        localStorage.setItem(setting, "true");
        sett_ShowGameDataInGame.classList = "fa-regular fa-check-square checkBox";
        sett_ShowGameDataInGame.setAttribute("marked", "true");

    } else if (localStorage.getItem(setting) == "false") {
        document.querySelector('.GameField-info-corner').style.display = "none";

        localStorage.setItem(setting, "false");
        sett_ShowGameDataInGame.classList = "fa-regular fa-square checkBox";
        sett_ShowGameDataInGame.setAttribute("marked", "false");
    };
};

// toggle bg color in game
const toggleShowBGColorInGame = (setting) => {
    if (localStorage.getItem(setting) == "true") { // if setting is enabled
        showBGColor = true;
        bgcolor1 = "";
        bgcolor2 = "";

        localStorage.setItem(setting, "true");
        settColorfulBGinGame.classList = "fa-regular fa-check-square checkBox";
        settColorfulBGinGame.setAttribute("marked", "true");

    } else if (localStorage.getItem(setting) == "false") {
        showBGColor = false;

        localStorage.setItem(setting, "false");
        settColorfulBGinGame.classList = "fa-regular fa-square checkBox";
        settColorfulBGinGame.setAttribute("marked", "false");
    };
};

// how the main cards in lobby should be displayed
const MainCardDisplay = (setting) => {
    if (localStorage.getItem(setting) == "true") { // if setting is enabled

        localStorage.setItem(setting, "true");
        MainCardSlideShow.classList = "fa-regular fa-check-square checkBox";
        MainCardSlideShow.setAttribute("marked", "true");

        document.querySelector('.GameModeCards-main').classList.add("SlideMode");
        MainCardsSlideCaret_Left.style.display = "block";
        MainCardsSlideCaret_Right.style.display = "block";
        gameMode_KI_card.style.display = "none";
        gameMode_OneVsOne_card.style.display = "none";
        gameMode_TwoPlayerOnline_card.style.display = "block";
        ComputerFriend_Card_DescriptionDisplay.style.marginTop = "0.3em";
        OnlineFriend_Card_DescriptionDisplay.style.marginTop = "0.3em";
        KI_Card_DescriptionDisplay.style.marginTop = "0.3em";

    } else if (localStorage.getItem(setting) == "false") {

        localStorage.setItem(setting, "false");
        MainCardSlideShow.classList = "fa-regular fa-square checkBox";
        MainCardSlideShow.setAttribute("marked", "false");

        document.querySelector('.GameModeCards-main').classList.remove("SlideMode");
        MainCardsSlideCaret_Left.style.display = "none";
        MainCardsSlideCaret_Right.style.display = "none";
        gameMode_KI_card.style.display = "block";
        gameMode_OneVsOne_card.style.display = "block";
        gameMode_TwoPlayerOnline_card.style.display = "block";
        ComputerFriend_Card_DescriptionDisplay.style.marginTop = "0.5em";
        OnlineFriend_Card_DescriptionDisplay.style.marginTop = "0.5em";
        KI_Card_DescriptionDisplay.style.marginTop = "0.5em";
    };
};

let currentCardIndex = 1;
const CardsForIndex = {
    0: gameMode_KI_card,
    1: gameMode_TwoPlayerOnline_card,
    2: gameMode_OneVsOne_card
};

// when main cards are in slide show
MainCardsSlideCaret_Left.addEventListener('click', () => {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        ShowCardForIndex(currentCardIndex)
    };
});

MainCardsSlideCaret_Right.addEventListener('click', () => {
    if (currentCardIndex < 2) {
        currentCardIndex++;
        ShowCardForIndex(currentCardIndex)
    };
});

// random items on screen the user can click to remove and gain something if lucky
const randomItemsOnScreen = () => {
    if (localStorage.getItem("sett-Secret") == "true") {
        let x = innerWidth * (1 / 2);
        let y = innerHeight * (1 / 2);

        setInterval(() => {
            let item = document.createElement("i");
            const skinType = Math.floor(Math.random() * 2);
            const rndLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            const rndSkin = Math.floor(Math.random() * 15) + 19;
            const rndColor = Math.floor(Math.random() * 20);
            const rndX = Math.floor(Math.random() * x);
            const rndY = Math.floor(Math.random() * y);

            item.addEventListener("click", function anonymous() {
                RandomIconClick(item);
            });

            item.style.cursor = "pointer";
            item.style.animation = "5s fadeInOnRandomPopItem";
            item.style.position = "absolute";
            item.style.fontSize = "40px";
            item.style.zIndex = "0";
            item.style.padding = "15px";

            switch (skinType) {
                case 0:
                    item.textContent = rndLetter.toUpperCase();
                    item.style.color = skins_display[Object.keys(skins_display)[rndColor]];
                    break;

                case 1:
                    item.className = skins_display[Object.keys(skins_display)[rndSkin]];
                    item.style.color = "white";
                    break;
            };

            console.log(window.getComputedStyle(gameModeCards_Div).getPropertyValue("display"));
            if (window.getComputedStyle(gameModeCards_Div).getPropertyValue("display") === "flex") {
                document.body.appendChild(item);
            };

            setTimeout(() => {
                item.style.top = `${rndY}px`;
                item.style.left = `${rndX}px`;
            }, 250);

            item.addEventListener("animationend", () => {
                item.remove();
            });
        }, 5000);
    };
};

// click event on random icon
const RandomIconClick = (item) => {
    playBtn_Audio()
    item.remove();
};

// create 40x40 mini-board for lobby preview
function create40x40_LobbyPreview() {
    fortyxforty_MiniBoard.textContent = null;
    for (let i = 0; i < 25 * 25; i++) {
        let child = document.createElement('div');
        child.classList = "miniCellMini";

        fortyxforty_MiniBoard.appendChild(child);
    };
};

function create25x25_LobbyPreview() {
    twentyfivextwentyfive_MiniBoard.textContent = null;
    for (let i = 0; i < 15 * 15; i++) {
        let child = document.createElement('div');
        child.classList = "miniCellMini";

        twentyfivextwentyfive_MiniBoard.appendChild(child);
    };
};

// check if the 25x25 field is unlocked
function locked_25x25() {
    // The player needs 5 online wins to unlock this field
    if (localStorage.getItem('onlineMatches-won') >= 5) {
        // check if the player already has it unlocked or just unlocked it
        // If it happened just, a cool animation gets played
        if (localStorage.getItem('unlocked_25') == "true") {
            lockedIcon25.style.display = 'none';
            fieldTitle_25.textContent = '25x25';
            twentyfivextwentyfive_MiniBoard.style.display = 'grid';
            twentyfivextwentyfive_MiniBoard.style.opacity = '1';
            create25x25_LobbyPreview();

            LobbyDataSelections[1][5] = "25x25";
            DataFields['25x25'] = document.querySelector('#twentyfivextwentyfive');

            // add click event
            document.querySelector('#twentyfivextwentyfive').addEventListener('click', e => {
                Click_single_NxN(e);
            });

        } else if (!localStorage.getItem('unlocked_25')) { // just unlocked, make cool animation
            localStorage.setItem('unlocked_25', "true");
            lockedIcon25.style.animation = "unlock_field 3s ease-in-out";

            LobbyDataSelections[1][5] = "25x25";
            DataFields['25x25'] = document.querySelector('#twentyfivextwentyfive');

            // after the crazy ass animation:
            setTimeout(() => {
                // bug fix
                lockedIcon25.style.animation = 'unset';
                lockedIcon25.style.display = 'none';

                // normal stuff + second cool animation for field
                fieldTitle_25.textContent = '25x25';
                twentyfivextwentyfive_MiniBoard.style.display = 'grid';
                twentyfivextwentyfive_MiniBoard.style.opacity = '0';
                create25x25_LobbyPreview();

                twentyfivextwentyfive_MiniBoard.style.animation = "opacity_div 2s ease-out";

                setTimeout(() => {
                    twentyfivextwentyfive_MiniBoard.style.animation = "unset";
                    twentyfivextwentyfive_MiniBoard.style.opacity = "1";

                    // add click event
                    document.querySelector('#twentyfivextwentyfive').addEventListener('click', e => {
                        Click_single_NxN(e);
                    });
                }, 2000);

            }, 3000);
        };

    } else { // it is locked
        lockedIcon25.style.display = 'block';
        fieldTitle_25.textContent = '???';
    };
};

// check if the 30x30 field is unlocked
function locked_30x30() {
    // The player needs 10 online wins to unlock this field
    if (localStorage.getItem('onlineMatches-won') >= 10) {

        if (localStorage.getItem('unlocked_30') == "true") {
            lockedIcon30.style.display = 'none';
            thirtyxthirty_MiniBoard.style.display = 'grid';
            thirtyxthirty_MiniBoard.style.opacity = '1';
            fieldTitle_30.textContent = '30x30';

            LobbyDataSelections[1][6] = "30x30";
            DataFields['30x30'] = document.querySelector('#thirtyxthirty');

            // add click event
            document.querySelector('#thirtyxthirty').addEventListener('click', e => {
                Click_single_NxN(e);
            });

        } else if (!localStorage.getItem('unlocked_30')) {
            localStorage.setItem('unlocked_30', "true");
            lockedIcon30.style.animation = "unlock_field 3s ease-in-out";

            LobbyDataSelections[1][6] = "30x30";
            DataFields['30x30'] = document.querySelector('#thirtyxthirty');

            // after the crazy ass animation:
            setTimeout(() => {
                // for achievement
                Achievement.new(2);

                // bug fix
                lockedIcon30.style.animation = 'unset';
                lockedIcon30.style.display = 'none';

                // normal stuff + second cool animation for field
                fieldTitle_30.textContent = '30x30';
                thirtyxthirty_MiniBoard.style.display = 'grid';
                thirtyxthirty_MiniBoard.style.opacity = '0';

                thirtyxthirty_MiniBoard.style.animation = "opacity_div 2s ease-out";

                setTimeout(() => {
                    thirtyxthirty_MiniBoard.style.animation = "unset";
                    thirtyxthirty_MiniBoard.style.opacity = "1";

                    // add click event
                    document.querySelector('#thirtyxthirty').addEventListener('click', e => {
                        Click_single_NxN(e);
                    });
                }, 2000);

            }, 3000);
        };

    } else { // it is locked
        lockedIcon30.style.display = 'block';
        thirtyxthirty_MiniBoard.style.display = 'none';
        fieldTitle_30.textContent = '???';
    };
};

// check if the 40x40 field is unlocked
function locked_40x40() {
    // The player needs 30 online wins to unlock this field
    if (localStorage.getItem('onlineMatches-won') >= 30) {

        if (localStorage.getItem('unlocked_40') == "true") {
            thirtyxthirty_MiniBoard.style.opacity = '1';
            lockedIcon40.style.display = 'none';
            fieldTitle_40.textContent = '40x40';
            fortyxforty_MiniBoard.style.display = 'grid';
            create40x40_LobbyPreview();

            LobbyDataSelections[1][7] = "40x40";
            DataFields['40x40'] = document.querySelector('#fortyxforty');

            // add click event
            document.querySelector('#fortyxforty').addEventListener('click', e => {
                Click_single_NxN(e);
            });

        } else if (!localStorage.getItem('unlocked_40')) {
            localStorage.setItem('unlocked_40', "true");
            lockedIcon40.style.animation = "unlock_field 3s ease-in-out";

            LobbyDataSelections[1][7] = "40x40";
            DataFields['40x40'] = document.querySelector('#fortyxforty');

            // after the crazy ass animation:
            setTimeout(() => {
                // for achievement
                Achievement.new(3);

                // bug fix
                lockedIcon40.style.animation = 'unset';
                lockedIcon40.style.display = 'none';

                // normal stuff + second cool animation for field
                fieldTitle_40.textContent = '40x40';
                fortyxforty_MiniBoard.style.display = 'grid';
                fortyxforty_MiniBoard.style.opacity = '0';
                create40x40_LobbyPreview();

                fortyxforty_MiniBoard.style.animation = "opacity_div 2s ease-out";

                setTimeout(() => {
                    fortyxforty_MiniBoard.style.animation = "unset";
                    fortyxforty_MiniBoard.style.opacity = "1";

                    // add click event
                    document.querySelector('#fortyxforty').addEventListener('click', e => {
                        Click_single_NxN(e);
                    });
                }, 2000);

            }, 3000);
        };

    } else { // it is locked
        lockedIcon40.style.display = 'block';
        fieldTitle_40.textContent = '???';
    };
};

settFullscreenBtn.addEventListener('click', () => {
    // console.log(localStorage.getItem('Fullscreen'))
    if (localStorage.getItem('Fullscreen') == "false") {
        localStorage.setItem("Fullscreen", true);
        window.App.ToggleFullScreen(true);
        this.EventTarget.classList = "fa-regular fa-check-square checkBox";


    } else {
        localStorage.setItem("Fullscreen", false);
        window.App.ToggleFullScreen(false);
        this.EventTarget.classList = "fa-regular fa-square checkBox";
    };
});

// add click sound to gameMode Cards and animation
Allbtns.forEach((btn) => {
    if (btn.classList.contains("mainCard")) {

        btn.addEventListener('click', (card) => { // event listener for online card

            // audio
            playBtn_Audio();

            // the main card is the play online card which the player can only play if he has an online account
            if (!localStorage.getItem("UserName")) {
                AlertText.textContent = "Create an account to play online";
                DarkLayer.style.display = "block";
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);

            } else {
                DarkLayerAnimation(gameModeFields_Div, gameModeCards_Div);
            };
        });

    } else { // event listener for all other cards
        btn.addEventListener('click', (card) => {
            // audio
            playBtn_Audio();

            // create level or play offline on same computer
            (btn.classList.contains("create")) ? CreateLevelScene_CheckIn(): DarkLayerAnimation(gameModeFields_Div, gameModeCards_Div);
        });
    };
});

// event listener

// check in for create level scene
const CreateLevelScene_CheckIn = () => {
    // The user should have an account to be able to create an online level
    if (!localStorage.getItem("UserName")) {
        AlertText.textContent = "Create an account to create online level";
        DarkLayer.style.display = "block";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);

    } else {
        // audio
        playBtn_Audio();
        DarkLayerAnimation(CreateLevelScene, gameModeCards_Div);
    };
};

// Go back from NxN field-cards to GameMode cards
fieldsArea_back_btn.addEventListener('click', () => {
    // audio
    playBtn_Audio_2();
    CheckTreasureCanBeOpened();

    // animation
    DarkLayerAnimation(gameModeCards_Div, gameModeFields_Div);

    CheckForMessages(); // Check for messages in database
    CheckForFriendRequests(); // check for friend requests

    // for XP Journey
    CheckIfUserCanGetReward();
});

let NewCreativeLevel;
// Game Mode buttons 
gameMode_KI_card.addEventListener('click', () => {
    if (localStorage.getItem("UserName")) {
        curr_mode = GameMode[4].opponent;

        // pause music in create level mode
        PauseMusic();

        // User entered create level mode
        let NewField = new NewLevel();
        NewCreativeLevel = NewField;
        NewCreativeLevel.Init();

        InitCreateLevelScene();

        // bug fix if user was in advanced mode:
        goToAdvancedFields.style.display = 'none';
        goToAdvancedFields.classList = "fa-solid fa-caret-down";
        secondTierModes.style.marginBottom = "0";
        isInAdvancedGameModes = false;
        // other thing
        ChooseFieldDisplay.style.opacity = "0";
    };
});

gameMode_TwoPlayerOnline_card.addEventListener('click', () => {
    curr_mode = GameMode[2].opponent;
    goToAdvancedFields.style.display = 'block';

    // visibility for Ki Fields and GameMode fields
    ThreexThree_Field.style.display = 'none';
    ForxFor_Field.style.display = 'none';
    FivexFive_Field.style.display = 'flex';
    TenxTen_Field.style.display = 'flex';
    FifTeenxFifTeen_Field.style.display = 'flex';
    TwentyxTwentyField.style.display = 'flex';
    // Display Game Mode Description
    GameModeDisplay.textContent = GameMode[2].description;

    ChooseFieldDisplay.style.opacity = "1";
});

gameMode_OneVsOne_card.addEventListener('click', () => {
    curr_mode = GameMode[3].opponent;
    goToAdvancedFields.style.display = 'block';

    // visibility for Ki Fields and GameMode fields
    ThreexThree_Field.style.display = 'none';
    ForxFor_Field.style.display = 'none';
    FivexFive_Field.style.display = 'flex';
    TenxTen_Field.style.display = 'flex';
    FifTeenxFifTeen_Field.style.display = 'flex';
    TwentyxTwentyField.style.display = 'flex';
    // Display Game Mode Description
    GameModeDisplay.textContent = GameMode[3].description;

    ChooseFieldDisplay.style.opacity = "1";
});

// field-cards click event

// Normal Mode
FivexFive_Field.addEventListener('click', () => { playBtn_Audio(); });
FifTeenxFifTeen_Field.addEventListener('click', () => { playBtn_Audio(); });
TenxTen_Field.addEventListener('click', () => { playBtn_Audio(); });
TwentyxTwentyField.addEventListener('click', () => { playBtn_Audio(); });

document.querySelector('#thirtyxthirty').addEventListener('click', () => { playBtn_Audio(); });
document.querySelector('#twentyfivextwentyfive').addEventListener('click', () => { playBtn_Audio(); });
document.querySelector('#random_Field').addEventListener('click', () => { playBtn_Audio(); });
document.querySelector('#fortyxforty').addEventListener('click', () => { playBtn_Audio(); });

//Ki Mode
ForxFor_Field.addEventListener('click', () => { playBtn_Audio(); });
ThreexThree_Field.addEventListener('click', () => { playBtn_Audio(); });

// settings checkbox events
checkBox.forEach(box => {
    box.addEventListener('click', () => {
        // check box animation
        if (box.getAttribute('marked') == "false") {
            box.classList = "fa-regular fa-check-square checkBox";
            box.setAttribute("marked", "true");

        } else {
            box.classList = "fa-regular fa-square checkBox";
            box.setAttribute("marked", "false");
        };

        // save in storage
        let setting = box.getAttribute('sett'); // which setting

        if (setting != "sett-DarkMode" && setting != "Fullscreen") {
            let bool = box.getAttribute('marked'); // true ? false
            localStorage.setItem(setting, bool);
        };

        switch (setting) {
            case "sett-DarkMode":
                Set_Light_Dark_Mode();
                break;

            case "sett-MainCardAnimation":
                toggleMainCardAnimation(setting);
                break;

            case "sett-MainCardSlideShow":
                MainCardDisplay(setting);
                break;

            case "sett-ShowFieldData":
                toggleFieldDataInGame(setting);
                break;
            case "sett-ShowBGColor":
                toggleShowBGColorInGame(setting);
        };
    });
});

settingsCloseBtn.addEventListener('click', () => {
    settingsWindow.style.display = 'none';
    DarkLayer.style.display = 'none';
});

headerSettBtn.addEventListener('click', () => {
    DisplayPopUp_PopAnimation(settingsWindow, "block", true);
});

// settings important buttons: mail and credits
Settings_MailBtn.addEventListener('click', () => {
    if (localStorage.getItem("UserName")) {
        DisplayPopUp_PopAnimation(MailPopUp, "flex", true);
        settingsWindow.style.display = "none";

        localStorage.getItem("UserName") ? MailInput_Name.value = localStorage.getItem("UserName") : MailInput_Name.value = "";
        MailInput_Message.value = "";
        MailInput_Name.focus();

    } else {
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        AlertText.textContent = "Create an user account first";
    };
});

Settings_CreditsBtn.addEventListener('click', () => {
    DisplayPopUp_PopAnimation(Credits, "flex");
});

Credits_closeBtn.addEventListener("click", () => {
    Credits.style.display = "none";
});

// close buttons
YourName_KI_ModeCloseBtn.addEventListener('click', () => {
    // html stuff
    YourNamePopUp_KI_Mode.style.display = 'none';
    DarkLayer.style.display = 'none';
});

// Game Info PopUp stuff
gameInfo_btn.addEventListener('click', () => {
    DarkLayer.style.display = 'flex';
    DisplayPopUp_PopAnimation(GameInfoPopUp, "flex", true);
    GameInfo_HeaderTitle.textContent = `${curr_field} - Game Info`;

    // not in advanture mode
    if (!inAdvantureMode) {
        if (curr_field == 'Small Price') {
            PatternGridThree.forEach(pattern => pattern.style.display = 'grid');
            PatternGridFor.forEach(pattern => pattern.style.display = 'none');
            PatternGridFive.forEach(pattern => pattern.style.display = 'none');

        } else if (curr_field == 'Thunder Advanture') {
            PatternGridThree.forEach(pattern => pattern.style.display = 'none');
            PatternGridFor.forEach(pattern => pattern.style.display = 'grid');
            PatternGridFive.forEach(pattern => pattern.style.display = 'none');

        } else {
            PatternGridThree.forEach(pattern => pattern.style.display = 'none');
            PatternGridFor.forEach(pattern => pattern.style.display = 'none');
            PatternGridFive.forEach(pattern => pattern.style.display = 'none');
        };

        // display allowed win patterns
        let Children = [...PatternGridFive];
        allowedPatternsFromUser.map(el => {
            Children.forEach(e => {
                if (el == e.classList[2]) {
                    e.style.display = 'grid';
                    return;
                };
            });
        });

        // how to win text
        if (PlayingInCreatedLevel) {
            HowToWinText.textContent = `Get ${NewCreativeLevel.selectedLevel[2]} points or score more points than your opponent if he gives up.`;

            setTimeout(() => {
                NewCreativeLevel_DisplayCostumPatternsInGamePopUp();
            }, 100);

        } else {
            HowToWinText.textContent = `Get ${points_to_win} points or score more points than your opponent if he gives up.`;
        };

    } else { // in advanture mode
        // display for 5x5 fields and higher
        PatternGridThree.forEach(pattern => pattern.style.display = 'none');
        PatternGridFor.forEach(pattern => pattern.style.display = 'none');
        PatternGridFive.forEach(pattern => pattern.style.display = 'none');

        let unlocked_mapLevels = JSON.parse(localStorage.getItem('unlocked_mapLevels'));
        let allowed_patterns = allowedPatterns;
        let Children = [...PatternGridFive];

        for (let i = 0; i < Children.length; i++) {
            const patt = Children[i];
            let pattern_class = patt.classList[2];

            // console.log(patt, pattern_class, allowed_patterns[i], i);
            if (allowed_patterns.includes(pattern_class)) {
                patt.style.display = 'grid';
            };
        };

        // how to win text
        HowToWinText.textContent = unlocked_mapLevels[current_selected_level][7][unlocked_mapLevels[current_selected_level][7].length - 1];
    };
});

GameInfoClose_btn.addEventListener('click', () => {
    DarkLayer.style.display = 'none';
    GameInfoPopUp.style.display = 'none';
});

GameModelistItem_Boneyard.addEventListener('click', () => {
    thirdPlayer_required = false;
    BlockerCombat_OnlineGameWarnText.style.display = "none";
    switch (GameModelistItem_Boneyard.getAttribute('selected')) {
        case 'false':
            DisableGameModeItems();
            GameModeListItemCheckMark_Boneyard.classList = 'fa-solid fa-check';
            GameModelistItem_Boneyard.style.color = 'white';
            GameModelistItem_Boneyard.setAttribute('selected', 'true');
            break;

        case 'true':
            GameModeListItemCheckMark_Boneyard.classList = '';
            GameModelistItem_Boneyard.style.color = 'black';
            GameModelistItem_Boneyard.setAttribute('selected', 'false');
            break;
    };
});

GameModeListItem_BlockerCombat.addEventListener('click', () => {
    switch (GameModeListItem_BlockerCombat.getAttribute('selected')) {
        case 'false':
            DisableGameModeItems();
            curr_mode == GameMode[2].opponent ? BlockerCombat_OnlineGameWarnText.style.display = "block" : BlockerCombat_OnlineGameWarnText.style.display = "none";
            thirdPlayer_required = true;
            GameModeListItemCheckMark_BlockerCombat.classList = 'fa-solid fa-check';
            GameModeListItem_BlockerCombat.style.color = 'white';
            GameModeListItem_BlockerCombat.setAttribute('selected', 'true');
            break;

        case 'true':
            thirdPlayer_required = false;
            BlockerCombat_OnlineGameWarnText.style.display = "none"
            GameModeListItemCheckMark_BlockerCombat.classList = '';
            GameModeListItem_BlockerCombat.style.color = 'black';
            GameModeListItem_BlockerCombat.setAttribute('selected', 'false');
            break;
    };
});

GameModeListItem_FreeFight.addEventListener('click', () => {
    thirdPlayer_required = false;
    BlockerCombat_OnlineGameWarnText.style.display = "none";
    switch (GameModeListItem_FreeFight.getAttribute('selected')) {
        case 'false':
            DisableGameModeItems();
            GameModeListItemCheckMark_FreeFight.classList = 'fa-solid fa-check';
            GameModeListItem_FreeFight.style.color = 'white';
            GameModeListItem_FreeFight.setAttribute('selected', 'true');
            break;

        case 'true':
            GameModeListItemCheckMark_FreeFight.classList = '';
            GameModeListItem_FreeFight.style.color = 'black';
            GameModeListItem_FreeFight.setAttribute('selected', 'false');
            break;
    };
});

SetClockListItem_5sec.addEventListener('click', () => {
    switch (SetClockListItem_5sec.getAttribute('selected')) {
        case 'false':
            DisablePlayerClockItems();
            ClockListItemCheckMark_5sec.classList = 'fa-solid fa-check';
            SetClockListItem_5sec.style.color = 'white';
            SetClockListItem_5sec.setAttribute('selected', 'true');
            break;

        case 'true':
            ClockListItemCheckMark_5sec.classList = '';
            SetClockListItem_5sec.style.color = 'black';
            SetClockListItem_5sec.setAttribute('selected', 'false');
            break;
    };
});

SetClockListItem_15sec.addEventListener('click', () => {
    switch (SetClockListItem_15sec.getAttribute('selected')) {
        case 'false':
            DisablePlayerClockItems();
            ClockListItemCheckMark_15sec.classList = 'fa-solid fa-check';
            SetClockListItem_15sec.style.color = 'white';
            SetClockListItem_15sec.setAttribute('selected', 'true');
            break;

        case 'true':
            ClockListItemCheckMark_15sec.classList = '';
            SetClockListItem_15sec.style.color = 'black';
            SetClockListItem_15sec.setAttribute('selected', 'false');
            break;
    };
});

SetClockListItem_30sec.addEventListener('click', () => {
    DisablePlayerClockItems();
    switch (SetClockListItem_30sec.getAttribute('selected')) {
        case 'false':
            DisablePlayerClockItems();
            ClockListItemCheckMark_30sec.classList = 'fa-solid fa-check';
            SetClockListItem_30sec.style.color = 'white';
            SetClockListItem_30sec.setAttribute('selected', 'true');
            break;

        case 'true':
            ClockListItemCheckMark_30sec.classList = '';
            SetClockListItem_30sec.style.color = 'black';
            SetClockListItem_30sec.setAttribute('selected', 'false');
            break;
    };
});

SetClockListItem_50sec.addEventListener('click', () => {
    DisablePlayerClockItems();
    switch (SetClockListItem_50sec.getAttribute('selected')) {
        case 'false':
            DisablePlayerClockItems();
            ClockListItemCheckMark_50sec.classList = 'fa-solid fa-check';
            SetClockListItem_50sec.style.color = 'white';
            SetClockListItem_50sec.setAttribute('selected', 'true');
            break;

        case 'true':
            ClockListItemCheckMark_50sec.classList = '';
            SetClockListItem_50sec.style.color = 'black';
            SetClockListItem_50sec.setAttribute('selected', 'false');
            break;
    };
});

SetClockListItem_70sec.addEventListener('click', () => {
    DisablePlayerClockItems();
    switch (SetClockListItem_70sec.getAttribute('selected')) {
        case 'false':
            DisablePlayerClockItems();
            ClockListItemCheckMark_70sec.classList = 'fa-solid fa-check';
            SetClockListItem_70sec.style.color = 'white';
            SetClockListItem_70sec.setAttribute('selected', 'true');
            break;

        case 'true':
            ClockListItemCheckMark_70sec.classList = '';
            SetClockListItem_70sec.style.color = 'black';
            SetClockListItem_70sec.setAttribute('selected', 'false');
            break;
    };
});

chooseWinnerWindowBtn.addEventListener('click', openChooseWinnerWindow);

onlineGame_closeBtn.addEventListener('click', () => {
    DarkLayer.style.display = 'none';
    OnlineGame_iniPopUp.style.display = 'none';
});

EnterGame_btn.addEventListener('click', () => {
    OnlineGame_iniPopUp.style.display = 'none';

    setUpOnlineGame('enter');
});

CreateGame_btn.addEventListener('click', () => {
    OnlineGame_iniPopUp.style.display = 'none';

    setUpOnlineGame('create');
});

ChooseWinnerWindowCloseBtn.addEventListener('click', () => {
    ChooseWinner_popUp.style.display = 'none';
    DarkLayer.style.display = 'none';
});

Player1_ChooseWinnerDisplay.addEventListener('click', () => {
    score_Player1_numb = Infinity;
    Call_UltimateWin();
    ChooseWinner_popUp.style.display = 'none';
    DarkLayer.style.display = 'none';
});

Player2_ChooseWinnerDisplay.addEventListener('click', () => {
    score_Player1_numb = -Infinity;
    Call_UltimateWin();
    ChooseWinner_popUp.style.display = 'none';
    DarkLayer.style.display = 'none';
});

switchColorMode_btn.addEventListener('click', () => {
    Set_Light_Dark_Mode("moon");
});

function openChooseWinnerWindow() {
    ChooseWinner_popUp.style.display = 'flex';
    DarkLayer.style.display = 'block';
};

// Disable all "set player clock" list items
const DisablePlayerClockItems = () => {
    ClockListItemCheckMark_5sec.classList = '';
    SetClockListItem_5sec.style.color = 'black';
    SetClockListItem_5sec.setAttribute('selected', 'false');
    ClockListItemCheckMark_15sec.classList = '';
    SetClockListItem_15sec.style.color = 'black';
    SetClockListItem_15sec.setAttribute('selected', 'false');
    ClockListItemCheckMark_30sec.classList = '';
    SetClockListItem_30sec.style.color = 'black';
    SetClockListItem_30sec.setAttribute('selected', 'false');
    ClockListItemCheckMark_50sec.classList = '';
    SetClockListItem_50sec.style.color = 'black';
    SetClockListItem_50sec.setAttribute('selected', 'false');
    ClockListItemCheckMark_70sec.classList = '';
    SetClockListItem_70sec.style.color = 'black';
    SetClockListItem_70sec.setAttribute('selected', 'false');
};

// Disable all "set game modes" list items
const DisableGameModeItems = () => {
    GameModeListItemCheckMark_Boneyard.classList = '';
    GameModelistItem_Boneyard.style.color = 'black';
    GameModelistItem_Boneyard.setAttribute('selected', 'false');
    GameModeListItemCheckMark_BlockerCombat.classList = '';
    GameModeListItem_BlockerCombat.style.color = 'black';
    GameModeListItem_BlockerCombat.setAttribute('selected', 'false');
    GameModeListItemCheckMark_FreeFight.classList = '';
    GameModeListItem_FreeFight.style.color = 'black';
    GameModeListItem_FreeFight.setAttribute('selected', 'false');
};

OnlineGame_CodeNamePopUp_closeBtn.addEventListener('click', () => {
    OnlineGame_CodeName_PopUp.style.display = 'none';
    DarkLayer.style.display = 'none';
});

// When user left the online game during a match, the admin gets informed by that with a pop up
// Then he can click two buttons to confirm his seeing
friendLeft_Aj_btn.addEventListener('click', () => {
    friendLeftGamePopUp.style.display = 'none';

    if (friendLeft_text.textContent == 'The admin disconnected from the game') {
        DarkLayer.style.display = 'none';
    };
});

friendLeft_OK_btn.addEventListener('click', () => {
    friendLeftGamePopUp.style.display = 'none';

    if (friendLeft_text.textContent == 'The admin disconnected from the game') {
        DarkLayer.style.display = 'none';
    };
});

let isInAdvancedGameModes = false;
goToAdvancedFields.addEventListener('click', () => {

    // If the player is in the advanced game modes
    if (isInAdvancedGameModes) {
        goToAdvancedFields.classList = "fa-solid fa-caret-down";
        secondTierModes.style.marginBottom = "0";
        isInAdvancedGameModes = false;
        bossModeIsActive = false;
        playGameTheme();

        // If not
    } else {
        goToAdvancedFields.classList = "fa-solid fa-caret-up";
        secondTierModes.style.marginBottom = "var(--width-for-goToAdvancedModes-btn)";
        isInAdvancedGameModes = true;

        // animation
        DarkLayer.style.display = 'block';
        DarkLayer.style.backgroundColor = "rgba(0,0,0,0)";
        animatedPopUp.style.display = 'block';
        animatedPopUp.style.opacity = '0';

        setTimeout(() => {
            setTimeout(() => {
                animatedPopUp.style.opacity = '1';
            }, 400);
            DarkLayer.style.backgroundColor = "rgba(0, 0, 0, 0.87)";
        }, 700)

        bossModeIsActive = true;
        playBossTheme();
    };
});

let ContBtnCount = 1;
let TextIsEpilogue = false;
let ClickedOnLastText = false; // Check if user skipped the last text
animatedPopConBtn.addEventListener('click', animatedPopConBtn.fn = () => {
    if (ContBtnCount == 2) ClickedOnLastText = false;

    if (!inAdvantureMode) {
        playBtn_Audio_2();
        if (ContBtnCount == 1) {
            let TextHead = document.createElement("h2");
            let newText = document.createTextNode("Each individual field has its own secret properties you have to discover... Will you survive?");
            TextHead.classList.add("newText")
            TextHead.appendChild(newText);
            animatedPopMain.querySelectorAll("h2")[0].style.display = "none";
            animatedPopMain.querySelectorAll("h2")[1].style.display = "none";
            animatedPopMain.appendChild(TextHead);
            ContBtnCount++;

        } else if (ContBtnCount == 2) {
            animatedPopMain.querySelector('.newText').textContent = "You entered boss mode!";
            ContBtnCount++;

        } else if (ContBtnCount == 3 && !ClickedOnLastText) {
            // this line is a bug fix
            ClickedOnLastText = true;
            // animation
            DarkLayer.style.display = 'none';
            animatedPopMain.querySelectorAll("h2")[0].style.display = "block";
            animatedPopMain.querySelectorAll("h2")[1].style.display = "block";
            animatedPopMain.querySelector('.newText').remove();
            animatedPopUp.style.display = 'none';
            // Reset ContBtnCount for the next intro
            ContBtnCount = 1;
            TextIsEpilogue = false;
            level_text = [];

            // Check if player unlocked one of these fields
            locked_25x25();
            locked_30x30();
            locked_40x40();
        };
    } else { // player is in advanture mode => other speech bubbles
        playBtn_Audio_2();
        // Intrologue (or epilogue when user beat last advanture level for his first time)
        AdvantureModeLevelIntro();
    };
});

const AdvantureModeLevelIntro = () => {
    if (ContBtnCount == 2) ClickedOnLastText = false;

    // console.log(ContBtnCount, level_text);

    if (ContBtnCount < level_text.length && level_text[ContBtnCount] != undefined) {
        animatedPopMain.querySelector('.newText').textContent = level_text[ContBtnCount];
        ContBtnCount++;

    } else if (ContBtnCount == level_text.length && level_text[ContBtnCount] == undefined && !TextIsEpilogue) {
        try {
            ContBtnCount++;
            animatedPopMain.querySelector('.newText').textContent = "Click on the help button in the top left corner to see more information.";
        } catch (error) {
            console.log(error);
        };

    } else if (ContBtnCount == level_text.length + 1 && level_text[ContBtnCount] == undefined && !TextIsEpilogue && !ClickedOnLastText) {
        // this line is a bug prevention
        ClickedOnLastText = true;
        // Check if player unlocked one of these fields
        locked_25x25();
        locked_30x30();
        locked_40x40();

        // console.log(document.querySelector(".DialogEye"));

        // fade out animation to epic dialog
        animatedPopUp.style.opacity = "0";
        document.querySelector(".DialogEye") && (document.querySelector(".DialogEye").style.opacity = "0");

        setTimeout(() => {
            animatedPopMain.querySelector('.newText') && animatedPopMain.querySelector('.newText').remove();
            DarkLayer.style.transition = "background-color 1s ease-out, opacity 0.5s ease-in-out";
            DarkLayer.style.opacity = "0";

            TryTo_StartMapLevel();

            setTimeout(() => {
                animatedPopMain.querySelectorAll("h2")[0].style.display = "block";
                animatedPopMain.querySelectorAll("h2")[1].style.display = "block";
                animatedPopMain.style.display = "flex";
                animatedPopUp.style.display = 'none';
                DarkLayer.style.display = 'none';
                DarkLayer.style.backgroundColor = "rgba(0, 0, 0, 0.87)";
                DarkLayer.style.transition = "background-color 1s ease-out";
                animatedPopUp.style.opacity = "1";
                DarkLayer.style.opacity = "1";
                document.querySelector(".DialogEye").remove();
            }, 200);
        }, 500);

        // Reset ContBtnCount for the next intro
        ContBtnCount = 1;
        TextIsEpilogue = false;
        level_text = [];

    } else if (ContBtnCount == level_text.length && TextIsEpilogue && !ClickedOnLastText) {
        // bug prevention
        ClickedOnLastText = true;
        // fade out animation to epic dialog
        animatedPopUp.style.opacity = "0";
        document.querySelector(".DialogEye") && (document.querySelector(".DialogEye").style.opacity = "0");

        setTimeout(() => {
            animatedPopMain.querySelector('.newText') && animatedPopMain.querySelector('.newText').remove();
            DarkLayer.style.transition = "background-color 1s ease-out, opacity 0.5s ease-in-out";
            DarkLayer.style.opacity = "0";

            PauseMusic();
            playMapTheme();

            setTimeout(() => {
                animatedPopMain.querySelectorAll("h2")[0].style.display = "block";
                animatedPopMain.querySelectorAll("h2")[1].style.display = "block";
                animatedPopMain.style.display = "flex";
                animatedPopUp.style.display = 'none';
                DarkLayer.style.display = 'none';
                DarkLayer.style.backgroundColor = "rgba(0, 0, 0, 0.87)";
                DarkLayer.style.transition = "background-color 1s ease-out";
                animatedPopUp.style.opacity = "1";
                DarkLayer.style.opacity = "1";
                document.querySelector(".DialogEye").remove();
            }, 200);
        }, 500);

        // Reset ContBtnCount for the next intro
        ContBtnCount = 1;
        TextIsEpilogue = false;
        level_text = [];

        // items
        UserFoundItems();
        CheckIfUserCanGetReward();
    };
};

// click on X-btn to trade 1 x with 5 elo points
XBtn.addEventListener('click', () => {
    if (localStorage.getItem('ItemX') >= 1) {
        DarkLayer.style.display = 'block';
        DisplayPopUp_PopAnimation(tradeX_PopUp, "flex", true);
    };
});

tradeX_closebtn.addEventListener('click', () => {
    DarkLayer.style.display = 'none';
    tradeX_PopUp.style.display = 'none';
});

tradeX_ConfirmBtn.addEventListener('click', () => {
    let X = parseInt(localStorage.getItem('ItemX'));
    let SkillPoints = parseInt(localStorage.getItem('ELO'));

    SkillPoints = SkillPoints + 5;
    X = X - 1;

    localStorage.setItem('ELO', SkillPoints);
    localStorage.setItem('ItemX', X);

    GameItems();
    ElO_Points();

    DarkLayer.style.display = 'none';
    tradeX_PopUp.style.display = 'none';

    // for Xp Journey                          
    CheckIfUserCanGetReward();
});

// alert pop up
closeAlertPopUpBtn.addEventListener('click', () => {
    alertPopUp.style.display = 'none';
    settingsWindow.style.display = 'none';

    // Don't disable dark background layer if player is on other pop up
    if (UserID_OfCurrentVisitedProfile == undefined && !OpenedPopUp_WhereAlertPopUpNeeded) {
        DarkLayer.style.display = 'none';
    };

    OpenedPopUp_WhereAlertPopUpNeeded = false;
});

GameInfoLobby_btn.addEventListener('click', () => {
    DisplayPopUp_PopAnimation(Lobby_GameInfo_PopUp, "flex", true);
});

CloseBtn_LobbyInfoPopUp.addEventListener('click', () => {
    Lobby_GameInfo_PopUp.style.display = "none";
});

// give up online game button
GiveUp_btn.addEventListener('click', () => {
    DarkLayer.style.display = "block";
    GiveUpPopUp.style.display = "flex";
});

// give up online game button close pop up btn
GiveUpPopUp_closeBtn.addEventListener('click', () => {
    DarkLayer.style.display = "none";
    GiveUpPopUp.style.display = "none";
});

// give up online game button close pop up btn on No request
giveUp_No_btn.addEventListener('click', () => {
    DarkLayer.style.display = "none";
    GiveUpPopUp.style.display = "none";
});

// User Quote things

// check if there is quote if not inform user he can create one
localStorage.getItem("UserQuote") ? UserQuote.innerHTML = localStorage.getItem("UserQuote") : UserQuoteSubmitBtn.textContent = "Create a quote";

UserQuoteSubmitBtn.addEventListener('click', () => {
    if (!UserEditsQuote) { // user is gonna edit his epic quote now
        UserEditsQuote = true;
        UserQuoteSubmitBtn.textContent = "Done";
        UserQuote.contentEditable = "true";
        UserQuote.focus();
        UserQuote.innerHTML = 'My Quote'.replace(/\n/g, "<br>"); // Ersetze Zeilenumbrüche durch <br> Tags

    } else { // user is done quoting
        UserEditsQuote = false;
        UserQuoteSubmitBtn.textContent = "Edit";
        UserQuote.contentEditable = "false";
        const quoteWithBr = UserQuote.innerHTML.replace(/<br\s*\/?>/mg, "\n"); // Ersetze <br> Tags durch Zeilenumbrüche
        localStorage.setItem('UserQuote', quoteWithBr);

        try {
            socket.emit("UserSubmitsNewQuote", localStorage.getItem("UserQuote"), localStorage.getItem("PlayerID"));

        } catch (error) {
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
            AlertText.textContent = "something gone wrong. Is it your connection?"
        };
    };
});

UserQuote.addEventListener('click', () => {
    UserQuote.focus();
});

UserQuote.addEventListener('keydown', (e) => {
    if (e.code == "Enter") {
        e.preventDefault();
    };
});

UserQuote.addEventListener('mousedown', function(event) {
    event.preventDefault(); // Verhindert die Auswahl beim Klicken
})

// lobby btns

lobbyBtn2.addEventListener("click", () => {
    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    AlertText.textContent = "This feature is availible soon";
    playBtn_Audio_2();
});

officialWinPatternsOpenBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        CloseOnlinePopUps(false);
        DisplayPopUp_PopAnimation(OfficialWinPatternsPopUp, "flex", true);
        InitOfficialPatterns_ToUI();
    });
});

OfficialWinPatterns_closeBtn.addEventListener("click", () => {
    OfficialWinPatternsPopUp.style.display = "none";
    DarkLayer.style.display = "none";
});