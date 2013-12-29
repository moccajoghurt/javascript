document.getElementById("nodesize").onchange = init_canvas;
document.getElementById("cursorsize").onchange = set_cursor_size;
document.getElementById("braun").onclick = function () {draw_color = "braun"};
document.getElementById("blau").onclick = function () {draw_color = "blau"};
document.getElementById("gruen").onclick = function () {draw_color = "gruen"};
document.getElementById("grau").onclick = function () {draw_color = "grau"};


canv = document.getElementById("canv");
canv.addEventListener("mousemove", draw_preview, false);
canv.addEventListener("mousedown", draw, false);
ctx = canv.getContext("2d");

var node_size;
draw_color = "braun";

var cursor_size;
set_cursor_size();

init_canvas();

var node_map;
init_node_map();

function init_node_map() {
	
	node_map = new Array();
	for (var i = 0; i < canv.height/node_size; i++) {
		node_map[i] = new Array();
		for (var n = 0; n < canv.width/node_size; n++) {
			node_map[i][n] = new Node();
		}
	}
}

function draw(e) {
	var x = e.pageX;
	var y = e.pageY;
	x -= canv.offsetLeft;
	y -= canv.offsetTop;
	
	var node_x = Math.floor(x / node_size)*node_size;
	var node_y = Math.floor(y / node_size)*node_size;
	
}


function draw_preview(e) {
	ctx.clearRect(0, 0, canv.width, canv.height);
	var x = e.pageX;
	var y = e.pageY;
	x -= canv.offsetLeft;
	y -= canv.offsetTop;
	
	var node_x = Math.floor(x / node_size)*node_size;
	var node_y = Math.floor(y / node_size)*node_size;
	
	switch(draw_color) {
		case "braun": ctx.fillStyle = "#6B1B00"; break;
		case "blau": ctx.fillStyle = "#00ACE6"; break;
		case "grau": ctx.fillStyle = "#D6D6D6"; break;
	}
	
	for (var i = node_x; i < node_x + cursor_size * node_size; i+=node_size) {
		
		for (var n = node_y; n < node_y + cursor_size * node_size; n+=node_size) {
			
			if (i >= 0 && i < canv.width && n >= 0 && n < canv.height) {
				ctx.fillRect(i, n, node_size, node_size);
			}
		}
	}
	draw_raster();
}


function init_canvas() {
	
	var ns = document.getElementById("nodesize");
	node_size = parseInt(ns.options[ns.selectedIndex].value);
	
	ctx.clearRect(0, 0, canv.width, canv.height);
	draw_raster();
	init_node_map();
}


function draw_raster() {
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#5C5C5C";
	ctx.beginPath();
	
	for (var i = 0; i < canv.height; i+= node_size) {
		
		ctx.moveTo(0,i);
		ctx.lineTo(canv.width, i);
		
		ctx.moveTo(i,0);
		ctx.lineTo(i, canv.height);
	}
	ctx.stroke();
}

function set_cursor_size() {
	var cs = document.getElementById("cursorsize");
	cursor_size = parseInt(cs.options[cs.selectedIndex].value);
}

function Node() {
	this.color = null;
	//this.reprate = reprate;
	//genmaterial
	//this.bey2 = new Array();
	//this.gey = new Array();
}
