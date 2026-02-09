const GROUND = _("#play_ground");
const SOURCE = [
{img: "ash_pikachu.png", name: "ASK-PIKACHU"},
{img: "bulbazar.png", name: "BULBAZAR"},
{img: "butterfree.png", name: "BUTTERFREE"},
{img: "charmander.png", name: "CHARMANDAR"},
{img: "dragonair.png", name: "DRAGONAIR"},
{img: "phanpy.png", name: "PHANPY"},
{img: "pokeball.png", name: "POKEBALL"},
{img: "squirtle.png", name: "SQUIRTLE"},
{img: "mew.png", name: "MEW"},
{img: "pokemon-pikachu.png", name: "PIKACHU"}
];
const THINKING = ["pngegg.png", "pngegg(1).png", "pngegg(3).png"];
// {img: "MonPle.png", name: "MONPLEE"},
// {img: "charizard.png", name: "CHARIZARD"},
// {img: "tototile.png", name: "TOTOTILE"},
// {img: "buizel2.png", name: "BUIZEL"},
// {img: "buizel.jpeg", name: "BUIZEL"},
// {img: "canapee.jpg", name: "CANAPEE"},
// {img: "", name: ""}
//const THINKING = ["thinking.png", "thinking1.png", "thinking2.png", "thinking3.png"];

let shuffled = [];
let flip_refer = [];
let foundBoxes = [];
let scoreBox = _("#score");
let chancesBox = _("#chance");
let timeBox = _("#time");
let copies = 2;
let isMatchFound = false;
let score, chances, time, ts;
let boxes, draft, result;
let box_classes;
let showData = '<p id="result">You Won!</p><p>Your score : <span id="scoreResult">0</span></p><p>Attempts : <span id="chancesResult">0</span></p><p>Time taken : <span id="timeResult">0</span></p><p onclick="newGame()">Click to new Game!</p>';



function newGame(){
	time = 100;
	score = chances = 0;
	isMatchFound = false;
	insertBoxes(SOURCE.length);
	clearTimeout(ts);
	update();
	timer();
}
function insertBoxes(n){
	boxes = "";
	GROUND.innerHTML = "";
	for (let i=0; i<copies; i++){
		shuffled = shuffle(SOURCE.slice());
		console.log(SOURCE.length);
		console.log(shuffled.length);
		appendBox(n);
	}
}
function timer(){
	time--;
	timeBox.innerText = time;
	if (time<=0){
		gameOver();
		clearTimeout(ts);
	}else{
		ts = setTimeout(timer, 1000);
	}
}
function appendBox(n){
	for (let i=0; i<n; i++){
		boxes += '<div onclick="flipMe(this)" class="flip_boxes"><div class="front page"><img src="'+THINKING[0]+'" class="thinking"></div><div class="back page"><img src="./pokemons/'+shuffled[i].img+'" class="flip_imgs"><h3>'+shuffled[i].name+'</h3></div></div>';
		GROUND.innerHTML = boxes;
	}
	box_classes = GROUND.querySelectorAll(".flip_boxes");
}
function update(){
	chancesBox.innerText = chances;
	scoreBox.innerText = score;
}
function flipMe(ele){
	if (draft!=ele){
		draft = ele;
		flip_refer.push(ele);
		ele.classList.add("active");
	}
	if (flip_refer.length>=2){
		remove_onclick();
		checkMatch();
		setTimeout(removeFlip, 1500);
	}
}

function checkMatch(){
	let option1 = flip_refer[0].querySelector("h3").innerText;
	let option2 = flip_refer[1].querySelector("h3").innerText;
	chances++;
	if (option1==option2){
		score++;
		for (let i = 0; i < flip_refer.length; i++){
			flip_refer[i].querySelector(".back").style.backgroundColor = "green"; //.querySelector("img").src = THINKING[1];
			flip_refer[i].removeAttribute("onclick");
			foundBoxes.push(flip_refer[i]);
		}
		setTimeout(function(){
			for (let i = 0; i < flip_refer.length; i++){
				flip_refer[i].querySelector(".front").querySelector("img").src = THINKING[2];
			}
		}, 1000);
	}
	update();
	if (score==shuffled.length){
		setTimeout(won, 4000);
	}
}

function removeFlip(){
	for (let i = 0; i < flip_refer.length; i++){
		flip_refer[i].classList.remove("active");
	}
	flip_refer = [];
	add_onclick();
}
function remove_onclick(){
	for (let i = 0; i < box_classes.length; i++){
		box_classes[i].removeAttribute("onclick");
	}
}
function add_onclick(){
	// yet to do...
	for (let i = 0; i < box_classes.length; i++){
		if (!foundBoxes.includes(box_classes[i])){
			box_classes[i].setAttribute("onclick", "flipMe(this)");
		}
	}
}
function won(){
	// yet to do...
	remove_onclick();
	result = "You won!";
	showResult();
}
function gameOver(){
	// yet to do...
	remove_onclick();
	result = "Time up!"
	showResult();
}
function showResult(){
	GROUND.innerHTML = showData;
	_("#result").innerHTML = result;
	_("#scoreResult").innerText = score;
	_("#chancesResult").innerText = chances;
	_("#timeResult").innerText = time;

}
function restart(){
	location.reload(true);
}

// shuffle :-
function shuffle(data){
  	let shuffled = []; let temp = []; 
  	let l = (data.length)-1; let i = 0;
  	while (shuffled.length<=l){
    	let n = rand(l);
    	if (!temp.includes(n)){shuffled[i] = data[n]; i++}
    	temp.push(n);
  	}
  	if (shuffled==data){shuffle(data)}
  	return shuffled;
}

// Helper functions
function rand(range){
	return Math.round(Math.random() * range);
}
function _(name){
	return document.querySelector(name);
}