// everything about the training arena. The players opponent is a bot
class TrainingArena {
    constructor(mode, mode_color) {
        this.mode = mode;
        this.mode_color = mode_color;
        this.patterns_wrapper = TA_patterns_wrapper;
        this.patterns_ok_btn = TA_patterns_btn;

        this.selected_patterns = {};
        this.selected_patterns_count = 0;
    };

    init_patterns(mode) {
        switch (mode) {
            case 'normal':
                return Object.keys(GamePatternsList).map(p => { if (GamePatternsList[p].length == 5) return [p, GamePatternsList[p]] });

            case 'medium':
                return Object.keys(GamePatternsList).map(p => [p, GamePatternsList[p]]);

            case 'hard':
                return Object.keys(GamePatternsList).map(p => { if (GamePatternsList[p].length <= 4) return [p, GamePatternsList[p]] });
        };
    };

    generate_patterns() {
        let AllowedPatterns = this.init_patterns(this.mode);
        DisplayPopUp_PopAnimation(TrainingArena_Patterns_popUp, 'flex', true);

        this.patterns_wrapper.textContent = null;
        AllowedPatterns.forEach(n => {
            if (!n) return;

            let s = GamePatternsList[n[0]];
            createPattern_preview(n[0], s, this.patterns_wrapper, "toggle", undefined, 5, undefined, undefined, 5);
        });

        let patterns = [...this.patterns_wrapper.children];

        patterns.forEach(p => {
            let checkbox = p.childNodes[0].childNodes[2].childNodes[0];

            checkbox.removeAttribute('activated');
            checkbox.setAttribute('TA_p_activated', 'false');
            checkbox.className = "fa-regular fa-square item";

            checkbox.addEventListener('click', (e) => {
                switch (e.target.getAttribute('TA_p_activated')) {
                    case 'false':
                        if (this.selected_patterns_count >= 2) return;

                        checkbox.setAttribute('TA_p_activated', 'true');
                        checkbox.className = "fa-regular fa-square-check item";
                        this.selected_patterns[p.getAttribute('costum_pattern_name')] = GamePatternsList[p.getAttribute('costum_pattern_name')];

                        this.selected_patterns_count++;
                        break;
                    case 'true':
                        checkbox.setAttribute('TA_p_activated', 'false');
                        checkbox.className = "fa-regular fa-square item";
                        this.selected_patterns[p.getAttribute('costum_pattern_name')] && delete this.selected_patterns[p.getAttribute('costum_pattern_name')];
                        this.selected_patterns_count--;
                        break;
                };

                allowedPatternsFromUser = [...Object.keys(this.selected_patterns)];
                allowedPatterns = [...Object.keys(this.selected_patterns)];
            });
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

HelpTA_btn.addEventListener('click', () => {
    const qabox = new QABOX(2, [`Here in the training arena you can improve your skills by playing against the computer.`, `Choose a difficulty level from normal to hard.`], { "normal": 'green', 'hard': 'red' }, {}, true);
    qabox.open();
});

TA_patterns_btn.addEventListener('click', () => {
    if (training_arena.selected_patterns_count > 0) {
        TrainingArena_Patterns_popUp.style.display = 'none';
        DarkLayer.style.display = 'none';

        curr_field_ele = document.querySelector('#thirtyxthirty');
        curr_mode = GameMode[1].opponent;
        arena_mode = true;
        UserClicksNxNDefaultSettings(); // true: player can only change his name and icon  
        InitGameDataForPopUp(false);

    } else {
        OpenedPopUp_WhereAlertPopUpNeeded = true;
        AlertText.textContent = 'Select one more pattern';
        DisplayPopUp_PopAnimation(alertPopUp, 'flex', true);
    };
});