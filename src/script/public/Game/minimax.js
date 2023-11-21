class HashTable {
    table = new Array(3);

    hash = (s, tableSize) => {
        let hash = 3;
        for (let i = 0; i < s.length; i++) {
            hash = (13 * hash * s.charCodeAt(i)) % tableSize;
        };
        return hash;
    };
    setItem = (key, value) => {
        const idx = this.hash(key, this.table.length);
        if (this.table[idx]) {
            this.table[idx].push([key, value]);
        } else {
            if (this.table[idx]) {
                this.table[idx].push([key, value]);
            } else {
                this.table[idx] = [
                    [key, value]
                ];
            };
        };
        this.table[idx] = [
            [key, value]
        ];
    };
    getItem = (key) => {
        const idx = this.hash(key, this.table.length);
        if (!this.table[idx]) return null;
        // return this.table[idx].find(x => x[0] === key) != undefined ? this.table[idx].find(x => x[0] === key)[1] : null;
        // return this.table[idx].find(x => x[0] === key)[1];

        const item = this.table[idx].find(x => x[0] === key);
        return item ? item[1] : null;
    };

    init = () => {
        this.table = new Array(3);
    };
};
const tt = new HashTable;

onmessage = (data) => {
    let WinConditions = data.data[0];
    let options = data.data[1];
    let player_board = data.data[2];
    let ki_board = data.data[3];
    let PlayerData = data.data[4];
    let scores = data.data[5];
    let max_depth = data.data[6];
    let chunk = data.data[7];
    let KIBoardOrigin = data.data[8];
    let blockages = data.data[9];

    // console.log(WinConditions, options, player_board.toString(2), ki_board.toString(2), chunk, max_depth, PlayerData, blockages.toString(2))

    tt.init();

    function isBitSet(bitboard, index) {
        return (bitboard & (1 << index)) !== 0;
    };

    function getMVVLVAValue(piece) {
        const pieceValues = {
            [PlayerData[1].PlayerForm]: 5, // Wert von 'X'
            [PlayerData[2].PlayerForm]: 3, // Wert von 'O'
            '': 0 // Wert von leeren Zellen
        };
        return pieceValues[piece];
    };

    function compareMoves(a, b) {
        const pieceA = options[a];
        const pieceB = options[b];
        const valueA = getMVVLVAValue(pieceA);
        const valueB = getMVVLVAValue(pieceB);

        // Sortiere absteigend, damit die wertvollsten Züge zuerst kommen
        return valueB - valueA;
    };

    const evaluatingTie = (pattern, ki_board, player_board) => {
        let [a, b, c, d, e] = pattern;

        if (d == undefined && e == undefined) { // 3x3
            if (!isBitSet(player_board, a) && !isBitSet(player_board, b) &&
                !isBitSet(player_board, c) || !isBitSet(ki_board, a) &&
                !isBitSet(ki_board, b) && !isBitSet(ki_board, c)
                /*||
                               !isBitSet(blockages, a) && !isBitSet(blockages, b) &&
                               !isBitSet(blockages, c)*/
            ) {
                return 1
            };

        } else if (d != undefined && e == undefined) { // 4x4
            if (!isBitSet(player_board, a) && !isBitSet(player_board, b) &&
                !isBitSet(player_board, c) && !isBitSet(player_board, d) ||
                !isBitSet(ki_board, a) && !isBitSet(ki_board, b) &&
                !isBitSet(ki_board, c) && !isBitSet(ki_board, d) ||
                !isBitSet(blockages, a) && !isBitSet(blockages, b) &&
                !isBitSet(blockages, c) && !isBitSet(blockages, d)
            ) {
                return 1;
            };

        } else if (e != undefined) { // N>=5 x N>=5
            if (!isBitSet(player_board, a) && !isBitSet(player_board, b) &&
                !isBitSet(player_board, c) && !isBitSet(player_board, d) &&
                !isBitSet(player_board, e) || !isBitSet(ki_board, a) &&
                !isBitSet(ki_board, b) && !isBitSet(ki_board, c) &&
                !isBitSet(ki_board, d) && !isBitSet(ki_board, e)
                /*||
                               !isBitSet(blockages, a) && !isBitSet(blockages, b) &&
                               !isBitSet(blockages, c) && !isBitSet(blockages, d) &&
                               !isBitSet(blockages, e)*/
            ) {
                return 1;
            };
        }
        return 0;
    };

    let ties = [];

    function KI_Action() {
        let move = -1;
        let bestScore = -Infinity;
        let indexes = [];

        ties = [];

        for (let i = 0; i < chunk.length; i++) {
            for (const [index] of options.entries()) {
                if (isBitSet(chunk[i], index)) {
                    indexes.push(index);
                    break;
                };
            };
        };
        // console.log(indexes); // ex. 3x3f: 1 thread = 8 indexes, 2 threads = 4 indexes etc.

        ki_board = KIBoardOrigin;

        let maxDepth = 1;
        let startTime = Date.now();

        let allScores = [];

        while (Date.now() - startTime < 1000) { // Adjust the time limit as needed
            let bestResult = iterativeDeepening(ki_board, player_board, indexes);

            let tempBestMove = bestResult[0];
            let tempBestScore = bestResult[1];
            allScores.push(tempBestScore);

            if (tempBestMove !== -1) {
                move = tempBestMove;
                bestScore = tempBestScore;
            };
            maxDepth++;
        };

        postMessage([move, bestScore, allScores]);
        // console.log(ties);
    };
    KI_Action();

    function iterativeDeepening(ki_board, player_board, indexes) {
        let bestMove = -1;
        let bestScore = -Infinity;
        let alpha = -Infinity;
        let beta = Infinity;

        for (let indexX of indexes) {

            ki_board |= (1 << indexX);
            let score = minimax(player_board, ki_board, 0, -Infinity, Infinity, false);
            ki_board &= ~(1 << indexX);

            if (score > bestScore) {

                bestScore = score;
                bestMove = indexX;
            };

            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        };

        return [bestMove, bestScore];
    };

    // minimax algorithm
    function minimax(player_board, ki_board, depth, alpha, beta, isMaximazing) {
        let result = minimax_checkWinner(player_board, ki_board);
        // console.log("from minimax:  ", result);
        if (result !== null) {
            return scores[result];
        };

        let alphaOrigin = alpha;
        let ttEntry = tt.getItem(JSON.stringify(`${ki_board}${player_board}`));

        if (ttEntry != null && ttEntry.depth >= depth) {
            if (ttEntry.flag == "EXACT") {
                return ttEntry.bestScore;

            } else if (ttEntry.flag == alpha) {
                alpha = Math.max(alpha, ttEntry.bestScore);

            } else if (ttEntry.flag == beta) {
                beta = Math.min(beta, ttEntry.bestScore);
            };

            if (alpha >= beta) return ttEntry.bestScore;
        };

        if (isMaximazing) {
            let bestScore = -Infinity;

            let moves = [];
            for (let k = 0; k < options.length; k++) {
                if ((((ki_board >> k) & 1) === 0) &&
                    (((player_board >> k) & 1) === 0) &&
                    (((blockages >> k) & 1) === 0)
                ) {
                    moves.push(k);
                };
            };
            moves.sort(compareMoves);

            for (let k = 0; k < moves.length; k++) {
                let move = moves[k];

                ki_board |= (1 << move);
                let score = minimax(player_board, ki_board, depth + 1, alpha, beta, false);
                ki_board &= ~(1 << move);

                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);

                if (beta <= alpha) break;
                if (depth >= max_depth) break;
            };

            if (bestScore <= alphaOrigin) {
                flag = beta;

            } else if (bestScore >= beta) {
                flag = alpha;

            } else {
                flag = 'EXACT';
            };

            tt.setItem(JSON.stringify(`${ki_board}${player_board}`), { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

            return bestScore;

        } else {
            let bestScore = Infinity;

            let moves = [];
            for (let k = 0; k < options.length; k++) {
                if ((((ki_board >> k) & 1) === 0) &&
                    (((player_board >> k) & 1) === 0) &&
                    (((blockages >> k) & 1) === 0)
                ) {
                    moves.push(k);
                };
            };
            moves.sort(compareMoves).reverse();
            // console.log(options, moves)

            for (let k = 0; k < moves.length; k++) {
                let move = moves[k];

                player_board |= (1 << move);
                let score = minimax(player_board, ki_board, depth + 1, alpha, beta, true);
                player_board &= ~(1 << move);

                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, score);

                if (beta <= alpha) break;
                if (depth >= max_depth) break;
            };

            if (bestScore <= alphaOrigin) {
                flag = beta;

            } else if (bestScore >= beta) {
                flag = alpha;

            } else {
                flag = 'EXACT';
            };

            tt.setItem(JSON.stringify(`${ki_board}${player_board}`), { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

            return bestScore;
        };
    };

    function minimax_checkWinner(player_board, ki_board) {
        let winner = null;
        let tie = 0; // 1 || 0

        for (let pattern of WinConditions) {
            let [a, b, c, d, e] = pattern;

            if (tie == 0) { tie = evaluatingTie(pattern, ki_board, player_board) }

            if (d == undefined && e == undefined) { // 3x3
                if (isBitSet(player_board, a) && isBitSet(player_board, b) && isBitSet(player_board, c)) {
                    winner = PlayerData[1].PlayerForm;
                    break;
                };

                if (isBitSet(ki_board, a) && isBitSet(ki_board, b) && isBitSet(ki_board, c)) {
                    winner = PlayerData[2].PlayerForm;
                    break;
                };

            } else if (d != undefined && e == undefined) { // 4x4
                if (isBitSet(player_board, a) && isBitSet(player_board, b) && isBitSet(player_board, c) && isBitSet(player_board, d)) {
                    winner = PlayerData[1].PlayerForm;
                    break;
                };

                if (isBitSet(ki_board, a) && isBitSet(ki_board, b) && isBitSet(ki_board, c) && isBitSet(ki_board, d)) {
                    winner = PlayerData[2].PlayerForm;
                    break;
                };

            } else if (e != undefined) { // N>=5 x N>=5
                if (isBitSet(player_board, a) && isBitSet(player_board, b) && isBitSet(player_board, c) && isBitSet(player_board, d) && isBitSet(player_board, e)) {
                    winner = PlayerData[1].PlayerForm;
                    break;
                };

                if (isBitSet(ki_board, a) && isBitSet(ki_board, b) && isBitSet(ki_board, c) && isBitSet(ki_board, d) && isBitSet(ki_board, e)) {
                    winner = PlayerData[2].PlayerForm;
                    break;
                };

            } else if (d == undefined && e == undefined && c == undefined) {
                if (isBitSet(player_board, a) && isBitSet(player_board, b)) {
                    winner = PlayerData[1].PlayerForm;
                    break;
                };

                if (isBitSet(ki_board, a) && isBitSet(ki_board, b)) {
                    winner = PlayerData[2].PlayerForm;
                    break;
                };
            };
        };

        // console.log(tie)
        if (winner == null && tie == 0) {
            // ties.push('tie');
            // console.log('tie')
            return 'tie';
        } else {
            // console.log(winner)
            return winner;
        };
    };
};