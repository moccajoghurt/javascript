/*
		NOTE: developed for Firefox 26.0 on Windows 7 x64! Untested for any other architecture!
		Simulation der Vererbung und Verbreitung der Augenfarbe
*/

document.getElementById("nodesize").onchange = init_canvas;
document.getElementById("cursorsize").onchange = set_cursor_size;
document.getElementById("braun").onclick = function () {draw_color = "braun"};
document.getElementById("blau").onclick = function () {draw_color = "blau"};
document.getElementById("gruen").onclick = function () {draw_color = "gruen"};
document.getElementById("grau").onclick = function () {draw_color = "grau"};
document.getElementById("start_sim").onclick = start_sim;
document.getElementById("next").onclick = create_new_node_map;

canv = document.getElementById("canv");
canv.addEventListener("mousemove", draw_preview, false);
canv.addEventListener("mousedown", draw, false);
canv.addEventListener("mouseup", function () {mouse_pressed = 0}, false);
ctx = canv.getContext("2d");

var node_size;
draw_color = "braun";

var cursor_size;
set_cursor_size();

var mouse_pressed = 0;

var node_map;
init_node_map();

init_canvas();

/*
document.getElementById("infotable").innerHTML = "node-nr: <br /> bey2: <br /> &nbsp;&nbsp; Allel 1: <br />&nbsp;&nbsp; Allel 2: <br />gey: <br /> &nbsp;&nbsp; Allel 1: <br />&nbsp;&nbsp; Allel 2: <br />";
*/
function start_sim() {
	set_node_properties();
}


function create_new_node_map() {
	
	//init new node map
	var new_node_map = new Array();
	for (var i = 0; i < node_map.length; i++) {
		new_node_map[i] = new Array();
		for (var n = 0; n < node_map[i].length; n++) {
			new_node_map[i][n] = new Node();
		}
	}
	
	for (var i = 0; i < node_map.length; i++) {
		
		for (var n = 0; n < node_map[i].length; n++) {
			
			if (node_map[i][n].color == null || node_map[i][n].reproduced == true)
				continue;
			
			
			var edge_x = (n - 2) + Math.floor(Math.random()*5);
			var edge_y = (i - 2) + Math.floor(Math.random()*5);
			
			/* Randfälle */
			if (edge_x == n && edge_y == i) {
				edge_x++;
			}
			
			if (edge_x < 0)
				edge_x = n == 0 ? 1 : 0;
			
			if (edge_x > node_map[i].length - 1)
				edge_x = n == node_map[i].length - 1 ? node_map[i].length - 2 : node_map[i].length - 1;
				
			if (edge_y < 0)
				edge_y = i == 0 ? 1 : 0;
			
			if (edge_y > node_map.length - 1)
				edge_y = i == node_map.length - 1 ? node_map.length - 2 : node_map.length - 1;
				
			/* Randfälle Ende*/
			
			if (node_map[edge_y][edge_x].reproduced == false) {
				
				/***** vererbung  ******/
				
				new_node_map[edge_y][edge_x].bey2 = new Array();
				new_node_map[i][n].bey2 = new Array();
				
				
				// kind1 bey2
				new_node_map[edge_y][edge_x].bey2[0] = node_map[edge_y][edge_x].bey2[Math.floor(Math.random() * 2)];
				new_node_map[edge_y][edge_x].bey2[1] = node_map[i][n].bey2[Math.floor(Math.random() * 2)];
				
				//kind2 bey2
				new_node_map[i][n].bey2[0] = node_map[edge_y][edge_x].bey2[Math.floor(Math.random() * 2)];
				new_node_map[i][n].bey2[1] = node_map[i][n].bey2[Math.floor(Math.random() * 2)];
				
				
				new_node_map[edge_y][edge_x].gey = new Array();
				new_node_map[i][n].gey = new Array();
				
				//kind1 gey
				new_node_map[edge_y][edge_x].gey[0] = node_map[edge_y][edge_x].gey[Math.floor(Math.random() * 2)];
				new_node_map[edge_y][edge_x].gey[1] = node_map[i][n].gey[Math.floor(Math.random() * 2)];
				
				//kind2 gey
				new_node_map[i][n].gey[0] = node_map[edge_y][edge_x].gey[Math.floor(Math.random() * 2)];
				new_node_map[i][n].gey[1] = node_map[i][n].gey[Math.floor(Math.random() * 2)];
				
				/***** vererbung ende ******/
				
				
				node_map[edge_y][edge_x].reproduced = true;
				node_map[i][n].reproduced = true;
				
			} else {
				var found_partner_node = false;
				
				var _x = (n - 2) < 0 ? 0 : n - 2;
				var _y = (i - 2) < 0 ? 0 : i - 2;
				
				for (var y = _y; y < 5; y++) {
					for (var x = _x; x < 5; x++) {
						
						if (y > node_map.length - 1 || x > node_map[y].length - 1)
							continue;
						
						
						if (node_map[y][x].reproduced == false) {
							
							/***** vererbung  ******/
							
							new_node_map[y][x].bey2 = new Array();
							new_node_map[i][n].bey2 = new Array();
							
							
							// kind1 bey2
							new_node_map[y][x].bey2[0] = node_map[y][x].bey2[Math.floor(Math.random() * 2)];
							new_node_map[y][x].bey2[1] = node_map[i][n].bey2[Math.floor(Math.random() * 2)];
							
							//kind2 bey2
							new_node_map[i][n].bey2[0] = node_map[y][x].bey2[Math.floor(Math.random() * 2)];
							new_node_map[i][n].bey2[1] = node_map[i][n].bey2[Math.floor(Math.random() * 2)];
							
							
							new_node_map[y][x].gey = new Array();
							new_node_map[i][n].gey = new Array();
							
							//kind1 gey
							new_node_map[y][x].gey[0] = node_map[y][x].gey[Math.floor(Math.random() * 2)];
							new_node_map[y][x].gey[1] = node_map[i][n].gey[Math.floor(Math.random() * 2)];
							
							//kind2 gey
							new_node_map[i][n].gey[0] = node_map[y][x].gey[Math.floor(Math.random() * 2)];
							new_node_map[i][n].gey[1] = node_map[i][n].gey[Math.floor(Math.random() * 2)];
							
							/***** vererbung ende ******/
							
							node_map[y][x].reproduced = true;
							node_map[i][n].reproduced = true;
							found_partner_node = true;
							
						} 
					}
				}
				
				if (found_partner_node == false) {
					
					/***** vererbung  ******/
					
					new_node_map[i][n].bey2 = new Array();
					
					
					new_node_map[i][n].bey2[0] = node_map[_y][_x].bey2[Math.floor(Math.random() * 2)];
					new_node_map[i][n].bey2[1] = node_map[i][n].bey2[Math.floor(Math.random() * 2)];
					
					new_node_map[i][n].gey = new Array();
					
					new_node_map[i][n].gey[0] = node_map[_y][_x].gey[Math.floor(Math.random() * 2)];
					new_node_map[i][n].gey[1] = node_map[i][n].gey[Math.floor(Math.random() * 2)];
					
					/***** vererbung ende ******/
					node_map[i][n].reproduced = true;
				}
				
			}
			
		}
	}
	
	determine_color(new_node_map);
	node_map = new_node_map;
	draw_nodes();
	draw_raster();
	
}


function determine_color(new_node_map) {
	
	for (var i = 0; i < new_node_map.length; i++) {
		for (var n = 0; n < new_node_map[i].length; n++) {
			
			if (new_node_map[i][n].bey2[0] == "braun" || new_node_map[i][n].bey2[1] == "braun") {
				new_node_map[i][n].color = "braun";
				
			} else if (new_node_map[i][n].gey[0] == "gruen" || new_node_map[i][n].gey[1] == "gruen") {
				new_node_map[i][n].color = "gruen";
				
			} else if (new_node_map[i][n].gey[0] == "blau" || new_node_map[i][n].gey[1] == "blau") {
				new_node_map[i][n].color = "blau";
				
			} else {
				new_node_map[i][n].color = "grau";
			}
			
		}
	}
}

function set_node_properties() {

	for (var i = 0; i < node_map.length; i ++) {
		for (var n = 0; n < node_map[i].length; n++) {
			
			node_map[i][n].bey2 = new Array();
			node_map[i][n].gey = new Array();
			
			if (node_map[i][n].color == "braun") {
				
				node_map[i][n].bey2[0] = "braun";
				//node_map[i][n].bey2[1] = Math.floor(Math.random()*100) < 50 ? "braun" : "blau";
				node_map[i][n].bey2[1] = "braun";
				
				
				var rand = Math.floor(Math.random()*100);
				var rand1 = Math.floor(Math.random()*100);
				
				if (rand < 34) node_map[i][n].gey[0] = "blau";
				else if (rand < 67) node_map[i][n].gey[0] = "gruen";
				else if (rand < 100) node_map[i][n].gey[0] = "grau";
				
				if (rand1 < 34) node_map[i][n].gey[1] = "blau";
				else if (rand1 < 67) node_map[i][n].gey[1] = "gruen";
				else if (rand1 < 100) node_map[i][n].gey[1] = "grau";
				
				
				
			} else if (node_map[i][n].color == "blau") {
				
				node_map[i][n].bey2[0] = "blau";
				node_map[i][n].bey2[1] = "blau";
				
				node_map[i][n].gey[0] = "blau";
				
				var rand = Math.floor(Math.random()*100);
				
				node_map[i][n].gey[1] = rand < 50 ? "blau" : "grau";
				
				
			} else if (node_map[i][n].color == "gruen") {
				
				node_map[i][n].bey2[0] = "blau";
				node_map[i][n].bey2[1] = "blau";
				
				node_map[i][n].gey[0] = "gruen";
				
				var rand = Math.floor(Math.random()*100);
				
				if (rand < 34) node_map[i][n].gey[1] = "blau";
				else if (rand < 67) node_map[i][n].gey[1] = "gruen";
				else if (rand < 100) node_map[i][n].gey[1] = "grau";
				
				
			} else if (node_map[i][n].color == "grau") {
				
				node_map[i][n].bey2[0] = "blau";
				node_map[i][n].bey2[1] = "blau";
				
				node_map[i][n].gey[0] = "grau";
				node_map[i][n].gey[1] = "grau";
			}
		}
	}
}


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

	mouse_pressed = 1;
	var x = e.pageX;
	var y = e.pageY;
	x -= canv.offsetLeft;
	y -= canv.offsetTop;
	
	var node_x = Math.floor(x / node_size)*node_size;
	var node_y = Math.floor(y / node_size)*node_size;
	
	for (var i = node_y / node_size; i < node_y / node_size + cursor_size; i++) {
		
		for (var n = node_x / node_size; n < node_x / node_size + cursor_size; n++) {
			
			if (i >= 0 && i < node_map.length && n >= 0 && n < node_map[i].length) {
				switch(draw_color) {
					case "braun": 
						node_map[i][n].color = "braun";
						ctx.fillStyle = "#6B1B00";
						break;
					
					case "blau": 
						node_map[i][n].color = "blau"; 
						ctx.fillStyle = "#00ACE6";
						break;
					
					case "gruen": 
						node_map[i][n].color = "gruen";
						ctx.fillStyle = "#00B82E";
						break;
					
					case "grau": 
						node_map[i][n].color = "grau";
						ctx.fillStyle = "#D6D6D6";
						break;
				}
				
				ctx.fillRect(n*node_size, i*node_size, node_size, node_size);
			}
		}
	}
}

function draw_nodes() {
	for (var i = 0; i < node_map.length; i ++) {
		for (var n = 0; n < node_map[i].length; n++) {
			
			switch(node_map[i][n].color) {
				case "braun": ctx.fillStyle = "#6B1B00"; break;
				case "blau": ctx.fillStyle = "#00ACE6"; break;
				case "gruen": ctx.fillStyle = "#00B82E"; break;
				case "grau": ctx.fillStyle = "#D6D6D6"; break;
			}
			
			if (node_map[i][n].color != null) {
				ctx.fillRect(n*node_size, i*node_size, node_size, node_size);
			}
		}
	}
	
}


function draw_preview(e) {
	if (mouse_pressed == 1) {
		draw(e);
		return
	}
	
	ctx.clearRect(0, 0, canv.width, canv.height);
	var x = e.pageX;
	var y = e.pageY;
	x -= canv.offsetLeft;
	y -= canv.offsetTop;
	
	var node_x = Math.floor(x / node_size)*node_size;
	var node_y = Math.floor(y / node_size)*node_size;
	
	draw_nodes();
	
	switch(draw_color) {
		case "braun": ctx.fillStyle = "#6B1B00"; break;
		case "blau": ctx.fillStyle = "#00ACE6"; break;
		case "gruen": ctx.fillStyle = "#00B82E"; break;
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
	
	if (node_size < 5)
		return
	
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
	//genmaterial
	this.bey2 = null;
	this.gey = null;
	this.reproduced = false;
}

