// click sound on button click event
let Allbtns = document.querySelectorAll('.btn');
let btn_sound = document.querySelector('#btn_click_1');
let btn_sound2 = document.querySelector('#btn_click_2');

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
let GameField = document.querySelector('.Game');
let GameTitle = document.querySelector('#GameTitle');
let leaveGame_btn = document.querySelector('#leave-game-btn');
let Game_Upper_Field_Icon = document.querySelector('#Game-Upper-Field-Icon');
let GameField_TimeMonitor = document.querySelector('.GameField-time-monitor');
let GameField_FieldSizeDisplay = document.querySelector('.GameField-fieldSize-display');
let GameField_BlockAmountDisplay = document.querySelector('.GameField-BlockAmount-display');
let GameField_AveragePlayTimeDisplay = document.querySelector('.GameField-AveragePlayTime-display')

let scorePlayer1 = document.querySelector('#score-player1');
let scorePlayer2 = document.querySelector('#score-player2');
let namePlayer1 = document.querySelector('#name-player1');
let namePlayer2 = document.querySelector('#name-player2');

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
    },
    2: {
        "name": "March into fire",
        "size": "10x10",
        "blocks": "100",
        "xyCellAmount": "10",
        "icon": "fa-solid fa-dragon",
        "averagePlayTime": "15 minutes",
    },
    3: {
        "name": "Tunnel of truth",
        "size": "15x15",
        "blocks": "225",
        "xyCellAmount": "15",
        "icon": "fa-solid fa-chess-knight",
        "averagePlayTime": "90 minutes",
    },
    4: {
        "name": "Long funeral",
        "size": "20x20",
        "blocks": "400",
        "xyCellAmount": "20",
        "icon": "fa-solid fa-skull",
        "averagePlayTime": "5+ hours",
    },
};

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
});

// Game Mode buttons 
gameMode_KI_card.addEventListener('click', () => {
    curr_mode = GameMode[1].opponent;
});

gameMode_TwoPlayerOnline_card.addEventListener('click', () => {
    curr_mode = GameMode[2].opponent;
});

gameMode_OneVsOne_card.addEventListener('click', () => {
    curr_mode = GameMode[3].opponent;
});

// field-cards click event
FivexFive_Field.addEventListener('click', () => {
    playBtn_Audio();
});

FifTeenxFifTeen_Field.addEventListener('click', () => {
    playBtn_Audio();
});

TenxTen_Field.addEventListener('click', () => {
    playBtn_Audio();
});

TwentyxTwentyField.addEventListener('click', () => {
    playBtn_Audio();
});

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
            initializeGame(f.target);
        });
    });
};
EnterGame();

// Leave Game
leaveGame_btn.addEventListener('click', () => {
    GameField.style.display = 'none';
    gameModeFields_Div.style.display = 'flex';

    playBtn_Audio();
});