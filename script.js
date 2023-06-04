console.log(document.querySelector(".bounds"));

document.querySelectorAll(".drag").forEach((item) => {
	let x = 0;
	let y = 0;

	function clampBounds(element, xPos, yPos) {
		let bounds = element.getBoundingClientRect();
		return [
			Math.max(bounds.left, Math.min(xPos, bounds.right)),
			Math.max(bounds.top, Math.min(yPos, bounds.bottom)),
		];
	}

	function onDrag(e) {
		let mouseX, mouseY;
		[mouseX, mouseY] = clampBounds(item.parentElement, e.clientX, e.clientY);
		let dx = mouseX - x;
		let dy = mouseY - y;
		item.style.left = `${dx}px`;
		item.style.top = `${dy}px`;
	}

	function onLetGo() {
		item.removeEventListener("mousemove", onDrag);
		item.removeEventListener("pointerup", onLetGo);
	}

	function onGrab(e) {
		x = e.offsetX;
		y = e.offsetY;
		item.addEventListener("mousemove", onDrag);
		item.addEventListener("pointerup", onLetGo);
	}

	item.addEventListener("pointerdown", onGrab);
});
