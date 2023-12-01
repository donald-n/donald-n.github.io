var games = {
	'0': '<td><a href="snake.html"><img src="imgs/snake.png" class="game-img"></a></td>',
	'1': '<td><a href="random-number.html"><img src="imgs/guess-the-number.png" class="game-img"></a></td>',
	'2': '<td><a href="boxman.html"><img src="imgs/boxman.png" class="game-img"></a></td>',
}

const gamesList = document.getElementById("gamesList");
var iter = 0;

function makeGamesList() {
	var rowsList = [];
	for (const [key, value] of Object.entries(games)) {
		if (iter == 0) {
			row = value;
			iter += 1;

			if (key == Object.keys(games)[Object.keys(games).length - 1]) {
				rowsList.push(row);
			}
		} else if (iter == 1) {
			row += value;
			rowsList.push(row);
			iter = 0;
		}
	}
	for (let i = 0; i < rowsList.length; i++) {
		gamesList.innerHTML += '<tr>'+rowsList[i]+'</tr>';
	}
}

makeGamesList();