const winningCombinations = [0b111000000, 0b000111000, 0b000000111, 0b100100100, 0b010010010, 0b001001001, 0b100010001, 0b001010100];

// Funktion zur Überprüfung des Gewinners
function minimax_checkWinner(board) {
    return winningCombination => (board & winningCombination) === winningCombination;
};

// Funktion zur Überprüfung, ob das Spielbrett voll ist
function isBoardFull(board) {
    return (board & 0b111111111) === 0b111111111;
};

let board = 0b0;

function calculateBestMove() {
    let bestEval = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
        const bit = 1 << (8 - i);
        if (!(board & bit) && !(board & (bit << 9))) {
            const newBoard = board | bit;
            const eval = minimax(newBoard, 0, false, -Infinity, Infinity);

            if (eval > bestEval) {
                bestEval = eval;
                bestMove = i;
            };
        }
    };

    cells[bestMove].textContent = currentPlayer;
    options[bestMove] = currentPlayer;

    checkWinner();
};

function minimax(board, depth, maximizingPlayer, alpha, beta) {
    if (winningCombinations.some(minimax_checkWinner(board))) {
        return maximizingPlayer ? -1 : 1;
    }
    if (isBoardFull(board)) {
        return 0;
    }

    if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (let i = 0; i < 9; i++) {
            const bit = 1 << (8 - i);
            if (!(board & bit) && !(board & (bit << 9))) {
                const newBoard = board | bit;
                const eval = minimax(newBoard, depth + 1, false, alpha, beta);
                maxEval = Math.max(maxEval, eval);
                alpha = Math.max(alpha, eval);
                if (beta <= alpha) break;
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < 9; i++) {
            const bit = 1 << (8 - i);
            if (!(board & bit) && !(board & (bit << 9))) {
                const newBoard = board | (bit << 9);
                const eval = minimax(newBoard, depth + 1, true, alpha, beta);
                minEval = Math.min(minEval, eval);
                beta = Math.min(beta, eval);
                if (beta <= alpha) break;
            }
        }
        return minEval;
    }
};