// That epic eye in the game field
let eye_attack_interval_global;
let eye_HP;
let eyeDied = false;

// initialize eye when game starts
function init_eye() {
    // normally the eye has an different HP count than in advanture mode
    if (inAdvantureMode) {
        eye_HP = 10000;
    } else {
        eye_HP = 5000;
    };

    eyeDied = false;
    The_eye.style.display = "block";
    The_eye.style.opacity = "1";
    The_eye.style.transform = "scale(1)";

    // start interval for attacking
    EyeAttackInterval();
    // HP
    eyeLifeCounter.textContent = `${eye_HP}/${eye_HP} HP`;
    // get position
    The_eye.getBoundingClientRect();
};

// eye attack
function eye_attack() {
    if (!eyeDied) {
        // bug fix
        animatedPopUp.style.display = 'none';
        GameInfoPopUp.style.display = 'none';
        userInfoPopUp.style.display = 'none';
        settingsWindow.style.display = 'none';
        DarkLayer.style.display = 'none';

        // bug fix: user should not leave while attack
        leaveGame_btn.removeEventListener('click', UserleavesGame);
        leaveGame_btn.style.color = '#56565659';

        // animation
        // change eye position so it is vibrating
        let eye_pos = setInterval(() => {
            let first_pos = Math.random() * 15;
            let second_pos = Math.random() * 15;

            The_eye.style.transform = `translate(${first_pos}px, ${second_pos}px)`;
        }, 100);

        // end of animation
        setTimeout(() => {
            clearInterval(eye_pos);
            eye_pos = null;

            // play soundeffect
            eye_attack_soundeffect.volume = 0.095;
            eye_attack_soundeffect.playbackRate = 1;
            eye_attack_soundeffect.play();

            // attack
            eye_attckingBeam.style.display = "block";
            eye_attckingBeam.style.opacity = "1";

            // animation
            The_eye.style.transform = "scale(1.2)";
            DarkLayer.style.display = "block";
            DarkLayer.style.backgroundColor = "white";

            setTimeout(() => {
                The_eye.style.transform = "scale(1)";
                The_eye.style.transition = "all 2s ease-in-out";

                eye_attckingBeam.style.transition = "opacity 200ms linear";
                eye_attckingBeam.style.opacity = "0";

                DarkLayer.style.transition = "opacity 600ms linear";
                DarkLayer.style.opacity = "0";

                cellGrid.classList.remove('cellGrid_opacity');
                cellGrid.classList.add('cellGrid-alert');
            }, 100);

            setTimeout(() => {
                eye_attckingBeam.style.display = "none";

                DarkLayer.style.backgroundColor = "rgba(0, 0, 0, 0.87)";
                DarkLayer.style.transition = "background-color 1s ease-out";
                DarkLayer.style.display = "none";
                DarkLayer.style.opacity = "1";

                cellGrid.classList.remove('cellGrid-alert');

                // damage on cellGrid
                eyeAttack_damage();
            }, 1000);

            setTimeout(() => {
                The_eye.style.transition = "all 0.2s ease-in-out";
            }, 2500);

            // start attack interval again
            EyeAttackInterval();

            // bug fix: user can leave again
            leaveGame_btn.style.color = 'var(--font-color)';
            leaveGame_btn.addEventListener('click', UserleavesGame);

        }, 3000); // Ändern Sie die Dauer der Vibration nach Bedarf
    };
};

// damage from eye attack on cell-grid
function eyeAttack_damage() {
    let cells = [...cellGrid.children];

    let rndIndex = Math.floor(Math.random() * (25 * 25));

    console.log(cells, cells[rndIndex], rndIndex)
    single_CellBlock(cells[rndIndex], "fromMap");
    single_CellBlock(cells[rndIndex + 1], "fromMap");
    single_CellBlock(cells[rndIndex + 2], "fromMap");
    single_CellBlock(cells[rndIndex + 3], "fromMap");

    randomEdgeOnAttackDamageCellgrid(cells, rndIndex);

    single_CellBlock(cells[rndIndex + 30], "fromMap");
    single_CellBlock(cells[rndIndex + 31], "fromMap");
    single_CellBlock(cells[rndIndex + 32], "fromMap");
    single_CellBlock(cells[rndIndex + 33], "fromMap");

    single_CellBlock(cells[rndIndex + 60], "fromMap");
    single_CellBlock(cells[rndIndex + 61], "fromMap");
    single_CellBlock(cells[rndIndex + 62], "fromMap");
    single_CellBlock(cells[rndIndex + 63], "fromMap");

    single_CellBlock(cells[rndIndex + 90], "fromMap");
    single_CellBlock(cells[rndIndex + 91], "fromMap");
    single_CellBlock(cells[rndIndex + 92], "fromMap");
    single_CellBlock(cells[rndIndex + 93], "fromMap");
};

// eye attack interval
function EyeAttackInterval() {
    if (!eyeDied) {
        let minute = 1;
        let second = 0;

        eye_attack_interval_global = setInterval(() => {
            second--;
            if (second >= 10) {
                eyeNextAttackTimer.textContent = `${minute}:${second}`;
            } else {
                eyeNextAttackTimer.textContent = `${minute}:0${second}`;
            };

            // interval finished
            if (minute <= 0 && second <= 0) {
                clearInterval(eye_attack_interval_global);
                eye_attack_interval_global = null;
                eye_attack();
                return;
            };

            // 30 seconds go by
            if (second <= 0) {
                minute--;
                second = 59;
                eyeNextAttackTimer.textContent = `${minute}:${second}`;
            };

            // red text when under 6 seconds
            if (second < 6 && minute == 0) {
                eyeNextAttackTimer.style.color = "red";
            } else {
                eyeNextAttackTimer.style.color = "var(--font-color)";
            };
        }, 1000);
    };
};

// user can defeat the eye through his patterns and if he clicks on the eye with the cursor
// cursor damage: 1, pattern damage: 450 - 900
function eyeGot_HP_Damage(damage) {
    if (!eyeDied) {
        for (let counter = damage; counter > 0; counter--) {
            playBtn_Audio_2();

            eye_HP = eye_HP - 1;
            eyeLifeCounter.textContent = `${eye_HP}/${10000} HP`;
        };

        // animation
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        h1.textContent = `-${damage}`;
        h1.style.fontSize = "60px";
        h1.style.fontWeight = "500";
        div.className = "eyeDamageDisplay";
        div.appendChild(h1);
        eye_40.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 2000);

        // eye dies
        if (eye_HP <= 9000) eyeDies();
    };
};

// eye dies
function eyeDies() {
    // config
    clearInterval(eye_attack_interval_global);
    eye_attack_interval_global = null;
    eyeDied = true;

    // animation
    let eye_pos = setInterval(() => {
        let first_pos = Math.random() * 22;
        let second_pos = Math.random() * 22;

        The_eye.style.transform = `translate(${first_pos}px, ${second_pos}px)`;
    }, 70);

    setTimeout(() => {
        clearInterval(eye_pos);
        eye_pos = null;

        The_eye.style.transition = "all 1s ease-out";
        The_eye.style.transform = "scale(0.01)";
        The_eye.style.opacity = "1";

        setTimeout(() => {
            The_eye.style.transition = "all 0.5s ease-in";
            The_eye.style.opacity = "0";
            The_eye.style.transform = "scale(15)";

            setTimeout(() => {
                eye_40.style.display = "none";
                document.querySelector('#GameArea-FieldCircle').style.margin = "0 0 0 0";

                if (score_Player1_numb >= 4) { // player fulfilled the first requirement to win this game, Now the sun also died so he won
                    Call_UltimateWin();
                };
            }, 800);
        }, 1000);
    }, 2000);
};

// eye gets damage by clicking
let clickEyeCounter = 0;
eyeIMG_container.addEventListener('click', () => {
    if (eye_HP >= 9000 && clickEyeCounter <= 500) {
        clickEyeCounter++;
        eyeGot_HP_Damage(1);
        document.querySelector('.eyeIMG').style.transition = "transform 100ms ease";
        document.querySelector('.eyeIMG').style.transform = "scale(1.1)";

        setTimeout(() => {
            document.querySelector('.eyeIMG').style.transform = "scale(1)";
        }, 50);
    };
});

// side functions
function randomEdgeOnAttackDamageCellgrid(cells, rndIndex) {
    let randomEdge1 = Math.floor(Math.random() * 5);
    let randomEdge2 = Math.floor(Math.random() * 5);
    let randomEdge3 = Math.floor(Math.random() * 5);

    switch (randomEdge1) {
        case 1:
            single_CellBlock(cells[rndIndex + 4], "fromMap");
            break;
        case 2:
            single_CellBlock(cells[rndIndex + 34], "fromMap");
            break;
        case 3:
            single_CellBlock(cells[rndIndex + 64], "fromMap");
            break;
        case 4:
            single_CellBlock(cells[rndIndex + 94], "fromMap");
            break;
    };
    switch (randomEdge2) {
        case 1:
            single_CellBlock(cells[rndIndex + 120], "fromMap");
            break;
        case 2:
            single_CellBlock(cells[rndIndex + 121], "fromMap");
            break;
        case 3:
            single_CellBlock(cells[rndIndex + 122], "fromMap");
            break;
        case 4:
            single_CellBlock(cells[rndIndex + 123], "fromMap");
            break;
    };
    switch (randomEdge3) {
        case 1:
            single_CellBlock(cells[rndIndex + 29], "fromMap");
            break;
        case 2:
            single_CellBlock(cells[rndIndex + 59], "fromMap");
            break;
        case 3:
            single_CellBlock(cells[rndIndex + 89], "fromMap");
            break;
        default:
            single_CellBlock(cells[rndIndex + 59], "fromMap");
            break;
    };
};