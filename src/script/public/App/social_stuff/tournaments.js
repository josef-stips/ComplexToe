// everything about tournaments
class TournamentHandler {
    constructor(tournaments) {
        this.list = tournaments_list;
        this.tournaments = tournaments
        this.tournaments_instances = [];
        this.current_tournament = null;

        this.create_tournament_handler = new CreateTournamentHandler();
    };

    init() {
        this.events();
    };

    events() {
        ct_gems_pot_qust_btn.addEventListener('click', e => {
            let box = new QABOX(1, [`Each participant has to contribute a certain number of gems to the pot. The winner of the tournament takes the entire pot.`], { 'The winner': 'green' }, { 'T': [0, 0, 0, 0] }, false);
            box.open();
        });

        tournament_scene_back_btn.addEventListener('click', e => {
            DarkLayerAnimation(online_stuff_scene, tournaments_scene).then(sceneMode.default);
        });

        tournament_scene_plus_btn.addEventListener('click', e => {
            if (this.tournaments_instances.length >= 4) {
                AlertText.textContent = "You can create a maximum of 4 tournaments at a time.";
                DisplayPopUp_PopAnimation(alertPopUp, 'flex', true);
                return;
            };

            this.open_create_tournament_pop_up();
        });

        create_tournament_close_btn.addEventListener('click', e => {
            this.create_tournament_handler.close();
        });

        create_tournament_quest_btn.addEventListener('click', e => {
            let box = new QABOX(1, [`Here, you can organize a clan tournament where participants battle until only one player remains, who will be crowned the winner and receive a reward.`], { 'clan tournament': 'green' }, { 'c': [0, 0, 0, 0] }, false);
            box.open();
        });

        ct_participant_amount_qust_btn.addEventListener('click', e => {
            let box = new QABOX();
            box.open();
        });
    };

    open_create_tournament_pop_up() {
        this.create_tournament_handler = new CreateTournamentHandler();
        this.create_tournament_handler.open();
    };

    generate_tournaments(ts) {
        this.list.textContent = null;
        this.current_tournament = null;
        this.tournaments_instances = [];
        curr_t_display.textContent = 'None';

        ts.forEach(t => {
            let t_instance = new tournament(t);
            this.tournaments_instances.push(t_instance);
            t_instance.generate(this.list, t);
        });
    };

    fetch_tournaments() {
        return new Promise(res => socket.emit('load_tournaments', JSON.parse(localStorage.getItem('clan_member_data')), cb => (!cb) ? res(false) : res(cb)));
    };

    async tournament_btn_click_ev() {
        let clan_data = JSON.parse(localStorage.getItem('clan_member_data'));

        if (!clan_data.clan_id) {
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
            AlertText.textContent = "You must be in a clan to participate in or create a clan tournament.";
            return;
        };

        if (clan_data.role == 'leader') {
            this.fetch_tournaments().then((cb) => {
                if (!cb) {
                    this.open_create_tournament_pop_up();
                    return;
                };

                this.open_tournaments_scene();
                this.tournaments = cb;
                this.generate_tournaments(this.tournaments);
            });
        };

        if (clan_data.role != 'leader') {
            this.fetch_tournaments().then(cb => {
                if (cb) {
                    tournament_handler.open_tournaments_scene();
                    this.tournaments = cb;
                    this.generate_tournaments(this.tournaments);
                    return;
                };

                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                AlertText.textContent = "In a tournament, you compete against your clanmates. Ask your clan leader to create a tournament.";
            });
        };
    };

    open_tournaments_scene() {
        close_all_scenes();
        DarkLayerAnimation(tournaments_scene, online_stuff_scene).then(sceneMode.full);

        if (JSON.parse(localStorage.getItem("clan_member_data")).role != 'leader') {
            tournament_scene_plus_btn.style.display = 'none';
            return;
        };

        tournament_scene_plus_btn.style.display = 'flex';
    };
};

class tournament {
    constructor(data) {
        this.data = data;
    };

    generate(list, tournament_data) {
        let item = document.createElement('li');
        let firstWrapper = document.createElement('div');
        let secondWrapper = document.createElement('div');
        let title = document.createElement('h1');
        let dateInfoWrapper = document.createElement('p');

        firstWrapper.classList.add('firstWrapper');
        secondWrapper.classList.add('secondWrapper');

        title.textContent = tournament_data.name;
        dateInfoWrapper.textContent = `${formatDate(tournament_data.start_date)} - ${formatDate(tournament_data.finish_date)}\xa0
            Participants: ${tournament_data.participant_amount}
            `;

        let start_date = new Date(tournament_data.start_date);
        let end_date = new Date(tournament_data.finish_date);
        let currentDate = new Date();

        let cutoffDate = new Date(currentDate);
        cutoffDate.setDate(currentDate.getDate() - 5);

        if (end_date < cutoffDate) {
            return;
        };

        let offsetDate = new Date(start_date);
        offsetDate.setDate(start_date.getDate());

        if (offsetDate <= currentDate && end_date > currentDate) {
            item.classList.add('active_t');
            curr_t_display.textContent = tournament_data.name;
            this.current_tournament = tournament_data;

            item.classList.add('cursor_btn');

        } else if (end_date < currentDate) {
            item.classList.add('finished_t');
        };

        secondWrapper.appendChild(dateInfoWrapper);
        firstWrapper.appendChild(title);
        item.appendChild(firstWrapper);
        item.appendChild(secondWrapper);
        list.appendChild(item);
    };

    list_item_event(item) {
        item.addEventListener('click', () => {

        });
    };
};

class CreateTournamentHandler {
    constructor() {
        this.patterns_wrapper = ct_allowed_patterns_wrapper;

        this.allowed_patterns = ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
            "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2", "branch3", "branch4", "special1", "special2"
        ];

        this.init();
    };

    open() {
        DisplayPopUp_PopAnimation(create_tournament_pop_up, 'flex', true);
        this.init_patterns();
        this.init_inputs();
    };

    close() {
        create_tournament_pop_up.style.display = 'none';
        DarkLayer.style.display = 'none';
    };

    init_patterns() {
        this.patterns_wrapper.textContent = null;

        Object.keys(GamePatternsList).forEach(name => {
            createPattern_preview(name, GamePatternsList[name], this.patterns_wrapper, 'toggle', undefined,
                5, null, null, 5, undefined, false, patternPoints[name], false
            );
        });

        [...this.patterns_wrapper.children].forEach(p => {
            let toggle_box = p.querySelector('.fa-regular.fa-square.item');
            let corresponding_pattern = toggle_box.getAttribute("corresponding_pattern").trim().replace('_box', '');

            toggle_box.className = `fa-regular fa-square-check item`;
            toggle_box.setAttribute('activated', 'true');

            toggle_box.addEventListener('click', e => {
                switch (e.target.getAttribute('activated')) {
                    case 'false':
                        this.allowed_patterns.push(corresponding_pattern);
                        toggle_box.className = `fa-regular fa-square-check item`;
                        e.target.setAttribute('activated', 'true');
                        break;

                    case 'true':
                        this.allowed_patterns = this.allowed_patterns.filter(p => p !== corresponding_pattern)
                        toggle_box.className = `fa-regular fa-square item`;
                        e.target.setAttribute('activated', 'false');
                        break;
                };
            });
        });
    };

    init_inputs() {
        document.querySelector('.ct_pointsToGetInput').value = null;
        document.querySelector('.ct_participantInput').value = null;
        document.querySelector('.fieldSize_input').value = null;
        document.querySelector('.PlayerClock_input').value = null;
        document.querySelector('[placeholder="1-999"]').value = null;
        document.querySelector('.t_name_input').value = null;
        document.querySelector('.ct_duration_input').value = null;
    };

    init() {
        this.setDefaultDate();
        this.addInputValidation();
        this.addSubmitHandler();
    };

    setDefaultDate() {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 10);

        document.querySelector('.starting_date_inner_wrapper [placeholder="DD"]').value = String(currentDate.getDate()).padStart(2, '0');
        document.querySelector('.starting_date_inner_wrapper [placeholder="MM"]').value = String(currentDate.getMonth() + 1).padStart(2, '0');
        document.querySelector('.starting_date_inner_wrapper [placeholder="YYYY"]').value = currentDate.getFullYear();
    };

    addInputValidation() {
        const validateNumericInput = (inputElement, minValue, maxValue) => {
            inputElement.addEventListener('input', (e) => {
                const value = parseInt(e.target.value, 10);
                if (isNaN(value)) {
                    e.target.value = '';
                };
            });
        };

        validateNumericInput(document.querySelector('.ct_pointsToGetInput'), 1, 50);
        validateNumericInput(document.querySelector('.ct_participantInput'), 4, 32);
        validateNumericInput(document.querySelector('.fieldSize_input'), 5, 40);
        validateNumericInput(document.querySelector('.PlayerClock_input'), 5, 70);
        validateNumericInput(document.querySelector('[placeholder="1-999"]'), 1, 999);

        document.querySelector('.fieldSize_input').addEventListener('blur', (e) => {
            const allowedValues = [5, 10, 15, 20, 25, 30, 40];
            const value = parseInt(e.target.value, 10);
            if (!allowedValues.includes(value)) {
                e.target.value = '';
                OpenedPopUp_WhereAlertPopUpNeeded = true;
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                AlertText.textContent = "You have to choose a valid field size: 5, 10, 15, 20, 25, 30, 40";
            };
        });

        document.querySelector('.PlayerClock_input').addEventListener('blur', (e) => {
            const allowedValues = [5, 15, 30, 50, 70];
            const value = parseInt(e.target.value, 10);
            if (!allowedValues.includes(value)) {
                e.target.value = '';
                OpenedPopUp_WhereAlertPopUpNeeded = true;
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                AlertText.textContent = "You have to choose a valid value: 5, 15, 30, 50, 70";
            };
        });

        document.querySelector('.ct_participantInput').addEventListener('blur', (e) => {
            const allowedValues = [4, 8, 16, 32];
            const value = parseInt(e.target.value, 10);
            if (!allowedValues.includes(value)) {
                e.target.value = '';
                OpenedPopUp_WhereAlertPopUpNeeded = true;
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                AlertText.textContent = "You have to choose a valid value: 4, 8, 16, 32";
            };
        });

        document.querySelector('.ct_pointsToGetInput').addEventListener('blur', (e) => {
            const value = parseInt(e.target.value, 10);

            if (value > 50 || value < 1) {
                e.target.value = '';
                OpenedPopUp_WhereAlertPopUpNeeded = true;
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                AlertText.textContent = "You have to choose a valid value between 1-50";
            };
        });

        document.querySelector('.ct_potGems_input').addEventListener('blur', (e) => {
            const value = parseInt(e.target.value, 10);

            if (value > 999 || value < 1) {
                e.target.value = '';
                OpenedPopUp_WhereAlertPopUpNeeded = true;
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                AlertText.textContent = "You have to choose a valid value between 1-999";
            };
        });

        document.querySelector('.t_name_input').addEventListener('input', (e) => {
            const notAllowedValues = /[^a-zA-Z0-9 ]|(?<=\s)\s+/g;

            if (e.target.value.length > 24) {
                e.target.value = e.target.value.slice(0, 24);
            };

            e.target.value = e.target.value.replace(notAllowedValues, "");
        });

        document.querySelector('.ct_duration_input').addEventListener('input', (e) => {
            const notAllowedValues = /[^0-9 ]/g;

            if (e.target.value.length > 2) {
                e.target.value = e.target.value.slice(0, 2);
            };

            e.target.value = e.target.value.replace(notAllowedValues, "");
        });
    };

    addSubmitHandler() {
        create_t_form.removeEventListener('submit', create_t_form.ev);
        create_t_form.addEventListener('submit', create_t_form.ev = async(e) => {
            e.preventDefault();

            const requiredInputs = [
                '.t_name_input',
                '.ct_pointsToGetInput',
                '.ct_participantInput',
                '.fieldSize_input',
                '.PlayerClock_input',
                '[placeholder="1-999"]',
            ];

            for (let selector of requiredInputs) {
                const input = document.querySelector(selector);
                if (!input.value) {
                    OpenedPopUp_WhereAlertPopUpNeeded = true;
                    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                    AlertText.textContent = "All fields must be filled out correctly.";
                    return;
                };
            };

            const day = parseInt(document.querySelector('.starting_date_inner_wrapper [placeholder="DD"]').value, 10);
            const month = parseInt(document.querySelector('.starting_date_inner_wrapper [placeholder="MM"]').value, 10) - 1;
            const year = parseInt(document.querySelector('.starting_date_inner_wrapper [placeholder="YYYY"]').value, 10);
            const selectedDate = new Date(year, month, day);

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            if (selectedDate < currentDate) {
                OpenedPopUp_WhereAlertPopUpNeeded = true;
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                AlertText.textContent = "The selected start date must be in the future.";
                return;
            };

            currentDate.setDate(currentDate.getDate() + 5);

            if (selectedDate < currentDate) {
                OpenedPopUp_WhereAlertPopUpNeeded = true;
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                AlertText.textContent = "The selected start date must be at least 5 days in the future.";
                return;
            };

            if (this.allowed_patterns.length <= 0) {
                OpenedPopUp_WhereAlertPopUpNeeded = true;
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                AlertText.textContent = "Select at least one pattern.";
                return;
            };

            const tournamentData = {
                name: document.querySelector('.t_name_input').value,
                startDate: null,
                endDate: null,
                duration: Number(document.querySelector('.ct_duration_input').value),
                participants: Number(document.querySelector('.ct_participantInput').value),
                fieldSize: Number(document.querySelector('.fieldSize_input').value),
                playerClock: Number(document.querySelector('.PlayerClock_input').value),
                pointsToGet: Number(document.querySelector('.ct_pointsToGetInput').value),
                gemsInPot: Number(document.querySelector('[placeholder="1-999"]').value),
                allowedPatterns: this.allowed_patterns
            };

            const durationInDays = tournamentData.duration;
            const endDate = new Date(selectedDate);
            endDate.setDate(endDate.getDate() + durationInDays);
            tournamentData.startDate = selectedDate;
            tournamentData.endDate = endDate;

            let hasConflict = false;
            let tournaments = tournament_handler.tournaments || [];
            tournaments.forEach(t_data => {
                let t_start = new Date(t_data.start_date);
                let t_end = new Date(t_data.finish_date);
                let selected_start = new Date(selectedDate);
                let selected_end = new Date(endDate);

                if (selected_start < t_end && selected_end > t_start) {
                    OpenedPopUp_WhereAlertPopUpNeeded = true;
                    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
                    AlertText.textContent = "The selected tournament duration interferes with the duration of other tournaments.";
                    hasConflict = true;
                };
            });

            if (hasConflict) return;

            await this.submit_to_server(tournamentData);
        });
    };

    async submit_to_server(data) {
        try {
            await socket.emit('create_clan_tournament', data, JSON.parse(localStorage.getItem('clan_member_data')).clan_id, Number(localStorage.getItem('PlayerID')), cb => {
                if (!cb) throw new Error();

                create_tournament_pop_up.style.display = 'none';
                tournament_handler.open_tournaments_scene();

                setTimeout(() => {
                    tournament_handler.fetch_tournaments().then(cb => {
                        if (!cb) return;
                        tournament_handler.generate_tournaments(cb);
                    });
                }, 500);
            });

        } catch (error) {
            console.info(error);
            AlertText.textContent = 'Something went wrong :( Try again later.'
            OpenedPopUp_WhereAlertPopUpNeeded = true;
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        };
    };
};

const dayInput = document.querySelector('.starting_date_inner_wrapper [placeholder="DD"]');
const monthInput = document.querySelector('.starting_date_inner_wrapper [placeholder="MM"]');
const yearInput = document.querySelector('.starting_date_inner_wrapper [placeholder="YYYY"]');

const dayIncrease = document.querySelector('.starting_date_inner_wrapper div:nth-child(1) .fa-caret-right');
const dayDecrease = document.querySelector('.starting_date_inner_wrapper div:nth-child(1) .fa-caret-left');
const monthIncrease = document.querySelector('.starting_date_inner_wrapper div:nth-child(2) .fa-caret-right');
const monthDecrease = document.querySelector('.starting_date_inner_wrapper div:nth-child(2) .fa-caret-left');
const yearIncrease = document.querySelector('.starting_date_inner_wrapper div:nth-child(3) .fa-caret-right');
const yearDecrease = document.querySelector('.starting_date_inner_wrapper div:nth-child(3) .fa-caret-left');

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
};

function updateDateInput(input, value, min, max) {
    let newValue = parseInt(input.value, 10) + value;
    if (newValue > max) {
        newValue = min;
    } else if (newValue < min) {
        newValue = max;
    };
    input.value = String(newValue).padStart(2, '0');
};

// Event Listener für Tag
dayIncrease.addEventListener('click', () => {
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);
    const daysInMonth = getDaysInMonth(month, year);
    let currentDay = parseInt(dayInput.value, 10);
    currentDay = (currentDay % daysInMonth) + 1;
    dayInput.value = String(currentDay).padStart(2, '0');
});

dayDecrease.addEventListener('click', () => {
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);
    const daysInMonth = getDaysInMonth(month, year);
    let currentDay = parseInt(dayInput.value, 10);
    currentDay = (currentDay - 2 + daysInMonth) % daysInMonth + 1;
    dayInput.value = String(currentDay).padStart(2, '0');
});

monthIncrease.addEventListener('click', () => {
    updateDateInput(monthInput, 1, 1, 12);
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);
    const daysInMonth = getDaysInMonth(month, year);
    const currentDay = parseInt(dayInput.value, 10);
    if (currentDay > daysInMonth) {
        dayInput.value = String(daysInMonth).padStart(2, '0');
    };
});

monthDecrease.addEventListener('click', () => {
    updateDateInput(monthInput, -1, 1, 12);
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);
    const daysInMonth = getDaysInMonth(month, year);
    const currentDay = parseInt(dayInput.value, 10);
    if (currentDay > daysInMonth) {
        dayInput.value = String(daysInMonth).padStart(2, '0');
    };
});

yearIncrease.addEventListener('click', () => updateDateInput(yearInput, 1, 1900, 2100));
yearDecrease.addEventListener('click', () => updateDateInput(yearInput, -1, 1900, 2100));

let tournament_handler = new TournamentHandler([]);
tournament_handler.init();