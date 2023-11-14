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

    tt.init();

    function isBitSet(bitboard, index) {
        return (bitboard & (1 << index)) !== 0;
    };

    function KI_Action() {
        let move = -1;
        let bestScore = -Infinity;
        let indexes = [];

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

        for (let indexX of indexes) {

            ki_board |= (0b1 << indexX);
            let score = minimax(player_board, ki_board, 0, -Infinity, Infinity, false);
            ki_board &= ~(0b1 << indexX);

            if (score > bestScore) {
                console.log(score, indexX)

                bestScore = score;
                move = indexX;
            };
        };
        postMessage([move, bestScore]);
    };
    KI_Action();

    // minimax algorithm
    function minimax(player_board, ki_board, depth, alpha, beta, isMaximazing) {
        let result = minimax_checkWinner(player_board, ki_board);
        // console.log(result);
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
            for (let k = 0; k < options.length; k++) {
                if ((((ki_board >> k) & 1) === 0) && (((player_board >> k) & 1) === 0)) {

                    ki_board |= (0b1 << k);
                    let score = minimax(player_board, ki_board, depth + 1, alpha, beta, false);
                    ki_board &= ~(0b1 << k);

                    bestScore = Math.max(score, bestScore);
                    alpha = Math.max(alpha, score);

                    if (beta <= alpha) break;
                    if (depth >= max_depth) break;
                }
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
            for (let k = 0; k < options.length; k++) {
                if ((((ki_board >> k) & 1) === 0) && (((player_board >> k) & 1) === 0)) {

                    player_board |= (0b1 << k);
                    let score = minimax(player_board, ki_board, depth + 1, alpha, beta, true);
                    player_board &= ~(0b1 << k);

                    bestScore = Math.min(score, bestScore);
                    beta = Math.min(beta, score);

                    if (beta <= alpha) break;
                    if (depth >= max_depth) break;
                }
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

        for (let pattern of WinConditions) {
            let [a, b, c, d, e] = pattern;

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

            } else if (e != undefined) { // N>=5 N >=5
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
        for (let i = 0; i < options.length; i++) {
            if ((((ki_board >> i) & 1) === 0) && (((player_board >> i) & 1) === 0)) {
                openSpots++;
            };
        };

        if (winner == null && openSpots == 0) { return 'tie' } else { return winner };
    };
};