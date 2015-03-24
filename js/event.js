/*****************************************************************
*fonctions des evenements claviers
*
******************************************************************/
window.onkeydown=function(event)
{
	var _keyPressed=event.keyCode
	 //console.log(_keyPressed)
	switch(_keyPressed)
	{
		case 90:
			if(player.jump == 0)
			player.jumpOn = true; 
		break
		case 81:
			player.x = 0 ;
			if(player.jump ==0)
			player.ysprite = 140;
		break
		case 68:
			player.x = 1;
			if(player.jump ==0)
			player.ysprite = 0;
		break
		// case 82:
		// 	player.removeLight();
		// break
	}
}
window.onkeyup = function(event)
{
	var _keyPressed=event.keyCode

	switch(_keyPressed)
	{
		case 81:
			player.x=null;
		break;
		case 68:
			player.x=null;
		break;
	}
}
//pour le clic du laser ! 
function clickCanvas(event)
{
  	switch(player.colorTesson)
   			{
				case "white" :
					limiteNbClick=7;
				break;
   				case "red" :
					limiteNbClick=21;
				break;
				case "blue" : 
					limiteNbClick=28;
					break;
				case "yellow": 
					limiteNbClick=14;
				break;
   			}
  	var _clicX = Math.floor(event.offsetX);
  	var   _clicY = Math.floor(event.offsetY);
  	//console.log(event.button);

  	if(event.button == 0 && nbClick < limiteNbClick)
  	{
  		player.testColliderWithLight(_clicX , _clicY);
  	}
  	else if(event.button == 1)
  	{
  		player.removeLight();
  	}
}
