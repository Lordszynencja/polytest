const debug=true;
const collide_color='#FF0000';
const color='#00FF00';
const hold_color='#0000FF';
const starting_speed=[0,-10];
const boing_factor=0.99;

var canvas=document.getElementById("canv");
var ctx=canvas.getContext("2d");
var time=0;
var polies=[];
var bullets=[];
var closest_t=-1;
var closest_v=-1;

var up=false;
var down=false;
var left=false;
var right=false;
var space=false;
var mx=0;
var my=0;

document.onmousedown=function(e) {
	holding=true;
	var i,j;
	var dist=30;
	var r=canvas.getBoundingClientRect();
	var tx=e.clientX-r.left;
	var ty=e.clientY-r.top;
	if (mx<0 || mx>canvas.width || my<0 || my>canvas.height) return 0;
	mx=tx;
	my=ty;
	for (i=0;i<polies.length;i++) {
		for (j=0;j<polies[i].v.length;j++) {
			var xd=polies[i].v[j][0]-mx;
			var yd=polies[i].v[j][1]-my;
			if (xd*xd+yd*yd<dist) {
				closest_t=i;
				closest_v=j;
			}
		}
	}
}

document.onmouseup=function(e) {
	holding=false;
	closest_t=-1;
	closest_v=-1;
}

document.onmousemove=function(e) {
	var r=canvas.getBoundingClientRect();
	var tx=e.clientX-r.left;
	var ty=e.clientY-r.top;
	if (tx<0 || tx>canvas.width || ty<0 || ty>canvas.height) return 0;
	mx = tx;
	my = ty;
}

document.onkeydown=function(e) {
	var id=e.keyCode;
	switch (id) {
		case 32://space
			space=true;
			break;
		case 37://left
			left=true;
			break;
		case 38://up
			up=true;
			break;
		case 39://right
			right=true;
			break;
		case 40://down
			down=true;
			break;
		default:
			console.log(id);
			break;
	};
}

document.onkeyup=function(e) {
	var id=e.keyCode;
	switch (id) {
		case 32://space
			space=false;
			break;
		case 37://left
			left=false;
			break;
		case 38://up
			up=false;
			break;
		case 39://right
			right=false;
			break;
		case 40://down
			down=false;
			break;
		default:
			console.log(id);
			break;
	};
}