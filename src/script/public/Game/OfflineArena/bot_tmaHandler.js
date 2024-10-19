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