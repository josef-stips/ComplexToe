let bgMusic_slider = document.querySelector('#bgMusic_slider');

// bg music slider
function init_volumeSlider() {
    bgMusic_slider.max = '0.25';

    if (localStorage.getItem('Volume')) {
        bgMusic_slider.value = localStorage.getItem('Volume');
        appVolume = bgMusic_slider.value;

    } else {
        bgMusic_slider.value = appVolume; // 0.05
        localStorage.setItem('Volume', appVolume);
    };
};
init_volumeSlider();

bgMusic_slider.addEventListener('input', () => {
    appVolume = bgMusic_slider.value;
    localStorage.setItem('Volume', appVolume);
    globalAudio.volume = bgMusic_slider.value;
});