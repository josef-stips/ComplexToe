let max_depth;

function Find_MaxDepth() {
    if (curr_field != 'Small Price') { max_depth = 7 };
    if (curr_field == 'Small Price') { max_depth = Infinity };
};

const chunkify = n => {
    let boards = [];
    let board_chunks = [];

    for (let i = 0; i < options.length; i++) { // all possible board states in one array
        if (options[i] == "") {

            options[i] = PlayerData[2].PlayerForm;
            boards.push(options.slice());
            options[i] = '';
        };
    };

    for (let i = n; i > 0; i--) { // split board states in chunks for every CPU core
        board_chunks.push(boards.splice(0, Math.ceil(boards.length / i)));
    };

    return board_chunks;
};

// KI sets O somewhere
function KI_Action() {
    let completedWorkers = 0;
    let currentWorkers = 4;

    let chunks = chunkify(currentWorkers);

    chunks.forEach((chunk, i) => {
        let worker = new Worker(`./Game/minimax.js`);
        worker.postMessage([chunk, WinConditions, options, player_board, ki_board, PlayerData, scores, max_depth]);

        worker.onmessage = (move) => {
            completedWorkers++;
            console.log(`worker ${i} completed. result: ` + move.data)

            if (completedWorkers === currentWorkers) { // all workers all done
                console.log("all workers completed")

                // ki_board |= 0b1 << move;
                cells[move.data].textContent = currentPlayer;
                options[move.data] = currentPlayer;

                // change Player
                checkWinner();
            };
        };
    });


};