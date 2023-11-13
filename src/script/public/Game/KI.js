let max_depth;

function Find_MaxDepth() {
    if (curr_field != 'Small Price') { max_depth = 7 };
    if (curr_field == 'Small Price') { max_depth = Infinity };
};

const chunkify = n => {
    let boards = [];
    let board_chunks = [];

    options.forEach((el, i) => {
        if (el == PlayerData[2].PlayerForm) {
            options[i] = "%%";
        };
    });

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
async function KI_Action() {
    setTimeout(() => {
        cells.forEach(cell => {
            cell.removeEventListener('click', cellCicked);
            cell.style.cursor = 'default';
        });
    }, 700);

    let completedWorkers = 0;
    let currentWorkers = 2;
    let calculatedMoves = new Array();

    const startTime = performance.now();

    let chunks = chunkify(currentWorkers);
    console.log(chunks)

    chunks.forEach((chunk, i) => { // send one chunk to one worker
        let worker = new Worker('./Game/minimax.js');
        worker.postMessage([WinConditions, options, player_board, ki_board, PlayerData, scores, max_depth, chunk])

        worker.onmessage = (move) => {
            completedWorkers++;
            calculatedMoves.push(move.data);
            console.log(`worker ${i} completed. result: ` + move.data)

            options.forEach((el, i) => { if (el == '%%') { options[i] = PlayerData[2].PlayerForm; }; });

            if (completedWorkers === currentWorkers) { // all workers all done
                let BestFinalMove = calculatedMoves.sort((a, b) => a - b)[calculatedMoves.length - 1];

                console.log(BestFinalMove, calculatedMoves.sort((a, b) => a - b));

                // time measurement
                const endTime = performance.now();
                const elapsedTime = endTime - startTime;
                console.log(`Worker hat ${elapsedTime.toFixed(2)} Millisekunden gebraucht.`);

                // ki_board |= 0b1 << move.data;
                cells[BestFinalMove].textContent = currentPlayer;
                options[BestFinalMove] = currentPlayer;

                console.log(options)

                // change Player
                checkWinner();

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