/***********************************************************
*boucle d'affichage des frames
*
***********************************************************/
var totocompteur = 0;
function run()
{
	totocompteur++;
	if(totocompteur ==16)
	{
		drawPlateforme();
		totocompteur = 0;
	}

	//rappele de la même fonction à la frame suivante
	refreshCanvas();
	drawEnnemis();
	drawTesson();
	drawPrisme();
	drawInterrupteur();
	// player.draw();
	// player.update();
	requestAnimFrame(run);
}