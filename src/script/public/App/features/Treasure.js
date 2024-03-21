// all the treasure functionality gets initalized in DailyChallenges.js with the CheckTreasure function call 
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
        DisplayPopUp_PopAnimation(treasureBoxTimerPopUp, "flex", true);
    };
});

// every 5 wins the user can open it
function init_SecondTreasure() {
    let treasureOpenedCounter = localStorage.getItem('treasureOpenedCounter');
    let treasureOpenedOnWin = localStorage.getItem('treasureOpenedOnWin');

    // doesn't exist yet
    if (!treasureOpenedCounter) {
        localStorage.setItem('treasureOpenedCounter', 0);
        localStorage.setItem('treasureOpenedOnWin', 0);
    };
};
init_SecondTreasure();

// this second treasure the user can open every 5 wins in an online game
treasureIcon2.addEventListener('click', () => {
    let treasureOpenedCounter = parseInt(localStorage.getItem('treasureOpenedCounter'));
    let treasureOpenedOnWin = parseInt(localStorage.getItem('treasureOpenedOnWin'));
    let OnlineMatchesWins = parseInt(localStorage.getItem('onlineMatches-won'));

    treasureIcon2.style.animation = "none";
    if (OnlineMatchesWins < treasureOpenedOnWin + 5) {
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        AlertText.textContent = `You need to win ${treasureOpenedOnWin + 5} online matches in total to unlock this treasure. You currently won ${OnlineMatchesWins}.`;

    } else {
        treasureOpenedCounter++;
        treasureOpenedOnWin = treasureOpenedOnWin + 5;

        localStorage.setItem('treasureOpenedCounter', treasureOpenedCounter);
        localStorage.setItem('treasureOpenedOnWin', treasureOpenedOnWin);

        // The probability the earn x is 1/10 
        // All the other times the player gets diamants
        const isXRare = getRandomNumber(1, 11) === 1;
        const isKeyRare = getRandomNumber(1, 3) === 1;

        let positionOf_XIcon = Xicon.getBoundingClientRect();
        let positionOf_GemIcon = gemsIcon.getBoundingClientRect();
        let positionOf_KeyIcon = KEYicon.getBoundingClientRect();

        // player gains 10 X which is incredible
        if (isKeyRare) {
            // Spieler gains diamants
            let counter = 0;
            let count = setInterval(() => {
                counter++;
                if (counter >= 5) {
                    clearInterval(count);
                };
                ItemAnimation('fa-solid fa-key', positionOf_KeyIcon, undefined, undefined, true);
            }, 50);

            setTimeout(() => {
                KEYicon.style.animation = "none";
            }, 1000);

        } else if (isXRare && !isKeyRare) {
            // Player gains X
            ItemAnimation('fa-solid fa-x', positionOf_XIcon, undefined, undefined, true);

        } else {
            // Spieler gains diamants
            let counter = 0;
            let count = setInterval(() => {
                counter++;
                if (counter >= 25) {
                    clearInterval(count);
                };
                ItemAnimation('fa-solid fa-gem', positionOf_GemIcon, undefined, undefined, true);
            }, 50);
        };
    };

    CheckTreasureCanBeOpened();
});

// check if treasure can be opened
// function will be executed on the back to lobby btn event and when the game starts
function CheckTreasureCanBeOpened() {
    let OnlineMatchesWins = parseInt(localStorage.getItem('onlineMatches-won'));
    let treasureOpenedOnWin = parseInt(localStorage.getItem('treasureOpenedOnWin'));

    if (OnlineMatchesWins >= treasureOpenedOnWin + 5) {
        treasureIcon2.style.animation = "treasure_availible 1s infinite";

    } else {
        treasureIcon2.style.animation = "none";
    };
};
CheckTreasureCanBeOpened();

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
    // position of x-icon
    let positionOf_XIcon = Xicon.getBoundingClientRect();
    let positionOf_GemIcon = gemsIcon.getBoundingClientRect();

    localStorage.setItem('treasureIsAvailible', false);

    treasureIcon.style.animation = "none";

    // The probability the earn x is 1/10 
    // All the other times the player gets diamants
    const isXRare = getRandomNumber(1, 11) === 1;
    const SuperRare = getRandomNumber(1, 3000) === 3000;

    // player gains 10 X which is incredible
    if (SuperRare) {
        // Spieler gains diamants
        let counter = 0;
        let count = setInterval(() => {
            counter++;
            if (counter >= 10) {
                clearInterval(count);
            };
            ItemAnimation('fa-solid fa-x', positionOf_XIcon);
        }, 50);

    } else if (isXRare && !SuperRare) {
        // Player gains X
        ItemAnimation('fa-solid fa-x', positionOf_XIcon);

    } else {
        // Spieler gains diamants
        let counter = 0;
        let count = setInterval(() => {
            counter++;
            if (counter >= 25) {
                clearInterval(count);
            };
            ItemAnimation('fa-solid fa-gem', positionOf_GemIcon);
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

        DailyChallenge.new_available();
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

        DailyChallenge.new_available();
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
    // for better user experience in treasure pop up and challenges pop up
    if (hour <= 9) {
        hours.textContent = `0${hour}`;
        DailyChallenges_TimeRemaining_Hours.textContent = `0${hour}`;

    } else {
        hours.textContent = hour;
        DailyChallenges_TimeRemaining_Hours.textContent = `${hour}`;
    };
    if (min <= 9) {
        minutes.textContent = `0${min}`;
        DailyChallenges_TimeRemaining_Minutes.textContent = `0${min}`;

    } else {
        minutes.textContent = min;
        DailyChallenges_TimeRemaining_Minutes.textContent = `${min}`;
    };
    if (sec <= 9) {
        seconds.textContent = `0${sec}`;
        DailyChallenges_TimeRemaining_Seconds.textContent = `0${sec}`;
    } else {
        seconds.textContent = sec;
        DailyChallenges_TimeRemaining_Seconds.textContent = `${sec}`;
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

    localStorage.setItem("newChallengesAreAvailable", "true");
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

    // activate treasure html countdown for better user experience
    clearInterval(TreasureCountdown);
    TreasureCountdown = null;
    // parse right time value so the user is informed
    updateCountdownValue(hours, minutes, seconds);
};