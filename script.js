let item = null;
let x = 0;
let y = 0;

function clampBounds(element, xPos, yPos) {
	let elementBounds = element.getBoundingClientRect();
	let itemBounds = item.getBoundingClientRect();
	return [
		Math.max(
			elementBounds.left - itemBounds.width / 2,
			Math.min(xPos, elementBounds.right - itemBounds.width / 2)
		),
		Math.max(
			elementBounds.top - itemBounds.height / 2,
			Math.min(yPos, elementBounds.bottom - itemBounds.height / 2)
		),
	];
}

function onGrab(e) {
	x = e.offsetX;
	y = e.offsetY;
	item = e.target;
	if (item.classList.contains("draggable")) {
		item.ondragstart = function () {
			return false;
		};
		item.classList.add("dragging");
		window.addEventListener("mousemove", onDrag);
		window.addEventListener("mouseup", onLetGo);
	}
}

function onDrag(e) {
	if (item) {
		let mouseX, mouseY;
		[mouseX, mouseY] = clampBounds(
			item.parentElement,
			e.clientX - x,
			e.clientY - y
		);
		let dx = mouseX;
		let dy = mouseY;
		item.style.left = `${dx}px`;
		item.style.top = `${dy}px`;
	}
}

function onLetGo(e) {
	let parentBounds = item.parentElement.getBoundingClientRect();
	let row = Math.max(
		0,
		Math.min(
			Math.floor((e.clientY - parentBounds.top) / (parentBounds.height / 8)),
			7
		)
	);
	let col = Math.max(
		0,
		Math.min(
			Math.floor((e.clientX - parentBounds.left) / (parentBounds.width / 8)),
			7
		)
	);
	let dx = parentBounds.left + col * (parentBounds.width / 8);
	let dy = parentBounds.top + row * (parentBounds.height / 8);
	item.style.left = `${dx}px`;
	item.style.top = `${dy}px`;
	item.classList.remove("dragging");
	window.removeEventListener("mousemove", onDrag);
	window.removeEventListener("mouseup", onLetGo);
}

window.addEventListener("mousedown", onGrab);
