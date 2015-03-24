

function initcanvas2()
{
	canvas2	= document.createElement("canvas");
	context2 = canvas2.getContext('2d');
	canvas2.width = canvasWidth;
	canvas2.height= canvasHeight;

		drawPathfindingCaseAir(context2);
		imagecarrer = context2.getImageData(0,0,canvas2.width,canvas2.height); 
}