function Create_3x3_WinCombis() {
    // 3x3 Win Patterns for a 4x4 Field 
    WinConditions = [
        // Horizontale Kombinationen
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Vertikale Kombinationen
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonale Kombinationen
        [0, 4, 8],
        [2, 4, 6],
    ];
};