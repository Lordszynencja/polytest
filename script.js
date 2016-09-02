const starting_speed=[0,-10];
const boing_factor=0.99;
polies[0]=new Poly();
polies[1]=new Poly();
polies[0].add([[500,500],[550,600],[450,600]]);
polies[1].add([[500,350],[520,300],[520,250],[650,240],[650,230],[350,230],[350,240],[480,250],[480,300]]);
var closest_t=-1;
var closest_v=-1;
var holding=false;
var x=0;
var y=0;
var vleft=1;
var b=false;
var colliding=false;

function bulletCollide(v) {
	var i;
	var l=v.length;
	var collided=false;
	var leftx=vx*vleft;
	var lefty=vy*vleft;
	for (i=0;i<l;i++) {
		var x1=v[i][0];
		var y1=v[i][1];
		var x2=v[(i+1)%l][0];
		var y2=v[(i+1)%l][1];
		var ver1=[[x1,y1],[x2,y2]];
		var ver2=[[bx,by],[bx+leftx,by+lefty]];
		var cr=cross(ver1,ver2);
		if (cr!==false) {
			var distance=(cr[0]-bx)/leftx;
			var ang1=angle(vx,vy);
			var ang2=angle(x2-x1,y2-y1);
			var ang=2*(ang2-ang1);
			var newvx=(Math.cos(ang)*vx-Math.sin(ang)*vy)*boing_factor;
			var newvy=(Math.sin(ang)*vx+Math.cos(ang)*vy)*boing_factor;
			vx=newvx;
			vy=newvy;
			vleft-=distance;
			bx=cr[0]+0.01*vx;
			by=cr[1]+0.01*vy;
			collided=true;
		}
	}
	return collided;
}

function update() {
	var i;
	time+=0.02;
	if (left) {
		for (i=0;i<v1.length;i++) v1[i][0]--;
	}
	if (right) {
		for (i=0;i<v1.length;i++) v1[i][0]++;
	}
	if (up) {
		for (i=0;i<v1.length;i++) v1[i][1]--;
	}
	if (down) {
		for (i=0;i<v1.length;i++) v1[i][1]++;
	}
	/*if (space) {
		bx=v1[0][0];
		by=v1[0][1];
		vx=starting_speed[0];
		vy=starting_speed[1];
		b=false;
	}*/
	if (holding && closest_t!=-1) {
		polies[closest_t].v[closest_v]=[x,y];
	}
	//colliding=collide(v1,v2);
}

function drawVerts(v,t) {
	var i;
	var l=v.length;
	for (i=0;i<l;i++) {
		ctx.fillStyle=(holding && closest_t==t && closest_v==i ? hold_color : (colliding ? collide_color : color));
		ctx.fillRect(v[i][0]-2,v[i][1]-2,4,4);
		ctx.beginPath();
		ctx.moveTo(v[i][0],v[i][1]);
		ctx.lineTo(v[(i+1)%l][0],v[(i+1)%l][1]);
		ctx.stroke();
	}
}

var draw=function() {
	ctx.fillStyle='#111111';
	ctx.fillRect(0,0,800,600);
	for (var i=0;i<polies.length;i++) polies[i].draw((i==closest_t ? closest_v : -1));
	requestAnimationFrame(draw);
}



document.onmousedown=function(e) {
	holding=true;
	var i,j;
	var dist=30;
	var r=canvas.getBoundingClientRect();
	var tx=e.clientX-r.left;
	var ty=e.clientY-r.top;
	if (x<0 || x>canvas.width || y<0 || y>canvas.height) return 0;
	x=tx;
	y=ty;
	for (i=0;i<polies.length;i++) {
		for (j=0;j<polies[i].v.length;j++) {
			var xd=polies[i].v[j][0]-x;
			var yd=polies[i].v[j][1]-y;
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
	x=tx;
	y=ty;
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

window.setInterval(update,20);
requestAnimationFrame(draw);