var chessBoard =[];
for(var i = 0;i<15;i++){
	chessBoard[i] = [];
	for(var j = 0;j<15;j++){
		chessBoard[i][j] = 0;
	}
}

var me = true;
var myWin = [];
var computerWin = [];
var over = false;

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
			context.lineTo(435,15+i*30);//化横线
			context.stroke();
		}
}

var oneStep = function(i,j,me){
	context.beginPath();
	context.arc(15 +i * 30,15 +j * 30,13,0,2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,j*30-2,0);
	if(me){
		console.log(me)
		console.log(i,j,"处放了一颗黑子")
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#636376");
		console.log(i,j)
	}else{
		console.log(me);
		console.log(i,j,"处放了一颗白子");
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
		console.log(i,j);
	}
	context.fillStyle=gradient;
	context.fill();
}

chess.onclick = function(e){
	if (over) {return;}
	if(!me){ console.log(!me);return;}
	var x =e.offsetX;
	var y =e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	if(chessBoard[i][j]==0){
		console.log(i,j,"处被点击")
		oneStep(i,j,me);
		chessBoard[i][j]=1;
		for (var k = 0; k < count; k++) {
		if(wins[i][j][k]){
			myWin[k]++;
			computerWin[k]=100;//表明这不可能赢
			if(myWin[k] == 5){
				alert("you win");
				console.log("you win");
				over = true;
				console.log(k)
			}
		}
	}
		if(!over){
			me =!me;
			console.log(me);
			computerAI(); 	
		}
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





for (var i = 0; i < count; i++) {
		myWin[i] = 0;
		computerWin[i] = 0;
}



var computerAI = function(){
// 
 	console.log("电脑下棋中 ......");
 	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u =0;
	var v= 0;
	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] =[];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;

		}
	}
	 for (var i = 0; i < 15; i++) {
	 	console.log(i);
		for (var j = 0; j < 15; j++) {
			if (chessBoard[i][j]==0) {
				for (var k = 0; k < count; k++) {
					if (wins[i][j][k]) {
						if(myWin[k] == 1){
							myScore[i][j] += 200;
						}else if(myWin[k]==2){
							myScore[i][j] += 400;
						}else if(myWin[k]==3){
							myScore[i][j] += 2000;
						}else if(myWin[k]==4){
							myScore[i][j] += 10000;
						}
						if(computerWin[k] == 1){
							computerScore[i][j] += 220;
						}else if(computerWin[k]==2){
							computerScore[i][j] += 420;
						}else if(computerWin[k]==3){
							computerScore[i][j] += 2400;
						}else if(computerWin[k]==4){
							computerScore[i][j] += 20000;
						}
					}
				}
 		if (myScore[i][j]>max) {
					max =myScore[i][j];
					u = i;
					v = j;
				}else if(myScore[i][j] == max){
					if(computerScore[i][j]>computerScore[u][v]){
						u = i;
						v = j;
					}
				}
				if (computerScore[i][j]>max) {
					max =computerScore[i][j];
					u = i;
					v = j;
				}else if(computerScore[i][j] == max){
					if(myScore[i][j]>myScore[u][v]){
						u = i;
						v = j;
					}
				}
			}
		}
	}


	console.log(u,v)
	oneStep(u,v,false);
	chessBoard[u][v] = 2;
	for (var k = 0; k < count; k++) {
		if(wins[u][v][k]){
			console.log(u,v)
			computerWin[k]++;
			myWin[k]=100;//表明这不可能赢
			if(computerWin[k] == 5){
				alert("computer win");
				console.log("computer win");
				over = true;
				console.log(k)
			}
		}
	}
	if(!over){
		me =!me;
	}
}
