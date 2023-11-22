guesses = 0

function checkNumber() {
	number = document.getElementById("player-guess").value;
	teller = document.getElementById("teller");
	teller.innerHTML = '';
	if (number == compNumber) {
		guesses += 1;
		teller.innerHTML = 'You got it in ' + guesses + ' guesses!';
	}
	else if (number < compNumber) {
		teller.innerHTML = 'Too low';
		guesses += 1;
	}
	else if (number > compNumber) {
		teller.innerHTML = 'Too high';
		guesses += 1;
	}
}

function getNumber() {
	guesses = 0
	max = document.getElementById("max-number").value;
	compNumber = Math.floor(Math.random() * (max - 1 + 1)) + 1;
	document.getElementById("player-guess").value = 0;
	document.getElementById("teller") = "Enter a number and press submit";
}