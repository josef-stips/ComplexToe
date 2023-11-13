let ki_board = 0b0; // player 2 (ki)
let player_board = 0b0; // player 1 (human)

onmessage = (data) => {
    let WinConditions = data.data[0];
    let options = data.data[1];
    let player_board = data.data[2];
    let ki_board = data.data[3];
    let PlayerData = data.data[4];
    let scores = data.data[5];
    let max_depth = data.data[6];
    let chunk = data.data[7];

    // chunk.forEach(element => {
    //     console.log(element);
    // });
    // console.log(chunk)

    // console.log(max_depth, PlayerData,
    //     WinConditions, options, player_board, ki_board, chunk, scores)

    function KI_Action() {
        let move = -1;
        let bestScore = -Infinity;

        console.log(chunk);

        for (let i = 0; i < chunk.length; i++) {

            let copy_Options = new Array(...options);
            // for (const [index, value] of chunk[i].entries()) {
            //     if (value == '') options[index] = '';
            //     if (value == PlayerData[1].PlayerForm) options[index] = PlayerData[1].PlayerForm;
            //     if (value == PlayerData[2].PlayerForm) options[index] = PlayerData[2].PlayerForm;
            // };

            console.log(chunk[i], options);
            options = chunk[i];

            let score = minimax(options, 0, -Infinity, Infinity, false);

            options = copy_Options;

            if (score > bestScore) {
                bestScore = score;
                move = i;
            };
        };
        // console.log(move);
        postMessage(move);
    };
    KI_Action();

    // minimax algorithm
    function minimax(options, depth, alpha, beta, isMaximazing) {
        let result = minimax_checkWinner();
        // console.log(result);
        if (result !== null) {
            return scores[result];
        };

        // console.log(options)

        if (isMaximazing) {
            let bestScore = -Infinity;
            for (let k = 0; k < options.length; k++) {
                if (options[k] == "") {

                    // ki_board |= (0b1 << k);
                    options[k] = PlayerData[2].PlayerForm;

                    let score = minimax(options, depth + 1, alpha, beta, false);
                    // ki_board &= ~(0b1 << k);
                    options[k] = '';

                    bestScore = Math.max(score, bestScore);
                    alpha = Math.max(alpha, score);

                    if (beta <= alpha) break;
                    if (depth >= max_depth) break;
                }
            };
            return bestScore;

        } else {
            let bestScore = Infinity;
            for (let k = 0; k < options.length; k++) {
                if (options[k] == "") {

                    // player_board |= (0b1 << k);
                    options[k] = PlayerData[1].PlayerForm;

                    let score = minimax(options, depth + 1, alpha, beta, true);
                    // player_board &= ~(0b1 << k);
                    options[k] = '';

                    bestScore = Math.min(score, bestScore);
                    beta = Math.min(beta, score);

                    if (beta <= alpha) break;
                    if (depth >= max_depth) break;
                }
            };
            return bestScore;
        };
    };

    function minimax_checkWinner() {
        let winner = null;

        // console.log(options);

        for (let i = 0; i < WinConditions.length; i++) {
            const condition = WinConditions[i];

            let cellA = options[condition[0]];
            let cellB = options[condition[1]];
            let cellC = options[condition[2]];
            let cellD = options[condition[3]];
            let cellE = options[condition[4]]; // fifth block

            // if (cellA == "" || cellB == "" || cellC == "" || cellD == "" || cellE == "") {
            //     continue
            // };
            // if (cellA == cellB && cellB == cellC && cellC == cellD && cellD == cellE) {
            //     winner = cellA
            //     break;
            // };

            if (cellA == "" || cellB == "" || cellC == "") {
                continue
            };
            if (cellA == cellB && cellB == cellC && cellA != "") {
                winner = cellA
                break;
            };
        };

        let openSpots = 0;
        for (let i = 0; i < options.length; i++) {
            if (options[i] == "") {
                openSpots++;
            };
        };

        if (winner == null && openSpots == 0) { return 'tie' } else { return winner };
    };
};