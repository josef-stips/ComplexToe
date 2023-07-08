function Create_4x4_WinCombis() {
    // 3x3 Win Patterns for a 4x4 Field 
    WinConditions = [
        // Horizontale Kombinationen
        [0, 1, 2],
        [1, 2, 3],
        [4, 5, 6],
        [5, 6, 7],
        [8, 9, 10],
        [9, 10, 11],
        [12, 13, 14],
        [13, 14, 15],

        // Vertikale Kombinationen
        [0, 4, 8],
        [4, 8, 12],
        [1, 5, 9],
        [5, 9, 13],
        [2, 6, 10],
        [6, 10, 14],
        [3, 7, 11],
        [7, 11, 15],

        // Diagonale Kombinationen
        [0, 5, 10],
        [5, 10, 15],
        [3, 6, 9],
        [6, 9, 12],
        [4, 9, 14],
        [1, 6, 11],
        [2, 5, 8],
        [7, 10, 13],
    ];
};