// Mail
MailCloseBtn.addEventListener('click', () => {
    DarkLayer.style.display = "none";
    MailPopUp.style.display = "none";
});

MailInput_Message.addEventListener('mousedown', function(event) {
    event.preventDefault(); // Verhindert die Auswahl beim Klicken
});

MailInput_Name.addEventListener('mousedown', function(event) {
    event.preventDefault(); // Verhindert die Auswahl beim Klicken
});

MailInput_Message.addEventListener('click', function(event) {
    MailInput_Message.focus();
});

MailInput_Name.addEventListener('click', function(event) {
    MailInput_Name.focus();
});

MailInput_Message.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp") {
        MailInput_Name.focus();
    };
});

MailInput_Name.addEventListener('keydown', (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter") {
        MailInput_Message.focus();
    };
});

SubmitMailBtn.addEventListener('click', (e) => {
    // DarkLayer.style.display = "none";
    e.preventDefault();

    if (MailInput_Name.value.trim() != "" && MailInput_Message.value.trim() != "") {
        SendMail(localStorage.getItem("UserName"), localStorage.getItem("PlayerID"), MailInput_Name.value, MailInput_Message.value);

    };
});

//Sends Mail to developer
async function SendMail(PlayerName, PlayerID, mailName, message) {
    // let email = document.getElementById('email').value; //display = none;
    // let subject = document.getElementById('subject').value; //display = none;
    let body = `name - ${PlayerName}, mail name - ${mailName}, id - ${PlayerID}<br/>
        message:<br/>${message}`;

    await Email.send({
            SecureToken: "50ae5256-e4e9-4700-b42b-fafc3cd150ec",
            To: 'josef.stips@sgw-schule.de',
            From: 'josefstips@gmx.de',
            Subject: 'Sended from User',
            Body: body
        })
        .then();

    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    AlertText.textContent = "Email was successfully send to the developer. (He will probably never read it)";
    MailPopUp.style.display = "none";
};