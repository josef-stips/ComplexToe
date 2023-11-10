let max_depth;

function Find_MaxDepth() {
    if (curr_field != 'Small Price') { max_depth = 2 };
    if (curr_field == 'Small Price') { max_depth = Infinity };
};

let ki_board = 0b0; // player 2 (ki)
let player_board = 0b0; // player 1 (human)

const chunkify = n => {
    let boards = new Array;
    let board_chunks = new Array;

    for (let i = 0; i < 25; i++) { // all possible board states in one array
        if ((((ki_board >> i) & 0b1) === 0) && (((player_board >> i) & 0b1) === 0)) {

            ki_board |= (0b1 << i);
            let new_board = ki_board;
            boards.push(new_board);
            ki_board &= ~(0b1 << i);
        };
    };

    for (let i = n; i > 0; i--) { // split board states in chunks for every CPU core
        board_chunks.push(boards.splice(0, Math.ceil(boards.length / i)));
    };

    return board_chunks;
};

// KI sets O somewhere
function KI_Action() {
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

    let completedWorkers = 0;
    let currentWorkers = 1;

    let chunks = chunkify(currentWorkers);

    chunks.forEach((chunk, i) => {
        let worker = new Worker(`./Game/minimax.js`);
        worker.postMessage([chunk, WinConditions, options, player_board, ki_board, PlayerData, scores, max_depth]);

        worker.onmessage = (move) => {
            completedWorkers++;
            console.log(`worker ${i} completed` + move.data)

            if (completedWorkers === currentWorkers) { // all workers all done
                console.log("all workers completed")
            };

            // ki_board |= 0b1 << move;
            // cells[move].textContent = currentPlayer;
            // options[move] = currentPlayer;
        };
    });

    // change Player
    checkWinner();
};