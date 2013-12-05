var canv = document.getElementById('canv');
var ctx = canv.getContext("2d");
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(180, 180);
ctx.strokeStyle = '#d0d0d0';
ctx.stroke();
