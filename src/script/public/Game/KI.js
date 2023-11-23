let max_depth;

function Find_MaxDepth() {
    if (Math.sqrt(options.length) == 20) { max_depth = 2 };
    if (curr_field == 'March into fire') { max_depth = 4 };
    if (curr_field == 'Quick Death') { max_depth = 4 };
    if (curr_field == 'Thunder Advanture') { max_depth = 7 };
    if (curr_field == 'Small Price') { max_depth = Infinity };
};

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

let ki_board = 0b0; // player 2 (ki)
let player_board = 0b0; // player 1 (human)
let blockages = 0b0; // representates the blockages on the board

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

let InnerFieldData_Indexes = {};
let InnerFieldData_Options = [];

// creates the field if there is no previous or player placed on 
// an index that is outside of the inner field
const CreateInnerField = (InnerField_Options, indexes, OriginIndex) => {
    let MainIndexes = [
        // the first index of the new row of the inner field but 
        // indexes from the main field
        (OriginIndex - 40) - 2,
        // ...
    ];

    for (let i = 20; i <= 80; i = i + 20) {
        MainIndexes.push(MainIndexes[0] + i);
    };
    // console.log(OriginIndex, MainIndexes);

    let Index = 0; // Index for inner field (5x5 size)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            indexes[MainIndexes[i] + j] = Index;
            Index++;
        };
    };

    // create options for inner field
    // console.log(Object.keys(indexes), indexes);

    let NewOptions = createInnerFieldOptions(InnerField_Options, indexes);

    InnerFieldData_Indexes = indexes;
    InnerFieldData_Options = NewOptions;
    return [NewOptions, indexes];
};

// create options array for inner field
const createInnerFieldOptions = (InnerField_Options, indexes) => {
    let NEWoptions = InnerField_Options;
    blockages = 0b0;

    for (let i of Object.keys(indexes)) {

        // cell contains data of first player
        if (cells[i].textContent == PlayerData[1].PlayerForm) {
            InnerField_Options.push(PlayerData[1].PlayerForm)

            // cell contains data of second player
        } else if (cells[i].textContent == PlayerData[2].PlayerForm) {
            InnerField_Options.push(PlayerData[2].PlayerForm)

            // cell contains nothing
        } else if (cells[i].textContent == '' && cells[i].classList.length <= 1) {
            InnerField_Options.push('')

        } else if (cells[i].classList.length >= 2) {
            InnerField_Options.push('')
            blockages |= (1 << indexes[i]);
        };
    };

    return NEWoptions;
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

// KI sets O somewhere
function KI_Action() {
    setTimeout(() => { // remove access to set for the player
        cells.forEach(cell => {
            cell.removeEventListener('click', cellCicked);
            cell.style.cursor = 'default';
        });
    }, 700);

    let InnerFieldData = RequestInnerField();
    let InnerFieldOptions = InnerFieldData[1];
    let MixedField_Indexes = InnerFieldData[2];

    // initialize bitboards
    let BitbordData = InitBitboards(InnerFieldOptions);
    let ki_board = BitbordData[0];
    let player_board = BitbordData[1];

    // console.log(blockages.toString(2), "lolololololololol", ki_board.toString(2), "lololololololololololol", player_board.toString(2));

    // worker variables
    let completedWorkers = 0;
    let currentWorkers = 1;
    let calculatedMoves = new Object();

    // initialize start time for worker 
    const startTime = performance.now();

    // get data to evaluate with
    let results = chunkifyAndModify(currentWorkers, InnerFieldOptions);
    let chunks = results[0];
    let KIBoardOrigin = results[1];

    // console.log(results, chunks, KIBoardOrigin, ki_board.toString(2), player_board.toString(2), options);
    let result = lookForInstantWin();
    console.log(result)

    if (result[0] == true) { // false
        placeAtInstantWinForOpponent(result);

    } else {
        // create a worker for each chunk
        Create_5x5_WinCombis(allPatt_KIMode_Copy);
        // convert copy of win conditions in binary
        let binaryWinConds = convertToBinary_SmallBitMask(WinConditions);
        // create one worker for each chunk 
        chunks.forEach((chunk, i) => {
            completedWorkers++;
            workerFunction(
                binaryWinConds, InnerFieldOptions, player_board, ki_board, PlayerData,
                scores, max_depth, chunk, KIBoardOrigin, blockages, completedWorkers, currentWorkers, calculatedMoves, startTime, i, MixedField_Indexes);
        });
    };
};

// KI has to set on the cell where the player could win instantly
const placeAtInstantWinForOpponent = (result) => {
    // set final move from bot
    console.log(result);
    cells[result[1]].textContent = PlayerData[2].PlayerForm;
    options[result[1]] = PlayerData[2].PlayerForm;

    // change Player
    checkWinner();

    // player gets access to set again
    setTimeout(() => {
        cells.forEach(cell => {
            cell.addEventListener('click', cellCicked);
            cell.classList.length <= 1 ? cell.style.cursor = 'pointer' : cell.style.cursor = 'default';
        });
    }, 700);
};

// if the opponent of the KI (player [you]) can beat it in just one move, the KI does not have to do calculations with the minimax algorithm 
// but just place the icon on that right cell
const lookForInstantWin = () => {
    // create big bitboards
    let bigboards = InitBigboards(options); // 0 : ki_board, 1 : player_board, 2 : blockages
    console.log(bigboards[2].toString(2));

    // set icon for player in every cell and look if he would win
    for (let i = BigInt(0); i < options.length; i++) {
        // console.log(cells[i].classList.length, val[i], val, i)
        if ((((bigboards[0] >> i) & BigInt(1)) === BigInt(0)) &&
            (((bigboards[1] >> i) & BigInt(1)) === BigInt(0)) &&
            (((bigboards[2] >> i) & BigInt(1)) === BigInt(0))) {
            // set for second player and check win
            bigboards[1] |= (BigInt(1) << i)
            let result = minimax_checkWinner(bigboards[1])
            bigboards[1] &= ~(BigInt(1) << i)

            if (result === PlayerData[1].PlayerForm) {
                return [true, i]
            }
        }
    }
    return [false]
};

// Start inner field work
const RequestInnerField = () => {
    // In big fields, create an inner 5x5 field
    let InnerFieldData = InnerField(lastCellIndex_Clicked);
    let InnerFieldOptions = InnerFieldData[0];
    let MixedField_Indexes = InnerFieldData[1];
    // console.log(InnerFieldData)

    for (let i = 0; i < InnerFieldOptions.length; i++) {
        let cell = Object.keys(MixedField_Indexes)[i];

        if (cells[parseInt(cell)].classList.length <= 1) {
            cells[parseInt(cell)].style.backgroundColor = "rgba(144, 238, 144, 0.1)";
        };
    };

    return [InnerFieldData, InnerFieldOptions, MixedField_Indexes];
};

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
            BLOCKAGES |= (BigInt(1) << i)
        }
    }

    return [KIBOARD, PLAYERBOARD, BLOCKAGES];
};

// worker tasks
const workerFunction = (WinConditions, InnerFieldOptions, player_board, ki_board, PlayerData,
    scores, max_depth, chunk, KIBoardOrigin, blockages, completedWorkers, currentWorkers, calculatedMoves, startTime, i, MixedField_Indexes) => {
    // create and start worker
    let worker = new Worker('./Game/minimax.js');
    worker.postMessage([WinConditions, InnerFieldOptions, player_board, ki_board, PlayerData,
        scores, max_depth, chunk, KIBoardOrigin, blockages
    ]);

    // workers respons
    worker.onmessage = (data) => { // calculated move from worker: move.data
        // save move in array to evaluate best moves from the workers
        calculatedMoves[data.data[0]] = data.data[1] // move with its score

        console.log(`worker ${i} completed. result: ` + data.data[0], data.data[1]);

        ki_board = KIBoardOrigin; // reset board to right stage

        if (completedWorkers === currentWorkers) { // all workers all done

            // find best move
            let bestScoreIndex = Object.values(calculatedMoves).indexOf(Math.max(...Object.values(calculatedMoves)))
            let BestFinalMove = parseInt(Object.keys(calculatedMoves)[bestScoreIndex]);
            let InnerField_BestFinalMove = parseInt(Object.entries(MixedField_Indexes).find(([key, val]) => val === BestFinalMove)[0]);

            console.log(calculatedMoves, BestFinalMove, InnerField_BestFinalMove);

            // time measurement
            const endTime = performance.now();
            const elapsedTime = endTime - startTime;
            console.log(`Worker hat ${elapsedTime.toFixed(2)} Millisekunden gebraucht.`);

            Create_20x20_WinCombis(allPatt_KIMode_Copy);

            // set final move from bot
            ki_board |= 1 << InnerField_BestFinalMove;
            cells[InnerField_BestFinalMove].textContent = currentPlayer;
            options[InnerField_BestFinalMove] = currentPlayer;
            InnerFieldData_Options[BestFinalMove] = currentPlayer;

            // change Player
            checkWinner();

            // player gets access to set again
            setTimeout(() => {
                cells.forEach(cell => {
                    cell.addEventListener('click', cellCicked);
                    cell.classList.length <= 1 ? cell.style.cursor = 'pointer' : cell.style.cursor = 'default';
                });
            }, 700);
        };
    };
};

const evaluatingTie = (pattern, Player_B) => {
    // let [a, b, c, d] = pattern;

    if ((Player_B & pattern) == BigInt(0)) {
        return 1;
    };
    return 0;
};

function minimax_checkWinner(Player_B) { // give ki and player big bit boards (type BigInt)
    let winner = null;
    let tie = 0; // 1 || 0

    let WinConds = convertToBinary(WinConditions);

    for (let i = 0; i < WinConds.length; i++) {
        let pattern = WinConds[i];

        if (tie == 0) { tie = evaluatingTie(pattern, Player_B) }

        if ((Player_B & pattern) == pattern) {
            winner = PlayerData[1].PlayerForm
            break
        }
    }

    return (winner == null && tie == 0) ? 'tie' : winner;
};