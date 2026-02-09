let words_source = ["power","mindful","quotes","humble","unknown","positive","tongue","inspirational","establish","challenges","fun"];
let bgColors = ["#00a6fb","#8ac926", "#cd1624", "#ffca3a"]
let word, i, j, user, ts, to_guess, duration, sortedArray;
let t_bg = bg = score = remains = 0;

function startGame(){
	_("intro-sec").style.display = "none";
	_("play-container").style.display = "flex";
	gamePlay();
}

function gamePlay(){
	_("words").innerText = "New Round!\n Scores : "+score+"\n10 Rounds";
	duration = 30; j = 0;
	clearTimeout(ts); score = 0;
	_("timeTaken").innerText = "Have fun";
	sortedArray = shuffle(words_source);
	setTimeout(getRandomWord, 3000);
}

function gameTime(){
	_("timeTaken").innerText = "Have fun";
	if (t_bg>=4) { t_bg = 0; }
	_("duration").style.backgroundColor = bgColors[t_bg++];
	if (duration<=0){
		clearTimeout(ts);
		remains--;
		guessed();
		_("duration").innerText = "Time up!";
	}
	else{
		_("audio").play();
		duration--;
		_("duration").innerText = duration;
		ts = setTimeout(gameTime, 1000);
	}
}

function getRandomWord(){
	if (j>=10){setTimeout(gamePlay, 3000);}
	selected = sortedArray[j++];
	word = shuffle(selected);
	setJumbles(word);
	duration = 30;
	gameTime();
}

function guessed(){
	--remains;
	user = (_("user").value).toLowerCase();
	if (user==selected){
		score++;
		_("timeTaken").innerText = "Awesome!";
		_("duration").innerText = "Time taken "+(30-duration);
	}
	else{
		_("duration").innerText = "Stopped!";
		_("timeTaken").innerText = "Try again!";
	}
	_("user").value = "";
	duration = 30;
	clearTimeout(ts);
	setTimeout(getRandomWord, 2500);
}

function setJumbles(word){
	_("words").innerHTML = "";
	for (i = 0; i < word.length; i++){
		_("words").innerHTML += '<span class="boxes" id="box'+i+'"></span>';
		_("box"+i).innerText = word[i];
		_("box"+i).style.backgroundColor = bgColors[bg++];
		if (bg>=4) { bg = 0 }
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
  if (shuffled==data) {shuffle(data)}
  return shuffled;
}

function _(name){ return document.getElementById(name); }
function rand(range){  return Math.round(Math.random() * range); }
function setOpacity(ele, n){ _(ele).style,opacity = n; }
function displayNone(ele){ _(ele).style,display = "none"; }


/*
function shuffle(arr){
    //fisher yates algorithm0,4
    console.log(arr);
    for(let i=0;i<arr.length;i++){
        console.log(arr[i])
        let rn = Math.round(Math.random()*(arr.length-1));
        let temp = arr[rn];
        arr[rn] = arr[i];
        arr[i] = temp; 
    }
    return arr;
}
*/