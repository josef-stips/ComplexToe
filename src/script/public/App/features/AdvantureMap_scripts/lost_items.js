// everything important about lost items in the Advanture Mode
// If the player lost a game in the advanture mode, "lost items" appear.
// The user can select ONE item to continue the game with an advantage
// The value of the items are relative to the level data.
// There are 3 items in total and each of them costs diamonds.
class AdvantureModeLostItemsHandler {
    constructor(level) {
        this.level = level
        this.current_selected_item = {};

        this.level_meta_data = mapLevels[this.current_selected_item];
        this.item_meta_data = {
            1:[],
            2:[],
            3:[]
        };
    };

    init() {
        advanture_lost_items_events.forEach((item, idx) => {
            // remove previous events
            item.removeEventListener('click', item.ev);
            advan_lost_item_qust_btn[idx].removeEventListener('click', advan_lost_item_qust_btn[idx].ev);

            // write new events
            item.addEventListener('click', item.ev = () => {
    
            });

            advan_lost_item_qust_btn[idx].addEventListener('click', advan_lost_item_qust_btn[idx].ev = () => {
                AlertText.textContent = this.qust_btn_text(idx);
                DisplayPopUp_PopAnimation(alertPopUp, 'flex', true);
            });

            // init. item text
            advan_lost_item_text[idx].textContent = this.item_text(idx);
        });
    };

    qust_btn_text(idx) {
        switch (idx) {
            case 0:
                return 'Continue the game with half of your inital moves.';
            case 1:
                return 'Continue the game with the opponent having only half of his points.';
            case 2:
                return 'Continue the game';
        };
    };

    item_text(idx) {
        switch (idx) {
            case 0:
                return 'moves';
            case 1:
                return 'opponent';
            case 2:
                return 'item 3';
        };
    };
};

let lost_items_handler = null;