var diction = document.getElementById('dic'); //Textarea div
var wordItem = document.getElementById('word-item'); 
var words = new Array();

var score = 0;
var scoreItem = document.getElementById('scoreItem');

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
	} else if (trigger == skip_btn) {
		
	} else {
		
	}
}

function save() {
	//What it says on the tin. Takes the textarea string and saves to localStorage
	localStorage.dic = diction.value;
	
	return true
}

function load() {
	//If the dic key exists, load data into the textarea
	if (localStorage.dic != null) {
		diction.value = localStorage.dic;
	}
	
	return true;
}