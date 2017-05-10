function move(box){
	var that=this;
	box.addEventListener("touchstart",function(e){

		var e=e.event||window.event;
		var thouch=e.touches[0];
		var X=thouch.pageX-this.offsetLeft;
		var Y=thouch.pageY-this.offsetTop;		

		var dong=function(e){
				var e=e.event||window.event;
				var thouch=e.touches[0];
				var movel=thouch.pageX-X;
	            var movet=thouch.pageY-Y;
	           
	            var winw=document.documentElement.clientWidth-box.clientWidth;
	           var winh=document.documentElement.clientHeight-box.clientHeight;

	              if(movel<0)movel=0;
	              if(movet<0)movet=0
	              if(movel>=winw)movel=winw
	              if(movet>=winh)movet=winh

		           box.style.left=movel+"px"
		           box.style.top=movet+"px"

		}
		//滑动事件
		document.body.addEventListener("touchmove",dong,false);
		//离开 移除事件
		document.body.addEventListener("touchend",function(){
			document.body.removeEventListener("touchmove",dong, false);
		})
	})
}

export {

	move
}

