var showAgent = function(){
//	agentComp = centerPanel.getComponent(id);
	var checkBox = Ext.create('Ext.selection.CheckboxModel');   		//grid中添加付复选框按钮
	//if (!agentComp){
		/*加载数据*/
		var store = Ext.create('Ext.data.Store',{
			storeId:'agentStore',
	 	    model:Agent,
		    proxy: {
		    	type: 'ajax',
		    	url: 'allAgent',
		    	reader: {
		    		type: 'json',
		    	}
		    }
		}).load();
		/*显示数据*/
		agentComp = Ext.create('Ext.grid.Panel',{
			id:'agentGrid',
	//		title:'代理商',
			store:Ext.data.StoreManager.lookup('agentStore'),
			autoHeight:true,
			autoWidth:true,
			loadMask:true,		//是否在加载数据时显示遮罩效果，默认为false 
			idsableSelection:true,		//能否被选中
			selModel:checkBox,		//添加复选框
	//		closable:true,
			columnLines: true,		//是否显示列分割线
			forceFit: true,		//列自动适应
			columns:[
			         {xtype:'rownumberer', header:'序号',align:'center'},	//自动编号
			         {header:'id',dataIndex:'agentId',hidden:true},			//隐藏ID，会根据ID值进行删除
			         {header:'地区', dataIndex:'area', align:'center'},
			         {header:'公司名', dataIndex:'companyName', align:'center'},
			         {header:' 网址', dataIndex:'url', align:'center'},
			         {header:'代理商', dataIndex:'agentContent', align:'center'}
			],
			tbar:[{
				pressed:true,
				text:'新增代理商',
				handler:function(){
					var win = Ext.create('Ext.window.Window',{
						title:'新建代理商信息',
						height: 350,
					    width: 430,
					    items:{
					    	xtype:'form',
							id:'agentForm',
							renderTo: Ext.getBody(),
						    height: 320,
						    width: 420,
						    labelAlign: "right",
						    buttonAlign:'center',
						    frame: true,
						    defaults:{
				      			width:350,
				      	 		labelWidth: 60
				      		},
				    		items: [			    		
								{xtype:'textfield',id:'area', name:'area',dataIndex:'area', fieldLabel:'地区'},
								{xtype:'textfield', id:'companyName', name:'companyName',dataIndex:'companyName', fieldLabel:'公司名'},
								{xtype:'textfield', id:'url', name:'url',dataIndex:'url', fieldLabel:'网址'},
								{xtype:'textarea',height:'200', id:'agentContent', name:'agentContent',dataIndex:'agentContent', fieldLabel:'代理商(*若需换行，请加&lt;br&gt;)'}
				      		],
				      		buttons:[{
				      				text:'提交',
				      				handler:function(){
				    					if (this.up('form').getForm().isValid()){
			 
				    						var a = new Agent({
				    							area:this.up('form').getForm().getFieldValues().area,
				    							companyName:this.up('form').getForm().getFieldValues().companyName,
				    							url:this.up('form').getForm().getFieldValues().url,
				    							agentContent:this.up('form').getForm().getFieldValues().agentContent
				    						});
				    						this.up('form').getForm().submit({
				    							url:'newAgent',
				    							waitTitle:'请稍后',
				          						watiMsg:'正在提交信息······',
				          						params:{
				          							json:Ext.JSON.encode(a.data)
				          						},
				          						success:function(resp, opts){
				          							var success = opts.result.success;
				          							if (success){
				          								Ext.Msg.alert('提示','提交成功!');
					      								var agentGrid = Ext.getCmp('agentGrid');
					      								if (agentGrid){
					      									var store = agentGrid.getStore();
					      									store.load();
					      									Ext.getCmp('agentForm').getForm().reset();
					      								}
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
				      				text:"关闭",
				      				handler: function() {
				      				win.close();
				      			}
				      	   }]
						}
					}).show();
				}
			},{
				xtype:'tbseparator'
			},{
				pressed:true,
				text:'查看代理商',
				handler:function(){
					var look = agentComp.getSelectionModel().getSelection();		//获取复选框的选择
					if (look.length != 1){		//选择的行数不等于1，只能一行一行的进行查看
						Ext.Msg.alert('提示','请选择一行进行查看！');
						return ;
					}else{
						//若选择了一行则通过look显示信息
						var win = Ext.create('Ext.window.Window', {
							title:"查看代理商信息",
						    height: 400,
						    width: 430,
						    layout: 'fit',
						    items:{
								renderTo: Ext.getBody(),
							    height: 370,
							    width: 420,
							    labelAlign: "right",
							    buttonAlign:'center',
							    frame: true,
							    defaults:{
					      			width:350,
					      	 		labelWidth: 60
					      		},
					    		items: [			    
									{xtype:'textfield',id:'area', name:'area',dataIndex:'area', fieldLabel:'地区'},
									{xtype:'textfield', id:'companyName', name:'companyName',dataIndex:'companyName', fieldLabel:'公司名'},
									{xtype:'textfield', id:'url', name:'url',dataIndex:'url', fieldLabel:'网址'},
									{xtype:'textarea',height:'200', id:'agentContent', name:'agentContent',dataIndex:'agentContent', fieldLabel:'代理商(*若需换行，请加&lt;br&gt;)'}
					    		],
					      		buttons:[{
					      			text:"关闭",
					      			handler: function() {
					      			win.close();
					      			}
					      	   }]
							}
					}).show();
					Ext.getCmp('area').setValue(look[0].get('area'));
					Ext.getCmp('companyName').setValue(look[0].get('companyName'));
					Ext.getCmp('url').setValue(look[0].get('url'));						
					Ext.getCmp('agentContent').setValue(look[0].get('agentContent'));
					}
				}
			},{
					xtype:'tbseparator'
			},{
				pressed:true,
				text:'删除代理商',
				handler:function(){
					//Ext.Msg.alert('Click', '您单击了删除按钮');
					var look = agentComp.getSelectionModel().getSelection();		//获取复选框的选择
					if (look.length != 1){
						Ext.Msg.alert('提示','请选择一行进行删除！');
						return ;
					}else{
						Ext.Msg.confirm('提示','您确定要删除该代理商吗？', function(btn){
							if (btn == 'yes'){
								var a = new Agent({
									agentId:look[0].get('agentId'),
									area:look[0].get('area'),
									companyName:look[0].get('companyName'),
									url:look[0].get('url'),
									agentContent:look[0].get('agentContent'),
		      					});
								Ext.Ajax.request({
									url:'deleteAgent',
		      						params:{
		      							json:Ext.JSON.encode(a.data)
		      						},
		      						success:function(resp, opts){
		      							var success=Ext.decode(resp.responseText);    
		      							if (success){
		      								Ext.Msg.alert('提示','删除成功!');
		      								var agentGrid = Ext.getCmp('agentGrid');
		      								if (agentGrid){
		      									var store = agentGrid.getStore();
		      									store.load();
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
			},{
				xtype:'tbseparator'
			},{
				pressed:true,
				text:'修改代理商',
				handler:function(){
					var look = agentComp.getSelectionModel().getSelection();		//获取复选框的选择
					if (look.length != 1){		//选择的行数不等于1，只能一行一行的进行查看
						Ext.Msg.alert('提示','请选择一行进行修改！');
						return ;
					}else{
						//若选择了一行则通过look显示信息
						var win = Ext.create('Ext.window.Window', {
							title:"修改代理商信息",
						    height: 400,
						    width: 430,
						    layout: 'fit',
						    items:{
						    	xtype:'form',
								renderTo: Ext.getBody(),
							    height: 370,
							    width: 420,
							    labelAlign: "right",
							    buttonAlign:'center',
							    frame: true,
							    defaults:{
					      			width:350,
					      	 		labelWidth: 60
					      		},
					    		items: [			    
									{xtype:'textfield',id:'area', name:'area',dataIndex:'area', fieldLabel:'地区'},
									{xtype:'textfield', id:'companyName', name:'companyName',dataIndex:'companyName', fieldLabel:'公司名'},
									{xtype:'textfield', id:'url', name:'url',dataIndex:'url', fieldLabel:'网址'},
									{xtype:'textarea',height:'200', id:'agentContent', name:'agentContent',dataIndex:'agentContent', fieldLabel:'代理商(*若需换行，请加&lt;br&gt;)'}
					    		],
					      		buttons:[{
					      			text:'提交修改',
				      				handler:function(){
				    					if (this.up('form').getForm().isValid()){
			 
				    						var a = new Agent({
				    							agentId:look[0].get('agentId'),
				    							area:this.up('form').getForm().getFieldValues().area,
				    							companyName:this.up('form').getForm().getFieldValues().companyName,
				    							url:this.up('form').getForm().getFieldValues().url,
				    							agentContent:this.up('form').getForm().getFieldValues().agentContent
				    						});
				    						this.up('form').getForm().submit({
				    							url:'editAgent',
				    							waitTitle:'请稍后',
				          						watiMsg:'正在提交信息······',
				          						params:{
				          							json:Ext.JSON.encode(a.data)
				          						},
				          						success:function(resp, opts){
				          							var success = opts.result.success;
				          							if (success){
				          								Ext.Msg.alert('提示','修改成功!');
					      								var agentGrid = Ext.getCmp('agentGrid');
					      								if (agentGrid){
					      									var store = agentGrid.getStore();
					      									store.load();
					      								}
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
					      			text:"关闭",
					      			handler: function() {
					      			win.close();
					      		}
					      	   }]
							}
					}).show();
					Ext.getCmp('area').setValue(look[0].get('area'));
					Ext.getCmp('companyName').setValue(look[0].get('companyName'));
					Ext.getCmp('url').setValue(look[0].get('url'));						
					Ext.getCmp('agentContent').setValue(look[0].get('agentContent'));
					}
				}
			}]
		});
//		centerPanel.add(agentComp);
//	};
//		centerPanel.setActiveTab(agentComp);
		var tabs = Ext.getCmp("mainTab");
		var showAgentTab = tabs.getComponent("showAgentTab");
		if (showAgentTab){
			tabs.setActiveTab(showAgentTab);
		}else{
			tabs.add({
				id:'showAgentTab',
				title:'代理商',
				closable:true,
				items:[agentComp]
			}).show();			
		}
};