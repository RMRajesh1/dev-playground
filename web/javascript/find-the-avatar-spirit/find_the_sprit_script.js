const TARGET = "vattu.gif";
const AVATAR = "Avatar_Aang.jpg";
const PICURES = ["Aang.jpg", "Aang2.jpg", "Aang3.jpg", "AangihPet.jpg", "AangOnBison.jpg", "aangWithMaster.png", "aangWithMaster2.png", "AangWithPet2.jpg", TARGET, "AvatarTeam.webp", "AangFly.jpg", "AangFuture.webp"];
const DOORPIC = "pngegg.png";
const GROUND = _(".playground");
const BOXDIVS = __(".boxes > div");
const SCOREBOX = _path(BOXDIVS[0], "b");
const REMAINSBOX = _path(BOXDIVS[1], "b");
const HIGHSCOREBOX = _path(BOXDIVS[2], "b");
const TIMEBOX = _path(BOXDIVS[3], "b");
const SIZE = PICURES.length;
const IMG = _("img");
const AUDIOS = _path_(_("#audios"), "audio");

let countBox = 0;
let time = 60;
let shuffled;
let score, remains;
let highScore = 0;
let t, ts;
let points = 10;
let result1, result2, pic;



let createRooms = function(){
	switchLayout(GROUND, "grid");
	shuffled = shuffle(PICURES);
	let content = document.createDocumentFragment();;
	for (let i = 0; i < SIZE; i++){
		let page = makeEle("div");	// '<div class="rooms">'+i+'</div>'; // makeEle("div");
		let page1 = makeEle("div");
		let img1 = makeEle("img");

		img1.setAttribute("src", DOORPIC);
		if (shuffled[i] == TARGET){
			page1.classList.add("found");
		}
		setBgImg(page, shuffled[i]);

		page1.appendChild(img1);
		page.appendChild(page1);

		img1.classList.add("imgs");
		page1.classList.add("front");
		page.classList.add("rooms");

		content.appendChild(page);
	}	
	return content;
}

let createResult = function(){
	GROUND.innerHTML = "";
	switchLayout(GROUND, "flex");
	GROUND.classList.remove("zoomOut");
	GROUND.classList.add("zoomIn");

	let btn = makeEle("BUTTON");
	let btnText = makeText("Click to new game!");
	btn.appendChild(btnText);
	btn.addEventListener("click", checkClick);

	let img = makeEle("IMG");
	img.setAttribute("src", pic);

	let h1 = makeEle("h1");
	let h1Text = makeText(result2);
	h1.appendChild(h1Text);

	let h2 = makeEle("h2");
	let h2Text = makeText(result1);
	h2.appendChild(h2Text);

	let childsArr = [h2, h1, img, btn];
	appendElements(GROUND, childsArr);
}

let appendElements = function(parent, childs){
	for (let i = 0; i < childs.length; i++){
		parent.appendChild(childs[i]);
	}
}

let stopAudios = function(){
	for (let i = 0; i < AUDIOS.length; i++){
		AUDIOS[i].pause();
		AUDIOS[i].currentTime = 0;
	}
}

let newGame = function(){
	time = 60;
	score = 0;
	points = 0;
	countBox = 0;
	remains = 12;
	GROUND.innerHTML = "";
	GROUND.appendChild(createRooms());
	clearTimeout(ts);
	timer();
	document.addEventListener("click", checkClick);
	updateData();
	stopAudios();
	setTimeout(function(){AUDIOS[0].play();}, 1500);
}

// GROUND.innerHTML = createRooms();

let timer = function(){
	TIMEBOX.innerText = time;
	time--;
	if (time < 0){
		clearTimeout(ts);
		tellResult(false);
	}
	else{ts = setTimeout(timer, 1000);}
}

let updateData = function(){
	score += points;
	if (score > highScore){
		highScore = score;
	}
	SCOREBOX.innerText = score;
	HIGHSCOREBOX.innerText = highScore;
	REMAINSBOX.innerText = (remains-countBox);
	points = 10;
}

let tellResult = function(bool){
	document.removeEventListener("click", checkClick);
	clearTimeout(ts);
	stopAudios();
	if (bool){
		pic = AVATAR;
		result1 = "Avatar arrived";
		result2 = "We won in the battle";
		AUDIOS[2].play();
	}
	else{
		pic = TARGET;
		result1 = "Vattu arrived";
		result2 = "We lost in the battle";
		AUDIOS[1].play();
	}
	setTimeout(function(){
		GROUND.classList.remove("zoomIn");
		GROUND.classList.add("zoomOut");
	}, 1000);
	setTimeout(function(){
		switchLayout(GROUND, "flex");
		createResult();
	}, 1400);
}


let checkClick = function(e){
	let tar = e.target;
	let check = tar.classList;
	let parent = tar.parentNode.classList;
	if (check.contains("imgs")){

		parent.add("zoomOut");

		if (parent.contains("found")){
			console.log("Mattikichii ppa");
			check.add("red");
			tellResult(false);
			check = false;
		}
		else{
			check.add("green");
		}
		countBox++;
		updateData();
	}
	if (countBox==(SIZE-1) && check){
		tellResult(true);
	}
}


let checkBtns = function(e){
	let tar = e.target;
	let check = tar.classList;
	if (check.contains("newGame")){
		newGame();
		console.log("New game!");
	}
	else if (check.contains("restart")){
		document.location.reload();
		console.log("Restart game!");
	}
	else if(check.length == 0){
		newGame();
	}
}

document.addEventListener("click", checkBtns);