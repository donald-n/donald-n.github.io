var games = {
	'snake': [
		'Snake',
		'',
		'<html><div id="score_dis">Score: 0</div><canvas class="board" id="snakeboard" width="600px" height="600px"></canvas>'
	],
	'snake2': [
		'Snake',
		'<p>hello</p>',
		'<html><div id="score_dis">Score: 0</div><canvas class="board" id="snakeboard" width="500px" height="500px"></canvas>'
	]
}

var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
head.appendChild(script);

function loadScript(url) {
    script.src = url;
    head.appendChild(script);
}

function replaceGame(game) {
	document.getElementById("gameContainer").innerHTML = games[game][2];
	loadScript(`./games/${game}.js`);
}

replaceGame('snake');