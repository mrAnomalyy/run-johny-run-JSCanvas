class Spells {
    constructor(engine, player) {
        this.player = player;
        this.engine = engine;
        this.rocks = [];

        this.spells = [
            {
                f: function () {
                    let t = this.engine.getNearest(player);
                    console.log(t);
                    this.rocks.push(new Rock(this.engine.addObject.bind(this.engine), player.x, player.y, t.x, t.y, "player"));

                }.bind(this),

                c: 500
            },

            {
                f: function () {

                }.bind(this),

                c: 3500
            }

        ];

        this.blocks = [];

    }

    cast(id) {

        id--;

        if (!this.blocks[id]) {

            this.blocks[id] = true;

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
                
                if (npc instanceof NPC)
                    o = (npc.getByGid(o.gid));   
                
                if (o && o.tag != "player" && o.tag != "ruby" &&  !o.invincible) {
                    
                    o.hp -= 15;
                    o.invincible = true;
                    o.object.y -= 3;

                    setTimeout(function (obj) {
                        obj.invincible = false;
                    }, 1500, o);

                }

            })

            if (i.die) {
                this.engine.removeObject(i.o.gid);
                this.rocks.splice(n, 1);
            }
            
        }.bind(this));
    }

}
