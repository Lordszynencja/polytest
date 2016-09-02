class Bullet {
	collide(v) {
		var i;
		var l=v.length;
		var collided=false;
		var leftx=this.vx*this.vleft;
		var lefty=this.vy*this.vleft;
		for (i=0;i<l;i++) {
			var x1=v[i][0];
			var y1=v[i][1];
			var x2=v[(i+1)%l][0];
			var y2=v[(i+1)%l][1];
			var ver1=[[x1,y1],[x2,y2]];
			var ver2=[[this.x,this.y],[this.x+leftx,this.y+lefty]];
			var cr=cross(ver1,ver2);
			if (cr!==false) {
				console.log(cr);
				var distance = (cr[0]-this.x)/leftx;
				var ang1=angle(this.vx,this.vy);
				var ang2=angle(x2-x1,y2-y1);
				var ang=2*(ang2-ang1);
				var newvx=(Math.cos(ang)*this.vx-Math.sin(ang)*this.vy)*boing_factor;
				var newvy=(Math.sin(ang)*this.vx+Math.cos(ang)*this.vy)*boing_factor;
				this.vx=newvx;
				this.vy=newvy;
				this.vleft-=distance;
				this.x=cr[0]+0.001*this.vx;
				this.y=cr[1]+0.001*this.vy;
				collided=true;
			}
		}
		return collided;
	}
	
	update() {
		this.vleft = 1;
		var col = polies.length;
		var i;
		console.log(this.x+" "+this.y);
		while (col>=0 && this.vleft>0.001) {
			col = -1;
			for (i=0;i<polies.length;i++) if (i!=col && this.collide(polies[i].v)) col = i;
		}
		console.log("after:"+this.x+" "+this.y);
		if (this.vleft>0.001) {
			this.x+=this.vx*this.vleft;
			this.y+=this.vy*this.vleft;
		}
	}
	
	draw() {
		var style = ctx.fillStyle;
		ctx.fillStyle = '#FFFF00';
		ctx.fillRect(this.x-1,this.y-1,3,3);
		ctx.fillStyle = style;
	}
	
	constructor(x,y,vx,vy) {
		this.x=x;
		this.y=y;
		this.vx=vx;
		this.vy=vy;
		console.log([x,y,vx,vy]);
	}
}