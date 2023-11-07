// // // ai difficulty levels
// // let ai_difficulty = {
// //     1: {
// //         'difficulty_level': 'level 1',
// //         'name': 'washing machine',
// //         'max_depth': 1
// //     },
// //     2: {
// //         'difficulty_level': 'level 2',
// //         'name': 'crazy wedding',
// //         'max_depth': 3
// //     },
// //     3: {
// //         'difficulty_level': 'level 3',
// //         'name': 'insane storm',
// //         'max_depth': 7
// //     },
// // };

// // // how deep the minimax algorithm must search
// // let max_depth;

// // function Find_MaxDepth() {
// //     if (curr_field != 'Small Price') { max_depth = Infinity };
// //     if (curr_field == 'Small Price') { max_depth = Infinity };
// // };

// // class HashTable {
// //     table = new Array(3);

// //     hash = (s, tableSize) => {
// //         let hash = 17;
// //         for (let i = 0; i < s.length; i++) {
// //             hash = (13 * hash * s.charCodeAt(i)) % tableSize;
// //         };
// //         return hash;
// //     };
// //     setItem = (key, value) => {
// //         const idx = this.hash(key, this.table.length);
// //         if (this.table[idx]) {
// //             this.table[idx].push([key, value]);
// //         } else {
// //             this.table[idx] = [
// //                 [key, value]
// //             ];
// //         };
// //         this.table[idx] = [
// //             [key, value]
// //         ];
// //     };
// //     getItem = (key) => {
// //         const idx = this.hash(key, this.table.length);
// //         if (!this.table[idx]) return null;
// //         // return this.table[idx].find(x => x[0] === key) != undefined ? this.table[idx].find(x => x[0] === key)[1] : null;
// //         return this.table[idx].find(x => x[0] === key)[1];
// //     };

// //     init = () => {
// //         this.table = new Array(3);
// //     };
// // };
// // const tt = new HashTable;

// // function getMVVLVAValue(piece) {
// //     const pieceValues = {
// //         'X': 5, // Wert von 'X'
// //         'O': 3, // Wert von 'O'
// //         '': 0 // Wert von leeren Zellen
// //     };
// //     return pieceValues[piece];
// // }

// // function compareMoves(a, b) {
// //     const pieceA = options[a];
// //     const pieceB = options[b];
// //     const valueA = getMVVLVAValue(pieceA);
// //     const valueB = getMVVLVAValue(pieceB);

// //     // Sortiere absteigend, damit die wertvollsten Züge zuerst kommen
// //     return valueB - valueA;
// // }

// // function bitboardIndex(row, col) {
// //     return row * 3 + col;
// // }

// // function setBit(bitboard, index, value) {
// //     return value ? (bitboard | (1 << index)) : (bitboard & ~(1 << index));
// // }

// // function isBitSet(bitboard, index) {
// //     return (bitboard & (1 << index)) !== 0;
// // }

// // function isBoardFull() {
// //     // console.log((boards[0] | boards[1]) & 0b111111111);
// //     return ((boards[0] | boards[1]) & 0b111111111) === 1;
// // };

// // let boards = [0b0, 0b0];
// // let counter = 0;
// // let winPatt;

// // function KI_Action() {
// //     console.log(arguments.callee.caller)

// //     // remove access to set X from Player1 
// //     cells.forEach(cell => {
// //         cell.removeEventListener('click', cellCicked);
// //         cell.style.cursor = 'default';
// //     });

// //     for (let i = 0; i < options.length; i++) {
// //         if (options[i] === PlayerData[2].PlayerForm) {
// //             boards[0] = setBit(boards[0], i, true);
// //         };
// //         if (options[i] === PlayerData[1].PlayerForm) {
// //             boards[1] = setBit(boards[1], i, true);
// //         };
// //     };
// //     console.log(boards)

// //     let bestMove = -1;
// //     let startTime = Date.now();
// //     let maxDepth = 1;
// //     // let bestScore = -Infinity;

// //     while (Date.now() - startTime < 1000) { // Adjust the time limit as needed
// //         let tempBestMove = iterativeDeepening(boards[0], maxDepth);
// //         if (tempBestMove !== -1) {
// //             bestMove = tempBestMove;
// //         }
// //         maxDepth++;
// //     };

// //     console.log(boards, bestMove, bestScore, counter);

// //     // Ki move
// //     cells[bestMove].textContent = currentPlayer;
// //     options[bestMove] = currentPlayer;
// //     // change Player
// //     checkWinner();

// //     // add access to set X from Player1 
// //     setTimeout(() => {
// //         cells.forEach(cell => {
// //             cell.addEventListener('click', cellCicked);
// //             cell.style.cursor = 'pointer';
// //         });
// //     }, 700);
// // };

// // function iterativeDeepeing(bitboard, maxDepth) {
// //     let bestMove = -1;
// //     let bestScore = -Infinity;
// //     let alpha = -Infinity;
// //     let beta = Infinity;

// //     for (let i = 0; i < options.length; i++) {
// //         if (!isBitSet(bitboard, i) && !isBitSet(boards[1], i)) {
// //             let newBitboard = setBit(bitboard, i, true);
// //             options[i] = PlayerData[2].PlayerForm;
// //             counter++;
// //             let score = minimax(newBitboard, 0, alpha, beta, false, maxDepth);
// //             setBit(bitboard, i, false);
// //             options[i] = '';
// //             counter--;

// //             if (score > bestScore) {
// //                 bestScore = score;
// //                 bestMove = i;
// //             }

// //             alpha = Math.max(alpha, score);
// //             if (beta <= alpha) break;
// //         }
// //     };
// //     return bestMove;
// // };

// // function iterativeDeepening(bitboard, maxDepth) {
// //     let bestMove = -1;
// //     let bestScore = -Infinity;
// //     let alpha = -Infinity;
// //     let beta = Infinity;

// //     for (let i = 0; i < options.length; i++) {
// //         if (options[i] == "") {
// //             options[i] = PlayerData[2].PlayerForm;
// //             counter++;
// //             let score = minimax(options, 0, alpha, beta, false, maxDepth);
// //             options[i] = '';
// //             counter--;

// //             if (score > bestScore) {
// //                 bestScore = score;
// //                 bestMove = i;
// //             };

// //             alpha = Math.max(alpha, score);
// //             if (beta <= alpha) break;
// //         }
// //     };
// //     return bestMove;
// // };

// // // minimax algorithm
// // function minimax(bitboard, depth, alpha, beta, isMaximazing) {
// //     // console.count();
// //     let result = minimax_checkWinner();
// //     console.log(result);
// //     if (result !== null) {
// //         return scores[result];
// //     };

// //     if (isMaximazing) {
// //         // let moves = [];
// //         // for (let i = 0; i < options.length; i++) {
// //         //     // if (!isBitSet(boards[1], i) && !isBitSet(boards[0], i)) {
// //         //     //     moves.push(i);
// //         //     // };
// //         //     if (options[i] == "") {
// //         //         moves.push(i);
// //         //     };
// //         // };
// //         // moves.sort(compareMoves);
// //         // console.log(moves);

// //         let bestScore = -Infinity;
// //         for (let k = 0; k < options.length; k++) {
// //             // if (!isBitSet(boards[0], k) && !isBitSet(boards[1], k)) {
// //             if (options[k] == "") {

// //                 // boards[0] = setBit(boards[0], k, true);
// //                 options[k] = PlayerData[2].PlayerForm;
// //                 counter++;

// //                 let score = minimax(options, depth + 1, alpha, beta, false);

// //                 // boards[0] = setBit(boards[0], k, false);
// //                 options[k] = '';
// //                 counter--;

// //                 bestScore = Math.max(score, bestScore);
// //                 alpha = Math.max(alpha, score);

// //                 if (beta <= alpha) break;
// //             };
// //         };
// //         return bestScore;

// //     } else {
// //         // let moves = [];
// //         // for (let i = 0; i < options.length; i++) {
// //         //     // if (!isBitSet(boards[1], i) && !isBitSet(boards[0], i)) {
// //         //     if (options[i] == "") {

// //         //         moves.push(i);
// //         //     };
// //         // };
// //         // moves.sort(compareMoves).reverse();

// //         let bestScore = Infinity;
// //         for (let k = 0; k < options.length; k++) {
// //             // if (!isBitSet(boards[0], k) && !isBitSet(boards[1], k)) {
// //             if (options[k] == "") {

// //                 // boards[1] = setBit(boards[1], k, true);
// //                 options[k] = PlayerData[1].PlayerForm;
// //                 counter++;

// //                 let score = minimax(options, depth + 1, alpha, beta, true);

// //                 // boards[1] = setBit(boards[1], k, false);
// //                 options[k] = '';
// //                 counter--;

// //                 bestScore = Math.min(score, bestScore);
// //                 beta = Math.min(beta, score);

// //                 if (beta <= alpha) break;
// //             };
// //         };
// //         return bestScore;
// //     };
// // };

// // function minimax_checkWinner() {
// //     let winner = null
// //     let winPatt = convertToBinary(WinConditions); // convert normal win conditions into binary board states

// //     // console.log(winPatt, (counter & 1));
// //     let bitboard = boards[counter & 1]; // ungerade = 1; gerade = 0;

// //     // bit copy: winPatt
// //     for (let boardState of WinConditions) {
// //         // console.log(boardState, bitboard, (bitboard & boardState))
// //         // if ((bitboard & boardState) == boardState) {
// //         //     // console.log("lol", ((counter & 1) == 1) ? PlayerData[1].PlayerForm : PlayerData[2].PlayerForm)
// //         //     winner = ((counter & 1) == 1) ? PlayerData[1].PlayerForm : PlayerData[2].PlayerForm; // decide who the winner is
// //         //     break;
// //         // }

// //         let [a, b, c] = boardState;

// //         if (a == "" && b == "" && c == "") continue;

// //         if (a == b && b == c && a != "") {
// //             winner = a;
// //             break;
// //         };
// //     }

// //     let openSpots = 0;
// //     for (let i = 0; i < options.length; i++) {
// //         // if (!isBitSet(boards[0], i) && !isBitSet(boards[1], i)) {
// //         if (options[i] == "") {
// //             openSpots++;
// //         };
// //     };

// //     // console.log((openSpots == 0 && winner == null) ? 'tie' : winner, 'openSpots ' + openSpots);
// //     // return (openSpots == 0 && winner == null) ? 'tie' : winner; // return winner:[null, player] or tie:(full board)
// //     if (winner == null && openSpots == 0) { return 'tie' } else { return winner };
// // };

// // function convertToBinary(winPatterns) {
// //     const binaryPatterns = [];
// //     for (const pattern of winPatterns) {
// //         let binaryRepresentation = 0;
// //         for (const position of pattern) {
// //             binaryRepresentation += 1 << position;
// //         }
// //         binaryPatterns.push(binaryRepresentation);
// //     }
// //     return binaryPatterns;
// // };

// // how deep the minimax algorithm must search
// let max_depth;

// function Find_MaxDepth() {
//     if (curr_field == 'Thunder Advanture') { max_depth = 10 };
//     if (curr_field == 'Small Price') { max_depth = Infinity };
// };

// class HashTable {
//     table = new Array(3);

//     hash = (s, tableSize) => {
//         let hash = 17;
//         for (let i = 0; i < s.length; i++) {
//             hash = (13 * hash * s.charCodeAt(i)) % tableSize;
//         };
//         return hash;
//     };
//     setItem = (key, value) => {
//         const idx = this.hash(key, this.table.length);
//         if (this.table[idx]) {
//             this.table[idx].push([key, value]);
//         } else {
//             this.table[idx] = [
//                 [key, value]
//             ];
//         };
//         this.table[idx] = [
//             [key, value]
//         ];
//     };
//     getItem = (key) => {
//         const idx = this.hash(key, this.table.length);
//         if (!this.table[idx]) return null;
//         return this.table[idx].find(x => x[0] === key)[1];
//     };

//     init = () => {
//         this.table = new Array(3);
//     };
// };
// const tt = new HashTable;

// function KI_Action() {
//     // remove access to set X from Player1 
//     cells.forEach(cell => {
//         cell.removeEventListener('click', cellCicked);
//         cell.style.cursor = 'default';
//     });

//     let bestMove = -1;
//     let startTime = Date.now();
//     let maxDepth = 1;

//     while (Date.now() - startTime < 1000) { // Adjust the time limit as needed
//         let tempBestMove = iterativeDeepening(cells, maxDepth);
//         if (tempBestMove !== -1) {
//             bestMove = tempBestMove;
//         }
//         maxDepth++;
//     }

//     console.log(bestMove);

//     // Ki move
//     cells[bestMove].textContent = currentPlayer;
//     options[bestMove] = currentPlayer;
//     // change Player
//     checkWinner();

//     // add access to set X from Player1 
//     setTimeout(() => {
//         cells.forEach(cell => {
//             cell.addEventListener('click', cellCicked);
//             cell.style.cursor = 'pointer';
//         });
//     }, 700);
// }

// function iterativeDeepening(cells, maxDepth) {
//     let bestMove = -1;
//     let bestScore = -Infinity;
//     let alpha = -Infinity;
//     let beta = Infinity;

//     for (let i = 0; i < cells.length; i++) {
//         if (cells[i].classList.length <= 1 && cells[i].textContent == "") {
//             cells[i].textContent = PlayerData[2].PlayerForm;
//             options[i] = PlayerData[2].PlayerForm;

//             let score = minimax(cells, 0, alpha, beta, false, maxDepth);
//             console.log(score);

//             cells[i].textContent = '';
//             options[i] = '';

//             if (score > bestScore) {
//                 bestScore = score;
//                 bestMove = i;
//             }
//             alpha = Math.max(alpha, score);
//             if (beta <= alpha) break;
//         }
//     }

//     return bestMove;
// };

// // minimax algorithm
// function minimax(cells, depth, alpha, beta, isMaximazing, max_depth) {
//     console.count();
//     let result = minimax_checkWinner();
//     if (result !== null) {
//         return scores[result];
//     };

//     let alphaOrigin = alpha;
//     let ttEntry = tt.getItem(JSON.stringify(cells));

//     if (ttEntry != null && ttEntry.depth >= depth) {
//         if (ttEntry.flag == "EXACT") {
//             return ttEntry.bestScore;

//         } else if (ttEntry.flag == alpha) {
//             alpha = Math.max(alpha, ttEntry.bestScore);

//         } else if (ttEntry.flag == beta) {
//             beta = Math.min(beta, ttEntry.bestScore);
//         };

//         if (alpha >= beta) return ttEntry.bestScore;
//     };

//     if (isMaximazing) {
//         let bestScore = -Infinity;

//         for (let i = 0; i < cells.length; i++) {
//             if (cells[i].classList.length <= 1 && cells[i].textContent == "") {
//                 // check possible game states
//                 cells[i].textContent = PlayerData[2].PlayerForm;
//                 options[i] = PlayerData[2].PlayerForm;
//                 let score = minimax(cells, depth + 1, alpha, beta, false);
//                 cells[i].textContent = '';
//                 options[i] = '';

//                 bestScore = Math.max(score, bestScore);
//                 alpha = Math.max(alpha, score);

//                 if (beta <= alpha) break;
//                 if (depth >= max_depth) break;
//             };
//         };

//         if (bestScore <= alphaOrigin) {
//             flag = beta;

//         } else if (bestScore >= beta) {
//             flag = alpha;

//         } else {
//             flag = 'EXACT';
//         };

//         tt.setItem(JSON.stringify(cells), { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

//         return bestScore;

//     } else {
//         let bestScore = Infinity;

//         for (let i = 0; i < cells.length; i++) {
//             if (cells[i].classList.length <= 1 && cells[i].textContent == "") {
//                 // check possible game states
//                 cells[i].textContent = PlayerData[1].PlayerForm;
//                 options[i] = PlayerData[1].PlayerForm;
//                 let score = minimax(cells, depth + 1, alpha, beta, true);
//                 cells[i].textContent = '';
//                 options[i] = '';

//                 bestScore = Math.min(score, bestScore);
//                 beta = Math.min(beta, score);

//                 if (beta <= alpha) break;
//                 if (depth >= max_depth) break;
//             };
//         };

//         if (bestScore <= alphaOrigin) {
//             flag = beta;

//         } else if (bestScore >= beta) {
//             flag = alpha;

//         } else {
//             flag = 'EXACT';
//         };

//         tt.setItem(JSON.stringify(cells), { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

//         return bestScore;
//     };
// };

// // This is just for the minimax algorithm
// function minimax_checkWinner() {
//     let winner = null;

//     for (let i = 0; i < WinConditions.length; i++) {
//         const condition = WinConditions[i];

//         let cellA = options[condition[0]];
//         let cellB = options[condition[1]];
//         let cellC = options[condition[2]];
//         let cellD = options[condition[3]];

//         if (cellD != undefined) {
//             if (cellA == "" || cellB == "" || cellC == "" || cellD == "") {
//                 continue;
//                 // return 'tie';
//             };
//             if (cellA == cellB && cellB == cellC && cellC == cellD) {
//                 winner = cellA
//                 break;
//             };

//         } else {
//             if (cellA == "" || cellB == "" || cellC == "") {
//                 continue;
//                 // return 'tie';
//             };
//             if (cellA == cellB && cellB == cellC) {
//                 winner = cellA
//                 break;
//             };
//         };
//     };

//     let openSpots = 0;
//     for (let i = 0; i < cells.length; i++) {
//         if (cells[i].classList.length <= 1 && cells[i].textContent == "") {
//             openSpots++;
//         };
//     };

//     if (winner == null && openSpots == 0) { return 'tie' } else { return winner };
// };

// ai difficulty levels

let ai_difficulty = {
    1: {
        'difficulty_level': 'level 1',
        'name': 'washing machine',
        'max_depth': 1
    },
    2: {
        'difficulty_level': 'level 2',
        'name': 'crazy wedding',
        'max_depth': 3
    },
    3: {
        'difficulty_level': 'level 3',
        'name': 'insane storm',
        'max_depth': 7
    },
};

// how deep the minimax algorithm must search
let max_depth;

function Find_MaxDepth() {
    if (curr_field != 'Small Price') { max_depth = 2 };
    if (curr_field == 'Small Price') { max_depth = Infinity };
};

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

let ki_board = 0b0; // player 2 (ki)
let player_board = 0b0; // player 1 (human)

function bestMove(NEWoptions, optionsInfo) {
    ki_board = 0b0;
    player_board = 0b0;

    console.log(options);

    for (let i = 0; i < options.length; i++) {
        if (options[i] === PlayerData[2].PlayerForm) {
            ki_board |= (0b1 << i);
        };
        if (options[i] === PlayerData[1].PlayerForm) {
            player_board |= (0b1 << i);
        };
    };

    console.log(ki_board, player_board)

    let move = -1;
    let maxDepth = 1;
    let startTime = Date.now();

    while (Date.now() - startTime < 1000) { // Adjust the time limit as needed
        let tempBestMove = iterativeDeepening(ki_board, player_board);
        if (tempBestMove !== -1) {
            move = tempBestMove;
        };
        maxDepth++;
    };

    console.log(move)

    // let finalMove = optionsInfo['OriginIndex'] - move - 6;
    // let finalMove = optionsInfo['OriginIndex'];
    // console.log(optionsInfo['OriginIndex'])

    // Ki move
    ki_board |= 0b1 << move;
    cells[move].textContent = currentPlayer;
    options[move] = currentPlayer;
    // change Player
    checkWinner();
};

// KI sets O somewhere
function KI_Action() {
    // remove access to set X from Player1 
    cells.forEach(cell => {
        cell.removeEventListener('click', cellCicked);
        cell.style.cursor = 'default';
    });

    // let optionsData = findField();
    let optionsInfo = 'lol';
    // let NEWoptions = optionsData[1];

    let openSpots = 0;
    for (let i = 0; i < options.length; i++) {
        if (options[i] != "") {
            openSpots++;
        };
    };

    // console.log(openSpots, optionsInfo, NEWoptions)
    openSpots == 1 ? bestMove(options, optionsInfo) : bestMove(options, optionsInfo);

    // add access to set X from Player1 
    setTimeout(() => {
        cells.forEach(cell => {
            cell.addEventListener('click', cellCicked);
            cell.style.cursor = 'pointer';
        });
    }, 700);
};

let lastOrigin = 0;
let Global_NEWoptions = [];
let firstIndex = 0;

function findField() {

    // new index is still in range from last index in the faked 5x5 field
    if (lastCellIndex_Clicked < lastOrigin + 18 && lastCellIndex_Clicked > lastCellIndex_Clicked - 6 && Global_NEWoptions != undefined) {

        let counter = 0;
        for (let i = firstIndex; firstIndex < firstIndex + 25; firstIndex++) {

            if (options[i] != "") {
                Global_NEWoptions[counter] = PlayerData[1].PlayerForm;
            };
            counter++;
        };

        lastOrigin = lastCellIndex_Clicked;
        var optionsInfo = {
            OriginIndex: lastCellIndex_Clicked,
        };

    } else {
        Global_NEWoptions = Array(25).fill('');
        Global_NEWoptions[6] = PlayerData[1].PlayerForm;

        lastOrigin = lastCellIndex_Clicked;
        var optionsInfo = {
            OriginIndex: lastCellIndex_Clicked,
            CopyIndex: 6
        };

        firstIndex = lastCellIndex_Clicked - 6;
    };

    return [optionsInfo, Global_NEWoptions];
};

// function firstset() {
//     for (let i = 0; i < options.length; i++) {
//         if (options[i] != "") {
//             console.log(options[i + 1], options[i - Math.sqrt(options.length)])

//             if (options[i + 1] != undefined) {

//                 ki_board |= 0b1 << (i + 1);
//                 options[i + 1] = currentPlayer;
//                 cells[i + 1].textContent = currentPlayer;
//                 break;

//             } else if (options[i - Math.sqrt(options.length)] != undefined) {
//                 let newCell = Math.sqrt(options.length);

//                 ki_board |= 0b1 << (i - newCell);
//                 options[i - newCell] = currentPlayer;
//                 cells[i - newCell].textContent = currentPlayer;
//                 break;

//             } else bestMove();
//         };
//     };

//     // change Player
//     checkWinner();
// };

function iterativeDeepening(ki_board, player_board) {
    let bestMove = -1;
    let bestScore = -Infinity;
    let alpha = -Infinity;
    let beta = Infinity;

    for (let i = 0; i < 25; i++) {
        if ((((ki_board >> i) & 0b1) === 0) && (((player_board >> i) & 0b1) === 0)) {

            ki_board |= (0b1 << i);
            let score = minimax(ki_board, player_board, 0, alpha, beta, false);
            ki_board &= ~(0b1 << i);

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            };

            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        };
    };
    return bestMove;
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

// minimax algorithm
function minimax(ki_board, player_board, depth, alpha, beta, isMaximazing) {
    let result = minimax_checkWinner(ki_board, player_board);
    console.count();
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

            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, score);

            if (instantWin === 1) return bestScore;
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

    console.log(WinConditions)

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

    // let winner = null;

    // for (let i = 0; i < WinConditions.length; i++) {
    //     const condition = WinConditions[i];

    //     let cellA = options[condition[0]];
    //     let cellB = options[condition[1]];
    //     let cellC = options[condition[2]];
    //     let cellD = options[condition[3]];

    //     if (cellD != undefined) {
    //         if (cellA == "" || cellB == "" || cellC == "" || cellD == "") {
    //             continue;
    //             // return 'tie';
    //         };
    //         if (cellA == cellB && cellB == cellC && cellC == cellD) {
    //             winner = cellA
    //             break;
    //         };

    //     } else {
    //         if (cellA == "" || cellB == "" || cellC == "") {
    //             continue;
    //             // return 'tie';
    //         };
    //         if (cellA == cellB && cellB == cellC) {
    //             winner = cellA
    //             break;
    //         };
    //     };
    // };

    // let openSpots = 0;
    // for (let i = 0; i < cells.length; i++) {
    //     if (cells[i].classList.length <= 1 && cells[i].textContent == "") {
    //         openSpots++;
    //     };
    // };

    // if (winner == null && openSpots == 0) { return 'tie' } else { return winner };
};

function convertToBinary(winPatterns) {
    const binaryPatterns = [];
    for (const pattern of winPatterns) {
        let binaryRepresentation = 0;
        for (const position of pattern) {
            binaryRepresentation += 1 << position;
        };
        binaryPatterns.push(binaryRepresentation);
    };
    return binaryPatterns;
};