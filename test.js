
var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");
var node_size = 200;


var nodes = new Array();
//init nodes
for (var i = 0; i < canv.height/node_size; i ++) {
    nodes[i] = new Array();
    for (var n = 0; n < canv.width/node_size; n++) {
        nodes[i][n] = Math.floor(Math.random()*1000) > 500 ? "blue" : "brown";
    }
}


// evolution algorithm
for (var i = 0; i < canv.height/node_size; i ++) {
    for (var n = 0; n < canv.width/node_size; n++) {
        
    }
}


//draw nodes
for (var i = 0; i < canv.height/node_size; i ++) {
    for (var n = 0; n < canv.width/node_size; n++) {
        
        switch(nodes[i][n]) {
            case "brown": ctx.fillStyle = "#6B1B00"; break;
            case "blue": ctx.fillStyle = "#00ACE6"; break;
            case "grey": ctx.fillStyle = "#D6D6D6"; break;
        }
        ctx.fillRect(n*node_size, i*node_size, node_size, node_size);
    }
}



draw_raster(ctx, canv, node_size);

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
