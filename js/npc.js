class NPC {

  constructor(engine, road, prefabs) {

    this.prefabs = [];
    this.spawned = [];
    this.engine = engine;
    this.road = road;

    if (!Array.isArray(prefabs))
      prefabs = [prefabs];

    prefabs.forEach(function (item, n, ar) {

      if (!(item.p.prototype.update)) {
        console.error("Unable to load NPC [" + n.p + "]");
        console.error(item.p);
      } else {
        for (let i = 0; i < item.c; i++)
          this.prefabs.push(item.p);
      };

    }.bind(this));

    this.maxSpawn = 12;

  }

  spawn(id, x, y) {

    if (pause)
      return;

    if (arguments.length > 0) {
      let i = new this.prefabs[id]({
        id: this.spawned.length,
        x: x,
        y: y
      });

      let l = (i.layer) ? i.layer : 1;

      let o = this.engine.addObject(new C2DE_GObj(x, y, i.w, i.h, l, i.texture, i.tag));

      i.object = o;
      i.oy = y;
      i.gid = i.object.gid = this.engine.scene.length - 1;

      this.spawned.push(i);

    } else {

      for (let i = this.spawned.length; i < this.maxSpawn; i++) {

        let _id = getRandom(0, this.prefabs.length);
        let c = this.prefabs[_id];
        let so = new c().spawnOptions;

        this.spawn(_id, getRandom(so.min_x, so.max_x), getRandom(so.min_y, so.max_y));

      }

    }

  }

  getByGid(gid) {

    for (let i = 0; i < this.spawned.length; i++) {
      if (this.spawned[i].gid == gid)
        return this.spawned[i];
    };

  }

  update() {

    if (pause)
      return;

    this.spawned.forEach(function (item, n, a) {

      if (item != null) {

        if (!item.die) {
          item.update();
          item.object.x -= this.road.speed;

          if (item.shoot && !item.cooldown && getRandom(0, 100) > 30)
            item.shoot(this.engine.addObject.bind(this.engine));

        } else {

          if (item.rocks)
            this.engine.getModule('spells').rocks = this.engine.getModule('spells').rocks.concat(item.rocks);

          this.engine.removeObject(item.gid);
          this.spawned.splice(n, 1);
        }

      }

    }.bind(this))

    this.spawn();

  }

  reset() {

    this.spawned.forEach(function (i, n, a) {

      this.engine.removeObject(i.gid);

      if (i.rocks) {
        i.rocks.forEach(function (r, number, arr) {

          this.engine.removeObject(r.o.gid);

        }.bind(this));
      }

      delete this.spawned[n];

    }.bind(this));

    this.spawned = [];

  }

}
