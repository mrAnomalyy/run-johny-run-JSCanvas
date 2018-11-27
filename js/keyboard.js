class C2DE_Keyboard {
    constructor() {

        this.keys = {
            'KeyA': [],
            'KeyD': [],
            'KeyW': [],
            'Digit1': [],
            'Digit2': [],
            'Escape': []
        }

        this.pressed = {}

        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));

    }

    onKeyUp(e) {
        this.pressed[e.code] = false;
    }

    onKeyDown(e) {
        this.pressed[e.code] = true;
        
        if(e.code == "Escape")
            this.keys["Escape"].forEach(function(i, n, a){
             
                if (i && i.call && i.apply)
                    i();
                
            });
        
        //        console.log(e.code);
    }

    doKeys() {
        
        if (pause || !gameStarted)
            return;
        
        let keys = Object.keys(this.keys);

        keys.forEach(function (item, n, arr) {
            
            if (item != "Escape") {

                this.keys[item].forEach(function (i, n, arr) {
                    if (i && i.call && i.apply && (this.pressed[item]))
                        i();
                }.bind(this))
            }

        }.bind(this))

    }
}
