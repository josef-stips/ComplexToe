onmessage = (data) => {
    let for_ki = data.data[0];
    let WinConditions = data.data[1];
    let bigboards = data.data[2];
    let BinaryWinConds = data.data[3];
    let PlayerData = data.data[4];
    let options = data.data[5];
    let BigInnerFieldIndexes = data.data[6];
    // console.log(for_ki, WinConditions, bigboards, BinaryWinConds, PlayerData, options);
    console.log(options)

    // check if player has won
    function minimax_checkWinner(Player_B, winnerIcon) { // give player big bit boards (type BigInt)
        let winner = null;
        let tie = 0; // 1 || 0

        // console.log(Player_B, winnerIcon, WinConds, WinConditions);
        for (let i = 0; i < BinaryWinConds.length; i++) {
            let pattern = BinaryWinConds[i];
            // console.log(pattern.toString(2));

            if (tie == 0) tie = evaluatingTie(pattern, Player_B)

            if ((Player_B & pattern) == pattern) {
                winner = winnerIcon
                break
            }
        }
        return (winner == null && tie == 0) ? 'tie' : winner;
    };

    // check if there is tie for a specific board state 
    const evaluatingTie = (pattern, Board) => {
        if ((Board & pattern) == BigInt(0)) {
            return 1;
        };
        return 0;
    };

    // if the opponent of the KI (player [you]) can beat it in just one move, the KI does not have to do calculations with the minimax algorithm 
    // but just place the icon on that right cell
    const lookForInstantWin = (BigBoard) => {
        // init bit-based win conditions
        WinConds = [];
        WinConds = BinaryWinConds;

        let player_board; // ki board or player board
        let winner; // ki or player icon

        if (BigBoard) {
            player_board = BigBoard; // ki
            winner = PlayerData[2].PlayerForm;

        } else {
            player_board = bigboards[1]; // player
            winner = PlayerData[1].PlayerForm;
        };
        // console.log(BigBoard.toString(2), winner, player_board);

        // set icon for player in every cell and look if he would win
        for (let i = BigInt(0); i < options.length; i++) {
            // and operator for big int with 1
            if ((((bigboards[0] >> i) & BigInt(1)) === BigInt(0)) &&
                (((bigboards[1] >> i) & BigInt(1)) === BigInt(0)) &&
                (((bigboards[2] >> i) & BigInt(1)) === BigInt(0))) {
                // set for second player and check win
                player_board |= (BigInt(1) << i)
                let result = minimax_checkWinner(player_board, winner);
                player_board &= ~(BigInt(1) << i)

                if (result === winner) {
                    return [true, i]
                }
            }
        }
        return [false]
    };

    // check if player can win in 2 moves
    const lookForTwoMoveWin = (for_ki) => {
        let board;

        if (for_ki) {
            board = bigboards[0]; // look if ki can win in 2 moves
        } else board = bigboards[1]; // look if player can win in 2 moves

        // console.log(for_ki, board.toString(2), WinConditions);
        for (let i = BigInt(0); i < options.length; i++) {
            // Überprüfe, ob die Zelle frei ist
            if (
                ((bigboards[0] >> i) & BigInt(1)) === BigInt(0) &&
                ((bigboards[1] >> i) & BigInt(1)) === BigInt(0) &&
                ((bigboards[2] >> i) & BigInt(1)) === BigInt(0)
            ) {
                // if (!BigInnerFieldIndexes.includes(i)) continue;

                // Setze für den Spieler
                board |= BigInt(1) << i;

                let result = lookForInstantWin(board);

                // Setze die Boards zurück, da der Zug des Spielers nicht zu einem Gewinn führt
                board &= ~(BigInt(1) << i);

                if (result[0] == true) {
                    let random = Math.floor(Math.random() * 2); // random number between 0 and 1
                    // console.log(random, i, result[1]);
                    if (random == 0) {
                        postMessage(i);
                        return;

                    } else {
                        postMessage(result[1]);
                        return;
                    };

                } else continue;
            }
        }
        postMessage(false);
    };
    lookForTwoMoveWin(for_ki);
};