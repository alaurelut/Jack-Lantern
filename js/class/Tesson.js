var Tesson = function(x,y,width,height,color)
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
		_img.src = "./images/tessonSprite/G"+color+".png";
		
	}
	this.draw = function()
	{
		ctx3.beginPath();
		ctx3.drawImage(_img,0,0,200,200,this.pos.x,this.pos.y,60,60);
		ctx3.closePath();
	}
	this.init(x,y,width,height,color);
}


function drawTesson()
{
	for (var e = 0; e < tessonArray.length; e++ )
	{
		tessonArray[e].draw();
	}
}