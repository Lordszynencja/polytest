class Bullet {
	collide(v) {
		var i;
		var l=v.length;
		var collided=false;
		var leftx=vx*this.vleft;
		var lefty=vy*this.vleft;
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
				this.vleft-=distance;
				bx=cr[0]+0.01*vx;
				by=cr[1]+0.01*vy;
				collided=true;
			}
		}
		return collided;
	}
	
	update() {
		this.vleft=1;
		var col=true;
		var i;
		while ( && vleft>0.001) {
			col=false;
			for (i=0;i<polies.length) bulletCollide(polies[i].v);
	//	;
	/*if (vleft>0.001) {
		bx+=vx*vleft;
		by+=vy*vleft;
	}*/
	}
	
	constructor(x,y,ax,ay) {
		this.x=x;
		this.y=y;
		this.ax=ax;
		this.ay=ay;
	}
}