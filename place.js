let arr = [0, 1, 2, 3, 4, 5, 6, 7, 63, 62, 61, 60, 59, 58, 57, 56];
let board = document.querySelector(".board");
let boardBounds = board.getBoundingClientRect();
console.log(board);
arr.forEach((item) => {
	let row = Math.floor(item / 8);
	let col = item % 8;
	let dx = boardBounds.left + col * (boardBounds.width / 8);
	let dy = boardBounds.top + row * (boardBounds.height / 8);
	let element = document.createElement("div");
	element.classList.add("draggable");
	element.style.left = `${dx}px`;
	element.style.top = `${dy}px`;
	board.appendChild(element);
});
board.oncontextmenu = function () {
	return false;
};
