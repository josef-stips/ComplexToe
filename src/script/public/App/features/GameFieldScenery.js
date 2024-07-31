// almost everything about the main card scenery's 'Official Fields' and 'Arena'

class OfficialCards_handler {
    constructor() {

        // more XP => higher arena level
        // every 100 XP mark a higher arena level
        this.arena_level = null;
    };

    async open() {
        this.init();
        this.load_field();
    };

    init() {
        let new_arena_level = this.new_arena_level();
        localStorage.setItem('arena_level', new_arena_level);
    };

    new_arena_level() {
        let player_xp = localStorage.getItem('ELO');
        let new_arena_level = Math.floor(player_xp < 100 ? 100 : player_xp / 100);

        this.arena_level = new_arena_level;

        return this.arena_level;
    };

    load_field() {
        ArenaBuilding.textContent = null;
        createPattern_preview(`Arena ${this.arena_level}`, [], ArenaBuilding, "level", undefined, 20, null, undefined, 20);

        let field_wrapper = ArenaBuilding.querySelector('.createCostumField_Field_wrapper');
        let field = ArenaBuilding.querySelector('.small_createCostumField_Field');
        let cells = field_wrapper.querySelectorAll('.preview_cell.miniCellMini');
        field_wrapper.style.width = '100%';
        field_wrapper.style.height = '100%';

        field.style.height = '100%';
        [...cells].map(cell => {
            cell.style.width = 'auto';
            cell.style.height = 'auto';
        })
    };
};

const officical_cards_handler = new OfficialCards_handler();