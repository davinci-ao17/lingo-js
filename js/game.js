var word = "";
var resetTimer = 0;
var index = 0;
var parts = [];
var letters = [];
var hasWonBool = false;
var resetTimer = null;
const lingofield = document.getElementById('lingofield');
const goodWord = document.getElementById('goodWord');
const inputWord = document.getElementById('inputWord');
const backgroundMusic = document.getElementById('backgroundSound');
const timeUp = document.getElementById('timeUp');
const elem = document.getElementById("myBar");

backgroundMusic.play();
backgroundMusic.volume = 0.3;
inputWord.pause();
goodWord.pause();
timeUp.pause();

function getRandomWord(){
	return words[(Math.floor(Math.random() * words.length) )];
}

function process(){
    word = getRandomWord();
    console.log(word); //<-- shows the correct word
    parts = word.split('');
    generateInputs();
}

function move() {
    var width = 0; 
    resetTimer = setInterval(frame, 60);
    function frame() {
        //clearInterval(resetTimer); //<-- timeBar ON/OFF
        if (width >= 100) {
            clearInterval(resetTimer);
            timeUp.play();
            setTimeout(function () {
                gotGameOver();
            }, 300);
            setTimeout(function () {
                location.reload();
            }, 1300);
        } else {
            width+= 0.5; 
            elem.style.width = width + '%'; 
        }
    }
}

process();

function generateInputs(){
	for (var i = 0; i < 25; i++) {
		if (i < 24) {
			if (i == 4 || i == 9 || i == 14 || i == 19 ){
				lingofield.innerHTML += "<input type='text' id='"+i+"' maxlength='1' onKeyup='autotab(this, document.getElementById(" + (i+2) + "))' onKeyDown='inputWord.play();' value='' onchange='rowCheck()'><br>";
			}else{
				lingofield.innerHTML += "<input type='text' id='"+i+"' maxlength='1' onKeyup='autotab(this, document.getElementById(" + (i+1) + "))' onKeyDown='inputWord.play();' value='' onchange='rowCheck()'>";
			}
		}else{
			lingofield.innerHTML += "<input type='text' id='"+i+"' maxlength='1' onKeyup='this.blur();' value='' onchange='rowCheck()'>";
		}
	}
	setValues();
}

function setValues(){
	for (var i = 0; i < 24; i++) {
		if (i == 0 || i == 5 || i == 10 || i == 15 || i == 20) {
			document.getElementById(i).disabled = true;
		}
		if (i == 1) {
			document.getElementById(i).autofocus = true;
		}
	}
	document.getElementById(0).value = getFirst();
}

function getFirst(){
	return word.substr(0,1).toUpperCase();
}

move();

function check(){
    switch (index) {
    case 0:
        setColor(0, 5, 5);
        checkWin(0, 5);
        if (!hasWonBool) {
        	console.log(resetTimer);
            clearInterval(resetTimer);
            elem.style.width = "0%";
            move();
        }
        break;
    case 1:
    	setColor(5, 10, 10);
        checkWin(5, 10);
        if (!hasWonBool) {
        	clearInterval(resetTimer);
        	elem.style.width = "0%";
        	move();
        }
        break;
    case 2:
    	setColor(10, 15, 15);
        checkWin(10, 15);
        if (!hasWonBool) {
        	clearInterval(resetTimer);
        	elem.style.width = "0%";
        	move();
        }
        break;
    case 3:
        setColor(15, 20, 20);
        checkWin(15, 20);
        if (!hasWonBool) {
        	clearInterval(resetTimer);
        	elem.style.width = "0%";
        	move();
        }
        break;
    case 4:
        setColor(20, 25, 25);
        checkWin(20, 25);
        clearInterval(resetTimer);
        break;
    default:
    	alert('error');
    	break;
	}
	index ++;
}

function autotab(current,to){
    if (current.value.length <= current.getAttribute("maxlength")) {
        to.focus();
    }
}

function setColor(min, max, skipexeption){
	letters = Object.assign({}, parts);
    if(skipexeption < 24){
        document.getElementById(skipexeption).value = getFirst();
    }
    getColorRed(min, max, skipexeption);
}

function getColorRed(min, max, skipexeption){
	fixFirst(min);
	var currentIndex = 0;
	for (var i = min; i < max; i++) {
		if (i != skipexeption) {
			if (document.getElementById(i).style.backgroundColor == "" && document.getElementById(i).value == letters[currentIndex]){
				document.getElementById(i).style.backgroundColor = "rgb(228, 45, 41)";
				delete letters[currentIndex];
			}
		}
		currentIndex ++;
	}
	getColorYellow(min, max, skipexeption);
}

function getColorYellow(min, max, skipexeption){
	for (var i = min; i < max; i++) {
		if (i != skipexeption) {
			for (var o = 0; o < (Object.keys(letters).length + 3); o++) {
				if (document.getElementById(i).style.backgroundColor == "" && document.getElementById(i).value == letters[o]){
					document.getElementById(i).style.backgroundColor = "yellow";
					document.getElementById(i).style.borderRadius = "50%";
					delete letters[o];
				}
			}
		}
	}
}

function fixFirst(id){
	document.getElementById(id).style.backgroundColor = "rgb(228, 45, 41)";
	delete letters[0];
}

function doDisable(){
	for (var i = 0; i < 24; i++) {
		if (document.getElementById(i).value != '') {
			document.getElementById(i).disabled = true;
		}
	}
}

function checkWin(min, max){
	if (index >= 4) {
		var hasLost = false;
		for (var i = min; i < max; i++) {
			if (document.getElementById(i).style.backgroundColor != "rgb(228, 45, 41)") {
				hasLost = true;
			}
		} 
		if (!hasLost) {
			hasWon();
		} else {
			gotGameOver();
		}
	} else {
		var hasLost = false;
		for (var i = min; i < max; i++) {
			if (document.getElementById(i).style.backgroundColor != "rgb(228, 45, 41)") {
				hasLost = true;
			}
		} 
		if (!hasLost) {
			hasWon();
			setTimeout(function () {
				location.reload();
    		}, 3800);
		}
	}
}

function hasWon(){
	hasWonBool = true;
	clearInterval(resetTimer);
    elem.style.width = "100%";
	backgroundMusic.muted = true;
	goodWord.currentTime = 0;
	goodWord.play();
	setTimeout(function () {
		location.reload();
    }, 3800);
}

function gotGameOver(){
	backgroundMusic.muted = true;
	alert("Je hebt niet het goede woord geraden! Het goede woord was: "+ word);
	setTimeout(function () {
		location.reload();
    }, 1000);
}

function rowCheck(){
	doDisable();
	var hasChecked = false;
	letters = Object.assign({}, parts);
	if (index == 0) {
		for (var i = 0; i < 5; i++){
			if (document.getElementById(i).value == "") {
				hasChecked = true;
			}
		}
		if (!hasChecked) {
			check();
		}
	}
	if (index == 1) {
		for (var i = 5; i < 10; i++){
			if (document.getElementById(i).value == "") {
				hasChecked = true;
			}
		}
		if (!hasChecked) {
			check();
		}
	}
	if (index == 2) {
		for (var i = 10; i < 15; i++){
			if (document.getElementById(i).value == "") {
				hasChecked = true;
			}
		}
		if (!hasChecked) {
			check();
		}
	}
	if (index == 3) {
		for (var i = 15; i < 20; i++){
			if (document.getElementById(i).value == "") {
				hasChecked = true;
			}
		}
		if (!hasChecked) {
			check();
		}
	}
	if (index == 4) {
		for (var i = 20; i < 25; i++){
			if (document.getElementById(i).value == "") {
				hasChecked = true;
			}
		}
		if (!hasChecked) {
			check();
		}
	}
}