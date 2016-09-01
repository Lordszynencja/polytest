
var closest_t=-1;
var closest_v=-1;
var holding=false;
var x=0;
var y=0;
var vleft=1;
var b=false;
var colliding=false;

function init() {
	polies[0]=new Poly();
	polies[1]=new Poly();
	polies[2]=new Poly();
	polies[3]=new Poly();
	polies[0].add([[500,500],[550,600],[450,600]]);
	polies[1].add([[500,350],[520,300],[520,250],[700,230],[650,230],[350,230],[300,230],[480,250],[480,300]]);
	polies[2].add([[50,50],[100,50],[150,50],[200,50]]);
	polies[3].add([[50,50],[50,100],[50,150],[50,200]]);
}

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
	var l=polies[0].v.length;
	if (left) {
		for (i=0;i<l;i++) polies[0].v[i][0]--;
	}
	if (right) {
		for (i=0;i<l;i++) polies[0].v[i][0]++;
	}
	if (up) {
		for (i=0;i<l;i++) polies[0].v[i][1]--;
	}
	if (down) {
		for (i=0;i<l;i++) polies[0].v[i][1]++;
	}
	/*if (space) {
		bx=polies[0].v[0][0];
		by=polies[0].v[0][1];
		vx=starting_speed[0];
		vy=starting_speed[1];
		b=false;
	}*/
	if (holding && closest_t!=-1) {
		polies[closest_t].v[closest_v]=[x,y];
	}
	//colliding=collide(v1,v2);
}

var draw=function() {
	ctx.fillStyle='#111111';
	ctx.fillRect(0,0,800,600);
	for (var i=0;i<polies.length;i++) polies[i].draw((i==closest_t ? closest_v : -1));
	for (var i=0;i<polies.length;i++) {
		var poly=new Poly();
		poly.add(polies[i].convex());
		poly.drawWithColor('#0000FF');
	}
	requestAnimationFrame(draw);
}

init();
window.setInterval(update,20);
requestAnimationFrame(draw);