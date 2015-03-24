/*****************************************************************************
*classe de mur
*****************************************************************************/

var Wall = function(x,y,width,height)
{
	this.pos;
	this.scale;
	this.empty;



	this.init = function(x,y,width,height)
	{
		this.pos = {x : x , y : y};
		this.scale = {w : width , h : height};
		this.empty ="yes";
	}

	this.draw = function()
	{
		ctx1.fillStyle = "black";
		ctx1.fillRect(this.pos.x,this.pos.y,this.scale.w,this.scale.h);
	}

	this.init(x,y,width,height);
}

/*****************************************************************************
*fonction de dessin de chaques plateforme dans le niveau
*****************************************************************************/

