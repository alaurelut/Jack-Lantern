/*****************************************************************************
*classe de d'interrupteur 
*****************************************************************************/

var Interrupteur = function(x,y,width,height,color)
{
	this.pos;
	this.scale;
	this.typeOf;
	var _img = new Image();
	this.init = function(x,y,width,height,color)
	{
		this.pos = { x: x, y : y};
		this.scale = { w : width , h : height}
		this.typeOf = color;
		_img.src = "./images/tessonSprite/interrupteur.png";
		//console.log(_img.src);
		
	}
	this.draw = function()
	{
		ctx2.beginPath();
		ctx2.drawImage(_img,0,0,161,198,this.pos.x,this.pos.y,60,60);
		ctx2.closePath();
	}
	this.init(x,y,width,height,color);
}


function drawInterrupteur()
{
	for (var e = 0; e < interrupteurArray.length; e++ )
	{
		interrupteurArray[e].draw();
	}
}