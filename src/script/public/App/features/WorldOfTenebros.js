// after user beat advanture map, he unlocks the the world of Tenebros
class world_of_tenebros {
    constructor() {

    };

    // check if user unlocked this secret world
    check = () => {
        if (localStorage.getItem("completed_mapLevel10") == "true") {
            this.display_btn();

        } else {
            secret_world = null;
            return;
        };
    };

    // this function is only executed ones in the entire game
    unlock = () => {
        if (!localStorage.getItem("Unlocked_Tenebros")) {
            localStorage.setItem("Unlocked_Tenebros", "true");
        };

        this.unlock_animation();
    };

    display_btn = () => {
        secret_map_btn.style.display = "block";
        setTimeout(() => {
            secret_map_btn.style.opacity = "1";
        }, 100);
    };

    // user first unlocks world of tenebros: animation
    unlock_animation = () => {
        // animation on map item (door lock with eye). shake effect
        secret_lock.style.animation = "3s ease-in-out 1 normal lockSpy_unlockAnimation";

        // after animation
        secret_lock.addEventListener("animationend", async(e) => {
            // play sound
            await play_openGateSound();
            await play_laughSound();
            // display animation
            this.display_btn();
        });
    };
};
// try to display new world. if it is not possible => delete instance
just_beat_advantureMap = true;
let secret_world = new world_of_tenebros();
secret_world.check();

secret_map_btn.addEventListener("click", () => {
    AlertText.textContent = "Coming soon...";
    alertPopUp.style.display = "flex";
    DarkLayer.style.display = "block"
});