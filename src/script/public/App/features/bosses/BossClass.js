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
        boss.style.display = "flex";
        bossIMG.src = this.img;
        bossLifeCounter.textContent = `${this.hp}/${this.maxHP} HP`;

        this.start_attack_interval();
    };

    delete = () => {
        boss.style.display = "none";
        bossIMG.src = "";

        document.querySelector('#GameArea-FieldCircle').style.margin = "0 0 0 0";
        this.stop_attack_interval();
    };

    start_attack_interval = () => {
        let index = this.attack_timer;
        this.interval =
            setInterval(() => {
                index--;
                if (index <= 5) bossIMG.style.animation = "";
                if (index <= 0) {
                    clearInterval(this.interval);
                    this.interval = null;
                    this.stop_attack_interval();
                    this.attack(); // attack
                };
            }, 1000);
    };

    stop_attack_interval = () => {
        clearInterval(this.interval);
        this.interval = null;
    };

    attack = () => {
        // start animation
        bossIMG.style.animation = this.attack_animation;
        // play attack sound
        this.attack_sound.volume = sfxVolume;
        this.attack_sound.play();
        // start right attack
        switch (this.attack_type) {
            case "lock":
                boss_attacks.boss_lock_attack()
                    .then(this.start_attack_interval()); // after attack finished: start new attack timer
                break;
        };
    };

    damage = (damage) => {
        for (let counter = damage; counter > 0; counter--) {
            this.hp--;
            bossLifeCounter.textContent = `${this.hp}/${this.maxHP} HP`;
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
        bossIMG.style.animation = "boss_dies 1.5s ease-in-out forwards";

        bossIMG.addEventListener("animationend", () => {
            setTimeout(() => {
                this.died = true;
                this.delete();
            }, 50);
        });
    };
};

// star eye -------------------------------------------------------
class StarEye extends Boss {
    constructor() {
        super("./assets/game/cursed-star.svg", 50, "lock", "StarEye_Attack 1s linear", Shoot1, 4000);
    };
};

// attacks
const boss_attacks = {
    boss_lock_attack: () => {
        return new Promise((resolve) => {
            let Rnd_Indexes = getRandomIndexes(options, 30);

            Rnd_Indexes.forEach(index => {
                single_CellBlock(cells[index]);
            });

            resolve();
        });
    }
};