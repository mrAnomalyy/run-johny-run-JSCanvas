class Ruby {
  constructor(params) {
    if (params)
      this.id = params.id;

    this.object = null;
    this.tag = "ruby";
    this.texture = {
      texture: 0,
      textures: [{
        src: "tex/ruby.png",
        FRAMED_SPRITE_WIDTH: 100,
        FRAMED_SPRITE_HEIGHT: 100,
        FRAMED_SPRITE_STEPS: 0,
      }],
    }

    this.w = 3;
    this.h = 3;

    this.die = false;

    this.spawnOptions = {
      min_x: 100,
      max_x: 150,
      min_y: 87,
      max_y: 90,
    }

  }

  update() {

    if (this.object.x < -15)
      this.die = true;

  }

}
