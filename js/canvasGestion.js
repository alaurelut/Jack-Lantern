function refreshCanvas()
{
	 //ctx1.clearRect(canvas1.style.left,canvas1.style.top,canvasWidth,canvasHeight);
	 //ctx1.drawImage
	ctx2.clearRect(canvas2.style.left,canvas2.style.top,canvasWidth,canvasHeight);
	ctx2.beginPath();
	ctx2.fillStyle = "rgba(255,255,255,0)";
	ctx2.fillRect(canvas2.style.left,canvas2.style.top,canvasWidth,canvasHeight);
	ctx2.fill();

	ctx3.clearRect(canvas2.style.left,canvas2.style.top,canvasWidth,canvasHeight);
	ctx3.beginPath();
	ctx3.fillStyle = "rgba(255,255,255,0)";
	ctx3.fillRect(canvas2.style.left,canvas2.style.top,canvasWidth,canvasHeight);
	ctx3.fill();
}
function canvasInit()
{
	canvas1 = document.getElementById("canvas1");
 	ctx1 = canvas1.getContext('2d');
 	var _img = new Image();
 	_img.src = "./images/BACKGROUND.png";
 	_img.onload = function ()
 	{
 		ctx1.drawImage(_img,0,0);
 	}
 	
	canvas2 = document.getElementById('canvas2');
	ctx2 = canvas2.getContext('2d');
	canvas3 = document.getElementById("canvas3");
	ctx3 = canvas3.getContext('2d');
 	
}