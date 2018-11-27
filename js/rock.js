class Rock {
    constructor(addObject, x, y, tx, ty, parent) {

        this.forceX = 15;
        this.forceY = Math.abs(ty - y) * 1.1;
        
        this.o = addObject(new C2DE_GObj(x, y, 3, 3, 5, {
            texture: 0,
            textures: [{
                src: 'tex/rock.png'
            }]
        }, parent + "_rock"));

    }

    update() {
        
        if (pause)
            return;
        //        console.log('Rock pos: X: ' + this.o.x + ', Y: ' + this.o.y + ', ForceX: ' + this.forceX + ', ForceY: ' + this.forceY);

        this.o.x -= road.speed;
        this.o.y += 0.6;

        this.o.y -= (this.o.y <= 0) ? 0 : this.forceY / 7;
        this.o.x += this.forceX / 15;

        this.forceX *= (this.forceX <= 1) ? 0 : 0.98;
        this.forceY *= (this.forceY <= 1) ? 0 : 0.91;

        if (this.o.y >= 94) {
            this.o.y = 94;
            this.forceX = 0;
        }

        if (this.o.x < -5)
            this.die = true;

    }

}
