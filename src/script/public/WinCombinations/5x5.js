// horizontale linie aus 4 blöcken
function horizontale_Linie_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i + 3 == 5 || i + 3 == 10 || i + 3 == 15 || i + 3 == 20) {
            i = i + 3;
        };

        subArray.push(i, i + 1, i + 2, i + 3);

        WinConditions.push(subArray);

        if (i + 3 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// vertikale linie aus 4 blöcken
function vertikale_Linie_for5(n) {
    for (let col = 0; col < 5; col++) {
        for (let row = 0; row <= 1; row++) {
            WinConditions.push([
                row * 5 + col,
                (row + 1) * 5 + col,
                (row + 2) * 5 + col,
                (row + 3) * 5 + col
            ]);
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #1
function diagonale_Linie_for5(n) {
    // Diagonale (links oben nach rechts unten) WinConditions
    for (let row = 0; row <= 5 - 4; row++) {
        for (let col = 0; col <= 5 - 4; col++) {
            const condition = [];
            for (let i = 0; i < 4; i++) {
                condition.push((row + i) * 5 + col + i);
            };
            WinConditions.push(condition);
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #2
function diagonale_Linie2_for5(n) {
    // Diagonale (rechts oben nach links unten) WinConditions
    for (let row = 0; row <= 5 - 4; row++) {
        for (let col = 4 - 1; col < 5; col++) {
            const condition = [];
            for (let i = 0; i < 4; i++) {
                condition.push((row + i) * 5 + col - i);
            };
            WinConditions.push(condition);
        };
    };
};

// diagonales viereck aus 4 blöcken
// [1,5,7,11] , [2,6,8,12], [3,7,9,13], [6, 10, 12, 16]
function diagonales_viereck_for5(n) {
    let i = 1;
    for (let j = 1; j <= n; j++) {
        let subArray = [];

        if (i == 4 || i == 9 || i == 14 || i == 19) {
            i = i + 2;
        };

        subArray.push(i, i + 4, i + 6, i + 10);
        WinConditions.push(subArray);

        if (i + 10 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// Stern auf 5 Blöcken
function stern_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 3 || i == 8 || i == 15 || i == 18) {
            i = i + 2;
        };

        subArray.push(i, i + 2, i + 6, i + 10, i + 12);

        WinConditions.push(subArray);

        if (i + 12 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// zweig #1 nach oben gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_oben_for5(n) {
    let i = 1;
    for (let j = 1; j <= n; j++) {
        let subArray = [];

        if (i == 4 || i == 9 || i == 14 || i == 19) {
            i = i + 2;
        };

        subArray.push(i, i + 5, i + 10, i + 14, i + 16);
        WinConditions.push(subArray);

        if (i + 16 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// zweig #2 nach unten gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_unten_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 3 || i == 8) {
            i = i + 2;
        };

        subArray.push(i, i + 2, i + 6, i + 11, i + 16);
        WinConditions.push(subArray);

        if (i + 16 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// zweig #3 nach rechts gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_rechts_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 2 || i == 7 || i == 12) {
            i = i + 3;
        };

        subArray.push(i, i + 6, i + 7, i + 8, i + 10);
        WinConditions.push(subArray);

        if (i == 11) {
            break;
        };

        i++;
    };
};

// zweig #2 nach links gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_links_for5(n) {
    let i = 5;
    for (let j = 5; j <= n; j++) {
        let subArray = [];

        if (i == 7 || i == 12) {
            i = i + 3;
        };

        subArray.push(i, i + 1, i + 2, i - 2, i + 8);
        WinConditions.push(subArray);

        if (i + 8 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// Block #1 extra block ist rechts am block oben
// Block mit extra block an der seite
function block_mit_Ast_1_for5(n) {
    let i = 0
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 3 || i == 8 || i == 13 || i == 18) {
            i = i + 2;
        };

        subArray.push(i, i + 1, i + 2, i + 5, i + 6);
        WinConditions.push(subArray);

        if (i == 17) {
            break;
        };

        i++;
    };
};

// Block #2 extra block ist rechts am block unten
// Block mit extra block an der seite
function block_mit_Ast_2_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 3 || i == 8 || i == 13 || i == 18) {
            i = i + 2;
        };

        subArray.push(i, i + 1, i + 5, i + 6, i + 7);
        WinConditions.push(subArray);

        if (i + 7 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// Block #3 extra block ist unten am block rechts
// Block mit extra block an der seite
function block_mit_Ast_3_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 4 || i == 9 || i == 14 || i == 19) {
            i = i + 1;
        };

        subArray.push(i, i + 1, i + 5, i + 6, i + 11);
        WinConditions.push(subArray);

        if (i + 11 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// Block #4 extra block ist unten am block links
// Block mit extra block an der seite
function block_mit_Ast_4_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 4 || i == 9 || i == 14 || i == 19) {
            i = i + 1;
        };

        subArray.push(i, i + 1, i + 5, i + 6, i + 10);
        WinConditions.push(subArray);

        if (i + 11 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// Block #5 extra block ist links am block oben
// Block mit extra block an der seite
function block_mit_Ast_5_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 4 || i == 9 || i == 14 || i == 19) {
            i = i + 1;
        };

        subArray.push(i, i + 1, i + 2, i + 6, i + 7);
        WinConditions.push(subArray);

        if (i + 7 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// Block #6 extra block ist links am block unten
// Block mit extra block an der seite
function block_mit_Ast_6_for5(n) {
    let i = 1;
    for (let j = 1; j <= n; j++) {
        let subArray = [];

        if (i == 4 || i == 9 || i == 14 || i == 19) {
            i = i + 2;
        };

        subArray.push(i, i + 1, i + 4, i + 5, i + 6);
        WinConditions.push(subArray);

        if (i + 6 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// Block #7 extra block ist oben auf dem dach links
// Block mit extra block an der seite
function block_mit_Ast_7_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 4 || i == 9 || i == 14 || i == 19) {
            i = i + 1;
        };

        subArray.push(i, i + 5, i + 6, i + 10, i + 11);
        WinConditions.push(subArray);

        if (i + 11 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// Block #8 extra block ist oben auf dem dach rechts
// Block mit extra block an der seite
function block_mit_Ast_8_for5(n) {
    let i = 1;
    for (let j = 1; j <= n; j++) {
        let subArray = [];

        if (i == 5 || i == 10 || i == 15 || i == 20) {
            i = i + 1;
        };

        subArray.push(i, i + 4, i + 5, i + 9, i + 10);
        WinConditions.push(subArray);

        if (i + 10 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #1
function L_1_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 3 || i == 8 || i == 13) {
            i = i + 2;
        };

        subArray.push(i, i + 5, i + 10, i + 11, i + 12);
        WinConditions.push(subArray);

        if (i + 12 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #2
function L_2_for5(n) {
    let i = 10;
    for (let j = 10; j <= n; j++) {
        let subArray = [];

        if (i == 3 || i == 8 || i == 13) {
            i = i + 2;
        };

        subArray.push(i, i + 1, i + 2, i - 3, i - 8);
        WinConditions.push(subArray);

        if (i + 2 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #3
function L_3_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 3 || i == 8 || i == 13) {
            i = i + 2;
        };

        subArray.push(i, i + 1, i + 2, i + 7, i + 12);
        WinConditions.push(subArray);

        if (i + 12 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #4
function L_4_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 3 || i == 8 || i == 13) {
            i = i + 2;
        };

        subArray.push(i, i + 1, i + 2, i + 5, i + 10);
        WinConditions.push(subArray);

        if (i + 10 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #1
function W_1_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 3 || i == 8 || i == 13) {
            i = i + 2;
        };

        subArray.push(i, i + 1, i + 6, i + 7, i + 12);
        WinConditions.push(subArray);

        if (i + 12 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #2
function W_2_for5(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i == 3 || i == 8 || i == 13) {
            i = i + 2;
        };

        subArray.push(i, i + 5, i + 6, i + 11, i + 12);
        WinConditions.push(subArray);

        if (i + 12 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #3
function W_3_for5(n) {
    let i = 1;
    for (let j = 1; j <= n; j++) {
        let subArray = [];

        if (i == 4 || i == 9 || i == 14) {
            i = i + 1;
        };

        subArray.push(i, i + 1, i + 4, i + 5, i + 9);
        WinConditions.push(subArray);

        if (i + 9 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #4
function W_4_for5(n) {
    let i = 2;
    for (let j = 2; j <= n; j++) {
        let subArray = [];

        if (i == 5 || i == 10 || i == 15) {
            i = i + 2;
        };

        subArray.push(i, i + 4, i + 5, i + 8, i + 9);
        WinConditions.push(subArray);

        if (i + 9 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};
// Execute all algorithms
function Create_5x5_WinCombis() {
    horizontale_Linie_for5(yCell_Amount * xCell_Amount);
    vertikale_Linie_for5(yCell_Amount * xCell_Amount);
    diagonale_Linie_for5(yCell_Amount * xCell_Amount);
    diagonale_Linie2_for5(yCell_Amount * xCell_Amount);
    diagonales_viereck_for5(yCell_Amount * xCell_Amount);
    stern_for5(yCell_Amount * xCell_Amount);
    zweig_oben_for5(yCell_Amount * xCell_Amount);
    zweig_unten_for5(yCell_Amount * xCell_Amount);
    zweig_rechts_for5(yCell_Amount * xCell_Amount);
    zweig_links_for5(yCell_Amount * xCell_Amount);
    block_mit_Ast_1_for5(yCell_Amount * xCell_Amount);
    block_mit_Ast_2_for5(yCell_Amount * xCell_Amount);
    // block_mit_Ast_3_for5(yCell_Amount * xCell_Amount);
    // block_mit_Ast_4_for5(yCell_Amount * xCell_Amount);
    // block_mit_Ast_5_for5(yCell_Amount * xCell_Amount);
    // block_mit_Ast_6_for5(yCell_Amount * xCell_Amount);
    // block_mit_Ast_7_for5(yCell_Amount * xCell_Amount);
    // block_mit_Ast_8_for5(yCell_Amount * xCell_Amount);
    L_1_for5(yCell_Amount * xCell_Amount);
    L_2_for5(yCell_Amount * xCell_Amount);
    L_3_for5(yCell_Amount * xCell_Amount);
    L_4_for5(yCell_Amount * xCell_Amount);
    W_1_for5(yCell_Amount * xCell_Amount);
    W_2_for5(yCell_Amount * xCell_Amount);
    W_3_for5(yCell_Amount * xCell_Amount);
    W_4_for5(yCell_Amount * xCell_Amount);
};