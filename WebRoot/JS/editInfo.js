var showEditInfo = function(id){
	Ext.Ajax.request({
		url:'checkInfo',
		success:function(resp, opts){
			if (resp.responseText == '[]'){
				Ext.Msg.alert('提示', '网络出错!');
			}
 		var json = resp.responseText;		//从后台取到的是一个JSON字符串，因为网络传输是通过字符串形式，虽然形式上是一个JSON对象，但是实际上是一个字符串
		var qejson = Ext.JSON.decode(json);	//将JSON字符串转换为JSON对象
		var info = new Info(qejson);
		Ext.getCmp('editInfoForm').getForm().loadRecord(info);
		}
	});
	
	var win = Ext.create('Ext.window.Window',{
		title:'修改管理员信息',
		height:220,
		width:430,
		layout:'fit',
		 resizable: false,
		items:{
			xtype:'form',
			id:'editInfoForm',
			renderTo:Ext.getBody(),
			height:190,
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
				{xtype: "textfield", id: "pwdInfo", name:'pwdInfo',fieldLabel: "原密码", readOnly:true},
				{xtype: "textfield", id: "newPwd", name:'newPwd',fieldLabel: "新密码"},
				{xtype: "textfield", id: "againNewPwd", name:'againNewPwd',fieldLabel: "请再输入一次新密码"}
			],
			buttons:[{
				text:'提交修改',
				handler:function(){
					var newPwd= this.up('form').getForm().getFieldValues().newPwd;
					var againNewPwd = this.up('form').getForm().getFieldValues().againNewPwd;
					if (newPwd != againNewPwd){
						Ext.Msg.alert('提示!', '两次密码请一致!')
					}else{
						if (this.up('form').getForm().isValid()){
							var info = new Info({
								nameInfo:this.up('form').getForm().getFieldValues().nameInfo,
								pwdInfo:this.up('form').getForm().getFieldValues().pwdInfo
							});
							this.up('form').getForm().submit({
								url:'editInfo',
								waitTitle:'请稍后',
	      						watiMsg:'正在提交信息······',
	      						params:{
	      							json:Ext.JSON.encode(info.data)
	      						},
	      						success:function(resp, opts){
	      							var success = opts.result.success;
	      							if (success){
	      								Ext.Msg.alert('提示','提交成功!');
//	      								Ext.getCmp('editInfoForm').getForm().loadRecord(info);
	      							}else{
	      								Ext.Msg.alert('提示','提交失败!');
	      							}
	      						},
	      						failure:function(resp, opts){
	      							Ext.Msg.alert('提示','提交失败...!');
	      						}
							});
						}
					}
				}
			},{
				text:'关闭',
				handler:function(){
					win.close();
				}
			}]
		}
	}).show();
};