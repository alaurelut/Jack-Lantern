var Aura = function(posX, posY, couleur)
{
	this.couleur ;
	var	rayon2 = 90;
	var grow=1;
	var _x;
	var _y;
	var _couleur;
	var _codeCouleur;
	this.init = function (posX, posY, couleur) 
	{
		_x = posX;
		_y = posY;
		this.couleur = couleur;
		if ( this.couleur == 1) //red
			{
				_codeCouleur = "rgba(255,0,0,0.3)"
			};
		if ( this.couleur == 2) //blue
			{
				_codeCouleur = "rgba(0,0,255,0.3)"
			};
		if ( this.couleur == 3) //yellow
			{
				_codeCouleur = "rgba(255,255,0,0.3)"
			};
		if ( this.couleur == 4) //white
			{
				_codeCouleur = "rgba(188,196,214,0)"
			};
	}
	this.draw = function()
	{
	var radgrad = ctx2.createRadialGradient(_x,_y, 10, _x, _y,rayon2);
    radgrad.addColorStop(0,"rgba(255,255,255,0.5)");
    radgrad.addColorStop(0.5 ,_codeCouleur)
    radgrad.addColorStop(1, 'rgba(100,100,100,0)');
    ctx2.fillStyle = radgrad;
	ctx2.beginPath();
	ctx2.arc(_x, _y, rayon2, 0, 2*Math.PI);
	ctx2.fill();
	}
	this.update = function(posX, posY, couleur)
	{	
		numCouleur=player.numCouleur;
		_x = posX;
		_y = posY;
		this.couleur = couleur;
			if ( this.couleur == 1) 
			{
				_codeCouleur = "rgba(255,0,0,0.3)"
			}
		else if ( this.couleur == 2) 
			{
				_codeCouleur = "rgba(0,0,255,0.3)"
			}
		else if ( this.couleur == 3) 
			{
				_codeCouleur = "rgba(255,255,0,0.3)"
			}
		else if ( this.couleur == 4) 
			{
				_codeCouleur = "rgba(188,196,214,0)"
			}

		if(grow==1)
		{
			rayon2 +=0.5;
			// console.log("rayon : " + rayon2);
		}
		else
		{
			rayon2 -= 0.5;
			// console.log("rayon : " + rayon2);
		}
		if (rayon2 == 90 ) 
		{
			grow=1;
		
		}
		if (rayon2 == 110) 
		{
			grow=2;
		}
	}
	this.init(posX,posY,couleur);
}