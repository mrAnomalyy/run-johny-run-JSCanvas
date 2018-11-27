class Building {
    constructor(x, mt, w) {
        this.x = x;
        this.mt = mt;
        this.w = w;
    }
}

class Background {
    constructor() {
        this.el = document.getElementById('game-background');
        this.ctx = this.el.getContext('2d');
        this.speed = 0;
        this.setSmooth(false);
        this.brush = -5;
        this.buildings = [];

        window.onresize = function () {
            this.w = this.el.width = window.innerWidth;
            this.h = this.el.height = window.innerHeight;
        }.bind(this);

        window.onresize();

        this.start();
    }

    start() {
        this.engine();
    }

    engine() {


        if (!pause || !gameStarted) {
            this.ctx.clearRect(0, 0, this.w, this.h);

            this.update();
            this.draw();
        }

        requestAnimationFrame(this.engine.bind(this));

    }

    update() {

        this.brush = (Math.ceil((this.brush) * 100) / 100) - (Math.ceil((this.speed) * 100) / 100);

        if (this.brush < 105)
            this.spawn();


    }

    spawn() {

        let width = getRandom(10, 40);
        this.buildings.push(new Building(this.brush, getRandom(0, 60), width));
        this.brush += width + getRandom(0, 10);

    }

    draw() {

        this.buildings.forEach(function (i, n, a) {
            this.ctx.fillStyle = "#6fa5e3";
            this.ctx.fillRect(this.p2x(i.x), this.p2y(i.mt), this.p2x(i.w), this.p2y(100));
            i.x = (Math.ceil((i.x) * 100) / 100) - (Math.ceil((this.speed) * 100) / 100);

            if (i.x + i.w <= -50)
                this.buildings.splice(n, 1);


        }.bind(this))

    }


    p2x(x) {

        return Math.ceil((this.w / 100 * x) * 100 / 100);

    }

    p2y(y) {

        return this.h / 100 * y;

    }

    setSmooth(status) {
        this.ctx.mozImageSmoothingEnabled = status;
        this.ctx.webkitImageSmoothingEnabled = status;
        this.ctx.msImageSmoothingEnabled = status;
        this.ctx.imageSmoothingEnabled = status;
    }

}
