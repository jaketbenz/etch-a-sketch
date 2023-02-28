const startColor = "#333333";
const startMode = "color";
const startSize = 16;

let currentColor = startColor;
let currentMode = startMode;
let currentSize = startSize;

function setColor(newColor) {
	currentColor = newColor;
}

function setMode(newMode) {
	setButton(newMode);
	currentMode = newMode;
}

function setSize(newSize) {
	currentSize = newSize;
}

const colorPicker = document.querySelector(".color--picker");
// const colorMode = document.querySelector(".color--mode");
const colorMode = document.getElementById("color--mode");
// const rainbowMode = document.querySelector(".rainbow--mode");
const rainbowMode = document.getElementById("rainbow--mode");
const eraserMode = document.querySelector(".eraser--mode");
const clearButton = document.querySelector(".clear--button");
const gridMode = document.querySelector(".grid--mode");
const sizeValue = document.querySelector(".size--value");
const sizeInput = document.querySelector(".size--input");
const grid = document.querySelector(".grid");

colorPicker.oninput = (e) => setColor(e.target.value);
colorMode.onclick = () => setMode("color");
rainbowMode.onclick = () => setMode("rainbow");
eraserMode.onclick = () => setMode("eraser");
clearButton.onclick = () => resetGrid();
gridMode.onclick = () => setGridLines();
sizeInput.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setColor(e) {
	if (e.type === "mouseover" && !mouseDown) return;
	if (currentMode === "rainbow") {
		const randomRed = Math.floor(Math.random() * 256);
		const randomBlue = Math.floor(Math.random() * 256);
		const randomGreen = Math.floor(Math.random() * 256);
		e.target.style.backgroundColor = `rgb(${randomRed}, ${randomBlue}, ${randomGreen})`;
	} else if (currentMode === "color") {
		e.target.style.backgroundColor = currentColor;
	} else if (currentMode === "eraser") {
		e.target.style.backgroundColor = "#fefefe";
	}
}

function setButton(newMode) {
	if (currentMode === "color") {
		colorMode.classList.remove("active");
	} else if (currentMode === "rainbow") {
		rainbowMode.classList.remove("active");
	} else if (currentMode === "eraser") {
		eraserMode.classList.remove("active");
	}

	if (newMode === "color") {
		colorMode.classList.add("active");
	} else if (newMode === "rainbow") {
		rainbowMode.classList.add("active");
	} else if (newMode === "eraser") {
		eraserMode.classList.add("active");
	}
}

function clearGrid() {
	grid.innerHTML = "";
}
function resetGrid() {
	clearGrid();
	setGrid(currentSize);
}

function updateSizeValue(value) {
	sizeValue.innerHTML = `${value} x ${value}`;
}

function changeSize(value) {
	setSize(value);
	updateSizeValue(value);
	resetGrid();
}

function setGrid(size) {
	grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
	for (let i = 0; i < size * size; i++) {
		const gridBox = document.createElement("div");
		gridBox.classList.add("grid-box");
		gridBox.addEventListener("mousedown", setColor);
		gridBox.addEventListener("mouseover", setColor);
		grid.appendChild(gridBox);

		gridBox.classList.add("border-top-left");
	}
	const rightItems = document.querySelectorAll(
		`.grid-box:nth-child(${currentSize}n)`
	);
	for (let i = 0; i < rightItems.length; i++) {
		rightItems[i].classList.toggle("border-right");
	}

	let gridBoxes = document.querySelectorAll(".grid-box");
	const lastItems = Array.from(gridBoxes).slice(-`${size}`);
	for (let i = 0; i < lastItems.length; i++) {
		lastItems[i].classList.toggle("border-bottom");
	}
}

gridBox = document.querySelectorAll(".grid-box");
console.log(gridBox);

function setGridLines() {
	console.log("test");
	gridBox = document.querySelectorAll(".grid-box");
	// console.log(gridBox);
	for (i = 0; i < gridBox.length; i++) {
		gridBox[i].classList.toggle("border-top-left");
		if (gridBox[i].classList.contains("border-right")) {
			gridBox[i].classList.toggle("border-right");
		}
		if (gridBox[i].classList.contains("border-bottom")) {
			gridBox[i].classList.toggle("border-bottom");
		}
		// gridBox[i].classList.toggle("border-right");
		// gridBox[i].classList.toggle("border-bottom");
	}
}

window.onload = () => {
	setGrid(startSize);
	setButton(startMode);
};
