let hour = min = sec = dSec =00;
let ts, tr, pts, ptr;

function mode(mode){
  if (mode=='stopwatch_pack'){
    _('stopwatch_pack').style.display = "flex";
    _('timer_pack').style.display = "none";
    _('clock_pack').style.display = "none";
    reset('timer');
  }
  else if (mode=='timer_pack'){
    _('timer_pack').style.display = "flex";
    _('stopwatch_pack').style.display = "none";
    _('clock_pack').style.display = "none";
    reset('stopwatch');
  }
  else if (mode=='clock_pack'){
  	_('clock_pack').style.display = "flex";
  	_('stopwatch_pack').style.display = "none";
    _('timer_pack').style.display = "none";
  }
}

function start(type){
  if (type=='stopwatch'){
    ts = setInterval(stopwatch, 100);
    pts=0;
    _('startBtn1').setAttribute("disabled", "");
  }
  else if (type=='timer'){
    tr = setInterval(timer, 100);
    ptr=0;
    timerInput()
    _('startBtn2').setAttribute("disabled", "");
  }
}

function stopwatch(){
  dSec++;
  if (dSec>9) {sec = p(sec)+1; dSec=0}
  if (sec>59) {min = p(min)+1; sec=0}
  if (min>59) {hour= p(hour)+1; min=0}
  if (hour>23) { _('stopwatch').innerText="OVERLAP"; return}
  digit();
  _('stopwatch').innerText = hour +" : "+ min +" : "+ sec +" : "+ dSec;
}

function timerInput(){
  let minutes = p(_('inputBox').value);
  if (minutes<0 || isNaN(minutes)) {
    _('note').innerText="Invalid...";
    setTimeout(function(){_('inputBox').value=10;
     _('note').innerText = "Minutes"}, 2000);
     return reset('timer');
  }
  else if (minutes>59) {
    hour = p(minutes/60);
    min = minutes - (hour * 60);
  }else{min = minutes}
   _('timer').innerText = hour +" : "+ min +" : "+ sec +" : "+ dSec;
}

function timer(){
  dSec--;
  if (dSec<0) {sec = p(sec)-1; dSec=9}
  if (sec<0) {min = p(min)-1; sec=59}
  if (min<0) {hour= p(hour)-1; min=59}
  if (hour<0) {hour = min = sec = dSec =00;
   _('timer').innerText = "TIME OVER"; return }
  digit();
   _('timer').innerText = hour +" : "+ min +" : "+ sec +" : "+ dSec;
}

function pause(type){
  if (type=='stopwatch'){
    clearInterval(ts);
    if (pts==undefined) {return}
    else if (pts==1) {pts=0; start(type)}
    else {pts=1}
  }
  else if (type=='timer'){
    console.log("Called!1")
    clearInterval(tr);
    if (ptr==undefined) {console.log("Called!2");return}
    else if (ptr==1) {ptr=0; tr = setInterval(timer, 100)}
    else {ptr=1}
  }
}

function reset(type){
  if (type=='stopwatch') {
    clearInterval(ts);
    hour = min = sec = dSec =00;
    pts=undefined;
    _('startBtn1').removeAttribute("disabled");
  }
  if (type=='timer') {
    clearInterval(tr);
    hour = min = sec = dSec =00;
    ptr=undefined;
    _('inputBox').value=10;
    _('startBtn2').removeAttribute("disabled");
  }
  _(type).innerText = "00 : 00 : 00 : 00";
}


function digit(){
  if (p(dSec)<10) {dSec = "0" + p(dSec)}
  if (p(sec) <10) {sec = "0" + p(sec)}
  if (p(min) <10) {min = "0" + p(min)}
  if (p(hour)<10) {hour = "0" + p(hour)}
  if (p(cs) <10) {cs = "0" + p(cs)}
  if (p(cm) <10) {cm = "0" + p(cm)}
  if (p(ch)<10) {ch = "0" + p(ch)}
}

function p(data) { return parseInt(data) }

function _(source) { return document.getElementById(source) }


// Clock section :-
let today, ch, cm, cs;
function startClock(){
	today = new Date();
	ch = today.getHours();
	cm = today.getMinutes();
	cs = today.getSeconds();
	digit();
	_('clock').innerText = ch+" : "+cm+" : "+cs;

	let ct = setTimeout(startClock, 500);
}