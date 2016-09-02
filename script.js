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
	if (space && bullets.length<1) {
		console.log(1);
		bullets.push(new Bullet(polies[0].v[0][0],polies[0].v[0][1],0,-5));
		console.log([polies[0].v[0][0],polies[0].v[0][1],0,-5]);
	}
	if (holding && closest_t!=-1) {
		polies[closest_t].v[closest_v]=[mx,my];
	}
	for (i=0;i<bullets.length;i++) {
		bullets[i].update();
	}
	//colliding=collide(v1,v2);
}

var draw=function() {
	var i;
	ctx.fillStyle='#111111';
	ctx.fillRect(0,0,800,600);
	for (var i=0;i<polies.length;i++) polies[i].draw((i==closest_t ? closest_v : -1));
	for (var i=0;i<polies.length;i++) {
		var poly=new Poly();
		poly.add(polies[i].convex());
		poly.drawWithColor('#0000FF');
	}
	for (i=0;i<bullets.length;i++) {
		bullets[i].draw();
	}
	requestAnimationFrame(draw);
}

init();
window.setInterval(update,20);
requestAnimationFrame(draw);