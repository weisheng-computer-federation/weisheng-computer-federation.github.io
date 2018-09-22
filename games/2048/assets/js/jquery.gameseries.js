/*!
 * a necessary file of a series of games by zyf which can make the games work
 * gamesafety - v1.0.0 (2018-7-24T21:27:08+0800)
 * https://weisheng.cf/ | Released under MIT license
 * Copyright 2017-2018 weisheng.cf
 * 
 * Include jquery (http://jquery.com/)
 */

var pause=false;
var volume=true;

(function($){
	$(function(){
		$("#show-menus").click(function(){
			if($(this).data("menus")=="off"){
				$.fn.pauseGame(1);
				$("#hidden-menus").animate({"left":0},100);
				$(this).removeClass("glyphicon-chevron-left").addClass("glyphicon-chevron-right").data("menus","on");;
			}
			else{
				$("#hidden-menus").animate({"left":"500px"},100);
				$(this).removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-left").data("menus","off");;
			}
		});
	});
	
	/**
	 * 设置Cookies
	 * @param {String} key
	 * @param {String} value
	 * @param {Number} days
	 */
	$.fn.setCookie=function(key,value,days){
		var d=new Date();
		d.setTime(d.getTime()+(days*24*60*60*1000));
		var expires="expires="+d.toUTCString();
		document.cookie=key+"="+value+";"+expires;
	}
	
	/**
	 * 获取Cookies
	 * @param {String} key
	 */
	$.fn.getCookie=function(key){
		var name=key+"=";
		var ca=document.cookie.split(";");
		for(var i=0;i<ca.length;i++){
			var c=ca[i];
			while(c.charAt(0)==" ") c=c.substring(1);
			if(c.indexOf(name)!="-1") return c.substring(name.length,c.length);
		}
		return "";
	}
	
	/**
	 * 调整音量
	 */
	$.fn.volume=function(){
		if(volume){
			$("#game-volume").removeClass("glyphicon-volume-up").addClass("glyphicon-volume-off");
		}
		else{
			$("#game-volume").removeClass("glyphicon-volume-off").addClass("glyphicon-volume-up");
		}
		volume=!volume;
	}
	
	/**
	 * 暂停游戏
	 * @param {Number} pause
	 */
	$.fn.pauseGame=function(force=0){
		if(force==1 || !pause){
			$("#game-pause").removeClass("glyphicon-pause").addClass("glyphicon-play");
			pause=true;
		}
		else{
			$("#game-pause").removeClass("glyphicon-play").addClass("glyphicon-pause");
			pause=false;
		}
	}
	
	/**
	 * 退出游戏
	 */
	$.fn.quitGame=function(){
		location.href="/GameSeries/";
	};
			
	/**
	 * 强制使用全屏游戏
	 */
	function fullSize(canvas){
		canvas.width=$(window).width();
		canvas.height=$(window).height();
		cWidth=canvas.width;
		cHeight=canvas.height;
	}
	$.fn.fullSize=function(canvas){
		fullSize(canvas);
		$(window).resize(function(){
			fullSize(canvas);
			$.fn.drawRect();
		});
	}
	
	/**
	 * 提交成绩
	 * @param {String} seriesIndex
	 */
	$.fn.submitResult=function(seriesIndex){
		if($.fn.gameOver()==false){
			return false;
		}
		
		var score=$.fn.getScore();
		var highScore=$.fn.getCookie("highScore-"+seriesIndex);
		$("#mask").fadeIn(1000,function(){
			$("#result").html(score);
			$("#highScore").html(highScore);
		});
	}
	
	/**
	 * 分享成绩
	 */
	$.fn.share=function(){
		if($.fn.gameOver()==false){
			return false;
		}
		
		var canvas=document.getElementById("canvas").toDataURL("image/png");
		var shareImg=document.createElement("img");
		shareImg.src=canvas;
		QQShare(shareImg,$.fn.getScore(),$.fn.getGameName());
	}
	
	/**
	 * 预加载资源
	 * @param {Object} options
	 */
	$.fn.preload=function(options,callback){
		if(options==undefined){
			$("#preload").fadeOut(500);
			return;
		}
		
		if(Object.prototype.toString.call(options)=="[object String]")	options=[options];
		var loaded=0,loading=options.length;
		$("#loading").html(loading);
		for(var i in options){
			var img=new Image();
			if(Object.prototype.toString.call(options[i])=="[object HTMLImageElement]"){
				img=options[i];
			}
			else{
				img.src=options[i];
			}
			img.onerror=function(){
				$("#preload-gif").html("<p>资源加载失败！</p>");
			}
			img.onload=function(){
				loaded++;
				$("#loaded").html(loaded);
				if(loaded==loading){
					$("#preload").fadeOut(500);
					callback();
				}
			};
		}
	}
	
	/**
	 * 补全数字前导零
	 * @param {Number} num
	 * @param {Number} length
	 * @param {Number} character
	 */
	$.fn.padLeft=function(num,length,character){
		num=num.toString();
		character=character.toString();
		while(num.length<length){
			num=character+num;
		}
		return num;
	}
	
	/**
	 * 调用QQ分享功能
	 * @param {Object} img
	 * @param {Number} score
	 */
	function QQShare(img,score,name){
		var p={
			"url":"http://weisheng.cf/",
			"desc":"我在微笙无上计算机协会的"+name+"游戏中取得"+score+"分！",
			"pics":"http://img1.imgtn.bdimg.com/it/u=3493418194,747266283&fm=27&gp=0.jpg",
			"site":"微笙无上计算机协会"
		};
		var s=[];
		for(var i in p){
			s.push(i+'='+encodeURIComponent(p[i]));
		}
		var target_url="https://connect.qq.com/widget/shareqq/iframe_index.html?"+s.join('&');
		window.open(target_url,'qq','height=520, width=720');
	}
})(jQuery);
