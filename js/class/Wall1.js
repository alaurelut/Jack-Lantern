/*****************************************************************************
*classe de mur
*****************************************************************************/

var Wall = function(x,y,width,height)
{
	this.pos;
	this.scale;
	this.empty;
	var _imgTop = new Image(),
		_imgCenter = new Image(),
		_imgBottom = new Image();


	var s=document.getElementById("myCanvas5");
		var ctx5=s.getContext("2d");
		ctx5.clearRect(0,0,s.width,s.height); 
		
		_imgCenter.src = "./images/plateformeSprite/midwall.png";
		var pat2=ctx5.createPattern(_imgCenter,"repeat");
	this.init = function(x,y,width,height)
	{
		_imgTop.src = "./images/plateformeSprite/topwall.png";
		_imgBottom.src = "./images/plateformeSprite/bottomwall.png";
		this.pos = {x : x , y : y};
		this.scale = {w : width , h : height};
		this.empty ="yes";
	}

	this.draw = function()
	{
		ctx1.fillStyle = "rgba(0,0,0,1)";
		ctx1.drawImage( _imgTop,0,0,281,227,this.pos.x,this.pos.y,this.scale.w,this.scale.h);
		
		ctx3.fillStyle=pat2;
		ctx1.rect(this.pos.x,this.pos.y,this.scale.w,this.scale.h);
		
		ctx1.fill();
		
		ctx1.drawImage( _imgBottom,0,0,202,227,this.pos.x,this.pos.y+this.scale.y,this.scale.w,this.scale.h);
		ctx1.closePath();
	}

	this.init(x,y,width,height);
}

/*****************************************************************************
*fonction de dessin de chaques plateforme dans le niveau
*****************************************************************************/

