if(localStorage[0]==undefined){
	localStorage[0]=1;
}

var lvl=1;
/*****************************************************************************
*Fonctions de synchronisation d'affichage
*
*****************************************************************************/
window.requestAnimFrame = 	(
	function()
	{
		return  window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(callback, element)
		{
			window.setTimeout(callback, 1000 / 60);
		};
	}
)
();

//initialisation du canvas et lancement de la boucle
window.onload = function()
{
	  $(document).ready(function() {
      $("#start").click(function() { 
        $("#menu").fadeOut(500);
        $("#jeu").fadeIn(500); 
    });
      if(localStorage[0]!="1"){
      	$("#menu").fadeOut(500);
      	$("#jeu").fadeIn(500); 
      }
});
	//initialisation du canvas	
	//recuperation de la map du level 1
	startGame();
	detectGemColected();
	canvas3.addEventListener('click', clickCanvas);
}

/***************************************************************************************************************
*Fonction de reset et d'initialisation du canvas : pour lancer une partie quand on veut avec un bouton heyhey
*
***************************************************************************************************************/
function resetVariables()
{
	canvasWidth = 1200,
		canvasHeight = 680;
	canvas1 = "",
		canvas2 = "",
		canvas3 = "";	
	ctx1 = "",
		ctx2 = "",
		ctx3 = "";

	/*******************************************************************************
	*Variable du player
	********************************************************************************/
	player=undefined;

	/*******************************************************************************
	*Variables des tableaux ou seront stocker les plateformes et ennemies du niveau 
	*en cour
	********************************************************************************/
	plateformeArray = [],
		ennemisArray = [],
		tessonArray = [],
		interrupteurArray = [];
		prismeArray = [];
}
function startGame()
{	
	resetVariables();
	canvasInit();
	switch(lvl)
   			{
				case "1" :
							plateformeArray.push(new Ground(0,400,400,100), new Ground(400,500,100,100), new Ground(500,600,700,100), new Ground(550,300,100,100)
								, new Ground(750,300,100,100), new Ground(950,200,100,100), new Ground(1100,150,100,100), new Wall(1100,150,150,800));
	player = new Player(0,320);
	interrupteurArray.push(new Interrupteur(1125,90,60,60,"blue"));
	tessonArray.push(new Tesson(1030,540,60,60,"blue"));
				break;
   				case "11" :
	 					plateformeArray.push(new Ground(100,1300,canvasWidth,100),new Ground(100,1200,canvasWidth,100),new Ground(100,1100,canvasWidth,100),new Ground(0,1000,canvasWidth,100),new Ground(0,600,200,100), new Ground(650,600,100,100), new Ground(1100,600,100,100));
	player = new Player(0,520);
	interrupteurArray.push(new Interrupteur(1125,500,60,60,"blue"));
				break;
				case "111" : 
						plateformeArray.push(new Ground(0,600,200,100), new Ground(350,550,100,100), new Ground(300, 450,50,50), new Ground(500,350,500,50), 
						 new Ground(400,400,50,50), new Ground(1000,600,200,100), new Wall(950,400,50,300));
	player = new Player(0,520);
	ennemisArray.push(new Enemy(1000,325,1,0,200,275,0,1));
	interrupteurArray.push(new Interrupteur(1075,535,60,60,"blue"));
					break;
				case "1111": 
							plateformeArray.push(new Ground(0,550,200,100), new Ground(200,600,350,100), new Ground(650,550,50,50), new Ground(750,500,50,50), new Ground(850,450,50,50), new Ground(750,400,50,50), new Ground(650,350,50,50),
						 new Ground(200,300,400,50), new Ground(50,250,50,50), new Ground(125,200,50,50), new Ground(200,150,200,50), new Ground(1000,600,200,100), new Wall(950,65,50,300));
	player = new Player(0,480);
	ennemisArray.push(new Enemy(1000,0,1,0,200,275,0,1), new Enemy(400,400,1,1,50,75,225,1));
	prismeArray.push(new Prisme(350,100,1,1), new Prisme(350,0,1,2), new Prisme(1075,0,1,3));
	interrupteurArray.push(new Interrupteur(1075,535,60,60,"blue"));
				break;
				case "11111": 
							plateformeArray.push(new Ground(0,600,200,100), new Ground(400,550,350,100), new Ground(1000,600,200,100), 
						 new Ground(300,450,50,50), new Ground(850,450,50,50), new Ground());
	player = new Player(0,520);
	prismeArray.push(new Prisme(850,300,1,1), new Prisme(925,300,1,1), new Prisme(925,600,1,1), 
					 new Prisme(200,600,1,1), new Prisme(200,0,1,1),   new Prisme(500,0,1,1), 
					 new Prisme(500,200,1,1), new Prisme(0,200,1,1),   new Prisme(0,500,1,1),
					 new Prisme(300,300,2,2), new Prisme(300,150,2,2), new Prisme(750,150,2,2), 
					 new Prisme(750,400,2,2), new Prisme(150,400,2,2), new Prisme(150,100,2,2), 
					 new Prisme(1100,100,2,2));
	tessonArray.push(new Tesson(575,485,60,60,"red"));
	interrupteurArray.push(new Interrupteur(1075,535,60,60,"blue"));
	ennemisArray.push(new Enemy(1000,325,1,0,200,275,0,1));	
				break;
   			}
	
	drawPlateforme();
	run();
}
function detectGemColected()
{
	if(localStorage.yellow==1){
		document.getElementById('yellow').style.display="inline";
	}
	if(localStorage.red==1){
		document.getElementById('red').style.display="inline";
	}
	if(localStorage.blue==1){
		document.getElementById('blue').style.display="inline";
	}
	if(localStorage.white==1){
		document.getElementById('white').style.display="inline";
	}
	
}

  
