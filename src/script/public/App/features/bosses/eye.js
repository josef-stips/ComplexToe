// That epic eye in the game field
let eye_attack_interval_global;
let eye_HP;
let eyeDied = false;

// initialize eye when game starts
function init_eye() {
    // normally the eye has an different HP count than in advanture mode
    if (inAdvantureMode) {
        eye_HP = 20000;
    } else {
        eye_HP = 10000;
    };

    eyeDied = false;
    The_eye.style.display = "block";
    The_eye.style.opacity = "1";
    The_eye.style.transform = "scale(1)";

    if (curr_mode != GameMode[2].opponent) {
        // start interval for attacking
        EyeAttackInterval();
    } else {
        console.log("The server starts the eye attack interval in the databas as an event scheduler");
    };
    // HP
    eyeLifeCounter.textContent = `${eye_HP}/${eye_HP} HP`;
    eyeBar_fill2.style.width = `0`;
    // get position
    The_eye.getBoundingClientRect();
};

// eye attack
function eye_attack() {
    // animation
    // change eye position so it is vibrating
    let eye_pos = setInterval(() => {
        let first_pos = Math.random() * 15;
        let second_pos = Math.random() * 15;

        bossIMG.style.transform = `translate(${first_pos}px, ${second_pos}px)`;
    }, 100);

    // end of animation
    setTimeout(() => {
        clearInterval(eye_pos);
        eye_pos = null;
        if (!current_level_boss.died) {
            // play soundeffect
            eye_attack_soundeffect.volume = sfxVolume;
            eye_attack_soundeffect.playbackRate = 1;
            eye_attack_soundeffect.play();

            // attack
            eye_attckingBeam.style.display = "block";
            eye_attckingBeam.style.opacity = "1";

            // animation
            bossIMG.style.transform = "scale(1.2)";
            DarkLayer.style.display = "block";
            DarkLayer.style.backgroundColor = "white";

            setTimeout(() => {
                bossIMG.style.transform = "scale(1)";
                bossIMG.style.transition = "all 2s ease-in-out";

                eye_attckingBeam.style.transition = "opacity 200ms linear";
                eye_attckingBeam.style.opacity = "0";

                DarkLayer.style.transition = "opacity 600ms linear";
                DarkLayer.style.opacity = "0";

                cellGrid.classList.remove('cellGrid_opacity');
                cellGrid.classList.add('cellGrid-alert');
            }, 100);

            setTimeout(async() => {
                eye_attckingBeam.style.display = "none";

                DarkLayer.style.backgroundColor = "rgba(0, 0, 0, 0.87)";
                DarkLayer.style.transition = "background-color 1s ease-out";
                DarkLayer.style.display = "none";
                DarkLayer.style.opacity = "1";

                cellGrid.classList.remove('cellGrid-alert');

                // damage on cellGrid
                if (curr_mode != GameMode[2].opponent) {
                    eyeAttack_damage(cellDistance = curr_field == "Merciful slaughter" ? 40 : 30);
                } else {
                    if (personal_GameData.role == "admin") {
                        await socket.emit("activateEyeDamage", personal_GameData.currGameID, 40);
                    };
                };
            }, 1000);

            setTimeout(() => {
                bossIMG.style.transition = "all 0.2s ease-in-out";
            }, 2500);
        };

    }, 3000); // Ändern Sie die Dauer der Vibration nach Bedarf
};

// damage from eye attack on cell-grid
function eyeAttack_damage(cellDistance) {
    let cells = [...cellGrid.children];

    let rndIndex = Math.floor(Math.random() * ((cellDistance - 5) * (cellDistance - 5)));

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            let maxCellDistance = cellDistance * i;
            single_CellBlock(cells[rndIndex + j + maxCellDistance], "fromMap");
        };
    };
    for (let i = 0; i < 4; i++) {
        randomEdgeOnAttackDamageCellgrid(cells, rndIndex, cellDistance);
    };
};

// eye attack interval
function EyeAttackInterval() {
    if (!eyeDied && curr_mode != GameMode[2].opponent) {
        let minute = 0;
        let second = 59;

        eye_attack_interval_global = setInterval(() => {
            second--;
            if (second >= 10) {
                eyeNextAttackTimer.textContent = `${minute}:${second}`;
            } else {
                eyeNextAttackTimer.textContent = `${minute}:0${second}`;
            };

            // shortly before attack
            if (minute <= 0 && second <= 3) {
                removeAccessToAnything();
            };

            // interval finished
            if (minute <= 0 && second <= 0) {
                clearInterval(eye_attack_interval_global);
                eye_attack_interval_global = null;
                eye_attack();
                return;
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

socket.on("EyeAttackInterval", (eyeAttackInterval) => {
    eyeNextAttackTimer.textContent = `${0}:${eyeAttackInterval}`;

    if (eyeAttackInterval >= 5) {
        removeAccessToAnything();
    };

    if (eyeAttackInterval < 6) {
        eyeNextAttackTimer.style.color = "red";
    } else {
        eyeNextAttackTimer.style.color = "var(--font-color)";
    };
});

socket.on("EyeAttack", () => {
    eyeNextAttackTimer.textContent = `0:0`;
    eye_attack();
});

socket.on("EyeDamage", async(OptionsArray) => {
    let cells = [...cellGrid.children];

    await OptionsArray.forEach((c, i) => {
        if (c == '§') {
            single_CellBlock(cells[i], "fromMap");
        };
    });

    addAccesOnlineMode();
});

// user can defeat the eye through his patterns and if he clicks on the eye with the cursor
// cursor damage: 1, pattern damage: 450 - 900
function eyeGot_HP_Damage(damage) {
    let bossIsDeadNow = false;
    let newHP = eye_HP - damage
    newHP < 0 && (bossIsDeadNow = true);

    if (!eyeDied) {
        for (let counter = damage; counter > 0; counter--) {
            playBtn_Audio_2();

            let maxHP = inAdvantureMode ? 20000 : 10000;

            eye_HP = eye_HP - 1;
            !bossIsDeadNow ? eyeLifeCounter.textContent = `${sun_HP}/${maxHP} HP` : eyeLifeCounter.textContent = `${0}/${maxHP} HP`;

            let percentage = 100 - ((newHP / maxHP) * 100);
            !bossIsDeadNow ? sunBar_fill2.style.width = `${percentage}%` : sunBar_fill2.style.width = `100%`;
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
        if (eye_HP <= 0) eyeDies();
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

        The_eye.style.transition = "all 0.6s ease-out";
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
        }, 600);
    }, 2000);
};

// eye gets damage by clicking
let clickEyeCounter = 0;
eyeIMG_container.addEventListener('mousedown', () => {
    if (eye_HP >= 0 && clickEyeCounter <= 10000 && curr_mode != GameMode[2].opponent && !inAdvantureMode ||
        eye_HP >= 9000 && clickEyeCounter <= 1000 && curr_mode != GameMode[2].opponent && inAdvantureMode) {
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
function randomEdgeOnAttackDamageCellgrid(cells, rndIndex, cellDistance) {
    let randomEdge1 = Math.floor(Math.random() * 5);
    let randomEdge2 = Math.floor(Math.random() * 5);
    let randomEdge3 = Math.floor(Math.random() * 5);

    switch (randomEdge1) {
        case 1:
            single_CellBlock(cells[rndIndex + 4], "fromMap");
            break;
        case 2:
            single_CellBlock(cells[rndIndex + 4 + cellDistance], "fromMap");
            break;
        case 3:
            single_CellBlock(cells[rndIndex + 4 + cellDistance + cellDistance], "fromMap");
            break;
        case 4:
            single_CellBlock(cells[rndIndex + 4 + cellDistance + cellDistance + cellDistance], "fromMap");
            break;
    };
    switch (randomEdge2) {
        case 1:
            single_CellBlock(cells[rndIndex + 0 + cellDistance + cellDistance + cellDistance + cellDistance], "fromMap");
            break;
        case 2:
            single_CellBlock(cells[rndIndex + 1 + cellDistance + cellDistance + cellDistance + cellDistance], "fromMap");
            break;
        case 3:
            single_CellBlock(cells[rndIndex + 2 + cellDistance + cellDistance + cellDistance + cellDistance], "fromMap");
            break;
        case 4:
            single_CellBlock(cells[rndIndex + 3 + cellDistance + cellDistance + cellDistance + cellDistance], "fromMap");
            break;
    };
    switch (randomEdge3) {
        case 1:
            single_CellBlock(cells[rndIndex + cellDistance - 1], "fromMap");
            break;
        case 2:
            single_CellBlock(cells[rndIndex + cellDistance + cellDistance - 1], "fromMap");
            break;
        case 3:
            single_CellBlock(cells[rndIndex + cellDistance + cellDistance + cellDistance - 1], "fromMap");
            break;
        default:
            single_CellBlock(cells[rndIndex + cellDistance + cellDistance - 1], "fromMap");
            break;
    };
};