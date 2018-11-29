class Road {

    constructor() {
        this.objects = [
        game.addObject(new C2DE_GObj(0, 65, 105, 35, 0, {
                texture: 0,
                textures: [{
                    src: "tex/road.png"
                }]
            }, "road")),
        game.addObject(new C2DE_GObj(99, 65, 105, 35, 0, {
                texture: 0,
                textures: [{
                    src: "tex/road.png"
                }]
            }, "road"))
        ];

        this.active = 0;
        this.speed = 0;
        this.passed = 0;
        this.stop = false;
    }

    update() {

        if (this.stop)
            return false;

        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].x -= this.speed;

            if (this.objects[i].x < -99) {
                this.objects[i].x = 95;
                this.active = (i == 0) ? 1 : 0;
                this.passed++;
            }

        }

        if (this.passed > 9)
            this.stop = true;

        return true;
    }

    reset() {
        this.passed = 0;
        this.objects[0].x = 0;
        this.objects[0].y = 65;
        this.objects[1].x = 99;
        this.objects[1].y = 65;
    }

}
