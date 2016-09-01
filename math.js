function shadow(xy,tan) {
	return xy[0]-tan*xy[1];
}

function shadow2(xy,tan) {
	return xy[1];
}

function angle(x,y) {
	var d=Math.sqrt(x*x+y*y);
	return (x>0 ? Math.asin(y/d) : Math.PI-Math.asin(y/d));
}

function check(x,x1,x2) {
	return ((x>x1 && x>x2) || (x<x1 && x<x2));
}

function crossProduct(p1,p2,p3) {
	return (p2[0]-p1[0])*(p3[1]-p1[1])-(p2[1]-p1[1])*(p3[0]-p1[0]);
}

function cross(l1,l2) {
	var dx1=l1[1][0]-l1[0][0];
	var dy1=l1[1][1]-l1[0][1];
	var dx2=l2[1][0]-l2[0][0];
	var dy2=l2[1][1]-l2[0][1];
	if (dx1==0) {
		if (dx2==0) {
			return false;
		} else {
			var a=dy2/dx2;
			var b=l2[0][1]-a*l2[0][0];
			var x=l1[0][0];
			var p=[x,a*x+b];
			if (check(x,l2[0][0],l2[1][0]) || check(p[1],l1[0][1],l1[1][1]) || check(p[1],l2[0][1],l2[1][1])) return false;
			return p;
		}
	} else {
		if (dx2==0) {
			var a=dy1/dx1;
			var b=l1[0][1]-a*l1[0][0];
			var x=l2[0][0];
			var p=[x,a*x+b];
			if (check(x,l1[0][0],l1[1][0]) || check(p[1],l1[0][1],l1[1][1]) || check(p[1],l2[0][1],l2[1][1])) return false;
			return p;
		} else {
			var a1=dy1/dx1;
			var b1=l1[0][1]-a1*l1[0][0];
			var a2=dy2/dx2;
			var b2=l2[0][1]-a2*l2[0][0];
			if (a1==a2) return false;
			var x=(b2-b1)/(a1-a2);
			var p=[x,a1*x+b1];
			if (check(x,l1[0][0],l1[1][0]) || check(x,l2[0][0],l2[1][0]) || check(p[1],l1[0][1],l1[1][1]) || check(p[1],l2[0][1],l2[1][1])) return false;
			return p;
		} 
	}
	return false;
}