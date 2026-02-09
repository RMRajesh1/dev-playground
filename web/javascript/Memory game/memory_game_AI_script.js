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

let shuffled = [];
let flip_refer = [];
let foundBoxes = [];
let AI_data = [];

let scoreBox = _("#score");
let chancesBox = _("#chance");
let timeBox = _("#time");

let copies = 2;
let score, chances, time, ts;
let boxes, draft, result;
let box_classes;
let backPage1, h3_content1, backPage2, h3_content2, x, AI_ts, rs;
let showData = '<p id="result">You Won!</p><p>Your score : <span id="scoreResult">0</span></p><p>Attempts : <span id="chancesResult">0</span></p><p>Time taken : <span id="timeResult">0</span></p><p onclick="newGame()">Click to new Game!</p>';


function newGame(){
	shuffled = [];
	flip_refer = [];
	foundBoxes = [];
	AI_data = [];
	time = 100;
	score = chances = 0;
	insertBoxes(SOURCE.length);
	clearTimeout(ts);
	clearInterval(rs);
	update();
	timer();
}
function insertBoxes(n){
	boxes = "";
	GROUND.innerHTML = "";
	for (let i=0; i<copies; i++){
		shuffled = shuffle(SOURCE.slice());
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
	for (let i = 0; i < box_classes.length; i++){
		if (!foundBoxes.includes(box_classes[i])){
			box_classes[i].setAttribute("onclick", "flipMe(this)");
		}
	}
}
function won(){
	remove_onclick();
	result = "You won!";
	showResult();
}
function gameOver(){
	remove_onclick();
	result = "Time up!"
	showResult();
}
function showResult(){
	clearTimeout(ts);
	GROUND.innerHTML = showData;
	_("#result").innerHTML = result;
	_("#scoreResult").innerText = score;
	_("#chancesResult").innerText = chances;
	_("#timeResult").innerText = (100-time)+"sec";

}
function restart(){
	location.reload(true);
}
function AI_play(){
	newGame();
	remove_onclick();
	x = 0;
	AI_data = GROUND.getElementsByClassName("flip_boxes");
	rs = setInterval(remove_onclick, 10);
	AI_ts = setTimeout(AI_helper, 2000);
}
function AI_helper(){
	if (x >= (AI_data.length/2)){
		clearTimeout(AI_ts);
		clearInterval(rs);
	}else{
		backPage1 = AI_data[x].querySelector(".back");
		h3_content1 = backPage1.querySelector("h3");
		for (let j = 0; j < AI_data.length; j++){
			if (x!=j){
				backPage2 = AI_data[j].querySelector(".back");
				h3_content2 = backPage2.querySelector("h3");
				if (h3_content1.innerText == h3_content2.innerText){
					flipMe(AI_data[x]);
					flipMe(AI_data[j]);
				}
			}
		}
		x++;  // increment
		AI_ts = setTimeout(AI_helper, 2000);
	}
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