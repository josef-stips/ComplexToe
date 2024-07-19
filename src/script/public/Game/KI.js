// max search depth for minimax
let max_depth;

function Find_MaxDepth() {
    if (Math.sqrt(options.length) >= 20) { max_depth = 2 };
    if (curr_field == 'March into fire') { max_depth = 4 };
    if (curr_field == 'Quick Death') { max_depth = 4 };
    if (curr_field == 'Thunder Advanture') { max_depth = 7 };
    if (curr_field == 'Small Price') { max_depth = Infinity };
};

// bitboards for minimax
let ki_board = 0b0; // player 2 (ki)
let player_board = 0b0; // player 1 (human)
let blockages = 0b0; // representates the blockages on the board

let KI_lastCellIndex_Clicked = 0;

// KI modes: "attack" and "defend"
let KI_play_mode = "defend";

let all_good_win_combinations = []; // 2D Array of all win combis the KI can instantly try with the first move
let currently_taken_combination = []; // The KI chooses the first good win comb. and tries to fulfill it
let current_combination_index = 0; // Number: The current index the KI chooses of the currently taken win combination´

let Ki_canSetTwoTimesInARow = false;

// initialize bitboards
const InitBitboards = (InnerFieldOptions) => {
    ki_board = 0b0;
    player_board = 0b0;

    for (let i = 0; i < InnerFieldOptions.length; i++) {
        if (InnerFieldOptions[i] === PlayerData[2].PlayerForm) {
            ki_board |= (1 << i);
        };
        if (InnerFieldOptions[i] === PlayerData[1].PlayerForm) {
            player_board |= (1 << i);
        };
    };

    return [ki_board, player_board];
};

// initialize big bitboards
const InitBigboards = (Options) => {
    let KIBOARD = BigInt(0)
    let PLAYERBOARD = BigInt(0)
    let BLOCKAGES = BigInt(0)

    for (let i = BigInt(0); i < Options.length; i++) {
        if (Options[i] === PlayerData[2].PlayerForm) {
            KIBOARD |= (BigInt(1) << i)
        }
        if (Options[i] === PlayerData[1].PlayerForm) {
            PLAYERBOARD |= (BigInt(1) << i);
        }
        if (cells[i].classList == "cell death-cell") {
            BLOCKAGES |= (BigInt(1) << i);
        }
    }

    return [KIBOARD, PLAYERBOARD, BLOCKAGES];
};

// initialize big bitboards based on data from the TMA inner field data
const TMA_InitBigBoards = (opt, blocks) => {
    let kiBoard = BigInt(0);
    let playerBoard = BigInt(0);
    let blockas = BigInt(0);

    for (let i = BigInt(0); i < opt.length; i++) {

        if (opt[i] === PlayerData[2].PlayerForm) { // represents ki on board
            kiBoard |= (BigInt(1) << i);
        }

        if (opt[i] === PlayerData[1].PlayerForm) { // represents player on board
            playerBoard |= (BigInt(1) << i);
        }

        if (((blocks >> i) & BigInt(1)) === BigInt(1)) { // represents blockages on board
            blockas |= (BigInt(1) << i);
        }
    };

    return [kiBoard, playerBoard, blockas];
};

// convert win conditions for boards bigger than 32-bits 
function convertToBinary(winPatterns) {
    const binaryPatterns = [];
    for (const pattern of winPatterns) {
        let binaryRepresentation = BigInt(0);
        for (const position of pattern) {
            binaryRepresentation += BigInt(1) << BigInt(position)
        }
        binaryPatterns.push(binaryRepresentation)
    }
    return binaryPatterns;
};

// convert win conditions for boards smaller than 32-bits
function convertToBinary_SmallBitMask(winPatterns) {
    const binaryPatterns = [];
    for (const pattern of winPatterns) {
        let binaryRepresentation = 0;
        for (const position of pattern) {
            binaryRepresentation += 1 << position
        }
        binaryPatterns.push(binaryRepresentation)
    }
    return binaryPatterns;
};

// chunkify board conditions for workers 
const chunkifyAndModify = (n, InnerFieldOptions) => {
    let boards = [];
    let board_chunks = [];

    let copyKIBoard = ki_board;
    ki_board = 0b0;

    for (let i = 0; i < InnerFieldOptions.length; i++) { // all possible board states in one array

        if ((((copyKIBoard >> i) & 1) === 0) &&
            (((player_board >> i) & 1) === 0) &&
            (((blockages >> i) & 1) === 0)
        ) {

            ki_board |= (1 << i);
            let new_board = ki_board;
            boards.push(new_board);
            ki_board &= ~(1 << i);
        };
    };

    for (let i = n; i > 0; i--) { // split board states in chunks for every CPU core
        board_chunks.push(boards.splice(0, Math.ceil(boards.length / i)));
    };

    return [board_chunks, copyKIBoard];
};

// Everything to init and modify inner field
let InnerFieldData_Indexes = {};
let InnerFieldData_Options = [];

let TwoMoveAhead_InnerFieldData_Indexes = {};
let TwoMoveAhead_InnerFieldData_Options = [];

// Start inner field work
const RequestInnerField = () => {
    // In big fields, create an inner 5x5 field
    let InnerFieldData = KI_play_mode == "defend" ? InnerField(lastCellIndex_Clicked) : InnerField(KI_lastCellIndex_Clicked);
    let InnerFieldOptions = InnerFieldData[0];
    let MixedField_Indexes = InnerFieldData[1];

    // for (let i = 0; i < InnerFieldOptions.length; i++) {
    //     let cell = Object.keys(MixedField_Indexes)[i];

    //     if (cells[parseInt(cell)].classList.length <= 1) {
    //         cells[parseInt(cell)].style.backgroundColor = "rgba(144, 238, 144, 0.1)";
    //     };
    // };

    return [InnerFieldData, InnerFieldOptions, MixedField_Indexes];
};

// create inner field with data from single cell in big field
function InnerField(OriginIndex) { // Origin Index : Where player placed his icon
    let indexes = {};
    let InnerField_Options = [];

    let PreviousField = CheckPreviousInnerField(OriginIndex);
    let IsNewOriginOn_OldInnerField = PreviousField[0]; // true : overwrite data of previous field, false : kill previous field and create new one
    let InnerFieldIndex = PreviousField[1]; // only defined if new origin is on previous field
    // console.log(InnerFieldIndex);

    // if there was already an inner field and the player placed his icon in it
    if (IsNewOriginOn_OldInnerField) {

        let data = OverwriteNewField(InnerFieldIndex, InnerFieldData_Indexes);
        return data;

        // regardless wether there was a previous inner field,
        // if the player placed on another place outside of the previous inner field
        // a new inner field gets created
    } else {
        // delete color of previous field
        for (let i = 0; i < InnerFieldData_Options.length; i++) {
            let cell = Object.keys(InnerFieldData_Indexes)[i];

            if (cells[parseInt(cell)].classList.length <= 1) {
                cells[parseInt(cell)].style.backgroundColor = "unset";
            };
        };

        // initialize the first indexes (based on normal field) 
        // of a single row in the 5x5 field 
        let data = CreateInnerField(InnerField_Options, indexes, OriginIndex);
        return data;
    };
};

// check if there was previous field and return its new indexes based on new origin index
const CheckPreviousInnerField = (OriginIndex) => {
    // check if previous inner field exists
    if (Object.keys(InnerFieldData_Indexes).length > 0) {
        // check if new origin index is on previous inner field
        IsNewOriginOn_OldInnerField = Object.keys(InnerFieldData_Indexes).includes(String(OriginIndex));

        let InnerFieldIndex = FindNewIndex(OriginIndex);

        if (InnerFieldIndex != undefined) {
            return [true, InnerFieldIndex]

        } else return [false];
    };

    return [false];
};

const FindNewIndex = (OriginIndex) => {
    // initialize the index of the inner field based on the new origin index
    return InnerFieldData_Indexes[parseInt(OriginIndex)];
};

const OverwriteNewField = (InnerFieldIndex, indexes) => {
    InnerFieldData_Options[InnerFieldIndex] = PlayerData[1].PlayerForm;

    return [InnerFieldData_Options, indexes];
};

// creates the field if there is no previous or player placed on 
// an index that is outside of the inner field

// 2 move ahead is a technic for complextoe where the ki calculates the best moves for the next two moves one player does.
// But it has to create a smaller field first to be able to be fast

const CreateInnerField = (InnerField_Options, indexes, OriginIndex, from2MoveAhead, xCellamount) => {
    let indexesInBigField = InnerFieldCreation_calculateBoundaries(OriginIndex, xCellamount);
    // console.log(indexesInBigField)

    indexesInBigField.forEach((el, i) => { // for each index in big field an index for the inner 5x5 field
        indexes[el] = i;
    });

    let NewOptions = createInnerFieldOptions(InnerField_Options, indexes, from2MoveAhead);

    if (!from2MoveAhead) {
        InnerFieldData_Indexes = indexes;
        InnerFieldData_Options = NewOptions;

        return [NewOptions, indexes];
    } else {
        TwoMoveAhead_InnerFieldData_Indexes = indexes;
        TwoMoveAhead_InnerFieldData_Options = NewOptions;

        return NewOptions;
    };
};

// create options array for inner field
const createInnerFieldOptions = (InnerField_Options, indexes, from2MoveAhead) => {
    let NEWoptions = InnerField_Options;
    blockages = 0b0;

    for (let i of Object.keys(indexes)) {
        // cell contains data of first player. Normal skin through textContent or advanced skin with class list
        if (cells[i].textContent == PlayerData[1].PlayerForm || cells[i].classList[1] == "fa-solid") { // if player's skin is in cell i
            InnerField_Options.push(PlayerData[1].PlayerForm)

            // cell contains data of second player
        } else if (cells[i].textContent == PlayerData[2].PlayerForm) {
            InnerField_Options.push(PlayerData[2].PlayerForm)

            // cell contains nothing
        } else if (cells[i].textContent == '' && cells[i].classList.length <= 1) {
            InnerField_Options.push('')

        } else if (cells[i].classList.length >= 2 && cells[i].classList[1] != "fa-solid") {
            InnerField_Options.push('')
            if (!from2MoveAhead) blockages |= (1 << indexes[i]);
        };
    };

    return NEWoptions;
};

// normally the origin index of the player in the innerfield is in the middle
// but was is if he places near the eadges?
const InnerFieldCreation_calculateBoundaries = (OriginIndex, cellSize = 5) => {
    OriginIndex = Number(OriginIndex); // can be bigin. but should be always number here
    const boardSize = xCell_Amount;
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
            const index = row * xCell_Amount + col;
            indexesInBigField.push(index);
        };
    };

    return indexesInBigField;
};

function findValidMoves(board) {

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

// Find best index on the field
const FindBestSpot = (Boardstate, SearchNewField) => {
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
        let validMoves = findValidMoves(board);

        let N_blockages = Infinity;
        let bestIndexesArray = [];
        let validMove = 0;

        let listOf_bestIndexes = [];
        let valid_move_list = [];

        // field with the less amount of blockages gets choosen as the right spot for the ki to set
        validMoves.forEach(i => {
            let indexes = InnerFieldCreation_calculateBoundaries(i);
            let current_N_blockages = 0;

            for (j of indexes) {
                if (board[j] != "") {
                    current_N_blockages = current_N_blockages + 1;
                };
            };

            if (current_N_blockages <= N_blockages) {
                N_blockages = current_N_blockages;
                // bestIndexesArray = indexes;
                // validMove = i;

                listOf_bestIndexes.push(indexes);
                valid_move_list.push(i);
            };
        });

        console.log(listOf_bestIndexes);

        // for multiple best choices: choose random field
        let rndI = Math.floor(Math.random() * listOf_bestIndexes.length);

        bestIndexesArray = listOf_bestIndexes[rndI];
        validMove = valid_move_list[rndI];

        // for each index in big field an index for the inner 5x5 field
        let indexes = {}
        bestIndexesArray.forEach((el, i) => {
            indexes[el] = i;
        });
        let NewOptions = createInnerFieldOptions([], indexes);

        InnerFieldData_Indexes = indexes;
        InnerFieldData_Options = NewOptions;
        return validMove;
    };
};

// worker amount 
let completedWorkers = 0;
let currentWorkers = 4;

// KI sets O somewhere
function KI_Action() {
    console.log("lol");

    setTimeout(() => { // remove access to set for the player
        cells.forEach(cell => {
            cell.removeEventListener('click', cellCicked);
            cell.style.cursor = 'default';
        });
    }, 700);

    MovesAmount_PlayerAndKi++;
    lastCellIndex_Clicked = Number(lastCellIndex_Clicked);
    KI_lastCellIndex_Clicked = Number(KI_lastCellIndex_Clicked);

    // if KI can place first it needs to find the best, that means the most open space, spot on the field
    let finalMove;
    finalMove = FindBestSpot(options); // return index

    // if the KI is the first to place and the eval found the best index 
    if (finalMove != null) {
        setTimeout(() => {
            // set mode
            KI_play_mode = "attack";

            // set final move from bot
            ki_set(finalMove, InnerFieldData_Indexes[finalMove]);
        }, 1000);
        return;
    };

    var InnerFieldData = RequestInnerField();
    var InnerFieldOptions = InnerFieldData[1];
    var MixedField_Indexes = InnerFieldData[2];

    // initialize bitboards
    let BitbordData = InitBitboards(InnerFieldData_Options);
    let ki_board = BitbordData[0];
    let player_board = BitbordData[1];

    if (KI_play_mode == "attack") {
        let result = [0b0]; // 0b0 = placeholder
        if (MovesAmount_PlayerAndKi > 5) result = lookForInstantWin();
        let KIMove_result = [0b0];
        if (MovesAmount_PlayerAndKi > 5) KIMove_result = lookForInstantWin_KI();

        if (KIMove_result[0] == true) { // if KI can win with one move left
            KI_placeAtInstantWin(KIMove_result);
            return;
        };
        if (result[0] == true) { // if player can win with one move left KI has to place there
            placeAtInstantWinForOpponent(result);
            return;
        };

        KI_aim_WinCombis();

        // "defend"
    } else {

        // worker variables
        completedWorkers = 0;
        currentWorkers = 4;
        let calculatedMoves = new Object();

        // initialize start time for worker 
        const startTime = performance.now();

        // get data to evaluate with
        let results = chunkifyAndModify(currentWorkers, InnerFieldOptions);
        let chunks = results[0];
        let KIBoardOrigin = results[1];

        let result = [0b0]; // 0b0 = placeholder
        if (MovesAmount_PlayerAndKi > 5) result = lookForInstantWin();
        let KIMove_result = [0b0];
        if (MovesAmount_PlayerAndKi > 5) KIMove_result = lookForInstantWin_KI();

        if (KIMove_result[0] == true) { // if KI can win with one move left
            KI_placeAtInstantWin(KIMove_result);
            return;
        };

        if (result[0] == true) { // if player can win with one move left KI has to place there
            placeAtInstantWinForOpponent(result);

        } else {
            // remove current win conditions
            WinConditions = [];

            // create win conditions for mini field in big field
            CreateWinConditions(5, 5, allowedPatterns);

            // convert copy of win conditions in binary
            let binaryWinConds = convertToBinary_SmallBitMask(WinConditions);
            // console.log(options, InnerFieldOptions, InnerFieldData_Options, InnerFieldData_Indexes, InnerFieldData, blockages.toString(2), binaryWinConds.toString(2));

            if (MovesAmount_PlayerAndKi > 20 || MovesAmount_PlayerAndKi < 3) {
                // create one worker for each chunk 
                chunks.forEach((chunk, i) => {
                    workerFunction(
                        binaryWinConds, InnerFieldOptions, player_board, ki_board, PlayerData,
                        scores, max_depth, chunk, KIBoardOrigin, blockages, completedWorkers, currentWorkers, calculatedMoves, startTime, i, MixedField_Indexes);
                });
            } else {

                // create win conditions for the 15x15 inner field 
                GenerateOriginWinConds(15).then(() => {
                    TMA_InnerField_instance = null;
                    TMA_InnerField_instance = new TMA_InnerField(lastCellIndex_Clicked, xCell_Amount);
                    // short options so the worker has less work
                    let TMA_InnerField_Data = TMA_InnerField_instance.create();

                    let TMA_indexes = TMA_InnerField_Data[0];
                    let TMA_options = TMA_InnerField_Data[1];
                    let TMA_blockages = TMA_InnerField_Data[2];

                    // console.log(TMA_InnerField_Data, TMA_indexes, TMA_options, TMA_blockages.toString(2));

                    // create big bitboards
                    let bigboards = TMA_InitBigBoards(TMA_options, TMA_blockages); // 0: ki_board, 1: player_board, 2: blockages
                    // create big binary win conds
                    let BinaryWinConds = convertToBinary(WinConditions);
                    // check if player can win in 1 move                             
                    let result = lookForInstantWin();
                    // check if ki can win in 2 moves or less
                    let worker = new Worker("./Game/worker/2MovesAhead.js");
                    // start worker
                    worker.postMessage([true, WinConditions, bigboards, BinaryWinConds, PlayerData, TMA_options, Number(lastCellIndex_Clicked)]);
                    // worker finished
                    worker.onmessage = (worker_result) => {
                        // console.log(worker_result.data, lastCellIndex_Clicked, InnerFieldData_Indexes[lastCellIndex_Clicked]);

                        worker.terminate();

                        // if player can't win in 1 move but ki can win in 2 moves, set move for attacking because it is more valuable
                        if (!result[0] && worker_result.data) {

                            // console.log(TMA_InnerField_instance.indexes, worker_result.data);

                            // resuklt_ki = index for big field
                            let result_ki = getKeyByValue(TMA_InnerField_instance.indexes, Number(worker_result.data));
                            // init. index
                            let index = MixedField_Indexes[result_ki];
                            BigField_Index = Number(result_ki);

                            // console.log("ki worker result: ", result, result_ki);
                            // console.log(index, BigField_Index);

                            ki_set(BigField_Index, index);

                        } else {
                            PlayerCanWinIn2Moves(MixedField_Indexes);
                        };
                    };
                });
            };
        };
    };
};

// win conditions in bit version
let WinConds;

// Ki is in attack mode
const KI_aim_WinCombis = () => {
    // remove current win conditions
    WinConditions = [];

    // create win conditions for mini field in big field
    CreateWinConditions(5, 5, allowedPatterns);

    // convert copy of win conditions in binary
    let binaryWinConds = convertToBinary_SmallBitMask(WinConditions);

    // get bitboards for the game field
    let bitboards = InitBitboards(InnerFieldData_Options); // 1 : ki_board, 0 : player_board, 2 : blockages

    // console.log(bitboards, blockages.toString(2), InnerFieldData_Options);
    // console.log(WinConditions, binaryWinConds);

    if (all_good_win_combinations.length == 0) {

        // look and add good win combis for the KI
        for (let [i, cond] of binaryWinConds.entries()) {
            // console.log((bitboards[0] & cond), (blockages & cond), (bitboards[1] & cond));
            // check if in the win combination is good and if there is no blockage
            if ((bitboards[1] & cond) > 0 && (blockages & cond) == 0 && (bitboards[0] & cond) == 0) {
                all_good_win_combinations.push(WinConditions[i]);
            };
        };

        currently_taken_combination = all_good_win_combinations[0];

        try {
            for (let i = currently_taken_combination.length - 1; i > 0; i--) {
                let index = currently_taken_combination[i];

                // console.log(index, KI_lastCellIndex_Clicked, InnerFieldData_Indexes[KI_lastCellIndex_Clicked], current_combination_index, currently_taken_combination)
                // console.log(((bitboards[1] >> index) & 1), ((bitboards[0] >> index) & 1), ((blockages >> index) & 1))

                if (index != InnerFieldData_Indexes[KI_lastCellIndex_Clicked] &&
                    ((bitboards[1] >> index) & 1) === 0 &&
                    ((bitboards[0] >> index) & 1) === 0 &&
                    ((blockages >> index) & 1) === 0
                ) {
                    current_combination_index = index;
                    placeAtInstantWinForOpponent([true, getKeyByValue(InnerFieldData_Indexes, current_combination_index)]);
                    break;
                };
            };

        } catch (error) {
            PlayerCanWinIn2Moves(InnerFieldData_Indexes, true);
        };

    } else {
        PlayerCanWinIn2Moves(InnerFieldData_Indexes, true);
    };
};

// if the opponent of the KI (player [you]) can beat it in just one move, the KI does not have to do calculations with the minimax algorithm 
// but just place the icon on that right cell
const lookForInstantWin = (BigBoard) => {
    // create big bitboards
    let bigboards = InitBigboards(options); // 0 : ki_board, 1 : player_board, 2 : blockages
    // init bit-based win conditions
    WinConds = [];
    WinConds = convertToBinary(WinConditions);

    let player_board; // ki board or player board
    let winner; // ki or player icon

    if (BigBoard) {
        player_board = BigBoard; // ki
        winner = PlayerData[2].PlayerForm;

    } else {
        player_board = bigboards[1]; // player
        winner = PlayerData[1].PlayerForm;
    };

    // console.log(BigBoard.toString(2), winner, player_board);

    // set icon for player in every cell and look if he would win
    for (let i = BigInt(0); i < options.length; i++) {
        // and operator for big int with 1
        if ((((bigboards[0] >> i) & BigInt(1)) === BigInt(0)) &&
            (((bigboards[1] >> i) & BigInt(1)) === BigInt(0)) &&
            (((bigboards[2] >> i) & BigInt(1)) === BigInt(0))) {
            // set for second player and check win
            player_board |= (BigInt(1) << i)
            let result = minimax_checkWinner(player_board, winner);
            player_board &= ~(BigInt(1) << i)

            if (result === winner) {
                return [true, i]
            }
        }
    }
    return [false]
};

// KI has to set on the cell where the player could win instantly
const placeAtInstantWinForOpponent = (result) => {
    ki_set(result[1], InnerFieldData_Indexes[result[1]]);
};

// if the opponent of the KI (player [you]) can beat it in just one move, the KI does not have to do calculations with the minimax algorithm 
// but just place the icon on that right cell
const lookForInstantWin_KI = () => {
    // create big bitboards
    let bigboards = InitBigboards(options); // 0 : ki_board, 1 : player_board, 2 : blockages

    // set icon for player in every cell and look if he would win
    for (let i = BigInt(0); i < options.length; i++) {
        // console.log(cells[i].classList.length, val[i], val, i)
        if ((((bigboards[0] >> i) & BigInt(1)) === BigInt(0)) &&
            (((bigboards[1] >> i) & BigInt(1)) === BigInt(0)) &&
            (((bigboards[2] >> i) & BigInt(1)) === BigInt(0))) {
            // set for second player and check win
            bigboards[0] |= (BigInt(1) << i)
            let result = minimax_checkWinner_KI(bigboards[0])
            bigboards[0] &= ~(BigInt(1) << i)

            if (result === PlayerData[2].PlayerForm) {
                return [true, i]
            }
        }
    }
    return [false]
};

// KI has to set on the cell where the player could win instantly
const KI_placeAtInstantWin = (result) => {
    ki_set(result[1], InnerFieldData_Indexes[result[1]]);
};

// Generate original win conditions for the real big field
const GenerateOriginWinConds = (costum_amount) => {
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

// for the best score evaluation: seperate pairs with similar value
function copyPairsWithDuplicateValue(obj, targetValue) {
    let count = {};
    let resultObj = {};

    // Zähle die Häufigkeit jedes Werts im Objekt
    for (let key in obj) {
        let value = obj[key];
        count[value] = (count[value] || 0) + 1;
    };

    // Überprüfe, ob der Zielwert mehr als einmal vorkommt
    if (count[targetValue] > 1) {
        // Kopiere die Key-Value-Paare mit dem Zielwert in das Ergebnisobjekt
        for (let key in obj) {
            if (obj[key] === targetValue) {
                resultObj[key] = obj[key];
            };
        };
    };
    return resultObj;
};

function findNearestKey(obj, target, bestScoreIndex, calculatedMoves) {
    let zahlenArray = Object.keys(obj);

    if (zahlenArray.length === 0) return parseInt(getKeyByValue(calculatedMoves, bestScoreIndex));

    // Überprüfen Sie jedes Element im Array, um die visuell nächste Zahl zu finden
    let nahesteZahl = zahlenArray[0];
    let kleinsterUnterschied = Math.abs(target - nahesteZahl);

    for (let i = 1; i < zahlenArray.length; i++) {
        let aktuellerUnterschied = Math.abs(target - zahlenArray[i]);

        if (aktuellerUnterschied < kleinsterUnterschied) {
            nahesteZahl = zahlenArray[i];
            kleinsterUnterschied = aktuellerUnterschied;
        }
    }

    return Number(nahesteZahl);
}

// a variable for special case in minimax algorithm where KI returns -1
let PreviousIsA_MinusOperation_SpecialCase = true;

// worker tasks
const workerFunction = (WinConditions, InnerFieldOptions, player_board, ki_board, PlayerData,
    scores, max_depth, chunk, KIBoardOrigin, blockages, completedWorkers_param, currentWorkers, calculatedMoves, startTime, i, MixedField_Indexes) => {
    // create and start worker
    let worker = new Worker('./Game/worker/minimax.js');
    worker.postMessage([WinConditions, InnerFieldOptions, player_board, ki_board, PlayerData,
        scores, max_depth, chunk, KIBoardOrigin, blockages
    ]);

    // workers respons
    worker.onmessage = (data) => { // calculated move from worker: move.data
        worker.terminate();

        // save move in array to evaluate best moves from the workers
        calculatedMoves[data.data[0]] = data.data[1] // move with its score

        // console.log(`worker ${i} completed. result: ` + data.data[0], data.data[1]);
        ki_board = KIBoardOrigin; // reset board to right stage

        completedWorkers++;
        // console.log(completedWorkers, currentWorkers)
        if (completedWorkers === currentWorkers) { // all workers all done
            // Check wether value is not valid (-Infinity) and delete so
            for (let key in calculatedMoves) calculatedMoves[key] === -Infinity && delete calculatedMoves[key];
            // find best move
            let bestScoreIndex = Math.max(...Object.values(calculatedMoves));
            // In the most cases, multiple keys have the same index (which is always the best score index)
            // seperate them and finally, evaluate the best of them by looking which is the nearest to the player
            let bestScoreIndexes = copyPairsWithDuplicateValue(calculatedMoves, bestScoreIndex);
            // Finally, find nearest key: The "best" index
            let NearestKey = findNearestKey(bestScoreIndexes, MixedField_Indexes[parseInt(lastCellIndex_Clicked)], bestScoreIndex, calculatedMoves);
            // Get key by value (key is index for cell options array)
            let BestFinalMove = NearestKey;
            let InnerField_BestFinalMove;

            try {
                InnerField_BestFinalMove = parseInt(Object.entries(MixedField_Indexes).find(([key, val]) => val === BestFinalMove)[0]);

                // time measurement
                const endTime = performance.now();
                const elapsedTime = endTime - startTime;
                // console.log(`Worker hat ${elapsedTime.toFixed(2)} Millisekunden gebraucht.`);

                // set final move from bot
                ki_set(InnerField_BestFinalMove, BestFinalMove);

            } catch (error) {
                console.log(error);
                // PlayerCanWinIn2Moves(MixedField_Indexes);
                if (lastCellIndex_Clicked > 0) { SpecialCaseKIPlace(parseInt(lastCellIndex_Clicked) - 1) } else {
                    SpecialCaseKIPlace(parseInt(lastCellIndex_Clicked) + 1);
                    PreviousIsA_MinusOperation_SpecialCase = false
                };
            };
        };
    };
};

// look if the player can win in 2 moves
// fromKi_CheckPlayer: Ki is in attack mode, couldn't win in 2 moves, checks if player can win, player can't win so ki searches new place
const PlayerCanWinIn2Moves = async(MixedField_Indexes, fromAttack, fromKI_CheckPlayer) => {

    // create win conditions for the 15x15 inner field 
    GenerateOriginWinConds(15).then(() => {
        TMA_InnerField_instance = null;
        TMA_InnerField_instance = new TMA_InnerField(lastCellIndex_Clicked, xCell_Amount);
        // short options so the worker has less work
        let TMA_InnerField_Data = TMA_InnerField_instance.create();

        let TMA_indexes = TMA_InnerField_Data[0];
        let TMA_options = TMA_InnerField_Data[1];
        let TMA_blockages = TMA_InnerField_Data[2];

        // console.log(TMA_InnerField_Data, TMA_indexes, TMA_options, TMA_blockages.toString(2));

        // create big bitboards
        let bigboards = TMA_InitBigBoards(TMA_options, TMA_blockages); // 0: ki_board, 1: player_board, 2: blockages
        // create big binary win conds
        let BinaryWinConds = convertToBinary(WinConditions);
        // check if ki can win in 2 moves or less
        let worker = new Worker("./Game/worker/2MovesAhead.js");
        // start worker
        worker.postMessage([fromAttack, WinConditions, bigboards, BinaryWinConds, PlayerData, TMA_options, Number(lastCellIndex_Clicked)]);

        // calcualte. returns false or index
        worker.onmessage = (worker_result) => {
            // console.log(worker_result.data, fromAttack, fromKI_CheckPlayer);

            worker.terminate();
            // says wether the player can win in 2 moves
            if (worker_result.data != false) {
                // index for normal big field
                let Calc_result = getKeyByValue(TMA_indexes, Number(worker_result.data)); // Calc_result = index for big field
                // init. index for small and big field
                let index = MixedField_Indexes[Calc_result];
                let BigField_Index = Number(Calc_result);

                // console.log(TMA_InnerField_instance.indexes, worker_result.data);

                // console.log("ki worker result: ", Calc_result, BigField_Index);
                // console.log(Calc_result, fromAttack, fromKI_CheckPlayer);

                ki_set(BigField_Index, index);

            } else if (worker_result.data == false && fromAttack == undefined && fromKI_CheckPlayer == undefined) {

                // 1. Find potential
                let bigboards = InitBigboards(options); // 0: ki_board, 1: player_board, 2: blockages
                GenerateOriginWinConds();
                let binaryWinConds_forPlayer = convertToBinary(WinConditions);

                // look and add good win combis for the KI
                for (let [i, cond] of binaryWinConds_forPlayer.entries()) {
                    // console.log((bigboards[0] & BigInt(cond)), (BigInt(blockages) & BigInt(cond)), (bigboards[1] & BigInt(cond)));
                    // check if in the win combination is good and if there is no blockage
                    if ((bigboards[1] & BigInt(cond)) > BigInt(0) && (bigboards[2] & BigInt(cond)) == BigInt(0) && (bigboards[0] & BigInt(cond)) == BigInt(0)) {
                        all_good_win_combinations.push(WinConditions[i]);

                        // console.log(WinConditions[i][0], i, blockages.toString(2), bigboards[2].toString(2), ((bigboards[2] >> BigInt(WinConditions[i][0])) & BigInt(1)));
                        if (options[WinConditions[i][0]] == "" && (((bigboards[2] >> BigInt(WinConditions[i][0])) & BigInt(1)) === BigInt(0))) {
                            // console.log("sdfaifhndifjhasdfuiasdhflshdjifjasdlfjdf", WinConditions[i][0]);
                            ki_set(Number(WinConditions[i][0]), Number(InnerFieldData_Indexes[WinConditions[i][0]]));
                            return;

                        } else continue;
                    };
                };

                // call minimax
                let calculatedMoves = new Object();
                // initialize start time for worker 
                const startTime = performance.now();

                // get data to evaluate with
                let results = chunkifyAndModify(currentWorkers, InnerFieldData_Options);
                let chunks = results[0];
                let KIBoardOrigin = results[1];

                // remove current win conditions
                WinConditions = [];
                // create win conditions for mini field in big field
                CreateWinConditions(5, 5, allowedPatterns);

                // convert copy of win conditions in binary
                let binaryWinConds = convertToBinary_SmallBitMask(WinConditions);
                // console.log(options, InnerFieldOptions, InnerFieldData_Options, InnerFieldData_Indexes, InnerFieldData, blockages.toString(2), binaryWinConds.toString(2));

                // create one worker for each chunk 
                chunks.forEach((chunk, i) => {
                    workerFunction(
                        binaryWinConds, InnerFieldData_Options, player_board, ki_board, PlayerData,
                        scores, max_depth, chunk, KIBoardOrigin, blockages, completedWorkers, currentWorkers, calculatedMoves, startTime, i, MixedField_Indexes);
                });

            } else if (worker_result.data == false && fromAttack == true && fromKI_CheckPlayer != true) {
                // if ki cannot win in 2 moves because the player interrupted, check if player can win in 2 moves
                // if player also can't win in 2 moves the ki searches for a new free space to attack on a different space 
                PlayerCanWinIn2Moves(InnerFieldData_Indexes, undefined, true);

            } else if (worker_result.data == false && fromAttack == undefined && fromKI_CheckPlayer == true) {
                // The KI should start something new through doing the following:
                // 1. Search for potential win combinations on the field where there is already a beginning so the KI has not to start everything again
                // 2. If there is no win combination => start a new field and try to attack again

                // 1. Find potential
                let bigboards = InitBigboards(options); // 0: ki_board, 1: player_board, 2: blockages
                GenerateOriginWinConds();
                let binaryWinConds = convertToBinary(WinConditions);

                // look and add good win combis for the KI
                for (let [i, cond] of binaryWinConds.entries()) {
                    // console.log((bigboards[0] & BigInt(cond)), (BigInt(blockages) & BigInt(cond)), (bigboards[1] & BigInt(cond)));
                    // check if in the win combination is good and if there is no blockage
                    if ((bigboards[0] & BigInt(cond)) > BigInt(0) && (bigboards[2] & BigInt(cond)) == BigInt(0) && (bigboards[1] & BigInt(cond)) == BigInt(0)) {
                        all_good_win_combinations.push(WinConditions[i]);

                        // console.log(WinConditions[i][0], i, blockages.toString(2), bigboards[2].toString(2), ((bigboards[2] >> BigInt(WinConditions[i][0])) & BigInt(1)));
                        if (options[WinConditions[i][0]] == "" && (((bigboards[2] >> BigInt(WinConditions[i][0])) & BigInt(1)) === BigInt(0))) {
                            // console.log("sdfaifhndifjhasdfuiasdhflshdjifjasdlfjdf", WinConditions[i][0]);
                            KI_move(WinConditions[i][0]);
                            return;

                        } else continue;
                    };
                };

                PlayerCanWinIn2Moves(InnerFieldData_Indexes, undefined, undefined);

                // // search for new field and place new attack --------------------------------
                // // remove access to set for the player
                // setTimeout(() => {
                //     cells.forEach(cell => {
                //         cell.removeEventListener('click', cellCicked);
                //         cell.style.cursor = 'default';
                //     });
                // }, 700);
                // MovesAmount_PlayerAndKi++;

                // // if KI can place first it needs to find the best, that means the most open space, spot on the field
                // let finalMove;
                // finalMove = FindBestSpot(options, true); // return index

                // // if the KI is the first to place and the eval found the best index 
                // if (finalMove != null) {
                //     KI_move(finalMove);
                //     return;
                // };
            };
        };
    });
};

// normal move from ki
const KI_move = (finalMove) => {
    setTimeout(() => {
        // set mode
        KI_play_mode = "attack";
        // set move
        ki_set(finalMove, InnerFieldData_Indexes[finalMove]);
    }, 1000);
};

// if minimax returns -1 for some reason
const SpecialCaseKIPlace = (index) => {
    if (!cells[index].classList.contains("death-cell") && options[index] == "") {
        CreateWinConditions(20, 20, allPatt_KIMode_Copy);

        ki_set(index, InnerFieldData_Indexes[index]);

    } else {
        (index > 0 && !PreviousIsA_MinusOperation_SpecialCase) ? SpecialCaseKIPlace(index - 1): SpecialCaseKIPlace(index + 1);
    };
};

// check if there is tie for a specific board state 
const evaluatingTie = (pattern, Board) => {
    if ((Board & pattern) == BigInt(0)) {
        return 1;
    };
    return 0;
};

// ki has a move to set on an already calculated position
const ki_set = (index, inner_field_index) => {
    index = Number(index);
    inner_field_index = Number(inner_field_index);
    all_game_moves.push(index);

    // console.log("index:", index, "inner field index:", inner_field_index);

    // on bitboard
    ki_board |= 1 << inner_field_index;
    // on arrays and visual board
    cells[index].textContent = PlayerData[2].PlayerForm;
    cells[index].className = "cell";
    cells[index].style.opacity = "1";
    cells[index].classList.add("draw");
    options[index] = PlayerData[2].PlayerForm;
    InnerFieldData_Options[inner_field_index] = PlayerData[2].PlayerForm;

    // for color
    cells[index].style.color = "gold";

    // update last clicked cell
    KI_lastCellIndex_Clicked = index;

    // console.log(Ki_canSetTwoTimesInARow);

    GenerateOriginWinConds().then(() => {
        if (Ki_canSetTwoTimesInARow) {

            // ki can set a second time
            Ki_canSetTwoTimesInARow = false;
            KI_Action();

            return;

        } else if (!Ki_canSetTwoTimesInARow) {

            // change Player
            checkWinner();

            // player gets access to set again
            setTimeout(() => {
                cells.forEach(cell => {
                    cell.addEventListener('click', cellCicked);

                    if (cell.classList.contains("draw") || cell.classList.contains("death-cell")) {
                        cell.style.cursor = 'default';

                    } else {
                        cell.style.cursor = 'pointer';
                    };
                });
            }, 700);
        };
    });
};

// check if player has won
function minimax_checkWinner(Player_B, winnerIcon) { // give player big bit boards (type BigInt)
    let winner = null;
    let tie = 0; // 1 || 0

    for (let i = 0; i < WinConds.length; i++) {
        let pattern = WinConds[i];

        if (tie == 0) tie = evaluatingTie(pattern, Player_B)

        if ((Player_B & pattern) == pattern) {
            winner = winnerIcon
            break
        }
    }
    return (winner == null && tie == 0) ? 'tie' : winner;
};

// check if ki has won
function minimax_checkWinner_KI(KI_B) { // give ki big bit boards (type BigInt)
    let winner = null;
    let tie = 0; // 1 || 0

    for (let i = 0; i < WinConds.length; i++) {
        let pattern = WinConds[i];

        if (tie == 0) tie = evaluatingTie(pattern, KI_B)

        if ((KI_B & pattern) == pattern) {
            winner = PlayerData[2].PlayerForm
            break
        }
    }

    return (winner == null && tie == 0) ? 'tie' : winner;
};