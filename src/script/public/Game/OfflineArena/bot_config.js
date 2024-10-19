class bot_config {
    constructor(inner_field, parent) {
        this.inner_field = inner_field;
        this.parent = parent;
    };

    chunkify_and_modify(n, inner_field_options) { // create chunks for the multi core minimax algorithm
        let boards = [];
        let board_chunks = [];

        let copyKIBoard = this.parent.ki_board;
        this.parent.ki_board = 0b0;

        for (let i = 0; i < inner_field_options.length; i++) { // all possible board states in one array

            if ((((copyKIBoard >> i) & 1) === 0) &&
                (((this.parent.player_board >> i) & 1) === 0) &&
                (((this.parent.blockages >> i) & 1) === 0)
            ) {

                this.parent.ki_board |= (1 << i);
                let new_board = this.parent.ki_board;
                boards.push(new_board);
                this.parent.ki_board &= ~(1 << i);
            };
        };

        for (let i = n; i > 0; i--) { // split board states in chunks for every CPU core
            board_chunks.push(boards.splice(0, Math.ceil(boards.length / i)));
        };

        return [board_chunks, copyKIBoard];
    };

    init_bit_boards(inner_field_options) { // bit boards for inner field
        this.parent.ki_board = 0b0;
        this.parent.player_board = 0b0;

        for (let i = 0; i < inner_field_options.length; i++) {
            if (inner_field_options[i] === PlayerData[2].PlayerForm) {
                this.parent.ki_board |= (1 << i);
            };
            if (inner_field_options[i] === PlayerData[1].PlayerForm) {
                this.parent.player_board |= (1 << i);
            };
        };

        return [ki_board, player_board];
    };

    init_big_boards(Options) { // bit boards for normal field
        let KIBOARD = BigInt(0)
        let PLAYERBOARD = BigInt(0)
        let BLOCKAGES = BigInt(0)

        for (let i = BigInt(0); i < Options.length; i++) {

            if (Options[i] === PlayerData[2].PlayerForm) {
                KIBOARD |= (BigInt(1) << i)
            };

            if (Options[i] === PlayerData[1].PlayerForm) {
                PLAYERBOARD |= (BigInt(1) << i);
            };

            if (cells[i].className == "cell death-cell") {
                BLOCKAGES |= (BigInt(1) << i);
            };
        };

        return [KIBOARD, PLAYERBOARD, BLOCKAGES];
    };

    TMA_init_big_boards(opt, blocks) { // TMA: Two Moves Ahead Algorithm
        let kiBoard = BigInt(0);
        let playerBoard = BigInt(0);
        let blockas = BigInt(0);

        for (let i = BigInt(0); i < opt.length; i++) {

            if (opt[i] === PlayerData[2].PlayerForm) { // represents ki on board
                kiBoard |= (BigInt(1) << i);
            };

            if (opt[i] === PlayerData[1].PlayerForm) { // represents player on board
                playerBoard |= (BigInt(1) << i);
            };

            if (((blocks >> i) & BigInt(1)) === BigInt(1)) { // represents blockages on board
                blockas |= (BigInt(1) << i);
            };
        };

        return [kiBoard, playerBoard, blockas];
    };

    convert_to_bigInt_binary(winPatterns) { // convert win conditions for boards bigger than 32-bits 
        const binaryPatterns = [];

        for (const pattern of winPatterns) {
            let binaryRepresentation = BigInt(0);

            for (const position of pattern) binaryRepresentation += BigInt(1) << BigInt(position);

            binaryPatterns.push(binaryRepresentation)
        };

        return binaryPatterns;
    };

    convert_to_binary_small_bit_mask(winPatterns) { // convert win conditions for boards smaller than 32-bits
        const binaryPatterns = [];

        for (const pattern of winPatterns) {
            let binaryRepresentation = 0;

            for (const position of pattern) binaryRepresentation += 1 << position;

            binaryPatterns.push(binaryRepresentation);
        };

        return binaryPatterns;
    };

    remove_access_to_set() { // remove access to set for the player
        setTimeout(() => {
            cells.forEach(cell => {
                cell.removeEventListener('click', cellCicked);
                cell.style.cursor = 'default';
            });
        }, 700);
    };

    generate_origin_win_conds(costum_amount) {
        return new Promise((done) => {
            WinConditions = [];

            const size = costum_amount;
            const patternList = {
                15: GamePatternsList15,
                20: GamePatternsList20,
                25: GamePatternsList25,
                30: GamePatternsList30
            };

            if (patternList[size]) {
                CreateWinConditions(size, size, allowedPatterns.map(p => patternList[size][p]));
            };

            done();
        });
    };

    copy_pairs_with_duplicate_value(obj, targetValue) {
        let count = {};
        let resultObj = {};

        for (let key in obj) {
            let value = obj[key];
            count[value] = (count[value] || 0) + 1;
        };

        if (count[targetValue] > 1) {
            for (let key in obj) {
                if (obj[key] === targetValue) {
                    resultObj[key] = obj[key];
                };
            };
        };

        return resultObj;
    };

    find_nearest_key(obj, target, bestScoreIndex, calculatedMoves) {
        let numberArray = Object.keys(obj);

        if (numberArray.length === 0) return parseInt(getKeyByValue(calculatedMoves, bestScoreIndex));

        // Check each element in the array to find the visually closest number
        let closestNumber = numberArray[0];
        let smallestDifference = Math.abs(target - closestNumber);

        for (let i = 1; i < numberArray.length; i++) {
            let currentDifference = Math.abs(target - numberArray[i]);

            if (currentDifference < smallestDifference) {
                closestNumber = numberArray[i];
                smallestDifference = currentDifference;
            };
        };

        return Number(closestNumber);
    };
};