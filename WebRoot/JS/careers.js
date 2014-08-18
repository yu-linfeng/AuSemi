var showCarrers = function(id){
	Ext.Ajax.request({
		url:'companyCareers',
		success:function(resp, opts){
			if (resp.responseText == '[]'){
				Ext.Msg.alert('提示', '网络出错!');
			}
 		var json = resp.responseText;		//从后台取到的是一个JSON字符串，因为网络传输是通过字符串形式，虽然形式上是一个JSON对象，但是实际上是一个字符串
		var qejson = Ext.JSON.decode(json);	//将JSON字符串转换为JSON对象
		var ca = new Careers(qejson);
		Ext.getCmp('careersForm').getForm().loadRecord(ca);
		}
	});
	
	var win = Ext.create('Ext.window.Window',{
		title:'修改<招聘信息>',
		height:420,
		width:430,
		layout:'fit',
		items:{
			xtype:'form',
			id:'careersForm',
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
				{xtype:'textfield', id:'careersTitle', name:'careersTitle',fieldLabel:'标题', readOnly:true},
				{xtype: "textarea",height:300, id: "careers", name:'careers',fieldLabel: "正文(*若需换行，请加&lt;br&gt;)"}
			],
			buttons:[{
				text:'提交',
				handler:function(){
					if (this.up('form').getForm().isValid()){
						var ca = new Careers({
							careersTitle:this.up('form').getForm().getFieldValues().careersTitle,
							careers:this.up('form').getForm().getFieldValues().careers
						});
						this.up('form').getForm().submit({
							url:'editCareers',
							waitTitle:'请稍后',
      						watiMsg:'正在提交信息······',
      						params:{
      							json:Ext.JSON.encode(ca.data)
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