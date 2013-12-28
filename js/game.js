var diction = document.getElementById('dic'); //Textarea div
var wordItem = document.getElementById('word-item'); 
var words = new Array();

var score = 0;
var scoreItem = document.getElementById('scoreItem');

var time = 0;
var timeItem = document.getElementById('timeItem');
var timeLimit = 0;
var timeLimitItem = document.getElementById('timeLimitItem');

var interval;

function newWord() {
	//Check the textarea and add items to "words" array.
	var str = diction.value;
	words = str.split(",");
	
	//Randomly select a number, from 0 to array length.
	var word = words[Math.floor(Math.random() * words.length)]
	
	//Strip leading and trailing whitespace
	var clean = word.replace(/(^\s+|\s+$)/g,'');
	
	//Return that word
	return clean;
}

function addScore() {
	scoreItem = document.getElementById('scoreItem');

	//Add a point to score
	score += 1;
	
	//Enter new score into div
	if (score == 1) {
		scoreItem.innerHTML = "1 point";
	} else {
		scoreItem.innerHTML = score + " points";
	}
	
	//return the new score
	return score;
}

function next(trigger) {
	//Set the wordItem div to a new word from dictionary
	wordItem.innerHTML = newWord();
	
	//If the next button was hit, increment score.  Otherwise do not.
	if (trigger == "next_btn") {
		addScore()
	} else if (trigger == "skip_btn") {
		
	} else {
		
	}
}

function save() {
	//What it says on the tin. Takes the textarea string and saves to localStorage
	localStorage.dic = diction.value;
}

function saveLimit() {
	//Saves the time limit
	localStorage.timeLimit = timeLimit.toString();
}

function limit() {
	console.log("step2");
	if (timeLimit == 0) {
		timeLimitItem.value = "0";
	} else {
		timeLimitItem.value = timeLimit;
		time = timeLimit;
		timeItem.innerHTML = time + " seconds";
	}
}

function load() {
	//If the dic key exists, load data into the textarea
	if (localStorage.dic != null) {
		diction.value = localStorage.dic;
	}
	
	if (localStorage.timeLimit != null) {
		timeLimit = parseInt(localStorage.timeLimit);
		console.log("step1");
		limit();
	}
}

function end() {
	document.getElementById('start').setAttribute("style", "display:block;");
	document.getElementById('stop').setAttribute("style", "display:none;");
	document.getElementById('start').setAttribute("data-hidden", "false");
	document.getElementById('stop').setAttribute("data-hidden", "true");

	window.clearInterval(interval);
	
	timeLimitItem.disabled = false;
	diction.disabled = false;
}

function startStop() {
	if (document.getElementById('game').getAttribute("data-hidden") == "true") {
		articleTog("game");
	} else {
		var start = document.getElementById('start');
		var stop = document.getElementById('stop');
		
		if (stop.getAttribute("data-hidden") == "true") { //Start game
			start.setAttribute("style", "display:none;");
			stop.setAttribute("style", "display:block;");
			start.setAttribute("data-hidden", "true");
			stop.setAttribute("data-hidden", "false");
			
			//Setup for timer
			if (timeLimit == 0) {
				time = 0;
			} else {
				time = timeLimit;
			}
			timeItem.innerHTML = time + " seconds";
			
			//Disable text fields
			timeLimitItem.disabled = true;
			diction.disabled = true;
			
			next("begin");
			interval = window.setInterval(timer, 1000);
		} else { //Tigger end function
			end();
		}
	}
}

function timer() {
	//Timer function
	if (timeLimit == 0) {
		time += 1;
	} else {
		time -+ 1;
		if (time <= 0) {
			end();
		}
	}
	
	timeItem.innerHTML = time + " seconds";
}

function articleTog(page) {
	switch(page) {
		case "game":
			document.getElementById('game').setAttribute("style", "display:block;");
			document.getElementById('help').setAttribute("style", "display:none;");
			document.getElementById('settings').setAttribute("style", "display:none;");
			document.getElementById('game').setAttribute("data-hidden", "false");
			document.getElementById('help').setAttribute("data-hidden", "true");
			document.getElementById('settings').setAttribute("data-hidden", "true");
			break;
		case "help":
			document.getElementById('game').setAttribute("style", "display:none;");
			document.getElementById('help').setAttribute("style", "display:block;");
			document.getElementById('settings').setAttribute("style", "display:none;");
			document.getElementById('game').setAttribute("data-hidden", "true");
			document.getElementById('help').setAttribute("data-hidden", "false");
			document.getElementById('settings').setAttribute("data-hidden", "true");
			
			console.log(page);
			break;
		case "settings":
			document.getElementById('game').setAttribute("style", "display:none;");
			document.getElementById('help').setAttribute("style", "display:none;");
			document.getElementById('settings').setAttribute("style", "display:block;");
			document.getElementById('game').setAttribute("data-hidden", "true");
			document.getElementById('help').setAttribute("data-hidden", "true");
			document.getElementById('settings').setAttribute("data-hidden", "false");
			break;
	}
}