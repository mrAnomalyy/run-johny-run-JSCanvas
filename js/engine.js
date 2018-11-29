function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let pause = true;

class C2DE {

    constructor(id, bgId) {
        this.el = d.getElementById(id);
        this.bgEl = (bgId !== undefined) ? d.getElementById(bgId) : null;
        this.ctx = this.el.getContext('2d');
        this.setSmooth(false);
        this.modules = [];

        this.onresize = function () {

            let aspectRation = window.innerWidth / window.innerHeight;

            this.w = this.el.width = window.innerWidth;
            this.h = this.el.height = this.w / 1.7777;

            this.el.style.left = '0';
            this.el.style.width = '100%';

            if (aspectRation > 1.8) {

                this.h = this.el.height = window.innerHeight;
                this.w = this.el.width = window.innerHeight * 1.7777;

                this.el.style.left = ((window.innerWidth - this.w) / 2) + 'px';
                this.el.style.width = this.w + 'px';

            }

        }.bind(this);

        this.onresize();

        window.addEventListener('resize', this.onresize.bind(this));

        this.pausebool = true;
        this.scene = [];
        this.textures = [];
        this.layers = 5;
        this.keyboard = new C2DE_Keyboard();
        this.fps = 0;
        this.fpsInterval = setInterval(function () {
            console.log(this.fps);
            this.fps = 0;
        }.bind(this), 1000);
        this.start();

    }

    setSmooth(status) {
        this.ctx.mozImageSmoothingEnabled = status;
        this.ctx.webkitImageSmoothingEnabled = status;
        this.ctx.msImageSmoothingEnabled = status;
        this.ctx.imageSmoothingEnabled = status;
    }

    p2x(x) {

        return this.w / 100 * x;

    }

    p2y(y) {

        return this.h / 100 * y;

    }

    update() {}

    frameUpdate() {

        if (!this.pausebool) {
            this.fps++;
            this.ctx.clearRect(0, 0, this.w, this.h);
            this.update();
        }
        
        requestAnimationFrame(this.frameUpdate.bind(this));

    }

    start() {
        this.pausebool = false;
        this.frameUpdate();
    }

    pause() {
        this.pausebool = true;
    }

    addObject(obj) {

        if (!obj instanceof C2DE_GObj) {
            console.error("Invalid GameObject Type.");
            return false;
        }

        obj.engine = this;
        obj.gid = this.scene.length;

        if (isNaN(parseInt(obj.layer)))
            obj.layer = 0;

        if (obj.texture)
            this.loadTextures(obj.texture.textures);

        return this.scene[this.scene.push(obj) - 1];

    }

    addModule(name, module) {

        this.modules[name] = module;

    }

    getModule(name) {
        return this.modules[name];
    }

    loadTextures(textures) {

        if (!Array.isArray(textures))
            textures = [textures];

        textures.forEach(function (i, n, a) {

            this.loadTexture(i);

        }.bind(this))

    }

    loadTexture(src) {

        if (this.getTexture(src.src))
            return true;

        let e = document.createElement('img');
        e.src = src.src;
        let l = this.textures[this.textures.push({
            el: e,
            src: src.src,
            loaded: false
        }) - 1];

        if (src.FRAMED_SPRITE_WIDTH) {
            l.FRAMED_SPRITE_WIDTH = src.FRAMED_SPRITE_WIDTH;
            l.FRAMED_SPRITE_HEIGHT = src.FRAMED_SPRITE_HEIGHT;
            l.FRAMED_SPRITE_STEPS = src.FRAMED_SPRITE_STEPS;
        }

        e.onload = function () {
            l.loaded = true;
            document.body.append(l.el);
            document.body.removeChild(l.el);
        }

        e.onerror = function () {
            l.loaded = false;
            console.error("Error on load texture: " + l.el.src);
        }

    }

    getTexture(t) {

        for (let i = 0; i < this.textures.length; i++) {
            if (this.textures[i].src == t) {
                if (this.textures[i].loaded)
                    return this.textures[i];

                return false;
            }

        }

    }

    getInteractions(who) {

        let i = [];

        this.scene.forEach(function (obj, n, a) {

            if (obj.tag != "road" && obj.tag != who.tag) {

                if (!(who.x + who.w < obj.x ||
                        who.y + who.h < obj.y ||
                        who.x > obj.x + obj.w ||
                        who.y > obj.y + obj.h)) {
                    //                    console.log('whoX: ' + who.x + ' whoY: ' + who.y + ' objX: ' + obj.x + ' objY: ' + obj.y);
                    i.push(obj);
                }

            }

        }.bind(this));


        return i;
    }

    getNearest(who) {

        let l = {
            x: Infinity,
            y: Infinity
        };

        this.scene.forEach(function (obj, n, a) {

            if (obj.tag != "road" && obj.tag != who.tag) {

                if (obj.x + obj.y < l.x + l.y)
                    l = obj;

            }

        })

        return l;

    }

    removeObject(gid) {

        delete this.scene[gid];

    }

    drawRect(x, y, w, h, c) {
        this.ctx.fillStyle = c;
        this.ctx.fillRect(this.p2x(x), this.p2y(y), this.p2x(w), this.p2y(h));
    }

    drawTexturedRect(x, y, w, h, t) {

        let tex = this.getTexture(t);

        if (!tex)
            return false;


        if (tex.FRAMED_SPRITE_WIDTH) {

            tex.FRAMED_SPRITE_HEIGHT = (tex.FRAMED_SPRITE_HEIGHT !== undefined) ? tex.FRAMED_SPRITE_HEIGHT : tex.el.height;
            tex.FRAMED_SPRITE_INTERVAL_TIME = (tex.FRAMED_SPRITE_INTERVAL_TIME !== undefined) ? tex.FRAMED_SPRITE_INTERVAL : 100;
            tex.FRAMED_SPRITE_OFFSET = (tex.FRAMED_SPRITE_OFFSET !== undefined) ? tex.FRAMED_SPRITE_OFFSET : 0;

            if (!tex.FRAMED_SPRITE_INTERVAL) {
                tex.FRAMED_SPRITE_INTERVAL = setInterval(function () {

                    tex.FRAMED_SPRITE_STEP = (tex.FRAMED_SPRITE_STEP !== undefined) ? tex.FRAMED_SPRITE_STEP + 1 : 0;

                    if (tex.FRAMED_SPRITE_STEP > tex.FRAMED_SPRITE_STEPS - 1)
                        tex.FRAMED_SPRITE_STEP = 0;

                }, tex.FRAMED_SPRITE_INTERVAL_TIME);
            }

            this.ctx.drawImage(tex.el, (tex.FRAMED_SPRITE_WIDTH * tex.FRAMED_SPRITE_STEP) + tex.FRAMED_SPRITE_OFFSET, 0, tex.FRAMED_SPRITE_WIDTH, tex.FRAMED_SPRITE_HEIGHT, this.p2x(x), this.p2y(y), this.p2x(w), this.p2y(h));

        } else {

            this.ctx.drawImage(tex.el, this.p2x(x), this.p2y(y), this.p2x(w), this.p2y(h));

        }
    }

    drawScene() {

        this.keyboard.doKeys();

        for (let i = 0; i <= this.layers; i++) {
            this.scene.forEach(function (item, n, a) {
                if (item.layer == i) {
                    item.x = Math.ceil((item.x) * 100) / 100;
                    item.y = Math.ceil((item.y) * 100) / 100;
                    item.draw();
                }
            });
        }

    }

}
