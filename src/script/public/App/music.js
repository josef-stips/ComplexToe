// background music
let globalAudio;

async function CreateMusicBars(Audio) {
    try {
        let source = null;
        let audioContext = null;
        let analyser = null;

        // create audio element with audio as source
        // extract file name
        let globalAudioSrcSegments = Audio.src.split("/");
        let fileName = globalAudioSrcSegments.pop();
        // create audio
        let AudioElement = document.createElement("audio");
        // different location based on file
        (fileName == "map.mp3" || fileName == "bg_music.m4a") ? AudioElement.src = `assets/${fileName}`: AudioElement.src = `assets/Maps/${fileName}`;

        globalAudio = AudioElement.cloneNode(true);
        AudioElement.remove();

        globalAudio.loop = true;
        globalAudio.play();

        // volume animation
        globalAudio.volume = 0;
        count = 10
        appVolume = Number(appVolume);

        let currVolume = appVolume

        if (Audio.id == "mapSound") {
            currVolume = appVolume * 10;
        };

        let volumeInterval = setInterval(() => {
            // console.log(globalAudio, globalAudio.volume, appVolume, count, appVolume / count);
            try {
                if (count >= 2) {
                    let newVolume = currVolume / count;
                    globalAudio.volume = parseFloat(newVolume);
                };

                count = count - 2;
                if (count <= 0) {
                    clearInterval(volumeInterval);
                    volumeInterval = null;
                };
            } catch (error) {
                console.log(error);
            };
        }, 100);

        audioContext = new(window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaElementSource(globalAudio);

        source.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const firstDiv = document.querySelector(".music-bars");
        const secondDiv = document.querySelector(".music-bars-2");

        firstDiv.textContent = null;
        secondDiv.textContent = null;

        for (let i = 0; i < bufferLength - 75; i++) {
            const bar = document.createElement("div");
            bar.classList.add("bar");
            firstDiv.appendChild(bar);
            const bar2 = document.createElement("div");
            bar2.classList.add("bar");
            secondDiv.appendChild(bar2);
        };

        function animateBars() {
            requestAnimationFrame(animateBars);
            analyser.getByteFrequencyData(dataArray);

            const bars = document.querySelectorAll(".music-bars .bar");
            const bars2 = document.querySelectorAll(".music-bars-2 .bar");
            const numBars = bars.length;
            const barWidth = firstDiv.offsetWidth / numBars;

            bars.forEach((bar, index) => {
                const barHeight = (dataArray[index] / 100) * firstDiv.offsetHeight;

                bar.style.width = barWidth + "px";
                bar.style.height = barHeight + "px";
            });

            bars2.forEach((bar, index) => {
                const reversedIndex = numBars - 1 - index; // Umkehren der Indexreihenfolge
                const barHeight = (dataArray[reversedIndex] / 100) * secondDiv.offsetHeight;

                bar.style.width = barWidth + "px";
                bar.style.height = barHeight + "px";
            });
        };

        animateBars();
    } catch (error) {
        console.log('no sound');
    };
};

function playBtn_Audio() {
    // audio
    btn_sound.volume = sfxVolume;
    btn_sound.play()
};

function playBtn_Audio_2() {
    // audio
    btn_sound2.volume = sfxVolume;
    btn_sound2.play()
};

function playBtn_Audio_3() {
    // audio
    btn_click3.volume = sfxVolume;
    btn_click3.play()
};

function play_Shoot1() {
    // audio
    Shoot1.volume = sfxVolume;
    Shoot1.play();
};

function coinsSoundTrack() {
    // coins audio
    coinsSound.volume = sfxVolume;
    coinsSound.play();
};

function PauseMusic() {
    globalAudio.pause();
    globalAudio.currentTime = 0;
};

function playGameTheme() {
    PauseMusic();
    CreateMusicBars(audio);
};

function playBossTheme() {
    PauseMusic();
    CreateMusicBars(boss_theme);
};

function playMapTheme() {
    PauseMusic();
    CreateMusicBars(mapSound);
};

function playMysticalTheme() {
    PauseMusic();
    CreateMusicBars(mysticalSound);
};

function playBattleEndTheme() {
    PauseMusic();
    CreateMusicBars(battleAudio);
};

function playShopTheme() {
    PauseMusic();

    CreateMusicBars(ShopTheme);

    setTimeout(() => {
        globalAudio.volume = appVolume * 3
    }, 500);
};

function play_wheel_theme() {
    PauseMusic();
    CreateMusicBars(wheel_of_fortune_bg);
};

function unlockSound1() {
    unlock_sound1.pause();
    unlock_sound1.currentTime = 0;
    unlock_sound1.blaybackRate = 0.9;
    unlock_sound1.volume = sfxVolume - ((1 / 3) * sfxVolume);
    unlock_sound1.play();
};

function play_collectSound() {
    collect1.pause();
    collect1.currentTime = 0;
    collect1.playbackRate = 1.5;
    collect1.volume = sfxVolume - (1 / 3 * sfxVolume);
    collect1.play();
};

function play_rewardSound() {
    // reward/ achievement sound
    rewardAudio.volume = sfxVolume - (1 / 3 * sfxVolume);
    rewardAudio.playbackRate = 1;
    rewardAudio.play();
};

async function play_openGateSound() {
    gateOpenSound.volume = sfxVolume;
    gateOpenSound.playbackRate = 0.7;
    gateOpenSound.play();
};

async function play_laughSound() {
    LaughSound.volume = sfxVolume;
    LaughSound.playbackRate = 0.7;
    LaughSound.play();
};

function play_GameAnimationSound() {
    sound1.pause();
    sound1.currentTime = 0;
    sound1.volume = sfxVolume;
    sound1.play();
};

function play_door_open_sound() {
    door_open_sound.pause();
    door_open_sound.currentTime = 0;
    door_open_sound.volume = sfxVolume;
    door_open_sound.play();
};

function play_clack_sound() {
    clack_sound.pause();
    clack_sound.currentTime = 0;
    clack_sound.volume = sfxVolume;
    clack_sound.play();
};

function pause_clack_sound() {
    clack_sound.pause();
    clack_sound.currentTime = 0;
};

function play_btn4_sound() {
    btn4_sound.pause();
    btn4_sound.currentTime = 0;
    btn4_sound.volume = sfxVolume;
    btn4_sound.play();
};