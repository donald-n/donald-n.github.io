var games = {
	'snake': '<td><a href="snake.html"><img src="imgs/snake.png" class="game-img"></a></td>',
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