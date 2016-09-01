//Poly class

function BubblesortByPolarAngle(t,p) {
	var l=t.length;
	var i,j,swapped;
	for (i=1;i<l;i++) {
		swapped=false;
		for (j=0;j<l-i;j++) {
			if (crossProduct(p,t[j],t[j+1])<=0) {
				var swap=t[j];
				t[j]=t[j+1];
				t[j+1]=swap;
				swapped=true;
			}
		}
		if (!swapped) i=l;
	}
	return t;
}

class Poly {
	draw(c) {
		var l=this.v.length;
		ctx.beginPath();
		ctx.moveTo(this.v[l-1][0],this.v[l-1][1]);
		for (var i=0;i<l;i++) {
			ctx.fillStyle = (i==c ? hold_color : (colliding ? collide_color : color));
			ctx.fillRect(this.v[i][0]-1,this.v[i][1]-1,3,3);
			ctx.lineTo(this.v[i][0],this.v[i][1]);
		}
		ctx.stroke();
	}
	
	drawWithColor(col) {
		var l = this.v.length;
		var oldStrokeStyle = ctx.strokeStyle;
		ctx.beginPath();
		ctx.strokeStyle = col;
		ctx.moveTo(this.v[l-1][0],this.v[l-1][1]);
		for (var i=0;i<l;i++) {
			ctx.lineTo(this.v[i][0],this.v[i][1]);
		}
		ctx.stroke();
		ctx.strokeStyle = oldStrokeStyle;
	}
	
	findLowestY() {
		var best=0;
		var l=this.v.length;
		for (var i=1;i<l;i++) if (this.v[i][1]<this.v[best][1] || (this.v[i][1]==this.v[best][1] && this.v[i][0]<this.v[best][0])) best=i;
		return best;
	}
	
	convex() {
		var l = this.v.length;
		var m = 1;
		var best = this.findLowestY();
		var hull = [this.v[best]];
		var others = this.v.slice(0,best).concat(this.v.slice(best+1,l));
		others=hull.concat(BubblesortByPolarAngle(others,hull[0]));
		for (var i=0;i<others.length;i++) {
			var best=i;
			while (i<others.length-1 && crossProduct(hull[0],others[best],others[i+1])==0) {
				i++;
				if (dist(others[i],hull[0])>=dist(others[best],hull[0])) {
					best = i;
				}
			}
			others[m] = others[best];
			m++;
		}
		others = others.slice(0,m);
		hull[1]=others[1];
		for (var i=2;i<others.length;i++) {
			while (crossProduct(hull[hull.length-2],hull[hull.length-1],others[i])<=0) {
				if (hull.length>2) hull.length--;
				else if (i<others.length-1) i++;
				else break;
			}
			hull.push([others[i][0],others[i][1]]);
		}
		return hull;
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