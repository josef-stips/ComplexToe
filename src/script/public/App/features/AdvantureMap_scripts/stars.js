// stars the user can additionally collect in the advanture map
class stars_handler {
    constructor() {
        this.stars = {
            1: {
                1: null,
                2: null,
                3: null,
            },
            2: {
                1: null,
                2: null,
                3: null,
            },
            3: {
                1: null,
                2: null,
                3: null,
            },
            4: {
                1: null,
                2: null,
                3: null,
            },
            5: {
                1: null,
                2: null,
                3: null,
            },
            6: {
                1: null,
                2: null,
                3: null,
            },
            7: {
                1: null,
                2: null,
                3: null,
            },
            8: {
                1: null,
                2: null,
                3: null,
            },
            9: {
                1: null,
                2: null,
                3: null,
            },
            10: {
                1: null,
                2: null,
                3: null,
            }
        };

        this.starsData = {
            1: {
                1: {
                    requirementText: "Win without using a spell.",
                    requirementCondition: 0,
                    requirementType: 0
                },
                2: {
                    requirementText: "Win with 20 moves left.",
                    requirementCondition: 10,
                    requirementType: 1
                },
                3: {
                    requirementText: "Win in maximum 100 seconds.",
                    requirementCondition: 40,
                    requirementType: 2
                }
            },
            2: {
                1: {
                    requirementText: "Win without using a spell.",
                    requirementCondition: 0,
                    requirementType: 0
                },
                2: {
                    requirementText: "Win with 5 moves left.",
                    requirementCondition: 5,
                    requirementType: 1
                },
                3: {
                    requirementText: "Win in maximum 35 seconds.",
                    requirementCondition: 35,
                    requirementType: 2
                }
            },
            3: {
                1: {
                    requirementText: "Win without using a spell.",
                    requirementCondition: 0,
                    requirementType: 0
                },
                2: {
                    requirementText: "Win with 8 moves left.",
                    requirementCondition: 8,
                    requirementType: 1
                },
                3: {
                    requirementText: "Win in maximum 30 seconds.",
                    requirementCondition: 30,
                    requirementType: 2
                }
            },
            4: {
                1: {
                    requirementText: "Win without using a spell.",
                    requirementCondition: 0,
                    requirementType: 0
                },
                2: {
                    requirementText: "Win with 12 moves left.",
                    requirementCondition: 12,
                    requirementType: 1
                },
                3: {
                    requirementText: "Win in maximum 25 seconds.",
                    requirementCondition: 25,
                    requirementType: 2
                }
            },
            5: {
                1: {
                    requirementText: "Win without using a spell.",
                    requirementCondition: 0,
                    requirementType: 0
                },
                2: {
                    requirementText: "Win with 7 moves left.",
                    requirementCondition: 7,
                    requirementType: 1
                },
                3: {
                    requirementText: "Win in maximum 20 seconds.",
                    requirementCondition: 20,
                    requirementType: 2
                }
            },
            6: {
                1: {
                    requirementText: "Win without using a spell.",
                    requirementCondition: 0,
                    requirementType: 0
                },
                2: {
                    requirementText: "Win with 9 moves left.",
                    requirementCondition: 9,
                    requirementType: 1
                },
                3: {
                    requirementText: "Win in maximum 50 seconds.",
                    requirementCondition: 50,
                    requirementType: 2
                }
            },
            7: {
                1: {
                    requirementText: "Win without using a spell.",
                    requirementCondition: 0,
                    requirementType: 0
                },
                2: {
                    requirementText: "Win with 6 moves left.",
                    requirementCondition: 6,
                    requirementType: 1
                },
                3: {
                    requirementText: "Win in maximum 45 seconds.",
                    requirementCondition: 45,
                    requirementType: 2
                }
            },
            8: {
                1: {
                    requirementText: "Win without using a spell.",
                    requirementCondition: 0,
                    requirementType: 0
                },
                2: {
                    requirementText: "Win with 11 moves left.",
                    requirementCondition: 11,
                    requirementType: 1
                },
                3: {
                    requirementText: "Win in maximum 60 seconds.",
                    requirementCondition: 60,
                    requirementType: 2
                }
            },
            9: {
                1: {
                    requirementText: "Win without using a spell.",
                    requirementCondition: 0,
                    requirementType: 0
                },
                2: {
                    requirementText: "Win with 4 moves left.",
                    requirementCondition: 4,
                    requirementType: 1
                },
                3: {
                    requirementText: "Win in maximum 55 seconds.",
                    requirementCondition: 55,
                    requirementType: 2
                }
            },
            10: {
                1: {
                    requirementText: "Win without using a spell.",
                    requirementCondition: 0,
                    requirementType: 0
                },
                2: {
                    requirementText: "Win with 3 moves left.",
                    requirementCondition: 3,
                    requirementType: 1
                },
                3: {
                    requirementText: "Win in maximum 70 seconds.",
                    requirementCondition: 70,
                    requirementType: 2
                }
            }
        };


        this.starsUser = {
            1: {
                1: false,
                2: false,
                3: false,
            },
            2: {
                1: false,
                2: false,
                3: false,
            },
            3: {
                1: false,
                2: false,
                3: false,
            },
            4: {
                1: false,
                2: false,
                3: false,
            },
            5: {
                1: false,
                2: false,
                3: false,
            },
            6: {
                1: false,
                2: false,
                3: false,
            },
            7: {
                1: false,
                2: false,
                3: false,
            },
            8: {
                1: false,
                2: false,
                3: false,
            },
            9: {
                1: false,
                2: false,
                3: false,
            },
            10: {
                1: false,
                2: false,
                3: false,
            }
        };

        this.starsUserData = {
            1: {
                1: null,
                2: null,
                3: null,
            },
            2: {
                1: null,
                2: null,
                3: null,
            },
            3: {
                1: null,
                2: null,
                3: null,
            },
            4: {
                1: null,
                2: null,
                3: null,
            },
            5: {
                1: null,
                2: null,
                3: null,
            },
            6: {
                1: null,
                2: null,
                3: null,
            },
            7: {
                1: null,
                2: null,
                3: null,
            },
            8: {
                1: null,
                2: null,
                3: null,
            },
            9: {
                1: null,
                2: null,
                3: null,
            },
            10: {
                1: null,
                2: null,
                3: null,
            }
        };

        this.requirementTypes = {
            0: "spells",
            1: "moves",
            2: "time"
        };

        // live data
        this.liveData = {
            0: Infinity,
            1: Infinity,
            2: Infinity
        };
    };

    init() {
        this.save_and_load();
    };

    save_and_load() {
        let starsUser = localStorage.getItem("starsUser");
        let starsUserData = localStorage.getItem("starsUserData");
        // let starsUserBestData = localStorage.getItem("starsUserBestData");

        if (!starsUser) {
            localStorage.setItem("starsUser", JSON.stringify(this.starsUser));
            localStorage.setItem("starsUserData", JSON.stringify(this.starsUserData));
            // localStorage.setItem("starsUserBestData", JSON.stringify(this.liveData));

        } else {
            this.starsUser = JSON.parse(starsUser);
            this.starsUserData = JSON.parse(starsUserData);
        };
    };

    init_stars_document(location) {
        this.delete();

        switch (location) {
            case 0: // map

                this.generate_on_map();
                break;

            case 1:
                break;
        };
    };

    delete() {
        document.querySelectorAll(".map_stars_container").forEach(el => el.remove());
        this.stars = {
            1: {
                1: null,
                2: null,
                3: null,
            },
            2: {
                1: null,
                2: null,
                3: null,
            },
            3: {
                1: null,
                2: null,
                3: null,
            },
            4: {
                1: null,
                2: null,
                3: null,
            },
            5: {
                1: null,
                2: null,
                3: null,
            },
            6: {
                1: null,
                2: null,
                3: null,
            },
            7: {
                1: null,
                2: null,
                3: null,
            },
            8: {
                1: null,
                2: null,
                3: null,
            },
            9: {
                1: null,
                2: null,
                3: null,
            },
            10: {
                1: null,
                2: null,
                3: null,
            }
        };
    };

    generate_on_map() {
        let unlocked_mapLevels = JSON.parse(localStorage.getItem('unlocked_mapLevels'));

        for (let i = 0; i < 10; i++) {

            let level_unlocked = unlocked_mapLevels[i + 1][0];
            let fill = "regular";

            let star_container = document.createElement("div");
            star_container.classList.add("map_stars_container");
            star_container.setAttribute("stars_container_index", i);

            if (level_unlocked) {

                for (let j = 0; j < 3; j++) {

                    if (this.starsUser[i + 1][j + 1]) {
                        fill = "solid";

                    } else {
                        fill = "regular";
                    };

                    let starEl = document.createElement("i");
                    starEl.className = `fa-${fill} fa-star`;
                    star_container.appendChild(starEl);

                    let NewStar = new star([i + 1, j + 1], fill);
                    this.stars[i + 1][j + 1] = NewStar;
                };
            };
            MapLevelBtns[i].appendChild(star_container);
        };
    };

    async check() {
        let starsUser = JSON.parse(localStorage.getItem("starsUser"));
        let filled_stars = [];

        // fill stars that were already filled
        for (const [i, val] of Object.entries(starsUser[current_selected_level])) {
            if (val) {
                endgame_level_stars[i - 1].className = "endgame_level_stars fa-solid fa-star";
            };
        };

        // check for new stars to be filled
        for (let [i, val] of Object.entries(this.liveData)) {
            i = Number(i);
            let condition = this.starsData[current_selected_level][i + 1]["requirementCondition"];
            let userValue = this.liveData[i];

            if (this.starsUser[current_selected_level][i + 1] == true) continue;

            switch (i + 1) {
                case 2:
                    if (MaxAmountOfMovesCount >= condition) {
                        console.log(`Good! ${max_amount_of_moves - userValue} ${condition}`);

                        starsUser[current_selected_level][i + 1] = true;
                        filled_stars.push(endgame_level_stars[i]);
                    };
                    break;

                default:
                    if (userValue <= condition) {
                        console.log(`Good! ${userValue} ${condition}`)

                        starsUser[current_selected_level][i + 1] = true;
                        filled_stars.push(endgame_level_stars[i]);
                    };
                    break;
            };
        };

        // fill
        for (const i of filled_stars) {
            await sleep(750);
            this.fill_star_animation(i);
        };

        // save in storage
        localStorage.setItem("starsUser", JSON.stringify(starsUser));
        this.starsUser = starsUser;
    };

    fill_star_animation(star) {
        star.className = "endgame_level_stars fa-solid fa-star";
        play_collectSound();
    };
};

class star {
    constructor(idx, type) {
        this.idx = idx;
        this.type = type;
    };
};

const starsHandler = new stars_handler();
starsHandler.init();