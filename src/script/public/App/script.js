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
let coinsSound = document.querySelector('#coinsSound');
let btn_click3 = document.querySelector('#btn_click3');
let mysticalSound = document.querySelector("#mysticalSound");
let WarTheme1 = document.querySelector("#WarTheme1");
let Shoot1 = document.querySelector("#Shoot1");

let cellGrid = document.querySelector('#cellGrid');

// general elements and buttons
let gameModeCards_Div = document.querySelector('.gameModes-cards');
let gameModeCards = document.querySelectorAll('.gameMode-card ');
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
InnerGameMode_NegativeSwitcher.style.display = "none";
InnerGameMode_PositiveSwitcher.style.display = "none";

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
let SetPatternGridLobby = document.querySelectorAll('.SetPatternGridLobby');
let setPatternWrapperLobby = document.querySelectorAll('.setPatternWrapperLobby');
let togglePatternBtnLobby = document.querySelectorAll('.togglePatternBtnLobby');
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
let lobby_third_player = document.querySelector('.Lobby_third_player');
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
let GiveUp_btn = document.querySelector('#GiveUp_btn');
let GiveUpPopUp_closeBtn = document.querySelector('.GiveUpPopUp_closeBtn');
let giveUp_No_btn = document.querySelector('.giveUp_No_btn');
let giveUp_Yes_btn = document.querySelector('.giveUp_Yes_btn');
let GiveUpPopUp = document.querySelector('.GiveUpPopUp');
let UserGivesData_PopUp_name = document.querySelectorAll('.UserGivesData_PopUp')[0];
let UserGivesData_PopUp_icon = document.querySelectorAll('.UserGivesData_PopUp')[1];
let UserGivesData_closeBtn_NAME = document.querySelector('#UserGivesData_closeBtn_NAME');
let UserGivesData_closeBtn_ICON = document.querySelector('#UserGivesData_closeBtn_ICON');
let UserGivesData_IconInput = document.querySelector('#UserGivesData_IconInput');
let UserGivesData_NameInput = document.querySelector('#UserGivesData_NameInput');
let BossIn_MapLevel_Display = document.querySelector('.BossIn_MapLevel_Display');
let exploredItem_count = document.querySelector(".exploredItem_count");
let exploreditem_wrapper = document.querySelectorAll(".exploreditem_wrapper");
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
let Lobby_PointsToWin = document.querySelector('.Lobby_PointsToWin');
let SpellAmountDisplay = document.querySelector('.SpellAmountDisplay');
let AdvantureMode_SpellDisplay = document.querySelector('.AdvantureMode_SpellDisplay');
let UseSpell_PopUp = document.querySelector('.UseSpell_PopUp');
let UseSpell_CloseBtn = document.querySelector('.UseSpell_CloseBtn');
let UseSpell_UseBtn = document.querySelector('.UseSpell_btn');
let UseSpell_Qbtn = document.querySelector('.UseSpell_questionBtn');
let settFullscreenBtn = document.querySelector('#sett-fullscreen');
let Settings_MailBtn = document.querySelector('.Settings_MailBtn');
let Settings_CreditsBtn = document.querySelector('.Settings_CreditsBtn');
let MailCloseBtn = document.querySelector('.MailCloseBtn');
let MailPopUp = document.querySelector('.MailPopUp');
let SubmitMailBtn = document.querySelector('.SubmitMailBtn');
let MailInput_Name = document.querySelector('.MailInput_Name');
let MailInput_Message = document.querySelector('.MailInput_Message');
let XPJourneyBtn = document.querySelector('.XP_JourneyBtn');
let XP_Journey = document.querySelector('.XP_Journey');
let JourneyCloseBtn = document.querySelector('.JourneyCloseBtn');
let sett_MainCardAnimation = document.querySelector('#sett-MainCardAnimation');
let sett_ShowGameDataInGame = document.querySelector('#sett-ShowGameDataInGame');
let MainCardSlideShow = document.querySelector('#MainCardSlideShow');
let MainCardsSlideCaret_Left = document.querySelector('.MainCardsSlideCaret_Left');
let MainCardsSlideCaret_Right = document.querySelector('.MainCardsSlideCaret_Right');
let JourneyInnerSideWrapper = document.querySelector('.JourneyInnerSideWrapper');
let JourneyMainInner = document.querySelector('.JourneyMainInner');
let JourneyQuestionBtn = document.querySelector('.JourneyQuestionBtn');
let bodyBGIMG = document.querySelectorAll('.bodyBGIMG');
let KEYICON_Wrapper = document.querySelector('.KEYICON_Wrapper');
let Gem_Wrapper = document.querySelector('.Gem_Wrapper');
let XICON_Wrapper = document.querySelector('.XICON_Wrapper');
let UserID_display = document.querySelector('.UserID_display');
let GetMessage_Btn = document.querySelector('.GetMessage_Btn');
let SearchUser_Btn = document.querySelector('.SearchUser_Btn');
let FriendsList_Btn = document.querySelector('.FriendsList_Btn');
let GameInfoLobby_btn = document.querySelector('.GameInfoLobby_btn');
let Lobby_GameInfo_PopUp = document.querySelector('.Lobby_GameInfo_PopUp');
let CloseBtn_LobbyInfoPopUp = document.querySelector('.CloseBtn_LobbyInfoPopUp');
let UserQuote = document.querySelector('.UserQuote');
let UserQuoteSubmitBtn = document.querySelector('.UserQuoteSubmitBtn ');
let UserLastTimeOnlineDisplay = document.querySelector('.UserLastTimeOnlineDisplay');
let SendMessage_Btn = document.querySelector('.SendMessage_Btn');
let AddFriend_Or_Friend_btn = document.querySelector('.AddFriend_Or_Friend_btn');
let FriendsListPopUp = document.querySelector('.FriendsListPopUp');
let MessagesPopUp = document.querySelector('.MessagesPopUp');
let closeFriendsList_Btn = document.querySelector(".closeFriendsList_Btn");
let closeMessages_Btn = document.querySelector(".closeMessages_Btn");
let FriendsListInnerList = document.querySelector(".FriendsListInnerList");
let Messages_InnerWrapper = document.querySelector('.Messages_InnerWrapper');
let Inbox_InnerWrapper = document.querySelector('.Inbox_InnerWrapper');
let SendMessageTo_PlayerNameDisplay = document.querySelector(".SendMessageTo_PlayerNameDisplay");
let closeSendMessage_Btn = document.querySelector('.closeSendMessage_Btn');
let SendMessagePopUp = document.querySelector('.SendMessagePopUp');
let SendMessage_textArea = document.querySelector(".SendMessage_textArea");
let SendMessageToPlayer_Btn = document.querySelector('.SendMessageToPlayer_Btn');
let AmountOfMessagesDisplay = document.querySelector('.AmountOfMessagesDisplay');
let InboxMessagesDisplay = document.querySelector('.InboxMessagesDisplay');
let NotiOnUserInfoBtn = document.querySelector(".userInfoBtn_notificationText_Display");
let GetMessageBtn_notificationText_Display = document.querySelector('.GetMessageBtn_notificationText_Display');
let DeleteFriend_PopUp = document.querySelector(".DeleteFriend_PopUp");
let DeleteFriendOption_NotYet = document.querySelector(".DeleteFriendOption_NotYet");
let DeleteFriendOption_Yes = document.querySelector(".DeleteFriendOption_Yes");
let AddFriend_OrDeleteFriend_Icon = document.querySelector(".AddFriend_OrDeleteFriend_Icon");
let ClosePopUp_DeleteFriend = document.querySelector(".ClosePopUp_DeleteFriend");
let Lobby_XPlayerNameDisplay = document.querySelectorAll(".Lobby_XPlayerNameDisplay"); // amount: 3
let Lobby_ThirdPlayer_Wrapper = document.querySelector(".Lobby_ThirdPlayer_Wrapper");
let Lobby_FirstPlayer_Wrapper = document.querySelector(".Lobby_FirstPlayer_Wrapper");
let Lobby_SecondPlayer_Wrapper = document.querySelector(".Lobby_SecondPlayer_Wrapper");
let ChooseFieldDisplay = document.querySelector(".ChooseField-display");
let CreateLevelScene = document.querySelector(".CreateLevelScene");
// create level etc. elements
let CreateLevel_helpPopUp = document.querySelector(".CreateLevel_helpPopUp");
let CreateLevel_HelpPopUpCloseBtn = document.querySelector(".CreateLevel_HelpPopUpCloseBtn");
let CreateLevel_leaveSceneBtn = document.querySelector(".CreateLevel_leaveSceneBtn");
let ShowLevelListBtn = document.querySelector(".ShowLevelListBtn");
let ShowWorkbenchBtn = document.querySelector(".ShowWorkbenchBtn");
let CreateLevel_Title = document.querySelector(".CreateLevel_Title");
let CreateLevelHelpButton = document.querySelector(".CreateLevelHelpButton");
let RedoChangeBtn = document.querySelector(".RedoChangeBtn");
let UndoChangeBtn = document.querySelector(".UndoChangeBtn");
let CreateLevel_Workbench = document.querySelector(".CreateLevel_Workbench");
let LevelMusicDisplay = document.querySelector(".LevelMusicDisplay");
let levelBackgroundColor_ColorDisplay1 = document.querySelector(".levelBackgroundColor_ColorDisplay1");
let levelBackgroundColor_HexDisplay1 = document.querySelector(".levelBackgroundColor_HexDisplay1");
let levelBackgroundColor_ColorDisplay2 = document.querySelector(".levelBackgroundColor_ColorDisplay2");
let levelBackgroundColor_HexDisplay2 = document.querySelector(".levelBackgroundColor_HexDisplay2");
let levelRequiredPointsToWinDisplay = document.querySelector(".levelRequiredPointsToWinDisplay");
let levelPlayerClockDisplay = document.querySelector(".levelPlayerClockDisplay");
let LevelIconDisplay = document.querySelector(".LevelIconDisplay");
let workbench_LevelName_Display = document.querySelector(".workbench_LevelName_Display");
let workbench_cellGrid = document.querySelector(".workbench_cellGrid");
let workbench_LevelFieldSize_Display = document.querySelector(".workbench_LevelFieldSize_Display");
let worbench_LevelStatus = document.querySelector(".worbench_LevelStatus");
let CreateLevel_LevelList = document.querySelector(".CreateLevel_LevelList");
let LevelList_list = document.querySelector(".LevelList_list");
let SaveLevelBtn = document.querySelector(".SaveLevelBtn");
let PlayLevelBtn = document.querySelector(".PlayLevelBtn");
let PlayLevelBtn_ListBtn = document.querySelector(".PlayLevelBtn_ListBtn");
let EditLevelBtn_ListBtn = document.querySelector(".EditLevelBtn_ListBtn");
let RemoveLevelBtn = document.querySelector(".RemoveLevelBtn");
let PublishLevelBtn = document.querySelector(".PublishLevelBtn");
let unpublishLevelBtn = document.querySelector(".unpublishLevelBtn");
let BGMusicSettingSelectionWrapper = document.querySelector(".BGMusicSettingSelectionWrapper");
let NotSaveLevelBtn_FromWarning = document.querySelector(".NotSaveLevelBtn");
let saveLevelBtn_FromWarning = document.querySelector(".saveLevelBtn");
let saveLevelWarning = document.querySelector(".saveLevelWarning");
let CreateLevel_4x4_AllowedPatterns = document.querySelector(".CreateLevel_4x4_AllowedPatterns");
let CreateLevel_5x5_AllowedPatterns = document.querySelector(".CreateLevel_5x5_AllowedPatterns");
let Workbench_togglePatternBtn = document.querySelectorAll(".Workbench_togglePatternBtn");
let AllowedPatternsContainer_ScrollBtn = document.querySelectorAll(".AllowedPatternsContainer_ScrollBtn");
let Credits = document.querySelector(".Credits");
let Credits_closeBtn = document.querySelector(".Credits_closeBtn");
let AddLevelBtn = document.querySelector(".AddLevelBtn");
let ReplaceText_Levellist = document.querySelector(".ReplaceText_Levellist");
let CurrentSelectedLevel_Display = document.querySelector(".CurrentSelectedLevel_Display");
let closeSaveLevelWarning = document.querySelector(".closeSaveLevelWarning");
let saveLevelWarnText = document.querySelector(".saveLevel_mainInnerWrapper");
let workbench_levelID_display = document.querySelector(".workbench_levelID_display");
let LevelList_createDateDisplay = document.querySelector(".LevelList_createDateDisplay");
let LevelList_PublishStatusDisplay = document.querySelector(".LevelList_PublishStatusDisplay");
let ChangeSetting_leftCaret_All = document.querySelectorAll(".ChangeSetting_leftCaret");
let ChangeSetting_rightCaret_All = document.querySelectorAll(".ChangeSetting_rightCaret");
let removeLevelBtnYes = document.querySelector(".removeLevelBtnYes");
let removeLevelBtnNo = document.querySelector(".removeLevelBtnNo");
let removeWarning = document.querySelector(".removeWarning");
let closeDeleteWarning = document.querySelector(".closeDeleteWarning");
let ChooseBetweenModesPopUp = document.querySelector(".ChooseBetweenModesPopUp");
let chooseModeCloseBtn = document.querySelector(".chooseModeCloseBtn");
let OfflineModeBtn = document.querySelector(".OfflineModeBtn");
let OnlineModeBtn = document.querySelector(".OnlineModeBtn");
let Lobby = document.querySelector(".Lobby");
let SearchLevelsBtn = document.querySelector(".SearchLevelsBtn");
let SearchLevelInputWrapper = document.querySelector(".SearchLevelInputWrapper");
let SearchLevelInput = document.querySelector(".SearchLevelInput");
let CloseSearchLevelsBtn = document.querySelector(".CloseSearchLevelsBtn");
let GameFieldHeaderTitleWrapper = document.querySelector(".GameFieldHeader-upperBody");
let settColorfulBGinGame = document.querySelector("#sett-ColorfulBGinGame");
// boss display in general
let boss_attckingBeam = document.querySelector(".boss_attckingBeam");
let bossLifeCounter = document.querySelector(".bossLifeCounter");
let bossBar_fill2 = document.querySelector(".bossBar_fill2");
let bossLifeBar = document.querySelector(".bossLifeBar");
let bossIMG_wrapper = document.querySelector(".bossIMG_wrapper");
let boss = document.querySelector(".boss");
let bossIMG = document.querySelector(".bossIMG");

bodyBGIMG.forEach(e => e.style.display = "none");

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

const getKeyByValue = (object, value) => { return Object.keys(object).find(key => object[key] === value) };

function getRandomIndexes(array, count) {
    const result = [];
    const arrayLength = array.length;

    if (count >= arrayLength) {
        return array.map((_, index) => index);
    };

    while (result.length < count) {
        const randomIndex = Math.floor(Math.random() * arrayLength);

        if (!result.includes(randomIndex)) {
            result.push(randomIndex);
        };
    };
    return result;
};

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
let sfxVolume = 0.02;
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
            SearchPlayerPopUp.style.display = "flex";
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
    MessagesPopUp.style.display = "flex";
};

const OpenFriendsListPopUp = async() => { // "try" to open friends list
    // try to open friendslist
    try {
        await RequestFriendsListFromDatabase();
        FriendsListPopUp.style.display = "flex";

    } catch (error) {
        alertPopUp.style.display = "flex";
        AlertText.textContent = "something went wrong. Is it your connection?";
    };
};

const OpenSearchUserPopUp = () => { // open search pop up to search for users
    SearchPlayerPopUp.style.display = "flex";
    FoundPlayer_List.textContent = "Do you even have any real friends?";
};

// player is not friend of user and user clicks on friend option button
const AddFriend_OpenPopUp = () => {
    try {
        socket.emit("SendFriendRequest", localStorage.getItem("PlayerID"), UserID_OfCurrentVisitedProfile, cb => {
            if (cb == false) {
                AlertText.textContent = `You already sended a request to ${UserName_OfCurrentVisitedProfile}! Wait for his answer.`;
                alertPopUp.style.display = "flex";
            } else if (cb == "FriendsNow") {
                AlertText.textContent = `${UserName_OfCurrentVisitedProfile} also sended you a friend request! You are friends with him now.`;
                alertPopUp.style.display = "flex";
            };
        });

    } catch (error) {
        console.log(error)
        AlertText.textContent = "Something went wrong! Is it your connection? hihihi...";
        alertPopUp.style.display = "flex";
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

// Display user id in user pop up
const DisplayUserID = () => {
    const UserID = localStorage.getItem("PlayerID");

    UserID_display.textContent = "User ID: " + UserID;
};

const ShowCardForIndex = Index => {
    Object.keys(CardsForIndex).forEach(idx => idx != Index ? CardsForIndex[idx].style.display = "none" : CardsForIndex[idx].style.display = "block");
};

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
        alertPopUp.style.display = "flex"
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
        alertPopUp.style.display = "flex";
        AlertText.textContent = "It looks like you're offline! Try to reconnect.";
        DarkLayer.style.zIndex = "93000";

        loadingScreenFunc();
    };
})();

function isBitSet(bitboard, index) {
    return (bitboard & (1 << index)) !== 0;
};

function isBitSetBIGINT(bitboard, index) {
    return (bitboard & (BigInt(1) << BigInt(index))) !== BigInt(0);
};

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
    }

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

settFullscreenBtn.addEventListener('click', () => {
    console.log(localStorage.getItem('Fullscreen'))
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

// Dark layer animation
const DarkLayerAnimation = (Display_Element, undisplay_Element) => {
    return new Promise((resolve) => {
        // animation
        DarkLayer.style.backgroundColor = 'black';
        DarkLayer.style.display = 'block';
        DarkLayer.style.transition = 'opacity 0.1s ease-in';
        DarkLayer.style.opacity = '0';

        setTimeout(() => {
            DarkLayer.style.opacity = '1';
            setTimeout(() => {
                undisplay_Element.style.display = 'none';
                Display_Element.style.display = 'flex';
            }, 100);
        }, 500);

        setTimeout(() => {
            DarkLayer.style.opacity = '0';

            resolve();

            setTimeout(() => {
                DarkLayer.style.display = 'none';
                DarkLayer.style.transition = 'none';
                DarkLayer.style.opacity = '1';
                DarkLayer.style.backgroundColor = 'rgba(0, 0, 0, 0.87)';
            }, 400);
        }, 900);
    });
};

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
                alertPopUp.style.display = "flex";

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

// check in for create level scene
const CreateLevelScene_CheckIn = () => {
    // The user should have an account to be able to create an online level
    if (!localStorage.getItem("UserName")) {
        AlertText.textContent = "Create an account to create online level";
        DarkLayer.style.display = "block";
        alertPopUp.style.display = "flex";

    } else {
        // audio
        playBtn_Audio();
        DarkLayerAnimation(CreateLevelScene, gameModeCards_Div);
    };
};

// event listener

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
    settingsWindow.style.display = 'block';
    DarkLayer.style.display = 'block';
});

// settings important buttons: mail and credits
Settings_MailBtn.addEventListener('click', () => {
    if (localStorage.getItem("UserName")) {
        MailPopUp.style.display = "flex";
        settingsWindow.style.display = "none";
        DarkLayer.style.display = "block";

        localStorage.getItem("UserName") ? MailInput_Name.value = localStorage.getItem("UserName") : MailInput_Name.value = "";
        MailInput_Message.value = "";
        MailInput_Name.focus();

    } else {
        alertPopUp.style.display = "flex"
        AlertText.textContent = "Create an user account first";
    };
});

Settings_CreditsBtn.addEventListener('click', () => {
    Credits.style.display = "flex";
});

Credits_closeBtn.addEventListener("click", () => {
    Credits.style.display = "none";
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

    UserClicksNxNDefaultSettings();

    // reset previously made changes by the user
    resetUserChoosedAllowedPatterns();

    if (curr_mode == GameMode[3].opponent) { // Computer Friend Mode
        UserClicksOfflineModeCard(target);
    };

    if (curr_mode == GameMode[1].opponent) { // KI Mode

        YourNamePopUp_KI_Mode.style.display = 'flex';
        DarkLayer.style.display = 'block';
        YourName_Input_KI_mode.value = "";
        Your_IconInput.value = "";
        // display black if skin is white
        (localStorage.getItem('userInfoColor') == "white" || localStorage.getItem('userInfoColor') == "var(--font-color)") ? Your_IconInput.style.color = "black":
            Your_IconInput.style.color = localStorage.getItem('userInfoColor');
        // other important data
        curr_name1 = null;
        curr_name2 = null;
        curr_field_ele = target;

        // default data
        if (localStorage.getItem('UserName')) {
            YourName_Input_KI_mode.value = localStorage.getItem('UserName');
            // display black if skin is white
            (localStorage.getItem('userInfoColor') == "white" || localStorage.getItem('userInfoColor') == "var(--font-color)") ? Your_IconInput.style.color = "black":
                Your_IconInput.style.color = localStorage.getItem('userInfoColor');
        };
    };

    if (curr_mode == GameMode[2].opponent) { // Online Game mode

        console.log(target, target.getAttribute("field"))

        if (target.getAttribute('field') == "25x25" && localStorage.getItem('onlineMatches-won') >= 5 ||
            target.getAttribute('field') == "30x30" && localStorage.getItem('onlineMatches-won') >= 10 ||
            target.getAttribute('field') == "40x40" && localStorage.getItem('onlineMatches-won') >= 30 ||
            target.getAttribute('field') == "20x20" || target.getAttribute('field') == "15x15" || target.getAttribute('field') == "10x10" ||
            target.getAttribute('field') == "5x5" && localStorage.getItem('onlineMatches-won') >= -1) {

            curr_field_ele = target;

            InitGameDataForPopUp();
        };
    };
};

const InitGameDataForPopUp = (DisplayIniPopUp) => {
    // Initialize Inputs from pop up
    DarkLayer.style.display = 'block';
    (DisplayIniPopUp == undefined) ? OnlineGame_iniPopUp.style.display = 'flex': SetPlayerNamesPopUp.style.display = 'flex';
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

const UserClicksNxNDefaultSettings = (readonly) => {
    Player1_IconInput.style.color = 'black';
    Player1_IconInput.style.display = "block";

    // warn text for online game mode
    OnlineGame_NameWarnText[0].style.display = 'none';
    OnlineGame_NameWarnText[1].style.display = 'none';
    BlockerCombat_OnlineGameWarnText.style.display = "none";

    // for skins in online mode
    SkinInputDisplay.style.display = 'none';

    if (readonly) {
        SetAllowedPatternsWrapper.style.display = 'none';
        // SetGameModeList.style.display = 'none';
        // SetGameData_Label[2].style.display = "none";
        // document.querySelector(`[for="Player1_IconInput"]`).style.display = "none";
        document.querySelector(`[for="Player1_ClockInput"]`).style.display = "none";
        document.querySelector(".SetGameData_Label").style.display = "none";
        // document.querySelector(".SetPlayerNames-IconInput").style.marginTop = "2em";
        document.querySelector(".SetPlayerNames-InputArea").style.gap = "1.3em";
        UserSetPointsToWinGameInput.style.display = "none";
        SetClockList.style.display = 'none';

    } else if (readonly == undefined) {
        SetAllowedPatternsWrapper.style.display = 'flex';
        SetGameModeList.style.display = 'flex';
        SetGameData_Label[2].style.display = "block";
        document.querySelector(`[for="Player1_IconInput"]`).style.display = "block";
        document.querySelector(`[for="Player1_ClockInput"]`).style.display = "block";
        document.querySelector(".SetGameData_Label").style.display = "block";
        document.querySelector(".SetPlayerNames-IconInput").style.marginTop = "0";
        document.querySelector(".SetPlayerNames-InputArea").style.gap = "0.9em";
        UserSetPointsToWinGameInput.style.display = "block";
        SetClockList.style.display = 'flex';
    };
};

const UserClicksOfflineModeCard = (target) => {
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

// When the user unlocks a specific field, the click event for this field needs to be unlocked
function Click_single_NxN(e) {
    SetClockList.style.display = 'flex';
    SetGameModeList.style.display = 'flex';
    Player1_IconInput.style.color = 'black'; // idk if this line is nessecary

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
function UserCreateRoom(readOnlyLevel, Data1, Data2, UserName, thirdplayerRequired, PointsToWinGame, patterns) {
    let Check = SetGameData_CheckConfirm();

    // console.log(NewCreativeLevel.Settings["playertimer"][NewCreativeLevel.selectedLevel[3]]);

    // if Player1 Namefield and Player2 Namefield isn't empty etc., initialize Game
    if (Player1_NameInput.value != "" &&
        Player1_IconInput.value != "" &&
        Check[0] == true && Check[1] == true && !PlayingInCreatedLevel || PlayingInCreatedLevel &&
        Player1_NameInput.value != "" && Player1_IconInput.value != "" && Check[1] == true && NewCreativeLevel.Settings["playertimer"][NewCreativeLevel.selectedLevel[3]]) {
        // server
        let fieldIndex = curr_field_ele.getAttribute('index');
        let fieldTitle = curr_field_ele.getAttribute('title');

        let xyCell_Amount = Fields[fieldIndex].xyCellAmount;

        if (localStorage.getItem('userInfoClass') == "empty") { // user doesn't use an advanced skin => everything's normal
            curr_form1 = Player1_IconInput.value.toUpperCase();

        } else { // user uses an advanced skin => change things
            curr_form1 = "fontawesome"; // later it will check if it has this value and do the required things
        };

        // set data: either extern data or intern data
        if (Data1) Check[2] = Data1;
        if (Data2) Check[3] = Data2;
        if (UserName) Player1_NameInput.value = UserName;
        if (thirdplayerRequired) thirdPlayer_required = thirdplayerRequired;
        if (PointsToWinGame) UserSetPointsToWinGameInput.value = PointsToWinGame;
        if (patterns) allowedPatternsFromUser = patterns;
        if (PlayingInCreatedLevel) Check[2] = NewCreativeLevel.Settings["playertimer"][NewCreativeLevel.selectedLevel[3]];

        console.log(UserSetPointsToWinGameInput.value, PointsToWinGame)

        // GameData: Sends PlayerClock, InnerGameMode and xyCellAmount ; PlayerData: sends player name and icon => requests room id 
        socket.emit('create_room', [Check[2], Check[3], xyCell_Amount, Player1_NameInput.value, curr_form1, fieldIndex, fieldTitle, localStorage.getItem('userInfoClass'),
            localStorage.getItem('userInfoColor'), thirdPlayer_required, UserSetPointsToWinGameInput.value, allowedPatternsFromUser
        ], message => {
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
        Lobby_PointsToWin.contentEditable = "true";

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
        Lobby_PointsToWin.textContent = UserSetPointsToWinGameInput.value;

        // initialize allowed patterns in lobby for the creator: admin
        setPatternWrapperLobby.forEach(ele => {
            ele.style.color = "#121518";

            Array.from(ele.children[0].children).forEach(c => {
                c.style.color = "#121518";
            });

            ele.children[1].setAttribute("active", "false");
            ele.children[1].className = "fa-regular fa-square togglePatternBtnLobby";
        });

        allowedPatternsFromUser.forEach(p => {
            setPatternWrapperLobby.forEach(el => {
                if (el.classList[0] == p) {
                    el.style.color = "white";

                    el.children[1].setAttribute("active", "true");
                    el.children[1].className = "fa-regular fa-square-check togglePatternBtnLobby";

                    Array.from(el.children[0].children).forEach(c => {
                        c.style.color = "white";
                    });
                };
            });
        });

        // admin and no player is allowed to change the data from the level
        if (readOnlyLevel) {
            SwitchCaret.forEach(caret => {
                caret.style.display = 'none';
            });
            togglePatternBtnLobby.forEach(el => el.style.display = "none");
            Lobby_PointsToWin.contentEditable = false;
        };

    } else {
        return;
    };
};

// set player data confirm button
SetPlayerName_ConfirmButton.addEventListener('click', () => {
    SetPlayerData_ConfirmEvent();
});

// user tries to ENTER a game in online mode
const UserTriesToEnterOnlineGame = () => {
    // If user entered his name and which form he wants to use in the game
    if (Player1_IconInput.value != "" && Player1_NameInput.value != "" && personal_GameData.role == "user" ||
        // or second condition: user joins as blocker so he only needs to pass his name
        Player1_NameInput.value != "" && personal_GameData.role == "blocker") {
        console.log(personal_GameData.role)

        socket.emit('CONFIRM_enter_room', [personal_GameData.currGameID, Player1_NameInput.value.trim(), Player1_IconInput.value.trim(),
            localStorage.getItem('userInfoClass'), localStorage.getItem('userInfoColor'), personal_GameData.role
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

            // user can finally enters the online game lobby
            if (m != 'Choose a different name!' && m != 'Choose a different icon!') {
                UserEntersOnlineGame(m);
            };
        });
    };
};

// User enters online game
const UserEntersOnlineGame = (m) => {
    // initialize game with the right values
    curr_name1 = Player1_NameInput.value;
    curr_form1 = Player1_IconInput.value.toUpperCase();

    // set name of first player
    Lobby_XPlayerNameDisplay[1].textContent = `${m[1]}`;

    // m[2] icon of first player
    // This code block is just so the second player who joins the lobby sees the icon of the first player in the right way
    if (m[2] == "fontawesome") {
        // remove previous advanced icon if there was one
        if (document.querySelector('.Temporary_IconSpan1')) document.querySelector('.Temporary_IconSpan1').remove();

        // reset text of first player icon if there was one
        Lobby_first_player.textContent = null;

        // admin uses an advanced skin => create span element which displays advanced icon. You can just delete this icon later (like in the else code below)
        let span = document.createElement('span');
        span.className = m[5]; // example: "fa-solid fa-chess-rook"
        span.classList.add("Temporary_IconSpan1");
        Lobby_first_player.style.color = "white";

        Lobby_first_player.appendChild(span);

    } else { // admin uses a normal or color skin, everything's alright
        Lobby_first_player.textContent = `${m[2].toUpperCase()}`; // set icon of first player
        Lobby_first_player.style.color = m[6]; // color of first player's skin

        // remove advanced icon if there was one
        if (document.querySelector('.Temporary_IconSpan1')) document.querySelector('.Temporary_IconSpan1').remove();
    };

    // bug fixes
    OnlineGame_NameWarnText[0].style.display = 'none';
    OnlineGame_NameWarnText[0].style.display = 'none';

    // general stuff
    OnlineGame_Lobby.style.display = 'flex';
    SetPlayerNamesPopUp.style.display = 'none';
};

// user tries to start the game
function SetPlayerData_ConfirmEvent() {
    if (curr_mode == GameMode[2].opponent) { // online mode
        // if user wants to enter an online game
        if (personal_GameData.EnterOnlineGame) {
            console.log(personal_GameData.EnterOnlineGame)
            UserTriesToEnterOnlineGame();

        } else { // user wants to create an online game
            if (PlayingInCreatedLevel) {
                UserCreateRoom(true);
            } else {
                UserCreateRoom();
            };
        };

    } else { // computer mode

        let Check = SetGameData_CheckConfirm();

        // check if this is user created level
        if (PlayingInCreatedLevel) {
            Check[0] = true;
            Check[2] = NewCreativeLevel.Settings.playertimer[NewCreativeLevel.selectedLevel[3]];
            UserSetPointsToWinGameInput.value = NewCreativeLevel.selectedLevel[2];
            allowedPatternsFromUser = NewCreativeLevel.selectedLevel[6];
        };

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
            if (PlayingInCreatedLevel) {
                if (NewCreativeLevel.selectedLevel[5] != 0) {
                    CreateMusicBars(document.querySelector(`[src="${NewCreativeLevel.Settings["bgmusic"][NewCreativeLevel.selectedLevel[5]]}"]`));
                };
            } else {
                CreateMusicBars(Fields[fieldIndex].theme_name);
            };

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
        if (PlayingInCreatedLevel) {
            HowToWinText.textContent = `Get ${NewCreativeLevel.selectedLevel[2]} points or score more points than your opponent if he gives up.`;

        } else {
            HowToWinText.textContent = `Get ${Lobby_PointsToWin.textContent} points or score more points than your opponent if he gives up.`;
        };

    } else { // in advanture mode
        // display for 5x5 fields and higher
        PatternGridThree.forEach(pattern => pattern.style.display = 'none');
        PatternGridFor.forEach(pattern => pattern.style.display = 'none');
        PatternGridFive.forEach(pattern => pattern.style.display = 'none');

        let unlocked_mapLevels = JSON.parse(localStorage.getItem('unlocked_mapLevels'));
        let allowed_patterns = unlocked_mapLevels[current_selected_level][6]; // array
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
        BlockerCombat_OnlineGameWarnText.style.display = "none";

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
            try {
                animatedPopMain.querySelector('.newText').textContent = level_text[1];
                ContBtnCount++;
            } catch (error) {
                console.log(error);
            };

        } else if (ContBtnCount == 1) {
            animatedPopMain.querySelector('.newText').textContent = "Click on the help button in the top left corner to see more information.";
            ContBtnCount++;

        } else if (ContBtnCount == 2) {
            animatedPopMain.querySelectorAll("h2")[0].style.display = "none";
            animatedPopMain.querySelectorAll("h2")[1].style.display = "none";
            animatedPopMain.querySelector('.newText').remove();
            ContBtnCount = 0;

            // Check if player unlocked one of these fields
            locked_25x25();
            locked_30x30();
            locked_40x40();

            // fade out animation to epic dialog
            animatedPopUp.style.opacity = "0";
            document.querySelector(".DialogEye").style.opacity = "0";

            setTimeout(() => {
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
                }, 200);
            }, 500);
        };
    };
});

// user wants to open his own user pop-up
const OpenOwnUserProfile = () => {
    OpenedPopUp_WhereAlertPopUpNeeded = true;

    DarkLayer.style.display = 'block';
    userInfoPopUp.style.display = 'flex';
    userInfoOnlineMatchesWon.textContent = JSON.parse(localStorage.getItem('onlineMatches-won'));

    if (localStorage.getItem('UserIcon') != null) {
        editUserProfileBtn.style.display = 'initial';
    } else {
        editUserProfileBtn.style.display = 'none';
    };

    if (localStorage.getItem('UserName')) { // user has account
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

        // Try to send data to the server
        try {
            socket.emit("SaveAllData", localStorage.getItem('UserName'), localStorage.getItem('UserIcon'),
                localStorage.getItem('userInfoClass'), localStorage.getItem('userInfoColor'), localStorage.getItem('UserQuote'),
                JSON.parse(localStorage.getItem('onlineMatches-won')), localStorage.getItem('ELO'),
                localStorage.getItem('current_used_skin'), localStorage.getItem("PlayerID"));

        } catch (error) {
            console.log(error);
        };

    } else { // user has not an account
        userInfoName.textContent = "";
        userInfoIcon.textContent = "";

        CreateOnlineProfileBtn.style.display = 'block';
        UserInfoCont.style.display = 'none';
    };
};

headerUserBtn.addEventListener('click', () => {
    OpenOwnUserProfile();
});

// close user pop up of other player
const CloseUserPopUpOfOtherPlayer = () => {
    OpenedPopUp_WhereAlertPopUpNeeded = false;
    UserIsOnProfileFromOtherPlayer = false;
    userInfoPopUp.style.zIndex = "10001";

    UserID_OfCurrentVisitedProfile = undefined;
    UserName_OfCurrentVisitedProfile = undefined;

    editUserProfileBtn.style.display = "initial";
    UserQuoteSubmitBtn.style.display = "block";
    FriendsList_Btn.style.display = "flex";
    SearchUser_Btn.style.display = "flex";
    GetMessage_Btn.style.display = "flex";
    (!running) ? DarkLayer.style.display = "block": DarkLayer.style.display = "none";

    UserLastTimeOnlineDisplay.style.display = "none";
    SendMessage_Btn.style.display = "none";
    AddFriend_Or_Friend_btn.style.display = "none";

    userInfoName.textContent = localStorage.getItem("UserName");
    UserID_display.textContent = "User ID: " + localStorage.getItem("PlayerID");
    if (localStorage.getItem("UserQuote")) UserQuote.textContent = localStorage.getItem("UserQuote");
    userInfoOnlineMatchesWon.textContent = localStorage.getItem("onlineMatches-won");
    userInfoSkillpoints.textContent = localStorage.getItem("ELO");

    if (localStorage.getItem("userInfoClass") == "empty") { // user has standard skin
        userInfoIcon.classList = "userInfo-Icon userInfoEditable";
        userInfoIcon.textContent = localStorage.getItem("UserIcon");
        userInfoIcon.style.color = localStorage.getItem("UserInfoColor");

    } else { // user has advanced skin
        userInfoIcon.classList = "userInfo-Icon userInfoEditable " + localStorage.getItem("userInfoClass");
        userInfoIcon.textContent = null;
        userInfoIcon.style.color = "var(--font-color)";
    };

    // if user is in lobby or in online game
    if (personal_GameData.currGameID != null || running) {
        userInfoPopUp.style.display = "none";
    };
};

// try to close user info pop up through event clicks f.ex
const TryToCloseUserInfoPopUp = () => {
    OpenedPopUp_WhereAlertPopUpNeeded = false;

    if (!UserIsOnProfileFromOtherPlayer) { // user was on his own profile
        if (userInfoName.textContent != "" && userInfoIcon.textContent !== "" || userInfoName.textContent != "" && localStorage.getItem('UserIcon') != "" ||
            localStorage.getItem('UserIcon') == null) {

            if (!UserIsOnProfileFromOtherPlayer && personal_GameData.currGameID == null || running) { DarkLayer.style.display = 'none' } else if (personal_GameData.currGameID != null) {
                DarkLayer.style.display = "block";
            };
            if (!UserIsOnProfileFromOtherPlayer) userInfoPopUp.style.display = 'none';

            if (userInfoIcon.textContent !== "") {
                localStorage.setItem('UserIcon', userInfoIcon.textContent);
            };

            if (localStorage.getItem('UserIcon') != null) {
                localStorage.setItem('UserName', userInfoName.textContent);
            };

            UserQuote.contentEditable = "false";
            UserEditsQuote = false;
            UserQuoteSubmitBtn.textContent = "Edit";
            (localStorage.getItem("UserQuote")) ? UserQuoteSubmitBtn.textContent = "Edit": UserQuoteSubmitBtn.textContent = "Create a quote";
            (localStorage.getItem("UserQuote")) ? UserQuote.innerHTML = localStorage.getItem("UserQuote"): UserQuoteSubmitBtn.textContent = "Create a quote";
        };

        // if player visited profile from other player
    } else if (UserIsOnProfileFromOtherPlayer) {
        CloseUserPopUpOfOtherPlayer();
    };
};

userInfoCloseBtn.addEventListener('click', () => {
    TryToCloseUserInfoPopUp();
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

            // User gets access to online social activities
            GetMessage_Btn.style.color = "white";
            GetMessage_Btn.style.borderColor = "white";
            FriendsList_Btn.style.color = "white";
            FriendsList_Btn.style.borderColor = "white";
            SearchUser_Btn.style.color = "white";
            SearchUser_Btn.style.borderColor = "white";

            GetMessage_Btn.addEventListener('click', OpenGetMessagesPopUp);
            FriendsList_Btn.addEventListener('click', OpenFriendsListPopUp);
            SearchUser_Btn.addEventListener('click', OpenSearchUserPopUp);
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
});

// for icon 
UserGivesData_closeBtn_ICON.addEventListener('click', () => {
    userIcon = "";
    UserGivesData_NameInput.value = null;
    UserGivesData_IconInput.value = null;
    UserGivesData_PopUp_icon.style.display = "none";
});

// user submits his simple offline data
function submittedOfflineData() {
    localStorage.setItem('UserName', userName);
    localStorage.setItem('UserIcon', userIcon);

    try {
        // send name to server, server sends it to database, store in database
        socket.emit("sendNameToDatabase", localStorage.getItem('PlayerID'), localStorage.getItem('UserName'), localStorage.getItem("UserIcon"),
            localStorage.getItem('userInfoClass'), localStorage.getItem("userInfoColor"));
    } catch (error) {
        console.error(error);
    };

    userInfoName.textContent = localStorage.getItem('UserName');
    UserID_display.textContent = "User ID: " + localStorage.getItem("PlayerID");

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
            if (fromSecondTreasure) {
                div.style.transform = `translateX(-${rect.right - destination_position.left}px)`;
            } else {
                div.style.transform = `translate(calc(-${(rect.right - destination_position.right)}px + 100%), -${rect.top - destination_position.top}px)`;
            };
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
    if (localStorage.getItem('ItemX') >= 1) {
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
    if (!XPJourneyMapOpen && UserID_OfCurrentVisitedProfile == undefined && !OpenedPopUp_WhereAlertPopUpNeeded) {
        DarkLayer.style.display = 'none';
    };
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
                        let alreadyExists = false;
                        for (const i of allowedPatternsFromUser) {
                            if (i == ele.classList[1]) {
                                alreadyExists = true;
                                break;
                            };
                        };
                        if (!alreadyExists) {
                            allowedPatternsFromUser.push(ele.classList[1]);
                        };
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

// for allowed patterns in lobby
togglePatternBtnLobby.forEach(btn => {
    btn.addEventListener('click', e => {
        switch (e.target.getAttribute("active")) {
            case "true":
                e.target.className = "fa-regular fa-square togglePatternBtnLobby";
                e.target.setAttribute("active", "false");

                // if pattern has the same class name as the check box button attribute value (if name is the same) =>disable it
                SetPatternGridLobby.forEach(ele => {
                    if (ele.classList[0] == e.target.getAttribute("for-pattern")) {
                        // example: hor
                        allowedPatternsFromUser = allowedPatternsFromUser.filter(item => item !== ele.classList[0]);

                        // update for all users
                        socket.emit("Admin_AlterAllowedPatterns", personal_GameData.currGameID, allowedPatternsFromUser);
                    };
                });

                // change color to grey so the disability of the pattern is more displayed to the user
                setPatternWrapperLobby.forEach(ele => {
                    if (ele.classList[0] == e.target.getAttribute("for-pattern")) {
                        ele.style.color = "#121518";

                        Array.from(ele.children[0].children).forEach(c => {
                            c.style.color = "#121518";
                        });
                    };
                });

                break;

            case "false":
                e.target.className = "fa-regular fa-square-check togglePatternBtnLobby";
                e.target.setAttribute("active", "true");

                // if pattern has the same class name as the check box button attribute value (if name is the same) =>disable it
                SetPatternGridLobby.forEach(ele => {
                    if (ele.classList[0] == e.target.getAttribute("for-pattern")) {
                        // example: hor
                        let alreadyExists = false;
                        for (const i of allowedPatternsFromUser) {
                            if (i == ele.classList[0]) {
                                alreadyExists = true;
                                break;
                            };
                        };
                        if (!alreadyExists) {
                            allowedPatternsFromUser.push(ele.classList[0]);

                            // update for all users
                            socket.emit("Admin_AlterAllowedPatterns", personal_GameData.currGameID, allowedPatternsFromUser);
                        };
                    };
                });

                // change color to grey so the disability of the pattern is more displayed to the user
                setPatternWrapperLobby.forEach(ele => {
                    if (ele.classList[0] == e.target.getAttribute("for-pattern")) {
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

// when the admin alters the availible win patterns in the lobby all player need to be informed by that and the data needs to be updated
socket.on("Updated_AllowedPatterns", patternsArray => {
    allowedPatternsFromUser = patternsArray;

    // blur all patterns
    setPatternWrapperLobby.forEach(ele => {
        ele.style.color = "#121518";

        Array.from(ele.children[0].children).forEach(c => {
            c.style.color = "#121518";
        });

        // mark checkbox
        ele.children[1].setAttribute("active", "false");
        ele.children[1].className = "fa-regular fa-square togglePatternBtnLobby";
    });

    // make availible patterns white
    allowedPatternsFromUser.forEach(p => {
        setPatternWrapperLobby.forEach(el => {
            if (el.classList[0] == p) {
                el.style.color = "white";

                Array.from(el.children[0].children).forEach(c => {
                    c.style.color = "white";
                });

                // mark checkbox
                el.children[1].setAttribute("active", "true");
                el.children[1].className = "fa-regular fa-square-check togglePatternBtnLobby";
            };
        });
    });
});

GameInfoLobby_btn.addEventListener('click', () => {
    Lobby_GameInfo_PopUp.style.display = "flex";
})

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

// Mail
MailCloseBtn.addEventListener('click', () => {
    DarkLayer.style.display = "none";
    MailPopUp.style.display = "none";
});

MailInput_Message.addEventListener('mousedown', function(event) {
    event.preventDefault(); // Verhindert die Auswahl beim Klicken
});

MailInput_Name.addEventListener('mousedown', function(event) {
    event.preventDefault(); // Verhindert die Auswahl beim Klicken
});

MailInput_Message.addEventListener('click', function(event) {
    MailInput_Message.focus();
});

MailInput_Name.addEventListener('click', function(event) {
    MailInput_Name.focus();
});

MailInput_Message.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp") {
        MailInput_Name.focus();
    };
});

MailInput_Name.addEventListener('keydown', (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter") {
        MailInput_Message.focus();
    };
});

SubmitMailBtn.addEventListener('click', (e) => {
    // DarkLayer.style.display = "none";
    e.preventDefault();

    if (MailInput_Name.value.trim() != "" && MailInput_Message.value.trim() != "") {
        SendMail(localStorage.getItem("UserName"), localStorage.getItem("PlayerID"), MailInput_Name.value, MailInput_Message.value);

    };
});

//Sends Mail to developer
async function SendMail(PlayerName, PlayerID, mailName, message) {
    // let email = document.getElementById('email').value; //display = none;
    // let subject = document.getElementById('subject').value; //display = none;
    let body = `name - ${PlayerName}, mail name - ${mailName}, id - ${PlayerID}<br/>
        message:<br/>${message}`;

    await Email.send({
            SecureToken: "50ae5256-e4e9-4700-b42b-fafc3cd150ec",
            To: 'josef.stips@sgw-schule.de',
            From: 'josefstips@gmx.de',
            Subject: 'Sended from User',
            Body: body
        })
        .then();

    alertPopUp.style.display = "flex"
    AlertText.textContent = "Email was successfully send to the developer. (He will probably never read it)";
    MailPopUp.style.display = "none";
};

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
            alertPopUp.style.display = "flex"
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
});