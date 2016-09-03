function init() {
	polies[0]=new Poly();
	polies[1]=new Poly();
	polies[2]=new Poly();
	polies[3]=new Poly();
	polies[0].add([[500,500],[550,600],[450,600]]);
	polies[1].add([[500,350],[520,300],[520,250],[700,230],[650,230],[350,230],[300,230],[480,250],[480,300]]);
	polies[1].setConvex([[[500,350],[520,300],[520,250],[480,250],[480,300]],[[700,230],[650,230],[350,230],[300,230],[480,250],[520,250]]]);
	polies[2].add([[50,50],[100,50],[150,50],[200,50]]);
	polies[3].add([[50,50],[50,100],[50,150],[50,200]]);
}

function update() {
	var i,j;
	time+=0.02;
	var l=polies[0].v.length;
	if (left) {
		for (i=0;i<l;i++) polies[0].v[i][0]--;
		polies[0].hasConvex = false;
	}
	if (right) {
		for (i=0;i<l;i++) polies[0].v[i][0]++;
		polies[0].hasConvex = false;
	}
	if (up) {
		for (i=0;i<l;i++) polies[0].v[i][1]--;
		polies[0].hasConvex = false;
	}
	if (down) {
		for (i=0;i<l;i++) polies[0].v[i][1]++;
		polies[0].hasConvex = false;
	}
	if (space) {
		bullets.push(new Bullet(polies[0].v[0][0],polies[0].v[0][1],0,-5));
	}
	if (holding && closest_t>=0 && closest_t<polies.length) {
		polies[closest_t].set(closest_v,mx,my);
	}
	for (i=0;i<bullets.length;i++) {
		if (bullets[i]!=null && bullets[i].update()) delete bullets[i];
	}
	for (i=0;i<polies.length;i++) polies[i].colliding = false;
	for (i=0;i<polies.length;i++) {
		var c1 = polies[i].convex();
		for (j=i+1;j<polies.length;j++) {
			var c2 = polies[j].convex();
			var ci,cj;
			for (ci=0;ci<c1.length;ci++) {
				for (cj=0;cj<c2.length;cj++) {
					if (collide(c1[ci],c2[cj])) {
						polies[i].colliding = true;
						polies[j].colliding = true;
					}
				}
			}
		}
	}
}

var draw=function() {
	requestAnimationFrame(draw);
	var i,j;
	ctx.fillStyle='#999999';
	ctx.fillRect(0,0,800,600);
	for (i=0;i<polies.length;i++) polies[i].draw((i==closest_t ? closest_v : -1));
	for (i=0;i<polies.length;i++) {
		var c = polies[i].convex();
		for (j=0;j<c.length;j++) {
			var poly=new Poly();
			poly.add(c[j]);
			poly.drawWithColor('#0000FF');
		}
	}
	for (i=0;i<bullets.length;i++) {
		if (bullets[i]!=null) bullets[i].draw();
	}
}

init();
window.setInterval(update,20);
requestAnimationFrame(draw);