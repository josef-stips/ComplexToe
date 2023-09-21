// to initialize
CheckTreasure();
// Interval which sends a request to server every second
let IntervalTillNextTreasure = null;
// treasure countdown
let TreasureCountdown = null;

// code
treasureIcon.addEventListener('click', () => {
    // check if treasure can be opened
    if (localStorage.getItem('treasureIsAvailible') == "true") {
        openTreasure();
    } else {
        treasureBoxTimerPopUp.style.display = 'flex';
        DarkLayer.style.display = 'block';
    };
});

treasurePopUpcloseBtn.addEventListener('click', () => {
    treasureBoxTimerPopUp.style.display = 'none';
    DarkLayer.style.display = 'none';
});

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

    socket.emit('activate-treasureCountDown', localStorage.getItem('PlayerID'), localStorage.getItem('UserOpenedTreasureOnceInHisLife'), "afterOpening");
    localStorage.setItem('UserOpenedTreasureOnceInHisLife', true);

    // so the user sees the remaining time
    updateCountdownValue(23, 59, 59);

    // Check every second if interval in database is done
    IntervalTillNextTreasure = setInterval(() => {
        socket.emit("check_Treasure_Countdown", localStorage.getItem("PlayerID"));
    }, 1000);
};

// to initialize
function CheckTreasure() {
    if (localStorage.getItem('UserOpenedTreasureOnceInHisLife') != "true") {
        localStorage.setItem('UserOpenedTreasureOnceInHisLife', 'false');
        treasureIsAvailible();
        return;
    };

    // user is first time in the game
    if (localStorage.getItem('treasureIsAvailible') == null && localStorage.getItem('treasureIsAvailible') == undefined) {
        socket.emit('activate-treasureCountDown', localStorage.getItem('PlayerID'));
        localStorage.setItem('treasureIsAvailible', false);
        return;
    };

    // user is not the first time in the game
    if (localStorage.getItem('treasureIsAvailible') == "true") {
        treasureIsAvailible();
    };
};

// updates values on html page
function updateCountdownValue(h, m, s) {
    // call treasure countdown
    let Nhour = h;
    let Nminutes = m;
    let Nseconds = s;

    // online timer for player
    TreasureCountdown = setInterval(() => {
        // simple timer for the page
        Nseconds--;
        updateValues(Nseconds, Nminutes, Nhour);

        if (Nseconds <= -1 && Nminutes <= 0 && Nhour >= 1) {
            Nhour--;
            Nminutes = 59;
            Nseconds = 59;
            updateValues(Nseconds, Nminutes, Nhour);
        };

        // display minutes
        if (Nseconds <= -1 && Nminutes > 0) {
            Nminutes--;
            Nseconds = 59;
            updateValues(Nseconds, Nminutes, Nhour);
        };

        if (Nminutes <= 9) {
            updateValues(Nseconds, Nminutes, Nhour);
        };

        // display seconds
        if (Nseconds <= 9) {
            updateValues(Nseconds, Nminutes, Nhour);
        };

        // display hours
        if (Nminutes < 1 && Nminutes > 0) {
            Nhour--;
            updateValues(Nseconds, Nminutes, Nhour);
        };

        if (Nhour <= 9) {
            updateValues(Nseconds, Nminutes, Nhour);
        };
    }, 1000);
};

function updateValues(sec, min, hour) {
    // for better user experience
    if (hour <= 9) {
        hours.textContent = `0${hour}`;
    } else {
        hours.textContent = hour;
    };
    if (min <= 9) {
        minutes.textContent = `0${min}`;
    } else {
        minutes.textContent = min;
    };
    if (sec <= 9) {
        seconds.textContent = `0${sec}`;
    } else {
        seconds.textContent = sec;
    };
};

// message from server that the treasure can be opened now
socket.on('availible-treasure', () => {
    if (IntervalTillNextTreasure != null) {
        // clear interval
        // When the user opens the treasure again the interval starts also again
        clearInterval(IntervalTillNextTreasure);
        IntervalTillNextTreasure = null;
    };
    if (TreasureCountdown != null) {
        clearInterval(TreasureCountdown);
        TreasureCountdown = null;
    };
    treasureIsAvailible();
});

// message from server that the treasure can't be opened now
socket.on('availible-treasure-NOT', (timestamp) => {
    // Calculate time difference for the html treasure timer
    CalculateTimeDifference(timestamp);

    // Check every second if interval in database is done
    if (IntervalTillNextTreasure != null) {
        // clear interval
        // When the user opens the treasure again the interval starts also again
        clearInterval(IntervalTillNextTreasure);
        IntervalTillNextTreasure = null;
    };
    IntervalTillNextTreasure = setInterval(() => {
        socket.emit("check_Treasure_Countdown", localStorage.getItem("PlayerID"));
    }, 1000);
});

// When the server responds that the treasure can't be opened now
// The time difference between now and the future date in time format needs to be calculated
function CalculateTimeDifference(timestamp) {
    let timeStamp = timestamp[0][0].end_time; // string NNNN-NN-NNT11:11:11.000Z

    // Difference
    const futureDateFromDatabase = new Date(timeStamp);
    const currentDate = new Date();
    const timeDifference = futureDateFromDatabase - currentDate;

    // Calculate
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const timeString = `${hours}:${minutes}:${seconds}`;

    console.log(timeString);
    // activate treasure html countdown for better user experience
    clearInterval(TreasureCountdown);
    TreasureCountdown = null;
    // parse right time value so the user is informed
    updateCountdownValue(hours, minutes, seconds);
};