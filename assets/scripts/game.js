const inputHolder = document.getElementById('inputHolder');
const rightAnswer = document.getElementById('rightAnswer');
var word = "";
var wordParts = [];
var index = 0;
var letters = [];

function init() {
  getRandomWord();
  genInput();
  onLose();
}
init();

// generate inputs
function genInput() {
  for (var i = 0; i < 25; i++) {
    if (i < 24) {
      if (i == 4 || i == 9 || i == 14 || i == 19) {
        inputHolder.innerHTML += "<input onchange='rowCheck()' id='input"+i+"' type='text' maxlength='1' onKeyup='autotab(this, " + (i+2) + ")'> <br>";
      } else {
        inputHolder.innerHTML += "<input onchange='rowCheck()' id='input"+i+"' type='text' maxlength='1' onKeyup='autotab(this, " + (i+1) + ")'>";
      }
    } else {
      inputHolder.innerHTML += "<input onchange='rowCheck()' id='input"+i+"' type='text' maxlength='1' onKeyup='this.blur();'>";
    }
  }

  setVal();

  // put letters from word into inputs
  document.getElementById('input0').value = wordParts[0];
  document.getElementById('input5').value = wordParts[0];
  document.getElementById('input10').value = wordParts[0];
  document.getElementById('input15').value = wordParts[0];
  document.getElementById('input20').value = wordParts[0];
}

// generate inputs for lose
function onLose() {
  for (var i = 0; i < 5; i++) {
    if (i < 24) {
      if (i == 4 || i == 9 || i == 14 || i == 19) {
        rightAnswer.innerHTML += "<input onchange='rowCheck()' disabled id='answer"+i+"' type='text' maxlength='1' onKeyup='autotab(this, " + (i+2) + ")'> <br>";
      } else {
        rightAnswer.innerHTML += "<input onchange='rowCheck()' disabled id='answer"+i+"' type='text' maxlength='1' onKeyup='autotab(this, " + (i+1) + ")'>";
      }
    } else {
      rightAnswer.innerHTML += "<input onchange='rowCheck()' disabled id='answer"+i+"' type='text' maxlength='1' onKeyup='this.blur();'>";
    }
  }
}

function setVal() {
  for (var i = 0; i < 24; i++) {
    if (i == 0 || i == 5 || i == 10 || i == 15 || i == 20) {
      document.getElementById('input'+i).disabled = true;
    }
  }
}

// get random word from word list
function getRandomWord() {
  word = words[Math.floor(Math.random() * words.length)];
  console.log(word);

  for (var i = 0; i < word.length; i++) {
    // split word and put into row
    wordParts.push(word.substr(i, i + 1).substr(0,1));
  }
  console.log(wordParts);
}

// checks row based on current index
function checkRow() {
  switch(index) {
    case 0:
        setColor(0, 5);
        winCheck(0, 5);
        break;
    case 1:
        setColor(5, 10);
        winCheck(5, 10);
        break;
    case 2:
        setColor(10, 15);
        winCheck(10, 15);
        break;
    case 3:
        setColor(15, 20);
        winCheck(15, 20);
        break;
    case 4:
        setColor(20, 25);
        winCheck(20, 25);
        break;
    default:
        alert("ERROR");
  }
  index++;
}

function winCheck(min, max) {
  // check if input background aren't red
  var hasLost = false;
  for (var i = min; i < max; i++) {
    if (document.getElementById('input'+i).style.backgroundColor != "red") {
      hasLost = true;
    }
  }
  // check if won
  if (!hasLost) {
    if (window.confirm('You won!')) {
      setTimeout(function(){ location.reload(); }, 500);
    }
    // check if lost
  } else if (index >= 4) {
    document.getElementById('answer0').value = wordParts[0];
    document.getElementById('answer1').value = wordParts[1];
    document.getElementById('answer2').value = wordParts[2];
    document.getElementById('answer3').value = wordParts[3];
    document.getElementById('answer4').value = wordParts[4];
    setTimeout(function(){
      alert('You lost!');
      setTimeout(function(){ location.reload(); }, 1500);
      }, 1500);
    }
  }

function rowCheck() {
  var hasChecked = false;
  // Loop through index
  if (index == 0) {
    // Loop through input fields
    for (var i = 1; i < 5; i++){
      // check if there are empty inputs
      if (document.getElementById('input'+i).value == "") {
        // put hasChecked on true when an empty input is found
        hasChecked = true;
      }
    }
    // Check if there are non-empty input fields
    if (!hasChecked) {
      // checks row based on current index
      checkRow();
    }
  }
  if (index == 1) {
    for (var i = 6; i < 10; i++){
      if (document.getElementById('input'+i).value == "") {
        hasChecked = true;
      }
    }
    if (!hasChecked) {
      checkRow();
    }
  }
  if (index == 2) {
    for (var i = 11; i < 15; i++){
      if (document.getElementById('input'+i).value == "") {
        hasChecked = true;
      }
    }
    if (!hasChecked) {
      checkRow();
    }
  }
  if (index == 3) {
    for (var i = 16; i < 20; i++){
      if (document.getElementById('input'+i).value == "") {
        hasChecked = true;
      }
    }
    if (!hasChecked) {
      checkRow();
    }
  }
  if (index == 4) {
    for (var i = 21; i < 25; i++){
      if (document.getElementById('input'+i).value == "") {
        hasChecked = true;
      }
    }
    if (!hasChecked) {
      checkRow();
    }
  }
}

// Focus on next input when current input is filled in
function autotab(current,to){
    var elem = document.getElementById("input" + to);
    if (current.value.length <= current.getAttribute("maxlength")) {
        elem.focus();
    }
}

// Set color to inputs when checked
function setColor(min, max){
    // make copy of wordParts
    letters = Object.assign({}, wordParts);
    // Get the color Red
    getColorRed(min, max);
}

function getColorRed(min, max){
    fixFirst(min);
    var currentIndex = 0;
    for (var i = min; i < max; i++) {
      // Check if background color is empty && Check if the right letter is filled in on the right place
      if (document.getElementById("input"+i).style.backgroundColor == "" && document.getElementById('input'+i).value == letters[currentIndex]){
          document.getElementById("input"+i).style.backgroundColor = "red";
          // delete red letter from 'letters'
          delete letters[currentIndex];
      }
      currentIndex ++;
    }
    // Get the color Yellow
    getColorYellow(min, max);
}

function getColorYellow(min, max){
    for (var i = min; i < max; i++) {
        for (var o = 0; o < 5; o++) {
            // Check if background color is empty && Check if letter is filled in on the right place
            if (document.getElementById("input"+i).style.backgroundColor == "" && document.getElementById('input'+i).value == letters[o]){
                document.getElementById("input"+i).style.backgroundColor = "yellow";
                // delete yellow leyyer from 'letters'
                delete letters[o];
            }
        }
    }
}

function fixFirst(id){
    // Give first letter of row red background color
    document.getElementById('input'+id).style.backgroundColor = "red";
    // delete first letter from 'letters'
    delete letters[0];
}
