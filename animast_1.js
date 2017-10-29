const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
      
const rand = function(num) {
		return Math.floor(Math.random() * num) + 1;
};

const drawRect = function(arr){
	context.fillStyle = arr.color;
	context.fillRect(arr.x,arr.y,arr.width,arr.height);
};

	
	const BoxWidth = 30;
	const BoxHeight = 30;
    const pointsArr = [];
    const colorArray = ['red', 'blue', 'green'];



const createPoints=function(count,canvasWidth,canvasHeight){
	
        const box = {
            x: rand(canvasWidth - BoxWidth), 
            y: rand(canvasHeight - BoxHeight),
            width: BoxWidth,
            height: BoxHeight,
            xDelta: 1,
            yDelta: 1,
            color: colorArray[rand(3)-1]
    	};
    	
        if(count === 0){
            return pointsArr;
        }
        
        pointsArr[count - 1] = box;

        createPoints(count - 1,canvasWidth,canvasHeight);	  
};
createPoints(10,500,400);

// MAS ERKRORD

const render = function(count){
	
	if(count <= 0){
		
		context.fillStyle = 'rgba(255,255,255,0.05)';
		context.fillRect(0,0,canvas.width,canvas.height);	
		return;
	}

	drawRect(pointsArr[count-1]);
	
	render(count-1);
};

const updateData = function(count){
	if (count <= 0) {
		return;

	}

	pointsArr[count - 1].x = pointsArr[count - 1].x + pointsArr[count - 1].xDelta;
	pointsArr[count - 1].y = pointsArr[count - 1].y + pointsArr[count - 1].yDelta;

	if(pointsArr[count - 1].x >= canvas.width - pointsArr[count-1].width || 
	pointsArr[count - 1].x <= 0 ){
		pointsArr[count - 1].xDelta = -pointsArr[count - 1].xDelta;
	}
	

	if(pointsArr[count - 1].y >= canvas.height - pointsArr[count-1].height || 
	pointsArr[count - 1].y <= 0 ){
		pointsArr[count - 1].yDelta = -pointsArr[count - 1].yDelta;
	}

	updateData(count - 1);
};

const animate = function() {
    updateData(pointsArr.length);
    render(pointsArr.length);

    window.requestAnimationFrame(animate);
};
