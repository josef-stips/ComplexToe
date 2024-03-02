// user can create costum patterns for his own created levels he can upload to the public server
// This script provides the functionality to such patterns

// Win pattern X functionality on field X
const CostumWinPattern = (PatternStructure, Fieldx, Fieldy) => {
    let n = Fieldx * Fieldy;

    // pattern in its origin form
    let structure = PatternStructureAsOrigin(boundaries, PatternStructure, Fieldx);

    // get pattern length to get through field boundaries
    let lastIndex = Number(NearestIndexToBoundary(boundaries, structure));
    let lastIndexBoundary = findLowerBoundary(lastIndex, boundaries, Fieldx);
    let stepsOnIllegalBoundary = (lastIndex == Fieldx - 1 || lastIndex == 0) ? lastIndex : (lastIndex - lastIndexBoundary);

    // literally the last index of the pattern minus the boundary steps
    let lastAllowedPatternIndex = structure[structure.length - 1] - stepsOnIllegalBoundary;

    console.log(structure, " last Index lol: ", lastIndex, lastIndexBoundary, lastAllowedPatternIndex, stepsOnIllegalBoundary);

    // generate pattern and push it to the official win patterns library
    for (let i = 0; i < n; i++) {
        let pattern = []

        for (let boundary of boundaries) i + stepsOnIllegalBoundary == boundary && (i = i + stepsOnIllegalBoundary);

        structure.forEach(index => {
            pattern.push(index + i);
        });

        WinConditions.push(pattern);

        console.log(i + lastIndex, (n - (lastIndex - lastIndexBoundary)));

        if (pattern[pattern.length - 1] >= (n - (lastIndex - lastIndexBoundary)) - 1) break;
    };

    console.log(WinConditions);
};

// the user can draw every pattern he likes on a 5x5 field
// For the pattern to be used in the right way by the game, the indexes should all have the minimum possible number
// Ex. [7, 13, 18, 22] -> [0, 6, 11, 15]
const PatternStructureAsOrigin = (boundaries, Structure, Fieldx) => {
    // sort structure. small first biggest at the end
    let PatternStructure = Structure.sort((a, b) => a - b);

    // ascertain the first number of the structure
    let firstIndex = NearestIndexToPreviousBoundary(boundaries, Structure);
    let boundary = findLowerBoundary(firstIndex, boundaries, Fieldx);
    let steps = boundary - firstIndex;

    if (firstIndex == 0) {
        // pattern is already on its origin
        return PatternStructure;

    } else {
        PatternStructure = PatternStructure.map(index => {
            return index - steps;
        });

        return PatternStructure;
    };
};

// ascertain the nearest index to the boundaries
const NearestIndexToBoundary = (boundaries, structure) => {
    console.log(structure, boundaries);

    // Create an object to store pairs of index and corresponding boundary
    const indexBoundaryPairs = {};

    // For each index in the index array
    structure.forEach(index => {
        // Loop through the boundaries array to find the corresponding range
        for (let i = 0; i < boundaries.length; i++) {
            // If the index exactly matches a boundary
            if (index === boundaries[i]) {
                indexBoundaryPairs[index] = boundaries[i + 1];
                break;
            }
            // If the index is within the current boundary
            else if (index > boundaries[i] && index < boundaries[i + 1]) {
                // Store the pair in the object
                indexBoundaryPairs[index] = boundaries[i + 1];
                break; // Exit the loop once the range is found
            };
        };
    });

    // Compare the difference between the pairs and find the smallest difference
    let minDifference = Infinity;
    let minDifferenceIndex = null;
    let minDifferenceBoundary = null;

    Object.entries(indexBoundaryPairs).forEach(([index, boundary]) => {
        const difference = Math.abs(index - boundary);
        if (difference < minDifference) {

            minDifference = difference;
            minDifferenceIndex = index;
            minDifferenceBoundary = boundary;
        };
    });

    return minDifferenceIndex;
};

// ascertain the nearest index to the previous boundaries
const NearestIndexToPreviousBoundary = (boundaries, structure) => {
    console.log(structure, boundaries);

    // Create an object to store pairs of index and corresponding boundary
    const indexBoundaryPairs = {};

    // For each index in the index array
    structure.forEach(index => {
        // Loop through the boundaries array to find the corresponding range
        for (let i = 0; i < boundaries.length; i++) {
            // If the index exactly matches a boundary
            if (index === boundaries[i]) {
                indexBoundaryPairs[index] = boundaries[i + 1];
                break;
            }
            // If the index is within the current boundary
            else if (index > boundaries[i] && index < boundaries[i + 1]) {
                // Store the pair in the object
                indexBoundaryPairs[index] = boundaries[i + 1];
                break; // Exit the loop once the range is found
            };
        };
    });

    // Compare the difference between the pairs and find the smallest difference
    let minDifference = Infinity;
    let minDifferenceIndex = null;
    let minDifferenceBoundary = null;

    Object.entries(indexBoundaryPairs).forEach(([index, boundary]) => {
        const difference = Math.abs(index - boundary);
        if (difference < minDifference) {

            minDifference = difference;
            minDifferenceIndex = index;
            minDifferenceBoundary = boundary;
        };
    });

    return minDifferenceIndex;
};

const findLowerBoundary = (number, boundaries, FieldX) => {
    let lowerBoundary = boundaries[0];

    // loop boundaries
    for (let i = boundaries.length - 1; i >= 0; i--) {
        // if number lies between current an previous value
        if (number <= boundaries[i]) {
            // update lower bound
            // if lower bound is at its lowest: return boundary. else: return previous bound. To prevent an undefined value
            lowerBoundary = (boundaries[i] == FieldX) ? boundaries[i] : boundaries[i - 1];

        };
    };

    return lowerBoundary;
};