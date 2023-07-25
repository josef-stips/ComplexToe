// horizontale linie aus 4 blöcken
function horizontale_Linie_for15(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i + 3 == 15 || i + 3 == 30 || i + 3 == 45 || i + 3 == 60 || i + 3 == 75 || i + 3 == 90 || i + 3 == 105 || i + 3 == 120 ||
            i + 3 == 135 || i + 3 == 150 || i + 3 == 165 || i + 3 == 180 || i + 3 == 195) {
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
function vertikale_Linie_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 15, i + 30, i + 45);

        WinConditions.push(subArray);

        if (i + 45 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #1
function diagonale_Linie_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 16, i + 32, i + 48);
        WinConditions.push(subArray);

        if (i + 48 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #2
function diagonale_Linie2_for15(n) {
    for (let i = 3; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 14, i + 28, i + 42);
        WinConditions.push(subArray);

        if (i + 42 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonales viereck aus 4 blöcken
function diagonales_viereck_for15(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 14, i + 16, i + 30);
        WinConditions.push(subArray);

        if (i + 30 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Stern auf 5 Blöcken
function stern_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 2, i + 16, i + 30, i + 32);
        WinConditions.push(subArray);

        if (i + 32 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #1 nach oben gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_oben_for15(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 15, i + 30, i + 44, i + 46);
        WinConditions.push(subArray);

        if (i + 46 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #2 nach unten gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_unten_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 2, i + 16, i + 31, i + 46);
        WinConditions.push(subArray);

        if (i + 46 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #3 nach rechts gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_rechts_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 16, i + 17, i + 18, i + 30);
        WinConditions.push(subArray);

        if (i + 30 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #2 nach links gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_links_for15(n) {
    for (let i = 15; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i - 12, i + 18);
        WinConditions.push(subArray);

        if (i + 18 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #1 extra block ist rechts am block oben
// Block mit extra block an der seite
function block_mit_Ast_1_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 15, i + 16);
        WinConditions.push(subArray);

        if (i + 16 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #2 extra block ist rechts am block unten
// Block mit extra block an der seite
function block_mit_Ast_2_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 15, i + 16, i + 17);
        WinConditions.push(subArray);

        if (i + 17 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #3 extra block ist unten am block rechts
// Block mit extra block an der seite
function block_mit_Ast_3_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 15, i + 16, i + 31);
        WinConditions.push(subArray);

        if (i + 31 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #2 extra block ist unten am block links
// Block mit extra block an der seite
function block_mit_Ast_4_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 15, i + 16, i + 30);
        WinConditions.push(subArray);

        if (i + 30 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #2 extra block ist links am block oben
// Block mit extra block an der seite
function block_mit_Ast_5_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 16, i + 17);
        WinConditions.push(subArray);

        if (i + 17 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #6 extra block ist links am block unten
// Block mit extra block an der seite
function block_mit_Ast_6_for15(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 14, i + 15, i + 16);
        WinConditions.push(subArray);

        if (i + 16 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #7 extra block ist oben auf dem dach links
// Block mit extra block an der seite
function block_mit_Ast_7_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 15, i + 16, i + 30, i + 31);
        WinConditions.push(subArray);

        if (i + 31 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #8 extra block ist oben auf dem dach rechts
// Block mit extra block an der seite
function block_mit_Ast_8_for15(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 14, i + 15, i + 29, i + 30);
        WinConditions.push(subArray);

        if (i + 30 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #1
function L_1_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 15, i + 30, i + 31, i + 32);

        WinConditions.push(subArray);

        if (i + 32 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #2
function L_2_for15(n) {
    for (let i = 30; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i - 13, i - 28);
        WinConditions.push(subArray);

        if (i + 2 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #3
function L_3_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 15, i + 30);
        WinConditions.push(subArray);

        if (i + 30 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #4
function L_4_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 17, i + 32);
        WinConditions.push(subArray);

        if (i + 32 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #1
function W_1_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 16, i + 17, i + 32);
        WinConditions.push(subArray);

        if (i + 32 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #2
function W_2_for15(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 15, i + 16, i + 31, i + 32);
        WinConditions.push(subArray);

        if (i + 32 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #3
function W_3_for15(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 14, i + 15, i + 29);
        WinConditions.push(subArray);

        if (i + 29 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #4
function W_4_for15(n) {
    for (let i = 2; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 14, i + 15, i + 28, i + 29);
        WinConditions.push(subArray);

        if (i + 29 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Execute all algorithms
function Create_15x15_WinCombis() {
    horizontale_Linie_for15(yCell_Amount * xCell_Amount);
    vertikale_Linie_for15(yCell_Amount * xCell_Amount);
    diagonale_Linie_for15(yCell_Amount * xCell_Amount);
    diagonale_Linie2_for15(yCell_Amount * xCell_Amount);
    diagonales_viereck_for15(yCell_Amount * xCell_Amount);
    stern_for15(yCell_Amount * xCell_Amount);
    zweig_oben_for15(yCell_Amount * xCell_Amount);
    zweig_unten_for15(yCell_Amount * xCell_Amount);
    zweig_rechts_for15(yCell_Amount * xCell_Amount);
    zweig_links_for15(yCell_Amount * xCell_Amount);
    block_mit_Ast_1_for15(yCell_Amount * xCell_Amount);
    block_mit_Ast_2_for15(yCell_Amount * xCell_Amount);
    // block_mit_Ast_3_for15(yCell_Amount * xCell_Amount);
    // block_mit_Ast_4_for15(yCell_Amount * xCell_Amount);
    // block_mit_Ast_5_for15(yCell_Amount * xCell_Amount);
    // block_mit_Ast_6_for15(yCell_Amount * xCell_Amount);
    // block_mit_Ast_7_for15(yCell_Amount * xCell_Amount);
    // block_mit_Ast_8_for15(yCell_Amount * xCell_Amount);
    L_1_for15(yCell_Amount * xCell_Amount);
    L_2_for15(yCell_Amount * xCell_Amount);
    L_3_for15(yCell_Amount * xCell_Amount);
    L_4_for15(yCell_Amount * xCell_Amount);
    W_1_for15(yCell_Amount * xCell_Amount);
    W_2_for15(yCell_Amount * xCell_Amount);
    W_3_for15(yCell_Amount * xCell_Amount);
    W_4_for15(yCell_Amount * xCell_Amount);
};