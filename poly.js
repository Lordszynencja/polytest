class Poly {
	draw(c) {
		var l=this.v.length;
		ctx.beginPath();
		ctx.moveTo(this.v[l-1][0],this.v[l-1][1]);
		for (var i=0;i<l;i++) {
			ctx.fillStyle = (i==c ? hold_color : (colliding ? collide_color : color));
			ctx.lineTo(this.v[i][0],this.v[i][1]);
		}
		ctx.stroke();
	}
	
	add(v) {
		this.v=this.v.concat(v);
	}
	
	delete(l) {
		this.v=this.v.slice(0,this.v.length-l);
	}
	
	constructor() {
		this.v=[];
	}
}