class Poly {
	draw(c) {
		var l=this.v.length;
		ctx.beginPath();
		for (var i=0;i<l;i++) {
			ctx.fillStyle = (i==c ? hold_color : (colliding ? collide_color : color));
		}
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