var chessBoard =[];
for(var i = 0;i<15;i++){
	chessBoard[i] = [];
	for(var j = 0;j<15;j++){
		chessBoard[i][j] = 0;
	}
}

var me = true;


var chess = document.getElementById('chess');
var context = chess.getContext('2d');//获取画笔

context.strokeStyle ="#bfbfbf";//画笔颜色设置
var logo = new Image();
logo.src="images/logo.png";
logo.onload = function(){
	context.drawImage(logo,0,0,450,450);
	drawChessBoard();


}
var drawChessBoard =function(){
		for (var i = 0; i <= 15; i++) {
			context.moveTo(15+i*30,15);
			context.lineTo(15+i*30,435);//画竖线
			context.stroke();
			context.moveTo(15,15+i*30);
			context.lineTo(435,15+i*30);
			context.stroke();
		}
}

var oneStep = function(i,j,me){
	context.beginPath();
	context.arc(15 +i * 30,15 +j * 30,13,0,2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,j*30-2,0);
	if(me){
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#636376");
	}else{
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
	}
	context.fillStyle=gradient;
	context.fill();
}

chess.onclick = function(e){
	var x =e.offsetX;
	var y =e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	if(chessBoard[i][j]==0){
		oneStep(i,j,me);
		if(me){
			chessBoard[i][j]=1;
		}else{
			chessBoard[i][j]=2;
		}
	me =!me;
	}else if(chessBoard[i][j]==1){
		alert("已经落了黑子");
	
	}else{
		alert("已经落了白子");	
	
	}
	
	
}
//赢法数组
//1:定义一个空的三维数组
var wins = [];
for (var i = 0; i < 15; i++) {
	wins[i] = [];
	for (var j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}
var count = 0;
//所有横向赢法统计
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i][j+k][count] =true;
			
		}
		count++;
	}
}

//所有竖线的赢法统计
for (var i = 0; i < 11; i++) {
		for (var j = 0; j < 15 ; j++) {
			for (var k = 0; k <5 ; k++) {
				wins[i+k][j][count] = true;	
				
			}
			count++;
		}
}


//所有斜线赢法统计
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}


for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}
console.log(count);
