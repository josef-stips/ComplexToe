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
    current_games_pop_up.style.display = "none";

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
    const month = months[date.getMonth()]; // 'June'
    const day = String(date.getDate()).padStart(2, '0'); // '10'
    const year = date.getFullYear(); // '2024'

    let hours = date.getHours(); // Verwende lokale Stunden statt UTC Stunden
    const minutes = String(date.getMinutes()).padStart(2, '0'); // '48'
    const seconds = String(date.getSeconds()).padStart(2, '0'); // '29'
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0'); // '617'

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' should be '12'

    const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
    return formattedDate;
}

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

function chat_scroll_to_top(behavior, chat) {
    chat.scrollTo({
        top: 0,
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

function addAlphaToColor(color, alpha) {
    // Überprüfen, ob der Alpha-Wert im gültigen Bereich liegt
    if (alpha < 0.0 || alpha > 1.0) {
        throw new Error('Alpha-Wert muss zwischen 0.0 und 1.0 liegen');
    }

    let r, g, b;

    // Wenn die Farbe im HEX-Format vorliegt
    if (color.startsWith('#')) {
        // Entferne das '#' Zeichen
        color = color.slice(1);

        // Wenn die Farbe im Kurzformat (z.B. #FFF) vorliegt
        if (color.length === 3) {
            color = color.split('').map(char => char + char).join('');
        }

        // Umwandlung der HEX-Farbe in RGB
        r = parseInt(color.slice(0, 2), 16);
        g = parseInt(color.slice(2, 4), 16);
        b = parseInt(color.slice(4, 6), 16);
    } else if (color.startsWith('rgb(') && color.endsWith(')')) {
        // Wenn die Farbe im RGB-Format vorliegt
        const rgbValues = color.slice(4, -1).split(',').map(Number);
        [r, g, b] = rgbValues;
    } else {
        return color;
    };

    // Rückgabe der Farbe im RGBA-Format
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function formatDateZ(dateString) {
    // Entferne zusätzliche Anführungszeichen falls vorhanden
    if (dateString.startsWith("'") && dateString.endsWith("'")) {
        dateString = dateString.slice(1, -1);
    } else if (dateString.startsWith("\"") && dateString.endsWith("\"")) {
        dateString = dateString.slice(1, -1);
    };

    // Erstelle ein neues Datum-Objekt aus dem bereinigten Datum-String
    const date = new Date(dateString);

    // Überprüfe, ob das Datum gültig ist
    if (isNaN(date)) {
        throw new Error("invalid date: " + dateString);
    };

    // Hole das Jahr, den Monat und den Tag aus dem Datum-Objekt
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Monate sind 0-basiert, daher +1
    const day = String(date.getUTCDate()).padStart(2, '0');

    // Baue das Datum im gewünschten Format zusammen
    return `${year}-${month}-${day}`;
};

function formatDateNormalButShort(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 'June'
    const day = String(date.getDate()).padStart(2, '0'); // '10'
    const year = date.getFullYear(); // '2024'
    return `${year}-${month}-${day}`;;
};

const XML_serializer = new XMLSerializer();

function BindPatternsWithCostumPatternsToIndexes(patterns, costum_patterns, x, y) {
    let GamePatterns = GamePatternsList;

    let pattern_structures = patterns.map(pattern_name => GamePatterns[pattern_name]);
    let official_pattern_points = patterns.map(pattern_name => patternPoints[pattern_name]);

    let all_pattern_structures;
    let all_pattern_names;
    let all_pattern_values;

    if (costum_patterns) {
        all_pattern_structures = [...Object.values(costum_patterns).map(pattern => Object.values(pattern)[0].structure), ...pattern_structures];
        all_pattern_names = [...Object.values(costum_patterns).map(pattern => Object.values(pattern)[0].name), ...patterns];
        all_pattern_values = [...Object.values(costum_patterns).map(pattern => Object.values(pattern)[0].value), ...official_pattern_points]

    } else {
        all_pattern_structures = [...pattern_structures];
        all_pattern_names = [...patterns];
        all_pattern_values = [...official_pattern_points];
    };

    return [all_pattern_structures, all_pattern_names, all_pattern_values];
};

function patternsEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    };
    return true;
};

function ConqueredPlayerCreatedLevel(level_name = null) {
    let finishedUserLevels = localStorage.getItem('finishedUserLevels');

    if (finishedUserLevels) {
        finishedUserLevels = JSON.parse(finishedUserLevels);

        if (!finishedUserLevels.includes(level_name) && typeof level_name == 'string') finishedUserLevels.push(level_name);

        localStorage.setItem('finishedUserLevels', JSON.stringify(finishedUserLevels));

        return finishedUserLevels.length;

    } else {
        localStorage.setItem('finishedUserLevels', JSON.stringify([level_name]));

        return 1;
    };
};

function GiveRatingToLevel(level_name = null) {
    let levelsWithRating = localStorage.getItem('levelsWithRating');

    if (levelsWithRating) {
        levelsWithRating = JSON.parse(levelsWithRating);

        if (!levelsWithRating.includes(level_name) && typeof level_name == 'string') levelsWithRating.push(level_name);

        localStorage.setItem('levelsWithRating', JSON.stringify(levelsWithRating));

        return levelsWithRating.length;

    } else {
        localStorage.setItem('levelsWithRating', JSON.stringify([level_name]));
        return 1;
    };
};

function OnceAClanMember(bool) {
    let OnceAClanMemberStorage = localStorage.getItem('OnceAClanMemberStorage');

    if (OnceAClanMemberStorage == "true") {
        bool && localStorage.setItem('OnceAClanMemberStorage', bool);
        return true;

    } else {
        bool && localStorage.setItem('OnceAClanMemberStorage', bool);
        return false;
    };
};

function PlayedAgainstNRandomPlayer(increase) {
    let PlayedAgainstRandomPlayer = localStorage.getItem('PlayedAgainstRandomPlayer');

    if (PlayedAgainstRandomPlayer) {
        PlayedAgainstRandomPlayer = Number(PlayedAgainstRandomPlayer);

        increase && PlayedAgainstRandomPlayer++;
        localStorage.setItem('PlayedAgainstRandomPlayer', PlayedAgainstRandomPlayer);
        return PlayedAgainstRandomPlayer;

    } else {
        increase && localStorage.setItem('PlayedAgainstRandomPlayer', 1);
        return 1;
    };
};

function CreateCostumPatternCounter(increase) {
    let CreateCostumPatternCount = localStorage.getItem('CreateCostumPatternCount');

    if (CreateCostumPatternCount) {
        CreateCostumPatternCount = Number(CreateCostumPatternCount);

        increase && CreateCostumPatternCount++;
        localStorage.setItem('CreateCostumPatternCount', CreateCostumPatternCount);
        return CreateCostumPatternCount;

    } else {
        increase && localStorage.setItem('CreateCostumPatternCount', 1);
        return 1;
    };
};

function CreateCostumFieldCounter(increase) {
    let CreateCostumFieldCount = localStorage.getItem('CreateCostumFieldCount');

    if (CreateCostumFieldCount) {
        CreateCostumFieldCount = Number(CreateCostumFieldCount);

        increase && CreateCostumFieldCount++;
        localStorage.setItem('CreateCostumFieldCount', CreateCostumFieldCount);
        return CreateCostumFieldCount;

    } else {
        increase && localStorage.setItem('CreateCostumFieldCount', 1);
        return 1;
    };
};

function LooseCounter(increase) {
    let LooseCount = localStorage.getItem('LooseCount');

    if (LooseCount) {
        LooseCount = Number(LooseCount);

        increase && LooseCount++;
        localStorage.setItem('LooseCount', LooseCount);
        return LooseCount;

    } else {
        increase && localStorage.setItem('LooseCount', 1);
        return 1;
    };
};

function getCurrentTournamentRound(schedule) {
    const currentDate = new Date();
    let lastRound = '';

    for (const [round, dates] of Object.entries(schedule)) {
        const startDate = new Date(dates.startDate);
        const endDate = new Date(dates.endDate);

        lastRound = round;

        if (currentDate >= startDate && currentDate <= endDate) {
            if (round === lastRound) {
                return 'final round';
            };

            return `round ${round}`;
        };
    };

    return 'no current round';
};

function findOpponent(rounds, id) {
    const idString = id.toString();

    for (const round of rounds) {
        for (const match of round.matches) {
            const players = match.players;

            if (players[0] && players[0].includes(idString)) return players[1];
            if (players[1] && players[1].includes(idString)) return players[0];
        }
    }

    return null;
};

function findOpponentNumber(rounds, id) {
    const idString = id.toString();

    for (const round of rounds) {
        for (const match of round.matches) {
            const players = match.players;

            const player1 = players[0];
            const player2 = players[1];

            if (player1 && player1.includes(idString) && /\d$/.test(player1)) {
                const match = player2.match(/\d+$/);
                return match ? match[0] : null;
            };

            if (player2 && player2.includes(idString) && /\d$/.test(player2)) {
                const match = player1.match(/\d+$/);
                return match ? match[0] : null;
            };
        };
    };

    return null;
};

function findMatchByPlayerID(rounds, id) {
    const idString = id.toString();

    for (const round of rounds) {
        for (const match of round.matches) {
            const players = match.players;

            if (players[0] && players[0].includes(idString)) return match.players;
            if (players[1] && players[1].includes(idString)) return match.players;
        };
    };

    return null;
};

function findMatchIndexByPlayerID(rounds, id) {
    const idString = id.toString();

    for (const round of rounds) {
        for (const [match_idx, match] of round.matches.entries()) {
            const players = match.players;

            if (players[0] && players[0].includes(idString)) return match_idx;
            if (players[1] && players[1].includes(idString)) return match_idx;
        };
    };

    return null;
};

async function generateTournamentLobbyHash() {
    const clanId = JSON.parse(localStorage.getItem('clan_member_data')).clan_id;
    const tournamentName = tournament_handler.clicked_tournament[1].name;
    const currentMatch = JSON.stringify(findMatchByPlayerID(tournament_handler.clicked_tournament[1].current_state.rounds, localStorage.getItem('PlayerID')));

    const data = clanId + tournamentName + currentMatch;
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));

    // Convert ArrayBuffer to Hex String
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
};

function Tournament_setWinnerById(roundData, playerId, player1Won) {
    const playerString = `Player ${playerId}`;

    console.log(roundData, playerId, player1Won);

    for (const match of roundData.matches) {
        const players = match.players;

        if (players.includes(playerString)) {
            match.winner = playerString;
            return [roundData, Number(match.winner.replace('Player', '').trim())];
        };
    };

    return [null, null];
};

function evaluateCurrentTournamentTreePosition(playerId, tournament) {
    let latestPosition = { roundIndex: -Infinity, matchIndex: -Infinity };

    tournament.rounds.forEach((round, roundIndex) => {
        round.matches.forEach((match, matchIndex) => {

            if (match.players.includes(playerId)) {

                if (roundIndex > latestPosition.roundIndex ||
                    (roundIndex === latestPosition.roundIndex && matchIndex > latestPosition.matchIndex)) {
                    latestPosition = { roundIndex, matchIndex };
                };
            };
        });
    });

    return latestPosition;
};