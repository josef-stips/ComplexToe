// background music
window.addEventListener("DOMContentLoaded", event => {
    const audio = document.querySelector("#bg_audio");
    audio.volume = 0.05;
    audio.loop = true;
    audio.play();

    const audioContext = new(window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const firstDiv = document.querySelector(".music-bars");
    const secondDiv = document.querySelector(".music-bars-2");

    for (let i = 0; i < bufferLength; i++) {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        firstDiv.appendChild(bar);
        const bar2 = document.createElement("div");
        bar2.classList.add("bar");
        secondDiv.appendChild(bar2);
    };

    function animateBars() {
        requestAnimationFrame(animateBars);
        analyser.getByteFrequencyData(dataArray);

        const bars = document.querySelectorAll(".music-bars .bar");
        const bars2 = document.querySelectorAll(".music-bars-2 .bar");
        const numBars = bars.length;
        const barWidth = firstDiv.offsetWidth / numBars;

        bars.forEach((bar, index) => {
            const barHeight = (dataArray[index] / 255) * firstDiv.offsetHeight;

            bar.style.width = barWidth + "px";
            bar.style.height = barHeight + "px";
        });

        bars2.forEach((bar, index) => {
            const reversedIndex = numBars - 1 - index; // Umkehren der Indexreihenfolge
            const barHeight = (dataArray[reversedIndex] / 255) * secondDiv.offsetHeight;

            bar.style.width = barWidth + "px";
            bar.style.height = barHeight + "px";
        });
    };

    animateBars();
});

function playBtn_Audio() {
    // audio
    btn_sound.volume = 0.1;
    btn_sound.play()
};

function playBtn_Audio_2() {
    // audio
    btn_sound2.volume = 0.1;
    btn_sound2.play()
};

// click sound on button click event
let Allbtns = document.querySelectorAll('.btn');
let btn_sound = document.querySelector('#btn_click_1');
let btn_sound2 = document.querySelector('#btn_click_2');

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

NxN_field.forEach(field => {
    field.addEventListener('click', () => {
        let fieldSize = field.getAttribute('field');
        let fieldTitle = field.getAttribute('title');

        GameField.style.display = 'block';
        gameModeFields_Div.style.display = 'none';

        GameTitle.textContent = fieldTitle;
    });
});

leaveGame_btn.addEventListener('click', () => {
    GameField.style.display = 'none';
    gameModeCards_Div.style.display = 'flex';

    playBtn_Audio();
});