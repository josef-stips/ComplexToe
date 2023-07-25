let input2 = document.querySelector('#YourName_Input_KI_mode');
let input3 = document.querySelector('.EnterGameCode_Input');
let icon_input1 = document.querySelector('#Player1_IconInput');
let icon_input2 = document.querySelector('#Player2_IconInput');
let icon_input3 = document.querySelector('#Your_IconInput');

let settings = {
    maxInputLeng: 11,
    maxFormInputLeng: 2,
    maxInputLeng2: 6
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

input3.addEventListener('keydown', function(event) {
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