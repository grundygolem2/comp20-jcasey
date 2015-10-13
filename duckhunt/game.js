function init() {
	var canvas = document.getElementById('game_canvas')
	var ctx = canvas.getContext('2d');
	var background = new Image();
	background.scr = "duckhunt-background.gif";
	var birds = new Image();
	
	background.onload = function(){
		ctx.drawImage(background, 0, 0);
		birds.onload = function(){
			ctx.drawImage(birds, 0, 115, 37, 30, 175, 100, 37, 30);
			ctx.drawImage(birds, 130, 115, 37, 30, 50, 75, 37, 30);

		};
	};

	background.src = "duckhunt-background.gif";
	birds.src = "duckhunt_various_sheet.png";	

}

