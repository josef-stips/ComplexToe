// click sound on button click event
let Allbtns = document.querySelectorAll('.btn');
let btn_sound = document.querySelector('#btn_click_1');
let btn_sound2 = document.querySelector('#btn_click_2');
const audio = document.querySelector("#bg_audio");
const boss_theme = document.querySelector('#boss_theme');

let cellGrid = document.querySelector('#cellGrid');

// general elements and buttons
let gameModeCards_Div = document.querySelector('.gameModes-cards');
let gameModeFields_Div = document.querySelector('.GameMode-fields');
let fieldsArea_back_btn = document.querySelector('#fields-area-back-btn');
let switchColorMode_btn = document.querySelector('#switchColorMode-btn');
let settDarkMode = document.querySelector('#sett-darkMode');
let ELO_Points_display = document.querySelector('.ELO-Points-display');
let sett_rsetELO_Points_btn = document.querySelector('#sett_rsetELO_Points_btn');
let ELO_Points_AddIcon = document.querySelector('.ELO-Points-AddIcon');
let gemsIcon = document.querySelector('.gems-icon');
let Xicon = document.querySelector('.x-icon')
    // let OnlineGame_GameCode_Display = document.querySelector('.OnlineGame_GameCode_Display'); // in the "setupGameData" window, there is already the game id sown, which is not right

// Normal Games
let FivexFive_Field = document.querySelector('#FivexFive_Field');
let FifTeenxFifTeen_Field = document.querySelector('#FifTeenxFifTeen_Field');
let TenxTen_Field = document.querySelector('#TenxTen_Field');
let TwentyxTwentyField = document.querySelector('#TwentyxTwentyField');
// KI Games
let ThreexThree_Field = document.querySelector('#ThreexThree_Field');
let ForxFor_Field = document.querySelector('#ForxFor_Field');
//Advanced games
let fortyxforty_MiniBoard = document.querySelector('#fortyxforty_MiniBoard');
let twentyfivextwentyfive_MiniBoard = document.querySelector('#twentyfivextwentyfive_MiniBoard');
// other
let checkBox = document.querySelectorAll('.checkBox');
let settingsCloseBtn = document.querySelector('#settings-close-btn');
let settingsWindow = document.querySelector('.settings-window');
let DarkLayer = document.querySelector('.dark-layer');
let headerSettBtn = document.querySelector('#header-sett-btn');
let NxN_field = document.querySelectorAll('.NxN-field');
let GameField = document.querySelector('.Game-Page');
let GameTitle = document.querySelector('#GameTitle');
let leaveGame_btn = document.querySelector('#leave-game-btn');
let Game_Upper_Field_Icon = document.querySelector('#Game-Upper-Field-Icon');
let GameField_TimeMonitor = document.querySelector('.GameField-time-monitor');
let GameField_FieldSizeDisplay = document.querySelector('.GameField-fieldSize-display');
let GameField_BlockAmountDisplay = document.querySelector('.GameField-BlockAmount-display');
let GameField_AveragePlayTimeDisplay = document.querySelector('.GameField-AveragePlayTime-display')
let lobbyHeader = document.querySelector('.lobby-header');
let GameModeDisplay = document.querySelector('.GameMode-display');
let headerUserBtn = document.querySelector('#header-user-btn');
let userInfoPopUp = document.querySelector('.userInfo-PopUp');
let userInfoCloseBtn = document.querySelector('#userInfo-closeBtn');
let UserInfoCont = document.querySelector('.UserInfo-cont');
let CreateOnlineProfileBtn = document.querySelector('.CreateOnlineProfile-btn');

let userInfoName = document.querySelector('.userInfo-Name');
let userInfoIcon = document.querySelector('.userInfo-Icon');
let userInfoSkillpoints = document.querySelector('.userInfo-Skillpoints');
let userInfoOnlineMatchesWon = document.querySelector('.userInfo-OnlineMatchesWon');
let treasureBoxTimerPopUp = document.querySelector('.treasure-box-timer-pop-up');
let storeIcon = document.querySelector('#store-icon');
let treasureIcon = document.querySelector('#treasure-icon');
let treasurePopUpcloseBtn = document.querySelector('#treasure-popUp-closeBtn');
let treasurePopUpTimer = document.querySelector('.treasure-pop-up-timer');
let hours = document.querySelector('.hours');
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');

let SetPlayerNamesPopUp = document.querySelector('.SetPlayerNamesPopUp');
let SetPlayerName_ConfirmButton = document.querySelector('.SetPlayerName-ConfirmButton');
let YourName_Input_KI_mode = document.querySelector('#YourName_Input_KI_mode');
let SetPlayerName_confBTN_KIMode = document.querySelector('.SetPlayerName-ConfirmButton_KI_mode');
let YourNamePopUp_KI_Mode = document.querySelector('#YourNamePopUp_KI_Mode');
let YourName_KI_ModeCloseBtn = document.querySelector('#YourName_KI_Mode-close-btn');
let SetPlayerNamesCloseBtn = document.querySelector('#SetPlayerNames-close-btn');
let UltimateWinTextArea = document.querySelector('#UltimateWinTextArea');
let UltimateWinText = document.querySelector('#UltimateWinText');
let gameInfo_btn = document.querySelector('#game-info-btn');
let GameInfoPopUp = document.querySelector('.GameInfoPopUp');
let GameInfo_HeaderTitle = document.querySelector('.GameInfo-HeaderTitle');
let GameInfoClose_btn = document.querySelector('#GameInfo-Close-btn');
let GameInfoHeader = document.querySelector('.GameInfo-Header');
let PatternGridThree = document.querySelectorAll('.PatternGrid-Three');
let PatternGridFor = document.querySelectorAll('.PatternGrid-For');
let PatternGridFive = document.querySelectorAll('.PatternGrid-Five');
let Player1_NameInput = document.querySelector('#Player1_NameInput');
let Player2_NameInput = document.querySelector('#Player2_NameInput');
let Player2_IconInput = document.querySelector('#Player2_IconInput');
let Player1_IconInput = document.querySelector('#Player1_IconInput');
let Player1_ClockInput = document.querySelector('#Player1_ClockInput');
let Player2_ClockInput = document.querySelector('#Player2_ClockInput');
let SetGameModeListWrapper = document.querySelector('.SetGameModeList-Wrapper');
let GameModelistItem_Boneyard = document.querySelector('#GameModelistItem-Boneyard');
let GameModeListItem_BlockerCombat = document.querySelector('#GameModeListItem-BlockerCombat');
let GameModeListItem_FreeFight = document.querySelector('#GameModeListItem-FreeFight');
let GameModeListItemCheckMark_Boneyard = document.querySelector('#GameModeListItem-CheckMark-Boneyard');
let GameModeListItemCheckMark_BlockerCombat = document.querySelector('#GameModeListItem-CheckMark-BlockerCombat');
let GameModeListItemCheckMark_FreeFight = document.querySelector('#GameModeListItem-CheckMark-FreeFight');
let SetClockList = document.querySelector('.SetClockList');
let SetGameModeList = document.querySelector('.SetGameModeList');
let SetClockListItem_5sec = document.querySelector('#SetClockListItem-5sec');
let SetClockListItem_15sec = document.querySelector('#SetClockListItem-15sec');
let SetClockListItem_30sec = document.querySelector('#SetClockListItem-30sec');
let SetClockListItem_50sec = document.querySelector('#SetClockListItem-50sec');
let SetClockListItem_70sec = document.querySelector('#SetClockListItem-70sec');
let ClockListItemCheckMark_5sec = document.querySelector('#ClockListItemCheckMark-5sec');
let ClockListItemCheckMark_15sec = document.querySelector('#ClockListItemCheckMark-15sec');
let ClockListItemCheckMark_30sec = document.querySelector('#ClockListItemCheckMark-30sec');
let ClockListItemCheckMark_50sec = document.querySelector('#ClockListItemCheckMark-50sec');
let ClockListItemCheckMark_70sec = document.querySelector('#ClockListItemCheckMark-70sec');
let FirstPlayerTime = document.querySelector('.FirstPlayer-time');
let SecondPlayerTime = document.querySelector('.SecondPlayer-time');
let GameFieldHeaderUnder = document.querySelector('.GameFieldHeader-under');
let chooseWinnerWindowBtn = document.querySelector('#choose-winner-window-btn');
let ChooseWinner_popUp = document.querySelector('.ChooseWinner-popUp');
let Player1_ChooseWinnerDisplay = document.querySelector('#Player1-ChooseWinnerDisplay');
let Player2_ChooseWinnerDisplay = document.querySelector('#Player2-ChooseWinnerDisplay');
let ChooseWinnerWindowCloseBtn = document.querySelector('#ChooseWinnerWindow-CloseBtn');
let GameFieldHeaderUnderBody = document.querySelector('.GameFieldHeader-underBody');
let SetGameData_Label = document.querySelectorAll('.SetGameData_Label');
let SetPlayerNames_Header = document.querySelector('.SetPlayerNames-Header');
let ConfirmName_Btn = document.querySelector('.Confirm-Name-btn');
let Lobby_PlayerClock = document.querySelector('.Lobby_PlayerClock');
let Lobby_InnerGameMode = document.querySelector('.Lobby_InnerGameMode');
let Lobby_FieldSize = document.querySelector('.Lobby_FieldSize');
let LobbyUserFooterInfo = document.querySelector('.LobbyUserFooterInfo');
let OnlineGame_NameWarnText = document.querySelectorAll('.OnlineGame_NameWarnText');
let friendLeftGamePopUp = document.querySelector('.friendLeftGamePopUp');
let friendLeft_OK_btn = document.querySelectorAll('.friendLeft_OK_btn')[0];
let friendLeft_Aj_btn = document.querySelectorAll('.friendLeft_OK_btn')[1];
let friendLeft_text = document.querySelector('#friendLeft_text');
let SwitchCaret = document.querySelectorAll('.SwitchCaret');

let Fieldsize_NegativeSwitcher = document.querySelector('#Fieldsize_NegativeSwitcher');
let Fieldsize_PositiveSwitcher = document.querySelector('#Fieldsize_PositiveSwitcher');

let PlayerClock_NegativeSwitcher = document.querySelector('#PlayerClock_NegativeSwitcher');
let PlayerClock_PositiveSwitcher = document.querySelector('#PlayerClock_PositiveSwitcher');

let InnerGameMode_NegativeSwitcher = document.querySelector('#InnerGameMode_NegativeSwitcher');
let InnerGameMode_PositiveSwitcher = document.querySelector('#InnerGameMode_PositiveSwitcher');

let SetClockList_KI = document.querySelector('.SetClockList_KI');
let Your_IconInput = document.querySelector('#Your_IconInput');
let SetClockListItem_5sec_KI = document.querySelector('#SetClockListItem-5sec_KI');
let SetClockListItem_15sec_KI = document.querySelector('#SetClockListItem-15sec_KI');
let SetClockListItem_30sec_KI = document.querySelector('#SetClockListItem-30sec_KI');
let SetClockListItem_50sec_KI = document.querySelector('#SetClockListItem-50sec_KI');
let SetClockListItem_70sec_KI = document.querySelector('#SetClockListItem-70sec_KI');
let ClockListItemCheckMark_5sec_KI = document.querySelector('#ClockListItemCheckMark-5sec_KI');
let ClockListItemCheckMark_15sec_KI = document.querySelector('#ClockListItemCheckMark-15sec_KI');
let ClockListItemCheckMark_30sec_KI = document.querySelector('#ClockListItemCheckMark-30sec_KI');
let ClockListItemCheckMark_50sec_KI = document.querySelector('#ClockListItemCheckMark-50sec_KI');
let ClockListItemCheckMark_70sec_KI = document.querySelector('#ClockListItemCheckMark-70sec_KI');

let OnlineGame_iniPopUp = document.querySelector('.OnlineGame_iniPopUp');
let onlineGame_closeBtn = document.querySelector('#onlineGame_closeBtn');

let CreateGame_btn = document.querySelector('#CreateGame-btn');
let EnterGame_btn = document.querySelector('#EnterGame-btn');
let OnlineGame_CodeName_PopUp = document.querySelector('.OnlineGame_CodeName_PopUp');
let OnlineGame_CodeNamePopUp_closeBtn = document.querySelector('#OnlineGame_CodeNamePopUp_closeBtn');
let EnterGameCode_Input = document.querySelector('.EnterGameCode_Input');
let EnterCodeName_ConfirmBtn = document.querySelector('.EnterCodeName_ConfirmBtn');
let OnlineGame_Lobby = document.querySelector('.OnlineGame_Lobby');
let Lobby_startGame_btn = document.querySelector('.Lobby_startGame_btn');
let Lobby_closeBtn = document.querySelector('#Lobby_closeBtn');
let Lobby_first_player = document.querySelector('.Lobby_first_player');
let Lobby_second_player = document.querySelector('.Lobby_second_player');
let OnlineGameLobby_alertText = document.querySelector('.OnlineGameLobby_alertText');
let Lobby_GameCode_display = document.querySelector('.Lobby_GameCode_display');
let goToAdvancedFields = document.querySelector('#goTo-advancedFields');
let secondTierModes = document.querySelector('.second-tier-modes');
let animatedPopUp = document.querySelector('.animated-pop-up');
let animatedPopConBtn = document.querySelector('.animatedPop-ConBtn');
let animatedPopMain = document.querySelector('.animatedPop-main');

let OnlineFriend_Card_DescriptionDisplay = document.querySelector('#OnlineFriend_Card_DescriptionDisplay');
let ComputerFriend_Card_DescriptionDisplay = document.querySelector('#ComputerFriend_Card_DescriptionDisplay');
let KI_Card_DescriptionDisplay = document.querySelector('#KI_Card_DescriptionDisplay');

let scorePlayer1 = document.querySelector('#score-player1');
let scorePlayer2 = document.querySelector('#score-player2');
let namePlayer1 = document.querySelector('#name-player1');
let namePlayer2 = document.querySelector('#name-player2');

// Field Theme music
let Tunnel_of_truth_Theme = document.querySelector('#Tunnel_of_truth_Theme');
let Quick_death_Theme = document.querySelector('#Quick_death_Theme');
let March_into_fire_Theme = document.querySelector('#March_into_fire_Theme');
let Long_funeral_Theme = document.querySelector('#Long_funeral_Theme');

// mode buttons 
let gameMode_KI_card = document.querySelector('#gameMode-KI-card');
let gameMode_TwoPlayerOnline_card = document.querySelector('#gameMode-TwoPlayerOnline-card');
let gameMode_OneVsOne_card = document.querySelector('#gameMode-OneVsOne-card');

// treasure countdown
let TreasureCountdown;

// important data
let GameMode = {
    1: {
        "opponent": "KI", // You play against a KI if your offline or you want to get better
        "icon": "fa-solid fa-robot",
        "description": "Play against a KI"
    },
    2: {
        "opponent": "OnlineFriend", // Guy you send a link to so you can play with him together
        "icon": "fa-solid fa-user-group",
        "description": "Play online with a friend"
    },
    3: {
        "opponent": "ComputerFriend", // Guy on same computer
        "icon": "fa-solid fa-computer",
        "description": "Play with a friend"
    },
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
        "icon": "fa-solid fa-skull",
        "averagePlayTime": "30 minutes",
        "theme": ".../assets/Maps/Long_Funeral.mp3",
        "theme_name": Long_funeral_Theme,
    },
    9: {
        "name": "Impossible survival",
        "size": "30x30",
        "blocks": "900",
        "xyCellAmount": "30",
        "icon": "fa-solid fa-chess-knight",
        "averagePlayTime": "2+ hours",
        "theme": ".../assets/Maps/Tunnel_of_truth.mp3",
        "theme_name": Quick_death_Theme,
    },
    10: {
        "name": "Merciful slaughter",
        "size": "40x40",
        "blocks": "1600",
        "xyCellAmount": "40",
        "icon": "fa-solid fa-skull",
        "averagePlayTime": "5+ hours",
        "theme": ".../assets/Maps/Long_Funeral.mp3",
        "theme_name": Long_funeral_Theme,
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
        5: '25x25',
        6: '30x30',
        7: '40x40',
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
    '25x25': document.querySelector('#twentyfivextwentyfive'),
    '30x30': document.querySelector('#thirtyxthirty'),
    '40x40': document.querySelector('#fortyxforty'),
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
let appVolume = 0.05;
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

let socket = io('https://complextoeserveradmin.onrender.com', {
    // path: "https://complextoeserveradmin.onrender.com",
    // transports: ['websocket'],
});

window.socket = socket;

// app initialization and code --------------
(function AppInit() {
    ini_LightDark_Mode();
    // local storage properties
    ElO_Points();
    OnlineMatchesWon();
    UserOfflineData();
    GameItems();
    CheckTreasure();

    KI_Card_DescriptionDisplay.textContent = GameMode[1].description;
    OnlineFriend_Card_DescriptionDisplay.textContent = GameMode[2].description;
    ComputerFriend_Card_DescriptionDisplay.textContent = GameMode[3].description;

    checkForSettings();
})();

function CheckTreasure() {
    // user is first time in the game
    if (localStorage.getItem('treasureIsAvailible') == null && localStorage.getItem('treasureIsAvailible') == undefined) {
        treasureCountDown();
        localStorage.setItem('treasureIsAvailible', false);
        return;
    };

    // user is not the first time in the game
    if (localStorage.getItem('treasureIsAvailible') == "true") {
        treasureIsAvailible();

    } else {
        treasureCountDown();
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

function ElO_Points() {
    let ELO_storage = localStorage.getItem('ELO');

    if (localStorage.getItem('ELO')) {
        ELO_Points_display.textContent = ELO_storage;
        userInfoSkillpoints.textContent = ELO_storage;

    } else {
        localStorage.setItem('ELO', '1000');
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

function UserOfflineData() {
    let name = localStorage.getItem('UserName');
    let icon = localStorage.getItem('UserIcon');

    if (name && icon) {
        userInfoName.textContent = name;
        userInfoIcon.textContent = icon;
        userInfoName.setAttribute('contenteditable', false)
        userInfoIcon.setAttribute('contenteditable', false)
    };
};

function checkForSettings() {
    // check for the settings
    if (localStorage.getItem('sett-DarkMode')) {
        console.log(localStorage.getItem('sett-DarkMode'));
    };
    if (localStorage.getItem('sett-RoundEdges')) {
        console.log(localStorage.getItem('sett-RoundEdges'));
    };
    if (localStorage.getItem('sett-Secret')) {
        console.log(localStorage.getItem('sett-Secret'));
    };
    if (localStorage.getItem('sett-ShowPing')) {
        console.log(localStorage.getItem('sett-ShowPing'));
    };
    if (localStorage.getItem('ELO')) {
        console.log(localStorage.getItem('ELO'));
    };
    if (localStorage.getItem('onlineMatches-won')) {
        console.log(localStorage.getItem('onlineMatches-won'));
    };
};

// add click sound to gameMode Cards and animation
Allbtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // audio
        playBtn_Audio();

        // animation
        gameModeCards_Div.style.display = 'none';
        gameModeFields_Div.style.display = 'flex';
    });
});

// event listener

// Go back from NxN field-cards to GameMode cards
fieldsArea_back_btn.addEventListener('click', () => {
    // audio
    playBtn_Audio_2();

    // animation
    gameModeCards_Div.style.display = 'flex';
    gameModeFields_Div.style.display = 'none';
    lobbyHeader.style.borderBottom = '3px solid';
});

// Game Mode buttons 
gameMode_KI_card.addEventListener('click', () => {
    curr_mode = GameMode[1].opponent;
    lobbyHeader.style.borderBottom = 'none';

    // visibility for Ki Fields and GameMode fields
    ThreexThree_Field.style.display = 'flex';
    ForxFor_Field.style.display = 'flex';
    FivexFive_Field.style.display = 'none';
    TenxTen_Field.style.display = 'none';
    FifTeenxFifTeen_Field.style.display = 'none';
    TwentyxTwentyField.style.display = 'none';
    // Display Game Mode Description
    GameModeDisplay.textContent = GameMode[1].description;
});

gameMode_TwoPlayerOnline_card.addEventListener('click', () => {
    curr_mode = GameMode[2].opponent;
    lobbyHeader.style.borderBottom = 'none';

    // visibility for Ki Fields and GameMode fields
    ThreexThree_Field.style.display = 'none';
    ForxFor_Field.style.display = 'none';
    FivexFive_Field.style.display = 'flex';
    TenxTen_Field.style.display = 'flex';
    FifTeenxFifTeen_Field.style.display = 'flex';
    TwentyxTwentyField.style.display = 'flex';
    // Display Game Mode Description
    GameModeDisplay.textContent = GameMode[2].description;
});

gameMode_OneVsOne_card.addEventListener('click', () => {
    curr_mode = GameMode[3].opponent;
    lobbyHeader.style.borderBottom = 'none';

    // visibility for Ki Fields and GameMode fields
    ThreexThree_Field.style.display = 'none';
    ForxFor_Field.style.display = 'none';
    FivexFive_Field.style.display = 'flex';
    TenxTen_Field.style.display = 'flex';
    FifTeenxFifTeen_Field.style.display = 'flex';
    TwentyxTwentyField.style.display = 'flex';
    // Display Game Mode Description
    GameModeDisplay.textContent = GameMode[3].description;
});

// field-cards click event

// Normal Mode
FivexFive_Field.addEventListener('click', () => { playBtn_Audio(); });
FifTeenxFifTeen_Field.addEventListener('click', () => { playBtn_Audio(); });
TenxTen_Field.addEventListener('click', () => { playBtn_Audio(); });
TwentyxTwentyField.addEventListener('click', () => { playBtn_Audio(); });

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

        if (setting != "sett-DarkMode") {
            let bool = box.getAttribute('marked'); // true ? false
            localStorage.setItem(setting, bool);
        };

        // dark/light mode switcher
        if (setting == "sett-DarkMode") {
            Set_Light_Dark_Mode();
        };
    });
});

settingsCloseBtn.addEventListener('click', () => {
    settingsWindow.style.display = 'none';
    DarkLayer.style.display = 'none';
});

headerSettBtn.addEventListener('click', () => {
    settingsWindow.style.display = 'block';
    DarkLayer.style.display = 'block';
});

// Enter Game
function EnterGame() {
    NxN_field.forEach(field => {
        field.addEventListener('click', f => {
            SetClockList.style.display = 'flex';
            SetGameModeList.style.display = 'flex';

            // warn text for online game mode
            OnlineGame_NameWarnText[0].style.display = 'none';
            OnlineGame_NameWarnText[0].style.display = 'none';

            if (curr_mode == GameMode[3].opponent) { // Computer Friend Mode

                SetPlayerNamesPopUp.style.display = 'flex';
                DarkLayer.style.display = 'block';
                Player2_NameInput.style.display = 'block';
                Player2_IconInput.style.display = 'block';

                curr_name1 = null;
                curr_name2 = null;
                curr_field_ele = f.target;

                // Initialize Inputs from pop up
                DisableGameModeItems();
                DisablePlayerClockItems();
                Player1_NameInput.value = "";
                Player2_NameInput.value = "";
                Player1_IconInput.value = "X";
                Player2_IconInput.value = "O";
            };

            if (curr_mode == GameMode[1].opponent) { // KI Mode

                YourNamePopUp_KI_Mode.style.display = 'flex';
                DarkLayer.style.display = 'block';
                YourName_Input_KI_mode.value = "";
                Your_IconInput.value = "";

                curr_name1 = null;
                curr_name2 = null;
                curr_field_ele = f.target;

                // default data
                if (localStorage.getItem('UserName')) {
                    YourName_Input_KI_mode.value = localStorage.getItem('UserName');
                    Your_IconInput.value = localStorage.getItem('UserIcon');
                };
            };

            if (curr_mode == GameMode[2].opponent) { // Online Game mode

                curr_field_ele = f.target;

                // Initialize Inputs from pop up
                DarkLayer.style.display = 'block';
                OnlineGame_iniPopUp.style.display = 'flex';
                Player2_NameInput.style.display = 'none';
                Player2_IconInput.style.display = 'none';
                Player1_NameInput.style.height = '50%';
                Player1_IconInput.style.height = '50%';

                // default data
                if (localStorage.getItem('UserName')) {
                    Player1_NameInput.value = localStorage.getItem('UserName');
                    Player1_IconInput.value = localStorage.getItem('UserIcon');
                };
            };
        });
    });
};
EnterGame();

// From the Confirm Button of the "create game button" in the SetUpGameData Window
// User set all the game data for the game and his own player data. The confirm button calls this function
// Room gets created and the creater gets joined in "index.js"
function UserCreateRoom() {
    let Check = SetGameData_CheckConfirm();
    // if Player1 Namefield and Player2 Namefield isn't empty etc., initialize Game
    if (Player1_NameInput.value != "" &&
        Player1_IconInput.value != "" &&
        Check[0] == true && Check[1] == true) {
        // server
        let fieldIndex = curr_field_ele.getAttribute('index');
        let fieldTitle = curr_field_ele.getAttribute('title');

        let xyCell_Amount = Fields[fieldIndex].xyCellAmount;

        // GameData: Sends PlayerClock, InnerGameMode and xyCellAmount ; PlayerData: sends player name and icon => requests room id 
        socket.emit('create_room', [Check[2], Check[3], xyCell_Amount, Player1_NameInput.value, Player1_IconInput.value, fieldIndex, fieldTitle], message => {
            Lobby_GameCode_display.textContent = `Game Code: ${message}`;
            Lobby_GameCode_display.style.userSelect = 'text';

            // set up personal_GameData
            personal_GameData.currGameID = message;
            personal_GameData.EnterOnlineGame = false;
            personal_GameData.role = 'admin';

            Lobby_startGame_btn.style.display = 'block';
            LobbyUserFooterInfo.style.display = 'none';
        });

        // general stuff
        OnlineGame_Lobby.style.display = 'flex';
        SetPlayerNamesPopUp.style.display = 'none';

        // initialize game with the right values
        curr_name1 = Player1_NameInput.value;
        curr_name2 = Player2_NameInput.value;
        curr_form1 = Player1_IconInput.value.toUpperCase();
        curr_form2 = Player2_IconInput.value.toUpperCase();
        curr_innerGameMode = Check[3]; // Inner Game
        curr_selected_PlayerClock = Check[2]; // Player Clock

        // initialize lobby display
        Lobby_InnerGameMode.textContent = `${Check[3]}`;
        Lobby_PlayerClock.textContent = `${Check[2]} seconds`;
        Lobby_FieldSize.textContent = `${xyCell_Amount}x${xyCell_Amount}`;

    } else {
        return;
    };
};

// set player names in normal mode
SetPlayerName_ConfirmButton.addEventListener('click', () => {
    if (curr_mode == GameMode[2].opponent) { // online mode

        // if user wants to enter an online game
        if (personal_GameData.EnterOnlineGame) {

            // If user entered his name and which form he wants to use in the game
            if (Player1_IconInput.value != "" && Player1_NameInput.value != "") {

                socket.emit('CONFIRM_enter_room', [personal_GameData.currGameID, Player1_NameInput.value.trim(), Player1_IconInput.value.trim()], (m) => {
                    // If user name is equal to admins name
                    if (m == 'Choose a different name!') {
                        OnlineGame_NameWarnText[1].style.display = 'none';
                        OnlineGame_NameWarnText[0].style.display = 'block';
                    };

                    // If user icon is equal to admins icon
                    if (m == 'Choose a different icon!') {
                        OnlineGame_NameWarnText[0].style.display = 'none';
                        OnlineGame_NameWarnText[1].style.display = 'block';
                    };

                    if (m != 'Choose a different name!' && m != 'Choose a different icon!') {
                        // initialize game with the right values
                        curr_name1 = Player1_NameInput.value;
                        curr_form1 = Player1_IconInput.value.toUpperCase();

                        Lobby_first_player.textContent = `${m[1]} - ${m[2].toUpperCase()}`; // set name of first player for all in the room
                        Lobby_second_player.textContent = `${m[0]} (You) - ${m[3].toUpperCase()}`; // set name of second player for all in the room

                        OnlineGame_NameWarnText[0].style.display = 'none';
                        OnlineGame_NameWarnText[0].style.display = 'none';

                        // general stuff
                        OnlineGame_Lobby.style.display = 'flex';
                        SetPlayerNamesPopUp.style.display = 'none';
                    };
                });
            };

        } else { // user wants to create an online game
            UserCreateRoom();
        };

    } else { // computer mode

        let Check = SetGameData_CheckConfirm();

        // if Player1 Namefield and Player2 Namefield isn't empty etc., initialize Game
        if (Player1_NameInput.value != "" && Player2_NameInput.value != "" && Player1_NameInput.value != Player2_NameInput.value &&
            Player1_IconInput.value != "" && Player2_IconInput.value != "" && Player1_IconInput.value != Player2_IconInput.value &&
            Check[0] == true && Check[1] == true) {

            // general stuff
            SetPlayerNamesPopUp.style.display = 'none';

            // initialize game with the right values
            let fieldIndex = curr_field_ele.getAttribute('index');
            curr_name1 = Player1_NameInput.value;
            curr_name2 = Player2_NameInput.value;
            curr_form1 = Player1_IconInput.value.toUpperCase();
            curr_form2 = Player2_IconInput.value.toUpperCase();
            curr_innerGameMode = Check[3]; // Inner Game
            curr_selected_PlayerClock = Check[2]; // Player Clock

            DarkLayer.style.display = 'none';
            initializeGame(curr_field_ele);

            // play theme music 
            PauseMusic();
            CreateMusicBars(Fields[fieldIndex].theme_name);

        } else {
            return;
        };
    };
});

//If you play against a bot in the KI Mode
SetPlayerName_confBTN_KIMode.addEventListener('click', () => {
    if (YourName_Input_KI_mode.value != "" && Your_IconInput.value != "") {
        // html stuff
        YourNamePopUp_KI_Mode.style.display = 'none';
        DarkLayer.style.display = 'none';

        // initialize game with the right values
        let fieldIndex = curr_field_ele.getAttribute('index');
        curr_name1 = YourName_Input_KI_mode.value;
        curr_name2 = 'Bot';
        curr_form1 = Your_IconInput.value;
        curr_form2 = 'O' // Bot        

        initializeGame(curr_field_ele);

        // play theme music 
        PauseMusic();
        CreateMusicBars(Fields[fieldIndex].theme_name);
    };
});

// If player clicks confirm button check if he selected the clock and Inner game mode
const SetGameData_CheckConfirm = () => {
    let Check1 = false;
    let Check2 = false;
    let Clock = "";
    let InnerGameMode = "";

    Array.from(SetClockList.children).forEach(e => {
        if (e.getAttribute('selected') == "true") {
            Check1 = true;
            Clock = e.getAttribute('value');
        };
    });
    Array.from(SetGameModeList.children).forEach(e => {
        if (e.getAttribute('selected') == "true") {
            Check2 = true;
            InnerGameMode = e.children[0].children[0].textContent;
        };
    });

    return [Check1, Check2, Clock, InnerGameMode];
};

// close buttons
YourName_KI_ModeCloseBtn.addEventListener('click', () => {
    // html stuff
    YourNamePopUp_KI_Mode.style.display = 'none';
    DarkLayer.style.display = 'none';
});

// Game Info PopUp stuff
gameInfo_btn.addEventListener('click', () => {
    DarkLayer.style.display = 'flex';
    GameInfoPopUp.style.display = 'flex';
    GameInfo_HeaderTitle.textContent = `${curr_field} - Game Info`;

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
        PatternGridFive.forEach(pattern => pattern.style.display = 'grid');
    };
});

GameInfoClose_btn.addEventListener('click', () => {
    DarkLayer.style.display = 'none';
    GameInfoPopUp.style.display = 'none';
});

GameModelistItem_Boneyard.addEventListener('click', () => {
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
            GameModeListItemCheckMark_BlockerCombat.classList = 'fa-solid fa-check';
            GameModeListItem_BlockerCombat.style.color = 'white';
            GameModeListItem_BlockerCombat.setAttribute('selected', 'true');
            break;

        case 'true':
            GameModeListItemCheckMark_BlockerCombat.classList = '';
            GameModeListItem_BlockerCombat.style.color = 'black';
            GameModeListItem_BlockerCombat.setAttribute('selected', 'false');
            break;
    };
});

GameModeListItem_FreeFight.addEventListener('click', () => {
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

// Set Light/Dark Mode
function Set_Light_Dark_Mode(from) {
    if (localStorage.getItem('sett-DarkMode') == "true") { // dark mode is already on, switch to light mode
        document.body.classList.remove('dark-mode');
        localStorage.setItem('sett-DarkMode', false);


        if (from == "moon") {
            settDarkMode.classList = "fa-regular fa-square checkBox";
            settDarkMode.setAttribute("marked", "false");
        };

    } else { // light mode is already on, switch to dark mode
        document.body.classList.add('dark-mode');
        localStorage.setItem('sett-DarkMode', true);

        if (from == "moon") {
            settDarkMode.classList = "fa-regular fa-check-square checkBox";
            settDarkMode.setAttribute("marked", "true");
        };
    };
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

OnlineGame_CodeNamePopUp_closeBtn.addEventListener('click', () => {
    OnlineGame_CodeName_PopUp.style.display = 'none';
    DarkLayer.style.display = 'none';
});

sett_rsetELO_Points_btn.addEventListener('click', () => {
    localStorage.setItem('ELO', '1000');
    ELO_Points_display.textContent = localStorage.getItem('ELO');
});

// open set up game data pop up with online game code
function setUpOnlineGame(from) {
    if (from == 'create') {
        // other
        SetPlayerNamesPopUp.style.display = 'flex';
        DarkLayer.style.display = 'block';

        curr_name1 = null;
        curr_name2 = null;

        // Initialize Inputs from pop up
        DisableGameModeItems();
        DisablePlayerClockItems();
        Player1_NameInput.value = "";
        Player2_NameInput.value = "";
        Player1_IconInput.value = "X";
        Player2_IconInput.value = "O";
        SetGameData_Label[0].style.display = 'block';
        SetGameData_Label[1].style.display = 'block';
        OnlineGame_NameWarnText[0].style.display = 'none';
        OnlineGame_NameWarnText[0].style.display = 'none';

        // default data
        if (localStorage.getItem('UserName')) {
            Player1_NameInput.value = localStorage.getItem('UserName');
            Player1_IconInput.value = localStorage.getItem('UserIcon');
        };

    } else if (from == 'enter') {
        OnlineGame_CodeName_PopUp.style.display = 'flex';
        // bug fix
        EnterGameCode_Input.value = null;
    };
};

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

    if (isInAdvancedGameModes) {
        goToAdvancedFields.classList = "fa-solid fa-caret-down";
        secondTierModes.style.marginBottom = "0";
        isInAdvancedGameModes = false;
        bossModeIsActive = false;
        playGameTheme();

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

let ContBtnCount = 0;
animatedPopConBtn.addEventListener('click', () => {
    playBtn_Audio_2();
    if (ContBtnCount == 0) {
        let TextHead = document.createElement("h2");
        let newText = document.createTextNode("Each individual field has its own secret properties you have to discover... Will you survive?");
        TextHead.classList.add("newText")
        TextHead.appendChild(newText);
        animatedPopMain.querySelectorAll("h2")[0].style.display = "none";
        animatedPopMain.querySelectorAll("h2")[1].style.display = "none";
        animatedPopMain.appendChild(TextHead);
        ContBtnCount++;

    } else if (ContBtnCount == 1) {
        animatedPopMain.querySelector('.newText').textContent = "You entered boss mode!";
        ContBtnCount++;

    } else if (ContBtnCount == 2) {
        DarkLayer.style.display = 'none';
        animatedPopMain.querySelectorAll("h2")[0].style.display = "block";
        animatedPopMain.querySelectorAll("h2")[1].style.display = "block";
        animatedPopMain.querySelector('.newText').remove();
        animatedPopUp.style.display = 'none';
        ContBtnCount = 0;
    };
});

headerUserBtn.addEventListener('click', () => {
    DarkLayer.style.display = 'block';
    userInfoPopUp.style.display = 'flex';
    userInfoOnlineMatchesWon.textContent = JSON.parse(localStorage.getItem('onlineMatches-won'));

    if (localStorage.getItem('UserName')) {
        userInfoName.textContent = localStorage.getItem('UserName');
        userInfoIcon.textContent = localStorage.getItem('UserIcon');

        CreateOnlineProfileBtn.style.display = 'none';
        UserInfoCont.style.display = 'flex';

    } else {
        userInfoName.textContent = "";
        userInfoIcon.textContent = "";

        CreateOnlineProfileBtn.style.display = 'block';
        UserInfoCont.style.display = 'none';
    };
});

userInfoCloseBtn.addEventListener('click', () => {
    DarkLayer.style.display = 'none';
    userInfoPopUp.style.display = 'none';
});

CreateOnlineProfileBtn.addEventListener('click', () => {
    CreateOnlineProfileBtn.style.display = 'none';
    UserInfoCont.style.display = 'flex';

    userInfoName.focus();
});

// user submits his simple offline data
function submittedOfflineData() {
    let userName = userInfoName.textContent;
    let userIcon = userInfoIcon.textContent;

    localStorage.setItem('UserName', userName);
    localStorage.setItem('UserIcon', userIcon);

    userInfoName.setAttribute('contenteditable', false);
    userInfoIcon.setAttribute('contenteditable', false);
    DarkLayer.style.display = 'none';
    userInfoPopUp.style.display = 'none';
};

storeIcon.addEventListener('click', () => {

});

treasureIcon.addEventListener('click', () => {
    // check if treasure can be opened
    if (localStorage.getItem('treasureIsAvailible') == "true") {
        openTreasure();
    } else {
        if (!TreasureCountdown) {
            treasureCountDown();
        };
        treasureBoxTimerPopUp.style.display = 'flex';
        DarkLayer.style.display = 'block';
    };
});

treasurePopUpcloseBtn.addEventListener('click', () => {
    treasureBoxTimerPopUp.style.display = 'none';
    DarkLayer.style.display = 'none';
});

// 24 hour countdown for treasure
// every 24 hours the user can open the treasure in the lobby
function treasureCountDown() {
    let Nhour = 0;
    let Nminutes = 0;
    let Nseconds = 5;

    TreasureCountdown = setInterval(() => {
        (init = () => {
            seconds.textContent = Nseconds;
            minutes.textContent = Nminutes;
            hours.textContent = Nhour;
        })();

        if (Nhour < 1 && Nminutes < 1 && Nseconds <= 0) {
            clearInterval(TreasureCountdown);
            TreasureCountdown = null;
            treasureIsAvailible();
        };

        Nseconds--;

        if (Nseconds <= -1 && Nminutes <= 0 && Nhour >= 1) {
            Nhour--;
            Nminutes = 59;
            Nseconds = 59;
        };

        // display minutes
        if (Nseconds <= -1 && Nminutes > 0) {
            Nminutes--;
            Nseconds = 59;
            minutes.textContent = Nminutes;
        };

        if (Nminutes <= 9) {
            minutes.textContent = `0${Nminutes}`;
        } else {
            minutes.textContent = Nminutes;
        };

        // display seconds
        if (Nseconds <= 9) {
            seconds.textContent = `0${Nseconds}`;
        } else {
            seconds.textContent = Nseconds;
        };

        // display hours
        if (Nminutes < 1 && Nminutes > 0) {
            Nhour--;
            hours.textContent = Nhour;
        };

        if (Nhour <= 9) {
            hours.textContent = `0${Nhour}`;
        } else {
            hours.textContent = Nhour;
        };

    }, 1000);
};

// countdown is done, treasure can be opened now
function treasureIsAvailible() {
    localStorage.setItem('treasureIsAvailible', true);

    // play animation
    treasureIcon.style.animation = "treasure_availible 1s infinite";
    treasureBoxTimerPopUp.style.display = "none";
    DarkLayer.style.display = 'none';
};

// get random number global function
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

// user opens the treasure
function openTreasure() {
    localStorage.setItem('treasureIsAvailible', false);

    treasureIcon.style.animation = "none";

    // The probability the earn x is 1/10 
    // All the other times the player gets diamants
    const isXRare = getRandomNumber(1, 11) === 1;

    if (isXRare) {
        // Player gains X
        ItemAnimation('fa-solid fa-x');

    } else {
        // Spieler gains diamants
        let counter = 0;
        let count = setInterval(() => {
            counter++;
            if (counter >= 50) {
                clearInterval(count);
            };
            ItemAnimation('fa-solid fa-gem');
        }, 50);
    };

    treasureCountDown();
};

// floating element over the screen
function ItemAnimation(item) {
    let div = document.createElement('div');
    let i = document.createElement('i');
    div.classList = 'floating-item';
    i.classList = item;

    if (item == 'fa-solid fa-gem') {
        div.style.animation = "gem 1s ease";
        let Gems = parseInt(localStorage.getItem('GemsItem'));
        Gems++;
        localStorage.setItem('GemsItem', Gems);
        gemsIcon.textContent = Gems;

    } else if (item == 'fa-solid fa-x') {
        div.style.animation = "x 1s ease";
        let Xi = parseInt(localStorage.getItem('ItemX'));
        Xi++;
        localStorage.setItem('ItemX', Xi);
        Xicon.textContent = Xi;
    };

    div.appendChild(i);
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 1000);

    playBtn_Audio_2();
};