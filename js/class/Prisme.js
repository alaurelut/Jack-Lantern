var Prisme = function(x,y,type,number)
{
	this.pos;
	this.type;
	var _img = new Image();

	this.init = function(x,y,type,number)
	{
		this.pos = {x: x, y: y};
		this.type = type;
		this.number = number;
		_img.src = "./images/fleche.png";
	}

	this.draw = function()
	{
		ctx2.beginPath();
		ctx2.drawImage(_img,0,0,120,120,this.pos.x,this.pos.y,60,60);
		ctx2.closePath();
	}

	this.init(x,y,type,number);
}

function drawPrisme()
{
	for (var e = 0; e < prismeArray.length; e++)
	{
		prismeArray[e].draw();
	}
}