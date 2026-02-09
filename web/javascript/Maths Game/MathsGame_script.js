let ts, sec, num1, num2, label, result, user, inputs, j, score, noOfQuiz, current;
let operateArr = [];
let reviewArray = [];
inputs = document.getElementsByClassName("check");

for (let x = 0; x < inputs.length; x++){inputs[x].checked = false;}

function keyEvents(event){
	if (event.keyCode==13 && current==undefined){startGame();}
}

function startGame(){
	display("intro-sec","none");
	display("game-sec", "flex");
	display("result-sec", "none")
	playGround();
}
function playGround(){
	current = j = score = 0;
	getNum();
}
function getNum(){
	_("rangebar1").value = rand(100);
	_("rangebar2").value = rand(100);
	setNum();
}
function setNum(){
	num1 = p(_("rangebar1").value);
	num2 = p(_("rangebar2").value);
	_("num1").innerText = num1;
	_("num2").innerText = num2;
}
function setTime(){
	sec = 15;
	if (ts!=undefined){clearInterval(ts);}
	ts = setInterval(changeTime, 1000);
}
function changeTime(){
	_('pongAudio').play();
	_("setTimer").innerText = sec;
	sec -= 1;
	if (sec<0){
		clearInterval(ts);
		_("setTimer").innerText = "Time Up!";
		_("answers").placeholder = "Time Up!";
		_("answers").setAttribute("readonly","");
		setTimeout(submitBtn, 1500);
		setTimeout(doProgress, 2000);
	}
}
function checkboxesfunct(ele){
	if(ele.checked){operateArr.push(ele.value);}
	else(operateArr.splice(operateArr.indexOf(ele.value), 1));
}
function userBox(){
	operateArr = shuffle(operateArr);
	startQuiz();
}
function startQuiz(){
	if (operateArr.length <= 0){
		_("errorNote").innerText = "Please select one of the operations!";
		return 0;
	}
	noOfQuiz = operateArr.length;
	_("noQues").innerText = noOfQuiz;
	setUserField(); 
	doProgress();
}
function setUserField(){
	display("startQuiz", "none");
	display("errorNote", "none");
	display("answerName","block");
	display("answerInput","block");
}
function doProgress(){
	getNum();
	setTime();
	current++;
	_("currentQuiz").innerText = current;
	_("answers").removeAttribute("readonly");
	_("answers").placeholder = "";
	if (operateArr[j]=="+"){result = num1 + num2; label = "Addition";}
	else if (operateArr[j]=="-"){result = num1 - num2; label = "Subtraction";}
	else if (operateArr[j]=="*"){result = num1 * num2; label = "Multiplication";}
	else if (operateArr[j]=="//"){result = Math.floor(num1/num2); label = "Quotient";}
	else if (operateArr[j]=="**"){result = Math.pow(num1, num2); label = "Power of";}
	else if (operateArr[j]=="%"){result = num1 % num2; label = "Reminder";}
	_("name").innerText = label;
	question =  current+") "+num1+operateArr[j]+num2+" = ?";
	_("quiz").innerText = question;
	j++;
	_("answers").value = "";
	if(j>operateArr.length){resultPage();}
}
function submitBtn(){
	user = _("answers").value;
	reviewArray.push('<li><span class="reviewQuiz">Q : '+question+'</span><span class="reviewAnswer">A : '+result+'</span></li>');
	if (user=="" || isNaN(p(user))){_("answers").value=""; _("answers").placeholder="?" ;return 0;}
	if (p(user)==result){score++;}
	doProgress();
}
function resultPage(){
	clearInterval(ts);
	_("ul-list").innerHTML = "";
	for (let z = 0; z < reviewArray.length; z++){
		_("ul-list").innerHTML += reviewArray[z];
	}
	_("score").innerText = (((score*5)*100)/(noOfQuiz*5)).toFixed(2)+"%";
	display("result-sec", "flex");
	display("game-sec","none");
	console.log("Result page...");
}
function goToHome(){location.reload(true);}


// shuffle :-
function shuffle(data){
  let shuffled = []; let temp = []; 
  let l = (data.length)-1; let i = 0;
  while (shuffled.length<=l){
    let n = rand(l);
    if (!temp.includes(n)){shuffled[i] = data[n]; i++}
    temp.push(n);
  }
  if (shuffled==data) {shuffle(data)}
  return shuffled;
}
function p(ele){return parseInt(ele);}
function rand(range){return Math.round(Math.random() * range);}
function opacity(ele, value){_(ele).style.opacity = value;}
function display(ele, value){_(ele).style.display = value;}
function _(name){return document.getElementById(name);}