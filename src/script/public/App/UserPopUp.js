// user wants to open his own user pop-up
const OpenOwnUserProfile = () => {
    OpenedPopUp_WhereAlertPopUpNeeded = true;
    DisplayPopUp_PopAnimation(userInfoPopUp, "flex", true);

    Init_RecentUsedPatterns();

    userInfoOnlineMatchesWon.textContent = JSON.parse(localStorage.getItem('onlineMatches-won'));

    if (localStorage.getItem('UserIcon') != null) {
        editUserProfileBtn.style.display = 'initial';
    } else {
        editUserProfileBtn.style.display = 'none';
    };

    if (localStorage.getItem('UserName')) { // user has account
        userInfoName.textContent = localStorage.getItem('UserName');

        if (localStorage.getItem('userInfoClass') == "empty") {
            userInfoIcon.textContent = localStorage.getItem('UserIcon');
            userInfoIcon.className = 'userInfo-Icon userInfoEditable';

        } else {
            userInfoIcon.textContent = "";
            userInfoIcon.className = 'userInfo-Icon userInfoEditable fa-solid fa-' + localStorage.getItem('current_used_skin');
        };

        CreateOnlineProfileBtn.style.display = 'none';
        UserInfoCont.style.display = 'flex';

        let mostUsedPattern = Init_RecentUsedPatterns();

        // Try to send data to the server
        try {
            socket.emit("SaveAllData", localStorage.getItem('UserName'), localStorage.getItem('UserIcon'),
                localStorage.getItem('userInfoClass'), localStorage.getItem('userInfoColor'), localStorage.getItem('UserQuote'),
                JSON.parse(localStorage.getItem('onlineMatches-won')), localStorage.getItem('ELO'),
                localStorage.getItem('current_used_skin'), localStorage.getItem("PlayerID"), mostUsedPattern);

        } catch (error) {
            console.log(error);
        };

    } else { // user has not an account
        userInfoName.textContent = "";
        userInfoIcon.textContent = "";

        CreateOnlineProfileBtn.style.display = 'block';
        UserInfoCont.style.display = 'none';
    };

    userInfoClanDisplay(JSON.parse(localStorage.getItem("clan_member_data")));
};

headerUserBtn.addEventListener('click', () => {
    OpenOwnUserProfile();
});

// close user pop up of other player
const CloseUserPopUpOfOtherPlayer = () => {
    OpenedPopUp_WhereAlertPopUpNeeded = false;
    UserIsOnProfileFromOtherPlayer = false;
    userInfoPopUp.style.zIndex = "10001";

    UserID_OfCurrentVisitedProfile = undefined;
    UserName_OfCurrentVisitedProfile = undefined;

    editUserProfileBtn.style.display = "initial";
    UserQuoteSubmitBtn.style.display = "block";
    FriendsList_Btn.style.display = "flex";
    SearchUser_Btn.style.display = "flex";
    GetMessage_Btn.style.display = "flex";

    // console.log(running, personal_GameData.role);
    if (!running) {

        if (personal_GameData.currGameID != null) {
            DarkLayer.style.display = "block";

        } else {
            DarkLayer.style.display = "block";
        };

        if (SearchPlayerPopUp.style.display == "flex" || FriendsListPopUp.style.display == "flex") {
            DarkLayer.style.display = "block"
        };

    } else {
        DarkLayer.style.display = "none"
    };

    if (SearchPlayerPopUp.style.display == "flex" || FriendsListPopUp.style.display == "flex") {
        DarkLayer.style.display = "block"
    };

    if (getComputedStyle(OnlineGame_Lobby).display == "flex") DarkLayer.style.display = "none";

    UserLastTimeOnlineDisplay.style.display = "none";
    SendMessage_Btn.style.display = "none";
    AddFriend_Or_Friend_btn.style.display = "none";

    userInfoName.textContent = localStorage.getItem("UserName");
    UserID_display.textContent = "User ID: " + localStorage.getItem("PlayerID");
    (localStorage.getItem("UserQuote")) ? UserQuote.textContent = localStorage.getItem("UserQuote"): UserQuote.textContent = null;
    userInfoOnlineMatchesWon.textContent = localStorage.getItem("onlineMatches-won");
    userInfoSkillpoints.textContent = localStorage.getItem("ELO");

    if (localStorage.getItem("userInfoClass") == "empty") { // user has standard skin
        userInfoIcon.classList = "userInfo-Icon userInfoEditable";
        userInfoIcon.textContent = localStorage.getItem("UserIcon");
        userInfoIcon.style.color = localStorage.getItem("UserInfoColor");

    } else { // user has advanced skin
        userInfoIcon.classList = "userInfo-Icon userInfoEditable " + localStorage.getItem("userInfoClass");
        userInfoIcon.textContent = null;
        userInfoIcon.style.color = "var(--font-color)";
    };

    // if user is in lobby or in online game
    // if (personal_GameData.currGameID != null || running) {
    userInfoPopUp.style.display = "none";
    // };

    let commonPattern = Init_RecentUsedPatterns();

    // users most used pattern
    userInfo_MostUsedPattern.textContent = commonPattern;
};

// try to close user info pop up through event clicks f.ex
const TryToCloseUserInfoPopUp = () => {
    OpenedPopUp_WhereAlertPopUpNeeded = false;
    userInfoPopUp.style.zIndex = "10001";

    if (!UserIsOnProfileFromOtherPlayer) { // user was on his own profile
        if (userInfoName.textContent != "" && userInfoIcon.textContent !== "" || userInfoName.textContent != "" && localStorage.getItem('UserIcon') != "" ||
            localStorage.getItem('UserIcon') == null) {

            // console.log(running, personal_GameData.role);
            if (!running) {
                if (personal_GameData.currGameID != null) {
                    DarkLayer.style.display = "block";

                } else {
                    DarkLayer.style.display = "none";
                };

            } else {
                DarkLayer.style.display = "none"
            };

            if (getComputedStyle(OnlineGame_Lobby).display == "flex") DarkLayer.style.display = "none";

            if (!UserIsOnProfileFromOtherPlayer) userInfoPopUp.style.display = 'none';

            if (userInfoIcon.textContent !== "") {
                localStorage.setItem('UserIcon', userInfoIcon.textContent);
            };

            if (localStorage.getItem('UserIcon') != null) {
                localStorage.setItem('UserName', userInfoName.textContent);
            };

            UserQuote.contentEditable = "false";
            UserEditsQuote = false;
            UserQuoteSubmitBtn.textContent = "Edit";
            (localStorage.getItem("UserQuote")) ? UserQuoteSubmitBtn.textContent = "Edit": UserQuoteSubmitBtn.textContent = "Create a quote";
            (localStorage.getItem("UserQuote")) ? UserQuote.innerHTML = localStorage.getItem("UserQuote"): UserQuoteSubmitBtn.textContent = "Create a quote";
        };

        // if player visited profile from other player
    } else if (UserIsOnProfileFromOtherPlayer) {
        CloseUserPopUpOfOtherPlayer();
    };

    if (getComputedStyle(clan_overview_pop_up).display == "flex" ||
        getComputedStyle(comments_pop_up).display == "flex" ||
        getComputedStyle(scoreboard_pop_up).display == "flex" ||
        getComputedStyle(SearchPlayerPopUp).display == "flex" ||
        getComputedStyle(FriendsListPopUp).display == "flex" ||
        getComputedStyle(gameLog_popUp).display != "none" ||
        getComputedStyle(current_games_pop_up).display != "none" ||
        getComputedStyle(tournament_pop_up).display != "none") {

        DarkLayer.style.display = "block";

    } else {
        DarkLayer.style.display = "none";
    };
};

userInfoCloseBtn.addEventListener('click', () => {
    TryToCloseUserInfoPopUp();
});

editUserProfileBtn.addEventListener('click', () => {
    TryToCloseUserInfoPopUp();
    DisplayPopUp_PopAnimation(UserGivesData_PopUp_name, "flex", true);
    UserGivesData_NameInput.focus();
});

CreateOnlineProfileBtn.addEventListener('click', () => {
    userInfoPopUp.style.display = "none";
    DisplayPopUp_PopAnimation(UserGivesData_PopUp_name, "flex", true);
    UserGivesData_NameInput.focus();
});

// Input on user name
UserGivesData_NameInput.addEventListener('keydown', e => {
    const inputValue = e.target.value;
    const validInput = inputValue.replace(/[^A-Za-z0-9]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        e.target.value = validInput;
    };

    if (e.key === 'Enter') {
        e.preventDefault();

        if (UserGivesData_NameInput.value != "" && UserGivesData_NameInput.value != "false") {
            UserGivesData_PopUp_name.style.display = "none";
            DisplayPopUp_PopAnimation(UserGivesData_PopUp_icon, "flex");
            UserGivesData_IconInput.focus();

            userName = UserGivesData_NameInput.value;
        };
    };

    if (e.which === 32) {
        e.preventDefault();
    };
});

// Input on user icon
UserGivesData_IconInput.addEventListener('keydown', e => {
    const inputValue = e.target.value;
    const validInput = inputValue.replace(/[^A-Za-z0-9]/g, ""); // Entfernen Sie alle Zeichen außer Buchstaben

    if (inputValue !== validInput) {
        // Wenn ungültige Zeichen eingegeben wurden, setzen Sie das Eingabefeld auf den gültigen Wert
        e.target.value = validInput;
    };

    if (e.key === 'Enter') {
        e.preventDefault();

        if (UserGivesData_IconInput.value != "" && UserGivesData_IconInput.value != "false") {
            userIcon = UserGivesData_IconInput.value.toUpperCase();

            // store data in storage
            submittedOfflineData();

            // general stuff
            UserGivesData_PopUp_icon.style.display = "none";
            CreateOnlineProfileBtn.style.display = 'none';
            userInfoPopUp.style.display = 'flex';
            UserInfoCont.style.display = "flex";

            clickEnter_text.style.display = 'none';
            editUserProfileBtn.style.display = 'initial';

            // User gets access to online social activities
            GetMessage_Btn.style.color = "white";
            GetMessage_Btn.style.borderColor = "white";
            FriendsList_Btn.style.color = "white";
            FriendsList_Btn.style.borderColor = "white";
            SearchUser_Btn.style.color = "white";
            SearchUser_Btn.style.borderColor = "white";

            GetMessage_Btn.addEventListener('click', OpenGetMessagesPopUp);
            FriendsList_Btn.addEventListener('click', OpenFriendsListPopUp);
            SearchUser_Btn.addEventListener('click', OpenSearchUserPopUp);

            OpenOwnUserProfile();
            load_cardsClick();
        };
    };

    if (e.which === 32) {
        e.preventDefault();
    };
});

// user closes pop up and aborts giving data
UserGivesData_closeBtn_NAME.addEventListener('click', () => { // for name
    userName = "";
    UserGivesData_NameInput.value = null;
    UserGivesData_PopUp_name.style.display = "none";
    DarkLayer.style.display = "none";
});

// for icon 
UserGivesData_closeBtn_ICON.addEventListener('click', () => {
    userIcon = "";
    UserGivesData_NameInput.value = null;
    UserGivesData_IconInput.value = null;
    UserGivesData_PopUp_icon.style.display = "none";
    DarkLayer.style.display = "none";
});

// user submits his simple offline data
function submittedOfflineData() {
    localStorage.setItem('UserName', userName);
    localStorage.setItem('UserIcon', userIcon);

    try {
        // send name to server, server sends it to database, store in database
        socket.emit("sendNameToDatabase", localStorage.getItem('PlayerID'), localStorage.getItem('UserName'), localStorage.getItem("UserIcon"),
            localStorage.getItem('userInfoClass'), localStorage.getItem("userInfoColor"));
    } catch (error) {
        console.error(error);
    };

    userInfoName.textContent = localStorage.getItem('UserName');
    UserID_display.textContent = "User ID: " + localStorage.getItem("PlayerID");

    // user uses just a skin color
    if (localStorage.getItem(`userInfoClass`) == "empty") {

        userInfoIcon.textContent = localStorage.getItem('UserIcon');
    } else { // user uses an advanced skin => do nothing
        return
    };
};