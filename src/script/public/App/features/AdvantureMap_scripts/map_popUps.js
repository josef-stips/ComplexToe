class map_popUp_handler {
    constructor() {

    };

    init() {
        this.question_pop_ups();
    };

    open(pop_up) {
        mapLevelOverview.style.display = "none";
        DisplayPopUp_PopAnimation(pop_up, "flex", true);
    };

    close(pop_up) {
        mapLevelOverview.style.display = "flex";
        pop_up.style.display = "none";
    };

    question_pop_ups() {
        level_overview_question_btns.forEach((btn, i) => {
            btn.addEventListener("click", () => {
                let forPopUp = btn.getAttribute("for");

                this.pop_up_case(forPopUp);
            });
        });

        close_stars_pop_up_btn.addEventListener("click", () => {
            this.close(map_stars_pop_up);
        });
    };

    pop_up_case(forPopUp) {
        switch (forPopUp) {
            case "stars":

                this.stars_pop_up();
                break;

            case "patterns":
                break;
        };
    };

    stars_pop_up() {
        this.open(map_stars_pop_up);

        let stars = [...stars_overview_stars];

        for (const [i, val] of stars.entries()) {
            let starEl = stars_overview_stars[i].parentNode.children[0];

            stars_overview_stars[i].textContent = `${starsHandler.starsData[current_selected_level][i + 1]["requirementText"]}`;
            starEl.className = `fa-${starsHandler.stars[current_selected_level][i + 1].type} fa-star`;
        };

        stars_pop_up_title.textContent = `How to get stars in the level "${mapLevels[current_selected_level][2]}"`;
    };
};

let advantureMap_popUp_handler = new map_popUp_handler();
advantureMap_popUp_handler.init();