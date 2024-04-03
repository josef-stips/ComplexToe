// skin logic
storeIcon.addEventListener('click', () => {
    DarkLayer.style.display = 'block';

    // set back to default
    if (localStorage.getItem('UserIcon')) {
        skinBigItem.textContent = localStorage.getItem('UserIcon');
        DisplayPopUp_PopAnimation(skinShop, "flex");
        RenderSkins();

        displayUserName(skinUserNameDisplay);
        displaySkinShopCurrency();

        playShopTheme();
        ShopGuideTextInterval();

    } else {
        alertPopUp.style.display = 'flex';
        AlertText.textContent = "Create an user account first";
    };
});

skinShopCloseBtn.addEventListener('click', () => {
    DarkLayerAnimation(document.createElement("div"), skinShop).then(() => {
        // set back to default
        skinBigItem.style.color = "white";
        skinPriceDisplay.textContent = `${String.fromCharCode(160)}?`;
        buySkinBtn.style.display = 'none';
        useSkinBtn.style.display = 'none';
        sidelinePrice.style.display = 'block';

        playGameTheme();
        resetGuidingText();
    });
});

let selected_skin = {
    name: '',
    skin_type: '', // color or skin
    price: '', // how much the skin costs
    price_type: '' // Does the skin costs gems or X?
};

// All skins
// This object checks which skin the user already has
let skins = {
    'skin-default': true,
    'skin-blue': false,
    'skin-green': false,
    'skin-purple': false,
    'skin-lightBlue': false,
    'skin-lightGreen': false,
    'skin-pink': false,
    'skin-yellow': false,
    'skin-orange': false,
    'skin-teal': false,
    'skin-red': false,
    'skin-goldenrod': false,
    'skin-darkslateblue': false,
    'skin-silver': false,
    'skin-olive': false,
    'skin-mediumpurple': false,
    'skin-crimson': false,
    'skin-lightslategrey': false,
    'skin-rosybrown': false,
    'skin-tomato': false,
    'chess-rook': false,
    'chess-queen': false,
    'chess-pawn': false,
    'chess-knight': false,
    'chess-king': false,
    'jedi': false,
    'fish': false,
    'crown': false,
    'spaghetti-monster-flying': false,
    'hand-fist': false,
    'heart': false,
    'bug': false,
    'handshake': false,
    'thumbs-up': false,
    'face-smile': false
};

let skins_display = {
    'skin-default': 'var(--font-color)',
    'skin-blue': 'rgb(30, 77, 138)',
    'skin-green': 'rgb(38, 138, 38)',
    'skin-purple': 'rgb(128, 14, 128)',
    'skin-lightBlue': 'rgb(133, 190, 209)',
    'skin-lightGreen': 'rgb(132, 221, 132)',
    'skin-pink': 'rgb(228, 163, 174)',
    'skin-yellow': 'rgb(216, 216, 46)',
    'skin-orange': 'orangered',
    'skin-teal': 'teal',
    'skin-red': 'red',
    'skin-goldenrod': 'goldenrod',
    'skin-darkslateblue': 'darkslateblue',
    'skin-silver': 'silver',
    'skin-olive': 'olive',
    'skin-mediumpurple': 'mediumpurple',
    'skin-crimson': 'crimson',
    'skin-lightslategrey': 'lightslategrey',
    'skin-rosybrown': 'rosybrown',
    'skin-tomato': 'tomato',
    'chess-rook': 'fa-solid fa-chess-rook',
    'chess-queen': 'fa-solid fa-chess-queen',
    'chess-pawn': 'fa-solid fa-chess-pawn',
    'chess-knight': 'fa-solid fa-chess-knight',
    'chess-king': 'fa-solid fa-chess-king',
    'jedi': 'fa-solid fa-jedi',
    'fish': 'fa-solid fa-fish',
    'crown': 'fa-solid fa-crown',
    'spaghetti-monster-flying': 'fa-solid fa-spaghetti-monster-flying',
    'hand-fist': 'fa-solid fa-hand-fist',
    'heart': 'fa-solid fa-heart',
    'bug': 'fa-solid fa-bug',
    'handshake': 'fa-solid fa-handshake',
    'thumbs-up': 'fa-solid fa-thumbs-up',
    'face-smile': 'fa-solid fa-face-smile'
};

let current_used_skin = '';

// Initialize skins 
(Init_Skins = () => {
    let Skins = JSON.parse(localStorage.getItem('Skins'));
    let current_used_skin = localStorage.getItem('current_used_skin');
    let UserIcon = localStorage.getItem('UserIcon');

    if (Skins) {
        skins = Skins;
    };

    switch_skins(current_used_skin, UserIcon);
})();

function switch_skins(current_used_skin, UserIcon) {
    switch (current_used_skin) {
        case 'skin-default':
            colorSkin(UserIcon, skins_display['skin-default'], "empty");
            break;

        case 'skin-yellow':
            colorSkin(UserIcon, skins_display['skin-yellow'], "empty");
            break;

        case 'skin-teal':
            colorSkin(UserIcon, skins_display['skin-teal'], "empty");
            break;

        case 'skin-red':
            colorSkin(UserIcon, skins_display['skin-red'], "empty");
            break;

        case 'skin-orange':
            colorSkin(UserIcon, skins_display['skin-orange'], "empty");
            break;

        case 'skin-pink':
            colorSkin(UserIcon, skins_display['skin-pink'], "empty");
            break;

        case 'skin-lightBlue':
            colorSkin(UserIcon, skins_display['skin-lightBlue'], "empty");
            break;

        case 'skin-lightGreen':
            colorSkin(UserIcon, skins_display['skin-lightGreen'], "empty");
            break;

        case 'skin-purple':
            colorSkin(UserIcon, skins_display['skin-purple'], "empty");
            break;

        case 'skin-green':
            colorSkin(UserIcon, skins_display['skin-green'], "empty");
            break;

        case 'skin-blue':
            colorSkin(UserIcon, skins_display['skin-blue'], "empty");
            break;

        case 'skin-goldenrod':
            colorSkin(UserIcon, skins_display['skin-goldenrod'], "empty");
            break;

        case 'skin-darkslateblue':
            colorSkin(UserIcon, skins_display['skin-darkslateblue'], "empty");
            break;

        case 'skin-silver':
            colorSkin(UserIcon, skins_display['skin-silver'], "empty");
            break;

        case 'skin-olive':
            colorSkin(UserIcon, skins_display['skin-olive'], "empty");
            break;

        case 'skin-mediumpurple':
            colorSkin(UserIcon, skins_display['skin-mediumpurple'], "empty");
            break;

        case 'skin-crimson':
            colorSkin(UserIcon, skins_display['skin-crimson'], "empty");
            break;

        case 'skin-lightslategrey':
            colorSkin(UserIcon, skins_display['skin-lightslategrey'], "empty");
            break;

        case 'skin-rosybrown':
            colorSkin(UserIcon, skins_display['skin-rosybrown'], "empty");
            break;

        case 'skin-tomato':
            colorSkin(UserIcon, skins_display['skin-tomato'], "empty");
            break;

        case 'chess-rook':
            colorSkin("", "", skins_display['chess-rook']);
            break;

        case 'chess-queen':
            colorSkin("", "", skins_display['chess-queen']);
            break;

        case 'chess-pawn':
            colorSkin("", "", skins_display['chess-pawn']);
            break;

        case 'chess-knight':
            colorSkin("", "", skins_display['chess-knight']);
            break;

        case 'chess-king':
            colorSkin("", "", skins_display['chess-king']);
            break;

        case 'jedi':
            colorSkin("", "", skins_display['jedi']);
            break;

        case 'fish':
            colorSkin("", "", skins_display['fish']);
            break;

        case 'crown':
            colorSkin("", "", skins_display['crown']);
            break;

        case 'spaghetti-monster-flying':
            colorSkin("", "", skins_display['spaghetti-monster-flying']);
            break;

        case 'hand-fist':
            colorSkin("", "", skins_display['hand-fist']);
            break;

        case 'heart':
            colorSkin("", "", skins_display['heart']);
            break;

        case 'bug':
            colorSkin("", "", skins_display['bug']);
            break;

        case 'handshake':
            colorSkin("", "", skins_display['handshake']);
            break;

        case 'thumbs-up':
            colorSkin("", "", skins_display['thumbs-up']);
            break;

        case 'face-smile':
            colorSkin("", "", skins_display['face-smile']);
            break;
    };
};

function colorSkin(UserIcon, iColor, iClass) {
    userInfoIcon.style.color = iColor;

    // add class
    if (iClass != "empty") {
        let classArray = iClass.split(" ");
        for (let i = 0; i < classArray.length; i++) {
            userInfoIcon.classList.add(classArray[i]);
        };
        userInfoIcon.textContent = "";

    } else {
        userInfoIcon.textContent = UserIcon;
        userInfoIcon.classList.remove(userInfoIcon.classList[userInfoIcon.classList.length - 1]);
        userInfoIcon.classList.remove(userInfoIcon.classList[userInfoIcon.classList.length - 1]);
    };

    if (UserIcon != "" && localStorage.getItem('UserIcon')) {
        localStorage.setItem('UserIcon', UserIcon);
    };

    localStorage.setItem('userInfoColor', iColor);
    localStorage.setItem('userInfoClass', iClass);
};

function RenderSkins() {
    skinToSelect.forEach(skin => {
        // All the color skins to user skin icon
        if (skin.getAttribute('skin-type') == 'skin-color') {
            if (localStorage.getItem('UserIcon')) {
                skin.textContent = localStorage.getItem('UserIcon');
            } else {
                skin.textContent = 'X';
            };
        };

        // underline every skin the user has with a green border
        let ObjCounter = 0;
        for (const k in skins) {
            if (skins.hasOwnProperty.call(skins, k)) {
                const element = skins[k];
                const key = Object.keys(skins)[ObjCounter];

                if (element == true && key == skin.getAttribute('name')) {
                    skin.style.borderBottom = "4px solid green";
                };

                ObjCounter++;
            };
        };

        // display current selected skin first
        sidelinePrice.style.display = 'none';
        skinPriceDisplay.textContent = 'This is your current skin';
        if (skin.getAttribute('name') == localStorage.getItem('current_used_skin')) {
            skin.style.borderBottom = "4px solid royalblue";
            skinBigItem.style.color = localStorage.getItem('userInfoColor');

            if (skin.getAttribute('skin-type') == 'skin') {
                let classes = localStorage.getItem('userInfoClass');
                let classArray = classes.split(" ");
                for (let i = 0; i < classArray.length; i++) {
                    skinBigItem.classList.add(classArray[i]);
                    skinBigItem.textContent = null;
                };
            } else {
                skinBigItem.textContent = localStorage.getItem('UserIcon');
            };
        };

        // handle click event
        skin.addEventListener('click', (e) => {
            let curr_skin = e.target;

            if (skinBigItem.classList[1] == "fa-solid") {
                skinBigItem.classList.remove(skinBigItem.classList[skinBigItem.classList.length - 1]);
                skinBigItem.classList.remove(skinBigItem.classList[skinBigItem.classList.length - 1]);
            };

            selected_skin.skin_type = curr_skin.getAttribute('skin-type');
            selected_skin.price_type = curr_skin.getAttribute('item-type');
            selected_skin.price = curr_skin.getAttribute('price');
            selected_skin.name = curr_skin.getAttribute('name');

            // change skin color
            if (curr_skin.getAttribute('skin-type') == 'skin-color') {
                skinBigItem.style.color = curr_skin.getAttribute('skin-color');

                if (localStorage.getItem('UserIcon') != undefined && localStorage.getItem('UserIcon') != null && localStorage.getItem('UserIcon') != "") {
                    skinBigItem.textContent = localStorage.getItem('UserIcon');
                } else {
                    skinBigItem.textContent = 'X';
                };

            } else if (curr_skin.getAttribute('skin-type') == 'skin') {
                let i = document.createElement('i');
                i.classList = curr_skin.classList;

                skinBigItem.style.color = "var(--font-color)";
                skinBigItem.textContent = '';
                skinBigItem.appendChild(i);
            };

            // If user does not have the skin
            if (skins[curr_skin.getAttribute('name')] == false) {
                useSkinBtn.style.display = 'none';
                buySkinBtn.style.display = 'block';
                sidelinePrice.style.display = 'block';

                // textContent for price
                skinPriceDisplay.textContent = null;
                if (curr_skin.getAttribute('item-type') == 'gem') { // if the product needs to be bought with gems
                    let i = document.createElement('i');
                    let span = document.createElement('span');

                    span.textContent = `${String.fromCharCode(160)} ${curr_skin.getAttribute('price')} `;
                    i.classList = "fa-solid fa-gem";

                    skinPriceDisplay.appendChild(span);
                    skinPriceDisplay.appendChild(i);

                } else { // if the product needs to be bought with X items
                    let i = document.createElement('i');
                    let span = document.createElement('span');

                    span.textContent = `${String.fromCharCode(160)} ${curr_skin.getAttribute('price')} `;
                    i.classList = "fa-solid fa-x";

                    skinPriceDisplay.appendChild(span);
                    skinPriceDisplay.appendChild(i);
                };

            } else {
                sidelinePrice.style.display = 'none';
                skinPriceDisplay.textContent = 'This skin is owned by you';
                buySkinBtn.style.display = 'none';
                useSkinBtn.style.display = 'block';

                // if the skin the user clicked on is the skin he uses at the moment
                if (curr_skin.getAttribute('name') == localStorage.getItem('current_used_skin')) {;
                    useSkinBtn.style.display = 'none';
                    skinPriceDisplay.textContent = 'This is your current skin';

                } else {
                    useSkinBtn.style.display = 'block';
                };
            };
        });
    });
};

buySkinBtn.addEventListener('click', tryToBuySkin);

function tryToBuySkin() {
    // The user selected something
    if (selected_skin.price != '') {
        // chech which currency ? gems or X
        if (selected_skin.price_type == 'gem') {
            let gems = parseInt(localStorage.getItem('GemsItem'));
            // check if user has enough to buy it
            if (gems >= parseInt(selected_skin.price)) {
                buySkin(gems, 'GEMS');

            } else {
                // warn text + animation
                BuySkinError.style.transition = 'none';
                BuySkinError.style.display = 'block';
                BuySkinError.style.opacity = '1';

                setTimeout(() => {
                    BuySkinError.style.transition = 'all 2s ease';
                    BuySkinError.style.opacity = '0';

                }, 1000);
            };

        } else {
            let x = parseInt(localStorage.getItem('ItemX'));
            // check if user has enough to buy it
            if (x >= parseInt(selected_skin.price)) {
                buySkin(x, 'X');

            } else {
                // warn text + animation
                BuySkinError.style.transition = 'none';
                BuySkinError.style.display = 'block';
                BuySkinError.style.opacity = '1';

                setTimeout(() => {
                    BuySkinError.style.transition = 'all 2s ease';
                    BuySkinError.style.opacity = '0';
                }, 1000);
            };
        };
    };
};

// user buyed skin
function buySkin(user_currency_amount, currency) {
    let price = selected_skin.price;
    let new_user_currency_amount = user_currency_amount - price;

    if (currency == 'X') {
        localStorage.setItem('ItemX', new_user_currency_amount);
        Xicon.textContent = new_user_currency_amount;

    } else {
        localStorage.setItem('GemsItem', new_user_currency_amount);
        gemsIcon.textContent = new_user_currency_amount;
    };

    // for achievements
    let SkinsCopy = {...skins };
    delete SkinsCopy["skin-default"];
    let allFalse = Object.values(SkinsCopy).every(value => value === false);
    // console.log(allFalse, skins, SkinsCopy);
    if (allFalse && !localStorage.getItem("UserBoughtSkinForTheFirstTime")) {
        Achievement.new(13);
    };

    skins[selected_skin.name] = true;
    localStorage.setItem('Skins', JSON.stringify(skins));

    sidelinePrice.style.display = 'none';
    skinPriceDisplay.textContent = 'This skin is owned by you';
    buySkinBtn.style.display = 'none';
    useSkinBtn.style.display = 'block';

    skinToSelect.forEach(skin => {
        if (skin.getAttribute('name') == selected_skin.name) {
            skin.style.borderBottom = "4px solid green";
        };
    });

    displaySkinShopCurrency();
};

useSkinBtn.addEventListener('click', () => {
    skinToSelect.forEach(skin => {
        if (skin.getAttribute('name') == localStorage.getItem('current_used_skin')) {
            skin.style.borderBottom = "4px solid green";
        };
    });

    current_used_skin = selected_skin.name;
    localStorage.setItem('current_used_skin', current_used_skin);
    skinPriceDisplay.textContent = 'This is your current skin';

    switch_skins(current_used_skin, localStorage.getItem('UserIcon'));

    useSkinBtn.style.display = 'none';

    skinToSelect.forEach(skin => {
        if (skin.getAttribute('name') == current_used_skin) {
            skin.style.borderBottom = "4px solid royalblue";
        };
    });
});

// display users currency for buying skins
const displaySkinShopCurrency = () => {
    gemsIcon_skinShop.textContent = localStorage.getItem("GemsItem");
    xIcon_skinShop.textContent = localStorage.getItem("ItemX");
    KEYicon_skinShop.textContent = localStorage.getItem("keys");
};

// tab system
(function TabSystem() {
    let skinShopTabs = document.querySelectorAll(".skinShopTab");
    let skinShopContent = document.querySelectorAll(".skinShop_tab_content");

    closeAllTabViews([...skinShopContent]);
    displayTabContentViewX([...skinShopContent], 0);

    [...skinShopTabs].forEach((tab, i) => {
        tab.addEventListener("click", () => {
            // close all tabs first of all
            closeAllTabViews([...skinShopContent]);

            displayTabContentViewX([...skinShopContent], i);

            // active status of tab element
            [...skinShopTabs].forEach(tab1 => {
                tab1.setAttribute("active_tap", "false");
            });

            tab.setAttribute("active_tap", "true");
        });
    })
})();

function closeAllTabViews(contentsElements) {
    contentsElements.forEach(content => {
        content.style.display = "none";
    });
};

function displayTabContentViewX(contentsElements, content) {
    contentsElements[content].style.display = "flex";
};

// shop guide text functionality
let shopGuideTextInterval = null;

const statements = [
    "You want some toilet paper?",
    "The guy in the top left corner is kinda weird.",
    "Choose something, my fellow soldier.",
    "Do you think this is more important than going outside?",
    "Beware of the invisible ninjas in the next aisle.",
    "Don't trust the one that winks at you.",
    "The secret to winning battles? Fashion, my friend.",
    "Do these make me look mysterious?",
    "Some say these have magical powers. Care to test?",
    "They have eyes, you know.",
    "Why do never get tired? Eternal beauty, my friend.",
    "If you listen closely, they whisper your destiny.",
    "Ever danced with one in the pale moonlight?",
    "I bet these have their own secret society.",
    "What if I told you these hold the key to the universe?",
    "The one you choose reflects your spirit animal.",
    "Beware of imposter ones!",
    "Rumor has it, they have a secret dance party at midnight.",
    "This once defeated a dragon in a staring contest.",
    "They are watching. Always watching.",
    "I heard these were forged by ancient aliens.",
    "Choose wisely. The one you pick may choose you back.",
    "I dare you to wear this and shout 'I am the chosen one!'",
    "Some have PhDs in quantum mechanics. True story.",
    "They are like a box of chocolates. You never know what you're gonna get.",
    "If could talk, they'd probably tell really bad jokes.",
    "The secret to immortality lies within these.",
    "I once arm-wrestled one and lost. It was embarrassing.",
    "Wearing increases your charisma by 300%.",
    "They have a fan club. You should join.",
    "I asked for fashion advice, and now I'm fabulous.",
    "Roses are red, violets are blue, these are cool, and so are you.",
    "This was once worn by a famous space pirate. No, seriously.",
    "If you stare at them long enough, they start staring back.",
    "Legend has it, they can predict the weather.",
    "They have their own language. It's called 'fashionese.'",
    "I bet these can breakdance. Want to see?",
    "These were blessed by a fashion wizard.",
    "Wear this and you'll instantly become the life of the party.",
    "I overheard them plotting world domination. Just kidding.",
    "This comes with a free imaginary pet. It's called Fluffernutter.",
    "They have their own theme song. It goes like this... (humming)",
    "This once starred in a blockbuster movie. No spoilers, though.",
    "These are like a fine wine. They get better with time.",
    "I challenged one to a dance-off. Let's just say, it's undefeated.",
    "They told me a secret, but I can't share it. They'd disown me.",
    "Wearing grants you the power of teleportation. Not really.",
    "They are the real MVPs of the fashion world.",
    "I once saw a ghost wearing one. Spooky, right?",
    "They have a secret handshake. It's very exclusive.",
    "I asked for the meaning of life. They just shrugged.",
    "This is like a rare Pokémon. Gotta catch 'em all!",
    "I challenged one to a staring contest. It blinked first.",
    "These are so stylish, even the mannequins envy them.",
    "They have a black belt in fashion. Watch out!",
    "I tried to interview one once, but it spoke in riddles.",
    "Wear this, and you'll become an honorary member of the Fashion Police.",
    "They have a deep philosophical debate every night. I eavesdrop.",
    "This once traveled through time. It came back with great fashion tips.",
    "I asked for directions once. They led me to the coolest party.",
    "These are like the Avengers of the fashion world.",
    "This once threw a surprise party for me. It was unexpected.",
    "This has its own fan club. I'm the president, of course.",
    "I asked for relationship advice. They said, 'Dress to impress.'",
    "Wear this, and you'll instantly become the talk of the town.",
    "They once held a summit to discuss world peace. It didn't work.",
    "I challenged one to a rap battle. Let's just say, it dropped some sick beats.",
    "These have their own constellation in the fashion galaxy.",
    "They have a secret hideout. It's in the trendiest part of town.",
    "This once saved a cat stuck in a tree. True hero.",
    "Wearing grants you the ability to speak fluent fashion.",
    "They once threw a masquerade ball. I was the only one without a mask.",
    "I asked for financial advice. They said, 'Invest in fabulousness.'",
    "This has a built-in GPS. It always leads you to the hottest spots.",
    "They have their own reality show. It's called 'Fashion Frenzy.'",
    "Wear this, and you'll become the envy of mannequins everywhere.",
    "They once had a dance-off with aliens. It was out of this world.",
    "I tried to challenge one to a chess match. It made all the right moves.",
    "These have their own fan fiction. It's a bestseller.",
    "They once hosted a cooking show. It was all about spicy fashion.",
    "This once starred in a music video. It went viral.",
    "Wearing grants you the power to charm even the grumpiest cat.",
    "They once threw a pool party. It was a splashy affair.",
    "I asked for advice on parallel parking. They said, 'Just look fabulous.'",
    "This is like a superhero cape. It gives you the power to defy fashion norms.",
    "Have you ever tried putting socks on your hands? It's surprisingly comfortable.",
    "I once saw a chicken cross the road. It didn't explain why.",
    "If a tree falls in a forest and no one is around to hear it, do they still look fabulous?",
    "Do you believe in time travel? I wore this in the 1800s. Good times.",
    "They say laughter is the best medicine. These are a close second.",
    "I tried to teach them to juggle. They weren't interested.",
    "Did you know that pineapples are berries, but strawberries aren't? Makes you think, right?",
    "I asked for their favorite color. They whispered 'plaid.'",
    "I once challenged a mirror to a staring contest. It copied my every move.",
    "What if clouds are just marshmallows floating in the sky?",
    "I told a joke to one once. It didn't laugh. Tough crowd.",
    "If you rearrange the letters in 'skins,' you get 'sinks.' Coincidence? I think not.",
    "I tried to have a philosophical discussion with them. They just said 'Meow.'",
    "Do you believe in ghosts? I think they do.",
    "I asked for directions to the moon. They said, 'Take a left at the Milky Way.'",
    "I once tried to have a deep conversation with a potato. They listened more attentively.",
    "If you see a turtle wearing a sombrero, tell it I said 'Hola.'",
    "What if our reflections are actually the real us, and we're the reflections?",
    "I challenged a fish to a dance-off once. It had better moves than them.",
    "I asked for the meaning of life. They said, 'Buy more.'",
    "If I had a dollar for every time I lost a sock in the laundry, I could buy all these.",
    "I tried to have a staring contest with the sun. They warned me against it.",
    "Do you ever wonder if cats have secret societies plotting world domination?",
    "I asked for relationship advice. They said, 'Just be yourself, unless you can be a unicorn.'",
    "What if mirrors are just portals to alternate dimensions?",
    "I challenged a snail to a race. It was neck-and-neck until it took a nap.",
    "I once tried to explain the concept of time to them. They just blinked.",
    "If you could choose any superpower, would you pick the ability to change colors at will?",
    "I asked for the cure to boredom. They said, 'Buy more.'",
    "Do you think plants have feelings? I tried asking them, but they remained silent.",
];

function ShopGuideTextInterval() {
    resetGuidingText();

    shopGuideTextInterval = setInterval(() => {
        let rnd = Math.floor(Math.random() * 100);

        shopGuideText.textContent = statements[rnd];
    }, 9000);
};

function resetGuidingText() {
    shopGuideText.textContent = "hey guy!"
    clearInterval(shopGuideTextInterval);
    shopGuideTextInterval = null;
};