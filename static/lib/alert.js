function myfun() {
	let extend      = function (_defult,opts,successCallback) {
			for(let m in opts){
				_defult[m]=opts[m]
			}
			return _defult;
		},
		clearHTML    = function(opts){
			return document.createElement(opts)
		},
		dotHtml = function(nam){
			return document.getElementsByTagName(nam)[0]
		},
		clsHtml = function(cls){
			return document.getElementsByClassName(cls)[0]
		}

	 var PhoneAlert = function(opts,successCallback){
	 	this.title=opts.title;
	 	this.cont=opts.cont;
	 	this.btns=opts.btns;
	 	this.yes=opts.yes;
	 	this.no=opts.no;
	 	this.successCallback=successCallback;
	 	//初始化
	 	this.init()
	 } 

	 PhoneAlert.prototype={
	 	init : function(){

	 	//添加背景阴影
	 		this.backHtml()
	 	//添加弹框
	 		this.boxHtml()
	 	},
	 	//添加背景阴影
	 	backHtml : function(){
	 		let back = this.back=clearHTML("div")
	 			back.className="ind_back"
	 		dotHtml('body').appendChild(back)
	 	},
	 	//添加弹框
	 	boxHtml : function(){

	 		//创建元素标签
	 		var box   =  clearHTML("div")
	 			str   =   "",
	 			that  =  this;

	 			//添加class 类名
	 			box.className    =  "indA_box";
	 			//添加内容
	 			str+='<div class="indA_title">'+that.title+'</div>'+
					'<div class="indA_cont">'+that.cont+'</div>';

					if(that.btns){
						str+='<div class="indA_footer"/>'
						for(var i=0;i<that.btns.length;i++){
							if(that.btns.length>1){
								str+='<button class="minBtn" btn-ind="'+i+'">'+that.btns[i]+'</button>'
							}
							else{
								str+='<button class="maxBtn">'+that.btns[i]+'</button>'
							}	
						}
						str+='<div>'
					}

	 			//追加到页面中
	 			box.innerHTML=str;
	 			dotHtml("body").appendChild(box)

	 			//设置弹框样式
	 			that.styleHtml(box)
	 			//点击按钮
	 			var minbtns = document.getElementsByClassName('minBtn').length>1?document.getElementsByClassName('minBtn'):document.getElementsByClassName('maxBtn');
	 			if(minbtns){
	 				that.clickBtn(minbtns,box )
	 			}
	 			//拖动效果
	 			var move =require("server/move");

	 			var alertmin_box = clsHtml('indA_box');
	 				move(alertmin_box) 			
	 	},
	 	//设置弹框样式
	 	styleHtml : function(box){
	 		//console.log(this.box.clientWidth)
	 		var boxW=box.clientWidth;
			var boxH=box.clientHeight;
			var keshiW=document.documentElement.clientWidth
			var keshiH=document.documentElement.clientHeight;

			box.style.left=(keshiW-boxW)/2+"px"
			box.style.top=(keshiH-boxH)/2+"px"
	 	},
	 	clickBtn : function(btns,oldobox ){
	 		var that=this; 		
				if(btns.length>1){
					for(let i=0;i<btns.length;i++){
						btns[i].onclick=function(){
							var ind=this.getAttribute("btn-ind")
							if(ind==0){
								that.yes()							
							}
							else if(i==1){
								console.log()
								//取消弹框
								that.no()
								//that.cancel()						
							}
						}
					}
				}
				else if(btns.length==1){
					btns[0].onclick=function(){
						console.log(11)
						that.yes()
					}
				}
				else{
					setTimeout(function(){

						var body = dotHtml('body'),
						alertmin_box = clsHtml('indA_box'),
						img  =  clearHTML("img"),
						box  =  clearHTML("div")

			 			//添加class 类名
			 			box.className    =  "indA_box1";
						img  =  clearHTML("img");
						img.src="public/images/loading.gif"
						box.appendChild(img)

						body.replaceChild(box,oldobox)
							//设置弹框样式
	 						that.styleHtml(box)
							that.successCallback("true")
					},3000)
				}
	 	}
	 }

	var Alerts   =   function(cont,opts){		
			return new PhoneAlert(extend({
				title:"1363234445",
				cont:cont,
				btns:["yes","no"]
			},opts))
		},
		cancelAlert = function(cont,opts){
			return new PhoneAlert(extend({
				title:"1363234445",
				cont:cont,
				btns:["yes","no"]
			},opts))
		},
		succeedBox  = function(cont,opts,fn){
			return new PhoneAlert(extend({
				title:"1363234445",
				cont:cont
			},opts),fn)
		}
		//取消弹框
	 	cancelBox =   function(){
	 		let body = dotHtml('body'),
				back = clsHtml('ind_back'),
				alertmin_box1 = clsHtml('indA_box1')
				alertmin_box = clsHtml('indA_box');
				body.removeChild(back)
				if(alertmin_box1){
					body.removeChild(alertmin_box1)
				}
				if(alertmin_box){
					body.removeChild(alertmin_box)
				}				
	 	}

}

export { //很关键
  myfun
}	 	
	/*module.exports = {
		Alerts:Alerts,
		cancelAlert:cancelAlert,
		cancelBox:cancelBox,
		succeedBox:succeedBox
	}*/	
