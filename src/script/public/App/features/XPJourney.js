// XP journey
const Journey = {
    10: { 'keys': 5 },
    20: { 'keys': 10 },
    50: { 'encrypted writings': 1, 'keys': 10 },
    75: { 'keys': 10 },
    100: { 'keys': 20, 'X': 1 },
    200: { 'keys': 20, 'X': 1 },
    300: { 'keys': 20, 'X': 1 },
    500: { 'keys': 20, 'X': 1, 'gems': 300 },
    750: { 'gems': 100 },
    1000: { "encrypted writings": 2, 'gems': 300, 'X': 2, "keys": 20 },
    1500: { 'gems': 500, 'X': 3 },
    2000: { 'gems': 2000, 'X': 5 },
};

// 0: type, 1: src, 2: destination position for animation (where the item belongs to)
const IconsForItems = {
    'keys': ['font', 'fa-solid fa-key', KEYICON_Wrapper],
    'gems': ['font', 'fa-solid fa-gem', Gem_Wrapper],
    'X': ['font', 'fa-solid fa-x', XICON_Wrapper],
    'encrypted writings': ['img', 'assets/game/wax-tablet.svg', planet]
}

let JourneyPoints_clicked = {
    10: false,
    20: false,
    50: false,
    75: false,
    100: false,
    200: false,
    300: false,
    500: false,
    750: false,
    1000: false,
    1500: false,
    2000: false,
};

let XPJourneyMapOpen = false;
// for reward
let XP_RewardAvailible = false; // is a reward availible?
let RewardAt_PointValue = 0; // how much XP for reward
let Reward_WhichIsAvailible = {}; // if yes, parse in the reward

Object.keys(Journey).forEach(Point => {
    // create elements
    let div = document.createElement('div');
    let div2 = document.createElement('div2');
    let p1 = document.createElement('p1');
    let p2 = document.createElement('p2');

    // add attributes and data to elements
    div.classList = `JourneyPoint ${Point}`; // Point : XP amount
    div.id = `JourneyPoint_${Point}`;

    p1.textContent = "XP";
    p2.textContent = Point;

    // add elements to document
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(div2);
    JourneyInnerSideWrapper.appendChild(div);
    // add click event to element
    div.addEventListener('click', function() { ClickPoint(div, Point) });

    // add path points
    if (Point != Object.keys(Journey)[Object.keys(Journey).length - 1]) {
        for (let i = 0; i < 4; i++) {
            let i = document.createElement('i');
            i.classList = "fa-solid fa-circle";
            i.style = `align-self: start;
                    margin: 1vh 0 0 35%;
                    font-size: 2vh;`

            JourneyInnerSideWrapper.appendChild(i);
        };
    };
});

XPJourneyBtn.addEventListener('click', () => {
    // Either player gets reward or not
    if (XP_RewardAvailible) {
        let JourneyPoints_Click = JSON.parse(localStorage.getItem("JourneyPoints_clicked"));
        JourneyPoints_Click[RewardAt_PointValue] = true;
        localStorage.setItem("JourneyPoints_clicked", JSON.stringify(JourneyPoints_Click));

        UserGetsJourneyItems(Reward_WhichIsAvailible);

        CheckIfUserCanGetReward();

    } else {
        DisplayPopUp_PopAnimation(XP_Journey, "flex", true);
        DarkLayer.style.display = "block";
        XPJourneyMapOpen = true;

        // show reward for current next point. If user got every reward, show last reward
        let PointsAchievedOrNotList = JSON.parse(localStorage.getItem('JourneyPoints_clicked'));
        let CurrentPoint = 0;

        Object.keys(PointsAchievedOrNotList).reverse().forEach(point => {
            if (!PointsAchievedOrNotList[point]) {
                CurrentPoint = point
            };
        });
        if (CurrentPoint == 0) { // if user collected all rewards so he maxed out XP Journey, display last reward which is availible on the journey
            CurrentPoint = Object.keys(Journey)[Object.keys(Journey).length];
        };

        // determine the corresponding point element
        let Points = document.querySelectorAll(".JourneyPoint");
        let CurrentPoint_Element;

        for (let p_el of[...Points]) {
            if (p_el.classList[1] == CurrentPoint) {
                CurrentPoint_Element = p_el;
            } else {
                p_el.style.borderColor = "white";
            }
        };

        // set scroll of overflow scroll div side wrapper to current XP
        JourneyInnerSideWrapper.scrollTop = CurrentPoint_Element.offsetTop - (CurrentPoint_Element.offsetTop / 10);

        ClickPoint(CurrentPoint_Element, CurrentPoint);
        playBtn_Audio_3();
    };
});

JourneyCloseBtn.addEventListener('click', () => {
    XP_Journey.style.display = "none";
    DarkLayer.style.display = "none";
    XPJourneyMapOpen = false;
});

const CheckIfUserCanGetReward = () => {
    let JourneyPoints_Click = JSON.parse(localStorage.getItem("JourneyPoints_clicked"));
    let currentXP = parseInt(localStorage.getItem('ELO'));

    XP_RewardAvailible = false; // is a reward availible?
    RewardAt_PointValue = 0; // how much XP for reward
    Reward_WhichIsAvailible = {}; // if yes, parse in the reward

    let nothingThere = true;
    Object.keys(JourneyPoints_Click).forEach(pointVal => {
        if (parseInt(pointVal) <= currentXP && !JourneyPoints_Click[pointVal]) { // if user didn't collect reward although he could
            XPJourneyBtn.style.animation = "treasure_availible 1s infinite ease-in-out";

            if (!XP_RewardAvailible) {
                XP_RewardAvailible = true;
                Reward_WhichIsAvailible = Journey[pointVal];
                RewardAt_PointValue = pointVal;
            };
            // if the user clicks now on the given btn, he collect's the reward and pop up does not open
            // console.log(Reward_WhichIsAvailible, RewardAt_PointValue)

            nothingThere = false;
            return;
        };
    });
    if (nothingThere) XPJourneyBtn.style.animation = "unset";
};

const InitJourneyProgress = () => {
    if (!localStorage.getItem("JourneyPoints_clicked")) {
        localStorage.setItem("JourneyPoints_clicked", JSON.stringify(JourneyPoints_clicked));
    };

    CheckIfUserCanGetReward();
};
InitJourneyProgress();

// display data to point on point click event
const ClickPoint = (Point, PointValue) => {
    // color of selected element point should be gold
    let Points = document.querySelectorAll(".JourneyPoint");
    for (let p_el of[...Points]) {
        if (p_el.classList[1] == PointValue) {
            Point.style.borderColor = "var(--line-color)";

        } else { p_el.style.borderColor = "white" };
    };

    JourneyMainInner.textContent = null;

    let h3 = document.createElement('h3');
    let ul = document.createElement('ul');

    h3.textContent = `For ${PointValue} XP you get`;

    let AmountOfObjects = Object.keys(Journey[PointValue]);

    // create for the point the items the user gets
    for (let object of AmountOfObjects) {
        let li = document.createElement('li');
        let icon;

        li.textContent = `${Journey[PointValue][object]} `;

        if (IconsForItems[object][0] == 'img') {
            icon = document.createElement('img');
            icon.src = IconsForItems[object][1];
            icon.width = "30";
            icon.height = "30";

        } else {
            icon = document.createElement('i');
            icon.classList = IconsForItems[object][1];
        }

        li.appendChild(icon);
        ul.appendChild(li);
    };
    JourneyMainInner.appendChild(h3);
    JourneyMainInner.appendChild(ul);
};

// user gets items for point
const UserGetsJourneyItems = (Items) => {
    for (let key in Items) {
        const element = Items[key]; // Amount of item , key is element name

        // console.log(key, element);

        if (key == "gems") {
            Get_XPReward_Animation(IconsForItems[key][0], IconsForItems[key][1], element / 10, key);

        } else {
            Get_XPReward_Animation(IconsForItems[key][0], IconsForItems[key][1], element, key);
        };
    };
};

// animation + save in storage
const Get_XPReward_Animation = (type, src, amount, element) => {
    // position
    let start_position = XPJourneyBtn.getBoundingClientRect();
    let destination_position = IconsForItems[element][2].getBoundingClientRect();

    let counter = 0;
    let ItemForAmount = setInterval(() => {
        counter++

        if (element == "keys") {
            let keys = parseInt(localStorage.getItem("keys"));
            localStorage.setItem("keys", keys + 1);
            KEYicon.textContent = localStorage.getItem("keys");
            mapKeyValueDisplay.textContent = localStorage.getItem("keys");

        } else if (element == 'encrypted writings') {
            let AdvantureItems = JSON.parse(localStorage.getItem("ExploredItems"));
            AdvantureItems["encryptedWriting"] = AdvantureItems["encryptedWriting"] + 1;
            localStorage.setItem("ExploredItems", JSON.stringify(AdvantureItems));
            encryptedWriting_ItemCount.textContent = parseInt(AdvantureItems["encryptedWriting"]);

        } else if (element == "gems") {
            let gems = parseInt(localStorage.getItem("GemsItem"));
            localStorage.setItem("GemsItem", gems + 10);
            gemsIcon.textContent = localStorage.getItem("GemsItem");

        } else if (element == "X") {
            let X = parseInt(localStorage.getItem("ItemX"));
            localStorage.setItem("ItemX", X + 1);
            Xicon.textContent = localStorage.getItem("ItemX");
        };

        if (type == "img") {
            var item = document.createElement('img');
            item.src = src;
            item.width = "30";
            item.height = "30";

        } else if (type == "font") {
            var item = document.createElement('span');
            item.classList = src + " floating-item";
            item.style.width = "30px"
            item.style.height = "30px"
            item.style.fontSize = "25px";
        };

        item.style.transition = "opacity 0.5s linear, top 0.5s ease-in-out, bottom 0.5s ease-in-out, left 0.5s ease-in-out, right 0.5s ease-in-out";
        item.style.color = "white";
        // declare start position for floating item
        item.style.position = "absolute";
        item.style.top = `${start_position.top}px`;
        item.style.bottom = `${start_position.bottom}px`;
        item.style.left = `${start_position.left}px`;
        item.style.right = `${start_position.right}px`;
        item.style.animation = "1s SmallToBigToSmallQuickly ease-in-out";
        item.style.zIndex = "10001";

        // animation
        setTimeout(() => {
            item.style.top = `${destination_position.top}px`;
            item.style.bottom = `${destination_position.bottom}px`;
            item.style.left = `${destination_position.left}px`;
            item.style.right = `${destination_position.right}px`;

            setTimeout(() => {
                item.style.opacity = "0";
            }, 500);

            setTimeout(() => {
                item.remove();
            }, 1400);
        }, 100);

        // add to document
        document.body.appendChild(item);

        // clear interval on max amount
        if (counter >= amount) clearInterval(ItemForAmount);
    }, 50);
};

// other events or things
JourneyQuestionBtn.addEventListener('click', () => {
    AlertText.textContent = "You can earn XP from winning a game online or on the advanture map.";
    OpenedPopUp_WhereAlertPopUpNeeded = true;
    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
});