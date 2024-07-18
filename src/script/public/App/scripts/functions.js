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

const StartLoad = (Display_Element, undisplay_Element) => {
    return new Promise(resolve => {
        DarkLayer.style.backgroundColor = 'black';
        DarkLayer.style.display = 'block';
        DarkLayer.style.transition = 'opacity 0.25s ease-in-out';
        DarkLayer.style.opacity = '0';

        setTimeout(() => {
            DarkLayer.style.opacity = '1';
            spinner.style.display = 'block';

            setTimeout(() => {
                spinner.style.opacity = '1';
            }, 200);

            setTimeout(() => {
                undisplay_Element.style.display = 'none';
                Display_Element.style.display = 'flex';

                resolve();
            }, 250);
        }, 100);
    });
};

const FinishLoad = (Display_Element, undisplay_Element) => {
    return new Promise(resolve => {
        spinner.style.opacity = '0';

        setTimeout(() => {
            DarkLayer.style.opacity = '0';

            setTimeout(() => {
                DarkLayer.style.display = 'none';
                DarkLayer.style.transition = 'none';
                spinner.style.display = 'none';
                DarkLayer.style.opacity = '1';
                DarkLayer.style.backgroundColor = 'rgba(0, 0, 0, 0.87)';

                resolve();
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

const DisplayPlayerIcon_at_el = (userInfoIcon, playerInfoClass, playerInfoColor, player_icon) => {

    if (playerInfoClass == "empty") { // user has standard skin
        userInfoIcon.classList = "userInfo-Icon userInfoEditable";
        userInfoIcon.textContent = player_icon;
        userInfoIcon.style.color = playerInfoColor;

    } else { // user has advanced skin
        userInfoIcon.classList = "userInfo-Icon userInfoEditable " + playerInfoClass;
        userInfoIcon.textContent = null;
        userInfoIcon.style.color = "var(--font-color)";
    };
};

function formatDate(dateString) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date(dateString);
    const month = months[date.getUTCMonth()]; // 'June'
    const day = String(date.getUTCDate()).padStart(2, '0'); // '10'
    const year = date.getUTCFullYear(); // '2024'

    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // '48'
    const seconds = String(date.getUTCSeconds()).padStart(2, '0'); // '29'
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0'); // '617'

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' should be '12'

    const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
    return formattedDate;
};

const roll_animation = (item, class_item) => {
    item.addEventListener('mouseenter', () => {
        class_item.classList.remove('unroll');
        class_item.classList.add('roll');
    });

    item.addEventListener('mouseleave', () => {
        class_item.classList.remove('roll');
        class_item.classList.add('unroll');
    });
}

function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
};

function close_all_scenes() {
    [...lobbyMainSec.children].forEach(scene => scene.style.display = "none");
};

function chat_scroll_to_bottom(behavior, chat) {
    chat.scrollTo({
        top: chat.scrollHeight,
        behavior: behavior
    });
};

function self_id() {
    return Number(localStorage.getItem("PlayerID"));
};

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function returnTimeOfDate(date) {
    let datum = new Date(date);

    let stunden = datum.getHours();
    let minuten = datum.getMinutes();
    let sekunden = datum.getSeconds();

    let ampm = stunden >= 12 ? 'PM' : 'AM';

    stunden = stunden % 12;
    stunden = stunden ? stunden : 12;

    minuten = minuten < 10 ? '0' + minuten : minuten;
    sekunden = sekunden < 10 ? '0' + sekunden : sekunden;

    let uhrzeit = `${stunden}:${minuten} ${ampm}`;

    return uhrzeit;
};

const sortArrayObjectsAfterOneCriteria = (obj, criteria) => {
    return obj
};

const display_explored_item_after_storage_name = (name, element) => {
    switch (name) {
        case "ore":
            element.src = "assets/game/ore.svg";
            return element;

        case "minerals":
            element.src = "assets/game/crystal-bars.svg";
            return element;


        case "diamonds":
            element.src = "assets/game/minerals.svg";
            return element;


        case "asteroid":
            element.src = "assets/game/asteroid.svg";
            return element;


        case "encryptedWriting":
            element.src = "assets/game/wax-tablet.svg";
            return element;


        case "abandonedEye":
            element.src = "assets/game/crystal-eye.svg";
            return element;

    };
};

function getCenter(rect) {
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
};

function getDistance(rect1, rect2) {
    const center1 = getCenter(rect1);
    const center2 = getCenter(rect2);
    const dx = center1.x - center2.x;
    const dy = center1.y - center2.y;
    return Math.sqrt(dx * dx + dy * dy);
};

function open_reward_animator(el_to_show, amount) {
    return new Promise(resolve => {
        reward_animator_wrapper.style.display = "flex";
        reward_animator_item_wrapper.textContent = null;
        el_to_show.classList.remove("wheel_slot_content");
        reward_animator_item_wrapper.append(el_to_show.cloneNode(true));
        // reward_animator_item_amount.textContent = amount == 1 ? "" : amount;
        reward_animator_item_amount.textContent = amount;

        reward_animator_wrapper.setAttribute("active_ani", "true");
        reward_animator_bg_shine.removeEventListener("animationend", reward_animator_bg_shine.ani_ev);
        reward_animator_bg_shine.addEventListener("animationend", reward_animator_bg_shine.ani_ev = () => {
            reward_animator_bg_shine.setAttribute("active_ani", "false");
            reward_animator_wrapper.style.display = "none";
            resolve();
        });
    });
};