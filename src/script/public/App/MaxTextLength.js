let input2 = document.querySelector('#YourName_Input_KI_mode');
let input3 = document.querySelector('.EnterGameCode_Input');
let icon_input1 = document.querySelector('#Player1_IconInput');
let icon_input2 = document.querySelector('#Player2_IconInput');
let icon_input3 = document.querySelector('#Your_IconInput');
let userInfoEditable1 = document.querySelectorAll('.userInfoEditable')[0];
let userInfoEditable2 = document.querySelector('#userInfoIcon');

let settings = {
    maxInputLeng: 11,
    maxFormInputLeng: 1,
    maxInputLeng2: 6,
    maxTextLength: 60,
    maxBigTextLength: 200
};

let keys = {
    'backspace': 8,
    'shift': 16,
    'ctrl': 17,
    'alt': 18,
    'delete': 46,
    // 'cmd':
    'leftArrow': 37,
    'upArrow': 38,
    'rightArrow': 39,
    'downArrow': 40,
};

let utils = {
    special: {},
    navigational: {},
    isSpecial(e) {
        return typeof this.special[e.keyCode] !== 'undefined';
    },
    isNavigational(e) {
        return typeof this.navigational[e.keyCode] !== 'undefined';
    },
};

utils.special[keys['backspace']] = true;
utils.special[keys['shift']] = true;
utils.special[keys['ctrl']] = true;
utils.special[keys['alt']] = true;
utils.special[keys['delete']] = true;

utils.navigational[keys['upArrow']] = true;
utils.navigational[keys['downArrow']] = true;
utils.navigational[keys['leftArrow']] = true;
utils.navigational[keys['rightArrow']] = true;

Player1_NameInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        Player2_NameInput.focus();
        if (curr_mode == 'OnlineFriend') {
            Player1_IconInput.focus();
        };
    };
});

Player2_NameInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        Player1_IconInput.focus();
    };
});

Player1_IconInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        Player2_IconInput.focus();
        if (curr_mode == 'OnlineFriend' && personal_GameData.EnterOnlineGame) {
            EnterCodeName();
        } else if (curr_mode == 'OnlineFriend' && !personal_GameData.EnterOnlineGame) {
            SetPlayerData_ConfirmEvent();
        };
    };
});

Player2_IconInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        SetPlayerData_ConfirmEvent();
    };
});

SendMessage_textArea.addEventListener('keydown', event => {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxBigTextLength && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

SearchBar_placeholderText.addEventListener('keydown', event => {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

SearchLevelInput.addEventListener("keydown", (e) => {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= 25 && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

Player1_NameInput.addEventListener('keydown', function(event) {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

ChatMessage.addEventListener('keydown', function(event) {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= 60 && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

Player2_NameInput.addEventListener('keydown', function(event) {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

input2.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        icon_input3.focus();
    };
});

icon_input3.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        CreateGame_KIMode();
    };
});

input2.addEventListener('keydown', function(event) {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

input3.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        EnterCodeName();
    };
});

input3.addEventListener('keydown', function(event) {
    if (event.code === "Space") {
        event.preventDefault();
        return;
    };

    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxInputLeng2 && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

MapLevel_NameInput.addEventListener('keydown', function(event) {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

UserGivesData_NameInput.addEventListener('keydown', function(event) {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

icon_input1.addEventListener('keydown', function(event) {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxFormInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

icon_input2.addEventListener('keydown', function(event) {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxFormInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

icon_input3.addEventListener('keydown', function(event) {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxFormInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

MapLevel_IconInput.addEventListener('keydown', function(event) {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxFormInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

UserGivesData_IconInput.addEventListener('keydown', function(event) {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxFormInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

userInfoEditable1.addEventListener('keydown', (event) => {
    let len = event.target.textContent.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

userInfoEditable2.addEventListener('keydown', (event) => {
    let len = event.target.textContent.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxFormInputLeng && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

Lobby_PointsToWin.addEventListener('keydown', (event) => {
    let len = event.target.textContent.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= 3 && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

UserSetPointsToWinGameInput.addEventListener('keydown', (event) => {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= 3 && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

wheel_bet_input.addEventListener('keydown', (event) => {
    let len = event.target.value.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= 5 && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

Player1_NameInput.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^A-Za-z]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    }
});

Player2_NameInput.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^A-Za-z]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    };
});

Player1_IconInput.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^A-Za-z]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    }
});

Player2_IconInput.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^A-Za-z]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    }
});

YourName_Input_KI_mode.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^A-Za-z]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    }
});

Your_IconInput.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^A-Za-z]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    }
});

wheel_bet_input.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^0-9]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    };
});

UserGivesData_NameInput.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^A-Za-z0-9]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben und Zahlen

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    };
});

UserGivesData_IconInput.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^A-Za-z0-9]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    }
});

Lobby_PointsToWin.addEventListener("input", function(event) {
    const inputValue = event.target.textContent;
    const validInput = inputValue.replace(/[^0-9]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.textContent = validInput;
    };
});

UserSetPointsToWinGameInput.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^0-9]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    };
});

levelRequiredPointsToWinDisplay.addEventListener("input", (event) => {
    const inputValue = event.target.textContent;
    const validInput = inputValue.replace(/[^0-9]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.textContent = validInput.trim();
    };
});

levelRequiredPointsToWinDisplay.addEventListener('keydown', (event) => {
    let len = event.target.textContent.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= 3 && !hasSelection || event.key === "Enter" || event.key === "spacebar") {
        event.preventDefault();
        return false;
    };
});

workbench_LevelName_Display.addEventListener("input", (event) => {
    const inputValue = event.target.textContent;
    const validInput = inputValue.replace(/[^A-Za-z\s]/g, "");

    if (inputValue !== validInput) {
        event.target.textContent = validInput;

        try {
            const selection = window.getSelection();
            const range = document.createRange();
            range.setStart(workbench_LevelName_Display.firstChild, event.target.firstChild.length);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        } catch (error) {

        };
    };
});

workbench_LevelName_Display.addEventListener('keydown', (event) => {
    let len = event.target.textContent.length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= 25 && !hasSelection || event.key === "Enter") {
        event.preventDefault();
        return false;
    };
});

// bug fix
levelRequiredPointsToWinDisplay.addEventListener("keydown", (event) => {
    let len = event.target.textContent.trim().length;
    if (len === 1 && event.key == "Backspace" || len === 1 && event.key == "Delete") {
        event.preventDefault();
        return false;
    };
});

input3.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    const validInput = inputValue.replace(/[^0-9]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        event.target.value = validInput;
    };
});

// about user quote
UserQuote.addEventListener('keydown', (event) => {
    let len = event.target.textContent.trim().length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= settings.maxTextLength && !hasSelection) {
        event.preventDefault();
        return false;
    };
});

[createCostumField_xInput, createCostumField_yInput].forEach(input => {

    input.addEventListener('keydown', function(event) {

        // navigation with keys
        if (input == createCostumField_xInput) {
            if (event.key == "Enter" || event.key == "ArrowRight") {
                createCostumField_yInput.focus();
            };

        } else if (input == createCostumField_yInput) {
            if (event.key == "Enter" || event.key == "ArrowLeft") {
                createCostumField_xInput.focus();
            };
        };

        // prevention of unallowed keys
        if (!isNumericKey(event.key) && !isAllowedKey(event.key)) {
            event.preventDefault();

        } else if (isLengthExceeded(input) && !isAllowedKey(event.key)) {
            event.preventDefault();

        } else { // everything's right
            // generateField_preview(parseInt(createCostumField_xInput.textContent), parseInt(createCostumField_yInput.textContent));
        };
    });

    input.addEventListener('keyup', function(event) {
        // check difference between the two dimensions x and y
        let x = parseInt(createCostumField_xInput.textContent);
        let y = parseInt(createCostumField_yInput.textContent);

        if (parseInt(input.textContent) > 30) {
            input.textContent = "30";
        };

        if (!isAllowedKey(event.key) && isNumericKey(event.key)) {
            generateField_preview(parseInt(createCostumField_xInput.textContent), parseInt(createCostumField_yInput.textContent), createCostumField_Field);
        };
    });

    // Eventlistener for focus loss
    input.addEventListener('blur', function() {
        // check difference between the two dimensions x and y
        let x = parseInt(createCostumField_xInput.textContent);
        let y = parseInt(createCostumField_yInput.textContent);

        // true: difference is too high. false: it is okay
        let difference = (y / x) > (1.5) ? true : false;

        console.log((y / x));

        // other
        const number = parseInt(input.textContent.trim());

        if (input.textContent.trim() === '' && number > 30) {
            input.textContent = '5';

            generateField_preview(parseInt(createCostumField_xInput.textContent), parseInt(createCostumField_yInput.textContent), createCostumField_Field);

        } else {
            if (isNaN(number) || number > 30 || number <= 0) {
                input.textContent = '5';

                generateField_preview(parseInt(createCostumField_xInput.textContent), parseInt(createCostumField_yInput.textContent), createCostumField_Field);
            }
        }
    });
});

createCostumPattern_title.addEventListener("keydown", (event) => {
    let len = event.target.textContent.length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (event.key == "Enter") {
        event.preventDefault();
        return false;
    };

    if (len >= 15 && !hasSelection && event.key != "Enter") {
        event.preventDefault();
        return false;
    };

    // if (event.code === "Space") {
    //     event.preventDefault();
    // };
});

createCostumPattern_title.addEventListener("keyup", (event) => {
    let inputValue = createCostumField_title.textContent;
    const validInput = inputValue.replace(/[^0-9a-zA-Z\s]/g, "");

    if (inputValue !== validInput) {
        event.target.textContent = validInput;
    };
});


createCostumField_title.addEventListener("keydown", (event) => {
    let len = event.target.textContent.length;
    let hasSelection = false;
    let selection = window.getSelection();
    let isSpecial = utils.isSpecial(event);
    let isNavigational = utils.isNavigational(event);

    if (selection) {
        hasSelection = !!selection.toString();
    };

    if (isSpecial || isNavigational) {
        return true;
    };

    if (len >= 15 && !hasSelection && event.key != "Enter") {
        event.preventDefault();
        return false;
    };

    if (event.key === "Enter") {
        event.preventDefault();
        createCostumField_xInput.focus();
    };

    // if (event.code === "Space") {
    //     event.preventDefault();
    // };
});

createCostumField_title.addEventListener("keyup", (event) => {
    let inputValue = createCostumField_title.textContent;
    const validInput = inputValue.replace(/[^0-9a-zA-Z\s]/g, "");

    if (inputValue !== validInput) {
        event.target.textContent = validInput;
    };
});

function isNumericKey(key) {
    return /^\d$/.test(key);
}

function isAllowedKey(key) {
    // allowed keys: Pfeiltasten, Entf, Rücktaste, Strg, Alt, Umschalt
    return ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Backspace', 'Control', 'Alt', 'Shift'].includes(key);
}

function isLengthExceeded(input) {
    return input.textContent.length >= 2;
}