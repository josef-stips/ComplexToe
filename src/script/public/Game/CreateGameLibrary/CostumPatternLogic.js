// user can create costum patterns for his own created levels he can upload to the public server
// This script provides the functionality to such patterns

// Win pattern X functionality on field X
const CostumWinPattern = (PatternStructure, Fieldx, Fieldy) => {
    let n = Fieldx * Fieldy;

    let structure = PatternStructureAsOrigin(PatternStructure);
    let lastIndex = NearestIndexToBoundary(PatternStructure);

    console.log(structure, lastIndex);

    for (let i = 0; i < n; i++) {
        let pattern = []

        structure.forEach(index => {
            pattern.push(index + i);
        });

        for (let boundary of boundaries) i + lastIndex == boundary && (i = i + lastIndex);

        console.log(pattern);
        WinConditions.push(pattern);

        // if (i + lastIndex >= (n - 1)) break;
    };

    console.log(WinConditions);
};

// ascertain the nearest index to the boundaries
const NearestIndexToBoundary = (structure) => {

};

// horizontale linie aus 4 blöcken
function horizontale_Linie_for15(n) {
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

// the user can draw every pattern he likes on a 5x5 field
// For the pattern to be used in the right way by the game, the indexes should all have the minimum possible number
// Ex. [7, 13, 18, 22] -> [0, 6, 11, 15]
const PatternStructureAsOrigin = (Structure) => {
    // sort structure. small first biggest at the end
    let PatternStructure = Structure.sort((a, b) => a - b);

    // ascertain the first number of the structure
    let firstIndex = PatternStructure[0];

    if (firstIndex == 0) {
        // pattern is already on its origin
        return PatternStructure;

    } else {
        // copy of unmodified structure
        let pattern = [...PatternStructure];

        // every index minus the smallest position
        pattern = pattern.map(index => index = index - firstIndex);

        // return updated structure
        return pattern;
    };
};