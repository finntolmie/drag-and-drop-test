let arr = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 48, 49, 50, 51, 52, 53,
	54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
];
let board = document.querySelector(".board");
let boardBounds = board.getBoundingClientRect();
arr.forEach((item) => {
	let row = Math.floor(item / 8);
	let col = item % 8;
	let element = document.createElement("div");
	element.classList.add("draggable");
	element.classList.add(`square-${col + 1}${8 - row}`);
	element.style.transform = `translate(${col * 100}%, ${row * 100}%)`;
	board.appendChild(element);
});
board.oncontextmenu = function () {
	return false;
};
