// horizontale linie aus 4 blöcken
function horizontale_Linie_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i + 3 == boundary && (i = i + 3);

        subArray.push(i, i + 1, i + 2, i + 3);
        WinConditions.push(subArray);

        if (i + 3 >= (n - 1)) {
            break;
        };
    };
};

// vertikale linie aus 4 blöcken
function vertikale_Linie_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 5, i + 10, i + 15);
        WinConditions.push(subArray);

        if (i + 15 >= (n - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #1
function diagonale_Linie_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 3 && (i = i + 3);

        subArray.push(i, i + 6, i + 12, i + 18);
        WinConditions.push(subArray);

        if (i + 18 >= (n - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #2
function diagonale_Linie2_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 3 && (i = i + 3);

        subArray.push(i + 3, i + 7, i + 11, i + 15);
        WinConditions.push(subArray);

        if (i + 15 + 3 >= (n - 1)) {
            break;
        };
    };
};

// diagonales viereck aus 4 blöcken
// [1,5,7,11], [2,6,8,12], [3,7,9,13], [6, 10, 12, 16]
function diagonales_viereck_for5(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 1 && (i = i + 2);

        subArray.push(i, i + 4, i + 6, i + 10);
        WinConditions.push(subArray);

        if (i + 10 >= (n - 2)) {
            break;
        };
    };
};

// Stern auf 5 Blöcken
function stern_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 2, i + 6, i + 10, i + 12);

        WinConditions.push(subArray);

        if (i + 12 >= (n - 1)) {
            break;
        };
    };
};

// zweig #1 nach oben gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_oben_for5(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 1 && (i = i + 2);

        subArray.push(i, i + 5, i + 10, i + 14, i + 16);
        WinConditions.push(subArray);

        if (i + 16 >= (n - 1)) {
            break;
        };
    };
};

// zweig #2 nach unten gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_unten_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 2, i + 6, i + 11, i + 16);
        WinConditions.push(subArray);

        if (i + 16 >= (n - 2)) {
            break;
        };
    };
};

// zweig #3 nach rechts gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_rechts_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 3 && (i = i + 3);

        subArray.push(i, i + 6, i + 7, i + 8, i + 10);
        WinConditions.push(subArray);

        if (i + 10 >= (n - 4)) {
            break;
        };
    };
};

// zweig #2 nach links gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_links_for5(n) {
    for (let i = 5; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 3 && (i = i + 3);

        subArray.push(i, i + 1, i + 2, i - 2, i + 8);
        WinConditions.push(subArray);

        if (i + 8 >= (n - 1)) {
            break;
        };
    };
};

// Block #1 extra block ist rechts am block oben
// Block mit extra block an der seite
function block_mit_Ast_1_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 1, i + 2, i + 5, i + 6);
        WinConditions.push(subArray);

        if (i + 6 >= (n - 2)) {
            break;
        };
    };
};

// Block #2 extra block ist rechts am block unten
// Block mit extra block an der seite
function block_mit_Ast_2_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 1, i + 5, i + 6, i + 7);
        WinConditions.push(subArray);

        if (i + 7 >= (n - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #1
function L_1_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 5, i + 10, i + 11, i + 12);
        WinConditions.push(subArray);

        if (i + 12 >= (n - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #2
function L_2_for5(n) {
    for (let i = 10; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 1, i + 2, i - 3, i - 8);
        WinConditions.push(subArray);

        if (i + 2 >= (n - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #3
function L_3_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 1, i + 2, i + 7, i + 12);
        WinConditions.push(subArray);

        if (i + 12 >= (n - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #4
function L_4_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 1, i + 2, i + 5, i + 10);
        WinConditions.push(subArray);

        if (i + 10 >= (n - 3)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #1
function W_1_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 1, i + 6, i + 7, i + 12);
        WinConditions.push(subArray);

        if (i + 12 >= (n - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #2
function W_2_for5(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 5, i + 6, i + 11, i + 12);
        WinConditions.push(subArray);

        if (i + 12 >= (n - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #3
function W_3_for5(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary && (i = i + 2);

        subArray.push(i, i + 1, i + 4, i + 5, i + 9);
        WinConditions.push(subArray);

        if (i + 9 >= (n - 3)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #4
function W_4_for5(n) {
    for (let i = 2; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary && (i = i + 2);

        subArray.push(i, i + 4, i + 5, i + 8, i + 9);
        WinConditions.push(subArray);

        if (i + 10 >= (n - 1)) {
            break;
        };
    };
};
// Execute all algorithms
function Create_5x5_WinCombis(all_patt) { // all_patt = allowed patterns#
    xCell_Amount = 5;
    yCell_Amount = 5;

    all_patt.forEach(patt => {
        switch (patt) {
            case "hor":
                horizontale_Linie_for5(xCell_Amount * yCell_Amount);
                break;
            case "vert":
                vertikale_Linie_for5(yCell_Amount * xCell_Amount);
                break;
            case "dia":
                diagonale_Linie_for5(xCell_Amount * yCell_Amount);
                break;
            case "dia2":
                diagonale_Linie2_for5(yCell_Amount * xCell_Amount);
                break;
            case "L1":
                L_1_for5(yCell_Amount * xCell_Amount);
                break;
            case "L2":
                L_2_for5(yCell_Amount * xCell_Amount);
                break;
            case "L3":
                L_3_for5(yCell_Amount * xCell_Amount);
                break;
            case "L4":
                L_4_for5(yCell_Amount * xCell_Amount);
                break;
            case "W1":
                W_1_for5(yCell_Amount * xCell_Amount);
                break;
            case "W2":
                W_2_for5(yCell_Amount * xCell_Amount);
                break;
            case "W3":
                W_3_for5(yCell_Amount * xCell_Amount);
                break;
            case "W4":
                W_4_for5(yCell_Amount * xCell_Amount);
                break;
            case "star":
                stern_for5(yCell_Amount * xCell_Amount);
                break;
            case "diamond":
                diagonales_viereck_for5(xCell_Amount * yCell_Amount);
                break;
            case "branch1":
                zweig_unten_for5(yCell_Amount * xCell_Amount);
                break;
            case "branch2":
                zweig_oben_for5(yCell_Amount * xCell_Amount);
                break;
            case "branch3":
                zweig_links_for5(yCell_Amount * xCell_Amount);
                break;
            case "branch4":
                zweig_rechts_for5(yCell_Amount * xCell_Amount);
                break;
            case "special1":
                block_mit_Ast_1_for5(yCell_Amount * xCell_Amount);
                break;
            case "special2":
                block_mit_Ast_2_for5(yCell_Amount * xCell_Amount);
                break;
        };
    });
};