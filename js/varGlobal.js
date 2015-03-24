/*******************************************************************************
*Variables de definition pour les canvas
********************************************************************************/
var canvasWidth = 1200,
	canvasHeight = 680;
var canvas1,
	canvas2,
	canvas3;	
var ctx1,
	ctx2,
	ctx3;

/*******************************************************************************
*Variable du player
********************************************************************************/
var player;

/*******************************************************************************
*Variables des tableaux ou seront stocker les plateformes et ennemies du niveau 
*en cour
********************************************************************************/
var plateformeArray = [],
	ennemisArray = [],
	tessonArray = [],
	prismeArray = [],
	interrupteurArray = [];
	// clicXArray = [],
	// clicYArray = [];

/*******************************************************************************
*Variable du buffer pour le decord arriere
********************************************************************************/
var imagecarrer;
var nbClick=0;
var limiteNbClick=0;
var level=1;

// var nbClick=0;
// var clicx;
// var clicy;
// var deletePath=1;
