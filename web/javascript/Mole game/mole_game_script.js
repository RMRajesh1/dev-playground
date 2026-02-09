let n = 15;
let mole = "mole";
let molePic = '<img src="mole2.png" class="mole" id="mole" onclick="beatMole(this)" />';
let box, r, randPlace, leftSpace, started;
let highScore = score = 0;
let level = 1000;
let show = "Easy";
randPlace = r = rand(n-1);

function getStartGame(){
	started = 1;
	startGame();
}
function startGame(){
	opacity("intro-sec", 0);
	setTimeout(display, 100, "intro-sec", "none");
	setTimeout(display, 100.5, "final-sec", "none");
	opacity("game-playGround", 1);
	setTimeout(display, 101, "game-playGround", "flex");
	_("coolMusic").play();
	score = highScore = 0;
	createHolls();
}
function createHolls(){
	_("ground").innerHTML = "";
	for (let i = 0; i < n; i++){
		_("ground").innerHTML += '<div class="holes" id="hole'+i+""+i+'"><span id="inner'+i+'"></span></div>';
	}
	chooseBox(); // choose the box to put the mole!
}
function chooseBox(){
	r = rand(n-1);
	while(r == randPlace){r = rand(n-1);}
	randPlace = r;
	set_mole();
}
function setLevel(speed){
	_("click").play();
	level = speed;
	_("coolMusic").play();
	if (speed==1000){show="E";}
	else if (speed==500 || score>=30){show="M";}
	else if (speed==100 || score>=50){show="H";}
	score = highScore = 0;
	_("showLevel").innerText = show;
}
function set_mole(){
	box = "inner"+randPlace;
	_(box).innerHTML = molePic;
	_(mole).style.transform = "translateY(10%)";
	setTimeout(moveUp_mole, 300);
}
function moveUp_mole(){
	display(mole, "block")
	_(mole).style.transform = "translateY(10%)";
	setTimeout(moveDown_mole, level);
}
function moveDown_mole(){
	_(mole).style.transform = "translateY(40%)";
	_(box).innerHTML = "";
	setTimeout(chooseBox, 100);
}
function beatMole(ele){
	_("beatSound").play();
	if (ele.offsetLeft != leftSpace){
		score += 1;
		if (highScore<score){
			highScore = score;
		}
	}
	leftSpace = ele.offsetLeft;
	_("score").innerText = score;
	_("higheScore").innerText = highScore;
	ele.style.transform = "scale(0.8)";
	if (score==30 || score==50){setLevel(500);}
}
function reset(){
	score = 0;
	_("click").play();
	_("score").innerText = score;
}
function exited(){
	started = 0;
	_("setEndHighScore").innerText = highScore;
	opacity("game-playGround", 0);
	setTimeout(display, 100, "intro-sec", "none");
	setTimeout(display, 100.5, "game-playGround", "none");
	setTimeout(display, 101, "final-sec", "flex");
	opacity("final-sec", 1);
	_("coolMusic").play();
}
function keyBoardEvents(event){
	if (event.keyCode==13 && started==undefined){getStartGame();} // to start the game with enter key
	else if (event.keyCode==113 && started==1){_("quit").play(); exited();} // refers the "Q" key
	else if (event.keyCode==13 && started==0){restart();}  // to restart the game with enter key
}
function restart(){
	_("quit").play();
	setTimeout(function(){location.reload(true);}, 1000);
}

function opacity(ele, n){_(ele).style.opacity = n;}
function display(ele, value){_(ele).style.display = value;}
function _(name){return document.getElementById(name);}
function rand(range){return Math.round(Math.random() * range)}