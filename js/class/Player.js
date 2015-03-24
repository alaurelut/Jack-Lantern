/******************************************************************************************************
* class 
******************************************************************************************************/
var Player = function(posX,posY)
{
	this.xsave=posX;
	this.ysave=posY;
	this.y;
	this.x;
	this.jump;
	this.jumpOn;
	this.collidex;
	this.inventaire;
	this.angle = 0;
	this.clicxTemporaire = [];
	this.clicyTemporaire = [];
	this.colorTesson="white";
	var _plateformWhereWeAre;
	var _pos ;
	var _width,
		_height;
	var _vectorY;
	var _vectorX;
	var _poid ;
	var _onPlateform ;
	var _clicXArray = [];
	var _clicYArray = [];
	var _img = new Image();
			var toto =true;
	var _frameSpriteSheet;
	this.ysprite;
	 var _vitesseSprite;
	 var _aura;
	 var _noColision;
	this.numCouleur = 4;
	var _bloclvl=false;
	this.init = function()
	{
		
		localStorage.white = 1;
		
		this.inventaire = {red: localStorage.red ,yellow : localStorage.yellow , blue : localStorage.blue};
		this.y = null;
		this.x = null;
		this.jumpOn = false;
		this.jump = -0.5;
		this.setPoid(_width,_height);
		_pos ={x:posX, y:posY};
		_poid = null;
		_width = 50;
		_height = 70;
		_vectorY = 0.015;
		_vectorX = 0.015;
    	_img.src = "./images/playerSprite/jackSprite.png";
    	_frameSpriteSheet = 0;
		this.ysprite = 0;
		_vitesseSprite = 0;
		_aura = new Aura(_pos.x,_pos.y + 10,this.numCouleur);
	}
	this.update = function()
	{
		if(_clicXArray.length == 0 && _clicYArray.length == 0)
		{ 
			detectGemColected()
			
			_vitesseSprite++;
			if(_vitesseSprite >= 4 &&this.x !=null)
			{
				_frameSpriteSheet++;
				_vitesseSprite = 0;
			}
			//gravité et saut 
			this.graviteOnPlateForm();
			// collsion des ennemies!
			this.collisionTesson();
			//deplacement horizontale
		for(var r = 0 ; r < plateformeArray.length; r++)
			{	
				if(_pos.x < (plateformeArray[r].pos.x+plateformeArray[r].scale.w) && _pos.x + _width > plateformeArray[r].pos.x  &&
				 _pos.y > plateformeArray[r].pos.y && _pos.y < (plateformeArray[r].pos.y+plateformeArray[r].scale.h))
				{
					this.collidex=false;
										
				}

				else{
					this.collidex=true;
				}
				
			}
			if(this.x == 0 && _pos.x-5 > 0 && this.collidex==true)
			{	
				_pos.x -= 5;
			}
			else if(this.x == 1 && _pos.x + _width < canvasWidth && this.collidex==true )
			{
				_pos.x += 5;
			}
			else if(this.x == 1 && this.collidex==false){
				_pos.x -= 10;
			}
			else if(this.x == 0 && this.collidex==false){
				_pos.x += 10;
			}
		}
		this.collisionEnnemies();
		this.collisionInterrupteur();
		_aura.update(_pos.x,_pos.y + 10,this.numCouleur)
	}
	this.draw = function()
 
 			{
    		if(player.ysprite==0){
      			ctx2.moveTo(_pos.x+50,_pos.y+50);
      			_aura.update(_pos.x +50,_pos.y + 54);
   			}
    		else{
     			 ctx2.moveTo(_pos.x,_pos.y+50);
     			 _aura.update(_pos.x + 6,_pos.y + 54);
 			 }
 			 this.drawLight(); 
 			 _aura.draw();
 			 ctx2.fillStyle = "rgba(0,0,0,1)";
  			// ctx2.fillRect(_pos.x,_pos.y,_width,_height);
  			this.drawSprite();  
  			 
 			}

	this.drawSprite = function()
	{
        //on incremente le numero de frame
		ctx2.drawImage(_img, 50 * _frameSpriteSheet, this.ysprite , 50, 65, _pos.x,_pos.y+10,_width,_height);
        if (_frameSpriteSheet >= 9)
            _frameSpriteSheet = 0;

	}

	this.drawLight = function()
	{
		if(player.ysprite==0){
			ctx2.moveTo(_pos.x+50,_pos.y+50);
		}
		else{
			ctx2.moveTo(_pos.x,_pos.y+50);
		}
		
		for(var i = 0 ; i < _clicXArray.length; i++)
		{
			ctx2.lineWidth = 5;
   			var grd = ctx2.createLinearGradient (_pos.x ,_pos.y ,_clicXArray[i],_clicYArray[i]);
   			switch(this.colorTesson)
   			{
				case "white" :
					grd.addColorStop(0,"rgba(188,196,214,0.4)");
   					grd.addColorStop(1,"rgba(188,196,214,0.1)");
				break;
   				case "red" :
					grd.addColorStop(0,"rgba(255,0,0,0.4)");
   					grd.addColorStop(1,"rgba(255,0,0,0.1)");
				break;
				case "blue" : 
					grd.addColorStop(0,"rgba(0,0,255,0.4)");
   					grd.addColorStop(1,"rgba(0,0,255,0.1)");
					break;
				case "yellow": 
					grd.addColorStop(0,"rgba(255,255,0,0.4)");
   					grd.addColorStop(1,"rgba(255,255,0,0.1)");
				break;
   			}
   			
   			ctx2.strokeStyle = grd;
   			ctx2.lineTo(_clicXArray[i],_clicYArray[i]);
   			ctx2.lineCap='round';
   			ctx2.stroke();
		}
		 for(var e = 0 ; e < prismeArray.length; e++)
  		{
  			 if(prismeArray[e].type == 1 && this.angle == 1 || this.angle == 2)
  			 {
	    		ctx2.lineWidth = 5+e;
	   			ctx2.strokeStyle = this.colorTesson;
	    		ctx2.lineTo(prismeArray[e].pos.x + 25,prismeArray[e].pos.y + 25);
	   			ctx2.stroke()
	  		}   
 		}
	}
	
	this.setPoid = function(w,h)
	{
		if(w>h)
			_poid=(w*h)*0.005;
		else
			_poid=(h*w)*0.005;
	}

	this.graviteOnPlateForm = function()
	{
		if(this.jumpOn && _onPlateform)
		{
			this.jump = 5;
			this.jumpOn = false;
		}
		for(var r = 0 ; r < plateformeArray.length; r++)
		{	
			if(this.jump == 5)
			{
				_onPlateform = false;
				plateformeArray[r].empty = "yes";
			}
			if(_pos.y > 0 && _pos.y+_height-this.jump < canvasHeight-20 )
			{
				////console.log(_pos.y+_height +" pos y et compris entre: "+ (plateformeArray[r].pos.y-10) + " et :" + plateformeArray[r].pos.y);
				if( _pos.y+_height <= plateformeArray[r].pos.y &&_pos.y+_height >= plateformeArray[r].pos.y-10 && _pos.x+_width >= plateformeArray[r].pos.x && _pos.x <= plateformeArray[r].pos.x+plateformeArray[r].scale.w)
 				{
					////console.log ("on est sur une platefome la:"+r+"et this.jump :"+this.jump);		
					plateformeArray[r].empty = "no";
					_onPlateform = true;
					if(this.jump < 0)
					{
						this.jump = 0;
						_plateformWhereWeAre = r;	
					}									
				}
				else if(_plateformWhereWeAre == r && _pos.y+_height <= plateformeArray[r].pos.y &&_pos.y+_height >= plateformeArray[r].pos.y-10 && (_pos.x+_width <= plateformeArray[r].pos.x || _pos.x >= plateformeArray[r].pos.x+plateformeArray[r].scale.w))
				{
					////console.log("on est a coter d'une platefome "+r );		
					plateformeArray[r].empty = "yes";	 				
					 _onPlateform = false;
				}
				else if(plateformeArray[r].empty == "no"&&(_pos.y+_height<plateformeArray[r].pos.y || _pos.y>plateformeArray[r].pos.y)&&_pos.x+_width >= plateformeArray[r].pos.x && _pos.x <= plateformeArray[r].pos.x+plateformeArray[r].scale.w)
 				{
					 //console.log ("sans deconner on est au dessus");
					_onPlateform = false;
					this.jumpOn = false;
				}
				if(_onPlateform == false)
				{
					// //console.log("coucou");
					plateformeArray[r].empty = "yes";
					this.jump -= _vectorY;	
				}
			}
//			else
//				//console.log("on est mort cause tombé dans un trou");
		}
			_pos.y -= this.jump;
	}
	this.collisionTesson = function()
	{
		for(var t = 0; t < tessonArray.length; t++)
		{
			if(_pos.y > 0 && _pos.y+_height-this.jump < canvasHeight-20 )
			{	//collision du haut
				detectGemColected();
				if(_pos.x+_width >= tessonArray[t].pos.x && _pos.x <= tessonArray[t].pos.x + tessonArray[t].scale.w && _pos.y+_height > tessonArray[t].pos.y &&_pos.y+_height < tessonArray[t].pos.y+tessonArray[t].scale.h)
				{
					if(tessonArray[t].typeOf == "yellow")
					{
						//console.log("on a un tesson jaune");
							this.inventaire.yellow = 1;
						localStorage.yellow = 1;
						tessonArray.splice(t,1);
						
					}
					else if(tessonArray[t].typeOf == "red")
					{
						//console.log("on a un tesson rouge");
						this.inventaire.red = 1;
						localStorage.red = 1;
						tessonArray.splice(t,1);
						
					}
					else if(tessonArray[t].typeOf == "blue")
					{
						this.inventaire.blue = 1;
						localStorage.blue = 1;
						tessonArray.splice(t,1);
						
					}

				}
				else if(_pos.x+_width >= tessonArray[t].pos.x && _pos.x <= tessonArray[t].pos.x + tessonArray[t].scale.w && _pos.y < tessonArray[t].pos.y +tessonArray[t].scale.h &&_pos.y > tessonArray[t].pos.y)
				{
					if(tessonArray[t].typeOf == "yellow")
					{
						//console.log("on a un tesson vert");
							this.inventaire.yellow = 1;
						localStorage.yellow = 1;
						tessonArray.splice(t,1);
					
					}
					else if(tessonArray[t].typeOf == "red")
					{
						//console.log("on a un tesson rouge");
						this.inventaire.red = 1;
						localStorage.red = 1;
						tessonArray.splice(t,1);
					
					}
					else if(tessonArray[t].typeOf == "blue")
					{
						this.inventaire.blue = 1;
						localStorage.blue = 1;
						tessonArray.splice(t,1);
					
					}
				}
				else if(_pos.x < tessonArray[t].pos.x + tessonArray[t].scale.w &&_pos.x > tessonArray[t].pos.x  && _pos.y <tessonArray[t].pos.y + tessonArray[t].scale.h && _pos.y+_height > tessonArray[t].pos.y)
				{
					if(tessonArray[t].typeOf == "yellow")
					{
						//console.log("on a un tesson vert");
							this.inventaire.yellow = 1;
						localStorage.yellow = 1;
						tessonArray.splice(t,1);
						
					}
					else if(tessonArray[t].typeOf == "red")
					{
						//console.log("on a un tesson rouge");
						this.inventaire.red = 1;
						localStorage.red = 1;
						tessonArray.splice(t,1);
					
					}
					else if(tessonArray[t].typeOf == "blue")
					{
						this.inventaire.blue = 1;
						localStorage.blue = 1;
						tessonArray.splice(1,1);
						
					}
				}
				else if(_pos.x+_width > tessonArray[t].pos.x  && _pos.x+_width < tessonArray[t].pos.x + tessonArray[t].scale.w && _pos.y < tessonArray[t].pos.y + tessonArray[t].scale.h && _pos.y+_height > tessonArray[t].pos.y)
				{
					if(tessonArray[t].typeOf == "yellow")
					{
						//console.log("on a un tesson vert");
							this.inventaire.yellow = 1;
						localStorage.yellow = 1;
						tessonArray.splice(t,1);
						
					}
					else if(tessonArray[t].typeOf == "red")
					{
						//console.log("on a un tesson rouge");
						this.inventaire.red = 1;
						localStorage.red = 1;
						tessonArray.splice(t,1);
						
					}
					else if(tessonArray[t].typeOf == "blue")
					{
						this.inventaire.blue = 1;
						localStorage.blue = 1;
						tessonArray.splice(t,1);
					
					}
				}
			}
		}
	}
	this.collisionEnnemies = function()
	{
		for(var t = 0; t < ennemisArray.length; t++)
		{
			if(_pos.y > 0 && _pos.y+_height-this.jump < canvasHeight-20 )
			{	//collision du haut
				if(_pos.x+_width >= ennemisArray[t].x && _pos.x <= ennemisArray[t].x + ennemisArray[t].width && _pos.y+_height > ennemisArray[t].y &&_pos.y+_height < ennemisArray[t].y+ennemisArray[t].height && ennemisArray.couleur == this.numCouleur)
				{
					//console.log("on collisionne le haut de l'ennemie");
					//console.log("on est mort relancer le niveau!");
				}
				else if(_pos.x+_width >= ennemisArray[t].x && _pos.x <= ennemisArray[t].x + ennemisArray[t].width && _pos.y < ennemisArray[t].y +ennemisArray[t].height &&_pos.y > ennemisArray[t].y && ennemisArray.couleur == this.numCouleur)
				{
					//console.log("on colissione le bas de l'ennemie");
					//console.log("on est mort relancer le niveau!");
				}
				else if(_pos.x < ennemisArray[t].x + ennemisArray[t].width &&_pos.x > ennemisArray[t].x  && _pos.y <ennemisArray[t].y + ennemisArray[t].height && _pos.y+_height > ennemisArray[t].y && ennemisArray.couleur == this.numCouleur)
				{
					//console.log("On collisione la gauche de l'ennemie");	
					//console.log("on est mort relancer le niveau!");
				}
				else if(_pos.x+_width > ennemisArray[t].x  && _pos.x+_width < ennemisArray[t].x + ennemisArray[t].width && _pos.y < ennemisArray[t].y + ennemisArray[t].height && _pos.y+_height > ennemisArray[t].y && ennemisArray.couleur == this.numCouleur)
				{
					//console.log("On collisione la droite de l'ennemie");	
					//console.log("on est mort relancer le niveau!");
				}
			}
		}
	}
	this.collisionInterrupteur = function()
	{
		for(var t = 0; t < interrupteurArray.length; t++)
		{
			if(_pos.y > 0 && _pos.y+_height-this.jump < canvasHeight-20 )
			{	//collision du haut
				if(_pos.x+_width >= interrupteurArray[t].pos.x && _pos.x <= interrupteurArray[t].pos.x + interrupteurArray[t].scale.w 
					&& _pos.y+_height > interrupteurArray[t].pos.y &&_pos.y+_height < interrupteurArray[t].pos.y+interrupteurArray[t].scale.h && _bloclvl == false)
				{
					_bloclvl = true;
					//console.log("on collisionne le haut de l'interrupteur");
					localStorage[0] +=1;
					window.location.replace("JacksLantern.html");
				}
				else if(_pos.x+_width >= interrupteurArray[t].pos.x && _pos.x <= interrupteurArray[t].pos.x + interrupteurArray[t].scale.w 
					&& _pos.y < interrupteurArray[t].pos.y +interrupteurArray[t].scale.h &&_pos.y > interrupteurArray[t].pos.y && _bloclvl == false)
				{
					_bloclvl = true;
					//console.log("on colissione le bas de l'interrupteur");
					localStorage[0] +=1;
					window.location.replace("JacksLantern.html");
				}
				else if(_pos.x < interrupteurArray[t].pos.x + interrupteurArray[t].scale.w &&_pos.x > interrupteurArray[t].pos.x  
					&& _pos.y <interrupteurArray[t].pos.y + interrupteurArray[t].scale.h && _pos.y+_height > interrupteurArray[t].pos.y && _bloclvl == false)
				{
					_bloclvl = true;
					//console.log("On collisione la gauche de l'interrupteur");	
					localStorage[0] +=1;
					window.location.replace("JacksLantern.html");
				}
				else if(_pos.x+_width > interrupteurArray[t].pos.x  && _pos.x+_width < interrupteurArray[t].pos.x + interrupteurArray[t].scale.w 
					&& _pos.y < interrupteurArray[t].pos.y + interrupteurArray[t].scale.h && _pos.y+_height > interrupteurArray[t].pos.y && _bloclvl == false)
				{
					_bloclvl = true;
					//console.log("On collisione la droite de l'interrupteur");
					localStorage[0] +=1;	
					window.location.replace("JacksLantern.html");
				}
			}
		}
	}
	this.CreateLight = function(clicX,clicY)
	{
		var _clicX = clicX,
			_clicY = clicY;
			if(_clicX <= canvasWidth && _clicY <= canvasHeight && this.jump == 0)
			{
		  		_clicXArray.push(_clicX);
		  		_clicYArray.push( _clicY);
		  		//console.log(_clicYArray.length + " " + _clicXArray.length );
		  		for (var i = 0; i < ennemisArray.length; i++) {  
    				if (_clicX > ennemisArray[i].x && _clicX < ennemisArray[i].x+ennemisArray[i].width &&
    				  _clicY > ennemisArray[i].y && _clicY < ennemisArray[i].y + ennemisArray[i].height) 
    				{
    					
    					ennemisArray.splice(i,1);
    					_clicXArray.splice(i,_clicXArray.length);
 						_clicYArray.splice(i,_clicYArray.length);
    				}
    			}
		  	}     
		  	 

	}
this.removeLight = function()
	{
			nbClick=0;
		 	_clicXArray=[];
 			_clicYArray=[];
 			return false;
	}
	this.yellow = function ()
	{
		document.getElementById("imgYellow").src="./images/tessonSprite/empty.png";
		document.getElementById("imgVide").src = "./images/tessonSprite/Gyellow2.png";
		document.getElementById("imgWhite").src = "./images/tessonSprite/Gwhite2.png";
		document.getElementById("imgBlue").src="./images/tessonSprite/Gblue2.png";
		document.getElementById("imgRed").src="./images/tessonSprite/Gred2.png";
		this.colorTesson = "yellow";
		this.numCouleur=3;
	}
	this.red = function ()
	{
		_circleRed = document.getElementById("imgRed");
		document.getElementById("imgRed").src="./images/tessonSprite/empty.png";
		document.getElementById("imgVide").src = "./images/tessonSprite/Gred2.png";
		document.getElementById("imgWhite").src = "./images/tessonSprite/Gwhite2.png";
		document.getElementById("imgBlue").src="./images/tessonSprite/Gblue2.png";
		document.getElementById("imgYellow").src="./images/tessonSprite/Gyellow2.png";
		this.colorTesson = "red";
		this.numCouleur=1;
	}
	this.blue = function()
	{
		_circleBlue = document.getElementById("imgBlue");
			document.getElementById("imgBlue").src="./images/tessonSprite/empty.png";
		document.getElementById("imgVide").src = "./images/tessonSprite/Gblue.png";
		document.getElementById("imgWhite").src = "./images/tessonSprite/Gwhite2.png";
		document.getElementById("imgRed").src="./images/tessonSprite/Gred2.png";
		document.getElementById("imgYellow").src="./images/tessonSprite/Gyellow2.png";
		this.colorTesson = "blue";
		//console.log(this.colorTesson + " "+ _clicXArray);
		this.numCouleur=2;
	}
	this.white = function ()
	{
		_circlewhite = document.getElementById("imgWhite").src ="./images/tessonSprite/empty.png";
		document.getElementById("imgBlue").src="./images/tessonSprite/Gblue2.png";
		document.getElementById("imgRed").src="./images/tessonSprite/Gred2.png";
		document.getElementById("imgYellow").src="./images/tessonSprite/Gyellow2.png";
		document.getElementById("imgVide").src = "./images/tessonSprite/Gwhite2.png";
		this.colorTesson = "white";
		//console.log(player.colorTesson);
		this.numCouleur=4;
	}
	this.testColliderWithLight = function(xSouris, ySouris)
	{
		var _a ;
		_noColision = false;
		if(_clicXArray.length<1)
			_a = {x : _pos.x, y: _pos.y};
		else
			 _a = {x : _clicXArray[_clicXArray.length-1], y: _clicYArray[_clicYArray.length-1]};
		var _b = { x : xSouris , y : ySouris};
		var _1 = (_b.y-_a.y)/(_b.x-_a.x);
		var _2 = ((_b.x*_a.y)-(_a.x*_b.y))/(_b.x-_a.x);
		
		for(var i = _a.x ; i<=_b.x ; i+=1)
		{
			var yy = (_1*i)+_2;
			// //console.log("voici  i"+i+" et voici le yy"+ yy)
			// this.collisionDecorsLigth(i,yy,_b);  
			this.clicxTemporaire.push(i);
			this.clicyTemporaire.push(yy);
			 this.collisionDecorsLigth(i,yy,_b);  
		}	
		for(var i =_a.x ; i>=_b.x ; i-=1)
		{				
			var yy = (_1*i)+_2;
			// //console.log("voici i"+ i +" et voici le yy "+ yy )
			this.clicxTemporaire.push(i);
			this.clicyTemporaire.push(yy);
			this.collisionDecorsLigth(i,yy,_b);
		}
	}
	this.debug = function(){
		for(var i = 0 ; i<this.clicxTemporaire.length ; i+=2)
		{
			ctx3.fillStyle = "rgb(255,2,2)";
			ctx3.fillRect(this.clicxTemporaire[0+i],this.clicyTemporaire[i],2,2);
		}
	}
	this.collisionDecorsLigth = function(i,_z,_pose)
	{
		for(var t = 0; t < plateformeArray.length; t++)
		{
			// //console.log(i);
			// fillRect(plateformeArray[t].pos.x,plateformeArray[t].pos.y,plateformeArray[t].scale.w,plateformeArray[t].scale.h)
			//console.log(_noColision);
				if( (i <= plateformeArray[t].pos.x + plateformeArray[t].scale.w && i >= plateformeArray[t].pos.x) && (_z <= plateformeArray[t].pos.y + plateformeArray[t].scale.h && _z >= plateformeArray[t].pos.y))
					_noColision = true;
				else 
				{
					//console.log(this.clicxTemporaire.length)
					if(_noColision == false && i == _pose.x)		
					{
						//console.log("BEamBEamBEAM "+ _pose.x)
						//console.log(this.clicxTemporaire.length-1 , _pose.x);
						this.CreateLight(_pose.x,_pose.y);
						this.clicxTemporaire.pop();
						this.clicyTemporaire.pop();
						nbClick++;
						//console.log(nbClick);
						
					}
				}
		}
	}
	this.init();
}