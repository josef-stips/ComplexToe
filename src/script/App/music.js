// background music
window.addEventListener("DOMContentLoaded", event => {
    const audio = document.querySelector("#bg_audio");
    audio.volume = 0.05;
    audio.loop = true;
    audio.play();

    const audioContext = new(window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const firstDiv = document.querySelector(".music-bars");
    const secondDiv = document.querySelector(".music-bars-2");

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
            const barHeight = (dataArray[index] / 255) * firstDiv.offsetHeight;

            bar.style.width = barWidth + "px";
            bar.style.height = barHeight + "px";
        });

        bars2.forEach((bar, index) => {
            const reversedIndex = numBars - 1 - index; // Umkehren der Indexreihenfolge
            const barHeight = (dataArray[reversedIndex] / 255) * secondDiv.offsetHeight;

            bar.style.width = barWidth + "px";
            bar.style.height = barHeight + "px";
        });
    };

    animateBars();
});

function playBtn_Audio() {
    // audio
    btn_sound.volume = 0.1;
    btn_sound.play()
};

function playBtn_Audio_2() {
    // audio
    btn_sound2.volume = 0.1;
    btn_sound2.play()
};