function formbox(id) {

	var Formvaluedate = function(id,opts,successCallback){
		var _json = {
			'kong':{
				'rules': '\\S{1,} ',
				'tips' : '该信息为必填项，请填写！',
				'error' : '对不起，必填信息不能为空，请填写！'
			},
			'text':{
				'rules': '^[\u4e00-\u9fa5]+$',
				'tips' : "不能为空 二位以上 ",
				'error' : "对不起，用户名格式不正确。这确的格式如：“张三”。",
				'warn': "对不起，该用户名已经被注册。请更换一个用户名"
			},
			'password': {
				'rules': '^[a-zA-Z0-9\_\-\~\!\%\*\@\#\$\&\.\(\)\[\]\{\}\<\>\?\\\/\'\"]{3,20}$',
				'tips' : "3~20个字符，由英文字母，数字和特殊符号组成。",
				'error' : "对不起，您填写的密码有误。"
			},
			'number':{
				'rules': '^\\d+$',
				'tips': '请输入数字！',
				'error': '对不起，您填写的不是数字。'
			},
			'date':{
				'rules': '^\\d{4}\-\d{2}-\d{2}$',
				'tips': '请填写日期！格式为：1989-09-23',
				'error': '对不起，您填写的日期格式不正确.'
			},
			'money':{
				'rules': '^[-+]?(0|[1-9]\d*)(\.\d+)?$',
				'tips': '请输入金额！',
				'error': '金额格式不正确。正确格式如：“60” 或 “60.5”。'
			},
			'per':{
				'rules': '^(?:[1-9][0-9]?|100)(?:\.[0-9]{1,2})?$',
				'tips': '请输入百分比！',
				'error': '对不起，您填写的百分比格式不正确！'
			},
			'email':{
				'rules': '\\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)* ',
				'tips': '请输入您常用的E-mail邮箱号，以便我们联系您，为您提供更好的服务！',
				'error': '对不起，您填写的E-mail格式不正确！正确的格式：yourname@gmail.com。',
				'warn': '对不起，该E-mail帐号已经被注册。请更换一个。'
			},
			'phone':{
				'rules':'\\d{3}-\\d{8}\|\\d{4}-\\d{7}',
				'tips': '请输入可以联系到您常用的电话号码！',
				'error': '对不起，您填写的电话号码格式不正确！'
			},
			'mobile':{
				'rules': '^1[3|4|5|7|8][0-9]{9}$',
				'tips': '请输入可以联系到您的手机号码！',
				'error': '对不起，您填写的手机号码格式不正确！'
			},
			'url':{
				'rules': '^(http|https):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$',
				'tips': '请输入网站地址！',
				'error': '对不起，您填写的网站地址格式不正确！正确的网站地址如：http://www.yourdomain.com/。'
			},
			'ip':{
				'rules':'\\d+\.\d+\.\d+\.\d+ ',
				'tips': '请输入IP地址！',
				'error': '对不起，您填写的IP地址格式不正确！正确的IP地址如：192.168.1.1。'
			},
			'zip':{
				'rules':'^[1-9]\d{5}$',
				'tips': '请输入邮政编码！',
				'error': '对不起，您填写的邮政编码格式不正确！正确的邮政编码如：430051。'
			},
			'qq':{
				'rules':'[1-9][0-9]{4,}',
				'tips': '请输入您的QQ号！',
				'error': '对不起，您填写的QQ号格式不正确！正确的QQ号如：64392719。'
			},
			'english':{
				'rules':'^[A-Za-z]+$',
				'tips': '请输入英文字母！',
				'error': '对不起，您填写的内容含有英文字母（A-Z,a-z）以外的字符！'
			},
			'chinese':{
				'rules':'^[\u0391-\uFFE5]+$',
				'tips': '请输入中文字符！',
				'error': '对不起，您填写的内容含非中文字符！'
			},
			'ce':{
				'rules':'^[-\w\u0391-\uFFE5]+$',
				'tips': '请输入中文或英文或数字字符！',
				'error': '对不起，您填写的内容不正确！'
			},
			'integer':{
				'rules':'^[-\+]?\d+$',
				'tips': '请输入整数！',
				'error': '对不起，您填写的内容不是整数！'
			},
			'idcard':{
				'rules':'\\d{18}',
				'tips': '请输入身份证号码！',
				'error': '对不起，您填写的身份证号码格式不正确！'
			},
			'radio':{
				'rules':'^0$'
			},
			'empty':{
				'rules':'^\s*$'
			},
			'anything':{
				'rules':'^[\s\S]*$'
			}
		}

		for(let m in opts){
			_json[m]=opts[m]
		}
		this.json=_json

		this.form=document.querySelector(id);

		console.log(this.form)

		this.options = [];//存放验证项的所有参数
		this.options=this.form.querySelectorAll("input,select,textare");
		this.setInputPattern ()
		
		this.init(opts)

		//console.log(this.options)
	};

	Formvaluedate.prototype ={
		init :function(opts){
			var that=this;
			if(!that.form) return false

			this.addEvent(that.form,"submit");
		},
		click:function(opts){		
			var required=opts.getAttribute("required")
			if(required!=null){
				if(opts.value==""){
					return{
						type:1,
						click:false
					}
				}
				else{

					if(opts.checkValidity()){
						return {
							type:1,
							click:true
						}
					} 
					else{
						return {
							type:2,
							click:false
						}
					}	
				}
			}
			else{
				if(opts.value==""){
					return{
						type:1,
						click:false
					}
				}
				else{
					return {
						type:2,
						click:opts.checkValidity()//验证格式是否正确
					}
				}
			}
		},
		addEvent:function(el,type){
			var that=this;
			//给表单添加  取消表单验证	
			el.setAttribute("novalidate",true);

			el.onsubmit=function(){
				//取消默认提交
				that.preventDefault()
				//表单提交时验证所有
				
				if(that.validateAll(el)){
					successCallback(true)
				}

			}	
		},
		//取消默认提交
		preventDefault : function(e){
			var e=e||window.event;
			//console.log(e)
			if(e.preventDefault){
				e.preventDefault();
			}else{
				e.returnValue = false;
			};
		},
		//表单提交时验证所有
		validateAll : function(el){
			var that=this;
			var flag=true;
			
				for(var i=0;i<that.options.length;i++){
					var clicktype=this.click(that.options[i]);	
				// 如果是  true 证明是  空 就会不执行
					if(!clicktype.click){
						
						this.checkType(that.options[i],clicktype.type);
						flag=false
					}
					else{
						
					}
				}

				return flag;
		},
		checkType : function(item,types){
			if(types==1){
				item.value=""
				item.className=""
				//item.setAttribute("placeholder","")
			}
			else if(types==2){
				item.value=""
				item.className="color"
				item.setAttribute("placeholder",item.getAttribute("error"))
			}
		},
		//渲染  提示框
		setInputPattern : function(){
			var options=this.options;

			for(var i=0;i<options.length;i++){
				var type=options[i].name;			
					
				if(this.json[type]){

					if(!options[i].getAttribute("pattern")){
						options[i].setAttribute("pattern",this.json[type].rules)	
					}


					if(!options[i].getAttribute("error")){
						options[i].setAttribute("error",this.json[type].error)
					}

					if(!options[i].getAttribute("placeholder")){
						options[i].setAttribute("placeholder",this.json[type].tips)
					}
				}
			}
		}
	}

	return new Formvaluedate(id,opts,successCallback)
	
}

export { //很关键
  formbox(id)
}	