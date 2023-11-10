let ki_board = 0b0; // player 2 (ki)
let player_board = 0b0; // player 1 (human)

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
    max_depth = 1;
    chunk = data.data[0];
    WinConditions = data.data[1];
    options = data.data[2];
    player_board = data.data[3];
    ki_board = data.data[4];
    PlayerData = data.data[5];
    scores = data.data[6];

    console.log(chunk, PlayerData)

    tt.init();

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

    function KI_Action(chunk) {
        let move = -1;
        let maxDepth = 1;
        let startTime = Date.now();

        while (Date.now() - startTime < 1000) { // Adjust the time limit as needed
            let tempBestMove = iterativeDeepening(chunk);
            if (tempBestMove !== -1) {
                move = tempBestMove;
            };
            maxDepth++;
        };

        postMessage(move);
    };
    KI_Action(chunk);

    function iterativeDeepening(chunk) { // chunk = array with a chunk of boardstates
        let bestMove = -1;
        let bestScore = -Infinity;
        let alpha = -Infinity;
        let beta = Infinity;

        console.log(chunk);

        for (let i = 0; i < chunk.length; i++) {
            console.log(chunk[i])

            ki_board = chunk[i];
            let score = minimax(ki_board, player_board, 0, alpha, beta, false);
            ki_board = 0;

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            };

            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        };

        return bestMove;
    };

    // minimax algorithm
    function minimax(ki_board, player_board, depth, alpha, beta, isMaximazing) {
        let result = minimax_checkWinner(ki_board, player_board);
        // console.count();
        if (result !== null) {
            return scores[result];
        };

        let alphaOrigin = alpha;
        let ttEntry = tt.getItem(`cbg_${ki_board}_cbp${player_board}`);

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
            let moves = [];
            for (let i = 0; i < 25; i++) {
                if ((((ki_board >> i) & 1) === 0) && (((player_board >> i) & 1) === 0)) {
                    moves.push(i);
                };
            };
            moves.sort(compareMoves);

            let bestScore = -Infinity;
            for (let k = 0; k < moves.length; k++) {
                const i = moves[k];

                ki_board |= (0b1 << i);
                let score = minimax(ki_board, player_board, depth + 1, alpha, beta, false);
                let instantWin = minimax_checkWinner(ki_board, player_board) === PlayerData[2].PlayerForm ? 1 : 0;
                ki_board &= ~(0b1 << i);

                if (instantWin === 1) return bestScore;
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

            tt.setItem(`cbg_${ki_board}_cbp${player_board}`, { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

            return bestScore;

        } else {
            let moves = [];
            for (let i = 0; i < 25; i++) {
                if ((((ki_board >> i) & 1) === 0) && (((player_board >> i) & 1) === 0)) {
                    moves.push(i);
                };
            };
            moves.sort(compareMoves).reverse();

            let bestScore = Infinity;
            for (let k = 0; k < moves.length; k++) {
                const i = moves[k];

                player_board |= (0b1 << i);
                let score = minimax(ki_board, player_board, depth + 1, alpha, beta, true);
                let instantWin = minimax_checkWinner(ki_board, player_board) === PlayerData[2].PlayerForm ? -1 : 0;
                player_board &= ~(0b1 << i);

                if (instantWin === -1) return bestScore;
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

            tt.setItem(`cbg_${ki_board}_cbp${player_board}`, { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

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