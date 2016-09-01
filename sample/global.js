const debug=true;
const collide_color='#FF0000';
const color='#00FF00';
const hold_color='#0000FF';

var canvas=document.getElementById("canv");
var ctx=canvas.getContext("2d");
var time=0;
var polies=[];

var up=false;
var down=false;
var left=false;
var right=false;
var space=false;