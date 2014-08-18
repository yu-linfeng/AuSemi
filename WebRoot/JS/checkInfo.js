var showCheckInfo = function(id){
	Ext.Ajax.request({
		url:'checkInfo',
		success:function(resp, opts){
			if (resp.responseText == '[]'){
				Ext.Msg.alert('提示', '网络出错!');
			}
 		var json = resp.responseText;		//从后台取到的是一个JSON字符串，因为网络传输是通过字符串形式，虽然形式上是一个JSON对象，但是实际上是一个字符串
		var qejson = Ext.JSON.decode(json);	//将JSON字符串转换为JSON对象
		var info = new Info(qejson);
		Ext.getCmp('checkInfoForm').getForm().loadRecord(info);
		}
	});
	
	var win = Ext.create('Ext.window.Window',{
		title:'查看管理员信息',
		height:120,
		width:430,
		layout:'fit',
		 resizable: false,
		items:{
			xtype:'form',
			id:'checkInfoForm',
			renderTo:Ext.getBody(),
			height:90,
			width:420,
			labelAlign:'right',
			buttonAlign:'center',
			frame:true,
			defaults:{
				width:350,
				labelWidth:60
			},
			items:[
				{xtype:'textfield', id:'nameInfo', name:'nameInfo',fieldLabel:'用户名', readOnly:true},
				{xtype: "textfield", id: "pwdInfo", name:'pwdInfo',fieldLabel: "密码", readOnly:true}
			],
			buttons:[{
				text:'关闭',
				handler:function(){
					win.close();
				}
			}]
		}
	}).show();
};