var showMessage = function(){
//	messageComp = centerPanel.getComponent(id);
	var checkBox = Ext.create('Ext.selection.CheckboxModel');   		//grid中添加付复选框按钮
//	if (!messageComp){
		/*加载数据*/
		var store = Ext.create('Ext.data.Store',{
			storeId:'messageStore',
	 	    model:Message,
//		    pageSize: 16,
		    proxy: {
		    	type: 'ajax',
		    	url: 'allMessage',
		    	reader: {
		    		type: 'json',
		    	}
		    }
		}).load();
		/*显示数据*/
		messageComp = Ext.create('Ext.grid.Panel',{
			id:'messageGrid',
		//	title:'留言管理',
			store:Ext.data.StoreManager.lookup('messageStore'),
			autoHeight:true,
			autoWidth:true,
			loadMask:true,		//是否在加载数据时显示遮罩效果，默认为false 
			idsableSelection:true,		//能否被选中
			selModel:checkBox,		//添加复选框
	//		closable:true,
			columnLines: true,		//是否显示列分割线
			forceFit: true,		//列自动适应
			columns:[
			         {xtype:'rownumberer', id:'messageAutoId', header:'序号',align:'center'},		//自动编号
			         {header:'id',dataIndex:'id',hidden:true},			//隐藏ID，会根据ID值进行删除
			         {header:'标题', dataIndex:'messageTitle', align:'center'},
			         {header:'邮箱', dataIndex:'mail', align:'center'},
			         {header:'内容', dataIndex:'message', align:'center'}
			],
			tbar:[{
				pressed:true,
				text:'查看留言',
				handler:function(){
					var look = messageComp.getSelectionModel().getSelection();		//获取复选框的选择
					if (look.length != 1){		//选择的行数不等于1，只能一行一行的进行职称查看
						Ext.Msg.alert('提示','请选择一行进行查看！');
						return ;
					}else{
						//若选择了一行则通过look显示职称信息
						var win = Ext.create('Ext.window.Window', {
							title:"查看留言信息",
						    height: 380,
						    width: 430,
						    layout: 'fit',
						    items:{
								renderTo: Ext.getBody(),
							    height: 350,
							    width: 420,
							    labelAlign: "right",
							    buttonAlign:'center',
							    frame: true,
							    defaults:{
					      			width:350,
					      	 		labelWidth: 60
					      		},
					    		items: [			    		
					      	 		{xtype:'textfield',id:'messageTitle', fieldLabel:'标题'},
					         		{xtype:'textfield',id: "mail", fieldLabel: "E-Mail"},
					         		{xtype: "textarea", height:300, id: "message", fieldLabel: "内容"}
					      		],
					      		buttons:[{
					      			text:"关闭",
					      			handler: function() {
					      			win.close();
					      			}
					      	   }]
							}
					}).show();
					Ext.getCmp('messageTitle').setValue(look[0].get('messageTitle'));
					Ext.getCmp('mail').setValue(look[0].get('mail'));
					Ext.getCmp('message').setValue(look[0].get('message'));						
					}
				}
			},{
					xtype:'tbseparator'
			},{
				pressed:true,
				text:'删除留言',
				handler:function(){
					//Ext.Msg.alert('Click', '您单击了删除按钮');
					var look = messageComp.getSelectionModel().getSelection();		//获取复选框的选择
					if (look.length != 1){
						Ext.Msg.alert('提示','请选择一行进行删除！');
						return ;
					}else{
						Ext.Msg.confirm('提示','您确定要删除该留言信息吗？', function(btn){
							if (btn == 'yes'){
								var m = new Message({
									id:look[0].get('id'),
									messageTitle:look[0].get('messageTitle'),
									mail:look[0].get('mail'),
									message:look[0].get('message')
		      					});
//								Ext.Msg.alert('',Ext.JSON.encode(m.data));
								Ext.Ajax.request({
									url:'deleteMessage',
		      						params:{
		      							json:Ext.JSON.encode(m.data)
		      						},
		      						success:function(resp, opts){
//		      							var success = opts.result.success;
		      							var success=Ext.decode(resp.responseText);    
		      							if (success){
		      								Ext.Msg.alert('提示','删除成功!');
		      								var messageGrid = Ext.getCmp('messageGrid');
		      								if (messageGrid){
		      									var store = messageGrid.getStore();
		      									store.load();
////		      									win.close();
		      								}
		      							}else{
		      								Ext.Msg.alert('提示','删除失败!');
		      							}
		      						},
		      						failure:function(resp, opts){
//		      							Ext.Msg.alert('提示','删除失败...!');
		      						}
								});
							}
						});
					}
				}
			}]
		});
//		centerPanel.add(messageComp);
//	}
//		centerPanel.setActiveTab(messageComp);
		var tabs = Ext.getCmp("mainTab");
		var showMessageTab = tabs.getComponent("showMessageTab");
		if (showMessageTab){
			tabs.setActiveTab(showMessageTab);
		}else{
			tabs.add({
				id:'showMessageTab',
				title:'留言管理',
				closable:true,
				items:[messageComp]
			}).show();			
		}
};