class Bat {
    constructor(params) {
        if (params)
            this.id = params.id;

        this.object = null;
        this.tag = "bat";
        this.hp = 60;
        
        this.texture = {
            texture: 0,
            textures: [{
                src: "tex/bat_flip.png",
                FRAMED_SPRITE_WIDTH: 102,
                FRAMED_SPRITE_HEIGHT: 80,
                FRAMED_SPRITE_STEPS: 8,
                FRAMED_SPRITE_INTERVAL_TIME: 60,
            }],
        }

        this.w = 10;
        this.h = 10;

        this.die = false;

        this.spawnOptions = {
            min_x: 100,
            max_x: 150,
            min_y: 35,
            max_y: 55,
        }

    }

    update() {

        this.object.x -= 0.1;

        if (this.object.x < -15 || this.hp < 1)
            this.die = true;

    }

}
