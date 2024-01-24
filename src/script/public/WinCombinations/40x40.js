// horizontale linie aus 4 blöcken
function horizontale_Linie_for40(n) {
    let i = 0;
    for (let j = 0; j <= n; j++) {
        let subArray = [];

        for (let boundary of boundaries) i + 3 == boundary && (i = i + 3);

        subArray.push(i, i + 1, i + 2, i + 3);
        WinConditions.push(subArray);

        if (i + 3 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };

        i++;
    };
};

// vertikale linie aus 4 blöcken
function vertikale_Linie_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        subArray.push(i, i + 40, i + 80, i + 120);

        WinConditions.push(subArray);

        if (i + 120 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #1
function diagonale_Linie_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 3 && (i = i + 3);

        subArray.push(i, i + 41, i + 82, i + 123);
        WinConditions.push(subArray);

        if (i + 88 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonale linie aus 4 blöcken
// diagonale linie #2
function diagonale_Linie2_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 3 && (i = i + 3);

        subArray.push(i + 3, i + 42, i + 81, i + 120);
        WinConditions.push(subArray);

        if (i + 120 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// diagonales viereck aus 4 blöcken
function diagonales_viereck_for40(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 1 && (i = i + 2);

        subArray.push(i, i + 39, i + 41, i + 80);
        WinConditions.push(subArray);

        if (i + 80 >= (xCell_Amount * yCell_Amount - 2)) {
            break;
        };
    };
};

// Stern auf 5 Blöcken
function stern_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 2, i + 41, i + 80, i + 82);
        WinConditions.push(subArray);

        if (i + 82 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #1 nach oben gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_oben_for40(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 1 && (i = i + 2);

        subArray.push(i, i + 40, i + 80, i + 119, i + 121);
        WinConditions.push(subArray);

        if (i + 121 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// zweig #2 nach unten gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_unten_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 2, i + 41, i + 81, i + 121);
        WinConditions.push(subArray);

        if (i + 121 >= (xCell_Amount * yCell_Amount - 2)) {
            break;
        };
    };
};

// zweig #3 nach rechts gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_rechts_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 3 && (i = i + 3);

        subArray.push(i, i + 41, i + 42, i + 43, i + 80);
        WinConditions.push(subArray);

        if (i + 80 >= (xCell_Amount * yCell_Amount - 4)) {
            break;
        };
    };
};

// zweig #2 nach links gerichtet
// zweig -> linie aus 3 blöcken und 2 blöcke am ende der linie die diagonal von einander weggehen (5 Block muster)
function zweig_links_for40(n) {
    for (let i = 20; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 3 && (i = i + 3);

        subArray.push(i, i + 1, i + 2, i - 37, i + 43);
        WinConditions.push(subArray);

        if (i + 43 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Block #1 extra block ist rechts am block oben
// Block mit extra block an der seite
function block_mit_Ast_1_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 1, i + 2, i + 40, i + 41);
        WinConditions.push(subArray);

        if (i + 41 >= (xCell_Amount * yCell_Amount - 2)) {
            break;
        };
    };
};

// Block #2 extra block ist rechts am block unten
// Block mit extra block an der seite
function block_mit_Ast_2_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 1, i + 40, i + 41, i + 42);
        WinConditions.push(subArray);

        if (i + 42 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #1
function L_1_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 40, i + 80, i + 81, i + 82);
        WinConditions.push(subArray);

        if (i + 82 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #2
function L_2_for40(n) {
    for (let i = 40; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 1, i + 2, i - 38, i - 78);
        WinConditions.push(subArray);

        if (i + 2 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #3
function L_3_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 1, i + 2, i + 40, i + 80);
        WinConditions.push(subArray);

        if (i + 80 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// L Block. 3 blöcke in eine horizontale richtung gefolgt von zwei liniaren Blöcken in eine vertikale Richtung
// #4
function L_4_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 1, i + 2, i + 42, i + 82);
        WinConditions.push(subArray);

        if (i + 82 >= (xCell_Amount * yCell_Amount - 3)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #1
function W_1_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 1, i + 41, i + 42, i + 82);
        WinConditions.push(subArray);

        if (i + 82 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #2
function W_2_for40(n) {
    for (let i = 0; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary - 2 && (i = i + 2);

        subArray.push(i, i + 40, i + 41, i + 81, i + 82);
        WinConditions.push(subArray);

        if (i + 82 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #3
function W_3_for40(n) {
    for (let i = 1; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary && (i = i + 2);

        subArray.push(i, i + 1, i + 39, i + 40, i + 79);
        WinConditions.push(subArray);

        if (i + 79 >= (xCell_Amount * yCell_Amount - 3)) {
            break;
        };
    };
};

// W Block. Diagonale Linie bestehend aus 3 Blöcken zusammengeknüpft mit einer diagonalen Linie aus 2 Blöcken
// #4
function W_4_for40(n) {
    for (let i = 2; i <= n; i++) {
        let subArray = [];

        for (let boundary of boundaries) i == boundary && (i = i + 2);

        subArray.push(i, i + 39, i + 40, i + 78, i + 79);
        WinConditions.push(subArray);

        if (i + 79 >= (xCell_Amount * yCell_Amount - 1)) {
            break;
        };
    };
};

// Execute all algorithms
function Create_40x40_WinCombis(all_patt) { // all_patt = allowed patterns
    xCell_Amount = 40;
    yCell_Amount = 40;

    all_patt.forEach(patt => {
        switch (patt) {
            case "hor":
                horizontale_Linie_for40(yCell_Amount * xCell_Amount);
                break;
            case "vert":
                vertikale_Linie_for40(yCell_Amount * xCell_Amount);
                break;
            case "dia":
                diagonale_Linie_for40(yCell_Amount * xCell_Amount);
                break;
            case "dia2":
                diagonale_Linie2_for40(yCell_Amount * xCell_Amount);
                break;
            case "L1":
                L_1_for40(yCell_Amount * xCell_Amount);
                break;
            case "L2":
                L_2_for40(yCell_Amount * xCell_Amount);
                break;
            case "L3":
                L_3_for40(yCell_Amount * xCell_Amount);
                break;
            case "L4":
                L_4_for40(yCell_Amount * xCell_Amount);
                break;
            case "W1":
                W_1_for40(yCell_Amount * xCell_Amount);
                break;
            case "W2":
                W_2_for40(yCell_Amount * xCell_Amount);
                break;
            case "W3":
                W_3_for40(yCell_Amount * xCell_Amount);
                break;
            case "W4":
                W_4_for40(yCell_Amount * xCell_Amount);
                break;
            case "star":
                stern_for40(yCell_Amount * xCell_Amount);
                break;
            case "diamond":
                diagonales_viereck_for40(yCell_Amount * xCell_Amount);
                break;
            case "branch1":
                zweig_unten_for40(yCell_Amount * xCell_Amount);
                break;
            case "branch2":
                zweig_oben_for40(yCell_Amount * xCell_Amount);
                break;
            case "branch3":
                zweig_links_for40(yCell_Amount * xCell_Amount);
                break;
            case "branch4":
                zweig_rechts_for40(yCell_Amount * xCell_Amount);
                break;
            case "special1":
                block_mit_Ast_1_for40(yCell_Amount * xCell_Amount);
                break;
            case "special2":
                block_mit_Ast_2_for40(yCell_Amount * xCell_Amount);
                break;
        };
    });
};