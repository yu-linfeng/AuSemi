var uname = new Ext.form.TextField({
	id : 'uname',
	fieldLabel : '用户名',
	name : 'name', // 元素名称
	anchor : '95%', // 也可用此定义自适应宽度
	allowBlank : false, // 不允许为空
	width : 300,
	blankText : '用户名不能为空' // 错误提示内容
});
var pwd = new Ext.form.TextField({
	id : 'pwd',
	xtype : 'textfield',

	inputType : 'password',
	fieldLabel : '密　码',
	anchor : '95%',
	name : 'password',
	allowBlank : false,
	width : 300,
	blankText : '密码不能为空'
});

Ext.onReady(function() {
	// 使用表单提示
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';

	// 定义表单
	var simple = Ext.create('Ext.form.Panel', {
        labelWidth: 75,
        defaults: {
            width: 150
        },
        defaultType: 'textfield', //默认字段类型  
        bodyStyle: 'background-color: #DFE8F6;padding:30 0 0 20;',
        border: false,
        buttonAlign: 'center',
        border: false,
        id: "form",
        //定义表单元素
        items:[uname, pwd],
        buttons:[{
        	text:'登陆',
        	type:'submit',
        	id:'sb',
        	handler: save		//定义表单提交事件
        },{
        	text:'重置',
        	handler:function(){
        		simple.form.reset();
        	}
        }]
	});
	//提交验证方法
	function save(){
//        var userName = uname.getValue();
//        var userPass = pwd.getValue();
        var login = new Login({
        	userName:uname.getValue(),
        	userPass:pwd.getValue()
        });
        //验证成功使用进度条
        if (simple.form.isValid()){
        	//提交到服务器
        	simple.form.submit({
        		watiMsg:'正在进行登录验证，请稍后……',
            	url: 'login',
//            	params:{
//            		userName: userName,
//        			userPass: userPass
//            	},
            	params:{
            		json:Ext.JSON.encode(login.data)
            	},
            	//成功
            	success:function(form, action){
            		window.location.href = 'index.jsp';
            	},
            	//失败
            	failure:function(form, action){
            		switch(action.failureType){
            			case Ext.form.Action.CLIENT_INVALID:
            				Ext.Msg.alert('错误提示', '表单数据非法请核实后重新输入！');
            				break;
            			case Ext.form.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('错误提示', '网络连接异常！');
                            break;
                        case Ext.form.Action.SERVER_INVALID:
                            Ext.Msg.alert('错误提示', "您的输入用户信息有误，请核实后重新输入！");
                            simple.form.reset();
            		}
            	}
        	});
        }
	}
	
    //定义窗体  
    var win = new Ext.Window({
        id: 'win',
        title: 'AuSemi后台管理·用户认证',
        layout: 'fit', //自适应布局     
        align: 'center',
        width: 330,
        height: 162,
        resizable: false,
        draggable: false,
        border: false,
        maximizable: false, //禁止最大化  
        closeAction: 'close',
        closable: false, //禁止关闭,  
        items: simple
        //将表单作为窗体元素嵌套布局  
    });
    win.show(); //显示窗体  
});





