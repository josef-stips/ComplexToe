// horizontale linie aus 4 blöcken
function horizontale_Linie_for20(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        if (i + 3 == 20 || i + 3 == 40 || i + 3 == 60 || i + 3 == 80 ||
            i + 3 == 100 || i + 3 == 120 || i + 3 == 140 || i + 3 == 160 ||
            i + 3 == 180 || i + 3 == 200 || i + 3 == 220 || i + 3 == 240 || i + 3 == 260 || i + 3 == 280 ||
            i + 3 == 300 || i + 3 == 320 || i + 3 == 340 || i + 3 == 360 || i + 3 == 380) {
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
function vertikale_Linie_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 20, i + 40, i + 60);

        WinConditions.push(subArray);

        if (i + 60 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #1
function diagonale_Linie_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 21, i + 42, i + 63);
        WinConditions.push(subArray);

        if (i + 48 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #2
function diagonale_Linie2_for20(n) {
    for (let i = 3; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 19, i + 38, i + 57);
        WinConditions.push(subArray);

        if (i + 57 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonales viereck aus 4 blöcken
function diagonales_viereck_for20(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 19, i + 21, i + 40);
        WinConditions.push(subArray);

        if (i + 40 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Stern auf 5 Blöcken
function stern_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 2, i + 21, i + 40, i + 42);
        WinConditions.push(subArray);

        if (i + 42 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #1 nach oben gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_oben_for20(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 20, i + 40, i + 59, i + 61);
        WinConditions.push(subArray);

        if (i + 61 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #2 nach unten gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_unten_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 2, i + 21, i + 41, i + 61);
        WinConditions.push(subArray);

        if (i + 61 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #3 nach rechts gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_rechts_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 21, i + 22, i + 23, i + 40);
        WinConditions.push(subArray);

        if (i + 40 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #2 nach links gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_links_for20(n) {
    for (let i = 20; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i - 17, i + 23);
        WinConditions.push(subArray);

        if (i + 23 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #1 extra block ist rechts am block oben
// Block mit extra block an der seite
function block_mit_Ast_1_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 20, i + 21);
        WinConditions.push(subArray);

        if (i + 21 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #2 extra block ist rechts am block unten
// Block mit extra block an der seite
function block_mit_Ast_2_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 20, i + 21, i + 22);
        WinConditions.push(subArray);

        if (i + 22 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #3 extra block ist unten am block rechts
// Block mit extra block an der seite
function block_mit_Ast_3_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 20, i + 21, i + 41);
        WinConditions.push(subArray);

        if (i + 41 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #2 extra block ist unten am block links
// Block mit extra block an der seite
function block_mit_Ast_4_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 20, i + 21, i + 40);
        WinConditions.push(subArray);

        if (i + 40 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #2 extra block ist links am block oben
// Block mit extra block an der seite
function block_mit_Ast_5_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 21, i + 22);
        WinConditions.push(subArray);

        if (i + 22 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #6 extra block ist links am block unten
// Block mit extra block an der seite
function block_mit_Ast_6_for20(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 19, i + 20, i + 21);
        WinConditions.push(subArray);

        if (i + 21 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #7 extra block ist oben auf dem dach links
// Block mit extra block an der seite
function block_mit_Ast_7_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 20, i + 21, i + 40, i + 41);
        WinConditions.push(subArray);

        if (i + 41 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #8 extra block ist oben auf dem dach rechts
// Block mit extra block an der seite
function block_mit_Ast_8_for20(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 19, i + 20, i + 39, i + 40);
        WinConditions.push(subArray);

        if (i + 40 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #1
function L_1_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 20, i + 40, i + 41, i + 42);
        WinConditions.push(subArray);

        if (i + 42 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #2
function L_2_for20(n) {
    for (let i = 40; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i - 18, i - 38);
        WinConditions.push(subArray);

        if (i + 2 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #3
function L_3_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 20, i + 40);
        WinConditions.push(subArray);

        if (i + 40 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #4
function L_4_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 22, i + 42);
        WinConditions.push(subArray);

        if (i + 42 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #1
function W_1_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 21, i + 22, i + 42);
        WinConditions.push(subArray);

        if (i + 42 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #2
function W_2_for20(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 20, i + 21, i + 41, i + 42);
        WinConditions.push(subArray);

        if (i + 42 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #3
function W_3_for20(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 19, i + 20, i + 39);
        WinConditions.push(subArray);

        if (i + 39 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #4
function W_4_for20(n) {
    for (let i = 2; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 19, i + 20, i + 38, i + 39);
        WinConditions.push(subArray);

        if (i + 39 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Execute all algorithms
function Create_20x20_WinCombis() {
    horizontale_Linie_for20(yCell_Amount * xCell_Amount);
    vertikale_Linie_for20(yCell_Amount * xCell_Amount);
    diagonale_Linie_for20(yCell_Amount * xCell_Amount);
    diagonale_Linie2_for20(yCell_Amount * xCell_Amount);
    diagonales_viereck_for20(yCell_Amount * xCell_Amount);
    stern_for20(yCell_Amount * xCell_Amount);
    zweig_oben_for20(yCell_Amount * xCell_Amount);
    zweig_unten_for20(yCell_Amount * xCell_Amount);
    zweig_rechts_for20(yCell_Amount * xCell_Amount);
    zweig_links_for20(yCell_Amount * xCell_Amount);
    block_mit_Ast_1_for20(yCell_Amount * xCell_Amount);
    block_mit_Ast_2_for20(yCell_Amount * xCell_Amount);
    // block_mit_Ast_3_for20(yCell_Amount * xCell_Amount);
    // block_mit_Ast_4_for20(yCell_Amount * xCell_Amount);
    // block_mit_Ast_5_for20(yCell_Amount * xCell_Amount);
    // block_mit_Ast_6_for20(yCell_Amount * xCell_Amount);
    // block_mit_Ast_7_for20(yCell_Amount * xCell_Amount);
    // block_mit_Ast_8_for20(yCell_Amount * xCell_Amount);
    L_1_for20(yCell_Amount * xCell_Amount);
    L_2_for20(yCell_Amount * xCell_Amount);
    L_3_for20(yCell_Amount * xCell_Amount);
    L_4_for20(yCell_Amount * xCell_Amount);
    W_1_for20(yCell_Amount * xCell_Amount);
    W_2_for20(yCell_Amount * xCell_Amount);
    W_3_for20(yCell_Amount * xCell_Amount);
    W_4_for20(yCell_Amount * xCell_Amount);
};