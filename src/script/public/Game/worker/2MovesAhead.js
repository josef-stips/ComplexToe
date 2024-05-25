onmessage = (data) => {
    let for_ki = data.data[0];
    let WinConditions = data.data[1];
    let [player_board, ki_board, blockages] = data.data[2];
    let BinaryWinConds = data.data[3];
    let PlayerData = data.data[4];
    let options = data.data[5];
    let player_lastCellIndexClicked = data.data[6];

    let winner = for_ki ? PlayerData[2].PlayerForm : PlayerData[1].PlayerForm;

    console.log(ki_board, player_board, blockages);
    console.log(for_ki, options);

    options = new Array(400)

    const nearestNumber = (mainNumb, numb1, numb2) => (Math.abs(mainNumb - numb1) < Math.abs(mainNumb - numb2)) ? numb1 : numb2;

    function minimax_checkWinner(Player_B) {
        let WinnerOfCurrentState = null;
        let tie = 0; // 1 || 0

        for (let i = 0; i < BinaryWinConds.length; i++) {
            let pattern = BinaryWinConds[i];

            if (tie == 0) tie = evaluatingTie(pattern, Player_B)

            if ((Player_B & pattern) == pattern) {
                WinnerOfCurrentState = winner;
                break;
            };
        };

        return (WinnerOfCurrentState == null && tie == 0) ? 'tie' : WinnerOfCurrentState;
    };

    // check if there is tie for a specific board state 
    const evaluatingTie = (pattern, Board) => {
        return ((Board & pattern) == BigInt(0)) ? 1 : 0;
    };

    const lookForInstantWin = (board) => {

        for (let i = BigInt(0); i < options.length; i++) {

            if (
                (((ki_board >> i) & BigInt(1)) === BigInt(0)) &&
                (((player_board >> i) & BigInt(1)) === BigInt(0)) &&
                (((blockages >> i) & BigInt(1)) === BigInt(0))
            ) {

                board |= (BigInt(1) << i)
                let result = minimax_checkWinner(board);
                board &= ~(BigInt(1) << i)

                if (result === winner) {
                    return i;
                };
            };
        };

        return false;
    };

    const lookForTwoMoveWin = (for_ki) => {
        let board = for_ki ? ki_board : player_board;

        for (let i = BigInt(0); i < options.length; i++) {

            if (
                ((ki_board >> i) & BigInt(1)) === BigInt(0) &&
                ((player_board >> i) & BigInt(1)) === BigInt(0) &&
                ((blockages >> i) & BigInt(1)) === BigInt(0)
            ) {

                board |= BigInt(1) << i;
                let result = lookForInstantWin(board);
                board &= ~(BigInt(1) << i);

                if (result) {

                    let nearestIndex = nearestNumber(Number(player_lastCellIndexClicked), Number(i), Number(result));
                    postMessage(nearestIndex);
                    return;

                } else continue;
            };
        };

        postMessage(false);
    };

    lookForTwoMoveWin(for_ki);
};