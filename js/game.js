let game = new C2DE("game", "game-background");
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

game.addModule('spells', new Spells(game, player));

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
	if (!this.inJump && this.mp >= 10) {
		this.sJump = this.y;
		this.inJump = true;
		this.state = "jump";
		this.mp -= 10;
	}
});

player.addAction("Digit1", function () {
	game.getModule('spells').cast(1);
});

player.addAction("Digit2", function () {
	game.getModule('spells').cast(2);
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
		pauseBlock = false; // block escape button for a some time.
	}, 300);

});

player.hp = 100;
player.mp = 100;
player.time = 0;
player.score = 0;

setInterval(function () {

	if (pause)
		return;

	player.time++;
	player.mp += 5;

	if (player.mp > 100)
		player.mp = 100;

}, 1000); // add one second per second if isn't pause

player.updateUI = function () {

	if (pause)
		return;

	if (player.hp > 100)
		player.hp = 100;

	document.getElementById('player-hp').innerHTML = this.hp;
	document.getElementById('player-mp').innerHTML = this.mp;

	document.getElementById('player-hp').style.backgroundPosition = '-' + this.hp + '% 0%';
	document.getElementById('player-mp').style.backgroundPosition = '-' + this.mp + '% 0%';

	document.getElementById('player-score').innerHTML = (player.score <= 1000) ? player.score + ' points' : player.score + ' p.';

	let m = Math.floor(player.time / 60);
	let s = player.time % 10;

	m = (m < 10) ? '0' + m : m;
	s = (s < 10) ? '0' + s : s;

	document.getElementById('player-time').innerHTML = m + ' : ' + s;

	if (player.hp < 1) {
		player.hp = 0;
		setTimeout(function () {
			this.endGame(); // give player time to understand
		}.bind(this), 500);
	}

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

player.restartGame = function () {

	player.hp = 100;
	player.mp = 100;
	player.score = 0;

	document.getElementById('scoreboard').style.display = 'none'; // without animation, for now.

	game.getModule('npc').reset();
	game.getModule('spells').reset();
	road.reset();
	player.x = 15;
	player.y = 75;

	this.showUI(true);

	pause = false;
	gameStarted = true;
	game.pausebool = false;

}

player.endGame = function () {

	pause = true;
	gameStarted = false;
	game.pause();
	this.showUI(false);

	new Request('POST', 'functions.php?function=addScore', 'name=' + document.getElementById('player-name').innerHTML + '&score=' + this.score, this.loadScores.bind(this));

	document.getElementById('scoreboard').style.display = 'block';

}

player.loadScores = function (e) {

	this.gotNick = e;

	new Request('GET', 'functions.php?function=getScores', '', this.appendResults.bind(this));

}

player.appendResults = function (raw) {

	let s = document.getElementById('scores');

	let r = JSON.parse(raw);

	if (!r) {
		s.innerHTML = 'Error on loading';
		return;
	}

	s.innerHTML = '';

	r.forEach(function (element, n, a) {

		if (element.name != this.gotNick) {
			s.innerText += (n + 1) + '. ' + element.name + ' - ' + element.score + ' points';
		} else {
			s.innerText += 'It\'s you\'re -> ' + (n + 1) + '. ' + element.name + ' - ' + element.score + ' points';
		}


		s.innerHTML += '<br>';
	}.bind(this));

}

game.addModule('npc', new NPC(game, road, [{
	p: Snail,
	c: 40,
}, {
	p: Bat,
	c: 33
}, {
	p: Fly,
	c: 25
}, {
	p: Ruby,
	c: 2
}]));

let background = new Background();

game.update = function () {

	if (player.inJump) {
		player.texture.texture = 1;
		if (player.y <= player.sJump - 12 || player.isFalling) {

			player.isFalling = true;
			//            console.log(player.y + ' + 2 = ' + (player.y + 2));
			player.y += 0.8;

			if (player.y >= player.sJump) {
				player.inJump = false;
				player.isFalling = false;
				player.y = player.sJump;
			}

		} else {
			player.y -= 0.6;
		}

	} else {

		if (player.x > 47 && game.keyboard.pressed["KeyD"]) {
			road.speed = (pause) ? 0 : 0.3;

			player.texture.texture = 2;
		} else {
			road.speed = 0;
			player.texture.texture = 0;
		}

	}

	background.speed = road.speed * 0.15;

	let i = player.getInteractions();

	i.forEach(function (item, n, a) {

		switch (item.tag) {

			case 'ruby':
				item.die();
				player.hp += 25;
				break;
			case 'snail':

				if (player.inJump || player.invincible)
					return;

				player.hp -= 5;
				player.invincible = true;
				setTimeout(function () {
					player.invincible = false;
				}, 1000);
				break;
			case 'fly':

				if (player.inJump || player.invincible)
					return;

				player.hp -= 2;
				player.invincible = true;
				setTimeout(function () {
					player.invincible = false;
				}, 1000);
				break;
			case 'bat':
			case 'bat_rock':

				if (player.inJump || player.invincible)
					return;

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

	player.updateUI();
	game.getModule('spells').update();
	road.update();
	game.getModule('npc').update();
	game.drawScene();

}
