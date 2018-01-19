	var word = "";
	var resetBar = 0;
	var index = 0;
	var pieces = [];
	var letters = [];
	var resetBar = null;
	const lingoField = document.getElementById("lingoField");
	//audio deel
	//end audio
	const elem = document.getElementById("myBar");
	const goodW = new Audio("music/goodW.mp3");

	function getRandomWord(){
	return words[(Math.floor(Math.random() * words.length) )];
	}

	function process() {
	word = getRandomWord();
	console.log(word);
	parts = word.split("");
	generateInputs();
	}

	document.getElementById("timer").innerHTML =
	  1 + ":" + 0;
	startTimer();

	function startTimer() {
	  var presentTime = document.getElementById("timer").innerHTML;
	  var timeArray = presentTime.split(/[:]+/);
	  var m = timeArray[0];
	  var s = checkSecond(timeArray[1] - 1);
	  if (s==59){
	  m = m - 1;
	  }
	  if(m<0){
	  alert("Helaas heb je het niet binnen de beschikbare tijd geraden. Het goede woord was " + word);
	  location.reload();
	  }

	  document.getElementById("timer").innerHTML =
	    m + ":" + s;
	  setTimeout(startTimer, 1000);
	}

	function checkSecond(sec) {
	  if (sec < 10 && sec >= 0) {sec = "0" + sec;
	}
	  if (sec < 0) {sec = "59";
	}
	 return sec;
	}

	process();

	function generateInputs(){
	    for (var i = 0; i < 25; i++) {
	        if (i < 24) {
	            if (i == 4 || i == 9 || i == 14 || i == 19 ){
	                lingoField.innerHTML += "<input type='text' id='"+i+"' maxlength='1' onKeypress='autotab(this, document.getElementById(" + (i+2) + "))' value='' onchange='rowCheck()'><br>";
	            } else {
	                lingoField.innerHTML += "<input type='text' id='"+i+"' maxlength='1' onKeypress='autotab(this, document.getElementById(" + (i+1) + "))' value='' onchange='rowCheck()'>";
	            }
	        } else {
	            lingoField.innerHTML += "<input type='text' id='"+i+"' maxlength='1' onKeyup='this.blur();' value='' onchange='rowCheck()'>";
	        }
	    }
	    setValues();
	}

	function setValues(){
		for (var i = 0; i < 24; i++) {
			if (i == 0 || i == 5 || i == 10 || i == 15 || i == 20 ){
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

	function autotab(current,to) {
		if (current.value.length <= current.getAttribute("maxlength")) {
			to.focus();

		}
	}

	function check(){
	    switch (index) {
	    case 0:
	        setColor(0, 5, 5);
	        checkWin(0, 5);
	        break;
	    case 1:
	        setColor(5, 10, 10);
	        checkWin(5, 10);
	        break;
	    case 2:
	        setColor(10, 15, 15);
	        checkWin(10, 15);
	        break;
	    case 3:
	        setColor(15, 20, 20);
	        checkWin(15, 20);
	        break;
	    case 4:
	        setColor(20, 25, 25);
	        checkWin(20, 25);
	        break;
	    default:
	        alert("error");
	        break;
	    }
	    index ++;
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
	                document.getElementById(i).style.backgroundColor = "red";
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
	    document.getElementById(id).style.backgroundColor = "red";
	    delete letters[0];
	}

	function doDisable(){
	    for (var i = 0; i < 24; i++) {
	        if (document.getElementById(i).value != "") {
	            document.getElementById(i).disabled = true;
	        }
	    }
	}
	function checkWin(min, max){
	    if (index >= 4) {
	        var hasLost = false;
	        for (var i = min; i < max; i++) {
	            if (document.getElementById(i).style.backgroundColor != "red") {
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
	            if (document.getElementById(i).style.backgroundColor != "red") {
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
		goodW.play();
	    setTimeout(function () {
	        location.reload();
	    }, 3800);
	}

	function gotGameOver(){
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