// everything important about lost items in the Advanture Mode
// If the player lost a game in the advanture mode, "lost items" appear.
// The user can select ONE item to continue the game with an advantage
// The value of the items are relative to the level data.
// There are 3 items in total and each of them costs diamonds.
class AdvantureModeLostItemsHandler {
    constructor(level) {
        this.level = level
        this.current_selected_item = { index: null, price: null };

        this.level_meta_data = mapLevels[this.current_selected_item];
    };

    deactivate_items() {
        advan_lost_items.forEach(item => {
            item.setAttribute('active', 'false');
        });
    };

    activate_item(idx) {
        advan_lost_items[idx].setAttribute('active', 'true');
    };

    init() {
        advan_lost_items.forEach((item, idx) => {
            // remove previous events
            item.removeEventListener('click', item.ev);
            advan_lost_item_qust_btn[idx].removeEventListener('click', advan_lost_item_qust_btn[idx].ev);
            retryGameBtn.removeEventListener('click', retryGameBtn.ev);

            // on item click
            item.addEventListener('click', item.ev = () => {
                this.current_selected_item = { index: idx, price: this.item_price(idx) };
                this.deactivate_items();
                this.activate_item(idx);
                selected_lost_item_textfield.textContent = this.item_text(idx);
                selected_lost_item_price_textfield.textContent = this.item_price(idx);
            });

            // on item question btn click
            advan_lost_item_qust_btn[idx].addEventListener('click', advan_lost_item_qust_btn[idx].ev = () => {
                AlertText.textContent = this.qust_btn_text(idx);
                DisplayPopUp_PopAnimation(alertPopUp, 'flex', true);
            });

            // retry game btn initialization
            retryGameBtn.addEventListener('click', retryGameBtn.ev = () => {
                const success = this.purchase_item();

                if (!success) {
                    AlertText.textContent = `You don't have enough gems to purchase this skill.`;
                    DisplayPopUp_PopAnimation(alertPopUp, 'flex', true);
                    return false;
                };

                TryTo_StartMapLevel();

                // modify game data with skill
                this.modify_game(this.current_selected_item.index);

                // undo styling
                hideEndGameLostItems();
            });

            // init. item text
            advan_lost_item_text[idx].textContent = this.item_text(idx);
        });
    };

    modify_game(idx) {
        switch (idx) {
            case 0:
                MaxAmountOfMovesCount = Math.floor(max_amount_of_moves / 2);
                break;

            case 1:
                score_Player2_numb = 0;
                MaxAmountOfMovesCount = MaxAmountOfMovesCount + Math.floor(max_amount_of_moves / 7);
                player2_score_bar_wrapper.style.background = `linear-gradient(-105deg, darkred ${0}%, transparent ${5}%)`;
                scorePlayer2.textContent = score_Player2_numb;
                break;

            case 2:
                SpellsInStore++;
                MaxAmountOfMovesCount = MaxAmountOfMovesCount + Math.floor(max_amount_of_moves / 6);
                break;
        };

        MaxAmountOfMovesGameDisplay.textContent = `moves left: ${MaxAmountOfMovesCount}`;
        SpellAmountDisplay.textContent = SpellsInStore;
    };

    purchase_item() {
        let storage_value = Number(localStorage.getItem('GemsItem'));
        let new_value = storage_value - this.current_selected_item.price;

        if (new_value < 0) return false;

        localStorage.setItem('GemsItem', new_value);
        return true;
    };

    qust_btn_text(idx) {
        switch (idx) {
            case 0:
                // give player full points/2
                return 'Continue the game with half of your inital moves.';
            case 1:
                // half the ki's points and give the player (relative)n moves
                return 'Continue the game with the opponent having no points and gain some extra moves.';
            case 2:
                return 'Continue the game with one extra spell and some extra moves.';
        };
    };

    item_text(idx) {
        switch (idx) {
            case 0:
                return 'moves';
            case 1:
                return 'player';
            case 2:
                return 'spell';
        };
    };

    item_price(idx) {
        switch (idx) {
            case 0:
                return 100;
            case 1:
                return 200;
            case 2:
                return 250;
        };
    };
};

let lost_items_handler = null;