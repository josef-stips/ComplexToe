// deactivate all tabs
const deactivateTabs = () => {
    tabs.forEach((tab, i) => {
        tab.setAttribute("active_tap", false);
    });
};

// undisplay all content in a tab content container
const deactivateTabContent = (container) => {
    let all_tab_contents = container.querySelectorAll(".tab_content");

    all_tab_contents.forEach((tab, i) => {
        tab.style.display = "none";
    });
};

// activate one tab content
// container = content container where the tab content displays
// content = conent element to display
const activateTabContent = (container, content) => {
    deactivateTabContent(container);

    content.style.display = "flex";

    // display appropriate content for each tab
    switch (content.getAttribute("tab_content")) {
        case "12":
            Display_CostumPatterns();
            break;
        case "11":
            Display_CostumFields();
            break;
    };
};

// default tab conent preview
const default_tab_content_view = (container) => {
    let all_tab_contents = container.querySelectorAll(".tab_content");
    // get index of targeted container
    let container_index = container.getAttribute("content_container");
    // search for first tab btn in the targeted tab container
    let tab_btn_el = document.querySelectorAll(`.tab[target_container="${container_index}"]`)[0];

    // undisplay every tab content
    deactivateTabContent(container);

    // display first content of targeted container
    Display_CostumFields();
    all_tab_contents[0].style.display = "flex";

    // activate first tap btn
    tab_btn_el.setAttribute("active_tap", true);
};

// create costum field on given dimensions. max. dimensions are 30x30
const generateField_preview = (x, y, field_el, eventListener, static_cell = true) => {
    // get and init. grid
    let grid = field_el;

    // delete previous field
    grid.textContent = null;

    // console.log(x, y)

    if (x == 0 || x == NaN || y == 0 || y == NaN) {
        return false;

    } else if (x > 0 && y > 0 && y != NaN && x != NaN) {
        grid.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
        grid.style.gridAutoRows = `min-content`;

        for (i = 0; i < x * y; i++) {
            let cell = createCell(x, i, grid, eventListener);
            grid.appendChild(cell);
        };

        if (static_cell) {
            setTimeout(() => {
                try {
                    // give cell static width and height to prevent issues  
                    StaticCellScale(grid);

                } catch (error) {
                    console.log(error)
                }
            }, 250);

        } else {
            cell_inherit_width(grid);
        };
    };
};

// give cell static width and height to prevent issues  
const StaticCellScale = (grid) => {
    // give cells a static width and height
    let cellWidth = grid.children[0].getBoundingClientRect().width;
    [...grid.children].forEach(cell => {
        cell.style.width = `${cellWidth - 1}px`;
        cell.style.height = `${cellWidth - 1}px`;
    });
};

// give cell width of grid to fill the space
const cell_inherit_width = (grid) => {
    // [...grid.children].forEach(cell => {
    //     cell.style.width = `inherit`;
    //     cell.style.height = `inherit`;
    // });
};

// just create cell. Do not append to parent
const createCell = (x, index, grid, eventListener) => {
    let cell = document.createElement('div');
    cell.classList = "cell";
    cell.setAttribute('cell-index', index);

    if (eventListener) {
        cell.addEventListener('click', () => {
            playBtn_Audio_2();

            createField_updateCell(index, grid);
        });
    };

    cell.style.fontSize = "3.5vh";

    return cell;
};

// update cell. toggle its content
const createField_updateCell = (i, parentGrid, fromPreview, cellClass = "cell") => {
    let userInfoClass = localStorage.getItem("userInfoClass");
    let userInfoColor = localStorage.getItem("userInfoColor");
    let UserIcon = localStorage.getItem("UserIcon");

    let cell = [...parentGrid.children][i];

    // check if cell is empty or not
    if (cell.classList.contains("draw")) { // cell is full. empty it
        // reset cell
        cell.className = `${cellClass} ${fromPreview}`;
        cell.textContent = null;
        cell.style.color = "white";

    } else { // cell is empty. draw on it

        // user uses advaned skin
        if (userInfoClass != "empty") {
            cell.className = `${cellClass} ${fromPreview} ${userInfoClass}`;

        } else { // user uses normal color skin

            cell.textContent = UserIcon;
            cell.style.color = userInfoColor;
        };

        cell.classList.add("draw");
    };
};

// user wants to create new field
const createNewCostumField = () => {
    let x = Number(createCostumField_xInput.textContent);
    let y = Number(createCostumField_yInput.textContent);
    let name = createCostumField_title.textContent.trim();

    // save field in storage
    let storage = localStorage.getItem("CostumFields");

    if (!storage) {
        localStorage.setItem("CostumFields", "{}");

        let newStorage = JSON.parse(localStorage.getItem("CostumFields"));

        newStorage[name] = {

            "name": name,
            "x": x,
            "y": y,
        };

        localStorage.setItem("CostumFields", JSON.stringify(newStorage));

    } else {
        let parsedStorage = JSON.parse(storage);

        parsedStorage[name] = {

            "name": name,
            "x": x,
            "y": y,
        };

        localStorage.setItem("CostumFields", JSON.stringify(parsedStorage));
    };

    // generate field
    createPattern_preview(name, [], costum_field_overview, "personal", undefined, x, "scroll", undefined, y);

    // html stuff
    createCostumField_popUp.style.display = "none";
    DisplayPopUp_PopAnimation(CreateOwnStuffPopUp, "flex", true);

    setTimeout(() => {
        // display updated patterns storage
        Display_CostumFields();
    }, 250);
};

// user wants to create new pattern
// if user didn't provide a name: The default text will be set with a number at the end as an index; ex. [text] (01)
const createNewCostumPattern = () => {
    // input data
    let cells = [...createCostumPattern_Field.children];
    let pattern_title = createCostumPattern_title.textContent.trim();
    // output data
    let indexes = [];

    // get pattern indexes
    cells.forEach(cell => {
        if (cell.classList.contains("draw")) {
            indexes.push(cell.getAttribute("cell-index"));
        };
    });

    // save pattern in storage
    let storage = localStorage.getItem("CostumPatterns");

    if (!storage) {
        localStorage.setItem("CostumPatterns", "{}");

        let newStorage = JSON.parse(localStorage.getItem("CostumPatterns"));

        newStorage[pattern_title] = { 'structure': indexes, 'value': Number(createPattern_ValueInput.value) };
        localStorage.setItem("CostumPatterns", JSON.stringify(newStorage));

    } else {
        let parsedStorage = JSON.parse(storage);

        parsedStorage[pattern_title] = { 'structure': indexes, 'value': Number(createPattern_ValueInput.value) };
        localStorage.setItem("CostumPatterns", JSON.stringify(parsedStorage));
    };

    // redirect to pattern overview
    createCostumPattern_popUp.style.display = "none";

    DisplayPopUp_PopAnimation(CreateOwnStuffPopUp, "flex", true);

    setTimeout(() => {
        // display updated patterns storage
        Display_CostumPatterns();
    }, 250);
};

// displays all patterns stored in localstorage in "own patterns" tab container 
const Display_CostumPatterns = () => {
    let patterns = JSON.parse(localStorage.getItem("CostumPatterns"));

    // delete previous content
    costum_patterns_overview.textContent = null;

    if (!patterns) {
        costum_patterns_overview.textContent = "No costum patterns are created yet.";
        NewCreativeLevel.InitCostumPatterns({});
        return;
    };

    if (Object.keys(patterns).length <= 0) costum_patterns_overview.textContent = "No costum patterns are created yet.";

    // creates pattern html element from an object
    Object.keys(patterns).forEach(pattName => {

        let pattStructure = patterns[pattName].structure;
        let pattValue = patterns[pattName].value;
        createPattern_preview(pattName, pattStructure, costum_patterns_overview, "personal", undefined, undefined, undefined, undefined, undefined, undefined, undefined, pattValue, true);
    });

    NewCreativeLevel.InitCostumPatterns(NewCreativeLevel.CurrentSelectedSetting.costumPatterns);
};

// displays all fields stored in localstorage in "own fields" tab container 
const Display_CostumFields = () => {
    let fields = JSON.parse(localStorage.getItem("CostumFields"));

    // delete previous content
    costum_field_overview.textContent = null;

    if (fields) {
        if (Object.keys(fields).length <= 0) costum_field_overview.textContent = "No costum fields are created yet.";

        // creates pattern html element from an object
        Object.keys(fields).forEach(key => {
            let name = fields[key]["name"];
            let x = fields[key]["x"];
            let y = fields[key]["y"];

            createPattern_preview(name, [], costum_field_overview, "personal", undefined, x, "scroll", undefined, y, "field");
        });

        NewCreativeLevel.InitCostumField(NewCreativeLevel.CurrentSelectedSetting.costumField);

    } else {
        costum_field_overview.textContent = "No costum fields are created yet.";

        NewCreativeLevel.InitCostumField({});
    };
};

// create pattern preview element
const createPattern_preview = (patternName, patternStructure, parent, rights, special_class, gridRows = 5, Yscroll, Xscroll, y = 5, gridType, forBotMode, patternValue, showPointsOfPattern) => {
    // create elements
    const gridWrapper = document.createElement("div");
    const grid = document.createElement("div");
    const title = document.createElement("h2");
    const headerWrapper = document.createElement("div");
    const flexDiv = document.createElement("div");
    const editItemsWrapper = document.createElement("div");
    const pointsOfPatternWrapper = document.createElement('div');

    // items
    const pen = document.createElement("i");
    const bin = document.createElement("i");
    let checkBox = document.createElement("i");

    // items for level "that means like readonly" rights
    const bin2 = document.createElement("i");
    bin2.className = "fa-solid fa-trash item";

    pointsOfPatternWrapper.textContent = `value: ${patternValue}`;

    // add classes, attributes and style to the pattern grid
    createPattern_addAttributes(gridWrapper, patternName, grid, title, headerWrapper,
        editItemsWrapper, special_class, checkBox, pen, bin, costum_patterns_overview, gridRows, flexDiv, pointsOfPatternWrapper);

    // check if pattern is in current level being edited
    createPattern_checkPatternInLevel(checkBox, patternName, patternStructure, gridType, forBotMode);

    // create basic 5x5 grid 
    createPattern_createGrid(patternStructure, gridRows, y, grid, rights, special_class);

    // event listener
    createPattern_eventListener(pen, bin, checkBox, bin2, patternStructure, patternName, gridType, Number(gridRows), Number(y), forBotMode, patternValue);

    // scroll
    createPattern_scrollgrid(gridWrapper, grid, Yscroll, Xscroll);

    // append to document
    parent.appendChild(gridWrapper);
    headerWrapper.appendChild(flexDiv);
    headerWrapper.appendChild(title);

    if (special_class != "ingame_preview") {
        gridWrapper.appendChild(headerWrapper);
    };

    headerWrapper.appendChild(editItemsWrapper)
    gridWrapper.appendChild(grid);

    if (rights == "personal") {

        editItemsWrapper.appendChild(pen);
        editItemsWrapper.appendChild(bin);
        editItemsWrapper.appendChild(checkBox);

        gridWrapper.setAttribute("right", "personal");
        gridWrapper.style.fontSize = "3vh";

    } else if (rights == "level") {

        gridWrapper.setAttribute("right", "level");

    } else if (rights == "remove") {

        editItemsWrapper.appendChild(bin2);
        gridWrapper.setAttribute("right", "remove");
        gridWrapper.style.fontSize = "3vh";

    } else if (rights == "toggle") {
        editItemsWrapper.appendChild(checkBox);
        gridWrapper.setAttribute("right", "toggle");
    };

    setTimeout(() => {
        // give static height/ scale whatever
        special_class != "ingame_preview" && StaticCellScale(grid);
    }, 250);

    if (showPointsOfPattern) {
        gridWrapper.appendChild(pointsOfPatternWrapper);
    };
};

// add classes, attributes and style to the pattern grid
const createPattern_addAttributes = (gridWrapper, patternName, grid, title, headerWrapper,
    editItemsWrapper, special_class, checkBox, pen, bin, costum_patterns_overview, gridRows, flexDiv, pointsOfPatternWrapper) => {
    // add attributes and style
    gridWrapper.setAttribute("costum_pattern_name", patternName.replace(" ", "_"));
    gridWrapper.classList.add("createCostumField_Field_wrapper");
    gridWrapper.classList.add("costumPatternsOverview_gridWrapper");
    grid.classList.add("small_createCostumField_Field");
    title.classList.add("preview_pattern_title");
    headerWrapper.classList.add("headerWrapper");
    editItemsWrapper.classList.add("editItemsWrapper");
    special_class != undefined && gridWrapper.setAttribute(special_class, "true");
    NewCreativeLevel && (checkBox.title = `use pattern in ${NewCreativeLevel.CurrentSelectedSetting.name}`);
    pen.className = "fa-solid fa-pen item";
    bin.className = "fa-solid fa-trash item";

    pointsOfPatternWrapper.className = 'pattern_preview_points_display';

    // set attributes and style
    costum_patterns_overview.setAttribute("costum_pattern_name", patternName);

    flexDiv.style.width = "10%";
    checkBox.style.fontSize = "larger";
    grid.style.gridTemplateColumns = `repeat(${gridRows}, 1fr)`;
    title.textContent = patternName;

    if (title.textContent.length >= 12) {
        title.style.fontSize = "var(--costum-grid-font-size-small)";

    } else {
        title.style.fontSize = "var(--costum-grid-font-size-big)";
    };
};

// check if this pattern exists in the current creative level
const createPattern_checkPatternInLevel = (checkBox, patternName, patternStructure, gridType, forBotMode) => {
    if (forBotMode) {
        checkBox.className = "fa-regular fa-square item";
        checkBox.setAttribute("activated", "false");
        return;
    };

    let patternIsInCurrentCreativeLevel = gridType != "field" ? checkCostumPatternInCurrentLevel(patternName, patternStructure) : checkCostumFieldInCurrentLevel(patternName);

    if (patternIsInCurrentCreativeLevel) {
        checkBox.className = "fa-regular fa-square-check item";
        checkBox.setAttribute("activated", "true");

    } else {
        checkBox.className = "fa-regular fa-square item";
        checkBox.setAttribute("activated", "false");
    };

    if (gridType == "field") {
        checkBox.setAttribute("corresponding_field", `${patternName}_box`);

    } else {
        checkBox.setAttribute("corresponding_pattern", `${patternName}_box`);
    };
};

// create grid and grid pattern if exists to the grid
const createPattern_createGrid = (patternStructure, gridRows, y, grid, rights, special_class) => {
    let cellClass = rights == "level" ? "miniCellMini" : "cell";

    new Array(gridRows * y).fill("").forEach(i => {
        let cell = document.createElement("div");

        special_class != "ingame_preview" && cell.classList.add("preview_cell");
        cell.classList.add(cellClass);

        grid.appendChild(cell);
    });

    // draw structure on grid
    patternStructure.forEach(i => {
        let index = parseInt(i);

        // console.log(index, i, grid, grid.children[index]);
        createField_updateCell(index, grid, "preview_cell", cellClass);
    });
};

// create event listener for grid elements
const createPattern_eventListener = (pen, bin, checkBox, bin2, patternStructure, patternName, gridType, x, y, forBotMode, value) => {
    pen.addEventListener("click", () => {
        if (gridType == "field") {
            editCostumField(checkBox, patternName, x, y);

        } else {
            editCostumWrapper(checkBox, patternStructure.map(i => Number(i)), patternName);
        };
    });

    bin.addEventListener("click", () => {
        if (gridType == "field") {
            deleteCostumField(patternName);

        } else {
            deleteCostumWrapper(patternName);

        };
    });

    if (forBotMode) return;

    checkBox.addEventListener("click", () => {

        if (gridType == "field") {
            toggleCostumFieldInNewLevel(checkBox, patternName, x, y);

        } else {
            toggleCustomPatternInNewLevel(checkBox, patternStructure.map(i => Number(i)), patternName, value);
        };
    });

    bin2.addEventListener("click", () => {
        checkBox.click();

        let name = patternName.replace(" ", "_");

        // If this element exists, deactivate its status
        let correspondingPatternStoragePattern = document.querySelector(`[costum_pattern_name="${name}"][right="personal"]`);

        if (correspondingPatternStoragePattern) {
            let checkBoxOfLevel = correspondingPatternStoragePattern.children[0].children[2].children[2];

            console.log(checkBoxOfLevel);

            checkBoxOfLevel.className = "fa-regular fa-square item";
            checkBoxOfLevel.setAttribute("activated", "false");
        };
    });
};

// wether the grid should be scrollable 
const createPattern_scrollgrid = (gridWrapper, grid, Yscroll, Xscroll) => {
    if (Yscroll === "scroll") {
        gridWrapper.style.overflowY = "scroll";
        grid.style.gridAutoRows = "min-content";
    };

    if (Xscroll === "scroll") {
        gridWrapper.style.overflowX = "scroll";
        grid.style.gridAutoRows = "min-content";
    };

    if (Yscroll === undefined) {
        gridWrapper.style.overflowY = "unset";
    };

    if (Xscroll === undefined) {
        gridWrapper.style.overflowX = "hidden";
    };
};


// delete costum wrapper
const deleteCostumWrapper = (name) => {
    if (!NewCreativeLevel.is_pattern_in_level(name)) {
        // get storage
        let patternStorage = JSON.parse(localStorage.getItem("CostumPatterns"));
        // delete from storage
        delete patternStorage[name];
        // update storage
        localStorage.setItem("CostumPatterns", JSON.stringify(patternStorage));
        // update html
        Display_CostumPatterns();

    } else {
        OpenedPopUp_WhereAlertPopUpNeeded = true;
        AlertText.textContent = "You can't delete a pattern which is used in this level.";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    };
};

// delete costum field
const deleteCostumField = (name) => {
    if (!NewCreativeLevel.is_field_in_level(name)) {
        // get storage
        let fieldStorage = JSON.parse(localStorage.getItem("CostumFields"));
        // delete from storage
        delete fieldStorage[name];
        // update storage
        localStorage.setItem("CostumFields", JSON.stringify(fieldStorage));
        // update html
        Display_CostumFields();

    } else {
        OpenedPopUp_WhereAlertPopUpNeeded = true;
        AlertText.textContent = "You can't delete a field which is used in this level.";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    };
};

// edit costum wrapper
const editCostumWrapper = (pattern_check, structure, name) => {
    if (pattern_check.getAttribute("activated") == "false") {

        CreateCostumPattern_btn.click(); // open create pattern pop up
        createCostumPattern_title.textContent = name;

        [...createCostumPattern_Field.children].forEach((val, i) => {
            if (!structure.includes(i)) {
                return;

            } else {

                createField_updateCell(i, createCostumPattern_Field);
            };
        });

    } else if (pattern_check.getAttribute("activated") == "true") {
        AlertText.textContent = "You can't edit a pattern which is used in this level.";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        OpenedPopUp_WhereAlertPopUpNeeded = true;
    };
};

// edit costum field
const editCostumField = (field_check, name, x, y) => {
    if (field_check.getAttribute("activated") == "false") {

        CreateCostumField_btn.click(); // open create field pop up

        createCostumField_title.textContent = name;
        createCostumField_xInput.textContent = x;
        createCostumField_yInput.textContent = y;

        generateField_preview(x, y, createCostumField_Field);

    } else if (field_check.getAttribute("activated") == "true") {
        AlertText.textContent = "You can't edit a field which is used in this level.";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        OpenedPopUp_WhereAlertPopUpNeeded = true;
    };
};

// toggle wether costum pattern should be used as pattern in new create level from user
const toggleCustomPatternInNewLevel = (box, structure, name, value) => {
    if (!NewCreativeLevel) return;

    // box logic
    if (box.getAttribute("activated") == "true") {
        box.setAttribute("activated", "false");
        box.className = "fa-regular fa-square item";

        // pattern in level logic
        NewCreativeLevel.toggle_costum_pattern("remove", name, structure, value);

    } else {
        if (FieldIsTooSmallForPatterns(Number(NewCreativeLevel.selectedLevel[16].x), Number(NewCreativeLevel.selectedLevel[16].y), [structure])) {
            OpenedPopUp_WhereAlertPopUpNeeded = true;
            AlertText.textContent = `There are two reasons why this pattern may not be selectable: 1. The pattern exceeds the boundaries of the level's field, or 2. The pattern is too complex in nature.`;
            DisplayPopUp_PopAnimation(alertPopUp, 'flex', true);
            return;
        };

        box.setAttribute("activated", "true");
        box.className = "fa-regular fa-square-check item";

        // pattern in level logic
        NewCreativeLevel.toggle_costum_pattern("add", name, structure, value);
    };

    NewCreativeLevel.InitCostumPatterns(NewCreativeLevel.CurrentSelectedSetting.costumPatterns);
};

// toggle wether costum field should be used as main field in the new creative level
const toggleCostumFieldInNewLevel = (box, name, x, y) => {
    // box logic
    if (box.getAttribute("activated") == "true") {
        box.setAttribute("activated", "false");
        box.className = "fa-regular fa-square item";

        // field in level logic
        NewCreativeLevel.toggle_costum_field("remove", name, x, y);

    } else {
        if (FieldIsTooSmallForPatterns(Number(x), Number(y))) {
            OpenedPopUp_WhereAlertPopUpNeeded = true;
            AlertText.textContent = 'The current patterns exceed the boundaries of this field.';
            DisplayPopUp_PopAnimation(alertPopUp, 'flex', true);
            return;
        };

        // uncheck all chechboxes 
        let AllFieldBoxes = document.querySelectorAll(`[corresponding_field]`);

        [...AllFieldBoxes].map((box => {

            box.setAttribute("activated", "false");
            box.className = "fa-regular fa-square item"
        }));

        // activate that one box
        box.setAttribute("activated", "true");
        box.className = "fa-regular fa-square-check item";

        // field in level logic
        NewCreativeLevel.toggle_costum_field("add", name, x, y);
    };

    NewCreativeLevel.InitCostumField(NewCreativeLevel.CurrentSelectedSetting.costumField);
};

// check if user drawed a costum pattern
// if not, user is not allowed to create a new pattern because there is nothing he created
const checkUserDrawnPattern = () => {
    const cells = [...createCostumPattern_Field.children];

    for (let cell of cells) {
        // console.log(cell.classList.contains("draw"), cell.classList);

        if (cell.classList.contains("draw")) {
            return true;
        };
    };

    return false;
};

// check if the costum pattern the user wants to create is already an official win pattern in the game
const checkCostumPatternAlreadyInGame = () => {
    const cells = [...createCostumPattern_Field.children];
    let indexes = [];

    cells.forEach(cell => {
        if (cell.classList.contains("draw")) {
            indexes.push(Number(cell.getAttribute("cell-index")));
        };
    });

    let normalized_indexes = PatternStructureAsOrigin([0, 5, 10, 15, 20, 25], indexes, 5, 5);
    // console.log(indexes, normalized_indexes, OfficialGamePatterns, OfficialGamePatterns.some(pattern => patternsEqual(pattern, normalized_indexes)));

    return OfficialGamePatterns.some(pattern => patternsEqual(pattern, normalized_indexes));
};

const FieldIsTooSmallForPatterns = (x = Number(createCostumField_xInput.textContent), y = Number(createCostumField_yInput.textContent), structures) => {
    if (structures == undefined) {
        // all used patterns in the level
        structures = [...Object.keys(NewCreativeLevel.selectedLevel[15]).map(n => NewCreativeLevel.selectedLevel[15][n][n].structure),
            ...NewCreativeLevel.CurrentSelectedSetting.allowedpatterns.map(name => GamePatternsList[name])
        ]
    };

    CreateWinConditions(x, y, structures);
    return WinConditions.length <= 0 ? true : undefined;
};

// check if the costum pattern that being rendered in the costum pattern preview is in the current level
const checkCostumPatternInCurrentLevel = (patternName, patternStructure) => {
    if (NewCreativeLevel) {
        if (NewCreativeLevel.is_pattern_in_level(patternName)) {
            return true;

        } else return false;
    };
};

// check if the costum field that being rendered in the costum pattern preview is in the current level
const checkCostumFieldInCurrentLevel = (fieldName) => {
    if (NewCreativeLevel) {
        if (NewCreativeLevel.is_field_in_level(fieldName)) {
            return true;

        } else return false;
    };
};


// how many indexes the user should minimum draw on costum pattern creation
const minimumIndexesRequiremement = amount => {
    let indexesAmount = 0;

    [...createCostumPattern_Field.children].forEach(cell => (cell.classList.contains("draw")) && indexesAmount++);

    return (indexesAmount >= amount) ? true : false;
};