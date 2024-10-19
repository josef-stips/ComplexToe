class inner_field {
    constructor(bot_config, parent) {
        this.inner_field_data_options = [];
        this.inner_field_data_indexes = {};

        this.TMA_inner_field_data_options = [];
        this.TMA_inner_field_data_indexes = {};

        this.bot_config = bot_config;
        this.parent = parent;
    };

    request() { // request inner field (calls init func.)
        let [inner_field_options, inner_field_indexes] = this.parent.play_mode == "defend" ? this.init(lastCellIndex_Clicked) : this.init(this.parent.lastCellIndex);

        return [inner_field_options, inner_field_indexes];
    };

    init(origin_index) { // init inner field (main func.)
        let indexes = {};
        let Inner_field_options = [];

        let [is_new_origin_on_old_inner_field, inner_field_index] = this.check_for_last(origin_index);

        return (is_new_origin_on_old_inner_field) ? this.overwrite_new_field(inner_field_index, this.inner_field_data_indexes) :
            this.create(Inner_field_options, indexes, origin_index);
    };

    create(Inner_field_options, indexes, origin_index, from_TMA, x_cell_amount) { // create inner field
        let indexesInBigField = this.calculate_boundaries(origin_index, x_cell_amount);

        indexesInBigField.forEach((el, i) => indexes[el] = i);

        let new_options = this.create_options(Inner_field_options, indexes, from_TMA);

        if (!from_TMA) {
            this.inner_field_data_indexes = indexes;
            this.inner_field_data_options = new_options;

            return [new_options, indexes];

        } else {
            this.TMA_inner_field_data_indexes = indexes;
            this.TMA_inner_field_data_options = new_options;

            return new_options;
        };
    };

    create_options(Inner_field_options, indexes, from_TMA) { // create options Array for inner field
        let new_options = Inner_field_options;
        this.parent.blockages = 0b0;

        for (let i of Object.keys(indexes)) {

            // cell contains data of first player. Normal skin through textContent or advanced skin with class list
            if (cells[i].textContent == PlayerData[1].PlayerForm || cells[i].classList[1] == "fa-solid") { // if player's skin is in cell i
                Inner_field_options.push(PlayerData[1].PlayerForm)

                // cell contains data of second player
            } else if (cells[i].textContent == PlayerData[2].PlayerForm) {
                Inner_field_options.push(PlayerData[2].PlayerForm)

                // cell contains nothing
            } else if (cells[i].textContent == '' && cells[i].classList.length <= 1) {
                Inner_field_options.push('')

            } else if (cells[i].classList.length >= 2 && cells[i].classList[1] != "fa-solid") {
                Inner_field_options.push('')
                if (!from_TMA) this.parent.blockages |= (1 << indexes[i]);
            };
        };

        return new_options;
    };

    calculate_boundaries(origin_index, cellSize = 5) { // calculate boundaries how the inner field should be createdd
        origin_index = Number(origin_index); // can be bigint. but should be always number here
        const boardSize = xCell_Amount;
        const row = Math.floor(origin_index / boardSize);
        const col = origin_index % boardSize;

        let startX, startY, endX, endY;

        // Spezialfall: Wenn der Spieler nahe am Rand platziert wird
        if (col < Math.floor(cellSize / 2)) {
            startX = 0;
            endX = cellSize - 1;
        } else if (col >= boardSize - Math.floor(cellSize / 2)) {
            startX = boardSize - cellSize;
            endX = boardSize - 1;
        } else {
            startX = col - Math.floor(cellSize / 2);
            endX = col + Math.floor(cellSize / 2);
        };

        if (row < Math.floor(cellSize / 2)) {
            startY = 0;
            endY = cellSize - 1;
        } else if (row >= boardSize - Math.floor(cellSize / 2)) {
            startY = boardSize - cellSize;
            endY = boardSize - 1;
        } else {
            startY = row - Math.floor(cellSize / 2);
            endY = row + Math.floor(cellSize / 2);
        };

        const indexesInBigField = [];
        for (let row = startY; row <= endY; row++) {
            for (let col = startX; col <= endX; col++) {
                const index = row * xCell_Amount + col;
                indexesInBigField.push(index);
            };
        };

        return indexesInBigField;
    };

    check_for_last(OriginIndex) { // check for last previous field && return indexes based on new origin index

        if (Object.keys(this.inner_field_data_indexes).length > 0) {
            // check if new origin index is on previous inner field
            let is_new_origin_on_old_inner_field = Object.keys(this.inner_field_data_indexes).includes(String(OriginIndex));

            let InnerFieldIndex = this.find_new_index(OriginIndex);

            if (InnerFieldIndex != undefined) {
                return [true, InnerFieldIndex]

            } else return [false];
        };

        return [false];
    };

    find_new_index(OriginIndex) { // init. index of inner field based on the new origin index
        return this.inner_field_data_indexes[parseInt(OriginIndex)];
    };

    overwrite_new_field(InnerFieldIndex, indexes) { // set inner field index value to player value
        this.inner_field_data_options[InnerFieldIndex] = PlayerData[1].PlayerForm;

        return [this.inner_field_data_options, indexes];
    };
};