// user can create costum patterns for his own created levels he can upload to the public server
// This script provides the functionality to such patterns

// Win pattern X functionality on field X
const CostumWinPattern = (PatternStructure, Fieldx, Fieldy) => {
    let n = Fieldx * Fieldy;

    console.log(n);

    xCell_Amount = 5;
    CalculateBoundaries();

    // pattern in its origin form
    let structure = PatternStructureAsOrigin(boundaries, PatternStructure, Fieldx);

    xCell_Amount = Fieldx;
    CalculateBoundaries();

    // last Index of boundary data 
    let lastIndexData = NextBoundaryNearestIndex(boundaries, structure);
    let lastIndex = lastIndexData[0];
    let lastIndexBoundary = lastIndexData[1];

    // steps to go on boundary overshoot
    let stepsOnIllegalBoundary;
    let stopCommand;

    if (lastIndexBoundary > Fieldx) {

        stepsOnIllegalBoundary = (lastIndex - (lastIndexBoundary - Fieldx));
        stopCommand = (n - stepsOnIllegalBoundary) - 1;

    } else {

        stepsOnIllegalBoundary = lastIndex;
        stopCommand = (n - stepsOnIllegalBoundary) - 1;
    };

    // console.log(n, structure, lastIndexData, lastIndex, lastIndexBoundary, stepsOnIllegalBoundary, stopCommand);

    // generate pattern and push it to the official win patterns library
    for (let i = 0; i < n; i++) {
        let pattern = []

        // check for boundary overshoot
        for (let boundary of boundaries) i + stepsOnIllegalBoundary == boundary && (i = i + stepsOnIllegalBoundary);

        // generate new pattern structure
        structure.forEach(index => {
            pattern.push(index + i);
        });

        // stop generating. last field boundary touched
        if (pattern[pattern.length - 1] > n - 1) break;

        // push win combination to win combination list
        WinConditions.push(pattern);
    };

    // console.log(WinConditions);
};

// the user can draw every pattern he likes on a 5x5 field
// For the pattern to be used in the right way by the game, the indexes should all have the minimum possible number
// Ex. [7, 13, 18, 22] -> [0, 6, 11, 15]
const PatternStructureAsOrigin = (boundaries, Structure, Fieldx) => {
    // console.log(boundaries, Structure, Fieldx)

    // sort structure. small first biggest at the end
    let PatternStructure = Structure.sort((a, b) => a - b);
    // console.log(PatternStructure, Fieldx);

    // literally the first index of the pattern and its corresponding lower boundary
    let x = Structure[0];
    let bx = findLowerBoundary(x, boundaries);
    // nearest index to the left side of the 5x5 field and its corresponding boundary
    let yData = XboundaryNearestIndex(1, boundaries, PatternStructure);
    let y = yData[0];
    let by = yData[1];
    // number to subtract from each index of pattern
    let rowSteps = y - by;
    let steps = bx + rowSteps;

    // console.log(`
    //     PatternStructure : ${PatternStructure},
    //     x : ${x},
    //     bx : ${bx},
    //     yData : ${yData},
    //     y : ${y},
    //     by : ${by},
    //     rowSteps : ${rowSteps},
    //     steps : ${steps}
    // `);

    PatternStructure = PatternStructure.map(index => {
        return index - steps;
    });

    if (Fieldx > 5) PatternStructure = structureAsNxNstructure(PatternStructure, Fieldx, boundaries);

    return PatternStructure;
};

// user created structures are 5x5 field based. To generate win patterns from this pattern on fields bigger than 5x5,
// rearange pattern to NxN
const structureAsNxNstructure = (PatternStructure, Fieldx, Initboundaries) => {

    let structure = PatternStructure.map((index, i) => {
        let [lowerBoundary, BoundaryIndex] = findLowerBoundary(index, Initboundaries, true);

        let boundaryIndexDifference = index - lowerBoundary;

        xCell_Amount = Fieldx;
        CalculateBoundaries();

        let newBoundaryIndex = boundaries[BoundaryIndex];
        let newIndex = boundaryIndexDifference + newBoundaryIndex

        // replace 5x5 based index with rearranged index based on Fieldx 
        return newIndex;
    });

    return structure;
};

// ascertain the nearest index to the previous boundaries
const XboundaryNearestIndex = (boundaryType, boundaries, structure) => { // boundaryType = 1 (lower boundary of index) || 0 (current boundary of index)
    let indexBoundaryPairs = {};

    // find corresponding boundary to index
    structure.forEach(index => {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            // console.log(index, boundary);

            if (index < boundary) {
                indexBoundaryPairs[index] = boundaries[i - boundaryType];
                return;
            };
        };
    });

    // console.log(indexBoundaryPairs)

    // find index which is nearest to its lower boundary
    let bestDiff = Infinity;
    let bestIndex = null;
    let bestBoundary = null;

    for (let [index, boundary] of Object.entries(indexBoundaryPairs)) {
        let diff = index - boundary;

        if (diff < bestDiff) {
            bestDiff = diff;
            bestIndex = index;
            bestBoundary = boundary;
        };
    };

    // console.log(bestDiff, bestIndex, bestBoundary)
    return [Number(bestIndex), Number(bestBoundary)];
};

const NextBoundaryNearestIndex = (boundaries, structure) => {
    let indexBoundaryPairs = {};

    // find corresponding boundary to index
    structure.forEach(index => {
        for (let i = boundaries.length - 1; i >= 0; i--) {
            const boundary = boundaries[i];
            // console.log(index, boundary);

            if (index >= boundary) {
                indexBoundaryPairs[index] = boundaries[i + 1];
                return;
            };
        };
    });

    // console.log(indexBoundaryPairs)

    // find index which is nearest to its lower boundary
    let bestDiff = Infinity;
    let bestIndex = null;
    let bestBoundary = null;

    for (let [index, boundary] of Object.entries(indexBoundaryPairs)) {
        let diff = boundary - index;

        if (diff < bestDiff) {
            bestDiff = diff;
            bestIndex = index;
            bestBoundary = boundary;
        };
    };

    // console.log(bestDiff, bestIndex, bestBoundary)
    return [Number(bestIndex), Number(bestBoundary)];
};

// input one index and boundary list, returns lower boundary of index 
const findLowerBoundary = (index, boundaries, findIndex) => {
    let lowerBoundary = null;

    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];

        if (index < boundary) {
            lowerBoundary = boundaries[i - 1];

            return !findIndex ? lowerBoundary : [lowerBoundary, i - 1];
        };
    };

    return;
};