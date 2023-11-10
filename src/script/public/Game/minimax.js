let ki_board = 0b0; // player 2 (ki)
let player_board = 0b0; // player 1 (human)

onmessage = (data) => {
    let chunk = data.data[0];
    let WinConditions = data.data[1];
    let options = data.data[2];
    let player_board = data.data[3];
    let ki_board = data.data[4];
    let PlayerData = data.data[5];
    let scores = data.data[6];
    let max_depth = data.data[7];

    chunk.forEach(element => {
        console.log(element.toString(2));
    });

    console.log(max_depth, PlayerData,
        WinConditions, options, player_board, ki_board, chunk, scores)

    function KI_Action(chunk) {
        let move = -1;
        let bestScore = -Infinity;

        for (i = 0; i < chunk.length; i++) {
            ki_board = chunk[i];
            console.log(ki_board.toString(2));
            let score = minimax(ki_board, player_board, 0, -Infinity, Infinity, false);
            ki_board = 0b1;

            if (score > bestScore) {
                bestScore = score;
                move = i;
            };
        };

        postMessage(move);
    };
    KI_Action(chunk);

    // minimax algorithm
    function minimax(ki_board, player_board, depth, alpha, beta, isMaximazing) {
        let result = minimax_checkWinner(ki_board, player_board);
        console.count();
        if (result !== null) {
            return scores[result];
        };

        if (isMaximazing) {
            let bestScore = -Infinity;
            for (let k = 0; k < 25; k++) {

                ki_board |= (0b1 << k);
                let score = minimax(ki_board, player_board, depth + 1, alpha, beta, false);
                ki_board &= ~(0b1 << k);

                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);

                if (beta <= alpha) break;
                if (depth >= max_depth) break;
            };

            return bestScore;

        } else {
            let bestScore = Infinity;
            for (let k = 0; k < 25; k++) {

                player_board |= (0b1 << k);
                let score = minimax(ki_board, player_board, depth + 1, alpha, beta, true);
                player_board &= ~(0b1 << k);

                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, score);

                if (beta <= alpha) break;
                if (depth >= max_depth) break;
            };

            return bestScore;
        };
    };

    function isBitSet(bitboard, index) {
        return (bitboard & (1 << index)) !== 0;
    };

    // This is just for the minimax algorithm
    function minimax_checkWinner(ki_board, player_board) {
        let winner = null;

        // console.log(WinConditions)

        for (let pattern of WinConditions) {
            let [a, b, c, d, e] = pattern;

            if (d == undefined && e == undefined) {
                if (isBitSet(player_board, a) && isBitSet(player_board, b) && isBitSet(player_board, c)) {
                    winner = PlayerData[1].PlayerForm;
                    break;
                };

                if (isBitSet(ki_board, a) && isBitSet(ki_board, b) && isBitSet(ki_board, c)) {
                    winner = PlayerData[2].PlayerForm;
                    break;
                };

            } else if (d != undefined && e == undefined) {
                if (isBitSet(player_board, a) && isBitSet(player_board, b) && isBitSet(player_board, c) && isBitSet(player_board, d)) {
                    winner = PlayerData[1].PlayerForm;
                    break;
                };

                if (isBitSet(ki_board, a) && isBitSet(ki_board, b) && isBitSet(ki_board, c) && isBitSet(ki_board, d)) {
                    winner = PlayerData[2].PlayerForm;
                    break;
                };

            } else if (e != undefined) {
                if (isBitSet(player_board, a) && isBitSet(player_board, b) && isBitSet(player_board, c) && isBitSet(player_board, d) && isBitSet(player_board, e)) {
                    winner = PlayerData[1].PlayerForm;
                    break;
                };

                if (isBitSet(ki_board, a) && isBitSet(ki_board, b) && isBitSet(ki_board, c) && isBitSet(ki_board, d) && isBitSet(ki_board, e)) {
                    winner = PlayerData[2].PlayerForm;
                    break;
                };
            };
        };

        let openSpots = 0;
        for (let i = 0; i < 25; i++) {
            if ((((ki_board >> i) & 1) === 0) && (((player_board >> i) & 1) === 0)) {
                openSpots++;
                break;
            };
        };

        if (winner == null && openSpots == 0) { return 'tie' } else { return winner };
    };
};