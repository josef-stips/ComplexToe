// horizontale linie aus 4 blöcken
function horizontale_Linie_for30(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];
        let maxBorder = [];

        for (let k = 30; k <= 870; k += 30) {
            maxBorder.push(k.toString());
        };

        for (let m = 0; m < maxBorder.length; m++) {
            if (i + 3 == maxBorder[m]) {
                i = i + 3;
            };
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
function vertikale_Linie_for30(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 30, i + 60, i + 90);

        WinConditions.push(subArray);

        if (i + 90 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #1
function diagonale_Linie_for30(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 31, i + 62, i + 93);
        WinConditions.push(subArray);

        if (i + 93 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #2
function diagonale_Linie2_for30(n) {
    for (let i = 3; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 29, i + 58, i + 87);
        WinConditions.push(subArray);

        if (i + 87 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonales viereck aus 4 blöcken
function diagonales_viereck_for30(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 29, i + 31, i + 60);
        WinConditions.push(subArray);

        if (i + 60 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Stern auf 5 Blöcken
function stern_for30(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 2, i + 31, i + 60, i + 62);
        WinConditions.push(subArray);

        if (i + 62 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #1 nach oben gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_oben_for30(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 30, i + 60, i + 89, i + 91);
        WinConditions.push(subArray);

        if (i + 91 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #2 nach unten gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_unten_for30(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 2, i + 31, i + 61, i + 91);
        WinConditions.push(subArray);

        if (i + 91 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #3 nach rechts gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_rechts_for30(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 31, i + 32, i + 33, i + 60);
        WinConditions.push(subArray);

        if (i + 60 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #2 nach links gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_links_for30(n) {
    for (let i = 3; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 27, i + 28, i + 29, i + 60);
        WinConditions.push(subArray);

        if (i + 60 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #1 extra block ist rechts am block oben
// Block mit extra block an der seite
function block_mit_Ast_1_for30(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 30, i + 31);
        WinConditions.push(subArray);

        if (i + 31 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #2 extra block ist rechts am block unten
// Block mit extra block an der seite
function block_mit_Ast_2_for30(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 30, i + 31, i + 32);
        WinConditions.push(subArray);

        if (i + 32 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #1
function L_1_for30(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 30, i + 60, i + 61, i + 62);

        WinConditions.push(subArray);

        if (i + 62 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #2
function L_2_for30(n) {
    for (let i = 30; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i - 28, i - 58);
        WinConditions.push(subArray);

        if (i + 2 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #3
function L_3_for30(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 30, i + 60);
        WinConditions.push(subArray);

        if (i + 60 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #4
function L_4_for30(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 32, i + 62);
        WinConditions.push(subArray);

        if (i + 62 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #1
function W_1_for30(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 31, i + 32, i + 62);
        WinConditions.push(subArray);

        if (i + 62 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #2
function W_2_for30(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 30, i + 31, i + 61, i + 62);
        WinConditions.push(subArray);

        if (i + 62 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #3
function W_3_for30(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 29, i + 30, i + 59);
        WinConditions.push(subArray);

        if (i + 59 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #4
function W_4_for30(n) {
    for (let i = 2; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 29, i + 30, i + 58, i + 59);
        WinConditions.push(subArray);

        if (i + 59 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Execute all algorithms
function Create_30x30_WinCombis() {
    horizontale_Linie_for30(yCell_Amount * xCell_Amount);
    vertikale_Linie_for30(yCell_Amount * xCell_Amount);
    diagonale_Linie_for30(yCell_Amount * xCell_Amount);
    diagonale_Linie2_for30(yCell_Amount * xCell_Amount);
    diagonales_viereck_for30(yCell_Amount * xCell_Amount);
    stern_for30(yCell_Amount * xCell_Amount);
    zweig_oben_for30(yCell_Amount * xCell_Amount);
    zweig_unten_for30(yCell_Amount * xCell_Amount);
    zweig_rechts_for30(yCell_Amount * xCell_Amount);
    zweig_links_for30(yCell_Amount * xCell_Amount);
    block_mit_Ast_1_for30(yCell_Amount * xCell_Amount);
    block_mit_Ast_2_for30(yCell_Amount * xCell_Amount);
    L_1_for30(yCell_Amount * xCell_Amount);
    L_2_for30(yCell_Amount * xCell_Amount);
    L_3_for30(yCell_Amount * xCell_Amount);
    L_4_for30(yCell_Amount * xCell_Amount);
    W_1_for30(yCell_Amount * xCell_Amount);
    W_2_for30(yCell_Amount * xCell_Amount);
    W_3_for30(yCell_Amount * xCell_Amount);
    W_4_for30(yCell_Amount * xCell_Amount);
};