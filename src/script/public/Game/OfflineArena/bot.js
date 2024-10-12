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

            // remove current win conditions
            WinConditions = [];

            // generate new win conditions for current big field
            if (board_size == 20 && costum_amount == undefined) {

                CreateWinConditions(20, 20, allowedPatterns);

            } else if (board_size == 25 && costum_amount == undefined) {

                CreateWinConditions(25, 25, allowedPatterns);

            } else if (board_size == 30 && costum_amount == undefined) {

                CreateWinConditions(30, 30, allowedPatterns);

            } else if (costum_amount == 15 && costum_amount != undefined) {

                CreateWinConditions(15, 15, allowedPatterns);
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

class TMA_handler {
    constructor(config, inner_field, parent) {
        this.config = config;
        this.inner_field = inner_field;
        this.parent = parent;
    };

    // TMA = two moves ahead algorithm
    // 1. generate win conditions for a 15x15 field
    // 2. create a 15x15 inner field for the algorithm
    // 3. let the algorithm work wether the KI can win in 2 moves
    // 4.1. player can win instantly or ki cannot win in 2 moves -> check if player can win in minimum 2 moves
    // 4.2. set at index returned by TMA algorithm

    // 1. check wether player can win instantly
    // 2. check wether ki can win in 2 moves or less
    // 3. check wether player can win in 2 moves or less
    // 4. when player cannot win in 2 moves -> attack through (first choice) good win combination or (second choice) minimax
    TMA_algorithm(MixedField_Indexes) {
        this.parent.config.generate_origin_win_conds(15).then(() => {

            // new TMA 
            this.parent.TMA_Inner_field_instance = null;
            this.parent.TMA_Inner_field_instance = new TMA_InnerField(lastCellIndex_Clicked, xCell_Amount);

            // variables and TMA worker instance
            let [TMA_indexes, TMA_options, TMA_blockages] = this.parent.TMA_Inner_field_instance.create();
            let bigboards = this.parent.config.TMA_init_big_boards(TMA_options, TMA_blockages);
            let BinaryWinConds = this.parent.config.convert_to_bigInt_binary(WinConditions);
            let [player_can_instant_win, instant_win_index] = this.parent.player_instant_win();

            // when player can instantly win, this is the highest priority
            if (player_can_instant_win) {
                this.parent.set_at_instant_win(instant_win_index);
                return;
            };

            // if the player cannot win instantly, the KI checks wether it can win in 2 moves or less
            let worker = new Worker('./Game/worker/2MovesAhead.js');
            worker.postMessage([true, WinConditions, bigboards, BinaryWinConds, PlayerData, TMA_options, Number(lastCellIndex_Clicked)]);

            worker.onmessage = (worker_result) => this.TMA_handle_result(worker, worker_result, MixedField_Indexes);
        });
    };

    TMA_handle_result(worker, worker_result, MixedField_Indexes) {
        // close worker 
        worker.terminate();

        console.log("step 1. ki can win in 2 moves: ", worker_result.data);

        // player cannot win instantly in one move and ki can win in 2 moves or less
        if (worker_result.data) {

            let index = getKeyByValue(this.parent.TMA_Inner_field_instance.indexes, Number(worker_result.data));

            let inner_field_index = MixedField_Indexes[index];
            let big_field_index = Number(index);

            this.parent.set(big_field_index, inner_field_index);

        } else {

            this.TM_player(MixedField_Indexes);
        };
    };

    async TM_player(MixedField_Indexes, fromAttack, fromKI_CheckPlayer) { // check wether player can win in 2 moves
        this.parent.config.generate_origin_win_conds(15).then(() => {

            this.parent.TMA_Inner_field_instance = null;
            this.parent.TMA_Inner_field_instance = new TMA_InnerField(lastCellIndex_Clicked, xCell_Amount);

            let [TMA_indexes, TMA_options, TMA_blockages] = this.parent.TMA_Inner_field_instance.create();
            let bigboards = this.parent.config.TMA_init_big_boards(TMA_options, TMA_blockages);
            let BinaryWinConds = convertToBinary(WinConditions);

            let worker = new Worker('./Game/worker/2MovesAhead.js');

            console.log([false, WinConditions, bigboards, BinaryWinConds, PlayerData, TMA_options, Number(lastCellIndex_Clicked)])
            worker.postMessage([false, WinConditions, bigboards, BinaryWinConds, PlayerData, TMA_options, Number(lastCellIndex_Clicked)]);

            let condition = 0;

            worker.onmessage = (worker_result) => {
                worker.terminate();
                console.log("step 2. player can win in 2 moves: ", worker_result.data, fromAttack, fromKI_CheckPlayer);

                // player can win in 2 moves -> set in corresponding field
                if (worker_result.data != false) {
                    this.TM_player_1(TMA_indexes, worker_result, MixedField_Indexes);

                    condition = 1
                };

                // player cannot win in 2 moves -> attack. First try good_win_combinations. Else try minimax
                if (worker_result.data == false && fromAttack == undefined && fromKI_CheckPlayer == undefined) {
                    this.TM_player_2(MixedField_Indexes);

                    condition = 2
                };

                // if ki cannot win in 2 moves because the player interrupted, check if player can win in 2 moves
                // if player also can't win in 2 moves the ki searches for a new free space to attack on a different space 
                if (worker_result.data == false && fromAttack == true && fromKI_CheckPlayer != true) {
                    this.TM_player_3();

                    condition = 3
                };

                // The KI should start something new through doing the following:
                // 1. Search for potential win combinations on the field where there is already a beginning so the KI has not to start everything again
                // 2. If there is no win combination => start a new field and try to attack again
                if (worker_result.data == false && fromAttack == undefined && fromKI_CheckPlayer == true) {
                    this.TM_player_4();

                    condition = 4
                };

                console.log("TMA condition type: ", condition);
            };
        });
    };

    // condition 1: player can win in 2 moves
    TM_player_1(TMA_indexes, worker_result, MixedField_Indexes) {
        let Calc_result = getKeyByValue(TMA_indexes, Number(worker_result.data));

        // init. index for small and big field
        let index = MixedField_Indexes[Calc_result];
        let BigField_Index = Number(Calc_result);

        this.parent.set(BigField_Index, index);
    };

    // condition 2: player cannot win in 2 moves. attack.
    TM_player_2(MixedField_Indexes) {
        let [ki_board, player_board, blockages] = this.parent.config.init_big_boards(options);
        this.parent.config.generate_origin_win_conds();
        let binary_win_conds = this.parent.config.convert_to_bigInt_binary(WinConditions);

        let result = this.set_at_win_cond(ki_board, player_board, blockages, player_board, ki_board, lastCellIndex_Clicked, binary_win_conds);

        if (!result) {
            this.parent.defend(MixedField_Indexes, this.inner_field.inner_field_data_options, ki_board, player_board, undefined, true);
        };
    };

    // condition 3: player cannot win in 2 moves
    TM_player_3() {
        this.TM_player(this.inner_field.inner_field_data_indexes, undefined, true);
    };

    // condition 4: player cannot win in 2 moves
    TM_player_4() {
        let [ki_board, player_board, blockages] = this.parent.config.init_big_boards(options);
        this.parent.config.generate_origin_win_conds();
        let binary_win_conds = this.parent.config.convert_to_bigInt_binary(WinConditions);

        let result = this.set_at_win_cond(ki_board, player_board, blockages, ki_board, player_board, this.parent.lastCellIndex, binary_win_conds);

        if (!result) {
            this.TM_player(this.inner_field.inner_field_data_indexes, undefined, undefined);
        };
    };

    // evaluate best win conditions for x player and set at empty cell of the win condition
    set_at_win_cond(ki_board, player_board, blockages, target_board, opponent_board, last_cell_clicked, binary_win_conds) {

        // 1. evaluate good win combinations
        for (let [i, cond] of binary_win_conds.entries()) {

            let minimum_one_drawn_cell = (target_board & BigInt(cond)) > BigInt(0);
            let no_opponent_blockages = (opponent_board & BigInt(cond)) == BigInt(0);
            let no_blockages = (blockages & BigInt(cond)) == BigInt(0);

            if (minimum_one_drawn_cell && no_opponent_blockages && no_blockages) {
                this.parent.all_good_win_combinations.push(WinConditions[i])
            };
        };

        // 2. evaluate good index in the first win condition
        if (this.parent.all_good_win_combinations.length > 0) {
            let first_win_condition = this.parent.all_good_win_combinations[0];

            // filter indexes which are blocked. The ki is not allowed to set at those indexes
            let invalid_indexes = this.index_in_condition(first_win_condition, player_board, ki_board, blockages);
            first_win_condition = first_win_condition.filter((val, i) => !invalid_indexes.includes(val));

            // make object out of array
            let win_condition_object = first_win_condition.reduce((acc, value, index) => {
                acc[value] = index;
                return acc;
            }, {});

            // evaluate index from win condition which is the nearest to the previous player index
            let best_index = this.parent.config.find_nearest_key(win_condition_object, last_cell_clicked);

            // set at index
            this.parent.set_and_attack_mode(best_index);

            console.log(first_win_condition, invalid_indexes, win_condition_object, best_index);

            return true;
        };

        return false;
    };

    index_in_condition(conditions, player_board, ki_board, blockages) {
        let invalid_indexes = [];

        for (let i of conditions) {
            let no_blockages = ((player_board >> BigInt(i)) & BigInt(1)) === BigInt(0);
            let no_ki = ((ki_board >> BigInt(i)) & BigInt(1)) === BigInt(0);
            let no_player = ((blockages >> BigInt(i)) & BigInt(1)) === BigInt(0);

            let empty_cell = no_blockages && no_ki && no_player;
            !empty_cell && invalid_indexes.push(i);
        };

        return invalid_indexes;
    };
};

class bot {
    constructor() {
        this.max_depth = 0;
        this.ki_board = 0b0;
        this.player_board = 0b0;
        this.blockages = 0b0;

        this.lastCellIndex = 0;
        this.play_mode = "defend";

        this.all_good_win_combinations = [];
        this.currently_taken_combination = [];
        this.current_combination_index = 0;
        this.binary_win_conditions;

        this.canSetTwoTimes = false;

        // "bot_config" and "inner_field" is part of "bot": bot (this) -> bot_config && inner_field
        this.inner_field = new inner_field(this.config, this);
        this.config = new bot_config(this.inner_field, this);
        this.TMA_handler = new TMA_handler(this.config, this.inner_field, this);

        this.current_workers = 4;
        this.completed_workers = 0;

        // index sum of player and ki boundary when to use minimax and when to use other algorithm
        this.index_boundary_for_minimax = [0, 100]; // 3, 20 default

        this.TMA_Inner_field_instance = null;

        // exit variable for bad code
        this.PreviousIsA_MinusOperation_SpecialCase = true;
    };

    init() {
        this.find_max_depth();
        this.start();

        this.all_good_win_combinations = [];
        this.currently_taken_combination = [];
        this.current_combination_index = 0;
        this.binary_win_conditions;
    };

    set_mode = (mode) => this.play_mode = mode;

    find_max_depth() {
        if (Math.sqrt(options.length) >= 20) max_depth = 2;
        if (curr_field == 'March into fire') max_depth = 4;
        if (curr_field == 'Quick Death') max_depth = 4;
        if (curr_field == 'Thunder Advanture') max_depth = 7;
        if (curr_field == 'Small Price') max_depth = Infinity;
    };

    start(finalMove, InnerFieldOptions, MixedField_Indexes) {

        this.config.remove_access_to_set();

        MovesAmount_PlayerAndKi++; // increase moves amount of player and ki in sum

        lastCellIndex_Clicked = Number(lastCellIndex_Clicked); // of player
        this.lastCellIndex = Number(this.lastCellIndex); // of ki

        finalMove = this.find_best_spot(options); // find most open space to place. return best move as index. otherwise null

        if (finalMove != null) {
            setTimeout(() => {
                this.set_mode("attack");
                this.set(finalMove, this.inner_field.inner_field_data_indexes[finalMove]);
            }, 1000);

            return;
        };

        // create inner field
        var [InnerFieldOptions, MixedField_Indexes] = this.inner_field.request();

        // init. bit boards
        let [ki_board, player_board] = this.config.init_bit_boards(InnerFieldOptions);

        // look for and handle instant win
        let instant_win_exists = this.instant_win_handle();

        // wether attack or defend mode
        switch (this.play_mode) {
            case "attack":
                // when user has spells -> defend. otherwise -> attack.
                if (SpellsInStore > 0) {
                    this.defend(MixedField_Indexes, InnerFieldOptions, ki_board, player_board, instant_win_exists);

                } else {
                    this.attack(instant_win_exists);
                };
                break;

            case "defend":
                this.defend(MixedField_Indexes, InnerFieldOptions, ki_board, player_board, instant_win_exists);
                break;
        };
    };

    attack(instant_win_exists) {
        !instant_win_exists && this.aim_for_win_combs();
    };

    defend(MixedField_Indexes, InnerFieldOptions, ki_board, player_board, instant_win_exists, noCondition) {
        if (instant_win_exists) return; // do not continue

        // multi-thread minimax
        let calculated_moves = new Object();

        // init. time 
        const start_time = performance.now();

        // get data to evaluate with
        let [chunks, ki_board_origin] = this.config.chunkify_and_modify(this.current_workers, InnerFieldOptions);

        WinConditions = [];
        CreateWinConditions(5, 5, allowedPatterns);

        let binaryWinConds = this.config.convert_to_binary_small_bit_mask(WinConditions);

        if (MovesAmount_PlayerAndKi > this.index_boundary_for_minimax[1] || MovesAmount_PlayerAndKi < this.index_boundary_for_minimax[0] || noCondition) { // use minimax algorithm

            chunks.forEach((chunk, i) => {
                this.workerFunction(
                    binaryWinConds, InnerFieldOptions, player_board, ki_board, PlayerData,
                    scores, max_depth, chunk, ki_board_origin, blockages, completedWorkers, currentWorkers, calculated_moves, start_time, i, MixedField_Indexes);
            });

        } else { // use TMA algorithm 
            this.TMA_handler.TMA_algorithm(MixedField_Indexes);
        };
    };

    instant_win_handle() {
        if (MovesAmount_PlayerAndKi > 5) {
            var [player_can_win, player_index] = this.player_instant_win();
            var [can_win, index] = this.instant_win();
        };

        if (can_win || player_can_win) {
            let index_to_set = can_win ? index : player_index;
            this.set_at_instant_win(index_to_set);

            return true;
        };

        return false;
    };

    find_best_spot(Boardstate, SearchNewField) {
        let board = Array.from(Boardstate);
        [...cells].forEach((el, i) => {
            if (el.classList.contains("death-cell")) board[i] = "%%";
        });

        let IconOnField = false;
        for (let el of board) {
            if (el != "" && el != "%" && el != "%%") {
                IconOnField = true;
                break;
            };
        };

        if (IconOnField && typeof SearchNewField == "undefined") {
            return null;

        } else {
            let validMoves = this.find_valid_moves(board);

            let N_blockages = Infinity;
            let bestIndexesArray = [];
            let validMove = 0;

            let listOf_bestIndexes = [];
            let valid_move_list = [];

            // field with the less amount of blockages gets choosen as the right spot for the ki to set
            validMoves.forEach(i => {
                let indexes = this.inner_field.calculate_boundaries(i);
                let current_N_blockages = 0;

                for (let j of indexes) {
                    if (board[j] != "") {
                        current_N_blockages = current_N_blockages + 1;
                    };
                };

                if (current_N_blockages <= N_blockages) {
                    N_blockages = current_N_blockages;

                    listOf_bestIndexes.push(indexes);
                    valid_move_list.push(i);
                };
            });

            // for multiple best choices: choose random field
            let rndI = Math.floor(Math.random() * listOf_bestIndexes.length);

            bestIndexesArray = listOf_bestIndexes[rndI];
            validMove = valid_move_list[rndI];

            console.log(validMove, bestIndexesArray);

            // for each index in big field an index for the inner 5x5 field
            let indexes = {}
            bestIndexesArray.forEach((el, i) => {
                indexes[el] = i;
            });
            let NewOptions = this.inner_field.create_options([], indexes);

            InnerFieldData_Indexes = indexes;
            InnerFieldData_Options = NewOptions;
            return validMove;
        };
    };

    find_valid_moves(board) {
        const squrtNumberOfBoard = Math.sqrt(board.length);
        const validMoves = [];

        for (let i = 2; i < squrtNumberOfBoard - 2; i++) {
            for (let j = 2; j < squrtNumberOfBoard - 2; j++) {

                const index = i * squrtNumberOfBoard + j;

                if (board[index] === '') {
                    validMoves.push(index);
                };
            };
        };

        return validMoves;
    };

    // check wether player can win in one move
    player_instant_win() {
        let [ki_board, player_board, blockages] = this.config.init_big_boards(options);

        this.binary_win_conditions = [];
        this.binary_win_conditions = this.config.convert_to_bigInt_binary(WinConditions);

        let current_player_board = player_board;
        let winner = PlayerData[1].PlayerForm;

        for (let i = BigInt(0); i < options.length; i++) {
            if ((((ki_board >> i) & BigInt(1)) === BigInt(0)) &&
                (((player_board >> i) & BigInt(1)) === BigInt(0)) &&
                (((blockages >> i) & BigInt(1)) === BigInt(0))) {

                current_player_board |= (BigInt(1) << i)
                let result = this.minimax_check_winner(current_player_board, winner);
                current_player_board &= ~(BigInt(1) << i)

                if (result === winner) {
                    return [true, i];
                };
            };
        };

        return [false]
    };

    // check wether ki can win in one move
    instant_win() {
        let [ki_board, player_board, blockages] = this.config.init_big_boards(options);

        for (let i = BigInt(0); i < options.length; i++) {
            if ((((ki_board >> i) & BigInt(1)) === BigInt(0)) &&
                (((player_board >> i) & BigInt(1)) === BigInt(0)) &&
                (((blockages >> i) & BigInt(1)) === BigInt(0))) {

                ki_board |= (BigInt(1) << i)
                let result = this.minimax_check_winner_bot(ki_board);
                ki_board &= ~(BigInt(1) << i)

                if (result === PlayerData[2].PlayerForm) {
                    return [true, i];
                };
            };
        };

        return [false]
    };

    set_at_instant_win(index) {
        this.set(index, this.inner_field.inner_field_data_indexes[index]);
    };

    // attacking strategy
    aim_for_win_combs() {
        WinConditions = [];
        CreateWinConditions(5, 5, allowedPatterns);

        let binary_win_conds = this.config.convert_to_binary_small_bit_mask(WinConditions);
        let [ki_board, player_board] = this.config.init_bit_boards(this.inner_field.inner_field_data_options);

        // no good win combinations? try to create them
        if (this.all_good_win_combinations.length == 0) {

            this.create_good_win_combinations(binary_win_conds, player_board, ki_board);

            this.currently_taken_combination = this.all_good_win_combinations[0];

            try {
                this.good_win_combination_get_best_index(player_board, ki_board);

            } catch (error) {
                this.TMA_handler.TM_player(this.inner_field.inner_field_data_indexes, true);
            };

        } else {
            this.TMA_handler.TM_player(this.inner_field.inner_field_data_indexes, true);
        };
    };

    create_good_win_combinations(binary_win_conds, player_board, ki_board) {

        for (let [i, cond] of binary_win_conds.entries()) {

            // check wether there is no blockage 
            if ((player_board & cond) > 0 && (this.blockages & cond) == 0 && (ki_board & cond) == 0) {

                this.all_good_win_combinations.push(WinConditions[i]);
            };
        };
    };

    good_win_combination_get_best_index(player_board, ki_board) {
        for (let i = this.currently_taken_combination.length - 1; i > 0; i--) {
            let index = this.currently_taken_combination[i];

            if (index != this.inner_field.inner_field_data_indexes[this.lastCellIndex] &&
                ((player_board >> index) & 1) === 0 &&
                ((ki_board >> index) & 1) === 0 &&
                ((this.blockages >> index) & 1) === 0

            ) {
                this.current_combination_index = index;
                this.set_at_instant_win(getKeyByValue(this.inner_field.inner_field_data_indexes, this.current_combination_index));
                break;
            };
        };
    };

    workerFunction(WinConditions, InnerFieldOptions, player_board, ki_board, PlayerData,
        scores, max_depth, chunk, KIBoardOrigin, blockages, completedWorkers_param, currentWorkers, calculatedMoves, startTime, i, MixedField_Indexes) {

        // create and start worker
        let worker = new Worker('./Game/worker/minimax.js');
        worker.postMessage([WinConditions, InnerFieldOptions, player_board, ki_board, PlayerData,
            scores, max_depth, chunk, KIBoardOrigin, blockages
        ]);

        worker.onmessage = (data) => { // calculated move from worker: move.data
            worker.terminate();

            // save move in array to evaluate best moves from the workers
            calculatedMoves[data.data[0]] = data.data[1]

            ki_board = KIBoardOrigin; // reset board to right stage
            this.completed_workers++;

            // console.log(`worker ${i} completed. result: ` + data.data[0], data.data[1]);
            // console.log(completedWorkers, currentWorkers)

            if (this.completed_workers === this.current_workers) {
                this.completed_workers = 0;

                // Check wether value is not valid (-Infinity) and delete it
                for (let key in calculatedMoves) calculatedMoves[key] === -Infinity && delete calculatedMoves[key];

                // find best move
                let bestScoreIndex = Math.max(...Object.values(calculatedMoves));

                // In the most cases, multiple keys have the same index (which is always the best score index)
                // seperate them and finally, evaluate the best of them by looking which is the nearest to the player
                let bestScoreIndexes = this.config.copy_pairs_with_duplicate_value(calculatedMoves, bestScoreIndex);

                // Finally, find nearest key: The "best" index
                let NearestKey = this.config.find_nearest_key(bestScoreIndexes, MixedField_Indexes[parseInt(lastCellIndex_Clicked)], bestScoreIndex, calculatedMoves);

                // Get key by value (key is index for cell options array)
                let BestFinalMove = NearestKey;
                let InnerField_BestFinalMove;

                try {
                    InnerField_BestFinalMove = parseInt(Object.entries(MixedField_Indexes).find(([key, val]) => val === BestFinalMove)[0]);

                    // time measurement
                    const endTime = performance.now();
                    const elapsedTime = endTime - startTime;
                    // console.log(`Worker evaluated ${elapsedTime.toFixed(2)} milliseconds.`, InnerField_BestFinalMove, BestFinalMove);

                    // set final move from bot
                    this.set(InnerField_BestFinalMove, BestFinalMove);

                } catch (error) {
                    // use some exit code here like TMA algorithm for ki/ player or something different
                    console.log(error);

                    if (lastCellIndex_Clicked > 0) { this.special_case(parseInt(lastCellIndex_Clicked) - 1) } else {
                        this.special_case(parseInt(lastCellIndex_Clicked) + 1);
                        this.PreviousIsA_MinusOperation_SpecialCase = false
                    };
                };
            };
        };
    };

    // if minimax returns -1 because of insufficient code
    special_case() {
        if (!cells[index].classList.contains("death-cell") && options[index] == "") {
            CreateWinConditions(20, 20, allPatt_KIMode_Copy);

            this.set(index, this.inner_field.inner_field_data_indexes[index]);

        } else {
            (index > 0 && !this.PreviousIsA_MinusOperation_SpecialCase) ? SpecialCaseKIPlace(index - 1): SpecialCaseKIPlace(index + 1);
        };
    };

    minimax_check_winner(Player_B, winnerIcon) {
        let winner = null;
        let tie = 0; // 1 || 0

        for (let i = 0; i < this.binary_win_conditions.length; i++) {
            let pattern = this.binary_win_conditions[i];

            if (tie == 0) tie = this.eval_tie(pattern, Player_B);

            if ((Player_B & pattern) == pattern) {
                winner = winnerIcon
                break
            };
        };

        return (winner == null && tie == 0) ? 'tie' : winner;
    };

    minimax_check_winner_bot(KI_B) {
        let winner = null;
        let tie = 0; // 1 || 0

        for (let i = 0; i < this.binary_win_conditions.length; i++) {
            let pattern = this.binary_win_conditions[i];

            if (tie == 0) tie = this.eval_tie(pattern, KI_B)

            if ((KI_B & pattern) == pattern) {
                winner = PlayerData[2].PlayerForm
                break
            };
        };

        return (winner == null && tie == 0) ? 'tie' : winner;
    };

    eval_tie(pattern, board) {
        return ((board & pattern) == BigInt(0)) ? 1 : 0;
    };

    set_and_attack_mode(finalMove) {
        setTimeout(() => {
            this.set_mode("attack");
            this.set(finalMove, this.inner_field.inner_field_data_indexes[finalMove]);
        }, 1000);
    };

    set(index, inner_field_index) { // place on given index and innerfield index
        index = Number(index);
        inner_field_index = Number(inner_field_index);

        cells[index].textContent = PlayerData[2].PlayerForm;
        cells[index].className = "cell";
        cells[index].style.opacity = "1";
        cells[index].classList.add("draw");
        cells[index].style.color = "gold";
        options[index] = PlayerData[2].PlayerForm;

        this.ki_board |= 1 << inner_field_index;
        this.inner_field.inner_field_data_options[inner_field_index] = PlayerData[2].PlayerForm;
        this.lastCellIndex = index;

        GenerateOriginWinConds().then(() => {
            if (this.canSetTwoTimes) {

                this.canSetTwoTimes = false;
                this.start();
                return;

            } else {
                checkWinner();

                setTimeout(() => {
                    cells.forEach(cell => {

                        cell.addEventListener('click', cellCicked);
                        (cell.classList.contains("draw") || cell.classList.contains("death-cell")) ? cell.style.cursor = 'default': cell.style.cursor = 'pointer';
                    });
                }, 700);
            };
        });
    };
};

let ki = new bot();