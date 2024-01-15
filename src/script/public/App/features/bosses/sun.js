// The sun boss is one of the major bosses in this game
// It is almost as strong as the eye
let sun_HP;
let sun_attack_interval_global;
let sunDied = false;

// init. the sun boss when it appears
function init_sun() {
    // normally the eye has an different HP count than in advanture mode
    if (inAdvantureMode) {
        sun_HP = 5000;
    } else {
        sun_HP = 2000;
    };

    sunDied = false;
    The_sun.style.display = "block";
    The_sun.style.opacity = "1";
    The_sun.style.transform = "scale(1)";

    // start interval for attacking
    SunAttackInterval();
    // HP
    sunLifeCounter.textContent = `${sun_HP}/${sun_HP} HP`;
    // get position
    The_sun.getBoundingClientRect();
};

// eye attack
function sun_attack() {
    if (!sunDied) {
        // bug fix
        CloseOnlinePopUps(true);

        // animation
        // change sun position so it is vibrating
        let sun_pos = setInterval(() => {
            let first_pos = Math.random() * 15;
            let second_pos = Math.random() * 15;

            The_sun.style.transform = `translate(${first_pos}px, ${second_pos}px)`;
        }, 100);

        // end of animation
        setTimeout(() => {
            clearInterval(sun_pos);
            sun_pos = null;

            // play soundeffect
            eye_attack_soundeffect.volume = sfxVolume;
            eye_attack_soundeffect.playbackRate = 3;
            eye_attack_soundeffect.play();

            // attack
            sun_attckingBeam.style.display = "block";
            sun_attckingBeam.style.opacity = "1";

            // animation
            The_sun.style.animation = "rotate 0.4s linear";
            The_sun.style.transform = "rotate(1200)";
            DarkLayer.style.display = "block";
            DarkLayer.style.backgroundColor = "white";

            setTimeout(() => {
                The_sun.style.transform = "scale(1)";
                The_sun.style.transition = "all 2s ease-in-out";

                sun_attckingBeam.style.transition = "opacity 200ms linear";
                sun_attckingBeam.style.opacity = "0";

                DarkLayer.style.transition = "opacity 600ms linear";
                DarkLayer.style.opacity = "0";

                cellGrid.classList.remove('cellGrid_opacity');
                cellGrid.classList.add('cellGrid-alert');
            }, 100);

            setTimeout(() => {
                sun_attckingBeam.style.display = "none";

                DarkLayer.style.backgroundColor = "rgba(0, 0, 0, 0.87)";
                DarkLayer.style.transition = "background-color 1s ease-out";
                DarkLayer.style.display = "none";
                DarkLayer.style.opacity = "1";

                cellGrid.classList.remove('cellGrid-alert');

                // damage on cellGrid
                sunAttack_damage();
            }, 500);

            setTimeout(() => {
                The_sun.style.transition = "all 0.2s ease-in-out";
                The_sun.style.animation = "none";
            }, 1000);

        }, 600); // Ändern Sie die Dauer der Vibration nach Bedarf
    };
};

// sun attack interval
function SunAttackInterval() {
    if (!sunDied) {
        // random second value
        let rnd = Math.floor(Math.random() * 35) + 10;

        let minute = 0;
        let second = rnd;

        // in this attack interval no counter is revealed
        sun_attack_interval_global = setInterval(() => {
            second--;

            // interval finished
            if (minute <= 0 && second <= 0) {
                clearInterval(sun_attack_interval_global);
                sun_attack_interval_global = null;

                // bug fix: user should not leave while attack
                removeAccessToAnything();

                // the sun shoots 3 times in a row
                let attack_count = 0;
                let attack_interval = setInterval(() => {
                    eye_attack_soundeffect.currentTime = 0;
                    eye_attack_soundeffect.pause();

                    attack_count++;
                    sun_attack();

                    if (attack_count >= 3) {
                        clearInterval(attack_interval);
                        attack_interval = null;

                        // start attack interval again
                        SunAttackInterval();

                        // user can leave now and do anything
                        addAccessToAnything();
                    };
                }, 1500);
                return;
            };

            // 30 seconds go by
            if (second <= 0) {
                minute--;
                second = 59;
            };
        }, 1000);
    };
};

// damage from eye attack on cell-grid
function sunAttack_damage() {
    let cells = [...cellGrid.children];

    let rndIndex = Math.floor(Math.random() * (25 * 25));

    single_CellBlock(cells[rndIndex], "fromMap");
    single_CellBlock(cells[rndIndex + 1], "fromMap");

    let cellDistance = 30;
    randomEdgeOnAttackDamageCellgrid(cells, rndIndex, cellDistance);

    single_CellBlock(cells[rndIndex + 30], "fromMap");
    single_CellBlock(cells[rndIndex + 31], "fromMap");

    single_CellBlock(cells[rndIndex + 60], "fromMap");
    single_CellBlock(cells[rndIndex + 61], "fromMap");

    single_CellBlock(cells[rndIndex + 90], "fromMap");
    single_CellBlock(cells[rndIndex + 91], "fromMap");
};

// user can defeat the sun through his patterns and if he clicks on the sun with the cursor
// cursor damage: 1, pattern damage: 450 - 900
function sunGot_HP_Damage(damage) {
    // if sun not died yet
    if (!sunDied) {
        for (let counter = damage; counter > 0; counter--) {
            playBtn_Audio_2();

            sun_HP = sun_HP - 1;
            sunLifeCounter.textContent = `${sun_HP}/${5000} HP`;
        };

        // animation
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        h1.textContent = `-${damage}`;
        h1.style.fontSize = "60px";
        h1.style.fontWeight = "500";
        div.className = "eyeDamageDisplay";
        div.appendChild(h1);
        sun_40.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 2000);

        // sun dies
        if (sun_HP <= 4100) sunDies();
    };
};

// sun dies
function sunDies() {
    // config
    clearInterval(sun_attack_interval_global);
    sun_attack_interval_global = null;
    sunDied = true;

    // animation
    let sun_pos = setInterval(() => {
        let first_pos = Math.random() * 22;
        let second_pos = Math.random() * 22;

        The_sun.style.transform = `translate(${first_pos}px, ${second_pos}px)`;
    }, 70);

    setTimeout(() => {
        clearInterval(sun_pos);
        sun_pos = null;

        The_sun.style.transition = "all 0.6s ease-out";
        The_sun.style.transform = "scale(0.01)";
        The_sun.style.opacity = "1";

        setTimeout(() => {
            The_sun.style.transition = "all 0.5s ease-in";
            The_sun.style.opacity = "0";
            The_sun.style.transform = "scale(15)";

            setTimeout(() => {
                sun_40.style.display = "none";
                document.querySelector('#GameArea-FieldCircle').style.margin = "0 0 0 0";

                if (score_Player1_numb >= 4) { // player fulfilled the first requirement to win this game, Now the sun also died so he won
                    Call_UltimateWin();
                };
            }, 800);
        }, 600);
    }, 2000);
};

// sun gets damage by clicking
let clickSunCounter = 0;
sunIMG_container.addEventListener('click', () => {
    if (sun_HP >= 4000 && clickSunCounter <= 500) {
        clickSunCounter++;
        sunGot_HP_Damage(1);
        document.querySelector('.sunIMG').style.transition = "transform 100ms ease";
        document.querySelector('.sunIMG').style.transform = "scale(1.1)";

        setTimeout(() => {
            document.querySelector('.sunIMG').style.transform = "scale(1)";
        }, 50);
    };
});