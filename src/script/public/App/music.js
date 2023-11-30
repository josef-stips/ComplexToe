// background music
let globalAudio;

function CreateMusicBars(Audio) {
    let source = null;
    let audioContext = null;
    let analyser = null;

    globalAudio = Audio;

    // volume animation
    globalAudio.volume = 0;
    count = 10
    let volumeInterval = setInterval(() => {
        try {
            globalAudio.volume = appVolume / count;

            count = count - 2;
            if (count <= 0) {
                clearInterval(volumeInterval);
                volumeInterval = null;
            };
        } catch (error) {
            location.reload();
        };
    }, 100);

    globalAudio.loop = true;
    globalAudio.play();

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

    for (let i = 0; i < bufferLength; i++) {
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
            const barHeight = (dataArray[index] / 155) * firstDiv.offsetHeight;

            bar.style.width = barWidth + "px";
            bar.style.height = barHeight + "px";
        });

        bars2.forEach((bar, index) => {
            const reversedIndex = numBars - 1 - index; // Umkehren der Indexreihenfolge
            const barHeight = (dataArray[reversedIndex] / 155) * secondDiv.offsetHeight;

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

function coinsSoundTrack() {
    // coins audio
    coinsSound.volume = sfxVolume;
    coinsSound.play();
};

function PauseMusic() {
    Quick_death_Theme.pause();
    March_into_fire_Theme.pause();
    Tunnel_of_truth_Theme.pause();
    Long_funeral_Theme.pause();
    Merciful_slaughter_Theme.pause();
    Impossible_survival_Theme.pause();
    Ground_destroyer_Theme.pause();
    audio.pause();
    boss_theme.pause();
    mapSound.pause();
    theEye_theme.pause();
    default_MapLevel_theme.pause();
    default_MapLevel_theme2.pause();

    Quick_death_Theme.currentTime = 0;
    March_into_fire_Theme.currentTime = 0;
    Tunnel_of_truth_Theme.currentTime = 0;
    Long_funeral_Theme.currentTime = 0;
    Merciful_slaughter_Theme.currentTime = 0;
    Impossible_survival_Theme.currentTime = 0;
    Ground_destroyer_Theme.currentTime = 0;
    boss_theme.currentTime = 0;
    audio.currentTime = 0;
    mapSound.currentTime = 0;
    theEye_theme.currentTime = 0;
    default_MapLevel_theme.currentTime = 0;
    default_MapLevel_theme2.currentTime = 0;
};

function playGameTheme() {
    PauseMusic();
    audio.play();
    globalAudio = audio;
    CreateMusicBars(globalAudio);
};

function playBossTheme() {
    PauseMusic();
    boss_theme.play();
    globalAudio = boss_theme;
    CreateMusicBars(globalAudio);
};

function playMapTheme() {
    PauseMusic();
    mapSound.play();
    globalAudio = mapSound;
    CreateMusicBars(globalAudio);
};