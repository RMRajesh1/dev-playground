const DEL = '<i class="fa fa-times" aria-hidden="true"></i>';
const LINK = '<i class="fa fa-external-link" aria-hidden="true"></i>';
const EDIT = '<i class="fa fa-pencil-square-o icons" aria-hidden="true"></i>';
const TRASH = '<i class="fa fa-trash icons" aria-hidden="true"></i>';
const PLUS = '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';

const TH = "fa-trash";
const ED = "fa-pencil-square-o";
const LI = "fa-external-link";

const BORDER_COLORS = ["red", "green", "blue", "#f0f"];
let color_count = 0;

const LISTBOX = document.querySelector(".addItems");
const PROGRESSBOX = document.querySelector(".inProgress");
const MARKEDBOX = document.querySelector(".marked");
const COMPLETEDBOX = document.querySelector(".completed");
const SEC = document.querySelectorAll(".sec");

let remainingDays;	// remaining days
let border_color;
let ts;	// time out

let drag_item = null;	// dragging element;
let edit = false;

const LISTCLS = "lists";
const COLUMNCLS = "sec";
const ADDTASK = "addBtn";	// Ading button

const SUBMITFORM = "addForm";
const FORMCLOSE = "closeForm";	// closing form
const FORMSEC = document.querySelector("#form_sec");
const FORMMSG = document.querySelector(".msg");
let inputs = FORMSEC.querySelectorAll("input");
let textArea = FORMSEC.querySelector("textarea");
let form_state = false;
setTimeout(function(){FORMSEC.style.opacity = 1; }, 500);

let today = new Date();
let todayDate = today.getFullYear() + "-" + formatter(Number(today.getMonth())+1) + "-" + formatter(Number(today.getDate()));
inputs[2].value = todayDate;
console.log(todayDate);

let tasks = [
{id:0, taskName:"New year wishes", description:"This project will wish you for the 2021 new year", url:"https://js-happy-new-year-2021.majesticmt.repl.co/", sdate:todayDate, edate:todayDate, location:"completed"},
{id:1, taskName:"Typing tester", description:"You can develop your type writing skills. It will be interesting to play!", url:"https://js-typing-tutorial.majesticmt.repl.co/", sdate:todayDate, edate:todayDate, location:"marked"},
{id:2, taskName:"Portfolio", description:"This is the portfolio project. It contains the information and projects of the user", url:"#", sdate:undefined, edate:undefined, location:"inProgress"},
{id:3, taskName:"Kanban board", description:"You can use it like a project notes app.", url:"#", sdate:undefined, edate:undefined, location:"addItems"},
];

// tasks = JSON.parse(localStorage.getItem("appData"));
localStorage.getItem("appData") ? tasks = JSON.parse(localStorage.getItem("appData")): console.log("New entry..!");	// ternary operator

let num = tasks.length-1;
let item = tasks.length;
let currentObject;



function formatter(inp){
	if (inp<10){return "0"+inp;}
	return inp;
}
let createList = function(n){
	let list = document.createElement("DIV");
	list.classList.add("lists");
	list.setAttribute("draggable", "true");
	list.setAttribute("id", tasks[n].id);
	list.style.borderColor = border_color;

	let div1 = document.createElement("DIV");
	div1.classList.add("content");

	let h2 = document.createElement("H2");
	let h2content = document.createTextNode(tasks[n].taskName);
	h2.appendChild(h2content);
	div1.appendChild(h2);

	let desc = document.createElement("P");
	let descContent = document.createTextNode(tasks[n].description);
	desc.appendChild(descContent);
	let aTag = document.createElement("A");
	aTag.setAttribute("href", tasks[n].url);
	aTag.setAttribute("target", "_blank");
	aTag.innerHTML += "&nbsp;"+LINK;
	desc.appendChild(aTag);
	div1.appendChild(desc);

	let h4 = document.createElement("h4");
	let h4content = document.createTextNode(getRemainingDays(n));
	h4.appendChild(h4content);
	div1.appendChild(h4);

	let div2 = document.createElement("DIV");
	div2.classList.add("iconBox");
	div2.innerHTML = EDIT;
	div2.innerHTML += TRASH;

	if (color_count >= BORDER_COLORS.length){color_count = 0;}
	list.style.borderColor = BORDER_COLORS[color_count++];
	list.appendChild(div1);
	list.appendChild(div2);

	return list;
}
let getRemainingDays = function(n){
	let obj_date = String(tasks[n].edate);
	// console.log(obj_date, typeof(obj_date));
	if (obj_date==undefined){ return "Not specified"; }
	else{
		let year = Number(obj_date.slice(0, 4)) - Number(today.getFullYear());
		let date = Number(obj_date.slice(8)) - today.getDate();
		if (date > 0){return "Remaining days : "+date;}
		return "Not specified";
	}
}
let clearForm = function(){
	inputs[0].value = "";
	inputs[1].value = "";
	textArea.value = "";
	inputs[2].value = "2021-01-04";
	inputs[3].value = "2021-01-10";
	remainingDays = 0;
	edit = false;
}
let showForm = function(){
	FORMSEC.classList.remove("scaleDown");
	FORMSEC.classList.add("scaleUp");
	form_state = true;
	inputs[2].value = todayDate;
}
let hideForm = function(){
	FORMSEC.classList.remove("scaleUp");
	FORMSEC.classList.add("scaleDown");
	form_state = false;
	inputs[2].value = todayDate;
	clearForm();
}
let alphNumeric = function(inp){
	if (inp.length > 0){return true;}
	return false;
}
let validateForm = function(){
	let name = inputs[0].value;
	let link = inputs[1].value;
	let desc = textArea.value;
	let date1 = inputs[2].value;
	let date2 = inputs[3].value;
	remainingDays = 0;

	if (alphNumeric(name) && alphNumeric(link) && alphNumeric(desc) && alphNumeric(date1) && alphNumeric(date2)){
		if (edit){
			tasks[currentObject[0]].taskName = currentObject[1].innerText = name;
			tasks[currentObject[0]].description = currentObject[2].innerText = desc;
			currentObject[2].innerHTML += '<a href="'+link+'" target="_blank">&nbsp'+LINK+'</a>';
			tasks[currentObject[0]].url = link;
			tasks[currentObject[0]].sdate = date1;
			tasks[currentObject[0]].edate = date2;
			currentObject[4].innerText = getRemainingDays(currentObject[0]);
		}
		else{
			let objectData = {id:tasks.length, taskName:"", url:"", description:"", sdate:"", edate:"", location:"addItems"};
			objectData.taskName = name;	//document.createTextNode(name);
			objectData.description = desc;	//document.createTextNode(desc);
			objectData.url = link;	//document.createTextNode(link);
			objectData.sdate = date1;	//document.createTextNode(date1);
			objectData.edate = date2;	//document.createTextNode(date2);

			tasks.push(objectData);
			localStorage.setItem("appData", JSON.stringify(tasks));
			num = tasks.length-1;
			let data = createList(num);
			LISTBOX.append(data);
		}
		hideForm();
	}
	else{
		clearTimeout(ts);
		FORMMSG.classList.remove("opacityMinus");
		FORMMSG.classList.add("opacityPlus");
		ts = setTimeout(function(){
			FORMMSG.classList.remove("opacityPlus");
			FORMMSG.classList.add("opacityMinus");
		}, 1000);
	}
}

// click functions triggering
let clickFunct = function(e){
	let tar = e.target;
	let cls = tar.classList;
	console.log(tar);
	if (cls.contains(ADDTASK)){
		showForm();
		tar.blur();
	}
	else if (cls.contains(FORMCLOSE)){
		hideForm();
		tar.blur();
	}
	else if (cls.contains(SUBMITFORM)){ validateForm(); }
	else if (cls.contains(TH)){
		let par = tar.parentNode.parentNode;
		let id = par.getAttribute("id");
		for (let i = 0; i < tasks.length; i++){
			if (tasks[i].id==id){
				tasks.splice(i, 1);
				localStorage.setItem("appData", JSON.stringify(tasks));
				break;
			}
		}
		par.remove();
	}
	else if (cls.contains(ED)){
		let currentEle;
		let parent = tar.parentNode.parentNode;
		let id = tar.parentNode.parentNode.getAttribute("id");
		for (let i = 0; i < tasks.length; i++){
			if (tasks[i].id==id){
				currentObject = [id, parent.querySelector("h2"), parent.querySelector("p"), parent.querySelector("p>a"), parent.querySelector("h4")];
				currentEle = tasks[id];
				showForm();
				break;
			}
		}
		inputs[0].value = currentEle.taskName;
		textArea.value = currentEle.description;
		inputs[1].value = currentEle.url;
		inputs[2].value = currentEle.sdate;
		inputs[3].value = currentEle.edate;
		edit = true;
	}
}

// key events trigger
let keyDownFunct = function(e){
	let keyName = e.key;
	if (keyName == "Escape" && form_state){ hideForm(); }
	else if (keyName == "n" || keyName == "N" && !form_state){ showForm(); }
	else if (keyName == "Enter" && form_state){ validateForm();	}
}
let dragStarts = function(e){
	let tar = e.target;
	let cls = tar.classList;
	if (cls.contains(LISTCLS)){
		cls.remove("dragend");
		cls.add("dragstart");
		drag_item = tar;
	}
}
let dragEnd= function(e){
	let tar = e.target;
	let cls = tar.classList;
	if (cls.contains(LISTCLS)){
		cls.remove("dragstart");
		cls.add("dragend");
		let id = tar.getAttribute("id");
		tasks[id].location = (tar.parentNode.classList)[1];
		localStorage.setItem("appData", JSON.stringify(tasks));
	}
}
let dragEntered = function(e){
	let tar = e.target;
	let cls = tar.classList;
	if (cls.contains(COLUMNCLS)){
		cls.add("bgColor");
	}
}
let dragOver = function(e){ e.preventDefault(); }
let dragLeft = function(e){
	let tar = e.target;
	let cls = tar.classList;
	if (cls.contains(COLUMNCLS)){
		cls.remove("bgColor");
	}
}
let dropped = function(e){
	e.preventDefault();
	e.stopPropagation();
	let tar = e.target;
	let cls = tar.classList;
	if (cls.contains(COLUMNCLS)){
		tar.append(drag_item);
		drag_item = null;
		cls.remove("bgColor");
	}
}
let displayItems = function(){
	for (let i = 0; i < tasks.length; i++){
		let place = tasks[i].location;
		let data = createList(i);
		if (place=="addItems"){LISTBOX.append(data);}
		else if (place=="inProgress"){PROGRESSBOX.append(data);}
		else if (place=="marked"){MARKEDBOX.append(data);}
		else if (place=="completed"){COMPLETEDBOX.append(data);}
	}
}


document.addEventListener("keydown", keyDownFunct);
document.addEventListener("click", clickFunct);
document.addEventListener("dragstart", dragStarts);
// document.addEventListener("drag", dragInProgress);
document.addEventListener("dragend", dragEnd);
document.addEventListener("dragenter", dragEntered);
document.addEventListener("dragleave", dragLeft);
document.addEventListener("dragover", dragOver);
document.addEventListener("drop", dropped);

let startApp = function(){
	hideForm();
	displayItems();
}
startApp();