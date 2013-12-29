
var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");
var node_size = 100;
var nodes = new Array();


init_nodes_random(nodes);

draw_nodes(nodes, ctx, canv);
draw_raster(ctx, canv, node_size);


function Node(color, reprate) {

	this.color = color;
	this.reprate = reprate;
	
	//genmaterial
	this.bey2 = new Array();
	this.gey = new Array();
}



function init_nodes_random(nodes) {
	
	for (var i = 0; i < canv.height/node_size; i++) {
		nodes[i] = new Array();
		for (var n = 0; n < canv.width/node_size; n++) {
		    nodes[i][n] = new Array();
		    
		    //set color
		    nodes[i][n][0] = Math.floor(Math.random()*1000) > 500 ? "blue" : "brown";
		    
		    switch(nodes[i][n][0]) {
		        case "brown":
		            //Genmaterial
		            //braun
		            nodes[i][n][1] = 100;
		            //blau
		            nodes[i][n][2] = 0;
		            //grün
		            nodes[i][n][3] = 0;
					//reproduktionsrate
					nodes[i][n][4] = 1.0;
		            break;
		            
		        case "blue": 
		            //Genmaterial
		            //braun
		            nodes[i][n][1] = 0;
		            //blau
		            nodes[i][n][2] = 100;
		            //grün
		            nodes[i][n][3] = 0;
					//reproduktionsrate
					nodes[i][n][4] = 1.0;
		            break;
		            
		        case "grey": 
		            //Genmaterial
		            //braun
		            nodes[i][n][1] = 0;
		            //blau
		            nodes[i][n][2] = 0;
		            //grün
		            nodes[i][n][3] = 100;
					//reproduktionsrate
					nodes[i][n][4] = 1.0;
		            break;
		    }
		}
	}
}

function draw_nodes(nodes, ctx, canv) {
	for (var i = 0; i < canv.height/node_size; i ++) {
		for (var n = 0; n < canv.width/node_size; n++) {
		    
		    switch(nodes[i][n][0]) {
		        case "brown": ctx.fillStyle = "#6B1B00"; break;
		        case "blue": ctx.fillStyle = "#00ACE6"; break;
		        case "grey": ctx.fillStyle = "#D6D6D6"; break;
		    }
		    ctx.fillRect(n*node_size, i*node_size, node_size, node_size);
		}
	}
}

function draw_raster(ctx, canv, node_size) {
    
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
