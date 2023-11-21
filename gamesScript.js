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

var defaultUrl = "./game/snake.js"

function loadScript(url) {
    const newScript = document.createElement('script')
	const script = document.getElementById("gameScript");
	console.log(script)
	newScript.type = 'text/javascript';
	newScript.src = url;
	newScript.id = "gameScript";
	script.parentNode.insertBefore(newScript, script.nextSibling);
	script.parentNode.removeChild(script);
}

function replaceGame(game) {
	document.getElementById("gameContainer").innerHTML = games[game][2];
	loadScript(`./games/${game}.js`);
}

replaceGame('snake');