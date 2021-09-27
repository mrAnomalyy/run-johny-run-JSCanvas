class Rock {
  constructor(addObject, x, y, tx, ty, parent, params) {

    this.forceX = 15;
    this.forceY = Math.abs(ty - y) * 1.1;
    let layer = 5;

    switch (parent) {
      case "bat":
        this.forceX = (tx - x) * 1.005;

        layer = 0;

        if (this.forceX > 5)
          this.forceX = 5;

        this.forceY = 2;
        break;
    }

    if (this.forceY > 45)
      this.forceY = 45;

    this.w = 3;
    this.h = 3;

    if (params !== undefined) {

      this.w = (params.w !== undefined) ? params.w : 3;
      this.h = (params.h !== undefined) ? params.h : 3;

    }

    this.o = addObject(new C2DE_GObj(x, y, this.w, this.h, layer, {
      texture: 0,
      textures: [{
        src: 'tex/rock.png'
      }]
    }, parent + "_rock"));

  }

  update() {

    if (pause)
      return;
    //                console.log('Rock pos: X: ' + this.o.x + ', Y: ' + this.o.y + ', ForceX: ' + this.forceX + ', ForceY: ' + this.forceY);

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
