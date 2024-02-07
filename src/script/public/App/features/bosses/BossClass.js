// This file is the general file for all bosses except the eye boss and the sun boss
class Boss {
    constructor(img, attack_timer, attack_type, attack_animation, attack_sound, hp) {
        this.img = img;
        this.attack_timer = attack_timer;
        this.attack_type = attack_type;
        this.attack_animation = attack_animation;
        this.interval = null;
        this.attack_sound = attack_sound;
        this.hp = hp;
        this.maxHP = hp;
        this.died = false;
    };

    display = () => {
        boss.style.opacity = "1";
        boss.style.display = "flex";
        bossIMG.src = this.img;
        bossLifeCounter.textContent = `${this.hp}/${this.maxHP} HP`;
        bossBar_fill2.style.width = `0`;
        bossIMG.style.animation = "";

        this.start_attack_interval();
    };

    delete = () => {
        boss.style.display = "";
        bossIMG.src = "";
        this.died = true;

        bossIMG.removeEventListener("animationend", bossIMG.fn);
        document.querySelector('#GameArea-FieldCircle').style.margin = "0 0 0 0";
        this.stop_attack_interval();
    };

    start_attack_interval = () => {
        let index = this.attack_timer;
        this.interval =
            setInterval(() => {
                if (!this.died) {
                    index--;
                    if (index <= 5) bossIMG.style.animation = "";
                    if (index <= 0) {
                        clearInterval(this.interval);
                        this.interval = null;
                        this.stop_attack_interval();
                        this.attack(); // attack
                    };

                } else {
                    clearInterval(this.interval);
                    this.interval = null;
                };
            }, 1000);
    };

    stop_attack_interval = () => {
        clearInterval(this.interval);
        this.interval = null;
    };

    attack = () => {
        removeAccessToAnything();

        // start animation
        if (this.attack_animation != null) {
            bossIMG.style.animation = this.attack_animation;
        };

        // play attack sound
        if (this.attack_sound != null) {
            this.attack_sound.volume = sfxVolume;
            this.attack_sound.play();
        };

        // start right attack
        boss_attacks[this.attack_type]() // attack_type = index of attack in boss_attack object
            .then(() => {
                // after attack finished: start new attack timer
                this.start_attack_interval();

                // user can leave now and do anything
                addAccessToAnything(undefined, true, true);
            });
    };

    damage = (damage) => {
        let bossIsDeadNow = false;
        let newHP = this.hp - damage

        newHP < 0 && (bossIsDeadNow = true);
        let percentage = 100 - ((newHP / this.maxHP) * 100);

        for (let counter = damage; counter > 0; counter--) {
            this.hp--;

            if (!bossIsDeadNow) {
                bossLifeCounter.textContent = `${this.hp}/${this.maxHP} HP`;
                bossBar_fill2.style.width = `${percentage}%`;

            } else {
                bossLifeCounter.textContent = `${0}/${this.maxHP} HP`;
                bossBar_fill2.style.width = `100%`;
            };
        };

        // animation
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        h1.textContent = `-${damage}`;
        h1.style.fontSize = "60px";
        h1.style.fontWeight = "500";
        div.className = "eyeDamageDisplay";
        div.appendChild(h1);
        boss.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 2000);

        // eye dies
        if (this.hp <= 0) this.death();
    };

    death = () => {
        this.died = true;
        bossIMG.style.animation = "boss_dies 1.5s ease-in-out";

        removeAccessToAnything();

        bossIMG.addEventListener("animationend", bossIMG.fn = (e) => {
            this.delete();
            addAccessToAnything();
        });
    };
};

// star eye -------------------------------------------------------
class StarEye extends Boss {
    constructor() {
        super("./assets/game/cursed-star.svg", 65, "boss_lock_attack", "StarEye_Attack 1s linear", Shoot1, 3000);
    };
};

class Sun extends Boss {
    constructor() {
        super("./assets/game/spikes-full.svg", 110, "triple_shoot", null, null, 4000);
    };
};

class Eye extends Boss {
    constructor() {
        super("./assets/game/warlock-eye.svg", 80, "big_shoot", null, null, 8000);
    };
};

// attacks
const boss_attacks = {
    // attack # 0
    boss_lock_attack: () => {
        return new Promise(resolve => {
            let Rnd_Indexes = getRandomIndexes(options, 30);

            Rnd_Indexes.forEach(index => {
                single_CellBlock(cells[index]);
            });

            resolve();
        });
    },

    // attack # 1
    triple_shoot: () => {
        return new Promise(resolve => {
            let attack_count = 0;
            let attack_interval = setInterval(() => {
                // attack process. if died = close process
                if (!current_level_boss.died) {
                    eye_attack_soundeffect.currentTime = 0;
                    eye_attack_soundeffect.pause();

                    attack_count++;
                    sun_attack();

                    if (attack_count >= 3) {
                        clearInterval(attack_interval);
                        attack_interval = null;

                        resolve();
                    };

                } else {
                    clearInterval(attack_interval);
                    attack_interval = null;
                };

            }, 1500);
        });
    },

    // attack # 2
    big_shoot: () => {
        return new Promise(resolve => {
            eye_attack();
            resolve();
        });
    }
};