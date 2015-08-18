;(function() {
	'use strict';
	var isgameOver = false;
	function Background() {
		var that = this;
		
		this.element  = document.createElement('div');
		this.element.style.width = '50000px';
		this.element.style.height = '350px';
		that.element.style.margin = '0 auto';
		
		this.element.style.background = 'url(img1.jpg) repeat-x';
		
		var marginLeft = 0;
		
		var move = function() {
			marginLeft -= 5;
		};
		
		var render = function() {
			that.element.style.marginLeft = marginLeft + 'px';
		};
		
		this.updateFrame = function() {
			move();
			render();
		};
	};
	
	function Hero() {
		var that = this;

		
		this.element  = document.createElement('div');
		// this.element.style.border = '1px solid blue';
		this.element.style.background = 'url(img.png) no-repeat';
		this.element.style.position = 'absolute';
		this.element.style.marginBottom = '90px';
		
		this.x = 0;
		this.y = 0;
		
		this.height = 60;
		this.width = 70;
		
		this.updateFrame = function() {
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
			
			that.element.style.width = that.width + 'px';
			that.element.style.height = that.height + 'px';
			heroMove();
		};


		var bgMove = 0;
		
		var heroMove = function(){
			that.element.style.backgroundPosition	= bgMove + 'px';
			bgMove = bgMove - 70;
			if(bgMove === -4*70)
			{
				bgMove = 0;
			}
		};


	};
	
	function Gunda() {
		var that = this;
		
		this.element  = document.createElement('div');
		this.element.style.border = '1px solid red';
		this.element.style.position = 'absolute';
		this.element.style.background = '#036';
		// x means left
		this.x = 500;	
		//y means top
		var tp = Math.random();
		
		if(Math.random() < 0.5)
		{
			this.y = 320;
		}
		else
		{
			this.y = 230;
		}
		
		this.height = 10;
		this.width = 50;

		
		this.move = function() {

			// move left continuously
			that.x -= 7;

			
		};
		
		this.updateFrame = function() {
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
			
			that.element.style.width = that.width + 'px';
			that.element.style.height = that.height + 'px';
			that.move();

		};
	};
	
	function LineRunner(gameDiv_) {
		var gameDiv = gameDiv_;
		var interval = 100;
		var background = new Background();
		var hero = new Hero();
		var scoreboard = new ScoreBoard();
		var finalmenu = new FinalMenu();
		var gundas = [];
		var score = 0;

		
		var gameProps = {
			width: 600,
			height: 350
		};

	function ScoreBoard(){
		var that = this;

		this.element = document.createElement('div');
		this.element.style.height = '20px';
		this.element.style.width = '150px';
		// this.element.style.background = 'red';
		this.element.style.color = 'white';
		this.element.style.top = '40px';
		this.element.style.left = '200px';
		this.element.style.position = 'absolute';

		this.updateFrame = function(){
			score++;
			that.element.innerHTML = 'Your Score is: '+score;
		}
	};

	function FinalMenu(){
		var that = this;

		this.element = document.createElement('div');
		this.element.style.height = '120px';
		this.element.style.width = '300px';
		this.element.style.background = 'red';
		this.element.style.color = 'white';
		this.element.style.position = 'absolute';
		this.element.style.top = '120px';
		this.element.style.left = '220px';

			this.element.innerHTML = 'Game Finished';
		// }
	};
		
		var gameSetup = function() {
			gameDiv.style.width = gameProps.width + 'px';
			gameDiv.style.height = gameProps.height + 'px';
			gameDiv.style.border = '1px solid black';
			gameDiv.style.overflow = 'hidden';
			
			hero.y = gameProps.height - hero.height;
			hero.x = 100;
			
			gameDiv.appendChild(background.element);
			gameDiv.appendChild(hero.element);
			gameDiv.appendChild(scoreboard.element);
			

			window.onkeydown = function(event){
				if(event.which === 38) //38 means up
				{
					jump();
				}
				
			}
		};

		function jump(){
			if(hero.y <= 100)
			{
				hero.y += 50;
			}
			else {
			hero.y -= 100;
			}
					};

		function crawl(){

			hero.y += 110;

		};

		function checkGravity(){
			hero.y +=30;
			if(hero.y+hero.height >= gameProps.height)
			{
				hero.y = gameProps.height - hero.height;
			}
		};





		
		var createGunda = function() {
			console.log("creating a gunda");
			var gunda = new Gunda();
			gameDiv.appendChild(gunda.element);
			gundas.push(gunda);
			//console.log(gundas);
		};

		for(var i= 0 ; i<gundas.length; i++)
		{
			var gunda = gundas[i];
			gunda.updateFrame();
		};
		
		var loopCounter = 0;
		
		var gameLoop = function() {
			if(!isgameOver){
			loopCounter++;
			
			background.updateFrame();
			hero.updateFrame();
			scoreboard.updateFrame();
			
			if (loopCounter % 100 === 0) {
				createGunda();	
			}
			
			for (var i=0; i<gundas.length; i++) {
				var gunda = gundas[i];
				gunda.updateFrame();
			}
			checkGravity();
			collisionDetection();
		}
		};
		
		var collisionDetection = function() {
			// check collision of HERO with ALL ENEMIES
			for(var i = 0 ; i < gundas.length ; i++){
				var currGundaX = gundas[i].x;
				var currGundaY = gundas[i].y;
				var currGundaWd = gundas[i].width;
				var currGundaHt = gundas[i].height;

				//main logic of collision is here
				if(hero.x + hero.width >= currGundaX && hero.x < (currGundaX+currGundaWd))
				{
					if(hero.y + hero.height >= currGundaY && hero.y < (currGundaY+ currGundaHt))
					{
						isgameOver = true;
						gameDiv.appendChild(finalmenu.element);

					}
				}					


				
				
			}			
				


		};
		
		gameSetup();
		setInterval(gameLoop, interval);
	};
	
	window.LineRunner = LineRunner;
})();