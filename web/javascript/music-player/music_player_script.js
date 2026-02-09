const PAUSEICON = '<i class="fa fa-pause" aria-hidden="true"></i>';
const PLAYICON = '<i class="fa fa-play" aria-hidden="true"></i>';
const BGCOLORS = ["#ef233c", "#2b9348", "#4cc9f0"];


const SOURCE = [
	{title: "cheerful-people", music: "cheerful-people.ogg.ogv", screen: "img1.jpeg"},
	{title: "cosmic-funk", music: "cosmic-funk.ogg.ogv", screen: "img2.jpeg"},
	{title: "cyberpunk-planet", music: "cyberpunk-planet.ogg.ogv", screen: "img3.jpeg"},
	{title: "fighting-a-ghost", music: "fighting-a-ghost.ogg.ogv", screen: "img4.webp"},
	{title: "happy-up-here", music: "happy-up-here.ogg.ogv", screen: "img5.jpeg"},
	{title: "make-my-day", music: "make-my-day.ogg.ogv", screen: "img6.jpeg"},
	{title: "motivation-to-win", music: "motivation-to-win.ogg.ogv", screen: "img7.jpeg"},
	{title: "ocean-on-mars", music: "ocean-on-mars.ogg.ogv", screen: "img8.jpeg"},
	{title: "the-keep-on-moving", music: "the-keep-on-moving.ogg.ogv", screen: "img9.jpeg"},
	{title: "tropical-summer", music: "tropical-summer.ogg.ogv", screen: "img1.jpeg"},
	{title: "used-to-win", music: "used-to-win.ogg.ogv", screen: "img2.jpeg"},
	{title: "victory-at-any-cost", music: "victory-at-any-cost.ogg.ogv", screen: "img3.jpeg"},
	{title: "vintage-dance-shoes", music: "vintage-dance-shoes.ogg.ogv", screen: "img4.webp"},
	{title: "we-are-gonna-make-it", music: "we-are-gonna-make-it.ogg.ogv", screen: "img5.jpeg"},
	{title: "we-are-like-a-family", music: "we-are-like-a-family.ogg.ogv", screen: "img6.jpeg"}
];


const APP = document.getElementById("app");
const BOX = document.querySelector(".listBox");
const LIST = document.getElementById("lists");
const SLIDER = document.getElementById("rangeBar");
const SOUNDS = APP.querySelectorAll(".sound");

const CURRENT_TIME = document.querySelector(".start");
const DURATION = document.querySelector(".end");
const TITLE = document.querySelector(".trackTitle");
let controls = document.querySelector(".controlBox").querySelectorAll("i");
let track_img = document.querySelector(".homeDiv").querySelector("img");

let shown = false;
let playPause = false;	// false - pause; true - play;

let num = 0;
let len = SOURCE.length;

let vol = 0.8;
let audioArr;
let currentAudio;
let audiodDur;
let listOfElements;
let sec = 0;
let min = 0;



let appendMusic = function(){
	let temp = 0;
	for (let i = 0; i < len; i++){
		let audio = document.createElement("audio");
		audio.setAttribute("src", "musics/"+SOURCE[i].music);
		audio.setAttribute("id", "aud"+i);
		let li = document.createElement("li");
		li.setAttribute("class", "li-items");
		li.appendChild(audio);
		let p = document.createElement("p");
		p.setAttribute("class", "paras");
		let text = document.createTextNode(SOURCE[i].title);
		p.appendChild(text);
		li.appendChild(p);
		LIST.appendChild(li);
	}
	audioArr = LIST.querySelectorAll("audio");
	currentAudio = audioArr[0];
}

let formatTime = function(n){
	if (Number(n) < 10){ return "0"+n; }
	return n;
}

let highLight = function(n){
	listOfElements = LIST.querySelectorAll("li");
	for (let i = 0; i < listOfElements.length; i++){
		listOfElements[i].classList.remove("clickInset");
		listOfElements[i].classList.remove("highLight");
	}
	listOfElements[n].classList.add("clickInset");
	listOfElements[n].classList.add("highLight");
}

let scaleUpDown = function(indicate, ele){
	if (indicate){ ele.style.transform = "scale(1)"; }
	else{ ele.style.transform = "scale(0)"; }
}

let setVolume = function(setVol){
	if (currentAudio != undefined){
		if (setVol && vol<=0.9){
			vol = vol + 0.1;
			SOUNDS[0].style.transform = "scale(1.3)";
			SOUNDS[0].style.transform = "scale(1)";
		}
		else if(vol>=0.1){
			vol = vol - 0.1;
			SOUNDS[1].style.transform = "scale(1.3)";
			SOUNDS[1].style.transform = "scale(1)";
		}
	}
	currentAudio.volume = vol;
}

let nextPlay = function(n){
	if (n == -1 || n < 0){ num = audioArr.length-1; }
	else if (n == audioArr.length-1){ num = 0;}
	if (num >= 0 && num < audioArr.length){
		currentAudio = audioArr[num];
		min = sec = 0;
		SLIDER.value = 0; //currentAudio.currentTime;
		playAudio(currentAudio);
	}else{
		num = 0;
	}
	controls = document.querySelector(".controlBox").querySelectorAll("i");
	if (controls[1].classList.contains("fa-play")){
		controls[1].parentNode.innerHTML = PAUSEICON;
	}
}

let calculateTime = function(time){
	time = time.toFixed(0);
	if (time > 59){
		min = Math.floor(time / 60);
		time = time - (min * 60);
	}else{ min = 0; }
	sec = time;
	time = formatTime(min) + ":" + formatTime(sec);
	return time;
}

let playFunct = function(){
	let time = currentAudio.currentTime;
	SLIDER.value = time;
	if (time == currentAudio.duration){
		nextPlay(audioArr[num++]);
		sec = min = 0;
	}
	CURRENT_TIME.innerText = calculateTime(time);
}

let playAudio = function(ele){
	for(let i = 0; i < audioArr.length; i++){
		audioArr[i].pause();
		audioArr[i].removeEventListener("timeupdate", playFunct);
	}
	currentAudio = ele;
	currentAudio.play();
	audiodDur = currentAudio.duration;
	DURATION.innerText = Math.round(audiodDur / 60) + " min";
	SLIDER.setAttribute("max", audiodDur);
	currentAudio.addEventListener("timeupdate", playFunct);
	TITLE.innerText = SOURCE[num].title;
	track_img.src = "Nature_Images/"+SOURCE[num].screen;
	track_img.alt = SOURCE[num].title;
	highLight(num);

	controls[1].parentNode.innerHTML = PAUSEICON;
	controls = document.querySelector(".controlBox").querySelectorAll("i");
}

let pauseAudio = function(ele){
	ele.pause();
	controls[1].parentNode.innerHTML = PLAYICON;
	controls = document.querySelector(".controlBox").querySelectorAll("i");
}

let funct = function(e){
	let ele = e.target;
	let cls = ele.classList;
	if (cls.contains("menu")){
		if (shown){
			scaleUpDown(false, BOX);
			shown = false;
		}
		else{
			scaleUpDown(true, BOX);
			shown = true;
		}
	}
	if (cls.contains("fa-backward")){
		nextPlay(num--);
	}
	else if (cls.contains("fa-pause")){
		pauseAudio(currentAudio);
	}
	else if (cls.contains("fa-play")){
		playAudio(currentAudio);
	}
	else if (cls.contains("fa-forward")){
		nextPlay(num++);
	}
	else if (cls.contains("fa-volume-up")){
		setVolume(true);
		ele.parentNode.click();
	}
	else if (cls.contains("fa-volume-down")){
		setVolume(false);
		ele.parentNode.click();
	}

	else if (cls.contains("paras")){
		ele = ele.parentNode;
		cls = ele.classList;		
		let aud = ele.querySelector("audio");
		num = Number(aud.getAttribute("id").slice(3));
		playAudio(aud);
	}
}

let keyFunction = function(e){
	let key = e.key;
	if (key=="ArrowUp"){SOUNDS[0].querySelector("i").click();}
	else if (key=="ArrowDown"){SOUNDS[1].querySelector("i").click();}
	else if (key=="ArrowLeft"){controls[0].click();}
	else if (key=="ArrowRight"){controls[2].click();}
	else if (key=="Enter"){scaleUpDown(true, BOX);}
	else if (key=="Escape"){scaleUpDown(false, BOX);}
	else if (key==" "){
		let cls = controls[1].classList;
		if (cls.contains("fa-pause")){ pauseAudio(currentAudio); }
		else if (cls.contains("fa-play")){ playAudio(currentAudio); }
	}
	else if (key=="b" || key=="B"){
		document.body.classList.toggle("backgroundClass");
	}
}

let KeyUpEvents = function(e){
	let key = e.key;
	if (key==" "){
		e.preventDefault();
	}
}

let initialize = function(){
	TITLE.innerText = SOURCE[num].title;
	track_img.src = "Nature_Images/"+SOURCE[num].screen;
	track_img.alt = SOURCE[num].title;
	// setTimeout(function(){document.dispatchEvent(new KeyboardEvent('keydown',{'key':' '}));}, 1500);
}

let slideAudio = function(){
	let move = SLIDER.value;
	currentAudio.currentTime = move;
	if (controls[1].classList.contains("fa-pause")){
		pauseAudio(currentAudio);
	}else{
		playAudio(currentAudio);
	}
	playFunct();
}

document.addEventListener("click", funct, true);
document.addEventListener("keydown", keyFunction);
document.addEventListener("keyup", KeyUpEvents);
SLIDER.addEventListener("input", slideAudio);


let startApp = function(){
	appendMusic();
	SLIDER.value = 0;
	initialize();
}


window.onload = startApp();