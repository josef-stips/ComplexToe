// click sound on button click event
let Allbtns = document.querySelectorAll('.btn');
let btn_sound = document.querySelector('#btn_click_1');
let btn_sound2 = document.querySelector('#btn_click_2');
let eye_attack_soundeffect = document.querySelector('#eye_attack_soundeffect');
const audio = document.querySelector("#bg_audio");
const boss_theme = document.querySelector('#boss_theme')
const mapSound = document.querySelector('#mapSound');
let default_MapLevel_theme = document.querySelector('#default_MapLevel_theme');
let default_MapLevel_theme2 = document.querySelector('#default_MapLevel_theme2');
let theEye_theme = document.querySelector('#theEye_theme');

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
let KEYicon = document.querySelector('.KEYicon');
// let OnlineGame_GameCode_Display = document.querySelector('.OnlineGame_GameCode_Display'); // in the "setupGameData" window, there is already the game id shown, which is not right

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
let thirtyxthirty_MiniBoard = document.querySelector('#thirtyxthirty_MiniBoard');
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
let loading_fill = document.querySelector('.loading_fill');
let loadingGame_ProcentDisplay = document.querySelector('.loadingGame_ProcentDisplay');
let loadingScreen = document.querySelector('.loadingScreen');
let random_loadingText = document.querySelector('.random_loadingText');
let lobbyFooterText = document.querySelector('.lobby-footer-text');

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
let closeAlertPopUpBtn = document.querySelector('#closeAlertPopUpBtn');
let AlertText = document.querySelector('.alert-text-span');
let alertPopUp = document.querySelector('.alert-pop-up');
let editUserProfileBtn = document.querySelector('#editUserProfileBtn');
let eye_40 = document.querySelector('.eye');
let The_eye = document.querySelector('.eyeIMG');
let eyeLifeBar = document.querySelector('.eyeLifeBar');
let eyeLifeCounter = document.querySelector('.eyeLifeCounter');
let eyeIMG_container = document.querySelector('.eyeIMG_container');
let eyeBar_fill2 = document.querySelector('.eyeBar_fill2');
let eyeNextAttackTimer = document.querySelector('.eyeNextAttackTimer');
let eye_attckingBeam = document.querySelector('.eye_attckingBeam');
let tradeX_PopUp = document.querySelector('.tradeX_PopUp');
let tradeX_closebtn = document.querySelector('.tradeX_closeBtn');
let tradeX_ConfirmBtn = document.querySelector('.tradeX_ConfirmBtn');
let XBtn = document.querySelector('.XBtn');
let clickEnter_text = document.querySelector('.clickEnter_text');
let mapLevel_AllowedPatterns_Text = document.querySelector('.mapLevel_AllowedPatterns_Text');
let conquered_MapLevel_Display = document.querySelector('.conquered_MapLevel_Display');
let mapLevel_ModeDisplay = document.querySelector('.mapLevel_ModeDisplay');
// sun
let sun_40 = document.querySelector('.sun');
let sunIMG_container = document.querySelector('.sunIMG_container');
let The_sun = document.querySelector('.sunIMG');
let sunLifeBar = document.querySelector('.sunLifeBar');
let sunBar_fill2 = document.querySelector('.unBar_fill2');
let sunLifeCounter = document.querySelector('.sunLifeCounter');
let sun_attckingBeam = document.querySelector('.sun_attckingBeam');

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

let BlockerCombat_OnlineGameWarnText = document.querySelector('.BlockerCombat_OnlineGameWarnText');
let RandomAllowedWinCombinations_Btn = document.querySelector('.RandomAllowedWinCombinations_Btn');
let UserSetPointsToWinGameInput = document.querySelector('.UserSetPointsToWinGameInput');
let SetAllowedPatternsWrapper = document.querySelector('.SetAllowedPatternsWrapper');
let setPatternWrapper = document.querySelectorAll('.setPatternWrapper');
let togglePatternBtn = document.querySelectorAll('.togglePatternBtn');
let SetPatternGrid = document.querySelectorAll('.SetPatternGrid');
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
let skinShop = document.querySelector('.skin-shop');
let skinShopCloseBtn = document.querySelector('.skinShopCloseBtn');
let skinBigItem = document.querySelector('.skinBigItem');
let skinToSelect = document.querySelectorAll('.skin-to-select');
let skinPriceDisplay = document.querySelector('.skin-price-display');
let buySkinBtn = document.querySelector('.buy-skin-button');
let BuySkinError = document.querySelector('.BuySkinError');
let useSkinBtn = document.querySelector('.use-skin-button');
let sidelinePrice = document.querySelector('.sideline-price');
let SkinInputDisplay = document.querySelectorAll('.SkinInputDisplay')[0];
let Map_SkinInputDisplay = document.querySelectorAll('.SkinInputDisplay')[1];
let SkinInputDisplaySkin = document.querySelectorAll('.SkinInputDisplay-skin')[0];
let Map_SkinInputDisplaySkin = document.querySelectorAll('.SkinInputDisplay-skin')[1];
let lockedIcon40 = document.querySelector('.locked-icon_40');
let lockedIcon30 = document.querySelector('.locked-icon_30');
let lockedIcon25 = document.querySelector('.locked-icon_25');
let fieldTitle_25 = document.querySelector('.fieldTitle_25');
let fieldTitle_30 = document.querySelector('.fieldTitle_30');
let fieldTitle_40 = document.querySelector('.fieldTitle_40');
let planet = document.querySelector('.planet');
let AdvantureMap = document.querySelector('.AdvantureMap');
let AdvantureMapBackbtn = document.querySelector('#AdvantureMap-Backbtn');
let MapLevelBtns = document.querySelectorAll('.mapLevel_Btn');
let mapItem = document.querySelectorAll('.mapItem');
let mapKey = document.querySelector('.mapKey');
let mapKeyValueDisplay = document.querySelector('.KEYicon1');
let mapLevelOverview = document.querySelector('.mapLevelOverview');
let mapLevelTitle = document.querySelector('.mapLevel-title');
let closeMapLevelOverviewBtn = document.querySelector('.closeMapLevelOverviewBtn');
let startMapLevelBtn = document.querySelector('.startMapLevelBtn');
let MapLevel_IconInput = document.querySelector('#MapLevel_IconInput');
let MapLevel_NameInput = document.querySelector('#MapLevel_NameInput');
let MapLevel_SetIconLabel = document.querySelector('#MapLevel_SetIconLabel');
const MapLevel_Bar_fillElement = document.querySelector('.fill2');
let mapLevel_description = document.querySelector('.mapLevel_Description_Text');
let HowToWinText = document.querySelector('.HowToWinText');
let UserGivesData_PopUp_name = document.querySelectorAll('.UserGivesData_PopUp')[0];
let UserGivesData_PopUp_icon = document.querySelectorAll('.UserGivesData_PopUp')[1];
let UserGivesData_closeBtn_NAME = document.querySelector('#UserGivesData_closeBtn_NAME');
let UserGivesData_closeBtn_ICON = document.querySelector('#UserGivesData_closeBtn_ICON');
let UserGivesData_IconInput = document.querySelector('#UserGivesData_IconInput');
let UserGivesData_NameInput = document.querySelector('#UserGivesData_NameInput');
let BossIn_MapLevel_Display = document.querySelector('.BossIn_MapLevel_Display');
let exploredItems_bookBtn = document.querySelector('.exploredItems_bookBtn');
let exploredItems_PopUp = document.querySelector('.exploredItems_PopUp');
let exploredItems_main = document.querySelector('.exploredItems_main');
let exploredItemPopUp_closeBtn = document.querySelector('.exploredItemPopUp_closeBtn');
let encryptedWriting_ItemCount = document.querySelector('.encryptedWriting_ItemCount');
let ore_ItemCount = document.querySelector('.ore_ItemCount');
let abandonedEye_ItemCount = document.querySelector('.abandonedEye_ItemCount');
let asteroid_ItemCount = document.querySelector('.asteroid_ItemCount');
let diamonds_ItemCount = document.querySelector('.diamonds_ItemCount');
let minerals_ItemCount = document.querySelector('.minerals_ItemCount');
let exploredItemTitle = document.querySelector('.exploredItemTitle');
let exploredItem_describtion = document.querySelector('.exploredItem_describtion');
let exploredItem_rarity = document.querySelector('.exploredItem_rarity');
let YouFoundItems_PopUp = document.querySelector('.YouFoundItems_PopUp');
let YouFound_OkBtn = document.querySelector('.YouFound_OkBtn');
let FoundItem1 = document.querySelector('.FoundItem1');
let FoundItem2 = document.querySelector('.FoundItem2');
let FoundItem3 = document.querySelector('.FoundItem3');
let foundItem1_img = document.querySelector('.foundItem1_img');
let foundItem2_img = document.querySelector('.foundItem2_img');
let foundItem3_img = document.querySelector('.foundItem3_img');
let foundItem_Title3 = document.querySelector('.foundItem_Title3');
let foundItem_Title2 = document.querySelector('.foundItem_Title2');
let foundItem_Title1 = document.querySelector('.foundItem_Title1');
let FoundItemCount_Display = document.querySelectorAll('.FoundItemCount_Display');
let LevelOverview_requirement = document.querySelectorAll('.LevelOverview_requirement');
let CheckmateWarnText = document.querySelector('.CheckmateWarnText');
let treasureIcon2 = document.querySelector('#treasure-icon-2');
let OnlineChat_btn = document.querySelector('.OnlineChat_btn');
let ChatMessage = document.querySelector('.ChatMessage');
let Submit_chatMessageBtn = document.querySelector('.Submit_chatMessageBtn');
let closeChat_btn = document.querySelector('.closeChat_btn');
let ChatTitle = document.querySelector('.ChatTitle');
let Chat_PopUp = document.querySelector('.Chat');
let ChatMain = document.querySelector('.ChatMain');
let MaxAmountOfMovesDisplay = document.querySelector('.MaxAmountOfMoves');
let MaxAmountOfMovesGameDisplay = document.querySelector('.MaxAmountOfMovesGameDisplay');

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
let Ground_destroyer_Theme = document.querySelector('#Ground_destroyer_Theme');
let Impossible_survival_Theme = document.querySelector('#Impossible_survival_Theme');
let Merciful_slaughter_Theme = document.querySelector('#Merciful_slaughter_Theme');

// mode buttons 
let gameMode_KI_card = document.querySelector('#gameMode-KI-card');
let gameMode_TwoPlayerOnline_card = document.querySelector('#gameMode-TwoPlayerOnline-card');
let gameMode_OneVsOne_card = document.querySelector('#gameMode-OneVsOne-card');

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

// allowed patterns choosed by player
// At the beginning all patterns are allowed, the user can choose which one to disable
let allowedPatternsFromUser = ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
    "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2", "branch3", "branch4", "special1", "special2"
];

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

// random loading text in loading screen
function rnd_loadingText() {
    let rndIndex = Math.floor(Math.random() * 6);

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
        socket = io('http://localhost:3000', {
            // path: "https://complextoeserveradmin.onrender.com",
            // transports: ['websocket'],
        });
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
        alertPopUp.style.display = "flex";
        AlertText.textContent = "It looks like you're offline! Try to reconnect.";

    } finally {
        // finally: check constantly if loading progress finished
        checkLoadingProgress(loading_progress)
    };
};

// check constantly if loading progress finished
function checkLoadingProgress() {
    if (loading_progress >= 100) {
        loadingScreen.style.display = "none";
        // start background music
        CreateMusicBars(audio);
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
        let script_fontawesome = document.createElement('script');
        let fonts_googleapis = document.createElement('link');
        let fonts_gstatic = document.createElement('link');
        let fonts_googleapis2 = document.createElement('link');
        let fonts_gstatic2 = document.createElement('link');
        let link_googleFont1 = document.createElement('link');
        let link_googleFont2 = document.createElement('link');

        // font awesome script
        script_fontawesome.src = "https://kit.fontawesome.com/8f7afdedcd.js";
        script_fontawesome.setAttribute("crossorigin", "anonymous");
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

        head.appendChild(script_fontawesome);
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
        alertPopUp.style.display = "flex";
        AlertText.textContent = "It looks like you're offline! Try to reconnect.";

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

    return 10;
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

        } else if (!localStorage.getItem('unlocked_25')) {
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
    };
};

function checkForSettings() {
    // check for the settings
    if (localStorage.getItem('sett-DarkMode')) {
        // console.log(localStorage.getItem('sett-DarkMode'));
    };
    if (localStorage.getItem('sett-RoundEdges')) {
        // console.log(localStorage.getItem('sett-RoundEdges'));
    };
    if (localStorage.getItem('sett-Secret')) {
        // console.log(localStorage.getItem('sett-Secret'));
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

// add click sound to gameMode Cards and animation
Allbtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // audio
        playBtn_Audio();

        // animation
        DarkLayer.style.backgroundColor = 'black';
        DarkLayer.style.display = 'block';
        DarkLayer.style.transition = 'opacity 0.1s ease-in';
        DarkLayer.style.opacity = '0';

        setTimeout(() => {
            DarkLayer.style.opacity = '1';
            setTimeout(() => {
                gameModeCards_Div.style.display = 'none';
                gameModeFields_Div.style.display = 'flex';
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

    });
});

// event listener

// Go back from NxN field-cards to GameMode cards
fieldsArea_back_btn.addEventListener('click', () => {
    // audio
    playBtn_Audio_2();
    CheckTreasureCanBeOpened();

    // animation
    DarkLayer.style.backgroundColor = 'black';
    DarkLayer.style.display = 'block';
    DarkLayer.style.transition = 'opacity 0.1s ease-in';
    DarkLayer.style.opacity = '0';

    setTimeout(() => {
        DarkLayer.style.opacity = '1';
        setTimeout(() => {
            gameModeCards_Div.style.display = 'flex';
            gameModeFields_Div.style.display = 'none';
            lobbyHeader.style.borderBottom = '3px solid';
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
});

// Game Mode buttons 
gameMode_KI_card.addEventListener('click', () => {
    curr_mode = GameMode[1].opponent;
    lobbyHeader.style.borderBottom = 'none';
    goToAdvancedFields.style.display = 'none';

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
});

gameMode_OneVsOne_card.addEventListener('click', () => {
    curr_mode = GameMode[3].opponent;
    lobbyHeader.style.borderBottom = 'none';
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
            // different functions for different fields
            if (f.target.getAttribute('field') == "25x25" && localStorage.getItem('onlineMatches-won') < 5) {
                click_locked_25();

            } else if (f.target.getAttribute('field') == "30x30" && localStorage.getItem('onlineMatches-won') < 10) {
                click_locked_30();

            } else if (f.target.getAttribute('field') == "40x40" && localStorage.getItem('onlineMatches-won') < 30) {
                click_locked_40();

            } else {
                Click_NxN(f);
            };
        });
    });
};
EnterGame();

function click_locked_25() {
    locked_25x25();
    alertPopUp.style.display = "flex";
    DarkLayer.style.display = "block";
    AlertText.textContent = "You need to win 5 online matches to unlock this field";
};

function click_locked_30() {
    locked_30x30();
    DarkLayer.style.display = "block";
    alertPopUp.style.display = "flex";
    AlertText.textContent = "You need to win 10 online matches to unlock this field";
};

function click_locked_40() {
    locked_40x40();
    DarkLayer.style.display = "block";
    alertPopUp.style.display = "flex";
    AlertText.textContent = "You need to win 30 online matches to unlock this field";
};

// User click a NxN field button
function Click_NxN(f) {
    let target = f.target;

    // if user selected random field
    if (target.id == "random_Field") {
        // generate random number and choose the random choosed field by its index
        const randomNumber = Math.floor(Math.random() * parseInt(Object.keys(DataFields).length)) + 1;

        // Switch-Statement zur Verarbeitung der generierten Zahl
        switch (randomNumber) {
            case 1:
                target = DataFields['5x5'];
                break;
            case 2:
                target = DataFields['10x10'];
                break;
            case 3:
                target = DataFields['15x15'];
                break;
            case 4:
                target = DataFields['20x20'];
                break;
            case 5:
                target = DataFields['25x25'];
                break;
            case 6:
                target = DataFields['30x30'];
                break;
            case 7:
                target = DataFields['40x40'];
                break;
        };
    };

    SetClockList.style.display = 'flex';
    SetGameModeList.style.display = 'flex';
    Player1_IconInput.style.color = 'black';

    // warn text for online game mode
    OnlineGame_NameWarnText[0].style.display = 'none';
    OnlineGame_NameWarnText[0].style.display = 'none';

    // for skins in online mode
    SkinInputDisplay.style.display = 'none';

    // reset previously made changes by the user
    resetUserChoosedAllowedPatterns();

    if (curr_mode == GameMode[3].opponent) { // Computer Friend Mode

        SetPlayerNamesPopUp.style.display = 'flex';
        DarkLayer.style.display = 'block';
        Player2_NameInput.style.display = 'block';
        Player2_IconInput.style.display = 'block';
        Player1_IconInput.style.display = 'block';

        curr_name1 = null;
        curr_name2 = null;
        curr_field_ele = target;

        // Initialize Inputs from pop up
        DisableGameModeItems();
        DisablePlayerClockItems();
        Player1_NameInput.value = "";
        Player2_NameInput.value = "";
        Player1_IconInput.value = "X";
        Player2_IconInput.value = "O";

        // default data
        Player1_IconInput.style.color = localStorage.getItem('userInfoColor');
        if (localStorage.getItem('userInfoColor') == "var(--font-color)") {
            Player1_IconInput.style.color = "black";
        };

        if (localStorage.getItem('UserName')) {
            Player1_NameInput.value = localStorage.getItem('UserName');
            Player1_IconInput.value = localStorage.getItem('UserIcon');
        };

        if (localStorage.getItem('userInfoClass') != "empty") {
            Player1_IconInput.style.display = 'none';
            SkinInputDisplay.style.display = 'block';

            SkinInputDisplaySkin.className = 'fa-solid fa-' + localStorage.getItem('current_used_skin');
        };
    };

    if (curr_mode == GameMode[1].opponent) { // KI Mode

        YourNamePopUp_KI_Mode.style.display = 'flex';
        DarkLayer.style.display = 'block';
        YourName_Input_KI_mode.value = "";
        Your_IconInput.value = "";
        Your_IconInput.style.color = localStorage.getItem('userInfoColor');
        curr_name1 = null;
        curr_name2 = null;
        curr_field_ele = target;

        // default data
        if (localStorage.getItem('UserName')) {
            YourName_Input_KI_mode.value = localStorage.getItem('UserName');
            Your_IconInput.value = localStorage.getItem('UserIcon');
        };
    };

    if (curr_mode == GameMode[2].opponent) { // Online Game mode

        if (target.getAttribute('field') == "25x25" && localStorage.getItem('onlineMatches-won') >= 5 ||
            target.getAttribute('field') == "30x30" && localStorage.getItem('onlineMatches-won') >= 10 ||
            target.getAttribute('field') == "40x40" && localStorage.getItem('onlineMatches-won') >= 30 ||
            target.getAttribute('field') == "20x20" || target.getAttribute('field') == "15x15" || target.getAttribute('field') == "10x10" ||
            target.getAttribute('field') == "5x5") {

            curr_field_ele = target;

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
    };
};

// When the user unlocks a specific field, the click event for this field needs to be unlocked
function Click_single_NxN(e) {
    SetClockList.style.display = 'flex';
    SetGameModeList.style.display = 'flex';
    Player1_IconInput.style.color = 'black';

    // warn text for online game mode
    OnlineGame_NameWarnText[0].style.display = 'none';
    OnlineGame_NameWarnText[0].style.display = 'none';

    // for skins in online mode
    SkinInputDisplay.style.display = 'none';

    if (curr_mode == GameMode[2].opponent) { // Online Game mode

        curr_field_ele = e.target;

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

    if (curr_mode == GameMode[3].opponent) { // Computer Friend Mode

        SetPlayerNamesPopUp.style.display = 'flex';
        DarkLayer.style.display = 'block';
        Player2_NameInput.style.display = 'block';
        Player2_IconInput.style.display = 'block';
        Player1_IconInput.style.display = 'block';

        curr_name1 = null;
        curr_name2 = null;
        curr_field_ele = e.target;

        // Initialize Inputs from pop up
        DisableGameModeItems();
        DisablePlayerClockItems();
        Player1_NameInput.value = "";
        Player2_NameInput.value = "";
        Player1_IconInput.value = "X";
        Player2_IconInput.value = "O";
    };
};

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

        if (localStorage.getItem('userInfoClass') == "empty") { // user doesn't use an advanced skin => everything's normal
            curr_form1 = Player1_IconInput.value.toUpperCase();

        } else { // user uses an advanced skin => change things
            curr_form1 = "fontawesome"; // later it will check if it has this value and do the required things
        };

        // GameData: Sends PlayerClock, InnerGameMode and xyCellAmount ; PlayerData: sends player name and icon => requests room id 
        socket.emit('create_room', [Check[2], Check[3], xyCell_Amount, Player1_NameInput.value, curr_form1, fieldIndex, fieldTitle, localStorage.getItem('userInfoClass'), localStorage.getItem('userInfoColor')], message => {
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

// set player data confirm button
SetPlayerName_ConfirmButton.addEventListener('click', () => {
    SetPlayerData_ConfirmEvent();
});

// user tries to start the game
function SetPlayerData_ConfirmEvent() {
    if (curr_mode == GameMode[2].opponent) { // online mode

        // if user wants to enter an online game
        if (personal_GameData.EnterOnlineGame) {

            // If user entered his name and which form he wants to use in the game
            if (Player1_IconInput.value != "" && Player1_NameInput.value != "") {

                socket.emit('CONFIRM_enter_room', [personal_GameData.currGameID, Player1_NameInput.value.trim(), Player1_IconInput.value.trim(),
                    localStorage.getItem('userInfoClass'), localStorage.getItem('userInfoColor')
                ], (m) => {
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

                        // m[2] icon of first player
                        // This code block is just so the second player who joins the lobby sees the icon of the first player in the right way
                        if (m[2] == "fontawesome") {
                            // admin uses an advanced skin => do stuff
                            let span = document.createElement('span');
                            span.className = m[5]; // example: "fa-solid fa-chess-rook"
                            span.classList.add("Temporary_IconSpan1");
                            Lobby_first_player.style.color = "white";

                            Lobby_first_player.textContent = `${m[1]} - `; // set name of first player for all in the room with advances icon
                            Lobby_first_player.appendChild(span);

                        } else { // admin uses a normal or color skin, everything's alright
                            Lobby_first_player.textContent = `${m[1]} - ${m[2].toUpperCase()}`; // set name of first player for all in the room
                            Lobby_first_player.style.color = m[6];

                            if (document.querySelector('.Temporary_IconSpan1')) {
                                document.querySelector('.Temporary_IconSpan1').remove();
                            };
                        };

                        // bug fixes
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
            initializeGame(curr_field_ele, undefined, undefined, allowedPatternsFromUser, undefined, UserSetPointsToWinGameInput.value);

            // play theme music 
            PauseMusic();
            CreateMusicBars(Fields[fieldIndex].theme_name);

        } else {
            return;
        };
    };
};

//If you play against a bot in the KI Mode
SetPlayerName_confBTN_KIMode.addEventListener('click', () => {
    CreateGame_KIMode();
});

// create and start game in KI Mode
function CreateGame_KIMode() {
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

        initializeGame(curr_field_ele, undefined, undefined, JSON.parse(localStorage.getItem('unlocked_mapLevels'))[1][6]);

        // play theme music 
        PauseMusic();
        CreateMusicBars(Fields[fieldIndex].theme_name);
    };
};

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
        HowToWinText.textContent = `Get ${UserSetPointsToWinGameInput.value} points or score more points than your opponent if he gives up.`;

    } else { // in advanture mode
        // display for 5x5 fields and higher
        PatternGridThree.forEach(pattern => pattern.style.display = 'none');
        PatternGridFor.forEach(pattern => pattern.style.display = 'none');
        PatternGridFive.forEach(pattern => pattern.style.display = 'grid');

        let unlocked_mapLevels = JSON.parse(localStorage.getItem('unlocked_mapLevels'));
        let allowed_patterns = unlocked_mapLevels[current_selected_level][6]; // array
        let Children = [...PatternGridFive];

        for (let i = 0; i < Children.length; i++) {
            const patt = Children[i];
            let pattern_class = patt.classList[2];

            if (allowed_patterns[i] == pattern_class) {
                patt.style.display = 'grid';
            } else {
                patt.style.display = 'none';
            };
        };

        // how to win text
        HowToWinText.textContent = unlocked_mapLevels[current_selected_level][7][1];
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

// Set Light/Dark Mode
function Set_Light_Dark_Mode(from) {
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
    alertPopUp.style.display = "flex";
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
        SkinInputDisplay.style.display = 'none';
        Player1_IconInput.style.display = 'block';

        // for better user experience 
        resetUserChoosedAllowedPatterns();

        // default data
        Player1_IconInput.style.color = localStorage.getItem('userInfoColor');
        if (localStorage.getItem('userInfoColor') == "var(--font-color)") {
            Player1_IconInput.style.color = "black";
        };

        if (localStorage.getItem('UserName')) {
            Player1_NameInput.value = localStorage.getItem('UserName');
            Player1_IconInput.value = localStorage.getItem('UserIcon');
        };

        if (localStorage.getItem('userInfoClass') != "empty") {
            Player1_IconInput.style.display = 'none';
            SkinInputDisplay.style.display = 'block';

            SkinInputDisplaySkin.className = 'fa-solid fa-' + localStorage.getItem('current_used_skin');
        };

    } else if (from == 'enter') {
        OnlineGame_CodeName_PopUp.style.display = 'flex';
        // bug fix
        EnterGameCode_Input.value = null;
        OnlineGameLobby_alertText.style.display = 'none';
    };
};

// reset the settings the user previously made in the set data pop up to start the game
function resetUserChoosedAllowedPatterns() {
    SetAllowedPatternsWrapper.style.scrollBottom = SetAllowedPatternsWrapper.style.scrollHeight;

    RandomAllowedWinCombinations_Btn.className = "fa-regular fa-square RandomAllowedWinCombinations_Btn";
    RandomAllowedWinCombinations_Btn.setAttribute('activated', "false");

    setPatternWrapper.forEach(ele => {
        ele.style.display = 'flex';
        ele.style.color = "white";
        [...ele.children[0].children].forEach(c => {
            c.style.color = "white";
        });
        ele.children[1].className = "fa-regular fa-square-check togglePatternBtn";
        ele.children[1].setAttribute("active", "true");
    });
    allowedPatternsFromUser = ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
        "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2", "branch3", "branch4", "special1", "special2"
    ];
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

let ContBtnCount = 0;
animatedPopConBtn.addEventListener('click', () => {
    if (!inAdvantureMode) {
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

            // Check if player unlocked one of these fields
            locked_25x25();
            locked_30x30();
            locked_40x40();
        };
    } else { // player is in advanture mode => other speech bubbles
        let unlocked_mapLevels = JSON.parse(localStorage.getItem('unlocked_mapLevels'));
        let level_text = unlocked_mapLevels[current_selected_level][7];

        playBtn_Audio_2();

        if (ContBtnCount == 0) {
            animatedPopMain.querySelector('.newText').textContent = level_text[1];
            ContBtnCount++;

        } else if (ContBtnCount == 1) {
            animatedPopMain.querySelector('.newText').textContent = "Click on the help button in the top left corner to see more information.";
            ContBtnCount++;

        } else if (ContBtnCount == 2) {
            DarkLayer.style.display = 'none';
            animatedPopMain.querySelectorAll("h2")[0].style.display = "block";
            animatedPopMain.querySelectorAll("h2")[1].style.display = "block";
            animatedPopMain.querySelector('.newText').remove();
            animatedPopUp.style.display = 'none';
            ContBtnCount = 0;

            // Check if player unlocked one of these fields
            locked_25x25();
            locked_30x30();
            locked_40x40();
        };
    };
});

headerUserBtn.addEventListener('click', () => {
    DarkLayer.style.display = 'block';
    userInfoPopUp.style.display = 'flex';
    userInfoOnlineMatchesWon.textContent = JSON.parse(localStorage.getItem('onlineMatches-won'));

    if (localStorage.getItem('UserIcon') != null) {
        editUserProfileBtn.style.display = 'initial';
    } else {
        editUserProfileBtn.style.display = 'none';
    };

    if (localStorage.getItem('UserName')) {
        userInfoName.textContent = localStorage.getItem('UserName');

        if (localStorage.getItem('userInfoClass') == "empty") {
            userInfoIcon.textContent = localStorage.getItem('UserIcon');
            userInfoIcon.className = 'userInfo-Icon userInfoEditable';

        } else {
            userInfoIcon.textContent = "";
            userInfoIcon.className = 'userInfo-Icon userInfoEditable fa-solid fa-' + localStorage.getItem('current_used_skin');
        };

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
    if (userInfoName.textContent != "" && userInfoIcon.textContent !== "" || userInfoName.textContent != "" && localStorage.getItem('UserIcon') != "" ||
        localStorage.getItem('UserIcon') == null) {

        DarkLayer.style.display = 'none';
        userInfoPopUp.style.display = 'none';

        if (userInfoIcon.textContent !== "") {
            localStorage.setItem('UserIcon', userInfoIcon.textContent);
        };

        if (localStorage.getItem('UserIcon') != null) {
            localStorage.setItem('UserName', userInfoName.textContent);
        };
    };
});

editUserProfileBtn.addEventListener('click', () => {
    UserGivesData_PopUp_name.style.display = "flex";
    UserGivesData_NameInput.focus();
});

CreateOnlineProfileBtn.addEventListener('click', () => {
    UserGivesData_PopUp_name.style.display = "flex";
    userInfoPopUp.style.display = "none";
    UserGivesData_NameInput.focus();
});

// Input on user name
UserGivesData_NameInput.addEventListener('keydown', e => {
    const inputValue = e.target.value;
    const validInput = inputValue.replace(/[^A-Za-z]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        e.target.value = validInput;
    };

    if (e.key === 'Enter') {
        e.preventDefault();

        if (UserGivesData_NameInput.value != "") {
            UserGivesData_PopUp_name.style.display = "none";
            UserGivesData_PopUp_icon.style.display = "flex";
            UserGivesData_IconInput.focus();

            userName = UserGivesData_NameInput.value;
        };
    };

    if (e.which === 32) {
        e.preventDefault();
    };
});

// Input on user icon
UserGivesData_IconInput.addEventListener('keydown', e => {
    const inputValue = e.target.value;
    const validInput = inputValue.replace(/[^A-Za-z]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        e.target.value = validInput;
    };

    if (e.key === 'Enter') {
        e.preventDefault();

        if (UserGivesData_IconInput.value != "") {
            userIcon = UserGivesData_IconInput.value;

            // store data in storage
            submittedOfflineData();

            // general stuff
            UserGivesData_PopUp_icon.style.display = "none";
            CreateOnlineProfileBtn.style.display = 'none';
            userInfoPopUp.style.display = 'flex';
            UserInfoCont.style.display = "flex";

            clickEnter_text.style.display = 'none';
            editUserProfileBtn.style.display = 'initial';
        };
    };

    if (e.which === 32) {
        e.preventDefault();
    };
});

// user closes pop up and aborts giving data
UserGivesData_closeBtn_NAME.addEventListener('click', () => { // for name
    userName = "";
    UserGivesData_NameInput.value = null;
    UserGivesData_PopUp_name.style.display = "none";
    DarkLayer.style.display = "none";
});

// for icon 
UserGivesData_closeBtn_ICON.addEventListener('click', () => {
    userIcon = "";
    UserGivesData_NameInput.value = null;
    UserGivesData_IconInput.value = null;
    UserGivesData_PopUp_icon.style.display = "none";
    DarkLayer.style.display = "none";
});

// user submits his simple offline data
function submittedOfflineData() {
    localStorage.setItem('UserName', userName);
    localStorage.setItem('UserIcon', userIcon);

    userInfoName.textContent = localStorage.getItem('UserName');

    // user uses just a skin color
    if (localStorage.getItem(`userInfoClass`) == "empty") {

        userInfoIcon.textContent = localStorage.getItem('UserIcon');
    } else { // user uses an advanced skin => do nothing
        return
    };
};

// floating element over the screen
function ItemAnimation(item, destination_position, fromMap, mapItem, fromSecondTreasure) {
    // position of treasure
    let rect
    if (!fromMap) {
        // start position lobby treasure or second lobby treasure?
        fromSecondTreasure ? rect = treasureIcon2.getBoundingClientRect() : rect = treasureIcon.getBoundingClientRect();
    } else {
        rect = mapItem.getBoundingClientRect();
    };

    let div = document.createElement('div');
    let i = document.createElement('i');

    div.classList += 'floating-item';
    i.classList += item;
    div.style.transition = "transform 350ms linear, opacity 50ms linear";
    div.style.top = rect.top + "px";
    div.style.left = rect.left + "px";
    div.style.opacity = "0"

    div.appendChild(i);
    document.body.appendChild(div);

    setTimeout(() => {
        if (item == 'fa-solid fa-gem') {
            div.style.transform = `translateX(-${rect.right - destination_position.left}px)`;
            div.style.opacity = "1";

            // save in storage and parse in html
            let Gems = parseInt(localStorage.getItem('GemsItem'));
            Gems = Gems + 2;
            localStorage.setItem('GemsItem', Gems);
            gemsIcon.textContent = Gems;

            // remove item from html so it looks better
            setTimeout(() => {
                div.remove();
            }, 350);

            gemsIcon.style.animation = "increase-item-value ease-in-out 1s";

            setTimeout(() => {
                gemsIcon.style.animation = "none";
            }, 1000);

        } else if (item == 'fa-solid fa-x') {
            div.style.transform = `translateX(-${rect.right - destination_position.left}px)`;
            div.style.opacity = "1";

            // save in storage and parse in html
            let Xi = parseInt(localStorage.getItem('ItemX'));
            Xi++;
            localStorage.setItem('ItemX', Xi);
            Xicon.textContent = Xi;

            // remove item from html so it looks better
            setTimeout(() => {
                div.remove();
            }, 350);

            Xicon.style.animation = "increase-item-value ease-in-out 1s";

            setTimeout(() => {
                Xicon.style.animation = "none";
            }, 1000);

        } else if (item == 'fa-solid fa-key') {

            div.style.transform = `translateX(-${rect.right - destination_position.left}px)`;
            div.style.opacity = "1";

            // save in storage and parse in html
            let KeyItem = parseInt(localStorage.getItem('keys'));
            KeyItem++;
            localStorage.setItem('keys', KeyItem);

            // alter opacity so it looks better
            setTimeout(() => {
                div.style.opacity = "0.5";
            }, 200);
            // remove item from html so it looks better
            setTimeout(() => {
                div.remove();
            }, 350);

            // Player gains keys
            mapKey.style.animation = "increase-item-value ease-in-out 1s";
            KEYicon.style.animation = "increase-item-value ease-in-out 1s";
            // localstorage things
            mapKeyValueDisplay.textContent = localStorage.getItem('keys');
            KEYicon.textContent = localStorage.getItem('keys');
        };
    }, 10);

    playBtn_Audio_2();
};

// click on X-btn to trade 1 x with 5 elo points
XBtn.addEventListener('click', () => {
    if (localStorage.getItem('ItemX') >= 5) {
        DarkLayer.style.display = 'block';
        tradeX_PopUp.style.display = 'flex';
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
    X = X - 5;

    localStorage.setItem('ELO', SkillPoints);
    localStorage.setItem('ItemX', X);

    GameItems();
    ElO_Points();

    DarkLayer.style.display = 'none';
    tradeX_PopUp.style.display = 'none';
});

// alert pop up
closeAlertPopUpBtn.addEventListener('click', () => {
    alertPopUp.style.display = 'none';
    settingsWindow.style.display = 'none';
    DarkLayer.style.display = 'none';
});

// when player wants to create/start a game and passes the required data
// he can choose which patterns should be allowed in the game and which not
// on: toggle button event
togglePatternBtn.forEach(el => {
    el.addEventListener('click', e => {
        switch (e.target.getAttribute("active")) {
            case "true":
                e.target.className = "fa-regular fa-square togglePatternBtn";
                e.target.setAttribute("active", "false");

                // if pattern has the same class name as the check box button attribute value (if name is the same) =>disable it
                SetPatternGrid.forEach(ele => {
                    if (ele.classList[1] == e.target.getAttribute("for-pattern")) {
                        // example: hor
                        allowedPatternsFromUser = allowedPatternsFromUser.filter(item => item !== ele.classList[1]);
                    };
                });

                // change color to grey so the disability of the pattern is more displayed to the user
                setPatternWrapper.forEach(ele => {
                    if (ele.classList[1] == e.target.getAttribute("for-pattern")) {
                        ele.style.color = "#121518";

                        Array.from(ele.children[0].children).forEach(c => {
                            c.style.color = "#121518";
                        });
                    };
                });
                break;

            case "false":
                e.target.className = "fa-regular fa-square-check togglePatternBtn";
                e.target.setAttribute("active", "true");

                // if pattern has the same class name as the check box button attribute value (if name is the same) =>disable it
                SetPatternGrid.forEach(ele => {
                    if (ele.classList[1] == e.target.getAttribute("for-pattern")) {
                        // example: hor
                        allowedPatternsFromUser.push(ele.classList[1]);
                    };
                });

                // change color to grey so the disability of the pattern is more displayed to the user
                setPatternWrapper.forEach(ele => {
                    if (ele.classList[1] == e.target.getAttribute("for-pattern")) {
                        ele.style.color = "white";

                        [...ele.children[0].children].forEach(c => {
                            c.style.color = "white";
                        });
                    };
                });
                break;
        };
    });
});

// random allowed win combinations button , toggle!
RandomAllowedWinCombinations_Btn.addEventListener('click', () => {
    switch (RandomAllowedWinCombinations_Btn.getAttribute('activated')) {
        case "true":
            RandomAllowedWinCombinations_Btn.className = "fa-regular fa-square RandomAllowedWinCombinations_Btn";
            RandomAllowedWinCombinations_Btn.setAttribute('activated', "false");

            resetUserChoosedAllowedPatterns();
            break;

        case "false":
            RandomAllowedWinCombinations_Btn.className = "fa-regular fa-square-check RandomAllowedWinCombinations_Btn";
            RandomAllowedWinCombinations_Btn.setAttribute('activated', "true");

            let allPatterns = ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
                "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2", "branch3", "branch4", "special1", "special2"
            ];

            let amountToRemove = Math.floor(Math.random() * 19);
            SetRandomAllowedWinCombinations(allowedPatternsFromUser, amountToRemove);
            break;
    };
});

// execute the random wc's
function SetRandomAllowedWinCombinations(arr, numToRemove) {
    for (let i = 0; i < numToRemove; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        arr.splice(randomIndex, 1);
    };

    // display everything to none
    setPatternWrapper.forEach(e => {
        e.style.display = 'none';
        return;
    });

    [...setPatternWrapper].map(e => {
        allowedPatternsFromUser.forEach(p => {
            if (e.classList[1] == p) {
                e.style.display = "flex";
            };
        });
    });
};