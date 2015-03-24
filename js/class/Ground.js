/*****************************************************************************
*classe de sol
*****************************************************************************/
var Ground = function(x,y,width,height,wall)
{
	this.pos;
	this.scale;
	this.wall;
	this.empty;
	var _imgLeft = new Image(),
		_imgCenter = new Image(),
		_imgRight = new Image();
		var _img = new Image();

	var c=document.getElementById("myCanvas");
		var ctx=c.getContext("2d");
		ctx.clearRect(0,0,c.width,c.height); 
		var img = new Image();
		_imgCenter.src = "./images/plateformeSprite/centerGround1.png";
		var pat=ctx.createPattern(_imgCenter,"repeat");

	this.init = function(x,y,width,height,wall)
	{
		_imgLeft.src = "./images/plateformeSprite/leftGround.png";
		_imgRight.src = "./images/plateformeSprite/rightGround.png";
		_imgCenter.onload =function()
		{
			return;
		}
			this.pos = {x : x , y : y};
			this.scale = {w : width , h : height}
			this.wall = wall;
			this.empty ="yes";
	}

	this.draw = function()
	{
		ctx1.fillStyle = "rgba(0,0,0,1)";
		ctx1.drawImage( _imgLeft,0,0,250,214,this.pos.x-20,this.pos.y-5,40,50);
		
		ctx1.fillStyle=pat;
		ctx1.rect(this.pos.x+10,this.pos.y,this.scale.w-30,50);
		
		ctx1.fill();
		
		ctx1.drawImage( _imgRight,0,0,234,214,this.pos.x+30+this.scale.w-60,this.pos.y-5,40,50);
		ctx1.closePath();
	}

	this.init(x,y,width,height,wall);
}

/*****************************************************************************
*fonction de dessin de chaques plateforme dans le niveau
*****************************************************************************/
function drawPlateforme()
{
	for (var e = 0; e < plateformeArray.length; e++ )
	{
		plateformeArray[e].draw();
	}
}
