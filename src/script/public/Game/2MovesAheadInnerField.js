// creates a smaller inner field in normal field for the "2 moves ahead algorithm" 
// creates a 15x15 small field. big field is minimum 20x20 cells big
class TMA_InnerField {
    constructor(origin_index, cell_amount) {
        this.origin_index = Number(origin_index); // convert to number because it can be a bigint or string originally.
        this.cell_amount = cell_amount;

        // data 
        this.indexes = {};
        this.options = {};
        this.blockages = BigInt(0b0);
    };

    create = () => {
        // console.log(this.origin_index, this.cell_amount);

        // calculate indexes for big field. type: Array
        let indexesBigField = this.calculate_boundaries(this.origin_index);

        // create indexes object { key (index for big field): value (index for inner field) }   
        let indexes = this.calculate_indexes(indexesBigField);

        // create accurate options array with the cell data from every cell 
        let options = this.calculate_options(indexesBigField);

        // visualize inner field for debugging purpose 
        // this.visualize_inner_field(indexesBigField);

        // make data global in class instance
        this.indexes = indexes;
        this.options = options;
        // console.log(indexesBigField, indexes, options, this.indexes, this.options, this.blockages.toString(2));

        GenerateOriginWinConds(undefined);

        // return to ki (ki.js)
        return [this.indexes, this.options, this.blockages];
    };

    calculate_boundaries = (OriginIndex, cellSize = 15) => {
        const boardSize = this.cell_amount;
        const row = Math.floor(OriginIndex / boardSize);
        const col = OriginIndex % boardSize;

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
                const index = row * boardSize + col;
                indexesInBigField.push(index);
            };
        };

        return indexesInBigField;
    };

    calculate_indexes = (bigfield_indexes) => {
        let indexes = {};
        bigfield_indexes.forEach((index, i) => { // for each index in big field an index for the inner field
            indexes[index] = i;
        });

        return indexes;
    };

    calculate_options = (bigfield_indexes) => {
        let options = [];

        for (let i of bigfield_indexes) {
            // cell contains data of first player. Normal skin through textContent or advanced skin with class list
            if (cells[i].textContent == PlayerData[1].PlayerForm || cells[i].classList[1] == "fa-solid") {
                options.push(PlayerData[1].PlayerForm)

                // cell contains data from second player
            } else if (cells[i].textContent == PlayerData[2].PlayerForm) {
                options.push(PlayerData[2].PlayerForm)

                // cell contains nothing
            } else if (cells[i].textContent == "" && cells[i].classList.length <= 1) {
                options.push("")

                // cell is a blockage. push into options as ""
            } else if (cells[i].classList.length >= 2 && cells[i].classList[1] != "fa-solid") {
                options.push("");
                this.blockages |= (BigInt(1) << BigInt(i));
            };
        };

        return options;
    };

    visualize_inner_field = (bigfield_indexes) => bigfield_indexes.forEach(index => (cells[index].classList.length <= 1) && (cells[index].style.background = "rgba(185, 106, 119, 0.37)"));
};

let TMA_InnerField_instance;