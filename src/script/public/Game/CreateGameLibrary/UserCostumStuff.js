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
    all_tab_contents[0].style.display = "flex";
    // activate first tap btn
    tab_btn_el.setAttribute("active_tap", true);
};

// create costum field on given dimensions. max. dimensions are 30x30
const generateField_preview = (x, y, field_el, eventListener) => {
    // get and init. grid
    let grid = field_el;

    // delete previous field
    grid.textContent = null;

    console.log(x, y)

    if (x == 0 || x == NaN || y == 0 || y == NaN) {
        return false;

    } else if (x > 0 && y > 0 && y != NaN && x != NaN) {
        grid.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
        grid.style.gridAutoRows = `min-content`;

        for (i = 0; i < x * y; i++) {
            let cell = createCell(x, i, grid, eventListener);
            grid.appendChild(cell);
        };

        setTimeout(() => {
            try {
                // give cell static width and height to prevent issues  
                StaticCellScale(grid);

            } catch (error) {
                console.log(error)
            }
        }, 250);
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
}

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

    cell.style.fontSize = "70px";

    return cell;
};

// update cell. toggle its content
const createField_updateCell = (i, parentGrid, fromPreview) => {
    let userInfoClass = localStorage.getItem("userInfoClass");
    let userInfoColor = localStorage.getItem("userInfoColor");
    let UserIcon = localStorage.getItem("UserIcon");

    let cell = [...parentGrid.children][i];

    // check if cell is empty or not
    if (cell.classList.contains("draw")) { // cell is full. empty it
        // reset cell
        cell.className = `cell ${fromPreview}`;
        cell.textContent = null;
        cell.style.color = "white";

    } else { // cell is empty. draw on it

        // user uses advaned skin
        if (userInfoClass != "empty") {
            cell.className = `cell ${fromPreview} ${userInfoClass}`;

        } else { // user uses normal color skin

            cell.textContent = UserIcon;
            cell.style.color = userInfoColor;
        };

        cell.classList.add("draw");
    };
};

// user wants to create new field
const createNewCostumField = () => {
    let x = createCostumField_xInput.textContent;
    let y = createCostumField_yInput.textContent;

};

// user wants to create new pattern
// if user didn't provide a name: The default text will be set with a number at the end as an index; ex. [text] (01)
const createNewCostumPattern = () => {
    // input data
    let cells = [...createCostumPattern_Field.children];
    let pattern_title = createCostumPattern_title.textContent;
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

        newStorage[pattern_title] = indexes;
        localStorage.setItem("CostumPatterns", JSON.stringify(newStorage));

    } else {
        let parsedStorage = JSON.parse(storage);

        parsedStorage[pattern_title] = indexes;

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

// displays all patterns stored in localstorage in "own fields" tab container 
const Display_CostumPatterns = () => {
    let patterns = JSON.parse(localStorage.getItem("CostumPatterns"));

    console.log(patterns);

    // delete previous content
    costum_patterns_overview.textContent = null;

    // creates pattern html element from an object
    Object.keys(patterns).forEach(pattName => {
        let pattStructure = patterns[pattName];

        createPattern_preview(pattName, pattStructure);
    });
};

// create pattern preview element
const createPattern_preview = (patternName, patternStructure) => {
    // create elements
    const gridWrapper = document.createElement("div");
    const grid = document.createElement("div");
    const title = document.createElement("h2");
    const headerWrapper = document.createElement("div");
    const flexDiv = document.createElement("div");
    const editItemsWrapper = document.createElement("div");
    // items
    const pen = document.createElement("i");
    const bin = document.createElement("i");
    let checkBox = document.createElement("i");

    // add attributes and style
    gridWrapper.classList.add("createCostumField_Field_wrapper");
    gridWrapper.classList.add("costumPatternsOverview_gridWrapper");
    grid.classList.add("small_createCostumField_Field");
    title.classList.add("preview_pattern_title");
    headerWrapper.classList.add("headerWrapper");
    editItemsWrapper.classList.add("editItemsWrapper");
    grid.setAttribute("costum_pattern_name", patternName.replace(" ", "_"));

    pen.className = "fa-solid fa-pen item";
    bin.className = "fa-solid fa-trash item";

    // set attributes and style
    costum_patterns_overview.setAttribute("costum_pattern_name", patternName);

    flexDiv.style.width = "10%";
    checkBox.style.fontSize = "larger";
    grid.style.gridTemplateColumns = `repeat(5, 1fr)`;
    title.textContent = patternName;

    // check if pattern is in current level being edited
    let patternIsInCurrentCreativeLevel = checkCostumPatternInCurrentLevel(patternName, patternStructure);

    if (patternIsInCurrentCreativeLevel) {
        checkBox.className = "fa-regular fa-square-check item";
        checkBox.setAttribute("activated", "true");

    } else {
        checkBox.className = "fa-regular fa-square item";
        checkBox.setAttribute("activated", "false");
    };

    checkBox.setAttribute("corresponding_pattern", `${patternName}_box`)

    // create basic 5x5 grid 
    new Array(25).fill("").forEach(i => {
        let cell = document.createElement("div");
        cell.classList.add("preview_cell");
        cell.classList.add("cell");

        grid.appendChild(cell);
    });

    // draw structure on grid
    patternStructure.forEach(i => {
        let index = parseInt(i);

        // console.log(index, i, grid, grid.children[index]);
        createField_updateCell(index, grid, "preview_cell");
    });

    // event listener
    pen.addEventListener("click", function name() {
        editCostumWrapper(patternStructure.map(i => i = Number(i)), patternName);
    });

    bin.addEventListener("click", function name() {
        deleteCostumWrapper(patternName);
    });

    checkBox.addEventListener("click", function name() {
        toggleCustomPatternInNewLevel(checkBox, patternStructure.map(i => i = Number(i)), patternName);
    });

    // append to document
    costum_patterns_overview.appendChild(gridWrapper);
    headerWrapper.appendChild(flexDiv);
    headerWrapper.appendChild(title);
    headerWrapper.appendChild(editItemsWrapper)
    gridWrapper.appendChild(headerWrapper);
    gridWrapper.appendChild(grid);

    editItemsWrapper.appendChild(pen);
    editItemsWrapper.appendChild(bin);
    editItemsWrapper.appendChild(checkBox);

    setTimeout(() => {
        // give static height/ scale whatever
        StaticCellScale(grid);
    }, 100);
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
        AlertText.textContent = "You can't delete a pattern which is used in this current level";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    };
};

// edit costum wrapper
const editCostumWrapper = (structure, name) => {
    CreateCostumPattern_btn.click();
    createCostumPattern_title.textContent = name;

    [...createCostumPattern_Field.children].forEach((val, i) => {
        if (!structure.includes(i)) {
            return;

        } else {

            createField_updateCell(i, createCostumPattern_Field);
        };
    });
};

// toggle, if costum pattern should be used as pattern in new create level from user
const toggleCustomPatternInNewLevel = (box, structure, name) => {
    console.log(structure, name);

    // box logic
    if (box.getAttribute("activated") == "true") {
        box.setAttribute("activated", "false");
        box.className = "fa-regular fa-square item";

        // pattern in level logic
        NewCreativeLevel.toggle_costum_pattern("remove", name, structure);

    } else {
        box.setAttribute("activated", "true");
        box.className = "fa-regular fa-square-check item";

        // pattern in level logic
        NewCreativeLevel.toggle_costum_pattern("add", name, structure);
    };
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

// check if the costum pattern the user wants to create is already a normal win pattern in the game
const checkCostumPatternAlreadyInGame = () => {
    const cells = [...createCostumPattern_Field.children];
    // output data
    let indexes = [];

    // get pattern indexes
    cells.forEach(cell => {
        if (cell.classList.contains("draw")) {
            indexes.push(cell.getAttribute("cell-index"));
        };
    });

    let InGamePatterns = [...allowedPatternsFromUser];

    // if pattern matches a pattern already existing in game, return true   

};

// check if the costum pattern that being rendered in the costum pattern preview is in the current level
const checkCostumPatternInCurrentLevel = (patternName, patternStructure) => {
    if (NewCreativeLevel.is_pattern_in_level(patternName)) {
        return true;

    } else return false;
};