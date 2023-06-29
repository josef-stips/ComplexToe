// click sound on button click event
let Allbtns = document.querySelectorAll('.btn');
let btn_sound = document.querySelector('#btn_click_1');
let btn_sound2 = document.querySelector('#btn_click_2');
const audio = document.querySelector("#bg_audio");

// general elements and buttons
let gameModeCards_Div = document.querySelector('.gameMode-cards');
let gameModeFields_Div = document.querySelector('.GameMode-fields');
let fieldsArea_back_btn = document.querySelector('#fields-area-back-btn');

let FivexFive_Field = document.querySelector('#FivexFive_Field');
let FifTeenxFifTeen_Field = document.querySelector('#FifTeenxFifTeen_Field');
let TenxTen_Field = document.querySelector('#TenxTen_Field');
let TwentyxTwentyField = document.querySelector('#TwentyxTwentyField');
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

let SetPlayerNamesPopUp = document.querySelector('.SetPlayerNamesPopUp');
let SetPlayerName_ConfirmButton = document.querySelector('.SetPlayerName-ConfirmButton');
let Player1_NameInput = document.querySelector('#Player1_NameInput');
let Player2_NameInput = document.querySelector('#Player2_NameInput');
let YourName_Input_KI_mode = document.querySelector('#YourName_Input_KI_mode');
let SetPlayerName_confBTN_KIMode = document.querySelector('.SetPlayerName-ConfirmButton_KI_mode');
let YourNamePopUp_KI_Mode = document.querySelector('#YourNamePopUp_KI_Mode');
let YourName_KI_ModeCloseBtn = document.querySelector('#YourName_KI_Mode-close-btn');
let SetPlayerNamesCloseBtn = document.querySelector('#SetPlayerNames-close-btn');

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

// important data
let GameMode = {
    1: {
        "opponent": "KI", // You play against a KI if your offline or you want to get better
        "icon": "fa-solid fa-robot"
    },
    2: {
        "opponent": "OnlineFriend", // Guy you send a link to so you can play with him together
        "icon": "fa-solid fa-user-group"
    },
    3: {
        "opponent": "ComputerFriend", // Guy on same computer
        "icon": "fa-solid fa-computer"
    },
};

let Fields = {
    1: {
        "name": "Quick death",
        "size": "5x5",
        "blocks": "25",
        "xyCellAmount": "5",
        "icon": "fa-solid fa-baby",
        "averagePlayTime": "15 seconds",
        "theme": ".../assets/Maps/Quick_Death.mp3",
        "theme_name": Quick_death_Theme,
    },
    2: {
        "name": "March into fire",
        "size": "10x10",
        "blocks": "100",
        "xyCellAmount": "10",
        "icon": "fa-solid fa-dragon",
        "averagePlayTime": "15 minutes",
        "theme": ".../assets/Maps/March_into_fire.mp3",
        "theme_name": March_into_fire_Theme,
    },
    3: {
        "name": "Tunnel of truth",
        "size": "15x15",
        "blocks": "225",
        "xyCellAmount": "15",
        "icon": "fa-solid fa-chess-knight",
        "averagePlayTime": "90 minutes",
        "theme": ".../assets/Maps/Tunnel_of_truth.mp3",
        "theme_name": Tunnel_of_truth_Theme,
    },
    4: {
        "name": "Long funeral",
        "size": "20x20",
        "blocks": "400",
        "xyCellAmount": "20",
        "icon": "fa-solid fa-skull",
        "averagePlayTime": "5+ hours",
        "theme": ".../assets/Maps/Long_Funeral.mp3",
        "theme_name": Long_funeral_Theme,
    },
};

let curr_field_ele; //html element
let curr_name1 = ""; // from html input field
let curr_name2 = ""; // from html input field

// Das ausgewählte Level entscheidet, wie schwer die KI sein soll und wie viele Blockaden gesetzt werden sollen 
let KI_Mode_Levels = {
    1: "Kindergarten",
    2: "Fastfood",
    3: "Death",
};
let curr_KI_Level;

// app initialization
function AppInit() {
    checkForSettings();
};
AppInit();

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
    playBtn_Audio();

    // animation
    gameModeCards_Div.style.display = 'flex';
    gameModeFields_Div.style.display = 'none';
    lobbyHeader.style.borderBottom = '3px solid';
});

// Game Mode buttons 
gameMode_KI_card.addEventListener('click', () => {
    curr_mode = GameMode[1].opponent;
    lobbyHeader.style.borderBottom = 'none';
});

gameMode_TwoPlayerOnline_card.addEventListener('click', () => {
    curr_mode = GameMode[2].opponent;
    lobbyHeader.style.borderBottom = 'none';
});

gameMode_OneVsOne_card.addEventListener('click', () => {
    curr_mode = GameMode[3].opponent;
    lobbyHeader.style.borderBottom = 'none';
});

// field-cards click event
FivexFive_Field.addEventListener('click', () => { playBtn_Audio(); });

FifTeenxFifTeen_Field.addEventListener('click', () => { playBtn_Audio(); });

TenxTen_Field.addEventListener('click', () => { playBtn_Audio(); });

TwentyxTwentyField.addEventListener('click', () => { playBtn_Audio(); });

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
        let bool = box.getAttribute('marked'); // true ? false
        localStorage.setItem(setting, bool);
    });
});

settingsCloseBtn.addEventListener('click', () => {
    settingsWindow.style.display = 'none';
    DarkLayer.style.display = 'none';

    playBtn_Audio_2();
});

headerSettBtn.addEventListener('click', () => {
    settingsWindow.style.display = 'block';
    DarkLayer.style.display = 'block';

    playBtn_Audio_2();
});

// Enter Game
function EnterGame() {
    NxN_field.forEach(field => {
        field.addEventListener('click', f => {
            if (curr_mode == GameMode[3].opponent) {

                SetPlayerNamesPopUp.style.display = 'flex';
                DarkLayer.style.display = 'block';
                Player1_NameInput.value = "";
                Player2_NameInput.value = "";

                curr_name1 = null;
                curr_name2 = null;
                curr_field_ele = f.target;
            };

            if (curr_mode == GameMode[1].opponent) {

                YourNamePopUp_KI_Mode.style.display = 'flex';
                DarkLayer.style.display = 'block';
                YourName_Input_KI_mode.value = "";

                curr_name1 = null;
                curr_name2 = null;
                curr_field_ele = f.target;
            };
        });
    });
};
EnterGame();

// Leave Game
leaveGame_btn.addEventListener('click', () => {
    GameField.style.display = 'none';
    // lobbyHeader.style.display = 'flex';
    gameModeFields_Div.style.display = 'flex';

    playBtn_Audio();
    PauseMusic();
    CreateMusicBars(audio);
});

// set player names
SetPlayerName_ConfirmButton.addEventListener('click', () => {
    // if Player1 Namefield and Player2 Namefield isn't empty etc., initialize Game
    if (Player1_NameInput.value != "" && Player2_NameInput.value != "" && Player1_NameInput.value != Player2_NameInput.value) {
        // html stuff
        SetPlayerNamesPopUp.style.display = 'none';
        DarkLayer.style.display = 'none';

        // initialize game with the right values
        let fieldIndex = curr_field_ele.getAttribute('index');
        curr_name1 = Player1_NameInput.value;
        curr_name2 = Player2_NameInput.value;

        initializeGame(curr_field_ele);

        // play theme music 
        PauseMusic();
        CreateMusicBars(Fields[fieldIndex].theme_name);

    } else {
        return
    };
});

//If you play against a bot in the KI Mode
SetPlayerName_confBTN_KIMode.addEventListener('click', () => {

    if (YourName_Input_KI_mode.value != "") {
        // html stuff
        YourNamePopUp_KI_Mode.style.display = 'none';
        DarkLayer.style.display = 'none';

        // initialize game with the right values
        let fieldIndex = curr_field_ele.getAttribute('index');
        curr_name1 = YourName_Input_KI_mode.value;
        curr_name2 = 'Bot';

        initializeGame(curr_field_ele);

        // play theme music 
        PauseMusic();
        CreateMusicBars(Fields[fieldIndex].theme_name);
    };
});

// close buttons
YourName_KI_ModeCloseBtn.addEventListener('click', () => {
    // html stuff
    YourNamePopUp_KI_Mode.style.display = 'none';
    DarkLayer.style.display = 'none';
});

SetPlayerNamesCloseBtn.addEventListener('click', () => {
    SetPlayerNamesPopUp.style.display = 'none';
    DarkLayer.style.display = 'none';
});