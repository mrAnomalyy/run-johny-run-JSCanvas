class Fly {
    constructor(params) {
        if (params)
            this.id = params.id;

        this.object = null;
        this.layer = 4;
        this.tag = "fly";
        this.hp = 15;
        this.cooldown = false;

        this.texture = {
            texture: 0,
            textures: [{
                src: "tex/fly.png",
                FRAMED_SPRITE_WIDTH: 82.5,
                FRAMED_SPRITE_HEIGHT: 70,
                FRAMED_SPRITE_STEPS: 2,
                FRAMED_SPRITE_INTERVAL_TIME: 60,
            }],
        }

        this.w = 2;
        this.h = 3;

        if (params) {
            this.pathStart = params.x || 70;
            this.pathEnd = getRandom(6, 30) || 0;
        } else {

            this.pathStart = 0;
            this.pathEnd = 0;

        }

        this.direction = 'up';
        this.die = false;

        this.spawnOptions = {
            min_x: 100,
            max_x: 150,
            min_y: 80,
            max_y: 88,
        }

    }

    update() {

        this.object.x -= 0.2;

        if (this.direction == 'up')
            this.object.y -= 0.05;

        if (this.direction == 'down')
            this.object.y += 0.05;

        if (this.object.y <= this.pathEnd) {
            this.direction = 'down';
        } else if (this.object.y >= this.pathStart) {
            this.direction = 'up';
        }

        if (this.object.x < -5 || this.hp < 1) {
            
            if (this.hp < 1)
                player.score += 10;
            
            this.die = true;
        }

    }

}
