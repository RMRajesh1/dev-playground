let FILEDS = 9;
let star = '&#11088;';
let star_icon = '⭐';
let round = '&#11093;';
let round_icon = '⭕';
let filled = 0;
let match_count = 1;
let user_score = 0;
let cpu_score = 0
let time = 30;
let result = "Who won the match?";
let turn = "Enjoy the game!";
let shown = false;
let random = false;
let is_draw = true;
let ts, n1, n2, n3, ele;
let conditionArr = [[0,1,2], [3,4,5], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6], [6,7,8]];
let possibilitiesArr = [[0,1,2], [0,2,1], [1,2,0], [1,0,2], [2,1,0], [2,0,1]];



function startGame(){
    display("TheEnd", "none");
    opacity("beginSec", 0);
    setTimeout(display, 200, "beginSec", "none");
    setTimeout(opacity, 200, "container", 1);
    display("container", "flex");
    display("btns", "flex");
    playAgain();
}

function playAgain(){
    insertField();
    filled = 0;
    time = 30;
    turn = "New game!";
    shown = false;
    clearTimeout(ts);
    timer();
    check();
    updateData();
    display("fields", "flex");
    display("turns", "block");
    opacity("fields", 1);
    display("resultBox", "none");
    turn = "Your 🤟 turn";
    setTimeout(updateData, 500);
}

function insertField(){
    _("fields").innerHTML = '';
    for(let i = 0; i < FILEDS; i++){
        _("fields").innerHTML += '<div class="fieldBoxes" id="box'+i+'" onclick="clickBox(this)"></div>';
    }
}

function clickBox(ele){
    if (ele.innerHTML == ""){
        _("audio3").play();
        ele.innerHTML = star;
        filled++;
        turn = "CPU 🖥 turn";
        check();
        fieldState('disable');
        setTimeout(function(){
            if (!shown){
                setTimeout(cpuTurn, 1000);
            }
        }, 200);
    }
    updateData();
}


function cpuTurn(){
    random = true;
    if (filled<9){
        AImove();
    }
    if (random){
        while(filled<9){
            let ele = 'box'+rand(FILEDS-1);
            if (_(ele).innerHTML == ""){
                _("audio4").play();
                _(ele).innerHTML = round;
                filled++;
                turn = "Your 🤟 turn";
                console.log("By Random");
                break;
            }
        }
    }
    check();
    fieldState('active');
    updateData();
}

function fieldState(state){
    for (let i = 0; i < FILEDS; i++){
        if (state=="active"){
            _("box"+i).setAttribute("onclick", "clickBox(this)");
        }
        else if(state=="disable"){
            _("box"+i).removeAttribute("onclick");
        }
    }
}

function timer(){
    _("audio2").play();
    time--;
    updateData();
    ts = setTimeout(timer, 1000);
    if (time==0){
        clearTimeout(ts);
        fieldState("disable");
        result = "⏰ Time ⏲ Up ⏱";
        shown = true;
        showResult();
    }
}

function newGame(){
    location.reload();
}

function updateData(){
    _("user_score").innerText = user_score;
    _("timer").innerText = time;
    _("cpu_score").innerText = cpu_score;
    _("turns").innerText = turn;
    _("matchCount").innerText = match_count; 
}

function setColorsWon(x, y, z){
    _("box"+x).style.backgroundColor = "green";
    _("box"+y).style.backgroundColor = "green";
    _("box"+z).style.backgroundColor = "green";
    updateData();
    fieldState("disable");
    setTimeout(showResult, 900);
}

function userWins(x, y, z){
    _("audio5").play();
    scale("userScoreLabel", 1.1);
    shown = true;
    user_score++;
    turn = "You won";
    result = "🎊 You 🎀 won the 🎁 match! 🎉";
    setColorsWon(x, y, z);
    setTimeout(scale, 500, "userScoreLabel", 1);
}

function cpuWins(x, y, z){
    _("audio6").play();
    scale("cpuScoreLabel", 1.1);
    shown = true;
    cpu_score++;
    turn = "CPU won";
    result = "🖲 Computer 💻 won the 🖱 match ⌨";  // 🚩
    setColorsWon(x, y, z);
    setTimeout(scale, 500, "cpuScoreLabel", 1);
}

function matchDraw(){
    shown = true;
    result = "📏 Match Draw ⚖ <br>🎌";
    turn = "🛎 Match 📢 over 🏴 ";
    fieldState("disable");
    setTimeout(showResult, 900);
}

function showResult(){
    display("turns", "none");
    display("fields", "none");
    _("resultBox").innerHTML = result;
    updateData();
    clearTimeout(ts);
    display("resultBox", "flex");
    _("audio1").play();
    setTimeout(opacity, 10, "fields", 0.5);
    setTimeout(greyScale, 10, "fields", 70)
    setTimeout(opacity, 11, "resultBox", 1);
    setTimeout(askToPlay, 3000);
}

function askToPlay(){
    result = 'Do you want to continue?<br><button id="continue" class="btn" onclick="playAgain()"><u>Y</u>es</button><button id="endGame" class="btn" onclick="theEnd()"><u>N</u>o</button>';
    _("resultBox").innerHTML = result;
    match_count++;
}

function theEnd(){
    opacity("container", 0);
    setTimeout(display, 200, "btns", "none");
    setTimeout(display, 200, "container", "none");
    setTimeout(display, 200, "TheEnd", "flex");
    setTimeout(opacity, 205, "TheEnd", 1);
}
function keyEvents(key){
    if (key.keyCode==13 && turn == "Enjoy the game!"){
        startGame();  // Enter
    }
    if (key.keyCode==89 && shown==true){
        playAgain();  // yes
    }
    if (key.keyCode==78 && shown==true){
        theEnd();  // No
    }
}


// helper functions
function scale(ele, size){
    _(ele).style.transform = "scale("+size+")";
}
function greyScale(ele, percent){
    _(ele).style.filter = "greyscale("+percent+"%)";
}
function setBg(ele, color){
    _(ele).style.backgroundColor = color;
}
function opacity(ele, value){
    _(ele).style.opacity = value;
}
function display(ele, value){
    _(ele).style.display = value;
}
function rand(range){
    return Math.round(Math.random() * range);
}
function _(name){
    return document.getElementById(name);
}

// conditions :-
function check(){
	is_draw = true;
    if (is_draw){
        for (let i = 0; i < conditionArr.length; i++){
            checkIfCPUwins(i);
            if (!is_draw){break;}
        }
    }
    if (is_draw){
        for (let i = 0; i < conditionArr.length; i++){
            checkIfUserWins(i);
            if (!is_draw){break;}
        }
    }
    // check is the match draw?
    if(filled==9 && is_draw){
        matchDraw();
    }
}

// check userWins condions
function checkIfUserWins(i){
    let eleBox = conditionArr[i];
    if(
        (_("box"+eleBox[0]).innerHTML==star_icon) &&
        (_("box"+eleBox[1]).innerHTML==star_icon) &&
        (_("box"+eleBox[2]).innerHTML==star_icon)
    ){
        is_draw = false;
        userWins(eleBox[0], eleBox[1], eleBox[2]);
    }
}

// check cpuWins condions
function checkIfCPUwins(i){
    let eleBox = conditionArr[i];
    if(
        (_("box"+eleBox[0]).innerHTML==round_icon) &&
        (_("box"+eleBox[1]).innerHTML==round_icon) &&
        (_("box"+eleBox[2]).innerHTML==round_icon)
    ){
        fieldState("disable");
        is_draw = false;
        cpuWins(eleBox[0], eleBox[1], eleBox[2]);
    }
}

function AImove(){
    // to win (CPU)
    if (random){
        for(let i = 0; i < conditionArr.length; i++){
            ele = conditionArr[i];
            if (random){
                attempt(toWin);
            }
            if(!random){break;}
        }
    }
    // to defeat (CPU)
    if (random){
        for(let i = 0; i < conditionArr.length; i++){
            ele = conditionArr[i];
            if (random){
                attempt(toDefeat);
            }
            if(!random){break;}
        }
    }
}

function attempt(funct){
    for(let j = 0; j < possibilitiesArr.length; j++){
        n1 = possibilitiesArr[j][0];
        n2 = possibilitiesArr[j][1];
        n3 = possibilitiesArr[j][2];
        funct();
        if(!random){
            random = false;
            filled++;
            turn = "Your 🤟 turn";
            break;
        }
    }
}

function toWin(){
    // move to win CPU
    if(
        (_("box"+ele[n1]).innerHTML==round_icon) &&
        (_("box"+ele[n2]).innerHTML==round_icon)
    ){
        if (_("box"+ele[n3]).innerHTML == ""){
            _("audio4").play();
            _("box"+ele[n3]).innerHTML = round;;
            random = false;
        }
    }
}

function toDefeat(){
    // move to defeat user
    if(
        (_("box"+ele[n1]).innerHTML==star_icon) &&
        (_("box"+ele[n2]).innerHTML==star_icon)
    ){
        if (_("box"+ele[n3]).innerHTML == ""){
            _("audio4").play();
            _("box"+ele[n3]).innerHTML = round;
            random = false;
        }
    }
}