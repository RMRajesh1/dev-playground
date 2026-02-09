let char = document.getElementById("character");
let game = document.getElementById("game");
let interval;
let both = 0;
let counter = 0;
let currentBlocks = [];
let speed = 0.5;
let blocks;
let baddleColors = ["rgba(0, 184, 148,1.0)", "rgba(9, 132, 227,1.0)", "rgba(108, 92, 231,1.0)", "rgba(99, 110, 114,1.0)"];
let count = 20;
let tempColor;
let color;



let moveLeft = function(){
	let left = parseInt(window.getComputedStyle(char).getPropertyValue("left"));
	if (left > 0){
		char.style.left = left - 2 + "px";
	}
}
let moveRight = function(){
	let left = parseInt(window.getComputedStyle(char).getPropertyValue("left"));
	if (left < 470){
		char.style.left = left + 2 + "px";
	}
}


document.addEventListener("keydown", event => {
	if (both==0){
		both++;
		if (event.key === "ArrowLeft"){
			interval = setInterval(moveLeft, 1);
		}
		else if (event.key === "ArrowRight"){
			interval = setInterval(moveRight, 1);
		}
	}
	
});



document.addEventListener("keyup", event => {
	clearInterval(interval);
	both = 0;
});



//setTimeout(function(){

blocks = setInterval(function(){

	let blockLast = document.getElementById("block"+(counter-1));
	let holeLast = document.getElementById("hole"+(counter-1));

	let blockLastTop;
	let holeLastTop;
	if (counter > 0){
		blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
		holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
	}
	if (blockLastTop < 800 || counter==0){
		let block = document.createElement("div");
		let hole = document.createElement("div");
		block.setAttribute("class", "block");
		hole.setAttribute("class", "hole");
		block.setAttribute("id", "block"+counter);
		hole.setAttribute("id", "hole"+counter);
		block.style.top = blockLastTop + 100 + "px";
		hole.style.top = holeLastTop + 100 + "px";
		tempColor = Math.floor(Math.random() * (baddleColors.length-1))
		if (tempColor == color){
			tempColor = Math.floor(Math.random() * (baddleColors.length-1));
		}
		color = tempColor;
		block.style.backgroundColor = baddleColors[color];

		let rand = Math.floor(Math.random() * 450);
		hole.style.left = rand + "px";

		game.appendChild(block);
		game.appendChild(hole);

		currentBlocks.push(counter);
		counter++;
	}

	let characterTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
	let characterLeft = parseInt(window.getComputedStyle(char).getPropertyValue("left"));
	let drop = 0;

	if (characterTop <= 10){
		// alert("Game over!\nYour score : "+(counter-9));
		gameOver();
		clearInterval(blocks);
	}

	for (let i = 0; i < currentBlocks.length; i++){
		let current = currentBlocks[i];
		let iblock = document.getElementById("block"+current);
		let ihole = document.getElementById("hole"+current);
		let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
		let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
		iblock.style.top = iblockTop - speed + "px";
		ihole.style.top = iblockTop - speed + "px";
		if (iblockTop < -30){
			currentBlocks.shift();
			iblock.remove();
			ihole.remove();
		}
		if (iblockTop - 30 < characterTop && iblockTop > characterTop){
			drop++;
			if (iholeLeft <= characterLeft && iholeLeft + 30 >= characterLeft){
				drop = 0;
			}
		}
	}

	if(drop == 0){
		if (characterTop < 470){
			char.style.top = characterTop + 2 + "px";
		}
	}
	else{
		char.style.top = characterTop - 0.5 + "px";
	}

}, 1);

//}, 2000);



let setUp = function(){
	let left = 0;

	for (let i = 0; i < count; i++){
		let ele = document.createElement("span");
		ele.setAttribute("class", "spans");
		ele.style.left = left+"px";
		// ele.style.backgroundColor = baddleColors[Math.floor(Math.random() * (baddleColors.length-1))];
		console.log(left);
		left += 25;
		game.appendChild(ele);
	}

}


setUp();	// dangerous obstacles :-


let gameOver = function(){
	let box = document.createElement("div");
	let p = document.createElement("p");
	box.setAttribute("class", "result");
	p.setAttribute("class", "para");
	p.appendChild(document.createTextNode("Score : "+(counter-9)));
	box.appendChild(p);
	game.appendChild(box);
	setTimeout(function(){
		location.reload();
	}, 3000);
}