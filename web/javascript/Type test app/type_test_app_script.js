let trySpansArr;
let nextText;
let textCount;
let showText;
let content;
let resultBool;
let accur;
let accurNum;
let time, t;
let ts, playAgainTs;
let listener = false;

// Helper function expressions
let _ = function(name){return document.querySelector(name);}
let __ = function(name){return document.querySelectorAll(name);}
let ___ = function(path, name){return _(path).querySelector(name);}
let ____ = function(path, name){return _(path).querySelectorAll(name);}
let rand = function(range){return Math.round(Math.random() * range);}
let opacity = function(ele, value){ele.style.opacity = value;}
let display = function(ele, value){ele.style.display = value;}
let grayscale = function(ele, value){ele.style.filter = "grayscale("+value+"%)";}
let setColor = function(ele, value){ele.style.color = value;}
let bgColor = function(ele, value){ele.style.backgroundColor = value;}


const NAVBTNS = __(".navBtns");
const SEC = __(".sec");


let restart = function(){document.location.reload()}
let newUser = function(){_("newUser").innerHTML = NEWUSER;}
let appendElements = function(data){
	let content = "";
	for (let j = 0; j < data.length; j++){
		content += '<span class="trySpans">'+data[j]+'</span>';
	}
	return content;
}
let letsTry = function(){
	_(".sec1src").innerHTML = appendElements(TRYBLOCK);
	trySpansArr = ____(".sec1src", ".trySpans");
	_(".ResultPopUpBox").innerHTML = tryResultBoxContent;
	textCount = 0;
	content = TRYBLOCK.slice();
	nextText = content[textCount];
	trialHelper(textCount);
	bgColor(trySpansArr[0], "#55a630");
}
let takeTest = function(){
	let choice = rand(testSource.length-1);
	let para = testSource[choice].content;
	//para = "Hello content"; // testing
	_(".title").innerHTML = '<h2>'+testSource[choice].title+'</h2>';
	_(".questionBox").innerHTML = '<p>'+appendElements(para)+'</p>';
	trySpansArr = ____(".questionBox", ".trySpans");
	textCount = 0;
	content = para.slice();
	nextText = content[textCount];
	trialHelper(textCount);
	bgColor(trySpansArr[0], "#55a630");
	time = 0;
	if (ts!=undefined){clearTimeout(ts);}
	timer();
}
let timer = function(){
	_("#setTime").innerHTML = time;
	time++;
	ts = setTimeout(timer, 1000);
}
let playAgainTimer = function(){
	t--;
	_("#playAgainTime").innerText = t;
	if(t < 0){
		clearTimeout(playAgainTs);
		hideResult();
		NAVBTNS[2].click();
	}
	else{
		playAgainTs = setTimeout(playAgainTimer, 1000);
	}
}
let chooseSection = function(){
	let label = this.value;
	// this.blur() // Will remove the focus on the buttons
	resultBool = label;
	for (let i = 0; i < SEC.length; i++){
		if(label != i){
			display(SEC[i], "none");
		}
	}
	display(SEC[label], "flex");
	accur = 100;
	accurNum = 0;
	_("#accur").innerHTML = accur;

	if (label == 1){letsTry();}
	else if(label == 2){takeTest();}

	hideResult();
}
let addingEventListener = function(){
	for (let i = 0; i < NAVBTNS.length; i++){
		NAVBTNS[i].addEventListener("click", chooseSection);
	}
	_(".restart").addEventListener("click", restart);
	_(".instructions:nth-child(3)").addEventListener("dblclick", function(){NAVBTNS[1].click();});
	_(".instructions:nth-child(4)").addEventListener("click", function(){NAVBTNS[2].click();});
}

_(".newUser").addEventListener("click", function(){this.innerHTML = NEWUSER;});
let setEventListener = function(){
	addEventListener("keypress", function(event){listenKeys(event)});
	addEventListener("keyup", function(e){e.preventDefault();});
}

setEventListener();

let hideResult = function(){
	_(".ResultPopUpBox").classList.remove("zoomView");
	_(".ResultPopUpBox").innerHTML = "";
	grayscale(_("#game_page"), 0);
	opacity(_("#game_page"), 1);
}
let showResult = function(){
	console.log("Result shown");
	_(".ResultPopUpBox").classList.add("zoomView");
	grayscale(_("#game_page"), 50);
	opacity(_("#game_page"), 0.5);
	grayscale(_(".ResultPopUpBox"), 0);
	opacity(_(".ResultPopUpBox"), 1);
	t = 10;
	playAgainTimer();
}
let trialHelper = function(n){
	showText = content[n];
	if (showText == " "){showText = "SPACE";}
	if(n < trySpansArr.length){
		_(".msgBox1").innerHTML = "Press &#34; "+showText+" &#34;";
	}
}
let textMarker = function(){
	if (textCount > 0){
		let num = textCount - 1;
		setColor(trySpansArr[num], "#adb5bd");
		bgColor(trySpansArr[num], "transparent");
	}
	if (textCount >= trySpansArr.length){
		if (resultBool == 1){
			_(".ResultPopUpBox").innerHTML = tryResultBoxContent;
			_(".ResultPopUpBox > button").addEventListener("click", function(){NAVBTNS[2].click(); console.log("Switched to test section")});
		}
		else if (resultBool == 2){
			_(".ResultPopUpBox").innerHTML = testResultBoxContent;
			clearTimeout(ts);
			_("#timeTaken").innerText = time;
			_("#accur").innerText = accur;
			_(".ResultPopUpBox > button").addEventListener("click", function(){NAVBTNS[2].click(); console.log("Switched to test section")});
		}
		_(".msgBox1").innerHTML = "Congrats";
		showResult();
	}
	else{
		bgColor(trySpansArr[textCount], "#55a630");
		nextText = content[textCount];
		trialHelper(textCount);
	}
}
let listenKeys = function(event){
	let keyName = event.key;
	if (event.keyCode == 32 || event.which == 32){
		keyName = "SPACE";
	}
	if (keyName == showText){
		textCount++;
		textMarker();
	}
	else{
		if (!(textCount >= trySpansArr.length)){bgColor(trySpansArr[textCount], "#f00");}
		accurNum++;
		accur = 100 - Math.round((accurNum / trySpansArr.length) * 100);
		if (accur >= 0){_("#accur").innerHTML = accur;}
	}
}

addingEventListener();