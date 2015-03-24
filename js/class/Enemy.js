var Enemy = function(posX,posY,pv,speed,width,height,distance,couleur)
{
	this.width=width,
	this.height=height;
	this.x = posX;
	this.y = posY;
	this.speed = speed;
	this.pv = pv;
	this.couleur;
	var _frameSpriteSheet;
	this.ysprite;
	var _img = new Image();
	 var _vitesseSprite;
	 var _birthPosition = posX,
		toto =false,
		_distance = distance;
	this.init = function(posX,posY,pv,speed,distance, couleur)
	{
		_frameSpriteSheet = 0;
		this.ysprite = 0;
		_vitesseSprite = 0;
		this.couleur = couleur;
		this.y = posY;
		this.x = posX;
		console.log(this.couleur);
		switch(this.couleur)
		{
			case 1 :
				_img.src = "./images/enemySprite/bluespider.png"
				break;
			case 2 : 
				_img.src = "./images/enemySprite/greenspider.png"
				break;
			case 3 : 
				_img.src = "./images/enemySprite/redpider.png"
				break;
		}

	}
	this.draw = function()
	{
		this.drawSprite();
	}
	this.drawSprite = function()
	{
		ctx2.drawImage(_img, 833 * _frameSpriteSheet, this.ysprite , 833, 833, this.x, this.y,this.width,this.height);
        if (_frameSpriteSheet >= 9)
            _frameSpriteSheet = 0;
        // console.log(_frameSpriteSheet);
	}
	this.update = function()
	{
		_vitesseSprite++;
		if (_vitesseSprite == 5)
		{
			_frameSpriteSheet++;
			_vitesseSprite = 0;
		}
		if(this.x <_birthPosition-_distance &&toto ==true)
		{
			this.speed*= -1;
			// console.log(_birthPosition-_distance+" "+this.x )
			toto = false;
		}
		
		else if(this.x >_birthPosition+_distance && toto == false) 
		{
			this.speed*= -1;
			// console.log(_birthPosition-_distance+" "+this.x )
			toto = true;
		}
			this.x+=this.speed;
		//deplacement horizontale
			if(this.x == 0 && this.x-5 > 0)
			{	
				this.x -= 5;
			}
			else if(this.x == 1 && this.x + 200 < canvasWidth)
			{
				this.x += 5;
			}
		}
		this.init(posX,posY,pv,speed,distance, couleur);
}
function drawEnnemis()
{
	for (var e = 0; e < ennemisArray.length; e++ )
	{
		ennemisArray[e].draw();
		ennemisArray[e].update();
	}
}

