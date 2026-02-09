let _ = function(name){	return document.querySelector(name);}

let __ = function(name){ return document.querySelectorAll(name);}

let _path = function(path, name){ return path.querySelector(name);}

let _path_ = function(path, name){ return path.querySelectorAll(name);}

let display = function(ele, value){	ele.style.display = value;}

let opacity = function(ele, value){ ele.style.display = value;}

let rand = function(range){	return Math.round(Math.random() * range);}

let setBgImg = function(ele, image){ele.style.backgroundImage = 'url('+image+')';}

let setColor = function(ele, color){ele.style.color = color;}

let setDisabledText = function(ele){ele.style.textDecoration = "underline overline line-through";}

let setNormalText = function(ele){ele.style.textDecoration = "none";}


// DOM :-

let makeEle = function(tag){ return document.createElement(tag);}

let makeText = function(content){ return document.createTextNode(content);}



// shuffle :-
let shuffle = function(data){
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



let switchLayout = function(ele, indicate){
	if (indicate=="grid"){
		ele.classList.remove("flexBox");
		ele.classList.add("gridBox");
	}
	else{
		ele.classList.remove("gridBox");
		ele.classList.add("flexBox");
	}
}