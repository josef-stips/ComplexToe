let max_depth;

function Find_MaxDepth() {
    if (curr_field != 'Small Price') { max_depth = 7 };
    if (curr_field == 'Small Price') { max_depth = Infinity };
};

const chunkifyAndModify = n => {
    let boards = [];
    let board_chunks = [];

    let copyKIBoard = ki_board;
    ki_board = 0b0;

    for (let i = 0; i < options.length; i++) { // all possible board states in one array

        if ((((copyKIBoard >> i) & 1) === 0) && (((player_board >> i) & 1) === 0)) {

            ki_board |= (0b1 << i);
            let new_board = ki_board;
            boards.push(new_board);
            ki_board &= ~(0b1 << i);
        };
    };

    for (let i = n; i > 0; i--) { // split board states in chunks for every CPU core
        board_chunks.push(boards.splice(0, Math.ceil(boards.length / i)));
    };

    return [board_chunks, copyKIBoard];
};

let ki_board = 0b0; // player 2 (ki)
let player_board = 0b0; // player 1 (human)

// KI sets O somewhere
function KI_Action() {
    setTimeout(() => { // remove access to set for the player
        cells.forEach(cell => {
            cell.removeEventListener('click', cellCicked);
            cell.style.cursor = 'default';
        });
    }, 700);

    // initialize bitboards
    ki_board = 0b0;
    player_board = 0b0;

    for (let i = 0; i < options.length; i++) {
        if (options[i] === PlayerData[2].PlayerForm) {
            ki_board |= (0b1 << i);
        };
        if (options[i] === PlayerData[1].PlayerForm) {
            player_board |= (0b1 << i);
        };
    };

    // worker variables
    let completedWorkers = 0;
    let currentWorkers = 4;
    let calculatedMoves = new Object();

    // initialize start time for worker 
    const startTime = performance.now();

    // get data to evaluate with
    let results = chunkifyAndModify(currentWorkers);
    let chunks = results[0];
    let KIBoardOrigin = results[1];

    // console.log(results, chunks, KIBoardOrigin, ki_board.toString(2), player_board.toString(2), options);

    // create a worker for each chunk
    chunks.forEach((chunk, i) => { // send one chunk to one worker
        let worker = new Worker('./Game/minimax.js');
        worker.postMessage([WinConditions, options, player_board, ki_board, PlayerData,
            scores, max_depth, chunk, KIBoardOrigin
        ]);

        worker.onmessage = (data) => { // calculated move from worker: move.data

            // save move in array to evaluate best moves from the workers
            completedWorkers++;
            calculatedMoves[data.data[0]] = data.data[1] // move with its score

            // console.log(`worker ${i} completed. result: ` + move.data)

            ki_board = KIBoardOrigin; // reset board to right stage

            if (completedWorkers === currentWorkers) { // all workers all done

                // find best move
                let bestScoreIndex = Object.values(calculatedMoves).indexOf(Math.max(...Object.values(calculatedMoves)))
                let BestFinalMove = parseInt(Object.keys(calculatedMoves)[bestScoreIndex]);
                // console.log(calculatedMoves, BestFinalMove);

                // time measurement
                const endTime = performance.now();
                const elapsedTime = endTime - startTime;
                console.log(`Worker hat ${elapsedTime.toFixed(2)} Millisekunden gebraucht.`);

                // set final move from bot
                ki_board |= 0b1 << BestFinalMove;
                cells[BestFinalMove].textContent = currentPlayer;
                options[BestFinalMove] = currentPlayer;

                // change Player
                checkWinner();

                // player gets access to set again
                setTimeout(() => {
                    cells.forEach(cell => {
                        cell.addEventListener('click', cellCicked);
                        cell.style.cursor = 'pointer';
                    });
                }, 700);
            };
        };
    });
};