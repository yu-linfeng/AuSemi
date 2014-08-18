var showOverview = function(id){
	Ext.Ajax.request({
			url:'companyOverview',
			success:function(resp, opts){
				if (resp.responseText == '[]'){
					Ext.Msg.alert('提示', '网络出错!')
				}
	 		var json = resp.responseText;		//从后台取到的是一个JSON字符串，因为网络传输是通过字符串形式，虽然形式上是一个JSON对象，但是实际上是一个字符串
			var qejson = Ext.JSON.decode(json);	//将JSON字符串转换为JSON对象
			var o = new Overview(qejson);
			Ext.getCmp('overviewForm').getForm().loadRecord(o);
			}
		});

	var win = Ext.create('Ext.window.Window',{
		title:'修改<公司简介>',
		height:420,
		width:430,
		layout:'fit',
		
		items:{
			xtype:'form',
			id:'overviewForm',
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
				{xtype:'textfield', id:'overviewTitle', name:'overviewTitle',dataIndex:'overviewTitle',readOnly:true, fieldLabel:'标题'},
				{xtype: "textarea",height:300, id: "overview", name:'overview',dataIndex:'overview', fieldLabel: "正文(*若需换行，请加&lt;br&gt;)"}
			],
			buttons:[{
				text:'提交',
				handler:function(){
					if (this.up('form').getForm().isValid()){
						var o = new Overview({
							overviewTitle:this.up('form').getForm().getFieldValues().overviewTitle,
							overview:this.up('form').getForm().getFieldValues().overview
						});
//						Ext.Msg.alert('s', this.up('form').getForm().getFieldValues().overviewTitle);
						this.up('form').getForm().submit({
							url:'editOverview',
							waitTitle:'请稍后',
      						watiMsg:'正在提交信息······',
      						params:{
      							json:Ext.JSON.encode(o.data)
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