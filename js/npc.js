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

        this.maxSpawn = 5;

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
            console.log(this.spawned[i].gid + ' == ' + gid + ' ?? ' + (this.spawned[i].gid == gid));
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
                } else {
                    this.engine.removeObject(item.gid);
                    this.spawned.splice(n, 1);
                }

            }

        }.bind(this))

        this.spawn();

    }

}