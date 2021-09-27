class Snail {
  constructor(params) {
    if (params)
      this.id = params.id;

    this.object = null;
    this.tag = "snail";
    this.hp = 25;

    this.texture = {
      texture: 0,
      textures: [{
        src: "tex/snail.png",
        FRAMED_SPRITE_WIDTH: 83,
        FRAMED_SPRITE_HEIGHT: 53,
        FRAMED_SPRITE_STEPS: 3,
        FRAMED_SPRITE_INTERVAL_TIME: 60,
      },
      {
        src: "tex/snail_flip.png",
        FRAMED_SPRITE_WIDTH: 83,
        FRAMED_SPRITE_HEIGHT: 53,
        FRAMED_SPRITE_STEPS: 3,
        FRAMED_SPRITE_INTERVAL_TIME: 60,
      }],
    }

    this.w = 5;
    this.h = 5;

    if (params) {
      this.pathStart = params.x || 70;
      this.pathEnd = getRandom(6, 30) || 0;
    } else {

      this.pathStart = 0;
      this.pathEnd = 0;

    }

    this.direction = 'left';
    this.die = false;

    this.spawnOptions = {
      min_x: 100,
      max_x: 150,
      min_y: 85,
      max_y: 88,
    }

  }

  update() {

    if (this.direction == 'left')
      this.object.x -= 0.05;

    if (this.direction == 'right')
      this.object.x += 0.05;

    if (this.object.x <= this.pathEnd) {
      this.direction = 'right';
    } else if (this.object.x >= this.pathStart) {
      this.direction = 'left';
    }

    if (this.object.y < this.oy)
      this.object.y += 0.3;

    this.object.texture.texture = (this.direction == 'left') ? 1 : 0;

    if (this.object.x < this.pathEnd && this.object.x < -5 || this.hp < 1) {

      if (this.hp < 1) {
        player.score += 25;
        console.log('PlayerScore now: ' + player.score);
      }

      this.die = true;
    }

  }

}
