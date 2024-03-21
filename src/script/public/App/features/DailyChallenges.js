// script file for all daily challenges logic and functionality
// countdown functionality is managed by Treasure.js
class DailyChallenges {
    constructor(CurrentChallenges) {

        this.CurrentChallenges = CurrentChallenges;

        this.ChallengeTypes = {
            0: "online-win",
            1: "diamonds", // earn a specific amount of diamonds
            2: "patternL1", // win one online game wih pattern
            3: "patternSpecial1", // win one online game wih pattern
            4: "patternW1", // win one online game wih pattern
            5: "patternW4", // win one online game wih pattern
            6: "patternStar", // win one online game wih pattern
            7: "patternBranch1", // win one online game wih pattern
            8: "patternBranch2", // win one online game wih pattern
            9: "patternBranch3", // win one online game wih pattern
            10: "patternBranch4", // win one online game wih pattern
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
                price: 100,
                price_type: "diamond",
                max_progress: 3,
            },
            1: {
                type: "online-win",
                title: "Win 5 online games.",
                price: 300,
                price_type: "diamond",
                max_progress: 5,
            },
            2: {
                type: "online-win",
                title: "Win 10 online games.",
                price: 750,
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
                price: 150,
                price_type: "diamond",
                max_progress: 1,
            },
            7: {
                type: "patternW4",
                title: "Win an online game with the W4 win pattern.",
                price: 100,
                price_type: "diamond",
                max_progress: 1,
            },
            8: {
                type: "patternStar",
                title: "Win an online game with the star win pattern.",
                price: 200,
                price_type: "diamond",
                max_progress: 1,
            },
            9: {
                type: "patternBranch1",
                title: "Win an online game with the branch1 win pattern.",
                price: 400,
                price_type: "diamond",
                max_progress: 1,
            },
            10: {
                type: "patternBranch2",
                title: "Win an online game with the branch2 win pattern.",
                price: 50,
                price_type: "diamond",
                max_progress: 1,
            },
            11: {
                type: "patternBranch3",
                title: "Win an online game with the branch3 win pattern.",
                price: 50,
                price_type: "diamond",
                max_progress: 1,
            },
            12: {
                type: "patternBranch4",
                title: "Win an online game with the branch4 win pattern.",
                price: 150,
                price_type: "diamond",
                max_progress: 1,
            },
            13: {
                type: "patternSame5",
                title: "Use a win pattern of your choice 5 times in a row in an online game.",
                price: 500,
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
                price: 100,
                price_type: "diamond",
                max_progress: 1,
            }
        };

        this.Last24HoursUsedPatterns = localStorage.getItem("Last24HoursUsedPatterns");
    };

    init = () => {
        CheckTreasure(); // see in Treasure.js
        this.check_challenges();
    };

    display = () => {
        DisplayPopUp_PopAnimation(DailyChallenges_PopUp, "flex", true);
    };

    check_challenges = () => {
        if (localStorage.getItem("newChallengesAreAvailable") == "true") {
            localStorage.setItem("newChallengesAreAvailable", "false");

            this.new_challenges();

        } else if (localStorage.getItem("newChallengesAreAvailable") == "false") {
            // check for the existing challenges
            let challenge_storage = localStorage.getItem("CurrentDailyChallenges");

            console.log(challenge_storage);

            if (challenge_storage == null) {
                localStorage.setItem("CurrentDailyChallenges", "{}");

            } else {
                this.new_challenges_animation(JSON.parse(challenge_storage), true);
            };

        } else if (localStorage.getItem("newChallengesAreAvailable") == null) { // not in storage. player is the first time in the game
            localStorage.setItem("newChallengesAreAvailable", "true");

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

    // add win pattern just used by the player to the localstorage and runtime storage
    add_recently_pattern = () => {
        this.Last24HoursUsedPatterns
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