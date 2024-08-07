// everything important about the bot mode in createGame scene
class CreativeLevel_BotMode {
    constructor(parent, level) {
        this.parent = parent;
        this.level = level;
        this.all_patterns = null;

        this.open();
    };

    open() {
        console.log(this.level);
        DisplayPopUp_PopAnimation(CreateLevel_BotMode_PopUp, 'flex', true);

        this.load_toggle(this.level);
        this.load_patterns(this.level);
    };

    load_toggle(level_data) {

    };

    load_patterns(level_data) {
        BotMode_patternSelectionWrapper.textContent = null;

        this.all_patterns = BindPatternsWithCostumPatternsToIndexes(level_data[6], level_data[15], 5);
        console.log(this.all_patterns);

        // createPattern_preview();
    };
};