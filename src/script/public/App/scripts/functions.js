const getKeyByValue = (object, value) => { return Object.keys(object).find(key => object[key] === value) };

function getRandomIndexes(array, count) {
    const result = [];
    const arrayLength = array.length;

    if (count >= arrayLength) {
        return array.map((_, index) => index);
    };

    while (result.length < count) {
        const randomIndex = Math.floor(Math.random() * arrayLength);

        if (!result.includes(randomIndex)) {
            result.push(randomIndex);
        };
    };
    return result;
};

// pop up animation
const DisplayPopUp_PopAnimation = (pop_up, type, darkLayer) => {
    pop_up.style.display = type;
    pop_up.style.animation = "popUp-POP 0.2s ease-in-out";
    darkLayer && (DarkLayer.style.display = "block");
};

// displays user name in a text element
const displayUserName = (textEl) => textEl.textContent = localStorage.getItem("UserName");

// Display user id in user pop up
const DisplayUserID = () => {
    const UserID = localStorage.getItem("PlayerID");

    UserID_display.textContent = "User ID: " + UserID;
};

const ShowCardForIndex = Index => {
    Object.keys(CardsForIndex).forEach(idx => idx != Index ? CardsForIndex[idx].style.display = "none" : CardsForIndex[idx].style.display = "block");
};

function isBitSet(bitboard, index) {
    return (bitboard & (1 << index)) !== 0;
};

function isBitSetBIGINT(bitboard, index) {
    return (bitboard & (BigInt(1) << BigInt(index))) !== BigInt(0);
};

// Dark layer animation
const DarkLayerAnimation = (Display_Element, undisplay_Element) => {
    return new Promise((resolve) => {
        // animation
        DarkLayer.style.backgroundColor = 'black';
        DarkLayer.style.display = 'block';
        DarkLayer.style.transition = 'opacity 0.25s ease-in-out';
        DarkLayer.style.opacity = '0';

        setTimeout(() => {
            DarkLayer.style.opacity = '1';
            setTimeout(() => {
                undisplay_Element.style.display = 'none';
                Display_Element.style.display = 'flex';
            }, 250);
        }, 100);

        setTimeout(() => {
            DarkLayer.style.opacity = '0';

            resolve();

            setTimeout(() => {
                DarkLayer.style.display = 'none';
                DarkLayer.style.transition = 'none';
                DarkLayer.style.opacity = '1';
                DarkLayer.style.backgroundColor = 'rgba(0, 0, 0, 0.87)';
            }, 350);
        }, 450);
    });
};

// floating element over the screen
function ItemAnimation(item, destination_position, fromMap, mapItem, fromSecondTreasure) {
    // position of treasure
    let rect
    if (!fromMap) {
        // start position lobby treasure or second lobby treasure?
        fromSecondTreasure ? rect = treasureIcon2.getBoundingClientRect() : rect = treasureIcon.getBoundingClientRect();
    } else {
        rect = mapItem.getBoundingClientRect();
    };

    let div = document.createElement('div');
    let i = document.createElement('i');

    div.classList += 'floating-item';
    i.classList += item;
    div.style.transition = "transform 350ms linear, opacity 50ms linear";
    div.style.top = rect.top + "px";
    div.style.left = rect.left + "px";
    div.style.opacity = "0"

    div.appendChild(i);
    document.body.appendChild(div);

    setTimeout(() => {
        if (item == 'fa-solid fa-gem') {
            div.style.transform = `translateX(-${rect.right - destination_position.left}px)`;
            div.style.opacity = "1";

            // save in storage and parse in html
            let Gems = parseInt(localStorage.getItem('GemsItem'));
            Gems = Gems + 2;
            localStorage.setItem('GemsItem', Gems);
            gemsIcon.textContent = Gems;

            // remove item from html so it looks better
            setTimeout(() => {
                div.remove();
            }, 350);

            gemsIcon.style.animation = "increase-item-value ease-in-out 1s";

            setTimeout(() => {
                gemsIcon.style.animation = "none";
            }, 1000);

        } else if (item == 'fa-solid fa-x') {
            div.style.transform = `translateX(-${rect.right - destination_position.left}px)`;
            div.style.opacity = "1";

            // save in storage and parse in html
            let Xi = parseInt(localStorage.getItem('ItemX'));
            Xi++;
            localStorage.setItem('ItemX', Xi);
            Xicon.textContent = Xi;

            // remove item from html so it looks better
            setTimeout(() => {
                div.remove();
            }, 350);

            Xicon.style.animation = "increase-item-value ease-in-out 1s";

            setTimeout(() => {
                Xicon.style.animation = "none";
            }, 1000);

        } else if (item == 'fa-solid fa-key') {
            if (fromSecondTreasure) {
                div.style.transform = `translateX(-${rect.right - destination_position.left}px)`;
            } else {
                div.style.transform = `translate(calc(-${(rect.right - destination_position.right)}px + 100%), -${rect.top - destination_position.top}px)`;
            };
            div.style.opacity = "1";

            // save in storage and parse in html
            let KeyItem = parseInt(localStorage.getItem('keys'));
            KeyItem++;
            localStorage.setItem('keys', KeyItem);

            // alter opacity so it looks better
            setTimeout(() => {
                div.style.opacity = "0.5";
            }, 200);
            // remove item from html so it looks better
            setTimeout(() => {
                div.remove();
            }, 350);

            // Player gains keys
            mapKey.style.animation = "increase-item-value ease-in-out 1s";
            KEYicon.style.animation = "increase-item-value ease-in-out 1s";
            // localstorage things
            mapKeyValueDisplay.textContent = localStorage.getItem('keys');
            KEYicon.textContent = localStorage.getItem('keys');
        };
    }, 10);

    playBtn_Audio_2();
};

// close all in game pop ups the user can open in lobby or online game
const CloseOnlinePopUps = (CloseDarkLayer) => {
    GameInfoPopUp.style.display = "none";
    settingsWindow.style.display = "none";
    TryToCloseUserInfoPopUp();
    Lobby_GameInfo_PopUp.style.display = "none";
    XP_Journey.style.display = "none";
    Chat_PopUp.style.display = "none";
    GiveUpPopUp.style.display = "none";
    ChooseWinner_popUp.style.display = "none";
    SearchPlayerPopUp.style.display = "none";
    FriendsListPopUp.style.display = "none";
    MailPopUp.style.display = "none";
    MessagesPopUp.style.display = "none";
    mapLevelOverview.style.display = "none";
    UseSpell_PopUp.style.display = "none";
    AchievementsPopUp.style.display = "none";
    endGameStatsPopUp.style.display = "none";
    OfficialWinPatternsPopUp.style.display = "none";

    if (CloseDarkLayer) DarkLayer.style.display = "none";
};

function removeInvisibleChars(str) {
    return str.replace(/\s/g, '');
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};