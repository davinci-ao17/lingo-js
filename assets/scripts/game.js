const inputHolder = document.getElementById('inputHolder');
const rightAnswer = document.getElementById('rightAnswer');
var lingoMusic = new Audio("assets/sounds/lingo.mp3");
var word = "";
var wordParts = [];
var index = 0;

function init() {
  getRandomWord();
  genInput();
  onLose();
}
init();

// setInterval(function(){ lingoMusic.play(); }, 1000);
lingoMusic.volume = 0.5;

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

  document.getElementById('input0').value = wordParts[0];
  document.getElementById('input5').value = wordParts[0];
  document.getElementById('input10').value = wordParts[0];
  document.getElementById('input15').value = wordParts[0];
  document.getElementById('input20').value = wordParts[0];
}

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

function getRandomWord() {
  word = words[Math.floor(Math.random() * words.length)];
  console.log(word);

  for (var i = 0; i < word.length; i++) {
    wordParts.push(word.substr(i, i + 1).substr(0,1));
  }
  console.log(wordParts);
}

function check(input, pos) {
  var isInWord = false;
  if (wordParts[pos] == input) {
    return "red";
  } else {
    for (var i = 0; i < wordParts.length; i++) {
      if (wordParts[i] == input) {
        isInWord = true;
      }
    }
    if (isInWord) {
      return "yellow";
    } else {
      return "";
    }
  }
}

function checkRow() {
  switch(index) {
    case 0:
        document.getElementById('input1').style.backgroundColor = check(document.getElementById('input1').value, 1);
        document.getElementById('input2').style.backgroundColor = check(document.getElementById('input2').value, 2);
        document.getElementById('input3').style.backgroundColor = check(document.getElementById('input3').value, 3);
        document.getElementById('input4').style.backgroundColor = check(document.getElementById('input4').value, 4);
        winCheck(1, 4);
        break;
    case 1:
        document.getElementById('input6').style.backgroundColor = check(document.getElementById('input6').value, 1);
        document.getElementById('input7').style.backgroundColor = check(document.getElementById('input7').value, 2);
        document.getElementById('input8').style.backgroundColor = check(document.getElementById('input8').value, 3);
        document.getElementById('input9').style.backgroundColor = check(document.getElementById('input9').value, 4);
        winCheck(6, 9);
        break;
    case 2:
        document.getElementById('input11').style.backgroundColor = check(document.getElementById('input11').value, 1);
        document.getElementById('input12').style.backgroundColor = check(document.getElementById('input12').value, 2);
        document.getElementById('input13').style.backgroundColor = check(document.getElementById('input13').value, 3);
        document.getElementById('input14').style.backgroundColor = check(document.getElementById('input14').value, 4);
        winCheck(11, 14);
        break;
    case 3:
        document.getElementById('input16').style.backgroundColor = check(document.getElementById('input16').value, 1);
        document.getElementById('input17').style.backgroundColor = check(document.getElementById('input17').value, 2);
        document.getElementById('input18').style.backgroundColor = check(document.getElementById('input18').value, 3);
        document.getElementById('input19').style.backgroundColor = check(document.getElementById('input19').value, 4);
        winCheck(16, 19);
        break;
    case 4:
        document.getElementById('input21').style.backgroundColor = check(document.getElementById('input21').value, 1);
        document.getElementById('input22').style.backgroundColor = check(document.getElementById('input22').value, 2);
        document.getElementById('input23').style.backgroundColor = check(document.getElementById('input23').value, 3);
        document.getElementById('input24').style.backgroundColor = check(document.getElementById('input24').value, 4);
        winCheck(21, 24);
        break;
    default:
        alert("ERROR");
  }
  index++;
}

function winCheck(min, max) {
  if (index >= 4) {
    var hasLost = false;
    for (var i = min; i < max; i++) {
      if (document.getElementById('input'+i).style.backgroundColor != "red") {
        hasLost = true;
      }
    }
    if (!hasLost) {
      alert('yay');
    } else {
      document.getElementById('answer0').value = wordParts[0];
      document.getElementById('answer1').value = wordParts[1];
      document.getElementById('answer2').value = wordParts[2];
      document.getElementById('answer3').value = wordParts[3];
      document.getElementById('answer4').value = wordParts[4];
      setTimeout(function(){
        if (window.confirm('You lost!'))
        {
          setTimeout(function(){ location.reload(); }, 1500);
        } else {
          setTimeout(function(){ location.reload(); }, 1500);
        }
      }, 1500);
    }
  } else {
    var hasLost = false;
    for (var i = min; i < max; i++) {
      if (document.getElementById('input'+i).style.backgroundColor != "red") {
        hasLost = true;
      }
    }
    if (!hasLost) {
      if (window.confirm('You won!'))
      {
          setTimeout(function(){ location.reload(); }, 500);
      }
    }
  }
}

if (index >= 1 || index >= 2 || index >= 3 || index >= 4) {
  for (var i = min; i < max; i++) {
    if (document.input.style.backgroundColor = "red") {
      document.input.setAttribute("disabled", "disabled");
    }
  }
}

function rowCheck() {
  var hasChecked = false;
  if (index == 0) {
    for (var i = 1; i < 5; i++){
      if (document.getElementById('input'+i).value == "") {
        hasChecked = true;
      }
    }
    if (!hasChecked) {
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

function autotab(current,to){
    var elem = document.getElementById("input" + to);
    if (current.value.length <= current.getAttribute("maxlength")) {
        elem.focus();
    }
}
