// script file for all daily challenges logic and functionality
// countdown functionality is managed by Treasure.js
class DailyChallenges {
    constructor(CurrentChallenges) {

        this.CurrentChallenges = CurrentChallenges;

        this.ChallengeTypes = {
            0: "online-win",
            1: "diamonds", // earn a specific amount of diamonds
            2: "patternL1", // win one online game wih pattern
            3: "patternspecial1", // win one online game wih pattern
            4: "patternW1", // win one online game wih pattern
            5: "patternW4", // win one online game wih pattern
            6: "patternstar", // win one online game wih pattern
            7: "patternbranch1", // win one online game wih pattern
            8: "patternbranch2", // win one online game wih pattern
            9: "patternbranch3", // win one online game wih pattern
            10: "patternbranch4", // win one online game wih pattern
            11: "patternSame5", // use same pattern n times in online game
            12: "patternSame3", // use same pattern n times in online game
            13: "online-win-boneyard-5", // win in boneyard mode in online mode 5 times
            14: "online-win-5sec-2", // win online game with 5 sec player clock 2 times
            15: "online-win-5sec-1" // win online game with 5 sec player clock 1 time
        };

        this.Challenges = {
            0: {
                type: "online-win",
                title: "Win 3 online games.",
                price: 80,
                price_type: "diamond",
                max_progress: 3,
            },
            1: {
                type: "online-win",
                title: "Win 5 online games.",
                price: 100,
                price_type: "diamond",
                max_progress: 5,
            },
            2: {
                type: "online-win",
                title: "Win 10 online games.",
                price: 200,
                price_type: "diamond",
                max_progress: 10,
            },
            3: {
                type: "diamonds",
                title: "Get 500 diamonds.",
                price: 10,
                price_type: "keys",
                max_progress: 500,
            },
            4: {
                type: "patternL1",
                title: "Win an online game with the L1 win pattern.",
                price: 1,
                price_type: "x",
                max_progress: 1,
            },
            5: {
                type: "patternSpecial1",
                title: "Win an online game with the special1 win pattern.",
                price: 50,
                price_type: "diamond",
                max_progress: 1,
            },
            6: {
                type: "patternW1",
                title: "Win an online game with the W1 win pattern.",
                price: 50,
                price_type: "diamond",
                max_progress: 1,
            },
            7: {
                type: "patternW4",
                title: "Win an online game with the W4 win pattern.",
                price: 75,
                price_type: "diamond",
                max_progress: 1,
            },
            8: {
                type: "patternStar",
                title: "Win an online game with the star win pattern.",
                price: 75,
                price_type: "diamond",
                max_progress: 1,
            },
            9: {
                type: "patternBranch1",
                title: "Win an online game with the branch1 win pattern.",
                price: 25,
                price_type: "diamond",
                max_progress: 1,
            },
            10: {
                type: "patternBranch2",
                title: "Win an online game with the branch2 win pattern.",
                price: 15,
                price_type: "diamond",
                max_progress: 1,
            },
            11: {
                type: "patternBranch3",
                title: "Win an online game with the branch3 win pattern.",
                price: 15,
                price_type: "diamond",
                max_progress: 1,
            },
            12: {
                type: "patternBranch4",
                title: "Win an online game with the branch4 win pattern.",
                price: 25,
                price_type: "diamond",
                max_progress: 1,
            },
            13: {
                type: "patternSame5",
                title: "Use a win pattern of your choice 5 times in a row in an online game.",
                price: 200,
                price_type: "diamond",
                max_progress: 5,
            },
            14: {
                type: "patternSame3",
                title: "Use a win pattern of your choice 3 times in a row in an online game.",
                price: 1,
                price_type: "x",
                max_progress: 3,
            },
            15: {
                type: "online-win-boneyard-5",
                title: "Win 5 online games in boneyard.",
                price: 1,
                price_type: "x",
                max_progress: 5,
            },
            16: {
                type: "online-win-5sec-2",
                title: "Win 2 online games with the 5 seconds player clock.",
                price: 25,
                price_type: "keys",
                max_progress: 2,
            },
            17: {
                type: "online-win-5sec-1",
                title: "Win an online game with the 5 seconds player clock.",
                price: 50,
                price_type: "diamond",
                max_progress: 1,
            }
        };

        this.Last24HoursUsedPatterns = localStorage.getItem("Last24HoursUsedPatterns");
        this.Last24HoursCollectedGems = localStorage.getItem("Last24HoursCollectedGems");
        this.Last24HoursOnlineGamesWon = localStorage.getItem("Last24Hours_Won_OnlineGames");
        this.Last24HoursOnlineGamesBoneyardWon = localStorage.getItem("Last24Hours_Won_OnlineGames_Boneyard");
        this.Last24HoursOnlineGamesWon_5secondsClock = localStorage.getItem("Last24Hours_Won_5secondsPlayerClockOnlineGames");
    };

    init = () => {
        CheckTreasure(); // see in Treasure.js
        this.check_challenges();
    };

    display = () => {
        DisplayPopUp_PopAnimation(DailyChallenges_PopUp, "flex", true);
        this.check_pattern_challenges();
    };

    check_challenges = () => {
        if (localStorage.getItem("newChallengesAreAvailable") == "true") {
            localStorage.setItem("newChallengesAreAvailable", "false");

            this.new_challenges();

        } else if (localStorage.getItem("newChallengesAreAvailable") == "false") {
            // check for the existing challenges
            let challenge_storage = localStorage.getItem("CurrentDailyChallenges");

            if (challenge_storage == null) {
                localStorage.setItem("CurrentDailyChallenges", "{}");
                localStorage.setItem("completedChallenges", JSON.stringify({ 0: "false", 1: "false", 2: "false" }));

            } else {
                this.new_challenges_animation(JSON.parse(challenge_storage), true);
                this.check_pattern_challenges();
                this.challenges_are_claimed();
            };

        } else if (localStorage.getItem("newChallengesAreAvailable") == null) { // not in storage. player is the first time in the game
            localStorage.setItem("newChallengesAreAvailable", "true");

            // reset stuff from previous challenges
            localStorage.setItem("Last24HourUsedPatterns", "[]");
            localStorage.setItem("Last24HoursCollectedGems", "0");
            localStorage.setItem("Last24Hours_Won_5secondsPlayerClockOnlineGames", "[]");
            localStorage.setItem("Last24Hours_Won_OnlineGames", "[]");
            localStorage.setItem("Last24Hours_Won_OnlineGames_Boneyard", "[]");

            // recall itself
            this.check_challenges();
        };
    };

    new_challenges = () => {
        let usedNumbers = [];
        let updated_challenges = [];

        // get random number and its challenge
        for (let i = 0; i < ChallengeBox.length; i++) {
            // random number
            let rnd;

            do { // prevention of getting the same challenge multiple times 
                rnd = Math.floor(Math.random() * Object.keys(this.Challenges).length);
            } while (usedNumbers.includes(rnd));
            usedNumbers.push(rnd);

            // random challenge
            updated_challenges.push(this.Challenges[rnd]);
        };

        console.log(updated_challenges);

        // call animation and refresh ui
        this.new_challenges_animation(updated_challenges);

        // save in storage
        localStorage.setItem("CurrentDailyChallenges", JSON.stringify(updated_challenges));
    };

    new_challenges_animation = (challenges, standard_ani) => {
        ChallengeBox.forEach((box, i) => {
            let delay = 0;
            if (!standard_ani) {
                box.style.animation = "opacity_div 1.5s reverse";
                box.style.animationFillMode = "forwards";
                delay = 500;
            };

            const onAnimationEnd = () => {
                this.init_new_challenge(box, challenges[i]);

                setTimeout(() => {
                    box.style.animation = "new_challenge 1s ease-in-out forwards";
                }, delay);

                box.removeEventListener("animationend", onAnimationEnd);
            };

            box.addEventListener("animationend", onAnimationEnd, { once: true });
            standard_ani && onAnimationEnd();
        });
    };


    init_new_challenge = (box, challenge) => {
        let title = box.querySelector(".ChallengeBoxTitle");
        let progress = box.querySelector(".ChallengeBox_progressText");
        let price = box.querySelector(".ChallengeBox_priceTextWrapper");

        // get price type symbol
        let symbol_element = this.get_challenge_price_type_symbol(challenge);

        title.textContent = challenge.title;
        progress.textContent = `Progress: 0/${challenge.max_progress}`;
        price.textContent = `Price: ${challenge.price} ${'\u00A0'}`;
        price.appendChild(symbol_element);
    };

    get_challenge_price_type_symbol = (challenge) => {
        let element = document.createElement("i");

        switch (challenge.price_type) {
            case "diamond":
                element.className = "fa-solid fa-gem";
                break;

            case "x":
                element.className = "fa-solid fa-x";
                break;

            case "keys":
                element.className = "fa-solid fa-key";
                break;
        };

        return element;
    };

    // called by Treasure script
    new_available = () => {
        console.log("New challenges are available!");
    };

    // check single pattern challenges 
    check_pattern_challenges = () => {
        this.Last24HoursUsedPatterns = JSON.parse(localStorage.getItem("Last24HourUsedPatterns"));
        let currentChallenges = JSON.parse(this.CurrentChallenges);

        let patternBasedChallengeType = [
            "patternL1", // win one online game wih pattern
            "patternspecial1", // win one online game wih pattern
            "patternW1", // win one online game wih pattern
            "patternW4", // win one online game wih pattern
            "patternstar", // win one online game wih pattern
            "patternbranch1", // win one online game wih pattern
            "patternbranch2", // win one online game wih pattern
            "patternbranch3", // win one online game wih pattern
            "patternbranch4", // win one online game wih pattern
        ];

        console.log(currentChallenges, this.Last24HoursUsedPatterns);

        for (const [index, data] of Object.entries(currentChallenges)) {

            console.log(data["type"].replace("pattern", ""), data["type"]);

            if (this.Last24HoursUsedPatterns.includes(data["type"].replace("pattern", ""))) {
                console.log("match", currentChallenges[index]);

                ChallengeBox[index].setAttribute("completed", "true");
                ChallengeBox_progressText[index].textContent = "Progress: 1/1";
            };
        };

        // check if pattern is used multiple times
    };

    // check gem challenges
    check_gems_challenges = () => {

    };

    // check online games won challenge
    check_online_games_challenges = () => {

    };

    // check online games won in boneyard challenge
    check_online_games_boneyard_challenges = () => {

    };

    // check online games won with 5 seconds player clock challenge
    check_online_games_5sec_challenges = () => {

    };

    // player completed a challenge and clicked claim!
    completed_challenge = (el, challenge_index) => {
        // set challenge is completed 
        let completedChallengesStorage = JSON.parse(localStorage.getItem("completedChallenges"));
        completedChallengesStorage[challenge_index] = "true";
        localStorage.setItem("completedChallenges", JSON.stringify(completedChallengesStorage));

        // animation
        this.completed_challenge_claim_animation(el, challenge_index);

        // music
        play_rewardSound();

        // get reward
        let currentChallenges = JSON.parse(this.CurrentChallenges);
        let currencyStorage;
        let currencyStorageName;
        let reward_amount = currentChallenges[challenge_index]["price"];

        switch (currentChallenges[challenge_index]["price_type"]) {
            case "diamond":
                currencyStorage = JSON.parse(localStorage.getItem("GemsItem"));
                currencyStorageName = "GemsItem";
                currencyStorage = currencyStorage + reward_amount;

                gemsIcon.textContent = currencyStorage;
                gemsIcon_skinShop.textContent = currencyStorage;
                break;

            case "x":
                currencyStorage = JSON.parse(localStorage.getItem("ItemX"));
                currencyStorageName = "ItemX";
                currencyStorage = currencyStorage + reward_amount;

                Xicon.textContent = currencyStorage;
                XBtn.textContent = currencyStorage;
                break;

            case "keys":
                currencyStorage = JSON.parse(localStorage.getItem("keys"));
                currencyStorageName = "keys";
                currencyStorage = currencyStorage + reward_amount;

                KEYicon.textContent = currencyStorage;
                mapKey.textContent = currencyStorage;
                break;
        };

        localStorage.setItem(currencyStorageName, JSON.stringify(currencyStorage));
    };

    // dissapear animation
    completed_challenge_claim_animation = (el, i) => {
        ChallengeBox_priceTextWrapper[i].style.animation = "blue_color_fade 3s ease-in-out forwards";

        ChallengeBox_priceTextWrapper[i].addEventListener("animationend", () => {
            ChallengeBox_priceTextWrapper[i].style.animation = "none";
        }, { once: true });

        this.challenges_are_claimed();
    };

    // wether challenges is already claimed or not => modify ui
    challenges_are_claimed = () => {
        let completedChallengesStorage = JSON.parse(localStorage.getItem("completedChallenges"));

        ChallengeBox.forEach((box, i) => {
            // other ui text and box attribute when challenge is completed/ not completed
            switch (completedChallengesStorage[i]) {
                case "false":
                    box.setAttribute("claimed", "false");
                    DailyChallengeClaimBtns[i].style.pointerEvents = "all";
                    DailyChallengeClaimBtns[i].textContent = "Claim!";
                    break;

                case "true":
                    box.setAttribute("claimed", "true");
                    box.setAttribute("completed", "false");
                    DailyChallengeClaimBtns[i].style.pointerEvents = "none";
                    DailyChallengeClaimBtns[i].textContent = "Completed!";
                    break;
            };
        });
    };
};

let DailyChallenge = new DailyChallenges(localStorage.getItem("CurrentDailyChallenges"));
DailyChallenge.init();

// events

lobbyBtn1.addEventListener("click", () => {
    DailyChallenge.display();
    playBtn_Audio_2();
});

DailyChallengesQuestionBtn.addEventListener("click", () => {
    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    OpenedPopUp_WhereAlertPopUpNeeded = true;
    AlertText.textContent = "Try to beat all challenges in the remaining time. You get new challenges when countdown is finished.";
});

DailyChallenges_backBtn.addEventListener("click", () => {
    DailyChallenges_PopUp.style.display = "none";
    DarkLayer.style.display = "none";
});

DailyChallengeClaimBtns.forEach((btn, i) => {
    if (ChallengeBox[i].getAttribute("completed") == "true") {
        btn.addEventListener("click", () => {
            DailyChallenge.completed_challenge(ChallengeBox[i], i);
        });
    };
});