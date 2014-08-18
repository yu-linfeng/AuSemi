var showCulture = function(id){
	Ext.Ajax.request({
		url:'companyCulture',
		success:function(resp, opts){
			if (resp.responseText == '[]'){
				Ext.Msg.alert('提示', '网络出错!')
			}
 		var json = resp.responseText;		//从后台取到的是一个JSON字符串，因为网络传输是通过字符串形式，虽然形式上是一个JSON对象，但是实际上是一个字符串
		var qejson = Ext.JSON.decode(json);	//将JSON字符串转换为JSON对象
		var c = new Culture(qejson);
		Ext.getCmp('cultureForm').getForm().loadRecord(c);
		}
	});
	
	
	var win = Ext.create('Ext.window.Window',{
		title:'修改<企业文化>',
		height:420,
		width:430,
		layout:'fit',
		items:{
			xtype:'form',
			id:'cultureForm',
			renderTo:Ext.getBody(),
			height:390,
			width:420,
			labelAlign:'right',
			buttonAlign:'center',
			frame:true,
			defaults:{
				width:350,
				labelWidth:60
			},
			items:[
				{xtype:'textfield', id:'cultureTitle', name:'cultureTitle',fieldLabel:'标题', readOnly:true},
				{xtype: "textarea",height:300, id: "culture", name:'culture',fieldLabel: "正文(*若需换行，请加&lt;br&gt;)"}
			],
			buttons:[{
				text:'提交',
				handler:function(){
					if (this.up('form').getForm().isValid()){
						var c = new Culture({
							cultureTitle:this.up('form').getForm().getFieldValues().cultureTitle,
							culture:this.up('form').getForm().getFieldValues().culture
						});
						this.up('form').getForm().submit({
							url:'editCulture',
							waitTitle:'请稍后',
      						watiMsg:'正在提交信息······',
      						params:{
      							json:Ext.JSON.encode(c.data)
      						},
      						success:function(resp, opts){
      							var success = opts.result.success;
      							if (success){
      								Ext.Msg.alert('提示','提交成功!');
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
			},{
				text:'关闭',
				handler:function(){
					win.close();
				}
			}]
		}
	}).show();
};