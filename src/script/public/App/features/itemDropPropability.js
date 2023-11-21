// when the player conquered a map level (it doesn't matter if he already conquered it)
// he gets 1 - 3 different items with different amount
function UserFoundItems() {
    console.log("ofg");
    // animated pop up
    setTimeout(() => {
        YouFoundItems_PopUp.style.display = 'flex';
        YouFoundItems_PopUp.style.animation = 'popUp-POP 0.07s ease-in';
        // sound 
        coinsSoundTrack();

        setTimeout(() => {
            YouFoundItems_PopUp.style.transform = "scale(1)";
            DarkLayer.style.display = 'block';
        }, 70);
    }, 700);

    let rnd = Math.floor(Math.random() * 4);

    switch (rnd) {
        case 0:
            FoundItem1.style.display = "block";
            FoundItem2.style.display = "none";
            FoundItem3.style.display = "none";

            UserGets_N_Items(1);
            break;

        case 1:
            FoundItem1.style.display = "block";
            FoundItem2.style.display = "block";
            FoundItem3.style.display = "none";

            UserGets_N_Items(2);
            break;

        case 2:
            FoundItem1.style.display = "block";
            FoundItem2.style.display = "block";
            FoundItem3.style.display = "block";

            UserGets_N_Items(3);
            break;

        default:
            FoundItem1.style.display = "block";
            FoundItem2.style.display = "none";
            FoundItem3.style.display = "none";

            UserGets_N_Items(1);
            break;
    };
};

// Amount of different items the user gets
function UserGets_N_Items(n) {
    console.log(n)
    let exploredItems = JSON.parse(localStorage.getItem("ExploredItems"));

    let items = {
        "common1": "minerals",
        "common2": "ore",
        "rare": "diamonds",
        "mystique1": "asteroids",
        "mystique2": "encrypted writing",
        "legendary": "abandoned eye"
    };

    let foundItem_imgs = [foundItem1_img, foundItem2_img, foundItem3_img];
    let foundItem_titles = [foundItem_Title1, foundItem_Title2, foundItem_Title3];
    let FoundItemCount_Displays = [FoundItemCount_Display[0], FoundItemCount_Display[1], FoundItemCount_Display[2]];

    // How many items
    switch (n) {
        case 1:
            // amount of different items
            let rarityForItems2 = Math.floor(Math.random() * 100001);

            let legendary = isInRange(rarityForItems2, 0, 100); // propability for legendary
            let mystique = isInRange(rarityForItems2, 101, 9000); // propability for mystique
            let rare = isInRange(rarityForItems2, 9001, 30000); // propability for rare
            let common = isInRange(rarityForItems2, 30001, 100000); // propability for common

            if (legendary) {
                foundItem1_img.src = "assets/game/crystal-eye.svg";
                foundItem_Title1.textContent = items["legendary"];
                FoundItemCount_Display[0].textContent = 1

                exploredItems["abandonedEye"] = exploredItems["abandonedEye"] + 1;
            };

            if (mystique) {
                let rndIndex = Math.floor(Math.random() * 2);

                if (rndIndex == 0) {
                    foundItem1_img.src = "assets/game/asteroid.svg";
                    foundItem_Title1.textContent = items["mystique1"];
                    FoundItemCount_Display[0].textContent = 1

                    exploredItems["asteroid"] = exploredItems["asteroid"] + 1;
                } else {
                    foundItem1_img.src = "assets/game/wax-tablet.svg";
                    foundItem_Title1.textContent = items["mystique2"];
                    FoundItemCount_Display[0].textContent = 1;

                    exploredItems["encryptedWriting"] = exploredItems["encryptedWriting"] + 1;
                };
            };

            if (rare) {
                let amount = Math.floor(Math.random() * 10) + 1;

                foundItem1_img.src = "assets/game/minerals.svg";
                foundItem_Title1.textContent = items["rare"];
                FoundItemCount_Display[0].textContent = amount;

                exploredItems["diamonds"] = exploredItems["diamonds"] + amount;
            };

            if (common) {
                let rndIndex = Math.floor(Math.random() * 2);
                let amount = Math.floor(Math.random() * 400) + 144;

                if (rndIndex == 1) {
                    foundItem1_img.src = "assets/game/crystal-bars.svg";
                    foundItem_Title1.textContent = items["common1"];
                    FoundItemCount_Display[0].textContent = amount;

                    exploredItems["minerals"] = exploredItems["minerals"] + amount;

                } else {
                    foundItem1_img.src = "assets/game/ore.svg";
                    foundItem_Title1.textContent = items["common2"];
                    FoundItemCount_Display[0].textContent = amount;

                    exploredItems["ore"] = exploredItems["ore"] + amount;
                };
            };

            break;

        case 2:
            // amount of different items
            for (let i = 0; i < 2; i++) {
                // which items
                let rarityForItems2 = Math.floor(Math.random() * 100001);

                let legendary2 = isInRange(rarityForItems2, 0, 500); // propability for legendary
                let mystique2 = isInRange(rarityForItems2, 501, 9000); // propability for mystique
                let rare2 = isInRange(rarityForItems2, 9001, 30000); // propability for rare
                let common2 = isInRange(rarityForItems2, 30001, 100000); // propability for common

                if (legendary2) {
                    foundItem_imgs[i].src = "assets/game/crystal-eye.svg";
                    foundItem_titles[i].textContent = items["legendary"];
                    FoundItemCount_Displays[i].textContent = 1;

                    exploredItems["abandonedEye"] = exploredItems["abandonedEye"] + 1;
                };

                if (mystique2) {
                    let rndIndex = Math.floor(Math.random() * 2);

                    if (rndIndex == 0) {
                        foundItem_imgs[i].src = "assets/game/asteroid.svg";
                        foundItem_titles[i].textContent = items["mystique1"];
                        FoundItemCount_Displays[i].textContent = 1;

                        exploredItems["asteroid"] = exploredItems["asteroid"] + 1;
                    } else {
                        foundItem_imgs[i].src = "assets/game/wax-tablet.svg";
                        foundItem_titles[i].textContent = items["mystique2"];
                        FoundItemCount_Displays[i].textContent = 1;

                        exploredItems["encryptedWriting"] = exploredItems["encryptedWriting"] + 1;
                    };
                };

                if (rare2) {
                    let amount = Math.floor(Math.random() * 10) + 4;

                    foundItem_imgs[i].src = "assets/game/minerals.svg";
                    foundItem_titles[i].textContent = items["rare"];
                    FoundItemCount_Displays[i].textContent = amount;

                    exploredItems["diamonds"] = exploredItems["diamonds"] + amount;

                };

                if (common2) {
                    let rndIndex = Math.floor(Math.random() * 2);
                    let amount = Math.floor(Math.random() * 400) + 144;

                    if (rndIndex == 1) {
                        foundItem_imgs[i].src = "assets/game/crystal-bars.svg";
                        foundItem_titles[i].textContent = items["common1"];
                        FoundItemCount_Displays[i].textContent = amount;

                        exploredItems["minerals"] = exploredItems["minerals"] + amount;

                    } else {
                        foundItem_imgs[i].src = "assets/game/ore.svg";
                        foundItem_titles[i].textContent = items["common2"];
                        FoundItemCount_Displays[i].textContent = amount;

                        exploredItems["ore"] = exploredItems["ore"] + amount;
                    };
                };
            };
            break;

        case 3:
            // which items
            for (let i = 0; i < 3; i++) {
                let rarityForItems2 = Math.floor(Math.random() * 100001);

                let legendary4 = isInRange(rarityForItems2, 0, 500); // propability for legendary
                let mystique4 = isInRange(rarityForItems2, 501, 9000); // propability for mystique
                let rare4 = isInRange(rarityForItems2, 9001, 30000); // propability for rare
                let common4 = isInRange(rarityForItems2, 30001, 100000); // propability for common

                console.log(i);
                if (legendary4) {
                    foundItem_imgs[i].src = "assets/game/crystal-eye.svg";
                    foundItem_titles[i].textContent = items["legendary"];
                    FoundItemCount_Displays[i].textContent = 1;

                    exploredItems["abandonedEye"] = exploredItems["abandonedEye"] + 1;

                    console.log("legendary", legendary4)
                };

                if (mystique4) {
                    let rndIndex = Math.floor(Math.random() * 2);

                    if (rndIndex == 0) {
                        foundItem_imgs[i].src = "assets/game/asteroid.svg";
                        foundItem_titles[i].textContent = items["mystique1"];
                        FoundItemCount_Displays[i].textContent = 1;

                        exploredItems["asteroid"] = exploredItems["asteroid"] + 1;

                    } else {
                        foundItem_imgs[i].src = "assets/game/wax-tablet.svg";
                        foundItem_titles[i].textContent = items["mystique2"];
                        FoundItemCount_Displays[i].textContent = 1;

                        exploredItems["encryptedWriting"] = exploredItems["encryptedWriting"] + 1;

                    };

                    console.log("mystiqu4", mystique4)
                };

                if (rare4) {
                    let amount = Math.floor(Math.random() * 10) + 5;

                    foundItem_imgs[i].src = "assets/game/minerals.svg";
                    foundItem_titles[i].textContent = items["rare"];
                    FoundItemCount_Displays[i].textContent = amount;

                    exploredItems["diamonds"] = exploredItems["diamonds"] + amount;

                    console.log("rare4", rare4)
                };

                if (common4) {
                    let rndIndex = Math.floor(Math.random() * 2);
                    let amount = Math.floor(Math.random() * 400) + 144;

                    if (rndIndex == 1) {
                        foundItem_imgs[i].src = "assets/game/crystal-bars.svg";
                        foundItem_titles[i].textContent = items["common1"];
                        FoundItemCount_Displays[i].textContent = amount;

                        exploredItems["minerals"] = exploredItems["minerals"] + amount;

                    } else {
                        foundItem_imgs[i].src = "assets/game/ore.svg";
                        foundItem_titles[i].textContent = items["common2"];
                        FoundItemCount_Displays[i].textContent = amount;

                        exploredItems["ore"] = exploredItems["ore"] + amount;
                    };

                    console.log("comomn4", common4)
                };
            };
            break;
    };
    // save ever changes in storage
    localStorage.setItem('ExploredItems', JSON.stringify(exploredItems));
    init_exploredItems();
};

// range between two numbers
const isInRange = (number, lowerBound, upperBound) => {
    return number >= lowerBound && number <= upperBound;
};