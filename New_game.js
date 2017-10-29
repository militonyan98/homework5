const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const _castles = [
	castle0 = new Image(),
	castle1 = new Image(),
	castle2 = new Image(),
	castle3 = new Image(),
	castle4 = new Image(),
	castle5 = new Image(),
	castle6 = new Image(),
	castle7 = new Image(),
	castle8 = new Image()
];

_castles[0].src = "img/castle0.png";
_castles[1].src = "img/castle1.png";
_castles[2].src = "img/castle2.png";
_castles[3].src = "img/castle3.png";
_castles[4].src = "img/castle4.png";
_castles[5].src = "img/castle5.png";
_castles[6].src = "img/castle6.png";
_castles[7].src = "img/castle7.png";
_castles[8].src = "img/castle8.png";



const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};

const drawRect = function(arr){
	ctx.clearRect(arr.x,arr.y,arr.width,arr.height);
	ctx.fillStyle = arr.color;
	ctx.fillRect(arr.x,arr.y,arr.width,arr.height);
};

const drawHero = function(obj){
	
	// ctx.fillStyle = "rgba(255,255,255,0.8)"	
	// ctx.clearRect(hero.x -hero.width/2 - 2,hero.y - hero.height/2 - 2,hero.width + 4,hero.height +4);
	ctx.drawImage(heroImg,hero.x - hero.width/2,hero.y - hero.height/2,hero.width,hero.height);
};

const drawCircle = function(obj){
	ctx.fillStyle = obj.color;
	ctx.beginPath();
	ctx.arc(obj.x,obj.y,obj.r,0,2*Math.PI);
	ctx.fill();
};

const constrains = function(constrained,x1,x2,y1,y2){
	if (constrained.x < x1){
		constrained.x = x1;
	} else if(constrained.x > x2){
		constrained.x = x2;
	}
	if(constrained.y < y1){
		constrained.y = y1;
	}else if(constrained.y > y2){
		constrained.y = y2;
	}
};

const distance = function(p1,p2){

	return Math.sqrt(Math.pow((p1.x - p2.x),2) + Math.pow((p1.y - p2.y),2));
};

const drawCastle = function(level){

	ctx.drawImage(_castles[level-1], 600, 415, 100,100);
};

const iCanWidth = 800;
const iCanHeight = 700;


const bgwidth = 30;
const bgheight = 30;


const _badGuys = [];
const colorArray = ['#2D3BD7', '#FF3BD7', '#793BD7'];

const path2 = new Path2D();

const gameData = {
	hero : {
		x:200,
		y:130,
		width:70,
		height:70,
		xDelta:0,
		yDelta:0,
		color:"#72716C",
		isInLine:false,
		isInside:false
	},
	level:1,
	points:0,
	gameOn:true
};


const Apples = {
	x:200+rand(iCanWidth - 10),
	y:130 + rand(iCanHeight),
	r:10,
	color: "#9F003B"
}


const hero = gameData.hero;

const heroImg = new Image();
heroImg.src = "img/hero.png";

const picDist = function(pic,rect){

	return Math.sqrt(Math.pow(((pic.x) - (rect.x + rect.width/2)),2)+ Math.pow(((pic.y) - (rect.y + rect.height)),2));

};


const BadVsRub = function(length){
	if(length === 0){
		return;
	}
	if(picDist(hero, _badGuys[length - 1]) < 40){
		gameData.gameOn = false;
		ctx.fillText("Game is Over", 500, 500);
		hero.x = 200;
		hero.y = 130;
		gameData.points = 0;
		gameData.level = 1;
		hero.xDelta = 0;
		hero.yDelta = 0;
	}
	BadVsRub(length - 1);
	};

const GameManager = function(){
	if(distance(Apples, hero) < 45){
		gameData.points++;
		Apples.x = 200+rand(iCanWidth - 10);
		Apples.y = 130 + rand(iCanHeight - 10);
	}

	if(gameData.points >= 10 && gameData.points < 20){
		drawCastle(gameData.level);
		if(Math.sqrt(Math.pow(hero.x - 650,2) + Math.pow(hero.y - 465,2))< 20){
			gameData.level =2;
			gameData.points+= 10;
		}
	}
	if(gameData.points >= 30 && gameData.points < 50){
		drawCastle(gameData.level);
		if(Math.sqrt(Math.pow(hero.x - 650,2) + Math.pow(hero.y - 465,2))< 20){
			gameData.level = 3;
			gameData.points+= 20;
		}
	}
	
};

const PointsStr = function (){
	return gameData.points + " points";
}

const LevelStr = function (){
	return "Level" + gameData.level;
}

const Viewer  =function(){
	ctx.fillStyle = "#A852FF";
	ctx.font = "30px Arial";
	ctx.fillText(PointsStr(),852,120);
	ctx.fillText(LevelStr(), 200, 120);
};





const PathFinder = function(){
	if((hero.x === 200 || hero.x === 1000) || (hero.y === 130 || hero.y === 830) && !hero.isInLine){
   	path2.moveTo(hero.x, hero.y);
   	hero.isInLine = true;
   	}	
   	if(hero.x > 200 && hero.x < 1000 && hero.y > 130 && hero.y < 830 && hero.isInLine){
   	path2.lineTo(hero.x, hero.y);	
   	hero.isInside = true;
   	}
   	if((hero.x < 200 || hero.x > 1000 || hero.y < 130 || hero.y > 830) 
   		&& hero.isInLine && hero.isInside){
   		path2.lineTo(hero.x, hero.y);
   		ctx.closePath();
   		ctx.fillStyle = "yellow";
   		ctx.stroke();
   		ctx.fill(path2);
   		console.log("true");
   		hero.isInLine = false;
   		hero.isInside = false;
   	}

};



const createPoints=function(count,canvasWidth,canvasHeight){
    gameData.badGuy={
        x: 200+rand(iCanWidth - bgwidth), 
        y: 130+rand(iCanHeight - bgheight),
        width: bgwidth,
        height: bgheight,
        xDelta: 1,
        yDelta: 1,
        color: colorArray[rand(3)-1]
	};
    	
    if(count === 0){
        return _badGuys;
    }
       _badGuys[count - 1] = gameData.badGuy;

    
    createPoints(count - 1,canvasWidth,canvasHeight);	  
};
createPoints(10,500,400);




const render = function(){
	 
	ctx.fillStyle = "#9F5FB3";
	ctx.fillRect(0,0,canvas.width, canvas.height)
	ctx.fillStyle = "#7DE3F4"	
	ctx.fillRect(150,80,iCanWidth + 100,iCanHeight + 100);
	ctx.strokeRect(200,130,iCanWidth,iCanHeight);
	ctx.fillStyle = "#FFA8D3";
	ctx.fillRect(201,131,iCanWidth - 2,iCanHeight - 2);
	drawHero(hero);	 
	drawCircle(Apples);
	Viewer();
	BadVsRub(_badGuys.length);
};



const bgRender = function(count){

	if(count <= 0){
		ctx.fillStyle = 'rgba(255,255,255,0.05)';
		ctx.fillRect(0,0,canvas.width,canvas.height);	
		return;
	}

	drawRect(_badGuys[count-1]);
	bgRender(count-1);
};



const update = function(){
	//PathFinder();
	GameManager();
	constrains(hero,200, 1000,130,830);
	hero.x = hero.x + hero.xDelta;
	hero.y = hero.y + hero.yDelta;
	if(hero.x < 200 || hero.x > 1000 || hero.y < 130 || hero.y > 830){
		hero.xDelta = 0;
		hero.yDelta = 0;
	}
	PointsStr();
};


const bgUpdate = function(count){
	if (count <= 0) {
		return;
	}

	_badGuys[count - 1].x = _badGuys[count - 1].x + _badGuys[count - 1].xDelta;
	_badGuys[count - 1].y = _badGuys[count - 1].y + _badGuys[count - 1].yDelta;
	
	if(_badGuys[count - 1].x >= 200 + iCanWidth - _badGuys[count-1].width || 
	_badGuys[count - 1].x <= 200 ){
		_badGuys[count - 1].xDelta = -_badGuys[count - 1].xDelta;
	}
	

	if(_badGuys[count - 1].y >= 130+iCanHeight - _badGuys[count-1].height || 
	_badGuys[count - 1].y <= 130 ){
		_badGuys[count - 1].yDelta = -_badGuys[count - 1].yDelta;
	}

	bgUpdate(count - 1);
};


const animate = function(){
	if(gameData.gameOn){
		render();
		bgRender(_badGuys.length);
		update();
		bgUpdate(_badGuys.length);
		
	}
	window.requestAnimationFrame(animate);
};
animate();


document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            hero.xDelta = -2;
            hero.yDelta = 0;
            break;
        case 38:
            hero.yDelta = -2;
            hero.xDelta = 0;
            break;
        case 39:
            hero.xDelta = 2;
            hero.yDelta = 0;
            break;
        case 40:
            hero.yDelta = 2;
            hero.xDelta = 0;
            break;
        case 32:
        	gameData.gameOn = !gameData.gameOn;
    }
};	