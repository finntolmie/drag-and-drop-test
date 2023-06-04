document.querySelectorAll(".drag").forEach((item) => {
	let x = 0;
	let y = 0;

	function onDrag(e) {
		let dx = e.clientX - x;
		let dy = e.clientY - y;
		item.style.transform = `translate(${dx}px, ${dy}px)`;
	}

	function onLetGo() {
		item.removeEventListener("mousemove", onDrag);
		item.removeEventListener("mouseup", onLetGo);
	}

	function onGrab(e) {
		console.log(e);
		x = e.offsetX;
		y = e.offsetY;
		origin = item.addEventListener("mousemove", onDrag);
		item.addEventListener("mouseup", onLetGo);
	}

	item.addEventListener("mousedown", onGrab);
});
