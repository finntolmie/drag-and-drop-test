let item = null;
let x = 0;
let y = 0;

function clampBounds(element, xPos, yPos) {
	let bounds = element.getBoundingClientRect();
	return [
		Math.max(bounds.left, Math.min(xPos, bounds.right)),
		Math.max(bounds.top, Math.min(yPos, bounds.bottom)),
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
		[mouseX, mouseY] = clampBounds(item.parentElement, e.clientX, e.clientY);
		let dx = mouseX - x;
		let dy = mouseY - y;
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
