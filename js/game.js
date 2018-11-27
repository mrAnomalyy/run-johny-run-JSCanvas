let game = new C2DE("game");
let gameStarted = false;

let player = game.addObject(new C2DE_GObj(15, 75, 6, 18, 2, {
    texture: 0,
    textures: [{
            src: "tex/player.png",
            FRAMED_SPRITE_WIDTH: 128,
            FRAMED_SPRITE_HEIGHT: 200,
            FRAMED_SPRITE_STEPS: 10,
            FRAMED_SPRITE_INTERVAL_TIME: 2500,
    },
        {
            src: "tex/player_jump.png",
            FRAMED_SPRITE_WIDTH: 111,
            FRAMED_SPRITE_HEIGHT: 200,
            FRAMED_SPRITE_STEPS: 10,
            FRAMED_SPRITE_INTERVAL_TIME: 60,
    },
        {
            src: "tex/player_run.png",
            FRAMED_SPRITE_WIDTH: 128,
            FRAMED_SPRITE_HEIGHT: 200,
            FRAMED_SPRITE_STEPS: 10,
            FRAMED_SPRITE_INTERVAL_TIME: 60,
    },
              ],
}, "player"));

let spells = new Spells(game, player);

player.state = "idle";

player.addAction("KeyA", function () {
    if (this.x > -2)
        this.x -= 0.4

    if (!this.inJump)
        this.texture.texture = 2;

});

player.addAction("KeyD", function () {
    if ((this.x < 48 && !road.stop) || (this.x < 95 && road.stop))
        this.x += 0.4

    if (!this.inJump)
        this.texture.texture = 2;
});

player.addAction("KeyW", function () {
    if (!this.inJump) {
        this.sJump = this.y;
        this.inJump = true;
        this.state = "jump";
    }
});

player.addAction("Digit1", function () {
    spells.cast(1);
});

player.addAction("Digit2", function () {
    spells.cast(2);
});

let pauseBlock = false;

player.addAction("Escape", function () {

    if (pauseBlock || !gameStarted)
        return;

    pauseBlock = true;

    document.getElementById('pause').style.display = (pause) ? 'none' : 'block';

    pause = !pause;

    if (pause) {
        game.pause();
    } else {
        game.start();
    }




    setTimeout(function () {
        pauseBlock = false;
    }, 300);

});

player.hp = 100;
player.mp = 100;
player.startedTime = new Date();

player.updateUI = function () {

    if (pause)
        return;

    if (player.hp > 100)
        player.hp = 100;

    document.getElementById('player-hp').innerHTML = this.hp;
    document.getElementById('player-mp').innerHTML = this.mp;
    document.getElementById('player-hp').style.backgroundPosition = '-' + this.hp + '% 0%';
    document.getElementById('player-mp').style.backgroundPosition = '-' + this.mp + '% 0%';

    let time = new Date();

    time = new Date(time.getTime() - this.startedTime.getTime());

    let m = (time.getMinutes() < 10) ? '0' + time.getMinutes() : time.getMinutes();
    let s = (time.getSeconds() < 10) ? '0' + time.getSeconds() : time.getSeconds();

    document.getElementById('player-time').innerHTML = m + ' : ' + s;
}

let uiT;

player.showUI = function (status) {

    if (status) {
        document.getElementById('ui').style.display = 'block';
        return;
    }

    document.getElementById('ui').style.animation = 'pushToTop 0.3s 1';

    clearTimeout(uiT);
    uiT = setTimeout(function () {
        document.getElementById('ui').style.display = 'none';
        document.getElementById('ui').style.animation = '';
    }, 290);

}

player.startGame = function () {

    let n = document.getElementById('player-nickname').value;

    document.getElementById('player-name').innerHTML = (n == "") ? "Player" : n;

    document.getElementById('main-menu').style.display = 'none';

    this.showUI(true);

    pause = false;
    gameStarted = true;

}

let road = new Road();

let npc = new NPC(game, road, [{
    p: Snail,
    c: 45
}, {
    p: Bat,
    c: 42
}, {
    p: Fly,
    c: 7
}, {
    p: Ruby,
    c: 6
}]);

let background = new Background();

game.update = function () {

    if (player.inJump) {
        player.texture.texture = 1;
        if (player.y <= player.sJump - 12 || player.isFall) {

            player.isFall = true;
            //            console.log(player.y + ' + 2 = ' + (player.y + 2));
            player.y += 0.8;

            if (player.y >= player.sJump) {
                player.inJump = false;
                player.isFall = false;
                player.y = player.sJump;
            }

        } else {
            player.y -= 0.6;
        }

    } else {

        if (player.x > 47) {
            road.speed = (pause) ? 0 : 0.3;

            player.texture.texture = 2;
        } else {
            road.speed = 0;
            player.texture.texture = 0;
        }

    }

    background.speed = road.speed * 0.15;

    if (!player.invincible) {

        let i = player.getInteractions();

        i.forEach(function (item, n, a) {

            switch (item.tag) {

                case 'ruby':
                    item.die();
                    player.hp += 25;
                    break;
                case 'snail':
                    player.hp -= 2;
                    player.invincible = true;
                    setTimeout(function () {
                        player.invincible = false;
                    }, 1000);
                    break;
                case 'fly':
                    player.hp -= 2;
                    player.invincible = true;
                    setTimeout(function () {
                        player.invincible = false;
                    }, 1000);
                    break;
                case 'bat':
                    player.hp -= 10;
                    player.invincible = true;
                    setTimeout(function () {
                        player.invincible = false;
                    }, 1000);
                    break;
                default:
                    console.log("Interacted with " + item.tag);
                    break;
            }


        }.bind(this));

    }

    player.updateUI();
    spells.update();
    road.update();
    npc.update();
    game.drawScene();

}
