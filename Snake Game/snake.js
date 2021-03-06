//To define all the variables needed
function init(){
	var canvas=document.getElementById("mycanvas"); //Canvas needs js to build graphics
	H=W=canvas.height=canvas.width=1000; //Area of our canvas
	pen=canvas.getContext('2d'); //It returns a drawing object which contains several functions and methods.
	pen.moveTo(100,100); //Moves to a particular coordinate.
	cs=66; //Height and width of each box in background picture.

	game_over=false;

	food=getRandomFood(); //Returns the box number coordinate(multiply it by cs to make actual coordinate)

	score=5; //Score to start with :)

	food_img=new Image();
	food_img.src = "apple.png" //Food image

	trophy_img=new Image();
	trophy_img.src = "trophy.png" //Point counter background image


	//Snake object
	snake={
		init_len:5, //Initial length
		cells:[],
		color:"blue",
		direction:"right",

		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});  //cells:{(5,0),(4,0)....,(1,0)}
			}
		},


		drawSnake:function(){
			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle=this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
			}
		},

		updateSnake:function(){

			var headX=this.cells[0].x;
			var headY=this.cells[0].y;

			if(food.x==headX && food.y==headY){
				console.log("Food eaten");
				score++;
				food=getRandomFood();
			}else{
				this.cells.pop();
			}
			var newX,newY;
			if(this.direction=="right"){
				newX=headX+1;
				newY=headY;
			}else if(this.direction=="left"){
				newX=headX-1;
				newY=headY;
			}else if(this.direction=="down"){
				newX=headX;
				newY=headY+1;
			}else{
				newX=headX;
				newY=headY-1;
			}
			this.cells.unshift({x:newX,y:newY}); //Add new line to beginning i.e front of (5,0)
			lastX=Math.round(W/cs);
			lastY=Math.round(H/cs);
			if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>=lastX || this.cells[0].y>=lastY){
				game_over=true;
			}
		},
	};

	snake.createSnake();

	function keyPressed(e){
		if(e.key=="ArrowLeft"){
			snake.direction="left";
		}else if(e.key=="ArrowRight"){
			snake.direction="right";
		}else if(e.key=="ArrowDown"){
			snake.direction="down";
		}else if(e.key=="ArrowUp"){
			snake.direction="up";
		}
	}

	document.addEventListener('keydown',keyPressed);

}

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle=food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

	pen.drawImage(trophy_img,20,20,cs,cs);
	pen.fillStyle="black";
	pen.font="50px roboto";
	pen.fillText(score,40,60)

}

function getRandomFood(){
	//random return a number b/w 0 and 1
	foodX=Math.round(Math.random()*(W-cs)/cs); //Subtracting cs to handle case when W==cs, in that case coordinate should be (0,0) no matter what the random number.
	foodY=Math.round(Math.random()*(H-cs)/cs);

	var food={
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food;
}

function update(){
	snake.updateSnake();
}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game over!");
	}
	draw();
	update();
}

init();
var f=setInterval(gameloop,200);
