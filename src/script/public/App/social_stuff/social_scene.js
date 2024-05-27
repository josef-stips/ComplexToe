class social_scene_class {
    constructor() {

    };

    init() {
        this.display("flex");
    };

    display(type) {
        DarkLayerAnimation(online_stuff_scene, gameModeCards_Div);
    };

    events() {
        online_stuff_close_btn.addEventListener("click", () => {
            DarkLayerAnimation(gameModeCards_Div, online_stuff_scene);

        });
    };
};

let social_scene = new social_scene_class();
social_scene.events();