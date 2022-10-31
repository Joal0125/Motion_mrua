var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var index = -1;
var xBase = 100;
var yBase = 50;
var xInit = 37;
var graphType = 1;
var graphTitle = "Comparación de movimientos";
var yAxisTitle = "y (m)";
var slope = 0.4;
var yIncrement = 10;
var yNumDecimals = 0;
var yStart = yBase + 160;
var plotColor = "#ff00ff";
var radius = 6;
var maxTime = 10.0;
var x1Init = 0;
var x1 = xBase;
var v1 = 5.0;
var a1 = 0.0;
var y1 = yBase + 40;
var x2Init = 0.0;
var x2 = xBase;
var v2 = 5.0;
var a2 = 0.0;
var y2 = yBase + 80;
var time = 0.0;
var timer;
var runFlag = 1;

drawMotion();
function drawMotion() {
	if (
		x1 >= xBase + 400 ||
		x2 >= xBase + 400 ||
		x1 < xBase ||
		x2 < xBase ||
		time >= 50
	)
		runFlag = 0;

	if (runFlag == 1) {
		// clear
		context.clearRect(0, 0, canvas.width, canvas.height);
		index = index + 1;

		// set background color for the entire thing
		context.fillStyle = "#ffff99";
		context.fillRect(0, 0, canvas.width, canvas.height);

		// set background color for the graph
		context.fillStyle = "white";
		context.fillRect(xBase, yBase, 400, 120);

		// set line color
		context.strokeStyle = "#999";
		context.lineWidth = 2;

		var axisLabel = "";
		var axisValue = 0;

		// vertical grid lines
		for (var i = 0; i <= 10; i++) {
			context.beginPath();
			context.moveTo(xBase + 40 * i, yBase);
			context.lineTo(xBase + 40 * i, yBase + 130);
			context.stroke();
			context.font = "14pt Calibri";
			context.fillStyle = "black";
			context.textAlign = "center";
			context.textBaseline = "middle";
			axisValue = 10 * i;
			axisLabel = axisValue.toFixed(0);
			context.fillText(axisLabel, xBase + 40 * i, yBase + 140);
		}

		// horizontal grid lines
		for (i = 0; i <= 3; i++) {
			context.beginPath();
			context.moveTo(xBase, yBase + 40 * i);
			context.lineTo(xBase + 400, yBase + 40 * i);
			context.stroke();
			context.font = "14pt Calibri";
			context.fillStyle = "black";
			context.textAlign = "center";
			context.textBaseline = "middle";
		}
		// x-axis
		context.strokeStyle = "#000";
		context.lineWidth = 4;
		context.beginPath();
		context.moveTo(xBase - 1, yBase + 120);
		context.lineTo(xBase + 420, yBase + 120);
		context.stroke();
		context.moveTo(xBase + 410, yBase + 120 - 6);
		context.lineTo(xBase + 420, yBase + 120);
		context.lineTo(xBase + 410, yBase + 120 + 6);
		context.lineJoin = "miter";
		context.stroke();
		context.font = "14pt Calibri";
		context.fillStyle = "black";
		context.textAlign = "left";
		context.fillText("x (m)", xBase + 428, yBase + 120);

		// draw motion diagrams
		//punto rojo--------------------------
		time = index / 20.0;
		var numGhosts = Math.round(0.5 * time + 0.5);

		if (graphType == 1) {
			context.lineWidth = 2;
			context.strokeStyle = "#000000";

			for (var i = 0; i < numGhosts; i++) {
				x1 = xBase + 4 * (x1Init + v1 * i * 2 + 0.5 * a1 * i * i * 4);
				context.beginPath();
				context.fillStyle = "#ff9999"; //rojo opaco
				context.arc(x1, y1, radius / 2, 0, 2 * Math.PI, false);
				context.fill();
				context.stroke();
			}
			context.fillStyle = "red";
			x1 = xBase + 4 * (x1Init + v1 * time + 0.5 * a1 * time * time); //ec de acceleración
			context.beginPath();
			context.arc(x1, y1, radius, 0, 2 * Math.PI, false);
			context.fill();
			context.stroke();

			//punto azul-------------------------------

			for (i = 0; i < numGhosts; i++) {
				x2 = xBase + 4 * (x2Init + v2 * i * 2 + 0.5 * a2 * i * i * 4);
				context.beginPath();
				context.fillStyle = "#9999ff"; //azul opaco
				context.arc(x2, y2, radius / 2, 0, 2 * Math.PI, false);
				context.fill();
				context.stroke();
			}
			context.fillStyle = "blue";
			x2 = xBase + 4 * (x2Init + v2 * time + 0.5 * a2 * time * time); //ec de acceleración
			context.beginPath();
			context.arc(x2, y2, radius, 0, 2 * Math.PI, false);
			context.fill();
			context.lineWidth = 2;
			context.stroke();
		}
		// graph title
		context.font = "bold 18pt Calibri";
		context.fillStyle = "purple";
		context.textAlign = "center";
		context.fillText(graphTitle, canvas.width / 2, 24);
		//etiqueta que muestra el tiempo
		context.fillStyle = "black";
		var timeLabel = "t = ";
		timeLabel = timeLabel + time.toFixed(2) + " s";
		context.textAlign = "left";
		context.fillText(timeLabel, xBase + 20, 230);
		//etiqueta que muestra distancia 1
		context.fillStyle = "red";
		var xPos = x1Init + v1 * time + 0.5 * a1 * time * time;
		var xPosLabel = "x = ";
		xPosLabel = xPosLabel + xPos.toFixed(2) + " m";
		context.textAlign = "left";
		context.fillText(xPosLabel, xBase + 140, 230);
		//etiqueta que muestra distancia 2
		context.fillStyle = "blue";
		var xPos = x2Init + v2 * time + 0.5 * a2 * time * time;
		var yPosLabel = "x = ";
		yPosLabel = yPosLabel + xPos.toFixed(2) + " m";
		context.textAlign = "left";
		context.fillText(yPosLabel, xBase + 270, 230);
	}
}

function runMotion() {
	drawMotion();
	if (runFlag == 1) {
		//timer = window.setTimeout(runMotion, 1000 / 30);
		timer = window.requestAnimationFrame(runMotion);
	}
}

function play() {
	window.cancelAnimationFrame(timer);
	runFlag = 1;
	runMotion();
}

function pause() {
	window.cancelAnimationFrame(timer);
	runFlag = 0;
}
function stepForward() {
	window.cancelAnimationFrame(timer);
	runFlag = 1;
	drawMotion();
}

function stepBack() {
	window.cancelAnimationFrame(timer);
	index = index - 2;
	if (index < -1) index = -1;
	time = index / 20;
	runFlag = 1;
	drawMotion();
}
function reset() {
	window.cancelAnimationFrame(timer);
	index = -1;
	time = 0.0;
	x1 = xBase;
	x2 = xBase;
	runFlag = 1;
	drawMotion();
}
function showx1Value(newx1Value) {
	//get the element
	var display = document.getElementById("initialx1Value");
	//show the amount
	display.innerHTML = newx1Value;
	x1Init = Number(newx1Value);
	reset();
}

function showv1Value(newv1Value) {
	//get the element
	var display = document.getElementById("initialv1Value");
	//show the amount
	display.innerHTML = newv1Value;
	v1 = newv1Value;
	reset();
}

function showa1Value(newa1Value) {
	//get the element
	var display = document.getElementById("initiala1Value");
	//show the amount
	a1 = newa1Value - 2;
	display.innerHTML = a1.toFixed(1);
	reset();
}

function showx2Value(newx2Value) {
	//get the element
	var display = document.getElementById("initialx2Value");
	//show the amount
	display.innerHTML = newx2Value;
	x2Init = Number(newx2Value);
	reset();
}

function showv2Value(newv2Value) {
	//get the element
	var display = document.getElementById("initialv2Value");
	//show the amount
	display.innerHTML = newv2Value;
	v2 = newv2Value;
	reset();
}

function showa2Value(newa2Value) {
	//get the element
	var display = document.getElementById("initiala2Value");
	//show the amount
	a2 = newa2Value - 2;
	display.innerHTML = a2.toFixed(1);
	reset();
}
