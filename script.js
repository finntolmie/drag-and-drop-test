let item = null;

function clampBounds(element, xPos, yPos) {
	let elementBounds = element.getBoundingClientRect();
	let itemBounds = item.getBoundingClientRect();
	return [
		Math.max(
			-50,
			Math.min(
				((xPos - itemBounds.width / 2 - elementBounds.left) /
					elementBounds.width) *
					800,
				750
			)
		),
		Math.max(
			-50,
			Math.min(
				((yPos - itemBounds.height / 2 - elementBounds.top) /
					elementBounds.height) *
					800,
				750
			)
		),
	];
}

function onGrab(e) {
	if (e.target.classList.contains("draggable")) {
		item = e.target;
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
		let dx = mouseX;
		let dy = mouseY;
		item.style.transform = `translate(${dx}%, ${dy}%)`;
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
	item.style.transform = `translate(${col * 100}%, ${row * 100}%)`;
	item.classList.remove("dragging");
	window.removeEventListener("mousemove", onDrag);
	window.removeEventListener("mouseup", onLetGo);
}

window.addEventListener("mousedown", onGrab);
