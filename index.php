<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Run, Johny, run!</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>

    <div id="pause">Paused</div>
   
    <div class="container" id="main-menu">

        <div class="title">Run, Johny, Run!</div>
        <div class="flex">
            <div class="instruction">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero dolore adipisci omnis porro iure in laborum eligendi excepturi aperiam, perspiciatis eum eos sequi vitae, cum consequuntur assumenda facilis optio a. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis nulla animi cum, doloribus fugiat nisi illo similique non quia pariatur vero adipisci, quis tenetur dolore, facere ipsa, sed recusandae eaque.
            </div>
            <div class="play">
                <input type="text" placeholder="Player" id="player-nickname">
                <div class="go" onclick="player.startGame()">Run!</div>
            </div>
        </div>
    </div>
    
    <div class="UI" id="ui">
        <div class="player">
            <div class="playername" id="player-name">Player</div>
            <div class="playerstat" id="player-hp">100</div>
            <div class="playerstat" id="player-mp">100</div>
        </div>

        <div class="time" id="player-time">00:00</div>



        <div class="spells">
            <div class="spell" id="spell1">1</div>
            <div class="spell" id="spell2">2</div>
        </div>

    </div>

    <canvas id="game">Your browser does not support the HTML5 canvas technology.</canvas>
    <canvas id="game-background"></canvas>

    <script>
        let d = document;

    </script>
    <script src="js/gob.js"></script>
    <script src="js/keyboard.js"></script>
    <script src="js/rock.js"></script>
    <script src="js/spells.js"></script>
    <script src="js/engine.js"></script>
    <script src="js/road.js"></script>
    <script src="js/player.js"></script>
    <script src="js/snail.js"></script>
    <script src="js/bat.js"></script>
    <script src="js/fly.js"></script>
    <script src="js/ruby.js"></script>
    <script src="js/npc.js"></script>
    <script src="js/background.js"></script>
    <script src="js/game.js"></script>
</body>

</html>
