const inputHolder = document.getElementById("inputHolder");
const audioClip = document.getElementById("audioClip");

var word = "";
var index = 0;
var parts = [];
var letters = [];

window.onload = function(){
    init();
}

function init(){
    parts = words[Math.floor(Math.random() * words.length)];
    generateInputs();
    console.log("WORD: " + parts);
}

function autotab(current,to){
    if (current.value.length <= current.getAttribute("maxlength")) {
        to.focus();
    }
}

function generateInputs(){
    for(var i = 0; i < 25; i++){
        if(i < 24){
            if(i == 4 || i == 9 || i == 14 || i == 19){
                inputHolder.innerHTML += "<input type='text' name='A1' maxlength='1' onKeyup='autotab(this, document.getElementById(" + (i+2) + "))' id='" + i + "' onchange='checkRow()'><br />";
            }else{
                inputHolder.innerHTML += "<input type='text' name='A1' maxlength='1' onKeyup='autotab(this, document.getElementById(" + (i+1) + "))' id='" + i + "' onchange='checkRow()'>";
            }
        }else{
            inputHolder.innerHTML += "<input type='text' name='A1' maxlength='1' id='" + i + "' onchange='checkRow()' onKeyup='this.blur();'>";
        }
    }
    setValues();
}

function setValues(){
    for (var i = 0; i < 24; i++) {
        if (i == 0 || i == 5 || i == 10 || i == 15 || i == 20) {
            document.getElementById(i).disabled = true;
        }
    }
    document.getElementById(index).value = getFirst();
}

function checkRow(){
    var count = 0;
    var hasEmpty = false;
    switch(index) {
        case 0:
            if(!checkEmpty(0, 5)){
                index++;
                setColor(0, 5, 5);
                checkWin(0, 5);
            }
            break;
        case 1:
            if(!checkEmpty(5, 10)){
                index++;
                setColor(5, 10, 10);
                checkWin(5, 10);
            }
            break;
        case 2:
            if(!checkEmpty(10, 15)){
                index++;
                setColor(10, 15, 15);
                checkWin(10, 15);
            }
            break;
        case 3:
            if(!checkEmpty(15, 20)){
                index++;
                setColor(15, 20, 20);
                checkWin(15, 20);
            }
            break;
        case 4:
            if(!checkEmpty(20, 25)){
                index++;
                setColor(20, 25, 25);
                checkWin(20, 25);
            }
            break;
        default:
            alert("ERROR");
    }
}

function setColor(min, max, skipexeption){
    letters = Object.assign({}, parts);
    if(skipexeption < 25){
        document.getElementById(skipexeption).value = getFirst();
    } 
    getColorRed(min, max, skipexeption);
}

function getColorRed(min, max, skipexeption){
    document.getElementById(min).style.backgroundColor = "red";
    delete letters[0];
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
            for (var o = 0; o < 5; o++) {
                if (document.getElementById(i).style.backgroundColor == "" && document.getElementById(i).value == letters[o]){
                    document.getElementById(i).style.backgroundColor = "yellow";
                    delete letters[o];
                }
            }
        }
    }
}

function checkEmpty(min, max){
    var hasEmpty = false;
    for(var i = min; i < max; i++){
        if(document.getElementById(i).value == ''){ 
            hasEmpty = true;
        }
    }
    return hasEmpty;
}

function checkWin(min, max){
    var hasLost = false;
    for(var i = min; i < max; i++){
        if(document.getElementById(i).style.backgroundColor != "red"){
            hasLost = true;
        }
    }
    if(!hasLost){
        win();
    }else if(index >= 5){
        alert("u lost. the word was: " + parts);
        location.reload();
    }
}

function win(){
    alert("u won. the word was: " + parts);
    location.reload();
}

function getFirst(){
    return parts[0];
}