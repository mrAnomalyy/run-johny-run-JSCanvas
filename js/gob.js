class C2DE_GObj {
    constructor(x, y, w, h, layer, texture, tag) {

        this.engine = null; // be filled by engine appending.

        this.tag = (tag) ? tag : null;
        this.gid = null;
        
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.layer = layer;

        this.keys = [];

        if ((texture.textures[0].src.split('COLOR_').length > 1)) {
            this.color = texture.textures[0].src.split('_')[1];
        } else {
            this.texture = texture;
        }

    }

    draw() {

        if (this.color)
            this.engine.drawRect(this.x, this.y, this.w, this.h, this.color);

        if (this.texture)
            this.engine.drawTexturedRect(this.x, this.y, this.w, this.h, this.texture.textures[this.texture.texture].src);


    }

    addAction(key, func) {

        if (!this.engine.keyboard)
            return false;

        this.keys[key] = func;

        this.engine.keyboard.keys[key].push(func.bind(this));

    }
    
    
    getInteractions(){
        if (this.engine)
            return this.engine.getInteractions(this);
    }
    
    die(){
        this.engine.removeObject(this.gid);
    }


}
