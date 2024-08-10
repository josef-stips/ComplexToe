// everything about the training arena. The players opponent is a bot
class TrainingArena {
    constructor(mode) {
        this.mode = mode;
        this.patterns_wrapper = TA_patterns_wrapper;
        this.patterns_ok_btn = TA_patterns_btn;
    };

    init() {

    };

    generate_patterns() {
        DisplayPopUp_PopAnimation(TrainingArena_Patterns_popUp, 'flex', true);

        this.patterns_wrapper.textContent = null;
        Object.keys(GamePatternsList).forEach(n => {
            let s = GamePatternsList[n];
            createPattern_preview(n, s, this.patterns_wrapper, "toggle", undefined, 5, undefined, undefined, 5);
        });
    };
};

TA_patterns_closeBtn.addEventListener('click', () => {
    TrainingArena_Patterns_popUp.style.display = 'none';
    DarkLayer.style.display = 'none';
});

TA_patterns_qust_btn.addEventListener('click', () => {
    const qabox = new QABOX(1, [`In the training arena, the purpose is to focus on 1-2 patterns for practice. Select your weakest ones.`], { "1-2 patterns": 'green', "weakest": 'royalblue' }, {}, false);
    qabox.open();
});

TA_patterns_btn.addEventListener('click', () => {
    TrainingArena_Patterns_popUp.style.display = 'none';
    DarkLayer.style.display = 'none';
});