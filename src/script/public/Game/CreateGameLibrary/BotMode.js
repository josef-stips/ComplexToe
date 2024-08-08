// everything important about the bot mode in createGame scene
class CreativeLevel_BotMode {
    constructor(parent, level) {
        this.parent = parent;
        this.level = level;
        this.all_patterns = null;
        this.all_pattern_names = null;
        this.all_pattern_data = [];
        this.x_and_y = typeof level[16] == "object" ? [level[16].x, level[16].y] : [parent.Settings.cellgrid[level[7]], parent.Settings.cellgrid[level[7]]];

        this.mode_toggle = BotMode_toggle_btn;
        this.selected_patterns = level[18] ? level[18] : {};
        this.selected_patterns_count = Object.keys(this.selected_patterns).length;

        this.open();
    };

    open() {
        console.log(this.level);
        DisplayPopUp_PopAnimation(CreateLevel_BotMode_PopUp, 'flex', true);

        this.load_toggle(this.level);

        setTimeout(() => {
            this.load_patterns(this.level);
        }, 250);
    };

    load_toggle(level_data) {
        switch (level_data[17]) {
            case 1:
                this.mode_toggle.setAttribute('active_toggle', 'true');
                this.mode_toggle.className = 'fa-regular fa-check-square BotMode_toggle_btn';
                BotMode_mainWrapper.classList.remove('blur');
                this.parent.CurrentSelectedSetting.BotMode = 1;
                break;

            case 0:
                this.mode_toggle.setAttribute('active_toggle', 'false');
                this.mode_toggle.className = 'fa-regular fa-square BotMode_toggle_btn';
                BotMode_mainWrapper.classList.add('blur');
                this.parent.CurrentSelectedSetting.BotMode = 0;
                break;
        };
    };

    load_patterns(level_data) {
        BotMode_patternSelectionWrapper.textContent = null;

        this.all_pattern_data = [this.all_patterns, this.all_pattern_names] = BindPatternsWithCostumPatternsToIndexes(level_data[6], level_data[15], 5);
        console.log(this.all_patterns, this.all_pattern_names, this.x_and_y);

        this.all_pattern_data[0].map((structure, index) => {
            createPattern_preview(this.all_pattern_data[1][index], structure, BotMode_patternSelectionWrapper, 'toggle', undefined, 5, null, null, 5, 'pattern', true);
        });

        this.load_patterns_toggle([...BotMode_patternSelectionWrapper.children], [...BotMode_patternSelectionWrapper.children].map(w => w.childNodes[0].children[2].children[0]), this.all_pattern_data);
    };

    load_patterns_toggle(patterns, toggle_btns, patterns_data) {
        console.log(patterns_data);

        patterns.forEach((px, i) => {
            toggle_btns[i].setAttribute('active_toggle', 'false');
            toggle_btns[i].className = 'fa-regular fa-square BotMode_toggle_btn';

            toggle_btns[i].addEventListener('click', (e) => {
                switch (e.target.getAttribute('active_toggle')) {
                    case 'true':
                        e.target.setAttribute('active_toggle', 'false');
                        e.target.className = 'fa-regular fa-square BotMode_toggle_btn';
                        this.selected_patterns_count--;

                        this.selected_patterns[patterns[i].getAttribute('costum_pattern_name')] && delete this.selected_patterns[patterns[i].getAttribute('costum_pattern_name')];
                        break;

                    case 'false':
                        if (this.selected_patterns_count >= 2) break;

                        e.target.setAttribute('active_toggle', 'true');
                        e.target.className = 'fa-regular fa-check-square BotMode_toggle_btn';
                        this.selected_patterns_count++;

                        this.selected_patterns[patterns[i].getAttribute('costum_pattern_name')] = { 'structure': patterns_data[0][i], 'value': 1 };
                        break;
                };

                // init_bot_mode_patterns(patterns, toggle_btns, patterns_data); 
                NewCreativeLevel.SaveInHistory('bot_patterns', this.selected_patterns);
                NewCreativeLevel.CurrentSelectedSetting.BotPatterns = this.selected_patterns;
            });
        });

        let botmode_patterns = this.level[18] ? this.level[18] : {};
        Object.keys(botmode_patterns).map((name, i) => {
            let structure = botmode_patterns[name].structure;

            // toggle corresponding pattern and toggle btn
            let pattern_wrapper = BotMode_patternSelectionWrapper.querySelector(`[costum_pattern_name="${name}"][right="toggle"]`);
            let toggle_btn = pattern_wrapper.children[0].childNodes[2].childNodes[0];

            toggle_btn.setAttribute('active_toggle', 'true');
            toggle_btn.className = 'fa-regular fa-check-square BotMode_toggle_btn';
        });
    };
};

function init_bot_mode_patterns(patterns, toggle_btns, pattern_data) {


    if (NewCreativeLevel) {
        console.log(arguments);

    } else {
        throw Error('No creative level initialized');
    };
};