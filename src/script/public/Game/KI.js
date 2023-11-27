// max search depth for minimax
let max_depth;

function Find_MaxDepth() {
    if (Math.sqrt(options.length) >= 20) { max_depth = 3 };
    if (curr_field == 'March into fire') { max_depth = 4 };
    if (curr_field == 'Quick Death') { max_depth = 4 };
    if (curr_field == 'Thunder Advanture') { max_depth = 7 };
    if (curr_field == 'Small Price') { max_depth = Infinity };
};

// bitboards for minimax
let ki_board = 0b0; // player 2 (ki)
let player_board = 0b0; // player 1 (human)
let blockages = 0b0; // representates the blockages on the board

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

// Start inner field work
const RequestInnerField = () => {
    // In big fields, create an inner 5x5 field
    let InnerFieldData = InnerField(lastCellIndex_Clicked);
    let InnerFieldOptions = InnerFieldData[0];
    let MixedField_Indexes = InnerFieldData[1];

    for (let i = 0; i < InnerFieldOptions.length; i++) {
        let cell = Object.keys(MixedField_Indexes)[i];

        if (cells[parseInt(cell)].classList.length <= 1) {
            cells[parseInt(cell)].style.backgroundColor = "rgba(144, 238, 144, 0.1)";
        };
    };

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
const CreateInnerField = (InnerField_Options, indexes, OriginIndex) => {
    let indexesInBigField = InnerFieldCreation_calculateBoundaries(OriginIndex);
    // console.log(indexesInBigField)

    indexesInBigField.forEach((el, i) => { // for each index in big field an index for the inner 5x5 field
        indexes[el] = i;
    });

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

// normally the origin index of the player in the innerfield is in the middle
// but was is if he places near the eadges?
const InnerFieldCreation_calculateBoundaries = (OriginIndex, cellSize = 5) => {
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
    const validMoves = [];
    for (let i = 2; i < 18; i++) {
        for (let j = 2; j < 18; j++) {
            const index = i * 20 + j;
            if (board[index] === '') {
                validMoves.push(index);
            }
        }
    }
    return validMoves;
};

// Find best index on the field
const FindBestSpot = (Boardstate) => {
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

    if (IconOnField) {
        return null;

    } else {
        let validMoves = findValidMoves(board);

        let N_blockages = Infinity;
        let bestIndexesArray = [];
        let validMove = 0;

        validMoves.forEach(i => {
            let indexes = InnerFieldCreation_calculateBoundaries(i);
            let current_N_blockages = 0;

            for (j of indexes) {
                if (board[j] != "") {
                    current_N_blockages = current_N_blockages + 1;
                };
            };

            if (current_N_blockages < N_blockages) {
                N_blockages = current_N_blockages;
                bestIndexesArray = indexes;
                validMove = i;
            };
        });

        let indexes = {}
        bestIndexesArray.forEach((el, i) => { // for each index in big field an index for the inner 5x5 field
            indexes[el] = i;
        });
        let NewOptions = createInnerFieldOptions([], indexes);

        InnerFieldData_Indexes = indexes;
        InnerFieldData_Options = NewOptions;
        return validMove;
    };
};

// KI sets O somewhere
function KI_Action() {
    setTimeout(() => { // remove access to set for the player
        cells.forEach(cell => {
            cell.removeEventListener('click', cellCicked);
            cell.style.cursor = 'default';
        });
    }, 700);

    MovesAmount_PlayerAndKi++;

    // if KI can place first it needs to find the best, that means the most open space, spot on the field
    let finalMove;
    finalMove = FindBestSpot(options); // return index

    // if the KI is the first to place and the eval found the best index 
    if (finalMove != null) {
        setTimeout(() => {
            // set final move from bot
            cells[finalMove].textContent = currentPlayer;
            options[finalMove] = currentPlayer;
            // for color
            cells[finalMove].style.color = "gold";

            checkWinner();

            // player gets access to set again
            setTimeout(() => {
                cells.forEach(cell => {
                    cell.addEventListener('click', cellCicked);
                    cell.classList.length <= 1 ? cell.style.cursor = 'pointer' : cell.style.cursor = 'default';
                });
            }, 700);
        }, 1000);
        return;
    };

    let InnerFieldData = RequestInnerField();
    let InnerFieldOptions = InnerFieldData[1];
    let MixedField_Indexes = InnerFieldData[2];

    // initialize bitboards
    let BitbordData = InitBitboards(InnerFieldOptions);
    let ki_board = BitbordData[0];
    let player_board = BitbordData[1];

    // worker variables
    let completedWorkers = 0;
    let currentWorkers = 4;
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

// win conditions in bit version
let WinConds;

// if the opponent of the KI (player [you]) can beat it in just one move, the KI does not have to do calculations with the minimax algorithm 
// but just place the icon on that right cell
const lookForInstantWin = () => {
    // create big bitboards
    let bigboards = InitBigboards(options); // 0 : ki_board, 1 : player_board, 2 : blockages

    // init bit-based win conditions
    WinConds = convertToBinary(WinConditions);

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

// KI has to set on the cell where the player could win instantly
const placeAtInstantWinForOpponent = (result) => {
    // set final move from bot
    cells[result[1]].textContent = PlayerData[2].PlayerForm;
    options[result[1]] = PlayerData[2].PlayerForm;
    // for color
    cells[result[1]].style.color = "gold";

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
    // set final move from bot
    cells[result[1]].textContent = PlayerData[2].PlayerForm;
    options[result[1]] = PlayerData[2].PlayerForm;
    // for color
    cells[result[1]].style.color = "gold";

    checkWinner();

    // player gets access to set again
    setTimeout(() => {
        cells.forEach(cell => {
            cell.addEventListener('click', cellCicked);
            cell.classList.length <= 1 ? cell.style.cursor = 'pointer' : cell.style.cursor = 'default';
        });
    }, 700);
};

// a variable for special case in minimax algorithm where KI returns -1
let PreviousIsA_MinusOperation_SpecialCase = true;

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

            // remove first element because it is not good 
            Object.keys(calculatedMoves).length > 0 && delete calculatedMoves[Object.keys(calculatedMoves)[0]];
            // find best move
            let bestScoreIndex = Object.values(calculatedMoves).indexOf(Math.max(...Object.values(calculatedMoves)))
            console.log(bestScoreIndex);
            let BestFinalMove = parseInt(Object.keys(calculatedMoves)[bestScoreIndex]);
            let InnerField_BestFinalMove;

            try {
                console.log(MixedField_Indexes, BestFinalMove)
                InnerField_BestFinalMove = parseInt(Object.entries(MixedField_Indexes).find(([key, val]) => val === BestFinalMove)[0]);
                console.log(calculatedMoves, BestFinalMove, InnerField_BestFinalMove);

                // time measurement
                const endTime = performance.now();
                const elapsedTime = endTime - startTime;
                console.log(`Worker hat ${elapsedTime.toFixed(2)} Millisekunden gebraucht.`);

                Create_20x20_WinCombis(allPatt_KIMode_Copy);

                // set final move from bot
                ki_board |= 1 << BestFinalMove;
                cells[InnerField_BestFinalMove].textContent = currentPlayer;
                options[InnerField_BestFinalMove] = currentPlayer;
                InnerFieldData_Options[BestFinalMove] = currentPlayer;
                // for color
                cells[InnerField_BestFinalMove].style.color = "gold";

                // change Player
                checkWinner();

                // player gets access to set again
                setTimeout(() => {
                    cells.forEach(cell => {
                        cell.addEventListener('click', cellCicked);
                        cell.classList.length <= 1 ? cell.style.cursor = 'pointer' : cell.style.cursor = 'default';
                    });
                }, 700);

            } catch (error) {
                console.log(error);
                if (lastCellIndex_Clicked > 0) { SpecialCaseKIPlace(parseInt(lastCellIndex_Clicked) - 1) } else {
                    SpecialCaseKIPlace(parseInt(lastCellIndex_Clicked) + 1);
                    PreviousIsA_MinusOperation_SpecialCase = false
                };
            };
        };
    };
};

// if minimax returns -1 for some reason
const SpecialCaseKIPlace = (index) => {
    if (!cells[index].classList.contains("death-cell") && options[index] == "") {
        Create_20x20_WinCombis(allPatt_KIMode_Copy);

        // set final move from bot
        ki_board |= 1 << InnerFieldData_Indexes[index];
        cells[index].textContent = currentPlayer;
        options[index] = currentPlayer;
        InnerFieldData_Options[InnerFieldData_Indexes[index]] = currentPlayer;
        // for color
        cells[index].style.color = "gold";

        // change Player
        checkWinner();

        // player gets access to set again
        setTimeout(() => {
            cells.forEach(cell => {
                cell.addEventListener('click', cellCicked);
                cell.classList.length <= 1 ? cell.style.cursor = 'pointer' : cell.style.cursor = 'default';
            });
        }, 700);

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

// check if player has won
function minimax_checkWinner(Player_B) { // give player big bit boards (type BigInt)
    let winner = null;
    let tie = 0; // 1 || 0

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

// check if ki has won
function minimax_checkWinner_KI(KI_B) { // give ki big bit boards (type BigInt)
    let winner = null;
    let tie = 0; // 1 || 0

    for (let i = 0; i < WinConds.length; i++) {
        let pattern = WinConds[i];

        if (tie == 0) { tie = evaluatingTie(pattern, KI_B) }

        if ((KI_B & pattern) == pattern) {
            winner = PlayerData[2].PlayerForm
            break
        }
    }

    return (winner == null && tie == 0) ? 'tie' : winner;
};