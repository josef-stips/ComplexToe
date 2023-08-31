// skin logic
storeIcon.addEventListener('click', () => {
    DarkLayer.style.display = 'block';

    // set back to default
    if (localStorage.getItem('UserIcon')) {
        skinBigItem.textContent = localStorage.getItem('UserIcon');
        skinShop.style.display = 'flex';
        RenderSkins();

    } else {
        alertPopUp.style.display = 'flex';
        AlertText.textContent = "Create an offline user account first";
    };
});

skinShopCloseBtn.addEventListener('click', () => {
    DarkLayer.style.display = 'none';
    skinShop.style.display = 'none';

    // set back to default
    skinBigItem.style.color = "white";
    skinPriceDisplay.textContent = `${String.fromCharCode(160)}?`;
    buySkinBtn.style.display = 'none';
    useSkinBtn.style.display = 'none';
    sidelinePrice.style.display = 'block';
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
    'chess-rook': false,
    'chess-queen': false,
    'chess-pawn': false,
    'chess-knight': false,
    'chess-king': false,
    'jedi': false,
    'fish': false,
    'crown': false,
    'spaghetti-monster-flying': false,
    'hand-fist': false
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
    'chess-rook': 'fa-solid fa-chess-rook',
    'chess-queen': 'fa-solid fa-chess-queen',
    'chess-pawn': 'fa-solid fa-chess-pawn',
    'chess-knight': 'fa-solid fa-chess-knight',
    'chess-king': 'fa-solid fa-chess-king',
    'jedi': 'fa-solid fa-jedi',
    'fish': 'fa-solid fa-fish',
    'crown': 'fa-solid fa-crown',
    'monster': 'fa-solid fa-spaghetti-monster-flying',
    'hand-fist': 'fa-solid fa-hand-fist'
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

        case 'monster':
            colorSkin("", "", skins_display['monster']);
            break;

        case 'hand-fist':
            colorSkin("", "", skins_display['hand-fist']);
            break;
    }
};

function colorSkin(UserIcon, iColor, iClass) {
    userInfoIcon.style.color = iColor;

    // add class
    if (iClass != "empty") {
        let classArray = iClass.split(" ");
        for (let i = 0; i < classArray.length; i++) {
            userInfoIcon.classList.add(classArray[i]);
        };
        userInfoIcon.textContent = null;

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

// alert pop up
closeAlertPopUpBtn.addEventListener('click', () => {
    alertPopUp.style.display = 'none';
    DarkLayer.style.display = 'none';
});