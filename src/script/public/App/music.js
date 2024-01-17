// background music
let globalAudio;

async function CreateMusicBars(Audio) {
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
    let volumeInterval = setInterval(() => {
        // console.log(globalAudio, globalAudio.volume, appVolume, count, appVolume / count);
        try {
            if (count >= 2) {
                let newVolume = appVolume / count;
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
            const barHeight = (dataArray[index] / 195) * firstDiv.offsetHeight;

            bar.style.width = barWidth + "px";
            bar.style.height = barHeight + "px";
        });

        bars2.forEach((bar, index) => {
            const reversedIndex = numBars - 1 - index; // Umkehren der Indexreihenfolge
            const barHeight = (dataArray[reversedIndex] / 195) * secondDiv.offsetHeight;

            bar.style.width = barWidth + "px";
            bar.style.height = barHeight + "px";
        });
    };

    animateBars();
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

function play_rewardSound() {
    // reward/ achievement sound
    rewardAudio.volume = sfxVolume;
    rewardAudio.playbackRate = 0.9;
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