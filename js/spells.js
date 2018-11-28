class Spells {
    constructor(engine, player) {
        this.player = player;
        this.engine = engine;
        this.rocks = [];

        this.spells = [
            {
                f: function () {
                    let t = this.engine.getNearest(player);
                    this.rocks.push(new Rock(this.engine.addObject.bind(this.engine), player.x, player.y, t.x, t.y, "player"));

                }.bind(this),

                c: 300,
                cost: 5
            },

            {
                f: function () {

                }.bind(this),

                c: 5000,
                cost: 15
            }

        ];

        this.blocks = [];

    }

    cast(id) {

        id--;
        
        if (!this.blocks[id] && this.player.mp >= this.spells[id].cost) {

            this.blocks[id] = true;
            
            this.player.mp -= this.spells[id].cost;

            this.spells[id].f();

            let spellel = document.getElementById('spell' + (id + 1));

            spellel.className += ' block';

            setTimeout(function (id) {
                this.blocks[id] = false;
                spellel.className = 'spell';
            }.bind(this), this.spells[id].c, id);

        }
    }

    update() {
        this.rocks.forEach(function (i, n, a) {
            i.update();

            let int = this.engine.getInteractions(i.o);

            int.forEach(function (o, n, a) {

                if (this.engine.getModule('npc') instanceof NPC)
                    o = (this.engine.getModule('npc').getByGid(o.gid));

                if (o && o.tag != "player" && o.tag != "ruby" && !o.invincible) {

                    o.hp -= 15;
                    o.invincible = true;
                    o.object.y -= 3;

                    setTimeout(function (obj) {
                        obj.invincible = false;
                    }, 1500, o);

                }

            }.bind(this))

            if (i.die) {
                this.engine.removeObject(i.o.gid);
                this.rocks.splice(n, 1);
            }

        }.bind(this));
    }

}
