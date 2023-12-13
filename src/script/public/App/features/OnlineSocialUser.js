// This script is all about the social interactions the user can make through user search, friends and online messages
// the functions of the main function of the three main buttons are in script.js

// Search Player elements
let SearchPlayerPopUp = document.querySelector('.SearchPlayerPopUp');
let SearchBar_searchIcon = document.querySelector('.SearchBar_searchIcon');
let SearchBar_placeholderText = document.querySelector('.SearchBar_placeholderText');
let closeSearchPlayer_Btn = document.querySelector('.closeSearchPlayer_Btn');
let FoundPlayer_List = document.querySelector('.FoundPlayer_List');

// User profile social buttons
let UserID_OfCurrentVisitedProfile; // number
let UserName_OfCurrentVisitedProfile; // String

(function InitSocialUser_btns() {
    if (localStorage.getItem("UserName")) {
        GetMessage_Btn.addEventListener('click', OpenGetMessagesPopUp);
        FriendsList_Btn.addEventListener('click', OpenFriendsListPopUp);
        SearchUser_Btn.addEventListener('click', OpenSearchUserPopUp);
    };
})();

// Automatically at the start of the app Initialize everything that needs to be initialized
(function InitData() {
    document.addEventListener("DOMContentLoaded", () => {
        // Check for messages in database
        CheckForMessages();
        InitPos_OfNotificationText(); // init pos. of position absolute elements
        // check for friend requests
        CheckForFriendRequests();
    });
})();

// search user pop up /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// close the search
const closePlayerSearch = () => {
    FoundPlayer_List.textContent = "Do you even have any real friends?";
    SearchBar_placeholderText.value = null;
};

// request player 
const RequestPlayer = () => {
    let text = SearchBar_placeholderText.value;
    console.log(text);

    if (text != "") {
        // send request to server
        try {
            socket.emit("RequestPlayers", text, localStorage.getItem("PlayerID"), localStorage.getItem("UserName"), cb = (found, result) => {
                (found) ? DisplayPlayerList(result): FoundPlayer_List.textContent = "No player found"; // result: array containing objects 
            });

        } catch (error) { // something went wrong with server request
            AlertText.textContent = "Ups! Something went wrong..";
            alertPopUp.style.display = "flex";
        };
    };
};

// Player clicks on other player when he searched him or he is in his lobby f.e
const ClickedOnPlayerInfo = (player_name, player_id, player_icon, playerInfoClass, playerInfoColor, quote, onlineGamesWon, XP, currentUsedSkin, last_connection) => {
    // check if player is friends with searched and displayed player
    try {
        AddFriend_Or_Friend_btn.style.display = "flex";
        socket.emit("CheckIfUserIsFriend", localStorage.getItem("PlayerID"), player_id, cb => {
            console.log(cb);
            if (cb) { // is friend: true
                AddFriend_Or_Friend_btn.classList = "fa-solid fa-user-check UserPopUpBtnBox";
                AddFriend_Or_Friend_btn.addEventListener('click', DeleteFriend_OpenPopUp);

                // User is only allowed to send messages to other player if they are friends together
                SendMessage_Btn.style.display = "flex";

            } else { // is no friend: false
                AddFriend_Or_Friend_btn.addEventListener('click', AddFriend_OpenPopUp);

                // No friends : no messages
                SendMessage_Btn.style.display = "none";
            };
        });

    } catch (error) {
        console.log(error);
    };

    userInfoPopUp.style.display = "flex";
    userInfoPopUp.style.zIndex = "10005";

    UserID_OfCurrentVisitedProfile = player_id;
    UserName_OfCurrentVisitedProfile = player_name;

    UserIsOnProfileFromOtherPlayer = true;

    // undisplay things so the pop up is only in "read mode"
    editUserProfileBtn.style.display = "none";
    UserQuoteSubmitBtn.style.display = "none";
    FriendsList_Btn.style.display = "none";
    SearchUser_Btn.style.display = "none";
    GetMessage_Btn.style.display = "none";

    UserLastTimeOnlineDisplay.style.display = "block";

    let date = new Date(last_connection);
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-US', options);

    userInfoName.textContent = player_name;
    UserID_display.textContent = `User ID: ${player_id}`;
    UserQuote.textContent = quote;
    userInfoOnlineMatchesWon.textContent = onlineGamesWon;
    userInfoSkillpoints.textContent = XP;
    UserLastTimeOnlineDisplay.textContent = "last time online: " + formattedDate;

    userInfoIcon.textContent = player_icon;

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

// display requested player
const DisplayPlayerList = result => { // result: array containing objects 
    FoundPlayer_List.textContent = null;

    for (let player of result) {
        let player_name = player.player_name;
        let player_id = player.player_id;
        let player_icon = player.player_icon;
        let playerInfoClass = player.playerInfoClass;
        let playerInfoColor = player.playerInfoColor;
        let quote = player.quote;
        let onlineGamesWon = player.onlineGamesWon;
        let XP = player.XP;
        let currentUsedSkin = player.currentUsedSkin;
        let last_connection = player.last_connection;

        let div = document.createElement("div");
        div.classList = `FoundPlayer ${player_name}`;
        div.id = player_id;

        div.addEventListener('click', function anonymous() {
            ClickedOnPlayerInfo(player_name, player_id, player_icon, playerInfoClass, playerInfoColor, quote, onlineGamesWon, XP, currentUsedSkin, last_connection);
        });

        let span1 = document.createElement("span"); // name of searched player
        let span2 = document.createElement("span"); // icon of searched player

        // display name
        span1.className = "PlayerName";
        span1.textContent = player_name;

        // display icon
        span2.className = "PlayerIcon";
        span2.style = "border:2px solid white;border-radius:100px;padding:5px 15px 5px 15px;";

        if (playerInfoClass == "empty") { // user has standard skin
            span2.classList = "userInfo-Icon userInfoEditable";
            span2.textContent = player_icon;
            span2.style.color = playerInfoColor;

        } else { // user has advanced skin
            span2.classList = "userInfo-Icon userInfoEditable " + playerInfoClass;
            span2.textContent = null;
            span2.style.color = "var(--font-color)";
        };

        // add to document
        div.appendChild(span1);
        div.appendChild(span2);
        FoundPlayer_List.appendChild(div);
    };
};

SearchBar_searchIcon.addEventListener('click', () => {
    RequestPlayer();
});

closeSearchPlayer_Btn.addEventListener('click', () => {
    SearchPlayerPopUp.style.display = "none";

    closePlayerSearch();
});

// on typing
SearchBar_placeholderText.addEventListener('keydown', e => {
    if (e.code == "Enter") {

        RequestPlayer();
        e.preventDefault();
    };
});

// bug fix
SearchBar_placeholderText.addEventListener('mousedrag', e => {
    e.preventDefault();
});

// FriendsList pop up //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

closeFriendsList_Btn.addEventListener("click", () => {
    FriendsListPopUp.style.display = "none";
});

// Generate friends list with data from database
const GenerateFriendsList = (data) => {
    console.log(data);
};

// Add/Delete Friend btn/pop up - Friend Requests //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// in delete friend pop up: yes and not btn

// no, not delete friend from friends list
DeleteFriendOption_NotYet.addEventListener('click', () => {
    DeleteFriend_PopUp.style.display = "none";
});

// yes, delete friend from friends list
DeleteFriendOption_Yes.addEventListener('click', () => {
    DeleteFriend_PopUp.style.display = "none";
});

// check in database for friend request and display them
const CheckForFriendRequests = () => {
    try {
        socket.emit("RequestFriendRequests", localStorage.getItem("PlayerID"), cb => {
            console.log(cb);

            if (cb) { // There are some or one friend request
                DisplayFriendRequests(cb);

            } else { // No friend requests
                Inbox_InnerWrapper.textContent = "There are no friend requests for you yet.";
            };
        });

    } catch (error) {
        console.log(error)
    };
};

// Create a friend request btn for each friend request
const DisplayFriendRequests = async(FriendRequests) => {
    for (let v of FriendRequests) {
        // get player name by player id
        let name;
        try {
            await socket.emit("GetNameByID", v, cb => {
                name = cb;

                let MainEl = document.createElement("div");

                MainEl.classList = `FriendRequest ${v}`;

                let subDiv1 = document.createElement("div");
                let subDiv2 = document.createElement("div");

                subDiv1.className = "FriendRequestData";
                subDiv2.className = "FriendRequestOptions";

                let span = document.createElement("span");
                let nonBreakingSpace = '\u00A0';
                span.textContent = "Friend Request from"
                span.append(nonBreakingSpace);

                let subsubDiv = document.createElement("div");
                subsubDiv.className = "FriendRequestFromName";
                subsubDiv.textContent = name; // v: Player name

                let i1 = document.createElement("i");
                let i2 = document.createElement("i");

                i1.classList = "fa-solid fa-check AcceptFriendRequest friendrequest_optBtn";
                i2.classList = "fa-solid fa-x AbortFriendRequest friendrequest_optBtn";

                i1.addEventListener("click", (e) => { // User accepts friend request : good
                    let v = e.target.parentNode.parentNode; // get friend request main element
                    let id = e.target.parentNode.parentNode.classList[1]; // get id of requester

                    try {
                        socket.emit("AcceptFriendRequest", id, localStorage.getItem("PlayerID"), cb => {
                            if (cb) {
                                AlertText.textContent = `${name} is now your friend!`;
                                alertPopUp.style.display = "flex";

                                v.remove();

                                AmountOfReceivedRequests--;
                                NotiOnUserInfoBtn.textContent = AmountOfReceivedMessages + AmountOfReceivedRequests;
                                InboxMessagesDisplay.textContent = AmountOfReceivedMessages + AmountOfReceivedRequests;
                                GetMessageBtn_notificationText_Display.textContent = AmountOfReceivedMessages + AmountOfReceivedRequests;

                                if ((AmountOfReceivedMessages + AmountOfReceivedRequests) <= 0) {
                                    NotiOnUserInfoBtn.style.display = "none";
                                    GetMessageBtn_notificationText_Display.style.display = "none";

                                    Inbox_InnerWrapper.textContent = "There are no friend requests for you yet.";
                                };
                            };
                        });

                    } catch (error) {
                        AlertText.textContent = "Something went wrong...";
                        alertPopUp.style.display = "flex";
                    };
                });

                i2.addEventListener("click", (e) => { // user aborts friend request : bad
                    let v = e.target.parentNode.parentNode; // get friend request main element
                    let id = e.target.parentNode.parentNode.classList[1]; // get id of requester

                    try {
                        socket.emit("AbortFriendRequest", id, localStorage.getItem("PlayerID"), cb => {
                            if (cb) {
                                v.remove();

                                AmountOfReceivedRequests--;
                                NotiOnUserInfoBtn.textContent = AmountOfReceivedMessages + AmountOfReceivedRequests;
                                InboxMessagesDisplay.textContent = AmountOfReceivedMessages + AmountOfReceivedRequests;
                                GetMessageBtn_notificationText_Display.textContent = AmountOfReceivedMessages + AmountOfReceivedRequests;

                                if ((AmountOfReceivedMessages + AmountOfReceivedRequests) <= 0) {
                                    NotiOnUserInfoBtn.style.display = "none";
                                    GetMessageBtn_notificationText_Display.style.display = "none";

                                    Inbox_InnerWrapper.textContent = "There are no friend requests for you yet.";
                                };
                            };
                        });

                    } catch (error) {
                        AlertText.textContent = "Something went wrong...";
                        alertPopUp.style.display = "block";
                    };
                });

                MainEl.appendChild(subDiv1);
                MainEl.appendChild(subDiv2);
                subDiv1.appendChild(span);
                subDiv1.appendChild(subsubDiv);
                subDiv2.appendChild(i1);
                subDiv2.appendChild(i2);

                Inbox_InnerWrapper.appendChild(MainEl);

                // About notification display
                let AmountOfRequests = FriendRequests.length;
                // global scope variable
                AmountOfReceivedRequests = AmountOfRequests;

                GetMessageBtn_notificationText_Display.style.display = "block";
                NotiOnUserInfoBtn.style.display = "block";

                GetMessageBtn_notificationText_Display.textContent = AmountOfReceivedMessages + AmountOfReceivedRequests;
                NotiOnUserInfoBtn.textContent = AmountOfReceivedMessages + AmountOfReceivedRequests;

                // Display number of messages received
                InboxMessagesDisplay.textContent = AmountOfRequests;
            });

        } catch (error) {
            console.log(error);
            continue;
        };
    };
};

// Send Message btn/pop up //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Send Message btn is only visible if players are friends so the other player accepted friend request

closeMessages_Btn.addEventListener("click", () => {
    MessagesPopUp.style.display = "none";
});

// check for messages and display messages, notification btn
const CheckForMessages = () => {
    try {
        socket.emit("RequestMessages", localStorage.getItem("PlayerID"), cb => {
            console.log(JSON.parse(cb));
            // No messages
            if (!cb || cb == "[]") {
                Messages_InnerWrapper.textContent = "There are no messages for you yet."

            } else { // messages are availible
                let messagesArray = JSON.parse(cb);
                let AmountOfMessages = messagesArray.length;
                // global scope variable
                AmountOfReceivedMessages = AmountOfMessages;

                // Display number of messages received
                AmountOfMessagesDisplay.textContent = AmountOfMessages;

                // display notification bubble text
                NotiOnUserInfoBtn.style.display = "block";
                GetMessageBtn_notificationText_Display.style.display = "flex";

                NotiOnUserInfoBtn.textContent = AmountOfReceivedMessages + AmountOfReceivedRequests;
                GetMessageBtn_notificationText_Display.textContent = AmountOfReceivedMessages + AmountOfReceivedRequests;

                // create element in messages inbox for every message
                for (let message of messagesArray) {

                    let div = document.createElement('div');
                    div.classList = `Message`;
                    div.setAttribute("text", message[1]);

                    let span = document.createElement("span");
                    span.style = "display: flex;flex-direction: row;align-items: center;";
                    span.innerHTML = "Message from &nbsp;";

                    let p = document.createElement("p");
                    p.classList = "MessageFromDisplay";
                    p.textContent = message[0]; // player name who send message

                    // Display text message on click of the small element
                    div.addEventListener('click', (el) => {
                        alertPopUp.style.display = "flex";
                        AlertText.textContent = message[1];

                        // delete element from database
                        try {
                            socket.emit("DeleteMessage", localStorage.getItem("PlayerID"), el.target.getAttribute("text"), AmountOfMessages_par => {
                                console.log(AmountOfMessages_par);
                                AmountOfMessagesDisplay.textContent = AmountOfMessages_par;
                                AmountOfReceivedMessages = parseInt(AmountOfMessages_par);

                                NotiOnUserInfoBtn.textContent = AmountOfMessages_par;
                                GetMessageBtn_notificationText_Display.textContent = AmountOfMessages_par;

                                if ((AmountOfMessages_par + AmountOfReceivedRequests) <= 0) {
                                    // undisplay notification bubble text
                                    NotiOnUserInfoBtn.style.display = "none";
                                    GetMessageBtn_notificationText_Display.style.display = "none";

                                    Messages_InnerWrapper.textContent = "There are no messages for you yet."
                                };
                            });

                        } catch (error) {
                            console.log(error);
                        };

                        // delete message from list 
                        el.target.remove();
                    });

                    // add to document
                    div.appendChild(span);
                    span.appendChild(p);
                    Messages_InnerWrapper.appendChild(div);
                };
            };
        });

    } catch (error) {
        console.log(error);
    };
};

// small red notification text on header user btn and inbox btn
const InitPos_OfNotificationText = () => {
    setTimeout(() => {
        let PositionOfUserInfoBtn = headerUserBtn.getBoundingClientRect();

        NotiOnUserInfoBtn.style.inset = `${PositionOfUserInfoBtn.top + 25}px ${PositionOfUserInfoBtn.right}px ${PositionOfUserInfoBtn.bottom}px ${PositionOfUserInfoBtn.left}px`;
        GetMessageBtn_notificationText_Display.style.right = "0";
        GetMessageBtn_notificationText_Display.style.top = "0";
        GetMessageBtn_notificationText_Display.style.margin = "0 49px 10px 0";
    }, 1000);
};

SendMessage_Btn.addEventListener('click', OpenSendMessagePopUp);

closeSendMessage_Btn.addEventListener('click', () => {
    SendMessagePopUp.style.display = "none";
});

// player clicks btn to send his message to the other player
SendMessageToPlayer_Btn.addEventListener('click', () => {
    let text = SendMessage_textArea.value;

    try {
        if (UserID_OfCurrentVisitedProfile != undefined && text != "") {
            // args: 0: ID of sender, 1: message from sender, 2: ID of receiver
            socket.emit("SendMessage_ToOtherPlayer", localStorage.getItem("PlayerID"), localStorage.getItem("UserName"), text, UserID_OfCurrentVisitedProfile, UserName_OfCurrentVisitedProfile, cb => {
                // send message to sender that message was successfully send
                if (cb) {
                    SendMessagePopUp.style.display = "none";
                    AlertText.textContent = `The message was successfully send to your friend ${cb}`;
                    alertPopUp.style.display = "flex";
                };
            });
        };

    } catch (error) {
        AlertText.textContent = "Something went wrong. Is it your connection?"
        alertPopUp.style.display = "flex";
    };
});