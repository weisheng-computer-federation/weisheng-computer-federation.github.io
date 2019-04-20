/*!
 * the 001st game of game series about 2048
 * game001 - v1.0.2 (2018-8-24T09:04:13+0800)
 * https://github.com/Ivan1105/ | Released under MIT license
 * Copyright 2017-2018 Ivan1105
 * 
 * Include jquery (http://jquery.com/)
 */

/*
 * 当切仅当按键时触发事件！
 */

(function($){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	
	/** 2048游戏矩阵 */
	var match=[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	/** 2048游戏矩阵的大小 */
	var maxWidth=match.length;
	/** 2048游戏新生成的数字概率分布 */
	var newNumber=[2,2,2,2,2,2,2,2,2,4];
	/** 2048游戏中每一个数字所对应的背景颜色 */
	var fillColor=["#eee4da","#ede0c8","#f2b179","#f59563","#f67c5f","#f65e3b","#edcf72","#edcc61","#edcc61","#edc850","#edc53f","#efc519","#efc518"];
	/** 2048游戏中每一个数字所对应的文字颜色 */
	var textColor=["#776e65","#776e65","#f9f6f2","#f9f6f2","#f9f6f2","#f9f6f2","#f9f6f2","#f9f6f2","#f9f6f2","#f9f6f2","#f9f6f2","#f9f6f2","#f9f6f2"];
	/** 游戏分数 */
	var score=0;
	/** 游戏需要用到的资源文件 */
	var img=new Image();
	img.src="../assets/img/gameseries-001/img-01.png";
	/** 动画效果 */
	var animation=[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	
	var cWidth=canvas.width;
	var cHeight=canvas.height;
	/** 标题的高度 */
	var headHeight=200;
	/** 方块的页边距 */
	var padding=cWidth*(maxWidth+1)*0.02/maxWidth;
	/** 每个方块的宽度 */
	var eWidth=(cWidth-padding*(maxWidth+1))/maxWidth;
	/** 每个方块的位置 */
	var ePos=[];
	
	
	/**
	 * 绘制方块生成时的动画
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} i
	 * @param {Number} j
	 */
	function animationInit(x,y,i,j){
		var scale=0;
		var fps=setInterval(function(){
			if(match[i][j]==0){
				clearInterval(fps);
				return;
			}
			context.clearRect(ePos[i][j].left+x+eWidth*(1-scale)/2,ePos[i][j].top+y+eWidth*(1-scale)/2,eWidth*scale,eWidth*scale);
			scale+=0.05;
			
			// 绘制方块
			context.save();
			context.fillStyle=fillColor[Math.log(match[i][j])/Math.log(2)-1];
			context.fillRect(ePos[i][j].left+x+eWidth*(1-scale)/2,ePos[i][j].top+y+eWidth*(1-scale)/2,eWidth*scale,eWidth*scale);
			context.fillStyle=textColor[Math.log(match[i][j])/Math.log(2)-1];
			context.font=80*scale+"px Arial";
			context.textAlign="center";
			context.textBaseline="middle";
			context.fillText(match[i][j],ePos[i][j].left+x+eWidth/2,ePos[i][j].top+y+eWidth/2,eWidth);
			context.restore();
			
			if(scale+0.001>=1) clearInterval(fps);
		},5);
	}
	
	/**
	 * 在canvas画布中绘制2048游戏矩阵的可视图
	 * @param {Number} x
	 * @param {Number} y
	 */
	function fillMatch(x,y){
		for(var i=0;i<maxWidth;i++){
			for(var j=0;j<maxWidth;j++){
				if(match[i][j]!=0){
					if(animation[i][j]=="new"){
						animation[i][j]=0;
						animationInit(x,y,i,j);
					}
					else{
						// 绘制方块
						context.save();
						context.fillStyle=fillColor[Math.log(match[i][j])/Math.log(2)-1];
						context.fillRect(ePos[i][j].left+x,ePos[i][j].top+y,eWidth,eWidth);
						context.fillStyle=textColor[Math.log(match[i][j])/Math.log(2)-1];
						context.font="80px Arial";
						context.textAlign="center";
						context.textBaseline="middle";
						context.fillText(match[i][j],ePos[i][j].left+x+eWidth/2,ePos[i][j].top+y+eWidth/2,eWidth);
						context.restore();
					}
				}
			}
		}
		
		// 绘制标题
		context.save();
		context.fillStyle="#ffffff";
		context.font="20px Arial";
		context.textAlign="center";
		context.textBaseline="middle";
		context.fillText(score,x+cWidth-120,y-90,240);
		context.restore();
	}
	
	/**
	 * 绘制游戏背景
	 * @param {Number} x
	 * @param {Number} y
	 */
	function drawRect(){
		context.clearRect(0,0,cWidth,cHeight);
		context.drawImage(img,0,0,cWidth,cHeight);
		fillMatch(0,headHeight);
	}
	
	/**
	 * 在空白处以9:1的概率生成2或4
	 */
	function init(){
		var available=[];
		for(var i=0;i<maxWidth;i++){
			for(var j=0;j<maxWidth;j++){
				if(match[i][j]==0) available.push({"width":i,"height":j});
			}
		}
		
		var curPos=available[Math.floor(Math.random()*available.length)];
		match[curPos.width][curPos.height]=newNumber[Math.floor(Math.random()*newNumber.length)];
		animation[curPos.width][curPos.height]="new";
	}
	
	/**
	 * 判断游戏是否已负
	 * @returns {Boolean} 如果游戏失败则返回true否则返回false
	 */
	$.fn.gameOver=function(){
		for(var i=0;i<maxWidth;i++){
			for(var j=0;j<maxWidth;j++){
				if(match[i][j]==0) return false;
				if(j!=maxWidth-1 && match[i][j]==match[i][j+1]) return false;
				if(i!=maxWidth-1 && match[i][j]==match[i+1][j]) return false;
			}
		}
		return true;
	}
	
	/**
	 * 将2048游戏矩阵进行某一个方向的移动
	 * @param {String} direction
	 * @returns {Boolean} 移动有效则返回true否则返回false
	 */
	function move(direction){
		var isMoved=false;
		
		if(direction=="ArrowLeft"){
			for(var i=0;i<maxWidth;i++){
				for(var j=0;j<maxWidth;j++){
					for(var k=j-1;;k--){
						if(k<0 || match[i][k]!=0){
							match[i][k+1]=match[i][j];
							if(k+1!=j){
								if(match[i][k+1]!=0) isMoved=true;
								match[i][j]=0;
							}
							break;
						}
					}
				}
			}
		}
		else if(direction=="ArrowRight"){
			for(var i=0;i<maxWidth;i++){
				for(var j=maxWidth-1;j>=0;j--){
					for(var k=j+1;;k++){
						if(k>=maxWidth || match[i][k]!=0){
							match[i][k-1]=match[i][j];
							if(k-1!=j){
								if(match[i][k-1]!=0) isMoved=true;
								match[i][j]=0;
							}
							break;
						}
					}
				}
			}
		}
		else if(direction=="ArrowUp"){
			for(var i=0;i<maxWidth;i++){
				for(var j=0;j<maxWidth;j++){
					for(var k=j-1;;k--){
						if(k<0 || match[k][i]!=0){
							match[k+1][i]=match[j][i];
							if(k+1!=j){
								if(match[k+1][i]!=0) isMoved=true;
								match[j][i]=0;
							}
							break;
						}
					}
				}
			}
		}
		else if(direction=="ArrowDown"){
			for(var i=0;i<maxWidth;i++){
				for(var j=maxWidth-1;j>=0;j--){
					for(var k=j+1;;k++){
						if(k>=maxWidth || match[k][i]!=0){
							match[k-1][i]=match[j][i];
							if(k-1!=j){
								if(match[k-1][i]!=0) isMoved=true;
								match[j][i]=0;
							}
							break;
						}
					}
				}
			}
		}
		
		return isMoved;
	}
	
	/**
	 * 将2048游戏矩阵进行某一方向的合并
	 * @param {String} direction
	 * @returns {Boolean} 合并有效则返回true否则返回false
	 */
	function join(direction){
		var isJoined=false;
		
		if(direction=="ArrowLeft"){
			for(var i=0;i<maxWidth-1;i++){
				for(var j=0;j<maxWidth;j++){
					if(match[j][i]==match[j][i+1]){
						if(match[j][i]!=0) isJoined=true;
						match[j][i]+=match[j][i+1];
						score+=match[j][i];
						match[j][i+1]=0;
					}
				}
			}
		}
		else if(direction=="ArrowRight"){
			for(var i=maxWidth-1;i>0;i--){
				for(var j=0;j<maxWidth;j++){
					if(match[j][i]==match[j][i-1]){
						if(match[j][i]!=0) isJoined=true;
						match[j][i]+=match[j][i-1];
						score+=match[j][i];
						match[j][i-1]=0;
					}
				}
			}
		}
		else if(direction=="ArrowUp"){
			for(var i=0;i<maxWidth-1;i++){
				for(var j=0;j<maxWidth;j++){
					if(match[i][j]==match[i+1][j]){
						if(match[i][j]!=0) isJoined=true;
						match[i][j]+=match[i+1][j];
						score+=match[i][j];
						match[i+1][j]=0;
					}
				}
			}
		}
		else if(direction=="ArrowDown"){
			for(var i=maxWidth-1;i>0;i--){
				for(var j=0;j<maxWidth;j++){
					if(match[i][j]==match[i-1][j]){
						if(match[i][j]!=0) isJoined=true;
						match[i][j]+=match[i-1][j];
						score+=match[i][j];
						match[i-1][j]=0;
					}
				}
			}
		}
		
		return isJoined;
	}
	
	/**
	 * 请求获取当前分数
	 * @returns {Number} score
	 */
	$.fn.getScore=function(){
		return score;
	}
	
	/**
	 * 请求获取当前游戏名称
	 * @returns {String} GameName
	 */
	$.fn.getGameName=function(){
		return "2048";
	}
	
	$(function(){
		/**
		 * 预加载资源后才能进行游戏
		 */
		$.fn.preload([img],function(){
			init();init();
			drawRect();
			$("body").keydown(function(e){
				if(pause) return;
				var isMoved=move(e.key);
				var isJoined=join(e.key);
				if(isMoved || isJoined){
					// 移动有效则进行下一步
					move(e.key);
					init();
					drawRect();
					if($.fn.gameOver()){
						var highScore=$.fn.getCookie("highScore-001");
						if(score>=highScore){
							$.fn.setCookie("highScore-001",score,31);
						}
						$.fn.submitResult("001");
					}
				}
			});
		});
		
		//计算每个方块的相对位置
		for(var i=0;i<maxWidth;i++){
			ePos[i]=[];
			for(var j=0;j<maxWidth;j++){
				ePos[i][j]={"left":j*eWidth+padding*(j+1),"top":i*eWidth+padding*(i+1)};
			}
		}
	});
})(jQuery);
