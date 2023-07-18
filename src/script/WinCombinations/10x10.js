// horizontale linie aus 4 blöcken
function horizontale_Linie(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        if (i + 3 == 10 || i + 3 == 20 || i + 3 == 30 || i + 3 == 40 || i + 3 == 50 || i + 3 == 60 || i + 3 == 70 || i + 3 == 80 ||
            i + 3 == 90) {
            i = i + 3;
        };

        subArray.push(i, i + 1, i + 2, i + 3);
        WinConditions.push(subArray);

        if (i + 3 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// vertikale linie aus 4 blöcken
function vertikale_Linie(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 10, i + 20, i + 30);
        WinConditions.push(subArray);

        if (i + 30 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #1
// [0, 11, 22, 33], [1, 12, 23, 34], [2, 13, 24, 35], [3, 14, 25, 36], [4, 15, 26, 37], [5, 16, 27, 38], [6, 17, 28, 39], [10, 21, 32, 43], [11, 22, 33, 44]
function diagonale_Linie(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 11, i + 22, i + 33);
        WinConditions.push(subArray);

        if (i + 33 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #2
// [3, 12, 21, 30]
function diagonale_Linie2(n) {
    for (let i = 3; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 9, i + 18, i + 27);

        WinConditions.push(subArray);

        if (i + 27 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonales viereck aus 4 blöcken
// [1, 10, 12, 21], [2, 11, 13, 22], [3, 12, 14, 23], ..., [8, 17, 19, 28], [11, 20, 22, 31], [12, 21, 23, 32]
function diagonales_viereck(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 9, i + 11, i + 20);

        WinConditions.push(subArray);

        if (i + 20 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Stern auf 5 Blöcken
// [0, 2, 11, 20, 22], [1, 3, 12, 21, 23], [2, 4, 13, 22, 24], ..., [7, 9, 18, 27, 29], [10, 12, 21, 30, 32], [11, 13, 22, 31, 33]
function stern(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 2, i + 11, i + 20, i + 22);

        WinConditions.push(subArray);

        if (i + 22 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #1 nach oben gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
// [1, 11, 21, 30, 32], [2, 12, 22, 31, 33], ..., [8, 18, 28, 37, 39], [11, 21, 31, 40, 42]
function zweig_oben(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 10, i + 20, i + 29, i + 31);

        WinConditions.push(subArray);

        if (i + 31 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #2 nach unten gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
// [0, 2, 11, 21, 31]
function zweig_unten(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 2, i + 11, i + 21, i + 31);

        WinConditions.push(subArray);

        if (i + 31 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #3 nach rechts gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
// [0, 20, 11, 12, 13]
function zweig_rechts(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 20, i + 11, i + 12, i + 13);

        WinConditions.push(subArray);

        if (i + 20 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #2 nach links gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
// [10, 11, 12, 3, 23]
function zweig_links(n) {
    for (let i = 10; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i - 7, i + 13);

        WinConditions.push(subArray);

        if (i + 13 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #1 extra block ist rechts am block oben
// Block mit extra block an der seite
// [0, 1, 2, 10, 11]
function block_mit_Ast_1(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 10, i + 11);

        WinConditions.push(subArray);

        if (i + 11 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #2 extra block ist rechts am block unten
// Block mit extra block an der seite
// [0, 1, 10, 11, 12]
function block_mit_Ast_2(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 10, i + 11, i + 12);

        WinConditions.push(subArray);

        if (i + 12 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #3 extra block ist unten am block rechts
// Block mit extra block an der seite
// [0, 1, 10, 11, 21]
function block_mit_Ast_3(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 10, i + 11, i + 21);

        WinConditions.push(subArray);

        if (i + 21 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #2 extra block ist unten am block links
// Block mit extra block an der seite
// [0, 1, 10, 11, 20]
function block_mit_Ast_4(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 10, i + 11, i + 20);

        WinConditions.push(subArray);

        if (i + 20 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #2 extra block ist links am block oben
// Block mit extra block an der seite
// [0, 1, 2, 11, 12]
function block_mit_Ast_5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 11, i + 12);

        WinConditions.push(subArray);

        if (i + 12 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #6 extra block ist links am block unten
// Block mit extra block an der seite
// [1, 2, 11, 12, 10]
function block_mit_Ast_6(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 10, i + 11, i + 9);

        WinConditions.push(subArray);

        if (i + 11 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #7 extra block ist oben auf dem dach links
// Block mit extra block an der seite
// [0, 10, 11, 20, 21]
function block_mit_Ast_7(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 10, i + 11, i + 20, i + 21);

        WinConditions.push(subArray);

        if (i + 21 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #8 extra block ist oben auf dem dach rechts
// Block mit extra block an der seite
// [1, 10, 11, 20, 21]
function block_mit_Ast_8(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 9, i + 10, i + 19, i + 20);

        WinConditions.push(subArray);

        if (i + 20 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #1
// [0, 10, 20, 21, 22]
function L_1(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 10, i + 20, i + 21, i + 22);

        WinConditions.push(subArray);

        if (i + 22 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #2
// [20, 21, 22, 12, 2]
function L_2(n) {
    for (let i = 20; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i - 8, i - 18);

        WinConditions.push(subArray);

        if (i + 2 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #3
// [0, 1, 2, 10, 20]
function L_3(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 10, i + 20);

        WinConditions.push(subArray);

        if (i + 20 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #4
// [0, 1, 2, 12, 22]
function L_4(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 12, i + 22);

        WinConditions.push(subArray);

        if (i + 22 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #1
// [0, 1, 11, 12, 22]
function W_1(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 11, i + 12, i + 22);

        WinConditions.push(subArray);

        if (i + 22 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #2
// [0, 10, 11, 21, 22]
function W_2(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 10, i + 11, i + 21, i + 22);

        WinConditions.push(subArray);

        if (i + 22 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #3
// [1, 2, 10, 11, 20]
function W_3(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 9, i + 10, i + 19);

        WinConditions.push(subArray);

        if (i + 19 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #4
// [2, 11, 12, 20, 21]
function W_4(n) {
    for (let i = 2; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 9, i + 10, i + 18, i + 19);

        WinConditions.push(subArray);

        if (i + 19 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Execute all algorithms
function Create_10x10_WinCombis() {
    horizontale_Linie(yCell_Amount * xCell_Amount);
    vertikale_Linie(yCell_Amount * xCell_Amount);
    diagonale_Linie(yCell_Amount * xCell_Amount);
    diagonale_Linie2(yCell_Amount * xCell_Amount);
    diagonales_viereck(yCell_Amount * xCell_Amount);
    stern(yCell_Amount * xCell_Amount);
    zweig_oben(yCell_Amount * xCell_Amount);
    zweig_unten(yCell_Amount * xCell_Amount);
    zweig_rechts(yCell_Amount * xCell_Amount);
    zweig_links(yCell_Amount * xCell_Amount);
    block_mit_Ast_1(yCell_Amount * xCell_Amount);
    block_mit_Ast_2(yCell_Amount * xCell_Amount);
    // block_mit_Ast_3(yCell_Amount * xCell_Amount);
    // block_mit_Ast_4(yCell_Amount * xCell_Amount);
    // block_mit_Ast_5(yCell_Amount * xCell_Amount);
    // block_mit_Ast_6(yCell_Amount * xCell_Amount);
    // block_mit_Ast_7(yCell_Amount * xCell_Amount);
    // block_mit_Ast_8(yCell_Amount * xCell_Amount);
    L_1(yCell_Amount * xCell_Amount);
    L_2(yCell_Amount * xCell_Amount);
    L_3(yCell_Amount * xCell_Amount);
    L_4(yCell_Amount * xCell_Amount);
    W_1(yCell_Amount * xCell_Amount);
    W_2(yCell_Amount * xCell_Amount);
    W_3(yCell_Amount * xCell_Amount);
    W_4(yCell_Amount * xCell_Amount);
};