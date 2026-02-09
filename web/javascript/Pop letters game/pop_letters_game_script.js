let space = _(".page");
const starSize = 100;
let width, height, leftPos, star, randomLetter, textNode, t, ts, tm, rst, current_star, condition;
let starsArr, level, score, time, target, speed, count, msg, restartTime, stop;// = space.getElementsByClassName("boxes");
let source = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const COLOR = ['Blue', 'Brown', 'DarkOrange', 'DarkGrey', 'OrangeRed', 'YellowGreen', 'Violet', 'Turquoise', 'SeaShell', 'Peru', 'LimeGreen', 'Maroon', 'Linen', 'Crimson', 'Azure', 'Bisque', 'CadetBlue', 'Coral', 'Cyan', 'CornflowerBlue', 'ForestGreen', 'Gainsboro', 'Fuchsia', 'Aqua'];//["red", "green", "blue"];
let easy = 1500, medium = 1000, hard = 500, extreme = 200;
let audios = document.querySelectorAll(".audios > audio");


function startGame(){
	newGame();
	_(".intro").remove();
	display(".page", "flex");
	addingEventListeners();
	checkMediaQuery();
}
function newGame(){
	if (level==undefined){
		setLevel(1);
	}
	console.log("New game...!");
	clearFunct();
	updateData();
	timer();
	time = 100;
	stop = false;
	count = 0;
	score = 0;
	restartTime = 0;
	generateStars();
	window.addEventListener("keydown", function(event){popStar(event);});
	_(".result").classList.remove("zoomView");
	audios[0].play();
}
function generateStars(){
	// datas
	width = window.innerWidth;
	height = window.innerHeight;
	randomLetter = source[rand(source.length-1)];
	// create a star with random letters;
	star = document.createElement("div");
	star.classList.add("boxes");
	star.classList.add("popBox");
	textNode = document.createTextNode(randomLetter);
	star.appendChild(textNode);
	star.style.backgroundColor = COLOR[rand(COLOR.length-1)];
	space.appendChild(star);
	// update in the array
	starsArr = space.querySelectorAll(".boxes");
	// setting random position
	current_star = starsArr[starsArr.length-1];
	current_star.style.left = rand(width-starSize)+"px";
	moveStar(current_star);
	// recursion
	if (!stop){
		ts = setTimeout(generateStars, speed);
	}
}
function moveStar(ele){
	updateData();
	condition = (ele.offsetTop)<(height - (starSize+10));
	if (condition){
		ele.style.top = (ele.offsetTop+3)+"px";
		tm = setTimeout(moveStar, 20, ele);
	}
	else{
		ele.remove();
	}
}
function timer(){
	if (time <= 0){
		clearTimeout(t);
		msg = "Time Up!";
		goToNextLevel();
	}
	else{
		time--;
		t = setTimeout(timer, 1000);
	}
}
function restartTimer(){
	if (restartTime > 0){
		audios[3].volume = 1.0;
		audios[3].play();
		restartTime--;
		_(".restartTimer").innerText = restartTime;
		rst = setTimeout(restartTimer, 1000);
	}
	else{
		clearTimeout(rst);
		newGame();
	}
}
function popStar(event){
	let keyName = (event.key).toUpperCase();
	for (let i = 0; i < starsArr.length; i++){
		if (starsArr[i].innerText == keyName){
			starsArr[i].remove();
			audios[1].play();
			count++;
			score++;
			break;
		}
	}
}
function setLevel(n){
	score = 0; time = 100;
	if (n==1){speed = easy; target = "150"; level = "Easy";}
	else if (n==2){speed = medium; target = "250"; level = "Medium";}
	else if (n==3){speed = hard; target = "350"; level = "Hard";}
	else if (n==4){speed = extreme; target = "500"; level = "Extreme";}
	clearPage();
	console.log("level switched...");
}
function updateData(){
	_(".time").querySelector("span").innerText = time;
	_(".level").querySelector("span").innerText = level;
	_(".score").querySelector("span").innerText = score;
	_(".target").querySelector("span").innerText = target;
	if (target <= count){
		console.log("Level pass");
		msg = "Excellent!\nYou won";
		audios[2].play();
		goToNextLevel();
	}
}
function goToNextLevel(){
	window.removeEventListener("keydown", function(event){popStar(event);});
	clearFunct();
	setTimeout(clearPage, (speed+5));
	count = 0;
	stop = true;
	restartTime = 10;
	_(".msg").innerText = msg;
	_("#score").innerText = score;
	_(".result").classList.add("zoomView");
	setTimeout(restartTimer, 1000);
}
function clearFunct(){
	clearPage();
	clearTimeout(t);
	clearTimeout(ts);
	clearTimeout(tm);
	clearTimeout(rst);
}
function clearPage(){
	starsArr = document.querySelectorAll(".boxes");
	for (let i = 0; i < starsArr.length; i++){
		starsArr[i].remove();
	}
}
function notificationBox(){
	if (_(".notificationBox").style.display!="none"){
		display(".notificationBox", "none");
		_(".notificationBox").style.left = "-15%";
	}
	else{
		display(".notificationBox", "flex");
		_(".notificationBox").style.left = 0;
	}
}
function levelBox(){
	if (_(".btnBox").style.display!="none"){
		display(".btnBox", "none");
		_(".btnBox").style.right = "-15%";
	}
	else{
		display(".btnBox", "flex");
		_(".btnBox").style.right = 0;
	}
}

addingEventListeners();

function addingEventListeners(){
	_(".easy").addEventListener("click", function(){setLevel(1);});
	_(".medium").addEventListener("click", function(){setLevel(2);});
	_(".hard").addEventListener("click", function(){setLevel(3);});
	_(".extreme").addEventListener("click", function(){setLevel(4);});
	_(".left").addEventListener("click", notificationBox);
	_(".right").addEventListener("click", levelBox);
	_(".playAgain").addEventListener("click", newGame);
	_("#playAgain").addEventListener("click", newGame);
}
function checkMediaQuery(){
	let x = window.matchMedia("(max-width: 700px)")
	if (x.matches){
		addOnclickTostars();
	}
}
function addOnclickTostars(){
	starsArr = document.querySelectorAll(".boxes");
	for (let i = 0; i < starsArr.length; i++){
		starsArr[i].addEventListener("click", clickedMe);
		starsArr[i].style.cursor = "pointer";
	}
	setTimeout(addOnclickTostars, 10);
}
function clickedMe(){
	console.log();
	this.remove();
	audios[1].play();
	score++;
	count++;
}

function display(ele, state){_(ele).style.display = state;}
function rand(range){return Math.round(Math.random() * range);}
function _(name){return document.querySelector(name);}