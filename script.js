let item = null;
let itemBounds = null;
let parent = document.querySelector(".bounds");
let parentBounds = parent.getBoundingClientRect();
let hover = document.createElement("div");
hover.classList.add("hover");
hover.style.visibility = "hidden";
hover.innerHTML =
	'<svg viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100" stroke="rgba(255, 255, 255, 0.65)" stroke-width="10" fill="none"></rect></svg>';
parent.insertBefore(hover, parent.firstChild);

function clamp(number, min, max) {
	return Math.max(min, Math.min(number, max));
}

function translateItem(element, dx, dy) {
	element.style.transform = `translate(${dx}%, ${dy}%)`;
}

function onGrab(e) {
	if (e.button == 0 && e.target.classList.contains("draggable")) {
		item = e.target;
		itemBounds = item.getBoundingClientRect();
		parent = item.parentElement;
		parentBounds = parent.getBoundingClientRect();
		item.ondragstart = function () {
			return false;
		};
		hover.style.visibility = "";
		hover.style.transform = item.style.transform;

		item.classList.add("dragging");
		window.addEventListener("mousemove", onDrag);
		window.addEventListener("mouseup", onLetGo);
	}
}

function onDrag(e) {
	if (item) {
		let dx = clamp(
			((e.clientX - itemBounds.width / 2 - parentBounds.left) /
				parentBounds.width) *
				800,
			-50,
			750
		);
		let dy = clamp(
			((e.clientY - itemBounds.height / 2 - parentBounds.top) /
				parentBounds.height) *
				800,
			-50,
			750
		);
		let row = clamp(
			Math.floor((e.clientY - parentBounds.top) / (parentBounds.height / 8)),
			0,
			7
		);
		let col = clamp(
			Math.floor((e.clientX - parentBounds.left) / (parentBounds.width / 8)),
			0,
			7
		);
		translateItem(hover, col * 100, row * 100);
		translateItem(item, dx, dy);
	}
}

function onLetGo(e) {
	// translate square snap to grid
	let row = clamp(
		Math.floor((e.clientY - parentBounds.top) / (parentBounds.height / 8)),
		0,
		7
	);
	let col = clamp(
		Math.floor((e.clientX - parentBounds.left) / (parentBounds.width / 8)),
		0,
		7
	);
	translateItem(item, col * 100, row * 100);

	// remove old square class
	[].some.call(item.classList, (c) => {
		if (/square-.*/.test(c)) {
			item.classList.remove(c);
		}
	});

	// remove element on new square and add new square class
	let newSquare = `square-${col + 1}${8 - row}`;
	document.querySelectorAll(`.${newSquare}`).forEach((square) => {
		square.remove();
	});
	item.classList.remove("dragging");
	item.classList.add(newSquare);

	hover.style.visibility = "";

	// cleanup
	window.removeEventListener("mousemove", onDrag);
	window.removeEventListener("mouseup", onLetGo);
	item = null;
	itemBounds = null;
	parentBounds = null;
}

window.addEventListener("mousedown", onGrab);
