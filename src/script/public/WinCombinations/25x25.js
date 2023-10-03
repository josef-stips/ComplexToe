// horizontale linie aus 4 blöcken
function horizontale_Linie_for25(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];
        let maxBorder = [];

        for (let k = 25; k <= 625; k += 25) {
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
function vertikale_Linie_for25(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 25, i + 50, i + 75);

        WinConditions.push(subArray);

        if (i + 75 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #1
function diagonale_Linie_for25(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 26, i + 52, i + 78);
        WinConditions.push(subArray);

        if (i + 78 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #2
function diagonale_Linie2_for25(n) {
    for (let i = 3; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 24, i + 48, i + 72);
        WinConditions.push(subArray);

        if (i + 72 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonales viereck aus 4 blöcken
function diagonales_viereck_for25(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 24, i + 26, i + 50);
        WinConditions.push(subArray);

        if (i + 50 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Stern auf 5 Blöcken
function stern_for25(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 2, i + 26, i + 50, i + 52);
        WinConditions.push(subArray);

        if (i + 52 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #1 nach oben gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_oben_for25(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 25, i + 50, i + 74, i + 76);
        WinConditions.push(subArray);

        if (i + 76 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #2 nach unten gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_unten_for25(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 2, i + 26, i + 51, i + 76);
        WinConditions.push(subArray);

        if (i + 76 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #3 nach rechts gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_rechts_for25(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 26, i + 27, i + 28, i + 50);
        WinConditions.push(subArray);

        if (i + 50 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #2 nach links gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_links_for25(n) {
    for (let i = 3; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 22, i + 23, i + 24, i + 50);
        WinConditions.push(subArray);

        if (i + 50 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #1 extra block ist rechts am block oben
// Block mit extra block an der seite
function block_mit_Ast_1_for25(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 25, i + 26);
        WinConditions.push(subArray);

        if (i + 26 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #2 extra block ist rechts am block unten
// Block mit extra block an der seite
function block_mit_Ast_2_for25(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 25, i + 26, i + 27);
        WinConditions.push(subArray);

        if (i + 27 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #1
function L_1_for25(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 25, i + 50, i + 51, i + 52);
        WinConditions.push(subArray);

        if (i + 52 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #2
function L_2_for25(n) {
    for (let i = 40; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i - 23, i - 48);
        WinConditions.push(subArray);

        if (i + 2 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #3
function L_3_for25(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 25, i + 50);
        WinConditions.push(subArray);

        if (i + 50 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #4
function L_4_for25(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 2, i + 27, i + 52);
        WinConditions.push(subArray);

        if (i + 42 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #1
function W_1_for25(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 26, i + 27, i + 52);
        WinConditions.push(subArray);

        if (i + 52 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #2
function W_2_for25(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 25, i + 26, i + 51, i + 52);
        WinConditions.push(subArray);

        if (i + 52 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #3
function W_3_for25(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 1, i + 24, i + 25, i + 49);
        WinConditions.push(subArray);

        if (i + 49 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #4
function W_4_for25(n) {
    for (let i = 2; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 24, i + 25, i + 48, i + 49);
        WinConditions.push(subArray);

        if (i + 49 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Execute all algorithms
function Create_25x25_WinCombis(all_patt) { // all_patt = allowed patterns
    all_patt.forEach(patt => {
        switch (patt) {
            case "hor":
                horizontale_Linie_for25(yCell_Amount * xCell_Amount);
                break;
            case "vert":
                vertikale_Linie_for25(yCell_Amount * xCell_Amount);
                break;
            case "dia":
                diagonale_Linie_for25(yCell_Amount * xCell_Amount);
                break;
            case "dia2":
                diagonale_Linie2_for25(yCell_Amount * xCell_Amount);
                break;
            case "L1":
                L_1_for25(yCell_Amount * xCell_Amount);
                break;
            case "L2":
                L_2_for25(yCell_Amount * xCell_Amount);
                break;
            case "L3":
                L_3_for25(yCell_Amount * xCell_Amount);
                break;
            case "L4":
                L_4_for25(yCell_Amount * xCell_Amount);
                break;
            case "W1":
                W_1_for25(yCell_Amount * xCell_Amount);
                break;
            case "W2":
                W_2_for25(yCell_Amount * xCell_Amount);
                break;
            case "W3":
                W_3_for25(yCell_Amount * xCell_Amount);
                break;
            case "W4":
                W_4_for25(yCell_Amount * xCell_Amount);
                break;
            case "star":
                stern_for25(yCell_Amount * xCell_Amount);
                break;
            case "diamond":
                diagonales_viereck_for25(yCell_Amount * xCell_Amount);
                break;
            case "branch1":
                zweig_unten_for25(yCell_Amount * xCell_Amount);
                break;
            case "branch2":
                zweig_oben_for25(yCell_Amount * xCell_Amount);
                break;
            case "branch3":
                zweig_links_for25(yCell_Amount * xCell_Amount);
                break;
            case "branch4":
                zweig_rechts_for25(yCell_Amount * xCell_Amount);
                break;
            case "special1":
                block_mit_Ast_1_for25(yCell_Amount * xCell_Amount);
                break;
            case "special2":
                block_mit_Ast_2_for25(yCell_Amount * xCell_Amount);
                break;
        };
    });
};